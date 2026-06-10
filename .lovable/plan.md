## Objetivo

Dar contenido real a los 12 hubs de cluster satélite, que hoy renderizan solo intro + enlaces con secciones en placeholder ("Contenido pendiente"). Cada hub pasa a ser una página índice editorial con copy propio, secciones SEO, FAQ (con JSON-LD) e interlinking reforzado hacia sus money pages y fichas de entidad.

Los 3 hubs "principales" (LSO, Cancelar deudas, Reunificar) NO entran aquí: sus URLs ya se sirven como money pages. Esto cubre solo los satélites:

```
asnef · embargos · tarjetas-revolving · microcreditos-prestamos ·
deudas-hacienda-seguridad-social · juicio-monitorio-recobro ·
bancos-hipoteca-vivienda · autonomos-concurso-acreedores ·
empresas-de-recobro · situaciones · estafas-fraude · guias
```

## Cómo se hace

1. **Nuevo registro de contenido de hub** en `src/data/seo/content/hubContent.tsx`:
   - Tipo `HubContent`: `{ slug, intro, sections: ContentSection[], faq: { q; a; plain }[] }`.
   - Función `getHubContent(slug)`.
   - Reutiliza `ContentSection` y el patrón de FAQ ya existentes (igual que las money pages, con `plain` para el JSON-LD).

2. **Actualizar `src/pages/seo/ClusterHub.tsx`**:
   - Leer `getHubContent(cluster.slug)`.
   - Pasar `intro`, `sections` y `faq` a `SeoPageScaffold` (ya soporta ambos).
   - Añadir `buildFaq(...)` al `structuredData` cuando el hub tenga FAQ.
   - Mantener el enlazado interno actual (money pages del cluster + entidades + clusters relacionados).

3. **Redactar el copy de los 12 hubs** (long-form SEO, ángulo propio por cluster):
   - Cada hub: intro potente, 3–5 secciones (qué cubre la sección, situaciones típicas, tus opciones/derechos, cómo te ayudamos) y 3–5 FAQ.
   - Interlinking explícito en el cuerpo hacia las money pages del cluster (p. ej. ASNEF → "Salir de ASNEF") y, donde aplique, hacia fichas de entidad (revolving → WiZink/Cetelem; microcréditos → Vivus/Moneyman; recobro → Kruk/Intrum; bancos → Santander/BBVA).
   - Tono coherente con el cluster: urgente (ASNEF, embargos, monitorio, recobro), transaccional (revolving, microcréditos, públicas, autónomos), informativo (bancos, situaciones, estafas, guías).
   - Todos los CTA siguen apuntando a `#hero-form` (regla de marca).

## Anti-canibalización

- El hub habla del **tema/cluster** (visión general + navegación), no compite con la money page concreta: el hub `/asnef` orienta y enlaza, y "Salir de ASNEF" es la página transaccional. Se evita duplicar el mismo enfoque keyword.

## Detalle técnico

- Archivos: crear `src/data/seo/content/hubContent.tsx`; editar `src/pages/seo/ClusterHub.tsx`. Sin tocar routing, sitemap ni backend (los hubs ya están en rutas y sitemap).
- Sin colores hardcodeados; se mantiene la plantilla editorial `SeoPageScaffold` (deliberadamente distinta del journey de las money pages).
- Verificación: build + revisión en preview de 3–4 hubs (ASNEF, embargos, revolving, recobro) comprobando secciones, FAQ y enlaces, en móvil y escritorio.

Por volumen de copy, propongo redactar los 12 en una sola tanda. Si prefieres, puedo empezar por 3–4 como muestra antes de completar el resto.
