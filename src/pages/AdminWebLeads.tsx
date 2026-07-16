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
  const [retrying, setRetrying] = useState<Record<string, boolean>>({});

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

  const filtered = filter === "todos" ? rows : rows.filter((r) => r.zoho_status === filter);

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
        <div className="mb-4 flex items-center justify-between">
          <Link
            to="/admin/ventas/leads"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Paquetes de llamadas
          </Link>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refrescar
          </Button>
        </div>

        <div className="mb-6">
          <h1 className="font-poppins text-2xl font-semibold text-foreground">
            Leads desde la web
          </h1>
          <p className="text-sm text-muted-foreground">
            Todos los envíos del formulario, incluso si Zoho falló.
          </p>
        </div>

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