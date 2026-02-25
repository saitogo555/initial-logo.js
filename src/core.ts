import { buildRawSVG, buildSvgNode } from "./svg";
import type { LogoOptions } from "./types";

/**
 * Generates a raw SVG string from the given logo options.
 *
 * @example
 * const svg = generateRawSvg({ text: "TS", backgroundColor: "#3178c6" });
 * // => '<svg xmlns="http://www.w3.org/2000/svg" ...>...</svg>'
 */
export function generateRawSvg(options: LogoOptions): string {
  const svg = buildSvgNode(options);
  return buildRawSVG(svg);
}
