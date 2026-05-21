// ── HERO ENTRANCE ─────────────────────────────────────────────────────────
  function runHeroEntrance() {
    const heroEls = document.querySelectorAll('.page-hero-content > *');
    heroEls.forEach((el, i) => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
    });
    const heroBg = document.querySelector('.page-hero-bg img');
    if (heroBg) { heroBg.style.transition = 'none'; heroBg.style.opacity = '0'; heroBg.style.transform = 'scale(1.08)'; }
    const deco = document.querySelector('.page-hero-deco');
    if (deco)   { deco.style.transition = 'none'; deco.style.opacity = '0'; deco.style.transform = 'translateX(60px)'; }
    const marquee = document.querySelector('.marquee-wrap');
    if (marquee){ marquee.style.transition = 'none'; marquee.style.opacity = '0'; marquee.style.transform = 'translateY(12px)'; }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroEls.forEach((el, i) => {
          el.style.transition = `opacity 1.2s cubic-bezier(0.22,1,0.36,1) ${200 + i * 200}ms, transform 1.2s cubic-bezier(0.22,1,0.36,1) ${200 + i * 200}ms`;
          el.style.opacity = '1'; el.style.transform = 'translateY(0)';
        });
        if (heroBg) { heroBg.style.transition = 'opacity 1.8s cubic-bezier(0.22,1,0.36,1), transform 1.8s cubic-bezier(0.22,1,0.36,1)'; heroBg.style.opacity = '0.3'; heroBg.style.transform = 'scale(1)'; }
        if (deco)   { deco.style.transition = 'opacity 1.8s cubic-bezier(0.22,1,0.36,1) 600ms, transform 1.8s cubic-bezier(0.22,1,0.36,1) 600ms'; deco.style.opacity = '1'; deco.style.transform = 'translateX(0)'; }
        if (marquee){ marquee.style.transition = 'opacity 1.0s cubic-bezier(0.22,1,0.36,1) 900ms, transform 1.0s cubic-bezier(0.22,1,0.36,1) 900ms'; marquee.style.opacity = '1'; marquee.style.transform = 'translateY(0)'; }
      });
    });
  }

  runHeroEntrance();
  window.addEventListener('pageshow', (e) => { if (e.persisted) runHeroEntrance(); });

  // ── INTERSECTION OBSERVER ─────────────────────────────────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  // ── SCROLL REVEAL — auto-tag section children ─────────────────────────────
  const scrollTargets = [
    { sel: '.stats-grid .stat-item',       stagger: 80  },
    { sel: '.featured-grid > *',           stagger: 120 },
    { sel: '.section-header',              stagger: 0   },
    { sel: '.types-grid .type-card',       stagger: 90  },
    { sel: '.events-grid .event-card',     stagger: 110 },
    { sel: '.cta-banner > .container > *', stagger: 100 },
  ];

  scrollTargets.forEach(({ sel, stagger }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.transition = `opacity 0.72s cubic-bezier(0.22,1,0.36,1) ${i * stagger}ms, transform 0.72s cubic-bezier(0.22,1,0.36,1) ${i * stagger}ms`;
      revealObs.observe(el);
    });
  });

  // Kept for compatibility with other pages
  function filterFaculty(btn, dept) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.faculty-list-card').forEach(card => {
      card.style.display = (dept === 'all' || card.dataset.dept === dept) ? '' : 'none';
    });
  }
  function searchFaculty() {
    const el = document.getElementById('facultySearch');
    if (!el) return;
    const q = el.value.toLowerCase();
    document.querySelectorAll('.faculty-list-card').forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  }