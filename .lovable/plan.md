## Qué está pasando

He revisado el flujo completo y esto es lo que veo:

1. **La edge function `zoho-lead` funciona bien.** He hecho una prueba en vivo y ha creado un lead real en Zoho (`leadId 921024000004949002`). No es un problema de OAuth ni de token de Zoho.
2. **En los logs de la edge function no hay ni una sola invocación real de la última semana** (más allá de mi test). La retención de logs es corta, así que no puedo confirmar al 100% si hubo intentos fallidos días atrás, pero es muy sospechoso.
3. **La tabla `sales_leads` no se alimenta desde la web** — sólo tiene 57 registros y todos son del 2–3 de julio (probablemente cargas manuales/CSV). El formulario público **nunca** persiste nada en nuestra base de datos: sólo llama a `zoho-lead` y sigue.
4. **Bug crítico en `FormSection.tsx`:** el `navigate("/gracias")` está dentro del `finally`, así que **se navega a /gracias tanto si Zoho responde OK como si falla** (CORS, red, 500, excepción). El error sólo se registra en `console.error` del navegador del usuario. Resultado: podemos tener 4 vistas de /gracias y 0 leads en el CRM sin que nadie se entere.
5. Además, /gracias también se cuenta si un usuario refresca la página, la marca o llega por historial — pero eso no explica que **haya cero rastro** de intentos en Zoho.

Conclusión probable: hay envíos que están fallando silenciosamente (o bien no llegan a `functions.invoke` por un error JS previo, o llegan y la función responde error), y como el redirect a /gracias es incondicional, ni el usuario ni nosotros nos enteramos.

## Plan de refuerzo

### 1. Persistir TODA submission antes de tocar Zoho (fuente de verdad propia)
Nueva tabla `web_submissions` (Cloud) con: `id`, `created_at`, `name`, `email`, `phone`, `debt_amount`, `payload jsonb`, `page`, `utm_*`, `zoho_lead_id`, `zoho_status` (`pending|ok|error`), `zoho_error`, `user_agent`.
Flujo nuevo dentro de `zoho-lead`:
1. INSERT en `web_submissions` con `status=pending` (service role, no depende de RLS).
2. Llamada a Zoho.
3. UPDATE de esa fila con `zoho_lead_id`, `status`, `error`.
Así, aunque Zoho falle, **nunca** perdemos el lead — queda en nuestra base y lo podemos reintentar o contactar a mano.

RLS: SELECT sólo para admins (`has_role(auth.uid(),'admin')`), sin acceso anon. GRANT a `authenticated` y `service_role`.

### 2. Corregir el redirect condicional en `FormSection.tsx`
- Mover `navigate("/gracias")` fuera del `finally`: sólo redirigir cuando la submission se persistió (paso 1 exitoso) o al menos cuando `zoho-lead` no lanzó excepción de red.
- Si la llamada falla del todo (network/CORS), mostrar un mensaje amable con teléfono/WhatsApp de contacto, en vez de mandar a /gracias como si todo hubiera ido bien.
- Leer bien el error de `functions.invoke` (`FunctionsHttpError.context.text()`) y loguearlo con detalle.

### 3. Panel de submissions web en `/admin/leads`
- Nueva pestaña "Web (últimos 30 días)" que lee de `web_submissions` ordenado por fecha.
- Chips de estado (`pending / ok / error`) + botón "Reintentar Zoho" que reinvoca `zoho-lead` con el payload guardado.
- Filtro rápido: sólo `error` para ver qué se cayó.

### 4. Alerta operativa en tiempo real
- Dentro de `zoho-lead`, si la llamada a Zoho devuelve error, enviar aviso (email via Resend a la dirección del negocio, o registrar en `web_submissions.zoho_error`) para que salte antes de que se acumulen 4 vistas /gracias sin lead.
- No bloquear la respuesta al usuario por esto.

### 5. Distinguir /gracias real vs. /gracias por refresh
- En `Gracias.tsx`, si no llega `state` (no viene del submit), redirigir suavemente a `/` (ya casi lo hace, pero ahora mismo se pinta igual). Así los 4 pageviews de /gracias sin submit dejan de mentirnos en analytics.
- Añadir evento de tracking `form_submitted_ok` en el `onSubmit` una vez que la persistencia confirme éxito, separado del pageview de /gracias.

### 6. Comprobación manual inmediata (para hoy)
- Revisar en Zoho CRM directamente si esos 4 usuarios de la semana están como Leads con `Fuente = Calma Web`. Si no aparece ninguno, se confirma la hipótesis de fallo silencioso.
- Mi test de hoy sí debería aparecer en Zoho como `Test Diag / diag@example.com / 600000000` (leadId `921024000004949002`) — sirve para verificar que el canal está vivo ahora mismo.

## Detalles técnicos

**Migración SQL (resumen):**
```sql
CREATE TABLE public.web_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text, email text, phone text,
  debt_amount numeric, entities text[],
  payload jsonb NOT NULL,
  page text, utm_source text, utm_medium text,
  utm_campaign text, utm_term text, utm_content text,
  user_agent text,
  zoho_lead_id text,
  zoho_status text NOT NULL DEFAULT 'pending', -- pending|ok|error
  zoho_error text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.web_submissions TO authenticated;
GRANT ALL   ON public.web_submissions TO service_role;
ALTER TABLE public.web_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read web submissions"
  ON public.web_submissions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
```
No hay policy de INSERT/UPDATE para clientes: sólo el edge function con `service_role` escribe.

**Archivos a tocar:**
- `supabase/functions/zoho-lead/index.ts` — insertar en `web_submissions` antes/después de Zoho, devolver `submissionId` al cliente.
- `src/components/FormSection.tsx` — mover el `navigate` fuera del `finally`, gestionar error real, tracking correcto.
- `src/pages/Gracias.tsx` — redirect si no hay `state`.
- `src/pages/AdminLeads.tsx` — pestaña "Web" con filtros + botón "Reintentar".
- Nueva edge function `retry-web-submission` (o reutilizar `zoho-lead` con `submissionId`).
- `supabase/config.toml` — sin cambios (verify_jwt sigue en default false).

## Qué NO hago en este plan
- No toco el módulo `sales_leads` (usado por otro flujo) para no arriesgar.
- No cambio la lógica de Zoho ni los mapeos de campo.
- No añado rate limiting (no lo has pedido y hay que discutirlo antes).

¿Le doy al botón "Implement plan" con esto tal cual o quieres ajustar algo (por ejemplo empezar sólo con el punto 1+2, que ya frena la hemorragia)?
