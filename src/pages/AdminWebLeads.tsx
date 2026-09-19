import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Ghost,
  Download,
} from "lucide-react";
import Seo from "@/components/seo/Seo";

type WebSubmission = {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  debt_amount: number | null;
  entities: string[] | null;
  page: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  zoho_lead_id: string | null;
  zoho_status: string;
  zoho_error: string | null;
  retry_count: number;
};

type OrphanHit = {
  id: string;
  created_at: string;
  referrer: string | null;
  user_agent: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  page: string | null;
};

const eur = (n: number | null) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(n);

const fmt = (v: string) =>
  new Date(v).toLocaleString("es-ES", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const StatusChip = ({ status }: { status: string }) => {
  if (status === "ok")
    return (
      <Badge variant="outline" className="border-emerald-500/50 text-emerald-600">
        <CheckCircle2 className="mr-1 h-3 w-3" />
        En Zoho
      </Badge>
    );
  if (status === "error")
    return (
      <Badge variant="outline" className="border-destructive/50 text-destructive">
        <AlertCircle className="mr-1 h-3 w-3" />
        Error
      </Badge>
    );
  return (
    <Badge variant="outline" className="text-muted-foreground">
      <Clock className="mr-1 h-3 w-3" />
      Pendiente
    </Badge>
  );
};

const AdminWebLeads = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();
  const [filter, setFilter] = useState<"todos" | "error" | "pending" | "ok">("todos");
  const [pageFilter, setPageFilter] = useState("todas");
  const [sourceFilter, setSourceFilter] = useState("todas");
  const [campaignFilter, setCampaignFilter] = useState("todas");
  const [retrying, setRetrying] = useState<Record<string, boolean>>({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [exporting, setExporting] = useState(false);

  const setQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (days - 1));
    const iso = (d: Date) => d.toISOString().slice(0, 10);
    setFromDate(iso(start));
    setToDate(iso(end));
  };

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [loading, session, navigate]);

  const { data: rows = [], refetch } = useQuery({
    queryKey: ["web-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("web_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as WebSubmission[];
    },
    enabled: !!session && isAdmin,
  });

  const { data: orphans = [] } = useQuery({
    queryKey: ["orphan-gracias-hits"],
    queryFn: async () => {
      const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from("orphan_gracias_hits")
        .select("id, created_at, referrer, user_agent, utm_source, utm_campaign, page")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as OrphanHit[];
    },
    enabled: !!session && isAdmin,
  });

  const [showOrphans, setShowOrphans] = useState(false);
  const [retryingAll, setRetryingAll] = useState(false);

  const retryAllPending = async () => {
    const pendings = rows.filter((r) => r.zoho_status !== "ok");
    if (pendings.length === 0) {
      toast.info("No hay envíos pendientes o con error para reintentar.");
      return;
    }
    setRetryingAll(true);
    let okCount = 0;
    let failCount = 0;
    for (const r of pendings) {
      try {
        const { data } = await supabase.functions.invoke("zoho-lead", {
          body: { submissionId: r.id },
        });
        if (data?.success) okCount++;
        else failCount++;
      } catch {
        failCount++;
      }
    }
    setRetryingAll(false);
    refetch();
    toast.success(`Reintentos: ${okCount} ok, ${failCount} fallidos.`);
  };

  const canal = (r: WebSubmission) => {
    if (r.utm_source) return r.utm_source;
    return "orgánico / directo";
  };

  const uniq = (vals: (string | null)[]) =>
    Array.from(new Set(vals.filter(Boolean) as string[])).sort((a, b) =>
      a.localeCompare(b, "es"),
    );

  const pageOptions = uniq(rows.map((r) => r.page));
  const sourceOptions = uniq(rows.map((r) => r.utm_source));
  const campaignOptions = uniq(rows.map((r) => r.utm_campaign));

  const filtered = rows.filter((r) => {
    if (filter !== "todos" && r.zoho_status !== filter) return false;
    if (fromDate && new Date(r.created_at) < new Date(`${fromDate}T00:00:00`)) return false;
    if (toDate && new Date(r.created_at) > new Date(`${toDate}T23:59:59.999`)) return false;
    if (pageFilter !== "todas" && (r.page ?? "") !== pageFilter) return false;
    if (sourceFilter !== "todas") {
      if (sourceFilter === "(sin utm)" ? !!r.utm_source : r.utm_source !== sourceFilter)
        return false;
    }
    if (campaignFilter !== "todas") {
      if (
        campaignFilter === "(sin campaña)"
          ? !!r.utm_campaign
          : r.utm_campaign !== campaignFilter
      )
        return false;
    }
    return true;
  });

  // Resumen de procedencia: canal -> páginas
  const provenance = (() => {
    const map = new Map<string, { total: number; pages: Map<string, number> }>();
    for (const r of filtered) {
      const c = canal(r);
      if (!map.has(c)) map.set(c, { total: 0, pages: new Map() });
      const e = map.get(c)!;
      e.total += 1;
      const p = r.page || "(sin página)";
      e.pages.set(p, (e.pages.get(p) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([canal, e]) => ({
        canal,
        total: e.total,
        pages: Array.from(e.pages.entries()).sort((a, b) => b[1] - a[1]),
      }))
      .sort((a, b) => b.total - a.total);
  })();

  const exportExcel = async () => {
    if (filtered.length === 0) {
      toast.info("No hay envíos para exportar con estos filtros.");
      return;
    }
    const framed = window.self !== window.top;
    if (framed) {
      const standalone = window.open(window.location.href, "_blank", "noopener");
      if (!standalone) {
        toast.error("Permite ventanas emergentes para abrir el panel y descargar el Excel.");
      } else {
        toast.info("Panel abierto. Pulsa allí «Descargar Excel» una vez.");
      }
      return;
    }
    setExporting(true);
    try {
      const XLSX = await import("xlsx");
      const data = filtered.map((r) => ({
        Fecha: new Date(r.created_at).toLocaleString("es-ES"),
        Nombre: r.name ?? "",
        Teléfono: r.phone ?? "",
        Email: r.email ?? "",
        Deuda: r.debt_amount ?? "",
        Entidades: (r.entities ?? []).join(", "),
        Página: r.page ?? "",
        Canal: canal(r),
        utm_source: r.utm_source ?? "",
        utm_medium: r.utm_medium ?? "",
        utm_campaign: r.utm_campaign ?? "",
        Zoho: r.zoho_status,
        "ID Zoho": r.zoho_lead_id ?? "",
        Error: r.zoho_error ?? "",
      }));
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Leads web");
      const rango =
        fromDate || toDate ? `_${fromDate || "inicio"}_${toDate || "hoy"}` : "";
      const filename = `leads-web${rango}.xlsx`;
      const out = XLSX.write(wb, { bookType: "xlsx", type: "array" }) as ArrayBuffer;
      const blob = new Blob([out], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5 * 60 * 1000);
      toast.success(`Excel preparado con ${filtered.length} envíos.`);
    } catch (e) {
      toast.error(
        `No se pudo descargar: ${e instanceof Error ? e.message : String(e)}.`,
      );
    } finally {
      setExporting(false);
    }
  };

  const retry = async (id: string) => {
    setRetrying((p) => ({ ...p, [id]: true }));
    try {
      const { data, error } = await supabase.functions.invoke("zoho-lead", {
        body: { submissionId: id },
      });
      if (error) throw error;
      if (data?.success) toast.success(`Reintentado: creado en Zoho (${data.leadId})`);
      else toast.warning(`Reintento fallido: ${data?.details ?? data?.error ?? "error"}`);
    } catch (e) {
      toast.error(`No se pudo reintentar: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setRetrying((p) => ({ ...p, [id]: false }));
      refetch();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Cargando…
      </div>
    );
  }
  if (session && !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-muted-foreground">Sin permisos de administrador.</p>
      </div>
    );
  }

  const counts = {
    total: rows.length,
    ok: rows.filter((r) => r.zoho_status === "ok").length,
    error: rows.filter((r) => r.zoho_status === "error").length,
    pending: rows.filter((r) => r.zoho_status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6">
      <Seo
        title="Leads web"
        description="Formularios enviados desde la web."
        robots="noindex,nofollow"
        canonical="/admin/web-leads"
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-end">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={retryingAll}
              onClick={retryAllPending}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${retryingAll ? "animate-spin" : ""}`}
              />
              Reintentar todos
            </Button>
            <Button variant="outline" size="sm" onClick={exportExcel} disabled={exporting}>
              <Download className="mr-2 h-4 w-4" />
              {exporting ? "Preparando…" : "Descargar Excel"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refrescar
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="font-poppins text-2xl font-semibold text-foreground">
            Leads desde la web
          </h1>
          <p className="text-sm text-muted-foreground">
            Todos los envíos del formulario, incluso si Zoho falló.
          </p>
        </div>

        <Card className="mb-4 p-4">
          <button
            type="button"
            onClick={() => setShowOrphans((v) => !v)}
            className="flex w-full items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <Ghost className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Aterrizajes huérfanos en /gracias (7 días):{" "}
                <span className="text-foreground">{orphans.length}</span>
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {showOrphans ? "Ocultar" : "Ver detalle"}
            </span>
          </button>
          {showOrphans && (
            <div className="mt-3 max-h-64 space-y-2 overflow-y-auto border-t border-border pt-3">
              {orphans.length === 0 && (
                <p className="text-xs text-muted-foreground">Ninguno registrado.</p>
              )}
              {orphans.map((o) => (
                <div key={o.id} className="rounded-md border border-border/50 p-2 text-[11px]">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{fmt(o.created_at)}</span>
                    {o.utm_source && <span>utm_source: {o.utm_source}</span>}
                  </div>
                  <div className="mt-1 text-foreground/80">
                    ref: {o.referrer || "(directo)"}
                  </div>
                  {o.user_agent && (
                    <div className="mt-0.5 truncate text-muted-foreground/70">
                      UA: {o.user_agent}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="mb-4 p-4">
          <div className="mb-3 flex flex-wrap items-end gap-3 border-b border-border pb-3">
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Desde
              </span>
              <input
                type="date"
                value={fromDate}
                max={toDate || undefined}
                onChange={(e) => setFromDate(e.target.value)}
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Hasta
              </span>
              <input
                type="date"
                value={toDate}
                min={fromDate || undefined}
                onChange={(e) => setToDate(e.target.value)}
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { l: "Hoy", d: 1 },
                { l: "7 días", d: 7 },
                { l: "30 días", d: 30 },
                { l: "90 días", d: 90 },
              ].map((q) => (
                <Button key={q.l} size="sm" variant="outline" onClick={() => setQuickRange(q.d)}>
                  {q.l}
                </Button>
              ))}
              {(fromDate || toDate) && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                  }}
                >
                  Todo
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            {[
              {
                label: "Página",
                value: pageFilter,
                set: setPageFilter,
                options: pageOptions,
                all: "Todas las páginas",
                none: null as string | null,
              },
              {
                label: "Fuente (utm_source)",
                value: sourceFilter,
                set: setSourceFilter,
                options: sourceOptions,
                all: "Todas las fuentes",
                none: "(sin utm)",
              },
              {
                label: "Campaña",
                value: campaignFilter,
                set: setCampaignFilter,
                options: campaignOptions,
                all: "Todas las campañas",
                none: "(sin campaña)",
              },
            ].map((s) => (
              <label key={s.label} className="flex min-w-[180px] flex-1 flex-col gap-1">
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </span>
                <select
                  value={s.value}
                  onChange={(e) => s.set(e.target.value)}
                  className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                >
                  <option value="todas">{s.all}</option>
                  {s.none && <option value={s.none}>{s.none}</option>}
                  {s.options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            {(pageFilter !== "todas" ||
              sourceFilter !== "todas" ||
              campaignFilter !== "todas") && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setPageFilter("todas");
                  setSourceFilter("todas");
                  setCampaignFilter("todas");
                }}
              >
                Limpiar
              </Button>
            )}
          </div>

          <div className="mt-4 border-t border-border pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Procedencia ({filtered.length} envíos)
            </p>
            {provenance.length === 0 ? (
              <p className="mt-2 text-xs text-muted-foreground">Sin datos.</p>
            ) : (
              <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {provenance.map((c) => (
                  <div key={c.canal} className="rounded-lg border border-border/60 p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-medium text-foreground">
                        {c.canal}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{c.total}</span>
                    </div>
                    <ul className="mt-1.5 space-y-0.5">
                      {c.pages.slice(0, 5).map(([p, n]) => (
                        <li
                          key={p}
                          className="flex justify-between gap-2 text-[11px] text-muted-foreground"
                        >
                          <button
                            type="button"
                            className="truncate text-left hover:text-foreground hover:underline"
                            onClick={() => setPageFilter(p === "(sin página)" ? "todas" : p)}
                          >
                            {p}
                          </button>
                          <span>{n}</span>
                        </li>
                      ))}
                      {c.pages.length > 5 && (
                        <li className="text-[11px] text-muted-foreground/70">
                          +{c.pages.length - 5} más
                        </li>
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <div className="mb-4 flex flex-wrap gap-2">
          {(["todos", "error", "pending", "ok"] as const).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f === "todos"
                ? `Todos (${counts.total})`
                : f === "ok"
                  ? `En Zoho (${counts.ok})`
                  : f === "error"
                    ? `Error (${counts.error})`
                    : `Pendiente (${counts.pending})`}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 && (
            <Card className="p-6 text-center text-sm text-muted-foreground">
              No hay envíos para este filtro.
            </Card>
          )}
          {filtered.map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-foreground">
                      {r.name || "Sin nombre"}
                    </span>
                    <StatusChip status={r.zoho_status} />
                    {r.retry_count > 0 && (
                      <Badge variant="secondary" className="text-[10px]">
                        {r.retry_count} reintento{r.retry_count > 1 ? "s" : ""}
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {fmt(r.created_at)}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    {r.phone && (
                      <a
                        href={`tel:${r.phone}`}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        <Phone className="h-3.5 w-3.5" /> {r.phone}
                      </a>
                    )}
                    {r.email && (
                      <a
                        href={`mailto:${r.email}`}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        <Mail className="h-3.5 w-3.5" /> {r.email}
                      </a>
                    )}
                    <span>Deuda: {eur(r.debt_amount)}</span>
                    {r.entities?.length ? <span>Deudas: {r.entities.join(", ")}</span> : null}
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-3 text-[11px] text-muted-foreground/80">
                    {r.page && <span>Página: {r.page}</span>}
                    {r.utm_source && <span>utm_source: {r.utm_source}</span>}
                    {r.utm_campaign && <span>utm_campaign: {r.utm_campaign}</span>}
                    {r.zoho_lead_id && <span>Zoho ID: {r.zoho_lead_id}</span>}
                  </div>

                  {r.zoho_error && (
                    <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2 text-[11px] text-destructive">
                      {r.zoho_error}
                    </div>
                  )}
                </div>

                <div className="flex shrink-0 gap-2">
                  {r.zoho_status !== "ok" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={retrying[r.id]}
                      onClick={() => retry(r.id)}
                    >
                      <RefreshCw
                        className={`mr-1 h-3.5 w-3.5 ${retrying[r.id] ? "animate-spin" : ""}`}
                      />
                      Reintentar Zoho
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminWebLeads;