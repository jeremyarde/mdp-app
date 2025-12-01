// eslint.config.js

import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  // Base path for GitHub Pages
  // If deploying to a repository (not user/organization page), set this to your repo name
  // Example: base: '/mdp-app/'
  // For root domain deployment, use: base: '/'
  // base: process.env.GITHUB_PAGES_BASE || "/",
  base: "/mdp-app/",
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    wasm(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
