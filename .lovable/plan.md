# Rediseño de la herramienta de ventas (/admin/ventas)

Convertir la herramienta en un formulario más sistemático: una nueva fase inicial de **Presentación**, contenido dividido en **cards únicas por bloque**, un **estilo visual unificado** para todas las cards y el **gráfico de conversión integrado en la cabecera** (siempre visible, compacto).

## 1. Nueva fase "Presentación" (fase 1 de 6)

El flujo pasa de 5 a 6 fases:

```text
1. Presentación → 2. Cualificación → 3. Diagnóstico → 4. Solución → 5. Contrato → 6. Firma
```

- **Token de color propio** `--phase-presentation` (+ `-foreground` y `-soft`) en `src/index.css` (light y dark) y en `tailwind.config.ts`. Color propuesto: teal/cian (`180 65% 42%`) para distinguirlo del azul de Cualificación.
- Ampliar `STEPS`, `PHASE_THEMES`, `PHASE_VARS`/`PHASE_WEIGHT` (ConversionChart) y `phaseStyle` para 6 fases.
- Ampliar `engagementByPhase` a `[1,1,1,1,1,1]` (estado inicial, reset y test case) y `PHASE_WEIGHT` a 6 pesos (`0.15, 0.3, 0.5, 0.7, 0.85, 1.0`).
- **Contenido de la card de Presentación** (nueva, primera): 
  - Card "Datos del caso" (etiqueta + descripción del caso) se mueve aquí.
  - Card "Guion de apertura Calma": guion de rapport/presentación de la empresa (quiénes somos, garantías, encuadre de la llamada), generado por IA con `EngagementGate` para pasar a Cualificación.
- **Edge function `sales-diagnosis`**: añadir un `phase: "presentation"` que devuelve `presentation_internal` (array de cards de guion de apertura) y `presentation_client` (mensaje). Reusa el patrón de `signing`/`contract_message`. Se pre-genera al entrar o mediante el gate. Sin tocar la lógica legal/financiera existente.
- `reinforcePhase`, `PHASE_NAMES` y los índices de `runGeneration`/`goToContract`/`goToSign` se desplazan +1 (Cualificación pasa a índice 1, etc.).

## 2. Cards únicas por bloque + rediseño visual

Cada fase deja de ser una card larga con secciones y pasa a un **stack de cards independientes**, todas con la misma anatomía:

- Cabecera común de card: punto/emoji de fase + título + subtítulo corto opcional, con el color de la fase (`--phase`).
- Espaciado, bordes (`border-l-4` de fase), radios y tipografía homogéneos vía un pequeño componente interno `PhaseCard`/`SectionCard` reutilizable, para no repetir estilos.

Desglose por fase:
- **Presentación**: [Datos del caso] · [Guion de apertura].
- **Cualificación**: [Deudas por entidad] · [Vivienda] · [Vehículo] · [Empleo e ingresos/gastos] · [Resumen económico]. Hoy están apiladas dentro de una sola card; se separan en cards propias.
- **Diagnóstico**: [Capacidad de pago] · [Guion de diagnóstico] · [Gate de engagement].
- **Solución**: [Triage/solución recomendada] · [Guion de solución] · [Gate].
- **Contrato**: [Datos del contrato] · [Cálculo de pago/total] · [Guion de envío] · [Gate].
- **Firma**: [Estado de firma] · [Guion de cierre] · [Guardar/PDF].

Nada de lógica de negocio nueva: se reordena y encapsula el JSX ya existente en cards; los cálculos (`monthlyOutflow`, `paymentCapacity`, `affordablePayment`, `computeContractTotal`) se conservan igual.

## 3. Gráfico integrado en cabecera

- Mover `ConversionChart` a una **cabecera sticky** junto al stepper (compacto), siempre visible al hacer scroll dentro de la fase.
- Ajustar `ConversionChart` para 6 fases y una versión más compacta (altura menor) al ir en cabecera.
- El stepper de 6 fases se mantiene clicable y bajo el gráfico.

## Detalles técnicos

- Archivos frontend: `src/pages/AdminVentas.tsx` (principal), `src/components/ventas/ConversionChart.tsx`, `src/index.css`, `tailwind.config.ts`.
- Edge function: `supabase/functions/sales-diagnosis/index.ts` (nuevo `phase: "presentation"`, `PHASE_NAMES` con 6 entradas).
- Tipos: añadir `presentation_internal`/`presentation_client` a `AiResult`.
- No hay cambios de base de datos ni de RLS.
- Verificación: `tsgo` para tipos + revisión visual con Playwright cargando el "Caso de prueba" y recorriendo las 6 fases.

## Fuera de alcance
- No se cambia la lógica legal (Art. 607 LEC/SMI), ni los cálculos financieros, ni el guardado en `sales_cases`, ni el PDF de contrato.
