import {
  DEFAULT_SIZE,
  DEFAULT_TEXT_COLOR,
  DEFAULT_FONT_SOURCE,
  DEFAULT_FONT_WEIGHT,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_BG_COLOR,
} from "./constants";
import type { LogoOptions, SVGNode } from "./types";
import { validateOptions } from "./validater";

export function getSvgNode(options: LogoOptions): SVGNode {
  validateOptions(options);
  const id = Math.random().toString(16).substring(2, 10);
  const size = options.size ?? DEFAULT_SIZE;
  const bgColor = options.backgroundColor ?? DEFAULT_BG_COLOR;
  const fontSize = options.fontSize ?? Math.round(size * 0.525);
  const fontWeight = options.fontWeight ?? DEFAULT_FONT_WEIGHT;
  const lineHeight = options.lineHeight ?? DEFAULT_LINE_HEIGHT;
  const fontSource = options.fontSource ?? DEFAULT_FONT_SOURCE;

  const gradients: SVGNode[] = [];

  if (fontSource) {
    gradients.push({
      tag: "style",
      children: [
        `@font-face { font-family: "font-${id}"; font-weight: 100 900; src: url(${fontSource}) format("woff2"); }`,
      ],
    });
  }

  if (Array.isArray(bgColor)) {
    gradients.push({
      tag: "linearGradient",
      attrs: {
        id: `bgGradient-${id}`,
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "0%",
      },
      children: bgColor.map((color, index) => ({
        tag: "stop",
        attrs: {
          offset: `${(index / (bgColor.length - 1)) * 100}%`,
          "stop-color": color,
        },
        children: [],
      })),
    });
  }

  if (Array.isArray(options.textColor)) {
    gradients.push({
      tag: "linearGradient",
      attrs: {
        id: `textGradient-${id}`,
        x1: "0%",
        y1: "0%",
        x2: "100%",
        y2: "0%",
      },
      children: options.textColor.map((color, index) => ({
        tag: "stop",
        attrs: {
          offset: `${(index / (options.textColor!.length - 1)) * 100}%`,
          "stop-color": color,
        },
        children: [],
      })),
    });
  }

  const defs: SVGNode = {
    tag: "defs",
    attrs: {},
    children: gradients,
  };

  const bgRect: SVGNode = {
    tag: "rect",
    attrs: {
      width: size.toString(),
      height: size.toString(),
      fill: Array.isArray(bgColor) ? `url(#bgGradient-${id})` : bgColor,
    },
    children: [],
  };

  const textNode: SVGNode = {
    tag: "text",
    attrs: {
      x: (size * 0.9375).toString(),
      y: (size * 0.9125).toString(),
      "text-anchor": "end",
      "font-family": `font-${id}`,
      "font-size": fontSize.toString(),
      "font-weight": fontWeight.toString(),
      "line-height": lineHeight.toString(),
      fill: Array.isArray(options.textColor)
        ? `url(#textGradient-${id})`
        : options.textColor ?? DEFAULT_TEXT_COLOR,
    },
    children: [options.text],
  };

  return {
    tag: "svg",
    attrs: {
      xmlns: "http://www.w3.org/2000/svg",
      width: size.toString(),
      height: size.toString(),
      viewBox: `0 0 ${size} ${size}`,
    },
    children: [defs, bgRect, textNode],
  };
}

export function buildRawSVG(svg: SVGNode): string {
  const { tag, attrs, children } = svg;

  const attrString = attrs
    ? Object.entries(attrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ")
    : "";

  const openingTag = attrString ? `<${tag} ${attrString}>` : `<${tag}>`;

  const childrenString = children
    ? children
        .map((child) =>
          typeof child === "string" ? child : buildRawSVG(child as SVGNode)
        )
        .join("")
    : "";

  const closingTag = `</${tag}>`;

  return `${openingTag}${childrenString}${closingTag}`;
}

export function buildSVGElement(svg: SVGNode): SVGElement {
  if (typeof document === "undefined") {
    throw new Error(
      "Document is not defined. This function can only be used in a browser environment."
    );
  }

  const { tag, attrs, children } = svg;
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        element.setAttribute(key, String(value));
      }
    });
  }

  if (children) {
    children.forEach((child) => {
      if (typeof child === "string") {
        element.textContent = child;
      } else {
        element.appendChild(buildSVGElement(child));
      }
    });
  }

  return element;
}
