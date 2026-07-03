import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  ArrowLeft,
  Upload,
  Phone,
  Copy,
  LogOut,
  Search,
  Trash2,
  Play,
  Pause,
  SkipForward,
  Timer,
  Layers,
  ChevronRight,
} from "lucide-react";
import Seo from "@/components/seo/Seo";
import {
  parseCsv,
  mapRowToLead,
  mapEmployment,
  ZOHO_LEAD_STATUSES,
  PENDING_STATUSES,
  statusTone,
  type ParsedLead,
} from "@/lib/leadsCsv";
import { syncLeadToZoho, syncLeadDetailed, recordSyncStatus } from "@/lib/zohoSync";
import { buildZohoLeadFields } from "@/lib/zohoSync";
import { RefreshCw, CheckCircle2, AlertCircle, Clock, Zap, ChevronDown } from "lucide-react";
import { StatusCombobox } from "@/components/ventas/StatusCombobox";
import { CalendarClock } from "lucide-react";

type LeadRow = {
  id: string;
  batch_id: string | null;
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
  zoho_sync_status: string | null;
  zoho_synced_at: string | null;
  zoho_sync_error: string | null;
};

type BatchRow = {
  id: string;
  name: string;
  lead_count: number;
  created_at: string;
};

const eur = (n: number | null): string =>
  n == null ? "—" : new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

const fmtTime = (s: number): string => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
};

