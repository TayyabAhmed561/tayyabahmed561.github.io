import { Link, useParams } from "react-router-dom";
import { getResearchNoteBySlug } from "../data/researchNotes";

function formatDisplayDate(isoDate: string) {
    const d = new Date(isoDate + "T12:00:00");
    if (Number.isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function ResearchNotePage() {
    const { slug } = useParams<{ slug: string }>();
    const note = getResearchNoteBySlug(slug);

    if (!note) {
        return (
            <div className="panel is-active" data-panel="research" role="tabpanel" aria-labelledby="tab-research">
                <p className="panel__label">Research</p>
                <div className="research-note-missing">
                    <p className="research-note-missing__title">Note not found</p>
                    <p className="research-note-missing__hint">This note does not exist or the link may be outdated.</p>
                    <Link to="/research" className="research-note-back">
                        ← Back to Research
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="panel is-active" data-panel="research" role="tabpanel" aria-labelledby="tab-research">
            <p className="panel__label">Research</p>
            <Link to="/research" className="research-note-back">
                ← Research overview
            </Link>
            <article className="research-note-article">
                <header className="research-note-article__header">
                    <div className="research-note-article__meta">
                        <time className="research-note-article__date" dateTime={note.date}>
                            {formatDisplayDate(note.date)}
                        </time>
                        {note.category ? (
                            <>
                                <span className="research-entry__sep" aria-hidden="true">
                                    ·
                                </span>
                                <span className="research-note-article__category">{note.category}</span>
                            </>
                        ) : null}
                        <span className="research-entry__sep" aria-hidden="true">
                            ·
                        </span>
                        <span className="research-note-article__kind">Note</span>
                    </div>
                    <h1 className="research-note-article__title">{note.title}</h1>
                </header>
                <div className="research-note-article__body">
                    {note.blocks.map((block, idx) => {
                        if (block.type === "p") {
                            return (
                                <p key={idx} className="research-note-article__p">
                                    {block.text}
                                </p>
                            );
                        }
                        return (
                            <ul key={idx} className="research-note-article__ul" role="list">
                                {block.items.map((item, j) => (
                                    <li key={j} className="research-note-article__li">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        );
                    })}
                </div>
            </article>
        </div>
    );
}
