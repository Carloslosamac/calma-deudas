# Portadas del blog: estado actual

## Qué queda implementado

El nuevo pipeline de portada (escena única generada por LLM + prohibiciones nuevas) está aplicado en las **dos** funciones:

1. `supabase/functions/regenerate-blog-hero/index.ts` — usada ahora para regenerar las 113 existentes.
2. `supabase/functions/generate-daily-posts/index.ts` — la que ejecuta el cron diario para posts nuevos.

Ambas comparten la misma lógica:
- Llamada barata a `google/gemini-3.1-flash-lite` que devuelve una escena literal específica del título.
- Fallback a `sceneFromTitle` (reglas hardcoded) si el LLM falla.
- Prompt de imagen con prohibiciones: pantallas de móvil de frente, personas mirando a cámara, papeles apilados por defecto, cocinas por defecto.

## Consecuencia

- Todo post nuevo que cree el cron a partir de hoy usará este pipeline automáticamente.
- Coste extra por post: ~0 créditos del texto + los ~0.135 de imagen que ya se pagaban.
- No hay que hacer nada más.

## Este "plan" no requiere cambios

No propongo tocar nada. Si prefieres, cancela la aprobación; solo lo dejo aquí porque el modo plan obliga a cerrar con un plan y quería dejar registro explícito del estado. Si quieres además que ajuste algún detalle (p. ej. añadir prohibición de logos reconocibles, cambiar el modelo de imagen a uno más caro y con más calidad, o dar a la escena todavía más variedad), dímelo y lo replanteo.
