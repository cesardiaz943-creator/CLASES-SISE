# Análisis del Parcial - Portal de Soporte TI

## 1. Análisis del brief en cinco dimensiones

### Usuario

El portal está dirigido al personal interno de Nova Servicios, principalmente empleados no técnicos que necesitan solicitar soporte desde computadoras o dispositivos móviles.

### Problema

Actualmente las incidencias de soporte pueden llegar por distintos medios y no siempre cuentan con prioridad, seguimiento o información clara. El portal busca facilitar el registro y consulta de solicitudes de soporte.

### Contenido

El portal debe mostrar el nombre de Nova Servicios, servicios de soporte disponibles, formulario de incidencia, estados ficticios de solicitudes, preguntas frecuentes y datos de contacto.

### Acciones

El usuario puede consultar los servicios disponibles, acceder al formulario de soporte, completar una solicitud simulada, consultar estados ficticios y revisar preguntas frecuentes y datos de contacto.

### Restricciones

El proyecto utiliza HTML y CSS propios, sin frameworks. No incluye backend, autenticación ni base de datos real. El formulario solamente simula el proceso y no guarda información.

## 2. Historias de usuario

### HU-01 - Consultar servicios

Como empleado de Nova Servicios, quiero consultar los servicios TI disponibles para identificar qué tipo de soporte necesito.

**Criterio de aceptación:** El portal muestra 4 tarjetas de servicio, cada una con título, descripción y enlace al formulario.

### HU-02 - Registrar una incidencia

Como empleado de Nova Servicios, quiero completar un formulario de soporte para describir el problema que estoy presentando.

**Criterio de aceptación:** El formulario contiene nombre, correo, tipo de incidencia, prioridad y descripción, con validación nativa y confirmación simulada.

### HU-03 - Usar el portal desde el celular

Como empleado de Nova Servicios, quiero utilizar el portal desde un dispositivo móvil para solicitar soporte desde cualquier lugar.

**Criterio de aceptación:** El portal funciona correctamente en 320 px sin scroll horizontal ni superposición de contenido.

### HU-04 - Acceder rápidamente al formulario

Como empleado de Nova Servicios, quiero llegar rápidamente al formulario para no perder tiempo buscando dónde registrar mi incidencia.

**Criterio de aceptación:** El formulario puede alcanzarse desde el inicio en un máximo de 2 clics.

### HU-05 - Navegar con teclado

Como usuario que utiliza navegación por teclado, quiero recorrer todos los controles del portal sin usar el mouse.

**Criterio de aceptación:** Tab y Shift+Tab permiten recorrer los controles en orden lógico y el foco permanece visible.

## 3. Priorización MoSCoW

### Must Have - Obligatorio

- Navegación responsive con Flexbox.
- Catálogo de 4 servicios utilizando CSS Grid.
- Formulario con 5 campos y validación nativa.
- Accesibilidad mediante labels, fieldset, legend y foco visible.
- Diseño responsive funcional en 320 px, 768 px y 1440 px.

### Should Have - Importante

- Sección estática de estado de solicitudes.
- Preguntas frecuentes organizadas en 2 categorías.
- Sección de contacto con horario ficticio.

### Could Have - Deseable

- Efectos visuales sencillos en las tarjetas mediante CSS.
- Mejoras visuales adicionales que no afecten la accesibilidad ni el diseño responsive.

### Won't Have - Fuera de alcance

- Backend.
- Base de datos real.
- Autenticación o inicio de sesión.
- JavaScript nuevo adicional a `ui.js`.

## 4. Wireframe de seis zonas

### Zona 1 - Header y navegación

Incluye el nombre de Nova Servicios y los enlaces principales del portal: Inicio, Servicios, Solicitar soporte, Estado, Preguntas frecuentes y Contacto.

### Zona 2 - Hero

Contiene el título principal del portal, una breve descripción del servicio y el botón "Solicitar soporte", que lleva directamente al formulario.

### Zona 3 - Catálogo de servicios

Presenta 4 tarjetas de servicio organizadas mediante CSS Grid. Cada tarjeta incluye título, descripción y enlace al formulario.

### Zona 4 - Formulario de soporte

Incluye los campos de nombre, correo, tipo de incidencia, prioridad y descripción. Utiliza labels, fieldset, legend y validación nativa.

### Zona 5 - Estado de solicitudes

Muestra una tabla estática con solicitudes ficticias, indicando número de solicitud, servicio, prioridad y estado.

### Zona 6 - Preguntas frecuentes, contacto y footer

Incluye las preguntas frecuentes organizadas en dos categorías, los datos ficticios de contacto, el horario de atención y el pie de página.

## 5. Modelo conceptual de datos

### Usuario

Representa a la persona que utiliza el portal para crear o gestionar solicitudes de soporte.

Atributos principales:

- Nombre
- Correo
- Rol
- Estado activo

### Servicio

Representa los tipos de soporte disponibles dentro del portal.

Atributos principales:

- Nombre
- Descripción
- Categoría
- Estado activo

### Solicitud

Representa una incidencia reportada por un usuario.

Atributos principales:

- Título
- Descripción
- Prioridad
- Estado
- Fecha de creación
- Fecha de actualización

### Actualización

Representa los cambios o comentarios realizados durante la atención de una solicitud.

Atributos principales:

- Estado anterior
- Estado nuevo
- Comentario
- Fecha

### Auditoría

Representa el registro de las acciones realizadas dentro del sistema.

Atributos principales:

- Acción
- Entidad afectada
- Fecha
- Detalle
