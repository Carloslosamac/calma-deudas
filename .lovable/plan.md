# CTA único de WhatsApp en el thank-you de formularios

## Contexto verificado
- Todos los formularios públicos usan el mismo componente (`src/components/FormSection.tsx`, presente en home, posts del blog, casos de éxito, páginas de herramienta/servicios y scaffold SEO de ciudad). Al enviarse navegan a `/gracias`.
- No hay ningún modal de éxito alternativo: `/gracias` (`src/pages/Gracias.tsx`) es el único thank-you.
- Hoy `/gracias` muestra un botón "Volver al inicio" como CTA principal.

## Cambio (un solo archivo: `src/pages/Gracias.tsx`)
- Sustituir el CTA actual por un único botón a WhatsApp:
  - URL: `https://wa.me/34611625698?text=Hola%2C%20acabo%20de%20enviar%20mis%20datos%20en%20Calma.%20Me%20gustar%C3%ADa%20agendar%20una%20cita%20para%20revisar%20mi%20caso.%20%C2%BFQu%C3%A9%20horario%20ten%C3%A9is%20disponible%3F`
  - Texto: "Agendar mi cita por WhatsApp".
  - `target="_blank"` + `rel="noopener noreferrer"`, estilo de botón primario consistente con el resto del sitio (tokens semánticos, sin gradientes).
- Eliminar "Volver al inicio" para que sea el único CTA (quien quiera volver tiene el header/footer).
- El resto de la página (saludo, diagnóstico, simulador) no cambia.

## Verificación
- Enviar el formulario de prueba en preview y confirmar que `/gracias` muestra solo el botón de WhatsApp con el texto correcto y abre el enlace con el mensaje pre-rellenado.
- Comprobar build sin errores.
