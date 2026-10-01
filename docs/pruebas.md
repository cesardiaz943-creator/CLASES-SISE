# Registro de pruebas - Evaluación Parcial

Resultados de las pruebas manuales realizadas sobre el Portal de Soporte TI de Nova Servicios.

- Estudiante: Julio César Castrejón Díaz
- Fecha: 30/09/2026
- Navegador: Google Chrome
- Rama: feature/parcial-portal
- URL Preview: Pendiente de publicación
- Commit final: Pendiente

| ID  | Prueba                 | Resultado esperado                                      | Resultado observado                                                                                                   | Estado                                                                                   |
| --- | ---------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------ |
| P01 | Responsive 320 px      | Sin scroll horizontal y contenido utilizable            | Portal y tabla de estados visibles en 320 px sin desbordamiento general                                               | Cumple                                                                                   |
|     | P02                    | Responsive 768 px                                       | Diseño adaptado a tablet                                                                                              | Tabla de estados completa, FAQ en dos columnas y contenido sin desbordamiento horizontal | Cumple |
| P03 | Responsive 1440 px     | Distribución correcta en escritorio                     | Contenido centrado, tabla completa y distribución legible en escritorio                                               | Cumple                                                                                   |
| P04 | Formulario inválido    | La validación nativa impide confirmar datos incorrectos | El navegador bloquea el envío y muestra los mensajes de validación correspondientes                                   | Cumple                                                                                   |
| P05 | Formulario válido      | Muestra confirmación de simulación                      | El formulario acepta los datos válidos y muestra el mensaje de confirmación sin guardar información                   | Cumple                                                                                   |
| P06 | Navegación por teclado | Tab y Shift+Tab recorren controles con foco visible     | El recorrido con Tab y Shift+Tab mantiene un orden lógico y el foco es visible en los elementos interactivos          | Cumple                                                                                   |
| P07 | Zoom 200 %             | El contenido permanece utilizable                       | Al 200 % el contenido, formulario, navegación y controles continúan visibles y utilizables sin pérdida de información | Cumple                                                                                   |
| P08 | Preview accesible      | La URL carga correctamente en navegador privado         | El Preview carga correctamente en una ventana privada y muestra la versión actual del portal                          | Cumple                                                                                   |

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
