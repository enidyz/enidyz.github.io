const shell = document.querySelector('.shell');
const fab = document.querySelector('.menu-fab');
const closeBtn = document.querySelector('.menu-close');
const backtop = document.querySelector('.backtop');
const hero = document.querySelector('#hero');
const reveals = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function openMenu() {
  shell.classList.add('menu-open');
  fab.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  shell.classList.remove('menu-open');
  fab.setAttribute('aria-expanded', 'false');
}

fab?.addEventListener('click', () => {
  shell.classList.contains('menu-open') ? closeMenu() : openMenu();
});

closeBtn?.addEventListener('click', closeMenu);

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -10% 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}

if (backtop && hero) {
  const topObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      backtop.classList.toggle('is-visible', !entry.isIntersecting);
    });
  }, {
    threshold: 0.15
  });

  topObserver.observe(hero);
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 120) closeMenu();
}, { passive: true }); 