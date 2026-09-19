# Barra móvil inferior: llamar/WhatsApp → CTA a formulario

## Objetivo
Sustituir los botones "Llamar" y "WhatsApp" de la barra sticky móvil por un único CTA que lleve al formulario, con el texto "Asesórate con un experto".

## Cambio
En `src/components/MobileContactBar.tsx`:
- Eliminar los dos enlaces (`tel:` y `wa.me`).
- Un solo botón a ancho completo: "Asesórate con un experto", que hace scroll suave a `#hero-form` (regla global: todos los CTA llevan al formulario; nunca navegan a otras páginas).
- Mantener el tracking existente (`cta_click` con ctaId "mobile-contact-bar", ctaLabel "Asesórate con un experto", targetUrl "#hero-form").
- Mantener el comportamiento actual: solo móvil (lg:hidden), auto-ocultarse cuando `#hero-form` o `[data-solution-bridge]` están en pantalla, estilos con tokens semánticos existentes (fondo accent, rounded-full).

No se toca nada más: el componente se usa en `SeoPageScaffold` (las 41 páginas de ciudad y money pages) y en `BlogPost`, y el cambio aplica a ambos automáticamente.

## Verificación
- Playwright sobre una página local (`/abogados-ley-segunda-oportunidad/elche`) y un post del blog en viewport móvil: la barra muestra el botón nuevo, sin llamar/WhatsApp, y al pulsarlo baja al formulario.
