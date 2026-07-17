## Plan: rehacer las 3 fotos de "Cómo funciona"

**Enfoque:** misma protagonista en los 3 pasos, pero con luz de día nublado difuso, poses menos escenificadas y estética documental (nada de moody, contraluz, golden hour ni claroscuro).

### Dirección visual común

- **Luz**: día nublado, ventana grande sin sol directo, sombras muy suaves, balance blancos ~5500K, tonos fríos-neutros (paleta seleccionada `#E8ECEF / #C9D1D4 / #8A9299 / #4A5157`).
- **Cámara**: 35mm equivalente, ISO bajo, apertura media (f/4-5.6, no bokeh cremoso), grano fino y natural.
- **Sujeto**: misma mujer española 40-45 años, pelo recogido, ropa neutra (puede variar prenda entre fotos pero mantener registro sobrio y realista, sin jersey negro monocorde en las 3).
- **Prohibido**: contraluz, siluetas, sombras marcadas, tonos naranjas/dorados, filtros Instagram, poses "banco de imágenes premium", miradas perdidas al vacío.

### Foto por paso

1. **`src/assets/step-form.jpg` — Cuéntanos tu situación**
   - Mesa de comedor con luz de ventana lateral difusa. Ella rellenando el formulario en el móvil (o portátil) con una expresión concentrada normal, ligeramente inclinada. Sobre la mesa: taza, un par de cartas abiertas, bolígrafo. Encuadre medio, algo de aire arriba.
2. **`src/assets/step-strategy.jpg` — Diseñamos tu estrategia legal**
   - Despacho luminoso (paredes claras, sin librería oscura de fondo). Un abogado 45-55a, camisa clara, revisando documentos con ella. Interacción activa: él señala un párrafo, ella asiente. Mesa clara con carpetas. Luz plana de ventanal.
3. **`src/assets/step-freedom.jpg` — Recuperas tu calma**
   - Ella en un espacio cotidiano diurno (cocina abierta o salón claro), sonrisa contenida y natural mientras hace algo mundano: cerrar una carpeta y guardarla, servir café, mirar por la ventana pero con luz plana no dramática. Nada de "melancolía junto al cristal".

### Implementación

1. Regenerar las 3 imágenes con `google/gemini-3.1-flash-image` (o `gemini-3-pro-image` si la calidad no llega) usando prompts derivados de la dirección anterior con las prohibiciones explícitas.
2. Descargar, redimensionar a **1600px de ancho** y comprimir a **JPEG calidad 82** (mismo formato que las actuales).
3. Sustituir los tres archivos en `src/assets/` manteniendo los mismos nombres (`step-form.jpg`, `step-strategy.jpg`, `step-freedom.jpg`) — no hay que tocar imports ni componentes.
4. Revisar visualmente las 3 con `code--view` antes de dar por bueno el resultado; regenerar la que no cumpla los criterios.

### Fuera de alcance

No se toca `HowItWorks.tsx`, ni copy, ni layout. Sólo sustitución de los tres binarios.