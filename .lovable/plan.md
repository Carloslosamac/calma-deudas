## Objetivo

Ampliar la herramienta de ventas (`/admin/ventas`) en dos frentes:

1. **Selector de frases de reacción** dentro del `EngagementGate`, para cincelar el tono de la IA según cómo respondió la persona a la fase anterior.
2. **Dos fases nuevas al final del flujo**, de modo que la llamada termine en contrato enviado y firmado:

```text
Cualificación → Diagnóstico → Solución → Contrato → Firma
```

---

## Parte 1 — Selector de frases de reacción

Debajo de los 4 botones de nivel (0–3) del `EngagementGate` aparece una sección "¿Cómo ha reaccionado?" con frases tipo chip (multi-selección). Distintas según la fase:

- **Antes del Diagnóstico** (reacción a la cualificación): «Me da vergüenza haber llegado a esto», «No es para tanto, lo controlo», «Llevo meses sin dormir», «No tengo tiempo ahora», «¿Esto cuánto cuesta?».
- **Antes de la Solución** (reacción al diagnóstico): «No sabía que podía perder la nómina», «Ya lo he intentado todo», «Suena bien pero no me fío», «Necesito pensarlo», «¿Y si no funciona?», «Quiero empezar ya».

Las frases marcadas se envían a la IA junto al score para afinar intensidad y objeciones a anticipar.

**Técnico:**
- `AdminVentas.tsx`: catálogos `REACTION_PHRASES_QUALIFICATION` / `REACTION_PHRASES_DIAGNOSIS`, estado `reactions: string[]`, props nuevas en `EngagementGate` (chips toggle), incluir `reactions` en el body de `runGeneration`, persistir/leer en `guide_fields`.
- `sales-diagnosis/index.ts`: leer `reactions` (validado), añadir bloque "FRASES TEXTUALES DE LA PERSONA" al prompt.

---

## Parte 2 — Fase "Contrato" (paso 4): generar el contrato real

Tras la Solución, una nueva pantalla recoge los **datos del firmante** y genera el **PDF del contrato** con los datos del caso.

- Formulario compacto: nombre completo, DNI/NIE, domicilio, email, teléfono, servicio contratado (autorrellenado desde el triaje: LSO / reunificación / reclamación) y honorarios.
- Botón **"Generar contrato (PDF)"**: produce un PDF de prestación de servicios profesionales con los datos rellenados, membrete de Calma y los datos del cliente/servicio. Se descarga y queda disponible para adjuntar al email/WhatsApp.
- Botón **"Mensaje de envío"**: la IA genera un texto breve y cálido (email/WhatsApp) para acompañar el contrato y empujar a la firma, adaptado al engagement y a las frases marcadas.

**Técnico:**
- Generación del PDF en cliente con `jsPDF` (añadir dependencia). Plantilla en un helper nuevo (p. ej. `src/lib/contratoPdf.ts`) con texto legal genérico de contrato de prestación de servicios + huecos de datos. El texto será una plantilla base editable; **no constituye asesoría legal definitiva** y debe revisarse antes de uso real (lo señalo en pantalla).
- Estado nuevo `contract: { fullName, dni, address, email, phone, service, fee }` persistido en `guide_fields`.
- El "Mensaje de envío" reutiliza la función `sales-diagnosis` con un nuevo `phase: "contract_message"` (o equivalente) que devuelve un texto plano.

---

## Parte 3 — Fase "Firma" (paso 5): guion de cierre de firma

Última pantalla: la IA genera el **guion de cierre para conseguir la firma online** en la propia llamada.

- Tarjetas tipo `ScriptCard[]` (guion interno): cómo guiar paso a paso a firmar, resolver objeciones de último momento ("me lo pienso", "lo consulto con mi pareja"), crear urgencia sana y confirmar.
- Pestaña "Mensaje al cliente": instrucciones claras y simples para que firme en línea.
- **Selector de estado de la firma** (registro manual): `Enviado` / `Pendiente de firma` / `Firmado` / `Rechazado`, guardado en el caso para seguimiento.

> La firma electrónica real (integración con proveedor tipo Signaturit/DocuSign) queda **fuera de alcance** por ahora: no hay proveedor definido. Si más adelante se quiere, se añade como mejora con sus claves API.

**Técnico:**
- `sales-diagnosis/index.ts`: soportar `phase: "signing"` que devuelve `signing_internal: ScriptCard[]` + `signing_client: string`.
- `AdminVentas.tsx`: ampliar `AiResult`, `STEPS` (añadir "Contrato" y "Firma"), el stepper, `EngagementGate` previo a la firma, y `saveCase`/`openCase` para persistir `contract` y `signatureStatus`.

---

## Fuera de alcance
- No se cambia la lógica de triaje (LSO / reunificar / reclamar) ni el score 0–3.
- No se integra firma electrónica real ni envío automático de emails (el comercial adjunta el PDF y envía el mensaje generado).
- No se crean tablas nuevas: todo se guarda en el JSONB `guide_fields` del caso existente.

## Verificación
- Recorrer el flujo completo con el "Caso de prueba" hasta generar el PDF y el guion de firma.
- Comprobar build y que el PDF abre correctamente con los datos rellenados.