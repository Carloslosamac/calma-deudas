# Portadas del blog que sí hablan del título

Hoy la escena se elige con muy pocas reglas y las más genéricas (`crédito`, `deuda`) se llevan casi todos los posts: por eso salen siempre personas en bares, terrazas y comercios, sin relación con el título. Los títulos reales son en su mayoría fichas de entidades ("Préstamo personal con Targobank"), definiciones ("¿Qué es el IVA?", "interés compuesto") y trámites, y ninguna de esas familias tiene regla propia.

## Qué se cambia

1. **Escenas por familia temática, no por palabra suelta**
   Nuevo mapa de reglas en `supabase/functions/_shared/hero-prompt.ts`, evaluado de lo más específico a lo más general:
   - Entidad concreta (banco, financiera, fintech: Targobank, Kutxabank, Bling, Aplazame…): la portada muestra un rastro real de esa entidad en contexto — un recibo o extracto sobre la mesa, un sobre con su membrete en el buzón, el rótulo de una oficina de calle, una tarjeta o un cajero. El nombre de la entidad se extrae del título y se pide que aparezca como texto corto y natural en ese soporte (rótulo, recibo, carta), nunca como logo flotante ni marca de agua.
   - Definiciones y conceptos financieros (IVA, IRPF, interés simple/compuesto, aval, extracto, persona física/jurídica, acreedor/deudor): escenas de objeto o lugar concreto ligado al concepto (extracto bancario en la mesa, sello de una gestoría, ventanilla de la Agencia Tributaria, calculadora y libreta), sin caer en la terraza de bar.
   - Trámites y organismos (cerrar empresa, administrador concursal, ADICAE, suspensión de pagos, renta): oficinas públicas, ventanillas, registros, salas de espera reales.
   - Hipotecas y euríbor, embargos y nómina, juzgados, tarjetas revolving, autónomos, pensiones: se mantienen pero con variantes revisadas para no repetir bar/comercio.
   - El "por defecto" deja de ser bar/terraza y pasa a escenas neutras variadas y ligadas a la categoría del post.

2. **Reparto de encuadre**
   Cada slug elige de forma determinista entre persona en contexto, lugar/fachada y detalle de objeto, así que dejan de ser todas "una persona haciendo algo". Se mantiene el realismo tipo foto de móvil que ya funciona.

3. **Comprobación de coherencia**
   El prompt incluye el título literal y exige que el tema se reconozca a simple vista; el `hero_alt` se genera desde la escena elegida, como ahora.

4. **Regeneración**
   Se regeneran las portadas de los ~50 posts más recientes con `regenerate-blog-hero` (`limit: 50`, orden descendente), por lotes, revisando una muestra antes de lanzar el resto. Los anteriores se quedan como están y se pueden regenerar más adelante.

## Detalle técnico

- Ficheros: `supabase/functions/_shared/hero-prompt.ts` (reglas de escena, extracción de entidad, reparto de encuadre, prompt), sube `PIPELINE_VERSION`. No cambia la lógica de subida ni de firma de URLs.
- Extracción de entidad: regex sobre el título tras "con / de" contra una lista de patrones de marca; si no hay entidad clara, se cae a la familia temática.
- Texto en imagen: solo se permite el nombre de la entidad en el soporte natural (rótulo, recibo, carta) y en corto; se mantiene la prohibición de logos inventados, marcas de agua y textos largos.
- Regeneración vía llamada a la función `regenerate-blog-hero` ya desplegada; se redespliega junto con el shared actualizado.
