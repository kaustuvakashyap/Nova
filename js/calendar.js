// ── HERO ENTRANCE ─────────────────────────────────────────────────────────
// Wrapped in a function so it re-runs on back/forward navigation (bfcache)
  function runHeroEntrance() {
    const heroEls = document.querySelectorAll('.page-hero-content > *');
    heroEls.forEach((el, i) => {
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
    // Force a repaint so the reset state is painted before we animate
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

// ── FILTER TABS ───────────────────────────────────────────────────────────
  document.querySelectorAll('.filter-tabs a').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.filter-tabs a').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

// ── MINI CALENDAR ─────────────────────────────────────────────────────────
const highlightDates = { 
  '2026-5-22': 'highlight', 
  '2026-5-25': 'has-event', 
  '2026-5-29': 'has-event', 
  '2026-5-31': 'has-event', 
  '2026-6-1': 'exam', 
  '2026-6-2': 'break',
  '2026-6-3': 'exam',
  '2026-6-4': 'break',
  '2026-6-5': 'exam',
  '2026-6-6': 'ceremony',
  '2026-6-7': 'ceremony',
  '2026-6-8': 'exam',
  '2026-6-9': 'exam',
  '2026-6-11': 'exam',
  '2026-6-12': 'deadline',
  '2026-7-13': 'highlight',    
};
// more events can be added in similar manner like: '2026-6-15': 'has-event'  or  '2026-6-20': 'highlight'

const today = new Date();
let calYear  = today.getFullYear();
let calMonth = today.getMonth(); // 0-indexed

const calTitle  = document.getElementById('calTitle');
const calDates  = document.getElementById('calDates');
const calPrev   = document.getElementById('calPrev');
const calNext   = document.getElementById('calNext');

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function renderMiniCal(year, month) {
  calTitle.textContent = `${MONTHS[month]} ${year}`;
  calDates.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  // Convert Sunday-start to Monday-start
  const startOffset = (firstDay === 0) ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  // Previous month overflow
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = document.createElement('div');
    d.className = 'mini-cal-date other-month';
    d.textContent = daysInPrev - i;
    calDates.appendChild(d);
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = document.createElement('div');
    const key = `${year}-${month + 1}-${day}`;
    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    d.className = 'mini-cal-date';
    if (isToday)               d.classList.add('today');
    if (highlightDates[key])   d.classList.add(highlightDates[key]);
    d.textContent = day;
    calDates.appendChild(d);
  }

  // Next month overflow to fill grid
  const totalCells = startOffset + daysInMonth;
  const remaining  = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  for (let i = 1; i <= remaining; i++) {
    const d = document.createElement('div');
    d.className = 'mini-cal-date other-month';
    d.textContent = i;
    calDates.appendChild(d);
  }
}

calPrev.addEventListener('click', () => {
  calMonth--;
  if (calMonth < 0) { calMonth = 11; calYear--; }
  renderMiniCal(calYear, calMonth);
});

calNext.addEventListener('click', () => {
  calMonth++;
  if (calMonth > 11) { calMonth = 0; calYear++; }
  renderMiniCal(calYear, calMonth);
});

renderMiniCal(calYear, calMonth);