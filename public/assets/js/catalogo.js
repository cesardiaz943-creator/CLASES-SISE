const catalogo = document.querySelector('#catalogo');
const selector = document.querySelector('#servicio');
const aviso = document.querySelector('#estado-catalogo');

function crearTarjeta(s) {
  const tarjeta = document.createElement('article');
  tarjeta.classList.add('service-card');

  const titulo = document.createElement('h3');
  const texto = document.createElement('p');
  const etiqueta = document.createElement('span');

  titulo.textContent = s.nombre;
  texto.textContent = s.descripcion;
  etiqueta.textContent = s.categoria + ' · ' + s.prioridad;

  tarjeta.append(titulo, texto, etiqueta);
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

async function cargarServicios() {
  aviso.textContent = 'Cargando servicios…';
  selector.disabled = true;

  try {
    const respuesta = await fetch('data/servicios.json');

    if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);

    const lista = await respuesta.json();

    if (!Array.isArray(lista) || !lista.length) {
      throw new Error('Catálogo vacío o inválido');
    }

    validarContrato(lista);

    catalogo.replaceChildren(...lista.map(crearTarjeta));
    selector.replaceChildren(new Option('Selecciona un servicio', ''));

    lista.forEach((s) => {
      selector.add(new Option(s.nombre, String(s.id)));
    });

    selector.disabled = false;
    aviso.textContent = lista.length + ' servicios disponibles.';
  } catch (error) {
    catalogo.replaceChildren();

    selector.replaceChildren(new Option('Servicios no disponibles', ''));

    aviso.textContent = 'No pudimos cargar servicios. Recarga para reintentar.';

    console.error(error);
  }
}

cargarServicios();
