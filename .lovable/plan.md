## Contexto

- `/gracias` recibió 4 hits esta semana, pero solo 1 lead ha llegado al CRM.
- `web_submissions` está vacío de datos históricos (se creó hoy), así que esos 3 leads perdidos son irrecuperables.
- Con el pipeline actual, cualquier fallo **antes** de que la edge function inserte la fila (error de red, CORS, bot que abre `/gracias`, refresh, error JS) sigue siendo invisible.

## Objetivo

Que ningún intento de envío quede sin traza, aunque falle antes de llegar a la edge function, y poder auditar el hueco `/gracias` vs leads reales.

## Cambios

### 1. Traza cliente-primero en `web_submissions`

En vez de depender de que la edge function inserte la fila, insertamos desde el navegador **antes** de invocar `zoho-lead`:

- Nueva política RLS: `INSERT` para `anon` con `WITH CHECK (true)` limitada a las columnas seguras (`name`, `email`, `phone`, `debt_amount`, `entities`, `payload`, `page`, `utm_*`, `user_agent`), estado inicial `pending`.
- `FormSection.onSubmit`:
  1. `insert` en `web_submissions` → recibe `submissionId`.
  2. Llama a `zoho-lead` con `{ submissionId }` (modo reintento existente) en vez del payload plano.
  3. Si la inserción cliente falla, cae al flujo actual (envío directo).

Con esto, aunque `zoho-lead` nunca se ejecute (CORS, red, adblock), el lead está guardado y aparece en `/admin/web-leads` como `pending`.

### 2. Cron de saneamiento

Añadir en `zoho-lead` un modo o crear función nueva `retry-pending-submissions` que reintente cualquier `web_submissions` con `zoho_status='pending'` más antigua de 2 minutos. Se puede llamar manualmente desde `/admin/web-leads` con un botón "Reintentar pendientes".

### 3. Log de `/gracias` "huérfano"

En `Gracias.tsx`, cuando `!name && !result` (llegada directa), antes de redirigir a `/`, insertar una fila mínima en una tabla nueva `orphan_gracias_hits` (`created_at`, `referrer`, `utm_*`, `user_agent`). Así sabremos cuántos de los 4 son bots/refresh vs fallos reales.

- Política RLS: `INSERT` para `anon`, `SELECT` solo admin.

### 4. Panel `/admin/web-leads`

- Añadir contador "Huérfanos /gracias (7 días)" con enlace a modal que liste las filas de `orphan_gracias_hits`.
- Añadir botón "Reintentar todos los pendientes" que llama a la función del punto 2.

### 5. Verificación

- Simular fallo (bloquear la URL del edge function con DevTools) y confirmar que el lead aparece en `/admin/web-leads` como `pending` con botón de reintento funcional.
- Simular llegada directa a `/gracias` y confirmar fila en `orphan_gracias_hits`.

## Detalles técnicos

- Migración con `CREATE POLICY` + `GRANT INSERT (columnas) ON public.web_submissions TO anon;` (sin `SELECT` para anon).
- Nueva tabla `orphan_gracias_hits` con RLS estándar (admin lee, anon inserta).
- No tocamos la lógica de Zoho ni el mapeo de campos.

## Archivos afectados

- `supabase/migrations/<nueva>.sql`
- `src/components/FormSection.tsx`
- `src/pages/Gracias.tsx`
- `src/pages/AdminWebLeads.tsx`
- `supabase/functions/zoho-lead/index.ts` (o nueva `retry-pending-submissions`)

## Fuera de alcance

- Cambios en Zoho, triage, o UI del formulario.
- Alertas por email — lo dejamos para una segunda iteración cuando veamos qué patrón sale del panel.
