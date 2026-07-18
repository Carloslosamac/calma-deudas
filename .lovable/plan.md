# Posicionamiento GEO — implementación completa

Ejecutar las 3 fases del plan aprobado, en una sola tanda.

## Fase 1 — Panel IA en /admin

Nueva página `/admin/contenido/ia`:

- **KPIs superiores**: leads web últimos 30 días desde fuentes IA (ChatGPT, Perplexity, Claude, Gemini, Copilot, You.com), agrupados por fuente. Query a `web_submissions` filtrando `utm_source` y patrones de `page` con referrer IA.
- **Tabla de leads por fuente IA** con página de aterrizaje.
- **Estado del stack GEO**: verificación visual de que `llms.txt` está presente, `robots.txt` permite GPTBot/PerplexityBot/ClaudeBot/OAI-SearchBot/Google-Extended, `llms-full.txt` está publicado.
- **Checklist de auditoría manual** (prompts objetivo con checkboxes: "¿ChatGPT me cita para X?" → sí/no/competidor). Persistido en localStorage por simplicidad.
- Enlace en `AdminSidebar` bajo grupo "Contenido" con icono Sparkles.

## Fase 2 — llms.txt dinámico + llms-full.txt

- Nuevo script `scripts/generate-llms-txt.ts` que:
  - Reutiliza los mismos imports que `generate-sitemap.ts` (money pages, guías, comparativas, herramientas, entidades, localizaciones top 15).
  - Fetch REST a Supabase (`generated_posts` y `generated_casos` publicados) usando `VITE_SUPABASE_URL` + publishable key ya en `.env`. Dedup con posts estáticos.
  - Preserva la cabecera curada (H1 + trust signals).
  - Escribe `public/llms.txt` con las secciones: Páginas principales, Soluciones, Guías, Comparativas, Herramientas, Abogados por ciudad (top 15), Blog (top 40 recientes), Casos (top 30 recientes), Fichas top, Optional.
  - Escribe `public/llms-full.txt` con `directAnswer.plain` + FAQ de cada money page (26 con datos) + tldr/FAQ de los 15 posts DB más recientes con tldr.
- `package.json`: añadir el script a `predev` y `prebuild` junto al de sitemap.

## Fase 3 — Reporte de citability (sin cambios de contenido esta iteración)

La auditoría del código muestra: 100% FAQ en money pages (31/31), 84% con directAnswer (26/31). Suficiente para GEO. Se documenta en el propio panel IA cuáles faltan (los 5 sin directAnswer: hubs y páginas menores) para tratarlos en una iteración posterior si el usuario quiere.

## Archivos

- Crear `scripts/generate-llms-txt.ts`.
- Crear `src/pages/admin/AdminIaVisibility.tsx`.
- Editar `package.json` (predev/prebuild).
- Editar `src/App.tsx` (nueva ruta `/admin/contenido/ia`).
- Editar `src/components/admin/AdminSidebar.tsx` (nuevo item).

Sin cambios en `public/robots.txt`, `public/llms.txt` (se sobreescribe por el generador; el contenido curado actual se preserva en el header del script).
