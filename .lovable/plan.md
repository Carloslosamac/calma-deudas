## Objetivo

Bajar el peso de la web de ~154 MB de assets a unos pocos MB y arreglar los avisos de PageSpeed (LCP, CLS, "serve images in next-gen formats", "properly size images").

## Fase completa

### 1. Compresión y redimensionado masivo de `src/assets` (~150 archivos)
- Procesar todas las imágenes con `sharp` desde un script puntual en el sandbox:
  - Testimoniales / avatares → 256 px de lado, WebP calidad 78.
  - Imágenes de pasos "Cómo funciona" y secciones → máx. 1200 px de ancho, WebP calidad 80.
  - Portadas de `src/assets/casos/` (76 archivos, 120 MB) → máx. 1280 px, WebP calidad 78.
  - Logo `calma-logo.png` (806 KB, 1694x608) → PNG/WebP a 340x122 real de uso.
- Se eliminan los originales pesados y se dejan solo las versiones optimizadas, manteniendo el mismo nombre de import donde sea posible para no tocar cientos de call sites.

### 2. Migrar los assets grandes al CDN
- Todo lo que quede por encima de ~100 KB tras comprimir (principalmente `casos/`) pasa a `.asset.json` servido desde el CDN de Lovable, para que no viaje en el bundle ni en el repo.
- Se reescriben los imports afectados a `import x from "...asset.json"` + `x.url`.

### 3. `vite-imagetools` + formatos modernos
- Añadir el plugin y usar variantes AVIF/WebP en las imágenes de la home, con `<picture>` donde el ahorro lo justifique.

### 4. Dimensiones explícitas y prioridad de carga
- `HeroSection`: `width`/`height` explícitos, `fetchpriority="high"`, sin `lazy`, y `<link rel="preload">` de la imagen LCP en `index.html`.
- `TestimonialsSection` y `HowItWorks`: `width`/`height` en cada `img`, `loading="lazy"`, `decoding="async"` — elimina el CLS.
- Revisar el resto de componentes de la home con imágenes para el mismo tratamiento.

### 5. Verificación
- `bun run build` y comprobación del tamaño del bundle antes/después.
- Captura con Playwright de la home para confirmar que ninguna imagen se rompe ni cambia de encuadre.
- Reporte final: MB eliminados, peso de la home antes/después.

### 6. Aparte: arreglar el parseo JSON del cron
- Leer los logs de diagnóstico ya desplegados de `generate-daily-posts` (`finish_reason` + inicio/fin de la respuesta) y cerrar el fallo de parseo con `gemini-3.6-flash` (probablemente respuesta truncada o envuelta en texto → aplicar el mismo `extractFirstJsonObject` y subir `max_tokens`).

## Notas técnicas

- El procesado de imágenes se hace en el sandbox, no añade dependencias de runtime.
- La migración a CDN es reversible revirtiendo el commit; los `.asset.json` quedan versionados.
- No se toca contenido, copy ni lógica de negocio.
