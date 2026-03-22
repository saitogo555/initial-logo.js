import {
	DEFAULT_BG_COLOR,
	DEFAULT_FONT_SOURCE,
	DEFAULT_FONT_WEIGHT,
	DEFAULT_SIZE,
	DEFAULT_TEXT_COLOR,
} from "./constants";
import { buildGlyphPaths } from "./font";
import type { GradientType, LogoOptions, SVGNode } from "./types";

/**
 * 入力の組み合わせから安定した 8 桁の hex ID を生成する (djb2 変形)。
 * 同じ入力には必ず同じ ID が返る。
 */
function stableId(
	text: string,
	bgColor: string | string[],
	textColor: string | string[] | undefined,
): string {
	const seed = [
		text,
		Array.isArray(bgColor) ? bgColor.join(",") : bgColor,
		Array.isArray(textColor) ? textColor.join(",") : (textColor ?? ""),
	].join("\0");
	let h = 5381;
	for (const char of seed) {
		h = (((h << 5) + h) ^ (char.codePointAt(0) ?? 0)) | 0;
	}
	return (h >>> 0).toString(16).padStart(8, "0");
}

export async function buildSvgNode(options: LogoOptions): Promise<SVGNode> {
	const size = options.size ?? DEFAULT_SIZE;
	const bgColor = options.backgroundColor ?? DEFAULT_BG_COLOR;
	const id = stableId(options.text, bgColor, options.textColor);
	const fontSize = options.fontSize ?? Math.round(size * 0.525);
	const fontWeight = Number(options.fontWeight ?? DEFAULT_FONT_WEIGHT);
	const fontSource = options.fontSource ?? DEFAULT_FONT_SOURCE;

	const glyphItems = await buildGlyphPaths(
		fontSource,
		options.text,
		size,
		fontSize,
		fontWeight,
		options.textAnchor,
	);

	const textFill = Array.isArray(options.textColor)
		? `url(#textGradient-${id})`
		: (options.textColor ?? DEFAULT_TEXT_COLOR);

	const gradients: SVGNode[] = [];

	if (Array.isArray(bgColor)) {
		const bgGradType: GradientType = options.backgroundGradientType ?? "linear";
		gradients.push({
			tag: bgGradType === "radial" ? "radialGradient" : "linearGradient",
			attrs:
				bgGradType === "radial"
					? { id: `bgGradient-${id}`, cx: "50%", cy: "50%", r: "50%" }
					: {
							id: `bgGradient-${id}`,
							x1: "0%",
							y1: "0%",
							x2: "100%",
							y2: "0%",
						},
			children: bgColor.map((color, index) => ({
				tag: "stop",
				attrs: {
					offset: `${(index / (bgColor.length - 1)) * 100}%`,
					"stop-color": color,
				},
				children: [],
			})),
		});
	}

	if (Array.isArray(options.textColor)) {
		const textColors = options.textColor;
		const textGradType: GradientType = options.textGradientType ?? "linear";
		gradients.push({
			tag: textGradType === "radial" ? "radialGradient" : "linearGradient",
			attrs:
				textGradType === "radial"
					? { id: `textGradient-${id}`, cx: "50%", cy: "50%", r: "50%" }
					: {
							id: `textGradient-${id}`,
							x1: "0%",
							y1: "0%",
							x2: "100%",
							y2: "0%",
						},
			children: textColors.map((color, index) => ({
				tag: "stop",
				attrs: {
					offset: `${(index / (textColors.length - 1)) * 100}%`,
					"stop-color": color,
				},
				children: [],
			})),
		});
	}

	const rx =
		options.borderRadius !== undefined && options.borderRadius > 0
			? options.borderRadius
			: 0;

	const clipPath: SVGNode = {
		tag: "clipPath",
		attrs: { id: `bgClip-${id}` },
		children: [
			{
				tag: "rect",
				attrs: {
					width: size.toString(),
					height: size.toString(),
					...(rx > 0 ? { rx: rx.toString() } : {}),
				},
				children: [],
			},
		],
	};

	const defs: SVGNode = {
		tag: "defs",
		attrs: {},
		children: [...gradients, clipPath],
	};

	const bgRect: SVGNode = {
		tag: "rect",
		attrs: {
			width: size.toString(),
			height: size.toString(),
			fill: Array.isArray(bgColor) ? `url(#bgGradient-${id})` : bgColor,
			...(rx > 0 ? { rx: rx.toString() } : {}),
		},
		children: [],
	};

	const glyphGroup: SVGNode = {
		tag: "g",
		attrs: { fill: textFill, "clip-path": `url(#bgClip-${id})` },
		children: glyphItems.map((item) => ({
			tag: "path" as const,
			attrs: { d: item.pathData, transform: item.transform },
			children: [],
		})),
	};

	return {
		tag: "svg",
		attrs: {
			xmlns: "http://www.w3.org/2000/svg",
			width: size.toString(),
			height: size.toString(),
			viewBox: `0 0 ${size} ${size}`,
		},
		children: [defs, bgRect, glyphGroup],
	};
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export function buildRawSVG(svg: SVGNode): string {
	const { tag, attrs, children } = svg;

	const attrString = attrs
		? Object.entries(attrs)
				.filter(([, value]) => value !== undefined && value !== null)
				.map(([key, value]) => `${key}="${escapeXml(String(value))}"`)
				.join(" ")
		: "";

	const openingTag = attrString ? `<${tag} ${attrString}>` : `<${tag}>`;

	const childrenString = children
		? children
				.map((child) =>
					typeof child === "string" ? escapeXml(child) : buildRawSVG(child),
				)
				.join("")
		: "";

	const closingTag = `</${tag}>`;

	return `${openingTag}${childrenString}${closingTag}`;
}
