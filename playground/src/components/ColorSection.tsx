import { Index, Show } from "solid-js";
import type { GradientType } from "../../../src/types";
import { uid } from "../lib/utils";
import type { ColorStop } from "../types";
import { ColorStopRow } from "./ColorStopRow";
import { Toggle } from "./ui/Toggle";

interface ColorSectionProps {
	label: string;
	colors: () => ColorStop[];
	setColors: (v: ColorStop[] | ((prev: ColorStop[]) => ColorStop[])) => void;
	gradient: () => boolean;
	onToggleGradient: () => void;
	gradientType: () => GradientType;
	onSetGradientType: (t: GradientType) => void;
}

export function ColorSection(props: ColorSectionProps) {
	// Module-level drag state — safe because SolidJS components run once
	let dragFrom = -1;

	const update = (id: number, color: string) =>
		props.setColors((prev) =>
			prev.map((c) => (c.id === id ? { ...c, color } : c)),
		);

	const remove = (id: number) =>
		props.setColors((prev) => prev.filter((c) => c.id !== id));

	const add = () =>
		props.setColors((prev) => [
			...prev,
			{ id: uid(), color: prev[prev.length - 1]?.color ?? "#6366f1" },
		]);

	const reorder = (from: number, to: number) =>
		props.setColors((prev) => {
			const arr = [...prev];
			const [item] = arr.splice(from, 1);
			arr.splice(to, 0, item);
			return arr;
		});

	return (
		<section class="space-y-3">
			{/* Header + gradient toggle */}
			<div class="flex items-center justify-between">
				<span class="text-xs font-semibold uppercase tracking-wider text-slate-400">
					{props.label}
				</span>
				<div class="flex items-center gap-2">
					<span class="text-xs text-slate-500 select-none">Gradient</span>
					<Toggle
						checked={props.gradient}
						onChange={props.onToggleGradient}
						label={`Toggle ${props.label} gradient`}
					/>
					<div
						class={`flex rounded-md overflow-hidden border text-xs transition-opacity ${props.gradient() ? "border-slate-700" : "border-slate-800 opacity-40"}`}
					>
						<button
							type="button"
							disabled={!props.gradient()}
							onClick={() => props.onSetGradientType("linear")}
							class={`px-2 py-1 transition-colors ${props.gradient() && props.gradientType() === "linear" ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400"} ${props.gradient() ? "hover:text-slate-200 cursor-pointer" : "cursor-not-allowed"}`}
						>
							Linear
						</button>
						<button
							type="button"
							disabled={!props.gradient()}
							onClick={() => props.onSetGradientType("radial")}
							class={`px-2 py-1 transition-colors ${props.gradient() && props.gradientType() === "radial" ? "bg-indigo-600 text-white" : "bg-slate-900 text-slate-400"} ${props.gradient() ? "hover:text-slate-200 cursor-pointer" : "cursor-not-allowed"}`}
						>
							Radial
						</button>
					</div>
				</div>
			</div>

			{/* Color stop list */}
			<ul class="space-y-2 list-none m-0 p-0">
				<Index each={props.colors()}>
					{(stop, i) => (
						<ColorStopRow
							stop={stop}
							index={i}
							label={props.label}
							isGradient={props.gradient()}
							isDeleteDisabled={props.colors().length <= 2}
							onUpdate={update}
							onRemove={remove}
							onDragStart={(e) => {
								dragFrom = i;
								if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
							}}
							onDragOver={(e) => {
								e.preventDefault();
								if (!props.gradient() || dragFrom < 0) return;
								const to = i;
								if (dragFrom !== to) {
									reorder(dragFrom, to);
									dragFrom = to;
								}
							}}
							onDragEnd={() => {
								dragFrom = -1;
							}}
						/>
					)}
				</Index>
			</ul>

			{/* Add color button */}
			<Show when={props.gradient()}>
				<button
					type="button"
					onClick={add}
					class="w-full py-2 border border-dashed border-slate-800 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
						<line x1="7" y1="2" x2="7" y2="12" />
						<line x1="2" y1="7" x2="12" y2="7" />
					</svg>
					Add Color
				</button>
			</Show>
		</section>
	);
}
