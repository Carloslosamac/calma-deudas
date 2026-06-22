import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const AUTHOR_IDS = [
  "marta-belmonte",
  "javier-ferrer",
  "lucia-ordonez",
  "andres-solis",
  "sara-belda",
  "carlos-rivas",
];

const CATEGORIES = [
  "Microcréditos",
  "Tarjetas revolving",
  "Embargos",
  "Segunda oportunidad",
  "Hipotecas",
  "Juicio monitorio",
  "Autónomos",
  "Deudas públicas",
  "ASNEF",
  "Finanzas familiares",
  "Reunificación",
  "Consejos",
];

// Media 5, rango 3-7. Distribución sesgada hacia 5 para parecer humano.
const DAILY_DISTRIBUTION = [3, 4, 4, 5, 5, 5, 5, 6, 6, 7];

function pickDailyCount(): number {
  return DAILY_DISTRIBUTION[Math.floor(Math.random() * DAILY_DISTRIBUTION.length)];
}

function pickAuthors(): string[] {
  const shuffled = [...AUTHOR_IDS].sort(() => Math.random() - 0.5);
  const n = 1 + Math.floor(Math.random() * 2); // 1-2 firmantes
  return shuffled.slice(0, n);
}

function slugFromUrl(url: string | null, titulo: string): string {
  if (url) {
    const parts = url.split("/").filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// El roadmap se importó scrapeando SERPs, así que muchos títulos arrastran el
// sufijo de marca del competidor de origen. Nunca debe aparecer en NUESTRO blog.
function sanitizeTitle(raw: string): string {
  let t = (raw ?? "").trim();
  const brandSuffix =
    /\s*[-–—|·:]\s*(MiSolvencia(\.es)?|Abogados\s+para\s+tus\s+deudas|Repara\s+tu\s+Deuda|Quita\s+Deudas|Deudae|MundoJur[ií]dico|MundoJuridico)\s*$/i;
  // Aplica dos veces por si hay sufijos encadenados.
  t = t.replace(brandSuffix, "").replace(brandSuffix, "").trim();
  return t;
}

interface RoadmapRow {
  id: number;
  titulo: string;
  cluster: string | null;
  intencion: string | null;
  tipo_pagina: string | null;
  prioridad: string | null;
  url_sugerida: string | null;
  entidad: string | null;
  keywords: string[] | null;
}

const SYSTEM_PROMPT = `Eres redactor jurídico SEO sénior de Calma (antes "Adiós Deudas"), una firma española de abogados especializada en insolvencia, segunda oportunidad y derecho bancario. Escribes artículos de blog largos, rigurosos y en español de España.

REGLAS EDITORIALES INNEGOCIABLES:
- NUNCA inventes ni infles cifras, estadísticas, número de casos o porcentajes de Calma. Si no tienes un dato verificable, no lo cites.
- Contenido long-form y útil: explica con profundidad, sin relleno.
- Triage de soluciones: LSO (Ley de Segunda Oportunidad) = persona insolvente SIN bienes pagados de valor; reunificar = insolvente CON bienes de valor pagados (una casa/terreno pagado bloquea la LSO en la práctica); reclamación judicial = persona solvente + usura + deuda baja.
- Reunificar = negociación extrajudicial que baja la cuota Y el total adeudado, SIN préstamo nuevo. NUNCA lo describas como agrupar, pedir un préstamo, hipotecar o alargar el plazo (eso es refinanciar, que es lo contrario).
- Tono empático, claro, sin tecnicismos innecesarios. Cero promesas garantizadas.
- Todo CTA invita a la valoración gratuita; el botón lleva al formulario (#hero-form).

FORMATO DE SALIDA: devuelve ÚNICAMENTE JSON válido (sin markdown, sin comentarios) con esta forma exacta:
{
  "category": "una de las categorías permitidas",
  "seoTitle": "título SEO < 60 caracteres, con gancho diferenciador, SIN marca/«| Calma»",
  "metaDescription": "meta descripción < 160 caracteres, persuasiva para CTR",
  "excerpt": "entradilla de 1-2 frases",
  "readTime": "p.ej. '7 min'",
  "heroAlt": "texto alternativo descriptivo de la imagen",
  "tldr": "respuesta directa de 2-3 frases que resume la solución a la pregunta del título (answer-first para motores de IA)",
  "keyTakeaways": ["4-6 puntos clave concretos y accionables"],
  "keywords": ["6-10 keywords/temas tratados"],
  "sections": [{ "id": "slug-seccion", "title": "Título H2", "html": "<p>...</p> párrafos, <ul>/<ol>, <h3>, <blockquote>. HTML semántico, sin estilos inline." }],
  "faq": [{ "question": "Pregunta frecuente", "answer": "Respuesta clara de 2-4 frases" }],
  "sidebar": { "ctaTitle": "...", "ctaDescription": "...", "ctaLabel": "...", "benefits": ["3-4 beneficios"] }
}
Genera 5-8 secciones y 4-6 FAQ. El campo tldr y keyTakeaways son obligatorios.`;

async function generateArticle(row: RoadmapRow): Promise<Record<string, unknown> | null> {
  const userPrompt = `Redacta el artículo de blog para esta entrada del masterplan SEO:
- Título objetivo: ${row.titulo}
- Cluster temático: ${row.cluster ?? "—"}
- Intención de búsqueda: ${row.intencion ?? "—"}
- Tipo de página: ${row.tipo_pagina ?? "—"}
- Entidad relacionada: ${row.entidad || "—"}
- Keywords sugeridas: ${(row.keywords ?? []).join(", ") || "—"}

Categorías permitidas (elige la más adecuada): ${CATEGORIES.join(", ")}.
Optimiza para GEO/AEO: el tldr debe responder directamente la pregunta del título en las primeras frases.`;

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`AI error ${res.status} for roadmap ${row.id}: ${body}`);
    return null;
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (_e) {
    console.error(`JSON parse failed for roadmap ${row.id}`);
    return null;
  }
}

// Genera una imagen de portada ÚNICA por artículo (estilo fotoperiodístico
// hiperrealista) y la sube al bucket público blog-images. Devuelve la URL
// pública o null si algo falla (en cuyo caso se usa el fallback por categoría).
async function generateAndUploadHero(
  supabase: ReturnType<typeof createClient>,
  slug: string,
  title: string,
  category: string,
): Promise<string | null> {
  try {
    const prompt = `Fotografía editorial hiperrealista, estilo fotoperiodismo premium, para un artículo sobre "${title}" (tema: ${category}, finanzas personales y deudas en España). Luz natural realista, composición cinematográfica, sin texto, sin logos, sin marcas de agua, sin collage. Escena humana o documental concreta y evocadora, no genérica.`;
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [{ role: "user", content: prompt }],
        modalities: ["image", "text"],
      }),
    });
    if (!res.ok) {
      console.error(`Image AI error ${res.status} for ${slug}: ${await res.text()}`);
      return null;
    }
    const data = await res.json();
    const dataUrl: string | undefined =
      data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!dataUrl || !dataUrl.includes(",")) {
      console.error(`No image returned for ${slug}`);
      return null;
    }
    const base64 = dataUrl.split(",")[1];
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const path = `${slug}.png`;
    const { error: upErr } = await supabase.storage
      .from("blog-images")
      .upload(path, bytes, { contentType: "image/png", upsert: true });
    if (upErr) {
      console.error(`Upload failed for ${slug}: ${upErr.message}`);
      return null;
    }
    const { data: signed } = await supabase.storage
      .from("blog-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10); // 10 años
    return signed?.signedUrl ?? null;
  } catch (e) {
    console.error(`generateAndUploadHero error for ${slug}: ${String(e)}`);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Auth gate: cron calls without a user token are allowed (trusted scheduler).
  // Any call carrying a real user JWT must belong to an admin.
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (token && token !== Deno.env.get("SUPABASE_ANON_KEY")) {
    const { data: userData } = await supabase.auth.getUser(token);
    const user = userData?.user;
    if (user) {
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleRow) {
        return new Response(JSON.stringify({ ok: false, error: "Solo administradores" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }
  }

  // Determine the call source for the run log.
  let runSource = "cron";
  try {
    const cloned = req.clone();
    const parsed = await cloned.json();
    if (parsed?.source) runSource = String(parsed.source);
  } catch (_e) {
    // no body / not JSON — keep default
  }

  // Open a run record so the health dashboard can track every execution.
  const { data: runRow } = await supabase
    .from("generator_runs")
    .insert({ status: "running", source: runSource })
    .select("id")
    .single();
  const runId = runRow?.id as string | undefined;

  try {
    const target = pickDailyCount();

    const { data: rows, error: selErr } = await supabase
      .from("seo_roadmap")
      .select("id,titulo,cluster,intencion,tipo_pagina,prioridad,url_sugerida,entidad,keywords")
      .eq("estado", "en_cola")
      .order("prioridad", { ascending: true }) // Alta < Baja < Media alfabéticamente, reordenamos abajo
      .order("id", { ascending: true })
      .limit(60);

    if (selErr) throw selErr;
    if (!rows || rows.length === 0) {
      if (runId) {
        await supabase
          .from("generator_runs")
          .update({
            status: "success",
            finished_at: new Date().toISOString(),
            target,
            published_count: 0,
            failed_count: 0,
          })
          .eq("id", runId);
      }
      return new Response(JSON.stringify({ ok: true, published: 0, reason: "cola vacía" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Prioridad: Alta > Media > Baja
    const rank: Record<string, number> = { Alta: 0, Media: 1, Baja: 2 };
    const ordered = (rows as RoadmapRow[]).sort(
      (a, b) => (rank[a.prioridad ?? "Baja"] ?? 2) - (rank[b.prioridad ?? "Baja"] ?? 2) || a.id - b.id,
    );
    const batch = ordered.slice(0, target);

    const published: string[] = [];
    const failed: number[] = [];

    for (const row of batch) {
      const article = await generateArticle(row);
      if (!article) {
        failed.push(row.id);
        continue;
      }

      const category = CATEGORIES.includes(article.category as string)
        ? (article.category as string)
        : "Consejos";
      const slug = slugFromUrl(row.url_sugerida, row.titulo);
      const now = new Date().toISOString();
      const cleanTitle = sanitizeTitle(row.titulo);
      const cleanSeoTitle = sanitizeTitle((article.seoTitle as string) ?? row.titulo);
      const heroUrl = await generateAndUploadHero(supabase, slug, cleanTitle, category);

      const { error: insErr } = await supabase.from("generated_posts").insert({
        slug,
        category,
        title: cleanTitle,
        excerpt: (article.excerpt as string) ?? "",
        read_time: (article.readTime as string) ?? "7 min",
        authors: pickAuthors(),
        hero_image: heroUrl,
        hero_alt: (article.heroAlt as string) ?? cleanTitle,
        sections: article.sections ?? [],
        faq: article.faq ?? [],
        keywords: article.keywords ?? [],
        seo_title: cleanSeoTitle,
        meta_description: (article.metaDescription as string) ?? "",
        tldr: (article.tldr as string) ?? null,
        key_takeaways: article.keyTakeaways ?? [],
        sidebar: article.sidebar ?? null,
        roadmap_id: row.id,
        status: "published",
        published_at: now,
      });

      if (insErr) {
        console.error(`Insert failed for roadmap ${row.id}: ${insErr.message}`);
        failed.push(row.id);
        continue;
      }

      await supabase
        .from("seo_roadmap")
        .update({ estado: "publicado", post_slug: slug })
        .eq("id", row.id);

      published.push(slug);
    }

    if (runId) {
      await supabase
        .from("generator_runs")
        .update({
          status: failed.length && published.length === 0 ? "failed" : "success",
          finished_at: new Date().toISOString(),
          target,
          published_count: published.length,
          failed_count: failed.length,
          error: failed.length ? `Fallaron roadmap ids: ${failed.join(", ")}` : null,
        })
        .eq("id", runId);
    }

    return new Response(
      JSON.stringify({ ok: true, target, published: published.length, slugs: published, failed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("generate-daily-posts error:", e);
    if (runId) {
      await supabase
        .from("generator_runs")
        .update({
          status: "failed",
          finished_at: new Date().toISOString(),
          error: String(e),
        })
        .eq("id", runId);
    }
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});