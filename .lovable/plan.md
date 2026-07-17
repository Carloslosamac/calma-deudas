Tienes razón — borrarlos tira tráfico SEO potencial. Los arreglamos en sitio.

## Los 5 posts a corregir

1. **Typo "trabajdores"** → "trabajadores" (fix directo en `content` y `seo_title`/`title` si aplica).
2. **"Diego C. ... con Soluciona Mi Deuda"** → quitar mención de competidor. Reescribir mención a "con Calma" o simplemente sin marca ("consigue cancelar…").
3. **"Manuel cancela … con el asesoramiento de Soluciona Mi Deuda"** → misma limpieza.
4. **"Soluciona Mi Deuda recibe una subvención…"** → este es un post *sobre* el competidor, no es reciclable. Aquí sí procede descartar (o reescribirlo como pieza genérica del sector sin nombrar competidor). Propongo **descartar este solo**.
5. **"…precio de los alimentos se ralentizará en 2024"** → actualizar a 2026 y revisar el resto del cuerpo por referencias temporales obsoletas.

## Cómo se ejecuta

- **Revertir el DELETE anterior**: los 5 posts ya fueron borrados de `generated_posts` y su roadmap marcado `descartado_calidad`. Hay que:
  - Restaurar 4 de los 5 desde el historial (los tengo en el resultado del query previo, con `content`, `title`, `seo_title`, `slug`, etc.).
  - Reinsertarlos en `generated_posts` con las correcciones aplicadas.
  - Volver a poner sus `seo_roadmap` a `estado = 'publicado'` (o el estado que tenían).
  - Dejar solo el post #4 (subvención a competidor) como `descartado_calidad`.

- **Fixes aplicados al reinsertar**:
  - `sanitizeTitle` + `sanitizeContent` para quitar "Soluciona Mi Deuda" (añadir a la lista de marcas prohibidas en `generate-daily-posts/index.ts` — hoy no está).
  - Sustituir "trabajdores" → "trabajadores".
  - Sustituir "2024" → "2026" en el post de inflación, revisando frases circundantes.

- **Prevención futura**: añadir "Soluciona Mi Deuda" a la lista `sanitizeTitle` del edge function `generate-daily-posts` para que futuras generaciones no lo dejen pasar.

## Migración

Una sola migración SQL con:
```sql
-- Restaurar 4 posts corregidos
INSERT INTO generated_posts (...) VALUES (...), (...), (...), (...);
-- Reactivar sus roadmap
UPDATE seo_roadmap SET estado = 'publicado' WHERE id IN (...);
-- Dejar el post de "subvención al competidor" descartado (ya está)
```

Y una edición a `supabase/functions/generate-daily-posts/index.ts` añadiendo "Soluciona Mi Deuda" al `sanitizeTitle`/`sanitizeContent`.

## Antes de ejecutar

Necesito volver a consultar `generated_posts` — pero ya están borrados. ¿Los tengo en algún backup? Opciones:

- **A.** Consulto `seo_roadmap` para recuperar títulos/temas de los 4 y **regenero el contenido desde cero** con el pipeline actual (limpio, sin typos ni competidor). Es lo más limpio.
- **B.** Intento reconstruir manualmente desde memoria/logs (frágil).

Recomiendo **A**: reactivo los 4 roadmap rows a `pendiente`, y el cron los republica limpios en las próximas tandas (o los fuerzo con un run manual).

¿Voy con la opción A (regenerar limpios desde el roadmap) o prefieres la B (reconstrucción manual del contenido antiguo)?
