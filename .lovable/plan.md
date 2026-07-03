## Verificación de campos en Zoho (módulo Leads)

Confirmado contra el módulo Leads real: **todos los campos necesarios ya existen**. Solo hay que usar el nombre de API exacto (algunos difieren de lo previsto).

## Mapeo verificado (formulario /ventas → Zoho)

| Dato en /ventas | API name real en Zoho | Tipo | Estado |
|---|---|---|---|
| Deuda total (`debtsTotal`) | `deuda` | integer | ✅ existe |
| En impago (alguna deuda) | `impago` | text ("Sí"/"No") | ✅ existe |
| Nº de entidades | `entidades` | integer | ✅ existe |
| Lista de entidades | `lista_entidades` | textarea | ✅ existe |
| Situación vivienda | `vivienda` | text | ✅ existe |
| Importe pagado hipoteca | `importe_pagado_hipoteca` | integer | ✅ existe |
| Situación vehículo | `vehiculo` | text | ✅ existe |
| Ingresos mensuales | `Ingreso` | text | ✅ existe |
| Gastos de vida | `gastos_mensuales` | text | ✅ existe |
| Cuota vivienda | `cuota_vivienda` | text | ✅ existe |
| Cuota vehículo | `cuota_veh_culo` | text | ✅ existe |
| Cuotas de deuda que paga hoy | `cuotas_deuda_mensual` | text | ✅ existe |
| Salida mensual total | `salidas_mensual_total` | text | ✅ existe |
| Capacidad de pago | `capacidad_pago` | text | ✅ existe |
| Importe asumible | `importe_asumible` | text | ✅ existe |
| Situación laboral | `situacion_laboral` | picklist | ✅ existe |
| Solución/triage recomendado | `solution_recomendada` | text | ✅ existe |
| Estado del lead | `Lead_Status` | picklist | ✅ existe |

> Nota: la mayoría de campos económicos son de tipo **text** en Zoho, así que se enviarán como cadenas (números en texto). `situacion_laboral` es picklist: hay que enviar un valor que exista en su lista (mapearé los enum de `/ventas` a las opciones reales; si algún valor no coincide, lo dejo vacío para no romper el guardado).

## Implementación

1. **Nueva edge function `zoho-update-lead`**
   - Reutiliza la lógica de auth de `zoho-lead` (refresh token en `zoho_tokens`, dominio EU).
   - `PUT /crm/v2/Leads/{zohoId}` con `{ data: [fields] }`; limpia nulos; valida entrada.
   - Recibe `{ zohoId, fields }` ya normalizados desde el cliente.

2. **Sync del formulario al guardar el caso** (`saveCase()` en `AdminVentas.tsx`)
   - Si el lead vinculado tiene `external_id` (record id de Zoho), construir el objeto con el mapeo de arriba (deuda, impago, entidades, económicos, capacidad, situación laboral, solución) e invocar `zoho-update-lead`.
   - Dispara la sync **al guardar el caso**, no en cada tecla.

3. **Sync de `Lead_Status`** (ya solicitado)
   - En `AdminLeads.tsx` `updateStatus()` y en los cambios de estado del modo blitz, invocar `zoho-update-lead` con `{ Lead_Status }` además de actualizar `sales_leads`.

4. **Errores no bloqueantes**: si la sync a Zoho falla, el cambio local se conserva y se muestra un toast de aviso.

¿Confirmo el mapeo tal cual y lo implemento?