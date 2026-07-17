## Problema
En `sceneFromTitle` (regenerate-blog-hero + generate-daily-posts) casi todas las reglas describen "papeles / facturas / carta / recibo / extracto / carpeta". Resultado: mires el post que mires, la portada es una mesa llena de papeles. Rompe la variedad aunque el estilo (móvil, luz natural) sea correcto.

## Cambio propuesto

Reescribir `sceneFromTitle` con:

1. **Varias variantes por regla** (2-4 escenas alternativas por temática). Se elige de forma determinista con un hash del slug, así cada post tiene siempre la misma imagen pero entre posts hay variedad. Solo una variante por regla puede incluir papeles.
2. **Prohibir "papeles" en la mayoría de variantes**. Alternativas concretas por temática:
   - Burofax/carta → 1 variante con carta en mano; el resto: buzón de portal, cartero repartiendo, sobre cerrado sin abrir sobre el felpudo.
   - Juzgado/demanda → fachada del juzgado desde la calle, cartel de "Juzgado de Primera Instancia", pasillo vacío, persona esperando (sin carpeta).
   - Embargo/nómina → móvil mostrando la app del banco con saldo, cajero automático de calle, ticket de compra en la mano.
   - Hipoteca/vivienda → portal de bloque, ventana de piso desde la calle, llaves sobre encimera, cartel "Se vende" en balcón.
   - Tarjeta/revolving → tarjeta sobre mesa, TPV en comercio, móvil pagando contactless, cajero.
   - Reunificación/cuota → persona hablando por teléfono en el salón, calendario de pared con marcas, hucha vacía, calculadora sola.
   - Concurso/LSO/insolvencia → despacho de abogado corriente visto desde fuera, sala de espera, sello oficial en una carta (sin papeleo desperdigado).
   - Banco/entidad → fachada de sucursal, cajero, cola en oficina bancaria.
   - Deuda/impago/ASNEF → móvil con notificación push, buzón lleno, timbre de puerta.
   - Pensión/jubilación → persona mayor en un banco de plaza, persona mayor con el móvil, cartilla del banco antigua.
   - Autónomo/hacienda → autónomo en su taller/tienda, portátil sobre mesa de bar, furgoneta comercial aparcada.
   - Default (sin match) → variantes cotidianas neutras: cocina española normal, salón con la tele encendida, calle de barrio, mesa de bar, portal de vecinos. Sin papeles.
3. **`buildPrompt`**: añadir a la lista de "Prohibido" explícitamente "montones de papeles, facturas o documentos desperdigados como cliché" salvo que la escena elegida los incluya. Se resuelve dinámicamente concatenando la prohibición solo cuando `scene` no menciona papel/carta/factura/recibo/extracto/carpeta.

## Archivos a tocar

- `supabase/functions/regenerate-blog-hero/index.ts` — reescribir `sceneFromTitle` con variantes + hash de slug, y ajustar `buildPrompt` para recibir el slug y la prohibición condicional. Cambiar la llamada de `regenerate()` para pasar `slug` a `buildPrompt`.
- `supabase/functions/generate-daily-posts/index.ts` — misma reescritura de `sceneFromTitle` + `buildPrompt` para que las nuevas portadas diarias hereden la variedad.

Sin cambios en frontend, tipos, migraciones ni cron. Coste por imagen sigue en ~0,135 créditos.

## Después del cambio

Continuar el refresco desde donde se quedó (offset 5, orden desc, lotes de 5) hasta cubrir todos los posts publicados restantes. Reporto coste acumulado tras cada lote.

## Fuera de alcance
- Redibujar los ya generados con papeles si la nueva escena elegida para ese slug también incluye papeles (será minoritario y coherente con el título).
- Cambios de modelo, tamaño de imagen o pipeline de subida.
