# initial-logo.js

[🇺🇸 English](README.md) | [🇯🇵 日本語](docs/README.ja.md)

Generate JavaScript/TypeScript style logos (2 characters inside a square) easily.

## Features

- 🎨 **Customizable**: Change colors, size, fonts, and more.
- 🌈 **Gradients**: Support for gradient backgrounds and text.
- 🔤 **Custom Fonts**: Easily load fonts from Google Fonts or other sources.
- ⚡ **Lightweight**: Zero dependencies for the core logic.

## Installation

```bash
bun add initial-logo
# or
npm install initial-logo
```

## Usage

```typescript
import { generateLogo } from 'initial-logo';

const logo = generateLogo({
  text: 'TS',
  size: 100,
  textColor: '#ffffff',
  backgroundColor: '#3178c6',
});

document.body.appendChild(logo);
```

### Gradient Example

```typescript
const gradientLogo = generateLogo({
  text: 'GR',
  textColor: ['#ff0000', '#0000ff'], // Gradient text
  backgroundColor: ['#222222', '#444444'], // Gradient background
});
```

## API

### `generateLogo(options: LogoOptions): HTMLDivElement`

Generates a logo element.

#### `LogoOptions`

| Property | Type | Default | Description |
|---|---|---|---|
| `text` | `string` | (Required) | The 2 characters to display. |
| `size` | `number` | `100` | Size of the square in pixels. |
| `textColor` | `string \| string[]` | `'#ffffff'` | Text color. Pass an array for gradient. |
| `backgroundColor` | `string \| string[]` | `'#000000'` | Background color. Pass an array for gradient. |
| `fontSource` | `string` | Google Fonts URL | URL to load the font from. |
| `fontFamily` | `string` | `'Inconsolata, monospace'` | CSS font-family. |
| `fontSize` | `number` | `Math.round(size * 0.65)` | Font size in pixels. |
| `fontWeight` | `string \| number` | `'bold'` | CSS font-weight. |
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
