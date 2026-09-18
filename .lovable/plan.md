# Repasar el blog: por qué se publica contenido malo y cómo evitarlo

## 1. Qué está pasando (comprobado)

De 321 artículos publicados, hay piezas que nunca deberían haber salido. Ejemplos reales de esta semana:

- "Más temas", "Bancos", "Economía", "Financiamiento", "✔Continuar✗Rechazar"
- "Utilizamos cookies para personalizar el contenido, los anuncios y analizar nuestro tráfico…" (un aviso de cookies convertido en artículo)
- "Tiendas Compro Oro en Granada" (tema que no es nuestro negocio)
- Piezas casi calcadas: "No pagar un préstamo personal ¿Es delito?" y "¿Es delito no pagar un préstamo personal?"

## 2. Por qué pasa

**Causa principal: la lista de temas está sucia.** La lista de 1.964 temas se creó copiando resultados de Google de la competencia. En ese volcado entraron menús, avisos de cookies, nombres de secciones y temas ajenos (oro, tarjetas comerciales, opiniones de productos). Quedan 663 temas en cola y ahí siguen algunos de esos restos, además de temas repetidos entre sí.

**Causa secundaria: no hay ningún freno antes de publicar.**

- El artículo se genera y se publica solo, al instante, sin que nadie lo vea.
- Existen comprobaciones de calidad (longitud, número de apartados, preguntas frecuentes, llamadas a la acción), pero solo dejan un aviso en el registro: **no impiden la publicación**. Un artículo corto o incompleto sale igual.
- Nadie comprueba que el tema no esté ya cubierto por otro artículo.
- Nadie comprueba que el texto generado no venga con etiquetas rotas, lo que puede descolocar la página entera.
- La foto de portada se decide a partir del título original de la lista, no del artículo final.

## 3. Qué haremos

### A. Limpiar la lista de temas
- Revisar los 663 temas en cola y descartar automáticamente: títulos demasiado cortos o sin intención de búsqueda, textos de menú/cookies/navegación, temas fuera de nuestro negocio y duplicados entre sí y contra lo ya publicado.
- Dejar un informe con lo descartado para que puedas revisarlo.

### B. Limpiar lo ya publicado
- Despublicar las piezas basura identificadas (las de la lista de arriba).
- Listar las piezas flojas o duplicadas para decidir: reescribir, fusionar o quitar.

### C. Poner un control de calidad que sí bloquee
Antes de publicar, el artículo debe pasar un examen. Si falla, no se publica: queda en borrador con el motivo.
- Extensión y estructura mínimas (apartados, preguntas frecuentes, llamadas a la acción, diagramas).
- Ningún apartado vacío y texto correctamente cerrado.
- Nada de marcas de la competencia ni cifras inventadas.
- El tema no puede solaparse con un artículo ya publicado.
- El título debe ser una búsqueda real, no una palabra suelta.

### D. Filtro de tema antes de gastar en generar
Descartar el tema en el momento de cogerlo de la cola si no supera el filtro de calidad, en lugar de generar un artículo entero para tirarlo después.

### E. Un sitio donde verlo y decidir
En el panel de administración, una bandeja con los artículos retenidos y el motivo, con botones para publicar, reintentar o descartar. Los que aprueban el examen siguen publicándose solos, como ahora.

## 4. Detalles técnicos

- `seo_roadmap`: script de limpieza (marcar `estado='descartado_calidad'` con motivo) + normalización de títulos; dedupe por título normalizado y por solape de keywords contra `generated_posts`.
- `generate-daily-posts/index.ts`: convertir el bloque de `console.warn` (~líneas 907-928) en una verificación bloqueante; si falla, insertar con `status='rejected'` y `quality_notes`, y marcar el roadmap como reintentable. Añadir validación de HTML balanceado y de secciones no vacías, y un pre-filtro de tema en la selección de candidatos (~líneas 737-792).
- Nuevas columnas en `generated_posts`: `quality_score`, `quality_notes` (con GRANT y políticas RLS coherentes con las actuales).
- `AdminQueue.tsx`: pestaña "Retenidos" leyendo `status in ('rejected','draft')` con acciones publicar / regenerar / descartar.
- La portada se seguirá derivando del título final ya reescrito, no del título original del roadmap.
- Volumen: hoy el código genera 1 artículo por ejecución aunque el comentario dice 2; lo dejo coherente y a la baja mientras sube la calidad.

## 5. Fuera de alcance
Reescribir el contenido de los artículos flojos ya publicados: primero te paso la lista y decides cuáles merecen reescritura.
