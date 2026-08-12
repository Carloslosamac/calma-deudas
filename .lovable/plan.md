# Revisión y ampliación del envío de datos al CRM

## Estado actual (verificado)

La conexión con el CRM **no se ha roto** con los cambios del diagnóstico. El envío se construye en `src/lib/zohoSync.ts` y se dispara al guardar el caso en `/admin/ventas`, y todos los campos del guion que usa siguen existiendo tal cual: deuda total, impago, nº de entidades y lista, vivienda, importe pagado de hipoteca, vehículo, ingresos, gastos, cuota de vivienda, cuota de vehículo, cuotas de deuda, salidas mensuales, capacidad de pago, importe asumible, situación laboral y solución recomendada.

Dos matices detectados:

- Los datos **nuevos** que introdujimos al simplificar el flujo no viajan al CRM: valor de la vivienda, valor y pagado del vehículo, el "pendiente" calculado, y la variante (individual / conjunta / autónomo) y modalidad (sin masa / liquidación / plan de pagos) del triaje. Al CRM solo llega el título de la solución.
- La sincronización solo ocurre si el caso viene de un lead con ID del CRM. Un caso creado desde cero no envía nada, que es el comportamiento esperado pero conviene que sea visible.

## Qué voy a hacer

1. **Comprobar los nombres de campo contra el CRM.** Consultar los metadatos del módulo Leads y contrastar uno a uno los nombres que usamos, para detectar cualquiera renombrado o eliminado antes de tocar código.

2. **Añadir los datos nuevos al envío.** Incorporar valor de vivienda, valor y pagado del vehículo, pendiente calculado, variante y modalidad del triaje — solo aquellos que existan realmente en el CRM tras la comprobación del paso 1. Los que no existan se listarán para que decidas si crearlos allí.

3. **Hacer visible el estado del envío.** Indicar en la pantalla de ventas si el caso está vinculado a un lead del CRM y, tras guardar, si el envío fue correcto y cuántos campos se han actualizado.

## Detalles técnicos

- Verificación: llamada de solo lectura a los metadatos de campos del módulo Leads a través del conector, sin escribir nada.
- `src/lib/zohoSync.ts`: ampliar `SalesZohoInput` y `buildZohoLeadFields` con las claves confirmadas.
- `src/pages/AdminVentas.tsx`: pasar los valores nuevos en la llamada al guardar y usar `syncLeadDetailed` para reportar resultado y nº de campos en el aviso.