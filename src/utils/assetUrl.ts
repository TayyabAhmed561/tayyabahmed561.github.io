/** Resolve a path relative to the site root (honours Vite `base` / GitHub Pages). */
export function assetUrl(path: string): string {
    const normalized = path.replace(/^\//, "");
    return `${import.meta.env.BASE_URL}${normalized}`;
}
