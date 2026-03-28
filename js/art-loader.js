/**
 * Art Loader Utility
 * Handles dynamic loading of AI-generated cosmic artwork
 */

class ArtLoader {
    constructor() {
        this.artBasePath = 'media/perplexity/';
        this.breakpoints = {
            mobile: 768,
            tablet: 1024,
            desktop: 1025
        };
        this.cache = new Map();
    }

    /**
     * Get appropriate image path based on viewport width
     */
    getImagePath(imageName, options = {}) {
        const {
            extension = 'jpg',
            includeBreakpoint = true
        } = options;

        const width = window.innerWidth;
        let breakpoint = 'desktop';
        
        if (width <= this.breakpoints.mobile) {
            breakpoint = 'mobile';
        } else if (width <= this.breakpoints.tablet) {
            breakpoint = 'tablet';
        }

        if (includeBreakpoint) {
            return `${this.artBasePath}${imageName}-${breakpoint}.${extension}`;
        }
        return `${this.artBasePath}${imageName}.${extension}`;
    }

    /**
     * Load and apply art as background
     */
    async loadBackgroundArt(container, imageName, options = {}) {
        const {
            blendMode = 'overlay',
            brightness = 0.8,
            opacity = 0.6,
            position = 'center center',
            size = 'cover',
            zIndex = -1
        } = options;

        // Check cache first
        const cacheKey = `${imageName}-${window.innerWidth}`;
        if (this.cache.has(cacheKey)) {
            this.applyBackground(container, this.cache.get(cacheKey), options);
            return;
        }

        // Try to load image
        const imagePath = this.getImagePath(imageName);
        const img = new Image();
        
        return new Promise((resolve, reject) => {
            img.onload = () => {
                this.cache.set(cacheKey, imagePath);
                this.applyBackground(container, imagePath, options);
                resolve(imagePath);
            };
            
            img.onerror = () => {
                // Fallback to gradient if image fails
                console.warn(`Failed to load art: ${imagePath}, using gradient fallback`);
                this.applyGradientFallback(container, options);
                resolve(null);
            };
            
            img.src = imagePath;
        });
    }

    /**
     * Apply background image with styling
     */
    applyBackground(container, imagePath, options) {
        const {
            blendMode = 'overlay',
            brightness = 0.8,
            opacity = 0.6,
            position = 'center center',
            size = 'cover',
            zIndex = -1
        } = options;

        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        if (!container) {
            console.error('Container not found');
            return;
        }

        // Create or update background element
        let bgElement = container.querySelector('.art-background');
        if (!bgElement) {
            bgElement = document.createElement('div');
            bgElement.className = 'art-background';
            container.insertBefore(bgElement, container.firstChild);
        }

        bgElement.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url(${imagePath});
            background-size: ${size};
            background-position: ${position};
            background-repeat: no-repeat;
            opacity: ${opacity};
            filter: brightness(${brightness});
            mix-blend-mode: ${blendMode};
            z-index: ${zIndex};
            pointer-events: none;
        `;
    }

    /**
     * Apply gradient fallback
     */
    applyGradientFallback(container, options) {
        const {
            zIndex = -1
        } = options;

        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        let bgElement = container.querySelector('.art-background');
        if (!bgElement) {
            bgElement = document.createElement('div');
            bgElement.className = 'art-background';
            container.insertBefore(bgElement, container.firstChild);
        }

        bgElement.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(ellipse at 30% 50%, rgba(0, 224, 255, 0.2) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 50%, rgba(255, 126, 95, 0.15) 0%, transparent 50%),
                linear-gradient(180deg, rgba(13, 21, 33, 0.8) 0%, rgba(7, 9, 12, 0.95) 100%);
            z-index: ${zIndex};
            pointer-events: none;
        `;
    }

    /**
     * Preload art for better performance
     */
    preloadArt(imageNames) {
        imageNames.forEach(name => {
            const img = new Image();
            img.src = this.getImagePath(name);
        });
    }

    /**
     * Handle responsive image updates
     */
    setupResponsiveListener(containers) {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Clear cache on resize to reload appropriate images
                this.cache.clear();
                containers.forEach(container => {
                    const imageName = container.dataset.artImage;
                    if (imageName) {
                        this.loadBackgroundArt(container, imageName, {
                            blendMode: container.dataset.blendMode || 'overlay',
                            brightness: parseFloat(container.dataset.brightness) || 0.8,
                            opacity: parseFloat(container.dataset.opacity) || 0.6
                        });
                    }
                });
            }, 250);
        });
    }
}

// Initialize art loader
window.artLoader = new ArtLoader();

