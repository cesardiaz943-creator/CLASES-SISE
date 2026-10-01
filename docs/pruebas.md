# Registro de pruebas

Resultados de las pruebas manuales realizadas por el estudiante.

- Estudiante / equipo: Julio César Castrejón Díaz
- Fecha y navegador: 22/09/2026 — Google Chrome
- Rama: feature/formulario-soporte
- Commit: Pendiente de registrar el commit del formulario
- URL Preview: Pendiente de publicación y comprobación

| ID  | Prueba                                   | Resultado esperado                                       | Resultado observado                                                                                                              | Estado y evidencia                                                        |
| --- | ---------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| R1  | 320 px                                   | Sin scroll horizontal; menú operativo                    | Menú operativo; catálogo en una columna; formulario y controles sin desbordamiento horizontal.                                   | Aprobado y comprobación manual                                            |
| R2  | 768 px                                   | Nav horizontal y Grid adaptado                           | Navegación horizontal, botón Menú oculto y Grid de dos columnas; tarjeta prioritaria ocupa ambas. Formulario sin desbordamiento. | Aprobado y comprobación manual                                            |
| R3  | 1024 px                                  | Contenido centrado y tres columnas con el CSS de la guía | Grid de tres columnas; Red ocupa una y prioritario dos en la primera fila. Formulario sin desbordamiento                         | Aprobado                                                                  |
| R4  | Zoom 200 %                               | Texto y controles utilizables                            | Etiquetas, campos y botón legibles y utilizables al 200 %.                                                                       | Aprobado                                                                  |
| A1  | Tab y Shift+Tab                          | Orden lógico y foco visible                              | Navegación hacia delante y atrás por el formulario con orden lógico y foco visible                                               | Falta documentar el recorrido completo por todos los enlaces de la página |
| A2  | Enter, Espacio y Escape                  | Acciones correctas y cierre del menú                     | Menú abre con Enter y cierra con Escape. El botón del formulario funciona con Enter y Espacio.                                   | Parcial                                                                   |
| A3  | Radios con flechas                       | Selección única de prioridad                             | Las flechas cambian entre Alta, Media y Baja; solo queda una opción marcada.                                                     | Aprobado                                                                  |
| F1  | Campos vacíos                            | No permite confirmar                                     | El navegador bloquea la confirmación y solicita completar Nombre completo.                                                       | Aprobado                                                                  |
| F2  | Nombre de 2 caracteres                   | Se rechaza                                               | El nombre Al se rechaza y se solicitan al menos 3 caracteres.                                                                    | Aprobado                                                                  |
| F3  | Correo usuario@                          | Se rechaza                                               | El navegador rechaza el correo incompleto y solicita corregirlo.                                                                 | Aprobado                                                                  |
| F4  | Sin tipo o prioridad                     | Se solicita completar                                    | Se probaron ambos casos por separado; se exige seleccionar el tipo y la prioridad.                                               | Aprobado                                                                  |
| F5  | Descripción de 9 caracteres y más de 500 | Respeta mínimo y máximo                                  | Se rechazan 9 caracteres y se limita la entrada a 500 caracteres.                                                                | Aprobado                                                                  |
| F6  | Datos ficticios válidos                  | Confirma sin enviar ni guardar                           | Aparece “Validación completada. No se envió ni guardó ningún ticket.” El mensaje desaparece al modificar un campo.               | Aprobado                                                                  |
| P1  | Preview del PR                           | Accesible al revisor y mismo commit                      | Pendiente de publicar y comprobar el Preview del formulario.                                                                     | Pendiente.                                                                |

Datos de prueba: Ana Prueba, ana@example.test, Red, Media y "No funciona la conexión de prueba".

## Correcciones

No se reportaron fallos en las pruebas del formulario.

Observación del entorno local: la consola mostró un error 404 al solicitar
favicon.ico. No impidió las pruebas del catálogo ni del formulario.
