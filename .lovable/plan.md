## Auditoría: qué hay hecho ya (para no duplicar)

Crucé el masterplan `Mapa_SEO_Total` con el código actual. Resumen real de cobertura:

**Roadmap del masterplan:** 1.879 temas únicos → Alta 78 · Media 493 · Baja 1.308.
Tipos: Artículo satélite 847 · Comparativa 516 · Long-tail entidad 321 · Guía urgente 161 · Money page 34.

**Ya publicado en el proyecto:**
- **16 money pages** (LSO, cancelar deudas, reunificación, salir de ASNEF, parar embargo, revolving, microcréditos, exoneración, concurso, monitorio, Hacienda, Seguridad Social…)
- **102 fichas de entidad** (con módulo de valoración semáforo)
- **8 comparativas** + **10 guías** + **6 herramientas interactivas**
- **11 posts de blog** + **16 casos de éxito**
- **15 cluster hubs** alineados con los clusters del Excel

**Hallazgo crítico para la automatización:** el cruce por URL exacta da **0 coincidencias**, porque nuestros slugs son limpios (`/blog/salir-asnef`) y los del Excel son los scrapeados del competidor (`/asnef/salir-asnef-misolvencia/`). Es decir: **no se puede deduplicar por URL**. Hay solapamiento real de *intención* que el Excel no detecta (ej. "Salir de ASNEF" ya está cubierto como money page + post). Si la automatización publica por roadmap a ciegas, **canibalizaríamos** páginas que ya rankean.

```text
Masterplan (1.879)
   │  cruce por URL  → 0  (slugs distintos)
   │  cruce por intención → decenas ya cubiertas en money pages / posts / guías
   ▼
Cola de publicación = roadmap  MENOS  lo ya cubierto por intención
```

## Plan de automatización (3–7 posts/día, media 5)

### 1. Importar el roadmap como cola en base de datos
- Nueva tabla `seo_roadmap` (Lovable Cloud) con los 1.879 temas: id, título, cluster, intención, tipo, prioridad, sprint, url_sugerida, **estado** (`backlog | en_cola | descartado_duplicado | publicado`).
- Script de importación one-off desde el Excel.

### 2. Deduplicar contra lo existente (clave para "no liarla")
- Marcar como `descartado_duplicado` toda fila cuya intención ya esté cubierta por una money page, guía, comparativa, post o ficha de entidad actual (matching por cluster + keywords/slug normalizado + intención, no por URL).
- Las **Money pages del Excel** (34) NO se publican como blog: o ya existen, o son decisiones de arquitectura, no posts diarios.
- Resultado: una cola limpia de temas **informacionales/satélite** seguros para blog.

### 3. Modelo de publicación
- **Posts en base de datos**, no en TSX. El blog pasa a leer de Cloud + fallback a los 11 posts en código (se mantienen).
- Tabla `posts` con todos los campos actuales (`BlogPost`): slug, título, secciones (HTML), excerpt, autores, hero, FAQ, sidebar, meta, enlaces internos, `published_at`, `status`.

### 4. Generación de contenido (a decidir contigo — ver abajo)
- Por cada tema de la cola: generar post largo respetando TODAS las reglas del proyecto (sin cifras inventadas, triaje de soluciones correcto, CTA alineado a intención, autores reales del equipo, hero premium, enlazado interno por intención).

### 5. Programación 3–7/día (media 5)
- Cron diario (`pg_cron` + edge function). Cada día elige un número aleatorio 3–7 con media≈5, toma N temas de la cola por prioridad (Alta→Media→Baja), genera y publica con horas escalonadas.
- Sitemap se regenera con cada publicación.

## Necesito que decidas antes de construir

1. **Generación del contenido:** (a) **cola pre-redactada** revisada por lotes (máxima calidad/control), (b) **IA 100% automática** diaria (cero esfuerzo, riesgo calidad/precisión legal y SEO), o (c) **IA con borrador + tu aprobación**.
2. **Arquitectura:** ¿OK migrar el blog a base de datos (necesario para publicar sin redeploy)? Si prefieres mantener TSX, la "automatización" solo puede prepararte archivos para revisar, no publicar sola.
3. **Calidad por defecto:** ¿cada post auto-publicado con autores reales + enlazado interno + hero, igual que ahora?

Dime las 3 respuestas y dejo el plan cerrado para implementar.