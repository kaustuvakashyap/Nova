// ── HERO ENTRANCE ─────────────────────────────────────────────────────────
function runHeroEntrance() {
  const heroEls = document.querySelectorAll('.page-hero-content > *');
  heroEls.forEach((el) => {
    el.style.transition = 'none';
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
  });

  const heroBg = document.querySelector('.page-hero-bg img');
  if (heroBg) {
    heroBg.style.transition = 'none';
    heroBg.style.opacity = '0';
    heroBg.style.transform = 'scale(1.08)';
  }

  const deco = document.querySelector('.page-hero-deco');
  if (deco) {
    deco.style.transition = 'none';
    deco.style.opacity = '0';
    deco.style.transform = 'translateX(60px)';
  }

  const marquee = document.querySelector('.marquee-wrap');
  if (marquee) {
    marquee.style.transition = 'none';
    marquee.style.opacity = '0';
    marquee.style.transform = 'translateY(12px)';
  }

  // Double rAF — force repaint before animating
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      heroEls.forEach((el, i) => {
        el.style.transition = `opacity 1.2s cubic-bezier(0.22,1,0.36,1) ${200 + i * 200}ms, transform 1.2s cubic-bezier(0.22,1,0.36,1) ${200 + i * 200}ms`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });

      if (heroBg) {
        heroBg.style.transition = 'opacity 1.8s cubic-bezier(0.22,1,0.36,1), transform 1.8s cubic-bezier(0.22,1,0.36,1)';
        heroBg.style.opacity = '0.3';
        heroBg.style.transform = 'scale(1)';
      }

      if (deco) {
        deco.style.transition = 'opacity 1.8s cubic-bezier(0.22,1,0.36,1) 600ms, transform 1.8s cubic-bezier(0.22,1,0.36,1) 600ms';
        deco.style.opacity = '1';
        deco.style.transform = 'translateX(0)';
      }

      if (marquee) {
        marquee.style.transition = 'opacity 0.5s cubic-bezier(0.22,1,0.36,1) 400ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) 400ms';        marquee.style.opacity = '1';
        marquee.style.transform = 'translateY(0)';
      }
    });
  });
}

runHeroEntrance();
// Re-run when browser restores page from bfcache (back/forward nav)
window.addEventListener('pageshow', (e) => {
  if (e.persisted) runHeroEntrance();
});

// ── AUTO-TAG — area-specific grid children without .reveal ────────────────
const autoTargets = [
  { sel: '.area-card',        stagger: 80  },
  { sel: '.program-card',     stagger: 80  },
  { sel: '.stat-card',        stagger: 90  },
  { sel: '.feature-item',     stagger: 80  },
  { sel: '.highlight-card',   stagger: 70  },
  { sel: '.info-card',        stagger: 80  },
];

autoTargets.forEach(({ sel, stagger }) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    if (el.classList.contains('reveal') || el.closest('[data-reveal-init]') || el.classList.contains('marquee-wrap')) return;
    el.dataset.revealInit = '1';
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.68s cubic-bezier(0.22,1,0.36,1) ${i * stagger}ms, transform 0.68s cubic-bezier(0.22,1,0.36,1) ${i * stagger}ms`;
    observer.observe(el);
  });
});

// ── COUNTER ANIMATION ─────────────────────────────────────────────────────
function areaanimateCount(el, target) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 28);
}

const areastatObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const index = Array.from(
        document.querySelectorAll('.stat-num[data-target]')
      ).indexOf(e.target);

      setTimeout(() => {
        areaAnimateCount(e.target, parseInt(e.target.dataset.target));
      }, index * 200);

      areastatObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(n => areastatObs.observe(n));