# "Killer de ventas": speech específico en TODA la herramienta

## Problema
Los prompts de `supabase/functions/sales-diagnosis/index.ts` piden contenido en términos genéricos ("el alivio que aporta", "crea urgencia sana", "reafirma la buena decisión"). Además, los prompts de Firma y de Mensaje de contrato NO reciben siquiera los datos estructurados del caso (importe, entidades, nómina, vivienda). Resultado: un discurso vago y administrativo en vez de un cierre comercial afilado y concreto.

## Objetivo
Que las CINCO fases generen un speech específico, agresivo y anclado en los datos reales del caso (importe de deuda, entidades concretas, cuotas, nómina, vivienda/vehículo, frases de reacción), con argumentos de venta concretos y rebatibles. Sin inventar cifras de Calma ni porcentajes de resultado.

## Cambios en `supabase/functions/sales-diagnosis/index.ts`

### 1. Bloque de datos compartido
Extraer el armado del bloque `DATOS GUÍA` (`campos` + desglose de deudas) a una función reutilizable y pasarlo a TODOS los prompts (diagnóstico/solución, firma y mensaje de contrato), que hoy no lo reciben. Así cada salida puede citar importes y entidades concretas.

### 2. Diagnóstico (`buildPrompt`, puntos 1 y 2)
- Cada tarjeta/mensaje debe anclar la consecuencia en un dato real: "embargo sobre tu nómina de X €", "los Y € que debes a [entidad] crecen cada mes", entidades nombradas del caso.
- Prohibir frases de catálogo sin un dato detrás.

### 3. Solución (`buildPrompt`, puntos 3 y 4 + `SOLUTION_BRIEF`)
- Ampliar `SOLUTION_BRIEF` con la lista de beneficios concretos a aterrizar por solución (LSO: cancelar el importe exacto y fin de cuotas, parar embargo de la nómina indicada, salir de ASNEF, proteger bien concreto; Reunificar: bajar la cuota y el total por negociación extrajudicial —sin préstamo/agrupar/alargar—, una sola gestión frente a las N entidades; Reclamación: anular la deuda usuraria de la entidad concreta y recuperar lo pagado de más).
- Cada beneficio debe citar un dato del caso y conectar con el dolor del diagnóstico.

### 4. Aproach
- Convertir `approach` en instrucción táctica concreta (qué frase decir, qué objeción anticipar según las reacciones marcadas), no consejo genérico.

### 5. Firma (`buildSigningPrompt`)
- Recibir el bloque de datos del caso.
- Exigir rebatidos concretos por objeción ("me lo pienso", "lo consulto con mi pareja", "mándamelo y te digo") con argumentos atados al caso (lo que pierde cada día que no firma, importe en juego) y pasos exactos para firmar en la propia llamada.

### 6. Mensaje de envío de contrato (`buildContractMessagePrompt`)
- Recibir el bloque de datos del caso.
- Que reafirme la decisión citando el servicio y el beneficio concreto para esa persona, con un empujón claro a firmar ya.

### 7. Regla global anti-vaguedad
Añadir a todos los prompts una regla común: cada afirmación debe apoyarse en un dato del caso o en un argumento concreto; prohibido el relleno administrativo ("estamos para ayudarte", "tranquilidad", "empezar de cero") sin concretar. Mantener prohibición de inventar cifras de Calma y respetar la definición de cada solución.

## Sección técnica
- Único archivo: `supabase/functions/sales-diagnosis/index.ts`.
- Añadir helper `buildCaseData(g)` y pasarlo a `buildSigningPrompt` y `buildContractMessagePrompt` (actualizar sus firmas y llamadas en `Deno.serve`).
- Redesplegar la edge function.
- Verificar con `curl_edge_functions` el caso de prueba en las fases `default`, `signing` y `contract_message`: comprobar que cada salida cita importes/entidades reales y suena a cierre comercial.
