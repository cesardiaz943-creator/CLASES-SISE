# Nova Servicios TI - Evaluación Aplicativa 2

Portal web de práctica para la gestión de solicitudes de soporte TI.

Proyecto desarrollado para el curso Desarrollo de Entornos Web.

## Base del proyecto

La solución parte del Portal de Soporte TI desarrollado durante la semana 5.

La base ya incluía:

- Navegación responsive.
- Catálogo de servicios cargado desde JSON.
- Formulario de solicitud.
- Validaciones de campos.
- Panel de ayuda accesible.
- Registro de solicitudes en memoria.
- Prevención de envíos duplicados.
- Compatibilidad con teclado y foco visible.
- Soporte para `prefers-reduced-motion`.

Para la EA2 se trabajó sobre la rama:

`release/ea2`

## Cambios realizados en la EA2

### Reto 1 - Filtro de servicios

Se implementó la función:

`filtrarServicios(lista, categoria)`

Permite:

- Mostrar todos los servicios con la opción `Todas`.
- Filtrar por `Accesos`.
- Filtrar por `Hardware`.
- Filtrar por `Red`.
- Filtrar por `Software`.
- Mostrar la cantidad de servicios encontrados.
- Mostrar el estado vacío cuando no existen coincidencias.
- Mantener siempre los cinco servicios disponibles en el selector del formulario.
- Devolver una nueva lista sin modificar la fuente original.

### Reto 2 - Justificación de urgencia

Se implementó la función:

`validarUrgencia(prioridad, motivo)`

Cuando la prioridad seleccionada es `alta`, se exige una justificación de al menos 15 caracteres después de aplicar `trim`.

Si la justificación no es válida:

- Se muestra un mensaje de error.
- La solicitud no se registra.
- El foco se dirige al campo correspondiente.

Las prioridades `media` y `baja` no requieren justificación de urgencia.

Un envío válido genera una sola solicitud.

### Reto 3 - Cambio de estado y auditoría

Se implementó la función:

`cambiarEstado(solicitudes, id, nuevoEstado, actor, auditoria)`

Solo un actor con rol `tecnico` puede modificar el estado de una solicitud existente.

Estados permitidos:

- Pendiente
- En proceso
- Resuelto
- Cerrado/Cancelado

Cada cambio válido genera un registro de auditoría en memoria con:

- `id`
- `actor_id`
- `solicitud_id`
- `accion`
- `anterior`
- `nuevo`
- `fecha`

Los cambios inválidos, estados repetidos, identificadores inexistentes o actores sin rol técnico no modifican la solicitud ni generan auditoría.

También se agregó una confirmación visual mediante la clase `.ea2-actualizada`.

Cuando el navegador utiliza `prefers-reduced-motion: reduce`, se elimina el movimiento y se conserva una confirmación visual.

El selector de roles utilizado en la interfaz es únicamente demostrativo y no representa autenticación real.

### Reto 4 - Analítica con consentimiento

Se implementó la función:

`registrarEvento(consentimiento, nombre, servicio, eventos)`

La aplicación registra únicamente los eventos:

- `select_service`
- `submit_request`

Los eventos se almacenan solo cuando la preferencia de analítica es `aceptado`.

Cada evento contiene únicamente:

- `event`
- `service_id`
- `categoria`

No se registran:

- Nombre.
- Correo electrónico.
- Descripción del problema.
- Contraseñas.
- Datos personales.
- El objeto completo de la solicitud.

Si la persona rechaza la analítica o no toma una decisión, el formulario continúa funcionando normalmente.

Si posteriormente se revoca la preferencia de analítica, se detiene el registro de nuevos eventos y los eventos anteriores permanecen en memoria.

## Datos y persistencia

Este proyecto no utiliza backend ni base de datos real.

Los siguientes datos existen únicamente durante la sesión del navegador:

- Solicitudes.
- Auditoría.
- Eventos de analítica.
- Preferencia de analítica.

Al recargar la página, estos datos desaparecen.

Todo el portal utiliza información ficticia.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- JSON
- Node.js
- Git
- GitHub
- Vercel

No se utilizaron frameworks de JavaScript.

## Ejecución local

Requisitos:

- Node.js 22 o superior.
- Git.
- Navegador web moderno.

Instalar las dependencias:

```bash
npm ci
```
