## Corrección del gráfico de conversión (bug de inversión)

### Problema
El array `TIER_FRACTION` en `ConversionChart.tsx` está mapeado al revés respecto a los labels de engagement:
- Tier 0 = "Quiere empezar ya" (máximo engagement) → debería ser 100%
- Tier 3 = "Quiere colgar" (mínimo engagement) → debería ser 0%

Actualmente el array es `[0, 0.33, 0.66, 1]`, lo que invierte completamente la curva.

### Cambio a realizar
1. **Invertir `TIER_FRACTION`** en `src/components/ventas/ConversionChart.tsx`:
   - De: `[0, 0.33, 0.66, 1]`
   - A: `[1, 0.66, 0.33, 0]`
2. **Verificar que no haya hardcodes similares** en otros componentes que usen `engagementByPhase` directamente sin pasar por el gráfico.

### Resultado esperado
Un caso con tier 0 ("Quiere empezar ya") pintará la curva más alta en esa fase. Un caso con tier 3 ("Quiere colgar") la pintará más baja. La coherencia entre labels y visualización quedará restaurada.