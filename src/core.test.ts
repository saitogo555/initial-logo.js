import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateRawSvg } from "./core";

// font モジュールをモック → ネットワーク不要でグリフを返す
vi.mock("./font", () => ({
	buildGlyphPaths: vi.fn().mockResolvedValue([
		{
			pathData: "M0 0L10 0L10 10Z",
			transform: "translate(10,50) scale(0.05,-0.05)",
		},
	]),
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe("generateRawSvg", () => {
	// --- バリデーションエラー ---
	it("空文字は SVG を返す（背景のみ）", async () => {
		const svg = await generateRawSvg({ text: "" });
		expect(svg).toContain("<svg");
	});

	it("長すぎる文字列は Error をスローする", async () => {
		await expect(generateRawSvg({ text: "TOOLONGSTRING" })).rejects.toThrow();
	});

	it("size=0 は Error をスローする", async () => {
		await expect(generateRawSvg({ text: "TS", size: 0 })).rejects.toThrow(
			/size/i,
		);
	});

	it("size=-100 は Error をスローする", async () => {
		await expect(generateRawSvg({ text: "TS", size: -100 })).rejects.toThrow();
	});

	it("size=Infinity は Error をスローする", async () => {
		await expect(
			generateRawSvg({ text: "TS", size: Number.POSITIVE_INFINITY }),
		).rejects.toThrow();
	});

	// --- 1 文字 ---
	it("1 文字で SVG 文字列を返す", async () => {
		const svg = await generateRawSvg({ text: "T" });
		expect(svg).toContain("<svg");
		expect(svg).toContain("</svg>");
	});

	// --- 2 文字 ---
	it("2 文字で SVG 文字列を返す", async () => {
		const svg = await generateRawSvg({ text: "TS" });
		expect(svg).toContain("<svg");
	});

	// --- 日本語 ---
	it("日本語 2 文字で SVG 文字列を返す", async () => {
		const svg = await generateRawSvg({ text: "テス" });
		expect(svg).toContain("<svg");
	});

	// --- 絵文字 ---
	it("絵文字で SVG 文字列を返す", async () => {
		const svg = await generateRawSvg({ text: "🎉" });
		expect(svg).toContain("<svg");
	});

	it("スキントーン付き絵文字で SVG 文字列を返す", async () => {
		const svg = await generateRawSvg({ text: "👋🏻" });
		expect(svg).toContain("<svg");
	});

	// --- 明示的な色指定 ---
	it("明示的な textColor が SVG の fill に反映される", async () => {
		const svg = await generateRawSvg({
			text: "TS",
			textColor: "#ff0000",
			backgroundColor: "#000000",
		});
		expect(svg).toContain("#ff0000");
	});

	it("明示的な backgroundColor が SVG に反映される", async () => {
		const svg = await generateRawSvg({
			text: "TS",
			backgroundColor: "#3178c6",
		});
		expect(svg).toContain("#3178c6");
	});

	// --- 自動色（デフォルト）生成 ---
	it("色未指定でもデフォルト色のSVGを返す", async () => {
		const svg = await generateRawSvg({ text: "TS" });
		// デフォルト bgColor=#000000, textColor=#ffffff
		expect(svg).toContain("#000000");
		expect(svg).toContain("#ffffff");
	});

	// --- グラデーション ---
	it("配列 backgroundColor で linearGradient が生成される", async () => {
		const svg = await generateRawSvg({
			text: "TS",
			backgroundColor: ["#000000", "#ffffff"],
		});
		expect(svg).toContain("linearGradient");
		expect(svg).toContain("bgGradient-");
	});

	it("配列 textColor で textGradient が生成される", async () => {
		const svg = await generateRawSvg({
			text: "TS",
			textColor: ["#ff0000", "#0000ff"],
		});
		expect(svg).toContain("linearGradient");
		expect(svg).toContain("textGradient-");
	});

	// --- SVG 必須属性の確認 ---
	it("出力SVGは xmlns, width, height, viewBox を持つ", async () => {
		const svg = await generateRawSvg({ text: "TS", size: 100 });
		expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
		expect(svg).toContain('width="100"');
		expect(svg).toContain('height="100"');
		expect(svg).toContain('viewBox="0 0 100 100"');
	});

	// --- 出力の決定性 (同一入力→同一出力) ---
	it("同じ入力を 2 回呼ぶと全く同じ SVG を返す", async () => {
		const opts = {
			text: "TS",
			size: 100,
			textColor: "#ffffff",
			backgroundColor: "#3178c6",
		};
		const [a, b] = await Promise.all([
			generateRawSvg(opts),
			generateRawSvg(opts),
		]);
		expect(a).toBe(b);
	});

	it("背景色が違うと異なる SVG が生成される", async () => {
		const [a, b] = await Promise.all([
			generateRawSvg({ text: "TS", backgroundColor: "#000000" }),
			generateRawSvg({ text: "TS", backgroundColor: "#ffffff" }),
		]);
		expect(a).not.toBe(b);
	});

	// --- レンダリングエラー (font が throw する場合) ---
	it("font が throw した場合は Error が伝搬する", async () => {
		const { buildGlyphPaths } = await import("./font");
		vi.mocked(buildGlyphPaths).mockRejectedValueOnce(
			new Error("Font load failed"),
		);
		await expect(generateRawSvg({ text: "TS" })).rejects.toThrow(
			"Font load failed",
		);
	});
});
