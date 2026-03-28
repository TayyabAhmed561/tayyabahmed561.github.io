import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { GalleryItem } from "../data/galleryItems";
import { GALLERY_ITEMS } from "../data/galleryItems";
import { assetUrl } from "../utils/assetUrl";

const IMG_SIZES =
    "(max-width: 520px) 50vw, (max-width: 900px) 33vw, (max-width: 1200px) 25vw, 220px";

type LightboxProps = {
    item: GalleryItem | null;
    onClose: () => void;
};

function GalleryLightbox({ item, onClose }: LightboxProps) {
    const titleId = useId();
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!item) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();
        return () => {
            document.body.style.overflow = prev;
        };
    }, [item]);

    useEffect(() => {
        if (!item) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [item, onClose]);

    if (!item) return null;

    return (
        <div
            className="gallery-lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="gallery-lightbox__panel">
                <button
                    ref={closeRef}
                    type="button"
                    className="gallery-lightbox__close"
                    onClick={onClose}
                    aria-label="Close preview"
                >
                    Close
                </button>
                <div className="gallery-lightbox__stage">
                    {item.kind === "image" ? (
                        <img
                            src={assetUrl(item.src)}
                            alt={item.alt}
                            className="gallery-lightbox__media"
                            style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                            decoding="async"
                            loading="eager"
                        />
                    ) : (
                        <video
                            className="gallery-lightbox__media gallery-lightbox__media--video"
                            src={assetUrl(item.src)}
                            controls
                            playsInline
                            preload="metadata"
                            aria-label={item.alt}
                        />
                    )}
                </div>
                <p id={titleId} className="gallery-lightbox__caption">
                    {item.caption}
                </p>
            </div>
        </div>
    );
}

export default function GalleryPage() {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const lightboxItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] ?? null : null;

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);

    return (
        <div className="panel is-active" data-panel="gallery" role="tabpanel" aria-labelledby="tab-gallery">
            <div className="gallery-panel-layout">
                <p className="panel__label">Gallery</p>
                <p className="gallery-react__lede">Selected travel and field snapshots — click to expand.</p>
                <div className="gallery-masonry-wrap">
                    <ul className="gallery-react" role="list">
                        {GALLERY_ITEMS.map((item, index) => (
                            <li key={`${item.kind}-${item.src}`} className="gallery-react__item" role="listitem">
                                <button
                                    type="button"
                                    className={`gallery-react__tile${item.kind === "video" ? " gallery-react__tile--video" : ""}`}
                                    onClick={() => setLightboxIndex(index)}
                                    aria-label={`Open ${item.caption}`}
                                >
                                    <span className="gallery-react__frame">
                                        {item.kind === "image" ? (
                                            <img
                                                src={assetUrl(item.src)}
                                                alt=""
                                                className="gallery-react__media"
                                                style={
                                                    item.objectPosition ? { objectPosition: item.objectPosition } : undefined
                                                }
                                                sizes={IMG_SIZES}
                                                decoding="async"
                                                loading={index < 8 ? "eager" : "lazy"}
                                                fetchPriority={index < 4 ? "high" : "auto"}
                                                draggable={false}
                                            />
                                        ) : (
                                            <video
                                                className="gallery-react__media gallery-react__media--video"
                                                src={assetUrl(item.src)}
                                                muted
                                                playsInline
                                                preload="metadata"
                                                aria-hidden={true}
                                                tabIndex={-1}
                                            />
                                        )}
                                        {item.kind === "video" ? (
                                            <span className="gallery-react__badge" aria-hidden="true">
                                                Video
                                            </span>
                                        ) : null}
                                    </span>
                                    <span className="gallery-react__label">{item.caption}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <GalleryLightbox item={lightboxItem} onClose={closeLightbox} />
        </div>
    );
}
