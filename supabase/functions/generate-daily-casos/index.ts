import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

// Avisa a IndexNow (Bing/Yandex/etc.) de las URLs nuevas. Fire-and-forget.
async function notifyIndexNow(slugs: string[]): Promise<void> {
  if (!slugs.length) return;
  try {
    const urls = slugs.map((s) => `/casos-de-exito/${s}`);
    await fetch(`${SUPABASE_URL}/functions/v1/indexnow-submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({ urls }),
    });
  } catch (e) {
    console.error("notifyIndexNow (casos) error:", String(e));
  }
}

// Categorías de caso y su solución típica. La mitad de los casos deben ser LSO.
const LSO_CATEGORY = "Ley de Segunda Oportunidad";
const OTHER_CATEGORIES = [
  "Tarjetas revolving",
  "Microcréditos",
  "Embargos",
  "ASNEF",
  "Deudas con Hacienda",
  "Reunificación de deudas",
];

const CITIES = [
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia",
  "Bilbao", "Alicante", "Valladolid", "Vigo", "Gijón", "Granada", "Córdoba",
  "Santander", "Pamplona", "Logroño", "Albacete", "Badajoz", "Tarragona",
  "Castellón", "Almería", "Salamanca", "Huelva", "León", "Cádiz", "Lugo",
  "Ourense", "Jaén", "Lleida", "Girona", "Cáceres", "Burgos", "Toledo",
];

const FIRST_NAMES = [
  "Marta", "Javier", "Lucía", "Andrés", "Sara", "Carlos", "Elena", "Diego",
  "Raquel", "Pablo", "Nuria", "Sergio", "Ana", "Iván", "Cristina", "Rubén",
  "Patricia", "Hugo", "Marina", "Daniel", "Noelia", "Adrián", "Beatriz",
  "Óscar", "Silvia", "Gonzalo", "Verónica", "Manuel", "Pilar", "Antonio",
];

const SURNAME_INITIALS = "ABCDFGLMNPRSTV".split("");

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

interface CasoSeed {
  category: string;
  name: string;
  location: string;
}

function buildSeed(forceLso: boolean): CasoSeed {
  const category = forceLso ? LSO_CATEGORY : pick(OTHER_CATEGORIES);
  const name = `${pick(FIRST_NAMES)} ${pick(SURNAME_INITIALS)}.`;
  const location = pick(CITIES);
  return { category, name, location };
}

const SYSTEM_PROMPT = `Eres redactor de Calma (antes "Adiós Deudas"), una firma española de abogados especializada en insolvencia, segunda oportunidad y derecho bancario. Escribes "casos de éxito" en estilo reportaje humano, en español de España, sobre personas reales anonimizadas que resolvieron sus deudas con Calma.

REGLAS EDITORIALES INNEGOCIABLES:
- El caso es ILUSTRATIVO y representativo del tipo de resultados que Calma consigue; mantén nombre (solo nombre de pila + inicial), ciudad e importe que se te indican.
- NUNCA inventes estadísticas globales de Calma (número de casos totales, porcentajes de éxito, dinero total cancelado por la firma). El único importe que puedes citar es el del caso concreto.
- Triage de soluciones: LSO (Ley de Segunda Oportunidad) = persona insolvente SIN bienes pagados de valor; reunificar = insolvente CON bienes de valor pagados; reclamación judicial = persona solvente + usura + deuda baja.
- Reunificar = negociación extrajudicial que baja la cuota Y el total adeudado, SIN préstamo nuevo. NUNCA lo describas como agrupar, pedir un préstamo, hipotecar o alargar el plazo.
- Tono empático, cercano y honesto. Cero promesas garantizadas. El CTA invita a la valoración gratuita.

FORMATO DE SALIDA: devuelve ÚNICAMENTE JSON válido (sin markdown) con esta forma exacta:
{
  "debtAmount": "importe cancelado/resuelto formateado, p.ej. '32.450 €'",
  "solution": "solución legal aplicada en una línea",
  "headline": "titular tipo noticia < 70 caracteres, con la ciudad y el importe",
  "dek": "entradilla/dek de 1-2 frases",
  "readTime": "p.ej. '6 min'",
  "heroAlt": "texto alternativo descriptivo de una foto de la persona",
  "seoTitle": "título SEO < 60 caracteres, con gancho, SIN marca",
  "metaDescription": "meta descripción < 160 caracteres, persuasiva",
  "keywords": ["5-8 keywords"],
  "sections": [{ "id": "slug-seccion", "title": "Título H2", "html": "<p>...</p> párrafos y listas. HTML semántico, sin estilos inline." }],
  "faq": [{ "question": "Pregunta", "answer": "Respuesta de 2-4 frases" }]
}
Genera 4-6 secciones (punto de quiebre, qué debía, qué solución aplicamos y por qué, cómo fue el proceso, vida después) y 3-4 FAQ.`;

async function generateCaso(seed: CasoSeed): Promise<Record<string, unknown> | null> {
  const userPrompt = `Redacta un caso de éxito real anonimizado de Calma con estos datos fijos:
- Persona: ${seed.name}
- Ciudad: ${seed.location}
- Tipo de caso / categoría: ${seed.category}

Elige un importe de deuda realista y coherente con la categoría (no exagerado) y la solución legal adecuada según el triage. Escribe el reportaje completo.`;

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
    console.error(`AI error ${res.status}: ${await res.text()}`);
    return null;
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (_e) {
    console.error("JSON parse failed for caso");
    return null;
  }
}

async function uniqueSlug(supabase: ReturnType<typeof createClient>, base: string): Promise<string> {
  let slug = base;
  for (let i = 0; i < 6; i++) {
    const { data } = await supabase.from("generated_casos").select("slug").eq("slug", slug).maybeSingle();
    if (!data) return slug;
    slug = `${base}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  return `${base}-${Date.now()}`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Auth gate: cron/trusted scheduler con anon key pasa; un JWT real debe ser admin.
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

  let runSource = "cron-casos";
  try {
    const parsed = await req.clone().json();
    if (parsed?.source) runSource = String(parsed.source);
  } catch (_e) {
    // no body
  }

  const { data: runRow } = await supabase
    .from("generator_runs")
    .insert({ status: "running", source: runSource })
    .select("id")
    .single();
  const runId = runRow?.id as string | undefined;

  try {
    // 1 o 2 casos por ejecución (sesgo a 1).
    const target = Math.random() < 0.6 ? 1 : 2;
    // ~50% LSO: para 2, uno LSO y uno mix; para 1, 50/50.
    const lsoFlags = target === 2 ? [true, Math.random() < 0.5] : [Math.random() < 0.5];

    const published: string[] = [];
    let failed = 0;

    for (const forceLso of lsoFlags) {
      const seed = buildSeed(forceLso);
      const article = await generateCaso(seed);
      if (!article) {
        failed++;
        continue;
      }

      const headline = (article.headline as string) ?? `${seed.name} resuelve sus deudas en ${seed.location}`;
      const base = slugify(`${seed.name.replace(/\.$/, "")}-${seed.location}-${(article.debtAmount as string) ?? ""}`);
      const slug = await uniqueSlug(supabase, base || slugify(headline));
      const now = new Date().toISOString();

      const { error: insErr } = await supabase.from("generated_casos").insert({
        slug,
        category: seed.category,
        name: seed.name,
        location: seed.location,
        debt_amount: (article.debtAmount as string) ?? "—",
        solution: (article.solution as string) ?? seed.category,
        headline,
        dek: (article.dek as string) ?? "",
        read_time: (article.readTime as string) ?? "6 min",
        hero_alt: (article.heroAlt as string) ?? headline,
        sections: article.sections ?? [],
        faq: article.faq ?? [],
        keywords: article.keywords ?? [],
        seo_title: (article.seoTitle as string) ?? null,
        meta_description: (article.metaDescription as string) ?? null,
        status: "published",
        published_at: now,
      });

      if (insErr) {
        console.error(`Insert caso failed: ${insErr.message}`);
        failed++;
        continue;
      }
      published.push(slug);
    }

    if (runId) {
      await supabase
        .from("generator_runs")
        .update({
          status: failed && published.length === 0 ? "failed" : "success",
          finished_at: new Date().toISOString(),
          target,
          published_count: published.length,
          failed_count: failed,
          error: failed ? `Fallaron ${failed} casos` : null,
        })
        .eq("id", runId);
    }

    return new Response(
      JSON.stringify({ ok: true, target, published: published.length, slugs: published, failed }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("generate-daily-casos error:", e);
    if (runId) {
      await supabase
        .from("generator_runs")
        .update({ status: "failed", finished_at: new Date().toISOString(), error: String(e) })
        .eq("id", runId);
    }
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});