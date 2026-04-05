import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// Vite config for custom domain (root) deployment
// - base set to '/' so assets resolve at domain root
// - outDir 'docs' so GH Pages can serve from the docs folder on the default branch
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "docs",
  },
});
