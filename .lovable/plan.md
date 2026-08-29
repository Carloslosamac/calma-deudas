# Lectura de los datos de GSC (28 ago 2026) y rumbo propuesto

## Cómo vamos

| Periodo (28 días) | Clics | Impresiones |
| --- | --- | --- |
| Últimos 28 días | 90 | 17.331 |
| 28 días previos | 52 | 10.955 |
| 28 días antes | 12 | 1.656 |

Crecimiento sostenido y acelerando: los últimos 3 días son los mejores del histórico (1.021, 1.363, 1.569 impresiones/día). Las AI Overviews también suben: 394 impresiones en 28 días frente a 299 del periodo anterior, con récord los días 25-26.

## Lo que funciona y lo que no

Rendimiento por tipo de página (3 meses):

| Tipo de página | Clics | Impresiones | CTR |
| --- | --- | --- | --- |
| Ciudades (abogados-ley-segunda-oportunidad) | 1 | 12.939 | 0,01% |
| Blog | 64 | 6.797 | 0,94% |
| Tarjetas revolving | 23 | 2.311 | 1,0% |
| Bancos / hipoteca | 20 | 2.187 | 0,9% |
| Empresas de recobro | 23 | 1.187 | 1,9% |
| Microcréditos | 10 | 1.469 | 0,7% |

Diagnóstico: las páginas de entidad (banco, tarjeta, recobradora, microcrédito) son las que traen clics reales, con posiciones de 6 a 12. Las páginas de ciudad generan el 43% de todas las impresiones y un solo clic porque están en posición 50-90: Google las muestra en la cola larga pero nadie llega hasta ahí. Perseguir "abogados ley segunda oportunidad + ciudad" es competir de frente con despachos con años de autoridad y no está dando retorno.

Fuera de eso hay un patrón claro: móvil convierte casi 4x mejor que escritorio (0,93% vs 0,24% CTR), y todos los clics reales son España.

## Rumbo propuesto

**1. Doblar la apuesta por las páginas de entidad.** Es lo único que ya rankea en top 10. Ampliar la cobertura a las entidades que aparecen en las consultas con impresiones y sin página propia o con página débil: Creditea, Vivus, Dineo, QueBueno, Kviku, WiZink, GCBE, Deutsche Bank, Endesa/Repsol (deudas de suministros), Santander, ING.

**2. Rescatar las consultas en distancia de golpeo (posiciones 5-20).** Hay un bloque de consultas rondando el top 10 sin clics porque el título no invita a pinchar. Reescribir title y meta de esas páginas concretas, entre ellas:

- `cuenta bancaria inembargable en españa` (pos. 12,7)
- `reunificar deudas wizink` (pos. 18,9)
- `quebueno intereses abusivos` (pos. 13,3)
- `kruk españa te puede embargar` / `kruk españa caixabank` (pos. 9-10)
- `dación en pago ley segunda oportunidad` (pos. 14-17, sin página propia)
- `a partir de qué deuda te pueden embargar el coche` (pos. 11)
- `barrido de cuentas` (pos. 19,9)
- `cancelar préstamo ING` (pos. 7,2)

**3. Dejar de invertir en páginas de ciudad genéricas.** No borrarlas, pero congelar la creación de nuevas y reenfocar las existentes hacia intención local resolutiva (juzgado de lo mercantil de la provincia, plazos reales, casos de esa zona) en lugar de repetir "abogados ley segunda oportunidad en X". Reescribir primero las 6 con más impresiones: A Coruña, Málaga, Zaragoza, Almería, Tarragona, Alicante.

**4. Reforzar la presencia en AI Overviews.** El 62% de las impresiones de IA vienen del blog, y el patrón es siempre pregunta directa. Aplicar al resto del blog el formato que ya gana ahí: respuesta corta en el primer párrafo, FAQ con marcado, datos concretos. Las páginas de entidad casi no aparecen en IA todavía — añadirles bloque de preguntas frecuentes.

**5. Prioridad móvil.** Toda revisión de title/meta se valida en ancho móvil, que es donde está el CTR.

## Detalles técnicos

- Nuevas entidades: mismos ficheros de datos que las actuales en `src/data/seo/` (bancos, tarjetas, microcréditos, recobro), sin código nuevo.
- Reescritura de titles: aplica la regla de CTR ya vigente (estudiar top 10, sin branding, <60 y <160 caracteres).
- Páginas nuevas se envían a IndexNow con el mecanismo ya existente.
- Bloque FAQ en páginas de entidad: reutiliza `FaqList` y `buildFaq` de `structuredData.ts`.

## Qué mediremos

En 4 semanas: clics totales (objetivo 200+/28 días), CTR global por encima del 0,8%, y número de consultas con clics fuera de la marca.
