import sharp from "sharp";
import { generateRawSvg } from "../core";
import type { LogoOptions } from "../types";

export async function generatePng(options: LogoOptions): Promise<Buffer> {
	const rawSvg = await generateRawSvg(options);
	return sharp(Buffer.from(rawSvg)).png().toBuffer();
}

export async function generateJpg(
	options: LogoOptions,
	quality = 90,
): Promise<Buffer> {
	const rawSvg = await generateRawSvg(options);
	return sharp(Buffer.from(rawSvg)).jpeg({ quality }).toBuffer();
}

export async function generateWebp(
	options: LogoOptions,
	quality = 90,
): Promise<Buffer> {
	const rawSvg = await generateRawSvg(options);
	return sharp(Buffer.from(rawSvg)).webp({ quality }).toBuffer();
}
