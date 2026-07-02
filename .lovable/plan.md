## Objetivo

Reestructurar `/admin/ventas` en tres frentes: (1) la **Presentación** pasa a ser una fase de pura autoridad, antes de tocar el caso; (2) los datos del caso se recogen en un **panel sticky** de "datos relevantes" añadidos uno a uno, disponible en cualquier fase y que alimenta la IA; (3) cada fase se muestra como **una sola card** (unicard), no varias.

## 1. Fase Presentación = autoridad, sin datos del caso

- Eliminar de la card de Presentación (`step === 0`) el bloque "Datos del caso" (etiqueta + textarea). Esos datos migran al panel sticky (punto 2).
- La fase 0 queda como **una única card** con:
  - Cabecera tajante de autoridad: título fuerte tipo "Encuadre de autoridad Calma" con copy directo (quiénes somos, resultados, por qué escucharnos), estilo contundente — tipografía `font-anton`/mayúsculas para el titular, tono teal de fase.
  - El **guion de apertura** (`presentation_internal` / `presentation_client`) con su botón Generar/Regenerar (se conserva la llamada `runPhase("presentation")`).
  - El `EngagementGate` "¿Cómo te ha recibido?" para pasar a Cualificación.
- El guion de apertura ya no depende de que el comercial haya escrito el caso: usará los datos relevantes del sticky si los hay, y si no, genera un encuadre de autoridad genérico de Calma.

## 2. Panel sticky "Datos del caso" (datos relevantes uno a uno)

- Nuevo estado en `AdminVentas`: `relevantFacts: string[]` (sustituye al uso de `caseText` como textarea). Se mantiene `label` (etiqueta del caso).
- Añadir el panel **dentro de la cabecera sticky superior**, debajo del gráfico y el stepper (según lo elegido):
  - Input "Etiqueta del caso".
  - Campo "Añadir dato relevante" + botón `+` que hace push a `relevantFacts`. Enter también añade.
  - Lista de chips/filas de los datos añadidos, cada uno con botón de borrar.
  - Colapsable (mostrar/ocultar) para no ocupar demasiado alto en el sticky; muestra un contador "N datos" cuando está plegado.
- El panel es visible y editable en **todas las fases** (vive en la cabecera común, no dentro de una fase).
- **Alimentar la IA**: componer `caseText` a partir de `label` + `relevantFacts` unidos (p. ej. una línea por dato) justo antes de cada llamada (`runPhase`, `runGeneration`, contrato/firma). Así el edge function `sales-diagnosis` no cambia (sigue recibiendo `caseText`), y el guardado en `sales_cases` (`case_text`) sigue funcionando.
- Ajustar la validación actual `caseText.trim().length < 10`: pasar a exigir al menos 1 dato relevante; el mensaje de aviso apuntará a "añade datos relevantes del caso".
- `TEST_CASE`: convertir su `caseText` en un array `relevantFacts` de ejemplo (deudas, ingresos, situación) para que el "Caso de prueba" siga rellenando todo.

## 3. Unicard por fase

- Reemplazar el stack de varias `SectionCard` por **una sola card por fase**, con secciones internas separadas por subtítulos/divisores (no cards anidadas):
  - **Cualificación** (`step === 1`): hoy son 5 `SectionCard` (deudas, empleo/ingresos/gastos, vivienda, vehículo, resumen). Se funden en una card con encabezados internos de sección.
  - **Presentación / Diagnóstico / Solución / Contrato / Firma**: una card cada una (Diagnóstico–Firma ya son prácticamente una card; se homogeneízan al mismo patrón unicard).
- Convertir `SectionCard` en un **contenedor de sección interno** (subtítulo + separador) reutilizable dentro de la card única, en lugar de una card completa con borde propio. La card externa lleva el `border-l-4` y color de fase; las secciones internas solo llevan título + `Separator`.
- Los `EngagementGate` y gates de continuación quedan **dentro o justo bajo** la card única de su fase (se mantienen como están funcionalmente).

## Detalles técnicos

- Archivo principal: `src/pages/AdminVentas.tsx` (estado, sticky, render de fases, composición de `caseText`).
- `src/components/ventas/ConversionChart.tsx`: sin cambios de lógica (ya soporta 6 fases y `compact`).
- Sin cambios en el edge function `sales-diagnosis` (sigue recibiendo `caseText`), sin cambios de BD ni RLS.
- Verificación: `tsgo` para tipos + recorrido visual con Playwright cargando "Caso de prueba" por las 6 fases, comprobando que el sticky de datos relevantes se mantiene y alimenta los guiones.

## Fuera de alcance

- No se cambia la lógica legal (Art. 607 LEC/SMI), ni los cálculos financieros (`monthlyOutflow`, `paymentCapacity`, `affordablePayment`, `computeContractTotal`), ni el PDF de contrato, ni el guardado en `sales_cases`.