# Atribución real de leads: saber cuáles vienen de búsqueda

## Qué está pasando

Search Console sí está registrando búsqueda: del 31 jul al 27 ago hay **94 clics y 18.243 impresiones** (frente a 55 clics y 11.450 impresiones en los 28 días previos). GSC no registra leads: solo mide clics desde la búsqueda de Google, con 2-3 días de retraso y omitiendo consultas de bajo volumen.

El problema real está en nuestro lado: en los últimos 45 días hay 29 leads, y **11 no tienen ninguna atribución guardada**. Varios de esos 11 entran por páginas claramente orgánicas (`/bancos-hipoteca-vivienda/kutxabank`, `/tarjetas-revolving/bankintercard`, `/microcreditos-prestamos/vivus`, `/herramientas/test-solucion-deuda`), pero como solo guardamos UTMs (que Google orgánico nunca trae) y la página donde se convierte, esos leads quedan como "sin origen". No podemos demostrar que vengan de búsqueda porque no se guarda ni el referrer ni la página de entrada.

## Qué se va a hacer

1. **Capturar el origen completo en la primera visita**: referrer, dominio del referrer, página de aterrizaje y los identificadores de clic (`gclid`, `fbclid`, `msclkid`), guardados en sesión igual que las UTMs, con atribución de primer contacto.
2. **Clasificar el canal automáticamente** en: `organic_search`, `paid_search`, `paid_social`, `organic_social`, `referral`, `direct`, `interno`. Un referrer de google.com/bing sin UTM y sin `gclid` = búsqueda orgánica.
3. **Guardar todo eso en cada lead** (`web_submissions`) y en cada evento (`site_events`), con columnas nuevas: `channel`, `referrer`, `referrer_domain`, `landing_path`, `gclid`.
4. **Vista de origen en admin**: en el panel de leads web, mostrar el canal y la página de aterrizaje de cada lead, más un resumen por canal del periodo, para poder comparar de un vistazo leads orgánicos vs. clics de GSC.

## Detalles técnicos

- `src/lib/tracking.ts`: ampliar `captureUtms` a `captureAttribution` (mismo `sessionStorage`, clave versionada), añadir `getAttribution()` y `classifyChannel()`. Mantener las funciones actuales para no romper llamadas existentes.
- Migración: añadir las columnas nuevas (nullable) a `web_submissions` y `site_events`. Sin cambios de RLS ni de grants más allá de lo ya existente.
- `src/components/FormSection.tsx` y `trackEvent`: incluir los campos de atribución en el insert.
- `supabase/functions/zoho-lead`: pasar `channel` y `landing_path` al CRM junto a las UTMs actuales, sin romper el mapeo existente.
- `src/pages/AdminWebLeads.tsx`: columna de canal + tarjetas de resumen por canal.

## Lo que no cambia

No se toca el formulario ni su flujo, ni el diseño público, ni la configuración de Search Console. La atribución es histórica hacia adelante: los 11 leads ya existentes seguirán sin origen (podemos estimarlos por página de conversión, no confirmarlos).
