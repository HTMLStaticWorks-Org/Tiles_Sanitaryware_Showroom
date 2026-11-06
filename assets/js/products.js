/**
 * ==========================================================================
 * AURELIA SURFACES — Product Catalogue Data & Interactive Engine
 * File: assets/js/products.js
 * Features:
 *  - 46 unique architectural tile & sanitaryware products across all 14 categories
 *  - Multi-attribute live filtering & sorting without page reload
 *  - Skeleton loading states, URL query deep-linking, and result counters
 *  - Slide-over Product Specification Drawer with hover-zoom & related items
 *  - Compare-up-to-3-products sticky tray & side-by-side comparison table
 * ==========================================================================
 */

(() => {
  'use strict';

  /**
   * TODO: Replace or extend product entries below with your live showroom SKU feed.
   * Every product references its own unique WebP photograph in assets/images/.
   */
  const PRODUCTS = [
    // 1. Floor Tiles (4)
    {
      code: 'AUR-FL-101',
      name: 'Travertino Romano Vein-Cut',
      category: 'Floor Tiles',
      rooms: ['Living Room', 'Bedroom', 'Commercial Spaces'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['800×1600 mm', '600×1200 mm'],
      primarySize: '800×1600 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'Honed Matte',
      thickness: '9.5 mm',
      slipRating: 'R10',
      priceTier: 'mid',
      priceLabel: '₹185 / sq.ft.',
      priceRank: 185,
      popularity: 99,
      isNew: true,
      featuredTag: 'Best Seller',
      image: 'assets/images/product-floor-tile-01.webp',
      imageSm: 'assets/images/product-floor-tile-01-sm.webp',
      usage: 'Luxury residential living floors, foyers, master suites, and boutique retail salons.',
      maintenance: 'Sweep routinely; damp-mop with pH-neutral stone & porcelain cleanser. Zero sealing required.',
      description: 'Linear vein-cut Italian travertine character captured in rectified full-body porcelain with ultra-fine 1.5 mm grout compatibility.'
    },
    {
      code: 'AUR-FL-102',
      name: 'Grigio Carnico Polished',
      category: 'Floor Tiles',
      rooms: ['Living Room', 'Commercial Spaces'],
      material: 'Full-Body Porcelain',
      sizes: ['600×1200 mm', '800×1600 mm'],
      primarySize: '600×1200 mm',
      colour: 'Charcoal & Slate',
      finish: 'High Gloss',
      thickness: '10 mm',
      slipRating: 'R9',
      priceTier: 'mid',
      priceLabel: '₹210 / sq.ft.',
      priceRank: 210,
      popularity: 92,
      isNew: false,
      featuredTag: 'Signature',
      image: 'assets/images/product-floor-tile-02.webp',
      imageSm: 'assets/images/product-floor-tile-02-sm.webp',
      usage: 'Formal reception rooms, hotel lobbies, dining halls, and statement hallways.',
      maintenance: 'Clean with microfiber flat mop and non-abrasive neutral cleaner to preserve mirror clarity.',
      description: 'Dramatic charcoal-grey Alpine marble aesthetics with crisp crystalline white veining and diamond-polished luminosity.'
    },
    {
      code: 'AUR-FL-103',
      name: 'Sabbia Limestone Warm',
      category: 'Floor Tiles',
      rooms: ['Living Room', 'Bedroom', 'Kitchen'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['600×600 mm', '600×1200 mm'],
      primarySize: '600×600 mm',
      colour: 'Ivory & Cream',
      finish: 'Satin Matte',
      thickness: '9 mm',
      slipRating: 'R10',
      priceTier: 'entry',
      priceLabel: '₹125 / sq.ft.',
      priceRank: 125,
      popularity: 88,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-floor-tile-03.webp',
      imageSm: 'assets/images/product-floor-tile-03-sm.webp',
      usage: 'Whole-home seamless flooring across living areas, bedrooms, and dry kitchens.',
      maintenance: 'Effortless daily wipe-down; stain-impervious vitrified body resists coffee, oil, and wine.',
      description: 'Sun-warmed Mediterranean limestone tones with subtle fossil grain and a velvety underfoot satin touch.'
    },
    {
      code: 'AUR-FL-104',
      name: 'Basaltina Antracite',
      category: 'Floor Tiles',
      rooms: ['Living Room', 'Kitchen', 'Commercial Spaces'],
      material: 'Full-Body Porcelain',
      sizes: ['800×1600 mm', '600×600 mm'],
      primarySize: '800×1600 mm',
      colour: 'Charcoal & Slate',
      finish: 'Textured Anti-Slip',
      thickness: '10.5 mm',
      slipRating: 'R11',
      priceTier: 'mid',
      priceLabel: '₹230 / sq.ft.',
      priceRank: 230,
      popularity: 85,
      isNew: true,
      featuredTag: 'New Arrival',
      image: 'assets/images/product-floor-tile-04.webp',
      imageSm: 'assets/images/product-floor-tile-04-sm.webp',
      usage: 'High-traffic commercial galleries, architectural lofts, and open-plan culinary zones.',
      maintenance: 'Scrub-safe rectified surface; compatible with steam mops and neutral detergents.',
      description: 'Volcanic Italian basalt character engineered for heavy footfall with subtle mineral sparkle.'
    },

    // 2. Wall Tiles (3)
    {
      code: 'AUR-WL-201',
      name: 'Kitkat Artisanal Ivory',
      category: 'Wall Tiles',
      rooms: ['Bathroom', 'Kitchen', 'Living Room'],
      material: 'Ceramic Wall',
      sizes: ['300×600 mm'],
      primarySize: '300×600 mm',
      colour: 'Ivory & Cream',
      finish: 'High Gloss',
      thickness: '8.5 mm',
      slipRating: 'Wall Only',
      priceTier: 'entry',
      priceLabel: '₹145 / sq.ft.',
      priceRank: 145,
      popularity: 94,
      isNew: true,
      featuredTag: 'Trending',
      image: 'assets/images/product-wall-tile-01.webp',
      imageSm: 'assets/images/product-wall-tile-01-sm.webp',
      usage: 'Vanity splashbacks, curved bar fronts, tea pantries, and shower niche accents.',
      maintenance: 'Wipe with damp soft cloth; glazed porcelain-enamel resists limescale buildup.',
      description: 'Fine finger-mosaic profile pre-scored on rectified sheets for rapid architectural installation and artisanal depth.'
    },
    {
      code: 'AUR-WL-202',
      name: 'Lino Fluted Architectural',
      category: 'Wall Tiles',
      rooms: ['Living Room', 'Bedroom', 'Bathroom'],
      material: 'Ceramic Wall',
      sizes: ['600×1200 mm', '300×600 mm'],
      primarySize: '600×1200 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'Satin Matte',
      thickness: '9.5 mm',
      slipRating: 'Wall Only',
      priceTier: 'mid',
      priceLabel: '₹195 / sq.ft.',
      priceRank: 195,
      popularity: 91,
      isNew: true,
      featuredTag: 'Architect Pick',
      image: 'assets/images/product-wall-tile-02.webp',
      imageSm: 'assets/images/product-wall-tile-02-sm.webp',
      usage: 'Feature walls, headboard cladding, foyer columns, and dry powder-room elevations.',
      maintenance: 'Dust lightly or wipe along vertical flutes using warm water.',
      description: 'Sculpted three-dimensional vertical ribs cast gentle architectural shadow play throughout the day.'
    },
    {
      code: 'AUR-WL-203',
      name: 'Zellige Argilla Sand',
      category: 'Wall Tiles',
      rooms: ['Kitchen', 'Bathroom'],
      material: 'Ceramic Wall',
      sizes: ['300×600 mm'],
      primarySize: '300×600 mm',
      colour: 'Terracotta & Bronze',
      finish: 'High Gloss',
      thickness: '9 mm',
      slipRating: 'Wall Only',
      priceTier: 'mid',
      priceLabel: '₹175 / sq.ft.',
      priceRank: 175,
      popularity: 87,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-wall-tile-03.webp',
      imageSm: 'assets/images/product-wall-tile-03-sm.webp',
      usage: 'Bespoke kitchen backsplashes, cafe counters, and warm Mediterranean bath interiors.',
      maintenance: 'Clean with mild soap solution; avoid abrasive scouring pads.',
      description: 'Hand-pressed Moroccan clay inspiration with organic tonal variation from tile to tile.'
    },

    // 3. Bathroom Tiles (3)
    {
      code: 'AUR-BT-301',
      name: 'Statuario Venato Spa',
      category: 'Bathroom Tiles',
      rooms: ['Bathroom'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['600×1200 mm', '800×1600 mm'],
      primarySize: '600×1200 mm',
      colour: 'Carrara White',
      finish: 'Honed Matte',
      thickness: '9 mm',
      slipRating: 'R10',
      priceTier: 'mid',
      priceLabel: '₹215 / sq.ft.',
      priceRank: 215,
      popularity: 97,
      isNew: false,
      featuredTag: 'Best Seller',
      image: 'assets/images/product-bathroom-tile-01.webp',
      imageSm: 'assets/images/product-bathroom-tile-01-sm.webp',
      usage: 'Wet-room walls, walk-in rain showers, vanity surrounds, and barefoot bathroom floors.',
      maintenance: 'Zero water absorption (<0.05%); rinse after soap exposure and squeegee glass/tile.',
      description: 'Crisp Carrara-region white marble background crossed by feathered dove-grey veins in a slip-safe silk finish.'
    },
    {
      code: 'AUR-BT-302',
      name: 'Ceppo Di Gre Terrazzo',
      category: 'Bathroom Tiles',
      rooms: ['Bathroom', 'Balcony'],
      material: 'Full-Body Porcelain',
      sizes: ['600×600 mm', '600×1200 mm'],
      primarySize: '600×600 mm',
      colour: 'Charcoal & Slate',
      finish: 'Textured Anti-Slip',
      thickness: '9.5 mm',
      slipRating: 'R11',
      priceTier: 'mid',
      priceLabel: '₹190 / sq.ft.',
      priceRank: 190,
      popularity: 89,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-bathroom-tile-02.webp',
      imageSm: 'assets/images/product-bathroom-tile-02-sm.webp',
      usage: 'Wet shower floors, wellness steam rooms, and contemporary spa ensuites.',
      maintenance: 'Highly resistant to bath oils, shampoos, and hard-water minerals.',
      description: 'Iconic Lombardic pebble-breccia stone reproduced with micro-grip barefoot wet safety.'
    },
    {
      code: 'AUR-BT-303',
      name: 'Onyx Avorio Cloud',
      category: 'Bathroom Tiles',
      rooms: ['Bathroom', 'Bedroom'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['800×1600 mm'],
      primarySize: '800×1600 mm',
      colour: 'Ivory & Cream',
      finish: 'Polished Lappato',
      thickness: '9.5 mm',
      slipRating: 'R9',
      priceTier: 'luxury',
      priceLabel: '₹340 / sq.ft.',
      priceRank: 340,
      popularity: 93,
      isNew: true,
      featuredTag: 'Luxury Edition',
      image: 'assets/images/product-bathroom-tile-03.webp',
      imageSm: 'assets/images/product-bathroom-tile-03-sm.webp',
      usage: 'Master bath feature walls, freestanding tub backdrops, and dressing suites.',
      maintenance: 'Wipe with chamois or microfiber cloth for luminous pearl sheen.',
      description: 'Translucent alabaster clouds and warm amber mineral ribbons create an ethereal sanctuary.'
    },

    // 4. Kitchen Tiles (3)
    {
      code: 'AUR-KT-401',
      name: 'Biselado Bianca Chevron',
      category: 'Kitchen Tiles',
      rooms: ['Kitchen', 'Bathroom'],
      material: 'Ceramic Wall',
      sizes: ['300×600 mm'],
      primarySize: '300×600 mm',
      colour: 'Carrara White',
      finish: 'High Gloss',
      thickness: '8 mm',
      slipRating: 'Wall Only',
      priceTier: 'entry',
      priceLabel: '₹130 / sq.ft.',
      priceRank: 130,
      popularity: 86,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-kitchen-tile-01.webp',
      imageSm: 'assets/images/product-kitchen-tile-01-sm.webp',
      usage: 'Cooktop splashbacks, butler pantries, and espresso bar walls.',
      maintenance: 'Stain-shield glaze wipes clean of turmeric, oil splatter, and sauces in seconds.',
      description: 'Crisp bevel-edged culinary wall tiles engineered for timeless herringbone or stacked layouts.'
    },
    {
      code: 'AUR-KT-402',
      name: 'Pietra Lavica Culinary',
      category: 'Kitchen Tiles',
      rooms: ['Kitchen', 'Commercial Spaces'],
      material: 'Sintered Stone Slab',
      sizes: ['600×1200 mm', '1200×2400 mm'],
      primarySize: '600×1200 mm',
      colour: 'Charcoal & Slate',
      finish: 'Satin Matte',
      thickness: '12 mm',
      slipRating: 'R10',
      priceTier: 'luxury',
      priceLabel: '₹390 / sq.ft.',
      priceRank: 390,
      popularity: 95,
      isNew: true,
      featuredTag: 'Chef Spec',
      image: 'assets/images/product-kitchen-tile-02.webp',
      imageSm: 'assets/images/product-kitchen-tile-02-sm.webp',
      usage: 'Kitchen floors, island waterfall aprons, and heat-proof countertop cladding.',
      maintenance: '100% thermal-shock, acid, lemon, and knife-scratch resistant.',
      description: 'High-density sintered volcanic stone built to handle hot cookware and heavy culinary activity.'
    },
    {
      code: 'AUR-KT-403',
      name: 'Salvia Artisanal Brick',
      category: 'Kitchen Tiles',
      rooms: ['Kitchen'],
      material: 'Ceramic Wall',
      sizes: ['300×600 mm'],
      primarySize: '300×600 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'High Gloss',
      thickness: '8.5 mm',
      slipRating: 'Wall Only',
      priceTier: 'entry',
      priceLabel: '₹155 / sq.ft.',
      priceRank: 155,
      popularity: 84,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-kitchen-tile-03.webp',
      imageSm: 'assets/images/product-kitchen-tile-03-sm.webp',
      usage: 'Country-modern kitchens, open-shelving backdrops, and breakfast nooks.',
      maintenance: 'Wipe with warm soapy cloth; non-crazing kiln glaze.',
      description: 'Muted botanical moss-and-sage glaze that pairs effortlessly with walnut cabinetry and brushed bronze taps.'
    },

    // 5. Outdoor & Parking Tiles (3)
    {
      code: 'AUR-OD-501',
      name: 'Porphyry Cobble Forte 20mm',
      category: 'Outdoor & Parking Tiles',
      rooms: ['Balcony', 'Terrace', 'Commercial Spaces'],
      material: 'Full-Body Porcelain',
      sizes: ['600×600 mm'],
      primarySize: '600×600 mm',
      colour: 'Charcoal & Slate',
      finish: 'Textured Anti-Slip',
      thickness: '20 mm',
      slipRating: 'R11',
      priceTier: 'mid',
      priceLabel: '₹265 / sq.ft.',
      priceRank: 265,
      popularity: 91,
      isNew: false,
      featuredTag: 'Heavy Duty',
      image: 'assets/images/product-outdoor-tile-01.webp',
      imageSm: 'assets/images/product-outdoor-tile-01-sm.webp',
      usage: 'SUV driveways, porte-cocheres, garden pathways, and pedestal rooftop decks.',
      maintenance: 'Pressure-washable; UV-fast, frost-proof, and moss/algae resistant.',
      description: 'Monolithic 20 mm structural porcelain paver rated for >1,000 kg point load strength.'
    },
    {
      code: 'AUR-OD-502',
      name: 'Quarzite Alpina Terrace',
      category: 'Outdoor & Parking Tiles',
      rooms: ['Balcony', 'Terrace'],
      material: 'Full-Body Porcelain',
      sizes: ['600×1200 mm', '600×600 mm'],
      primarySize: '600×1200 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'Textured Anti-Slip',
      thickness: '12 mm',
      slipRating: 'R11',
      priceTier: 'mid',
      priceLabel: '₹220 / sq.ft.',
      priceRank: 220,
      popularity: 88,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-outdoor-tile-02.webp',
      imageSm: 'assets/images/product-outdoor-tile-02-sm.webp',
      usage: 'Swimming pool coping, monsoon terraces, verandas, and courtyard lounges.',
      maintenance: 'Hose rinse or stiff bristle sweep; unaffected by pool chlorine or salt.',
      description: 'Natural cleft-quartzite relief that stays cool underfoot in tropical sun while ensuring wet-foot traction.'
    },
    {
      code: 'AUR-OD-503',
      name: 'Granito Nero Driveway',
      category: 'Outdoor & Parking Tiles',
      rooms: ['Terrace', 'Commercial Spaces'],
      material: 'Full-Body Porcelain',
      sizes: ['600×600 mm'],
      primarySize: '600×600 mm',
      colour: 'Charcoal & Slate',
      finish: 'Textured Anti-Slip',
      thickness: '16 mm',
      slipRating: 'R12',
      priceTier: 'entry',
      priceLabel: '₹150 / sq.ft.',
      priceRank: 150,
      popularity: 83,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-outdoor-tile-03.webp',
      imageSm: 'assets/images/product-outdoor-tile-03-sm.webp',
      usage: 'Residential stilt parking, villa ramps, and commercial walkways.',
      maintenance: 'Tire-mark and motor-oil resistant dense body; pressure-wash safe.',
      description: 'Shot-blasted granite aesthetic engineered for steep ramps and heavy vehicular parking.'
    },

    // 6. Porcelain Slabs (4)
    {
      code: 'AUR-SL-601',
      name: 'Calacatta Oro Monolith',
      category: 'Porcelain Slabs',
      rooms: ['Living Room', 'Bathroom', 'Kitchen'],
      material: 'Sintered Stone Slab',
      sizes: ['1600×3200 mm', '1200×2400 mm'],
      primarySize: '1600×3200 mm',
      colour: 'Carrara White',
      finish: 'Polished Lappato',
      thickness: '12 mm',
      slipRating: 'R9',
      priceTier: 'luxury',
      priceLabel: '₹540 / sq.ft.',
      priceRank: 540,
      popularity: 100,
      isNew: true,
      featuredTag: 'Flagship Slab',
      image: 'assets/images/product-porcelain-slab-01.webp',
      imageSm: 'assets/images/product-porcelain-slab-01-sm.webp',
      usage: 'Bookmatched TV walls, seamless dining tables, kitchen islands, and master bath walls.',
      maintenance: 'Non-porous sintered body; zero etching from lemon or wine.',
      description: 'Available in A+B bookmatched pairs with warm golden-taupe ribbons across an ivory-white field.'
    },
    {
      code: 'AUR-SL-602',
      name: 'Sahara Noir Gold Vein',
      category: 'Porcelain Slabs',
      rooms: ['Living Room', 'Bathroom', 'Commercial Spaces'],
      material: 'Sintered Stone Slab',
      sizes: ['1200×2400 mm', '1600×3200 mm'],
      primarySize: '1200×2400 mm',
      colour: 'Charcoal & Slate',
      finish: 'Satin Matte',
      thickness: '9 mm',
      slipRating: 'R9',
      priceTier: 'luxury',
      priceLabel: '₹490 / sq.ft.',
      priceRank: 490,
      popularity: 96,
      isNew: false,
      featuredTag: 'Signature',
      image: 'assets/images/product-porcelain-slab-02.webp',
      imageSm: 'assets/images/product-porcelain-slab-02-sm.webp',
      usage: 'Private bar lounges, boutique hotel lifts, fireplace monoliths, and vanity tops.',
      maintenance: 'Wipe with damp microfiber cloth to maintain deep fingerprint-resistant satin.',
      description: 'Obsidian espresso-black canvas intersected by razor-sharp bronze and alabaster veins.'
    },
    {
      code: 'AUR-SL-603',
      name: 'Taj Mahal Quartzite Slab',
      category: 'Porcelain Slabs',
      rooms: ['Kitchen', 'Living Room', 'Bedroom'],
      material: 'Sintered Stone Slab',
      sizes: ['1600×3200 mm'],
      primarySize: '1600×3200 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'Honed Matte',
      thickness: '12 mm',
      slipRating: 'R10',
      priceTier: 'luxury',
      priceLabel: '₹580 / sq.ft.',
      priceRank: 580,
      popularity: 98,
      isNew: true,
      featuredTag: 'Designer Choice',
      image: 'assets/images/product-porcelain-slab-03.webp',
      imageSm: 'assets/images/product-porcelain-slab-03-sm.webp',
      usage: 'Bespoke kitchen islands, integrated sinks, dining tabletops, and full-height cladding.',
      maintenance: 'Food-safe hygienic surface; heat resistant up to 300°C.',
      description: 'Warm cashmere-beige Brazilian quartzite aesthetic with subtle translucent depth and cashmere touch.'
    },
    {
      code: 'AUR-SL-604',
      name: 'Fior Di Bosco Grande',
      category: 'Porcelain Slabs',
      rooms: ['Living Room', 'Bathroom', 'Commercial Spaces'],
      material: 'Sintered Stone Slab',
      sizes: ['1200×2400 mm'],
      primarySize: '1200×2400 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'Honed Matte',
      thickness: '9 mm',
      slipRating: 'R10',
      priceTier: 'luxury',
      priceLabel: '₹440 / sq.ft.',
      priceRank: 440,
      popularity: 90,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-porcelain-slab-04.webp',
      imageSm: 'assets/images/product-porcelain-slab-04-sm.webp',
      usage: 'Executive boardrooms, penthouse living floors, and monolithic bath walls.',
      maintenance: 'Clean with neutral stone wash; zero resin or wax treatments required.',
      description: 'Tuscan smoke-taupe stone laced with delicate ivory and warm bronze fissures.'
    },

    // 7. Marble & Stone Finish Tiles (4)
    {
      code: 'AUR-MS-701',
      name: 'Botticino Classico Crema',
      category: 'Marble & Stone Finish Tiles',
      rooms: ['Living Room', 'Bedroom'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['800×1600 mm', '600×1200 mm'],
      primarySize: '800×1600 mm',
      colour: 'Ivory & Cream',
      finish: 'High Gloss',
      thickness: '9.5 mm',
      slipRating: 'R9',
      priceTier: 'mid',
      priceLabel: '₹205 / sq.ft.',
      priceRank: 205,
      popularity: 91,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-marble-stone-01.webp',
      imageSm: 'assets/images/product-marble-stone-01-sm.webp',
      usage: 'Expansive residential living halls, duplex staircases, and classical suites.',
      maintenance: 'Retains factory mirror shine without periodic floor polishing.',
      description: 'Timeless Lombardic cream marble warmth without natural marble porosity or yellowing.'
    },
    {
      code: 'AUR-MS-702',
      name: 'Emperador Bronzo Dark',
      category: 'Marble & Stone Finish Tiles',
      rooms: ['Living Room', 'Bathroom', 'Commercial Spaces'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['600×1200 mm'],
      primarySize: '600×1200 mm',
      colour: 'Terracotta & Bronze',
      finish: 'Polished Lappato',
      thickness: '9.5 mm',
      slipRating: 'R9',
      priceTier: 'mid',
      priceLabel: '₹225 / sq.ft.',
      priceRank: 225,
      popularity: 86,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-marble-stone-02.webp',
      imageSm: 'assets/images/product-marble-stone-02-sm.webp',
      usage: 'Study lounges, cigar & wine rooms, powder room wainscots, and lift lobbies.',
      maintenance: 'Simple neutral damp mop; impervious to spills.',
      description: 'Rich espresso-brown Spanish marble character spider-webbed with warm honey-bronze calcite veins.'
    },
    {
      code: 'AUR-MS-703',
      name: 'Jura Beige Fossil Stone',
      category: 'Marble & Stone Finish Tiles',
      rooms: ['Living Room', 'Bedroom', 'Balcony'],
      material: 'Full-Body Porcelain',
      sizes: ['600×1200 mm', '600×600 mm'],
      primarySize: '600×1200 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'Honed Matte',
      thickness: '10 mm',
      slipRating: 'R10',
      priceTier: 'mid',
      priceLabel: '₹195 / sq.ft.',
      priceRank: 195,
      popularity: 89,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-marble-stone-03.webp',
      imageSm: 'assets/images/product-marble-stone-03-sm.webp',
      usage: 'Indoor-to-outdoor continuous villa floors, galleries, and serene bedrooms.',
      maintenance: 'Low-sheen matte conceals dust and footprints effortlessly.',
      description: 'Authentic Bavarian limestone detail featuring organic mineral shells and warm oatmeal undertones.'
    },
    {
      code: 'AUR-MS-704',
      name: 'Verde Alpi Botanica',
      category: 'Marble & Stone Finish Tiles',
      rooms: ['Bathroom', 'Living Room', 'Commercial Spaces'],
      material: 'Sintered Stone Slab',
      sizes: ['1200×2400 mm'],
      primarySize: '1200×2400 mm',
      colour: 'Charcoal & Slate',
      finish: 'High Gloss',
      thickness: '9 mm',
      slipRating: 'R9',
      priceTier: 'luxury',
      priceLabel: '₹460 / sq.ft.',
      priceRank: 460,
      popularity: 94,
      isNew: true,
      featuredTag: 'Statement Piece',
      image: 'assets/images/product-marble-stone-04.webp',
      imageSm: 'assets/images/product-marble-stone-04-sm.webp',
      usage: 'Statement powder rooms, boutique jewellery displays, and dining feature walls.',
      maintenance: 'Clean with soft glass/stone spray and lint-free cloth.',
      description: 'Deep forest-emerald Italian alpine stone dramatically veined with snow-white mineral streaks.'
    },

    // 8. Wooden Finish Tiles (3)
    {
      code: 'AUR-WD-801',
      name: 'Rovere Miel Plank',
      category: 'Wooden Finish Tiles',
      rooms: ['Bedroom', 'Living Room', 'Balcony'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['200×1200 mm'],
      primarySize: '200×1200 mm',
      colour: 'Walnut & Oak',
      finish: 'Honed Matte',
      thickness: '9.5 mm',
      slipRating: 'R10',
      priceTier: 'mid',
      priceLabel: '₹175 / sq.ft.',
      priceRank: 175,
      popularity: 95,
      isNew: false,
      featuredTag: 'Best Seller',
      image: 'assets/images/product-wood-tile-01.webp',
      imageSm: 'assets/images/product-wood-tile-01-sm.webp',
      usage: 'Master bedrooms, dressing rooms, covered balconies, and underfloor-heated spaces.',
      maintenance: '100% termite-proof, waterproof, and warp-free unlike engineered timber.',
      description: 'Synchronized grain relief mirrors brushed honey-oak planks down to every knot and cathedral ring.'
    },
    {
      code: 'AUR-WD-802',
      name: 'Noce Canaletto Herringbone',
      category: 'Wooden Finish Tiles',
      rooms: ['Bedroom', 'Living Room'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['200×1200 mm'],
      primarySize: '200×1200 mm',
      colour: 'Walnut & Oak',
      finish: 'Satin Matte',
      thickness: '9 mm',
      slipRating: 'R10',
      priceTier: 'mid',
      priceLabel: '₹195 / sq.ft.',
      priceRank: 195,
      popularity: 90,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-wood-tile-02.webp',
      imageSm: 'assets/images/product-wood-tile-02-sm.webp',
      usage: 'Parquet herringbone studies, private libraries, and warm luxury suites.',
      maintenance: 'Damp mop normally; immune to high heels and pet claws.',
      description: 'Rich roasted Italian American walnut tones crafted for classic chevron and herringbone laying patterns.'
    },
    {
      code: 'AUR-WD-803',
      name: 'Nordic Ash Whitewashed',
      category: 'Wooden Finish Tiles',
      rooms: ['Bedroom', 'Living Room', 'Kitchen'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['200×1200 mm'],
      primarySize: '200×1200 mm',
      colour: 'Ivory & Cream',
      finish: 'Honed Matte',
      thickness: '9.5 mm',
      slipRating: 'R10',
      priceTier: 'entry',
      priceLabel: '₹160 / sq.ft.',
      priceRank: 160,
      popularity: 84,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-wood-tile-03.webp',
      imageSm: 'assets/images/product-wood-tile-03-sm.webp',
      usage: 'Minimalist Japandi apartments, children bedrooms, and coastal villas.',
      maintenance: 'Zero waxing or oiling ever needed.',
      description: 'Pale Scandinavian ash timber aesthetic that brightens compact interiors with calm organic warmth.'
    },

    // 9. Designer Tiles (3)
    {
      code: 'AUR-DS-901',
      name: 'Venezia Palladiana Terrazzo',
      category: 'Designer Tiles',
      rooms: ['Living Room', 'Bathroom', 'Commercial Spaces'],
      material: 'Full-Body Porcelain',
      sizes: ['600×1200 mm', '800×1600 mm'],
      primarySize: '600×1200 mm',
      colour: 'Ivory & Cream',
      finish: 'Satin Matte',
      thickness: '10 mm',
      slipRating: 'R10',
      priceTier: 'mid',
      priceLabel: '₹245 / sq.ft.',
      priceRank: 245,
      popularity: 92,
      isNew: true,
      featuredTag: 'Editorial Pick',
      image: 'assets/images/product-designer-tile-01.webp',
      imageSm: 'assets/images/product-designer-tile-01-sm.webp',
      usage: 'Artisanal cafes, designer foyers, boutique powder rooms, and gallery floors.',
      maintenance: 'Stain-proof porcelain matrix eliminates traditional cement-terrazzo sealing.',
      description: 'Macro-scale Sienna, Carrara, and Verona marble fragments suspended in a warm ivory lime-look matrix.'
    },
    {
      code: 'AUR-DS-902',
      name: 'Palazzo Geometric Inlay',
      category: 'Designer Tiles',
      rooms: ['Living Room', 'Kitchen', 'Balcony'],
      material: 'Glazed Vitrified Porcelain',
      sizes: ['600×600 mm'],
      primarySize: '600×600 mm',
      colour: 'Terracotta & Bronze',
      finish: 'Honed Matte',
      thickness: '9 mm',
      slipRating: 'R10',
      priceTier: 'mid',
      priceLabel: '₹210 / sq.ft.',
      priceRank: 210,
      popularity: 87,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-designer-tile-02.webp',
      imageSm: 'assets/images/product-designer-tile-02-sm.webp',
      usage: 'Dining rug-border inlays, courtyard verandas, and heritage restoration projects.',
      maintenance: 'Easy wipe-clean; kiln-fired pigments never fade in sunlight.',
      description: 'Architectural stone-inlay geometry in muted bronze, chalk ivory, and charcoal umber.'
    },
    {
      code: 'AUR-DS-903',
      name: 'Arco Bronze Metallic Relief',
      category: 'Designer Tiles',
      rooms: ['Living Room', 'Bathroom', 'Commercial Spaces'],
      material: 'Ceramic Wall',
      sizes: ['600×1200 mm'],
      primarySize: '600×1200 mm',
      colour: 'Terracotta & Bronze',
      finish: 'Brushed Bronze PVD',
      thickness: '10 mm',
      slipRating: 'Wall Only',
      priceTier: 'luxury',
      priceLabel: '₹360 / sq.ft.',
      priceRank: 360,
      popularity: 89,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-designer-tile-03.webp',
      imageSm: 'assets/images/product-designer-tile-03-sm.webp',
      usage: 'Reception backdrops, luxury bar fronts, and statement vanity walls.',
      maintenance: 'Dust or wipe gently with soft damp cloth; avoid acidic cleaners.',
      description: 'Micro-engraved arched relief infused with a subtle burnished-bronze mineral luster.'
    },

    // 10. Washbasins (4)
    {
      code: 'AUR-WB-1001',
      name: 'Conca Vessel Countertop Basin',
      category: 'Washbasins',
      rooms: ['Bathroom'],
      material: 'Vitreous China',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '550×380×135 mm',
      colour: 'Ivory & Cream',
      finish: 'Satin Matte',
      thickness: '5 mm Ultra-Thin Rim',
      slipRating: 'CE / EN 14688',
      priceTier: 'bathware',
      priceLabel: '₹18,500 / unit',
      priceRank: 410,
      popularity: 96,
      isNew: true,
      featuredTag: 'Best Seller',
      image: 'assets/images/product-washbasin-01.webp',
      imageSm: 'assets/images/product-washbasin-01-sm.webp',
      usage: 'Master bathroom stone vanities and guest powder-room consoles.',
      maintenance: ' wipe with soft sponge and mild soap; antimicrobial satin glaze prevents water spots.',
      description: 'Fine fireclay vessel basin sculpted with knife-edge 5 mm walls and matching ceramic pop-up waste.'
    },
    {
      code: 'AUR-WB-1002',
      name: 'Monolite Pedestal Freestanding Basin',
      category: 'Washbasins',
      rooms: ['Bathroom', 'Commercial Spaces'],
      material: 'Stone Resin',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '450×450×850 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'Honed Matte',
      thickness: 'Solid Cast Monolith',
      slipRating: 'CE Certified',
      priceTier: 'bathware',
      priceLabel: '₹54,000 / unit',
      priceRank: 620,
      popularity: 94,
      isNew: true,
      featuredTag: 'Showstopper',
      image: 'assets/images/product-washbasin-02.webp',
      imageSm: 'assets/images/product-washbasin-02-sm.webp',
      usage: 'Architectural powder rooms, penthouse suites, and luxury hospitality lounges.',
      maintenance: 'Renewable solid mineral surface; buff lightly with soft pad if ever marked.',
      description: 'Floor-standing architectural column basin compatible with wall-concealed or tall floor-mounted spouts.'
    },
    {
      code: 'AUR-WB-1003',
      name: 'Siena Fluted Counter Basin',
      category: 'Washbasins',
      rooms: ['Bathroom'],
      material: 'Vitreous China',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '420×420×150 mm',
      colour: 'Charcoal & Slate',
      finish: 'Satin Matte',
      thickness: '7 mm Rim',
      slipRating: 'CE / EN 14688',
      priceTier: 'bathware',
      priceLabel: '₹22,900 / unit',
      priceRank: 430,
      popularity: 90,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-washbasin-03.webp',
      imageSm: 'assets/images/product-washbasin-03-sm.webp',
      usage: 'Moody nocturnal powder rooms and travertine vanity countertops.',
      maintenance: 'Rinse after use; hydrophobic nano-coat sheds hard-water droplets.',
      description: 'Tactile fluted exterior paired with a silky smooth espresso-charcoal interior bowl.'
    },
    {
      code: 'AUR-WB-1004',
      name: 'Velluto Integrated Vanity Top',
      category: 'Washbasins',
      rooms: ['Bathroom'],
      material: 'Sintered Stone Slab',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '900×500×120 mm',
      colour: 'Warm Beige & Travertine',
      finish: 'Honed Matte',
      thickness: '12 mm Mitred Apron',
      slipRating: 'Custom Widths Available',
      priceTier: 'bathware',
      priceLabel: '₹42,000 / unit',
      priceRank: 550,
      popularity: 93,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-washbasin-04.webp',
      imageSm: 'assets/images/product-washbasin-04-sm.webp',
      usage: 'Wall-hung master vanities (single or 1500 mm twin-bowl bespoke fabrication).',
      maintenance: 'Concealed slot drain lifts out cleanly for effortless hygiene.',
      description: 'Seamless mitred sintered-stone basin with concealed linear drainage and generous counter deck.'
    },

    // 11. Water Closets (WC) (3)
    {
      code: 'AUR-WC-1101',
      name: 'Sospeso Rimless Wall-Hung WC',
      category: 'Water Closets (WC)',
      rooms: ['Bathroom', 'Commercial Spaces'],
      material: 'Vitreous China',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '540×365×340 mm',
      colour: 'Ivory & Cream',
      finish: 'Satin Matte',
      thickness: 'Concealed Fixation',
      slipRating: '4.5 / 3L Dual Flush',
      priceTier: 'bathware',
      priceLabel: '₹26,500 / unit',
      priceRank: 450,
      popularity: 95,
      isNew: false,
      featuredTag: 'Best Seller',
      image: 'assets/images/product-wc-01.webp',
      imageSm: 'assets/images/product-wc-01-sm.webp',
      usage: 'Modern residential bathrooms and executive commercial washrooms.',
      maintenance: 'Quick-release UF soft-close slim seat lifts off with one button for full sanitizing.',
      description: 'Whisper-quiet vortex rimless flush paired with completely hidden wall bolts and universal cistern compatibility.'
    },
    {
      code: 'AUR-WC-1102',
      name: 'Nero Opaco Rimless Wall-Hung WC',
      category: 'Water Closets (WC)',
      rooms: ['Bathroom'],
      material: 'Vitreous China',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '530×360×350 mm',
      colour: 'Charcoal & Slate',
      finish: 'Satin Matte',
      thickness: 'Concealed Fixation',
      slipRating: '4.5 / 3L Dual Flush',
      priceTier: 'bathware',
      priceLabel: '₹31,800 / unit',
      priceRank: 480,
      popularity: 88,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-wc-02.webp',
      imageSm: 'assets/images/product-wc-02-sm.webp',
      usage: 'Designer powder rooms paired with dark slate or travertine wall cladding.',
      maintenance: 'Anti-scale matte glaze prevents mineral chalking.',
      description: 'Sculptural matte-espresso wall-hung pan with slim wrap-over soft-close seat.'
    },
    {
      code: 'AUR-WC-1103',
      name: 'Aria Intelligent Senso-Wash Suite',
      category: 'Water Closets (WC)',
      rooms: ['Bathroom'],
      material: 'Vitreous China',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '590×385×410 mm',
      colour: 'Carrara White',
      finish: 'High Gloss',
      thickness: 'Tankless Direct-Jet',
      slipRating: 'Smart Bidet + Auto Lid',
      priceTier: 'bathware',
      priceLabel: '₹1,18,000 / unit',
      priceRank: 680,
      popularity: 92,
      isNew: true,
      featuredTag: 'Flagship Tech',
      image: 'assets/images/product-wc-03.webp',
      imageSm: 'assets/images/product-wc-03-sm.webp',
      usage: 'Primary luxury master suites and presidential hospitality villas.',
      maintenance: 'UV-sterilizing stainless nozzle, self-rinsing bowl pre-mist, and descaling cycle.',
      description: 'Integrated wellness WC with heated seat, warm-air dryer, night ambient light, and wireless bronze remote.'
    },

    // 12. Faucets & Taps (3)
    {
      code: 'AUR-FC-1201',
      name: 'Cilindro Tall Basin Mixer',
      category: 'Faucets & Taps',
      rooms: ['Bathroom'],
      material: 'Solid Brass PVD',
      sizes: ['Sanitaryware / Custom'],
      primarySize: 'H: 295 mm · Spout: 180 mm',
      colour: 'Terracotta & Bronze',
      finish: 'Brushed Bronze PVD',
      thickness: 'DZR Lead-Free Brass',
      slipRating: '5.0 L/min Eco-Aerator',
      priceTier: 'bathware',
      priceLabel: '₹16,400 / unit',
      priceRank: 395,
      popularity: 97,
      isNew: true,
      featuredTag: 'Best Seller',
      image: 'assets/images/product-faucet-01.webp',
      imageSm: 'assets/images/product-faucet-01-sm.webp',
      usage: 'Countertop vessel washbasins across master baths and powder rooms.',
      maintenance: 'PVD vacuum coating is 10x harder than electroplating; wipe dry with soft cloth.',
      description: 'Precision knurled lever collar with Swiss Neoperl laminar aerator and German Kerox ceramic cartridge.'
    },
    {
      code: 'AUR-FC-1202',
      name: 'Linea Concealed Wall Spout & Mixer',
      category: 'Faucets & Taps',
      rooms: ['Bathroom'],
      material: 'Solid Brass PVD',
      sizes: ['Sanitaryware / Custom'],
      primarySize: 'Plate: 220×80 mm · Spout: 195 mm',
      colour: 'Terracotta & Bronze',
      finish: 'Brushed Bronze PVD',
      thickness: 'Includes Concealed Box',
      slipRating: '10-Year Cartridge Warranty',
      priceTier: 'bathware',
      priceLabel: '₹19,200 / set',
      priceRank: 420,
      popularity: 93,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-faucet-02.webp',
      imageSm: 'assets/images/product-faucet-02-sm.webp',
      usage: 'Wall-mounted above vessel or integrated stone vanity basins.',
      maintenance: 'Silicone anti-lime aerator clears with a single finger rub.',
      description: 'Architectural minimal wall trim and universal brass rough-in body for clutter-free vanity decks.'
    },
    {
      code: 'AUR-FC-1203',
      name: 'Grafite Deck-Mount Monobloc Tap',
      category: 'Faucets & Taps',
      rooms: ['Bathroom'],
      material: 'Solid Brass PVD',
      sizes: ['Sanitaryware / Custom'],
      primarySize: 'H: 175 mm · Spout: 135 mm',
      colour: 'Charcoal & Slate',
      finish: 'Brushed Bronze PVD',
      thickness: 'Solid Brass Body',
      slipRating: '5.0 L/min Eco-Aerator',
      priceTier: 'bathware',
      priceLabel: '₹13,800 / unit',
      priceRank: 370,
      popularity: 86,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-faucet-03.webp',
      imageSm: 'assets/images/product-faucet-03-sm.webp',
      usage: 'Integrated tap-hole basins and compact cloakroom vanities.',
      maintenance: 'Resistant to tarnishing, salt air, and fingerprint smudges.',
      description: 'Monolithic brushed gunmetal-bronze silhouette with feather-light temperature control.'
    },

    // 13. Shower Systems (3)
    {
      code: 'AUR-SH-1301',
      name: 'Pioggia Ceiling-Flush Rain System',
      category: 'Shower Systems',
      rooms: ['Bathroom'],
      material: 'Solid Brass PVD',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '400×400 mm Rain + Thermostatic',
      colour: 'Terracotta & Bronze',
      finish: 'Brushed Bronze PVD',
      thickness: '38°C Safe-Stop Valve',
      slipRating: 'Min. 2.0 Bar Pressure',
      priceTier: 'bathware',
      priceLabel: '₹58,500 / suite',
      priceRank: 610,
      popularity: 98,
      isNew: true,
      featuredTag: 'Spa Favourite',
      image: 'assets/images/product-shower-01.webp',
      imageSm: 'assets/images/product-shower-01-sm.webp',
      usage: 'Luxury walk-in wet rooms and private wellness shower enclosures.',
      maintenance: 'Easy-clean liquid-silicone jets prevent mineral clogging.',
      description: 'Air-infused drenching tropical rain head, brass baton hand-shower, and push-button thermostatic trim.'
    },
    {
      code: 'AUR-SH-1302',
      name: 'Termo-Lux Exposed Column Shower',
      category: 'Shower Systems',
      rooms: ['Bathroom'],
      material: 'Solid Brass PVD',
      sizes: ['Sanitaryware / Custom'],
      primarySize: 'H: 1150 mm · Ø300 mm Head',
      colour: 'Charcoal & Slate',
      finish: 'Satin Matte',
      thickness: 'Retrofit Ready',
      slipRating: 'Vernier Thermostatic',
      priceTier: 'bathware',
      priceLabel: '₹36,900 / suite',
      priceRank: 495,
      popularity: 90,
      isNew: false,
      featuredTag: '',
      image: 'assets/images/product-shower-02.webp',
      imageSm: 'assets/images/product-shower-02-sm.webp',
      usage: 'Bathroom renovations and exposed-plumbing architectural showers without wall chiseling.',
      maintenance: 'Cool-touch valve body stays safe to touch; wipe dry after showering.',
      description: 'Telescopic solid-brass shower column with anti-scald 38°C lock and gliding handset cradle.'
    },
    {
      code: 'AUR-SH-1303',
      name: 'Cascata Wellness Body-Jet Suite',
      category: 'Shower Systems',
      rooms: ['Bathroom'],
      material: 'Solid Brass PVD',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '350×350 mm + 4 Hydro Jets',
      colour: 'Ivory & Cream',
      finish: 'Polished Lappato',
      thickness: '3-Way High-Flow Diverter',
      slipRating: 'Rain + Waterfall + Mist',
      priceTier: 'bathware',
      priceLabel: '₹72,000 / suite',
      priceRank: 645,
      popularity: 91,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-shower-03.webp',
      imageSm: 'assets/images/product-shower-03-sm.webp',
      usage: 'Bespoke hydrotherapy master baths and resort spa suites.',
      maintenance: 'Swivel brass micro-nozzles wipe clean effortlessly.',
      description: 'Three simultaneous water modes—drenching rain, neck-massage waterfall blade, and four directional body jets.'
    },

    // 14. Bathroom Accessories (3)
    {
      code: 'AUR-AC-1401',
      name: 'Atelier Heated Towel Rail 600',
      category: 'Bathroom Accessories',
      rooms: ['Bathroom'],
      material: 'Solid Brass PVD',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '600×800 mm · 8 Bars',
      colour: 'Terracotta & Bronze',
      finish: 'Brushed Bronze PVD',
      thickness: 'IPX5 Wet-Zone Rated',
      slipRating: '95W Eco Timer',
      priceTier: 'bathware',
      priceLabel: '₹24,500 / unit',
      priceRank: 445,
      popularity: 89,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-accessory-01.webp',
      imageSm: 'assets/images/product-accessory-01-sm.webp',
      usage: 'Master ensuites and monsoon-climate luxury residences.',
      maintenance: 'Concealed dry-element low-wattage heating; maintenance-free.',
      description: 'Keeps bath linens crisp, warm, and dry with an integrated 2h/4h touch timer in brushed bronze.'
    },
    {
      code: 'AUR-AC-1402',
      name: 'Luce Backlit Architectural Mirror',
      category: 'Bathroom Accessories',
      rooms: ['Bathroom', 'Bedroom'],
      material: 'Solid Brass PVD',
      sizes: ['Sanitaryware / Custom'],
      primarySize: '700×1100 mm',
      colour: 'Terracotta & Bronze',
      finish: 'Brushed Bronze PVD',
      thickness: '5 mm Copper-Free Glass',
      slipRating: 'CRI 95+ · Anti-Fog Pad',
      priceTier: 'bathware',
      priceLabel: '₹21,000 / unit',
      priceRank: 425,
      popularity: 94,
      isNew: false,
      featuredTag: 'Popular Add-On',
      image: 'assets/images/product-accessory-02.webp',
      imageSm: 'assets/images/product-accessory-02-sm.webp',
      usage: 'Single or twin vanity stations and dressing alcoves.',
      maintenance: 'Built-in demister keeps mirror crystal clear immediately after hot showers.',
      description: 'Anodized bronze hairline frame with dual-kelvin (2700K–4000K) halo illumination.'
    },
    {
      code: 'AUR-AC-1403',
      name: 'Pietra 5-Piece Counter & Wall Ensemble',
      category: 'Bathroom Accessories',
      rooms: ['Bathroom'],
      material: 'Stone Resin',
      sizes: ['Sanitaryware / Custom'],
      primarySize: 'Complete 5-Piece Suite',
      colour: 'Warm Beige & Travertine',
      finish: 'Honed Matte',
      thickness: 'Natural Stone + Brass',
      slipRating: 'Concealed Wall Mounts',
      priceTier: 'bathware',
      priceLabel: '₹14,900 / set',
      priceRank: 380,
      popularity: 88,
      isNew: true,
      featuredTag: '',
      image: 'assets/images/product-accessory-03.webp',
      imageSm: 'assets/images/product-accessory-03-sm.webp',
      usage: 'Coordinated finishing touch for residential and boutique hotel bathrooms.',
      maintenance: 'Pump mechanism crafted from non-corroding 316 marine-grade stainless & bronze.',
      description: 'Includes honed travertine soap dispenser, tumbler, tray, solid-brass robe hook, and paper holder.'
    }
  ];

  // Expose globally so instant header search on ALL pages can access the full SKU array
  window.AURELIA_PRODUCTS = PRODUCTS;

  const CATEGORIES = [
    'All',
    'Floor Tiles',
    'Wall Tiles',
    'Bathroom Tiles',
    'Kitchen Tiles',
    'Outdoor & Parking Tiles',
    'Porcelain Slabs',
    'Marble & Stone Finish Tiles',
    'Wooden Finish Tiles',
    'Designer Tiles',
    'Washbasins',
    'Water Closets (WC)',
    'Faucets & Taps',
    'Shower Systems',
    'Bathroom Accessories'
  ];

  /**
   * Escape HTML helper for safe DOM template rendering
   */
  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Build centered 3D-Tilt product card markup
   */
  function renderProductCard(p, compareSet) {
    const isCompared = compareSet && compareSet.has(p.code);
    const badgeHtml = p.featuredTag
      ? `<span class="lux-card__badge">${esc(p.featuredTag)}</span>`
      : p.isNew
        ? `<span class="lux-card__badge">New Launch</span>`
        : '';

    return `
      <article class="lux-card lux-card--product" data-tilt data-product-code="${esc(p.code)}">
        <div class="card-glare" aria-hidden="true"></div>
        <div class="lux-card__media">
          ${badgeHtml}
          <img
            src="${esc(p.image)}"
            srcset="${esc(p.imageSm)} 600w, ${esc(p.image)} 900w"
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
            width="900"
            height="900"
            loading="lazy"
            alt="${esc(p.name)} — ${esc(p.category)} in ${esc(p.finish)}"
          />
        </div>
        <div class="lux-card__body">
          <span class="lux-card__code">${esc(p.code)} · ${esc(p.category)}</span>
          <h3 class="lux-card__title">${esc(p.name)}</h3>
          <div class="lux-card__specs">
            <span>${esc(p.material)}</span>
            <span aria-hidden="true">·</span>
            <span>${esc(p.primarySize)}</span>
            <span aria-hidden="true">·</span>
            <span>${esc(p.finish)}</span>
          </div>
          <p class="lux-card__meta">Indicative: <strong>${esc(p.priceLabel)}</strong></p>
          <div class="lux-card__actions">
            <button type="button" class="btn btn--primary btn--sm js-open-product" data-code="${esc(p.code)}">
              View Details
            </button>
            <button
              type="button"
              class="btn btn--outline btn--sm js-toggle-compare"
              data-code="${esc(p.code)}"
              aria-pressed="${isCompared ? 'true' : 'false'}"
            >
              ${isCompared ? 'Compared ✓' : '+ Compare'}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Initialize the Products Catalogue Page (products.html)
   */
  function initProductsPage() {
    const gridEl = document.getElementById('product-catalogue-grid');
    if (!gridEl) return;

    const categoryRail = document.getElementById('category-pill-rail');
    const roomRail = document.getElementById('room-pill-rail');
    const selCategory = document.getElementById('filter-category');
    const selRoom = document.getElementById('filter-room');
    const selSize = document.getElementById('filter-size');
    const selColour = document.getElementById('filter-colour');
    const selMaterial = document.getElementById('filter-material');
    const selFinish = document.getElementById('filter-finish');
    const selPrice = document.getElementById('filter-price');
    const selSort = document.getElementById('filter-sort');
    const clearBtn = document.getElementById('clear-filters-btn');
    const countEl = document.getElementById('product-result-count');
    const inlineDetailEl = document.getElementById('inline-product-detail');
    const relatedGridEl = document.getElementById('related-products-grid');

    const state = {
      category: 'All',
      room: 'All',
      size: 'All',
      colour: 'All',
      material: 'All',
      finish: 'All',
      price: 'All',
      sort: 'popular',
      activeSpecimen: PRODUCTS[0],
      compare: new Set()
    };

    // Render Category Pills in Section 3
    if (categoryRail) {
      categoryRail.innerHTML = CATEGORIES.map((cat) => {
        const count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;
        return `<button type="button" class="filter-pill ${cat === 'All' ? 'is-active' : ''}" data-cat-pill="${esc(cat)}">${esc(cat)} (${count})</button>`;
      }).join('');
    }

    // Parse URL parameters (?category=..., ?room=..., ?product=...)
    const params = new URLSearchParams(window.location.search);
    const paramCat = params.get('category');
    const paramRoom = params.get('room');
    const paramProd = params.get('product');

    if (paramCat) {
      const matchedCat = CATEGORIES.find((c) => c.toLowerCase() === paramCat.toLowerCase() || c.toLowerCase().includes(paramCat.toLowerCase()));
      if (matchedCat) state.category = matchedCat;
    }
    if (paramRoom) {
      state.room = paramRoom;
    }
    if (paramProd) {
      const found = PRODUCTS.find((p) => p.code.toLowerCase() === paramProd.toLowerCase());
      if (found) {
        state.activeSpecimen = found;
        setTimeout(() => openProductDrawer(found.code), 260);
      }
    }

    function syncControlsFromState() {
      if (selCategory) selCategory.value = state.category;
      if (selRoom) selRoom.value = state.room;
      if (selSize) selSize.value = state.size;
      if (selColour) selColour.value = state.colour;
      if (selMaterial) selMaterial.value = state.material;
      if (selFinish) selFinish.value = state.finish;
      if (selPrice) selPrice.value = state.price;
      if (selSort) selSort.value = state.sort;

      if (categoryRail) {
        categoryRail.querySelectorAll('[data-cat-pill]').forEach((btn) => {
          btn.classList.toggle('is-active', btn.getAttribute('data-cat-pill') === state.category);
        });
      }
      if (roomRail) {
        roomRail.querySelectorAll('[data-room-pill]').forEach((btn) => {
          btn.classList.toggle('is-active', btn.getAttribute('data-room-pill') === state.room);
        });
      }
    }

    function getFilteredProducts() {
      const filtered = PRODUCTS.filter((p) => {
        if (state.category !== 'All' && p.category !== state.category) return false;
        if (state.room !== 'All' && !p.rooms.includes(state.room)) return false;
        if (state.size !== 'All' && !p.sizes.includes(state.size)) return false;
        if (state.colour !== 'All' && p.colour !== state.colour) return false;
        if (state.material !== 'All' && p.material !== state.material) return false;
        if (state.finish !== 'All' && p.finish !== state.finish) return false;
        if (state.price !== 'All' && p.priceTier !== state.price) return false;
        return true;
      });

      filtered.sort((a, b) => {
        if (state.sort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.popularity - a.popularity;
        if (state.sort === 'name') return a.name.localeCompare(b.name);
        if (state.sort === 'price-asc') return a.priceRank - b.priceRank;
        return b.popularity - a.popularity;
      });

      return filtered;
    }

    let skeletonTimer = null;

    function renderCatalogue(withSkeleton = false) {
      syncControlsFromState();
      const list = getFilteredProducts();

      if (countEl) {
        countEl.textContent = `Showing ${list.length} of ${PRODUCTS.length} architectural specifications`;
      }

      const commitRender = () => {
        if (list.length === 0) {
          gridEl.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; border: 1px solid var(--border-subtle); background: var(--bg-elevated);">
              <h3 class="serif-heading">No Matching Surfaces Found</h3>
              <p style="margin-block: 0.75rem 1.5rem;">Try broadening your finish, size, or room criteria to view available slabs and bathware.</p>
              <button type="button" class="btn btn--primary" id="empty-reset-btn">Reset All Filters</button>
            </div>
          `;
          const resetBtn = document.getElementById('empty-reset-btn');
          if (resetBtn) resetBtn.addEventListener('click', resetFilters);
          return;
        }

        gridEl.innerHTML = list.map((p) => renderProductCard(p, state.compare)).join('');
        if (typeof window.initAureliaTilt === 'function') {
          window.initAureliaTilt(gridEl);
        }
      };

      if (withSkeleton) {
        clearTimeout(skeletonTimer);
        gridEl.innerHTML = Array.from({ length: Math.min(6, Math.max(3, list.length || 3)) })
          .map(() => '<div class="skeleton-card" aria-hidden="true"></div>')
          .join('');
        skeletonTimer = setTimeout(commitRender, 180);
      } else {
        commitRender();
      }
    }

    function resetFilters() {
      state.category = 'All';
      state.room = 'All';
      state.size = 'All';
      state.colour = 'All';
      state.material = 'All';
      state.finish = 'All';
      state.price = 'All';
      state.sort = 'popular';
      renderCatalogue(true);
    }

    /**
     * Render Section 8 (Inline Product Detail Information) & Section 9 (Related Products)
     */
    function renderActiveSpecimen(prod) {
      state.activeSpecimen = prod;
      if (inlineDetailEl) {
        inlineDetailEl.innerHTML = buildDetailMarkup(prod, false);
        bindZoomStages(inlineDetailEl);
      }
      if (relatedGridEl) {
        const related = PRODUCTS.filter(
          (item) => item.code !== prod.code && (item.category === prod.category || item.rooms.some((r) => prod.rooms.includes(r)))
        ).slice(0, 3);
        relatedGridEl.innerHTML = related.map((r) => renderProductCard(r, state.compare)).join('');
        if (typeof window.initAureliaTilt === 'function') {
          window.initAureliaTilt(relatedGridEl);
        }
      }
    }

    function buildDetailMarkup(prod, isDrawer) {
      return `
        <div class="editorial-split" style="gap: 2rem;">
          <div class="zoom-stage" title="Move cursor to inspect surface grain">
            <img
              src="${esc(prod.image)}"
              srcset="${esc(prod.imageSm)} 600w, ${esc(prod.image)} 900w"
              sizes="(max-width: 768px) 92vw, 540px"
              width="900"
              height="900"
              alt="${esc(prod.name)} close-up surface detail"
            />
          </div>
          <div class="editorial-split__content">
            <span class="eyebrow">${esc(prod.code)} · ${esc(prod.category)}</span>
            <h3>${esc(prod.name)}</h3>
            <p>${esc(prod.description)}</p>
            <table class="spec-table" aria-label="Technical Specifications for ${esc(prod.name)}">
              <tbody>
                <tr><th scope="row">Product Code</th><td>${esc(prod.code)}</td></tr>
                <tr><th scope="row">Material Body</th><td>${esc(prod.material)}</td></tr>
                <tr><th scope="row">Available Dimensions</th><td>${esc(prod.sizes.join(' · '))}</td></tr>
                <tr><th scope="row">Thickness / Profile</th><td>${esc(prod.thickness)}</td></tr>
                <tr><th scope="row">Surface Finish</th><td>${esc(prod.finish)}</td></tr>
                <tr><th scope="row">Slip / Spec Rating</th><td>${esc(prod.slipRating)}</td></tr>
                <tr><th scope="row">Recommended Rooms</th><td>${esc(prod.rooms.join(', '))}</td></tr>
                <tr><th scope="row">Indicative Guide</th><td><strong>${esc(prod.priceLabel)}</strong></td></tr>
              </tbody>
            </table>
            <div style="font-size: 0.875rem; margin-bottom: 1rem;">
              <p><strong>Usage Areas:</strong> ${esc(prod.usage)}</p>
              <p style="margin-top: 6px;"><strong>Care &amp; Maintenance:</strong> ${esc(prod.maintenance)}</p>
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 12px;">
              <button type="button" class="btn btn--primary js-enquire-sku" data-code="${esc(prod.code)}" data-name="${esc(prod.name)}">
                Request Quotation for ${esc(prod.code)}
              </button>
              ${isDrawer ? '<button type="button" class="btn btn--outline js-close-spec-modal">Close Drawer</button>' : ''}
            </div>
          </div>
        </div>
      `;
    }

    function bindZoomStages(root) {
      root.querySelectorAll('.zoom-stage').forEach((stage) => {
        stage.addEventListener('mousemove', (e) => {
          const rect = stage.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          stage.style.setProperty('--zoom-x', `${x.toFixed(1)}%`);
          stage.style.setProperty('--zoom-y', `${y.toFixed(1)}%`);
        });
      });
    }

    // Slide-over Specification Modal
    const specModal = document.getElementById('product-spec-modal');
    const specModalBody = document.getElementById('product-spec-modal-body');

    function openProductDrawer(code) {
      const prod = PRODUCTS.find((p) => p.code === code);
      if (!prod) return;
      renderActiveSpecimen(prod);
      if (specModal && specModalBody) {
        specModalBody.innerHTML = buildDetailMarkup(prod, true);
        bindZoomStages(specModalBody);
        specModal.classList.add('is-open');
        specModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeProductDrawer() {
      if (!specModal) return;
      specModal.classList.remove('is-open');
      specModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Compare Tray Logic (Up to 3 Products)
    const compareBar = document.getElementById('compare-bar');
    const compareSlots = document.getElementById('compare-slots');
    const compareModal = document.getElementById('compare-modal');
    const compareModalBody = document.getElementById('compare-modal-body');

    function updateCompareUI() {
      if (!compareBar || !compareSlots) return;
      const items = Array.from(state.compare).map((c) => PRODUCTS.find((p) => p.code === c)).filter(Boolean);
      compareBar.classList.toggle('is-visible', items.length > 0);
      compareSlots.innerHTML = items.map((item) => `
        <span class="compare-chip">
          <strong>${esc(item.code)}</strong> ${esc(item.name)}
          <button type="button" class="js-remove-compare" data-code="${esc(item.code)}" aria-label="Remove ${esc(item.name)} from comparison">×</button>
        </span>
      `).join('');
    }

    function openCompareModal() {
      if (!compareModal || !compareModalBody) return;
      const items = Array.from(state.compare).map((c) => PRODUCTS.find((p) => p.code === c)).filter(Boolean);
      if (!items.length) return;

      const cols = items.map((i) => `
        <th>
          <img src="${esc(i.imageSm)}" alt="${esc(i.name)}" width="120" height="120" style="width:96px;height:96px;object-fit:cover;margin-bottom:8px;" />
          <div style="font-size:0.72rem;color:var(--accent-text);">${esc(i.code)}</div>
          <div class="serif-heading" style="font-size:1.2rem;">${esc(i.name)}</div>
        </th>
      `).join('');

      const row = (label, fn) => `<tr><th scope="row">${esc(label)}</th>${items.map((i) => `<td>${esc(fn(i))}</td>`).join('')}</tr>`;

      compareModalBody.innerHTML = `
        <table class="compare-table">
          <thead><tr><th>Specification</th>${cols}</tr></thead>
          <tbody>
            ${row('Category', (i) => i.category)}
            ${row('Material', (i) => i.material)}
            ${row('Dimensions', (i) => i.sizes.join(', '))}
            ${row('Finish', (i) => i.finish)}
            ${row('Thickness', (i) => i.thickness)}
            ${row('Rating', (i) => i.slipRating)}
            ${row('Indicative Price', (i) => i.priceLabel)}
            ${row('Rooms', (i) => i.rooms.join(', '))}
          </tbody>
        </table>
      `;
      compareModal.classList.add('is-open');
      compareModal.setAttribute('aria-hidden', 'false');
    }

    // Event Delegation for Filter Controls & Card Actions
    if (categoryRail) {
      categoryRail.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-cat-pill]');
        if (!btn) return;
        state.category = btn.getAttribute('data-cat-pill');
        renderCatalogue(true);
      });
    }

    if (roomRail) {
      roomRail.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-room-pill]');
        if (!btn) return;
        state.room = btn.getAttribute('data-room-pill');
        renderCatalogue(true);
      });
    }

    [
      [selCategory, 'category'],
      [selRoom, 'room'],
      [selSize, 'size'],
      [selColour, 'colour'],
      [selMaterial, 'material'],
      [selFinish, 'finish'],
      [selPrice, 'price'],
      [selSort, 'sort']
    ].forEach(([el, key]) => {
      if (el) {
        el.addEventListener('change', () => {
          state[key] = el.value;
          renderCatalogue(true);
        });
      }
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', resetFilters);
    }

    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('.js-open-product');
      if (openBtn) {
        openProductDrawer(openBtn.getAttribute('data-code'));
        return;
      }

      const closeBtn = e.target.closest('.js-close-spec-modal');
      if (closeBtn || e.target === specModal) {
        closeProductDrawer();
        return;
      }

      const cmpBtn = e.target.closest('.js-toggle-compare');
      if (cmpBtn) {
        const code = cmpBtn.getAttribute('data-code');
        if (state.compare.has(code)) {
          state.compare.delete(code);
        } else if (state.compare.size < 3) {
          state.compare.add(code);
        } else {
          // Replace oldest entry cleanly if user selects a 4th item
          const first = state.compare.values().next().value;
          state.compare.delete(first);
          state.compare.add(code);
        }
        renderCatalogue(false);
        renderActiveSpecimen(state.activeSpecimen);
        updateCompareUI();
        return;
      }

      const rmCmp = e.target.closest('.js-remove-compare');
      if (rmCmp) {
        state.compare.delete(rmCmp.getAttribute('data-code'));
        renderCatalogue(false);
        updateCompareUI();
        return;
      }

      if (e.target.closest('#open-compare-modal-btn')) {
        openCompareModal();
        return;
      }

      if (e.target.closest('#clear-compare-btn')) {
        state.compare.clear();
        renderCatalogue(false);
        updateCompareUI();
        return;
      }

      if (e.target.closest('.js-close-compare-modal') || e.target === compareModal) {
        if (compareModal) {
          compareModal.classList.remove('is-open');
          compareModal.setAttribute('aria-hidden', 'true');
        }
        return;
      }

      const enqBtn = e.target.closest('.js-enquire-sku');
      if (enqBtn) {
        closeProductDrawer();
        const prodInput = document.getElementById('enq-product-name');
        if (prodInput) {
          prodInput.value = `${enqBtn.getAttribute('data-name')} (${enqBtn.getAttribute('data-code')})`;
        }
        const formSec = document.getElementById('request-product-enquiry');
        if (formSec) {
          formSec.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            const qtyField = document.getElementById('enq-quantity');
            if (qtyField) qtyField.focus();
          }, 500);
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProductDrawer();
        if (compareModal) compareModal.classList.remove('is-open');
      }
    });

    // Initial render
    renderCatalogue(false);
    renderActiveSpecimen(state.activeSpecimen);
  }

  document.addEventListener('DOMContentLoaded', initProductsPage);
})();

