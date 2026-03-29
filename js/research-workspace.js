/**
 * Research workspace: append entries to RESEARCH_ENTRIES, then call researchWorkspaceRefresh().
 *
 * Sections: notes (React-rendered feed; no data-research-feed in SPA), experiments, paperAttempts, openQuestions.
 * Published notes live in React (src/data/researchNotes.ts) with routes /research/:slug.
 *
 * Future extension (openQuestions): replace renderFeed empty branch with API-driven list + optional
 * submission UI; keep SECTION_KEYS and setResearchSubtab wiring stable.
 *
 * Entry shape (all fields optional except id, date, title, body):
 * {
 *   id: string,
 *   date: "YYYY-MM-DD",
 *   title: string,
 *   body: string | string[],
 *   category?: string,
 *   takeaway?: string,
 *   tags?: string[],
 *   relatedProject?: { label: string, href: string }
 * }
 */
(function () {
    const SECTION_KEYS = ["notes", "experiments", "paperAttempts", "openQuestions"];

    const TYPE_LABELS = {
        notes: "Note",
        experiments: "Experiment",
        paperAttempts: "Paper Attempt",
        openQuestions: "Open Question",
    };

    const EMPTY_HINTS = {
        notes: "Short-form notes are listed in the React app.",
        experiments: "Experiment notes and small technical studies will be added here as they are documented.",
        paperAttempts: "Implementation-oriented paper explorations will appear here over time.",
        openQuestions:
            "Research questions and threads I am working through will appear here when they are written up.",
    };

    const SUBSECTION_NAV_LABELS = {
        notes: "Notes",
        experiments: "Experiments",
        paperAttempts: "Paper Attempts",
        openQuestions: "Open Questions",
    };

    const RESEARCH_ENTRIES = {
        notes: [],
        experiments: [],
        paperAttempts: [],
        openQuestions: [],
    };

    function escapeHtml(text) {
        if (text == null) return "";
        const s = String(text);
        return s
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function formatDisplayDate(isoDate) {
        if (!isoDate) return "";
        const d = new Date(isoDate + "T12:00:00");
        if (Number.isNaN(d.getTime())) return isoDate;
        return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }

    function bodyToParagraphs(entry) {
        if (Array.isArray(entry.body)) return entry.body.map((p) => String(p).trim()).filter(Boolean);
        return String(entry.body || "")
            .split(/\n\s*\n/)
            .map((p) => p.trim())
            .filter(Boolean);
    }

    function renderEntry(entry, sectionKey) {
        const typeLabel = TYPE_LABELS[sectionKey];
        const paras = bodyToParagraphs(entry);
        const bodyHtml = paras.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
        const category = entry.category
            ? `<span class="research-entry__sep" aria-hidden="true">\u00b7</span><span class="research-entry__category">${escapeHtml(entry.category)}</span>`
            : "";
        const takeaway = entry.takeaway
            ? `<p class="research-entry__takeaway"><span class="research-entry__takeaway-label">Takeaway</span> ${escapeHtml(entry.takeaway)}</p>`
            : "";
        const tags =
            entry.tags && entry.tags.length
                ? `<ul class="research-entry__tags" role="list">${entry.tags
                      .map((t) => `<li>${escapeHtml(t)}</li>`)
                      .join("")}</ul>`
                : "";
        const related = entry.relatedProject
            ? `<p class="research-entry__related">Related: <a href="${escapeHtml(entry.relatedProject.href)}">${escapeHtml(
                  entry.relatedProject.label
              )}</a></p>`
            : "";

        return `
            <article class="research-entry" data-research-entry-id="${escapeHtml(entry.id)}">
                <div class="research-entry__meta">
                    <time class="research-entry__date" datetime="${escapeHtml(entry.date)}">${escapeHtml(formatDisplayDate(entry.date))}</time>
                    ${category}
                    <span class="research-entry__type">${escapeHtml(typeLabel)}</span>
                </div>
                <h3 class="research-entry__title">${escapeHtml(entry.title)}</h3>
                <div class="research-entry__body">${bodyHtml}</div>
                ${takeaway}
                ${tags}
                ${related}
            </article>
        `.trim();
    }

    function renderEmptyState(sectionKey) {
        const futureNote =
            sectionKey === "openQuestions"
                ? `<p class="research-empty__future" data-research-open-questions-placeholder>
                    Visitor responses or threaded discussion may be added here later; for now this area stays read-only.
                </p>`
                : "";

        return `
            <div class="research-empty">
                <p class="research-empty__title">No entries published yet.</p>
                <p class="research-empty__hint">${escapeHtml(EMPTY_HINTS[sectionKey])}</p>
                ${futureNote}
            </div>
        `.trim();
    }

    function renderFeed(sectionKey) {
        const root = document.querySelector(`[data-research-feed="${sectionKey}"]`);
        if (!root) return;
        const list = RESEARCH_ENTRIES[sectionKey];
        if (!list.length) {
            root.innerHTML = renderEmptyState(sectionKey);
            return;
        }
        const sorted = [...list].sort((a, b) => String(b.date).localeCompare(String(a.date)));
        root.innerHTML = sorted.map((e) => renderEntry(e, sectionKey)).join("");
    }

    function renderLatest() {
        const root = document.querySelector("[data-research-latest]");
        if (!root) return;

        const merged = [];
        SECTION_KEYS.forEach((key) => {
            (RESEARCH_ENTRIES[key] || []).forEach((entry) => {
                merged.push({ entry, sectionKey: key });
            });
        });

        if (!merged.length) {
            root.innerHTML = `
                <p class="research-workspace__latest-empty">This section is currently quiet. New research notes, experiments, and breakdowns will appear here over time.</p>
                <p class="research-workspace__latest-quiet-mark" aria-hidden="true">\u00b7 \u00b7 \u00b7 z z z \u00b7 \u00b7 \u00b7</p>
            `.trim();
            return;
        }

        merged.sort((a, b) => String(b.entry.date).localeCompare(String(a.entry.date)));
        const top = merged.slice(0, 3);

        root.innerHTML = top
            .map(({ entry, sectionKey }) => {
                const navLabel = SUBSECTION_NAV_LABELS[sectionKey];
                return `
                <div class="research-workspace__latest-item">
                    <div class="research-workspace__latest-row">
                        <time datetime="${escapeHtml(entry.date)}">${escapeHtml(formatDisplayDate(entry.date))}</time>
                        <span class="research-workspace__latest-type">${escapeHtml(TYPE_LABELS[sectionKey])}</span>
                    </div>
                    <p class="research-workspace__latest-title">${escapeHtml(entry.title)}</p>
                    <button type="button" class="research-workspace__latest-jump" data-research-jump="${escapeHtml(sectionKey)}" aria-controls="research-pane-${sectionKey}">Open in ${escapeHtml(navLabel)}</button>
                </div>
            `.trim();
            })
            .join("");

        root.querySelectorAll("[data-research-jump]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const key = btn.getAttribute("data-research-jump");
                if (key) setResearchSubtab(key);
            });
        });
    }

    function setResearchSubtab(key) {
        if (!SECTION_KEYS.includes(key)) return;

        document.querySelectorAll("[data-research-subtab]").forEach((btn) => {
            const on = btn.getAttribute("data-research-subtab") === key;
            btn.classList.toggle("is-active", on);
            btn.setAttribute("aria-selected", on ? "true" : "false");
        });

        document.querySelectorAll("[data-research-pane]").forEach((pane) => {
            const on = pane.getAttribute("data-research-pane") === key;
            pane.classList.toggle("is-active", on);
            pane.setAttribute("aria-hidden", on ? "false" : "true");
        });
    }

    let researchSubtabDelegationBound = false;

    /**
     * Subtabs are React-mounted after this script may have run; delegate from document so clicks
     * work on first visit to /research without a full reload. Gate on .research-workspace.
     */
    function initSubtabs() {
        if (researchSubtabDelegationBound) return;
        researchSubtabDelegationBound = true;
        document.addEventListener("click", (e) => {
            const t = e.target;
            if (!t || typeof t.closest !== "function") return;
            const btn = t.closest("[data-research-subtab]");
            if (!btn || !btn.closest(".research-workspace")) return;
            const k = btn.getAttribute("data-research-subtab");
            if (!k) return;
            e.preventDefault();
            setResearchSubtab(k);
        });
    }

    function researchWorkspaceRefresh() {
        SECTION_KEYS.forEach(renderFeed);
        renderLatest();
    }

    function init() {
        initSubtabs();
        researchWorkspaceRefresh();
    }

    window.RESEARCH_ENTRIES = RESEARCH_ENTRIES;
    window.researchWorkspaceRefresh = researchWorkspaceRefresh;
    window.setResearchSubtab = setResearchSubtab;

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
