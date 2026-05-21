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

  // ── SCROLL REVEAL — existing .reveal elements ─────────────────────────────
  const delayMap = { 'reveal-delay-1': 80, 'reveal-delay-2': 160, 'reveal-delay-3': 240, 'reveal-delay-4': 320 };

  document.querySelectorAll('.reveal').forEach(el => {
    let delay = 0;
    el.classList.forEach(cls => { if (delayMap[cls]) delay = delayMap[cls]; });
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    el.style.transition = `opacity 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
    revealObs.observe(el);
  });

  // ── AUTO-TAG — grid children without .reveal ──────────────────────────────
  const autoTargets = [
    { sel: '.dept-cards .dept-card',  stagger: 80  },
    { sel: '.contact-block',          stagger: 90  },
    { sel: '.tour-slot',              stagger: 100 },
    { sel: '.left-col > *',           stagger: 80  },
    { sel: '.tours-col > *',          stagger: 70  },
  ];

  autoTargets.forEach(({ sel, stagger }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (el.classList.contains('reveal') || el.closest('[data-reveal-init]')) return;
      el.dataset.revealInit = '1';
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = `opacity 0.68s cubic-bezier(0.22,1,0.36,1) ${i * stagger}ms, transform 0.68s cubic-bezier(0.22,1,0.36,1) ${i * stagger}ms`;
      revealObs.observe(el);
    });
  });