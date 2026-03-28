import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        document.getElementById("panel-region")?.scrollTo(0, 0);

        if (hash === "#education" || hash === "#experience") {
            requestAnimationFrame(() => {
                document.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }
    }, [pathname, hash]);

    return null;
}
