const page = document.querySelector('#page');
const menuButton = document.querySelector('.menu-button');
const drawerClose = document.querySelector('.drawer-close');
const overlay = document.querySelector('.overlay');
const toTop = document.querySelector('.to-top');
const reveals = document.querySelectorAll('.reveal');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const openDrawer = () => {
  page.classList.add('drawer-open');
  menuButton.setAttribute('aria-expanded', 'true');
};

const closeDrawer = () => {
  page.classList.remove('drawer-open');
  menuButton.setAttribute('aria-expanded', 'false');
};

menuButton?.addEventListener('click', () => {
  page.classList.contains('drawer-open') ? closeDrawer() : openDrawer();
});

drawerClose?.addEventListener('click', closeDrawer);
overlay?.addEventListener('click', closeDrawer);

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDrawer();
});

if ('IntersectionObserver' in window && !reducedMotion) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  }, {
    threshold: 0.22
  });

  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

const topObserver = new IntersectionObserver(([entry]) => {
  toTop.classList.toggle('show', !entry.isIntersecting);
}, { threshold: 0.15 });

topObserver.observe(document.querySelector('#home'));

toTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
});

window.addEventListener('scroll', closeDrawer, { passive: true });