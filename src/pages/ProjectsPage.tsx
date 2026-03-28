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
                        End-to-end pipeline from raw EEG through conditioning to deep models for affect estimation, centering
                        artifact-heavy biosignals, thin labels, and whether splits leak session structure before claiming
                        “real-time” performance.
                    </p>
                    <p className="project-item__signals">Noisy biosignals · session-aware validation · ablations &amp; error stratification</p>
                    <p className="project-item__tech">Python · PyTorch · DSP / EEG</p>
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
                        Hazard reporting flows with messy user text in the wild; classification and routing under class
                        imbalance, with emphasis on failure slices, label noise, and tightening the schema when the model
                        confidently misfires.
                    </p>
                    <p className="project-item__signals">Imbalanced classes · error-driven labeling · operational NLP</p>
                    <p className="project-item__tech">Python · MongoDB · NLP</p>
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
                        Exploratory stack for species occurrence data: filtering suspect records, map-backed sanity checks,
                        and aggregates transparent enough that domain experts can see what a heatmap is (and isn’t) evidence
                        for.
                    </p>
                    <p className="project-item__tech">React · Mapbox · JavaScript</p>
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
                        Multi-tenant Java services with RBAC and analytics paths that had to stay correct under concurrent use:
                        systems engineering that sits alongside ML work when reliability and data integrity are non-negotiable.
                    </p>
                    <p className="project-item__tech">Java · AWS · MySQL</p>
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
                        Closed-loop stabilization from noisy IMU streams: calibration drift, filter tuning, and closing the gap
                        between bench models and hardware that actually shakes in your hands.
                    </p>
                    <p className="project-item__tech">Arduino · C++ · Embedded Systems</p>
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
