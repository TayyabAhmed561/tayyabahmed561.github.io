import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom domain (e.g. tayyabahmed.ca) or GitHub Pages user site at root: assets and router live at /
export default defineConfig({
    plugins: [react()],
    base: "/",
});
