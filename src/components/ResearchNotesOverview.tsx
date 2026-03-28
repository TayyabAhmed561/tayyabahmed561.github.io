import { Link } from "react-router-dom";
import { RESEARCH_NOTE_PREVIEWS } from "../data/researchNotes";

function formatDisplayDate(isoDate: string) {
    const d = new Date(isoDate + "T12:00:00");
    if (Number.isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function ResearchNotesOverview() {
    if (!RESEARCH_NOTE_PREVIEWS.length) {
        return (
            <div className="research-empty">
                <p className="research-empty__title">No notes published yet.</p>
                <p className="research-empty__hint">
                    Short-form notes, sketches, and reading reflections will appear here as they are published.
                </p>
            </div>
        );
    }

    return (
        <div className="research-notes-preview">
            <ul className="research-notes-preview__list" role="list">
                {RESEARCH_NOTE_PREVIEWS.map((note) => (
                    <li key={note.slug}>
                        <Link to={`/research/${note.slug}`} className="research-notes-preview__link">
                            <span className="research-notes-preview__link-title">{note.title}</span>
                            <span className="research-notes-preview__link-meta">
                                {formatDisplayDate(note.date)}
                                {note.category ? (
                                    <>
                                        <span className="research-notes-preview__dot" aria-hidden="true">
                                            {" "}
                                            ·{" "}
                                        </span>
                                        {note.category}
                                    </>
                                ) : null}
                            </span>
                            <span className="research-notes-preview__desc">{note.summary}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
