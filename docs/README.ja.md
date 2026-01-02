# initial-logo.js

> [!WARNING]
> **ベータ版**: このプロジェクトは現在ベータ版です。APIは予告なく変更される可能性があります。

[🇺🇸 English](../README.md) | [🇯🇵 日本語](README.ja.md)

JavaScript/TypeScript スタイルのロゴ（四角形の中に2文字）を生成するライブラリです。

## 特徴

- 🎨 **カスタマイズ可能**: 色、サイズ、フォントなどを変更可能。
- 🌈 **グラデーション**: 背景とテキストのグラデーションをサポート。
- 🔤 **カスタムフォント**: Google Fonts などからフォントを簡単に読み込み。
- ⚡ **軽量**: コアロジックに依存関係なし。
- 🖼️ **複数のフォーマット**: HTML Div、SVG 文字列、SVG 要素、データ URL を生成可能。

## インストール

```bash
bun add initial-logo
# or
npm install initial-logo
```

## 使い方

```typescript
import {
  generateLogo,
  generateRawSvg,
  generateSvgDataUrl,
  generateSvgElement,
} from 'initial-logo';

// HTML Div 要素の生成
const logo = generateLogo({
  text: 'TS',
  size: 100,
  textColor: '#ffffff',
  backgroundColor: '#3178c6',
});
document.body.appendChild(logo);

// SVG 文字列の生成
const svgString = generateRawSvg({
  text: 'JS',
  textColor: '#000000',
  backgroundColor: '#f7df1e',
});

// SVG データ URL 文字列の生成（img/src や CSS で利用可能）
const dataUrl = generateSvgDataUrl({
  text: 'DN',
  textColor: '#ffffff',
  backgroundColor: '#000000',
});

// SVG 要素の生成
const svgElement = generateSvgElement({
  text: 'JS',
  textColor: '#000000',
  backgroundColor: '#f7df1e',
});
document.body.appendChild(svgElement);
```

### グラデーションの例

```typescript
const gradientLogo = generateLogo({
  text: 'GR',
  textColor: ['#ff0000', '#0000ff'], // テキストのグラデーション
  backgroundColor: ['#222222', '#444444'], // 背景のグラデーション
});
```

## CLI の使い方

ターミナルから直接ロゴを生成することもできます。

```bash
# ロゴを生成してファイルに保存
npx initial-logo -t TS -o logo.svg

# 色やサイズをカスタマイズ
npx initial-logo -t JS -s 200 --textColor "#000000" --backgroundColor "#f7df1e" -o js-logo.svg

# グラデーションの例
npx initial-logo -t GR --textColor "#ff0000" --textColor "#0000ff" --backgroundColor "#222222" --backgroundColor "#444444" -o gradient.svg
```

### オプション

| オプション | エイリアス | 説明 | デフォルト値 |
|---|---|---|---|
| `--text` | `-t` | ロゴのテキスト（必須） | - |
| `--size` | `-s` | ロゴのサイズ（ピクセル） | `100` |
| `--output` | `-o` | 出力ファイルパス | `stdout` |
| `--textColor` | `-T` | テキストの色（複数指定でグラデーション） | `#ffffff` |
| `--backgroundColor` | `-B` | 背景色（複数指定でグラデーション） | `#000000` |
| `--fontSource` | `-f` | フォントソースの URL | - |
| `--fontSize` | `-F` | フォントサイズ | - |
| `--help` | `-h` | ヘルプを表示 | - |

## API

### `generateLogo(options: LogoOptions): HTMLDivElement`

ロゴを HTML `div` 要素として生成します。

### `generateRawSvg(options: LogoOptions): string`

ロゴを SVG 文字列として生成します。

### `generateSvgDataUrl(options: LogoOptions): string`

ロゴをデータ URL 文字列（`data:image/svg+xml;...`）として生成します。

### `generateSvgElement(options: LogoOptions): SVGElement`

ロゴを SVG DOM 要素として生成します。

#### `LogoOptions`

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `text` | `string` | (必須) | 表示する2文字（必ず2文字）。 |
| `size` | `number` | `100` | 四角形のサイズ（ピクセル）。 |
| `textColor` | `string \| string[]` | `'#ffffff'` | テキストの色。配列を渡すとグラデーションになります。 |
| `backgroundColor` | `string \| string[]` | `'#000000'` | 背景色。配列を渡すとグラデーションになります。 |
| `fontSource` | `string` | (埋め込み JetBrains Mono) | フォントを読み込む URL (WOFF2形式推奨)。 |
| `fontFamily` | `string` | (自動生成) | 使用するフォントファミリー名。 |
| `fontSize` | `number` | HTML 生成時は `Math.round(size * 0.65)`、SVG 生成時は `Math.round(size * 0.525)` | フォントサイズ（ピクセル）。 |
| `fontWeight` | `string \| number` | `'800'` | CSS font-weight。 |
| `lineHeight` | `string \| number` | `0.8` | CSS line-height。 |

## 開発

```bash
# 依存関係のインストール
bun install

# プレイグラウンドの起動
bun run playground

# ビルド
bun run build
```

## 免責事項

このツールは非公式であり、OracleやMicrosoft、OpenJS Foundationとは一切関係ありません。生成されたロゴの商標権や著作権は、それを使用するユーザーの責任に帰属します。

## ライセンス

MIT
