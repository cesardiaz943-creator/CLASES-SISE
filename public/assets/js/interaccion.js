import { validarUrgencia, cambiarEstado, registrarEvento } from './ea2-logica.js';

/* =========================================================
   AYUDA ACCESIBLE
========================================================= */

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

/* =========================================================
   FORMULARIO
========================================================= */

const form = document.querySelector('#form-incidencia');
const descripcion = document.querySelector('#descripcion');
const contador = document.querySelector('#contador');

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

/* =========================================================
   EA2 - RETO 2: JUSTIFICACIÓN DE URGENCIA
========================================================= */

const grupoUrgencia = document.querySelector('#grupo-urgencia');
const motivoUrgencia = document.querySelector('#motivo-urgencia');
const errorUrgencia = document.querySelector('#error-urgencia');

function actualizarContador() {
  contador.textContent = descripcion.value.length + '/500 caracteres';
}

descripcion.addEventListener('input', actualizarContador);

actualizarContador();

function validarCampo(campo, error, mensaje) {
  const valido = campo.checkValidity();

  error.textContent = valido ? '' : mensaje;

  campo.setAttribute('aria-invalid', String(!valido));

  return valido;
}

function obtenerPrioridad() {
  const seleccionada = Array.from(radiosPrioridad).find((radio) => radio.checked);

  return seleccionada ? seleccionada.value : '';
}

function actualizarUrgencia() {
  const prioridad = obtenerPrioridad();
  const esAlta = prioridad === 'alta';

  grupoUrgencia.hidden = !esAlta;

  if (!esAlta) {
    motivoUrgencia.value = '';
    errorUrgencia.textContent = '';

    motivoUrgencia.setAttribute('aria-invalid', 'false');
  }
}

function validarMotivoUrgencia() {
  const prioridad = obtenerPrioridad();

  const mensaje = validarUrgencia(prioridad, motivoUrgencia.value);

  const valido = mensaje === '';

  errorUrgencia.textContent = mensaje;

  motivoUrgencia.setAttribute('aria-invalid', String(!valido));

  return valido;
}

/* =========================================================
   VALIDACIÓN COMPLETA
========================================================= */

function validarFormulario() {
  let primerError = null;
  let valido = true;

  /* Nombre */

  const nombreValido = nombre.checkValidity();

  errorNombre.textContent = nombreValido ? '' : 'Escribe tu nombre completo.';

  nombre.setAttribute('aria-invalid', String(!nombreValido));

  if (!nombreValido && !primerError) {
    primerError = nombre;
  }

  if (!nombreValido) {
    valido = false;
  }

  /* Correo */

  const correoValido = correo.checkValidity();

  errorCorreo.textContent = correoValido ? '' : 'Escribe un correo válido.';

  correo.setAttribute('aria-invalid', String(!correoValido));

  if (!correoValido && !primerError) {
    primerError = correo;
  }

  if (!correoValido) {
    valido = false;
  }

  /* Servicio */

  const servicioExiste = Array.from(servicio.options).some((opcion) => {
    return opcion.value === servicio.value && opcion.value !== '';
  });

  const servicioValido = !servicio.disabled && servicio.checkValidity() && servicioExiste;

  errorServicio.textContent = servicioValido ? '' : 'Selecciona un servicio.';

  servicio.setAttribute('aria-invalid', String(!servicioValido));

  if (!servicioValido && !primerError) {
    primerError = servicio;
  }

  if (!servicioValido) {
    valido = false;
  }

  /* Prioridad */

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

  if (!prioridadSeleccionada) {
    valido = false;
  }

  /* Justificación de urgencia */

  if (prioridadSeleccionada) {
    const urgenciaValida = validarMotivoUrgencia();

    if (!urgenciaValida && !primerError) {
      primerError = motivoUrgencia;
    }

    if (!urgenciaValida) {
      valido = false;
    }
  }

  /* Descripción */

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

  if (!descripcionValida) {
    valido = false;
  }

  if (primerError) {
    primerError.focus();
  }

  return valido;
}

/* =========================================================
   EA2 - RETO 4: MEDICIÓN CON PREFERENCIA
========================================================= */

const eventos = [];
window.eventosEA2 = eventos;

let consentimientoActual = '';

const radiosConsentimiento = document.querySelectorAll('input[name="consentimiento"]');

function obtenerConsentimiento() {
  const seleccionado = Array.from(radiosConsentimiento).find((radio) => radio.checked);

  return seleccionado ? seleccionado.value : consentimientoActual;
}

function obtenerServicioSeleccionado() {
  const opcion = servicio.options[servicio.selectedIndex];

  if (!opcion || !opcion.value) {
    return null;
  }

  return {
    id: Number(opcion.value),
    categoria: opcion.dataset.categoria || '',
  };
}

