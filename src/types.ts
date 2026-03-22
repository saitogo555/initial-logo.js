// ---------------------------------------------------------------------------
// Logo Options
// ---------------------------------------------------------------------------

export type TextAnchorPosition =
	| "top-left"
	| "top"
	| "top-right"
	| "left"
	| "center"
	| "right"
	| "bottom-left"
	| "bottom"
	| "bottom-right";

export type GradientType = "linear" | "radial";

export interface LogoOptions {
	size?: number;
	text: string;
	textColor?: string | string[];
	textGradientType?: GradientType;
	fontSource?: string | ArrayBuffer;
	fontSize?: number;
	fontWeight?: number | string;
	backgroundColor?: string | string[];
	backgroundGradientType?: GradientType;
	borderRadius?: number;
	textAnchor?: TextAnchorPosition;
}

export type NumberProp = string | number;

export interface SVGCoreAttrs {
	id?: string;
	class?: string;
	style?: string;
	lang?: string;
	tabindex?: number;
	[key: string]: unknown;
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

export interface SVGPathAttrs extends SVGBaseAttrs {
	d?: string;
}

export type SVGTagMap = {
	svg: SVGSVGAttrs;
	rect: SVGRectAttrs;
	path: SVGPathAttrs;
	g: SVGBaseAttrs;
	text: SVGTextAttrs;
	defs: SVGCoreAttrs;
	clipPath: SVGCoreAttrs;
	linearGradient: SVGLinearGradientAttrs;
	radialGradient: SVGRadialGradientAttrs;
	stop: SVGStopAttrs;
};

export type SVGTagName = keyof SVGTagMap | "style";

export interface SVGNode<T extends SVGTagName = SVGTagName> {
	tag: T;
	attrs?: T extends keyof SVGTagMap ? SVGTagMap[T] : SVGCoreAttrs;
	children?: (SVGNode | string)[];
}
