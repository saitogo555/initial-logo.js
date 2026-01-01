import {
  DEFAULT_BG_COLOR,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_SIZE,
  DEFAULT_TEXT_COLOR,
} from "./constants";
import { buildSVG, buildSVGElement, getSvgNode } from "./svg";
import type { LogoOptions } from "./types";
import { validateOptions } from "./validater";

function getGradientStyle(colors: string[]): string {
  return `linear-gradient(90deg, ${colors.join(", ")})`;
}

function getContainerStyle(options: LogoOptions): Partial<CSSStyleDeclaration> {
  const size = options.size ?? DEFAULT_SIZE;
  const backgroundColor = options.backgroundColor ?? DEFAULT_BG_COLOR;
  const style: Partial<CSSStyleDeclaration> = {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: `${size}px`,
    height: `${size}px`,
  };

  if (Array.isArray(backgroundColor)) {
    style.backgroundImage = getGradientStyle(backgroundColor);
  } else {
    style.backgroundColor = backgroundColor;
  }

  return style;
}

function getTextStyle(options: LogoOptions): Partial<CSSStyleDeclaration> {
  const size = options.size ?? DEFAULT_SIZE;
  const textColor = options.textColor ?? DEFAULT_TEXT_COLOR;
  const fontSize = options.fontSize ?? Math.round(size * 0.65);
  const fontWeight = options.fontWeight ?? DEFAULT_FONT_WEIGHT;
  const lineHeight = options.lineHeight ?? DEFAULT_LINE_HEIGHT;
  const style: Partial<CSSStyleDeclaration> = {
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight.toString(),
    lineHeight: lineHeight.toString(),
  };

  if (Array.isArray(textColor)) {
    style.backgroundImage = getGradientStyle(textColor);
    style.backgroundClip = "text";
    style.color = "transparent";
  } else {
    style.color = textColor;
  }

  return style;
}

export function generateLogo(options: LogoOptions): HTMLDivElement {
  validateOptions(options);

  const containerElement = document.createElement("div");
  const textElement = document.createElement("span");
  const containerStyles = getContainerStyle(options);
  const textStyles = getTextStyle(options);

  Object.assign(containerElement.style, containerStyles);
  Object.assign(textElement.style, textStyles);
  textElement.textContent = options.text;
  containerElement.appendChild(textElement);

  return containerElement;
}

export function generateSvg(options: LogoOptions): string {
  const svg = getSvgNode(options);
  return buildSVG(svg);
}

export function generateSvgDataUrl(options: LogoOptions): string {
  const svgNode = getSvgNode(options);
  const rawSvg = buildSVG(svgNode);
  const encodedSvg = encodeURIComponent(rawSvg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");

  return `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
}

export function generateSvgElement(options: LogoOptions): SVGElement {
  const svg = getSvgNode(options);
  return buildSVGElement(svg);
}
