const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function setHeaderState() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 24);
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

if (menuToggle && header && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) {
      header.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
