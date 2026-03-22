interface TextSectionProps {
	text: () => string;
	onInput: (v: string) => void;
}

export function TextSection(props: TextSectionProps) {
	let input1Ref!: HTMLInputElement;
	let input2Ref!: HTMLInputElement;

	const char1 = () => props.text()[0] ?? "";
	const char2 = () => props.text()[1] ?? "";

	return (
		<section class="space-y-2">
			<span class="block text-xs font-semibold uppercase tracking-wider text-slate-400">
				Text
			</span>
			<div class="flex gap-2">
				<input
					ref={input1Ref}
					type="text"
					value={char1()}
					maxLength={1}
					placeholder="A"
					onFocus={(e) => e.currentTarget.select()}
					onInput={(e) => {
						const v = e.currentTarget.value.slice(0, 1);
						props.onInput(v + char2());
						if (v) input2Ref.focus();
					}}
					class="flex-1 min-w-0 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-white text-base text-center placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-colors"
				/>
				<input
					ref={input2Ref}
					type="text"
					value={char2()}
					maxLength={1}
					placeholder="B"
					onFocus={(e) => e.currentTarget.select()}
					onInput={(e) => {
						const v = e.currentTarget.value.slice(0, 1);
						props.onInput(char1() + v);
					}}
					onKeyDown={(e) => {
						if (e.key === "Backspace" && e.currentTarget.value === "") {
							input1Ref.focus();
						}
					}}
					class="flex-1 min-w-0 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2.5 text-white text-base text-center placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/60 transition-colors"
				/>
			</div>
		</section>
	);
}
