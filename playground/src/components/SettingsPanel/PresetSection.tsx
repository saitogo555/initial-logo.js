import { For } from "solid-js";
import { PRESETS, type Preset } from "../../constants/presets";

interface PresetSectionProps {
	onApply: (preset: Preset) => void;
}

export function PresetSection(props: PresetSectionProps) {
	return (
		<section class="space-y-2">
			<span class="block text-xs font-semibold uppercase tracking-wider text-slate-400">
				Presets
			</span>
			<div class="grid grid-cols-4 gap-1">
				<For each={PRESETS}>
					{(preset) => (
						<button
							type="button"
							title={preset.label}
							onClick={() => props.onApply(preset)}
						class="cursor-pointer flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors group"
						>
							<div
								class="w-10 h-10 rounded-md flex items-center justify-center text-[11px] font-black leading-none select-none shadow-sm"
								style={{
									background: preset.bgColors[0],
									color: preset.textColors[0],
								}}
							>
								{preset.text}
							</div>
							<span class="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors leading-tight w-full text-center overflow-hidden text-ellipsis whitespace-nowrap">
								{preset.shortLabel}
							</span>
						</button>
					)}
				</For>
			</div>
		</section>
	);
}
