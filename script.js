// Theme
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-toggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') root.setAttribute('data-theme', 'light');

themeBtn?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next === 'dark' ? '' : 'light');
  localStorage.setItem('theme', next);
});

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Mobile menu
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
mobileBtn?.addEventListener('click', () => {
  const open = mobileBtn.classList.toggle('open');
  mobileMenu.classList.toggle('open', open);
  mobileBtn.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileBtn.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', false);
    mobileMenu.setAttribute('aria-hidden', true);
  });
});

// Active nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting)
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => io.observe(s));

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));
