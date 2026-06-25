# Gráfico de conversión + color de fase en la card

## 1. Quitar la banda y colorear la card de la fase
- Eliminar el bloque "Banda de color de la fase actual" (`src/pages/AdminVentas.tsx`, líneas ~871-879).
- Aplicar el color de la fase activa a la `Card` de cada paso: añadir `border-l-4` + `border`/`soft` del `PHASE_THEMES[step]` a las tarjetas de los 5 pasos, de modo que el borde izquierdo y un fondo muy sutil identifiquen la fase (igual que muestra la captura: card con borde azul a la izquierda).
- Para no repetir clases en cada `Card`, definir una constante con las clases de la fase actual y aplicarla a cada `<Card>` de paso.

## 2. Gráfico "cercanía a convertir" por fase (encima del stepper)
Nuevo componente (en el mismo archivo o `src/components/ventas/ConversionChart.tsx`) que se renderiza justo encima del stepper.

**Modelo (Progreso de fase + engagement):**
- Cada fase tiene un progreso base creciente hacia la conversión:
  - Cualificación 15%, Diagnóstico 35%, Solución 60%, Contrato 85%, Firma 100%.
- El engagement actual (0-3) modula la altura: factor `0 → ×0.6`, `1 → ×0.85`, `2 → ×1.0`, `3 → ×1.1` (con tope 100%).
- Se calcula un valor para cada fase **hasta la fase actual incluida** (las fases futuras se muestran atenuadas/punteadas como proyección).

**Visual (recharts, ya instalado):**
- `AreaChart` o `LineChart` con eje X = nombres de fase, eje Y = % de cercanía a convertir (0-100).
- Punto destacado en la fase actual; relleno con gradiente usando el color de la fase activa.
- Altura compacta (~140px), responsive, con `ChartContainer` existente o `ResponsiveContainer`.
- Tooltip mostrando "X% cerca de convertir".

## Detalles técnicos
- Reutilizar `PHASE_THEMES`, `STEPS`, `step` y `engagement` ya existentes en `AdminVentas.tsx`.
- Colores vía tokens `--phase-*` ya definidos en `index.css` (no hardcodear colores).
- El gráfico es puramente presentacional; no cambia lógica de IA ni guardado.
