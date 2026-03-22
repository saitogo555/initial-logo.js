interface CornerRadiusSectionProps {
	borderRadius: () => number;
	onInput: (v: number) => void;
}

export function CornerRadiusSection(props: CornerRadiusSectionProps) {
	return (
		<section class="space-y-2">
			<div class="flex items-center justify-between">
				<label
					for="input-border-radius"
					class="text-xs font-semibold uppercase tracking-wider text-slate-400"
				>
					Corner Radius
				</label>
				<span class="text-sm font-mono text-slate-300 tabular-nums">
					{props.borderRadius() === 0 ? "0%" : `${props.borderRadius()}%`}
				</span>
			</div>
			<input
				id="input-border-radius"
				type="range"
				min="0"
				max="50"
				step="1"
				value={props.borderRadius()}
				onInput={(e) => props.onInput(Number(e.currentTarget.value))}
				class="w-full"
			/>
			<div class="flex justify-between text-xs text-slate-700 select-none">
				<span>0%</span>
				<span>50%</span>
			</div>
		</section>
	);
}
