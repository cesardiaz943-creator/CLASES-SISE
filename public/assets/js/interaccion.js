const ayuda = document.querySelector('#panel-ayuda');
const botonAyuda = document.querySelector('#boton-ayuda');

function cambiarAyuda(abierta) {
  ayuda.hidden = !abierta;
  botonAyuda.setAttribute('aria-expanded', String(abierta));
}

botonAyuda.addEventListener('click', () => {
  cambiarAyuda(botonAyuda.getAttribute('aria-expanded') !== 'true');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !ayuda.hidden) {
    cambiarAyuda(false);
    botonAyuda.focus();
  }
});

const form = document.querySelector('#form-incidencia');
const descripcion = document.querySelector('#descripcion');
const contador = document.querySelector('#contador');

function actualizarContador() {
  contador.textContent = descripcion.value.length + '/500 caracteres';
}

descripcion.addEventListener('input', actualizarContador);
actualizarContador();

const servicio = document.querySelector('#servicio');
const correo = document.querySelector('#correo');
const nombre = document.querySelector('#nombre');
const enviar = document.querySelector('#enviar');
const estado = document.querySelector('#estado');

const errorServicio = document.querySelector('#error-servicio');
const errorCorreo = document.querySelector('#error-correo');
const errorNombre = document.querySelector('#error-nombre');
const errorPrioridad = document.querySelector('#error-prioridad');
const errorDescripcion = document.querySelector('#error-descripcion');

const radiosPrioridad = document.querySelectorAll('input[name="prioridad"]');

function validarCampo(campo, error, mensaje) {
  const valido = campo.checkValidity();
  error.textContent = valido ? '' : mensaje;
  campo.setAttribute('aria-invalid', String(!valido));
  return valido;
}

function validarFormulario() {
  let primerError = null;
  let valido = true;

  // Nombre
  const nombreValido = nombre.checkValidity();
  errorNombre.textContent = nombreValido ? '' : 'Escribe tu nombre completo.';
  nombre.setAttribute('aria-invalid', String(!nombreValido));

  if (!nombreValido && !primerError) {
    primerError = nombre;
  }

  if (!nombreValido) valido = false;

  // Correo
  const correoValido = correo.checkValidity();
  errorCorreo.textContent = correoValido ? '' : 'Escribe un correo válido.';
  correo.setAttribute('aria-invalid', String(!correoValido));

  if (!correoValido && !primerError) {
    primerError = correo;
  }

  if (!correoValido) valido = false;

  // Servicio
  const servicioExiste = Array.from(servicio.options).some(
    (opcion) => opcion.value === servicio.value && opcion.value !== '',
  );

  const servicioValido = !servicio.disabled && servicio.checkValidity() && servicioExiste;

  errorServicio.textContent = servicioValido ? '' : 'Selecciona un servicio.';
  servicio.setAttribute('aria-invalid', String(!servicioValido));

  if (!servicioValido && !primerError) {
    primerError = servicio;
  }

  if (!servicioValido) valido = false;

  // Prioridad
  const prioridadSeleccionada = Array.from(radiosPrioridad).some(
    (radio) => radio.checked,
  );

  errorPrioridad.textContent = prioridadSeleccionada ? '' : 'Selecciona una prioridad.';

  radiosPrioridad.forEach((radio) => {
    radio.setAttribute('aria-invalid', String(!prioridadSeleccionada));
  });

  if (!prioridadSeleccionada && !primerError) {
    primerError = radiosPrioridad[0];
  }

  if (!prioridadSeleccionada) valido = false;

  // Descripción
  descripcion.setCustomValidity('');

  if (descripcion.value.trim().length < 10) {
    descripcion.setCustomValidity('Describe el problema con al menos 10 caracteres.');
  }

  const descripcionValida = descripcion.checkValidity();

  errorDescripcion.textContent = descripcionValida
    ? ''
    : 'Describe el problema con al menos 10 caracteres.';

  descripcion.setAttribute('aria-invalid', String(!descripcionValida));

  if (!descripcionValida && !primerError) {
    primerError = descripcion;
  }

  if (!descripcionValida) valido = false;

  if (primerError) {
    primerError.focus();
  }

  return valido;
}

