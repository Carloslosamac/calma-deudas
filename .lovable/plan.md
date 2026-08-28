# Regenerar portadas del resto del blog (190 posts)

## Estado actual
- Total de posts en `generated_posts`: **240**
- Ya regenerados con el nuevo motor de escenas: **50** (los más recientes)
- Pendientes: **190**

## Presupuesto de tokens (estimación)

Por post, la regeneración hace:
1. Construcción del prompt de escena (determinista, sin LLM — 0 tokens de modelo)
2. Una llamada de generación de imagen (Nano Banana 2)

| Concepto | Por imagen | × 190 imágenes |
| --- | --- | --- |
| Tokens de entrada (prompt) | ~150 | ~28.500 |
| Tokens de salida (imagen) | ~1.290 | ~245.000 |
| **Total modelo** | | **~275.000 tokens** |

Coste de mi trabajo (agente): mínimo — es reutilizar el script de regeneración ya creado, apuntándolo a los 190 restantes en lotes (el límite de tiempo de la función exige lotes de ~25). Estimo **4-6 llamadas de herramienta** en total, es decir una fracción pequeña de un mensaje.

Riesgo: si alguna imagen falla y se reintenta, el consumo sube proporcionalmente (~1.450 tokens extra por reintento). El run anterior de 50 terminó sin fallos, así que el riesgo es bajo.

## Ejecución
1. Lanzar la regeneración por lotes de ~25 sobre los 190 posts restantes (excluyendo los 50 ya hechos), del más reciente al más antiguo.
2. Verificar al final que los 240 tienen `hero_image_url` actualizada y ninguna quedó en error.

## Detalles técnicos
- Reutiliza `supabase/functions/regenerate-blog-hero` y el motor de escenas de `supabase/functions/_shared/hero-prompt.ts` ya desplegados — no hay que escribir código nuevo.
- Se hará con un parámetro de offset/exclusión de los ya regenerados para no repetir ni gastar de más.
