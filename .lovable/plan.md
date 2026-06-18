## Objetivo

Corregir en todo el sistema el concepto de **reunificar**, que ahora mismo está redactado como la definición bancaria de los competidores (agrupar préstamos en un nuevo préstamo/hipoteca → baja cuota pero **sube** el total). Reemplazarlo por la definición de Calma:

- **Reunificar (Calma)** = **negociación extrajudicial con las entidades** para rebajar **la cuota mensual Y el coste total** de la deuda. Mejoramos lo que ya existe; no es un préstamo nuevo, no hay tasación/notaría/hipoteca, no alarga el plazo para encarecer.
- **Refinanciar** = se mantiene como **contraste educativo** (la opción "mala"): pedir un préstamo nuevo que agrupa todo, baja la cuota pero **alarga el plazo y encarece el total**.

Esto es prioritario porque alimenta vuestros sistemas de construcción de contenido: la distinción debe quedar inferida y coherente en todos los textos.

## Alcance del problema (dónde está mal hoy)

1. `src/data/seo/content/reunificacionDeudas.tsx` — "junta todos tus préstamos en una única cuota", "agrupar".
2. `src/data/seo/content/reunificarDeudas.tsx` — "juntamos todos tus préstamos en una sola cuota", "poniendo tu vivienda como garantía", "agrupando todo en una cuota".
3. `src/data/seo/content/enrichment.ts` — bloque `/reunificacion-deudas` y `/reunificar-deudas`: FAQs y "mitos" basados en SERP que describen la reunificación bancaria (requisitos del banco, ASNEF imposible, documentación para "agrupar", préstamo personal/hipotecario, gastos notariales, tasación, cancelar tarjetas, cambiar de banco, "la deuda sigue igual o mayor").
4. `src/components/seo/interactive/DebtSimulator.tsx` — la opción `reunificar` dice "No cancela: agrupa todo en un préstamo y reduce el total"; hay que reescribir la descripción y los motivos del motor de recomendación.
5. `src/data/seo/content/comparativaContent.tsx` (slug `reunificar-o-cancelar`) — "junta todos tus préstamos en una sola cuota", "reunificar solo alarga el problema y encarece el total", "suele aumentar el coste total: muchos más años de intereses", "garantía hipotecaria".
6. `src/data/seo/comparativas.ts` — descripción del nodo comparativo.
7. Referencias cruzadas en otras money pages que describen reunificar como agrupar préstamos: `cancelarDeudas.tsx`, `deudasHacienda.tsx`, `salirDeAsnef.tsx`, `cancelarMicrocreditos.tsx` y bloques equivalentes en `enrichment.ts` (p. ej. "agrupar deudas en una sola hipoteca", "usar tu vivienda como aval en una reunificación").

## Cambios a realizar

### 1. Mensaje base de reunificar (páginas pilar y acción)
En `reunificacionDeudas.tsx` y `reunificarDeudas.tsx`:
- Reescribir intro, subtítulos, beneficios y pasos: reunificar = **negociamos extrajudicialmente con tus acreedores** para **bajar la cuota mensual y el importe total** que debes; sin préstamo nuevo, sin tasación ni hipoteca.
- Mantener el triaje actual intacto (confirmado): el caso ideal de reunificar sigue siendo el perfil con bienes de valor pagados / cuando aún puedes asumir cuota; solo cambia **qué es** reunificar, no **cuándo** se recomienda.
- Corregir la frase de protección de patrimonio: reunificar protege la vivienda **porque no entra en liquidación** (no porque "agrupes todo en una hipoteca").
- Reescribir el bloque "Cuándo NO conviene reunificar" para que el riesgo no sea "poner tu vivienda como garantía" (eso es refinanciar), sino: cuando la deuda te supera del todo, mejor cancelar con la LSO.

### 2. Enrichment (`enrichment.ts`)
- Reescribir/sustituir las FAQs y "mitos" de `/reunificacion-deudas` y `/reunificar-deudas` que asumen el préstamo bancario. Nuevas FAQs alineadas: cómo negociamos con las entidades, qué quitas/rebajas se pueden conseguir, por qué baja también el total, en qué se diferencia de pedir un préstamo de reunificación, qué pasa si una entidad no acepta, plazos de la negociación.
- Reescribir el "mito" estrella: en lugar de "la reunificación no elimina deuda (o la aumenta)", el contraste correcto es **reunificar (negociar, baja cuota y total) vs refinanciar (préstamo nuevo, sube total)**.
- Limpiar referencias cruzadas en otros paths del enrichment que mandan a reunificar con lenguaje de "hipoteca/aval/agrupar préstamos".

### 3. Simulador (`DebtSimulator.tsx`)
- `reunificar.desc` → "No es un préstamo nuevo: **negociamos con tus entidades** para bajar tu cuota **y** el total que debes." Mantener el cálculo (ya reduce cuota y total).
- `refinanciar.desc` se mantiene como contraste (alarga plazo, sube total).
- Ajustar los textos del motor de recomendación (`recommendation.reason`) para reflejar "negociar" en vez de "agrupar".

### 4. Comparativa reunificar vs cancelar
- `comparativaContent.tsx` y `comparativas.ts`: reescribir para que el eje sea reunificar (negociación extrajudicial que baja cuota y total, la deuda sigue existiendo pero mejorada) vs cancelar (LSO la elimina). Eliminar las afirmaciones de "encarece el total / muchos más años de intereses / garantía hipotecaria", que pertenecen a refinanciar; opcionalmente añadir refinanciar como tercera columna/aviso de contraste.

### 5. Memoria del proyecto
- Actualizar `mem://features/solution-triage` y el módulo de definiciones: añadir explícitamente "reunificar = negociación extrajudicial que baja cuota Y total; NO es refinanciar (préstamo nuevo que alarga plazo y sube total)". Añadir una línea Core para que todo contenido futuro respete la distinción.

## Verificación
- Compilación TS correcta.
- Revisión visual de `/reunificacion-deudas`, `/reunificar-deudas`, la comparativa `reunificar-o-cancelar` y el simulador comparativo: confirmar que ningún texto describe reunificar como "préstamo nuevo / agrupar en una hipoteca / sube el total".
- `rg -i "agrupa|un solo préstamo|nueva hipoteca|garantía hipotecaria"` sobre los nodos de reunificación para confirmar que no quedan restos del concepto antiguo (salvo donde se use a propósito para describir refinanciar).

## Notas
- Todas las CTAs siguen apuntando a `#hero-form`.
- Se respeta el kit de módulos legibles (sin muros de prosa) y la marca "Calma".
- No se inventan cifras nuevas; las quitas/rebajas se describen como orientativas y confirmables en el estudio gratis.
