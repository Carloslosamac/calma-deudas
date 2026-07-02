## Objetivo

La **Presentación** es lo primero, antes de hablar del caso, así que NO puede depender de "datos relevantes" ni de la IA. Debe ser un **guion fijo de autoridad** que Carlos usa siempre igual. Se elimina la generación por IA en fase 0 y se sustituye por modelos de presentación seleccionables/copiables.

## 1. Fase Presentación = guiones fijos (sin IA, sin datos del caso)

- En `src/pages/AdminVentas.tsx`, fase 0: quitar la llamada `runPhase("presentation")` y el estado `presentation_internal`/`presentation_client` generados por IA.
- Sustituir por un bloque con **3 modelos de presentación fijos** (constante local `PRESENTATION_SCRIPTS`), cada uno como una tarjeta con:
  - Título del modelo + descripción de cuándo usarlo.
  - Texto literal del guion (Carlos, abogado LSO +6 años).
  - Botón "Copiar".
- Mantener debajo el `EngagementGate` "¿Cómo te ha recibido?" para pasar a Cualificación.
- La validación de "añade datos relevantes" ya **no aplica** a la fase 0 (la presentación siempre está disponible). Los datos relevantes del sticky siguen usándose solo desde Cualificación en adelante.

## 2. Modelos de presentación propuestos (contenido fijo)

**Modelo A — Encuadre directo de autoridad (por defecto)**
> "Le explico rápido quién soy para que sepa con quién habla: soy Carlos, abogado especialista en Ley de Segunda Oportunidad, llevo más de 6 años dedicado en exclusiva a esto y he acompañado a cientos de personas en su misma situación a cancelar deudas que creían imposibles de pagar. No le vendo humo: le voy a decir con claridad si su caso tiene solución legal y cuál es. Para eso necesito hacerle unas preguntas concretas. ¿Le parece que empecemos?"

**Modelo B — Empática + autoridad (cliente nervioso o avergonzado)**
> "Antes de nada, tranquilícese: lo que le pasa lo he visto cientos de veces y tiene solución. Me llamo Carlos, soy abogado especializado en Ley de Segunda Oportunidad desde hace más de 6 años y me dedico solo a esto. Mi trabajo es mirar su situación con criterio legal y decirle la verdad, aunque no siempre sea lo que espera oír. Si hay salida, se la voy a enseñar paso a paso. ¿Le hago unas preguntas para verlo?"

**Modelo C — Contundente de cierre de credibilidad (cliente escéptico / "otra empresa me llamó")**
> "Le hablo claro porque su tiempo vale: soy Carlos, abogado, más de 6 años dedicado en exclusiva a la Ley de Segunda Oportunidad. Esto no es un call center ni una reunificadora: es un procedimiento legal amparado por la ley y lo lleva un abogado de principio a fin. He visto a mucha gente perder meses con quien no debía. Deme cinco minutos y le digo con honestidad si su caso encaja o no. ¿Empezamos?"

(El texto exacto se ajustará al copiarlo en la constante; queda abierto a que edites las cifras/claims para no inventar estadísticas, según la regla de no cifras fabricadas.)

## 3. Limpieza del edge function

- En `supabase/functions/sales-diagnosis/index.ts`: la fase `presentation` ya no se invocará desde el front. No es necesario borrar código, pero se puede documentar que la presentación es estática. Sin cambios de BD ni RLS.
- El resto de fases (Cualificación → Firma) siguen igual, alimentadas por los datos relevantes del sticky.

## Detalles técnicos

- Archivo principal: `src/pages/AdminVentas.tsx` (constante `PRESENTATION_SCRIPTS`, render fase 0, quitar `runPhase("presentation")` y validación de datos en fase 0).
- Sin cambios en `ConversionChart`, BD ni contrato.
- Verificación: `tsgo` para tipos.

## Fuera de alcance

- No se toca la lógica legal, financiera ni el PDF de contrato.
- No se cambian las demás fases.

## Duda a confirmar

¿Quieres que Carlos aparezca como perfil oficial (añadirlo/ajustarlo en `src/data/team.ts`, hoy "Carlos Rivas · derecho bancario") o solo dentro de los guiones internos de ventas sin tocar la web pública?
