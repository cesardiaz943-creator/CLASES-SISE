## Pruebas - Evaluación Aplicativa 2

- Fecha: 14/10/2026
- Navegador: Google Chrome
- Rama: release/ea2
- Entorno: Servidor local
- URL local: http://127.0.0.1:5500/public/index.html
- SHA probado: Pendiente de commit final
- Resoluciones verificadas: 320 px, 768 px y 1440 px
- Zoom verificado: 200 %
- Preferencia de movimiento reducido: Verificada
- Recorrido con teclado y foco visible: Verificado

| ID     | Acción                                                                                           | Resultado esperado                                                                                                                                 | Resultado real                                                                                                                                              | Corrección        | Estado | Evidencia                                           |
| ------ | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------ | --------------------------------------------------- |
| EA2-01 | Seleccionar el filtro `Todas`                                                                    | Se muestran los 5 servicios. El selector del formulario conserva también los 5 servicios.                                                          | Se mostraron los 5 servicios y el selector conservó todas las opciones disponibles.                                                                         | No fue necesaria. | Cumple | Prueba local del catálogo.                          |
| EA2-02 | Filtrar por `Accesos`, `Hardware`, `Red` y `Software`                                            | Cada filtro muestra únicamente las coincidencias exactas de la categoría. La fuente original no se modifica.                                       | Los filtros mostraron únicamente los servicios correspondientes a cada categoría. Al volver a `Todas` se mostraron nuevamente los 5 servicios.              | No fue necesaria. | Cumple | Prueba local de filtros.                            |
| EA2-03 | Seleccionar prioridad `Alta` e ingresar una justificación menor de 15 caracteres                 | Se muestra un mensaje de error, el foco llega al campo de justificación y la solicitud no se registra.                                             | Con una justificación como `Muy urgente` apareció el mensaje de mínimo 15 caracteres y la solicitud no fue registrada.                                      | No fue necesaria. | Cumple | Captura de validación de urgencia.                  |
| EA2-04 | Seleccionar prioridad `Alta` con una justificación válida de 15 o más caracteres                 | El formulario acepta la justificación y registra exactamente una solicitud válida.                                                                 | La solicitud con prioridad alta, justificación válida y descripción correcta fue registrada una sola vez.                                                   | No fue necesaria. | Cumple | Captura de solicitud registrada.                    |
| EA2-05 | Seleccionar prioridad `Media` o `Baja`                                                           | La justificación de urgencia no es obligatoria. El formulario continúa funcionando con la descripción requerida.                                   | El campo de justificación se ocultó para prioridad media y baja y la solicitud pudo registrarse normalmente.                                                | No fue necesaria. | Cumple | Prueba local del formulario.                        |
| EA2-06 | Intentar cambiar el estado con `Ana Demo · usuario`                                              | El cambio es rechazado porque solo el rol `tecnico` puede modificar estados. No se modifica la solicitud ni se agrega auditoría.                   | El sistema mostró que solo el rol técnico puede cambiar estados y la solicitud permaneció en su estado original.                                            | No fue necesaria. | Cumple | Prueba local del selector de actor.                 |
| EA2-07 | Cambiar `Pendiente` a `En proceso` con `Carlos Demo · técnico`                                   | El estado cambia correctamente y se agrega exactamente un registro de auditoría con actor, solicitud, estado anterior y nuevo.                     | SOL-0001 cambió de `Pendiente` a `En proceso` y se registró una auditoría con el cambio correspondiente.                                                    | No fue necesaria. | Cumple | Captura de tabla y auditoría.                       |
| EA2-08 | Intentar cambiar nuevamente `En proceso` a `En proceso`                                          | El cambio se rechaza por ser un estado repetido y no se agrega una nueva auditoría.                                                                | Se mostró `Selecciona un estado diferente al actual` y el historial de auditoría mantuvo un solo registro.                                                  | No fue necesaria. | Cumple | Captura de cambio rechazado.                        |
| EA2-09 | Marcar `Aceptar analítica`, seleccionar un servicio y enviar una solicitud válida                | Se registran únicamente los eventos `select_service` y `submit_request`, guardando solamente `event`, `service_id` y `categoria`.                  | En la consola se comprobaron eventos `select_service` y `submit_request` con `service_id` y `categoria`. No se almacenaron nombre, correo ni descripción.   | No fue necesaria. | Cumple | DevTools Console con `eventosEA2`.                  |
| EA2-10 | Marcar `Rechazar analítica` o no seleccionar ninguna preferencia y utilizar el formulario        | El formulario continúa funcionando y no se agregan eventos nuevos. Los eventos anteriores no se eliminan.                                          | La solicitud se registró normalmente con analítica rechazada o sin decisión, y no se agregaron eventos nuevos. El historial anterior permaneció en memoria. | No fue necesaria. | Cumple | Prueba local y DevTools Console.                    |
| EA2-11 | Probar la interfaz en 320 px, 768 px y 1440 px, zoom 200 %, recorrido con teclado y foco visible | El contenido permanece legible y utilizable, sin desbordamiento horizontal general. El recorrido con teclado mantiene orden lógico y foco visible. | La interfaz permaneció utilizable en 320 px, 768 px y 1440 px y con zoom al 200 %. El recorrido con teclado fue lógico y el foco permaneció visible.        | No fue necesaria. | Cumple | Pruebas responsive y de teclado en Chrome DevTools. |
| EA2-12 | Activar `prefers-reduced-motion: reduce` y realizar un cambio de estado                          | La confirmación visual de `.ea2-actualizada` permanece, pero se elimina el movimiento de la animación.                                             | Al activar movimiento reducido se eliminó la animación de movimiento y la confirmación visual del cambio permaneció visible.                                | No fue necesaria. | Cumple | Chrome DevTools - Rendering.                        |

## Resultado general de la EA2

Los cuatro retos funcionales fueron verificados localmente:

- El catálogo filtra los servicios por categoría sin modificar la fuente original y mantiene los 5 servicios en el selector.
- La prioridad alta exige una justificación de al menos 15 caracteres útiles.
- Solo el rol técnico puede cambiar estados válidos y cada cambio correcto genera una auditoría en memoria.
- La medición registra únicamente `select_service` y `submit_request` cuando la persona acepta analítica.
- El formulario permanece operativo cuando la analítica es rechazada o no existe una decisión.
- No se almacenan datos personales dentro de los eventos de analítica.
- La interfaz fue comprobada en 320 px, 768 px, 1440 px, zoom 200 %, teclado, foco visible y movimiento reducido.

## Versión y despliegue EA2

- Rama de trabajo: `release/ea2`
- Commit final EA2: Pendiente
- Pull Request: Pendiente
- URL de Preview: Pendiente
- SHA de Preview: Pendiente
- Merge a `main`: Pendiente
- URL de Producción: Pendiente
- SHA de Producción: Pendiente

> Los datos de versión y despliegue se completarán después del commit final, Push, Pull Request, Preview, Merge y despliegue de Producción.
