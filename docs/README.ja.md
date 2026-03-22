# initial-logo.js

[🇺🇸 English](../README.md) | [🇯🇵 日本語](README.ja.md)

![npm version](https://img.shields.io/npm/v/initial-logo)

JavaScript/TypeScript スタイルのロゴ（四角形の中に最大2文字）を生成するライブラリです。

## 特徴

- 🎨 **カスタマイズ可能**: 色・サイズ・フォント・角丸・テキスト位置などを変更可能。
- 🌈 **グラデーション**: 背景とテキストの線形/放射状グラデーションをサポート。
- 🔤 **カスタムフォント**: URL またはローカルファイル（WOFF2/TTF）からフォントを読み込み可能。
- ⚡ **軽量**: コアロジックに依存関係なし。
- 🖼️ **複数フォーマット**: コアで SVG 文字列を生成、Node.js アダプターで PNG/JPG/WEBP を生成。

## インストール

```bash
bun add initial-logo
# または
npm install initial-logo
```

## 使い方

### SVG 文字列の生成

```typescript
import { generateRawSvg } from 'initial-logo';

// 基本的な使い方
const svgString = await generateRawSvg({
  text: 'TS',
  size: 100,
  textColor: '#ffffff',
  backgroundColor: '#3178c6',
});

// <img> タグでデータ URL として使う
const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
```

### グラデーションの例

```typescript
const svgString = await generateRawSvg({
  text: 'GR',
  textColor: ['#ff0000', '#0000ff'],          // 線形グラデーション（テキスト）
  backgroundColor: ['#222222', '#444444'],    // 線形グラデーション（背景）
  textGradientType: 'linear',                 // 'linear'（デフォルト）| 'radial'
  backgroundGradientType: 'linear',
});
```

### Node.js アダプター（PNG / JPG / WEBP）

```typescript
import { generatePng, generateJpg, generateWebp } from 'initial-logo/adapters/node';

const pngBuffer  = await generatePng({ text: 'TS', backgroundColor: '#3178c6' });
const jpgBuffer  = await generateJpg({ text: 'JS', backgroundColor: '#f7df1e' }, 90);
const webpBuffer = await generateWebp({ text: 'DN', backgroundColor: '#000000' }, 90);
```

> Node.js アダプターは [sharp](https://sharp.pixelplumbing.com/) に依存しています。パッケージの依存関係に含まれています。

## CLI の使い方

```bash
# SVG を生成（デフォルト出力: initial-logo.svg）
npx initial-logo -t TS

# 色とサイズをカスタマイズ
npx initial-logo -t JS -s 200 --textColor "#000000" --backgroundColor "#f7df1e" -o js-logo.svg

# グラデーション
npx initial-logo -t GR \
  --textColor "#ff0000" --textColor "#0000ff" \
  --backgroundColor "#222222" --backgroundColor "#444444" \
  -o gradient.svg

# PNG で出力
npx initial-logo -t TS -o logo.png

# 角丸・フォントウェイト・テキスト位置を指定
npx initial-logo -t TS -r 16 -w 700 -a bottom-right -o logo.svg
```

### CLI オプション

| オプション | エイリアス | 説明 | デフォルト値 |
|---|---|---|---|
| `--text` | `-t` | ロゴテキスト — 最大2グラフェム（必須） | - |
| `--size` | `-s` | ロゴサイズ（ピクセル） | `100` |
| `--output` | `-o` | 出力パス（`.svg` / `.png` / `.jpg` / `.webp`） | `initial-logo.svg` |
| `--textColor` | `-T` | テキストの色 — 複数指定でグラデーション | `#ffffff` |
| `--backgroundColor` | `-B` | 背景色 — 複数指定でグラデーション | `#000000` |
| `--textGradientType` | | テキストのグラデーション種別: `linear` \| `radial` | `linear` |
| `--bgGradientType` | | 背景のグラデーション種別: `linear` \| `radial` | `linear` |
| `--fontSource` | `-f` | フォントの URL またはローカルファイルパス | Raleway 700 (jsDelivr) |
| `--fontSize` | `-F` | フォントサイズ（ピクセル） | `Math.round(size * 0.525)` |
| `--fontWeight` | `-w` | フォントウェイト | `700` |
| `--borderRadius` | `-r` | 角丸の半径（ピクセル） | `0` |
| `--textAnchor` | `-a` | テキストの配置位置（下記参照） | `center` |
| `--help` | `-h` | ヘルプを表示 | - |

**`--textAnchor` の値**: `top-left` \| `top` \| `top-right` \| `left` \| `center` \| `right` \| `bottom-left` \| `bottom` \| `bottom-right`

## API

### `generateRawSvg(options: LogoOptions): Promise<string>`

ロゴを SVG 文字列として生成します。コアライブラリの主要なエクスポートです。

#### `LogoOptions`

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `text` | `string` | **(必須)** | ロゴに表示するテキスト — 最大2グラフェム（絵文字・CJK文字対応）。 |
| `size` | `number` | `100` | 四角形のサイズ（ピクセル）。正の有限数を指定。 |
| `textColor` | `string \| string[]` | `'#ffffff'` | テキストの色。2色以上の配列でグラデーションになります。 |
| `textGradientType` | `'linear' \| 'radial'` | `'linear'` | テキストのグラデーション種別。`textColor` が配列のときのみ有効。 |
| `backgroundColor` | `string \| string[]` | `'#000000'` | 背景色。2色以上の配列でグラデーションになります。 |
| `backgroundGradientType` | `'linear' \| 'radial'` | `'linear'` | 背景のグラデーション種別。`backgroundColor` が配列のときのみ有効。 |
| `fontSource` | `string \| ArrayBuffer` | Raleway 700 (jsDelivr CDN) | フォントの URL または WOFF2/TTF の `ArrayBuffer`。 |
| `fontSize` | `number` | `Math.round(size * 0.525)` | フォントサイズ（ピクセル）。 |
| `fontWeight` | `string \| number` | `700` | フォントウェイト。 |
| `borderRadius` | `number` | `0` | 四角形の角丸半径（ピクセル）。 |
| `textAnchor` | `TextAnchorPosition` | `'center'` | 四角形内のテキスト配置位置。 |

### Node.js アダプター

`initial-logo/adapters/node` からインポートしてください。

#### `generatePng(options: LogoOptions): Promise<Buffer>`

#### `generateJpg(options: LogoOptions, quality?: number): Promise<Buffer>`

`quality` のデフォルト値は `90`。

#### `generateWebp(options: LogoOptions, quality?: number): Promise<Buffer>`

`quality` のデフォルト値は `90`。

### 型定義

```typescript
type TextAnchorPosition =
  | 'top-left' | 'top' | 'top-right'
  | 'left'     | 'center' | 'right'
  | 'bottom-left' | 'bottom' | 'bottom-right';

type GradientType = 'linear' | 'radial';
```

## 開発

```bash
# 依存関係のインストール
bun install

# プレイグラウンドの起動
bun run playground

# テストの実行
bun run test

# ビルド
bun run build
```

## 免責事項

このツールは非公式プロジェクトであり、Oracle・Microsoft・OpenJS Foundation とは一切関係ありません。生成されたロゴの商標権や著作権への対応は、利用者の責任となります。

## ライセンス

MIT
