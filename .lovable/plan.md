## Problema

En el guión aparece "Inyección de 620 €/mes" al dejar de pagar WiZink, Cetelem, Vivus y Santander. Pero WiZink (240 €), Cetelem (160 €) y Vivus (130 €) están marcadas como **EN IMPAGO**. Si ya no las paga, dejar de pagarlas **no libera ni inyecta ese dinero**: nunca salía de su bolsillo. La única cuota que de verdad libera caja al reestructurar es la que SÍ está pagando (Santander, 90 €).

La causa: tanto la calculadora del panel (`AdminVentas.tsx`) como el bloque de datos del prompt (`sales-diagnosis`) suman **todas** las cuotas (`monthlyPayment`) sin mirar `isDefault`. Eso infla el "Total que paga al mes", el "déficit" y, sobre todo, la sensación de alivio que la IA traslada al guión.

## Concepto correcto

Hay que separar dos cosas para cada deuda:
- **Cuota que realmente paga hoy** = solo deudas con `isDefault: false`. Esto es lo que sale de su bolsillo cada mes y lo único que se "libera" al reestructurar.
- **Cuota ya impagada** = deudas con `isDefault: true`. NO sale de su bolsillo, así que no libera caja; pero SÍ pesa en el diagnóstico (intereses de demora, ASNEF, costas, embargos crecen).

```text
Salida real mensual = cuotas NO impagadas + vivienda + vehículo + gastos de vida
Liberación al actuar = solo cuotas NO impagadas (lo que de verdad deja de pagar)
Cuotas ya impagadas  = contexto de gravedad, NO ahorro
```

## Cambios

### 1. Cálculo financiero en `src/pages/AdminVentas.tsx`
- Añadir `debtsMonthlyPaying` = suma de `monthlyPayment` solo de deudas con `isDefault === false` (las que realmente paga).
- Añadir `debtsMonthlyDefaulted` = suma de cuotas de deudas en impago (solo para mostrar como contexto).
- Recalcular `monthlyOutflow` (Total que paga al mes) usando `debtsMonthlyPaying` en vez de `debtsMonthly`, de modo que el "déficit / le quedan" refleje la caja real.
- En el bloque "Total que paga al mes": mostrar las cuotas que realmente paga y, aparte y en gris, "Cuotas ya impagadas: X €/mes (no salen, pero generan intereses/ASNEF)".
- En "Capacidad de pago": la nota "Hoy paga X €/mes en cuotas de deudas" debe usar `debtsMonthlyPaying` (lo que paga de verdad), no el total.

### 2. Bloque de datos del prompt en `supabase/functions/sales-diagnosis/index.ts` (`buildCaseData`)
- Calcular por separado `debtsMonthlyPaying` (no impagadas) y `debtsMonthlyDefaulted` (impagadas).
- Cambiar la línea "Cuotas mensuales de deudas" para distinguir: "Cuotas que SÍ paga hoy: X €/mes" y "Cuotas YA impagadas: Y €/mes (no salen de su bolsillo)".
- `monthlyOutflow` y el cálculo de déficit usan solo las cuotas que realmente paga + vivienda + vehículo + gastos.

### 3. Regla nueva en los prompts (diagnóstico y solución)
Añadir una regla explícita (reutilizable, junto a `ANTI_VAGUE_RULE` / `SOURCE_OF_TRUTH_RULE`):

> REGLA DE IMPAGOS (OBLIGATORIA): una cuota marcada EN IMPAGO ya NO se está pagando, así que dejar de pagarla NO "libera", "inyecta" ni "ahorra" dinero — ese importe no salía de su bolsillo. El alivio de caja REAL solo proviene de las cuotas que SÍ paga hoy (las marcadas "al día"). Las deudas en impago se usan para el DIAGNÓSTICO (intereses de demora que crecen, ASNEF, costas, posible demanda/embargo), nunca como ahorro mensual. Si hablas de cuánto se libera/mejora al mes, usa solo la suma de las cuotas que actualmente paga.

Con el caso de prueba, esto convierte la falsa "inyección de 620 €" en el dato correcto: deja de pagar realmente solo los 90 € de Santander, y el verdadero valor está en parar intereses/ASNEF/embargos de las deudas ya impagadas y en cancelar/reestructurar el total.

### 4. Despliegue y verificación
- Redesplegar `sales-diagnosis`.
- Probar con el caso de prueba (3 deudas en impago + Santander al día) y confirmar que: el panel muestra la salida real sin contar las cuotas impagadas, y que el guión de solución ya no presenta las cuotas impagadas como dinero que se libera/inyecta.

## Nota
Es un ajuste de lógica de negocio (no solo UI), pero es justo lo señalado: el guión afirma un ahorro que no existe. No se toca el esquema de BD.