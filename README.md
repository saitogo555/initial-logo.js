# initial-logo.js

[🇺🇸 English](README.md) | [🇯🇵 日本語](docs/README.ja.md)

![npm version](https://img.shields.io/npm/v/initial-logo)

Generate JavaScript/TypeScript style logos (up to 2 characters inside a square) easily.

## Features

- 🎨 **Customizable**: Change colors, size, fonts, border radius, text anchor, and more.
- 🌈 **Gradients**: Support for linear/radial gradient backgrounds and text.
- 🔤 **Custom Fonts**: Load fonts from any URL or local file (WOFF2/TTF).
- ⚡ **Lightweight**: Zero dependencies for the core logic.
- 🖼️ **Multiple Formats**: Generate SVG strings (core), or PNG/JPG/WEBP via the Node.js adapter.

## Installation

```bash
bun add initial-logo
# or
npm install initial-logo
```

## Usage

### Generate SVG String

```typescript
import { generateRawSvg } from 'initial-logo';

// Basic usage
const svgString = await generateRawSvg({
  text: 'TS',
  size: 100,
  textColor: '#ffffff',
  backgroundColor: '#3178c6',
});

// Use in an <img> tag via data URL
const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
```

### Gradient Example

```typescript
const svgString = await generateRawSvg({
  text: 'GR',
  textColor: ['#ff0000', '#0000ff'],          // linear gradient text
  backgroundColor: ['#222222', '#444444'],    // linear gradient background
  textGradientType: 'linear',                 // 'linear' (default) | 'radial'
  backgroundGradientType: 'linear',
});
```

### Node.js Adapter (PNG / JPG / WEBP)

```typescript
import { generatePng, generateJpg, generateWebp } from 'initial-logo/adapters/node';

const pngBuffer  = await generatePng({ text: 'TS', backgroundColor: '#3178c6' });
const jpgBuffer  = await generateJpg({ text: 'JS', backgroundColor: '#f7df1e' }, 90);
const webpBuffer = await generateWebp({ text: 'DN', backgroundColor: '#000000' }, 90);
```

> The Node.js adapter depends on [sharp](https://sharp.pixelplumbing.com/). It is included in the package dependencies.

## CLI Usage

```bash
# Generate SVG (default output: initial-logo.svg)
npx initial-logo -t TS

# Customize colors and size
npx initial-logo -t JS -s 200 --textColor "#000000" --backgroundColor "#f7df1e" -o js-logo.svg

# Gradient
npx initial-logo -t GR \
  --textColor "#ff0000" --textColor "#0000ff" \
  --backgroundColor "#222222" --backgroundColor "#444444" \
  -o gradient.svg

# Export as PNG
npx initial-logo -t TS -o logo.png

# Rounded corners, custom font weight, text anchor
npx initial-logo -t TS -r 16 -w 700 -a bottom-right -o logo.svg
```

### CLI Options

| Option | Alias | Description | Default |
|---|---|---|---|
| `--text` | `-t` | Logo text — up to 2 graphemes (required) | - |
| `--size` | `-s` | Logo size in pixels | `100` |
| `--output` | `-o` | Output path (`.svg` / `.png` / `.jpg` / `.webp`) | `initial-logo.svg` |
| `--textColor` | `-T` | Text color — repeat for gradient | `#ffffff` |
| `--backgroundColor` | `-B` | Background color — repeat for gradient | `#000000` |
| `--textGradientType` | | Text gradient type: `linear` \| `radial` | `linear` |
| `--bgGradientType` | | Background gradient type: `linear` \| `radial` | `linear` |
| `--fontSource` | `-f` | Font URL or local file path | Raleway 900 (jsDelivr) |
| `--fontSize` | `-F` | Font size in pixels | `Math.round(size * 0.525)` |
| `--fontWeight` | `-w` | Font weight | `900` |
| `--borderRadius` | `-r` | Border radius in pixels | `0` |
| `--textAnchor` | `-a` | Text anchor position (see below) | `center` |
| `--help` | `-h` | Display help message | - |

**`--textAnchor` values**: `top-left` \| `top` \| `top-right` \| `left` \| `center` \| `right` \| `bottom-left` \| `bottom` \| `bottom-right`

## API

### `generateRawSvg(options: LogoOptions): Promise<string>`

Generates a logo as an SVG string. This is the primary export of the core library.

#### `LogoOptions`

| Property | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | **(Required)** | Logo text — up to 2 graphemes (supports emoji, CJK, etc.). |
| `size` | `number` | `100` | Size of the square in pixels. Must be a positive finite number. |
| `textColor` | `string \| string[]` | `'#ffffff'` | Text color. Pass an array of 2+ colors for a gradient. |
| `textGradientType` | `'linear' \| 'radial'` | `'linear'` | Gradient type for text. Applies only when `textColor` is an array. |
| `backgroundColor` | `string \| string[]` | `'#000000'` | Background color. Pass an array of 2+ colors for a gradient. |
| `backgroundGradientType` | `'linear' \| 'radial'` | `'linear'` | Gradient type for background. Applies only when `backgroundColor` is an array. |
| `fontSource` | `string \| ArrayBuffer` | Raleway 900 (jsDelivr CDN) | Font URL or `ArrayBuffer` of a WOFF2/TTF font. |
| `fontSize` | `number` | `Math.round(size * 0.525)` | Font size in pixels. |
| `fontWeight` | `string \| number` | `900` | Font weight passed to the font renderer. |
| `borderRadius` | `number` | `0` | Corner radius of the square in pixels. |
| `textAnchor` | `TextAnchorPosition` | `'center'` | Position of the text within the square. |

### Node.js Adapter

Import from `initial-logo/adapters/node`.

#### `generatePng(options: LogoOptions): Promise<Buffer>`

#### `generateJpg(options: LogoOptions, quality?: number): Promise<Buffer>`

`quality` defaults to `90`.

#### `generateWebp(options: LogoOptions, quality?: number): Promise<Buffer>`

`quality` defaults to `90`.

### Types

```typescript
type TextAnchorPosition =
  | 'top-left' | 'top' | 'top-right'
  | 'left'     | 'center' | 'right'
  | 'bottom-left' | 'bottom' | 'bottom-right';

type GradientType = 'linear' | 'radial';
```

## Development

```bash
# Install dependencies
bun install

# Start playground
bun run playground

# Run tests
bun run test

# Build
bun run build
```

## Disclaimer

This tool is an unofficial project and is not affiliated with, endorsed by, or connected to Oracle, Microsoft, or the OpenJS Foundation. Users are solely responsible for the trademark and copyright compliance of any logos generated using this tool.

## License

MIT
