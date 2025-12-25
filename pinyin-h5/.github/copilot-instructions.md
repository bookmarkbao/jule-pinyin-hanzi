# Copilot Instructions (Repository)

This repo is a `Vue 3 + TypeScript + TSX + Vite + Vant4` mobile H5 project.

## Coding rules

- Use 2-space indentation.
- Prefer single quotes in TS/TSX; do not reformat unrelated code.
- Use `@` alias for imports from `src/`.
- Vue SFC: `<script setup lang="ts">`.
- TSX components go in `src/components/` and should have explicit prop/event typing where meaningful.
- Do not edit `dist/` or `node_modules/`.
- If `auto-imports.d.ts` changes, include it in the PR.

## Dependencies & network

- Avoid adding new dependencies unless explicitly requested.
- Network access may be restricted; if you need installs or online steps, ask first.

## Quality bar

- Changes should be minimal and focused.
- Ensure `pnpm build` passes (includes `vue-tsc`).

Reference: `docs/AI_CODING_GUIDE.md`.

