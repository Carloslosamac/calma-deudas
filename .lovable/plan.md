# Plan: Fotos hiper-realistas + arreglo de build

## 1. Arreglar el build (bloqueante)
En `src/data/seo/content/deudasHacienda.tsx` hay un `],` duplicado en la línea 76 (sobra un cierre del array `testimonials`). Eliminar esa línea para que el build vuelva a compilar.

## 2. Regenerar las 90 fotos con realismo extremo
Las fotos actuales "huelen a IA" (piel demasiado lisa, ojos perfectos, look render). Vamos a regenerar las 6 fotos por tema (15 temas = 90 imágenes) en `src/assets/casos/` manteniendo los mismos nombres de archivo, así no hay que tocar ningún import ni componente.

### Modelo
Usar el tier **`premium.gemini`** (Nano Banana 2 / Gemini image) en la herramienta `generate_image`, que es el mejor para retratos foto-realistas y texturas de piel reales. Si algún resultado sigue pareciendo render, reintentar ese caso concreto con `premium.gpt`.

### Estilo de prompt (clave para que no parezca IA)
Cada prompt buscará:
- **Gente española real y corriente** (no modelos): distintos rangos de edad (25–65), hombres y mujeres, complexiones y rasgos variados, peinados normales, ropa de calle.
- **Estética selfie/foto de móvil amateur**: luz natural imperfecta, ligera textura de grano, poros y arruguitas visibles, imperfecciones de piel, encuadre casual, fondos cotidianos (cocina, salón, calle, coche).
- **Anti-IA explícito**: pedir "no airbrushing, realistic skin pores and blemishes, candid amateur smartphone photo, natural uneven lighting" y evitar simetría perfecta, dientes perfectos y bokeh de estudio.
- **Expresión** acorde al alivio/tranquilidad de cada testimonio.
- Diversidad entre los 6 casos de un mismo tema (edades/sexos distintos) para no repetir caras.

### Cobertura (15 temas)
revolving, lso, cancelar, microcreditos, asnef, embargo, reunificar, reunificacion, cancelacion, hacienda — y los temas restantes que ya tienen sus archivos. Se mantienen exactamente los mismos 90 nombres de archivo.

## 3. Verificación
- Confirmar que el build compila tras el fix.
- Revisar una muestra (zoom) de varias caras nuevas para validar que el realismo es convincente antes de dar por terminado.

## Notas técnicas
- No se modifica ningún `.tsx` de contenido salvo el fix puntual de `deudasHacienda.tsx`.
- Las imágenes se sobrescriben en sitio (`overwrite`), preservando rutas `@/assets/casos/<tema>-<n>.jpg`.
