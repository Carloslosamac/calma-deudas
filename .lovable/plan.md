## Objetivo

Dar contenido real a las 23 fichas de entidad ya sembradas en `entities.ts` (Kruk, Intrum, EOS, Axactor, Link Finanzas, Vivus, Moneyman, MyKredit, Dineo, Cofidis, WiZink, Cetelem, Oney, Carrefour, Klarna, Santander, BBVA, CaixaBank, Bankinter, Sabadell, Abanca, Openbank). Hoy `EntityPage.tsx` muestra "[Contenido pendiente]". Cada ficha pasa a ser una página útil que responde a la intención "deudas con X / reclamar a X" e interconecta con su money page de solución y otras entidades del cluster.

Alcance: solo las 23 existentes (no se amplía el catálogo del Excel).

## Cómo se hace

1. **Nuevo registro de contenido** en `src/data/seo/content/entityContent.tsx`:
   - Tipo `EntityContent`: `{ slug, cluster, intro, sections, faq }` (mismo patrón `body: ReactNode` + `plain` para JSON-LD que hubs).
   - Función `getEntityContent(cluster, slug)`.

2. **Plantillas por tipo (`kind`)** para no repetir copy y mantener calidad:
   - `recobro` (Kruk, Intrum, EOS, Axactor, Link Finanzas): quién es la empresa, por qué te reclama (compra de cartera), tus derechos frente al acoso, cómo verificar la deuda, opciones (verificar/negociar/cancelar). Enlaza a `/empresas-de-recobro`, `/juicio-monitorio-recobro/...`, `/cancelar-deudas`.
   - `microcredito` (Vivus, Moneyman, MyKredit, Dineo, Cofidis): qué tipo de préstamo es, intereses/TAE, la espiral, cómo cancelar. Enlaza a `/microcreditos-prestamos/cancelar-microcreditos` y `/asnef/salir-de-asnef`.
   - `revolving` (WiZink, Cetelem, Oney, Carrefour, Klarna): tarjeta revolving, usura e intereses abusivos, cómo reclamar/anular. Enlaza a `/tarjetas-revolving/cancelar-tarjetas-revolving`.
   - `banco` (Santander, BBVA, CaixaBank, Bankinter, Sabadell, Abanca, Openbank): tipos de deuda bancaria, qué hacer si no llegas, proteger vivienda, reunificar o cancelar. Enlaza a `/cancelar-deudas` y `/reunificacion-deudas`.
   - Cada plantilla recibe el nombre de la entidad para personalizar título, intro, secciones y FAQ. Donde aporte valor, se añaden 1-2 datos específicos por entidad.

3. **Actualizar `src/pages/seo/EntityPage.tsx`**:
   - Leer `getEntityContent(...)`; si existe, pasar `intro`, `sections`, `faq` (con `buildFaq` en `structuredData`) a `SeoPageScaffold`.
   - Mantener H1, breadcrumbs, `buildLegalService` y el enlazado interno actual (solución + otras entidades del cluster).
   - Fallback al intro genérico solo si una ficha aún no tuviera contenido (las 23 lo tendrán).

## Anti-canibalización e interlinking

- La ficha se centra en la **entidad concreta** (intención de marca: "deudas con WiZink"), no compite con la money page transaccional ni con el hub: enlaza a ambos como solución.
- Todos los CTA siguen apuntando a `#hero-form` (regla de marca).

## Detalle técnico

- Archivos: crear `src/data/seo/content/entityContent.tsx`; editar `src/pages/seo/EntityPage.tsx`. Sin tocar routing ni sitemap (las fichas ya están en rutas).
- Sin colores hardcodeados; se mantiene la plantilla editorial `SeoPageScaffold`.
- Verificación: `tsc` + revisión en preview de una ficha de cada tipo (p. ej. Kruk, Vivus, WiZink, Santander) comprobando secciones, FAQ y enlaces, en móvil y escritorio.

Propongo redactarlas en una sola tanda apoyándome en las 4 plantillas por tipo. ¿Procedo así?
