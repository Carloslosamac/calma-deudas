import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const AGE_BANDS = ["unos 28 años", "unos 34 años", "unos 41 años", "unos 47 años", "unos 55 años", "unos 62 años"];
const GENDERS = ["mujer", "hombre"];
const ETHNIC_LOOKS = [
  "rasgos mediterráneos españoles",
  "rasgos latinoamericanos",
  "rasgos del norte de España",
  "rasgos morenos del sur de España",
  "rasgos magrebíes",
];
const SETTINGS = [
  "sentada/o en la mesa de la cocina de su casa, luz de tarde entrando por la ventana",
  "de pie en el salón de casa, decoración modesta y cálida",
  "en un banco de un parque público urbano, hojas otoñales",
  "caminando por una calle peatonal de su ciudad al atardecer",
  "en un bar de barrio tomando un café, luz cálida",
  "sentada/o en un escritorio pequeño con papeles y un portátil viejo",
  "en la entrada de un edificio de viviendas antiguo",
  "apoyada/o en la barandilla de un balcón con vistas a tejados",
  "en el asiento del conductor de un coche familiar aparcado",
  "en la sala de espera de una gestoría, luz natural",
];
const EXPRESSIONS = [
  "expresión serena, mirada al frente",
  "sonrisa suave y cansada",
  "expresión pensativa, mirada baja",
  "expresión de alivio, ligera sonrisa",
  "mirada directa a cámara, expresión digna",
  "expresión reflexiva, media sonrisa",
];

function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}
function pickBy<T>(arr: T[], seed: number, salt: number): T {
  return arr[(seed + salt) % arr.length];
}

async function optimizeImage(pngBytes: Uint8Array): Promise<Uint8Array | null> {
  try {
    const img = await Image.decode(pngBytes);
    if (img.width > 1200) img.resize(1200, Image.RESIZE_AUTO);
    return await img.encodeJPEG(82);
  } catch {
    return null;
  }
}

async function generateHero(slug: string, location: string): Promise<Uint8Array | null> {
  const h = hashSeed(slug);
  const age = pickBy(AGE_BANDS, h, 0);
  const gender = pickBy(GENDERS, h, 1);
  const looks = pickBy(ETHNIC_LOOKS, h, 2);
  const setting = pickBy(SETTINGS, h, 3);
  const expression = pickBy(EXPRESSIONS, h, 4);
  const prompt =
    `Retrato editorial hiperrealista tipo fotoperiodismo español premium. Persona anónima: ${gender} de ${age}, ${looks}, ${expression}. Escena: ${setting}. Ambiente: ciudadano medio en ${location}, España, clase trabajadora, ropa cotidiana realista (nada de traje o glamour). Rostro y postura ÚNICOS, específicos, NO stock genérico, NO caras de banco de imágenes. Luz natural, grano fotográfico sutil, profundidad de campo, encuadre cinematográfico horizontal. SIN texto, SIN logos, SIN marcas de agua, SIN collage, SIN carteles. Absolutamente prohibido dibujo, render 3D, ilustración, anime o estética artificial. Fotografía real, documental, humana.`;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image-preview",
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    }),
  });
  if (!res.ok) {
    console.error(`Image AI error ${res.status}: ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  const dataUrl: string | undefined = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
  if (!dataUrl?.includes(",")) return null;
  return Uint8Array.from(atob(dataUrl.split(",")[1]), (c) => c.charCodeAt(0));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Auth: admin JWT o anon (para invocación desde herramienta interna).
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (token && token !== Deno.env.get("SUPABASE_ANON_KEY")) {
    const { data: userData } = await supabase.auth.getUser(token);
    if (userData?.user) {
      const { data: roleRow } = await supabase
        .from("user_roles").select("role").eq("user_id", userData.user.id).eq("role", "admin").maybeSingle();
      if (!roleRow) {
        return new Response(JSON.stringify({ ok: false, error: "Solo administradores" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
  }

  let limit = 5;
  try { const b = await req.clone().json(); if (typeof b?.limit === "number") limit = Math.max(1, Math.min(15, b.limit)); } catch (_e) { /* ignore */ }

  const { data: rows, error } = await supabase
    .from("generated_casos")
    .select("slug,location")
    .eq("status", "published")
    .is("hero_image", null)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const started = Date.now();
  const done: string[] = [];
  const failed: string[] = [];
  for (const row of rows ?? []) {
    if (Date.now() - started > 120_000) break;
    const raw = await generateHero(row.slug as string, row.location as string);
    if (!raw) { failed.push(row.slug as string); continue; }
    const optimized = await optimizeImage(raw);
    const isJpeg = optimized !== null;
    const bytes = optimized ?? raw;
    const path = `casos/${row.slug}.${isJpeg ? "jpg" : "png"}`;
    const { error: upErr } = await supabase.storage.from("blog-images").upload(path, bytes, {
      contentType: isJpeg ? "image/jpeg" : "image/png", upsert: true, cacheControl: "31536000",
    });
    if (upErr) { failed.push(row.slug as string); continue; }
    const { data: signed } = await supabase.storage.from("blog-images").createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    const url = signed?.signedUrl ?? null;
    if (!url) { failed.push(row.slug as string); continue; }
    const { error: updErr } = await supabase.from("generated_casos").update({ hero_image: url }).eq("slug", row.slug);
    if (updErr) { failed.push(row.slug as string); continue; }
    done.push(row.slug as string);
  }

  const { count: remaining } = await supabase
    .from("generated_casos").select("*", { count: "exact", head: true })
    .eq("status", "published").is("hero_image", null);

  return new Response(JSON.stringify({ ok: true, done, failed, remaining }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});