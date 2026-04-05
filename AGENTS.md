AGENTS Guide

This repository contains a React + TypeScript app (Vite + SWC) and a Rust crate compiled to WebAssembly. This guide documents how to build, lint, test, and contribute code consistently. It is intended for agentic coding tools and contributors working in this repo.

Project Layout

- Frontend app: src/, vite.config.ts, tsconfig\*.json
- Rust WASM crate: dev-tool-wasm/
- Test runner: Jest (ts-jest) for TS, cargo test for Rust
- Linting: ESLint (@typescript-eslint), optional Rust clippy

Package Manager and Node

- Package manager: pnpm (pnpm-lock.yaml present)
- Recommended Node: >= 18 (Vite 5 requires Node 18+)
- If you must use npm or yarn, translate pnpm run scripts accordingly

Install

- pnpm install

Run and Build (Frontend)

1. Dev server
   - pnpm dev
   - Opens Vite dev server with React Refresh
2. Type-check and production build
   - pnpm build
   - Executes tsc (noEmit) then vite build
3. Preview production build
   - pnpm preview

Lint and Format (TypeScript)

1. Lint
   - pnpm lint
   - ESLint config: .eslintrc.cjs extends eslint:recommended, plugin:@typescript-eslint/recommended, plugin:react-hooks/recommended, with react-refresh/only-export-components warn
2. Format
   - Prettier is a devDependency but has no repo config file. Use default settings.
   - Dry run: pnpm exec prettier --check .
   - Write: pnpm exec prettier --write .

Testing (TypeScript via Jest)

- Run all tests: pnpm test
- Run a single test file:
  - pnpm test -- src/path/to/file.test.ts
  - pnpm test -- src/path/to/file.test.tsx
- Filter by test name (pattern):
  - pnpm test -- -t "partial test name"
- Watch mode:
  - pnpm run test:watch

Jest configuration

- Transform: ts-jest for both .ts and .tsx
- Test discovery: files under **tests**/ or named \*.test.ts(x)
- Recommendation: co-locate tests as \*.test.ts(x) next to the unit under test

Rust WASM Workflow (dev-tool-wasm)

1. Requirements
   - Rust toolchain (stable), cargo
   - wasm-pack (cargo install wasm-pack)
2. Build WASM for the web
   - wasm-pack build dev-tool-wasm --target web
   - Output JS bindings under dev-tool-wasm/pkg (crate name yields package dev_tool_wasm)
   - The frontend imports from "../../dev-tool-wasm/pkg/dev_tool_wasm"
3. Rebuild after Rust changes
   - Re-run wasm-pack build dev-tool-wasm --target web before restarting the frontend if bindings change
4. Test Rust code
   - From dev-tool-wasm/: cargo test
   - Run a single test by name: cargo test base64_encode_test
   - Run tests in a module: cargo test formatter
5. Optional Rust lint/format
   - cargo fmt --all
   - cargo clippy --all-targets --all-features -- -D warnings

WASM initialization in TypeScript

- The transformer module exports initReady (a Promise) that resolves when WASM is initialized.
- Await initReady before calling any WASM-bound functions to avoid race conditions.
- Example: await initReady; const out = await method(input)

Code Style Guidelines

General TypeScript/React

- Strict TypeScript is enabled (tsconfig: strict, noUnusedLocals, noUnusedParameters). Avoid any; prefer unknown and narrow types.
- Use function components with typed props. Example: type Props = { foo: string }; const C = ({ foo }: Props) => { ... }.
- Prefer React hooks; keep side effects inside useEffect; memoize expensive computations when needed, otherwise avoid premature useMemo/useCallback.
- UI uses MUI v5. Prefer MUI components and the sx prop over raw inline styles when feasible. Keep layout consistent with Container/Stack patterns found in src/.
- Keep components small and focused; lift state up only when necessary.

Imports

- Module resolution is "bundler" and allowImportingTsExtensions is true. Internal imports may include .ts/.tsx extensions (existing code mixes both). Be consistent within a file; prefer explicit .tsx/.ts extensions when referencing TS files, matching current usage (e.g., import App from "./App.tsx").
- Use ESM-style imports in TS. Group imports logically in this order: Node/built-ins, external packages, internal modules, then types-only imports.
- Avoid deep relative paths when possible; prefer central barrel files if they improve clarity. Do not introduce path aliases unless tsconfig is updated accordingly.

Formatting

- Use Prettier defaults (2-space indent, semicolons, double quotes). Run Prettier before commits if possible.
- Keep line length reasonable (~100-120). Break long generics and JSX props across lines for readability.

