import type { Options } from "tsup";
import { defineConfig } from "tsup";

function withFontLoaders(
	options: Parameters<NonNullable<Options["esbuildOptions"]>>[0],
) {
	options.loader = {
		...options.loader,
		".woff2": "dataurl",
		".ttf": "dataurl",
	};
}

export default defineConfig([
	{
		// library: CJS + ESM
		entry: ["src/index.ts"],
		format: ["cjs", "esm"],
		dts: true,
		clean: true,
		target: "node18",
		esbuildOptions: withFontLoaders,
	},
	{
		// Node.js adapter: CJS + ESM (sharp-based raster output)
		entry: { "adapters/node": "src/adapters/node.ts" },
		format: ["cjs", "esm"],
		dts: true,
		target: "node18",
		external: ["sharp"],
		esbuildOptions: withFontLoaders,
	},
	{
		// CLI: ESM only (top-level await)
		entry: ["src/cli.ts"],
		format: ["esm"],
		target: "node18",
		esbuildOptions: withFontLoaders,
	},
]);
