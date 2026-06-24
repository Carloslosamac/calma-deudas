## Objetivo

Que TODOS los títulos del blog sigan la sistemática agresiva de CTR que acordamos: **1 emoji + keyword principal + gancho de urgencia/poder** (decoradores 【 】 opcionales), sin marca "| Calma", únicos y por debajo de ~60 caracteres visuales. Aplica al generador automático y a los seo_title LSO ya publicados que salieron planos y sin emoji.

## Estado actual (diagnóstico)

- Los 11 posts manuales (`src/data/blog/posts/*.tsx`) SÍ usan el patrón agresivo con emoji.
- Los artículos LSO autogenerados (tabla `generated_posts`, vía `generate-daily-posts`) salen **planos y sin emoji** → no cumplen.
- Quedan 33 LSO en cola que se generarán igual de planos si no tocamos el generador.

## Parte 1 — Reforzar el generador (raíz del problema)

En `supabase/functions/generate-daily-posts/index.ts`:

1. Reescribir las instrucciones del campo `seoTitle` en el `SYSTEM_PROMPT` para exigir el patrón agresivo:
   - Empezar con **1 emoji** temáticamente relevante (⚖️ legal, 💳 tarjetas, 📉 deuda, 🏠 vivienda, 🛑 embargo, ✅ requisitos, etc.).
   - Incluir la **keyword principal** + **palabra de urgencia/poder** (YA, TODO, así, sin/cero, paso a paso, etc.).
   - Permitir decoradores 【 】 cuando aporten (año, "GUÍA", "2026").
   - **Máximo 60 caracteres visuales** (contando el emoji), tono persuasivo, sin promesas garantizadas, sin marca.
2. Mantener emoji también en `metaDescription` (ya es táctica acordada) y reforzarlo en el prompt.
3. Añadir **validación dura post-generación** sobre `seoTitle`:
   - Si no empieza por emoji, o supera 60 caracteres, o es plano → segunda llamada corta al modelo pidiendo solo el título reescrito con el patrón.
   - Último recurso: recorte seguro sin partir palabras ni quitar el emoji.
4. Registrar en el log de la run cuántos títulos requirieron reescritura (auditoría).

## Parte 2 — Corregir los 11 seo_title LSO ya publicados

Actualizar los seo_title de `generated_posts` (cluster LSO) al patrón agresivo con emoji, manteniendo intención y keyword. Borrador (se afinará para que todos queden < 60 visuales):

```text
⚖️ Buena fe en Segunda Oportunidad: cómo demostrarla
🔁 ¿Segunda Oportunidad dos veces? Sí, y te lo explico
💳 Revolving + Segunda Oportunidad: deuda a CERO
✍️ Avales personales: cancélalos con Segunda Oportunidad
🤝 Préstamos entre particulares: ¿entran en la LSO?
⚖️ Delitos que te BLOQUEAN la Segunda Oportunidad
📉 Cancela tus microcréditos con la Segunda Oportunidad
🧾 Deudas con proveedores: bórralas con la LSO
⚠️ Insolvencia actual vs. inminente: cuál te abre la LSO
✅ Documentación para la Segunda Oportunidad 【 2026 】
🛡️ Oposición de acreedores en LSO: cómo superarla
```

## Parte 3 — Verificación

- Consulta de control: listar `seo_title` + longitud de todo el cluster LSO; confirmar que todos empiezan por emoji y ninguno supera 60 visuales.
- Build verde y redeploy de `generate-daily-posts`.

## Notas técnicas

- Parte 1 = edición de edge function + redeploy.
- Parte 2 = actualización de datos en `generated_posts` (no migración de esquema).
- No se cambia el orden ni la lógica de cola; solo la calidad/estilo del título.
