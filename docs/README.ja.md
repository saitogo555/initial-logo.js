# initial-logo.js

[🇺🇸 English](../README.md) | [🇯🇵 日本語](README.ja.md)

JavaScript/TypeScript スタイルのロゴ（四角形の中に2文字）を生成するライブラリです。

## 特徴

- 🎨 **カスタマイズ可能**: 色、サイズ、フォントなどを変更可能。
- 🌈 **グラデーション**: 背景とテキストのグラデーションをサポート。
- 🔤 **カスタムフォント**: Google Fonts などからフォントを簡単に読み込み。
- ⚡ **軽量**: コアロジックに依存関係なし。

## インストール

```bash
bun add initial-logo
# or
npm install initial-logo
```

## 使い方

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

### グラデーションの例

```typescript
const gradientLogo = generateLogo({
  text: 'GR',
  textColor: ['#ff0000', '#0000ff'], // テキストのグラデーション
  backgroundColor: ['#222222', '#444444'], // 背景のグラデーション
});
```

## API

### `generateLogo(options: LogoOptions): HTMLDivElement`

ロゴ要素を生成します。

#### `LogoOptions`

| プロパティ | 型 | デフォルト値 | 説明 |
|---|---|---|---|
| `text` | `string` | (必須) | 表示する2文字。 |
| `size` | `number` | `100` | 四角形のサイズ（ピクセル）。 |
| `textColor` | `string \| string[]` | `'#ffffff'` | テキストの色。配列を渡すとグラデーションになります。 |
| `backgroundColor` | `string \| string[]` | `'#000000'` | 背景色。配列を渡すとグラデーションになります。 |
| `fontSource` | `string` | Google Fonts URL | フォントを読み込む URL。 |
| `fontFamily` | `string` | `'Inconsolata, monospace'` | CSS font-family。 |
| `fontSize` | `number` | `Math.round(size * 0.65)` | フォントサイズ（ピクセル）。 |
| `fontWeight` | `string \| number` | `'bold'` | CSS font-weight。 |
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
