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
    });
  });
}

runHeroEntrance();
// Re-run when browser restores page from bfcache (back/forward nav)
window.addEventListener('pageshow', (e) => {
  if (e.persisted) runHeroEntrance();
});

// ── COUNTER ANIMATION ─────────────────────────────────────────────────────
function animateCount(el, target) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 28);
}

const facultystatObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCount(e.target, parseInt(e.target.dataset.target));
      facultystatObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(n => facultystatObs.observe(n));

// ── DEPARTMENT FILTER ─────────────────────────────────────────────────────
function filterFaculty(btn, dept) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.faculty-list-card').forEach(card => {
    card.style.display = (dept === 'all' || card.dataset.dept === dept) ? '' : 'none';
  });
}

// ── SEARCH ────────────────────────────────────────────────────────────────
function searchFaculty() {
  const q = document.getElementById('facultySearch').value.toLowerCase();
  document.querySelectorAll('.faculty-list-card').forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(q) ? '' : 'none';
  });
}