import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  ArrowRight,
  Copy,
  Loader2,
  Plus,
  Sparkles,
  Save,
  ClipboardList,
  Trash2,
} from "lucide-react";
import Seo from "@/components/seo/Seo";

type Housing = "" | "propiedad" | "hipoteca" | "alquiler";
type Vehicle = "" | "propiedad" | "financiado" | "no";
type Employment =
  | ""
  | "empleado_indefinido"
  | "empleado_temporal"
  | "autonomo"
  | "desempleado"
  | "pension"
  | "otros";

type DebtEntry = {
  type: string;
  entity: string;
  amount?: number;
};

type GuideFields = {
  debtAmount?: number;
  isDefault?: boolean;
  entities: string[];
  debts: DebtEntry[];
  housing: Housing;
  housingValue?: number;
  mortgagePaid?: number;
  mortgageRemaining?: number;
  vehicle: Vehicle;
  vehicleValue?: number;
  vehiclePaid?: number;
  vehicleRemaining?: number;
  employment?: Employment;
  monthlyIncome?: number;
};

type ScriptCard = { emoji: string; title: string; body: string };

type AiResult = {
  triage: { solution: string; title: string };
  diagnosis_internal: ScriptCard[];
  diagnosis_client: string;
  solution_internal: ScriptCard[];
  solution_client: string;
};

type SalesCaseRow = {
  id: string;
  label: string;
  case_text: string;
  guide_fields: GuideFields;
  triage_solution: string | null;
  triage_title: string | null;
  diagnosis_internal: string | null;
  diagnosis_client: string | null;
  solution_internal: string | null;
  solution_client: string | null;
  created_at: string;
};

const ENTITY_OPTIONS = [
  { value: "prestamos", label: "Préstamos" },
  { value: "tarjetas", label: "Tarjetas / revolving" },
  { value: "microcreditos", label: "Microcréditos" },
  { value: "hacienda", label: "Hacienda / Seguridad Social" },
  { value: "hipoteca", label: "Hipoteca" },
  { value: "otros", label: "Otros" },
];

const EMPLOYMENT_OPTIONS: { value: Employment; label: string }[] = [
  { value: "empleado_indefinido", label: "Empleado/a (indefinido)" },
  { value: "empleado_temporal", label: "Empleado/a (temporal)" },
  { value: "autonomo", label: "Autónomo/a" },
  { value: "desempleado", label: "Desempleado/a" },
  { value: "pension", label: "Pensionista" },
  { value: "otros", label: "Otros" },
];

const emptyGuide = (): GuideFields => ({
  entities: [],
  debts: [],
  housing: "",
  vehicle: "",
});

const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Copiado al portapapeles");
  } catch {
    toast.error("No se pudo copiar");
  }
};

const fetchCases = async (): Promise<SalesCaseRow[]> => {
  const { data, error } = await supabase
    .from("sales_cases")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data as unknown as SalesCaseRow[]) ?? [];
};

