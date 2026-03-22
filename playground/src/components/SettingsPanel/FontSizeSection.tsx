import { Show } from "solid-js";
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