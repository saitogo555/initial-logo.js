import { Show } from "solid-js";

interface SvgDisplayProps {
	svgString: () => string;
	genError: () => string;
}

export function SvgDisplay(props: SvgDisplayProps) {
	return (
		<div class="relative z-10 flex flex-col items-center justify-center gap-6 w-full h-full p-12">
			<Show
				when={props.svgString()}
				fallback={
					<div class="w-32 h-32 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-center">
						<svg
							aria-hidden="true"
							class="w-7 h-7 text-slate-600 animate-spin"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						>
							<path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
						</svg>
					</div>
				}
			>
				<div
					class="overflow-hidden drop-shadow-2xl"
					innerHTML={props.svgString()}
				/>
			</Show>

			<Show when={props.genError()}>
				<p class="text-red-400 text-sm bg-red-950/60 border border-red-900/40 rounded-lg px-4 py-2.5 max-w-sm text-center">
					{props.genError()}
				</p>
			</Show>
		</div>
	);
}