const formatDate = (iso: string): string => {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const cardsToText = (cards: ScriptCard[]): string =>
  cards.map((c) => `${c.emoji} ${c.title}\n${c.body}`).join("\n\n");

type ResultBlockProps = {
  internal: ScriptCard[];
  client: string;
  tone?: "alert" | "calm";
};

const ResultBlock = ({ internal, client, tone = "calm" }: ResultBlockProps) => {
  const isAlert = tone === "alert";
  return (
    <Tabs defaultValue="internal" className="w-full">
      <TabsList>
        <TabsTrigger value="internal">Guion comercial</TabsTrigger>
        <TabsTrigger value="client">Para el cliente</TabsTrigger>
      </TabsList>
      <TabsContent value="internal">
        <div className="space-y-3">
          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => copyText(cardsToText(internal))}
            >
              <Copy className="mr-1 h-3.5 w-3.5" /> Copiar todo
            </Button>
          </div>
          {internal.length === 0 && (
            <p className="text-sm text-muted-foreground">—</p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            {internal.map((card, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 ${
                  isAlert
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-accent/30 bg-accent/5"
                }`}
              >
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-xl leading-none">{card.emoji}</span>
                  <h3
                    className={`font-poppins text-sm font-bold ${
                      isAlert ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {card.title}
                  </h3>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="client">
        <div className="relative">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="absolute right-0 top-0"
            onClick={() => copyText(client)}
          >
            <Copy className="mr-1 h-3.5 w-3.5" /> Copiar
          </Button>
          <p className="whitespace-pre-wrap pr-24 text-sm leading-relaxed text-foreground">
            {client || "—"}
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

const STEPS = ["Cualificación", "Diagnóstico", "Solución"] as const;

const AdminVentas = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, isAdmin, loading } = useAdminAuth();

  const [step, setStep] = useState(0);
  const [label, setLabel] = useState("");
  const [caseText, setCaseText] = useState("");
  const [guide, setGuide] = useState<GuideFields>(emptyGuide());
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [result, setResult] = useState<AiResult | null>(null);

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [session, loading, navigate]);

  const { data: cases } = useQuery({
    queryKey: ["sales-cases"],
    queryFn: fetchCases,
    enabled: !!session && isAdmin,
  });

  const resetForm = () => {
    setStep(0);
    setLabel("");
    setCaseText("");
    setGuide(emptyGuide());
    setResult(null);
    setSavedId(null);
  };

  const addDebt = () =>
    setGuide((g) => ({
      ...g,
      debts: [...g.debts, { type: "prestamos", entity: "", amount: undefined }],
    }));

  const updateDebt = (idx: number, patch: Partial<DebtEntry>) =>
    setGuide((g) => ({
      ...g,
      debts: g.debts.map((d, i) => (i === idx ? { ...d, ...patch } : d)),
    }));

  const removeDebt = (idx: number) =>
    setGuide((g) => ({ ...g, debts: g.debts.filter((_, i) => i !== idx) }));

  const debtsTotal = guide.debts.reduce((sum, d) => sum + (d.amount ?? 0), 0);

  const generate = async () => {
    if (caseText.trim().length < 10) {
      toast.error("Describe el caso (mínimo 10 caracteres).");
      return;
    }
    setGenerating(true);
    setResult(null);
    try {
      const derivedEntities = Array.from(
        new Set(guide.debts.map((d) => d.type).filter(Boolean)),
      );
      const payloadGuide: GuideFields = {
        ...guide,
        entities: derivedEntities.length ? derivedEntities : guide.entities,
        debtAmount: debtsTotal > 0 ? debtsTotal : guide.debtAmount,
      };
      const { data, error } = await supabase.functions.invoke("sales-diagnosis", {
        body: { caseText: caseText.trim(), guide: payloadGuide },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setResult(data as AiResult);
      setSavedId(null);
      setStep(1);
    } catch (e) {
      toast.error("No se pudo generar el diagnóstico. Inténtalo de nuevo.");
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const saveCase = async () => {
    if (!result) return;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from("sales_cases")
        .insert([{
          label: label.trim() || `Caso ${new Date().toLocaleDateString("es-ES")}`,
          case_text: caseText.trim(),
          guide_fields: {
            ...guide,
            entities: Array.from(
              new Set(guide.debts.map((d) => d.type).filter(Boolean)),
            ),
            debtAmount: debtsTotal > 0 ? debtsTotal : guide.debtAmount,
          } as never,
          triage_solution: result.triage.solution,
          triage_title: result.triage.title,
          diagnosis_internal: result.diagnosis_internal,
          diagnosis_client: result.diagnosis_client,
          solution_internal: result.solution_internal,
          solution_client: result.solution_client,
          created_by: session?.user.id ?? null,
        }])
        .select("id")
        .single();
      if (error) throw error;
      setSavedId(data.id);
      toast.success("Caso guardado en el historial");
      queryClient.invalidateQueries({ queryKey: ["sales-cases"] });
    } catch (e) {
      toast.error("No se pudo guardar el caso.");
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const openCase = (c: SalesCaseRow) => {
    setLabel(c.label);
    setCaseText(c.case_text);
    setGuide({ ...emptyGuide(), ...(c.guide_fields || {}) });
    setResult({
      triage: { solution: c.triage_solution ?? "", title: c.triage_title ?? "" },
      diagnosis_internal: c.diagnosis_internal ?? "",
      diagnosis_client: c.diagnosis_client ?? "",
      solution_internal: c.solution_internal ?? "",
      solution_client: c.solution_client ?? "",
    });
    setSavedId(c.id);
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <p className="text-muted-foreground">Acceso solo para administradores.</p>
        <Link to="/admin/auth" className="text-accent underline">
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <Seo
        title="Ventas · Diagnóstico"
        description="Herramienta interna de ventas"
        canonical="/admin/ventas"
        robots="noindex,nofollow"
      />
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="font-poppins text-2xl font-bold text-foreground">
              Herramienta de ventas
            </h1>
            <p className="text-sm text-muted-foreground">
              Cualificación → Diagnóstico → Solución
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={resetForm}>
              <Plus className="mr-1 h-4 w-4" /> Nuevo caso
            </Button>
            <Link to="/admin">
              <Button variant="ghost" size="sm">
                Panel
              </Button>
            </Link>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-6 flex items-center gap-2">
          {STEPS.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => (i === 0 || result) && setStep(i)}
              disabled={i > 0 && !result}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                step === i
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              } ${i > 0 && !result ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {i + 1}. {s}
            </button>
          ))}
        </div>

        {/* Step 1: Cualificación */}
        {step === 0 && (
          <Card className="space-y-5 p-6">
            <div className="space-y-2">
              <Label htmlFor="label">Etiqueta del caso</Label>
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ej. María · revolving 12.000€"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caseText">Caso de la persona</Label>
              <Textarea
                id="caseText"
                value={caseText}
                onChange={(e) => setCaseText(e.target.value)}
                placeholder="Escribe o pega aquí la situación de la persona: deudas, qué le preocupa, su situación familiar y económica..."
                className="min-h-[160px]"
              />
            </div>

            {/* Deudas por entidad */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Deudas por entidad</Label>
                <Button type="button" variant="outline" size="sm" onClick={addDebt}>
                  <Plus className="mr-1 h-4 w-4" /> Añadir entidad
                </Button>
              </div>
              {guide.debts.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Añade cada entidad con su tipo y el importe que se le debe.
                </p>
              )}
              <div className="space-y-3">
                {guide.debts.map((d, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 gap-2 rounded-lg border border-border p-3 sm:grid-cols-[1fr_1fr_auto]"
                  >
                    <div className="space-y-1">
                      <Select
                        value={d.type}
                        onValueChange={(v) => updateDebt(i, { type: v })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de deuda" />
                        </SelectTrigger>
                        <SelectContent>
                          {ENTITY_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={d.entity}
                        onChange={(e) => updateDebt(i, { entity: e.target.value })}
                        placeholder="Entidad (ej. WiZink, Cetelem...)"
                      />
                    </div>
                    <Input
                      type="number"
                      value={d.amount ?? ""}
                      onChange={(e) =>
                        updateDebt(i, {
                          amount: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      placeholder="Importe (€)"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDebt(i)}
                      aria-label="Eliminar entidad"
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
              {guide.debts.length > 0 && (
                <p className="text-sm font-semibold text-foreground">
                  Deuda total: {debtsTotal.toLocaleString("es-ES")} €
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="income">Ingresos mensuales (€)</Label>
                <Input
                  id="income"
                  type="number"
                  value={guide.monthlyIncome ?? ""}
                  onChange={(e) =>
                    setGuide((g) => ({
                      ...g,
                      monthlyIncome: e.target.value ? Number(e.target.value) : undefined,
                    }))
                  }
                  placeholder="1200"
                />
              </div>
              <div className="space-y-2">
                <Label>Situación laboral</Label>
                <Select
                  value={guide.employment ?? ""}
                  onValueChange={(v) =>
                    setGuide((g) => ({ ...g, employment: v as Employment }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    {EMPLOYMENT_OPTIONS.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>¿Está en impago?</Label>
              <div className="flex gap-2">
                {[
                  { v: true, l: "Sí" },
                  { v: false, l: "No" },
                ].map((o) => (
                  <Button
                    key={o.l}
                    type="button"
                    variant={guide.isDefault === o.v ? "default" : "outline"}
                    size="sm"
                    onClick={() => setGuide((g) => ({ ...g, isDefault: o.v }))}
                  >
                    {o.l}
                  </Button>
                ))}
              </div>
            </div>

            {/* Vivienda */}
            <div className="space-y-3 rounded-lg border border-border p-3">
              <Label>Vivienda</Label>
              <div className="flex flex-wrap gap-2">
                {(["propiedad", "hipoteca", "alquiler"] as const).map((h) => (
                  <Button
                    key={h}
                    type="button"
                    variant={guide.housing === h ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setGuide((g) => ({ ...g, housing: g.housing === h ? "" : h }))
                    }
                  >
                    {h}
                  </Button>
                ))}
              </div>
              {(guide.housing === "propiedad" || guide.housing === "hipoteca") && (
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Valor estimado (€)</Label>
                    <Input
                      type="number"
                      value={guide.housingValue ?? ""}
                      onChange={(e) =>
                        setGuide((g) => ({
                          ...g,
                          housingValue: e.target.value ? Number(e.target.value) : undefined,
                        }))
                      }
                      placeholder="180000"
                    />
                  </div>
                  {guide.housing === "hipoteca" && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-xs">Pagado (€)</Label>
                        <Input
                          type="number"
                          value={guide.mortgagePaid ?? ""}
                          onChange={(e) =>
                            setGuide((g) => ({
                              ...g,
                              mortgagePaid: e.target.value ? Number(e.target.value) : undefined,
                            }))
                          }
                          placeholder="40000"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Pendiente (€)</Label>
                        <Input
                          type="number"
                          value={guide.mortgageRemaining ?? ""}
                          onChange={(e) =>
                            setGuide((g) => ({
                              ...g,
                              mortgageRemaining: e.target.value ? Number(e.target.value) : undefined,
                            }))
                          }
                          placeholder="120000"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Vehículo */}
            <div className="space-y-3 rounded-lg border border-border p-3">
              <Label>Vehículo</Label>
              <div className="flex flex-wrap gap-2">
                {(["propiedad", "financiado", "no"] as const).map((v) => (
                  <Button
                    key={v}
                    type="button"
                    variant={guide.vehicle === v ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setGuide((g) => ({ ...g, vehicle: g.vehicle === v ? "" : v }))
                    }
                  >
                    {v}
                  </Button>
                ))}
              </div>
              {(guide.vehicle === "propiedad" || guide.vehicle === "financiado") && (
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Valor estimado (€)</Label>
                    <Input
                      type="number"
                      value={guide.vehicleValue ?? ""}
                      onChange={(e) =>
                        setGuide((g) => ({
                          ...g,
                          vehicleValue: e.target.value ? Number(e.target.value) : undefined,
                        }))
                      }
                      placeholder="9000"
                    />
                  </div>
                  {guide.vehicle === "financiado" && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-xs">Pagado (€)</Label>
                        <Input
                          type="number"
                          value={guide.vehiclePaid ?? ""}
                          onChange={(e) =>
                            setGuide((g) => ({
                              ...g,
                              vehiclePaid: e.target.value ? Number(e.target.value) : undefined,
                            }))
                          }
                          placeholder="3000"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Pendiente (€)</Label>
                        <Input
                          type="number"
                          value={guide.vehicleRemaining ?? ""}
                          onChange={(e) =>
                            setGuide((g) => ({
                              ...g,
                              vehicleRemaining: e.target.value ? Number(e.target.value) : undefined,
                            }))
                          }
                          placeholder="6000"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            <Button onClick={generate} disabled={generating} className="w-full">
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Generar diagnóstico
                </>
              )}
            </Button>
          </Card>
        )}

        {/* Step 2: Diagnóstico */}
        {step === 1 && result && (
          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-poppins text-lg font-bold text-foreground">
                Diagnóstico · consecuencias de no actuar
              </h2>
              <Badge variant="secondary">{result.triage.title}</Badge>
            </div>
            <ResultBlock
              internal={result.diagnosis_internal}
              client={result.diagnosis_client}
            />
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(0)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Editar caso
              </Button>
              <Button onClick={() => setStep(2)}>
                Ver solución <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Solución */}
        {step === 2 && result && (
          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-poppins text-lg font-bold text-foreground">
                Solución · {result.triage.title}
              </h2>
            </div>
            <ResultBlock
              internal={result.solution_internal}
              client={result.solution_client}
            />
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Diagnóstico
              </Button>
              <Button onClick={saveCase} disabled={saving || !!savedId}>
                {saving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                {savedId ? "Guardado" : "Guardar caso"}
              </Button>
            </div>
          </Card>
        )}

        {/* Historial */}
        <div className="mt-10">
          <h2 className="mb-3 flex items-center gap-2 font-poppins text-lg font-bold text-foreground">
            <ClipboardList className="h-5 w-5" /> Historial de casos
          </h2>
          <div className="space-y-2">
            {(cases ?? []).length === 0 && (
              <p className="text-sm text-muted-foreground">Aún no hay casos guardados.</p>
            )}
            {(cases ?? []).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => openCase(c)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:border-accent"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{c.label}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(c.created_at)}</p>
                </div>
                {c.triage_title && (
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {c.triage_title}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVentas;