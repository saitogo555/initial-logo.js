import type { LogoOptions } from "./types";

export function validateOptions(options: LogoOptions): void {
  if (options.text.length !== 2) {
    throw new Error("Text must be exactly 2 characters.");
  }
}
