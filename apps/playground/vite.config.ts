import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@retro-ui/themes": path.resolve(import.meta.dirname, "../../packages/themes/src/index.ts"),
      "@retro-ui/react": path.resolve(import.meta.dirname, "../../packages/react/src/index.ts"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
});
