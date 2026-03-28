export default function ContactPage() {
    return (
        <div className="panel is-active" data-panel="contact" role="tabpanel" aria-labelledby="tab-contact">
            <p className="panel__label">Contact</p>
            <div className="contact-panel">
                <div className="contact-row contact-row--stack contact-row--social">
                    <a href="https://linkedin.com/in/tayyabmahmed/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href="https://github.com/TayyabAhmed561" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>
                <ul className="contact-email-list" role="list">
                    <li className="contact-email-row contact-email-row--primary">
                        <span className="contact-email-row__label" id="contact-label-personal">
                            Email (preferred)
                        </span>
                        <a className="contact-email-row__mailto" href="mailto:tayyabahmed561@gmail.com">
                            tayyabahmed561@gmail.com
                        </a>
                        <span className="contact-email-row__tail">
                            <button
                                type="button"
                                className="contact-copy-btn"
                                data-copy-email="tayyabahmed561@gmail.com"
                                aria-labelledby="contact-label-personal contact-copy-personal-h"
                            >
                                <svg
                                    className="contact-copy-btn__icon"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                <span className="visually-hidden" id="contact-copy-personal-h">
                                    Copy personal email
                                </span>
                            </button>
                            <span className="contact-copy-status" role="status" aria-live="polite" />
                        </span>
                    </li>
                    <li className="contact-email-row contact-email-row--school">
                        <span className="contact-email-row__label" id="contact-label-school">
                            School
                        </span>
                        <a className="contact-email-row__mailto" href="mailto:tahmed06@uoguelph.ca">
                            tahmed06@uoguelph.ca
                        </a>
                        <span className="contact-email-row__tail">
                            <button
                                type="button"
                                className="contact-copy-btn"
                                data-copy-email="tahmed06@uoguelph.ca"
                                aria-labelledby="contact-label-school contact-copy-school-h"
                            >
                                <svg
                                    className="contact-copy-btn__icon"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                </svg>
                                <span className="visually-hidden" id="contact-copy-school-h">
                                    Copy school email
                                </span>
                            </button>
                            <span className="contact-copy-status" role="status" aria-live="polite" />
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
