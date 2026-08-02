const backtop = document.querySelector('.backtop');
const hero = document.querySelector('#hero');

if (backtop && hero) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      backtop.classList.toggle('is-visible', !entry.isIntersecting);
    });
  }, { threshold: 0.1 });

  observer.observe(hero);
}