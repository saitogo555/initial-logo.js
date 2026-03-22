import { For } from "solid-js";
import { FONT_WEIGHTS, WEIGHT_LABELS } from "../../constants/fontWeights";

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
