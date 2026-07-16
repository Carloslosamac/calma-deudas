## Contexto

Además de los cambios ya aprobados para convertir `/blog/guia-cancelar-deudas` en hub potente, añadimos el patrón "50 artículos ordenados por situación" que ya funciona en `/blog/guia-ley-segunda-oportunidad`, y encolamos como **prioridad Alta** todos los artículos por escribir para que el generador los publique antes que la cola normal.

## Cambios adicionales

### A. Hub "50 artículos" dentro de la guía

Añadir una sección nueva `id: "hub-50"` a `src/data/blog/posts/guia-cancelar-deudas.tsx` (justo antes de la sección `hub` actual, que se conserva compacta como resumen).

**Estructura:** 10 grupos × 5 títulos = 50 artículos, agrupados por situación real del usuario. Cada item o bien enlaza a un post ya existente (`to: "/blog/..."`), o queda sin `to` (aparece como pregunta futura, igual que en LSO).

Grupos previstos:

1. **Elegir la vía correcta** (triage) — ya cubierto en parte por `cancelar-deudas-requisitos`, `guia-ley-segunda-oportunidad`, `guia-reunificar-deudas`.
2. **Requisitos y elegibilidad para cancelar deudas**.
3. **Cancelar según el tipo de deuda** — enlaza a `guia-cancelar-microcreditos`, `guia-cancelar-revolving`, `deudas-hacienda-seguridad-social`.
4. **Cancelar según el acreedor** (bancos concretos, financieras, particulares).
5. **Cancelar deudas con bienes en juego** (vivienda, coche, avales).
6. **Cancelar deudas siendo autónomo o exempresario** — enlaza a `autonomos-con-deudas`.
7. **Embargos, ASNEF y ficheros al cancelar** — enlaza a `embargos-segunda-oportunidad`, `salir-asnef`, `juicio-monitorio-deuda`.
8. **Cuánto cuesta y cuánto tarda cancelar deudas**.
9. **Cancelar deudas vs. otras vías** (refinanciar, quita, dación, concurso) — enlaza a `renegociar-acreedores`.
10. **Después de cancelar la deuda** — enlaza a `vida-despues-deuda`.

Reutilizamos el componente `ContentHub` existente, con la misma copy introductoria adaptada ("Cada caso es distinto. Aquí abajo tienes los 50 ángulos más buscados de cómo cancelar deudas, ordenados por situación…").

### B. Encolado en `seo_roadmap` con prioridad Alta

Para cada uno de los ~35 títulos del hub que **no** tienen post asociado, insertar una fila en `public.seo_roadmap`:

```sql
INSERT INTO seo_roadmap (titulo, cluster, intencion, tipo_pagina, prioridad, url_sugerida, estado)
VALUES (
  '<título del hub>',
  'Cancelación de deudas',
  'informacional',
  'blog-post',
  'Alta',
  '/blog/<slug-generado>',
  'en_cola'
);
```

- El generador `generate-daily-posts` ordena por `prioridad='Alta'` primero, así que estos salen antes que las 601 filas actuales de prioridad Baja.
- Antes de insertar, filtramos por `titulo` normalizado contra las filas existentes con `estado IN ('publicado','descartado_duplicado','en_cola','bloqueado_competidor')` para no duplicar (la tabla tiene ya 66 descartadas por duplicado).
- Uso el tool `supabase--insert` en el paso de ejecución (no migración, es data).

### C. Ajustes menores en la guía

- El TL;DR y el sidebar mencionan que la guía es "el mapa completo del cluster cancelar deudas".
- Añadir al TOC los nuevos ids: `hub-map` (del plan anterior) y `hub-50`.
- Actualizar el `keyTakeaways` con un bullet nuevo: "50 artículos por situación al final de la guía para ir directo a tu caso".

## Verificación

- Typecheck limpio.
- Query en `seo_roadmap` para confirmar que las nuevas filas están `estado='en_cola'` y `prioridad='Alta'`.
- Preview de la guía muestra los 10 grupos, algunos con enlaces activos y el resto como "próximamente".
- Contamos ~35 filas nuevas insertadas (5 por grupo × 10 grupos − ~15 ya cubiertos por posts existentes).

## Fuera de alcance

- No modificamos el generador ni sus prompts — solo la cola.
- No creamos las 35 páginas manualmente; que las publique el cron diario.
- No tocamos `/blog/guia-ley-segunda-oportunidad` — su hub-50 sigue tal cual.

## Archivos afectados

- `src/data/blog/posts/guia-cancelar-deudas.tsx` (sección `hub-50` nueva, TOC actualizado)
- Inserts en `seo_roadmap` vía `supabase--insert` (no migración)
