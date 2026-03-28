/**
 * Curated gallery assets under /media (deployed at site root with base '/').
 */

export type GalleryImageItem = {
    kind: "image";
    /** Path relative to site root, e.g. media/photo.jpg */
    src: string;
    alt: string;
    caption: string;
    /** Optional object-position for crops (e.g. focal point). */
    objectPosition?: string;
};

export type GalleryVideoItem = {
    kind: "video";
    src: string;
    alt: string;
    caption: string;
};

export type GalleryItem = GalleryImageItem | GalleryVideoItem;

export const GALLERY_ITEMS: readonly GalleryItem[] = [
    {
        kind: "image",
        src: "media/gallery-observation-deck.png",
        alt: "On a wooden observation deck overlooking autumn forest and rolling hills under a clear sky",
        caption: "Forest overlook",
    },
    {
        kind: "image",
        src: "media/poolMex.jpg",
        alt: "Bright blue swimming pool at night with white columns and warm lights",
        caption: "Pool",
    },
    {
        kind: "image",
        src: "media/gallery-chipmunk-trail.png",
        alt: "Chipmunk on a rock overlooking evergreen forest and distant peaks",
        caption: "Chipmunk & peaks",
        objectPosition: "center 88%",
    },
    {
        kind: "image",
        src: "media/gallery-toronto-skyline.png",
        alt: "CN Tower rising above brick and glass buildings under a bright blue sky",
        caption: "CN Tower",
    },
    {
        kind: "image",
        src: "media/gallery-mountain-trail.png",
        alt: "Mountain peaks reflected in a calm alpine lake at golden hour",
        caption: "Lake reflection",
    },
    {
        kind: "image",
        src: "media/gallery-suspension-bridge.png",
        alt: "Green suspension bridge over blue water with a motorboat and white wake",
        caption: "Suspension bridge",
        objectPosition: "center 85%",
    },
    {
        kind: "image",
        src: "media/gallery-palms-moon.png",
        alt: "Palm trees reaching into a clear blue sky with a slim crescent moon",
        caption: "Palms & moon",
    },
    {
        kind: "image",
        src: "media/gallery-hillside-houses.png",
        alt: "Mediterranean and Tudor-style homes on a lush green hillside",
        caption: "Hillside homes",
    },
    {
        kind: "image",
        src: "media/JerseyPicMe.jpeg",
        alt: "Outdoor photo wearing a sports jersey",
        caption: "Jersey",
    },
    {
        kind: "image",
        src: "media/gallery-maligne-lake.png",
        alt: "Maligne Lake boat house with mountains and bright blue sky, Jasper",
        caption: "Maligne Lake",
    },
    {
        kind: "image",
        src: "media/gallery-yc-office.png",
        alt: "Y Combinator space with Apply to YC and Make something people want banners",
        caption: "YC",
    },
    {
        kind: "image",
        src: "media/gallery-squirrel-feeder.png",
        alt: "Red squirrel eating sunflower seeds at a wooden feeder",
        caption: "Sentier des cimes",
    },
    {
        kind: "image",
        src: "media/gallery-library-study.png",
        alt: "Modern library study hall with curved ceiling and wooden tables",
        caption: "Study hall",
    },
    {
        kind: "image",
        src: "media/RedPanda.JPG",
        alt: "Red panda",
        caption: "Red panda",
    },
    {
        kind: "image",
        src: "media/gallery-bighorn-highway-square.png",
        alt: "Bighorn sheep lambs on a mountain highway with peaks and an approaching truck",
        caption: "Bighorn crossing",
    },
    {
        kind: "image",
        src: "media/MeTakingPicture.JPG",
        alt: "Behind the lens",
        caption: "Behind the lens",
    },
    {
        kind: "video",
        src: "media/banffWaterfallVid.MOV",
        alt: "Banff waterfall",
        caption: "Banff",
    },
    {
        kind: "image",
        src: "media/TwoGuysMex.jpg",
        alt: "Mexico",
        caption: "Mexico",
    },
    {
        kind: "image",
        src: "media/wellMex.jpg",
        alt: "Well",
        caption: "Well",
    },
    {
        kind: "image",
        src: "media/HouseCornerMex.jpg",
        alt: "Corner",
        caption: "Corner",
    },
    {
        kind: "image",
        src: "media/gallery-flight-deck.png",
        alt: "View from a flight deck toward sky and horizon",
        caption: "Flight deck",
    },
    {
        kind: "image",
        src: "media/gallery-forest-hike.png",
        alt: "Forest trail through tall trees",
        caption: "Forest hike",
    },
    {
        kind: "image",
        src: "media/gallery-mountain-lookout.png",
        alt: "Mountain lookout over layered peaks",
        caption: "Mountain lookout",
    },
] as const;

export function galleryImageItems(): readonly GalleryImageItem[] {
    return GALLERY_ITEMS.filter((i): i is GalleryImageItem => i.kind === "image");
}

/** First n still images for the sidebar snapshot strip (no video thumbs). */
export function snapshotPreviewImages(max = 6): readonly GalleryImageItem[] {
    return galleryImageItems().slice(0, max);
}
