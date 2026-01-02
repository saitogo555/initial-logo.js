import {
  generateLogo,
  generateSvgElement,
  generateSvgDataUrl,
  generateRawSvg,
} from "../src";
import type { LogoOptions } from "../src";

// 基本的な例
const basicOptions: LogoOptions = {
  text: "TS",
  size: 100,
  textColor: "#ffffff",
  lineHeight: 0.75,
  backgroundColor: "#3178c6",
};

// サイズ違い
const largeOptions: LogoOptions = {
  text: "JS",
  size: 150,
  textColor: "#000000",
  backgroundColor: "#f7df1e",
};

// グラデーション背景
const gradientBgOptions: LogoOptions = {
  text: "GR",
  size: 120,
  textColor: "#ffffff",
  backgroundColor: ["#667eea", "#764ba2"],
};

// グラデーションテキスト
const gradientTextOptions: LogoOptions = {
  text: "TX",
  size: 120,
  textColor: ["#f093fb", "#f5576c"],
  backgroundColor: "#1a1a2e",
};

// 両方グラデーション
const bothGradientOptions: LogoOptions = {
  text: "BG",
  size: 120,
  textColor: ["#4facfe", "#00f2fe"],
  backgroundColor: ["#43e97b", "#38f9d7"],
};

// カスタムフォント
const customFontOptions: LogoOptions = {
  text: "CF",
  size: 120,
  textColor: "#ffffff",
  backgroundColor: "#000000",
  fontSource:
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap",
  fontFamily: "'Noto Sans JP', sans-serif",
  fontWeight: 900,
};

const allOptions = [
  basicOptions,
  largeOptions,
  gradientBgOptions,
  gradientTextOptions,
  bothGradientOptions,
  customFontOptions,
];

// 1. HTMLDivElement
const divContainer = document.querySelector(".div-container");
if (divContainer) {
  for (const opts of allOptions) {
    divContainer.appendChild(generateLogo(opts));
  }
}

// 2. SVGElement
const svgContainer = document.querySelector(".svg-container");
if (svgContainer) {
  for (const opts of allOptions) {
    svgContainer.appendChild(generateSvgElement(opts));
  }
}

// 3. SVG Data URL
const dataUrlContainer = document.querySelector(".dataurl-container");
if (dataUrlContainer) {
  for (const opts of allOptions) {
    const dataUrl = generateSvgDataUrl(opts);
    const img = document.createElement("img");
    img.src = dataUrl;
    img.alt = `Logo: ${opts.text}`;
    img.style.display = "block";
    dataUrlContainer.appendChild(img);
  }
}

// 4. Raw SVG String
const rawSvgDisplay = document.querySelector(".raw-svg-display");
if (rawSvgDisplay) {
  for (const opts of allOptions) {
    const rawSvg = generateRawSvg(opts);
    const wrapper = document.createElement("div");
    wrapper.className = "raw-svg-item";

    const label = document.createElement("h3");
    label.textContent = `Logo: ${opts.text}`;

    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = rawSvg;
    pre.appendChild(code);

    const preview = document.createElement("div");
    preview.className = "raw-svg-preview";
    preview.innerHTML = rawSvg;

    wrapper.appendChild(label);
    wrapper.appendChild(preview);
    wrapper.appendChild(pre);
    rawSvgDisplay.appendChild(wrapper);
  }
}