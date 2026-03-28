# Perplexity-Style Cosmic Aesthetic Migration Guide

This guide explains the new Perplexity-inspired design system and how to use it.

## 🎨 Overview

Your portfolio has been updated with a **Perplexity-style cosmic aesthetic** featuring:

- Smooth, minimal cosmic gradients (no noisy textures)
- Soft glowing stars and subtle sparkles
- Surreal elements (floating shapes, blurred light trails, planetary arcs)
- Clean silhouettes and bold but minimal composition
- Glassmorphism with deep blur effects
- Elegant animations matching Perplexity's motion language

## 📁 New File Structure

```
portfolio-website/
├── perplexity-theme.css          # Theme variables and color palette
├── perplexity-animations.css     # All Perplexity-style animations
├── js/
│   ├── perplexity-backgrounds.js # Background system manager
│   └── art-loader.js             # AI art integration utility
├── media/
│   └── perplexity/               # Your AI-generated artwork goes here
│       ├── README.md
│       ├── hero-cosmic-mobile.jpg
│       ├── hero-cosmic-tablet.jpg
│       └── hero-cosmic-desktop.jpg
└── PERPLEXITY_MIGRATION.md        # This file
```

## 🎨 Color Palette

### Background Colors

- `--bg-cosmic-black: #07090c` - Deep cosmic black
- `--bg-dark-navy: #0d1521` - Dark navy blue

### Glow Accents

- `--glow-cyan: #00e0ff` - Cyan glow
- `--glow-aqua: #65ffd9` - Aqua
- `--glow-coral: #ff7e5f` - Soft coral/orange
- `--glow-gold: #ffd890` - Perplexity-style gold stars

### Text Colors

- `--text-primary: #ffffff` - Primary white
- `--text-secondary: #b5c7d3` - Secondary light blue-gray

## 🖼️ Adding Your AI Artwork

### Step 1: Generate Your Art

Create cosmic surrealism artwork with:

- Dark cosmic skies with smooth gradients
- Soft glowing stars
- Surreal elements (planets, pathways, floating shapes)
- Wide horizontal banners for footer
- Minimal, clean composition

### Step 2: Save Your Artwork

Save your artwork in `media/perplexity/` with this naming convention:

**For Hero Section:**

- `hero-cosmic-mobile.jpg` (≤768px width)
- `hero-cosmic-tablet.jpg` (769px-1024px width)
- `hero-cosmic-desktop.jpg` (>1024px width)

**For Footer:**

- `footer-pathway-mobile.jpg`
- `footer-pathway-tablet.jpg`
- `footer-pathway-desktop.jpg`

### Step 3: Use in HTML

Add the `data-art-image` attribute to any section:

```html
<section class="section hero-section" data-art-image="hero-cosmic">
  <!-- Your content -->
</section>
```

### Step 4: Customize Art Loading

You can customize how the art is displayed:

```html
<section
  class="section"
  data-art-image="hero-cosmic"
  data-blend-mode="overlay"
  <!--
  overlay,
  multiply,
  screen,
  etc.
  --
>
  data-brightness="0.7"
  <!-- 0.0 to 1.0 -->
  data-opacity="0.5">
  <!-- 0.0 to 1.0 -->
  <!-- Your content -->
</section>
```

The art loader will automatically:

- Select the correct image based on viewport width
- Apply proper blending and brightness
- Handle responsive updates on window resize
- Fall back to beautiful gradients if images are missing

## 🎭 Background System

The background system automatically creates:

1. **Cosmic Gradient Overlay** - Smooth radial gradients
2. **Floating Particles** - 40 tiny glowing dots that drift upward
3. **Parallax Star Layers** - 3 layers of stars with different scroll speeds
4. **Cosmic Nebula Banners** - For hero/footer sections
5. **Cosmic Pathway** - For footer with horizon glow and cosmic clouds

### Customizing Backgrounds

You can create custom backgrounds programmatically:

```javascript
// Create a cosmic nebula banner
window.perplexityBackgrounds.createCosmicNebulaBanner(container, {
  height: "500px",
  position: "relative",
  zIndex: 1,
});

// Create a cosmic pathway
window.perplexityBackgrounds.createCosmicPathway(container, {
  height: "600px",
  showSilhouette: true,
});
```

