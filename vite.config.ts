import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Vite config for GitHub Pages project site at /devtools
// - base ensures built asset URLs are prefixed with /devtools/
// - outDir 'docs' so GH Pages can serve from the docs folder on the default branch
export default defineConfig({
  base: "/devtools/",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
