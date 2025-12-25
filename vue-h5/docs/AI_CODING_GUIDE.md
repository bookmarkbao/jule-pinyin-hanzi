# AI 编码规范与协作指南（Vue3 + TS + TSX + Vite + Vant4）

本仓库默认允许你使用 Claude / Cursor / Codex / VSCode / Copilot 等工具进行辅助编码。为了减少返工、避免风格漂移、保证可维护性，请所有 AI 与开发者都遵守以下约定。

## 1) 目标与边界

- 目标：在不引入不必要复杂度的前提下，快速交付可运行、易维护、移动端体验良好的 H5 页面。
- 边界：优先修“根因”，避免无关重构；除非明确要求，不新增依赖、不引入测试框架、不大规模改动目录结构。
- 约束：尽量离线工作；需要联网/安装依赖时，先明确告知并等待确认。

## 2) 项目技术栈与关键配置

- Vue 3 + TypeScript + TSX
- Vite
- Vant 4
- `unplugin-auto-import` + `unplugin-vue-components` + `@vant/auto-import-resolver`
  - Template/SFC 场景可自动引入 Vant 组件/能力（以现有配置为准）。
  - TSX 中通常仍需要显式 `import { Button } from 'vant'`（按实际可用性选择）。
- `postcss-px-to-viewport-8-plugin`：用于移动端 `px -> vw` 适配（已包含对 `src` 与 `vant` 的转换）。

## 3) 目录与文件约定

- 业务/页面组件：`src/` 下。
- 可复用组件：`src/components/`
  - `.vue`：优先使用 `<script setup lang="ts">`
  - `.tsx`：使用 `defineComponent`，保持 props/emit 类型清晰
- 工具/纯函数：`src/utils/`
- 静态资源：`src/assets/`（会被打包）与 `public/`（原样拷贝）
- 不要手动编辑：`dist/`（构建产物）、`node_modules/`
- 如有 `auto-imports.d.ts` 变化：需要提交（它是生成文件，但用于类型提示）。

## 4) 代码风格（所有 AI 默认遵循）

- 缩进：2 spaces
- TS/TSX 字符串：优先单引号（与仓库既定约定保持一致；遇到现有文件风格以“最少改动”为准）
- import：优先使用 `@` 别名（`@` -> `src`）
- 文件命名：
  - Vue SFC：`PascalCase.vue`（组件）或按页面约定（如 `HomePage.vue`）
  - TSX：`PascalCase.tsx`
  - 纯工具：`camelCase.ts`
- 组件职责：一个组件只做一件事；复杂逻辑拆到 `src/utils/` 或 composable（若引入 `src/composables/`，请先沟通并保持小步落地）。

## 5) Vue / TS / TSX 约定

- Vue SFC：
  - 使用 `<script setup lang="ts">`
  - props 用 `defineProps<...>()`，events 用 `defineEmits<...>()`
  - 需要复用的状态逻辑优先抽离成函数（避免超长 SFC）
- TSX：
  - `defineComponent({ props, emits, setup })`，避免隐式 any
  - JSX 中 class/style 使用标准写法（`class`/`className` 以当前工程配置为准；遇到冲突以编译通过为准）
- 类型：
  - 默认开启 `strict`，避免 `any`
  - 对外暴露的 props、返回值、重要对象结构需要明确类型

## 6) Vant 约定（Vant4）

- 能用自动注册就不要手动全量导入（保持 bundle 体积可控）
- UI 组件优先选用 Vant 现成组件；自定义组件遵循 `src/components/` 复用规则
- 样式：
  - 移动端适配依赖 `px -> vw`；组件内尽量避免写大量固定 `px`
  - 1px 细线/发丝线优先使用 Vant 方案（如 `van-hairline` 相关）

## 7) AI 协作工作流（建议写代码前先对齐）

当你（或 AI）接到需求时，按以下顺序执行：

1. 复述需求 + 明确范围：要改哪些页面/组件？是否需要新增路由/状态管理？
2. 约束确认：是否允许新增依赖/是否允许联网/是否需要兼容旧代码？
3. 设计最小方案：列出 3-6 条实现步骤（小步提交、可回滚）。
4. 实现：尽量小 patch、局部修改；保持一致风格与目录结构。
5. 自检：
   - `pnpm build`（包含 `vue-tsc`）必须通过
   - 如涉及 UI，建议 `pnpm dev` 手动看移动端视口
6. 交付：说明改动点、入口文件、如何验证。

## 8) 给 AI 的“提示词模板”（可直接复制）

将下面模板粘贴到任意工具（Claude/Cursor/Codex/Copilot Chat）并补充你的需求：

```
你在一个 Vue3 + TS + TSX + Vite + Vant4 的项目里工作。
约束：2 空格缩进；TS/TSX 优先单引号；import 用 @ 别名；不修改 dist/ 与 node_modules；尽量不新增依赖；需要联网/新增依赖先征求确认；改动尽量小且可回滚。
目标：实现【这里写需求】，并保证 pnpm build 通过。
请先给出：影响文件列表 + 实现步骤（3-6 条）+ 关键接口/类型定义，再开始写代码。
```

## 9) 常用命令

- `pnpm dev`
- `pnpm build`
- `pnpm preview`

