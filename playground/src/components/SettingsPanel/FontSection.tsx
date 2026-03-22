import { For, Show } from "solid-js";
import { FONT_WEIGHTS, WEIGHT_LABELS } from "../../constants/fontWeights";
import { cn } from "../../lib/utils";

interface FontSizeSectionProps {
	customFontSize: () => number | null;
	setCustomFontSize: (v: number | null) => void;
	autoFontSize: () => number;
}

export function FontSizeSection(props: FontSizeSectionProps) {
	const isManual = () => props.customFontSize() !== null;

	return (
		<section class="space-y-2">
			<div class="flex items-center justify-between">
				<span class="text-xs font-semibold uppercase tracking-wider text-slate-400">
					Font Size
				</span>
				<div class="flex rounded-md overflow-hidden border border-slate-700 text-xs">
					<button
						type="button"
						onClick={() => props.setCustomFontSize(null)}
						class={cn(
							"px-2.5 py-1 transition-colors cursor-pointer",
							!isManual()
								? "bg-indigo-600 text-white"
								: "bg-slate-900 text-slate-400 hover:text-slate-200",
						)}
					>
						Auto
					</button>
					<button
						type="button"
						onClick={() => {
							if (!isManual()) props.setCustomFontSize(props.autoFontSize());
						}}
						class={cn(
							"px-2.5 py-1 transition-colors cursor-pointer",
							isManual()
								? "bg-indigo-600 text-white"
								: "bg-slate-900 text-slate-400 hover:text-slate-200",
						)}
					>
						Manual
					</button>
				</div>
			</div>
			<Show when={isManual()}>
				<input
					id="input-fontsize"
					type="range"
					min="8"
					max="400"
					step="1"
					value={props.customFontSize() ?? props.autoFontSize()}
					onInput={(e) =>
						props.setCustomFontSize(Number(e.currentTarget.value))
					}
					class="w-full"
				/>
				<div class="flex justify-between text-xs text-slate-600 select-none">
					<span>8px</span>
					<span class="font-mono text-slate-400 tabular-nums">
						{props.customFontSize()}px
					</span>
					<span>400px</span>
				</div>
			</Show>
		</section>
	);
}

interface FontWeightSectionProps {
	fontWeight: () => number;
	setFontWeight: (v: number) => void;
}

export function FontWeightSection(props: FontWeightSectionProps) {
	return (
		<section class="space-y-2">
			<label
				for="input-fontweight"
				class="block text-xs font-semibold uppercase tracking-wider text-slate-400"
			>
				Font Weight
			</label>
			<select
				id="input-fontweight"
				value={props.fontWeight()}
				onChange={(e) => props.setFontWeight(Number(e.currentTarget.value))}
				class="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-colors cursor-pointer"
			>
				<For each={FONT_WEIGHTS}>
					{(w) => (
						<option value={w}>
							{w} · {WEIGHT_LABELS[w]}
						</option>
					)}
				</For>
			</select>
		</section>
	);
}

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
