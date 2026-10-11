// Apoyo de las sesiones 3 y 4. Los eventos se estudiarán en la semana 5.
// Este archivo funciona también mientras el estudiante completa la base.
const nav = document.querySelector('.navbar');
const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('#nav-menu');

if (nav && toggle && menu) {
  toggle.hidden = false;
  nav.classList.add('js-menu');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  });
  nav.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (window.matchMedia('(max-width: 767px)').matches) toggle.focus();
    }
  });
}
