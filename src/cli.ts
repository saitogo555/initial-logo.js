import { writeFileSync } from "node:fs";
import { parseArgs } from "node:util";
import { generateSvg } from "./core";
import type { LogoOptions } from "./types";

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    text: {
      type: "string",
      short: "t",
    },
    size: {
      type: "string",
      short: "s",
    },
    output: {
      type: "string",
      short: "o",
    },
    textColor: {
      type: "string",
      multiple: true,
    },
    backgroundColor: {
      type: "string",
      multiple: true,
    },
    fontSource: {
      type: "string",
    },
    fontSize: {
      type: "string",
    },
    help: {
      type: "boolean",
      short: "h",
    },
  },
  allowPositionals: true,
});

if (values.help) {
  console.log(`
Usage: initial-logo [options]

Options:
  -t, --text <text>            Logo text (required)
  -s, --size <number>          Logo size (default: 512)
  -o, --output <path>          Output file path (default: stdout)
  --textColor <color>          Text color (can be specified multiple times for gradient)
  --backgroundColor <color>    Background color (can be specified multiple times for gradient)
  --fontSource <url>           Font source URL
  --fontSize <number>          Font size
  -h, --help                   Display this help message
`);
  process.exit(0);
}

const text = values.text || positionals[0];

if (!text) {
  console.error(
    "Error: Text is required. Use --text or pass it as an argument.",
  );
  process.exit(1);
}

const options: LogoOptions = {
  text,
  size: values.size ? Number.parseInt(values.size, 10) : undefined,
  textColor:
    values.textColor && values.textColor.length > 1
      ? values.textColor
      : values.textColor?.[0],
  backgroundColor:
    values.backgroundColor && values.backgroundColor.length > 1
      ? values.backgroundColor
      : values.backgroundColor?.[0],
  fontSource: values.fontSource,
  fontSize: values.fontSize ? Number.parseInt(values.fontSize, 10) : undefined,
};

try {
  const svg = generateSvg(options);

  if (values.output) {
    writeFileSync(values.output, svg);
    console.log(`Generated SVG saved to ${values.output}`);
  } else {
    console.log(svg);
  }
} catch (error) {
  console.error("Error generating SVG:", error);
  process.exit(1);
}