// Convierte un valor guardado (ISO o texto de Zoho) al formato que espera
// <input type="datetime-local"> => "YYYY-MM-DDTHH:mm".
const toLocalInput = (v: string | null): string => {
  if (!v) return "";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

// Convierte el valor del input local a ISO 8601 con offset (formato Zoho datetime).
const toZohoDateTime = (local: string): string => {
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  const off = -d.getTimezoneOffset();
  const sign = off >= 0 ? "+" : "-";
  const oh = pad(Math.floor(Math.abs(off) / 60));
  const om = pad(Math.abs(off) % 60);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00${sign}${oh}:${om}`;
};

// Muestra la fecha/hora de la cita de forma legible.
const fmtAppointment = (v: string | null): string => {
  if (!v) return "";
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return v;
  return d.toLocaleString("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
};

const isPending = (s: string) => PENDING_STATUSES.includes(s);

// Indicador compacto del estado de sincronización con Zoho (estilo Zapier).
const SyncChip = ({
  status,
  hasZoho,
  syncing,
}: {
  status: string | null;
  hasZoho: boolean;
  syncing: boolean;
}) => {
  if (syncing)
    return <RefreshCw className="h-4 w-4 shrink-0 animate-spin text-primary" aria-label="Sincronizando" />;
  if (!hasZoho)
    return <Clock className="h-4 w-4 shrink-0 text-muted-foreground/40" aria-label="No sincronizable" />;
  if (status === "ok")
    return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-label="Sincronizado" />;
  if (status === "error")
    return <AlertCircle className="h-4 w-4 shrink-0 text-destructive" aria-label="Error de sincronización" />;
  return <Clock className="h-4 w-4 shrink-0 text-muted-foreground" aria-label="Pendiente de sincronizar" />;
};

const AdminLeads = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, isAdmin, loading } = useAdminAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [importing, setImporting] = useState(false);

  // Borrador del temporizador guardado: al volver desde /ventas se restaura el
  // paquete activo y el tiempo transcurrido en lugar de reiniciarse.
  const savedTimer = useMemo(() => {
    try {
      const raw = localStorage.getItem(TIMER_KEY);
      return raw ? (JSON.parse(raw) as TimerDraft) : null;
    } catch {
      return null;
    }
  }, []);

  // Navegación entre "paquetes" y modo blitz.
  const [activeBatch, setActiveBatch] = useState<string | null>(savedTimer?.activeBatch ?? null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [expandedSync, setExpandedSync] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<Record<string, boolean>>({});

  // Temporizadores.
  const [running, setRunning] = useState(savedTimer?.running ?? true);
  const [batchSecs, setBatchSecs] = useState(() => {
    if (!savedTimer) return 0;
    let secs = savedTimer.batchSecs ?? 0;
    // Suma el tiempo transcurrido mientras estábamos fuera si seguía corriendo.
    if (savedTimer.running && savedTimer.savedAt) {
      secs += Math.max(0, Math.floor((Date.now() - savedTimer.savedAt) / 1000));
    }
    return secs;
  });
  const [callSecs, setCallSecs] = useState(savedTimer?.callSecs ?? 0);

  // Persiste el temporizador ante cualquier cambio (o lo limpia al salir).
  useEffect(() => {
    try {
      if (activeBatch) {
        localStorage.setItem(
          TIMER_KEY,
          JSON.stringify({ activeBatch, batchSecs, callSecs, running, savedAt: Date.now() }),
        );
      } else {
        localStorage.removeItem(TIMER_KEY);
      }
    } catch {
      /* almacenamiento no disponible */
    }
  }, [activeBatch, batchSecs, callSecs, running]);

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [loading, session, navigate]);

  const { data: batches = [], refetch: refetchBatches } = useQuery({
    queryKey: ["sales-lead-batches"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales_lead_batches")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as BatchRow[];
    },
    enabled: !!session && isAdmin,
  });

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

  // Ticks de los temporizadores mientras estamos en un paquete y no en pausa.
  useEffect(() => {
    if (!activeBatch || !running) return;
    const t = setInterval(() => {
      setBatchSecs((s) => s + 1);
      setCallSecs((s) => s + 1);
    }, 1000);
    return () => clearInterval(t);
  }, [activeBatch, running]);

  const handleFile = async (file: File) => {
    if (!session?.user.id) return;
    setImporting(true);
    try {
      const text = await file.text();
      const rows = parseCsv(text);
      const parsedAll: ParsedLead[] = rows.map(mapRowToLead).filter((l) => l.name || l.phone);
      // Dedupe dentro del mismo CSV (por external_id o teléfono).
      const seen = new Set<string>();
      const parsed = parsedAll.filter((p) => {
        const key = (p.external_id && "id:" + p.external_id) || (p.phone && "tel:" + p.phone) || "n:" + Math.random();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      if (!parsed.length) {
        toast.error("No se encontraron leads válidos en el CSV.");
        return;
      }

      const batchName = file.name.replace(/\.csv$/i, "").trim() || "Paquete";
      const { data: batch, error: batchErr } = await supabase
        .from("sales_lead_batches")
        .insert([{ name: batchName, lead_count: parsed.length, created_by: session.user.id }])
        .select("id")
        .single();
      if (batchErr) throw batchErr;

      const payload = parsed.map((p) => ({
        batch_id: batch.id,
        external_id: p.external_id,
        name: p.name,
        phone: p.phone,
        email: p.email,
        lead_status: p.lead_status,
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
      }));

      const { error } = await supabase.from("sales_leads").insert(payload);
      if (error) throw error;

      toast.success(`Paquete "${batchName}" creado con ${parsed.length} leads.`);
      refetch();
      refetchBatches();
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
      return;
    }
    // Refleja el estado en Zoho CRM si el lead viene de allí (external_id).
    const lead = (leads ?? []).find((l) => l.id === id);
    if (lead?.external_id) {
      const result = await syncLeadDetailed(lead.external_id, { Lead_Status: lead_status });
      await recordSyncStatus(id, result);
      if (!result.ok) toast.warning("Estado guardado, pero no se pudo sincronizar con Zoho");
      refetch();
    }
  };

  // Guarda la fecha/hora de la cita y la sincroniza con Zoho (campo Fecha_hora_cita).
  const updateAppointment = async (id: string, localValue: string) => {
    const iso = localValue ? new Date(localValue).toISOString() : null;
    queryClient.setQueryData<LeadRow[]>(["sales-leads"], (prev) =>
      (prev ?? []).map((l) => (l.id === id ? { ...l, appointment_at: iso } : l)),
    );
    const { error } = await supabase.from("sales_leads").update({ appointment_at: iso }).eq("id", id);
    if (error) {
      toast.error("No se pudo guardar la fecha de la cita");
      refetch();
      return;
    }
    const lead = (leads ?? []).find((l) => l.id === id);
    if (lead?.external_id) {
      const zohoDate = localValue ? toZohoDateTime(localValue) : "";
      const result = await syncLeadDetailed(lead.external_id, { Fecha_hora_cita: zohoDate });
      await recordSyncStatus(id, result);
      if (!result.ok) toast.warning("Cita guardada, pero no se pudo sincronizar con Zoho");
      refetch();
    } else {
      toast.success("Fecha de la cita guardada");
    }
  };

  // Construye todos los campos económicos + estado desde la fila del lead.
  const buildLeadFields = (l: LeadRow) =>
    buildZohoLeadFields({
      debtTotal: l.debt,
      income: l.income,
      expenses: l.expense,
      employment: l.employment,
      housing: l.housing,
      vehicle: l.vehicle,
      isDefault: l.is_default,
    });

  // Sincronización manual (botón "Sincronizar ahora" tipo Zapier).
  const syncLeadNow = async (l: LeadRow) => {
    if (!l.external_id) {
      toast.error("Este lead no viene de Zoho (sin external_id), no se puede sincronizar");
      return;
    }
    setSyncing((p) => ({ ...p, [l.id]: true }));
    const fields = { Lead_Status: l.lead_status, ...buildLeadFields(l) };
    const result = await syncLeadDetailed(l.external_id, fields);
    await recordSyncStatus(l.id, result);
    setSyncing((p) => ({ ...p, [l.id]: false }));
    if (result.ok) toast.success(`Sincronizado con Zoho (${result.fieldCount} campos)`);
    else toast.error(`No se pudo sincronizar: ${result.error}`);
    refetch();
  };

  const removeLead = async (id: string) => {
    const { error } = await supabase.from("sales_leads").delete().eq("id", id);
    if (error) {
      toast.error("No se pudo eliminar");
      return;
    }
    refetch();
  };

  const removeBatch = async (b: BatchRow) => {
    if (!confirm(`¿Eliminar el paquete "${b.name}" y todos sus leads?`)) return;
    await supabase.from("sales_leads").delete().eq("batch_id", b.id);
    const { error } = await supabase.from("sales_lead_batches").delete().eq("id", b.id);
    if (error) {
      toast.error("No se pudo eliminar el paquete");
      return;
    }
    if (activeBatch === b.id) setActiveBatch(null);
    refetch();
    refetchBatches();
  };

  const openInVentas = (l: LeadRow) => {
    navigate("/admin/ventas", {
      state: {
        lead: {
          id: l.id,
          external_id: l.external_id,
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

  // Leads del paquete activo.
  const batchLeads = useMemo(
    () => leads.filter((l) => l.batch_id === activeBatch),
    [leads, activeBatch],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = batchLeads;
    if (statusFilter !== "todos") list = list.filter((l) => l.lead_status === statusFilter);
    if (q)
      list = list.filter(
        (l) =>
          (l.name || "").toLowerCase().includes(q) ||
          (l.phone || "").toLowerCase().includes(q),
      );
    // Pendientes primero.
    return [...list].sort((a, b) => Number(!isPending(a.lead_status)) - Number(!isPending(b.lead_status)));
  }, [batchLeads, query, statusFilter]);

  const current = filtered[currentIdx] ?? null;

  const enterBatch = (id: string) => {
    setActiveBatch(id);
    setCurrentIdx(0);
    setQuery("");
    setStatusFilter("todos");
    setBatchSecs(0);
    setCallSecs(0);
    setRunning(true);
  };

  const nextLead = () => {
    setCallSecs(0);
    setCurrentIdx((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
  };
  const prevLead = () => {
    setCallSecs(0);
    setCurrentIdx((i) => Math.max(i - 1, 0));
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
        <Seo title="Sin permisos" description="Acceso restringido." robots="noindex,nofollow" canonical="/admin/ventas/leads" />
        <h1 className="font-poppins text-2xl font-semibold text-foreground">Sin permisos de administrador</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </Button>
      </div>
    );
  }

  const activeBatchRow = batches.find((b) => b.id === activeBatch) ?? null;

  // ============= Vista de paquetes =============
  if (!activeBatch) {
    return (
      <div className="min-h-screen bg-background px-4 py-8 sm:px-6">
        <Seo title="Paquetes de llamadas" description="Panel interno de Calma." robots="noindex,nofollow" canonical="/admin/ventas/leads" />
        <div className="mx-auto max-w-4xl">
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
              <h1 className="font-poppins text-2xl font-semibold text-foreground">Paquetes de llamadas</h1>
              <p className="text-sm text-muted-foreground">
                {batches.length} paquetes · sube un CSV para crear uno nuevo
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
                {importing ? "Importando…" : "Nuevo paquete (CSV)"}
              </Button>
            </div>
          </div>

          {batches.length === 0 ? (
            <Card className="p-10 text-center text-sm text-muted-foreground">
              Aún no hay paquetes. Sube un CSV para empezar a llamar.
            </Card>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {batches.map((b) => {
                const bl = leads.filter((l) => l.batch_id === b.id);
                const total = bl.length || b.lead_count;
                const done = bl.filter((l) => !isPending(l.lead_status)).length;
                const pct = total ? Math.round((done / total) * 100) : 0;
                return (
                  <Card key={b.id} className="flex flex-col gap-3 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-primary" />
                        <div className="font-medium text-foreground">{b.name}</div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => void removeBatch(b)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {done}/{total} gestionados · {new Date(b.created_at).toLocaleDateString("es-ES")}
                    </div>
                    <Progress value={pct} className="h-1.5" />
                    <Button className="mt-1 w-full" onClick={() => enterBatch(b.id)} disabled={total === 0}>
                      <Play className="mr-2 h-4 w-4" /> Empezar a llamar
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ============= Modo blitz (paquete activo) =============
  const doneCount = batchLeads.filter((l) => !isPending(l.lead_status)).length;
  const totalCount = batchLeads.length;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Llamadas en curso" description="Panel interno de Calma." robots="noindex,nofollow" canonical="/admin/ventas/leads" />

      {/* Barra superior con temporizadores */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => setActiveBatch(null)}>
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Paquetes
          </Button>
          <div className="min-w-0 flex-1">
            <div className="truncate font-medium text-foreground">{activeBatchRow?.name}</div>
            <div className="text-xs text-muted-foreground">
              {doneCount}/{totalCount} gestionados · {pct}%
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg border border-border px-2.5 py-1 text-center">
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Paquete</div>
              <div className="font-mono text-sm font-semibold text-foreground">{fmtTime(batchSecs)}</div>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 px-2.5 py-1 text-center">
              <div className="text-[10px] uppercase tracking-wide text-primary">Llamada</div>
              <div className="font-mono text-sm font-semibold text-primary">{fmtTime(callSecs)}</div>
            </div>
            <Button size="icon" variant="outline" className="h-9 w-9" onClick={() => setRunning((r) => !r)}>
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <Progress value={pct} className="h-1 rounded-none" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Tarjeta del lead actual */}
        {current ? (
          <Card className="mb-6 p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">
                  Lead {currentIdx + 1} de {filtered.length}
                </div>
                <div className="mt-0.5 font-poppins text-2xl font-semibold text-foreground">
                  {current.name || "Sin nombre"}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {current.phone || "Sin teléfono"}
                  {current.source ? ` · ${current.source}` : ""}
                </div>
              </div>
              {current.appointment_at ? (
                <Badge variant="outline" className="bg-primary/5 text-primary">
                  <CalendarClock className="mr-1 h-3 w-3" /> {fmtAppointment(current.appointment_at)}
                </Badge>
              ) : null}
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <div>
                <div className="text-xs text-muted-foreground">Deuda</div>
                <div className="font-medium text-foreground">
                  {eur(current.debt)}
                  {current.is_default ? <span className="ml-1 text-destructive">· impago</span> : null}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Ingresos</div>
                <div className="font-medium text-foreground">{eur(current.income)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Gastos</div>
                <div className="font-medium text-foreground">{eur(current.expense)}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Laboral</div>
                <div className="font-medium text-foreground">{current.employment || "—"}</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {current.phone ? (
                <Button
                  size="lg"
                  onClick={() => {
                    setCallSecs(0);
                    window.open(`tel:${current.phone}`, "_self");
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" /> Llamar
                </Button>
              ) : null}
              <Button size="lg" variant="outline" onClick={() => openInVentas(current)}>
                Abrir en ventas
              </Button>
              {current.phone ? (
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-11 w-11"
                  onClick={() => {
                    navigator.clipboard.writeText(current.phone!);
                    toast.success("Teléfono copiado");
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              ) : null}

              <div className="ml-auto flex flex-col items-end gap-2">
                <StatusCombobox
                  value={current.lead_status}
                  options={ZOHO_LEAD_STATUSES}
                  onChange={(v) => void updateStatus(current.id, v)}
                  triggerClassName={`h-11 w-[210px] ${statusTone(current.lead_status)}`}
                />
                {/* Fecha/hora de la reunión agendada — debajo del estado */}
                <div className="flex items-center gap-1.5 rounded-md border border-border px-2 py-1">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  <Input
                    type="datetime-local"
                    value={toLocalInput(current.appointment_at)}
                    onChange={(e) => void updateAppointment(current.id, e.target.value)}
                    className="h-8 w-[190px] border-0 p-0 text-sm shadow-none focus-visible:ring-0"
                    aria-label="Fecha y hora de la reunión"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <Button variant="ghost" onClick={prevLead} disabled={currentIdx === 0}>
                <ArrowLeft className="mr-1.5 h-4 w-4" /> Anterior
              </Button>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Timer className="h-3.5 w-3.5" /> Llamada: {fmtTime(callSecs)}
              </div>
              <Button onClick={nextLead} disabled={currentIdx >= filtered.length - 1}>
                Siguiente lead <SkipForward className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="mb-6 p-10 text-center text-sm text-muted-foreground">
            No hay leads que coincidan con el filtro en este paquete.
          </Card>
        )}

        {/* Filtros + lista completa del paquete */}
        <div className="mb-3 flex flex-wrap gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentIdx(0);
              }}
              placeholder="Buscar por nombre o teléfono…"
              className="pl-9"
            />
          </div>
          <StatusCombobox
            value={statusFilter}
            options={ZOHO_LEAD_STATUSES}
            includeAll
            onChange={(v) => {
              setStatusFilter(v);
              setCurrentIdx(0);
            }}
            triggerClassName="w-[200px]"
          />
        </div>

        <div className="space-y-1.5">
          {filtered.map((l, idx) => {
            const open = expandedSync === l.id;
            const isSyncing = !!syncing[l.id];
            const hasZoho = !!l.external_id;
            return (
              <div
                key={l.id}
                className={`rounded-lg border transition-colors ${
                  idx === currentIdx ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3 p-2.5">
                  <button
                    onClick={() => {
                      setCurrentIdx(idx);
                      setCallSecs(0);
                    }}
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground">{l.name || "Sin nombre"}</div>
                      <div className="truncate text-xs text-muted-foreground">{l.phone || "Sin teléfono"}</div>
                    </div>
                    <div className="hidden text-xs text-muted-foreground sm:block">{eur(l.debt)}</div>
                    <Badge variant="outline" className={`text-[10px] ${statusTone(l.lead_status)}`}>
                      {l.lead_status}
                    </Badge>
                  </button>
                  <SyncChip status={l.zoho_sync_status} hasZoho={hasZoho} syncing={isSyncing} />
                  <button
                    onClick={() => setExpandedSync(open ? null : l.id)}
                    title="Ver sincronización"
                    className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  <Trash2
                    className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      void removeLead(l.id);
                    }}
                  />
                </div>
                {open && (
                  <div className="border-t border-border/60 bg-muted/30 px-3 py-3">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                      <Zap className="h-3.5 w-3.5 text-primary" />
                      Sincronización con Zoho CRM
                    </div>
                    <div className="mt-2 flex flex-wrap items-stretch gap-2 text-xs">
                      <div className="flex-1 rounded-md border border-border bg-background p-2">
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Disparador</div>
                        <div className="mt-0.5 font-medium text-foreground">Cambio en Calma</div>
                        <div className="text-[11px] text-muted-foreground">Estado o datos del lead</div>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                      <div className="flex-1 rounded-md border border-border bg-background p-2">
                        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Acción</div>
                        <div className="mt-0.5 font-medium text-foreground">Actualizar Lead en Zoho</div>
                        <div className="text-[11px] text-muted-foreground">
                          {hasZoho ? `ID ${l.external_id}` : "Sin external_id"}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="text-[11px] text-muted-foreground">
                        {l.zoho_synced_at ? (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Última: {new Date(l.zoho_synced_at).toLocaleString("es-ES")}
                          </span>
                        ) : (
                          "Nunca sincronizado"
                        )}
                        {l.zoho_sync_status === "error" && l.zoho_sync_error && (
                          <span className="mt-1 block text-destructive">⚠ {l.zoho_sync_error}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={!hasZoho || isSyncing}
                        onClick={() => void syncLeadNow(l)}
                        className="h-7 gap-1.5 text-xs"
                      >
                        <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                        {isSyncing ? "Sincronizando…" : "Sincronizar ahora"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminLeads;
