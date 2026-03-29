import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-FLZVSFS80G";

let scriptsInjected = false;

function injectGtag() {
    if (!import.meta.env.PROD || scriptsInjected) return;
    scriptsInjected = true;

    const inline = document.createElement("script");
    inline.textContent = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
`;
    document.head.appendChild(inline);

    const ext = document.createElement("script");
    ext.async = true;
    ext.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(ext);
}

/**
 * Loads gtag.js once in production and sends a page_view on every client-side route change.
 */
export function GoogleAnalytics() {
    const location = useLocation();
    const isProd = import.meta.env.PROD;

    useEffect(() => {
        if (!isProd) return;
        injectGtag();
    }, [isProd]);

    useEffect(() => {
        if (!isProd) return;

        const pagePath = `${location.pathname}${location.search}${location.hash}` || "/";

        const sendPageView = () => {
            if (typeof window.gtag !== "function") return;
            window.gtag("config", GA_MEASUREMENT_ID, {
                page_path: pagePath,
                page_title: document.title,
            });
        };

        sendPageView();
        const t1 = window.setTimeout(sendPageView, 100);
        const t2 = window.setTimeout(sendPageView, 800);

        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
        };
    }, [isProd, location.pathname, location.search, location.hash]);

    return null;
}

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}
