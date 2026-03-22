import type { GradientType, TextAnchorPosition } from "../../../../src/types";
import type { Preset } from "../../constants/presets";
import type { ColorStop } from "../../types";
import { ColorSection } from "../ColorSection";
import { FontFileSection, FontSizeSection, FontWeightSection } from "./FontSection";
import { PresetSection } from "./PresetSection";
import { CornerRadiusSection, SizeSection } from "./SizeSection";
import { AnchorSection, TextSection } from "./TextSection";

interface SettingsPanelProps {
	text: () => string;
	setText: (v: string) => void;
	textAnchor: () => TextAnchorPosition;
	setTextAnchor: (v: TextAnchorPosition) => void;
	size: () => number;
	setSize: (v: number) => void;
	borderRadius: () => number;
	setBorderRadius: (v: number) => void;
	bgGradient: () => boolean;
	bgColors: () => ColorStop[];
	setBgColors: (v: ColorStop[] | ((prev: ColorStop[]) => ColorStop[])) => void;
	toggleBgGradient: () => void;
	bgGradientType: () => GradientType;
	setBgGradientType: (t: GradientType) => void;
	textGradient: () => boolean;
	textColors: () => ColorStop[];
	setTextColors: (
		v: ColorStop[] | ((prev: ColorStop[]) => ColorStop[]),
	) => void;
	toggleTextGradient: () => void;
	textGradientType: () => GradientType;
	setTextGradientType: (t: GradientType) => void;
	customFontSize: () => number | null;
	setCustomFontSize: (v: number | null) => void;
	autoFontSize: () => number;
	fontWeight: () => number;
	setFontWeight: (v: number) => void;
	customFontName: () => string;
	onFontUpload: (buffer: ArrayBuffer, name: string) => void;
	onFontRemove: () => void;
	onApplyPreset: (preset: Preset) => void;
}

export function SettingsPanel(props: SettingsPanelProps) {
	return (
		<aside class="w-90 shrink-0 flex flex-col border-r border-slate-800/60">
			{/* Header */}
			<div class="px-5 py-4 border-b border-slate-800/60 flex items-center gap-3 shrink-0">
				<span class="font-semibold text-sm">Initial Logo Generator</span>
			</div>

			{/* Scrollable form */}
			<div class="flex-1 overflow-y-auto min-h-0 px-5 py-6 space-y-6">
				<PresetSection onApply={props.onApplyPreset} />

				<div class="border-t border-slate-800/60" />

				<TextSection
					text={props.text}
					onInput={props.setText}
				/>

				<AnchorSection
					textAnchor={props.textAnchor}
					setTextAnchor={props.setTextAnchor}
				/>

				<SizeSection
					size={props.size}
					onInput={props.setSize}
				/>

				<CornerRadiusSection
					borderRadius={props.borderRadius}
					onInput={props.setBorderRadius}
				/>

				<div class="border-t border-slate-800/60" />

				<ColorSection
					label="Background"
					colors={props.bgColors}
					setColors={props.setBgColors}
					gradient={props.bgGradient}
					onToggleGradient={props.toggleBgGradient}
					gradientType={props.bgGradientType}
					onSetGradientType={props.setBgGradientType}
				/>

				<ColorSection
					label="Text Color"
					colors={props.textColors}
					setColors={props.setTextColors}
					gradient={props.textGradient}
					onToggleGradient={props.toggleTextGradient}
					gradientType={props.textGradientType}
					onSetGradientType={props.setTextGradientType}
				/>

				<div class="border-t border-slate-800/60" />

				<FontSizeSection
					customFontSize={props.customFontSize}
					setCustomFontSize={props.setCustomFontSize}
					autoFontSize={props.autoFontSize}
				/>

				<FontWeightSection
					fontWeight={props.fontWeight}
					setFontWeight={props.setFontWeight}
				/>

				<FontFileSection
					customFontName={props.customFontName}
					onFontUpload={props.onFontUpload}
					onFontRemove={props.onFontRemove}
				/>
			</div>
		</aside>
	);
}
