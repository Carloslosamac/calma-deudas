# Enviar al CRM el valor de la vivienda y los datos del vehículo

## Confirmado: hoy no se envían

En el guion de ventas sí se recogen, pero al CRM solo viajan:

- Vivienda: régimen (propiedad/hipoteca/alquiler), importe pagado de hipoteca y cuota.
- Vehículo: régimen (propiedad/financiado/no) y cuota.

Se quedan sin enviar:

- Valor de la vivienda
- Pendiente de hipoteca (valor − pagado)
- Valor del vehículo
- Importe pagado del vehículo
- Pendiente del vehículo (valor − pagado)

## Qué se hará

1. Consultar en el CRM qué campos existen para esos cinco datos (ya hay una auditoría de campos preparada para eso).
2. Si existen los campos: añadirlos al envío, tanto en la sincronización continua durante la llamada como en el guardado final.
3. Si alguno no existe en el CRM: indicarte el nombre exacto que hay que crear en el CRM, y mientras tanto incluir ese dato en el bloque de notas del lead para que no se pierda.
4. Comprobar con un lead real que los cinco valores llegan correctos (sin truncar, formato español).

## Detalles técnicos

- `src/lib/zohoSync.ts`: ampliar `SalesZohoInput` y `buildZohoLeadFields` con `housingValue`, `mortgageRemaining`, `vehicleValue`, `vehiclePaid`, `vehicleRemaining`, usando los nombres de API reales del módulo Leads.
- `src/pages/AdminVentas.tsx`: pasar `guide.housingValue`, `guide.mortgageRemaining`, `guide.vehicleValue`, `guide.vehiclePaid`, `guide.vehicleRemaining` en el `useMemo` de `liveZohoFields` (línea ~1791), que alimenta tanto `useCrmAutoSync` como el guardado.
- `supabase/functions/zoho-field-audit/index.ts`: añadir los nuevos campos a `TRACKED` para poder auditar tipo y valor.
- Mantener el envío como texto/número según el tipo real del campo en Zoho, igual que `importe_pagado_hipoteca`.
