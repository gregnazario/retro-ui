import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import vue from "@vitejs/plugin-vue";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [react(), vue(), svelte()],
  resolve: {
    conditions: ["browser"],
    alias: {
      "@retro-ui/themes": path.resolve(import.meta.dirname, "packages/themes/src/index.ts"),
      "@retro-ui/react": path.resolve(import.meta.dirname, "packages/react/src/index.ts"),
      "@retro-ui/vue": path.resolve(import.meta.dirname, "packages/vue/src/index.ts"),
      "@retro-ui/svelte": path.resolve(import.meta.dirname, "packages/svelte/src/index.ts"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
  },
});
