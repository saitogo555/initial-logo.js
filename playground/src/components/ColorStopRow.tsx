import { Show, createEffect } from "solid-js";
import type { Accessor } from "solid-js";
import { cn } from "../lib/utils";
import type { ColorStop } from "../types";
import { GripIcon } from "./ui/GripIcon";

interface ColorStopRowProps {
	stop: Accessor<ColorStop>;
	index: number;
	label: string;
	isGradient: boolean;
	isDeleteDisabled: boolean;
	onUpdate: (id: number, color: string) => void;
	onRemove: (id: number) => void;
	onDragStart: (e: DragEvent) => void;
	onDragOver: (e: DragEvent) => void;
	onDragEnd: () => void;
}

export function ColorStopRow(props: ColorStopRowProps) {
	let colorInputRef!: HTMLInputElement;
	let isPickerOpen = false;

	// 外部からの色変更（プリセット等）をDOMに反映するが、
	// ピッカーが開いている間は更新しない（ネイティブピッカーが閉じるのを防ぐ）
	createEffect(() => {
		const color = props.stop().color;
		if (!isPickerOpen) {
			colorInputRef.value = color;
		}
	});

	return (
		<li
			class="flex items-center gap-2 px-2.5 py-2 bg-slate-900 border border-slate-800 rounded-lg transition-colors hover:border-slate-700"
			draggable={props.isGradient}
			onDragStart={props.onDragStart}
			onDragOver={props.onDragOver}
			onDragEnd={props.onDragEnd}
		>
			{/* Drag handle */}
			<Show when={props.isGradient}>
				<div class="cursor-grab text-slate-600 hover:text-slate-400 shrink-0 touch-none">
					<GripIcon />
				</div>
			</Show>

			{/* Color swatch */}
			<label class="relative shrink-0 cursor-pointer group">
				<div
					class="w-8 h-8 rounded-md border-2 border-slate-700 transition-transform group-hover:scale-110"
					style={{ "background-color": props.stop().color }}
				/>
				<input
					type="color"
					ref={colorInputRef}
					onFocus={() => {
						isPickerOpen = true;
					}}
					onBlur={() => {
						isPickerOpen = false;
					}}
					onInput={(e) => {
						const v = e.currentTarget.value;
						const stop = props.stop();
						if (v.toLowerCase() !== stop.color.toLowerCase()) {
							props.onUpdate(stop.id, v);
						}
					}}
					class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
					aria-label={`${props.label} color ${props.index + 1}`}
				/>
			</label>

			{/* Hex text input */}
			<input
				type="text"
				value={props.stop().color.toUpperCase()}
				onInput={(e) => {
					const v = e.currentTarget.value;
					if (/^#[0-9a-fA-F]{6}$/.test(v)) props.onUpdate(props.stop().id, v);
				}}
				onChange={(e) => {
					if (!/^#[0-9a-fA-F]{6}$/.test(e.currentTarget.value)) {
						e.currentTarget.value = props.stop().color.toUpperCase();
					}
				}}
				maxLength={7}
				spellcheck={false}
				class="flex-1 min-w-0 bg-transparent text-sm font-mono text-slate-200 border border-slate-800 rounded-md px-2 py-1.5 uppercase focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
			/>

			{/* Delete button — only in gradient mode */}
			<Show when={props.isGradient}>
				<button
					type="button"
					onClick={() => props.onRemove(props.stop().id)}
					disabled={props.isDeleteDisabled}
					aria-label="Remove color"
					class={cn(
						"shrink-0 w-7 h-7 flex items-center justify-center rounded-md transition-colors",
						props.isDeleteDisabled
							? "text-slate-800 cursor-not-allowed"
							: "text-slate-600 hover:text-red-400 hover:bg-red-400/10",
					)}
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
						<line x1="2" y1="2" x2="12" y2="12" />
						<line x1="12" y1="2" x2="2" y2="12" />
					</svg>
				</button>
			</Show>
		</li>
	);
}
