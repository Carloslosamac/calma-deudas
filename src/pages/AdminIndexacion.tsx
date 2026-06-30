import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  ArrowLeft,
  Copy,
  RefreshCw,
  Search,
  LogOut,
  PlayCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Seo from "@/components/seo/Seo";

const SITEMAP_URL = "/sitemap.xml";

type IndexItem = {
  url: string;
  priority: number;
};

type PriorityGroup = {
  label: string;
  hint: string;
  badgeClass: string;
  items: IndexItem[];
};

const groupFor = (p: number): "alta" | "media" | "baja" => {
  if (p >= 0.8) return "alta";
  if (p >= 0.6) return "media";
  return "baja";
};

const GROUP_META: Record<string, { label: string; hint: string; badgeClass: string }> = {
  alta: {
    label: "Prioridad alta",
    hint: "Páginas de dinero y servicios principales. Pídelas primero.",
    badgeClass: "bg-destructive/10 text-destructive border-destructive/20",
  },
  media: {
    label: "Prioridad media",
    hint: "Guías, comparativas, localizaciones y herramientas.",
    badgeClass: "bg-accent/10 text-accent-deep border-accent/20",
  },
  baja: {
    label: "Prioridad baja",
    hint: "Resto de contenido. Google las descubrirá por el sitemap.",
    badgeClass: "bg-muted text-muted-foreground border-border",
  },
};

