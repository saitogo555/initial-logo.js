import { describe, expect, it } from "vitest";
import { buildRawSVG } from "./svg";
import type { SVGNode } from "./types";

describe("buildRawSVG", () => {
	it("属性なし要素を正しく構築する", () => {
		const node: SVGNode<"defs"> = { tag: "defs", children: [] };
		expect(buildRawSVG(node)).toBe("<defs></defs>");
	});

	it("属性を持つ要素を正しく構築する", () => {
		const node: SVGNode<"rect"> = {
			tag: "rect",
			attrs: { width: "100", height: "100", fill: "#3178c6" },
			children: [],
		};
		expect(buildRawSVG(node)).toBe(
			'<rect width="100" height="100" fill="#3178c6"></rect>',
		);
	});

	it("テキスト子要素を持つ要素を正しく構築する", () => {
		const node: SVGNode<"text"> = {
			tag: "text",
			children: ["TS"],
		};
		expect(buildRawSVG(node)).toBe("<text>TS</text>");
	});

	it("ネストした子要素を正しく構築する", () => {
		const child: SVGNode<"rect"> = {
			tag: "rect",
			attrs: { width: "50", height: "50" },
			children: [],
		};
		const parent: SVGNode<"g"> = {
			tag: "g",
			children: [child],
		};
		expect(buildRawSVG(parent)).toBe(
			'<g><rect width="50" height="50"></rect></g>',
		);
	});

	it("属性値の & をエスケープする", () => {
		const node: SVGNode<"rect"> = {
			tag: "rect",
			attrs: { id: "a&b" },
			children: [],
		};
		expect(buildRawSVG(node)).toContain('id="a&amp;b"');
	});

	it('属性値の " をエスケープする', () => {
		const node: SVGNode<"rect"> = {
			tag: "rect",
			attrs: { id: 'say "hi"' },
			children: [],
		};
		expect(buildRawSVG(node)).toContain('id="say &quot;hi&quot;"');
	});

	it("属性値の < > をエスケープする", () => {
		const node: SVGNode<"rect"> = {
			tag: "rect",
			attrs: { id: "<foo>" },
			children: [],
		};
		const result = buildRawSVG(node);
		expect(result).toContain("&lt;");
		expect(result).toContain("&gt;");
	});

	it("テキスト内の & < > をエスケープする", () => {
		const node: SVGNode<"text"> = {
			tag: "text",
			children: ["<a&b>"],
		};
		const result = buildRawSVG(node);
		expect(result).toContain("&lt;");
		expect(result).toContain("&amp;");
		expect(result).toContain("&gt;");
	});

	it("children が undefined でも正しく動作する", () => {
		const node: SVGNode<"rect"> = {
			tag: "rect",
			attrs: { width: "10" },
		};
		expect(buildRawSVG(node)).toBe('<rect width="10"></rect>');
	});

	it("SVG ルート要素を正しく構築する", () => {
		const node: SVGNode<"svg"> = {
			tag: "svg",
			attrs: {
				xmlns: "http://www.w3.org/2000/svg",
				width: "100",
				height: "100",
				viewBox: "0 0 100 100",
			},
			children: [],
		};
		const result = buildRawSVG(node);
		expect(result).toMatch(/^<svg /);
		expect(result).toContain('xmlns="http://www.w3.org/2000/svg"');
		expect(result).toContain('width="100"');
		expect(result).toContain('height="100"');
		expect(result).toContain('viewBox="0 0 100 100"');
		expect(result).toMatch(/<\/svg>$/);
	});

	it("数値属性も文字列に変換される", () => {
		const node: SVGNode<"rect"> = {
			tag: "rect",
			attrs: { width: 100, height: 100 },
			children: [],
		};
		expect(buildRawSVG(node)).toContain('width="100"');
		expect(buildRawSVG(node)).toContain('height="100"');
	});

	it("linearGradient の stop 要素をネストして構築する", () => {
		const node: SVGNode<"linearGradient"> = {
			tag: "linearGradient",
			attrs: { id: "grad1", x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
			children: [
				{
					tag: "stop",
					attrs: { offset: "0%", "stop-color": "#000" },
					children: [],
				},
				{
					tag: "stop",
					attrs: { offset: "100%", "stop-color": "#fff" },
					children: [],
				},
			],
		};
		const result = buildRawSVG(node);
		expect(result).toContain('id="grad1"');
		expect(result).toContain("<stop");
		expect(result).toContain('stop-color="#000"');
		expect(result).toContain('stop-color="#fff"');
	});
});
