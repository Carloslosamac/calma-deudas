## Objetivo

Añadir a la zona de administración una **lista de llamadas** alimentada por la subida de CSVs de leads (export de Zoho). El comercial sube el CSV, ve a todas las personas que hay que llamar con su teléfono y su lead status, puede llamar (y abrir el caso en `/ventas`) y actualizar el estado. Todo persiste en Lovable Cloud.

## Nueva página: `/admin/ventas/leads`

Nueva ruta protegida (mismo patrón admin que `/admin/indexacion`, usando `useAdminAuth`). Estructura:

1. **Zona de subida de CSV**
   - Botón/drag&drop para seleccionar un `.csv`.
   - Se parsea en el navegador con un parser robusto (maneja comillas y comas dentro de campos, como en el export de Zoho).
   - Mapeo de columnas del export de Zoho a nuestros campos:
     - `Record Id` → `external_id` (clave de deduplicado)
     - `Lead Name` (o `First Name`+`Last Name`) → nombre
     - `Phone` / `Mobile` → teléfono
     - `Lead Status` → estado inicial
     - `entidades`, `deuda`, `ingreso`, `gasto`, `laboral`, `Alquiler`, `vivienda`, `vehiculo`, `impago`, `Tier`, `Fuente`, `Fecha/hora cita`, `¿Se puede contactar?`, `Email` → guardados como `raw` (JSON) para prefiltrar el caso y mostrar contexto.
   - Al subir: **actualizar los existentes y añadir los nuevos** (upsert por `external_id`, con fallback a teléfono). Se conserva el estado de llamada ya editado (no se sobreescribe un estado editado manualmente por el del CSV salvo que el CSV traiga uno "más avanzado"; por defecto, si el lead ya existe se respeta el estado local).
   - Resumen tras importar: "X nuevos, Y actualizados".

2. **Lista de leads a llamar**
   - Tabla/tarjetas con: nombre, teléfono, lead status (selector editable), deuda estimada, fuente y fecha de cita si existe.
   - Filtros rápidos por estado (p. ej. "Sin contactar", "Contactado", "No contesta", "Cita", "No válido") y buscador por nombre/teléfono.
   - Orden: primero "Sin contactar", luego por fecha de creación.
   - Acciones por fila:
     - **Llamar + abrir en `/ventas`**: abre el marcador (`tel:`) y navega a `/admin/ventas` precargando los datos del lead (nombre como `label`, y `entidades/deuda/ingreso/gasto/laboral/vivienda/vehiculo/impago` mapeados a `GuideFields`), con el `leadId` asociado.
     - **Estado editable**: cambiar el lead status se guarda al instante en la base de datos.
     - Copiar teléfono.

3. **Enlaces de navegación admin** entre `/admin/ventas`, `/admin/ventas/leads`, `/admin/indexacion`, etc. (barra superior coherente con las demás páginas admin).

## Integración con `/admin/ventas` (ida y vuelta)

- **Ida**: al abrir un lead, `/admin/ventas` recibe el `leadId` + datos (via `location.state` o querystring) y precarga `caseText`, `label` y `guide`.
- **Vuelta (estados y campos al avanzar)**: mientras se trabaja el caso, al **guardar/avanzar de fase** se actualiza el lead vinculado:
  - `lead_status` según la fase alcanzada (p. ej. Diagnóstico→"Contactado", Solución→"Interesado", Contrato/Firma→"Cita"/"Ganado"), y el `Loss Reason`/estado si se marca perdido.
  - Los campos capturados en el caso (deuda, ingresos, gastos, vivienda, vehículo, impago, engagement) se escriben de vuelta en el lead para mantenerlo actualizado.
  - Se enlaza `sales_cases` ↔ lead para no duplicar el trabajo.

## Base de datos (migración)

Nueva tabla `public.sales_leads`:

- `id uuid pk`, `external_id text` (Record Id de Zoho, único por creador), `name text`, `phone text`, `email text`
- `lead_status text` (estado editable de llamada)
- `debt numeric`, `income numeric`, `expense numeric`, `employment text`, `housing text`, `vehicle text`, `is_default boolean`, `source text`, `appointment_at text`, `tier text`
- `raw jsonb` (fila completa del CSV para no perder datos)
- `sales_case_id uuid null` (enlace al caso trabajado)
- `created_by uuid`, `created_at`, `updated_at` (+ trigger de updated_at)
- Índice único `(created_by, external_id)` para el upsert de deduplicado.
- **RLS**: admins gestionan sus leads. GRANT a `authenticated` y `service_role` (patrón estándar). Políticas basadas en `has_role(auth.uid(),'admin')` + `created_by = auth.uid()`, coherentes con `sales_cases`.

## Detalles técnicos

- Parser CSV: implementación propia mínima que respeta comillas dobles y saltos de línea, o `papaparse` si se prefiere (a confirmar en build; por defecto parser propio para no añadir dependencia).
- Normalización de teléfono (quitar espacios, prefijo `+34`).
- Tipado de columnas: los números vienen como texto → convertir con tolerancia (`14000` → 14000).
- Reutilizar componentes shadcn ya usados en admin (Card, Badge, Button, Select, Input, Table).
- Sin cambios en la lógica de generación de guiones; solo prefill de datos.

## Fuera de alcance (salvo que se pida luego)

- Sincronización automática en vivo con Zoho vía API (aquí es subida manual de CSV). El conector Zoho existe y podría añadirse después para importar sin CSV.
</content>
<summary>Uploader de CSV de leads en /admin/ventas/leads con lista de llamadas (teléfono + lead status editable), persistencia en Lovable Cloud, deduplicado por Record Id, y enlace bidireccional con la herramienta /ventas.</summary>
</invoke>
