# Un color propio por cada fase de la herramienta de ventas

## Objetivo
Que las 5 fases (Cualificación → Diagnóstico → Solución → Contrato → Firma) tengan cada una un color distintivo y coherente, aplicado en el stepper y en la cabecera de cada paso, para que el comercial sepa de un vistazo en qué fase está.

## Paleta propuesta (semántica, vía tokens)
- **Cualificación** — Azul (recogida de datos / información)
- **Diagnóstico** — Rojo/coral (dolor, urgencia, consecuencias)
- **Solución** — Verde (alivio, salida)
- **Contrato** — Ámbar (documento, paso previo a la firma)
- **Firma** — Violeta/accent (cierre final)

## Cambios

### 1. Tokens de color por fase (`src/index.css`)
Añadir variables HSL en `:root` y su equivalente en el bloque `.dark`:
`--phase-qualify`, `--phase-diagnosis`, `--phase-solution`, `--phase-contract`, `--phase-sign` (+ sus `*-foreground`). Registrarlos en `tailwind.config.ts` como colores (`phase.qualify`, etc.) para poder usarlos como utilidades.

### 2. Mapa de fase → color en `AdminVentas.tsx`
Definir un array `PHASE_THEMES` (paralelo a `STEPS`) con las clases de cada fase: color de fondo activo, texto, y un tono suave para acentos.

### 3. Stepper
En el botón activo, usar el color de su fase (`PHASE_THEMES[i]`) en vez de `bg-accent` fijo. Los inactivos siguen en `bg-muted`. Opcional: un punto/indicador de color en cada botón aunque esté inactivo, para reforzar la identidad de color.

### 4. Cabecera de cada paso
Aplicar el color de la fase a la cabecera del Card de cada paso (título de sección / icono / borde superior) usando el tema correspondiente, de modo que el contenido de cada fase quede tintado con su color.

## Sección técnica
- Archivos: `src/index.css`, `tailwind.config.ts`, `src/pages/AdminVentas.tsx`.
- Solo cambios de presentación; sin tocar la edge function ni la lógica de pasos.
- Colores como tokens HSL (sin hex hardcodeado en componentes), respetando dark mode.

## Pregunta
¿Te vale la paleta propuesta (azul/rojo/verde/ámbar/violeta) o prefieres elegir colores concretos para alguna fase?
