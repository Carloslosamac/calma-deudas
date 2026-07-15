## Objetivo
Enlazar los items del `<ContentHub>` en las 4 guías madre restantes hacia sus posts publicados en la BBDD (igual que se hizo con la guía de Segunda Oportunidad).

## Guías a revisar
1. `src/data/blog/posts/guia-reunificar-deudas.tsx`
2. `src/data/blog/posts/guia-cancelar-deudas.tsx`
3. `src/data/blog/posts/guia-cancelar-revolving.tsx`
4. `src/data/blog/posts/guia-cancelar-microcreditos.tsx`

## Proceso (por guía)
1. Leer el bloque `<ContentHub groups={...} />` y extraer todos los `title` sin `to:`.
2. Consultar `generated_posts` (status='published') filtrando por palabras clave del tema de la guía (reunificar, cancelar, revolving, microcréditos…) y también los posts estáticos en `src/data/blog/posts/`.
3. Para cada item, hacer match por similitud de título:
   - Match exacto o casi exacto → añadir `to: "/blog/<slug>"`.
   - Sin match → dejar como está (texto plano, "próximamente").
4. Aplicar patches conservando el orden y el resto del contenido.

## Fuera de alcance
- No se editan los títulos ni descripciones del hub.
- No se crean posts nuevos para huecos sin match.
- No se toca `ContentHub.tsx` ni la lógica de render.
- No se tocan los 5 hubs de la guía LSO ya enlazada.

## Verificación
- `tsgo` no-op (solo cambios de datos).
- Revisar en preview cada guía y confirmar que los items nuevos son clicables.
