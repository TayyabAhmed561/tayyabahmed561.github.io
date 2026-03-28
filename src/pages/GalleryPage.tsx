import { useEffect } from "react";

export default function GalleryPage() {
    useEffect(() => {
        const fire = () => document.dispatchEvent(new CustomEvent("gallery-layout-reflow"));
        fire();
        requestAnimationFrame(fire);
        const timers = [80, 280, 720].map((ms) => window.setTimeout(fire, ms));
        return () => timers.forEach(clearTimeout);
    }, []);

    return (
        <div className="panel is-active" data-panel="gallery" role="tabpanel" aria-labelledby="tab-gallery">
            <div className="gallery-panel-layout">
                <p className="panel__label">Gallery</p>
                <div className="gallery-masonry-wrap">
                    <div className="gallery-masonry" data-gallery-masonry role="list" />
                </div>
            </div>
        </div>
    );
}
