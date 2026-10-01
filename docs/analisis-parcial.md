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

Representa a la persona que crea o gestiona solicitudes dentro del sistema.

Atributos principales:

- id
- nombre
- correo
- rol
- activo

El rol permite diferenciar entre solicitantes y técnicos.

### Servicio

Representa los tipos de soporte disponibles dentro del catálogo.

Atributos principales:

- id
- nombre
- descripción
- categoría
- activo

### Solicitud

Representa una incidencia reportada por un usuario.

Atributos principales:

- id
- título
- descripción
- prioridad
- estado
- fecha_creación
- fecha_actualización

Cada solicitud pertenece a un usuario y está asociada a un servicio.

### Actualización

Representa cada cambio de estado o comentario realizado durante la atención de una solicitud.

Atributos principales:

- id
- solicitud_id
- usuario_id
- estado_anterior
- estado_nuevo
- comentario
- fecha

### Auditoría

Representa la trazabilidad de las acciones realizadas dentro del sistema.

Atributos principales:

- id
- usuario_id
- acción
- entidad
- entidad_id
- fecha
- detalle_json

La auditoría permite registrar quién realizó una acción, qué acción realizó, cuándo ocurrió y sobre qué elemento del sistema.

## 6. Claves primarias y foráneas

### Usuario

**Clave primaria (PK):**

- usuario_id

No posee claves foráneas.

### Servicio

**Clave primaria (PK):**

- servicio_id

No posee claves foráneas.

### Solicitud

**Clave primaria (PK):**

- solicitud_id

**Claves foráneas (FK):**

- usuario_id → Usuario
- servicio_id → Servicio

Estas claves permiten identificar qué usuario creó la solicitud y qué tipo de servicio necesita.

### Actualización

**Clave primaria (PK):**

- actualizacion_id

**Claves foráneas (FK):**

- solicitud_id → Solicitud
- usuario_id → Usuario

Estas claves permiten identificar la solicitud modificada y el usuario responsable de realizar la actualización.

### Auditoría

**Clave primaria (PK):**

- auditoria_id

**Clave foránea (FK):**

- usuario_id → Usuario

Permite identificar al usuario que realizó cada acción registrada en la auditoría.

## 7. Cardinalidades del modelo

### Usuario (1) → (N) Solicitud

Un usuario puede crear muchas solicitudes.

Cada solicitud pertenece a un único usuario.

### Servicio (1) → (N) Solicitud

Un servicio puede estar asociado a muchas solicitudes.

Cada solicitud corresponde a un tipo de servicio.

### Solicitud (1) → (N) Actualización

Una solicitud puede tener muchas actualizaciones durante su ciclo de vida.

Cada actualización pertenece a una única solicitud.

### Usuario (1) → (N) Auditoría

Un usuario puede generar varios registros de auditoría.

Cada registro de auditoría está asociado al usuario que realizó la acción.

## 8. Estados y reglas de negocio

Los estados considerados para una solicitud son:

- Pendiente.
- En proceso.
- Resuelto.
- Cerrado.
- Cancelado.

### Regla para cambios de estado

Solo un usuario cuyo rol sea técnico puede cambiar el estado de una solicitud.

Cuando se realiza un cambio de estado deben generarse dos registros:

1. Un registro en Actualización.
2. Un registro en Auditoría.

De esta manera se conserva la trazabilidad de los cambios realizados sobre cada solicitud.

### Regla de auditoría

La auditoría debe registrar las acciones relevantes realizadas dentro del sistema.

Cada registro debe permitir identificar:

- Quién realizó la acción.
- Qué acción se realizó.
- Sobre qué entidad se realizó.
- Cuándo ocurrió.
- Información adicional relacionada con el cambio.

Esto permite reconstruir posteriormente el historial de una solicitud y determinar quién realizó cada modificación.

## 9. Caso de análisis - Solicitudes duplicadas 1001 y 1005

Las solicitudes 1001 y 1005 corresponden al mismo incidente enviado dos veces por Ana R. debido a que no recibió confirmación después del primer envío.

Para identificar un posible duplicado se pueden comparar los siguientes datos:

- usuario_id
- fecha_creación
- descripción

Si dos solicitudes pertenecen al mismo usuario, tienen una descripción igual o muy similar y fueron creadas en fechas cercanas, pueden identificarse como posibles duplicados.

El registro de auditoría permite conservar evidencia de las acciones realizadas posteriormente sobre estas solicitudes y mantener la trazabilidad del proceso.

Sin un mecanismo de trazabilidad sería más difícil determinar qué ocurrió con cada solicitud y por qué existen dos registros similares.

## 10. Caso de análisis - Cambio de prioridad de la solicitud 1002

La solicitud 1002 tenía originalmente prioridad **Media**.

Posteriormente su prioridad fue modificada a **Alta** sin que el solicitante hubiera pedido ese cambio.

Sin un registro de auditoría sería difícil identificar quién realizó la modificación y en qué momento ocurrió.

Según el caso presentado en la guía, la auditoría registra los siguientes datos:

- auditoria_id: 5004
- usuario_id: 9
- acción: CAMBIO_PRIORIDAD
- fecha: 2026-09-30 14:32

Con esta información es posible identificar al usuario responsable de la modificación, la acción realizada y el momento exacto en que ocurrió.

El registro de auditoría permite investigar el cambio no autorizado y conservar evidencia de lo sucedido.

## 11. Importancia de la trazabilidad

La trazabilidad permite reconstruir el ciclo de vida de una solicitud desde su creación hasta su cierre.

Sin trazabilidad pueden presentarse problemas como:

- Conflictos difíciles de resolver.
- Pérdida de confianza.
- Dificultad para detectar errores.
- Falta de responsabilidad sobre los cambios realizados.
- Imposibilidad de reconstruir el historial de una solicitud.

Con un sistema de auditoría es posible:

- Identificar quién realizó cada acción.
- Detectar patrones o modificaciones incorrectas.
- Analizar problemas ocurridos durante el proceso.
- Mantener evidencia de los cambios.
- Mejorar continuamente el proceso de soporte.
