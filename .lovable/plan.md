# Formulario de diagnóstico v2

Rehacer el wizard de `src/components/FormSection.tsx` con los nuevos campos, en un flujo fluido y atractivo, manteniendo el estilo actual (tarjeta clara, acento verde, animaciones Framer Motion) y la regla de marca (`#hero-form`). El envío al CRM se queda con los campos básicos actuales; los nuevos datos viajan también en el `body` pero la conexión completa de campos se deja para más adelante.

## Orden del flujo (optimizado para enganche → conversión)

```text
1. Importe de deuda        → slider (arranque visual, bajo esfuerzo)
2. Impago                  → Sí / No
3. Entidades              → multiselección (chips): préstamos · tarjetas ·
                             microcréditos · Hacienda · Seg. Social
4. Vivienda               → en propiedad · hipoteca · alquiler
   4b. Importe pagado hipoteca   → slider  (solo si "hipoteca")
5. Vehículo               → en propiedad · financiado
   5b. Valor estimado vehículo   → slider  (solo si "en propiedad")
   5c. Importe pagado vehículo   → slider  (solo si "financiado")
6. Contacto               → nombre · email · teléfono
7. Diagnóstico            → vía recomendada (LSO / reunificar / reclamación)
```

Los pasos condicionales (4b, 5b, 5c) se insertan dinámicamente en la secuencia según la respuesta previa, así la barra de progreso refleja el número real de pasos de cada usuario.

## Comportamiento (según memoria del wizard)

- Selección de opción única: al elegir, avanza solo tras ~250ms; el botón seleccionado queda marcado pero re-clicable para avanzar.
- Multiselección de entidades: chips toggle (se pueden marcar varias); avanza con un botón "Continuar" porque no hay autoavance.
- Sliders: mismo patrón visual que `UsuryCalculator`/`DebtSimulator` (valor grande en acento, formato `14.000 €`), con botón "Continuar".
- Sin navegación hacia atrás (regla actual). Barra de progreso "Paso X de N" recalculada con los pasos condicionales.
- Transiciones suaves entre pasos (slide/fade con `AnimatePresence`, igual que ahora).

## Paso de diagnóstico (paso 7, tras contacto)

Tras enviar el contacto, se muestra una pantalla de resultado con la vía probable, aplicando el triaje del proyecto:

- **LSO (Ley de Segunda Oportunidad)**: insolvente (impago / deuda alta respecto a capacidad) y SIN bienes pagados de valor (vivienda en propiedad pagada o vehículo en propiedad de valor → bloquean LSO en la práctica).
- **Reunificar** (negociación extrajudicial que baja cuota y total, sin préstamo nuevo): insolvente PERO con bienes pagados de valor que conviene proteger.
- **Reclamación judicial**: cuando hay tarjetas/microcréditos (usura) y deuda baja, al corriente.

Es una orientación (con disclaimer YMYL) + `CtaButton` que sigue llevando a hablar con el equipo. Copys coherentes con memoria (reunificar ≠ refinanciar).

## Envío al CRM (sin tocar campos nuevos del CRM)

- Se mantiene `supabase.functions.invoke("pipedrive-lead", ...)` con los campos que el edge function ya entiende: `debt_amount`, `default`, `fullName`, `email`, `phone`, y `loan_number` derivado del nº de entidades seleccionadas.
- Los datos nuevos (entidades, vivienda, vehículo, importes) se añaden al `body` y se reflejan en la **nota** del lead más adelante; en esta fase no se crean campos personalizados nuevos en el CRM (decisión del usuario: "solo cambio el formulario").
- Validación con zod (todos los campos), igual de estricta que ahora.

## Cambios por archivo

- `src/components/FormSection.tsx` — reescritura del wizard: nuevo `stepConfig` con tipos de paso (`single`, `multi`, `slider`, `contact`, `result`), lógica de pasos condicionales, estado de selección múltiple, sliders, y pantalla de diagnóstico. Reutiliza `Slider`, `Button`, `Form`, `Input` ya existentes.
- (Opción) Extraer la lógica de triaje a un pequeño helper `src/lib/seo/triage.ts` reutilizable y testeable, alineado con la memoria de triaje.

## Fuera de alcance

- Crear campos personalizados en el CRM y mapear cada dato (fase posterior).
- Cambios en el edge function `pipedrive-lead`.
- Persistir o reenviar el diagnóstico por email.

## Verificación

- Build + recorrer el formulario en preview (mobile 390px y desktop) comprobando: sliders, multiselección, ramas condicionales (hipoteca / vehículo propiedad vs financiado), envío y pantalla de diagnóstico.
