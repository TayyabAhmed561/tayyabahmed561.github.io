/**
 * Rising particle field only. Static twinkling stars live in #static-stars-root (perplexity-backgrounds).
 * Injects white box-shadow dots; ::after tile at +2560px + translateY loop in CSS.
 */
(function () {
    const TILE = 2560;
    const FLOAT_DOT = "rgba(255, 255, 255, 0.88)";

    /** Tight blur: a bit more presence than before, still not blobby */
    const SHADOW_BLUR = 0.72;

    /* Counts per layer; fewer/larger dots on bigger particle layers */
    const LAYERS = [
        { className: "particle-1", size: 2.25, countMain: 730, countAfter: 730 },
        { className: "particle-2", size: 3.25, countMain: 476, countAfter: 476 },
        { className: "particle-3", size: 4.25, countMain: 284, countAfter: 284 },
        { className: "particle-4", size: 2.25, countMain: 576, countAfter: 576 },
    ];

    /** Bias Y toward bottom of tile so drift reads as rising from below */
    function randomShadowEntry() {
        const x = (Math.random() * TILE) | 0;
        const y = ((0.28 + Math.random() * 0.72) * TILE) | 0;
        return `${x}px ${y}px ${SHADOW_BLUR}px ${FLOAT_DOT}`;
    }

    function buildShadow(count) {
        const parts = new Array(count);
        for (let i = 0; i < count; i++) parts[i] = randomShadowEntry();
        return parts.join(", ");
    }

    function init() {
        const root = document.getElementById("rising-particles-root");
        if (!root) return;

        const existing = document.getElementById("rising-particles-generated");
        if (existing) existing.remove();

        const style = document.createElement("style");
        style.id = "rising-particles-generated";

        let css = "";
        const base = "#rising-particles-root .animation-wrapper";
        LAYERS.forEach((layer) => {
            const shadowMain = buildShadow(layer.countMain);
            const shadowAfter = buildShadow(layer.countAfter);
            const sel = `${base} .${layer.className}`;
            const s = layer.size;
            css += `
${sel} {
  width: ${s}px;
  height: ${s}px;
  box-shadow: ${shadowMain};
}
${sel}::after {
  width: ${s}px;
  height: ${s}px;
  box-shadow: ${shadowAfter};
}
`;
        });

        style.textContent = css;
        document.head.appendChild(style);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
