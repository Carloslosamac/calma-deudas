# Automatizar la indexación: lo que se puede y lo que no

## La realidad, por buscador (sin humo)

**Google — NO se puede automatizar la "solicitud de indexación":**
- La **Indexing API** de Google existe, pero **solo** está permitida para páginas de tipo `JobPosting` (ofertas de empleo) y `BroadcastEvent` (directos de vídeo). Usarla para páginas normales **incumple las políticas de Google**: los envíos se ignoran y puede acarrear penalización. No es un atajo válido para tu web.
- El antiguo "ping de sitemap" a Google fue **deprecado en 2023**.
- Para Google, la única automatización legítima es: **sitemap siempre actualizado + buen enlazado interno** (ambos ya hechos). El "Solicitar indexación" página a página sigue siendo **manual** y limitado (~10-15/día). No hay forma legal de saltarse eso.

**Bing, Yandex, Seznam, Naver — SÍ se puede, vía IndexNow:**
- IndexNow es un protocolo abierto para **enviar URLs nuevas/actualizadas al instante** y que las rastreen en horas, no semanas. Es totalmente legítimo y automatizable.
- No lo usa Google, pero **Bing alimenta a ChatGPT, Copilot y otros buscadores/IA**, así que para tu estrategia GEO/AEO tiene valor real.
- Encaja perfecto con tu generación diaria de posts: cada post nuevo se puede enviar automáticamente.

## Plan propuesto

### 1. Implementar IndexNow (automatización real para Bing y cía.)
- Generar una clave IndexNow y publicar el fichero de verificación en `public/<clave>.txt`.
- Crear una edge function `indexnow-submit` que reciba un lote de URLs y las envíe a `https://api.indexnow.org/indexnow` con la clave (con validación de entrada y CORS).

### 2. Disparadores automáticos
- **Tras generar posts diarios**: enganchar `generate-daily-posts` (y `generate-daily-casos`) para que, al crear contenido nuevo, llamen a `indexnow-submit` con las URLs recién creadas.
- **Reenvío completo bajo demanda**: un endpoint que envíe todo el sitemap a IndexNow (útil tras cada publicación grande).

### 3. Google: mantener el canal automático que sí funciona
- El sitemap ya se regenera en cada build (`predev`/`prebuild`) y el footer rastreable ya está. Eso es la "automatización" válida para Google.
- Para empujar las money pages prioritarias, la solicitud manual en Search Console sigue siendo necesaria (te dejo la lista de 10 URLs).
- Opcional: tras publicar, reenvío automático del sitemap a Search Console vía API (solo fuerza la **relectura**, no la indexación).

## Expectativa
- Bing/IndexNow: indexación de URLs nuevas en **horas a pocos días**, automática.
- Google: días-semanas para el grueso (sitemap + enlazado) + las prioritarias aceleradas a mano.

---

### Detalles técnicos
- Nuevos archivos: `supabase/functions/indexnow-submit/index.ts`, `public/<clave>.txt`.
- Edits: `supabase/functions/generate-daily-posts/index.ts` y `generate-daily-casos/index.ts` para invocar IndexNow tras insertar contenido.
- La clave IndexNow es pública por diseño (se publica en el dominio), no es un secreto sensible.
- Sin cambios de lógica de negocio ni de UI.
