# Cambiar el título de la rejilla del hub de recobro

## Cambio
En `src/pages/seo/ClusterHub.tsx` (línea 87), cambiar el título de la rejilla:

- Antes: `Todas las entidades de Empresas de Recobro`
- Después: `Todas las empresas de recobro`

El título se genera con `Todas las entidades de ${cluster.label}`. Se cambia la plantilla a minúsculas ("Todas las empresas de recobro") conservando el mismo patrón para otros hubs, verificando que en el hub de recobro el resultado sea exactamente "Todas las empresas de recobro" (label "Empresas de Recobro" en minúsculas tras "de").

## Verificación
- Compilación correcta (build).
- Comprobar en la vista previa que el hub /empresas-de-recobro muestra la nueva cabecera y que ninguna otra página se ve afectada.