function registrarSeleccionServicio() {
  const servicioSeleccionado = obtenerServicioSeleccionado();

  if (!servicioSeleccionado) {
    return;
  }

  registrarEvento(
    obtenerConsentimiento(),
    'select_service',
    servicioSeleccionado,
    eventos,
  );
}

function registrarEnvioSolicitud(servicioSeleccionado) {
  if (!servicioSeleccionado) {
    return;
  }

  registrarEvento(
    obtenerConsentimiento(),
    'submit_request',
    servicioSeleccionado,
    eventos,
  );
}

radiosConsentimiento.forEach((radio) => {
  radio.addEventListener('change', () => {
    consentimientoActual = radio.value;
  });
});

/* =========================================================
   EVENTOS DE VALIDACIÓN
========================================================= */

nombre.addEventListener('input', () => {
  validarCampo(nombre, errorNombre, 'Escribe tu nombre completo.');
});

correo.addEventListener('input', () => {
  validarCampo(correo, errorCorreo, 'Escribe un correo válido.');
});

servicio.addEventListener('change', () => {
  validarCampo(servicio, errorServicio, 'Selecciona un servicio.');

  registrarSeleccionServicio();
});

radiosPrioridad.forEach((radio) => {
  radio.addEventListener('change', () => {
    errorPrioridad.textContent = '';

    radiosPrioridad.forEach((item) => {
      item.setAttribute('aria-invalid', 'false');
    });

    actualizarUrgencia();

    if (radio.value === 'alta') {
      validarMotivoUrgencia();
    }
  });
});

