
## Problema

Hoy `/ley-segunda-oportunidad` (LSO) y `/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho` (EPI) son casi idénticas: mismo hero "cancela tus deudas", beneficios calcados, mismo quiz, misma timeline. Compiten por la misma intención transaccional y se canibalizan en buscadores.

## Enfoque propuesto (el "bacano")

**LSO = la puerta comercial** (intención transaccional, captar el lead, vista de embudo). **No se toca.**

**EPI = la página de autoridad jurídica** (intención informativa-técnica, responde la pregunta concreta "¿qué es exactamente la exoneración y cómo funciona?"). Es el contenido experto que rankea por consultas legales precisas y deriva el lead a la LSO como página de conversión.

La diferencia clave: la LSO te vende el resultado ("borra tu deuda"); la EPI te explica el **mecanismo legal** con rigor y resuelve las dudas finas que la gente busca antes de decidirse. Eso construye E-E-A-T y captura long-tail jurídico sin pisar a la LSO.

### Cambios de ángulo en EPI

```text
                 LSO (intacta)              EPI (reenfocada)
Intención        transaccional             informativa / autoridad
Tono             emocional, "deja de pagar"  jurídico, claro, didáctico
Hero             "la ley puede borrar"      "qué es y cómo se consigue la EPI"
Módulo estrella  simulador de deuda         tabla: qué se exonera vs qué NO
Conversión       formulario directo         CTA suave → enlaza a LSO
```

### Contenido concreto a reescribir en EPI

1. **Hero técnico-didáctico**: badge "Mecanismo legal de la LSO", título centrado en *entender* la exoneración (qué es la resolución del juez), subtítulo que aclara que es el corazón jurídico de la LSO. Menos "vende", más "explica".

2. **Bloques nuevos de valor real (los que la gente busca):**
   - **Las dos modalidades de EPI**: con plan de pagos (conservas patrimonio, pagas parte 3 años) vs. con liquidación inmediata. Cuándo conviene cada una.
   - **Qué deudas se exoneran y cuáles NO** — usar el componente de tabla comparativa (`CompareTable` / `ComparisonTable` ya existente) para mostrar exonerables (tarjetas, microcréditos, préstamos, proveedores) vs. excluidas/limitadas (deuda pública con tope, pensiones de alimentos, multas penales, créditos por dolo).
   - **Límites de la deuda pública** — reutilizar `ExonerationLimits` (ya existe el componente) con los topes de Hacienda y Seguridad Social.
   - **EPI provisional vs. definitiva**: qué es la exoneración con plan de pagos (provisional, revisable) frente a la inmediata.
   - **Causas de revocación**: en qué supuestos un juez puede revocar la exoneración (ocultar bienes, mejora de fortuna). Aporta rigor y confianza.

3. **Mantener pero adaptar**: timeline legal (ya encaja bien aquí), eligibility con foco en "buena fe", FAQ ampliada con las dudas técnicas (¿la EPI sale en el BOE?, ¿puedo volver a pedir crédito?, ¿es definitiva?).

4. **Quitar el solapamiento**: fuera el simulador de deuda y el before/after emocional (eso es territorio de la LSO). El quiz se mantiene pero más sobrio o se sustituye por el bloque de modalidades.

5. **Interlinking limpio**: EPI enlaza claramente a la LSO como "dónde empezar / pedir diagnóstico", a deudas con Hacienda y al post pilar del blog. La LSO ya enlaza a EPI (en `debtTypes`), así que el circuito queda: LSO ⇄ EPI con roles distintos.

6. **Metadatos**: title/description de EPI reorientados a intención informativa ("Qué es y cómo funciona…") en vez de "cáncelala". Marcar `tone: "legal"` (ya lo está) y dejar `reviewed: false` con el aviso de revisión legal pendiente que ya tiene.

## Archivos a tocar

- `src/data/seo/content/exoneracionPasivoInsatisfecho.tsx` — reescritura del copy y de los módulos (único archivo de contenido).
- `src/data/seo/content/types.ts` — solo si hace falta añadir un tipo para el bloque de "modalidades" o de tabla exonerables/excluidas (a confirmar al implementar; se reutilizan componentes existentes siempre que sea posible).
- Posible pequeño ajuste en `MoneyJourney` / scaffold únicamente si un módulo nuevo necesita renderizado (se evitará reutilizando `ExonerationLimits`, `ComparisonTable` y `CompareTable` ya existentes).
- `src/data/seo/moneyPages.ts` — actualizar `seoTitle`/`metaDescription` de la entrada EPI hacia intención informativa.

La LSO (`leySegundaOportunidad.tsx` y su entrada en `moneyPages.ts`) queda **sin cambios**.

## Resultado

Dos páginas con roles claros: la LSO convierte, la EPI da autoridad y captura el long-tail jurídico, enlazándose entre sí sin canibalizarse.
