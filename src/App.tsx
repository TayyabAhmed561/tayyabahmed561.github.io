import { useEffect, useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BackgroundLayers } from "./BackgroundLayers";
import { ScrollToTop } from "./ScrollToTop";
import { LegacyHashRedirect } from "./LegacyHashRedirect";
import { bindPortfolioDomEffects } from "./initDomEffects";
import { AppShell } from "./layouts/AppShell";
import HomePage from "./pages/HomePage";
import ResearchPage from "./pages/ResearchPage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";

const SCRIPT_FILES = [
    "rising-particles.js",
    "perplexity-backgrounds.js",
    "research-workspace.js",
] as const;

let portfolioScriptsInjected = false;

export default function App() {
    useLayoutEffect(() => {
        let el = document.querySelector("base");
        if (!el) {
            el = document.createElement("base");
            document.head.insertBefore(el, document.head.firstChild);
        }
        el.setAttribute("href", import.meta.env.BASE_URL);
    }, []);

    useEffect(() => {
        if (portfolioScriptsInjected) return;
        portfolioScriptsInjected = true;
        const base = import.meta.env.BASE_URL;
        void (async () => {
            for (const f of SCRIPT_FILES) {
                await new Promise<void>((resolve, reject) => {
                    const s = document.createElement("script");
                    s.src = `${base}js/${f}`;
                    s.onload = () => resolve();
                    s.onerror = () => reject(new Error(`Failed to load ${f}`));
                    document.body.appendChild(s);
                });
            }
        })().catch(console.error);
    }, []);

    useEffect(() => bindPortfolioDomEffects(), []);

    return (
        <>
            <BackgroundLayers />
            <ScrollToTop />
            <LegacyHashRedirect />
            <Routes>
                <Route path="/" element={<AppShell />}>
                    <Route index element={<HomePage />} />
                    <Route path="research" element={<ResearchPage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
            <footer className="site-footer site-footer--shell">
                <p>© 2026 Tayyab Ahmed</p>
            </footer>
        </>
    );
}
