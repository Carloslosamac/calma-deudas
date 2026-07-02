## Objetivo

Convertir `/admin/ventas` en un flujo tipo **typeform**: una sola card centrada en pantalla, una cosa por pantalla (o una frase/guion para avanzar, o una pregunta), navegación con botones Siguiente/Atrás, y una barra de progreso mínima arriba en lugar de la sidebar de dos columnas.

Se mantiene intacta toda la lógica de negocio: estado del caso, llamadas a la IA (`sales-diagnosis`), triage, engagement, refuerzos, guiones y guardado. Solo cambia la **presentación/navegación**.

## Modelo de pantalla (nuevo)

Se introduce una noción de "pantalla" (screen) dentro de cada fase. El flujo global es una secuencia lineal de pantallas derivada del estado actual (`step`, `qualStep`, `result`, etc.). Cada pantalla es de uno de estos tipos:

```text
statement  -> guion/frase para leer + botón "Siguiente"
question   -> una sola pregunta/campo + botón "Siguiente"
gate       -> pantalla de reacción/engagement (frases + tier) + "Continuar"
```

Solo se renderiza **una** pantalla a la vez, centrada (`max-w-2xl mx-auto`), con animación de entrada suave (fade/slide) al cambiar.

## Secuencia de pantallas por fase

1. **Presentación** (fase 0): 3 pantallas `statement`, una por cada guion de apertura (A/B/C) — cada una con su texto y botón Copiar + "Siguiente". Luego la pantalla `gate` de presentación.
2. **Cualificación** (fase 1): una pregunta por pantalla:
   - Etiqueta del caso / dato relevante (añadir hechos)
   - Deudas por entidad (se mantiene el sub-editor de deudas como una pantalla, ya que es una lista repetible; una fila por deuda dentro de esa pantalla)
   - Empleo → Ingresos → Gastos (pantallas separadas)
   - Vivienda (tipo + importes condicionados)
   - Vehículo (tipo + importes condicionados)
   - Resumen económico (pantalla `statement` de solo lectura con el cálculo de capacidad de pago)
   - Pantalla `gate` de cualificación → "Generar diagnóstico"
3. **Diagnóstico** (fase 2): pantalla(s) `statement` con el guion (una por card de guion, en vez de la cuadrícula/tabs) → `gate`.
4. **Solución** (fase 3): igual que diagnóstico → `gate`.
5. **Contrato** (fase 4): guion de cierre en pantallas `statement` → `gate`.
6. **Firma** (fase 5): guion de cierre + estado de firma → `gate` final.

Cada guion sigue teniendo el toggle "Guion comercial / Para el cliente" dentro de su pantalla, pero mostrando un guion por pantalla.

## Cambios de layout

- Eliminar la rejilla de dos columnas (`lg:grid-cols-[340px_...]`) y la sidebar (gráfico de conversión, stepper vertical, panel del caso, engagement anclado).
- Contenedor raíz: pantalla completa centrada vertical y horizontalmente, `min-h-screen flex flex-col`, sin `overflow-hidden`.
- **Barra de progreso mínima arriba**: barra fina de progreso (porcentaje = pantalla actual / total) + etiqueta corta de la fase actual + acceso plegable a "datos del caso" (para consultar los hechos añadidos sin salir del flujo). El `ConversionChart` se retira del flujo principal (se puede mantener accesible desde el plegable si se quiere, opcional).
- Card de la fase: sigue usando el color de fase (`--phase`, `PhaseCard`, tokens existentes) para mantener coherencia visual.
- **Navegación**: pie de card con botón "Atrás" (secundario, contorno de fase) y "Siguiente"/CTA principal (relleno de fase). Sin atajos de teclado. En la última pantalla de cada fase, "Siguiente" dispara la acción correspondiente (generar IA, avanzar de fase, guardar).

## Detalle técnico

- Nuevo estado `screenIndex` (índice dentro de la fase) o una función que aplane fase→pantallas. Recomendado: construir un array `screens` derivado con `useMemo` a partir de `step`, `qualStep`, `guide`, `result`, `reactions`, `engagement`. Cada entrada: `{ id, phase, kind, render() }`.
- `goNext()` / `goBack()` recorren el array; al cruzar el límite de una fase invocan las funciones ya existentes (`proceedToQualification`, `generate`, `proceedToSolution`, `goToContract`, `goToSign`, `runPhase`). Se reutilizan tal cual — no se toca su implementación.
- Reutilizar los componentes existentes (`EngagementGate`, `ResultBlock` adaptado a una card, editor de deudas, campos de vivienda/vehículo) extrayendo cada bloque a una función de render de pantalla. No se cambia la forma de los datos ni el payload al edge function.
- Añadir transición con clases de Tailwind (`animate-in fade-in slide-in-from-bottom-2`) al montar cada pantalla.
- Mantener validación mínima por pantalla (p. ej. no avanzar de "deudas" si no hay ninguna) reutilizando la lógica actual de `qualStep`.

## Archivos afectados

- `src/pages/AdminVentas.tsx` (reestructuración del render y navegación; la lógica de estado/IA se conserva).
- Posible `src/index.css`: no requiere cambios de tokens; los estilos `.phase-card` existentes siguen aplicando.

## Notas / riesgos

- Es un refactor grande de un archivo de ~2500 líneas; el objetivo es no tocar la capa de datos ni el edge function, solo cómo se pinta y se navega.
- El `ConversionChart` y el stepper horizontal dejan de estar siempre visibles; si quieres conservar el gráfico, lo dejo accesible en el plegable de "datos del caso". Si prefieres eliminarlo del todo en esta vista, también es válido.
