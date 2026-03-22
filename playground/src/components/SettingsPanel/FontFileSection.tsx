import { Show } from "solid-js";
import { cn } from "../../lib/utils";

interface FontFileSectionProps {
	customFontName: () => string;
	onFontUpload: (buffer: ArrayBuffer, name: string) => void;
	onFontRemove: () => void;
}

export function FontFileSection(props: FontFileSectionProps) {
	return (
		<section class="space-y-2">
			<span class="block text-xs font-semibold uppercase tracking-wider text-slate-400">
				Font File
			</span>
			<div class="flex items-center gap-2">
				<label class="cursor-pointer shrink-0 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors border border-slate-700 hover:border-slate-600">
					Import Font
					<input
						type="file"
						accept=".ttf,.otf,.woff,.woff2"
						class="hidden"
						onChange={async (e) => {
							const file = e.currentTarget.files?.[0];
							if (!file) return;
							const buffer = await file.arrayBuffer();
							props.onFontUpload(buffer, file.name);
							e.currentTarget.value = "";
						}}
					/>
				</label>
				<span
					class={cn(
						"text-xs truncate flex-1 min-w-0",
						props.customFontName() ? "text-slate-300" : "text-slate-600",
					)}
				>
					{props.customFontName() || "Raleway (default)"}
				</span>
				<Show when={props.customFontName()}>
					<button
						type="button"
						onClick={props.onFontRemove}
						aria-label="Remove font"
						class="cursor-pointer shrink-0 w-6 h-6 flex items-center justify-center rounded-md text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
					>
						<svg
							aria-hidden="true"
							class="w-3.5 h-3.5"
							viewBox="0 0 14 14"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						>
							<path d="M2 2l10 10M12 2L2 12" />
						</svg>
					</button>
				</Show>
			</div>
		</section>
	);
}
