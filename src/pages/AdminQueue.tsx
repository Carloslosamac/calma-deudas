import { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { toast } from "sonner";
import { Activity, LogOut, Play, RefreshCw } from "lucide-react";
import Seo from "@/components/seo/Seo";

type RoadmapRow = {
  id: number;
  titulo: string;
  cluster: string | null;
  tipo_pagina: string | null;
  prioridad: string | null;
  estado: string;
  post_slug: string | null;
};

type QueueStats = {
  enCola: number;
  publicados: number;
  descartados: number;
  prioridad: Record<string, number>;
};

type QueueData = {
  rows: RoadmapRow[];
  stats: QueueStats;
};

const PRIORITY_RANK: Record<string, number> = { Alta: 0, Media: 1, Baja: 2 };

const estadoVariant = (estado: string): "default" | "secondary" | "outline" => {
  if (estado === "publicado") return "default";
  if (estado === "en_cola") return "secondary";
  return "outline";
};

const prioridadColor = (p: string | null) => {
  if (p === "Alta") return "text-destructive";
  if (p === "Media") return "text-accent-deep";
  return "text-muted-foreground";
};

const countBy = async (estado: string, prioridad?: string) => {
  let query = supabase
    .from("seo_roadmap")
    .select("id", { count: "exact", head: true })
    .eq("estado", estado);

  if (prioridad) query = query.eq("prioridad", prioridad);

  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
};

const fetchQueue = async (): Promise<QueueData> => {
  const [rowsResult, enCola, publicados, descartados, alta, media, baja] = await Promise.all([
    supabase
      .from("seo_roadmap")
      .select("id,titulo,cluster,tipo_pagina,prioridad,estado,post_slug")
      .eq("estado", "en_cola")
      .limit(300),
    countBy("en_cola"),
    countBy("publicado"),
    countBy("descartado_duplicado"),
    countBy("en_cola", "Alta"),
    countBy("en_cola", "Media"),
    countBy("en_cola", "Baja"),
  ]);

  if (rowsResult.error) throw rowsResult.error;

  return {
    rows: (rowsResult.data as RoadmapRow[]) ?? [],
    stats: {
      enCola,
      publicados,
      descartados,
      prioridad: { Alta: alta, Media: media, Baja: baja },
    },
  };
};

const AdminQueue = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, isAdmin, loading } = useAdminAuth();
  const [triggering, setTriggering] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [session, loading, navigate]);

  const { data, isLoading, refetch, isFetching, error } = useQuery({
    queryKey: ["admin-queue"],
    queryFn: fetchQueue,
    enabled: !!session && isAdmin,
  });

  const rows = data?.rows ?? [];
  const stats = data?.stats ?? { enCola: 0, publicados: 0, descartados: 0, prioridad: {} };

  const sorted = useMemo(
    () =>
      [...rows].sort((a, b) => {
        if (a.estado !== b.estado) return a.estado === "en_cola" ? -1 : 1;
        return (
          (PRIORITY_RANK[a.prioridad ?? "Baja"] ?? 2) -
            (PRIORITY_RANK[b.prioridad ?? "Baja"] ?? 2) || a.id - b.id
        );
      }),
    [rows]
  );

  const handleTrigger = async () => {
    setTriggering(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-daily-posts", {
        body: { source: "admin-manual" },
      });
      if (error) throw error;
      toast.success(`Generados ${data?.published ?? 0} posts (objetivo ${data?.target ?? "?"}).`);
      await Promise.all([
        refetch(),
        queryClient.invalidateQueries({ queryKey: ["generated-posts"] }),
      ]);
    } catch (err) {
      toast.error((err as Error).message ?? "Error al lanzar la generación");
    } finally {
      setTriggering(false);
    }
  };

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
        <Seo title="Sin permisos" description="Acceso restringido." robots="noindex,nofollow" canonical="/admin" />
        <h1 className="font-poppins text-2xl font-semibold text-foreground">Sin permisos de administrador</h1>
        <p className="max-w-md text-sm text-muted-foreground">
          Tu cuenta no tiene el rol de administrador asignado. Pide que te lo concedan.
        </p>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <Seo title="Cola de publicación" description="Panel interno de Calma." robots="noindex,nofollow" canonical="/admin" />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-poppins text-3xl font-semibold tracking-tight text-foreground">
              Cola de publicación diaria
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Masterplan SEO · estado y prioridad</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/health">
                <Activity className="mr-2 h-4 w-4" /> Estado
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
              <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refrescar
            </Button>
            <Button size="sm" onClick={handleTrigger} disabled={triggering}>
              <Play className="mr-2 h-4 w-4" />
              {triggering ? "Generando…" : "Lanzar generación"}
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">En cola</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{stats.enCola}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Publicados</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{stats.publicados}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Descartados</p>
            <p className="mt-1 text-2xl font-semibold text-foreground">{stats.descartados}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Prioridad en cola</p>
            <p className="mt-1 text-sm text-foreground">
              <span className="text-destructive">A {stats.prioridad["Alta"] ?? 0}</span>{" · "}
              <span className="text-accent-deep">M {stats.prioridad["Media"] ?? 0}</span>{" · "}
              <span className="text-muted-foreground">B {stats.prioridad["Baja"] ?? 0}</span>
            </p>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          {isLoading ? (
            <p className="p-6 text-sm text-muted-foreground">Cargando cola…</p>
          ) : error ? (
            <p className="p-6 text-sm text-destructive">No se pudo cargar la cola: {(error as Error).message}</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[90px]">Prioridad</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead className="hidden md:table-cell">Cluster</TableHead>
                  <TableHead className="hidden lg:table-cell">Tipo</TableHead>
                  <TableHead className="w-[120px]">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.slice(0, 300).map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className={`font-medium ${prioridadColor(r.prioridad)}`}>
                      {r.prioridad ?? "—"}
                    </TableCell>
                    <TableCell className="max-w-md">
                      {r.post_slug ? (
                        <a
                          href={`/blog/${r.post_slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent-deep underline-offset-2 hover:underline"
                        >
                          {r.titulo}
                        </a>
                      ) : (
                        r.titulo
                      )}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                      {r.cluster ?? "—"}
                    </TableCell>
                    <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                      {r.tipo_pagina ?? "—"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={estadoVariant(r.estado)}>{r.estado}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
        <p className="mt-3 text-xs text-muted-foreground">Mostrando hasta 300 filas en cola (de {stats.enCola}).</p>
      </div>
    </div>
  );
};

export default AdminQueue;