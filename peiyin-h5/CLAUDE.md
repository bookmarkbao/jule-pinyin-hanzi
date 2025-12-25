# Claude 协作说明（本仓库）

你在一个 `Vue 3 + TypeScript + TSX + Vite + Vant4` 的移动端 H5 项目中工作。

## 必须遵守

- 2 空格缩进；TS/TSX 优先单引号（保持文件既有风格，避免无关格式化）。
- import 优先使用 `@` 别名（`@` -> `src`）。
- Vue SFC 统一用 `<script setup lang="ts">`。
- 不要编辑 `dist/`、`node_modules/`。
- 尽量不新增依赖；确需新增/联网操作时先说明原因并等待确认。
- 如 `auto-imports.d.ts` 发生变化，需要纳入提交（用于类型提示）。

## 工作方式（默认）

1. 先确认需求与范围；不清楚就提问。
2. 给出最小实现步骤（3-6 条）和影响文件列表。
3. 小步修改、保证 `pnpm build` 通过；UI 变更建议说明如何在 `pnpm dev` 下验证。

更多细则与提示词模板：`docs/AI_CODING_GUIDE.md`。

