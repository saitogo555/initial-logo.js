import type { LogoOptions } from "./types";

const DEFAULT_SIZE = 100;
const DEFAULT_TEXT_COLOR = "#ffffff";
const DEFAULT_FONT_SOURCE =
  "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap";
const DEFAULT_FONT_FAMILY = "Inconsolata, monospace";
const DEFAULT_FONT_WEIGHT = "bold";
const DEFAULT_LINE_HEIGHT = 1;
const DEFAULT_BG_COLOR = "#000000";

function validateOptions(options: LogoOptions): void {
  if (options.text.length !== 2) {
    throw new Error("Text must be exactly 2 characters.");
  }
}

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

function loadFont(source: string): void {
  if (typeof document === "undefined") return;

  const existingLink = document.querySelector(`link[href="${source}"]`);
  if (existingLink) return;

  const link = document.createElement("link");
  link.href = source;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

function getTextStyle(options: LogoOptions): Partial<CSSStyleDeclaration> {
  const size = options.size ?? DEFAULT_SIZE;
  const textColor = options.textColor ?? DEFAULT_TEXT_COLOR;
  const fontFamily = options.fontFamily ?? DEFAULT_FONT_FAMILY;
  const fontSize = options.fontSize ?? Math.round(size * 0.65);
  const fontWeight = options.fontWeight ?? DEFAULT_FONT_WEIGHT;
  const lineHeight = options.lineHeight ?? DEFAULT_LINE_HEIGHT;
  const style: Partial<CSSStyleDeclaration> = {
    fontFamily: fontFamily,
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
  loadFont(options.fontSource ?? DEFAULT_FONT_SOURCE);

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
