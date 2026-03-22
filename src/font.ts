import * as fontkit from "fontkit";
import type { TextAnchorPosition } from "./types";

async function resolveToArrayBuffer(
	source: string | ArrayBuffer,
): Promise<ArrayBuffer> {
	if (source instanceof ArrayBuffer) return source;

	if (source.startsWith("data:")) {
		const base64 = source.split(",")[1] ?? "";
		const binary = atob(base64);
		const bytes = new Uint8Array(binary.length);
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}
		return bytes.buffer;
	}

	const res = await fetch(source);
	if (!res.ok) {
		throw new Error(
			`Failed to fetch font from "${source}": ${res.status} ${res.statusText}`,
		);
	}
	return res.arrayBuffer();
}

interface GlyphPathItem {
	pathData: string;
	transform: string;
}

function hAlign(a: TextAnchorPosition): "left" | "center" | "right" {
	if (a === "left" || a === "top-left" || a === "bottom-left") return "left";
	if (a === "right" || a === "top-right" || a === "bottom-right")
		return "right";
	return "center";
}

function vAlign(a: TextAnchorPosition): "top" | "middle" | "bottom" {
	if (a === "top" || a === "top-left" || a === "top-right") return "top";
	if (a === "bottom" || a === "bottom-left" || a === "bottom-right")
		return "bottom";
	return "middle";
}

export async function buildGlyphPaths(
	fontSource: string | ArrayBuffer,
	text: string,
	size: number,
	fontSize: number,
	fontWeight: number,
	textAnchor: TextAnchorPosition = "bottom-right",
): Promise<GlyphPathItem[]> {
	if (text === "") return [];

	const buffer = await resolveToArrayBuffer(fontSource);

	// fontkit.create() is typed to accept Buffer, but Uint8Array works at runtime.
	// Cast to avoid depending on Node.js's Buffer type in Core.
	type FontkitCreate = (
		buffer: Uint8Array,
		postscriptName?: string,
	) => ReturnType<typeof fontkit.create>;
	const created = (fontkit.create as unknown as FontkitCreate)(
		new Uint8Array(buffer),
	);

	if (!("layout" in created)) {
		throw new Error(
			"Font collection files (.ttc / .dfont) are not supported. Please provide a single font file.",
		);
	}

	const font =
		"wght" in (created.variationAxes ?? {})
			? created.getVariation({ wght: fontWeight })
			: created;

	const scale = fontSize / font.unitsPerEm;
	const run = font.layout(text);

	const totalAdvance =
		run.positions.reduce(
			(sum: number, pos: { xAdvance: number }) => sum + pos.xAdvance,
			0,
		) * scale;

	const rawCap: unknown = (font as unknown as Record<string, unknown>)
		.capHeight;
	const capHeight =
		typeof rawCap === "number" && rawCap > 0 ? rawCap * scale : fontSize * 0.72;

	const hPad = size * 0.0625;
	const vPad = size * 0.0875;
	const h = hAlign(textAnchor);
	const v = vAlign(textAnchor);

	const startX =
		h === "left"
			? hPad
			: h === "center"
				? (size - totalAdvance) / 2
				: size - hPad - totalAdvance;

	const baselineY =
		v === "top"
			? vPad + capHeight
			: v === "middle"
				? size / 2 + capHeight / 2
				: size - vPad;

	const items: GlyphPathItem[] = [];
	let xCursor = startX;

	for (let i = 0; i < run.glyphs.length; i++) {
		const glyph = run.glyphs[i];
		const pos = run.positions[i];
		if (!glyph || !pos) continue;

		const tx = (xCursor + pos.xOffset * scale).toFixed(3);
		const ty = (baselineY - pos.yOffset * scale).toFixed(3);
		const s = scale.toFixed(5);

		items.push({
			pathData: glyph.path.toSVG(),
			transform: `translate(${tx},${ty}) scale(${s},${(-scale).toFixed(5)})`,
		});

		xCursor += pos.xAdvance * scale;
	}

	return items;
}
