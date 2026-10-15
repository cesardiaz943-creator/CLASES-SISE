export function filtrarServicios(lista, categoria) {
  if (!Array.isArray(lista)) {
    return [];
  }

  if (categoria === 'Todas') {
    return [...lista];
  }

  return lista.filter((servicio) => {
    return servicio.categoria === categoria;
  });
}

export function validarUrgencia(prioridad, motivo) {
  if (prioridad !== 'alta') {
    return '';
  }

  const texto = String(motivo ?? '').trim();

  if (texto.length < 15) {
    return 'Justifica la prioridad alta con al menos 15 caracteres.';
  }

  return '';
}

export function cambiarEstado(solicitudes, id, nuevoEstado, actor, auditoria) {
  const estadosValidos = ['Pendiente', 'En proceso', 'Resuelto', 'Cerrado/Cancelado'];

  if (!Array.isArray(solicitudes) || !Array.isArray(auditoria)) {
    return false;
  }

  if (!actor || actor.rol !== 'tecnico') {
    return false;
  }

  if (!estadosValidos.includes(nuevoEstado)) {
    return false;
  }

  const solicitud = solicitudes.find((item) => item.id === id);

  if (!solicitud) {
    return false;
  }

  if (solicitud.estado === nuevoEstado) {
    return false;
  }

  const estadoAnterior = solicitud.estado;

  solicitud.estado = nuevoEstado;

  auditoria.push({
    id: auditoria.length + 1,
    actor_id: actor.id,
    solicitud_id: solicitud.id,
    accion: 'CAMBIO_ESTADO',
    anterior: estadoAnterior,
    nuevo: nuevoEstado,
    fecha: new Date().toISOString(),
  });

  return true;
}

export function registrarEvento(consentimiento, nombre, servicio, eventos) {
  const eventosPermitidos = ['select_service', 'submit_request'];

  const categoriasPermitidas = ['Accesos', 'Hardware', 'Red', 'Software'];

  if (consentimiento !== 'aceptado') {
    return false;
  }

  if (!eventosPermitidos.includes(nombre)) {
    return false;
  }

  if (
    !servicio ||
    !Number.isSafeInteger(servicio.id) ||
    servicio.id <= 0 ||
    !categoriasPermitidas.includes(servicio.categoria) ||
    !Array.isArray(eventos)
  ) {
    return false;
  }

  eventos.push({
    event: nombre,
    service_id: String(servicio.id),
    categoria: servicio.categoria,
  });

  return true;
}
