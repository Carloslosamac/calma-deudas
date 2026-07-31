## Problema

PageSpeed (94/98) marca fallida la auditoría "Form elements must have labels": el `<input type="range">` del asistente del formulario (`src/components/FormSection.tsx`, paso de importes) no tiene nombre accesible. Es el único elemento reportado.

## Cambio

En `renderSliderStep` de `src/components/FormSection.tsx`:

- Añadir al `<input type="range">`:
  - `aria-label={title}` (ej. "¿Cuánto debes en total?"), así cada paso del slider hereda su pregunta.
  - `aria-valuetext={eur(displayValue)}` para que el lector/agente anuncie "14.000 €" en vez de "14000".
  - `id` único por paso (`slider-${valueKey}`) para evitar duplicados.

Solo presentación/accesibilidad: no cambia lógica, estilos ni valores.

## Verificación

Ejecutar axe (o Lighthouse) sobre la home en el preview y confirmar que la auditoría de labels pasa; el resto de puntuación no debería moverse.
