import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Sparkles,
  PhoneCall,
  Inbox,
  ListChecks,
  Search,
  Activity,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Card } from "@/components/ui/card";
import Seo from "@/components/seo/Seo";

const fetchStats = async () => {
  const since24h = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const [cola, webLeads24h, salesOpen] = await Promise.all([
    supabase
      .from("seo_roadmap")
      .select("id", { count: "exact", head: true })
      .eq("estado", "en_cola"),
    supabase
      .from("web_submissions")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since24h),
    supabase
      .from("sales_leads")
      .select("id", { count: "exact", head: true })
      .not("lead_status", "in", "(won,lost,descartado)"),
  ]);
  return {
    cola: cola.count ?? 0,
    webLeads24h: webLeads24h.count ?? 0,
    salesOpen: salesOpen.count ?? 0,
  };
};

const fetchLatestWebLeads = async () => {
  const { data } = await supabase
    .from("web_submissions")
    .select("id, created_at, name, phone, page, utm_source")
    .order("created_at", { ascending: false })
    .limit(5);
  return data ?? [];
};

type Action = {
  to: string;
  title: string;
  desc: string;
  icon: typeof Sparkles;
};

const actions: Action[] = [
  { to: "/admin/ventas", title: "Nuevo diagnóstico", desc: "Herramienta de venta con triage.", icon: Sparkles },
  { to: "/admin/ventas/leads", title: "Leads de llamadas", desc: "Paquetes y seguimiento.", icon: PhoneCall },
  { to: "/admin/leads-web", title: "Leads web", desc: "Formularios entrantes.", icon: Inbox },
  { to: "/admin/contenido/cola", title: "Cola de publicación", desc: "Posts y casos pendientes.", icon: ListChecks },
  { to: "/admin/contenido/indexacion", title: "Indexación", desc: "Estado en Google.", icon: Search },
  { to: "/admin/contenido/salud", title: "Salud del sitio", desc: "Generador y jobs.", icon: Activity },
];

const fmtDate = (iso: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
};

const AdminDashboard = () => {
  const { session, isAdmin, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!session) navigate("/admin/auth", { replace: true });
    else setReady(true);
  }, [session, loading, navigate]);

  const canFetch = ready && isAdmin;

  const { data: stats } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: fetchStats,
    enabled: canFetch,
  });
  const { data: latest } = useQuery({
    queryKey: ["admin-dashboard-latest"],
    queryFn: fetchLatestWebLeads,
    enabled: canFetch,
  });

  if (loading || !ready) return null;
  if (session && !isAdmin) {
    return (
      <div className="px-6 py-10">
        <Seo title="Sin permisos" description="Acceso restringido." robots="noindex,nofollow" canonical="/admin" />
        <p className="text-sm text-muted-foreground">Sin permisos de administrador.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10">
      <Seo title="Panel de administración" description="Panel interno de Calma." robots="noindex,nofollow" canonical="/admin" />
      <div className="mx-auto max-w-6xl">
        <h1 className="font-poppins text-3xl font-semibold tracking-tight text-foreground">Panel</h1>
        <p className="mt-1 text-sm text-muted-foreground">Resumen de ventas y contenido.</p>

        {/* KPIs */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Leads web · 24 h</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">{stats?.webLeads24h ?? "—"}</p>
            <Link to="/admin/leads-web" className="mt-2 inline-flex items-center gap-1 text-xs text-accent-deep hover:underline">
              Ver leads <ArrowRight className="h-3 w-3" />
            </Link>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ventas abiertas</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">{stats?.salesOpen ?? "—"}</p>
            <Link to="/admin/ventas/leads" className="mt-2 inline-flex items-center gap-1 text-xs text-accent-deep hover:underline">
              Gestionar <ArrowRight className="h-3 w-3" />
            </Link>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">En cola de publicación</p>
            <p className="mt-1 text-3xl font-semibold text-foreground">{stats?.cola ?? "—"}</p>
            <Link to="/admin/contenido/cola" className="mt-2 inline-flex items-center gap-1 text-xs text-accent-deep hover:underline">
              Abrir cola <ArrowRight className="h-3 w-3" />
            </Link>
          </Card>
        </div>

        {/* Acciones rápidas */}
        <h2 className="mt-10 font-poppins text-lg font-semibold text-foreground">Accesos rápidos</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group flex items-start gap-3 rounded-2xl border border-border bg-surface-elevated p-4 transition-colors hover:border-accent/50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
                <a.icon className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </Link>
          ))}
        </div>

        {/* Últimos leads web */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="font-poppins text-lg font-semibold text-foreground">Últimos leads web</h2>
          <Link to="/admin/leads-web" className="text-sm text-accent-deep hover:underline">Ver todos</Link>
        </div>
        <Card className="mt-3 overflow-hidden">
          {latest && latest.length > 0 ? (
            <ul className="divide-y divide-border">
              {latest.map((l: any) => (
                <li key={l.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{l.name || "—"}</p>
                    <p className="truncate text-xs text-muted-foreground">
                     {l.phone || "—"} · {l.utm_source || l.page || "web"}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{fmtDate(l.created_at)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-sm text-muted-foreground">Sin leads recientes.</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;