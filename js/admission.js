/* ============================================================
   admission.js — University of Nova | Admission Page
   Handles: navbar, mobile menu, dropdowns, smooth scroll,
            scroll-reveal, process accordion, FAQ accordion,
            active nav highlighting, anchor pills
   ============================================================ */

(function () {
  'use strict';

  /* ──────────────────────────────────────────────
     1. STICKY NAVBAR
     Adds .scrolled class after 50px scroll,
     which main.css uses to shrink/shadow the bar.
  ────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // run once on load in case page is already scrolled


  /* ──────────────────────────────────────────────
     2. MOBILE HAMBURGER MENU
     Toggles the nav-menu open/closed.
     Closes on: close button, outside click, ESC key.
  ────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('navMenu');
  const navClose  = document.getElementById('navClose');

  function openMenu() {
    navMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent scroll behind overlay
  }

  function closeMenu() {
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (navClose)  navClose.addEventListener('click', closeMenu);

  // Close when clicking outside the menu
  document.addEventListener('click', (e) => {
    if (
      navMenu && navMenu.classList.contains('open') &&
      !navMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ──────────────────────────────────────────────
     3. DROPDOWN MENUS (Desktop hover + mobile tap)
     On desktop: CSS handles hover, JS handles
     accessibility (keyboard nav).
     On mobile: tap the parent link to toggle.
  ────────────────────────────────────────────── */
  const dropdownParents = document.querySelectorAll('.nav-menu > li > a');

  dropdownParents.forEach((link) => {
    const dropdown = link.nextElementSibling;
    if (!dropdown || !dropdown.classList.contains('dropdown')) return;

    // Mobile: tap parent link toggles its dropdown
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const isOpen = dropdown.classList.contains('mobile-open');
        // Close all other dropdowns
        document.querySelectorAll('.dropdown.mobile-open').forEach(d => d.classList.remove('mobile-open'));
        if (!isOpen) dropdown.classList.add('mobile-open');
      }
    });
  });


  /* ──────────────────────────────────────────────
     4. SMOOTH SCROLL for anchor pills & in-page links
     Offsets by navbar height so sections aren't
     hidden behind the sticky bar.
  ────────────────────────────────────────────── */
  function getNavbarHeight() {
    return navbar ? navbar.offsetHeight : 80;
  }

  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - getNavbarHeight() - 24;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  // Intercept all same-page anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href').slice(1);
      if (!hash) return;
      const target = document.getElementById(hash);
      if (target) {
        e.preventDefault();
        smoothScrollTo(hash);
        // Update URL without jumping
        history.pushState(null, '', `#${hash}`);
      }
    });
  });

  // On page load, if there's a hash in the URL, scroll to it smoothly
  if (window.location.hash) {
    const hash = window.location.hash.slice(1);
    // Small delay so the page fully renders first
    setTimeout(() => smoothScrollTo(hash), 120);
  }


  /* ──────────────────────────────────────────────
     5. SCROLL REVEAL
     Fades + slides elements up as they enter the
     viewport. Excludes accordion/FAQ items so
     they're always visible and clickable.
  ────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.reveal:not(.pa-item):not(.faq-item)'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // fire once only
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // Accordion & FAQ items bypass reveal — always visible & interactive
  document.querySelectorAll('.pa-item, .faq-item').forEach((el) => {
    el.classList.add('visible');
  });


  /* ──────────────────────────────────────────────
     6. PROCESS ACCORDION
     One item open at a time.
     First item is open by default (class="pa-item open").
  ────────────────────────────────────────────── */
  function closeAllAccordionItems() {
    document.querySelectorAll('.pa-item.open').forEach((item) => {
      item.classList.remove('open');
      const icon = item.querySelector('.pa-icon i');
      if (icon) icon.className = 'fa fa-plus';
    });
  }

  function openAccordionItem(item) {
    item.classList.add('open');
    const icon = item.querySelector('.pa-icon i');
    if (icon) icon.className = 'fa fa-minus';
  }

  // Called by onclick="toggleAccordion(this)" on each button
  window.toggleAccordion = function (btn) {
    const item   = btn.closest('.pa-item');
    const isOpen = item.classList.contains('open');
    closeAllAccordionItems();
    if (!isOpen) openAccordionItem(item);
  };

  // Keyboard accessibility: Enter / Space triggers the button
  document.querySelectorAll('.pa-header').forEach((btn) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });


  /* ──────────────────────────────────────────────
     7. FAQ ACCORDION
     One item open at a time.
     Updates +/− icon correctly.
  ────────────────────────────────────────────── */
  function closeAllFaqItems() {
    document.querySelectorAll('.faq-item.open').forEach((item) => {
      item.classList.remove('open');
      const icon = item.querySelector('.faq-icon');
      if (icon) icon.className = 'fa fa-plus faq-icon';
    });
  }

  // Called by onclick="toggleFaq(this)" on each button
  window.toggleFaq = function (btn) {
    const item   = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    closeAllFaqItems();
    if (!isOpen) {
      item.classList.add('open');
      const icon = btn.querySelector('.faq-icon');
      if (icon) icon.className = 'fa fa-minus faq-icon';
    }
  };

  // Keyboard accessibility
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });


  /* ──────────────────────────────────────────────
     8. ACTIVE SECTION HIGHLIGHTING
     Watches which section (#requirements, #process,
     #tuition) is in view and highlights the
     matching anchor pill in the header.
  ────────────────────────────────────────────── */
  const sections    = document.querySelectorAll('section[id]');
  const anchorPills = document.querySelectorAll('.anchor-pill');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          anchorPills.forEach((pill) => {
            const href = pill.getAttribute('href');
            pill.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((s) => sectionObserver.observe(s));


  /* ──────────────────────────────────────────────
     9. TICKER PAUSE ON HOVER
     Stops the scrolling ticker when the user
     hovers over it (accessibility / readability).
  ────────────────────────────────────────────── */
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) {
    const tickerBar = tickerTrack.closest('.ticker-bar');
    if (tickerBar) {
      tickerBar.addEventListener('mouseenter', () => {
        tickerTrack.style.animationPlayState = 'paused';
      });
      tickerBar.addEventListener('mouseleave', () => {
        tickerTrack.style.animationPlayState = 'running';
      });
    }
  }

})();