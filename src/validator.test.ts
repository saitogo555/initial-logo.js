import { describe, expect, it } from "vitest";
import { validateOptions } from "./validator";

describe("validateOptions", () => {
	// --- 空文字 ---
	it("空文字はスローしない（背景のみ表示）", () => {
		expect(() => validateOptions({ text: "" })).not.toThrow();
	});

	// --- 1 文字 ---
	it("1 文字は有効（スローしない）", () => {
		expect(() => validateOptions({ text: "T" })).not.toThrow();
	});

	// --- 2 文字 ---
	it("2 文字は有効", () => {
		expect(() => validateOptions({ text: "TS" })).not.toThrow();
	});

	// --- 3 文字以上 (上限超え) ---
	it("3 文字以上は Error をスローする", () => {
		expect(() => validateOptions({ text: "ABC" })).toThrow();
	});

	it("上限ちょうど (2 文字) は有効", () => {
		expect(() => validateOptions({ text: "AB" })).not.toThrow();
	});

	// --- 長すぎる文字列 ---
	it("長い文字列は '2' に言及したエラーをスローする", () => {
		expect(() => validateOptions({ text: "initial-logo" })).toThrow(/2/);
	});

	// --- 日本語 ---
	it("2 文字の日本語は有効", () => {
		expect(() => validateOptions({ text: "テス" })).not.toThrow();
	});

	it("日本語 1 文字は有効", () => {
		expect(() => validateOptions({ text: "日" })).not.toThrow();
	});

	it("全角文字 2 文字は有効", () => {
		expect(() => validateOptions({ text: "あい" })).not.toThrow();
	});

	it("全角文字 3 文字以上はエラー", () => {
		expect(() => validateOptions({ text: "あいうえお" })).toThrow();
	});

	// --- 絵文字 ---
	it("サロゲートペア絵文字 1 つは 1 グラフェム → 有効", () => {
		// "🎉" は UTF-16 length=2 だが Intl.Segmenter では 1 グラフェム
		expect(() => validateOptions({ text: "🎉" })).not.toThrow();
	});

	it("スキントーン付き絵文字は 1 グラフェム → 有効", () => {
		// "👋🏻" はコードポイント 2 つだが Intl.Segmenter では 1 グラフェム
		expect(() => validateOptions({ text: "👋🏻" })).not.toThrow();
	});

	it("絵文字 2 つは有効", () => {
		expect(() => validateOptions({ text: "🎉🚀" })).not.toThrow();
	});

	// --- 異常なサイズ指定 ---
	it("size=0 は size に言及したエラーをスローする", () => {
		expect(() => validateOptions({ text: "TS", size: 0 })).toThrow(/size/i);
	});

	it("size=-1 は Error をスローする", () => {
		expect(() => validateOptions({ text: "TS", size: -1 })).toThrow();
	});

	it("size=Infinity は Error をスローする", () => {
		expect(() =>
			validateOptions({ text: "TS", size: Number.POSITIVE_INFINITY }),
		).toThrow();
	});

	it("size=NaN は Error をスローする", () => {
		expect(() => validateOptions({ text: "TS", size: Number.NaN })).toThrow();
	});

	it("size=100 は有効", () => {
		expect(() => validateOptions({ text: "TS", size: 100 })).not.toThrow();
	});

	it("size を指定しない場合は有効", () => {
		expect(() => validateOptions({ text: "TS" })).not.toThrow();
	});

	// --- エラーメッセージの品質確認 ---
	it("長い文字列エラーのメッセージは非空文字列", () => {
		try {
			validateOptions({ text: "TOOLONG" });
		} catch (e) {
			expect(e).toBeInstanceOf(Error);
			expect((e as Error).message.length).toBeGreaterThan(0);
		}
	});
});
