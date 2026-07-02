import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  ArrowLeft,
  Upload,
  Phone,
  Copy,
  LogOut,
  Search,
  Trash2,
} from "lucide-react";
import Seo from "@/components/seo/Seo";
import {
  parseCsv,
  mapRowToLead,
  mapEmployment,
  type ParsedLead,
} from "@/lib/leadsCsv";

type LeadRow = {
  id: string;
  external_id: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  lead_status: string;
  debt: number | null;
  income: number | null;
  expense: number | null;
  employment: string | null;
  housing: string | null;
  vehicle: string | null;
  is_default: boolean | null;
  source: string | null;
  appointment_at: string | null;
  tier: string | null;
  raw: Record<string, string> | null;
  sales_case_id: string | null;
  created_at: string;
};

const STATUS_OPTIONS = [
  "Sin contactar",
  "Contactado",
  "No contesta",
  "Interesado",
  "Negociación",
  "Cita",
  "Ganado",
  "No válido",
  "Perdido",
];

const statusClass = (s: string): string => {
  switch (s) {
    case "Sin contactar":
      return "bg-muted text-muted-foreground border-border";
    case "Contactado":
    case "Interesado":
      return "bg-accent/10 text-accent-deep border-accent/20";
    case "Negociación":
    case "Cita":
      return "bg-primary/10 text-primary border-primary/20";
    case "Ganado":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "No contesta":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "No válido":
    case "Perdido":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const eur = (n: number | null): string =>
  n == null ? "—" : new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const AdminLeads = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, isAdmin, loading } = useAdminAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [loading, session, navigate]);

  const { data: leads = [], refetch } = useQuery({
    queryKey: ["sales-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales_leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as LeadRow[];
    },
    enabled: !!session && isAdmin,
  });

  const handleFile = async (file: File) => {
    if (!session?.user.id) return;
    setImporting(true);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      const parsed: ParsedLead[] = rows.map(mapRowToLead).filter((l) => l.name || l.phone);
      if (!parsed.length) {
        toast.error("No se encontraron leads válidos en el CSV.");
        return;
      }

      // Leads existentes para respetar el estado ya editado y contar nuevos/actualizados.
      const existing = new Map<string, LeadRow>();
      leads.forEach((l) => {
        if (l.external_id) existing.set("id:" + l.external_id, l);
        if (l.phone) existing.set("tel:" + l.phone, l);
      });

      const payload = parsed.map((p) => {
        const prev =
          (p.external_id && existing.get("id:" + p.external_id)) ||
          (p.phone && existing.get("tel:" + p.phone)) ||
          null;
        return {
          ...(prev ? { id: prev.id } : {}),
          external_id: p.external_id,
          name: p.name,
          phone: p.phone,
          email: p.email,
          // Respeta el estado editado manualmente si el lead ya existía.
          lead_status: prev ? prev.lead_status : p.lead_status,
          debt: p.debt,
          income: p.income,
          expense: p.expense,
          employment: p.employment,
          housing: p.housing,
          vehicle: p.vehicle,
          is_default: p.is_default,
          source: p.source,
          appointment_at: p.appointment_at,
          tier: p.tier,
          raw: p.raw as never,
          created_by: session.user.id,
        };
      });

      const news = payload.filter((p) => !("id" in p)).length;
      const updates = payload.length - news;

      const { error } = await supabase
        .from("sales_leads")
        .upsert(payload, { onConflict: "created_by,external_id" });
      if (error) throw error;

      toast.success(`Importación completada: ${news} nuevos, ${updates} actualizados.`);
      refetch();
    } catch (e) {
      console.error(e);
      toast.error("No se pudo importar el CSV.");
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const updateStatus = async (id: string, lead_status: string) => {
    queryClient.setQueryData<LeadRow[]>(["sales-leads"], (prev) =>
      (prev ?? []).map((l) => (l.id === id ? { ...l, lead_status } : l)),
    );
    const { error } = await supabase.from("sales_leads").update({ lead_status }).eq("id", id);
    if (error) {
      toast.error("No se pudo guardar el estado");
      refetch();
    }
  };

  const removeLead = async (id: string) => {
    const { error } = await supabase.from("sales_leads").delete().eq("id", id);
    if (error) {
      toast.error("No se pudo eliminar");
      return;
    }
    refetch();
  };

  const openInVentas = (l: LeadRow) => {
    if (l.phone) window.open(`tel:${l.phone}`, "_self");
    navigate("/admin/ventas", {
      state: {
        lead: {
          id: l.id,
          label: l.name || l.phone || "Lead",
          guide: {
            debtAmount: l.debt ?? undefined,
            monthlyIncome: l.income ?? undefined,
            monthlyExpenses: l.expense ?? undefined,
            employment: mapEmployment(l.employment),
            housing: l.housing ?? "",
            vehicle: l.vehicle ?? "",
            isDefault: l.is_default ?? undefined,
          },
        },
      },
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = leads;
    if (statusFilter !== "todos") list = list.filter((l) => l.lead_status === statusFilter);
    if (q)
      list = list.filter(
        (l) =>
          (l.name || "").toLowerCase().includes(q) ||
          (l.phone || "").toLowerCase().includes(q),
      );
    // "Sin contactar" primero, resto por fecha (ya vienen ordenados desc).
    return [...list].sort((a, b) => {
      const au = a.lead_status === "Sin contactar" ? 0 : 1;
      const bu = b.lead_status === "Sin contactar" ? 0 : 1;
      return au - bu;
    });
  }, [leads, query, statusFilter]);

  const pending = leads.filter((l) => l.lead_status === "Sin contactar").length;

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
        <Seo title="Sin permisos" description="Acceso restringido." robots="noindex,nofollow" canonical="/admin/ventas/leads" />
        <h1 className="font-poppins text-2xl font-semibold text-foreground">Sin permisos de administrador</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:px-6">
      <Seo title="Lista de llamadas" description="Panel interno de Calma." robots="noindex,nofollow" canonical="/admin/ventas/leads" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-2 flex items-center justify-between">
          <Link to="/admin/ventas" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Herramienta de ventas
          </Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Salir
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-poppins text-2xl font-semibold text-foreground">Lista de llamadas</h1>
            <p className="text-sm text-muted-foreground">
              {leads.length} leads · {pending} sin contactar
            </p>
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void handleFile(f);
              }}
            />
            <Button onClick={() => fileRef.current?.click()} disabled={importing}>
              <Upload className="mr-2 h-4 w-4" />
              {importing ? "Importando…" : "Subir CSV"}
            </Button>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre o teléfono…"
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <Card className="p-10 text-center text-sm text-muted-foreground">
            {leads.length === 0
              ? "Aún no hay leads. Sube un CSV para empezar a llamar."
              : "No hay leads que coincidan con el filtro."}
          </Card>
        ) : (
          <div className="space-y-2">
            {filtered.map((l) => (
              <Card key={l.id} className="flex flex-wrap items-center gap-3 p-3">
                <div className="min-w-[160px] flex-1">
                  <div className="font-medium text-foreground">{l.name || "Sin nombre"}</div>
                  <div className="text-xs text-muted-foreground">
                    {l.phone || "Sin teléfono"}
                    {l.source ? ` · ${l.source}` : ""}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Deuda <span className="font-medium text-foreground">{eur(l.debt)}</span>
                  {l.is_default ? <span className="ml-2 text-destructive">impago</span> : null}
                </div>

                {l.appointment_at ? (
                  <Badge variant="outline" className="bg-primary/5 text-xs text-primary">
                    Cita: {l.appointment_at}
                  </Badge>
                ) : null}

                <Select value={l.lead_status} onValueChange={(v) => void updateStatus(l.id, v)}>
                  <SelectTrigger className={`h-8 w-[150px] text-xs ${statusClass(l.lead_status)}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-1">
                  <Button size="sm" onClick={() => openInVentas(l)} disabled={!l.phone && !l.name}>
                    <Phone className="mr-1.5 h-3.5 w-3.5" /> Llamar
                  </Button>
                  {l.phone ? (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => {
                        navigator.clipboard.writeText(l.phone!);
                        toast.success("Teléfono copiado");
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  ) : null}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => void removeLead(l.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
