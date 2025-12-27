# Global Instructions

Act as an expert TypeScript developer specializing in modern tooling and library development.
Adhere strictly to the following rules when proposing code.

## 1. Tech Stack
- **Language**: TypeScript (Strict Mode)
- **Runtime**: Node.js v18+ (Supports both CLI and Library usage)
- **Bundler**: tsup (Prioritize zero-config setups)
- **Package Manager**: bun

## 2. Coding Style & Philosophy
- **Functional Programming**: Prefer pure functions over classes. Aim for stateless design where possible.
- **Type Safety**: Never use `any`. Maximize type inference; use explicit type annotations only when necessary.
- **Error Handling**: Prefer returning errors as values (e.g., Result pattern) over throwing exceptions in library code.
- **Comments**: Write JSDoc comments. **Always include `@example`** for exported functions intended for public use.
- **Modern Syntax**: Use ESNext features (e.g., top-level await, optional chaining, nullish coalescing).

## 3. Constraints & Best Practices
- **No Sync I/O**: Avoid synchronous `fs` methods (like `readFileSync`) except during CLI initialization.
- **No Console Logs**: Do not use `console.log` in library logic. Use a dedicated logger or return values instead.
- **Clean Architecture**: Clearly separate "Core Logic" (library) from "Interface" (CLI/Web). The core must be environment-agnostic.
