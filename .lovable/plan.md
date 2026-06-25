# Coherencia de color por fase en la herramienta de ventas

Ahora mismo varios elementos ignoran el color de la fase y usan el negro/blanco por defecto de shadcn. Hay que engancharlos a la variable `--phase` que ya existe en cada card.

## Qué se cambia

### 1. Selectores tipo toggle (Sí/No, Vivienda, Vehículo, etc.)
En `src/pages/AdminVentas.tsx`, los botones que usan `variant={... ? "default" : "outline"}` (impago, vivienda, vehículo, y cualquier otro toggle del paso de cualificación) pintan el estado seleccionado en negro.

- Estado seleccionado: fondo `hsl(var(--phase))`, texto blanco, borde `hsl(var(--phase))`.
- Estado no seleccionado: se mantiene el tinte suave de fase ya aplicado a los fields (fondo `hsl(var(--phase)/0.06–0.16)`, borde `hsl(var(--phase)/0.4)`, texto de fase).

Se implementa con un pequeño componente/estilo inline reutilizable (mismo patrón que ya usan las chips de "¿Cómo ha reaccionado?") en lugar de `variant="default"`.

### 2. Selector de engagement (gate) y TierSelector
- Gate (líneas ~417-443): el estado seleccionado usa `border-foreground/40 bg-background`. Se cambia a borde + leve fondo de fase (`hsl(var(--phase))` / `hsl(var(--phase)/0.1)`).
- TierSelector (líneas ~515-538): el `ring-foreground/40` del círculo seleccionado se cambia a `ring` con color de fase. Los círculos de número conservan su color semántico de tier (morado/verde/amarillo/rojo) porque comunican el nivel; solo cambia el anillo de selección.

### 3. CTA principal de cada fase
Los botones principales (`onContinue` de la línea ~491, y los "Continuar/Generar" de Solución, Contrato y Firma) usan el `Button` por defecto (negro). Se les aplica el color de la fase:
- Fondo `hsl(var(--phase))`, texto blanco, hover ligeramente más oscuro.
- Los botones secundarios (`variant="outline"`, "Atrás") se quedan como están (ya heredan el borde de fase).

## Detalle técnico
- Toda la lógica de color se apoya en la variable CSS `--phase` que ya se setea por fase en la card contenedora; no hay que tocar `ConversionChart` ni el edge function.
- Se centraliza el estilo de "pill seleccionable" y de "CTA de fase" en helpers locales dentro de `AdminVentas.tsx` para no repetir estilos inline.
- Sin cambios de lógica de negocio ni de datos: solo presentación.
