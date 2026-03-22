import { PreviewPanel } from "./components/PreviewPanel";
import { SettingsPanel } from "./components/SettingsPanel";
import { useLogo } from "./hooks/useLogo";

export default function App() {
	const logo = useLogo();

	return (
		<div class="flex h-screen bg-slate-950 text-white overflow-hidden">
			<SettingsPanel
				text={logo.text}
				setText={logo.setText}
				textAnchor={logo.textAnchor}
				setTextAnchor={logo.setTextAnchor}
				size={logo.size}
				setSize={logo.setSize}
				borderRadius={logo.borderRadius}
				setBorderRadius={logo.setBorderRadius}
				bgGradient={logo.bgGradient}
				bgColors={logo.bgColors}
				setBgColors={logo.setBgColors}
				toggleBgGradient={logo.toggleBgGradient}
				bgGradientType={logo.bgGradientType}
				setBgGradientType={logo.setBgGradientType}
				textGradient={logo.textGradient}
				textColors={logo.textColors}
				setTextColors={logo.setTextColors}
				toggleTextGradient={logo.toggleTextGradient}
				textGradientType={logo.textGradientType}
				setTextGradientType={logo.setTextGradientType}
				customFontSize={logo.customFontSize}
				setCustomFontSize={logo.setCustomFontSize}
				autoFontSize={logo.autoFontSize}
				fontWeight={logo.fontWeight}
				setFontWeight={logo.setFontWeight}
				customFontName={logo.customFontName}
				onFontUpload={logo.uploadFont}
				onFontRemove={logo.removeFont}
				onApplyPreset={logo.applyPreset}
			/>
			<PreviewPanel
				svgString={logo.svgString}
				genError={logo.genError}
				codeString={logo.codeString}
			/>
		</div>
	);
}
