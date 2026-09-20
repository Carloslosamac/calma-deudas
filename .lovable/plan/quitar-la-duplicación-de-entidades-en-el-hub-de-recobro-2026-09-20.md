# Quitar la duplicación de entidades en el hub de recobro

Sí, está duplicado. En `/empresas-de-recobro` las 71 fichas aparecen dos veces:

1. En la sección "Todas las entidades de Empresas de recobro" (la rejilla de tarjetas).
2. En el bloque final "Contenido relacionado", que también vuelca todas las entidades del cluster.

## Cambio propuesto

En los hubs que ya muestran la rejilla completa de entidades (recobro, microcréditos, revolving, bancos/hipoteca), dejar de incluir esas mismas entidades en "Contenido relacionado".

Ese bloque pasa a mostrar solo lo que no está en la rejilla: páginas principales del cluster, comparativas, guías y secciones relacionadas.

En los hubs que no tienen rejilla de entidades, "Contenido relacionado" sigue exactamente igual que ahora.

## Detalle técnico

- `src/pages/seo/ClusterHub.tsx`: mover la constante `hubEntityClusters` por encima del cálculo de `related` y añadir las entidades a `related` solo cuando el cluster no pertenezca a ese conjunto.
- Sin cambios en datos, rutas, sitemap ni en el resto de plantillas.
