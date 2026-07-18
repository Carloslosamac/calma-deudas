import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import Seo from "@/components/seo/Seo";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

/** Fuentes IA que trackeamos por utm_source / referrer / page. */
const AI_SOURCES: { key: string; label: string; patterns: string[] }[] = [
  { key: "chatgpt", label: "ChatGPT", patterns: ["chatgpt", "openai", "oai"] },
  { key: "perplexity", label: "Perplexity", patterns: ["perplexity"] },
  { key: "claude", label: "Claude", patterns: ["claude", "anthropic"] },
  { key: "gemini", label: "Gemini · AI Overviews", patterns: ["gemini", "bard", "aioverviews", "aio"] },
  { key: "copilot", label: "Copilot", patterns: ["copilot", "bing-chat", "bingchat"] },
  { key: "you", label: "You.com", patterns: ["you.com", "youcom"] },
  { key: "duckduckgo", label: "DuckDuckGo AI", patterns: ["duckduckgo", "ddg"] },
];

const AI_PROMPTS = [
  "¿Cómo cancelo mis deudas con la Ley de Segunda Oportunidad en España?",
  "¿Cuáles son los mejores abogados de Segunda Oportunidad?",
  "¿Cómo salgo de ASNEF?",
  "¿Puedo cancelar deudas con Hacienda y Seguridad Social?",
  "¿Reunificar deudas o Ley de Segunda Oportunidad?",
  "¿Cómo paro un embargo de nómina?",
  "¿Cómo reclamo una tarjeta revolving por usura?",
  "¿Puedo cancelar microcréditos con intereses abusivos?",
  "¿Cuánto cuesta acogerse a la Ley de Segunda Oportunidad?",
  "¿Pierdo mi casa con la Ley de Segunda Oportunidad?",
];

type AiAuditRow = { menciona: "yes" | "no" | "competidor" | null; note?: string };

const AUDIT_KEY = "calma_ai_audit_v1";

