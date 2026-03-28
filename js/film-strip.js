/**
 * Gallery: masonry grid (main panel), compact snapshots (sidebar), lightbox on click.
 */
(function () {
    const FRAMES = [
        { src: "media/gallery-observation-deck.png", alt: "On a wooden observation deck overlooking autumn forest and rolling hills under a clear sky", caption: "Forest overlook" },
        { src: "media/poolMex.jpg", alt: "Bright blue swimming pool at night with white columns and warm lights", caption: "Pool" },
        {
            src: "media/gallery-chipmunk-trail.png",
            alt: "Chipmunk on a rock overlooking evergreen forest and distant peaks",
            caption: "Chipmunk & peaks",
            snapshotObjectPosition: "center 88%",
        },
        { src: "media/gallery-toronto-skyline.png", alt: "CN Tower rising above brick and glass buildings under a bright blue sky", caption: "CN Tower" },
        { src: "media/gallery-mountain-trail.png", alt: "Mountain peaks reflected in a calm alpine lake at golden hour", caption: "Lake reflection" },
        {
            src: "media/gallery-suspension-bridge.png",
            alt: "Green suspension bridge over blue water with a motorboat and white wake",
            caption: "Suspension bridge",
            snapshotObjectPosition: "center 85%",
        },
        { src: "media/gallery-palms-moon.png", alt: "Palm trees reaching into a clear blue sky with a slim crescent moon", caption: "Palms & moon" },
        { src: "media/gallery-hillside-houses.png", alt: "Mediterranean and Tudor-style homes on a lush green hillside with terracotta roofs and palm trees", caption: "Hillside homes" },
        { src: "media/JerseyPicMe.jpeg", alt: "Outdoor photo wearing a sports jersey", caption: "Jersey" },
        { src: "media/gallery-maligne-lake.png", alt: "Maligne Lake Boat House on stilts with mountains and bright blue sky, Jasper", caption: "Maligne Lake" },
        { src: "media/gallery-yc-office.png", alt: "Y Combinator space with Apply to YC and Make something people want banners, stools, and art", caption: "YC" },
        { src: "media/gallery-squirrel-feeder.png", alt: "Red squirrel eating sunflower seeds at a wooden feeder, Sentier des cimes", caption: "Sentier des cimes" },
        { src: "media/gallery-library-study.png", alt: "Modern library study hall with curved ceiling, oval light, and rows of wooden tables", caption: "Study hall" },
        { src: "media/RedPanda.JPG", alt: "Red panda", caption: "Red panda" },
        { src: "media/gallery-bighorn-highway-square.png", alt: "Bighorn sheep lambs on a mountain highway with peaks and an approaching truck", caption: "Bighorn crossing" },
        { src: "media/MeTakingPicture.JPG", alt: "Behind the lens", caption: "Behind the lens" },
        { type: "video", src: "media/banffWaterfallVid.MOV", alt: "Banff waterfall", caption: "Banff" },
        { src: "media/TwoGuysMex.jpg", alt: "Mexico", caption: "Mexico" },
        { src: "media/wellMex.jpg", alt: "Well", caption: "Well" },
        { src: "media/HouseCornerMex.jpg", alt: "Corner", caption: "Corner" },
    ];

    function previewEntries() {
        return FRAMES.map((item, index) => ({ item, index })).filter(({ item }) => item.type !== "video").slice(0, 6);
    }

    function mediaEl(item, { loopPreview = false, eager = false } = {}) {
        if (item.type === "video") {
            const v = document.createElement("video");
            v.src = item.src;
            v.muted = true;
            v.loop = true;
            v.playsInline = true;
            if (loopPreview) v.autoplay = true;
            v.setAttribute("aria-label", item.alt);
            v.preload = eager ? "metadata" : "none";
            return v;
        }
        const img = document.createElement("img");
        img.src = item.src;
        img.alt = item.alt;
        img.loading = eager ? "eager" : "lazy";
        return img;
    }

    function openLightbox(item) {
        let lb = document.getElementById("film-lightbox");
        if (!lb) {
            lb = document.createElement("div");
            lb.id = "film-lightbox";
            lb.className = "lightbox";
            lb.setAttribute("role", "dialog");
            lb.setAttribute("aria-modal", "true");
            const inner = document.createElement("div");
            inner.className = "lightbox__inner";
            const close = document.createElement("button");
            close.type = "button";
            close.className = "lightbox__close";
            close.textContent = "Close";
            inner.appendChild(close);
            lb.appendChild(inner);
            document.body.appendChild(lb);

            close.addEventListener("click", closeLightbox);
            lb.addEventListener("click", (e) => {
                if (e.target === lb) closeLightbox();
            });
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") closeLightbox();
            });
        }

        const inner = lb.querySelector(".lightbox__inner");
        const prev = inner.querySelector("img, video");
        if (prev) prev.remove();

        let node;
        if (item.type === "video") {
            node = document.createElement("video");
            node.src = item.src;
            node.controls = true;
            node.autoplay = true;
            node.muted = true;
            node.loop = true;
            node.playsInline = true;
        } else {
            node = document.createElement("img");
            node.src = item.src;
            node.alt = item.alt;
        }
        inner.insertBefore(node, inner.firstChild);

        lb.classList.add("is-open");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        const lb = document.getElementById("film-lightbox");
        if (!lb) return;
        const v = lb.querySelector("video");
        if (v) v.pause();
        lb.classList.remove("is-open");
        document.body.style.overflow = "";
    }

    function buildSnapshots(container) {
        container.innerHTML = "";
        previewEntries().forEach(({ item, index }) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "snapshots-grid__cell";
            btn.setAttribute("aria-label", `View full size: ${item.alt}`);

            const thumb = document.createElement("span");
            thumb.className = "snapshots-grid__thumb";
            const img = document.createElement("img");
            img.src = item.src;
            img.alt = "";
            img.loading = "lazy";
            if (item.snapshotObjectPosition) img.style.objectPosition = item.snapshotObjectPosition;
            thumb.appendChild(img);
            btn.appendChild(thumb);
            container.appendChild(btn);

            btn.addEventListener("click", () => openLightbox(FRAMES[index]));
        });
    }

    function getMasonryColumnCount() {
        if (window.matchMedia("(min-width: 900px)").matches) return 4;
        if (window.matchMedia("(min-width: 560px)").matches) return 3;
        return 2;
    }

    function appendToShortestColumn(cols, fig) {
        let best = 0;
        let minH = Infinity;
        let minCount = Infinity;
        cols.forEach((col, i) => {
            const h = col.offsetHeight;
            const count = col.children.length;
            if (h < minH || (h === minH && count < minCount)) {
                minH = h;
                minCount = count;
                best = i;
            }
        });
        cols[best].appendChild(fig);
    }

    function distributeFigures(cols, figures) {
        cols.forEach((c) => {
            while (c.firstChild) c.removeChild(c.firstChild);
        });
        figures.forEach((fig) => appendToShortestColumn(cols, fig));
    }

    function buildMasonry(container) {
        const figures = FRAMES.map((item, index) => {
            const fig = document.createElement("figure");
            fig.className = "gallery-masonry__item";
            fig.setAttribute("role", "listitem");

            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "gallery-masonry__hit";
            btn.setAttribute("aria-label", `View full size: ${item.alt}`);

            const inner = document.createElement("span");
            inner.className = "gallery-masonry__inner";
            inner.appendChild(mediaEl(item, { loopPreview: item.type === "video", eager: true }));

            btn.appendChild(inner);
            fig.appendChild(btn);

            btn.addEventListener("click", () => openLightbox(FRAMES[index]));
            return fig;
        });

        container.innerHTML = "";
        const n = getMasonryColumnCount();
        const cols = [];
        for (let i = 0; i < n; i++) {
            const col = document.createElement("div");
            col.className = "gallery-masonry__col";
            col.setAttribute("role", "presentation");
            container.appendChild(col);
            cols.push(col);
        }

        figures.forEach((fig) => appendToShortestColumn(cols, fig));

        const relayout = () => {
            distributeFigures(cols, figures);
            requestAnimationFrame(() => distributeFigures(cols, figures));
        };

        const waitDecode = [];
        container.querySelectorAll("img").forEach((img) => {
            if (img.complete && img.naturalHeight > 0) return;
            waitDecode.push(
                new Promise((resolve) => {
                    img.addEventListener("load", resolve, { once: true });
                    img.addEventListener("error", resolve, { once: true });
                })
            );
        });
        container.querySelectorAll("video").forEach((v) => {
            if (v.readyState >= 1) return;
            waitDecode.push(
                new Promise((resolve) => {
                    v.addEventListener("loadedmetadata", resolve, { once: true });
                    v.addEventListener("error", resolve, { once: true });
                })
            );
        });

        if (waitDecode.length === 0) relayout();
        else Promise.all(waitDecode).then(() => relayout());
    }

    let masonryResizeTimer;
    function bindMasonryResize() {
        window.addEventListener("resize", () => {
            clearTimeout(masonryResizeTimer);
            masonryResizeTimer = setTimeout(() => {
                const grid = document.querySelector("[data-gallery-masonry]");
                if (grid) buildMasonry(grid);
            }, 200);
        });
    }

    let masonryResizeBound = false;

    function init() {
        const snap = document.querySelector("[data-snapshots-preview]");
        const grid = document.querySelector("[data-gallery-masonry]");
        if (snap) buildSnapshots(snap);
        if (grid) {
            buildMasonry(grid);
            if (!masonryResizeBound) {
                masonryResizeBound = true;
                bindMasonryResize();
            }
        }
    }

    document.addEventListener("gallery-layout-reflow", () => {
        const grid = document.querySelector("[data-gallery-masonry]");
        if (grid) buildMasonry(grid);
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
