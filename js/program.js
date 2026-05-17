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