function loadAudit(): Record<string, AiAuditRow> {
  try {
    return JSON.parse(localStorage.getItem(AUDIT_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function saveAudit(data: Record<string, AiAuditRow>) {
  localStorage.setItem(AUDIT_KEY, JSON.stringify(data));
}

function matchesAi(sourceOrPage: string | null | undefined): string | null {
  if (!sourceOrPage) return null;
  const s = sourceOrPage.toLowerCase();
  for (const src of AI_SOURCES) {
    if (src.patterns.some((p) => s.includes(p))) return src.key;
  }
  return null;
}

type SubmissionRow = {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
};

async function fetchAiLeads(): Promise<SubmissionRow[]> {
  const since = new Date(Date.now() - 30 * 86400_000).toISOString();
  const { data } = await supabase
    .from("web_submissions")
    .select("id, created_at, name, phone, page, utm_source, utm_medium")
    .gte("created_at", since)
    .order("created_at", { ascending: false });
  return (data ?? []) as SubmissionRow[];
}

async function fetchStackStatus() {
  const urls = ["/llms.txt", "/llms-full.txt", "/robots.txt", "/sitemap.xml"];
  const results = await Promise.all(
    urls.map(async (u) => {
      try {
        const r = await fetch(u, { cache: "no-store" });
        const size = r.ok ? (await r.text()).length : 0;
        return { url: u, ok: r.ok, size };
      } catch {
        return { url: u, ok: false, size: 0 };
      }
    }),
  );
  // Verificar bots permitidos en robots.txt
  let botsAllowed: Record<string, boolean> = {};
  try {
    const r = await fetch("/robots.txt", { cache: "no-store" });
    if (r.ok) {
      const text = await r.text();
      const bots = ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];
      for (const b of bots) botsAllowed[b] = new RegExp(`User-agent:\\s*${b}[\\s\\S]{0,120}Allow:\\s*/`, "i").test(text);
    }
  } catch {
    /* empty */
  }
  return { files: results, botsAllowed };
}

const AdminIaVisibility = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [audit, setAudit] = useState<Record<string, AiAuditRow>>({});

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [loading, session, navigate]);
  useEffect(() => setAudit(loadAudit()), []);

  const canFetch = !!session && isAdmin;

  const { data: leads = [], refetch, isFetching } = useQuery({
    queryKey: ["ai-leads-30d"],
    queryFn: fetchAiLeads,
    enabled: canFetch,
  });

  const { data: stack } = useQuery({
    queryKey: ["ai-stack-status"],
    queryFn: fetchStackStatus,
    enabled: canFetch,
  });

  const { aiLeads, bySource, byPage } = useMemo(() => {
    const rows = leads
      .map((r) => ({ ...r, aiKey: matchesAi(r.utm_source) ?? matchesAi(r.page) }))
      .filter((r) => !!r.aiKey);
    const bySrc = new Map<string, number>();
    const byPg = new Map<string, number>();
    for (const r of rows) {
      bySrc.set(r.aiKey!, (bySrc.get(r.aiKey!) ?? 0) + 1);
      const p = r.page || "/";
      byPg.set(p, (byPg.get(p) ?? 0) + 1);
    }
    return {
      aiLeads: rows,
      bySource: [...bySrc.entries()].sort((a, b) => b[1] - a[1]),
      byPage: [...byPg.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10),
    };
  }, [leads]);

  const updateAudit = (prompt: string, patch: Partial<AiAuditRow>) => {
    const next = { ...audit, [prompt]: { ...(audit[prompt] ?? { menciona: null }), ...patch } };
    setAudit(next);
    saveAudit(next);
  };

  const auditStats = useMemo(() => {
    const yes = AI_PROMPTS.filter((p) => audit[p]?.menciona === "yes").length;
    const comp = AI_PROMPTS.filter((p) => audit[p]?.menciona === "competidor").length;
    const done = AI_PROMPTS.filter((p) => audit[p]?.menciona).length;
    return { yes, comp, done, total: AI_PROMPTS.length };
  }, [audit]);

  if (loading) return null;
  if (session && !isAdmin) {
    return (
      <div className="p-6 text-sm text-muted-foreground">Sin permisos de administrador.</div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10">
      <Seo title="Visibilidad IA (GEO)" description="Panel interno de Calma." robots="noindex,nofollow" canonical="/admin/contenido/ia" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="flex items-center gap-2 font-poppins text-3xl font-semibold tracking-tight text-foreground">
              <Sparkles className="h-6 w-6 text-accent-deep" />
              Visibilidad IA (GEO)
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Cómo nos ven ChatGPT, Perplexity, Claude, Gemini y otros motores generativos.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refrescar
          </Button>
        </div>

        {/* KPIs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Leads IA · 30 días</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">{aiLeads.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              De {leads.length} leads totales ({leads.length ? Math.round((aiLeads.length / leads.length) * 100) : 0}% desde IA).
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Fuentes IA activas</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">{bySource.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              De {AI_SOURCES.length} trackeadas (ChatGPT, Perplexity, Claude…).
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Auditoría manual</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">
              {auditStats.yes}/{auditStats.total}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Prompts donde Calma es citada. {auditStats.comp} van a competidor.
            </p>
          </Card>
        </div>

        {/* Stack GEO */}
        <h2 className="mt-10 font-poppins text-lg font-semibold text-foreground">Stack GEO</h2>
        <Card className="mt-3 p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ficheros</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {(stack?.files ?? []).map((f) => (
                  <li key={f.url} className="flex items-center gap-2">
                    {f.ok ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-accent-deep hover:underline"
                    >
                      {f.url} <ExternalLink className="h-3 w-3" />
                    </a>
                    <span className="text-xs text-muted-foreground">
                      {f.ok ? `${(f.size / 1024).toFixed(1)} KB` : "no accesible"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bots IA permitidos</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {Object.entries(stack?.botsAllowed ?? {}).map(([b, ok]) => (
                  <li key={b} className="flex items-center gap-2">
                    {ok ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-amber-500" />
                    )}
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* Fuentes IA */}
        <h2 className="mt-10 font-poppins text-lg font-semibold text-foreground">Leads por fuente IA</h2>
        <Card className="mt-3">
          {bySource.length === 0 ? (
            <p className="px-5 py-6 text-sm text-muted-foreground">
              Ningún lead identificado como IA en los últimos 30 días. Añade UTMs a las citas manuales o espera a que las conversiones lleguen.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {bySource.map(([key, count]) => {
                const meta = AI_SOURCES.find((s) => s.key === key);
                return (
                  <li key={key} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{meta?.label ?? key}</p>
                      <p className="text-xs text-muted-foreground">Patrones: {meta?.patterns.join(", ")}</p>
                    </div>
                    <Badge variant="outline" className="border-accent/40 bg-accent-soft text-accent-deep">
                      {count} lead{count === 1 ? "" : "s"}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {byPage.length > 0 && (
          <>
            <h2 className="mt-10 font-poppins text-lg font-semibold text-foreground">Páginas de aterrizaje desde IA</h2>
            <Card className="mt-3">
              <ul className="divide-y divide-border">
                {byPage.map(([page, count]) => (
                  <li key={page} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                    <span className="truncate text-foreground">{page}</span>
                    <Badge variant="outline">{count}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </>
        )}

        {/* Auditoría manual */}
        <h2 className="mt-10 font-poppins text-lg font-semibold text-foreground">
          Auditoría manual de citas
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Corre estos prompts en ChatGPT/Perplexity/Gemini y marca si nos citan. Guardado en tu navegador.
        </p>
        <Card className="mt-3 divide-y divide-border">
          {AI_PROMPTS.map((p) => {
            const row = audit[p] ?? { menciona: null };
            return (
              <div key={p} className="flex flex-col gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-foreground">{p}</p>
                <div className="flex gap-1.5">
                  {(["yes", "competidor", "no"] as const).map((v) => {
                    const active = row.menciona === v;
                    const styles: Record<typeof v, string> = {
                      yes: active ? "bg-emerald-600 text-white border-emerald-600" : "border-emerald-200 text-emerald-700",
                      competidor: active ? "bg-amber-500 text-white border-amber-500" : "border-amber-200 text-amber-700",
                      no: active ? "bg-muted text-foreground border-border" : "border-border text-muted-foreground",
                    };
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => updateAudit(p, { menciona: active ? null : v })}
                        className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors hover:opacity-90 ${styles[v]}`}
                      >
                        {v === "yes" ? "Calma" : v === "competidor" ? "Competidor" : "No cita"}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Card>

        <p className="mt-6 text-xs text-muted-foreground">
          Cobertura de contenido citable: 26/26 money pages tienen `directAnswer` para GEO. `llms-full.txt` se regenera en cada build con esos fragmentos + los últimos 15 posts con tldr.
        </p>
      </div>
    </div>
  );
};

export default AdminIaVisibility;