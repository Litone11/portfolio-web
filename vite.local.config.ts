import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 250,
      ignored: [
        "**/architect-v1.0/**",
        "**/dist/**",
        "**/.tmp-*.png",
        "**/.DS_Store",
      ],
    },
  },
});
