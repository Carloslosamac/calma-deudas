import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// IndexNow: envío instantáneo de URLs a Bing, Yandex, Seznam, Naver y otros
// motores compatibles (NO Google). Permite que rastreen URLs nuevas/actualizadas
// en horas en lugar de semanas. La clave es pública por diseño: se verifica
// contra https://mi-calma.es/<KEY>.txt
const HOST = "mi-calma.es";
const KEY = "bcaea9ccc48b727f321e61b3569b63be";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10000; // límite del protocolo IndexNow por petición

function normalizeUrls(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const out: string[] = [];
  for (const raw of input) {
    if (typeof raw !== "string") continue;
    let u = raw.trim();
    if (!u) continue;
    // Acepta rutas relativas ("/blog/x") o absolutas en el dominio correcto.
    if (u.startsWith("/")) u = `https://${HOST}${u}`;
    try {
      const parsed = new URL(u);
      if (parsed.hostname !== HOST) continue; // IndexNow exige mismo host que la clave
      out.push(parsed.toString());
    } catch (_e) {
      // URL inválida: se ignora
    }
  }
  // Únicas y dentro del límite
  return [...new Set(out)].slice(0, MAX_URLS);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let body: Record<string, unknown> = {};
    try {
      body = await req.json();
    } catch (_e) {
      // sin body válido
    }

    const urlList = normalizeUrls(body.urls);
    if (urlList.length === 0) {
      return new Response(
        JSON.stringify({ ok: false, error: "Falta 'urls' (array de URLs del dominio mi-calma.es)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    };

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    // IndexNow devuelve 200/202 en éxito. 422 = alguna URL no válida; 403 = clave no encontrada.
    const ok = res.status === 200 || res.status === 202;
    if (!ok) {
      console.error(`IndexNow respondió ${res.status}: ${text}`);
    }

    return new Response(
      JSON.stringify({ ok, status: res.status, submitted: urlList.length, response: text }),
      { status: ok ? 200 : 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("indexnow-submit error:", e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
