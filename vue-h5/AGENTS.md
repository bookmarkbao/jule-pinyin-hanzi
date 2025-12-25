# Repository Guidelines

更多面向 AI/编辑器（Claude/Cursor/Codex/Copilot/VSCode）的协作规范与提示词模板见：`docs/AI_CODING_GUIDE.md`。

## Project Structure

- `src/`: Application source code (Vue 3 + TypeScript).
  - `src/main.ts`: App bootstrap and global CSS imports (includes Vant styles).
  - `src/App.vue`: Root SFC (uses `<script setup lang="ts">`).
  - `src/components/`: Reusable UI components (includes TSX, e.g. `HelloWorld.tsx`).
  - `src/assets/`: Bundled assets imported from code.
  - `src/style.css`: Global styles.
- `public/`: Static files served as-is (e.g. `public/vite.svg`).
- `vite.config.ts`: Vite config, `@` alias for `src`, and Vant auto-import/resolvers.
- `auto-imports.d.ts`: Generated types from `unplugin-auto-import` (commit updates if it changes).

## Build, Test, and Development Commands

This repo includes `pnpm-lock.yaml` (preferred).

- `pnpm install`: Install dependencies.
- `pnpm dev`: Start the Vite dev server.
- `pnpm build`: Type-check with `vue-tsc` then build production assets to `dist/`.
- `pnpm preview`: Serve the production build locally for verification.

## Coding Style & Naming Conventions

- Indentation: 2 spaces (match existing `.vue`, `.ts`, `.tsx` files).
- Quotes: prefer single quotes in TS/TSX imports/strings.
- Vue style: use `<script setup lang="ts">` for SFCs; keep components in `src/components/`.
- Imports: prefer the `@` alias, e.g. `import Foo from '@/components/Foo.vue'`.
- Vant: components/APIs may be auto-registered via `VantResolver()`; avoid manual imports unless necessary.

## Testing Guidelines

- No test runner is configured yet (no `tests/` directory or `test` script).
- If you introduce testing, keep it consistent and colocated (e.g. `src/**/__tests__/*.test.ts`) and add a `pnpm test` script.

## Commit & Pull Request Guidelines

- Git history is not established yet; use Conventional Commits (e.g. `feat: add lesson selector`, `fix: correct pinyin tone`).
- PRs: describe the change, link any issue/ticket, include screenshots for UI changes (mobile viewport), and note any new dependencies or config updates.
