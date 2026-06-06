## Objetivo
Eliminar el solape entre los dos desplegables del Header diferenciándolos por naturaleza: **"Soluciones" = servicios/métodos** que ofrece Calma; **"¿Qué necesitas?" = situaciones urgentes** en primera persona.

## Cambios en `src/components/Header.tsx`

### "Soluciones" (servicios / métodos)
- Ley de Segunda Oportunidad → `/ley-segunda-oportunidad`
- Cancelar deudas → `/cancelar-deudas`
- Reunificar deudas → `/reunificar-deudas`
- Exoneración del pasivo insatisfecho → `/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho`
- Concurso de persona física → `/autonomos-concurso-acreedores/concurso-persona-fisica`
- Cancelar tarjetas revolving → `/tarjetas-revolving/cancelar-tarjetas-revolving`
- Cancelar microcréditos → `/microcreditos-prestamos/cancelar-microcreditos`

### "¿Qué necesitas?" (situaciones urgentes, primera persona)
- Me van a embargar → `/embargos/parar-embargo`
- Estoy en ASNEF → `/asnef/salir-de-asnef`
- Me ha llegado un juicio monitorio → `/juicio-monitorio-recobro/juicio-monitorio-deuda`
- Una empresa de recobro me reclama → `/empresas-de-recobro`
- Recibo llamadas de acoso → `/empresas-de-recobro`

Así ninguna entrada se repite entre ambos menús: las acciones "cancelar/reunificar/legal" viven en Soluciones y los problemas urgentes en "¿Qué necesitas?".

## Detalle técnico
- `solucionesItems` pasa a derivarse de la nueva lista de paths de servicios (incluyendo exoneración y concurso, que ahora se añaden).
- `necesitasItems` se reescribe como array explícito `{ label, to }` con copy en primera persona.
- Sin cambios en rutas, datos ni otras secciones del menú.

No se toca nada más del sitio.