async function fetchSitemap(): Promise<IndexItem[]> {
  const res = await fetch(SITEMAP_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo leer el sitemap");
  const xml = await res.text();
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  const urls = Array.from(doc.querySelectorAll("url"));
  const items: IndexItem[] = urls.map((u) => {
    const loc = u.querySelector("loc")?.textContent?.trim() ?? "";
    const priorityText = u.querySelector("priority")?.textContent?.trim();
    const priority = priorityText ? parseFloat(priorityText) : 0.5;
    return { url: loc, priority: Number.isFinite(priority) ? priority : 0.5 };
  }).filter((i) => i.url);
  // Orden por prioridad descendente y luego alfabético
  items.sort((a, b) => b.priority - a.priority || a.url.localeCompare(b.url));
  return items;
}

const AdminIndexacion = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, isAdmin, loading } = useAdminAuth();
  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [loading, session, navigate]);

  const { data: items = [], isFetching, refetch } = useQuery({
    queryKey: ["sitemap-index"],
    queryFn: fetchSitemap,
    enabled: !!session && isAdmin,
    staleTime: 5 * 60 * 1000,
  });

  const { data: checks = {} } = useQuery({
    queryKey: ["index-checks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_index_checks")
        .select("url, done, indexed, coverage_state, last_inspected_at");
      if (error) throw error;
      const map: Record<string, { done: boolean; indexed: boolean | null; coverage: string | null; inspectedAt: string | null }> = {};
      (data ?? []).forEach((row) => {
        map[row.url] = {
          done: row.done,
          indexed: row.indexed,
          coverage: row.coverage_state,
          inspectedAt: row.last_inspected_at,
        };
      });
      return map;
    },
    enabled: !!session && isAdmin,
  });

  const toggle = async (url: string, done: boolean) => {
    // Optimista
    queryClient.setQueryData<Record<string, { done: boolean; indexed: boolean | null; coverage: string | null; inspectedAt: string | null }>>(
      ["index-checks"],
      (prev) => ({
        ...(prev ?? {}),
        [url]: { ...(prev?.[url] ?? { indexed: null, coverage: null, inspectedAt: null }), done },
      }),
    );
    const { error } = await supabase
      .from("seo_index_checks")
      .upsert(
        { url, done, done_at: done ? new Date().toISOString() : null },
        { onConflict: "url" },
      );
    if (error) {
      toast.error("No se pudo guardar el cambio");
      queryClient.invalidateQueries({ queryKey: ["index-checks"] });
    }
  };

  const runCheck = async () => {
    setRunning(true);
    toast.info("Comprobando estado real en Google… puede tardar 1-2 min.");
    try {
      const { data, error } = await supabase.functions.invoke("gsc-index-status", {
        body: { batchSize: 200 },
      });
      if (error) throw error;
      toast.success(
        `Sitemap reenviado. ${data?.indexed ?? 0} indexadas · ${data?.notIndexed ?? 0} pendientes (de ${data?.inspected ?? 0} comprobadas).`,
      );
      queryClient.invalidateQueries({ queryKey: ["index-checks"] });
    } catch (e) {
      toast.error("No se pudo ejecutar la comprobación");
    } finally {
      setRunning(false);
    }
  };

  const groups = useMemo<PriorityGroup[]>(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? items.filter((i) => i.url.toLowerCase().includes(q)) : items;
    const buckets: Record<string, IndexItem[]> = { alta: [], media: [], baja: [] };
    filtered.forEach((i) => buckets[groupFor(i.priority)].push(i));
    return (["alta", "media", "baja"] as const).map((key) => ({
      ...GROUP_META[key],
      items: buckets[key],
    }));
  }, [items, query]);

  const total = items.length;
  const doneCount = items.filter((i) => checks[i.url]?.done).length;
  const indexedCount = items.filter((i) => checks[i.url]?.indexed === true).length;
  const notIndexedCount = items.filter((i) => checks[i.url]?.indexed === false).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/auth", { replace: true });
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Cargando…</div>;
  }

  if (session && !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <Seo title="Sin permisos" description="Acceso restringido." robots="noindex,nofollow" canonical="/admin/indexacion" />
        <h1 className="font-poppins text-2xl font-semibold text-foreground">Sin permisos de administrador</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <Seo title="Indexación en Google" description="Panel interno de Calma." robots="noindex,nofollow" canonical="/admin/indexacion" />
      <div className="mx-auto max-w-4xl">
        <Link to="/admin" className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Volver a la cola
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-poppins text-3xl font-semibold tracking-tight text-foreground">
              Indexación en Google
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Lista de páginas por prioridad para «Solicitar indexación» en Search Console. Marca cada una al pedirla.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refrescar
            </Button>
            <Button size="sm" onClick={runCheck} disabled={running}>
              <PlayCircle className={`mr-2 h-4 w-4 ${running ? "animate-spin" : ""}`} />
              {running ? "Comprobando…" : "Comprobar en Google"}
            </Button>
          </div>
        </div>

        <Card className="mt-6 p-5">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground">
              {doneCount} de {total} solicitadas
            </p>
            <span className="text-sm font-semibold text-foreground">{pct}%</span>
          </div>
          <Progress value={pct} className="mt-3" />
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" /> {indexedCount} indexadas en Google
            </span>
            <span className="inline-flex items-center gap-1.5 text-amber-600">
              <XCircle className="h-4 w-4" /> {notIndexedCount} aún no indexadas
            </span>
            <span className="text-muted-foreground">
              {total - indexedCount - notIndexedCount} sin comprobar
            </span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            «Comprobar en Google» reenvía el sitemap y consulta el estado real de cada URL vía Search Console (se ejecuta también cada día automáticamente). Google no permite forzar la indexación por API; el estado refleja lo que Google decide.
          </p>
        </Card>

        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar por URL…"
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {groups.map((group) =>
          group.items.length === 0 ? null : (
            <div key={group.label} className="mt-8">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={group.badgeClass}>
                  {group.label}
                </Badge>
                <span className="text-xs text-muted-foreground">{group.hint}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {group.items.filter((i) => checks[i.url]?.done).length}/{group.items.length}
                </span>
              </div>
              <Card className="mt-3 divide-y divide-border">
                {group.items.map((item) => {
                  const entry = checks[item.url];
                  const done = !!entry?.done;
                  const path = item.url.replace("https://mi-calma.es", "") || "/";
                  return (
                    <label
                      key={item.url}
                      className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-muted/40"
                    >
                      <Checkbox
                        checked={done}
                        onCheckedChange={(v) => toggle(item.url, v === true)}
                      />
                      <span
                        className={`flex-1 truncate text-sm ${done ? "text-muted-foreground line-through" : "text-foreground"}`}
                      >
                        {path}
                      </span>
                      {entry?.indexed === true && (
                        <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                          Indexada
                        </Badge>
                      )}
                      {entry?.indexed === false && (
                        <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-700">
                          {entry.coverage ?? "No indexada"}
                        </Badge>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigator.clipboard.writeText(item.url);
                          toast.success("URL copiada · pégala en Inspección de URLs");
                        }}
                        className="inline-flex items-center gap-1 text-xs text-accent-deep hover:underline"
                      >
                        Copiar URL <Copy className="h-3 w-3" />
                      </button>
                    </label>
                  );
                })}
              </Card>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default AdminIndexacion;