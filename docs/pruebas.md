## Pruebas - Guía de aprendizaje 5

- Fecha: 11/10/2026
- Navegador: Google Chrome
- Rama: feature/catalogo-dinamico
- Entorno: Servidor local con npm run dev
- URL local: http://127.0.0.1:5500
- SHA probado: 187c59c
- Anchos de prueba: 320 px, 768 px y 1440 px; zoom 200 %

| ID  | Acción                                    | Resultado esperado                                            | Resultado real                                                                                                                                           | Corrección                                                 | Estado       | Evidencia                         |
| --- | ----------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------ | --------------------------------- | --- |
| D1  | Cargar el portal por HTTP                 | Cuatro servicios en catálogo y selector; sin errores JS.      | El portal cargó correctamente por HTTP y el catálogo se generó desde servicios.json.                                                                     | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |
| D2  | Agregar quinto servicio solo en JSON      | Tarjeta y opción nuevas, sin editar HTML.                     | Se agregó el quinto servicio únicamente en servicios.json y apareció en el catálogo y selector.                                                          | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |
| D3  | Renombrar JSON y luego restaurarlo        | Error comprensible; registro bloqueado; carga se recupera.    | Al renombrar servicios.json se mostró el mensaje de error y al restaurarlo volvió a cargar correctamente.                                                | Se restauró el nombre servicios.json después de la prueba. | Cumple       | Pendiente de adjuntar captura.    |
| D4  | Usar JSON inválido o id duplicado         | Contrato rechazado y mensaje de carga fallida.                | Al duplicar el id 4, el catálogo fue rechazado y se mostró el mensaje de carga fallida. Al restaurar el id 5, la carga volvió a funcionar correctamente. | Se restauró el id original del quinto servicio.            | Cumple       | Pendiente de adjuntar captura.    |     |
| D5  | Nombre con cadena HTML de prueba          | Texto literal, sin ejecución ni nodos inyectados.             | La cadena `<img src=x onerror=alert(1)>` apareció como texto literal y no ejecutó ninguna alerta.                                                        | Se restauró el nombre original después de la prueba.       | Cumple       | Pendiente de adjuntar captura.    |
| F1  | Enviar vacío y con servicio sin elegir    | Errores asociados y foco en primer control inválido.          | Se mostraron los errores y el foco pasó al campo Nombre completo.                                                                                        | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |
| F2  | Correo ana@ y descripción de 4 caracteres | Errores de formato y longitud; ninguna fila agregada.         | Se mostraron los errores de correo y descripción y no se registró ninguna solicitud.                                                                     | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |
| F3  | Descripción con 10 espacios               | Rechazo por texto útil insuficiente.                          | La descripción formada solo por espacios fue rechazada.                                                                                                  | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |
| F4  | No elegir prioridad; corregir campos      | Mensaje del grupo; errores se limpian al corregir.            | Al enviar sin prioridad apareció el mensaje "Selecciona una prioridad". Al seleccionar una prioridad, el mensaje desapareció.                            | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |
| F5  | Enviar válido y repetir durante la espera | Estado de proceso y confirmación; una fila; botón recuperado. | Los intentos repetidos durante el procesamiento generaron una sola fila y el botón volvió a habilitarse.                                                 | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |
| A1  | Abrir ayuda con Enter y Espacio; usar Esc | Panel y aria-expanded sincronizados; foco vuelve al botón.    | El panel abrió con teclado, cerró con Escape y el foco volvió al botón de ayuda.                                                                         | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |
| A2  | Completar recorrido solo con teclado      | Orden lógico, foco visible y ningún bloqueo.                  | El recorrido con Tab y Shift+Tab mantuvo un orden lógico, el foco fue visible y no se produjo ningún bloqueo de teclado.                                 | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |     |
| A3  | Activar reduced motion                    | Movimiento reducido; contenido y confirmación visibles.       | Al emular prefers-reduced-motion: reduce, las animaciones y transiciones se redujeron y el contenido continuó visible y utilizable.                      | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |     |
| A4  | Probar lector de pantalla                 | Campos identificados; errores y estado se anuncian.           | No ejecutada.                                                                                                                                            | No se realizó la prueba con lector de pantalla.            | No ejecutada | Pendiente.                        |     |
| R1  | Probar 320, 768 y 1440 px y zoom 200 %    | Contenido legible; página sin desbordamiento horizontal.      | El portal se mantuvo legible y utilizable en 320 px, 768 px, 1440 px y con zoom al 200 %, sin desbordamiento horizontal general.                         | No fue necesaria.                                          | Cumple       | Pendiente de adjuntar captura.    |     |
| P1  | Abrir Preview del commit entregado        | JSON y scripts cargan; recorrido funcional completo.          | El Preview cargó correctamente los 5 servicios desde JSON, el panel de ayuda funcionó y se registró SOL-0001 en la tabla de solicitudes.                 | No fue necesaria.                                          | Cumple       | Capturas del Preview funcionando. |

## Pruebas del reto individual

| ID  | Acción                                                               | Resultado esperado                                                              | Resultado real                                                                               | Corrección        | Estado | Evidencia |
| --- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------- | ------ | --------- |
| S1  | Enviar dos solicitudes válidas con servicios y prioridades distintos | Se generan SOL-0001 y SOL-0002 y aparecen dos filas con los datos correctos.    | Se generaron SOL-0001 y SOL-0002 con servicio, prioridad y estado correspondientes.          | No fue necesaria. | Cumple |           |
| S2  | Intentar varios envíos mientras una solicitud está procesándose      | Se agrega una sola fila y el botón vuelve a habilitarse al finalizar.           | Solo se agregó una fila durante los intentos repetidos y el botón volvió a habilitarse.      | No fue necesaria. | Cumple |           |
| S3  | Recargar la página después de registrar solicitudes                  | La tabla queda vacía y la siguiente solicitud vuelve a comenzar desde SOL-0001. | Al recargar desaparecieron las solicitudes y la numeración volvió a comenzar desde SOL-0001. | No fue necesaria. | Cumple |           |

## Correcciones realizadas

### Corrección 1 - Tabla de estados en 320 px

**Problema detectado:**  
En la vista de 320 px la tabla de estados comprimía demasiado el contenido y la palabra "Pendiente" se dividía de forma incorrecta.

**Corrección aplicada:**  
Se ajustaron el tamaño de fuente, el espaciado de las celdas y las reglas de corte de palabras dentro de la media query para dispositivos pequeños.

**Resultado:**  
Las cuatro columnas de la tabla permanecen visibles y los estados se muestran de forma más legible en 320 px.

**Evidencia:**  
Captura antes y después de la corrección.

### Corrección 2 - Catálogo de servicios en 1440 px

**Problema detectado:**  
En la vista de 1440 px, la tarjeta "Soporte prioritario" ocupaba dos columnas y provocaba que la tarjeta "Soporte de software" bajara a una segunda fila.

**Código anterior:**

```css
@media (min-width: 768px) {
  .service-card--featured {
    grid-column: span 2;
  }
}
```
