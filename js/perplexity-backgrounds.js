/**
 * Perplexity-Style Background System
 * Manages cosmic backgrounds, particles, and parallax effects
 */

class PerplexityBackgrounds {
    constructor() {
        this.stars = [];
        this.parallaxLayers = [];
        this.init();
    }

    init() {
        // Stack: cosmic gradient on body (−3); static twinkling parallax stars mount in #static-stars-root (z-index 0).
        this.createCosmicGradientOverlay();
        this.createParallaxStarLayers();
        this.setupParallaxScroll();
    }

    /**
     * Create smooth cosmic gradient overlay - darker, richer tones
     */
    createCosmicGradientOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'cosmic-gradient-overlay';
        // Apply rich color scheme with green and red hues
        overlay.style.background = `
            radial-gradient(ellipse at 20% 30%, rgba(0, 100, 80, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(0, 120, 100, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(0, 80, 120, 0.1) 0%, transparent 60%),
            radial-gradient(ellipse at 40% 60%, rgba(50, 150, 50, 0.1) 0%, transparent 45%),
            radial-gradient(ellipse at 60% 40%, rgba(150, 50, 50, 0.08) 0%, transparent 40%)
        `;
        overlay.style.opacity = "0.75";
        overlay.style.zIndex = "-3";
        document.body.appendChild(overlay);
    }

    /**
     * Even star coverage: stratified grid + jitter (less clumpy than pure random).
     * y is 0–200% to fill the tall parallax layer; layerIndex offsets phase so layers don’t line up.
     */
    buildStratifiedStarPositions(count, layerIndex) {
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
        const vh = typeof window !== 'undefined' ? Math.max(500, window.innerHeight) : 800;
        const aspect = Math.min(1.55, Math.max(1.05, vw / vh));
        let cols = Math.max(12, Math.round(Math.sqrt(count * aspect)));
        let rows = Math.ceil(count / cols);
        while (cols * rows < count) rows += 1;

        const cellW = 100 / cols;
        const cellH = 200 / rows;
        const jitterScale = 0.42;
        const phase = layerIndex * 17.391;

        const positions = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const jx = (Math.random() - 0.5) * cellW * jitterScale * 2;
                const jy = (Math.random() - 0.5) * cellH * jitterScale * 2;
                let x = (c + 0.5) * cellW + jx + ((phase + r * 7) % cellW) * 0.35;
                let y = (r + 0.5) * cellH + jy + ((phase * 0.7 + c * 5) % cellH) * 0.25;
                x = Math.max(0, Math.min(100, x));
                y = Math.max(0, Math.min(200, y));
                positions.push({ x, y });
            }
        }

        for (let i = positions.length - 1; i > 0; i--) {
            const j = (Math.random() * (i + 1)) | 0;
            const t = positions[i];
            positions[i] = positions[j];
            positions[j] = t;
        }

        return positions.slice(0, count);
    }

    /**
     * Create parallax star layers
     */
    createParallaxStarLayers() {
        const staticRoot = document.getElementById('static-stars-root');
        const starContainer = document.createElement('div');
        starContainer.className = 'parallax-stars-container';
        starContainer.style.cssText = `
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;
        if (staticRoot) {
            staticRoot.appendChild(starContainer);
        } else {
            starContainer.style.position = 'fixed';
            starContainer.style.zIndex = '-2';
            document.body.appendChild(starContainer);
        }

        // Create 3 layers with different speeds
        for (let layer = 0; layer < 3; layer++) {
            const layerDiv = document.createElement('div');
            layerDiv.className = `star-layer layer-${layer}`;
            layerDiv.dataset.speed = (layer + 1) * 0.2; // 0.2, 0.4, 0.6
            layerDiv.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 200%;
                opacity: ${0.3 + layer * 0.2};
            `;
            
            // More stars on deeper layers; positions from stratified grid for even coverage
            const starCount = 224 + layer * 156;
            const positions = this.buildStratifiedStarPositions(starCount, layer);
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'parallax-star';

                const size = 0.9 + Math.random() * 1.85;
                const { x, y } = positions[i];
                const twinkleDelay = Math.random() * 3;
                const twinkleDuration = 2 + Math.random() * 2;

                star.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: #ffd890;
                    border-radius: 50%;
                    left: ${x}%;
                    top: ${y}%;
                    box-shadow: 0 0 ${size * 1.5}px rgba(255, 216, 144, 0.8);
                    animation: softTwinkle ${twinkleDuration}s ${twinkleDelay}s infinite ease-in-out;
                `;

                layerDiv.appendChild(star);
            }
            
            starContainer.appendChild(layerDiv);
            this.parallaxLayers.push(layerDiv);
        }
    }

    /**
     * Setup parallax scroll effect
     */
    setupParallaxScroll() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        
        this.parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.dataset.speed);
            const yPos = -(scrolled * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }

    /**
     * Create cosmic nebula banner (for hero/footer)
     */
    createCosmicNebulaBanner(container, options = {}) {
        const {
            height = '400px',
            position = 'relative',
            zIndex = 1
        } = options;

        const banner = document.createElement('div');
        banner.className = 'cosmic-nebula-banner';
        banner.style.cssText = `
            position: ${position};
            width: 100%;
            height: ${height};
            background: 
                radial-gradient(ellipse at 30% 50%, rgba(0, 100, 80, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 50%, rgba(0, 120, 100, 0.18) 0%, transparent 50%),
                radial-gradient(ellipse at 50% 50%, rgba(0, 80, 120, 0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 40% 60%, rgba(50, 150, 50, 0.12) 0%, transparent 45%),
                radial-gradient(ellipse at 60% 40%, rgba(150, 50, 50, 0.1) 0%, transparent 40%),
                linear-gradient(180deg, rgba(13, 21, 33, 0.85) 0%, rgba(7, 9, 12, 0.95) 100%);
            z-index: ${zIndex};
            overflow: hidden;
        `;

        // Add gold sparkles
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'gold-sparkle';
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = 3 + Math.random() * 2;
            
            sparkle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #ffd890;
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                box-shadow: 0 0 6px rgba(255, 216, 144, 0.8);
                animation: sparkle ${duration}s ${delay}s infinite ease-in-out;
            `;
            banner.appendChild(sparkle);
        }

        // Add light streaks
        for (let i = 0; i < 3; i++) {
            const streak = document.createElement('div');
            streak.className = 'cosmic-streak';
            const x = Math.random() * 100;
            const angle = Math.random() * 360;
            const delay = Math.random() * 5;
            const duration = 8 + Math.random() * 4;
            
            streak.style.cssText = `
                position: absolute;
                width: 2px;
                height: 200px;
                background: linear-gradient(180deg, 
                    rgba(0, 224, 255, 0.6) 0%, 
                    transparent 100%);
                left: ${x}%;
                top: -200px;
                transform: rotate(${angle}deg);
                animation: streakMove ${duration}s ${delay}s infinite linear;
            `;
            banner.appendChild(streak);
        }

        if (container) {
            container.appendChild(banner);
        }
        
        return banner;
    }

    /**
     * Create cosmic pathway (for footer)
     */
    createCosmicPathway(container, options = {}) {
        const {
            height = '500px',
            showSilhouette = true
        } = options;

        const pathway = document.createElement('div');
        pathway.className = 'cosmic-pathway';
        pathway.style.cssText = `
            position: relative;
            width: 100%;
            height: ${height};
            background: 
                linear-gradient(180deg, 
                    rgba(7, 9, 12, 0.95) 0%,
                    rgba(13, 21, 33, 0.9) 30%,
                    rgba(0, 100, 80, 0.2) 60%,
                    rgba(0, 120, 100, 0.25) 75%,
                    rgba(50, 120, 80, 0.2) 85%,
                    rgba(120, 60, 60, 0.18) 100%);
            overflow: hidden;
        `;

        // Horizon glow
        const horizonGlow = document.createElement('div');
        horizonGlow.className = 'horizon-glow';
        horizonGlow.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40%;
            background: linear-gradient(180deg, 
                transparent 0%,
                rgba(0, 100, 80, 0.25) 40%,
                rgba(50, 120, 80, 0.2) 60%,
                rgba(120, 60, 60, 0.18) 80%,
                rgba(0, 120, 100, 0.2) 100%);
            filter: blur(40px);
        `;
        pathway.appendChild(horizonGlow);

        // Cosmic clouds
        for (let i = 0; i < 5; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cosmic-cloud';
            const x = Math.random() * 100;
            const y = 50 + Math.random() * 30;
            const size = 100 + Math.random() * 150;
            const opacity = 0.1 + Math.random() * 0.1;
            
            // Mix of blue-green, green, and red tones for clouds
            const cloudColors = [
                `rgba(0, 100, 80, ${opacity * 1.2})`,
                `rgba(50, 150, 50, ${opacity * 1.1})`,
                `rgba(150, 50, 50, ${opacity * 1.0})`
            ];
            const cloudColor = cloudColors[Math.floor(Math.random() * cloudColors.length)];
            
            cloud.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size * 0.6}px;
                background: radial-gradient(ellipse, 
                    ${cloudColor} 0%, 
                    transparent 70%);
                left: ${x}%;
                top: ${y}%;
                border-radius: 50%;
                filter: blur(30px);
                animation: cloudDrift ${20 + Math.random() * 20}s infinite ease-in-out;
            `;
            pathway.appendChild(cloud);
        }

        // Silhouette integration area
        if (showSilhouette) {
            const silhouetteZone = document.createElement('div');
            silhouetteZone.className = 'silhouette-zone';
            silhouetteZone.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 300px;
                height: 200px;
                /* Space reserved for silhouette image */
            `;
            pathway.appendChild(silhouetteZone);
        }

        if (container) {
            container.appendChild(pathway);
        }
        
        return pathway;
    }
}

/**
 * Scripts are loaded dynamically from the React app after DOMContentLoaded has already fired.
 * Match rising-particles.js: run immediately when document is ready, otherwise wait for DOMContentLoaded.
 */
function initPerplexityBackgrounds() {
    if (window.__perplexityBackgroundsInitialized) return;
    window.__perplexityBackgroundsInitialized = true;
    window.perplexityBackgrounds = new PerplexityBackgrounds();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPerplexityBackgrounds);
} else {
    initPerplexityBackgrounds();
}

