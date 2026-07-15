## Ejecutamos Fases 1, 2, 5, 6, 7, 8

*(saltamos Fase 3 comparativas y Fase 4 entidad×LSO)*

### Fase 1 — 6 sub-pillars del hub LSO
Nueva ruta `/ley-segunda-oportunidad/<slug>` con plantilla money reutilizada (kit de módulos SEO ya existente: `KeyCallout`, `OptionCards`, `FactGrid`, `CheckList`, callouts, bloque FAQ). Cada página:
- Hero + H1 pegado a la keyword objetivo
- 5–7 secciones H2 largas con contenido específico (no relleno)
- Bloque FAQ propio (5–8 preguntas) con `FAQPage` JSON-LD
- CTA a `#hero-form`
- Breadcrumb hub → sub-pillar
- Interlinking: hub, 2 casos éxito, herramienta, comparativa relacionada

| Slug | Keyword | Vol. |
|---|---|---|
| `/requisitos` | ley segunda oportunidad requisitos | 2.400 |
| `/coste-precio` | cuánto cuesta la LSO | ~320 |
| `/plazos-duracion` | cuánto dura la LSO | ~200 |
| `/pierdo-mi-casa` | con la LSO pierdo mi casa | ~130 |
| `/es-fiable` | es fiable la LSO | 260 |
| `/como-funciona` | cómo funciona la LSO | ~180 |

### Fase 2 — 5 landings de perfil de deudor
Sub-carpeta `/ley-segunda-oportunidad/perfiles/<slug>`:
- `/autonomos` (LSO + AEAT/TGSS)
- `/avalistas`
- `/funcionarios`
- `/pensionistas-jubilados`
- `/exempresarios`

Misma plantilla que Fase 1, pero centrada en el perfil (situación, qué exonera, qué protege, casos reales del perfil, FAQ). Enlaza al hub + sub-pillar `requisitos` + comparativa concurso.

### Fase 5 — 15 ciudades LSO nuevas
Extender `localizaciones.ts` con: Salamanca, Cádiz, Toledo, Lleida, Tarragona, Girona, León, Castellón, Huelva, Jaén, Logroño, Albacete, Badajoz, Ourense, Cáceres.

Cada una con datos reales (provincia, comunidad, tribunal competente, sede judicial, coordenadas, barrios/comarca) y `localNote` única para evitar canibalización. Total ciudades pasa de 27 → 42.

### Fase 6 — FAQ hub `/ley-segunda-oportunidad` con JSON-LD
Añadir bloque FAQ (15 preguntas) al hub principal con las questions Semrush de mayor volumen (fiable, coste, duración, casa, coche, avalistas, autónomos, después LSO, etc.), incrustar `FAQPage` JSON-LD para capturar rich snippets.

### Fase 7 — Internal linking system
Actualizar `internalLinks.ts` con las 26 rutas nuevas + reglas de intent:
- Cada post blog LSO → sub-pillar más afín + perfil si aplica
- Cada ciudad LSO → sub-pillar `requisitos` + `coste-precio`
- Cada perfil → hub + sub-pillar `requisitos` + herramienta de test
- Cada sub-pillar → hub + 2 sub-pillars hermanos + 1 perfil relevante + comparativa existente

Sin canibalización: la keyword principal de cada nodo se mantiene única.

### Fase 8 — Footer crawlable + sitemap
- `SeoFooterLinks.tsx`: nuevo grupo "Segunda Oportunidad en detalle" con los 6 sub-pillars + los 5 perfiles.
- `scripts/generate-sitemap.ts`: incorporar automáticamente las 26 rutas nuevas (sub-pillars + perfiles + ciudades nuevas) leyendo la fuente de verdad (`moneyPages.ts`, `perfilesLso.ts`, `localizaciones.ts`).

## Detalles técnicos

- **Nuevos datos:** `src/data/seo/subpillarsLso.ts`, `src/data/seo/perfilesLso.ts`. `localizaciones.ts` extendido.
- **Nuevas plantillas:** `src/pages/seo/SubPillarLsoPage.tsx`, `src/pages/seo/PerfilLsoPage.tsx` (reutilizando módulos existentes).
- **Rutas dinámicas** en `src/App.tsx`:
  - `/ley-segunda-oportunidad/:subpillar` → SubPillarLsoPage
  - `/ley-segunda-oportunidad/perfiles/:perfil` → PerfilLsoPage
- **Componente FAQ + JSON-LD** reutilizable (`src/components/seo/FaqBlock.tsx`) usado en hub y en cada nueva landing.
- **Contenido:** redacción larga y específica por página. Nada de placeholders "lorem"; cada H2 aporta ángulo único.
- **Sin gradientes en CTAs** (respetando la regla del proyecto).

## Verificación

Tras ejecutar:
- Build limpio (sin rutas rotas, sin TypeScript errors)
- Sitemap incluye 26 rutas nuevas
- Footer crawlable las lista
- Cada nueva página tiene `<Helmet>` con title <60c, meta <160c, `FAQPage` JSON-LD
- Rescan SEO opcional para revalidar findings

## Fuera de alcance
- Fase 3 (comparativas) y Fase 4 (entidad×LSO) — se dejan para más adelante.
- No se toca el hero, formulario, ni la generación automatizada de blog.
- No se cambian slugs existentes.

## Volumen esperado
De **1 hub + 1 sub + 27 ciudades** a **1 hub + 6 sub-pillars + 5 perfiles + 42 ciudades** en el cluster LSO. Total: **+26 nuevas landings** con schema y enlazado interno completo.
