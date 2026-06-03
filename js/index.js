/* ── Navbar scroll ────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Reading progress bar
  const doc = document.documentElement;
  const prog = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
  document.getElementById('progress-bar').style.width = prog + '%';
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navClose = document.getElementById('navClose');
hamburger.addEventListener('click', () => navMenu.classList.toggle('open'));
navClose.addEventListener('click', () => navMenu.classList.remove('open'));

//dropdown functionality 
const dropdownParents = document.querySelectorAll('.nav-menu > li > a');

dropdownParents.forEach((link) => {
  const dropdown = link.nextElementSibling;
  if (!dropdown || !dropdown.classList.contains('dropdown')) return;

  // Mobile: tap parent link toggles its dropdown
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      const isOpen = dropdown.classList.contains('mobile-open');
      // Close all other dropdowns
      document.querySelectorAll('.dropdown.mobile-open').forEach(d => d.classList.remove('mobile-open'));
      if (!isOpen) dropdown.classList.add('mobile-open');
    }
  });
});

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

// Counter animation
function animateCount(el, target) {
let current = 0;
const step = Math.ceil(target / 60);
const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current.toLocaleString();
    if(current >= target) clearInterval(timer);
}, 28);
}
const statNums = document.querySelectorAll('.stat-num[data-target]');
const statObs = new IntersectionObserver((entries) => {
entries.forEach(e => {
    if(e.isIntersecting) {
    animateCount(e.target, parseInt(e.target.dataset.target));
    statObs.unobserve(e.target);
    }
});
}, { threshold: 0.5 });
statNums.forEach(n => statObs.observe(n));

// Testimonial slider
const track = document.getElementById('testiTrack');
if (track) {
  const cards = Array.from(track.children);
  let current = 0;
  let perView = window.innerWidth < 768 ? 1 : 2;

  function slideTo(idx) {
    const max = cards.length - perView;
    current = Math.max(0, Math.min(idx, max));
    const cardW = cards[0].getBoundingClientRect().width + 24;
    track.style.transform = `translateX(-${current * cardW}px)`;
  }

  document.getElementById('testiNext').addEventListener('click', () => slideTo(current + 1));
  document.getElementById('testiPrev').addEventListener('click', () => slideTo(current - 1));
  window.addEventListener('resize', () => {
    perView = window.innerWidth < 768 ? 1 : 2;
    slideTo(0);
  });

  slideTo(0);
}
