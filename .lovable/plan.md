## Objetivo

Hoy el highlight del `<h1>` solo usa 2 colores: verde (`transactional`, `legal`, `calm`) y naranja (`urgent`). El objetivo es que cada tono tenga su propio acento, diferenciando las money pages también por color de cabecera, manteniendo el verde de marca como base.

## Resultado: 4 colores de highlight

| Color highlight | Páginas | Sensación |
|-----------------|---------|-----------|
| Verde de marca (actual) | Cancelar deudas, Microcréditos, Revolving, Reunificación, Reunificar, **LSO**, **Abogados LSO** | Acción / marca |
| Azul jurídico (nuevo) | Concurso, Deudas Hacienda, Deudas Seg. Social, EPI | Confianza / autoridad |
| Teal sereno (nuevo) | Cancelación de deudas | Calma / alivio |
| Naranja (actual) | ASNEF, Parar embargo, Juicio monitorio | Urgencia |

Nota: aunque LSO y Abogados LSO son páginas jurídicas, se mantienen en **verde de marca** por ser las cabeceras principales del hub. Solo las jurídicas secundarias (Concurso, Hacienda, Seg. Social, EPI) llevan el azul.

## Cómo se hace

1. **Nuevos tokens semánticos** en `src/index.css` (HSL) y su mapeo en `tailwind.config.ts`:
   - `--legal-deep` (azul oscuro, ~`215 55% 35%`) y `--legal-soft`.
   - `--calm-deep` (teal, ~`180 45% 32%`) y `--calm-soft`.
   - Se reutilizan `accent-deep` (verde) y `orange-deep` (naranja). Nada de colores hardcodeados.

2. **Extender el mapa `TONE`** en `src/components/seo/MoneyJourney.tsx`:
   - `legal` → `text-legal-deep` (azul).
   - `calm` → `text-calm-deep` (teal).
   - `transactional` y `urgent` se quedan igual.
   - El `heroBg` no cambia; solo el color del texto destacado y del badge.

3. **Reasignar el tono de LSO y Abogados LSO** de `legal` a `transactional` en sus archivos de contenido (`leySegundaOportunidad.tsx` y `abogadosLeySegundaOportunidad.tsx`), para que muestren el verde de marca. El resto de páginas conserva su `tone` actual.

## Alcance acotado

- Solo cambia el **color del highlight del título y del badge** del hero, según el tono. El resto del journey (iconos de beneficios, CTA, fondos `accent-soft`) sigue en verde de marca para mantener cohesión y respetar la regla de marca de los CTA.

## Detalle técnico

- Archivos a tocar: `src/index.css`, `tailwind.config.ts`, `src/components/seo/MoneyJourney.tsx`, `src/data/seo/content/leySegundaOportunidad.tsx`, `src/data/seo/content/abogadosLeySegundaOportunidad.tsx`.
- Verificación: revisar en preview una página de cada color (Exoneración=azul, Cancelación de deudas=teal, ASNEF=naranja, LSO y Cancelar deudas=verde) en móvil y escritorio, comprobando contraste sobre el fondo claro.

Si prefieres otros colores concretos para el azul jurídico o el teal, dímelo y los ajusto antes de implementar.