## 🎬 Animations

All animations are defined in `perplexity-animations.css`:

- `floatUp` - Floating particles drifting upward
- `softTwinkle` - Gentle star twinkling
- `sparkle` - Gold sparkle effects
- `streakMove` - Cosmic light streaks
- `cloudDrift` - Slow cloud movement
- `fadeInSmooth` - Smooth fade-in
- `glowPulse` - Pulsing glow effect
- `buttonGlow` - Button glow animation
- `textReveal` - Text reveal with letter spacing

### Using Animations

Add animation classes to elements:

```html
<div class="fade-in-smooth">Content</div>
<div class="glow-pulse">Glowing element</div>
<div class="subtle-float">Floating element</div>
```

## 🎨 Component Styling

All components now use the Perplexity aesthetic:

### Cards & Containers

- Glassmorphism with 25px blur
- Subtle cyan border glow
- Gradient strokes (cyan → aqua)
- Soft drop-shadows

### Buttons

- Glossy neon glow
- Bright cyan edges
- Hover: outer-space glow effect
- Shimmer animation on hover

### Typography

- Headings: JetBrains Mono with wide letter spacing
- Body: Inter
- Smooth fade-in transitions

## 🔧 Customization

### Changing Colors

Edit `perplexity-theme.css`:

```css
:root {
  --glow-cyan: #00e0ff; /* Change cyan */
  --glow-aqua: #65ffd9; /* Change aqua */
  --glow-gold: #ffd890; /* Change gold */
  --bg-cosmic-black: #07090c; /* Change background */
}
```

### Adjusting Glassmorphism

```css
:root {
  --glass-bg: rgba(13, 21, 33, 0.4); /* Background opacity */
  --glass-border: rgba(0, 224, 255, 0.2); /* Border color */
  --glass-blur: blur(25px); /* Blur amount */
}
```

### Modifying Animations

Edit `perplexity-animations.css` to adjust:

- Animation durations
- Easing functions
- Keyframe values

## 📱 Responsive Design

The system automatically handles responsive images:

- Mobile: ≤768px
- Tablet: 769px-1024px
- Desktop: >1024px

Artwork is loaded based on viewport width, and the system updates on window resize.

## 🚀 Performance

The system is optimized for performance:

- CSS animations use `transform` and `opacity` (GPU-accelerated)
- Particles use `will-change` for optimization
- Images are cached after first load
- Scroll events are throttled
- Parallax uses `requestAnimationFrame`

## 🐛 Troubleshooting

### Artwork Not Loading

1. Check file names match the convention exactly
2. Verify files are in `media/perplexity/` directory
3. Check browser console for errors
4. System will fall back to gradients if images fail

### Backgrounds Not Showing

1. Ensure `perplexity-backgrounds.js` is loaded
2. Check that `window.perplexityBackgrounds` exists
3. Verify z-index values don't conflict

### Animations Not Working

1. Check `perplexity-animations.css` is loaded
2. Verify animation classes are applied
3. Check browser supports CSS animations

## 📝 Next Steps

1. **Generate Your Artwork**

   - Create cosmic surrealism images
   - Save with proper naming convention
   - Place in `media/perplexity/`

2. **Customize Colors** (optional)

   - Edit `perplexity-theme.css`
   - Adjust to match your brand

3. **Add More Art Sections**

   - Add `data-art-image` to any section
   - Create corresponding artwork files

4. **Fine-tune Animations** (optional)
   - Adjust durations in `perplexity-animations.css`
   - Modify easing functions

## 🎯 Key Features

✅ **Minimal & Clean** - No noisy textures, smooth gradients  
✅ **Surreal & Cosmic** - Floating elements, soft glows  
✅ **Performance Optimized** - GPU-accelerated animations  
✅ **Responsive** - Automatic image selection by viewport  
✅ **Easy to Customize** - CSS variables and clear structure  
✅ **Art Integration** - Simple system for AI-generated artwork

## 📚 Additional Resources

- **Theme Variables**: See `perplexity-theme.css`
- **Animations**: See `perplexity-animations.css`
- **Background System**: See `js/perplexity-backgrounds.js`
- **Art Loader**: See `js/art-loader.js`

---

**Enjoy your new Perplexity-style cosmic portfolio!** 🌌✨