motivoUrgencia.addEventListener('input', () => {
  if (obtenerPrioridad() === 'alta') {
    validarMotivoUrgencia();
  }
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

/* =========================================================
   SOLICITUDES EN MEMORIA
========================================================= */

const solicitudes = [];

function crearSolicitud(datos) {
  const nueva = {
    id: solicitudes.length + 1,

    servicio_id: Number(datos.get('servicio')),

    correo: String(datos.get('correo')).trim(),

    prioridad: datos.get('prioridad'),

    motivo_urgencia:
      datos.get('prioridad') === 'alta'
        ? String(datos.get('motivo-urgencia') || '').trim()
        : '',

    descripcion: String(datos.get('descripcion')).trim(),

    estado: 'Pendiente',

    fecha: new Date().toISOString(),
  };

  solicitudes.push(nueva);

  renderizarSolicitudes();

  return nueva;
}

/* =========================================================
   EA2 - RETO 3: AUDITORÍA Y CAMBIO DE ESTADO
========================================================= */

const auditoria = [];

const actorRol = document.querySelector('#actor-rol');

const estadoAuditoria = document.querySelector('#estado-auditoria');

const listaAuditoria = document.querySelector('#lista-auditoria');

const filasSolicitudes = document.querySelector('#filas-solicitudes');

function obtenerActorActual() {
  if (actorRol && actorRol.value === 'tecnico') {
    return {
      id: 2,
      nombre: 'Carlos Demo',
      rol: 'tecnico',
    };
  }

  return {
    id: 1,
    nombre: 'Ana Demo',
    rol: 'usuario',
  };
}

function renderizarAuditoria() {
  if (!estadoAuditoria || !listaAuditoria) {
    return;
  }

  if (auditoria.length === 0) {
    estadoAuditoria.textContent = 'Todavía no hay cambios de estado registrados.';

    listaAuditoria.replaceChildren();

    return;
  }

  estadoAuditoria.textContent =
    auditoria.length === 1
      ? '1 cambio de estado registrado.'
      : auditoria.length + ' cambios de estado registrados.';

  const elementos = auditoria.map((registro) => {
    const item = document.createElement('li');

    const codigo = 'SOL-' + String(registro.solicitud_id).padStart(4, '0');

    item.textContent =
      codigo +
      ': ' +
      registro.anterior +
      ' → ' +
      registro.nuevo +
      ' · Actor ' +
      registro.actor_id;

    return item;
  });

  listaAuditoria.replaceChildren(...elementos);
}

/* =========================================================
   TABLA DE SOLICITUDES
========================================================= */

function renderizarSolicitudes() {
  const filas = solicitudes.map((solicitud) => {
    const fila = document.createElement('tr');

    fila.dataset.solicitudId = String(solicitud.id);

    const codigo = document.createElement('td');

    const servicioCelda = document.createElement('td');

    const prioridad = document.createElement('td');

    const estadoCelda = document.createElement('td');

    const acciones = document.createElement('td');

    const codigoSolicitud = 'SOL-' + String(solicitud.id).padStart(4, '0');

    const opcionServicio = Array.from(servicio.options).find((opcion) => {
      return Number(opcion.value) === solicitud.servicio_id;
    });

    codigo.textContent = codigoSolicitud;

    servicioCelda.textContent = opcionServicio
      ? opcionServicio.textContent
      : 'Servicio no disponible';

    prioridad.textContent = solicitud.prioridad;

    estadoCelda.textContent = solicitud.estado;

    /* Selector de estados */

    const selectorEstado = document.createElement('select');

    selectorEstado.setAttribute('aria-label', 'Nuevo estado para ' + codigoSolicitud);

    const estados = ['Pendiente', 'En proceso', 'Resuelto', 'Cerrado/Cancelado'];

    estados.forEach((estadoOpcion) => {
      const opcion = new Option(estadoOpcion, estadoOpcion);

      if (estadoOpcion === solicitud.estado) {
        opcion.selected = true;
      }

      selectorEstado.add(opcion);
    });

    /* Botón actualizar */

    const botonActualizar = document.createElement('button');

    botonActualizar.type = 'button';

    botonActualizar.textContent = 'Actualizar';

    botonActualizar.addEventListener('click', () => {
      const actor = obtenerActorActual();

      const nuevoEstado = selectorEstado.value;

      const cambioRealizado = cambiarEstado(
        solicitudes,
        solicitud.id,
        nuevoEstado,
        actor,
        auditoria,
      );

      if (!cambioRealizado) {
        if (estadoAuditoria) {
          if (actor.rol !== 'tecnico') {
            estadoAuditoria.textContent =
              'Cambio rechazado: solo el rol técnico puede cambiar estados.';
          } else if (nuevoEstado === solicitud.estado) {
            estadoAuditoria.textContent = 'Selecciona un estado diferente al actual.';
          } else {
            estadoAuditoria.textContent = 'No fue posible cambiar el estado.';
          }
        }

        selectorEstado.value = solicitud.estado;

        return;
      }

      renderizarSolicitudes();
      renderizarAuditoria();

      const filaActualizada = document.querySelector(
        `[data-solicitud-id="${solicitud.id}"]`,
      );

      if (filaActualizada) {
        filaActualizada.classList.add('ea2-actualizada');

        setTimeout(() => {
          filaActualizada.classList.remove('ea2-actualizada');
        }, 700);
      }

      if (estadoAuditoria) {
        estadoAuditoria.textContent = 'Estado actualizado correctamente.';
      }
    });

    acciones.append(selectorEstado, botonActualizar);

    fila.append(codigo, servicioCelda, prioridad, estadoCelda, acciones);

    return fila;
  });

  filasSolicitudes.replaceChildren(...filas);
}

/* =========================================================
   ENVÍO DEL FORMULARIO
========================================================= */

let procesando = false;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (procesando) {
    return;
  }

  estado.classList.remove('mensaje-ok');

  if (!validarFormulario()) {
    estado.textContent = 'Hay campos por corregir.';

    return;
  }

  const datos = new FormData(form);

  /*
      Guardamos el servicio ANTES del reset.
      Solo contiene id y categoría para la medición.
    */
  const servicioSeleccionado = obtenerServicioSeleccionado();

  /*
      Conservamos la preferencia porque form.reset()
      también reinicia los radios.
    */
  consentimientoActual = obtenerConsentimiento();

  procesando = true;
  enviar.disabled = true;

  estado.textContent = 'Procesando solicitud de práctica…';

  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 600);
    });

    const nueva = crearSolicitud(datos);

    /*
        EA2 Reto 4:
        submit_request se registra únicamente
        después de confirmar un envío válido.
      */
    registrarEnvioSolicitud(servicioSeleccionado);

    const codigo = 'SOL-' + String(nueva.id).padStart(4, '0');

    estado.textContent =
      'Simulación registrada: ' +
      codigo +
      '. Se conserva solo hasta recargar esta página.';

    estado.classList.add('mensaje-ok');

    form.reset();

    /*
        Restauramos visualmente la preferencia.
        El historial anterior de eventos no se borra.
      */
    radiosConsentimiento.forEach((radio) => {
      radio.checked = radio.value === consentimientoActual;
    });

    actualizarContador();

    grupoUrgencia.hidden = true;

    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    errorServicio.textContent = '';
    errorPrioridad.textContent = '';
    errorUrgencia.textContent = '';
    errorDescripcion.textContent = '';

    nombre.setAttribute('aria-invalid', 'false');

    correo.setAttribute('aria-invalid', 'false');

    servicio.setAttribute('aria-invalid', 'false');

    motivoUrgencia.setAttribute('aria-invalid', 'false');

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

actualizarUrgencia();
renderizarAuditoria();

form.noValidate = true;
