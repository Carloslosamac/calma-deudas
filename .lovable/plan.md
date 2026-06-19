## Objetivo
Reforzar la validación del formulario y mover el resultado a una página de gracias dedicada (fuera de la landing).

## 1. Validación del móvil
En el `formSchema` de `src/components/FormSection.tsx`, cambiar la regla de `phone` por:
- Permitir espacios/guiones que el usuario escriba, pero validar el formato español: exactamente **9 cifras** que **empiecen por 6 o 7** (móviles).
- Regex tipo `^[67]\d{8}$` tras limpiar espacios. Mensaje: "Introduce un móvil válido (9 cifras, empieza por 6 o 7)".

## 2. Validación del correo
En el mismo schema, además del `.email()`, restringir el dominio a proveedores habituales:
- Lista permitida: `gmail.com`, `outlook.com`, `outlook.es`, `hotmail.com`, `hotmail.es`, `yahoo.com`, `yahoo.es`, `icloud.com`, `live.com`.
- Si el dominio no está en la lista, mensaje: "Usa un correo de un proveedor habitual (Gmail, Outlook, Hotmail…)".

## 3. Página de gracias fuera de la landing
- Crear nueva ruta `/gracias` con una página `src/pages/Gracias.tsx` y registrarla en `src/App.tsx`.
- Al enviar el formulario (`onSubmit`), en vez de mostrar el diagnóstico inline (`showResult`), navegar a `/gracias` con `useNavigate`, pasando el resultado del triaje y los datos necesarios vía `state`.
- La página `/gracias` mostrará:
  - Mensaje de agradecimiento ("Hemos recibido tu caso. Te llamamos en menos de 24h…").
  - El **diagnóstico orientativo** (título, descripción y highlights) — el mismo bloque que hoy aparece inline.
  - Aviso legal de que es orientación automática.
  - Botón para volver a la home.
- Si alguien entra a `/gracias` directamente sin `state` (sin diagnóstico), mostrar un mensaje genérico de gracias con CTA a la home, sin romper.
- Eliminar el render inline de `showResult` en `FormSection.tsx` (queda reemplazado por la redirección), manteniendo el envío al CRM intacto.

## Notas técnicas
- Reutilizar el tipo `TriageResult` de `src/lib/seo/triage.ts` para tipar el `state` de navegación.
- Mantener el comportamiento: si el envío al CRM falla, igualmente se redirige a `/gracias` para no bloquear al usuario.
- SEO en `/gracias`: `noindex` (es página de conversión), título y meta propios.
