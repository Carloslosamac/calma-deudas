# Capa GEO + conversión: respuesta directa, puente comercial y medición

## Estado actual (verificado)

- El blog ya tiene un bloque "answer-first": `AnswerSummary` (tldr + puntos clave) renderizado en `BlogPost.tsx`, con `data-geo-summary` / `data-geo-takeaways`. Se reutiliza, no se duplica.
- Las fichas de entidad (bancos, revolving, recobro, microcréditos, suministros) ya pintan un `tldr` en `SeoPageScaffold`, pero el texto es **genérico y autogenerado por plantilla**: la misma frase para las 100+ fichas. No es editable por página.
- CTAs actuales: `InlineCTA` (blog) y `CtaButton` (SEO). Ambos llevan a `#hero-form`. No hay un módulo de "puente" configurable con enlaces internos.
- Autoría: existe `TEAM` con 6 abogados y credenciales, `AuthorChips` y `authors[]` en los posts. **No existe revisor jurídico** en ningún sitio. En los posts de base de datos `updatedAt` se copia de `published_at`, así que `dateModified` nunca refleja una revisión real. Las fichas de entidad no declaran autor ni fechas.
- Medición: no hay GA ni GTM en `index.html`; solo captura de UTMs (`src/lib/tracking.ts`) y el insert del lead. **No hay ninguna capa de eventos**, así que hay que crearla.
- No existe CTA sticky móvil ni botón de WhatsApp.

## 1. Respuesta directa (`directAnswer`)

- Blog: reutilizar `AnswerSummary`. Añadir campo `directAnswer` en `BlogPost` (types + mapeo de base de datos) con prioridad sobre `tldr`; si no hay `directAnswer` se sigue usando `tldr`. Subirlo justo debajo del H1/metadatos, antes de la imagen destacada, con el bloque de puntos clave detrás.
- Fichas de entidad: añadir `directAnswer?: string` al perfil de entidad (`entityProfiles.ts`) y hacer que `EntityPage` lo use en el `tldr` del scaffold en vez de la frase genérica. Fallback: la plantilla actual por `kind`.
- Formato: 40–100 palabras, respuesta directa a la intención (se validará por longitud en desarrollo con un aviso en consola, no en producción).
- Structured data: el `directAnswer` alimenta `abstract` del Article y el `speakable` existente.

## 2. Puente comercial (`SolutionBridge`)

Nuevo componente `src/components/seo/SolutionBridge.tsx`, tono editorial (mismo lenguaje visual que `KeyCallout`, sin gradientes, sin aire de banner):

- Props: `title`, `description`, `ctaLabel` (por defecto **"Comprueba si puedes cancelar tus deudas"**), `href` (por defecto `#hero-form`), `links` (1–2 enlaces internos con etiqueta), `placement` (`inline` | `closing`), `pageType`.
- Se integra en blog (`BlogPost`, tras la sección que resuelve la intención y otra vez al final) y en las fichas de entidad vía `entityContent` / `EntityPage` (cierre de página).
- Los enlaces internos salen de `internalLinks.ts` cuando no se pasan a mano, respetando las reglas anticanibalización.
- `InlineCTA` del blog pasa a apoyarse en el mismo componente para no tener dos estilos de CTA.

## 3. Conversión móvil

- Botón a ancho completo en móvil, altura mínima 48px, `text-balance` en titulares, sin `whitespace-nowrap` que provoque overflow, contenedores con `min-w-0`.
- Alturas reservadas en el bloque de respuesta directa para evitar saltos de layout (CLS).
- Añadir una barra de contacto sticky móvil ligera (llamar / WhatsApp al +34 611 62 56 98) que se oculta cuando el `SolutionBridge` o el formulario están en pantalla, para que no compitan entre sí.
- Verificación con Playwright a 390px en las 9 URLs de activación: capturas, comprobación de overflow horizontal y tamaño de los objetivos táctiles.

## 4. Medición

Como no hay GA/GTM, se crea una capa propia de eventos:

- `trackEvent(name, payload)` en `src/lib/tracking.ts`: envía a `window.dataLayer` si algún día existe GTM y, siempre, hace un insert best-effort en una nueva tabla de Cloud `site_events` (insert anónimo permitido, lectura solo para admin).
- Eventos: `cta_click` (con `cta_id`, `cta_label`, `placement`, `page_type`, `page_path`, UTMs), `diagnosis_start`, `diagnosis_complete` (enganchados al wizard del formulario), `direct_answer_view`.
- Panel: nueva pestaña en `/admin` (Contenido → Conversión) con clics por página, por tipo de página y por CTA, más el embudo inicio → fin del diagnóstico.

## 5. Autoría y revisión

- Añadir `reviewer?: string` (id de `TEAM`) y `reviewedAt?: string` a `BlogPost` y a los perfiles de entidad, más columnas equivalentes en la tabla de posts.
- Nuevo componente `AuthorByline`: "Por X · Revisado por Y (colegiada) · Publicado el … · Actualizado el …", usado en blog y fichas de entidad.
- Corregir el mapeo de `updatedAt` en `dbPosts.ts` para que use la fecha real de actualización y no `published_at`.
- Structured data: `author` (Person con credenciales), `reviewedBy`, `datePublished`, `dateModified` reales en Article y en las fichas de entidad.

## 6. Activación inicial

Contenido escrito a mano (respuesta directa + puente + revisor) en las 9 URLs indicadas: los 5 posts de blog (segunda oportunidad dos veces, cortes de luz de Endesa, cuenta bancaria tras la LSO, embargo de coche de más de 10 años, notificación de monitorio no recogida) y las 4 fichas (Procobro, Kruk, QueBueno, CaixaBank). El resto de páginas mantiene el fallback por plantilla.

## Detalles técnicos

Archivos principales: `src/data/blog/types.ts`, `src/data/blog/dbPosts.ts`, `src/pages/BlogPost.tsx`, `src/components/blog/AnswerSummary.tsx`, `src/pages/seo/EntityPage.tsx`, `src/data/seo/content/entityProfiles.ts`, `src/data/seo/content/entityContent.tsx`, `src/components/seo/SolutionBridge.tsx` (nuevo), `src/components/blog/AuthorByline.tsx` (nuevo), `src/lib/tracking.ts`, `src/lib/seo/structuredData.ts`, más una migración para `site_events` y las columnas de revisor/actualización.
