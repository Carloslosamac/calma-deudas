# Tracking de origen (UTMs) y página de conversión → Zoho

## Objetivo
Cada lead que entra en Zoho debe traer:
- **source**: de dónde vino (parámetros UTM de la URL).
- **page**: el slug de la página donde el usuario rellenó y envió el formulario.

## Cómo funciona el origen (persistencia)
Los UTMs suelen venir en la primera URL de aterrizaje (ej. `mi-calma.es/?utm_source=google&utm_medium=cpc&utm_campaign=lso`), pero el usuario puede navegar antes de convertir. Por eso se capturan **una sola vez al cargar la web** y se guardan en `sessionStorage`, de modo que sigan disponibles aunque cambie de página antes de enviar.

## Cambios de Frontend

1. **Utilidad de tracking** (`src/lib/tracking.ts`, nuevo):
   - Al cargarse, lee de la URL: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`.
   - Si hay alguno, los guarda en `sessionStorage` (solo la primera vez; no se sobrescriben con navegaciones internas sin UTMs).
   - `getUtms()`: devuelve los UTMs guardados.
   - `getConversionSlug()`: devuelve `window.location.pathname` (la página donde se envía el formulario).

2. **Inicialización**: llamar a la captura de UTMs al arrancar la app (en `App.tsx` o `main.tsx`).

3. **`src/components/FormSection.tsx`** (`onSubmit`): añadir al `payload`:
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` (desde `getUtms()`).
   - `page`: slug de conversión (desde `getConversionSlug()`).

## Cambios de Backend (`supabase/functions/zoho-lead/index.ts`)

1. Ampliar la interfaz `FormData` con los campos UTM y `page`.
2. Construir el valor de **source** combinando los UTMs presentes en una cadena legible, p. ej.:
   `source=google | medium=cpc | campaign=lso | content=banner-a`
   (si no llega ningún UTM, se mantiene el valor por defecto `Calma Web`).
3. Mapear:
   - campo Zoho **`source`** ← cadena de UTMs.
   - campo Zoho **`page`** ← slug de conversión.
   - (Se mantiene `Fuente = "Calma Web"` como está, salvo que prefieras moverlo.)
4. Verificar los **API names** reales de los campos nuevos `page` y `source` en Zoho (a veces Zoho genera `page1`/`source1` si el nombre choca). Se comprueba consultando la metadata de campos antes de mapear, para no enviar a un nombre incorrecto que Zoho ignoraría en silencio.

## Validación
- Enviar un lead de prueba con UTMs simulados y leer el registro creado en Zoho para confirmar que `page` y `source` se rellenan correctamente.
- Limpiar el lead de prueba después.

## Notas / decisiones abiertas
- **source** se guardará como cadena combinada de UTMs. Si prefieres solo `utm_source` "puro" (ej. `google`) en ese campo, dímelo y lo ajusto.
- Si en el futuro quieres `gclid`/`fbclid` (Google/Meta Ads) o el `referrer`, se añaden con la misma mecánica.
