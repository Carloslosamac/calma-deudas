## Por qué cambia el enfoque

Tenías razón: `/cancelar-deudas` ya usa `comparisonTable`, `legalTimeline`, `simulator`, `quiz`, `debtTypes`, `urgencyTimeline` y `beforeAfter`. Reutilizar cualquiera de esos módulos en `/cancelacion-de-deudas` hace que las dos páginas se sientan iguales.

La solución no es reordenar módulos existentes, sino crear **módulos interactivos nuevos, exclusivamente educativos**, que por su naturaleza solo tienen sentido en la página-guía y nunca aparecerán en la landing de acción.

## Reparto claro de roles

```text
/cancelar-deudas      → herramientas de DECISIÓN/ACCIÓN
  simulador, quiz, comparativa de soluciones, urgencia, antes/después

/cancelacion-de-deudas → herramientas de COMPRENSIÓN
  glosario, mitos vs realidad, límites de exoneración pública
```

## Módulos nuevos (solo en la página informativa)

1. **Glosario de conceptos clave** (componente nuevo `ConceptGlossary`)
   Acordeón que define en lenguaje claro los términos que la gente busca para *entender* el tema: insolvencia, buena fe, pasivo insatisfecho, exoneración, acuerdo extrajudicial de pagos, BEPI. Pura pedagogía. No existe en la landing.

2. **Mitos vs realidad** (componente nuevo `MythVsReality`)
   Tarjetas con un "mito" frecuente ("la cancelación de deudas es un timo", "no se puede cancelar Hacienda", "perderé todos mis bienes") y su realidad legal. Refuerza confianza desde el ángulo informativo, sin discurso comercial.

3. **Límites de exoneración de deuda pública** (componente existente `exonerationLimits`, hoy sin usar en esta página y ausente en la landing)
   Explica hasta dónde se cancela la deuda con Hacienda y Seguridad Social. Duda informativa muy buscada.

## Qué se quita para no solapar con la landing

- Se retira `legalTimeline` de `/cancelacion-de-deudas` (sigue viviendo en `/cancelar-deudas`). Su contenido de "vías y plazos" ya queda cubierto por las `sections` de texto + el glosario.
- `debtTypes` se mantiene **solo** como puente de navegación (cada tipo enlaza a su solución), no como herramienta de conversión.

## Layout final propuesto

```text
sections           (qué es, vías, requisitos, plazos)
conceptGlossary    (nuevo · entender los términos)
mythVsReality      (nuevo · derribar mitos)
benefits           (qué permite)
exonerationLimits  (límites deuda pública)
debtTypes          (puente a la solución por tipo)
eligibility        (requisitos)
steps              (cómo es el proceso)
metrics
faq
testimonials
closing            (único enlace fuerte guía → acción)
```

## Detalle técnico

- **Tipos** (`src/data/seo/content/types.ts`): añadir `MoneyConceptGlossary` y `MoneyMythVsReality`, y sus claves en `MoneyInteractive` y `MoneyModuleKey`.
- **Componentes nuevos**: `src/components/seo/interactive/ConceptGlossary.tsx` y `MythVsReality.tsx`, siguiendo el estilo de los componentes existentes (tokens semánticos, `Reveal`, sin colores hardcodeados).
- **`MoneyJourney.tsx`**: registrar los dos bloques nuevos en `blocks` y en `DEFAULT_ORDER`.
- **`cancelacionDeDeudas.tsx`**: añadir el contenido de `conceptGlossary`, `mythVsReality` y `exonerationLimits` dentro de `interactive`; actualizar `layout`; quitar `legalTimeline`.
- Sin tocar `/cancelar-deudas`, SEO ni rutas. Los módulos transaccionales ya retirados (simulator/quiz/beforeAfter) siguen fuera.

## Anti-canibalización

Ningún módulo interactivo se comparte ya entre las dos páginas. La informativa enseña (glosario, mitos, límites); la landing convierte (simulador, quiz, comparativa). Se conserva el único enlace fuerte guía → acción en el cierre.
