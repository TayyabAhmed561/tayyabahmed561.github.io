import { NavLink, Outlet } from "react-router-dom";

function tabClass({ isActive }: { isActive: boolean }) {
    return isActive ? "is-active" : undefined;
}

function footerLinkClass({ isActive }: { isActive: boolean }) {
    return `panel-footer-nav__link${isActive ? " is-active" : ""}`;
}

export function AppShell() {
    return (
        <div id="app-root" className="app">
            <aside className="app__sidebar" aria-label="Profile">
                <div className="profile-panel">
                    <div className="intro intro--compact">
                        <header className="sidebar-section sidebar-section--hero">
                            <h1 className="intro__name">Tayyab Ahmed</h1>
                            <p className="intro__tagline">
                                Research-oriented engineer focused on building and evaluating machine learning systems
                                for real-world, multimodal, and data-constrained problems.
                            </p>
                        </header>

                        <section className="sidebar-section sidebar-section--info" aria-label="Education and location">
                            <p className="sidebar-section__label">Info</p>
                            <div className="intro__meta-stacked">
                                <span>University of Guelph</span>
                                <span>Toronto, Ontario</span>
                            </div>
                        </section>

                        <section className="sidebar-section sidebar-section--interests" aria-label="Interests">
                            <p className="sidebar-section__label">Interests</p>
                            <p className="intro__accent-line">applied ml · research · systems</p>
                        </section>

                        <section className="sidebar-section sidebar-section--tech" aria-label="Technical focus">
                            <p className="sidebar-section__label">Tech focus</p>
                            <p className="intro__accent-line intro__accent-line--muted">
                                pytorch · cv · nlp · pipelines · evaluation · agentic workflows
                            </p>
                        </section>

                        <section className="sidebar-section sidebar-section--research-interests" aria-label="Research interests">
                            <p className="sidebar-section__label">Research interests</p>
                            <p className="intro__accent-line intro__accent-line--muted">
                                Learning under data limits · multimodal modeling · robust real-world pipelines ·
                                evaluation, generalization &amp; debugging
                            </p>
                        </section>

                        <section className="sidebar-section sidebar-section--signals" aria-label="Technical signals">
                            <p className="sidebar-section__label">Technical signals</p>
                            <ul className="research-signals" role="list">
                                <li>Small-scale &amp; noisy datasets</li>
                                <li>Grouped / patient-level validation</li>
                                <li>Multimodal inputs</li>
                                <li>Cross-validation &amp; error analysis</li>
                                <li>Deployment-aware metrics</li>
                            </ul>
                        </section>

                        <section className="sidebar-section sidebar-section--links" aria-label="Links">
                            <p className="sidebar-section__label">Links</p>
                            <nav className="intro__links intro__links--links-row" aria-label="Primary links">
                                <NavLink to="/" end className={({ isActive }) => `intro__link${isActive ? " is-active" : ""}`}>
                                    Featured
                                </NavLink>
                                <span className="intro__links-sep" aria-hidden="true">
                                    ·
                                </span>
                                <NavLink
                                    to="/research"
                                    className={({ isActive }) => `intro__link${isActive ? " is-active" : ""}`}
                                >
                                    Research
                                </NavLink>
                                <span className="intro__links-sep" aria-hidden="true">
                                    ·
                                </span>
                                <NavLink
                                    to="/projects"
                                    className={({ isActive }) => `intro__link${isActive ? " is-active" : ""}`}
                                >
                                    Projects
                                </NavLink>
                                <span className="intro__links-sep" aria-hidden="true">
                                    ·
                                </span>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) => `intro__link${isActive ? " is-active" : ""}`}
                                >
                                    About
                                </NavLink>
                                <span className="intro__links-break" aria-hidden="true" />
                                <a
                                    href="https://github.com/TayyabAhmed561"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="intro__link"
                                >
                                    GitHub
                                </a>
                                <span className="intro__links-sep" aria-hidden="true">
                                    ·
                                </span>
                                <a
                                    href="https://linkedin.com/in/tayyabmahmed/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="intro__link"
                                >
                                    LinkedIn
                                </a>
                                <span className="intro__links-sep" aria-hidden="true">
                                    ·
                                </span>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) => `intro__link${isActive ? " is-active" : ""}`}
                                >
                                    Contact
                                </NavLink>
                            </nav>
                        </section>
                    </div>
                </div>

                <section className="sidebar-section snapshots-sidebar" aria-label="Snapshots preview">
                    <p className="snapshots-preview__label">Snapshots</p>
                    <div className="snapshots-grid" data-snapshots-preview />
                    <NavLink to="/gallery" className="snapshots-preview__cta">
                        Full gallery →
                    </NavLink>
                </section>

                <nav className="tab-nav sidebar-section sidebar-section--nav" role="tablist" aria-label="Sections">
                    <NavLink to="/" end role="tab" id="tab-featured" className={tabClass}>
                        Featured
                    </NavLink>
                    <NavLink to="/research" role="tab" id="tab-research" className={tabClass}>
                        Research
                    </NavLink>
                    <NavLink to="/projects" role="tab" id="tab-projects" className={tabClass}>
                        Projects
                    </NavLink>
                    <NavLink to="/about" role="tab" id="tab-about" className={tabClass}>
                        About
                    </NavLink>
                    <NavLink to="/gallery" role="tab" id="tab-gallery" className={tabClass}>
                        Gallery
                    </NavLink>
                    <NavLink to="/contact" role="tab" id="tab-contact" className={tabClass}>
                        Contact
                    </NavLink>
                </nav>
            </aside>

            <div className="app__panel-column">
                <div className="visual-panel">
                    <div className="visual-panel__bloom" aria-hidden="true" />
                    <div className="visual-panel__ambient" aria-hidden="true" />
                    <div className="visual-panel__geometry" aria-hidden="true" />
                    <div className="visual-panel__grain" aria-hidden="true" />
                    <div className="panel-region" id="panel-region">
                        <Outlet />
                    </div>

                    <nav className="panel-footer-nav" aria-label="Section quick links">
                        <NavLink to="/" end className={footerLinkClass}>
                            Featured
                        </NavLink>
                        <span className="panel-footer-nav__sep" aria-hidden="true">
                            ·
                        </span>
                        <NavLink to="/research" className={footerLinkClass}>
                            Research
                        </NavLink>
                        <span className="panel-footer-nav__sep" aria-hidden="true">
                            ·
                        </span>
                        <NavLink to="/projects" className={footerLinkClass}>
                            Projects
                        </NavLink>
                        <span className="panel-footer-nav__sep" aria-hidden="true">
                            ·
                        </span>
                        <NavLink to="/about#experience" className={footerLinkClass}>
                            Experience
                        </NavLink>
                        <span className="panel-footer-nav__sep" aria-hidden="true">
                            ·
                        </span>
                        <NavLink to="/about#education" className={footerLinkClass}>
                            Education
                        </NavLink>
                        <span className="panel-footer-nav__sep" aria-hidden="true">
                            ·
                        </span>
                        <NavLink to="/gallery" className={footerLinkClass}>
                            Gallery
                        </NavLink>
                        <span className="panel-footer-nav__sep" aria-hidden="true">
                            ·
                        </span>
                        <NavLink to="/contact" className={footerLinkClass}>
                            Contact
                        </NavLink>
                    </nav>
                </div>
            </div>
        </div>
    );
}
