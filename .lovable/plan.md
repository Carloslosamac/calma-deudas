# Diagnóstico de /admin/ventas: solo el árbol LSO

## Qué cambia

Hoy el motor de triaje mezcla el flowchart LSO con dos reglas de marca pensadas para el formulario público (reunificación y reclamación por usura). En ventas eso desvía casos: quien tiene la casa pagada nunca llega a evaluarse como LSO, y quien está al día con revolving sale como reclamación.

A partir de este cambio, el diagnóstico de ventas devuelve **solo** las salidas del árbol LSO:

- Derivar a abogado concursal (administrador de sociedad).
- Ley de Segunda Oportunidad, con variante (individual / conjunta / autónomo) y modalidad (sin masa / con liquidación / plan de pagos).
- No insolvente (capacidad de pago suficiente según ratio gastos/ingresos).

Reunificación y reclamación por usura desaparecen como resultado en ventas.

### Bienes pagados

Casa o coche pagados dejan de sacar el caso del árbol. Pasan a resolverse dentro de LSO por la rama de activos:

```text
vivienda habitual con valor neto positivo   -> plan de pagos
vivienda NO habitual pagada / con equity    -> con liquidación
coche pagado o financiado con valor neto    -> quiere conservarlo -> plan de pagos
                                               no lo conserva     -> con liquidación
sin bienes con valor neto                   -> sin masa
```

Cuando hay ingresos y gastos conocidos y superan el umbral del perfil, sigue mandando el ratio gastos/ingresos (>75% plan de pagos, 50–75% plan de pagos con aviso de zona gris, <50% no insolvente). El aviso de deuda pública >10.000 € se mantiene como advertencia.

## Detalle técnico

- `src/lib/seo/triage.ts`: añadir un modo de triaje para ventas (p. ej. `mode: "sales" | "public"`, por defecto `public`) para no alterar el formulario público, que sí usa reunificación y reclamación (`FormSection.tsx` y derivados).
  - En modo `sales`: eliminar el paso de reclamación por usura, el fallback de reunificación sin ingresos y la regla de activos de valor → reunificar.
  - Extender `modalityByAssets` para cubrir vivienda pagada (`housing === "propiedad"`) y coche pagado (`vehicle === "propiedad"`) con la lógica del diagrama anterior, en lugar de tratarlos como bloqueo.
  - Sin ingresos declarados en ventas, el caso resuelve por activos en vez de caer a reunificación.
- `src/pages/AdminVentas.tsx`: llamar al triaje en modo `sales`. Revisar los perfiles de prueba y sustituir los que hoy apuntaban a reunificación/reclamación por casos LSO equivalentes (vivienda pagada, coche pagado). El corte de fases para `derivar` y `no_insolvente` se mantiene.
- `supabase/functions/sales-diagnosis/index.ts`: alinear la réplica del motor con el mismo árbol (hoy además diverge: umbral de equity 20.000 €, coche 4.000 €, sin variante ni modalidad). Retirar los briefs de reunificación y reclamación de la ruta de ventas y dejar solo los de LSO por modalidad, derivar y no insolvente.

## Fuera de alcance

Las páginas públicas y el formulario de la web siguen exactamente igual: reunificación y reclamación por usura se mantienen ahí.