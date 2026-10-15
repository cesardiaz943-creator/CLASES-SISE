import { filtrarServicios } from './ea2-logica.js';

const catalogo = document.querySelector('#catalogo');
const selector = document.querySelector('#servicio');
const aviso = document.querySelector('#estado-catalogo');
const filtros = document.querySelectorAll('.ea2-filtro');

let serviciosOriginales = [];

function crearTarjeta(s) {
  const tarjeta = document.createElement('article');
  tarjeta.classList.add('service-card');

  const categoria = document.createElement('span');
  categoria.classList.add('service-card__category');
  categoria.textContent = s.categoria;

  const titulo = document.createElement('h3');
  titulo.textContent = s.nombre;

  const texto = document.createElement('p');
  texto.textContent = s.descripcion;

  const prioridad = document.createElement('small');
  prioridad.textContent = 'Prioridad del servicio: ' + s.prioridad;

  const elegir = document.createElement('button');
  elegir.type = 'button';
  elegir.classList.add('service-card__choose');
  elegir.textContent = 'Elegir ↗';

  elegir.addEventListener('click', () => {
    selector.value = String(s.id);

    selector.dispatchEvent(
      new Event('change', {
        bubbles: true,
      }),
    );

    const hero = document.querySelector('#inicio');
    const servicios = document.querySelector('#servicios');
    const formulario = document.querySelector('#soporte');

    if (servicios) {
      servicios.classList.remove('selector-servicios--visible');

      servicios.hidden = true;
    }

    if (hero) {
      hero.hidden = false;
    }

    if (formulario) {
      formulario.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });

  tarjeta.append(categoria, titulo, texto, prioridad, elegir);

  return tarjeta;
}

function validarContrato(lista) {
  const categoriasPermitidas = ['Accesos', 'Hardware', 'Red', 'Software'];

  const prioridadesPermitidas = ['alta', 'media', 'baja'];

  const ids = new Set();

  lista.forEach((servicio) => {
    if (
      !Number.isInteger(servicio.id) ||
      servicio.id <= 0 ||
      typeof servicio.nombre !== 'string' ||
      !servicio.nombre.trim() ||
      typeof servicio.descripcion !== 'string' ||
      !servicio.descripcion.trim() ||
      !categoriasPermitidas.includes(servicio.categoria) ||
      !prioridadesPermitidas.includes(servicio.prioridad)
    ) {
      throw new Error('Servicio con datos inválidos');
    }

    if (ids.has(servicio.id)) {
      throw new Error('ID de servicio duplicado');
    }

    ids.add(servicio.id);
  });
}

function mostrarServicios(lista) {
  catalogo.replaceChildren(...lista.map(crearTarjeta));

  if (lista.length === 0) {
    aviso.textContent = 'No hay servicios disponibles para esta categoría.';
    return;
  }

  if (lista.length === 1) {
    aviso.textContent = '1 servicio disponible.';
    return;
  }

  aviso.textContent = lista.length + ' servicios disponibles.';
}

function aplicarFiltro(categoria) {
  const resultado = filtrarServicios(serviciosOriginales, categoria);

  mostrarServicios(resultado);
}

function activarFiltros() {
  filtros.forEach((boton) => {
    boton.addEventListener('click', () => {
      const categoria = boton.dataset.categoria;

      filtros.forEach((otroBoton) => {
        otroBoton.classList.remove('is-active');
      });

      boton.classList.add('is-active');

      aplicarFiltro(categoria);
    });
  });
}

async function cargarServicios() {
  aviso.textContent = 'Cargando servicios…';

  selector.disabled = true;

  try {
    const respuesta = await fetch('data/servicios.json');

    if (!respuesta.ok) {
      throw new Error('HTTP ' + respuesta.status);
    }

    const lista = await respuesta.json();

    if (!Array.isArray(lista) || !lista.length) {
      throw new Error('Catálogo vacío o inválido');
    }

    validarContrato(lista);

    // Copia independiente de la fuente original.
    serviciosOriginales = [...lista];

    // Muestra inicialmente los 5 servicios.
    mostrarServicios(serviciosOriginales);

    // El selector conserva SIEMPRE los 5 servicios.
    selector.replaceChildren(new Option('Selecciona un servicio', ''));

    lista.forEach((s) => {
      const opcion = new Option(s.nombre, String(s.id));

      // EA2 - Reto 4
      // Guardamos solo la categoría necesaria
      // para identificar el servicio seleccionado.
      opcion.dataset.categoria = s.categoria;

      selector.add(opcion);
    });

    selector.disabled = false;

    activarFiltros();
  } catch (error) {
    catalogo.replaceChildren();

    selector.replaceChildren(new Option('Servicios no disponibles', ''));

    selector.disabled = true;

    aviso.textContent = 'No pudimos cargar servicios. Recarga para reintentar.';

    console.error(error);
  }
}

cargarServicios();
