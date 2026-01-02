# initial-logo.js

> [!WARNING]
> **Beta Version**: This project is currently in beta. APIs are subject to change without notice.

[🇺🇸 English](README.md) | [🇯🇵 日本語](docs/README.ja.md)

Generate JavaScript/TypeScript style logos (2 characters inside a square) easily.

## Features

- 🎨 **Customizable**: Change colors, size, fonts, and more.
- 🌈 **Gradients**: Support for gradient backgrounds and text.
- 🔤 **Custom Fonts**: Easily load fonts from Google Fonts or other sources.
- ⚡ **Lightweight**: Zero dependencies for the core logic.
- 🖼️ **Multiple Formats**: Generate HTML Divs, SVG strings, SVG Elements, or data URLs.

## Installation

```bash
bun add initial-logo
# or
npm install initial-logo
```

## Usage

```typescript
import {
  generateLogo,
  generateRawSvg,
  generateSvgDataUrl,
  generateSvgElement,
} from 'initial-logo';

// Generate HTML Div Element
const logo = generateLogo({
  text: 'TS',
  size: 100,
  textColor: '#ffffff',
  backgroundColor: '#3178c6',
});
document.body.appendChild(logo);

// Generate SVG String
const svgString = generateRawSvg({
  text: 'JS',
  textColor: '#000000',
  backgroundColor: '#f7df1e',
});

// Generate SVG Data URL string (usable in img/src, CSS, etc.)
const dataUrl = generateSvgDataUrl({
  text: 'DN',
  textColor: '#ffffff',
  backgroundColor: '#000000',
});

// Generate SVG Element
const svgElement = generateSvgElement({
  text: 'JS',
  textColor: '#000000',
  backgroundColor: '#f7df1e',
});
document.body.appendChild(svgElement);
```

### Gradient Example

```typescript
const gradientLogo = generateLogo({
  text: 'GR',
  textColor: ['#ff0000', '#0000ff'], // Gradient text
  backgroundColor: ['#222222', '#444444'], // Gradient background
});
```

## CLI Usage

You can also use the CLI to generate logos directly from the terminal.

```bash
# Generate a logo and save to file
npx initial-logo -t TS -o logo.svg

# Customize colors and size
npx initial-logo -t JS -s 200 --textColor "#000000" --backgroundColor "#f7df1e" -o js-logo.svg

# Gradient example
npx initial-logo -t GR --textColor "#ff0000" --textColor "#0000ff" --backgroundColor "#222222" --backgroundColor "#444444" -o gradient.svg
```

### Options

| Option | Alias | Description | Default |
|---|---|---|---|
| `--text` | `-t` | Logo text (required) | - |
| `--size` | `-s` | Logo size in pixels | `100` |
| `--output` | `-o` | Output file path | `stdout` |
| `--textColor` | `-T` | Text color (repeat for gradient) | `#ffffff` |
| `--backgroundColor` | `-B` | Background color (repeat for gradient) | `#000000` |
| `--fontSource` | `-f` | Font source URL | - |
| `--fontSize` | `-F` | Font size | - |
| `--help` | `-h` | Display help message | - |

## API

### `generateLogo(options: LogoOptions): HTMLDivElement`

Generates a logo as an HTML `div` element.

### `generateRawSvg(options: LogoOptions): string`

Generates a logo as an SVG string.

### `generateSvgDataUrl(options: LogoOptions): string`

Generates a logo as a data URL string (`data:image/svg+xml;...`).

### `generateSvgElement(options: LogoOptions): SVGElement`

Generates a logo as an SVG DOM element.

#### `LogoOptions`

| Property | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | (Required) | Exactly 2 characters to display. |
| `size` | `number` | `100` | Size of the square in pixels. |
| `textColor` | `string \| string[]` | `'#ffffff'` | Text color. Pass an array for gradient. |
| `backgroundColor` | `string \| string[]` | `'#000000'` | Background color. Pass an array for gradient. |
| `fontSource` | `string` | (Embedded JetBrains Mono) | URL to load the font from (WOFF2 format recommended). |
| `fontFamily` | `string` | (Auto-generated) | Font family name to use. |
| `fontSize` | `number` | `Math.round(size * 0.65)` for HTML, `Math.round(size * 0.525)` for SVG | Font size in pixels. |
| `fontWeight` | `string \| number` | `'800'` | CSS font-weight. |
| `lineHeight` | `string \| number` | `0.8` | CSS line-height. |

## Development

```bash
# Install dependencies
bun install

# Start playground
bun run playground

# Build
bun run build
```

## Disclaimer

This tool is an unofficial project and is not affiliated with, endorsed by, or connected to Oracle, Microsoft, or the OpenJS Foundation. Users are solely responsible for the trademark and copyright compliance of any logos generated using this tool.

## License

MIT