Types and Interfaces

- Exported/public surfaces: prefer explicit types. Local variables can rely on inference.
- Use type aliases or interfaces consistently; either is acceptable. Use type for function signatures and union/intersection; use interface for object models that may be extended.
- Use readonly and ReadonlyArray where appropriate. Prefer narrowing with predicates instead of type assertions.

Naming Conventions

- Files: React components in PascalCase (e.g., ToolMenu.tsx). Utility modules lowercase or camelCase (e.g., transformer/index.ts).
- Types, interfaces, React components: PascalCase. Variables, functions, props: camelCase. Constants: UPPER_SNAKE_CASE when truly constant.
- Event handlers: prefix with handle (e.g., handleInputChange). Avoid misspellings; keep names consistent across props and implementations.

Error Handling

- TypeScript/React:
  - Wrap async calls in try/catch. Surface actionable messages to users; log detailed errors to console.
  - Avoid throwing non-Error values. Narrow unknown errors via instance checks or safe extraction of message.
- Rust WASM:
  - Exports return Result<String, JsValue>. Errors propagate to JS as exceptions; always catch in TS and show concise messages.
  - Use clear, user-friendly error text (e.g., "Invalid JSON: …", "Invalid Base64: …").

Testing Guidelines

- TypeScript:
  - Use Jest with ts-jest. Co-locate tests as \*.test.ts(x) next to the unit or under **tests**/.
  - Mock only necessary boundaries. Keep tests deterministic. Use describe/test with clear names.
- Rust:
  - Use #[cfg(test)] modules next to code, like existing base64 and jwt tests. Keep unit tests small and specific. Prefer asserting formatted outputs exactly for formatters.

Performance and UI

- Prefer memoization only when profiling indicates benefit. Avoid unnecessary state updates; derive values from props/state where possible.
- For MUI, prefer sx for theme-aware spacing/typography. Keep accessibility in mind (labels, aria- attributes).

Responsive UI

- Container: prefer maxWidth={false} and responsive padding to utilize full viewport width and height.
- Layout: use Stack with direction switching by breakpoint (e.g., { xs: "column", md: "row" }) and set flexGrow/minWidth to prevent truncation.
- Side menu: fixed width on md+ (e.g., 320px), full width on xs; cap height with calc(100vh - header) and enable overflow: auto.
- Text areas: width 100% and height based on viewport (e.g., 28vh); increase fontSize and lineHeight for readability.
- Theme-aware colors: prefer palette keys like color="error" or sx={{ color: 'error.main' }}.

Build Artifacts and Imports

- The TS code imports from dev-tool-wasm/pkg/dev_tool_wasm. If imports fail at runtime, ensure wasm-pack build has been run and pkg exists. Re-run after changing Rust sources.
- Vite will bundle ESM output; keep wasm target set to web as shown above.

Environment and Scripts

- No .editorconfig or Prettier config exists; default Prettier applies. No .nvmrc present; use Node 18+.
- ESLint ignores dist/ and .eslintrc.cjs. Lint warnings for react-refresh/only-export-components guide HMR-friendly exports. Prefer default exports only for React components when it matches current patterns.

Cursor and Copilot Rules

- No Cursor rules found under .cursor/rules/ or .cursorrules.
- No Copilot instruction file found (.github/copilot-instructions.md).
- If such rules are added later, mirror key constraints and coding styles from those files here.

Common Tasks (Quick Commands)

- Install: pnpm install
- Start dev: pnpm dev
- Type-check+build: pnpm build
- Lint: pnpm lint
- Type-check only: pnpm run typecheck
- Format (check): pnpm exec prettier --check .
- Format (write): pnpm run format
- TS tests (single file/name): pnpm test -- src/foo/bar.test.ts -t "case name"
- TS watch: pnpm run test:watch
- Rust tests: pnpm run rust:test
- Rust build: pnpm run rust:build
- Rust fmt: pnpm run rust:fmt
- Rust clippy: pnpm run rust:clippy
- Build WASM bindings: pnpm run wasm:build

Notes and Caveats

- README crate path has been corrected to dev-tool-wasm.
- Jest is configured to only discover tests under **tests**/ or \*.test.ts(x).

Contribution Expectations

- Keep changes minimal and targeted. Follow existing patterns and naming.
- Add or update tests for behavior changes (TS and/or Rust as appropriate).
- Run: pnpm lint, pnpm test, cargo test, and wasm-pack build before proposing changes that affect both TS and Rust boundaries.
