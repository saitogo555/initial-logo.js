import { batch, createEffect, createMemo, createSignal } from "solid-js";
import { generateRawSvg } from "../../../src/index";
import type {
	GradientType,
	LogoOptions,
	TextAnchorPosition,
} from "../../../src/types";
import type { Preset } from "../constants/presets";
import { uid } from "../lib/utils";
import type { ColorStop } from "../types";

export function useLogo() {
	const [text, setText] = createSignal("JS");
	const [size, setSize] = createSignal(200);

	const [bgGradient, setBgGradient] = createSignal(false);
	const [bgColors, setBgColors] = createSignal<ColorStop[]>([
		{ id: uid(), color: "#F7DF1E" },
	]);

	const [textGradient, setTextGradient] = createSignal(false);
	const [textColors, setTextColors] = createSignal<ColorStop[]>([
		{ id: uid(), color: "#000000" },
	]);

	const [customFontSize, setCustomFontSize] = createSignal<number | null>(null);
	const [fontWeight, setFontWeight] = createSignal(700);
	const [customFont, setCustomFont] = createSignal<ArrayBuffer | null>(null);
	const [customFontName, setCustomFontName] = createSignal("");
	const [textAnchor, setTextAnchor] =
		createSignal<TextAnchorPosition>("bottom-right");
	const [bgGradientType, setBgGradientType] =
		createSignal<GradientType>("linear");
	const [textGradientType, setTextGradientType] =
		createSignal<GradientType>("linear");
	const [borderRadius, setBorderRadius] = createSignal(0);

	const [svgString, setSvgString] = createSignal("");
	const [genError, setGenError] = createSignal("");

	const autoFontSize = () => Math.round(size() * 0.525);

	const fontSource = () => {
		const cf = customFont();
		if (cf !== null) return cf;
		return `https://cdn.jsdelivr.net/fontsource/fonts/raleway@latest/latin-${fontWeight()}-normal.woff2`;
	};

	const uploadFont = (buffer: ArrayBuffer, name: string) => {
		setCustomFont(buffer);
		setCustomFontName(name);
	};

	const removeFont = () => {
		setCustomFont(null);
		setCustomFontName("");
	};

	const borderRadiusPx = () => Math.round(size() * borderRadius() / 100);

	let genVersion = 0;

	// All signal reads MUST happen before the first `await` for SolidJS reactivity tracking
	createEffect(async () => {
		const version = ++genVersion;
		const opts: LogoOptions = {
			text: text(),
			size: size(),
			fontWeight: fontWeight(),
			fontSource: fontSource(),
			backgroundColor:
				bgGradient() && bgColors().length >= 2
					? bgColors().map((s) => s.color)
					: (bgColors()[0]?.color ?? "#000000"),
			backgroundGradientType:
				bgGradient() && bgColors().length >= 2 ? bgGradientType() : undefined,
			textColor:
				textGradient() && textColors().length >= 2
					? textColors().map((s) => s.color)
					: (textColors()[0]?.color ?? "#ffffff"),
			textGradientType:
				textGradient() && textColors().length >= 2
					? textGradientType()
					: undefined,
			textAnchor: textAnchor(),
			borderRadius: borderRadius() > 0 ? borderRadiusPx() : undefined,
		};
		const fs = customFontSize();
		if (fs !== null) opts.fontSize = fs;

		try {
			const svg = await generateRawSvg(opts);
			if (version !== genVersion) return;
			setSvgString(svg);
			setGenError("");
		} catch (e) {
			if (version !== genVersion) return;
			setGenError(e instanceof Error ? e.message : String(e));
		}
	});

	const toggleBgGradient = () => {
		const next = !bgGradient();
		setBgGradient(next);
		if (!next) {
			setBgColors((prev) => prev.slice(0, 1));
		}
	};

	const toggleTextGradient = () => {
		const next = !textGradient();
		setTextGradient(next);
		if (!next) {
			setTextColors((prev) => prev.slice(0, 1));
		}
	};

	const applyPreset = (preset: Preset) => {
		batch(() => {
			setText(preset.text);
			setBgGradient(preset.bgGradient);
			setBgColors(preset.bgColors.map((color) => ({ id: uid(), color })));
			if (preset.bgGradientType) setBgGradientType(preset.bgGradientType);
			setTextGradient(preset.textGradient);
			setTextColors(preset.textColors.map((color) => ({ id: uid(), color })));
			if (preset.textGradientType) setTextGradientType(preset.textGradientType);
			setFontWeight(preset.fontWeight);
			setBorderRadius(preset.borderRadius ?? 0);
		});
	};

	const codeString = createMemo(() => {
		const t = text();
		const s = size();
		const anchor = textAnchor();
		const br = borderRadius();
		const brPx = Math.round(size() * br / 100);
		const fw = fontWeight();
		const fs = customFontSize();
		const bgIsGrad = bgGradient() && bgColors().length >= 2;
		const textIsGrad = textGradient() && textColors().length >= 2;

		const args: string[] = [];

		if (t) args.push(`  text: ${JSON.stringify(t)},`);
		args.push(`  size: ${s},`);

		if (bgIsGrad) {
			args.push(
				`  backgroundColor: [${bgColors()
					.map((c) => JSON.stringify(c.color))
					.join(", ")}],`,
			);
			if (bgGradientType() === "radial")
				args.push(`  backgroundGradientType: 'radial',`);
		} else {
			args.push(
				`  backgroundColor: ${JSON.stringify(bgColors()[0]?.color ?? "#6366f1")},`,
			);
		}

		if (textIsGrad) {
			args.push(
				`  textColor: [${textColors()
					.map((c) => JSON.stringify(c.color))
					.join(", ")}],`,
			);
			if (textGradientType() === "radial")
				args.push(`  textGradientType: 'radial',`);
		} else {
			args.push(
				`  textColor: ${JSON.stringify(textColors()[0]?.color ?? "#ffffff")},`,
			);
		}

		args.push(`  fontWeight: ${fw},`);
		if (fs !== null) args.push(`  fontSize: ${fs},`);
		args.push(`  textAnchor: '${anchor}',`);
		if (brPx > 0) args.push(`  borderRadius: ${brPx},`);

		return `{\n${args.join("\n")}\n}`;
	});

	return {
		text,
		setText,
		size,
		setSize,
		bgGradient,
		bgColors,
		setBgColors,
		toggleBgGradient,
		textGradient,
		textColors,
		setTextColors,
		toggleTextGradient,
		customFontSize,
		setCustomFontSize,
		autoFontSize,
		fontWeight,
		setFontWeight,
		customFontName,
		uploadFont,
		removeFont,
		textAnchor,
		setTextAnchor,
		bgGradientType,
		setBgGradientType,
		textGradientType,
		setTextGradientType,
		borderRadius,
		setBorderRadius,
		borderRadiusPx,
		svgString,
		genError,
		codeString,
		applyPreset,
	};
}

export type LogoState = ReturnType<typeof useLogo>;
