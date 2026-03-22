import { createSignal, For, Show } from "solid-js";
import { cn } from "../../lib/utils";

type Format = "svg" | "png" | "jpg" | "webp";

const FORMATS: { label: string; value: Format }[] = [
	{ label: "SVG", value: "svg" },
	{ label: "PNG", value: "png" },
	{ label: "JPG", value: "jpg" },
	{ label: "WEBP", value: "webp" },
];

function triggerDownload(blob: Blob, filename: string) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

async function downloadAs(svgString: string, format: Format) {
	if (format === "svg") {
		const blob = new Blob([svgString], { type: "image/svg+xml" });
		triggerDownload(blob, "logo.svg");
		return;
	}

	const blob = new Blob([svgString], { type: "image/svg+xml" });
	const url = URL.createObjectURL(blob);
	const img = new Image();
	await new Promise<void>((resolve, reject) => {
		img.onload = () => resolve();
		img.onerror = reject;
		img.src = url;
	});

	const canvas = document.createElement("canvas");
	canvas.width = img.naturalWidth || img.width || 300;
	canvas.height = img.naturalHeight || img.height || 300;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Failed to get 2D canvas context");
	if (format === "jpg") {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
	ctx.drawImage(img, 0, 0);
	URL.revokeObjectURL(url);

	const mimeMap: Record<string, string> = {
		png: "image/png",
		jpg: "image/jpeg",
		webp: "image/webp",
	};
	const outBlob = await new Promise<Blob>((resolve, reject) => {
		canvas.toBlob(
			(b) => (b ? resolve(b) : reject(new Error("toBlob failed"))),
			mimeMap[format],
		);
	});
	triggerDownload(outBlob, `logo.${format}`);
}

interface DownloadButtonProps {
	svgString: () => string;
}

export function DownloadButton(props: DownloadButtonProps) {
	const [open, setOpen] = createSignal(false);

	const handleSelect = async (format: Format) => {
		setOpen(false);
		const svg = props.svgString();
		if (!svg) return;
		await downloadAs(svg, format);
	};

	return (
		<div class="relative">
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				disabled={!props.svgString()}
				class={cn(
					"cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
					"bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-slate-200",
					"shadow-lg backdrop-blur disabled:opacity-40 disabled:cursor-not-allowed",
				)}
			>
				<svg
					aria-hidden="true"
					class="w-4 h-4"
					viewBox="0 0 16 16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M8 2v8M5 7l3 3 3-3M2 13h12" />
				</svg>
				Download
				<svg
					aria-hidden="true"
					class="w-3 h-3"
					viewBox="0 0 10 6"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M1 1l4 4 4-4" />
				</svg>
			</button>

			<Show when={open()}>
				{/* Backdrop */}
				<button
					type="button"
					class="fixed inset-0 z-10 cursor-default"
					aria-label="Close menu"
					onClick={() => setOpen(false)}
				/>
				<div class="absolute right-0 top-full mt-1.5 z-20 min-w-28 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
					<For each={FORMATS}>
						{(fmt) => (
							<button
								type="button"
								onClick={() => handleSelect(fmt.value)}
							class="cursor-pointer w-full px-4 py-2 text-sm text-left text-slate-200 hover:bg-slate-700 transition-colors"
							>
								{fmt.label}
							</button>
						)}
					</For>
				</div>
			</Show>
		</div>
	);
}
