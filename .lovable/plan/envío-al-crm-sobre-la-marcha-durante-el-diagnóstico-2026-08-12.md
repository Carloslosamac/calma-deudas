# Envío al CRM sobre la marcha durante el diagnóstico

## Situación actual
El envío al CRM ocurre en un solo momento: al pulsar "Guardar caso" al final del guion, y únicamente si el caso está vinculado a un lead con ID de CRM. Si la llamada se corta antes, o el comercial no guarda, el CRM no recibe nada de lo hablado.

## Qué cambia
El CRM se actualiza de forma continua mientras se rellena el guion, sin que el comercial tenga que hacer nada:

- Cada vez que cambia un dato económico o de situación (deuda, entidades, ingresos, gastos, vivienda, vehículo, situación laboral, impago), se envía al CRM automáticamente unos segundos después de dejar de escribir.
- Solo se envían los campos que han cambiado desde el último envío, para no repetir escrituras innecesarias.
- La solución recomendada se envía en cuanto el triaje la determina, sin esperar al guardado.
- Al guardar el caso se sigue haciendo un envío final completo, como red de seguridad.
- Los perfiles de prueba nunca envían nada al CRM.

## Señal visible para el comercial
Un indicador discreto en la cabecera del guion con tres estados: "Sin vincular al CRM", "Guardando…" y "Sincronizado hace X". Si falla, se muestra en rojo con un botón para reintentar. Sin toasts constantes.

## Detalles técnicos
- En `src/pages/AdminVentas.tsx`: hook `useCrmAutoSync` (nuevo, en `src/hooks/`) que recibe `leadExternalId`, los campos construidos con `buildZohoLeadFields` y `isTestCase`.
- Debounce de ~2,5 s, comparación con un `useRef` del último payload enviado para calcular el diff, y envío solo del delta vía `syncLeadDetailed` (ya existe en `src/lib/zohoSync.ts`).
- Se ignora el envío si `isTestCase` o si no hay `leadExternalId`.
- Cola de un solo vuelo: si llega un cambio mientras hay una petición en curso, se encola el último estado y se envía al terminar.
- `recordSyncStatus` se sigue usando para dejar el resultado en la fila del lead.
