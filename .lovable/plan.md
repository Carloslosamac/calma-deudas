## Diagnóstico

- Los 44 artículos LSO sí están en la base de datos como `estado = en_cola`, `prioridad = Alta`, `cluster = ley-segunda-oportunidad`.
- `/admin` no los muestra porque la consulta trae las primeras 300 filas de `seo_roadmap` sin orden de prioridad/recencia, y luego ordena solo esas 300 en frontend. Como hay más de 1.000 filas en cola, los artículos nuevos quedan fuera del lote cargado.
- También hay 871 descartados (`descartado_duplicado`): 66 Alta, 162 Media y 643 Baja. Son filas marcadas como duplicadas por el sistema anterior.

## Plan de implementación

1. Actualizar la consulta de `/admin` para ordenar en la base de datos antes del `limit`:
   - primero `prioridad = Alta`, luego Media, luego Baja;
   - dentro de cada prioridad, mostrar primero las filas más recientes o de ID más alto;
   - mantener el límite de 300 para no cargar todo innecesariamente.

2. Añadir filtro rápido en el panel:
   - `Todas`;
   - `Alta`;
   - `LSO Alta` para ver directamente los 44 artículos de la guía.

3. Añadir desglose de descartados en `/admin`:
   - total descartados;
   - Alta / Media / Baja;
   - texto breve indicando que son `descartado_duplicado`, no artículos pendientes.

4. Mantener sin cambios la generación automática y la base de datos: no hace falta insertar nada más porque los 44 LSO ya existen.