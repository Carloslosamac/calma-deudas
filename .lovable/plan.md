# Gráfico de conversión: tier × fase, con tier por fase

## Modelo nuevo
La cercanía a convertir de cada fase = `tierFraction × phaseWeight`, donde el tier (engagement 0-3) se registra **por separado en cada fase**.

- `phaseWeight` (peso/avance de cada fase hacia el cierre): F1=0.2, F2=0.4, F3=0.6, F4=0.8, F5=1.0
- `tierFraction` (engagement 0-3 → fracción): 0→0, 1→0.33, 2→0.66, 3→1.0
- `conversión% = round(phaseWeight × tierFraction × 100)`

Ejemplos: Fase 1 con tier 3 (100% engagement) → 20%. Fase 4 con tier 1 (~33%) → ~26%. Refleja que avanzar de fase con buen tier sube la curva y un mal tier la hunde aunque la fase sea avanzada.

## Registro del tier por fase (`src/pages/AdminVentas.tsx`)
- Sustituir el estado único `engagement` por `engagementByPhase: (number|null)[]` de longitud 5 (null = aún no valorado en esa fase).
- Derivar `engagement = engagementByPhase[step] ?? 1` para mantener intactas las llamadas a la IA (diagnóstico, solución, contrato, firma) y el guardado.
- Los dos `EngagementGate` actuales (en fase 0 y fase 1) escriben en su índice de fase correspondiente.
- Añadir un selector de tier compacto (reutilizando el mismo control de 0-3) en las fases que hoy no tienen gate: Solución (2), Contrato (3) y Firma (4), para que el comercial registre el tier de esas fases.
- Persistir `engagementByPhase` en `guide_fields` (y leerlo al cargar un caso; migrar el valor antiguo `engagement` al índice 0 si solo existe ese).

## Gráfico (`src/components/ventas/ConversionChart.tsx`)
- Cambiar props: recibir `engagementByPhase` y `currentStep`.
- Calcular el array de datos con la fórmula `tier × fase`.
- Solo se dibuja con trazo sólido hasta la fase actual; las fases futuras se muestran punteadas como proyección usando el tier que tengan (o el último conocido) — manteniendo el estilo actual.
- El punto/etiqueta de cabecera muestra la conversión% de la fase actual.
- Colores siguen usando los tokens `--phase-*` de la fase actual.

## Notas
- Sin cambios en la lógica de IA ni en los prompts; solo presentación y registro del tier por fase.
