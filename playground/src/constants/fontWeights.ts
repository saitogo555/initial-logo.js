export const FONT_WEIGHTS = [
	100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export type FontWeight = (typeof FONT_WEIGHTS)[number];

export const WEIGHT_LABELS: Record<FontWeight, string> = {
	100: "Thin",
	200: "ExtraLight",
	300: "Light",
	400: "Regular",
	500: "Medium",
	600: "SemiBold",
	700: "Bold",
	800: "ExtraBold",
	900: "Black",
};
