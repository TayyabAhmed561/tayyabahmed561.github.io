import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";

const SLUGS = ["mindsync", "safesteps", "job-agent", "stealth-role"] as const;
type Slug = (typeof SLUGS)[number];

function isSlug(s: string | undefined): s is Slug {
    return s !== undefined && (SLUGS as readonly string[]).includes(s);
}

const DEFAULT_DOC_TITLE = "Tayyab Ahmed: Portfolio · ML & research systems";

export default function DeepDivePage() {
    const { slug } = useParams<{ slug: string }>();
    const [inner, setInner] = useState<string | null>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        return () => {
            document.title = DEFAULT_DOC_TITLE;
        };
    }, []);

    useEffect(() => {
        if (!isSlug(slug)) return;

        let cancelled = false;
        setInner(null);
        setFailed(false);

        const base = import.meta.env.BASE_URL.endsWith("/")
            ? import.meta.env.BASE_URL
            : `${import.meta.env.BASE_URL}/`;
        const url = `${base}work/${slug}.html`;
        void fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(String(res.status));
                return res.text();
            })
            .then((html) => {
                if (cancelled) return;
                const doc = new DOMParser().parseFromString(html, "text/html");
                const layout = doc.querySelector(".deep-dive-layout");
                if (!layout) throw new Error("no layout");
                const back = layout.querySelector("a.deep-dive-back");
                if (back) {
                    back.setAttribute("href", base.replace(/\/?$/, "/") || "/");
                }
                setInner(layout.innerHTML);
                const t = doc.querySelector("title")?.textContent?.trim();
                if (t) document.title = t;
            })
            .catch(() => {
                if (!cancelled) setFailed(true);
            });

        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (!isSlug(slug)) {
        return <Navigate to="/projects" replace />;
    }

    if (failed) {
        return (
            <div className="panel is-active" data-panel="deep-dive">
                <p className="panel__label">Deep dive</p>
                <p className="deep-dive-fallback">
                    This write-up could not be loaded.{" "}
                    <Link to="/projects">Back to projects</Link>
                </p>
            </div>
        );
    }

    if (inner === null) {
        return (
            <div className="panel is-active" data-panel="deep-dive">
                <p className="panel__label deep-dive-loading">Loading…</p>
            </div>
        );
    }

    return (
        <div className="panel is-active deep-dive-shell" data-panel="deep-dive">
            <div className="deep-dive-body deep-dive-body--embedded">
                <div className="deep-dive-layout" dangerouslySetInnerHTML={{ __html: inner }} />
            </div>
        </div>
    );
}
