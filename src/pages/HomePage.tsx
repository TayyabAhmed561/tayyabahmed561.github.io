import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="panel is-active" data-panel="featured" role="tabpanel" aria-labelledby="tab-featured">
            <p className="panel__label">Selected Work &amp; Research</p>
            <p className="featured__lede">
                A curated overview of applied machine learning systems, real-world experience, and technical deep dives.
            </p>

            <section className="featured-highlight" aria-labelledby="featured-role-title">
                <h2 id="featured-role-title" className="featured-highlight__title">
                    Machine Learning Engineer, Stealth AI Startup
                </h2>
                <p className="featured-highlight__subtitle">Biomedical ML · Noisy data · Robust evaluation · Real-world systems</p>
                <p className="featured-highlight__desc">
                    End-to-end ML for biomedical imaging under noisy, real-world conditions: preprocessing, validation, error
                    analysis, and tradeoffs when data and deployment constraints are tight.
                </p>
                <div className="featured-highlight__actions">
                    <Link to="/about" className="featured-highlight__action">
                        View Experience
                    </Link>
                    <a href="/work/stealth-role.html" className="featured-highlight__action featured-highlight__action--secondary">
                        View Deep Dive
                    </a>
                </div>
            </section>

            <div className="projects-deep-dives projects-deep-dives--featured" aria-label="Selected deep dives">
                <p className="projects-deep-dives__label">Selected deep dives</p>
                <p className="projects-deep-dives__lede">
                    How systems were built, debugged, and evaluated in practice: concise technical case studies.
                </p>
                <ul className="projects-deep-dives__list" role="list">
                    <li>
                        <a href="/work/mindsync.html" className="projects-deep-dives__link">
                            <span className="projects-deep-dives__link-title">MindSync</span>
                            <span className="projects-deep-dives__link-meta">EEG · limited labels · iteration &amp; evaluation</span>
                        </a>
                    </li>
                    <li>
                        <a href="/work/safesteps.html" className="projects-deep-dives__link">
                            <span className="projects-deep-dives__link-title">SafeSteps</span>
                            <span className="projects-deep-dives__link-meta">NLP in the wild · imbalance · schema fixes</span>
                        </a>
                    </li>
                    <li>
                        <a href="/work/job-agent.html" className="projects-deep-dives__link">
                            <span className="projects-deep-dives__link-title">DraftPilot</span>
                            <span className="projects-deep-dives__link-meta">
                                Multi-stage pipeline · scoring · human-in-the-loop
                            </span>
                        </a>
                    </li>
                </ul>
            </div>

            <section className="featured-walkthroughs" aria-label="Project walkthroughs">
                <p className="featured-section__label">Project walkthroughs</p>
                <p className="featured-section__lede">Short walkthroughs of systems built and evaluated in practice.</p>
                <ul className="walkthrough-list" role="list">
                    <li className="walkthrough-card">
                        <h3 className="walkthrough-card__title">MindSync | EEG-Based ML Pipeline</h3>
                        <p className="walkthrough-card__desc">
                            End-to-end pipeline for affect estimation from noisy EEG signals, focusing on preprocessing,
                            session-aware validation, and evaluation under limited labels.
                        </p>
                        <div className="walkthrough-card__embed">
                            <iframe
                                src="https://www.youtube.com/embed/50zqtQTgmh8"
                                title="MindSync project walkthrough"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                        <div className="walkthrough-card__links">
                            <a href="/work/mindsync.html" className="walkthrough-card__link">
                                Deep dive
                            </a>
                            <span className="walkthrough-card__sep" aria-hidden="true">
                                ·
                            </span>
                            <a href="https://github.com/TayyabAhmed561/MindSync" target="_blank" rel="noopener noreferrer" className="walkthrough-card__link">
                                GitHub
                            </a>
                            <span className="walkthrough-card__sep" aria-hidden="true">
                                ·
                            </span>
                            <a href="https://devpost.com/software/mindsync-qny03a" target="_blank" rel="noopener noreferrer" className="walkthrough-card__link">
                                Demo
                            </a>
                        </div>
                    </li>
                    <li className="walkthrough-card">
                        <h3 className="walkthrough-card__title">ESV | Geospatial ML Visualization</h3>
                        <p className="walkthrough-card__desc">
                            Interactive platform for exploring endangered species data using spatial analysis and real-time
                            filtering, designed to handle noisy and heterogeneous datasets.
                        </p>
                        <div className="walkthrough-card__embed">
                            <iframe
                                src="https://www.youtube.com/embed/66xZr1S3RvE?rel=0&modestbranding=1&cb=2"
                                title="ESV project walkthrough"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                        <div className="walkthrough-card__links">
                            <Link to="/projects" className="walkthrough-card__link">
                                Full project
                            </Link>
                            <span className="walkthrough-card__sep" aria-hidden="true">
                                ·
                            </span>
                            <a href="https://devpost.com/software/esv-endangered-species-visualizer" target="_blank" rel="noopener noreferrer" className="walkthrough-card__link">
                                Devpost
                            </a>
                        </div>
                    </li>
                    <li className="walkthrough-card">
                        <h3 className="walkthrough-card__title">SafeSteps | NLP + Agent Workflow System</h3>
                        <p className="walkthrough-card__desc">
                            Multi-step workflow system for hazard reporting and routing using NLP classification and structured
                            orchestration, highlighting real-world input variability and system constraints.
                        </p>
                        <div className="walkthrough-card__embed">
                            <iframe
                                src="https://www.youtube.com/embed/_tuEe1CAqak"
                                title="SafeSteps project walkthrough"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                                loading="lazy"
                            />
                        </div>
                        <div className="walkthrough-card__links">
                            <a href="/work/safesteps.html" className="walkthrough-card__link">
                                Deep dive
                            </a>
                            <span className="walkthrough-card__sep" aria-hidden="true">
                                ·
                            </span>
                            <a href="https://github.com/TayyabAhmed561/SafeSteps" target="_blank" rel="noopener noreferrer" className="walkthrough-card__link">
                                GitHub
                            </a>
                            <span className="walkthrough-card__sep" aria-hidden="true">
                                ·
                            </span>
                            <a href="https://devpost.com/software/safesteps-x93v1t" target="_blank" rel="noopener noreferrer" className="walkthrough-card__link">
                                Devpost
                            </a>
                            <span className="walkthrough-card__sep" aria-hidden="true">
                                ·
                            </span>
                            <a href="https://dorahacks.io/buidl/23036" target="_blank" rel="noopener noreferrer" className="walkthrough-card__link">
                                BUIDL
                            </a>
                        </div>
                    </li>
                </ul>
            </section>

            <section className="featured-previews" aria-label="Selected project previews">
                <p className="featured-section__label">Selected projects</p>
                <p className="featured-section__lede">
                    Highlights from the full list: pipelines, constraints, and evaluation-first work.
                </p>
                <ul className="featured-previews__list" role="list">
                    <li className="featured-preview">
                        <h3 className="featured-preview__title">MindSync</h3>
                        <p className="featured-preview__desc">
                            EEG → model path with session-aware splits and error review before “real-time” claims.
                        </p>
                        <Link to="/projects" className="featured-preview__link">
                            Open in Projects
                        </Link>
                    </li>
                    <li className="featured-preview">
                        <h3 className="featured-preview__title">DraftPilot</h3>
                        <p className="featured-preview__desc">
                            Review-first agent for tailored résumés and cover letters: local, inspectable, human-in-the-loop.
                        </p>
                        <Link to="/projects" className="featured-preview__link">
                            Open in Projects
                        </Link>
                    </li>
                    <li className="featured-preview">
                        <h3 className="featured-preview__title">SafeSteps</h3>
                        <p className="featured-preview__desc">Operational NLP under imbalance: errors drive schema and label fixes.</p>
                        <Link to="/projects" className="featured-preview__link">
                            Open in Projects
                        </Link>
                    </li>
                </ul>
            </section>

            <section className="featured-media" aria-label="Media and external links">
                <p className="featured-section__label">Media &amp; links</p>
                <nav className="featured-media__nav" aria-label="Proof and demos">
                    <a href="https://github.com/TayyabAhmed561" target="_blank" rel="noopener noreferrer" className="featured-media__link">
                        GitHub
                    </a>
                    <a href="https://github.com/TayyabAhmed561/DraftPilot" target="_blank" rel="noopener noreferrer" className="featured-media__link">
                        DraftPilot
                    </a>
                    <a href="https://devpost.com/software/mindsync-qny03a" target="_blank" rel="noopener noreferrer" className="featured-media__link">
                        MindSync demo
                    </a>
                    <a href="https://devpost.com/software/safesteps-x93v1t" target="_blank" rel="noopener noreferrer" className="featured-media__link">
                        SafeSteps (Devpost)
                    </a>
                    <a href="https://dorahacks.io/buidl/23036" target="_blank" rel="noopener noreferrer" className="featured-media__link">
                        SafeSteps (BUIDL)
                    </a>
                </nav>
            </section>
        </div>
    );
}
