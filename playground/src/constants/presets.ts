import type { GradientType } from "../../../src/types";

export interface Preset {
	id: string;
	label: string;
	shortLabel: string;
	text: string;
	bgColors: string[];
	bgGradient: boolean;
	bgGradientType?: GradientType;
	textColors: string[];
	textGradient: boolean;
	textGradientType?: GradientType;
	fontWeight: number;
	borderRadius?: number;
}

export const PRESETS: Preset[] = [
	{
		id: "js",
		label: "JavaScript",
		shortLabel: "JS",
		text: "JS",
		bgColors: ["#F7DF1E"],
		bgGradient: false,
		textColors: ["#000000"],
		textGradient: false,
		fontWeight: 700,
	},
	{
		id: "ts",
		label: "TypeScript",
		shortLabel: "TS",
		text: "TS",
		bgColors: ["#3178C6"],
		bgGradient: false,
		textColors: ["#FFFFFF"],
		textGradient: false,
		fontWeight: 700,
	},
	{
		id: "react",
		label: "React",
		shortLabel: "React",
		text: "Re",
		bgColors: ["#20232A"],
		bgGradient: false,
		textColors: ["#61DAFB"],
		textGradient: false,
		fontWeight: 700,
	},
	{
		id: "vue",
		label: "Vue",
		shortLabel: "Vue",
		text: "Vu",
		bgColors: ["#42B883"],
		bgGradient: false,
		textColors: ["#FFFFFF"],
		textGradient: false,
		fontWeight: 700,
	},
	{
		id: "node",
		label: "Node.js",
		shortLabel: "Node",
		text: "No",
		bgColors: ["#339933"],
		bgGradient: false,
		textColors: ["#FFFFFF"],
		textGradient: false,
		fontWeight: 700,
	},
	{
		id: "python",
		label: "Python",
		shortLabel: "Python",
		text: "Py",
		bgColors: ["#3776AB"],
		bgGradient: false,
		textColors: ["#FFD342"],
		textGradient: false,
		fontWeight: 700,
	},
	{
		id: "go",
		label: "Go",
		shortLabel: "Go",
		text: "Go",
		bgColors: ["#00ADD8"],
		bgGradient: false,
		textColors: ["#FFFFFF"],
		textGradient: false,
		fontWeight: 700,
	},
	{
		id: "rust",
		label: "Rust",
		shortLabel: "Rust",
		text: "Rs",
		bgColors: ["#1C1C1C"],
		bgGradient: false,
		textColors: ["#E57324"],
		textGradient: false,
		fontWeight: 700,
	},
];
