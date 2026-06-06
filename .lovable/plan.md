# Módulos interactivos para la money page LSO

Añadir 4 módulos interactivos a `/ley-segunda-oportunidad` que hagan el recorrido entretenido y útil, y que **terminen siempre en conversión** (botón que hace scroll a `#hero-form`, regla de marca). Solo frontend/presentación (sin backend): cálculos orientativos del lado del cliente con su aviso de "estimación". Estilo en tokens de marca Calma, animación con framer-motion, sin gradientes en CTAs.

## Módulos (en orden dentro del journey)

### 1. Simulador de deuda cancelable (tras el hero)
- Sliders: **deuda total** (0–120.000 €) y **cuota mensual que pagas hoy**.
- Salida animada: rango orientativo de deuda que podrías cancelar y "lo que dejarías de pagar al mes", con micro-aviso "estimación orientativa, lo confirmamos en tu estudio gratis".
- CTA: "Quiero saber mi caso exacto" → `#hero-form`.

### 2. Selector de tipo de deuda (tras los beneficios)
- Chips: Tarjetas revolving, Microcréditos, Préstamos bancarios, Hipoteca, Hacienda/SS, Varias a la vez.
- Al elegir, mensaje adaptado + enlace interno a la solución relevante (revolving, microcréditos, reunificar, etc.) + CTA a `#hero-form`.

### 3. Test de elegibilidad / quiz (tras los pasos)
- 4 preguntas rápidas Sí/No (insolvencia, buena fe, sin condenas socioeconómicas, origen de la deuda) con barra de progreso y transiciones.
- Pantalla de resultado motivadora ("Tu caso encaja, vamos a por ello" / "Lo vemos contigo sin coste") + CTA a `#hero-form`.

### 4. Comparador Antes / Después (antes del cierre)
- Toggle "Hoy con deudas" vs "Después con Calma" que intercambia dos listas (estrés, llamadas, embargos ↔ tranquilidad, cero llamadas, vida nueva).
- CTA a `#hero-form`.

## Cambios técnicos

### Datos — `src/data/seo/content/types.ts` + `leySegundaOportunidad.tsx`
Añadir bloque opcional `interactive` a `MoneyContent`:
- `simulator?`: límites de los sliders + textos.
- `debtTypes?`: lista `{ label, message, to? }`.
- `quiz?`: `{ questions: {text, goodAnswer}[], resultPass, resultDoubt }`.
- `beforeAfter?`: `{ before: string[], after: string[] }`.
Rellenar estos datos para la página LSO. Al ser opcionales, otras money pages no muestran los módulos.

### Componentes nuevos — `src/components/seo/interactive/`
- `DebtSimulator.tsx` — sliders (componente `ui/slider`) + cálculo cliente + número animado.
- `DebtTypeSelector.tsx` — chips seleccionables + panel de mensaje + enlace.
- `EligibilityQuiz.tsx` — stepper con `AnimatePresence`, barra de progreso, pantalla de resultado.
- `BeforeAfter.tsx` — toggle de dos estados con listas.
Todos reutilizan `CtaButton` y los tokens (`accent`, `accent-soft`, `surface-elevated`, `primary`). Envueltos en el patrón de revelado por scroll ya existente.

### Render — `src/components/seo/MoneyJourney.tsx`
Insertar cada módulo en su posición cuando exista su dato en `content.interactive`. No se toca el resto de la estructura ni el SEO.

## Notas
- Sin recogida de datos personales en los módulos (los sliders/quiz son anónimos); la captación real sigue en `#hero-form`.
- Cifras del simulador presentadas como orientativas para no inducir a error (E-E-A-T).
- QA en preview (desktop y móvil) tras implementar.
