# Quitar la CTA fija en móvil

Eliminar la barra fija inferior que se añadió recientemente.

## Cambios

- **Editar** `src/components/seo/MoneyJourney.tsx`: quitar el import de `MobileCtaBar` y su render al final del `main`.
- **Eliminar** `src/components/seo/MobileCtaBar.tsx` (ya no se usa).

Se conserva el resto (TrustBar, prueba social, etc.) sin cambios.
