## Objetivo
Construir 4 super hubs de entidades, uno por cluster:
- Empresas de recobro
- Microcrédito
- Tarjetas
- Bancos

Cada hub incluirá todas las empresas relevantes de su cluster y servirá como índice SEO fuerte para enlazar a todas sus fichas individuales.

## Lo que voy a construir
1. **Ampliar el inventario de entidades**
   - Completar `src/data/seo/entities.ts` con cobertura exhaustiva por cluster.
   - Mantener la clasificación por `kind`, `cluster` y `solutionPath` para no romper la arquitectura actual.

2. **Convertir los 4 clusters en super hubs reales**
   - Reforzar el contenido de los hubs ya existentes para que no sean solo intro editorial, sino páginas índice potentes.
   - Añadir bloques de listado completo de entidades por cluster, agrupadas y enlazadas.
   - Hacer que cada hub sea claramente la página madre del cluster y distribuya autoridad interna a todas las entidades.

3. **Escalar las fichas de entidad**
   - Usar la plantilla existente de `entityContent.tsx` para generar automáticamente todas las nuevas URLs de entidad.
   - Mantener copy adaptado por tipo de entidad: recobro, microcrédito, revolving/tarjetas y banco.
   - Completar notas específicas para las entidades más relevantes para que no suenen genéricas.

4. **Mejorar interlinking SEO entre hub ↔ entidades ↔ money pages**
   - Cada hub enlazará a todas sus entidades.
   - Cada ficha de entidad enlazará a su money page de solución correspondiente.
   - Añadir enlaces cruzados entre clusters relacionados cuando tenga sentido comercial/SEO.

5. **Dejar la base preparada para crecimiento masivo**
   - Estructura pensada para añadir más entidades sin rehacer componentes.
   - Mantener coherencia con la arquitectura actual (`architecture.ts`, `hubContent.tsx`, `entityContent.tsx`).

## Alcance funcional
### Clusters a cubrir exhaustivamente
- **Empresas de recobro**: todas las empresas relevantes de gestión/compra de deuda.
- **Microcrédito**: todas las marcas y prestamistas rápidos relevantes.
- **Tarjetas**: emisores y marcas de tarjetas revolving/financiación asociada.
- **Bancos**: bancos y entidades financieras relevantes dentro del cluster de banca/hipoteca/vivienda.

### Resultado esperado
- 4 hubs fuertes y completos.
- Un listado exhaustivo de entidades por cluster.
- Una URL individual por entidad dentro de su cluster.
- Mejor cobertura long-tail y mejor arquitectura interna para las money pages.

## Detalles técnicos
- **Archivos principales a tocar**
  - `src/data/seo/entities.ts`
  - `src/data/seo/content/hubContent.tsx`
  - Posiblemente el renderer/listado del template de hub si hoy no pinta listados exhaustivos de entidades.
  - `src/data/seo/content/entityContent.tsx` para ampliar notas específicas si hace falta.

- **Patrón a respetar**
  - La arquitectura ya separa:
    - money pages
    - hubs satélite
    - fichas de entidad
  - Aprovecharé esa base, sin rehacer el sistema.

- **Criterio SEO**
  - Un solo hub principal por cluster.
  - Todas las entidades relevantes colgando de ese hub.
  - Enlazado interno fuerte hacia la solución comercial correcta.
  - Sin mezclar clusters incorrectamente para evitar canibalización.

## Decisión que aplicaré por defecto
Como has pedido cobertura exhaustiva, haré **cobertura total de entidades por cluster**, no solo top marcas.

## Riesgo a controlar
El único punto delicado es la **clasificación correcta de cada empresa dentro de su cluster**. Si quieres, en la implementación puedo seguir uno de estos dos enfoques:
1. **Yo propongo el listado completo por criterio SEO/comercial y lo monto directamente.**
2. **Tú me pasas o validas la lista maestra por cluster y yo la implemento exacta.**

Si apruebas, en la siguiente fase lo implemento directamente sobre la arquitectura actual.