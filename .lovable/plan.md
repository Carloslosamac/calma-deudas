## Objetivo
Mejorar el segundo desplegable del mega-menú del Header: renombrarlo, ampliar su lista y quitar "Deudas con Hacienda".

## Cambios en `src/components/Header.tsx`

### 1. Renombrar el menú
- "Por tu problema" → **"¿Qué necesitas?"** (cambia la `label` del menú con id `problema`).

### 2. Ampliar la lista de "¿Qué necesitas?"
Reemplazar la lista actual (que solo tiene 4 items y mezcla rutas) por una lista más completa y orientada a la necesidad del usuario, construida desde las money pages / clusters existentes:

- Parar un embargo → `/embargos/parar-embargo`
- Salir de ASNEF → `/asnef/salir-de-asnef`
- Responder un juicio monitorio → `/juicio-monitorio-recobro/juicio-monitorio-deuda`
- Cancelar tarjetas revolving → `/tarjetas-revolving/cancelar-tarjetas-revolving`
- Cancelar microcréditos → `/microcreditos-prestamos/cancelar-microcreditos`
- Frenar a una empresa de recobro → `/empresas-de-recobro`
- Reunificar mis deudas → `/reunificar-deudas`
- Cancelar mis deudas → `/cancelar-deudas`

### 3. Quitar Deudas con Hacienda
- Eliminar `/deudas-hacienda-seguridad-social/deudas-hacienda` de esta lista (sigue disponible en su cluster y en el sitemap).

## Detalle técnico
- En `Header.tsx`, el array `problemaPaths` actualmente deriva los items solo de `moneyPages`. Como la nueva lista incluye una ruta de cluster (`/empresas-de-recobro`), se sustituirá por un array explícito de objetos `{ label, to }` (etiquetas orientadas a necesidad), en lugar de mapear únicamente por `moneyPages`.
- Se actualiza la `label` del objeto del menú de "Por tu problema" a "¿Qué necesitas?".
- Sin cambios en rutas, datos ni otras secciones del menú.

No se toca nada más del sitio.