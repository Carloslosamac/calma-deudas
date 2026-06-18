## Diagnóstico

El módulo `legalTimeline` se usa en 4 money pages. Los **títulos y subtítulos ya son distintos**, pero el contenido real (las `phases`) se solapa mucho, sobre todo entre:

- `/ley-segunda-oportunidad` y `/exoneracion-pasivo-insatisfecho` → casi idénticas (acuerdo extrajudicial → vía judicial → exoneración, con la misma redacción).
- `/concurso-persona-fisica` → comparte la misma columna vertebral.

`/cancelar-deudas` ya es la más diferenciada (enfoque comercial: diagnóstico → elegir vía → puesta en marcha → deuda eliminada), así que se deja como está.

El objetivo: que cada página que use el módulo cuente **el mismo proceso desde su propio ángulo**, con redacción, número de fases y énfasis distintos, para que no haya bloques calcados entre URLs.

## Reescritura por página

**1. `/ley-segunda-oportunidad`** — *página pilar del procedimiento completo*
Se mantiene como la línea de tiempo canónica de las fases de la LSO (diagnóstico → acuerdo extrajudicial → procedimiento judicial → exoneración BEPI). Es la referencia; las demás se diferencian de ella.

**2. `/exoneracion-pasivo-insatisfecho`** — *ángulo: el mecanismo de exoneración en sí*
Se reenfoca de "fases de un procedimiento" a "cómo se llega y qué cubre la exoneración". Nuevas fases centradas en el resultado, no en el trámite genérico:
- Requisitos de acceso (insolvencia + buena fe)
- Modalidad **con** plan de pagos vs **sin** liquidación (lo propio de la EPI)
- Alcance: qué deudas se exoneran y límites de deuda pública
- Resolución y efectos (firmeza, salida de ASNEF, posible revocación)
Redacción totalmente distinta y específica de la EPI.

**3. `/concurso-persona-fisica`** — *ángulo: procedimiento concursal*
Se reescriben las fases con terminología concursal propia (auto de declaración, administración concursal, fase común, convenio/liquidación, conclusión), separándola claramente de la redacción de la LSO genérica.

**4. `/cancelar-deudas`** — sin cambios (ya diferenciada, enfoque acción/comercial).

## Detalle técnico

- Solo se editan los objetos `interactive.legalTimeline` en:
  - `src/data/seo/content/exoneracionPasivoInsatisfecho.tsx`
  - `src/data/seo/content/concursoPersonaFisica.tsx`
  - (revisión menor de wording en `leySegundaOportunidad.tsx` si hace falta para separarlo de la EPI)
- Se variará también el número de fases entre páginas para reducir similitud estructural.
- Sin cambios en el componente `LegalTimeline.tsx`, ni en tipos, rutas ni SEO.
- `/cancelar-deudas` y `/cancelacion-de-deudas` no se tocan.

## Resultado

Cada money page que muestra la línea de tiempo legal tendrá fases con título, duración y texto propios y un ángulo diferenciado, eliminando los bloques duplicados entre URLs.
