import { NavLink } from "react-router-dom";
import { snapshotPreviewImages } from "../data/galleryItems";
import { assetUrl } from "../utils/assetUrl";

export function SnapshotsPreview() {
    const shots = snapshotPreviewImages(6);

    return (
        <ul className="snapshots-grid" role="list">
            {shots.map((item) => (
                <li key={item.src} className="snapshots-preview__li">
                    <NavLink
                        to="/gallery"
                        className="snapshots-preview__cell"
                        aria-label={`Open gallery: ${item.caption}`}
                    >
                        <span className="snapshots-preview__thumb">
                            <img
                                src={assetUrl(item.src)}
                                alt=""
                                decoding="async"
                                loading="lazy"
                                draggable={false}
                                style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                            />
                        </span>
                    </NavLink>
                </li>
            ))}
        </ul>
    );
}
