# Portal de Soporte TI - Nova Servicios

Portal web estático y responsive desarrollado para Nova Servicios como parte de la Evaluación Parcial del curso Desarrollo de Entornos Web.

El portal permite consultar servicios de soporte TI, completar una solicitud simulada, visualizar estados ficticios de solicitudes, revisar preguntas frecuentes y consultar información de contacto.

El formulario no envía ni almacena información. Todo el proceso es una simulación.

## Autor

Julio César Castrejón Díaz

Curso: Desarrollo de Entornos Web  
Proyecto: Evaluación Parcial - Portal de Soporte TI

## Funcionalidades

- Navegación responsive.
- Presentación de Nova Servicios.
- Acceso directo al formulario de soporte.
- Catálogo de 4 servicios TI.
- Formulario de incidencia con validación nativa.
- Selección única de prioridad.
- Confirmación simulada del formulario.
- Tabla de estados ficticios de solicitudes.
- 5 preguntas frecuentes organizadas en 2 categorías.
- Información de contacto con horario ficticio.
- Navegación mediante teclado con foco visible.
- Diseño responsive para 320 px, 768 px y 1440 px.
- Compatibilidad con zoom al 200 %.

## Tecnologías utilizadas

- HTML5.
- CSS3.
- Flexbox.
- CSS Grid.
- JavaScript proporcionado mediante `ui.js`.
- Git y GitHub.
- Node.js para el servidor local.
- Vercel para el Preview del proyecto.

No se utilizan frameworks, backend, autenticación ni base de datos real.

## Ejecución local

Se requiere tener instalado Node.js, Git y Visual Studio Code.

Desde la carpeta raíz del proyecto ejecutar:

```bash
npm ci
npm run dev
```

## Preguntas de inicio

### ¿Qué partes del portal repiten información de los servicios?

El catálogo de servicios y el selector del formulario repiten información sobre los servicios disponibles. Por eso la guía propone usar una sola fuente JSON para que ambos se actualicen con los mismos datos.

### ¿Cómo se relaciona servicio_id con el modelo de la semana 4?

servicio_id identifica el servicio elegido dentro de una solicitud. Se relaciona con el id de cada servicio y permite asociar una solicitud con un servicio específico.

### ¿Qué diferencia existe entre validar un formulario, simular una solicitud y guardarla en una base de datos?

Validar un formulario significa comprobar que los datos ingresados sean correctos. Simular una solicitud significa procesarla solo de manera temporal dentro de la página. Guardarla en una base de datos significa almacenarla de forma persistente para que no se pierda al recargar.

## Actividad de comprensión - Fuente única de servicios

### Recorrido de los datos

Los servicios se almacenan en el archivo JSON. La función cargarServicios obtiene esos datos, luego crearTarjeta genera las tarjetas del catálogo y también se crean las opciones del selector. Finalmente, estos elementos se incorporan al DOM de la página.

JSON → cargarServicios → crearTarjeta y opciones → DOM

### ¿Por qué una coma final rompe JSON?

JSON utiliza una sintaxis estricta. No permite colocar una coma después de la última propiedad de un objeto ni después del último elemento de un arreglo, porque el archivo deja de ser un JSON válido.

### ¿Por qué cargar con fetch requiere un servidor?

fetch carga recursos mediante HTTP. Por eso el proyecto debe ejecutarse desde un servidor local, como el que iniciamos con npm run dev, y no directamente mediante file://.

## Punto de control - Sesión 9

### querySelector

Se usa para seleccionar un elemento del DOM. Por ejemplo:
`const catalogo = document.querySelector('#catalogo');`

### createElement

Se usa para crear nuevos elementos HTML desde JavaScript. Por ejemplo:
`const tarjeta = document.createElement('article');`

### textContent

Se usa para colocar texto de forma segura dentro de un elemento. Por ejemplo:
`titulo.textContent = s.nombre;`

### classList

Se usa para agregar o modificar clases CSS de un elemento. Por ejemplo:
`tarjeta.classList.add('service-card');`

## Limitación de las solicitudes en memoria

Las solicitudes de práctica se almacenan únicamente en memoria mientras la página permanece abierta. Al recargar el navegador, la lista de solicitudes se elimina y la numeración vuelve a comenzar desde SOL-0001.
