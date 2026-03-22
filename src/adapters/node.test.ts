import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateJpg, generatePng, generateWebp } from "./node";

// core モジュールをモック
vi.mock("../core", () => ({
	generateRawSvg: vi.fn(),
}));

// シンプルな 10x10 の SVG（sharp が変換できる最小限のもの）
const SIMPLE_SVG =
	'<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect width="10" height="10" fill="red"/></svg>';

// vi.mocked を使うため遅延 import
let mockGenerateRawSvg: ReturnType<typeof vi.fn>;

beforeEach(async () => {
	const core = await import("../core");
	mockGenerateRawSvg = vi.mocked(core.generateRawSvg);
	vi.clearAllMocks();
});

// ── PNG ──────────────────────────────────────────────────────────────────────
describe("generatePng", () => {
	it("有効な SVG から PNG バッファを返す", async () => {
		mockGenerateRawSvg.mockResolvedValueOnce(SIMPLE_SVG);
		const buf = await generatePng({ text: "TS" });

		// PNG マジックバイト: 89 50 4E 47 (‰PNG)
		expect(buf[0]).toBe(0x89);
		expect(buf[1]).toBe(0x50); // P
		expect(buf[2]).toBe(0x4e); // N
		expect(buf[3]).toBe(0x47); // G
	});

	it("返り値は Buffer インスタンス", async () => {
		mockGenerateRawSvg.mockResolvedValueOnce(SIMPLE_SVG);
		const buf = await generatePng({ text: "TS" });
		expect(buf).toBeInstanceOf(Buffer);
	});

	it("core が Error をスローした場合は伝搬する", async () => {
		mockGenerateRawSvg.mockRejectedValueOnce(
			new Error("Text must not be empty."),
		);
		await expect(generatePng({ text: "" })).rejects.toThrow(
			"Text must not be empty.",
		);
	});
});

// ── JPEG ─────────────────────────────────────────────────────────────────────
describe("generateJpg", () => {
	it("有効な SVG から JPEG バッファを返す", async () => {
		mockGenerateRawSvg.mockResolvedValueOnce(SIMPLE_SVG);
		const buf = await generateJpg({ text: "TS" });

		// JPEG SOI マジックバイト: FF D8
		expect(buf[0]).toBe(0xff);
		expect(buf[1]).toBe(0xd8);
	});

	it("quality パラメータを指定しても正常に返す", async () => {
		mockGenerateRawSvg.mockResolvedValueOnce(SIMPLE_SVG);
		const buf = await generateJpg({ text: "TS" }, 80);
		expect(buf).toBeInstanceOf(Buffer);
	});

	it("core が Error をスローした場合は伝搬する", async () => {
		mockGenerateRawSvg.mockRejectedValueOnce(
			new Error("Text must not be empty."),
		);
		await expect(generateJpg({ text: "" })).rejects.toThrow(
			"Text must not be empty.",
		);
	});
});

// ── WebP ─────────────────────────────────────────────────────────────────────
describe("generateWebp", () => {
	it("有効な SVG から WebP バッファを返す", async () => {
		mockGenerateRawSvg.mockResolvedValueOnce(SIMPLE_SVG);
		const buf = await generateWebp({ text: "TS" });

		// WebP マジックバイト: 52 49 46 46 (RIFF)
		expect(buf[0]).toBe(0x52); // R
		expect(buf[1]).toBe(0x49); // I
		expect(buf[2]).toBe(0x46); // F
		expect(buf[3]).toBe(0x46); // F
	});

	it("quality パラメータを指定しても正常に返す", async () => {
		mockGenerateRawSvg.mockResolvedValueOnce(SIMPLE_SVG);
		const buf = await generateWebp({ text: "TS" }, 75);
		expect(buf).toBeInstanceOf(Buffer);
	});

	it("core が Error をスローした場合は伝搬する", async () => {
		mockGenerateRawSvg.mockRejectedValueOnce(
			new Error("Text must not be empty."),
		);
		await expect(generateWebp({ text: "" })).rejects.toThrow(
			"Text must not be empty.",
		);
	});
});
