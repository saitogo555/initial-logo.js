import { buildRawSVG, buildSvgNode } from "./svg";
import type { LogoOptions } from "./types";
import { validateOptions } from "./validator";

export async function generateRawSvg(options: LogoOptions): Promise<string> {
	validateOptions(options);
	const svg = await buildSvgNode(options);
	return buildRawSVG(svg);
}
