export default function ProjectsPage() {
    return (
        <div className="panel is-active" data-panel="projects" role="tabpanel" aria-labelledby="tab-projects">
            <p className="panel__label">Projects</p>
            <div className="projects-deep-dives" aria-label="Selected deep dives">
                <p className="projects-deep-dives__label">Selected deep dives</p>
                <p className="projects-deep-dives__lede">
                    Extended notes on problem framing, what broke in practice, and how work was evaluated, meant for
                    supervisors and technical readers who want evidence, not taglines.
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
            <div className="project-list">
                <article className="project-item">
                    <div className="project-item__head">
                        <h3 className="project-item__title">MindSync</h3>
                        <span className="project-item__tag">Biomedical ML / Time Series</span>
                    </div>
                    <p className="project-item__desc">
                        EEG-based ML pipeline for affect estimation under noisy, real-world conditions, focusing on
                        preprocessing, evaluation, and reliability under data constraints.
                    </p>
                    <p className="project-item__tech">PyTorch · EEG · ML pipelines</p>
                    <div className="project-item__links">
                        <a href="/work/mindsync.html" className="project-item__link-deep">
                            Deep dive
                        </a>
                        <span className="project-item__link-sep" aria-hidden="true">
                            ·
                        </span>
                        <a href="https://github.com/TayyabAhmed561/MindSync" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <span className="project-item__link-sep" aria-hidden="true">
                            ·
                        </span>
                        <a href="https://devpost.com/software/mindsync-qny03a" target="_blank" rel="noopener noreferrer">
                            Demo
                        </a>
                    </div>
                </article>
                <article className="project-item">
                    <div className="project-item__head">
                        <h3 className="project-item__title">DraftPilot</h3>
                        <span className="project-item__tag">LLMs / Agentic Systems</span>
                    </div>
                    <p className="project-item__desc">
                        Local, agent-based system that ingests job postings, scores role-profile fit with explicit heuristics,
                        and generates constrained résumé and cover letter drafts, built for inspection and human-in-the-loop
                        control, not auto-submit.
                    </p>
                    <p className="project-item__signals">Interpretable scoring · template + LaTeX synthesis · full-stack (React + FastAPI)</p>
                    <p className="project-item__tech">React · TypeScript · FastAPI · Python · LaTeX</p>
                    <div className="project-item__links">
                        <a href="/work/job-agent.html" className="project-item__link-deep">
                            Deep dive
                        </a>
                        <span className="project-item__link-sep" aria-hidden="true">
                            ·
                        </span>
                        <a href="https://github.com/TayyabAhmed561/DraftPilot" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                </article>
                <article className="project-item">
                    <div className="project-item__head">
                        <h3 className="project-item__title">SafeSteps</h3>
                        <span className="project-item__tag">Applied NLP / Safety</span>
                    </div>
                    <p className="project-item__desc">
                        Data-driven safety platform combining NLP and geospatial analytics to classify, prioritize, and route
                        hazard reports in real-world environments.
                    </p>
                    <p className="project-item__tech">MongoDB · NLP · Geo analytics</p>
                    <div className="project-item__links">
                        <a href="/work/safesteps.html" className="project-item__link-deep">
                            Deep dive
                        </a>
                        <span className="project-item__link-sep" aria-hidden="true">
                            ·
                        </span>
                        <a href="https://github.com/TayyabAhmed561/SafeSteps" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <span className="project-item__link-sep" aria-hidden="true">
                            ·
                        </span>
                        <a href="https://devpost.com/software/safesteps-x93v1t" target="_blank" rel="noopener noreferrer">
                            Devpost
                        </a>
                        <span className="project-item__link-sep" aria-hidden="true">
                            ·
                        </span>
                        <a href="https://dorahacks.io/buidl/23036" target="_blank" rel="noopener noreferrer">
                            BUIDL
                        </a>
                    </div>
                </article>
                <article className="project-item">
                    <div className="project-item__head">
                        <h3 className="project-item__title">ESV (Endangered Species Visualized)</h3>
                        <span className="project-item__tag">Geospatial / Data Viz</span>
                    </div>
                    <p className="project-item__desc">
                        Interactive geospatial platform for visualizing endangered species data and increasing local awareness
                        through map-based insights.
                    </p>
                    <p className="project-item__tech">React · Mapbox · Data visualization</p>
                    <div className="project-item__links">
                        <a href="https://devpost.com/software/esv-endangered-species-visualizer" target="_blank" rel="noopener noreferrer">
                            Devpost
                        </a>
                    </div>
                </article>
                <article className="project-item">
                    <div className="project-item__head">
                        <h3 className="project-item__title">University Management System</h3>
                        <span className="project-item__tag">Backend / Systems</span>
                    </div>
                    <p className="project-item__desc">
                        Scalable Java cloud application built with modular OOP design, deployed on a custom database, with
                        integrated real-time system metrics monitoring.
                    </p>
                    <p className="project-item__tech">Java · Cloud · System design</p>
                    <div className="project-item__links">
                        <a href="https://github.com/TayyabAhmed561/UniversityManagementSystem" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                </article>
                <article className="project-item">
                    <div className="project-item__head">
                        <h3 className="project-item__title">Multi-Axis Gimbal</h3>
                        <span className="project-item__tag">Embedded / Control</span>
                    </div>
                    <p className="project-item__desc">
                        Embedded stabilization system using IMU data and closed-loop control, focused on real-time orientation
                        correction and hardware reliability.
                    </p>
                    <p className="project-item__tech">C++ · Embedded · Control systems</p>
                    <div className="project-item__links">
                        <a href="https://github.com/TayyabAhmed561/3-Axis-Gimbal" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                </article>
            </div>
        </div>
    );
}
