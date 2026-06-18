# Fichas de entidad: máxima tranquilidad y respuesta a los miedos reales

## Objetivo
Convertir cada ficha de entidad (`/<cluster>/<slug>`) en una página que transmita **seguridad, calma, compañía y autoridad**, y que responda a los **miedos reales** que tiene la gente que debe a esa entidad (los que aparecen en foros y en "la gente también pregunta"), no a lo que dicen los 10 primeros resultados de Google.

Aplica a las ~102 entidades reusando las 4 plantillas por tipo (recobro, microcrédito, revolving, banco), para que sea coherente y exhaustivo desde el primer momento.

## Investigación previa (foros reales)
Antes de escribir, recopilaré las dudas y miedos recurrentes reales en foros y SERP por cada tipo de entidad (Reddit, Forocoches, foros de deudas/legal, "preguntas relacionadas" de Google). Ejemplos de miedos a cubrir:

```text
Recobro:        ¿Pueden venir a mi casa? ¿Me llaman al trabajo o a familiares?
                ¿Pueden embargarme sin avisar? ¿Aparezco en ASNEF? ¿Está prescrita?
Microcréditos:  La bola de nieve, refinanciar para tapar, intereses abusivos,
                ASNEF por impago pequeño, vergüenza, llamadas constantes.
Revolving:      "Pago y la deuda no baja", usura, reclamar lo pagado de más,
                miedo a perjudicar el historial, ¿puedo reclamar si ya pagué?
Bancos:         Hipoteca/vivienda en riesgo, embargo de nómina, avales,
                descubiertos, ¿pierdo mi casa?, ¿me quedo sin cuenta?
```

Estos miedos alimentarán los bloques de "Mitos vs realidad" y las FAQ, personalizados con el nombre de la entidad.

## Estructura nueva de cada ficha
Reescribir `src/data/seo/content/entityContent.tsx` para que cada plantilla por tipo genere, además del contenido actual, estos bloques (usando el kit de módulos en `src/components/seo/modules`):

1. **Bloque de tranquilidad emocional** (KeyCallout): "Tu deuda con {entidad} tiene solución. No estás solo/a. Recupera tu espacio y tu tranquilidad." Mensaje cálido y humano al inicio.
2. **Por qué te reclama / cómo funciona** (se mantiene, mejorado).
3. **Tus miedos, resueltos** (nuevo): los miedos reales de foros para ese tipo, cada uno con la realidad legal tranquilizadora (CheckList / FactGrid).
4. **Mitos vs realidad** (nuevo, Callout/FactGrid): desmonta falsas creencias ("mañana me embargan la nómina", "van a ir a mi casa", "voy a estar fichado para siempre") con la realidad.
5. **Por qué Calma** (nuevo, KeyCallout/CheckList): especialistas en Ley de Segunda Oportunidad, acompañamiento humano, casos resueltos, primer paso sin compromiso. "Somos los mejores y queremos que lo sepas."
6. **Tus opciones / cómo cancelar o reclamar** (se mantiene, con interlinking a money pages según `solutionPath`).
7. **CTA reforzado** (varios puntos): botones cálidos que llevan a `#hero-form` (regla de proyecto), no a otras páginas.
8. **FAQ ampliada** (FAQPage JSON-LD): de 2-3 preguntas a 5-7 por tipo, basadas en los miedos reales, personalizadas con el nombre de la entidad.

## Detalle técnico
- **`src/data/seo/content/entityContent.tsx`**: reescribir las 4 funciones (`recobroContent`, `microcreditoContent`, `revolvingContent`, `bancoContent`) para devolver las secciones nuevas. Reutilizar los módulos del kit (KeyCallout, CheckList, FactGrid, Callout/WarningCallout, OptionCards, A) en lugar de párrafos sueltos, siguiendo la regla de "módulos legibles, nunca muros de texto".
- **CTA en mitad de ficha**: insertar `CtaButton` dentro de secciones clave (el componente ya apunta a `#hero-form`). Si hace falta, añadir un pequeño módulo de CTA reutilizable.
- **NOTES por entidad**: mantener y, donde aporte, enriquecer la nota específica para que el copy no quede genérico.
- **FAQ → JSON-LD**: `EntityPage.tsx` ya construye `buildFaq` desde `content.faq`; al ampliar las FAQ se enriquece automáticamente el structured data. Sin cambios estructurales en `EntityPage.tsx`.
- **Meta**: revisar `seoTitle`/`metaDescription` en `EntityPage.tsx` para reforzar el ángulo de tranquilidad/solución (p. ej. "Deudas con {entidad}: soluciónalas con calma").
- Sin cambios de backend ni de datos: todo es contenido/presentación.

## Resultado
Las 102 fichas pasan de informativas a **persuasivas y tranquilizadoras**, resolviendo los miedos reales de quien debe a cada entidad y posicionando a Calma como el acompañante experto, manteniendo coherencia, SEO (FAQ JSON-LD ampliado) y la regla de CTAs hacia `#hero-form`.
