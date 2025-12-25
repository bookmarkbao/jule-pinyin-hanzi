import { VantResolver } from "@vant/auto-import-resolver";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
// https://vite.dev/config/
export default defineConfig({
  base: "/pinyin",
  build: {
    outDir: 'dist/pinyin',
    sourcemap: false,
  },
    
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ], // 👈 启用 TSX
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
