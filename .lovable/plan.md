# Importar el estado del CRM al subir un paquete

Hoy, al importar un CSV, todos los leads entran como "No contactado" aunque el CSV traiga su estado real del CRM. Se cambia para que cada lead conserve el estado que traía.

## Qué cambia

- Al subir un paquete, cada lead entra con el estado de la columna "Lead Status" del CSV (por ejemplo "IA Reunión agendada", "IA Llamada no atendida 1").
- Si el CSV no trae estado o trae uno desconocido, el lead entra como "No contactado".
- El progreso del paquete ("X/Y gestionados") pasa a contar como pendientes solo los leads en "No contactado" / "Sin contactar"; los que ya venían trabajados del CRM contarán como gestionados.
- El orden de la lista sigue poniendo primero los pendientes, así que los ya gestionados quedan al final y no estorban en el blitz.
- El estado sigue siendo editable por paquete y se sincroniza al CRM como hasta ahora.

## Detalle técnico

- `src/pages/AdminLeads.tsx` (importación CSV, ~línea 350): usar `p.lead_status` en lugar del literal `"No contactado"`.
- `src/lib/leadsCsv.ts`: en `mapRowToLead`, validar el valor leído contra `ZOHO_LEAD_STATUSES` (comparación sin distinguir mayúsculas/acentos) y caer a `"No contactado"` si no coincide, para que el desplegable y la sincronización con el CRM no reciban valores inválidos.
- No hacen falta cambios de base de datos; `lead_status` ya es texto libre con valor por defecto.
