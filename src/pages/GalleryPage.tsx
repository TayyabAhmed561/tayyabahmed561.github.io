export default function GalleryPage() {
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
