import type { LogoOptions } from "./types";

const MAX_GRAPHEMES = 2;

/** Intl.Segmenter でグラフェム（見た目の文字）単位で文字数を数える */
function countGraphemes(text: string): number {
	return [...new Intl.Segmenter().segment(text)].length;
}

export function validateOptions(options: LogoOptions): void {
	const len = countGraphemes(options.text);

	if (len > MAX_GRAPHEMES) {
		throw new Error(
			`Text must be ${MAX_GRAPHEMES} characters or fewer (got ${len}).`,
		);
	}

	if (
		options.size !== undefined &&
		(options.size <= 0 || !Number.isFinite(options.size))
	) {
		throw new Error("Size must be a positive finite number.");
	}
}
