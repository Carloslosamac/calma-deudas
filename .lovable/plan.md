## Objetivo

Convertir Calma en una "bestia SEO" para deudas/Ley de Segunda Oportunidad: maximizar indexación, autoridad temática y CTR para arrebatar tráfico al líder (reparatudeuda), que hoy concentra ~50% de su tráfico en 2 páginas. No reinventamos la arquitectura (ya es sólida): la reforzamos por capas, de mayor a menor impacto.

## Diagnóstico de partida

- Scanner técnico: 0 findings (base limpia).
- `mi-calma.es` aún sin datos en Semrush → falta indexación/autoridad, no estructura.
- Término cabecera "ley de segunda oportunidad": 14.800/mes, KD 52.
- Competidor saca el grueso del tráfico de su money page LSO + home, y rankea #1 en marcas de financieras (cofidis, cetelem, creditea, moneyman) y combos ciudad+banco.
- Calma ya tiene: 103 entidades, 21 localizaciones, 7 tools, 5 guías, 4 comparativas, blog autogenerado + casos.

## Fase 1 — Fundas técnicas de indexación y datos estructurados (máxima prioridad)

1. **Auditar sitemap**: confirmar que `scripts/generate-sitemap.ts` incluye TODAS las rutas dinámicas reales (blog generado en BD, casos generados, 103 entidades, localizaciones, tools, guías, comparativas). Si el sitemap es estático o se queda corto, migrar a generación completa que lea también `generated_posts` y `generated_casos`.
2. **Datos estructurados por plantilla** (JSON-LD vía Helmet, apilables):
   - `Article` + `BreadcrumbList` en cada post de blog y caso.
   - `FAQPage` en toda página con FAQ (blog, money, guías).
   - `LegalService`/`LocalBusiness` en money pages y localizaciones (ciudad).
   - `WebSite` + `Organization` sitewide en `index.html` (verificar que existe).
3. **Verificar canonical + og:url self-referenciales** en todas las plantillas dinámicas (que no apunten a home).

## Fase 2 — Reforzar la money page cabecera (la que mueve el dinero)

La página LSO es la que decide la guerra. Elevar `/ley-segunda-oportunidad` (hub money) al máximo:
- Cobertura answer-first (TLDR + key takeaways) para las question keywords de alto volumen ("qué es", "requisitos", "pierdo mi casa", "cuánto cuesta", "es fiable").
- Módulos interactivos ya existentes bien colocados (simulador, quiz de elegibilidad, comparador) para tiempo de permanencia y AEO.
- Bloque FAQ ampliado con las 10-15 preguntas reales de Semrush.
- Enlazado interno potente hacia entidades, localizaciones y blog LSO (topical authority).

## Fase 3 — Capturar GEO/AEO (motores de IA + answer boxes)

- Revisar `public/llms.txt` y ampliarlo con las entidades y páginas clave.
- Asegurar que cada money/guía tiene un `tldr` answer-first y `FAQPage` schema (ya estándar en blog; extender a money pages que falten).
- Crear/mejorar un bloque de "respuesta directa" arriba en las plantillas money y guía.

## Fase 4 — Explotar las dos minas del competidor

1. **Entidades de financieras**: verificar que las 103 entidades cubren las marcas que rankea el competidor (cofidis, cetelem, creditea, moneyman, etc.) con intención correcta (reclamación de intereses / inclusión en LSO). Rellenar huecos detectados.
2. **Localización ciudad + intención**: el competidor rankea combos "segunda oportunidad + ciudad". Confirmar las 21 localizaciones y plantear ampliación a las ciudades top que falten, con contenido único (no duplicado) por ciudad.

## Fase 5 — Cohesión de enlazado interno y títulos

- Auditar `internalLinks.ts` + `RelatedResources` para que cada tipo (post/caso/tool/entidad/localización) enlace de forma cruzada e intencional, sin canibalización.
- Aplicar el patrón de título agresivo de CTR (emoji + keyword + gancho, <60) ya implementado en blog también a money pages, guías y entidades donde aún no esté.

## Fase 6 — Verificación

- Build verde.
- Re-ejecutar el SEO scan y resolver lo que aparezca.
- Confirmar sitemap cuenta total de URLs y que las nuevas plantillas emiten JSON-LD válido (revisión manual del head en 2-3 rutas con Playwright).

## Notas técnicas

- Trabajo mayoritariamente en frontend/datos: plantillas SEO (`src/pages/seo/*`, `src/components/seo/*`), datos (`src/data/seo/*`), `scripts/generate-sitemap.ts`, `index.html`, `public/llms.txt`.
- Posible ampliación de sitemap para leer contenido de BD (blog/casos generados).
- Sin cambios de backend salvo que la generación de sitemap necesite consultar `generated_posts`/`generated_casos`.

## Decisión previa

Esto es amplio. Propongo ejecutar **Fase 1 + Fase 2 primero** (lo de mayor impacto: indexación, datos estructurados y money page cabecera) y luego seguir con el resto. Si prefieres otro orden o centrarte solo en una fase, lo ajusto.
