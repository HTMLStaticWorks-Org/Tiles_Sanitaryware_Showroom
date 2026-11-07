# Aurelia Surfaces — Customization & Deployment Guide

This document explains how to customize colours, fonts, products, images, and third-party integrations across the website.

---

## 1. Updating Colours & Typography

Open `assets/css/style.css` and locate Section `1. CSS CUSTOM PROPERTIES`:

```css
:root {
  --bg-primary: #F5F0E8;       /* Warm Ivory */
  --text-primary: #2B2A28;     /* Charcoal */
  --bg-secondary: #D9CDBB;     /* Stone Beige */
  --accent: #A67C52;           /* Muted Bronze */
  --accent-hover: #8C6642;     /* Bronze Hover */
  --text-muted: #8A837A;       /* Warm Grey */
  --bg-dark: #1C1A18;          /* Deep Espresso */
}
```

Dark-mode overrides live in `assets/css/dark-mode.css` under `[data-theme="dark"]`, and Right-to-Left overrides live in `assets/css/rtl.css` under `[dir="rtl"]`.

To swap fonts:
1. Place `.woff2` files in `assets/fonts/`.
2. Update `@font-face` declarations in `assets/css/fonts.css`.
3. Change `--font-serif` and `--font-sans` in `assets/css/style.css`.

---

## 2. Adding or Editing Products (`assets/js/products.js`)

All product cards on `products.html`, related product recommendations, comparison tables, and the **global live search bar** across every page read from `window.AURELIA_PRODUCTS` inside `assets/js/products.js`.

Each product object follows this schema:

```js
{
  code: 'AUR-FL-101',
  name: 'Travertino Romano Vein-Cut',
  category: 'Floor Tiles', // Must match one of the 14 categories
  rooms: ['Living Room', 'Bedroom', 'Commercial Spaces'],
  material: 'Glazed Vitrified Porcelain',
  sizes: ['800×1600 mm', '600×1200 mm'],
  primarySize: '800×1600 mm',
  colour: 'Warm Beige & Travertine',
  finish: 'Honed Matte',
  thickness: '9.5 mm',
  slipRating: 'R10',
  priceTier: 'mid', // 'entry' | 'mid' | 'luxury' | 'bathware'
  priceLabel: '₹185 / sq.ft.',
  priceRank: 185,
  popularity: 99,
  isNew: true,
  featuredTag: 'Best Seller',
  image: 'assets/images/product-floor-tile-01.webp',
  imageSm: 'assets/images/product-floor-tile-01-sm.webp',
  usage: 'Luxury residential living floors...',
  maintenance: 'Sweep routinely; damp-mop with pH-neutral cleanser...',
  description: 'Linear vein-cut Italian travertine character...'
}
```

---

## 3. Connecting Live Forms, WhatsApp & Google Maps

Search for `TODO:` across all `.html` files to update endpoints prior to production launch:

1. **Quote & Product Enquiry Forms (`contact.html`, `products.html`):**
   - Replace `action="https://formspree.io/f/placeholder-..."` with your real Formspree ID, or deploy to Netlify (where `data-netlify="true"` is already present) and enable real network POST submission in `assets/js/main.js` (`initFormsValidation`).
2. **Newsletter Forms (`index.html`, `home-2.html`, `coming-soon.html`):**
   - Replace `action="https://app.convertkit.com/forms/placeholder/subscriptions"` with your Mailchimp or ConvertKit action URL.
3. **WhatsApp Floating Button & CTA Links:**
   - Replace `919876543210` in `https://wa.me/919876543210` with your showroom's WhatsApp Business phone number (country code without `+`).
4. **Google Maps (`contact.html#map-section`):**
   - Replace the styled architectural map box in Section 6 of `contact.html` with your `<iframe src="https://www.google.com/maps/embed?pb=..." loading="lazy"></iframe>` snippet from Google Maps, and update the JSON-LD `PostalAddress` in `<head>`.

---

## 4. Page-by-Page Structure Summary

| File | Purpose | Section Count |
|---|---|---|
| `index.html` | Home 1 — Showroom & Shopping Experience | 15 sections |
| `home-2.html` | Home 2 — Architectural & Editorial Inspiration | 15 sections |
| `products.html` | Filterable 14-Department Product Catalogue | 12 sections + Drawer + Compare Tray |
| `visualizer-gallery.html` | Real Room Visualizer, Combos, Before/After & Stories | 11 sections + Lightbox + Reader Modal |
| `about.html` | Brand Story, Vision, Lighting Lab & Segments | 10 sections |
| `contact.html` | Contact Cards, BOQ Quote Form, Map & FAQs | 9 sections |
| `404.html` | Custom 404 Navigation & Search Recovery | Utility (not in main nav) |
| `coming-soon.html` | 2027 Exhibition Countdown & VIP Pass Signup | Utility (not in main nav) |

---

## 5. Separate Code for Mobile, Tab, and 1024 Views

To ensure edits in one device view **never affect other views**, responsive code is strictly separated into 3 dedicated stylesheets linked across all HTML pages:

| View Name | Dedicated Stylesheet | Device Viewport Range | Description |
|---|---|---|---|
| **Mobile View** | `assets/css/mobile.css` | `< 768px` (phones) | Mobile single-column layouts, mobile hamburger, mobile bottom visit bar, compact padding |
| **Tab / Tablet View** | `assets/css/tablet.css` | `768px` to `1023px` (tablets/iPads) | 2-column card grids, tablet hero scaling, 4-column stat band, 2-column footer |
| **1024+ Desktop View** | `assets/css/desktop-1024.css` | `1024px and above` (desktops/laptops) | Full horizontal navigation bar, 3/4/5-column grids, split heroes, expanding panels, fine cursor |

### How to make changes to a specific view:
- **To change Mobile only:** Open `assets/css/mobile.css`. Any CSS property changed here applies **only** when viewed on a phone or screen under 768px. It will not touch tablet or desktop.
- **To change Tablet only:** Open `assets/css/tablet.css`. Any CSS property changed here applies **only** when viewed on a tablet (768px - 1023px). It will not touch mobile or desktop.
- **To change 1024 Desktop only:** Open `assets/css/desktop-1024.css`. Any CSS property changed here applies **only** on screens 1024px and wider. It will not touch mobile or tablet.

### View-Specific HTML Utility Classes:
If you want to show or hide HTML elements only on specific views:
- `.mobile-only` / `.show-on-mobile`: Visible only on mobile (<768px).
- `.tab-only` / `.show-on-tab`: Visible only on tablet (768px-1023px).
- `.desktop-only` / `.show-on-1024`: Visible only on 1024+ desktop.
- `.hide-on-mobile`: Hidden on mobile.
- `.hide-on-tab`: Hidden on tablet.
- `.hide-on-1024`: Hidden on desktop.


