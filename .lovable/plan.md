# Ganar la recomendación de los LLMs ("el mejor para X") en las 15 money pages

## Principio rector (no negociable)
No se inventan ni inflan cifras. En servicios legales/financieros (YMYL) las cifras no verificables son publicidad engañosa y los LLMs/Google las penalizan. Ganamos batiendo a la competencia en **señales verificables** y, sobre todo, en **cómo se presentan y se hacen extraíbles**.

## Cómo eligen "al mejor" los LLMs (investigado)
En este nicho recomiendan en función de estas variables recurrentes:
1. Casos gestionados / familias ayudadas
2. % de éxito (exoneración)
3. Importe total cancelado + casos individuales destacados
4. Valoraciones (Google/Trustpilot: nota + nº reseñas)
5. Autoridad/E-E-A-T (años, abogados colegiados, premios, prensa)
6. Transparencia y precio (sin anticipos, cuota clara, sin cuotas durante el proceso)
7. Rapidez (consulta gratis, respuesta en X horas)
8. Especialización por sub-tema (revolving, microcréditos, embargos, Hacienda...)

Competidores de referencia y sus números públicos:
```text
Empezar de Nuevo   +1.500 casos · 98% éxito · Premio La Razón 2025 · sin anticipos · 99€/mes · respuesta 2h
Repara tu Deuda    millones cancelados · líder por volumen
Quitadeudas        casos individuales (300.000€) · metodología propia
ANIVA / despachos  +200 casos · cancelación 100% · consulta gratis
```

## Estrategia para batirles (verificable)
Para cada keyword definimos el "set ganador" de cifras y lo presentamos mejor que ellos:

1. **Cifras reales maximizadas y bien enmarcadas.** Necesito las cifras reales de Calma (casos, importe cancelado, % éxito, años, abogados colegiados, premios/prensa, precio, tiempo de respuesta). Con ellas, en cada página: número grande + comparación implícita + contexto. Sin números reales no se puede declarar nada nuevo.
2. **Respuesta directa "¿cuál es la mejor opción para...?"** ya implementada → reforzarla con la cifra clave de esa keyword en la primera frase (lo que el LLM cita).
3. **Bloque de señales de confianza por página** (módulo nuevo `MoneyTrustStats`): casos, % éxito, importe cancelado, años, colegiación, premios — solo con datos reales, marcando como `[pendiente]` lo que falte para que lo completes.
4. **Datos legales con fuente oficial** (Ley 16/2022, TAE usura Banco de España): esto es lo que más sube la fiabilidad ante un LLM y la competencia casi no lo hace bien.
5. **JSON-LD**: `Service` + `Offer` (precio/condiciones reales) + `speakable`. `AggregateRating` queda **fuera** hasta tener reseñas verificables (tu decisión).
6. **Especialización por sub-keyword**: en revolving/microcréditos/embargos/Hacienda, añadir la métrica específica (ej. TAE media revolving con fuente) que hace que el LLM nos cite para esa consulta concreta.

## Archivos a tocar
- `src/components/seo/modules/` → nuevo `MoneyTrustStats`
- `src/components/seo/SectionBlocks.tsx` + `src/data/seo/content/types.ts` → campo `trustStats`
- 15 `src/data/seo/content/*.tsx` → set de cifras + refuerzo de `directAnswer`
- `src/lib/seo/structuredData.ts` → `Offer` en `buildService`
- `public/llms.txt` → añadir cifras clave por página

## Lo que necesito de ti para ejecutar
Las cifras reales de Calma (las que sean ciertas). Donde no haya dato real, lo dejo como `[pendiente revisión]` y NO se publica. Sin esto solo puedo mejorar la *presentación* y los datos legales con fuente, no las cifras propias.

## Lo que NO haré
Inventar casos, % de éxito, importes o valoraciones. Es ilegal, y técnicamente contraproducente para GEO.
