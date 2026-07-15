import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

const SYSTEM_PROMPT = `Eres redactor de Calma (antes "Adiós Deudas"), una firma española de abogados especializada en insolvencia, segunda oportunidad y derecho bancario. Escribes "casos de éxito" en estilo reportaje humano, en español de España, sobre personas reales anonimizadas que resolvieron sus deudas con Calma.

REGLAS EDITORIALES INNEGOCIABLES:
- El caso es ILUSTRATIVO y representativo del tipo de resultados que Calma consigue; mantén nombre (solo nombre de pila + inicial), ciudad e importe que se te indican.
- NUNCA inventes estadísticas globales de Calma. El único importe que puedes citar es el del caso concreto.
- Triage de soluciones: LSO (Ley de Segunda Oportunidad) = insolvente SIN bienes pagados de valor; reunificar = insolvente CON bienes de valor pagados; reclamación judicial = solvente + usura + deuda baja.
- Reunificar = negociación extrajudicial que baja la cuota Y el total adeudado, SIN préstamo nuevo. NUNCA agrupar/hipotecar/alargar plazo.
- Tono empático, cercano y honesto. Cero promesas garantizadas.

REGLAS DE TITULARES:
- Headline: escena/síntoma + ':' + desenlace. 60–95 chars. Sin marca, sin emojis, sin fórmulas "Nombre de Ciudad cancela X €".
- seoTitle: < 60 chars, con gancho, SIN marca, distinto del headline.

FORMATO DE SALIDA: JSON válido sin markdown:
{
  "debtAmount": "ETIQUETA badge coherente con categoría (LSO → 'X € cancelados'; Revolving → 'X € recuperados'; Reunificación → 'Cuota -N%' o 'X €/mes menos'; ASNEF → 'Fuera de ASNEF'; Hacienda → 'Apremio parado'; Embargo → 'Nómina liberada'). Máx 24 chars.",
  "solution": "solución legal en una línea",
  "headline": "titular reportaje 60–95 chars",
  "dek": "entradilla 1-2 frases",
  "readTime": "p.ej. '6 min'",
  "heroAlt": "alt descriptivo de la foto",
  "seoTitle": "< 60 chars con gancho",
  "metaDescription": "< 160 chars persuasiva",
  "keywords": ["5-8 keywords"],
  "sections": [{ "id": "slug-seccion", "title": "H2", "html": "<p>...</p>" }],
  "faq": [{ "question": "...", "answer": "..." }]
}
Genera 4-6 secciones (punto de quiebre, qué debía, qué solución aplicamos y por qué, cómo fue el proceso, vida después) y 3-4 FAQ.`;

interface Item {
  name: string;
  location: string;
  category: string;
  storagePath: string; // e.g. "casos/sergio-f-toledo-real.png"
  slugPrefix: string;  // e.g. "sergio-f-toledo"
}

async function generateCaso(item: Item): Promise<Record<string, unknown> | null> {
  const userPrompt = `Redacta un caso de éxito real anonimizado de Calma con estos datos fijos:
- Persona: ${item.name}
- Ciudad: ${item.location}
- Tipo de caso / categoría: ${item.category}

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
  } catch {
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE);

  let items: Item[] = [];
  try {
    const body = await req.json();
    items = body?.items ?? [];
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Body inválido" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return new Response(JSON.stringify({ ok: false, error: "items vacío" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  async function processOne(item: Item): Promise<{ slug?: string; error?: string; name: string }> {
    try {
      const article = await generateCaso(item);
      if (!article) return { name: item.name, error: "AI generation failed" };

      const headline = (article.headline as string) ?? `${item.name} resuelve sus deudas en ${item.location}`;
      const debtAmount = (article.debtAmount as string) ?? "—";
      const base = slugify(`${item.slugPrefix}-${debtAmount}`);
      let slug = base;
      for (let i = 0; i < 6; i++) {
        const { data: existing } = await supabase
          .from("generated_casos")
          .select("slug")
          .eq("slug", slug)
          .maybeSingle();
        if (!existing) break;
        slug = `${base}-${Math.floor(1000 + Math.random() * 9000)}`;
      }

      const { data: signed } = await supabase.storage
        .from("blog-images")
        .createSignedUrl(item.storagePath, 60 * 60 * 24 * 365 * 10);

      if (!signed?.signedUrl) return { name: item.name, error: `No se pudo firmar ${item.storagePath}` };

      const { error: insErr } = await supabase.from("generated_casos").insert({
        slug,
        category: item.category,
        name: item.name,
        location: item.location,
        debt_amount: debtAmount,
        solution: (article.solution as string) ?? item.category,
        headline,
        dek: (article.dek as string) ?? "",
        read_time: (article.readTime as string) ?? "6 min",
        hero_alt: (article.heroAlt as string) ?? headline,
        hero_image: signed.signedUrl,
        sections: article.sections ?? [],
        faq: article.faq ?? [],
        keywords: article.keywords ?? [],
        seo_title: (article.seoTitle as string) ?? null,
        meta_description: (article.metaDescription as string) ?? null,
        status: "draft",
        published_at: null,
      });

      if (insErr) return { name: item.name, error: `Insert: ${insErr.message}` };
      return { name: item.name, slug };
    } catch (e) {
      return { name: item.name, error: String(e) };
    }
  }

  const results = await Promise.all(items.map(processOne));

  return new Response(JSON.stringify({ ok: true, results }, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});