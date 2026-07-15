## Qué ha pasado (diagnóstico honesto)

Tienes razón, y lo siento. Hay contenido publicado que menciona literalmente a competidores (sobre todo "Soluciona Mi Deuda"). Ejemplos actuales en BD:

- `soluciona-mi-deuda-recibe-subvencion-fondo-social-europeo-plus` — 5 jul
- `manuel-cancela-su-deuda-0-euros-recupera-2-807` — 15 jul
- `diego-c-liquida-sus-deudas-microcreditos-recupera-dinero-soluciona` — 15 jul

**Causa raíz** (no es que yo lo haya "decidido" así — es un bug que arrastramos):

1. `seo_roadmap` se sembró importando SERPs de competidores. Muchas filas guardan el título tal cual, incluyendo la marca del competidor dentro (no solo como sufijo).
2. `generate-daily-posts` usa `row.titulo` **verbatim** como título canónico del post (`cleanTitle = sanitizeTitle(row.titulo)`).
3. `sanitizeTitle` sólo limpia sufijos de marca separados por `- | · :` y sólo cubre 6 competidores concretos. NO detecta la marca en medio del título, y **"Soluciona Mi Deuda" ni siquiera está en la lista**.
4. Al pasar ese título al modelo como objetivo, el modelo escribe el cuerpo alrededor de esa marca (aunque el system prompt diga "Calma").

Resultado: el título se publica literal y el excerpt/cuerpo hereda la mención.

## Plan de arreglo

### 1. Limpieza inmediata de contenido existente
- Barrido en `generated_posts` (title, excerpt, tldr, sections, faq, meta_description, seo_title, keywords) buscando cualquier competidor de una lista ampliada: **Soluciona Mi Deuda, MiSolvencia, Abogados para tus deudas, Repara tu Deuda, Quita Deudas, Deudae, MundoJurídico, Solvento, Reparaty, Deudafix, Legaliboo** (más los que aparezcan en el barrido).
- Los posts contaminados se marcan `status = 'archived'` (no eliminados: podemos revisar) y se retiran del blog público.
- Mismo barrido en `generated_casos`.

### 2. Blindar el generador de posts
- Extraer la lista de marcas competidoras a un único array `COMPETITOR_BRANDS` en el edge function.
- `sanitizeTitle` pasa a detectar la marca **en cualquier posición**, no sólo sufijo, y a reemplazarla por `""` (colapsando conectores tipo "con", "de", "gracias a" que quedan huérfanos).
- Añadir `containsCompetitor(text)` que se aplica sobre título de roadmap ANTES de generar: si detecta marca, la fila se marca `estado = 'bloqueado_competidor'` y se salta (no se paga generación).
- Cambiar la fuente del título mostrado: en lugar de usar `row.titulo` verbatim, se usa el `seoTitle` que produce el modelo (ya pasa por `enforceTitle`), y `row.titulo` sólo se pasa al prompt como "tema de referencia" — no como texto canónico.
- Barrido de salida: tras generar, si el JSON del modelo contiene alguna marca competidora en cualquier campo (title/seoTitle/excerpt/sections/faq/tldr), el post se descarta y el roadmap queda como `fallo_competidor` para revisión, sin insertar.

### 3. Blindar el generador de casos
- Mismo `containsCompetitor` sobre `headline`, `seoTitle`, `dek`, `sections`, `faq` antes de insertar. Si aparece marca ajena, se descarta el caso.

### 4. Regla de memoria actualizada
- Ampliar `mem://constraints/no-competitor-names` con la lista completa y la regla "en cualquier posición, no sólo sufijo", más los campos a validar (título, excerpt, tldr, sections, faq, meta).

### 5. Verificación
- Ejecutar el barrido de limpieza y comprobar por SQL que no queda ninguna marca competidora en posts/casos publicados.
- Ejecución de prueba del cron para confirmar que las filas de roadmap contaminadas se bloquean sin consumir créditos de IA y las limpias siguen publicándose.

## Detalles técnicos

Archivos que se tocarán:
- `supabase/functions/generate-daily-posts/index.ts` — lista de marcas, `sanitizeTitle`, `containsCompetitor`, uso de `seoTitle` en vez de `row.titulo`, validación de salida.
- `supabase/functions/generate-daily-casos/index.ts` — validación `containsCompetitor` sobre la salida.
- Nueva migration SQL: barrido `UPDATE generated_posts SET status='archived' WHERE …` con lista de marcas en title/excerpt/tldr/meta/seo_title + versión que también busca dentro de `sections::text` y `faq::text`. Idem `generated_casos`. Y `UPDATE seo_roadmap SET estado='bloqueado_competidor' WHERE titulo ~* '(marcas)'`.
- `mem://constraints/no-competitor-names` actualizada.

No se toca frontend ni el flujo del formulario.