nombre.addEventListener('input', () => {
  validarCampo(nombre, errorNombre, 'Escribe tu nombre completo.');
});

correo.addEventListener('input', () => {
  validarCampo(correo, errorCorreo, 'Escribe un correo válido.');
});

servicio.addEventListener('change', () => {
  validarCampo(servicio, errorServicio, 'Selecciona un servicio.');
});

radiosPrioridad.forEach((radio) => {
  radio.addEventListener('change', () => {
    errorPrioridad.textContent = '';

    radiosPrioridad.forEach((item) => {
      item.setAttribute('aria-invalid', 'false');
    });
  });
});

descripcion.addEventListener('input', () => {
  descripcion.setCustomValidity('');

  if (descripcion.value.trim().length < 10) {
    descripcion.setCustomValidity('Describe el problema con al menos 10 caracteres.');
  }

  validarCampo(
    descripcion,
    errorDescripcion,
    'Describe el problema con al menos 10 caracteres.',
  );
});

const solicitudes = [];

function crearSolicitud(datos) {
  const nueva = {
    id: solicitudes.length + 1,
    servicio_id: Number(datos.get('servicio')),
    correo: String(datos.get('correo')).trim(),
    prioridad: datos.get('prioridad'),
    descripcion: String(datos.get('descripcion')).trim(),
    estado: 'Pendiente',
    fecha: new Date().toISOString(),
  };

  solicitudes.push(nueva);
  renderizarSolicitudes();

  return nueva;
}

const filasSolicitudes = document.querySelector('#filas-solicitudes');

function renderizarSolicitudes() {
  const filas = solicitudes.map((solicitud) => {
    const fila = document.createElement('tr');

    const codigo = document.createElement('td');
    const servicioCelda = document.createElement('td');
    const prioridad = document.createElement('td');
    const estadoCelda = document.createElement('td');

    const codigoSolicitud = 'SOL-' + String(solicitud.id).padStart(4, '0');

    const opcionServicio = Array.from(servicio.options).find(
      (opcion) => Number(opcion.value) === solicitud.servicio_id,
    );

    codigo.textContent = codigoSolicitud;
    servicioCelda.textContent = opcionServicio
      ? opcionServicio.textContent
      : 'Servicio no disponible';
    prioridad.textContent = solicitud.prioridad;
    estadoCelda.textContent = solicitud.estado;

    fila.append(codigo, servicioCelda, prioridad, estadoCelda);

    return fila;
  });

  filasSolicitudes.replaceChildren(...filas);
}

let procesando = false;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (procesando) return;

  estado.classList.remove('mensaje-ok');

  if (!validarFormulario()) {
    estado.textContent = 'Hay campos por corregir.';
    return;
  }

  const datos = new FormData(form);

  procesando = true;
  enviar.disabled = true;
  estado.textContent = 'Procesando solicitud de práctica…';

  try {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const nueva = crearSolicitud(datos);

    const codigo = 'SOL-' + String(nueva.id).padStart(4, '0');

    estado.textContent =
      'Simulación registrada: ' +
      codigo +
      '. Se conserva solo hasta recargar esta página.';

    estado.classList.add('mensaje-ok');

    form.reset();
    actualizarContador();

    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorServicio.textContent = '';
    errorPrioridad.textContent = '';
    errorDescripcion.textContent = '';

    nombre.setAttribute('aria-invalid', 'false');
    correo.setAttribute('aria-invalid', 'false');
    servicio.setAttribute('aria-invalid', 'false');
    descripcion.setAttribute('aria-invalid', 'false');

    radiosPrioridad.forEach((radio) => {
      radio.setAttribute('aria-invalid', 'false');
    });
  } catch (error) {
    estado.textContent = 'No se completó la simulación. Intenta de nuevo.';

    console.error(error);
  } finally {
    procesando = false;
    enviar.disabled = false;
  }
});

form.noValidate = true;
