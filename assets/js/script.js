// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
  initCounters();
  initVisitCounter();
});

// TYPED EFFECT
const phrases = [
  'DevOps Engineer',
  'Cloud Enthusiast',
  'Cybersecurity Learner',
  'Automation Builder',
  'CCNA Student'
];
let pi = 0, ci = 0, del = false;
const el = document.getElementById('typed-text');
function type() {
  const word = phrases[pi];
  if (!del) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { del = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, del ? 60 : 100);
}
type();

// HAMBURGER
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.background = window.scrollY > 50 ? 'rgba(10,14,23,0.98)' : 'rgba(10,14,23,0.85)';
  updateScrollBar();
  toggleBackToTop();
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { t.scrollIntoView({ behavior: 'smooth' }); navLinks.classList.remove('open'); }
  });
});

// TABS
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// SCROLL ANIMATIONS
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('section').forEach(s => { s.classList.add('fade-up'); observer.observe(s); });

// ACTIVE NAV
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--accent)' : '';
  });
});

// ============================================================
// 1. MODE CLAIR / SOMBRE
// ============================================================
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'light') document.body.classList.add('light-mode');
if (themeBtn) {
  themeBtn.innerHTML = savedTheme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  });
}

// ============================================================
// 2. BARRE DE PROGRESSION SCROLL
// ============================================================
function updateScrollBar() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const total = document.body.scrollHeight - window.innerHeight;
  bar.style.width = (window.scrollY / total * 100) + '%';
}

// ============================================================
// 3. BOUTON RETOUR EN HAUT
// ============================================================
function toggleBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 400);
}
const btt = document.getElementById('back-to-top');
if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============================================================
// 4. COMPTEURS ANIMÉS
// ============================================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    if (current >= target) clearInterval(timer);
  }, 16);
}
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.done) {
        e.target.dataset.done = '1';
        animateCounter(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

// ============================================================
// 5. FILTRE PROJETS
// ============================================================
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const tags = card.dataset.tags || '';
      card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
    });
  });
});

// ============================================================
// 6. TOOLTIPS COMPÉTENCES
// ============================================================
document.querySelectorAll('.skill-pill[data-tooltip]').forEach(pill => {
  pill.addEventListener('mouseenter', (e) => {
    let tip = document.createElement('div');
    tip.className = 'skill-tooltip';
    tip.textContent = pill.dataset.tooltip;
    document.body.appendChild(tip);
    const r = pill.getBoundingClientRect();
    tip.style.left = r.left + r.width / 2 - tip.offsetWidth / 2 + 'px';
    tip.style.top = r.top - tip.offsetHeight - 8 + window.scrollY + 'px';
    pill._tip = tip;
  });
  pill.addEventListener('mouseleave', () => {
    if (pill._tip) { pill._tip.remove(); pill._tip = null; }
  });
});

// ============================================================
// 7. EASTER EGG TERMINAL
// ============================================================
const easterInput = document.getElementById('easter-input');
if (easterInput) {
  easterInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const val = easterInput.value.trim().toLowerCase();
    const output = document.getElementById('easter-output');
    if (!output) return;
    const responses = {
      'help': '> Available commands: whoami, skills, contact, hire',
      'whoami': '> Jules Flan — DevOps Junior, basé en Île-de-France 🚀',
      'skills': '> Docker · Kubernetes · Ansible · Terraform · GitLab CI/CD',
      'contact': '> pro.jflan@gmail.com — linkedin.com/in/jules-flan-devops',
      'hire': '> Bonne idée. Envoie un message sur LinkedIn 😄'
    };
    output.textContent = responses[val] || '> Commande inconnue. Tape \'help\' pour commencer.';
    easterInput.value = '';
  });
}

// ============================================================
// 8. COMPTEUR DE VISITES
// ============================================================
function initVisitCounter() {
  const el = document.getElementById('visit-count');
  if (!el) return;
  fetch('https://api.countapi.xyz/hit/jules-flan-portfolio/visits')
    .then(r => r.json())
    .then(data => { el.textContent = data.value; })
    .catch(() => { el.textContent = '—'; });
}

// ============================================================
// 9. FORMULAIRE DE CONTACT
// ============================================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const msg = document.getElementById('form-message');
    btn.textContent = 'Envoi...';
    btn.disabled = true;
    try {
      const res = await fetch('https://formspree.io/f/xnnqwgpk', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      });
      if (res.ok) {
        msg.textContent = '✓ Message envoyé !';
        msg.className = 'form-msg success';
        contactForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      msg.textContent = '✗ Erreur. Essaie par email directement.';
      msg.className = 'form-msg error';
    }
    btn.textContent = 'Envoyer';
    btn.disabled = false;
  });
}
