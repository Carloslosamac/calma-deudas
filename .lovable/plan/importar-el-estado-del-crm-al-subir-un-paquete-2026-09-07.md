# Importar el estado del CRM al subir un paquete

Hoy, al importar un CSV, todos los leads entran como "No contactado" aunque el CSV traiga su estado real del CRM. Se cambia para que cada lead conserve el estado que traía.

## Qué cambia

- Al subir un paquete, cada lead entra con el estado de la columna "Lead Status" del CSV (por ejemplo "IA Reunión agendada", "IA Llamada no atendida 1").
- Si el CSV no trae estado o trae uno desconocido, el lead entra como "No contactado".
- El progreso del paquete ("X/Y gestionados") pasa a contar como pendientes solo los leads en "No contactado" / "Sin contactar"; los que ya venían trabajados del CRM contarán como gestionados.
- El orden de la lista sigue poniendo primero los pendientes, así que los ya gestionados quedan al final y no estorban en el blitz.
- El estado sigue siendo editable por paquete y se sincroniza al CRM como hasta ahora.

## Marca de "trabajado en esta sesión"

Como el estado ya no distingue lo que viene del CRM de lo que ha hecho el agente, se añade una segunda señal:

- Cuando el agente cambia el estado de un lead dentro del paquete, ese lead queda marcado como "tocado hoy" con un punto verde y la hora del cambio.
- El contador del paquete pasa a mostrar dos cifras: gestionados en esta sesión y total ya trabajados.
- Se puede filtrar por "tocados en esta sesión" para repasar solo lo hecho.

## Detalle técnico

- `src/pages/AdminLeads.tsx` (importación CSV, ~línea 350): usar `p.lead_status` en lugar del literal `"No contactado"`.
- `src/lib/leadsCsv.ts`: en `mapRowToLead`, validar el valor leído contra `ZOHO_LEAD_STATUSES` (comparación sin distinguir mayúsculas/acentos) y caer a `"No contactado"` si no coincide, para que el desplegable y la sincronización con el CRM no reciban valores inválidos.
- Nueva columna `status_changed_at` (timestamp, nullable) en `sales_leads`, escrita en `updateStatus`; la sesión se define como los cambios posteriores al inicio del paquete actual (mismo `TIMER_KEY` ya persistido).
- Badge, contador y filtro en la lista de leads a partir de esa columna. No cambia la sincronización con el CRM.

