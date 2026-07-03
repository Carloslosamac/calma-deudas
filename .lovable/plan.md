# Alinear estados de Lead con el picklist real de Zoho

## Contexto del problema

En la app, la lista de estados válidos (`ZOHO_LEAD_STATUSES` en `src/lib/leadsCsv.ts`) es una lista **escrita a mano** y no incluye "Cualificado". Por eso ese estado "no existe" en nuestro selector, aunque en Zoho el lead (Carlos Losa) aparezca como "Cualificado". La causa más probable: nuestra lista está desalineada con el picklist real del CRM (le faltan valores o usa nombres distintos, p. ej. tenemos "IA cualificado" pero no "Cualificado").

Los campos económicos duplicados (`vehiculo` vs `vehiculo imprescindible`, `gastos_mensuales` vs `gasto`) quedan como están — confirmado por el usuario.

## Objetivo

Que la lista de estados de la app coincida exactamente con el picklist "Lead Status" real de Zoho, para no ofrecer/enviar valores inválidos ni omitir valores válidos.

## Pasos

1. **Leer el picklist real desde Zoho** (en modo build): hacer una llamada de metadata a Zoho CRM, `GET /crm/v2/settings/fields?module=Leads`, reutilizando el flujo OAuth ya existente en `supabase/functions/zoho-update-lead/index.ts` (mismo refresh token). Extraer los valores del picklist del campo `Lead_Status`. Esto confirma si "Cualificado" existe y qué otros valores hay.

2. **Reconciliar `ZOHO_LEAD_STATUSES`** en `src/lib/leadsCsv.ts` con la lista real obtenida: añadir los que falten (incluido "Cualificado" si existe), quitar los que no existan y corregir nombres. Actualizar `PENDING_STATUSES` si procede.

3. **Verificar la sincronización**: confirmar que `updateStatus` en `src/pages/AdminLeads.tsx` solo puede enviar valores del picklist real (el selector ya se alimenta de `ZOHO_LEAD_STATUSES`, así que basta con corregir la lista).

## Detalles técnicos

- La verificación del punto 1 es una llamada de solo lectura; se puede hacer con una función temporal de metadata o añadiendo un endpoint de lectura a la función existente. La allowlist de escritura (`ALLOWED_FIELDS`) no se toca.
- No se modifican los campos económicos ni su mapeo (`buildZohoLeadFields`).
- Data center EU ya configurado (`www.zohoapis.eu`).

## Resultado esperado

La app mostrará y enviará exactamente los mismos estados que existen en Zoho, eliminando el desajuste que hacía que "Cualificado" pareciera un estado inexistente.
