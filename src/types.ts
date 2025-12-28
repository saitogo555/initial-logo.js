export interface LogoOptions {
  size?: number;
  text: string;
  textColor?: string | string[];
  fontSource?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  lineHeight?: string | number;
  backgroundColor?: string | string[];
}

export type NumberProp = string | number;

export interface SVGCoreAttrs {
  id?: string;
  class?: string;
  style?: string;
  lang?: string;
  tabindex?: number;
  [key: string]: any; // Allow custom attributes
}

export interface SVGPresentationAttrs {
  transform?: string;
  fill?: string;
  stroke?: string;
  "stroke-width"?: NumberProp;
  "stroke-linecap"?: "butt" | "round" | "square";
  "stroke-linejoin"?: "miter" | "round" | "bevel";
  opacity?: NumberProp;
  "fill-opacity"?: NumberProp;
  "stroke-opacity"?: NumberProp;
  visibility?: "visible" | "hidden" | "collapse";
  display?: string;
}

export interface SVGBaseAttrs extends SVGCoreAttrs, SVGPresentationAttrs {}

export interface SVGSVGAttrs extends SVGBaseAttrs {
  viewBox?: string;
  width?: NumberProp;
  height?: NumberProp;
  x?: NumberProp;
  y?: NumberProp;
  xmlns?: string;
}

export interface SVGRectAttrs extends SVGBaseAttrs {
  x?: NumberProp;
  y?: NumberProp;
  width?: NumberProp;
  height?: NumberProp;
  rx?: NumberProp;
  ry?: NumberProp;
}

export interface SVGTextAttrs extends SVGBaseAttrs {
  x?: NumberProp;
  y?: NumberProp;
  dx?: NumberProp;
  dy?: NumberProp;
  "text-anchor"?: "start" | "middle" | "end";
  "font-family"?: string;
  "font-size"?: NumberProp;
  "font-weight"?: string | number;
}

export interface SVGStopAttrs extends SVGCoreAttrs {
  offset: NumberProp;
  "stop-color"?: string;
  "stop-opacity"?: NumberProp;
}

export interface SVGGradientBaseAttrs extends SVGCoreAttrs {
  gradientUnits?: "userSpaceOnUse" | "objectBoundingBox";
  gradientTransform?: string;
  spreadMethod?: "pad" | "reflect" | "repeat";
  href?: string;
}

export interface SVGLinearGradientAttrs extends SVGGradientBaseAttrs {
  x1?: NumberProp;
  y1?: NumberProp;
  x2?: NumberProp;
  y2?: NumberProp;
}

export interface SVGRadialGradientAttrs extends SVGGradientBaseAttrs {
  cx?: NumberProp;
  cy?: NumberProp;
  r?: NumberProp;
  fx?: NumberProp;
  fy?: NumberProp;
  fr?: NumberProp;
}

export type SVGTagMap = {
  svg: SVGSVGAttrs;
  rect: SVGRectAttrs;
  text: SVGTextAttrs;
  defs: SVGCoreAttrs; // defs usually doesn't have presentation attributes itself
  linearGradient: SVGLinearGradientAttrs;
  radialGradient: SVGRadialGradientAttrs;
  stop: SVGStopAttrs;
};

export type SVGTagName = keyof SVGTagMap;

export interface SVGNode<T extends SVGTagName = SVGTagName> {
  tag: T;
  attrs?: SVGTagMap[T];
  children?: (SVGNode | string)[];
}
