import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RESEARCH_NOTE_PREVIEWS } from "../data/researchNotes";

type JsSectionKey = "experiments" | "paperAttempts" | "openQuestions";

const JS_TYPE_LABELS: Record<JsSectionKey, string> = {
    experiments: "Experiment",
    paperAttempts: "Paper Attempt",
    openQuestions: "Open Question",
};

const JS_NAV_LABELS: Record<JsSectionKey, string> = {
    experiments: "Experiments",
    paperAttempts: "Paper Attempts",
    openQuestions: "Open Questions",
};

interface JsEntry {
    date: string;
    title: string;
}

function readJsSections(): Record<JsSectionKey, JsEntry[]> {
    const raw = window.RESEARCH_ENTRIES;
    if (!raw) {
        return { experiments: [], paperAttempts: [], openQuestions: [] };
    }
    const out: Record<JsSectionKey, JsEntry[]> = {
        experiments: [],
        paperAttempts: [],
        openQuestions: [],
    };
    (["experiments", "paperAttempts", "openQuestions"] as const).forEach((key) => {
        const list = raw[key];
        if (!Array.isArray(list)) return;
        out[key] = list
            .map((item) => {
                const o = item as { date?: string; title?: string };
                if (!o?.date || !o?.title) return null;
                return { date: String(o.date), title: String(o.title) };
            })
            .filter(Boolean) as JsEntry[];
    });
    return out;
}

export function ResearchLatestActivity() {
    const navigate = useNavigate();
    const [jsSections, setJsSections] = useState(readJsSections);

    useEffect(() => {
        const id = window.setInterval(() => setJsSections(readJsSections()), 400);
        return () => clearInterval(id);
    }, []);

    const rows = useMemo(() => {
        type Row =
            | { kind: "note"; date: string; title: string; slug: string }
            | { kind: "js"; date: string; title: string; subtab: JsSectionKey };

        const merged: Row[] = [];

        RESEARCH_NOTE_PREVIEWS.forEach((n) => {
            merged.push({ kind: "note", date: n.date, title: n.title, slug: n.slug });
        });

        (["experiments", "paperAttempts", "openQuestions"] as const).forEach((key) => {
            jsSections[key].forEach((e) => {
                merged.push({ kind: "js", date: e.date, title: e.title, subtab: key });
            });
        });

        merged.sort((a, b) => b.date.localeCompare(a.date));
        return merged.slice(0, 3);
    }, [jsSections]);

    function formatDisplayDate(isoDate: string) {
        const d = new Date(isoDate + "T12:00:00");
        if (Number.isNaN(d.getTime())) return isoDate;
        return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }

    function openJsSubtab(subtab: JsSectionKey) {
        sessionStorage.setItem("researchOpenSubtab", subtab);
        void navigate("/research");
    }

    if (!rows.length) {
        return (
            <>
                <p className="research-workspace__latest-empty">
                    This section is currently quiet. New research notes, experiments, and breakdowns will appear here over
                    time.
                </p>
                <p className="research-workspace__latest-quiet-mark" aria-hidden="true">
                    · · · z z z · · ·
                </p>
            </>
        );
    }

    return (
        <>
            {rows.map((row, i) => (
                <div className="research-workspace__latest-item" key={`${row.kind}-${row.date}-${row.title}-${i}`}>
                    <div className="research-workspace__latest-row">
                        <time dateTime={row.date}>{formatDisplayDate(row.date)}</time>
                        <span className="research-workspace__latest-type">
                            {row.kind === "note" ? "Note" : JS_TYPE_LABELS[row.subtab]}
                        </span>
                    </div>
                    <p className="research-workspace__latest-title">{row.title}</p>
                    {row.kind === "note" ? (
                        <Link to={`/research/${row.slug}`} className="research-workspace__latest-jump">
                            Read note
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="research-workspace__latest-jump"
                            onClick={() => openJsSubtab(row.subtab)}
                            aria-controls={`research-pane-${row.subtab}`}
                        >
                            Open in {JS_NAV_LABELS[row.subtab]}
                        </button>
                    )}
                </div>
            ))}
        </>
    );
}
