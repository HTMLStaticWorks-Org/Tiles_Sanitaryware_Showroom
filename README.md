# AURELIA SURFACES — Tiles & Sanitaryware Showroom Website

A luxury, architectural multi-page website crafted in plain **HTML5, CSS3, and Vanilla JavaScript (ES6+)** for a flagship **Tiles, Sintered Porcelain Slabs & Sanitaryware Showroom**. Engineered around two primary business conversion goals: **Product Discovery (`products.html`)** and **Showroom Visit / Project Quotations (`contact.html`)**.

---

## 1. Folder Architecture

```text
Tiles_Sanitaryware_Showroom/
├── assets/
│   ├── css/
│   │   ├── fonts.css        # Local @font-face declarations (Cormorant Garamond & Manrope)
│   │   ├── style.css        # Main Warm-Luxury design system, tokens & editorial layouts
│   │   ├── dark-mode.css    # Deep Espresso (#1C1A18) & Muted Bronze dark theme
│   │   └── rtl.css          # Full Right-to-Left (RTL) directional support
│   ├── js/
│   │   ├── main.js          # Nav, theme/RTL, 3D tilt, live search, reveals, forms
│   │   ├── products.js      # 46-SKU catalogue, multi-facet filters, spec drawer, compare tray
│   │   ├── gallery.js       # Room/style filters, accessible lightbox, before/after slider
│   │   └── plugins/
│   │       └── lucide.min.js # Self-hosted Lucide SVG icon bundle
│   ├── images/              # 151 unique WebP photos + 151 responsive -sm.webp + IMAGE-LIST.md
│   └── fonts/               # Self-hosted .woff2 Google Font files (zero external calls)
├── index.html               # Home 01 — Premium Showroom & Shopping Experience (15 sections)
├── home-2.html              # Home 02 — Architectural & Editorial Inspiration (15 sections)
├── products.html            # Complete Product Catalogue across 14 departments (12 sections)
├── visualizer-gallery.html  # Real Interior Visualizer & Room Gallery (11 sections)
├── about.html               # Showroom Heritage, Lighting Lab & Brand Story (10 sections)
├── contact.html             # Enquiries, Project BOQ Quote Form & Showroom Map (9 sections)
├── 404.html                 # Custom architectural 404 recovery page
├── coming-soon.html         # 2027 Monolith Exhibition preview with live countdown
├── sitemap.xml              # Production XML sitemap
├── robots.txt               # Search-engine crawler rules
├── documentation/
│   └── CUSTOMIZATION-GUIDE.md
└── README.md
```

---

## 2. Quick Installation & Local Preview

Zero build steps, bundlers, or Node frameworks are required. Every font, icon, script, and WebP image is self-hosted locally.

### Option A — Local Static Server (Recommended)
Run from the project root directory:
```bash
# Using Python 3
python -m http.server 8080

# Or using Node npx serve
npx serve -l 8080
```
Then open `http://localhost:8080/index.html` in any modern browser.

### Option B — Static Hosting Deployment
Upload the folder directly to **Netlify, Vercel, Cloudflare Pages, GitHub Pages, or Apache/Nginx**. Forms already include `data-netlify="true"`, Formspree `action` attributes, and spam honeypot traps.

---

## 3. Key Features & Technical Highlights

- **Warm-Luxury Showroom Palette:** Warm Ivory (`#F5F0E8`), Charcoal (`#2B2A28`), Stone Beige (`#D9CDBB`), Muted Bronze (`#A67C52` / `#8C6642`), Warm Grey (`#8A837A`), and Deep Espresso (`#1C1A18`), with terracotta and moss semantic validation states (zero default browser blue/red/green).
- **Two Distinct Home Experiences:**
  - `index.html` (*Home 01*): Split-screen mosaic carousel hero, category & room discovery, horizontal drag-scroll rail, alternating editorial splits, material swatch previewer, masonry gallery, brand marquee, and testimonial slider.
  - `home-2.html` (*Home 02*): Full-bleed 100vh parallax hero, sticky-image storytelling chapters, expanding vertical lifestyle panels, slab dimension scale band, 5-piece bathware lookbook, draggable before/after renovation slider, 6-tab finish guide, and interactive sector switcher.
- **Complete 14-Category Product Engine (`products.html`):**
  - 46 realistic SKUs spanning Floor Tiles, Wall Tiles, Bathroom Tiles, Kitchen Tiles, Outdoor & Parking Tiles, Porcelain Slabs, Marble & Stone Finish Tiles, Wooden Finish Tiles, Designer Tiles, Washbasins, Water Closets (WC), Faucets & Taps, Shower Systems, and Bathroom Accessories.
  - Instant filtering by category, room, size, colour, material, finish, and price tier + sorting, skeleton loaders, slide-over technical specification drawer with hover zoom, and a **Compare-up-to-3-Products** sticky tray.
- **3D-Tilt & Porcelain-Sheen Cards:** Vanilla JS perspective tilt with radial glare layer, diagonal polished-porcelain light sweep, and grout-line corner draw-in borders (strictly center-aligned across mobile, tablet, and desktop; auto-disabled on touch devices and `prefers-reduced-motion`).
- **Dark Mode & Full RTL:** Instant header toggles persisted in `localStorage` with `prefers-color-scheme` detection.
- **151 Unique Local WebP Photographs:** Zero repeated images anywhere on the website; every `<img>` provides responsive `srcset` (`600w` `-sm.webp` + full-res `.webp`), explicit `width`/`height`, and descriptive `alt` text.

---

## 4. Customization Guide

See [`documentation/CUSTOMIZATION-GUIDE.md`](documentation/CUSTOMIZATION-GUIDE.md) for step-by-step instructions on updating:
1. Brand colours & typography tokens (`assets/css/style.css`)
2. Product SKU catalogue (`assets/js/products.js`)
3. Formspree / Netlify / ConvertKit / Mailchimp endpoints
4. WhatsApp Business number & Google Maps embed coordinates
5. Image replacement & WebP optimization

---

## 5. Credits & Third-Party Resources

- **Typography:** *Cormorant Garamond* & *Manrope* via Google Fonts (OFL, self-hosted in `assets/fonts/`).
- **Icons:** [Lucide Icons](https://lucide.dev/) v0.460.0 (ISC License, self-hosted in `assets/js/plugins/lucide.min.js`).
- **Photography:** Curated real architectural, interior, stone, tile, and sanitaryware photography via Openverse Creative Commons & Wikimedia Commons Photography. Individual file-by-file attributions are documented in [`assets/images/IMAGE-LIST.md`](assets/images/IMAGE-LIST.md).

---

## 6. Changelog & Support

- **v1.0.0 (2026-11-06):** Initial release with 6 core pages + `404.html` & `coming-soon.html`, 46 unique product SKUs across 14 categories, 151 unique local WebP images, Dark Mode, RTL support, and WCAG 2.1 AA accessibility compliance.
- **Support:** Search `TODO:` across HTML, CSS, and JS files to locate all client deployment placeholders quickly.

