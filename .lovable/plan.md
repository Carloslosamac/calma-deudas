## Resultado de la prueba en vivo

Probé la edge function `zoho-update-lead` contra un lead real (`Tafa Mohatar`):

1. **Con el `external_id` tal cual se guarda** (`zcrm_921024000004152016`) → **falla**: `"Invalid or missing zohoId"`. La función exige que el id sea solo dígitos (`^\d+$`), pero los `external_id` importados del CSV de Zoho llevan el prefijo `zcrm_`.
2. **Con el id numérico** (`921024000004152016`) → **éxito**: `"Lead updated in Zoho CRM"`. Zoho aceptó la actualización correctamente.

**Conclusión:** el mapeo, el token OAuth y el endpoint funcionan. El único problema es que el prefijo `zcrm_` de los `external_id` rompe la validación, así que hoy **ninguna** sincronización real de leads importados llega a Zoho (siempre saltaría el aviso de error).

## Arreglo

Normalizar el `zohoId` en la edge function para quitar el prefijo antes de validar/enviar.

### Cambio en `supabase/functions/zoho-update-lead/index.ts`
- Tras leer `body.zohoId`, extraer solo la parte numérica:
  - `const zohoId = String(body.zohoId ?? "").replace(/\D/g, "");`
  - Mantener la validación `^\d+$` (ya se cumple tras limpiar) y el mensaje de error si queda vacío.
- Redesplegar la función.

### Verificación posterior
- Repetir la prueba con el `external_id` completo (`zcrm_...`) y confirmar respuesta `success: true`.
- Comprobar en Zoho CRM que el registro del lead refleja el `Lead_Status` y los campos económicos.

No hace falta tocar el cliente (`zohoSync.ts`, `AdminLeads.tsx`, `AdminVentas.tsx`): dejando la normalización en el servidor, cualquier formato de id (`zcrm_...` o numérico) queda cubierto.

### Dónde comprobarlo tú después
- **`/admin/ventas/leads`**: cambia el estado de un lead importado; sin aviso de error = sincronizado.
- **`/admin/ventas`**: guarda un caso de un lead importado para volcar los datos económicos.
- **Zoho CRM**: abre el registro del lead y refresca.</content>
<summary>Arreglar el bug de sincronización a Zoho: el prefijo `zcrm_` de los external_id rompe la validación de la edge function. Normalizar el id en el servidor y reverificar.</summary>
</invoke>
