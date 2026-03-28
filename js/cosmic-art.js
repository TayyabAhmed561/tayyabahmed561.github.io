/**
 * Cosmic Art Integration System
 * Seamlessly integrates Saturn, Black Hole, and Stars into the background
 * with scroll-based reveal and parallax effects
 */

class CosmicArt {
    constructor() {
        this.artElements = [];
        this.init();
    }

    init() {
        this.createCosmicArt();
        this.setupScrollReveal();
    }

    /**
     * Create and position cosmic art elements
     */
    createCosmicArt() {
        const container = document.createElement('div');
        container.className = 'cosmic-art-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        document.body.appendChild(container);

        // Saturn - at the top right, stays at top as you scroll (moves up with parallax)
        const saturn = this.createArtElement('saturn', {
            image: 'media/perplexity/perpSaturn.png',
            position: { x: '85%', y: '18%' },  // Moved right by ~14%
            size: { width: '400px', height: 'auto' },
            opacity: 0.5,
            blendMode: 'screen',
            parallaxSpeed: 0.5,  // Moves up faster to stay at top
            anchor: 'top'  // Anchor to top
        });
        container.appendChild(saturn);

        // Black Hole - positioned behind footer at bottom of page content
        // This will be handled separately and appended to the footer element

        // Stars - scattered throughout the website
        const starPositions = [
            { x: '15%', y: '25%', size: '200px', parallaxSpeed: 0.3 },
            { x: '85%', y: '35%', size: '150px', parallaxSpeed: 0.35 },
            { x: '50%', y: '50%', size: '180px', parallaxSpeed: 0.4 },
            { x: '25%', y: '65%', size: '160px', parallaxSpeed: 0.3 },
            { x: '70%', y: '20%', size: '140px', parallaxSpeed: 0.35 },
            { x: '40%', y: '75%', size: '170px', parallaxSpeed: 0.25 }
        ];

        starPositions.forEach((pos, index) => {
            const star = this.createArtElement(`star-${index}`, {
                image: 'media/perplexity/perpStar.png',
                position: { x: pos.x, y: pos.y },
                size: { width: pos.size, height: 'auto' },
                opacity: 0.3 + (index % 2) * 0.1,
                blendMode: 'screen',
                parallaxSpeed: pos.parallaxSpeed,
                anchor: 'middle'  // Stars move with middle speed
            });
            container.appendChild(star);
        });

        this.artElements = container.querySelectorAll('.cosmic-art-element');
        
        // Create black hole artwork positioned behind footer
        this.createFooterBlackHole();
    }

    /**
     * Create a single art element with proper styling
     */
    createArtElement(id, config) {
        const element = document.createElement('div');
        element.className = 'cosmic-art-element';
        element.dataset.id = id;
        element.dataset.parallaxSpeed = config.parallaxSpeed;
        element.dataset.anchor = config.anchor || 'middle';
        element.dataset.initialY = config.position.y;

        const img = document.createElement('img');
        img.src = config.image;
        img.alt = id;
        img.style.cssText = `
            width: ${config.size.width};
            height: ${config.size.height};
            object-fit: contain;
            filter: brightness(0.9) contrast(1.1);
            user-select: none;
            pointer-events: none;
        `;

        element.style.cssText = `
            position: absolute;
            left: ${config.position.x};
            top: ${config.position.y};
            transform: translate(-50%, -50%);
            opacity: ${config.opacity};
            mix-blend-mode: ${config.blendMode};
            will-change: transform;
            pointer-events: none;
        `;

        element.appendChild(img);
        return element;
    }

    /**
     * Create black hole artwork behind bottom content at bottom of page
     */
    createFooterBlackHole() {
        const bottomContent = document.querySelector('.bottom-content');
        if (!bottomContent) {
            console.warn('Bottom content element not found, skipping black hole artwork');
            return;
        }
    
        // === CLIPPING WRAPPER (transparent, no blend halo) ===
        const clipWrapper = document.createElement('div');
        clipWrapper.className = 'blackhole-clip-wrapper';
    
        clipWrapper.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 600px;
            overflow: hidden;
            pointer-events: none;
            z-index: -1;
            background: transparent !important;
            border: none !important;
            outline: none !important;
            isolation: isolate;           
        `;
    
        // === BLACK HOLE POSITIONING LAYER (no blending here) ===
        const blackHole = document.createElement('div');
        blackHole.className = 'cosmic-art-footer-blackhole';
        blackHole.style.cssText = `
            position: absolute;
            left: 0;
            bottom: 0;
            transform: translateX(-30%) translateY(38%) scaleX(-1);
            opacity: 0.95;
            pointer-events: none;
            mix-blend-mode: normal;
        `;
    
        // === ACTUAL IMAGE (apply blend-mode HERE to avoid edge halos) ===
        // Use same approach as Saturn/Stars - fixed size, CSS handles responsive
        const img = document.createElement('img');
        img.src = 'media/perplexity/perpBlackHole.png';
        img.alt = 'Black Hole';
        img.style.cssText = `
            width: 900px;
            height: auto;
            object-fit: contain;
            filter: brightness(0.7) contrast(1.2) saturate(0.9);
            user-select: none;
            pointer-events: none;
            mix-blend-mode: multiply;
        `;
    
        blackHole.appendChild(img);
        clipWrapper.appendChild(blackHole);
    
        // Insert wrapper BEFORE bottom-content so content appears on top
        bottomContent.parentNode.insertBefore(clipWrapper, bottomContent);
    
        // Ensure bottom content appears above the black hole
        const comp = window.getComputedStyle(bottomContent);
        if (comp.zIndex === 'auto' || !comp.zIndex) {
            bottomContent.style.position = 'relative';
            bottomContent.style.zIndex = '1';
        }
    }
    
    

    /**
     * Setup parallax to keep elements in their relative positions
     */
    setupScrollReveal() {
        let ticking = false;

        const updateArt = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            this.artElements.forEach(element => {
                // Skip footer black hole - it's positioned relative to footer, not viewport
                if (element.dataset.id === 'blackhole-footer') {
                    return;
                }

                const parallaxSpeed = parseFloat(element.dataset.parallaxSpeed);
                const anchor = element.dataset.anchor;
                const initialY = parseFloat(element.dataset.initialY.replace('%', ''));

                // Calculate parallax movement
                // As you scroll down, elements move up (negative Y)
                // Different speeds keep them in relative positions
                let parallaxY;
                
                if (anchor === 'top') {
                    // Saturn: moves up faster to stay at top
                    parallaxY = -scrollTop * parallaxSpeed;
                } else {
                    // Stars: move at medium speed
                    parallaxY = -scrollTop * parallaxSpeed;
                }

                // Apply transform
                element.style.transform = `translate(-50%, calc(-50% + ${parallaxY}px))`;
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateArt);
                ticking = true;
            }
        });

        // Initial update
        updateArt();
        
        // Also update on resize
        window.addEventListener('resize', () => {
            updateArt();
        });
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    window.cosmicArt = new CosmicArt();
});

