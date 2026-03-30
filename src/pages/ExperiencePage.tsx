import { Link } from "react-router-dom";

export default function ExperiencePage() {
    return (
        <div
            className="panel is-active"
            data-panel="experience"
            role="tabpanel"
            aria-labelledby="tab-experience"
        >
            <p className="panel__label">Experience</p>
            <div className="experience-list">
                <div className="experience-item">
                    <div className="experience-item__head">
                        <h3>Machine Learning Engineer</h3>
                        <span className="experience-item__tag">
                            Biomedical ML · Noisy data · Robust evaluation · Real-world systems
                        </span>
                    </div>
                    <p className="org">Stealth AI Startup</p>
                    <p className="dates">2025 to Present</p>
                    <ul>
                        <li>
                            Built and iterated on computer vision pipelines in Python/PyTorch for noisy, real-world
                            biomedical imaging data
                        </li>
                        <li>
                            Trained and evaluated CNN-based models on small, heterogeneous datasets under strict data and
                            validation constraints
                        </li>
                        <li>
                            Designed preprocessing and feature extraction workflows to improve robustness and
                            patient-level generalization
                        </li>
                        <li>
                            Applied structured validation strategies (e.g., cross-validation, error analysis) to ensure
                            reliable and interpretable performance
                        </li>
                    </ul>
                    <div className="experience-item__links">
                        <Link to="/work/stealth-role" className="experience-item__link">
                            View Deep Dive
                        </Link>
                    </div>
                </div>
                <div className="experience-item">
                    <div className="experience-item__head">
                        <h3>Embedded Systems Developer</h3>
                        <span className="experience-item__tag">Embedded / Real-Time</span>
                    </div>
                    <p className="org">Gryphon Racing (Formula SAE EV)</p>
                    <p className="dates">2026 to Present</p>
                    <ul>
                        <li>Developing embedded software for EV subsystems using microcontrollers and real-time sensor data</li>
                        <li>Implementing low-latency processing and safety-critical control logic</li>
                        <li>Collaborating across electrical and mechanical teams for system integration</li>
                    </ul>
                </div>
                <div className="experience-item">
                    <h3>Events Organizer &amp; Technical Contributor</h3>
                    <p className="org">Google Developer Student Club (GDSC)</p>
                    <p className="dates">2024 to Present</p>
                    <ul>
                        <li>Organized workshops and speaker events on ML, cloud systems, and applied AI (100+ students)</li>
                        <li>Contributed to curriculum design for Python, APIs, and machine learning fundamentals</li>
                    </ul>
                </div>
                <div className="experience-item">
                    <div className="experience-item__head">
                        <h3>Software Engineering Intern</h3>
                        <span className="experience-item__tag">Cloud / Data Systems</span>
                    </div>
                    <p className="org">Geotab</p>
                    <p className="dates">2021</p>
                    <ul>
                        <li>Analyzed large-scale cloud ingestion systems processing 30+ TB/day of telematics data</li>
                        <li>Worked with C#, .NET, SQL, and cloud systems in production environments</li>
                    </ul>
                </div>
                <div className="experience-item">
                    <h3>Technical Mentor</h3>
                    <p className="org">FIRST Robotics / STEMOTICS</p>
                    <p className="dates">2022 to 2025</p>
                    <ul>
                        <li>Led robotics workshops on embedded systems, debugging, and system design</li>
                        <li>Mentored teams in navigation, performance optimization, and competition strategy</li>
                        <li>Coached team to 2nd place out of 15 at FIRST LEGO League</li>
                    </ul>
                </div>
                <div className="experience-item">
                    <h3>Clinical Operations Assistant</h3>
                    <p className="org">IDA Pharmacy</p>
                    <p className="dates">2020 to 2025</p>
                    <ul>
                        <li>Managed patient intake, scheduling, and clinic coordination</li>
                        <li>Supported physicians with documentation and workflow optimization</li>
                    </ul>
                </div>
                <div className="experience-item">
                    <h3>Intern</h3>
                    <p className="org">Toastmasters International</p>
                    <p className="dates">2019</p>
                    <ul>
                        <li>Led presentations and facilitated group discussions</li>
                        <li>Improved communication and structured feedback skills</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
