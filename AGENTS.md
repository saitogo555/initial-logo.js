# AGENTS.md

## Purpose

This repository is a TypeScript library and CLI that generates initial logos — similar to JS or TS logos — based on specified text, colors, sizes, and other parameters.

AI agents should propose and implement changes in the following order of priority:

1. Correctness
2. Type safety
3. API consistency
4. Output determinism
5. Maintainability
6. Performance


## Tech Stack

- Language: TypeScript (Strict Mode)
- Runtime: Node.js v18+
- Package Manager: bun
- Bundler: tsup
- Test Runner: vitest
- Module Format: ESM first
- Target: Library + CLI


## Product Rules

- The primary goal of this project is to stably generate visually appealing initial logos from short strings.
- Generation results should be as deterministic as possible. The same input must always return the same output.
- Treat SVG as the first-class output format.
- If raster image output such as PNG is added, handle it in the adapter or CLI layer, not in Core.
- Keep Core Logic environment-agnostic — do not directly depend on DOM, Canvas, fs, process, or similar APIs.
- Implement the CLI as a thin interface that calls Core.


## Coding Rules

- Prefer functional programming; use classes only when necessary.
- Design with pure functions as much as possible — do not introduce hidden state.
- `any` is prohibited.
- Leverage type inference to its fullest; limit explicit type annotations to cases where they are necessary.
- Avoid type assertions whenever possible.
- `as`, double assertions, and non-null assertions (`!`) are last resorts.
- Solve problems using type guards, discriminated unions, generics, and appropriate data structures.
- In library code, use exceptions appropriately and write error messages that help users understand what corrective action to take.
- Do not use `console.log` in library logic.
- Use ESNext syntax.
- Avoid unnecessary abstraction.
- Do not introduce breaking changes without a clear reason.


## Architecture

Structure the implementation into the following layers.

### 1. Core

Responsibilities:
- Input validation
- String normalization
- Layout calculation
- Color determination
- SVG string or intermediate representation generation

Constraints:
- Must not depend on Node.js-specific APIs
- Must not depend on browser-specific APIs
- Must not carry CLI concerns into this layer

### 2. Adapters

Responsibilities:
- Converting to output formats other than SVG
- Abstracting runtime environment differences
- File saving and encoding

Constraints:
- Must not break Core's purity
- Dependencies must be contained within the adapter

### 3. CLI

Responsibilities:
- Receiving arguments
- Resolving input/output paths
- Displaying errors
- Controlling exit codes

Constraints:
- Must not directly modify Core
- Must not contain business logic


## API Design

- Keep the public API minimal.
- Design exports carefully.
- Do not rename or remove published types or functions without sufficient justification.
- Prefer options grouped by meaning over flat structures that are too shallow.
- Use string unions and `readonly` to make the API easy to autocomplete for users.
- Define default values explicitly.
- Prefer predictable behavior over implicit behavior.


## Logo Generation Rules

- Logo generation logic should prioritize reproducibility and consistency, not just visual appearance.
- Clearly define trimming, case handling, and Unicode treatment for input strings.
- Handle edge cases: empty strings, single characters, two or more characters, emoji, combining characters, and full-width characters.
- When a color is explicitly specified, always use that value.
- When generating colors automatically, use a deterministic method that produces the same color for the same input.
- Ensure sufficient contrast between foreground and background colors.
- When size changes, ensure that padding, border radius, font size, and text position do not break.
- If font dependencies cannot be reduced, document those constraints clearly in both code and documentation.
- In SVG output, avoid unnecessary decimal places and redundant attributes to balance readability and stability.


## Error Handling

- Write error messages that help users understand what corrective action to take.
- Distinguish between validation errors, conversion errors, and I/O errors.
- In the CLI, format failure reasons in a human-readable way and return the appropriate exit code.


## Testing

- Write tests assuming vitest.
- Focus on unit tests for Core.
- For SVG output per string input, do not rely solely on snapshots — explicitly verify important attributes.
- At minimum, test the following cases:
  - Empty string
  - Single character
  - Two characters
  - String that is too long
  - Japanese text
  - Emoji
  - Explicitly specified color
  - Auto-generated color
  - Invalid size specification
- Test that output is stable for identical inputs.
- For the CLI, test argument parsing, file output, and non-zero exit codes on failure.


## Performance

- Avoid over-optimization for small inputs.
- Prefer designs that do not repeat the same computation.
- Avoid unnecessary string concatenation and heavy transformations.
- Be mindful of bundle size — evaluate new dependencies carefully.


## Dependencies

- Keep dependencies minimal.
- Do not add heavy dependencies for a single small operation.
- For any dependency added, verify: necessity, alternatives, size, and maintenance status.
- Do not add Node.js-specific dependencies to Core.


## CLI Rules

- Treat the CLI as a public tool, not a script.
- Use intuitive option names.
- Prefer clear naming such as `--text`, `--bg`, `--fg`, `--size`, `--output`, and `--format`.
- Consider a design where SVG can be written to stdout.
- File writing should only occur when explicitly specified.
- Keep CLI usage and error messages short and clear.


## Build Rules

- Prefer tsup; add complex configuration only when necessary.
- Manage package exports explicitly.
- Separate the library entry point from the CLI entry point.
- Avoid designs that hinder tree-shaking.
- Define `sideEffects` accurately according to the implementation.


## Documentation Rules

- At minimum, the README must include:
  - What the library does
  - Installation instructions
  - Library usage examples
  - CLI usage examples
  - Key options
  - Output examples
  - Constraints
- Prioritize sample code in the documentation that can be run as-is.
- If the implementation and README diverge, update the README as well.


## Change Rules

- Before modifying existing code, confirm which layer it belongs to: Core, Adapter, or CLI.
- Prefer small, safe diffs.
- Do not mix in unrelated refactoring.
- Clearly state breaking changes.
- When changing the API, explain the impact from the user's perspective.


## Prohibitions

- Introducing `any`
- Unnecessary use of classes
- Mixing environment-dependent APIs into Core
- Using `console.log` inside library code
- Casual reliance on type assertions
- Adding complex logic without tests
- Adding dependencies without solid justification


## Preferred Output Style For Code Proposals

When proposing code, follow these rules:

1. Briefly describe the change strategy first
2. Then show the complete code
3. Split by file if necessary
4. If existing code is broken, clearly state the affected scope
5. Do not over-fill ambiguities with assumptions — state your premises explicitly

Prioritize concrete, implementable proposals over unnecessarily long explanations.
