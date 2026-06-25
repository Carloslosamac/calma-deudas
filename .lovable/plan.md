Contexto: la herramienta de ventas pinta cada fase con un color propio aplicado al borde/fondo de la card. El usuario quiere mantener esa identidad cromática por fase pero mejorar la legibilidad de los elementos interactivos dentro de la card.

Cambios a realizar en `src/pages/AdminVentas.tsx`:

1. Chips de reacción (reaction phrases)
   - En estado NO seleccionado: reemplazar el fondo neutro (`bg-background/60`) por un tinte del color de fase a mayor saturación (ej. `bg-phase-{name}/15` + `text-phase-{name}`).
   - En estado seleccionado: aumentar la opacidad del fondo de fase (ej. `bg-phase-{name}/25` o `/30`) y mantener el borde sutil.
   - Eliminar comillas angulares (« ») de los labels para que ocupen menos y se lean como chips en vez de cita.

2. Inputs, selectores y textareas dentro de la card de fase
   - Cambiar fondo blanco sólido (`bg-background`) por transparente o `bg-card/80` para que no formen "islas" de contraste sobre el color de fase.
   - Aumentar levemente el grosor o contraste del borde (`border-phase-{name}/30` o `border-border/60`) para mantener legibilidad sin romper la superficie.

3. Botones de acción dentro de la card
   - El botón principal (ej. "Continuar", "Generar contrato") debe conservar fondo del color de fase (`bg-phase-{name}`) con texto blanco para máximo contraste.
   - Los botones secundarios (copiar, añadir deuda, etc.) usar borde sutil del color de fase en vez de neutro.

4. Comprobación visual rápida
   - Verificar que los chips se distinguen claramente del fondo de la card en todas las 5 fases.
   - Confirmar que inputs y selects siguen siendo legibles (sin fundirse con el fondo).

Nota técnica: como los colores de fase ya existen como tokens HSL en `index.css` y como clases utilitarias en `tailwind.config.ts`, se usan directamente vía `bg-phase-{name}/xx` y `text-phase-{name}` sin crear nuevos tokens.