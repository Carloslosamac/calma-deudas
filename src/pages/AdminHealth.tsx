import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  ArrowLeft,
  Activity,
} from "lucide-react";
import Seo from "@/components/seo/Seo";

type RunRow = {
  id: string;
  started_at: string;
  finished_at: string | null;
  status: string;
  source: string;
  target: number | null;
  published_count: number;
  failed_count: number;
  error: string | null;
};

const fmt = (iso: string | null) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "—";
  }
};

const relative = (iso: string | null) => {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "hace segundos";
  if (mins < 60) return `hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours} h`;
  return `hace ${Math.floor(hours / 24)} d`;
};

const duration = (start: string, end: string | null) => {
  if (!end) return "—";
  const s = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 1000);
  return s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`;
};

const statusBadge = (status: string) => {
  if (status === "success")
    return (
      <Badge variant="default" className="gap-1">
        <CheckCircle2 className="h-3 w-3" /> OK
      </Badge>
    );
  if (status === "failed")
    return (
      <Badge variant="destructive" className="gap-1">
        <XCircle className="h-3 w-3" /> Fallo
      </Badge>
    );
  return (
    <Badge variant="secondary" className="gap-1">
      <Clock className="h-3 w-3" /> En curso
    </Badge>
  );
};

const fetchRuns = async (): Promise<RunRow[]> => {
  const { data, error } = await supabase
    .from("generator_runs")
    .select("id,started_at,finished_at,status,source,target,published_count,failed_count,error")
    .order("started_at", { ascending: false })
    .limit(50);
  if (error) throw error;
  return (data as RunRow[]) ?? [];
};

const AdminHealth = () => {
  const navigate = useNavigate();
  const { session, isAdmin, loading } = useAdminAuth();

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [session, loading, navigate]);

  const { data: runs = [], isLoading, refetch, isFetching } = useQuery({
    queryKey: ["generator-runs"],
    queryFn: fetchRuns,
    enabled: !!session && isAdmin,
    refetchInterval: 30000,
  });

  const lastRun = runs[0];
  const lastSuccess = runs.find((r) => r.status === "success");
  const lastFailure = runs.find((r) => r.status === "failed");
  const totalCreated = runs.reduce((acc, r) => acc + (r.published_count ?? 0), 0);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Cargando…</div>;
  }

  if (session && !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <Seo title="Sin permisos" description="Acceso restringido." robots="noindex,nofollow" canonical="/admin/health" />
        <h1 className="font-poppins text-2xl font-semibold text-foreground">Sin permisos de administrador</h1>
        <Button variant="outline" onClick={() => navigate("/admin/auth")}>Volver</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <Seo title="Estado del generador" description="Panel interno de Calma." robots="noindex,nofollow" canonical="/admin/health" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-2 font-poppins text-3xl font-semibold tracking-tight text-foreground">
              <Activity className="h-7 w-7 text-accent-deep" />
              Estado del generador
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Salud de generate-daily-posts</p>
            <p className="text-xs text-muted-foreground">Incluye blog (generate-daily-posts) y casos de éxito (generate-daily-casos)</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refrescar
          </Button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Última ejecución</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{relative(lastRun?.started_at ?? null)}</p>
            <p className="text-xs text-muted-foreground">{fmt(lastRun?.started_at ?? null)}</p>
            <div className="mt-2">{lastRun ? statusBadge(lastRun.status) : "—"}</div>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Último éxito</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{relative(lastSuccess?.finished_at ?? null)}</p>
            <p className="text-xs text-muted-foreground">
              {lastSuccess ? `${lastSuccess.published_count} posts` : "Sin éxitos registrados"}
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Último fallo</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{relative(lastFailure?.finished_at ?? lastFailure?.started_at ?? null)}</p>
            <p className="truncate text-xs text-muted-foreground" title={lastFailure?.error ?? ""}>
              {lastFailure?.error ?? "Sin fallos registrados"}
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Posts creados (50 runs)</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{totalCreated}</p>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          {isLoading ? (
            <p className="p-6 text-sm text-muted-foreground">Cargando histórico…</p>
          ) : runs.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">Aún no hay ejecuciones registradas.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Inicio</TableHead>
                  <TableHead className="w-[110px]">Estado</TableHead>
                  <TableHead className="hidden sm:table-cell">Origen</TableHead>
                  <TableHead className="text-center">Objetivo</TableHead>
                  <TableHead className="text-center">Creados</TableHead>
                  <TableHead className="text-center">Fallidos</TableHead>
                  <TableHead className="hidden md:table-cell">Duración</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runs.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="whitespace-nowrap text-sm">{fmt(r.started_at)}</TableCell>
                    <TableCell>{statusBadge(r.status)}</TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">{r.source}</TableCell>
                    <TableCell className="text-center text-sm">{r.target ?? "—"}</TableCell>
                    <TableCell className="text-center text-sm font-medium text-foreground">{r.published_count}</TableCell>
                    <TableCell className={`text-center text-sm ${r.failed_count ? "text-destructive" : "text-muted-foreground"}`}>
                      {r.failed_count}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {duration(r.started_at, r.finished_at)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminHealth;