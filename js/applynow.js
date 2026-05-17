let currentStep = 1;

function val(id) {
  const el = document.getElementById(id);
  return el ? (el.value.trim() || '—') : '—';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d)) return '—';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function populateReview() {
  // Personal Info
  const first = val('f-firstname'), last = val('f-lastname');
  document.getElementById('r-fullname').textContent =
    (first !== '—' || last !== '—') ? [first, last].filter(v => v !== '—').join(' ') : '—';
  document.getElementById('r-dob').textContent = formatDate(document.getElementById('f-dob')?.value);
  document.getElementById('r-email').textContent = val('f-email');
  document.getElementById('r-nationality').textContent = val('f-nationality');

  // Academic Background
  document.getElementById('r-institution').textContent = val('f-institution');
  document.getElementById('r-degree').textContent = val('f-degree');
  document.getElementById('r-gpa').textContent = val('f-gpa');
  document.getElementById('r-gradyear').textContent = val('f-gradyear');

  // Program Selection
  document.getElementById('r-program').textContent = val('f-program');
  const degreeRadio = document.querySelector('input[name="degree"]:checked');
  const levelMap = { undergrad: 'Undergraduate', postgrad: 'Postgraduate' };
  document.getElementById('r-level').textContent = degreeRadio ? (levelMap[degreeRadio.value] || degreeRadio.value) : '—';
  document.getElementById('r-intake').textContent = val('f-intake');
  document.getElementById('r-mode').textContent = val('f-mode');
}

function goStep(n) {
  if (n > currentStep) {
    const currentStepDiv = document.getElementById('step-' + currentStep);
    const inputs = currentStepDiv.querySelectorAll('input, select, textarea');
    let isStepValid = true;

    inputs.forEach(input => {
      if (!input.checkValidity()) {
        isStepValid = false;
        input.classList.add('field-error'); 
      } else {
        input.classList.remove('field-error');
      }
    });

    if (!isStepValid) {
      alert("Please check the highlighted fields.");
      return; 
    }
  }

  // --- Original Navigation Logic Starts Here ---
  document.getElementById('step-' + currentStep).classList.remove('active');
  document.querySelectorAll('.step-item').forEach((el, i) => {
    el.classList.remove('active');
    if (i + 1 < n) el.classList.add('done');
    else el.classList.remove('done');
  });
  currentStep = n;
  document.getElementById('step-' + n).classList.add('active');
  document.querySelectorAll('.step-item')[n - 1].classList.add('active');
  if (n === 5) populateReview();
  updateProgress();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitApp() {
  document.getElementById('step-5').classList.remove('active');
  document.getElementById('success-state').classList.add('show');
  document.querySelectorAll('.step-item').forEach(el => { el.classList.remove('active'); el.classList.add('done'); });
  document.getElementById('progress-bar').style.width = '100%';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
  const pct = ((currentStep - 1) / 4) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
}

// Scroll progress
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  const base = ((currentStep - 1) / 4) * 100;
  const stepContrib = (1 / 4) * (scrolled / total) * 100;
  if (currentStep < 5) {
    document.getElementById('progress-bar').style.width = Math.min(base + stepContrib, (currentStep / 4) * 100) + '%';
  }

  // navbar scroll
  const nav = document.getElementById('navbar');
  if (scrolled > 80) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Radio opt active state
document.querySelectorAll('.radio-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    const name = opt.querySelector('input').name;
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
      r.closest('.radio-opt').classList.remove('selected');
    });
    opt.classList.add('selected');
  });
});

// Add this at the bottom of your applynow.js
document.querySelectorAll('input, select, textarea').forEach(field => {
  field.addEventListener('input', () => {
    if (field.checkValidity()) {
      field.classList.remove('field-error');
      // If you are using inline styles from previous steps:
      field.style.borderColor = ""; 
    }
  });
});