/* ── Navbar scroll ────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Reading progress bar
  const doc = document.documentElement;
  const prog = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = prog + '%';
});

/* ── Mobile nav ───────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const navClose  = document.getElementById('navClose');
hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navClose .addEventListener('click', () => navMenu.classList.remove('open'));

/* ── Scroll reveal ─────────────────── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(r => observer.observe(r));

/* ── Year tabs ─────────────────────── */
document.querySelectorAll('.year-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.year-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.year-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('year-' + tab.dataset.year).classList.add('active');

    // Re-trigger reveals on newly shown tables
    document.querySelectorAll('#year-' + tab.dataset.year + ' .reveal').forEach(el => {
      el.classList.remove('visible');
      setTimeout(() => observer.observe(el), 10);
    });
  });
});