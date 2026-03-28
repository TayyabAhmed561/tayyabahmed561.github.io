# Perplexity Art Directory

This directory is for your AI-generated cosmic artwork.

## Directory Structure

Place your artwork files here with the following naming convention:

- `hero-cosmic-mobile.jpg` - Hero section art for mobile devices (≤768px)
- `hero-cosmic-tablet.jpg` - Hero section art for tablets (769px-1024px)
- `hero-cosmic-desktop.jpg` - Hero section art for desktop (>1024px)

## Supported Formats

- JPG/JPEG (recommended for photos)
- PNG (for transparency)
- WebP (for better compression)

## Usage

In your HTML, add the `data-art-image` attribute to any section:

```html
<section class="section" data-art-image="hero-cosmic">
  <!-- Your content -->
</section>
```

The art loader will automatically:
- Select the appropriate image based on viewport width
- Apply proper blending and brightness
- Handle responsive updates on window resize

## Customization

You can customize the art loading behavior by adding data attributes:

```html
<section 
  data-art-image="hero-cosmic"
  data-blend-mode="overlay"
  data-brightness="0.8"
  data-opacity="0.6">
  <!-- Your content -->
</section>
```

## Fallback

If an image is not found, the system will automatically use a beautiful gradient fallback that matches the Perplexity aesthetic.

