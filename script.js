const reveals = document.querySelectorAll('.reveal');
const backtop = document.querySelector('.backtop');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach(el => el.classList.add('is-visible'));
  if (backtop) backtop.classList.add('is-visible');
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  const topObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!backtop) return;
      backtop.classList.toggle('is-visible', !entry.isIntersecting);
    });
  }, {
    threshold: 0.1
  });

  const hero = document.querySelector('#hero');
  if (hero) topObserver.observe(hero);
}