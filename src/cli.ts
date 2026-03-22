#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";
import { parseArgs } from "node:util";
import { generateJpg, generatePng, generateWebp } from "./adapters/node";
import { generateRawSvg } from "./core";
import type { GradientType, LogoOptions, TextAnchorPosition } from "./types";

const { values, positionals } = parseArgs({
	args: process.argv.slice(2),
	options: {
		text: {
			type: "string",
			short: "t",
		},
		size: {
			type: "string",
			short: "s",
		},
		output: {
			type: "string",
			short: "o",
		},
		textColor: {
			type: "string",
			short: "T",
			multiple: true,
		},
		backgroundColor: {
			type: "string",
			short: "B",
			multiple: true,
		},
		fontSource: {
			type: "string",
			short: "f",
		},
		fontSize: {
			type: "string",
			short: "F",
		},
		textAnchor: {
			type: "string",
			short: "a",
		},
		borderRadius: {
			type: "string",
			short: "r",
		},
		bgGradientType: {
			type: "string",
		},
		textGradientType: {
			type: "string",
		},
		fontWeight: {
			type: "string",
			short: "w",
		},
		help: {
			type: "boolean",
			short: "h",
		},
	},
	allowPositionals: true,
});

if (values.help) {
	console.log(`
Usage: initial-logo [options]

Options:
  -t, --text <text>            Logo text (required)
  -s, --size <number>          Logo size (default: 100)
  -o, --output <path>          Output file path (default: initial-logo.svg) (.svg / .png / .jpg / .jpeg / .webp)
  -T, --textColor <color>          Text color (can be specified multiple times for gradient)
  -B, --backgroundColor <color>    Background color (can be specified multiple times for gradient)
  -f, --fontSource <url|path>      Font source URL or local file path (default: remote Raleway 900 from jsDelivr)
  -F, --fontSize <number>          Font size
  -a, --textAnchor <position>      Text anchor position (e.g. bottom-right, center, top-left)
  -r, --borderRadius <number>      Border radius in pixels (default: 0)
      --bgGradientType <type>      Background gradient type: linear or radial (default: linear)
      --textGradientType <type>    Text gradient type: linear or radial (default: linear)
  -w, --fontWeight <number>        Font weight (default: 700)
  -h, --help                   Display this help message
`);
	process.exit(0);
}

const text = values.text || positionals[0];

if (!text) {
	console.error(
		"Error: Text is required. Use --text or pass it as an argument.",
	);
	process.exit(1);
}

const rawFontSource = values.fontSource;
let fontSource: string | ArrayBuffer | undefined;
if (
	typeof rawFontSource === "string" &&
	!rawFontSource.startsWith("http") &&
	!rawFontSource.startsWith("data:")
) {
	const buf = await readFile(rawFontSource);
	fontSource = buf.buffer.slice(
		buf.byteOffset,
		buf.byteOffset + buf.byteLength,
	);
} else {
	fontSource = rawFontSource;
}

const options: LogoOptions = {
	text,
	size: values.size ? Number.parseInt(values.size, 10) : undefined,
	textColor:
		values.textColor && values.textColor.length > 1
			? values.textColor
			: values.textColor?.[0],
	backgroundColor:
		values.backgroundColor && values.backgroundColor.length > 1
			? values.backgroundColor
			: values.backgroundColor?.[0],
	fontSource,
	fontSize: values.fontSize ? Number.parseInt(values.fontSize, 10) : undefined,
	textAnchor: values.textAnchor as TextAnchorPosition | undefined,
	borderRadius: values.borderRadius
		? Number.parseInt(values.borderRadius, 10)
		: undefined,
	backgroundGradientType: values.bgGradientType as GradientType | undefined,
	textGradientType: values.textGradientType as GradientType | undefined,
	fontWeight: values.fontWeight ? Number.parseInt(values.fontWeight, 10) : undefined,
};

try {
	const outputPath = values.output ?? "initial-logo.svg";
	const ext = extname(outputPath).toLowerCase();

	if (ext === ".png") {
		const buf = await generatePng(options);
		await writeFile(outputPath, buf);
	} else if (ext === ".jpg" || ext === ".jpeg") {
		const buf = await generateJpg(options);
		await writeFile(outputPath, buf);
	} else if (ext === ".webp") {
		const buf = await generateWebp(options);
		await writeFile(outputPath, buf);
	} else {
		const rawSvg = await generateRawSvg(options);
		await writeFile(outputPath, rawSvg);
	}

	console.log(`Generated logo saved to ${outputPath}`);
} catch (error) {
	console.error(
		"Error:",
		error instanceof Error ? error.message : String(error),
	);
	process.exit(1);
}
