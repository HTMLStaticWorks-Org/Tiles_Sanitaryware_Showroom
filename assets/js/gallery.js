/**
 * ==========================================================================
 * AURELIA SURFACES — Gallery, Lightbox & Before/After Engine
 * File: assets/js/gallery.js
 * Features:
 *  - Dual Room + Style Masonry Filtering on Visualizer Gallery
 *  - Keyboard-accessible Lightbox with Next / Prev / Esc & Related SKU Links
 *  - Touch, Mouse & Keyboard Draggable Before/After Renovation Sliders
 *  - "Product Used in This Space" interactive room breakdown switcher
 *  - Editorial Design Story Reader Drawer
 * ==========================================================================
 */

(() => {
  'use strict';

  /**
   * Initialize all Draggable Before/After Sliders (.ba-slider)
   */
  function initBeforeAfterSliders() {
    document.querySelectorAll('.ba-slider').forEach((slider) => {
      const range = slider.querySelector('.ba-slider__range');
      if (!range) return;

      const updatePos = () => {
        slider.style.setProperty('--ba-pos', `${range.value}%`);
      };

      const handleMove = () => {
        slider.classList.add('is-moved');
        updatePos();
      };

      range.addEventListener('input', handleMove);
      range.addEventListener('change', handleMove);
      range.addEventListener('pointerdown', () => {
        slider.classList.add('is-sliding', 'is-moved');
      });
      window.addEventListener('pointerup', () => {
        slider.classList.remove('is-sliding');
      });

      updatePos();
    });
  }

  /**
   * Initialize Dual Room & Style Filtering on visualizer-gallery.html
   */
  function initVisualizerFilters() {
    const grid = document.getElementById('viz-gallery-grid');
    if (!grid) return;

    const roomButtons = document.querySelectorAll('[data-viz-room]');
    const styleButtons = document.querySelectorAll('[data-viz-style]');
    const countLabel = document.getElementById('viz-result-count');
    const resetBtn = document.getElementById('viz-reset-btn');
    const items = Array.from(grid.querySelectorAll('.masonry-item'));

    let activeRoom = 'all';
    let activeStyle = 'all';

    function applyFilter() {
      let visibleCount = 0;
      items.forEach((item) => {
        const itemRoom = item.getAttribute('data-room') || '';
        const itemStyle = item.getAttribute('data-style') || '';
        const matchRoom = activeRoom === 'all' || itemRoom === activeRoom;
        const matchStyle = activeStyle === 'all' || itemStyle === activeStyle;
        const show = matchRoom && matchStyle;
        item.style.display = show ? '' : 'none';
        if (show) visibleCount += 1;
      });

      if (countLabel) {
        countLabel.textContent = `Showing ${visibleCount} of ${items.length} real interior installations`;
      }

      const emptyMsg = document.getElementById('viz-empty-msg');
      if (emptyMsg) {
        emptyMsg.hidden = visibleCount > 0;
      }
    }

    roomButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeRoom = btn.getAttribute('data-viz-room');
        roomButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
        applyFilter();
      });
    });

    styleButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeStyle = btn.getAttribute('data-viz-style');
        styleButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
        applyFilter();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        activeRoom = 'all';
        activeStyle = 'all';
        roomButtons.forEach((b) => b.classList.toggle('is-active', b.getAttribute('data-viz-room') === 'all'));
        styleButtons.forEach((b) => b.classList.toggle('is-active', b.getAttribute('data-viz-style') === 'all'));
        applyFilter();
      });
    }
  }

  /**
   * Initialize Keyboard-Accessible Fullscreen Image Lightbox
   */
  function initLightbox() {
    const lightbox = document.getElementById('global-lightbox');
    if (!lightbox) return;

    const imgEl = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const metaEl = document.getElementById('lightbox-meta');
    const linkEl = document.getElementById('lightbox-product-link');
    const btnClose = lightbox.querySelector('.lightbox__close');
    const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
    const btnNext = lightbox.querySelector('.lightbox__nav--next');

    let currentTriggers = [];
    let currentIndex = 0;
    let lastFocused = null;

    function getVisibleTriggers() {
      return Array.from(document.querySelectorAll('.js-lightbox-trigger')).filter((btn) => {
        const parentItem = btn.closest('.masonry-item');
        return !parentItem || parentItem.style.display !== 'none';
      });
    }

    function showSlide(index) {
      if (!currentTriggers.length) return;
      currentIndex = (index + currentTriggers.length) % currentTriggers.length;
      const trigger = currentTriggers[currentIndex];
      const src = trigger.getAttribute('data-src') || '';
      const title = trigger.getAttribute('data-title') || 'Interior Showcase';
      const meta = trigger.getAttribute('data-meta') || '';
      const sku = trigger.getAttribute('data-sku') || 'AUR-FL-101';

      if (imgEl) {
        imgEl.src = src;
        imgEl.alt = title;
      }
      if (titleEl) titleEl.textContent = title;
      if (metaEl) metaEl.textContent = meta;
      if (linkEl) {
        linkEl.href = `products.html?product=${encodeURIComponent(sku)}`;
      }
    }

    function openLightbox(triggerBtn) {
      lastFocused = document.activeElement;
      currentTriggers = getVisibleTriggers();
      const idx = currentTriggers.indexOf(triggerBtn);
      showSlide(idx >= 0 ? idx : 0);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (btnClose) btnClose.focus();
    }

    function closeLightbox() {
      if (!lightbox.classList.contains('is-open')) return;
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    document.addEventListener('click', (e) => {
      const trig = e.target.closest('.js-lightbox-trigger');
      if (trig) {
        e.preventDefault();
        openLightbox(trig);
        return;
      }
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    if (btnClose) btnClose.addEventListener('click', closeLightbox);
    if (btnPrev) btnPrev.addEventListener('click', () => showSlide(currentIndex - 1));
    if (btnNext) btnNext.addEventListener('click', () => showSlide(currentIndex + 1));

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
      if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
    });
  }

  /**
   * Initialize "Product Used in This Space" Tabs on visualizer-gallery.html
   */
  function initSpaceBreakdownTabs() {
    const tabBtns = document.querySelectorAll('[data-space-tab]');
    const panels = document.querySelectorAll('[data-space-panel]');
    if (!tabBtns.length || !panels.length) return;

    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-space-tab');
        tabBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panels.forEach((p) => {
          const match = p.getAttribute('data-space-panel') === target;
          p.hidden = !match;
        });
      });
    });
  }

  /**
   * Initialize Editorial Story Modal on visualizer-gallery.html
   */
  function initStoryModal() {
    const modal = document.getElementById('story-reader-modal');
    if (!modal) return;

    const titleEl = document.getElementById('story-modal-title');
    const metaEl = document.getElementById('story-modal-meta');
    const bodyEl = document.getElementById('story-modal-body');

    const STORIES = {
      proportions: {
        title: 'Selecting Large-Format Slab Proportions for Seamless Interiors',
        meta: 'Architectural Surface Guide · 4 Min Read',
        body: `
          <p>Choosing between 600×1200 mm, 800×1600 mm, and monolithic 1600×3200 mm sintered slabs transforms how room boundaries are perceived. Fewer grout joints visually expand compact city apartments while allowing continuous marble veining to flow uninterrupted across floors and walls.</p>
          <p style="margin-top:1rem;"><strong>Key Showroom Rule:</strong> Align tile joints with architectural sightlines—door frames, kitchen islands, and linear shower drains—and specify rectified edges with colour-matched 1.5 mm epoxy grout so surfaces read as carved stone rather than individual units.</p>
        `
      },
      undertones: {
        title: 'The Art of Warm Undertone Matching: Travertine, Bronze & Oak',
        meta: 'Colour & Materiality Note · 3 Min Read',
        body: `
          <p>Luxury interiors succeed or fail in their undertones. Pairing cool blue-veined marble with warm honey-oak planks creates subtle visual tension, whereas matching warm cream travertine (such as our <em>Travertino Romano AUR-FL-101</em>) with brushed PVD bronze brassware and smoked walnut achieves effortless harmony.</p>
          <p style="margin-top:1rem;"><strong>Lighting Tip:</strong> Always inspect tile samples under your room's exact Kelvin temperature (2700K–3000K warm architectural LEDs) inside our showroom lighting lab before finalizing quantities.</p>
        `
      },
      wetzones: {
        title: 'Matte vs. Honed Silk Finishes in Barefoot Wet Zones',
        meta: 'Technical Bathware Specification · 4 Min Read',
        body: `
          <p>High-gloss marble tiles deliver dramatic reflection on vertical bathroom walls, yet wet shower floors require engineered barefoot grip. Specify an R10 Honed Silk or R11 Textured Porcelain underfoot while continuing the matching polished or lappato finish up the walls for visual continuity without slip risk.</p>
          <p style="margin-top:1rem;"><strong>Drainage Pairing:</strong> Large-format 600×1200 mm bathroom floor tiles can be envelope-cut neatly toward a concealed tile-insert linear channel drain.</p>
        `
      }
    };

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-open-story');
      if (btn) {
        const key = btn.getAttribute('data-story');
        const story = STORIES[key];
        if (!story) return;
        if (titleEl) titleEl.textContent = story.title;
        if (metaEl) metaEl.textContent = story.meta;
        if (bodyEl) bodyEl.innerHTML = story.body;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        return;
      }
      if (e.target.closest('.js-close-story') || e.target === modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initBeforeAfterSliders();
    initVisualizerFilters();
    initLightbox();
    initSpaceBreakdownTabs();
    initStoryModal();
  });
})();

