/**
 * Ensures dist/ contains js/, work/, and media/ from repo root.
 * GitHub Pages deploys ./dist only; Vite copies public/, which uses symlinks to
 * those folders — CI or tooling can resolve them inconsistently. This step is idempotent.
 */
import { cpSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");

const pairs = [
    ["js", "js"],
    ["work", "work"],
    ["media", "media"],
];

for (const [srcName, destName] of pairs) {
    const src = join(root, srcName);
    const dest = join(dist, destName);
    if (!existsSync(src)) {
        console.warn(`copy-static-assets: skip missing ${srcName}`);
        continue;
    }
    rmSync(dest, { recursive: true, force: true });
    cpSync(src, dest, { recursive: true });
}

/* Standalone work/*.html link ../editorial.css etc. from site root — must exist on GH Pages */
const rootCss = [
    "perplexity-theme.css",
    "perplexity-animations.css",
    "rising-particles.css",
    "editorial.css",
];
for (const file of rootCss) {
    const src = join(root, file);
    if (!existsSync(src)) continue;
    cpSync(src, join(dist, file));
}
