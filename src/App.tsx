import { useEffect, useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BackgroundLayers } from "./BackgroundLayers";
import { ScrollToTop } from "./ScrollToTop";
import { LegacyHashRedirect } from "./LegacyHashRedirect";
import { bindPortfolioDomEffects } from "./initDomEffects";
import { GoogleAnalytics } from "./GoogleAnalytics";
import { AppShell } from "./layouts/AppShell";
import HomePage from "./pages/HomePage";
import ResearchPage from "./pages/ResearchPage";
import ResearchNotePage from "./pages/ResearchNotePage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import EducationPage from "./pages/EducationPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import DeepDivePage from "./pages/DeepDivePage";

const SCRIPT_FILES = [
    "rising-particles.js",
    "perplexity-backgrounds.js",
    "film-strip.js",
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
            <GoogleAnalytics />
            <BackgroundLayers />
            <ScrollToTop />
            <LegacyHashRedirect />
            <Routes>
                <Route path="/" element={<AppShell />}>
                    <Route index element={<HomePage />} />
                    <Route path="research/:slug" element={<ResearchNotePage />} />
                    <Route path="research" element={<ResearchPage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="about" element={<ExperiencePage />} />
                    <Route path="education" element={<EducationPage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="work/:slug" element={<DeepDivePage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
            <footer className="site-footer site-footer--shell">
                <div className="site-footer-shell__row">
                    <p>© 2026 Tayyab Ahmed</p>
                    {import.meta.env.PROD ? (
                        <p
                            className="site-footer__traffic"
                            title="Visit counts are aggregated privately; there is no public view total on this static site."
                        >
                            Aggregate traffic
                        </p>
                    ) : null}
                </div>
            </footer>
        </>
    );
}
