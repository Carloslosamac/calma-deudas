# Capa GEO + conversión: respuesta directa, puente comercial y medición

Alcance de esta primera entrega: **solo las 9 URLs piloto**. El resto de páginas mantiene el comportamiento actual hasta tu revisión.

## Estado actual (verificado)

- El blog ya tiene bloque "answer-first": `AnswerSummary` (tldr + puntos clave) en `BlogPost.tsx:247`. Se reutiliza, no se duplica.
- Las fichas de entidad pintan un `tldr` en `SeoPageScaffold`, pero es una frase genérica construida en `EntityPage.tsx:114`, igual para las 100+ fichas y no editable por página.
- CTAs: `InlineCTA` (blog) y `CtaButton`/`InlineCta` local (fichas). Ninguno mide nada.
- Autoría: existe `TEAM` con credenciales y `authors[]`; **no existe revisor**. En los posts de base de datos `updatedAt` se copia de `published_at`, así que `dateModified` no refleja ninguna revisión real.
- Medición: no hay GA ni GTM en el proyecto; solo captura de UTMs. Hay que crear la capa de eventos.
- No existe barra sticky móvil ni acceso rápido a WhatsApp.

## 1. Respuesta directa (`directAnswer`)

- Blog: campo `directAnswer` en `BlogPost` (tipos + columna en base de datos), con prioridad sobre `tldr`; si no hay, se sigue usando `tldr`. Se reutiliza `AnswerSummary` y se sube justo debajo del H1/metadatos, antes de la imagen destacada.
- Fichas: `directAnswer?: string` en el perfil de entidad; `EntityPage` lo usa en lugar de la frase genérica, que queda como fallback.
- 40–100 palabras, respuesta directa a la intención.

## 2. Puente comercial (`SolutionBridge`)

- Nuevo `src/components/seo/SolutionBridge.tsx`, tono editorial (lenguaje visual de `KeyCallout`, sin gradientes).
- Props: `title`, `description`, `ctaLabel` (por defecto **"Comprueba si puedes cancelar tus deudas"**), `href` (por defecto `#hero-form`), `links` (1–2 enlaces internos), `placement`, `pageType`.
- **`InlineCTA` pasa a ser un envoltorio fino de `SolutionBridge`**: no habrá un tercer sistema de CTA. El `InlineCta` local de `entityContent.tsx` también se reconduce.
- **Número de apariciones según longitud**: posts cortos (menos de 4 secciones) → solo cierre; posts largos → uno tras la sección que resuelve la intención + uno de cierre. Nunca dos puentes seguidos ni junto al CTA del sidebar.
- En las **9 URLs piloto los enlaces internos se definen a mano**; `internalLinks.ts` queda solo como fallback para el resto.

## 3. Conversión móvil

- Botón a ancho completo en móvil, altura mínima 48px, titulares con `text-balance`, contenedores `min-w-0`, sin overflow horizontal.
- Alturas estables en el bloque de respuesta directa para no generar saltos (CLS).
- Barra de contacto sticky en móvil (llamar / WhatsApp al +34 611 62 56 98) que se oculta cuando el formulario o un `SolutionBridge` están en pantalla, para que no compitan.
- Verificación con Playwright a 390px en las 9 URLs: capturas, overflow y tamaño de objetivos táctiles.

## 4. Medición (simplificada)

- `trackEvent(name, payload)` en `src/lib/tracking.ts`: **push a `window.dataLayer`** (creado si no existe, listo para un GTM futuro) + insert best-effort en una nueva tabla `site_events`.
- Solo tres eventos: **`cta_click`** (con `cta_id`, `cta_label`, `placement`, `page_type`, `page_path`, `target_url`, UTMs), **`diagnosis_start`** y **`diagnosis_complete`** (enganchados al wizard del formulario).
- Sin `direct_answer_view` y **sin dashboard en /admin** en esta entrega.

## 5. Autoría y revisión (solo revisiones reales)

- Nuevos campos explícitos: `reviewer` (id de `TEAM`), `reviewedAt` y `contentUpdatedAt`. **No se asignan revisores automáticamente**: si no hay revisión real, no se muestra revisor ni `dateModified`.
- `dateModified` sale exclusivamente de `contentUpdatedAt` (fecha de actualización editorial), nunca del timestamp técnico. Se corrige el mapeo actual de `dbPosts.ts` que copiaba `published_at`.
- Nuevo `AuthorByline` (blog y fichas): "Por X · Revisado por Y · Publicado el … · Actualizado el …", ocultando las partes sin dato.
- Structured data: se mantiene el sistema actual; se añade `author` como Person con credencial y `reviewedBy` cuando exista revisión real, y `directAnswer` alimenta `abstract`. Sin schema experimental adicional.

## 6. Activación inicial (9 URLs)

Respuesta directa, puente con enlaces internos manuales y revisor real (donde lo haya) en:
`/blog/puedo-acogerme-dos-veces-a-la-ley-de-segunda-oportunidad`, `/blog/cuantas-facturas-impagadas-cortan-luz-endesa`, `/blog/abrir-una-cuenta-bancaria-tras-la-ley-de-segunda-oportunidad`, `/blog/embargarte-coche-mas-10-anos`, `/blog/pasa-no-recoges-notificacion-juicio-monitorio`, `/empresas-de-recobro/procobro`, `/empresas-de-recobro/kruk`, `/microcreditos-prestamos/quebueno`, `/bancos-hipoteca-vivienda/caixabank`.

## Detalles técnicos

- Migración de base de datos: columnas `direct_answer`, `reviewer`, `reviewed_at`, `content_updated_at` y `bridge` en `generated_posts`; nueva tabla `site_events` (insert público anónimo, lectura solo admin, sin update ni delete).
- Archivos: `src/data/blog/types.ts`, `src/data/blog/dbPosts.ts`, `src/pages/BlogPost.tsx`, `src/components/blog/AnswerSummary.tsx`, `src/components/blog/InlineCTA.tsx`, `src/pages/seo/EntityPage.tsx`, `src/data/seo/content/entityProfiles.ts`, `src/data/seo/content/entityContent.tsx`, `src/lib/tracking.ts`, `src/lib/seo/structuredData.ts`, más `SolutionBridge.tsx`, `AuthorByline.tsx` y la barra de contacto móvil (nuevos).
