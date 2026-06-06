## Objetivo
Mejorar el header en móvil/tablet: que el botón "Analizar mi deuda" no domine la barra, dejando un botón compacto junto a la hamburguesa y mostrando el CTA destacado dentro del panel del menú.

## Cambios en `src/components/Header.tsx`

1. **Botón CTA compacto en móvil**
   - El botón "Analizar mi deuda" se mantiene completo en desktop, pero en móvil/tablet se reduce: texto más corto ("Analizar" o icono) y menor padding/altura.
   - Alternativa: ocultar el texto y mostrar solo un botón pequeño junto a la hamburguesa para liberar espacio para el logo.

2. **CTA destacado dentro del menú**
   - Añadir, en la parte superior o inferior del panel `SheetContent`, un botón "Analizar mi deuda" a ancho completo y bien visible que haga scroll a `#hero-form` (cumpliendo la regla: todos los CTA van a `#hero-form`).
   - Al pulsarlo, cerrar el menú (`SheetClose`) y ejecutar `scrollToForm`.

3. **Equilibrio de la barra**
   - En móvil: `logo` a la izquierda, y a la derecha el botón compacto + hamburguesa con espaciado correcto.
   - En desktop todo queda igual que ahora.

### Detalles técnicos
- Usar clases responsive de Tailwind (`hidden sm:inline`, tamaños condicionales) para alternar entre versión completa y compacta del CTA.
- Reutilizar `scrollToForm` ya existente para el CTA del panel.
- Sin cambios de lógica de negocio ni de rutas.
