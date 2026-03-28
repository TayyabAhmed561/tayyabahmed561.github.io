import { useEffect } from "react";

export default function ResearchPage() {
    useEffect(() => {
        let n = 0;
        const tryRefresh = () => {
            if (window.researchWorkspaceRefresh) {
                window.researchWorkspaceRefresh();
                return;
            }
            if (n++ < 80) window.setTimeout(tryRefresh, 50);
        };
        tryRefresh();
    }, []);

    return (
        <div className="panel is-active" data-panel="research" role="tabpanel" aria-labelledby="tab-research">
            <p className="panel__label">Research</p>
            <div className="research-workspace">
                <p className="research-workspace__lede">
                    Ongoing notes, experiments, and questions around machine learning systems, evaluation, and real-world
                    robustness.
                </p>

                <aside className="research-workspace__latest" aria-label="Latest research activity">
                    <p className="research-workspace__latest-label">Latest activity</p>
                    <div className="research-workspace__latest-inner" data-research-latest />
                </aside>

                <div className="research-subnav" role="tablist" aria-label="Research workspace categories">
                    <button
                        type="button"
                        className="research-subnav__btn is-active"
                        role="tab"
                        id="research-tab-logs"
                        data-research-subtab="logs"
                        aria-controls="research-pane-logs"
                        aria-selected="true"
                    >
                        Logs
                    </button>
                    <button
                        type="button"
                        className="research-subnav__btn"
                        role="tab"
                        id="research-tab-insights"
                        data-research-subtab="insights"
                        aria-controls="research-pane-insights"
                        aria-selected="false"
                    >
                        Insights
                    </button>
                    <button
                        type="button"
                        className="research-subnav__btn"
                        role="tab"
                        id="research-tab-experiments"
                        data-research-subtab="experiments"
                        aria-controls="research-pane-experiments"
                        aria-selected="false"
                    >
                        Experiments
                    </button>
                    <button
                        type="button"
                        className="research-subnav__btn"
                        role="tab"
                        id="research-tab-paperAttempts"
                        data-research-subtab="paperAttempts"
                        aria-controls="research-pane-paperAttempts"
                        aria-selected="false"
                    >
                        Paper Attempts
                    </button>
                    <button
                        type="button"
                        className="research-subnav__btn"
                        role="tab"
                        id="research-tab-openQuestions"
                        data-research-subtab="openQuestions"
                        aria-controls="research-pane-openQuestions"
                        aria-selected="false"
                    >
                        Open Questions
                    </button>
                </div>

                <div className="research-panes">
                    <div
                        id="research-pane-logs"
                        className="research-pane is-active"
                        data-research-pane="logs"
                        role="tabpanel"
                        aria-labelledby="research-tab-logs"
                        aria-hidden="false"
                    >
                        <div className="research-feed" data-research-feed="logs" />
                    </div>
                    <div
                        id="research-pane-insights"
                        className="research-pane"
                        data-research-pane="insights"
                        role="tabpanel"
                        aria-labelledby="research-tab-insights"
                        aria-hidden="true"
                    >
                        <div className="research-feed" data-research-feed="insights" />
                    </div>
                    <div
                        id="research-pane-experiments"
                        className="research-pane"
                        data-research-pane="experiments"
                        role="tabpanel"
                        aria-labelledby="research-tab-experiments"
                        aria-hidden="true"
                    >
                        <div className="research-feed" data-research-feed="experiments" />
                    </div>
                    <div
                        id="research-pane-paperAttempts"
                        className="research-pane"
                        data-research-pane="paperAttempts"
                        role="tabpanel"
                        aria-labelledby="research-tab-paperAttempts"
                        aria-hidden="true"
                    >
                        <div className="research-feed" data-research-feed="paperAttempts" />
                    </div>
                    <div
                        id="research-pane-openQuestions"
                        className="research-pane"
                        data-research-pane="openQuestions"
                        role="tabpanel"
                        aria-labelledby="research-tab-openQuestions"
                        aria-hidden="true"
                    >
                        <div className="research-feed" data-research-feed="openQuestions" />
                    </div>
                </div>
            </div>
        </div>
    );
}
