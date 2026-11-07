/**
 * ==========================================================================
 * AURELIA SURFACES — Main Global & Interactive UI Controller
 * File: assets/js/main.js
 * Architecture: Vanilla ES6+, Zero Dependencies, WCAG 2.1 AA, Reduced-Motion Safe
 * ==========================================================================
 */

(() => {
  'use strict';

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const isTouchOrCoarse = () =>
    window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /**
   * 1. Brand Tile-Grid Preloader (Disabled for instant clean page transitions)
   */
  function initPreloader() {
    const loader = document.querySelector('.tile-loader');
    if (loader) loader.remove();
  }

  /**
   * 2. Dark / Light Theme & RTL Layout Persistence
   */
  function initThemeAndRtl() {
    const root = document.documentElement;
    const savedTheme = localStorage.getItem('aurelia_theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
    root.setAttribute('data-theme', initialTheme);

    const savedDir = localStorage.getItem('aurelia_dir') || 'ltr';
    root.setAttribute('dir', savedDir);

    function syncToggleLabels() {
      const currentTheme = root.getAttribute('data-theme');
      const currentDir = root.getAttribute('dir');

      document.querySelectorAll('.js-theme-toggle').forEach((btn) => {
        btn.setAttribute(
          'aria-label',
          currentTheme === 'dark' ? 'Switch to Warm Ivory Light Mode' : 'Switch to Deep Espresso Dark Mode'
        );
        btn.setAttribute('title', currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode');
        const iconName = currentTheme === 'dark' ? 'sun' : 'moon';
        btn.innerHTML = `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
      });

      document.querySelectorAll('.js-rtl-toggle').forEach((btn) => {
        btn.textContent = currentDir === 'rtl' ? 'LTR' : 'RTL';
        btn.setAttribute(
          'aria-label',
          currentDir === 'rtl' ? 'Switch layout direction to Left-to-Right' : 'Switch layout direction to Right-to-Left'
        );
      });

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }

    syncToggleLabels();

    document.addEventListener('click', (e) => {
      const themeBtn = e.target.closest('.js-theme-toggle');
      if (themeBtn) {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('aurelia_theme', next);
        syncToggleLabels();
        return;
      }

      const rtlBtn = e.target.closest('.js-rtl-toggle');
      if (rtlBtn) {
        const nextDir = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        root.setAttribute('dir', nextDir);
        localStorage.setItem('aurelia_dir', nextDir);
        syncToggleLabels();
      }
    });
  }

  /**
   * 3. Dismissible Announcement Bar
   */
  function initAnnouncementBar() {
    const bar = document.querySelector('.announcement-bar');
    if (!bar) return;
    if (sessionStorage.getItem('aurelia_ann_dismissed') === '1') {
      bar.classList.add('is-dismissed');
    }
    const closeBtn = bar.querySelector('.announcement-bar__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        bar.classList.add('is-dismissed');
        sessionStorage.setItem('aurelia_ann_dismissed', '1');
      });
    }
  }

  /**
   * 4. Sticky Header Blur & Mobile Fullscreen Navigation
   */
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const hamburger = document.querySelector('.hamburger-btn');
    const overlay = document.getElementById('mobile-nav-overlay');

    const onScroll = () => {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!hamburger || !overlay) return;

    function toggleMenu(forceState) {
      const open = typeof forceState === 'boolean' ? forceState : hamburger.getAttribute('aria-expanded') !== 'true';
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      overlay.classList.toggle('is-open', open);
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu());

    overlay.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
        hamburger.focus();
      }
    });
  }

  /**
   * 5. Instant Live Product Search Modal (searches by Name, Category & Code)
   */
  function initLiveSearch() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('global-search-input');
    const resultsBox = document.getElementById('global-search-results');
    if (!modal || !input || !resultsBox) return;

    function esc(s) {
      return String(s || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function renderSuggestions(query) {
      const skus = window.AURELIA_PRODUCTS || [];
      const q = query.trim().toLowerCase();
      const matches = q
        ? skus.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              p.code.toLowerCase().includes(q) ||
              p.finish.toLowerCase().includes(q)
          )
        : skus.slice(0, 6);

      if (!matches.length) {
        resultsBox.innerHTML = `<p style="padding: 1rem 0.5rem;">No products matched "<strong>${esc(query)}</strong>". Try searching "Travertine", "Washbasin", "Slab", or "AUR-".</p>`;
        return;
      }

      resultsBox.innerHTML = matches.slice(0, 8).map((p) => `
        <a href="products.html?product=${encodeURIComponent(p.code)}" class="search-result-item">
          <img src="${esc(p.imageSm)}" width="64" height="64" loading="lazy" alt="${esc(p.name)}" />
          <div class="search-result-item__meta">
            <span class="search-result-item__code">${esc(p.code)} · ${esc(p.category)}</span>
            <div class="search-result-item__title">${esc(p.name)}</div>
            <div class="search-result-item__sub">${esc(p.primarySize)} · ${esc(p.finish)} · ${esc(p.priceLabel)}</div>
          </div>
        </a>
      `).join('');
    }

    function openSearch() {
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      renderSuggestions(input.value);
      window.setTimeout(() => input.focus(), 60);
    }

    function closeSearch() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }

    document.addEventListener('click', (e) => {
      if (e.target.closest('.js-open-search')) {
        const overlay = document.getElementById('mobile-nav-overlay');
        const hamburger = document.querySelector('.hamburger-btn');
        if (overlay && overlay.classList.contains('is-open')) {
          overlay.classList.remove('is-open');
          overlay.setAttribute('aria-hidden', 'true');
          if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
        openSearch();
        return;
      }
      if (e.target.closest('.js-close-search') || e.target === modal) {
        closeSearch();
      }
    });

    input.addEventListener('input', () => renderSuggestions(input.value));

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearch();
      } else if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeSearch();
      }
    });
  }

  /**
   * 6. Scroll Progress Hairline & Animated Progress-Ring Back-to-Top
   */
  function initScrollProgressAndTop() {
    const bar = document.querySelector('.scroll-progress');
    const topBtn = document.querySelector('.scroll-top-btn');
    const circle = document.querySelector('.scroll-top-btn__progress');
    const circumference = 2 * Math.PI * 23; // r=23 -> ~144.5

    if (circle) {
      circle.style.strokeDasharray = `${circumference}`;
      circle.style.strokeDashoffset = `${circumference}`;
    }

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));

      if (bar) bar.style.width = `${(ratio * 100).toFixed(2)}%`;
      if (topBtn) topBtn.classList.toggle('is-visible', scrollTop > 380);
      if (circle) circle.style.strokeDashoffset = `${(circumference * (1 - ratio)).toFixed(2)}`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();

    if (topBtn) {
      topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      });
    }
  }

  /**
   * 7. 3D Tilt & Glare Effect on .lux-card (Rule 4 — Disabled on Touch & Reduced Motion)
   */
  function initAureliaTilt(scope = document) {
    if (prefersReducedMotion() || isTouchOrCoarse()) return;

    scope.querySelectorAll('[data-tilt]').forEach((card) => {
      if (card.dataset.tiltBound === '1') return;
      card.dataset.tiltBound = '1';

      let rafId = null;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;
        const rotY = (px - 0.5) * 9;  // subtle luxury tilt max ±4.5deg
        const rotX = (0.5 - py) * 9;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-3px)`;
          card.style.setProperty('--glare-x', `${(px * 100).toFixed(1)}%`);
          card.style.setProperty('--glare-y', `${(py * 100).toFixed(1)}%`);
        });
      });

      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  window.initAureliaTilt = initAureliaTilt;

  /**
   * 8. Desktop Custom Cursor & Subtle Magnetic Primary Buttons
   */
  function initCursorAndMagnetic() {
    if (prefersReducedMotion() || isTouchOrCoarse()) return;

    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      window.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }, { passive: true });

      document.addEventListener('mouseover', (e) => {
        const hoverTarget = e.target.closest('a, button, .lux-card, .masonry-item, .lifestyle-panel');
        cursor.classList.toggle('is-expanded', Boolean(hoverTarget));
      });
    }

    document.querySelectorAll('.btn--primary').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.14;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.14;
        btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /**
   * 9. IntersectionObserver Scroll Reveals & Animated Stat Counters
   */
  function initRevealsAndCounters() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-clip');
    const counterEls = document.querySelectorAll('[data-counter]');

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-revealed'));
      counterEls.forEach((el) => {
        el.textContent = `${el.getAttribute('data-counter')}${el.getAttribute('data-suffix') || ''}`;
      });
      return;
    }

    const revObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    revealEls.forEach((el) => revObserver.observe(el));

    const cntObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1200;
        const start = performance.now();

        const step = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(target * eased).toLocaleString()}${suffix}`;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.3 });

    counterEls.forEach((el) => cntObserver.observe(el));
  }

  /**
   * 10. Home 1 Specific Interactive Widgets (Carousel, Drag Rail, Swatch, Testimonials)
   */
  function initHome1Widgets() {
    // A. Split Mosaic Hero Auto-Fading Carousel
    const slides = document.querySelectorAll('.hero-mosaic__slide');
    const thumbs = document.querySelectorAll('.hero-mosaic__thumb');
    if (slides.length > 1) {
      let current = 0;
      let timer = null;

      const activate = (idx) => {
        current = (idx + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
        thumbs.forEach((t, i) => t.classList.toggle('is-active', i === current));
      };

      const startAuto = () => {
        if (prefersReducedMotion()) return;
        clearInterval(timer);
        timer = setInterval(() => activate(current + 1), 4800);
      };

      thumbs.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
          activate(idx);
          startAuto();
        });
      });

      startAuto();
    }

    // B. Horizontal Scroll Rail (New Arrivals)
    const rail = document.getElementById('new-arrivals-rail');
    if (rail) {
      const prevBtn = document.getElementById('rail-prev-btn');
      const nextBtn = document.getElementById('rail-next-btn');
      const step = () => Math.min(480, rail.clientWidth * 0.8);

      if (prevBtn) prevBtn.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
      if (nextBtn) nextBtn.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));

      let isDown = false;
      let startX = 0;
      let scrollStart = 0;
      rail.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - rail.offsetLeft;
        scrollStart = rail.scrollLeft;
      });
      window.addEventListener('mouseup', () => { isDown = false; });
      rail.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - rail.offsetLeft;
        rail.scrollLeft = scrollStart - (x - startX) * 1.4;
      });
    }

    // C. Trending Tile Designs Material Swatch Switcher
    const swatchBtns = document.querySelectorAll('[data-swatch-target]');
    const collageItems = document.querySelectorAll('[data-swatch-panel]');
    if (swatchBtns.length && collageItems.length) {
      swatchBtns.forEach((btn) => {
        const trigger = () => {
          const target = btn.getAttribute('data-swatch-target');
          swatchBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
          collageItems.forEach((c) => c.classList.toggle('is-highlighted', c.getAttribute('data-swatch-panel') === target));
        };
        btn.addEventListener('click', trigger);
        btn.addEventListener('mouseenter', trigger);
      });
    }

    // D. Customer Testimonials Slider
    const quoteSlides = document.querySelectorAll('.quote-slide');
    const quoteDots = document.querySelectorAll('.quote-dot');
    const qPrev = document.getElementById('quote-prev-btn');
    const qNext = document.getElementById('quote-next-btn');
    if (quoteSlides.length > 1) {
      let qIdx = 0;
      const showQuote = (n) => {
        qIdx = (n + quoteSlides.length) % quoteSlides.length;
        quoteSlides.forEach((s, i) => s.classList.toggle('is-active', i === qIdx));
        quoteDots.forEach((d, i) => d.classList.toggle('is-active', i === qIdx));
      };
      if (qPrev) qPrev.addEventListener('click', () => showQuote(qIdx - 1));
      if (qNext) qNext.addEventListener('click', () => showQuote(qIdx + 1));
      quoteDots.forEach((d, i) => d.addEventListener('click', () => showQuote(i)));
    }

    // E. Masonry Gallery Touch/Tap Support (Mobile & Tablet)
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.masonry-item');
      if (!item) {
        document.querySelectorAll('.masonry-item.is-active').forEach((el) => el.classList.remove('is-active'));
        return;
      }
      if (e.target.closest('button, a')) return;

      const wasActive = item.classList.contains('is-active');
      document.querySelectorAll('.masonry-item.is-active').forEach((el) => el.classList.remove('is-active'));
      if (!wasActive) {
        item.classList.add('is-active');
      }
    });
  }

  /**
   * 11. Home 2 Specific Interactive Widgets (Parallax, Sticky Story, Lifestyle, Finish Tabs, Sectors)
   */
  function initHome2Widgets() {
    // A. Subtle Editorial Hero Parallax
    const heroBg = document.querySelector('.hero-home2__bg img');
    if (heroBg && !prefersReducedMotion()) {
      window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
          heroBg.style.transform = `translateY(${(window.scrollY * 0.18).toFixed(1)}px)`;
        }
      }, { passive: true });
    }

    // B. Sticky-Image Storytelling Chapters
    const chapters = document.querySelectorAll('[data-story-chapter]');
    const frames = document.querySelectorAll('[data-story-frame]');
    if (chapters.length && frames.length && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-story-chapter');
            frames.forEach((f) => f.classList.toggle('is-active', f.getAttribute('data-story-frame') === id));
          }
        });
      }, { threshold: 0.25 });
      chapters.forEach((c) => obs.observe(c));
    }

    // C. Expanding Vertical Lifestyle Panels
    const panels = document.querySelectorAll('.lifestyle-panel');
    panels.forEach((panel) => {
      panel.addEventListener('click', () => {
        panels.forEach((p) => p.classList.toggle('is-active', p === panel));
      });
    });

    // D. Material & Finish Guide 6-Tab Switcher
    const finishBtns = document.querySelectorAll('.finish-tab-btn');
    const finishPanels = document.querySelectorAll('.finish-panel');
    finishBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-finish-tab');
        finishBtns.forEach((b) => b.setAttribute('aria-selected', b === btn ? 'true' : 'false'));
        finishPanels.forEach((p) => p.classList.toggle('is-active', p.getAttribute('data-finish-panel') === id));
      });
    });

    // E. Design for Every Space Interactive Sector Switcher
    const sectorBtns = document.querySelectorAll('[data-sector-btn]');
    const sectorImg = document.getElementById('sector-preview-img');
    const sectorTitle = document.getElementById('sector-preview-title');
    const sectorDesc = document.getElementById('sector-preview-desc');
    const sectorLink = document.getElementById('sector-preview-link');

    sectorBtns.forEach((btn) => {
      const activateSector = () => {
        sectorBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
        if (sectorImg) {
          const imgPath = btn.getAttribute('data-img');
          const imgSm = btn.getAttribute('data-img-sm');
          sectorImg.src = imgPath;
          if (imgSm) sectorImg.srcset = `${imgSm} 600w, ${imgPath} 1100w`;
          sectorImg.alt = btn.getAttribute('data-title') || '';
        }
        if (sectorTitle) sectorTitle.textContent = btn.getAttribute('data-title') || '';
        if (sectorDesc) sectorDesc.textContent = btn.getAttribute('data-desc') || '';
        if (sectorLink) sectorLink.href = btn.getAttribute('data-href') || 'products.html';
      };
      btn.addEventListener('click', activateSector);
      btn.addEventListener('mouseenter', activateSector);
    });
  }

  /**
   * 12. Accessible WAI-ARIA Accordions (Contact FAQs & About Expertise)
   */
  function initAccordions() {
    document.querySelectorAll('.accordion-trigger').forEach((btn) => {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        const panelId = btn.getAttribute('aria-controls');
        const panel = panelId ? document.getElementById(panelId) : null;

        // Optional single-open behaviour within same accordion container
        const parentAcc = btn.closest('.lux-accordion');
        if (parentAcc && parentAcc.dataset.singleOpen === 'true') {
          parentAcc.querySelectorAll('.accordion-trigger').forEach((other) => {
            if (other !== btn) {
              other.setAttribute('aria-expanded', 'false');
              const otherPanel = document.getElementById(other.getAttribute('aria-controls'));
              if (otherPanel) otherPanel.hidden = true;
            }
          });
        }

        btn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        if (panel) panel.hidden = isExpanded;
      });
    });
  }

  /**
   * 13. Contact Page Project Type Selector Sync
   */
  function initContactProjectSync() {
    const pills = document.querySelectorAll('[data-project-type-pill]');
    const select = document.getElementById('quote-project-type');
    const noteEl = document.getElementById('project-type-advisory');
    if (!pills.length) return;

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const val = pill.getAttribute('data-project-type-pill');
        const note = pill.getAttribute('data-note');
        pills.forEach((p) => p.classList.toggle('is-active', p === pill));
        if (select) select.value = val;
        if (noteEl && note) noteEl.textContent = note;
      });
    });
  }

  /**
   * 14. Universal Client-Side Form Validation (Quote, Enquiry, Newsletter, VIP)
   */
  function initFormsValidation() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[+]?[0-9\s\-()]{7,18}$/;

    function validateField(input) {
      const wrapper = input.closest('.form-field');
      const errEl = wrapper ? wrapper.querySelector('.field-error') : null;
      const val = input.value.trim();
      let errMsg = '';

      if (input.hasAttribute('required') && !val) {
        errMsg = 'This field is required.';
      } else if (val && input.type === 'email' && !emailRegex.test(val)) {
        errMsg = 'Please enter a valid email address (e.g., name@studio.com).';
      } else if (val && input.type === 'tel' && !phoneRegex.test(val)) {
        errMsg = 'Please enter a valid phone or WhatsApp number (7–18 digits).';
      } else if (val && input.hasAttribute('data-validate-number')) {
        const num = Number(val);
        if (Number.isNaN(num) || num <= 0) {
          errMsg = 'Please enter a valid positive number (e.g., 1250).';
        }
      }

      const invalid = Boolean(errMsg);
      input.classList.toggle('is-invalid', invalid);
      input.setAttribute('aria-invalid', invalid ? 'true' : 'false');
      if (wrapper) wrapper.classList.toggle('has-error', invalid);
      if (errEl && errMsg) errEl.textContent = errMsg;

      return !invalid;
    }

    document.querySelectorAll('form[data-validate-form]').forEach((form) => {
      const inputs = Array.from(form.querySelectorAll('input:not([type="hidden"]), select, textarea')).filter(
        (el) => !el.closest('.hp-trap')
      );

      inputs.forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
          if (input.classList.contains('is-invalid')) validateField(input);
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check Honeypot spam trap
        const hp = form.querySelector('.hp-trap input');
        if (hp && hp.value) return;

        let allValid = true;
        let firstInvalid = null;

        inputs.forEach((input) => {
          const ok = validateField(input);
          if (!ok && !firstInvalid) firstInvalid = input;
          allValid = allValid && ok;
        });

        const statusEl = form.querySelector('.form-status');
        if (!allValid) {
          if (statusEl) {
            statusEl.className = 'form-status is-error';
            statusEl.textContent = 'Please review the highlighted fields above before submitting.';
          }
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Submitting Request…';
        }

        window.setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }
          if (statusEl) {
            statusEl.className = 'form-status is-success';
            statusEl.textContent =
              form.getAttribute('data-success-msg') ||
              'Thank you. Our Surface Specification Desk has received your request and will respond within 4 business hours.';
          }
          form.reset();
          if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
          }
        }, 650);
      });
    });
  }

  /**
   * 15. Coming Soon Exhibition Countdown (coming-soon.html)
   */
  function initComingSoonCountdown() {
    const cdRoot = document.getElementById('exhibition-countdown');
    if (!cdRoot) return;

    // Target 45 days ahead dynamically so countdown is always live
    const targetDate = Date.now() + 45 * 24 * 60 * 60 * 1000 + 7 * 3600 * 1000;
    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-mins');
    const sEl = document.getElementById('cd-secs');

    const tick = () => {
      const diff = Math.max(0, targetDate - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(mins).padStart(2, '0');
      if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    };

    tick();
    window.setInterval(tick, 1000);
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initThemeAndRtl();
    initAnnouncementBar();
    initNavigation();
    initLiveSearch();
    initScrollProgressAndTop();
    initAureliaTilt(document);
    initCursorAndMagnetic();
    initRevealsAndCounters();
    initHome1Widgets();
    initHome2Widgets();
    initAccordions();
    initContactProjectSync();
    initFormsValidation();
    initComingSoonCountdown();

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });
})();

