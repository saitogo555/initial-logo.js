import { For } from "solid-js";
import type { TextAnchorPosition } from "../../../../src/types";
import { cn } from "../../lib/utils";

const ANCHOR_GRID: TextAnchorPosition[][] = [
	["top-left", "top", "top-right"],
	["left", "center", "right"],
	["bottom-left", "bottom", "bottom-right"],
];

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

interface AnchorSectionProps {
	textAnchor: () => TextAnchorPosition;
	setTextAnchor: (v: TextAnchorPosition) => void;
}

export function AnchorSection(props: AnchorSectionProps) {
	return (
		<section class="space-y-2">
			<span class="block text-xs font-semibold uppercase tracking-wider text-slate-400">
				Anchor
			</span>
			<div class="inline-grid grid-cols-3 gap-0.5 p-1 rounded-lg bg-slate-900 border border-slate-800">
				<For each={ANCHOR_GRID}>
					{(row) => (
						<For each={row}>
							{(pos) => (
								<button
									type="button"
									title={pos}
									onClick={() => props.setTextAnchor(pos)}
									class={cn(
										"w-6 h-6 flex items-center justify-center rounded transition-colors cursor-pointer",
										props.textAnchor() === pos
											? "bg-indigo-600"
											: "hover:bg-slate-700",
									)}
								>
									<span
										class={cn(
											"w-1.5 h-1.5 rounded-full",
											props.textAnchor() === pos
												? "bg-white"
												: "bg-slate-600",
										)}
									/>
								</button>
							)}
						</For>
					)}
				</For>
			</div>
		</section>
	);
}
