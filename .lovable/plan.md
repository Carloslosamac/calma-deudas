# Arreglar "No se pudo generar el diagnóstico" en /admin/ventas

## Qué está pasando (verificado)

Los logs de la función `sales-diagnosis` muestran que todas las llamadas de esta mañana devuelven **400 en unos 110 ms** (ni siquiera llegan a la IA). Ese 400 sale de una única validación de la función: exige un texto de caso de al menos 10 caracteres.

Desde que simplificamos el flujo ya no hay textarea: el texto se compone en el cliente con la etiqueta más los "datos relevantes" añadidos uno a uno. Si no hay etiqueta y el único dato añadido es corto (como en la captura, "Datos 1"), el texto no llega a 10 caracteres y la petición se rechaza antes de generar nada.

No es un problema de IA ni de créditos: es una validación heredada del flujo antiguo que ya no encaja con cómo se introducen los datos ahora.

## Qué voy a cambiar

1. **Enviar el contexto completo, no solo las frases sueltas.** El texto del caso incluirá también un resumen legible de los datos del guion (deuda, ingresos, gastos, vivienda, vehículo, situación laboral, variante y modalidad de triaje), para que la IA reciba todo lo ya rellenado en fases anteriores.

2. **Cambiar la validación de la función.** En vez de exigir 10 caracteres de texto libre, aceptará la petición cuando haya contexto suficiente: datos del guion rellenados o al menos un dato relevante. Solo se rechazará cuando no haya nada con lo que trabajar, con un mensaje claro ("Añade al menos un dato o completa el guion antes de generar el diagnóstico").

3. **Bloquear el botón antes de fallar.** "Generar diagnóstico" quedará deshabilitado, con una pista visible, mientras no haya contexto suficiente, en lugar de dejar pulsar y mostrar un error después.

4. **Mostrar el motivo real del error.** El aviso mostrará el mensaje que devuelve el servidor en vez del genérico, para no volver a quedarnos a ciegas.

## Detalles técnicos

- `supabase/functions/sales-diagnosis/index.ts`: sustituir el guard de longitud mínima por una comprobación de contexto (texto no vacío **o** `guide` con campos significativos), con mensaje de error específico. Redespliegue de la función.
- `src/pages/AdminVentas.tsx`: ampliar la composición del texto del caso con un resumen de `guide` + `triageExtra`; usar el mismo criterio para `hasCaseData` y el `disabled` del botón; propagar `data.error` al toast.
- Verificación: llamada directa a la función con un perfil de prueba para confirmar 200, y comprobación del flujo completo en el navegador.