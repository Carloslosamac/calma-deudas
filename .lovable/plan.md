# Money page LSO como journey de conversión

Transformar `/ley-segunda-oportunidad` (hoy bloques de texto apilados) en una landing visual con módulos, siguiendo la dirección **Modern legal journey** y los tokens de marca Calma (verde `accent`, navy `foreground/primary`, Poppins). Sin gradientes en CTAs; todos los CTA siguen haciendo scroll a `#hero-form`.

## Enfoque
Ampliar la capa de contenido ya creada (`src/data/seo/content`) con módulos visuales opcionales y crear un layout `MoneyJourney`. Si una money page tiene `hero` definido, se renderiza con el journey; si no, sigue usando el scaffold actual. Así el patrón es reutilizable para el resto de money pages.

## Cambios

### 1. Modelo de contenido — `src/data/seo/content/types.ts`
Añadir tipos opcionales: `MoneyHero`, `MoneyBenefit` (con icono), `MoneyStep`, `MoneyMetric`, `MoneyEligibility`, `MoneyClosing`, y un set de iconos (`MoneyIcon`). Ampliar `MoneyContent` con `hero`, `benefits`, `steps`, `metrics`, `eligibility`, `closing` (todos opcionales).

### 2. Contenido LSO — `src/data/seo/content/leySegundaOportunidad.tsx`
Reestructurar el copy ya escrito en módulos:
- **hero**: badge + H1 ("Cancela tus deudas legalmente y *empieza de cero*") + subtítulo + nota "Sin DNI · Sin compromiso".
- **benefits** (4 tarjetas con icono): Cancelación legal, Adiós al acoso, Suspende embargos, Equipo experto.
- **steps** (4, el último resaltado): Diagnóstico → Preparación → Presentación → Exoneración.
- **metrics** (3, sin inventar cifras de éxito): "Gratis" (diagnóstico inicial), "6–18 meses" (plazo medio), "RGPD" (datos protegidos).
- **eligibility** (bloque oscuro "¿Es para mí?") con los 4 requisitos + nota "Revisado por abogado".
- Se conservan como `sections` en prosa: "Coste y plazos" y "Otras vías que valoramos contigo" (con enlaces internos a revolving, microcréditos, reunificar, cancelar, EPI).
- **faq**: las 5 actuales (con JSON-LD FAQPage).
- **closing**: CTA final "¿Empezamos hoy mismo?".
- Mantener el enlace al post pilar `/blog/guia-ley-segunda-oportunidad`.

### 3. Nuevo layout — `src/components/seo/MoneyJourney.tsx`
Componente que arma la página con `Header`, `Seo`, `Breadcrumbs` y `FormSection`/`Footer`, y renderiza en orden:
1. Hero centrado (pill + H1 con acento + subtítulo + `CtaButton` + nota de confianza).
2. Grid de beneficios (tarjetas `surface-elevated` con icono en `accent-soft`).
3. Journey de pasos (tarjetas verticales conectadas; último paso en `accent-soft`).
4. Banda de métricas (3 columnas).
5. Secciones en prosa (coste/plazos, otras vías) en tarjetas.
6. Bloque oscuro "¿Es para mí?" (`bg-primary`/`gradient-dark`) con requisitos + sello de revisión legal.
7. FAQ (acordeón `FaqList`).
8. CTA de cierre (banda `accent-soft`, botón sólido — sin gradiente).
9. Enlazado interno relacionado.
- Animación: revelado suave por scroll con framer-motion (fade/slide) y hover sutil en tarjetas.
- Iconos vía `lucide-react` mapeados desde `MoneyIcon`.

### 4. Resolver — `src/pages/seo/MoneyLanding.tsx`
Si `content?.hero` existe → renderizar `MoneyJourney` (pasando page, content, breadcrumbs, related, structuredData, canonical). Si no, mantener el `SeoPageScaffold` actual. Conservar breadcrumb + LegalService + FAQ JSON-LD.

## Notas
- Solo cambia la presentación de la money page; SEO (title/meta/canonical/structured data) y la regla de CTAs se mantienen.
- El resto de money pages sin `hero` siguen con el scaffold (placeholder) sin cambios.
- QA en preview tras implementar (desktop y móvil).
