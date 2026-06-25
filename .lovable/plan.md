## Objetivo

Cuando la persona se niega a avanzar (duda, "me lo tengo que pensar", quiere colgar), el comercial debe poder **ampliar/reforzar la fase actual** con argumentario de manejo de objeciones, en lugar de verse obligado a pasar a la siguiente fase.

## Cómo funciona hoy

- Cada fase (Cualificación → Diagnóstico → Solución → Contrato → Firma) tiene una sola acción de salida: avanzar, que llama a `sales-diagnosis` y genera el guion de la fase siguiente.
- Ya se capturan señales de freno: chips de reacción ("Necesito pensarlo", "Me lo tengo que pensar", "Me lo pienso esta noche", etc.) y el engagement tier 3 "Quiere colgar".
- Pero no hay forma de pedir más munición para la fase en la que estás: o avanzas, o nada.

## Comportamiento propuesto

Añadir en cada fase una segunda acción, junto al botón de avanzar:

```text
[ Reforzar esta fase ]   [ Avanzar a la siguiente → ]
```

- **Reforzar esta fase**: NO avanza de paso. Vuelve a llamar a la IA en "modo refuerzo" para la fase actual y genera **tarjetas nuevas de manejo de objeciones** centradas exactamente en lo que está frenando a la persona (las frases de reacción marcadas + el engagement actual).
- El resultado se **añade/actualiza** en la fase actual (un bloque "Si aún no quiere avanzar" con 5-8 tarjetas de rebatido), sin tocar el diagnóstico/solución ya generados de otras fases.
- Se puede pulsar varias veces; cada pasada tiene en cuenta las nuevas reacciones que el comercial vaya marcando, para escalar o suavizar el discurso.
- Cuando la persona por fin afloja, el comercial ya avanza con el botón normal.

### Lógica de la IA en modo refuerzo

El prompt de refuerzo pide tarjetas que:
- Rebatan la objeción concreta marcada ("me lo tengo que pensar" → técnica de aterrizar la duda real; "lo consulto con mi pareja" → ofrecer incluir a la pareja / cierre condicional; "quiere colgar" → reenganche corto y de bajo compromiso).
- Se anclen en los datos REALES del caso (los X € en juego, entidades, intereses/costas que siguen corriendo, embargo SOLO si es legalmente viable) — respetando las reglas de embargabilidad ya implementadas.
- Adapten intensidad al engagement (más empatía y menos presión en "Dudoso/a"; reenganche breve en "Quiere colgar").
- Incluyan una pregunta de avance al final de cada tarjeta para reintentar el cierre sin presionar de golpe.

## Detalle técnico

**Edge function `supabase/functions/sales-diagnosis/index.ts`**
- Aceptar un nuevo `phase` tipo `"reinforce"` con un parámetro adicional `currentStep` (0-4) para saber qué fase reforzar.
- Añadir `buildReinforcePrompt(caseText, guide, triage, engagement, reactions, engagementByPhase, currentStep)` que reutiliza `buildCaseData`, `buildEmbargoGuide`, `reactionsBlock` e `itineraryBlock`, y pide un array `reinforce_internal` (5-8 `ScriptCard`) + un `reinforce_client` opcional, enfocado en manejo de objeciones de ESA fase.
- Devolver `{ reinforce_internal, reinforce_client, step }` sin sobrescribir los demás campos.

**UI `src/pages/AdminVentas.tsx`**
- Nuevo tipo en `AiResult`: `reinforce_internal?: ScriptCard[]` y `reinforce_client?: string` (por fase, ej. `reinforceByStep: Record<number, ScriptCard[]>` para no pisar el refuerzo de otra fase).
- Nueva función `reinforcePhase(currentStep)` análoga a `runPhase`, que invoca `sales-diagnosis` con `phase: "reinforce"`, `currentStep`, y el engagement/reacciones actuales, y mergea el resultado en el estado de la fase actual.
- Añadir el botón **"Reforzar esta fase"** junto al botón de avanzar en cada paso, con estado de carga propio.
- Renderizar el bloque "Si aún no quiere avanzar" (tarjetas de refuerzo) bajo el guion interno de la fase, con el mismo estilo de tarjetas y color de fase.
- Limpiar el refuerzo al resetear el caso.

**Sin cambios de esquema de BD** (el refuerzo es ayuda en vivo; opcionalmente se podría persistir más adelante, pero no es necesario para esta función).

## Verificación

- Probar con el caso de prueba: en Solución marcar "Me lo tengo que pensar" + engagement "Dudoso/a", pulsar "Reforzar esta fase" y confirmar que aparecen tarjetas de rebatido ancladas al caso, sin avanzar de paso.
- Repetir con engagement "Quiere colgar" y verificar que el tono cambia a reenganche breve.
- Confirmar que avanzar después sigue funcionando y que el diagnóstico/solución previos no se pierden.