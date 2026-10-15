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

      if (window.matchMedia('(max-width: 899px)').matches) {
        toggle.focus();
      }
    }
  });
}

const abrirServicios = document.querySelector('#abrir-servicios');
const hero = document.querySelector('#inicio');
const servicios = document.querySelector('#servicios');

function mostrarCatalogo() {
  if (!hero || !servicios) return;

  hero.classList.add('hero--oculto');

  setTimeout(() => {
    hero.hidden = true;
    hero.classList.remove('hero--oculto');

    servicios.hidden = false;

    requestAnimationFrame(() => {
      servicios.classList.add('selector-servicios--visible');
    });
  }, 250);
}

function mostrarHero() {
  if (!hero || !servicios) return;

  servicios.classList.remove('selector-servicios--visible');
  servicios.hidden = true;

  hero.hidden = false;
}

if (abrirServicios && hero && servicios) {
  abrirServicios.addEventListener('click', () => {
    mostrarCatalogo();
  });
}
