export function BackgroundLayers() {
    return (
        <>
            <div id="static-stars-root" aria-hidden="true" />
            <div id="rising-particles-root" aria-hidden="true">
                <div className="animation-wrapper">
                    <div className="particle particle-1" />
                    <div className="particle particle-2" />
                    <div className="particle particle-3" />
                    <div className="particle particle-4" />
                </div>
            </div>
        </>
    );
}
