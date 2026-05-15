
  // Navbar scroll
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  });

  // Mobile menu
  document.getElementById('hamburger').addEventListener('click', () => document.getElementById('navMenu').classList.toggle('open'));
  document.getElementById('navClose').addEventListener('click', () => document.getElementById('navMenu').classList.remove('open'));

  // Scroll reveal
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(r => revealObs.observe(r));

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
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting) {
        animateCount(e.target, parseInt(e.target.dataset.target));
        statObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num[data-target]').forEach(n => statObs.observe(n));

  // Department filter
  function filterFaculty(btn, dept) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.faculty-list-card').forEach(card => {
      card.style.display = (dept === 'all' || card.dataset.dept === dept) ? '' : 'none';
    });
  }

  // Search
  function searchFaculty() {
    const q = document.getElementById('facultySearch').value.toLowerCase();
    document.querySelectorAll('.faculty-list-card').forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  }
