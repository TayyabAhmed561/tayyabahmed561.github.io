/**
 * Published research notes: overview previews + long-form blocks for detail routes.
 * Add new notes here; slug becomes /research/:slug
 */
export type ResearchNoteBlock =
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] };

export interface ResearchNote {
    id: string;
    slug: string;
    date: string;
    title: string;
    category?: string;
    summary: string;
    blocks: ResearchNoteBlock[];
}

export const RESEARCH_NOTES: ResearchNote[] = [
    {
        id: "reality-of-data",
        slug: "the-reality-of-data",
        date: "2026-03-28",
        title: "The reality of data",
        category: "Data · evaluation",
        summary:
            "Ambitious ideas often meet scarce, noisy data. On preprocessing, reproducible pipelines, and evaluation when generalization matters more than memorization.",
        blocks: [
            {
                type: "p",
                text: 'How many times have I thought of an idea that seems amazing initially, but in hindsight doesn\u2019t work out, ends up being a lot more of a hassle than originally thought, or simply lacks the resources needed to carry it out? It\u2019s interesting how ambitious one can be when starting off a project that can seem \u201crevolutionary\u201d, efficient, unique, and daring, but then be hit with the reality of data and how important it is to have clean, modular data in abundance, with consistent structure and usable distributions. And if many criteria of data are not addressed, the outcome of the project or research often hits a bottleneck in performance or scalability. Especially in the context of training models, having adequate data is the determinant of a successful outcome.',
            },
            {
                type: "p",
                text: "Lately, I have been working on building models when data is scarce, noisy, inconsistent, and evaluation is not straightforward or statistically reliable. Taking the time to process this data is often just as important as building the models. If left unaddressed, this can lead to training models where memorization is measured rather than generalization, leading to misleading validation performance.",
            },
            {
                type: "p",
                text: "In this case, having the correct hyperparameters and adequate preprocessing plays a huge role and matters way more than model architecture in these data-constrained settings. Making changes in filtering, normalization, segmentation, and applying various transformations can completely change the results and model behaviour.",
            },
            {
                type: "p",
                text: 'I found it important to focus less on \u201cwhich model performs best\u201d, as many work fine with scarce data anyway, but more on:',
            },
            {
                type: "ul",
                items: [
                    "How robust and reproducible the pipeline is.",
                    "Understanding how to adapt to results.",
                    "Understanding the data itself in detail and knowing what I'm working with.",
                    "And how reliable the evaluation actually is.",
                ],
            },
            {
                type: "p",
                text: "This is where using tools and libraries becomes much more valuable, as they allow for easier understanding of the data, formatting, cleaning, storing, visualizing, and identifying any inconsistencies as well.",
            },
        ],
    },
];

export function getResearchNoteBySlug(slug: string | undefined): ResearchNote | undefined {
    if (!slug) return undefined;
    return RESEARCH_NOTES.find((n) => n.slug === slug);
}

export interface ResearchNotePreview {
    slug: string;
    date: string;
    title: string;
    category?: string;
    summary: string;
}

export const RESEARCH_NOTE_PREVIEWS: ResearchNotePreview[] = [...RESEARCH_NOTES]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ slug, date, title, category, summary }) => ({ slug, date, title, category, summary }));
