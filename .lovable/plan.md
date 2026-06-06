# Mejoras de confianza y conversión — LSO

Dos añadidos a la página `/ley-segunda-oportunidad`: una banda de **prueba social de marca** y una **CTA fija en móvil**.

## 1. Prueba social de marca

Nuevo componente `TrustBar` que muestra, en una banda limpia justo debajo del hero:

- **Valoración tipo Trustpilot**: 5 estrellas, nota destacada (ej. "4,8/5") y nº de reseñas (ej. "+1.200 valoraciones").
- **Casos resueltos**: cifra fuerte (ej. "+19.000 familias sin deudas") con icono.
- **Sello de confianza**: "Respuesta en 24h · Gratis · Sin compromiso".
- **Logos de medios**: fila de medios ("Han hablado de nosotros") reutilizando el estilo del componente `MediaLogos` ya existente, en versión compacta.

Se integra en `MoneyJourney.tsx` para que aparezca en todas las money pages (no solo LSO), justo tras el hero y antes del simulador. Los textos saldrán de un nuevo bloque opcional `socialProof` en el contenido, con valores por defecto sensatos para que no rompa otras páginas.

## 2. CTA fija en móvil

Nuevo componente `MobileCtaBar`:

- Barra fija en la parte inferior, **solo en móvil** (`md:hidden`).
- Botón "Analizar mi deuda gratis" que hace scroll a `#hero-form` (regla de marca, sin navegar a otra página ni gradientes).
- Aparece al hacer scroll más allá del hero y se oculta arriba del todo, con una transición suave.
- Se añade una vez en `MoneyJourney.tsx` para cubrir todas las money pages.

## Detalles técnicos

- **Archivos nuevos**: `src/components/seo/TrustBar.tsx`, `src/components/seo/MobileCtaBar.tsx`.
- **Editar** `src/components/seo/MoneyJourney.tsx`: render de `TrustBar` tras el hero y `MobileCtaBar` al final del `main`.
- **Editar** `src/data/seo/content/types.ts`: tipo opcional `socialProof` (rating, ratingCount, casesLabel, mediaLabel) en `MoneyContent`.
- **Editar** `src/data/seo/content/leySegundaOportunidad.tsx`: añadir bloque `socialProof`.
- Reutilizar la lógica `scrollToForm` (extraer a util compartido o replicar) para el botón fijo.
- Estilo con tokens del design system (accent, surface, border); estrellas con `lucide-react`; sin gradientes en el botón CTA.
- Padding inferior extra en móvil para que la barra fija no tape contenido (FormSection/Footer).

## Verificación

Revisar en preview a 375px (barra fija visible y funcional) y en desktop (TrustBar correcto, barra oculta), comprobando que el CTA hace scroll a `#hero-form`.
