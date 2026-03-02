// ── Anno nel footer ─────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Header: classe "scrolled" allo scroll ───
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Typing effect nell'hero ──────────────────
const typingTarget = document.getElementById('typing-target');
const phrases = [
  "Appassionato di web development e reti.",
  "Studio, costruisco, miglioro.",
  "Trasformo idee in codice funzionante.",
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
let typingTimer = null;

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingTarget.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTarget.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 70;

  if (!isDeleting && charIndex === current.length) {
    // Pausa alla fine della frase
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

// Avvia il typing solo se l'elemento esiste
if (typingTarget) {
  setTimeout(type, 800);
}

// ── Reveal on scroll (IntersectionObserver) ──
const reveals = Array.from(document.querySelectorAll('.reveal'));

if (!('IntersectionObserver' in window)) {
  // Fallback browser vecchi
  reveals.forEach(el => el.classList.add('visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => revealObserver.observe(el));
}

// ── ScrollSpy: evidenzia la voce nav attiva ──
const sections = Array.from(document.querySelectorAll('main section[id]'));
const navLinks  = Array.from(document.querySelectorAll('nav a[data-nav]'));

if (sections.length && navLinks.length) {
  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px', // si attiva quando la sezione è circa al centro
    threshold: 0
  });

  sections.forEach(sec => spyObserver.observe(sec));
}