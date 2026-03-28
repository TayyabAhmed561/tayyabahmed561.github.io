import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/**
 * One-time redirect from legacy #section URLs to path-based routes.
 */
export function LegacyHashRedirect() {
    const navigate = useNavigate();
    const done = useRef(false);

    useLayoutEffect(() => {
        if (done.current) return;
        const raw = window.location.hash.replace(/^#/, "");
        if (!raw) return;
        done.current = true;

        if (raw === "education") {
            navigate({ pathname: "/about", hash: "#education" }, { replace: true });
            return;
        }
        if (raw === "experience") {
            navigate({ pathname: "/about", hash: "#experience" }, { replace: true });
            return;
        }

        const map: Record<string, string> = {
            featured: "/",
            research: "/research",
            projects: "/projects",
            gallery: "/gallery",
            contact: "/contact",
            work: "/",
        };
        const path = map[raw];
        if (path) navigate(path, { replace: true });
    }, [navigate]);

    return null;
}
