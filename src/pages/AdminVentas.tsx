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
  Copy,
  Loader2,
  Plus,
  Sparkles,
  Save,
  ClipboardList,
  Trash2,
  AlertTriangle,
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
  approach?: string;
  engagement?: number;
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

// Engagement: 0 = listísimo para empezar/pagar; 3 = quiere librarse de la llamada.
// Colores tomados de la referencia del cliente (morado, verde, amarillo, rojo).
const ENGAGEMENT_LEVELS: {
  value: number;
  color: string;
  label: string;
  hint: string;
}[] = [
  { value: 0, color: "#8b5cf6", label: "Quiere empezar ya", hint: "Listísimo. «Quiero pagar / empezar ahora mismo.»" },
  { value: 1, color: "#6ec07a", label: "Muy interesado/a", hint: "Engancha, pregunta y escucha. Hay que reforzar valor." },
  { value: 2, color: "#e8c84d", label: "Dudoso/a", hint: "Tiene reservas. Más empatía, menos presión." },
  { value: 3, color: "#d9534f", label: "Quiere colgar", hint: "«Me gustaría librarme de esta llamada cuanto antes.»" },
];

// Señales de observación que ayudan al comercial a fijar el score.
const ENGAGEMENT_SIGNALS = [
  "Pregunta por precio o por cómo empezar",
  "Hace preguntas sobre el proceso y los plazos",
  "Comparte su situación con detalle y abre el tema",
  "Pone pegas de tiempo o intenta acortar la llamada",
  "Se muestra distante, con prisa o a la defensiva",
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

const parseCards = (raw: string | null): ScriptCard[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed
        .filter((c) => c && typeof c === "object")
        .map((c) => ({
          emoji: String(c.emoji ?? "•"),
          title: String(c.title ?? ""),
          body: String(c.body ?? ""),
        }));
    }
  } catch {
    /* legacy plain-text case */
  }
  return [{ emoji: "📝", title: "Guion", body: raw }];
};

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

type EngagementGateProps = {
  value: number;
  onChange: (v: number) => void;
  title: string;
  ctaLabel: string;
  onContinue: () => void;
  loading?: boolean;
};

// Pre-paso: el comercial valora el engagement de la persona antes de avanzar,
// para que la IA prepare el siguiente paso con más o menos intensidad.
const EngagementGate = ({
  value,
  onChange,
  title,
  ctaLabel,
  onContinue,
  loading,
}: EngagementGateProps) => {
  const active = ENGAGEMENT_LEVELS.find((l) => l.value === value);
  return (
    <div className="space-y-4 rounded-xl border border-border bg-muted/40 p-4">
      <div>
        <h3 className="font-poppins text-sm font-bold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">
          Marca lo lista que ves a la persona para empezar. El siguiente paso se
          preparará con un discurso más fuerte o más suave según este nivel.
        </p>
      </div>

      <ul className="space-y-1">
        {ENGAGEMENT_SIGNALS.map((s) => (
          <li key={s} className="flex items-start gap-2 text-xs text-muted-foreground">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            {s}
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ENGAGEMENT_LEVELS.map((l) => {
          const selected = value === l.value;
          return (
            <button
              key={l.value}
              type="button"
              onClick={() => onChange(l.value)}
              className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors ${
                selected
                  ? "border-foreground/40 bg-background shadow-sm"
                  : "border-border bg-background/60 hover:bg-background"
              }`}
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: l.color }}
              >
                {l.value}
              </span>
              <span className="text-[11px] font-semibold leading-tight text-foreground">
                {l.label}
              </span>
            </button>
          );
        })}
      </div>

      {active && (
        <p className="text-xs text-foreground/80">
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
            style={{ backgroundColor: active.color }}
          />
          {active.hint}
        </p>
      )}

      <Button onClick={onContinue} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparando...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" /> {ctaLabel}
          </>
        )}
      </Button>
    </div>
  );
};

// Caso de prueba para la fase de testing: rellena el formulario y un
// resultado simulado para poder navegar libremente entre secciones.
const TEST_CASE: {
  label: string;
  caseText: string;
  guide: GuideFields;
  result: AiResult;
} = {
  label: "PRUEBA · María · revolving 18.000€",
  caseText:
    "María, 42 años, separada con dos hijos. Trabaja como administrativa con contrato indefinido y cobra unos 1.350€ al mes. Arrastra varias tarjetas revolving y un par de microcréditos que pidió para llegar a fin de mes. Ya no puede pagar las cuotas, ha empezado a recibir llamadas de los acreedores y está muy agobiada porque teme que le embarguen la nómina.",
  guide: {
    debts: [
      { type: "tarjetas", entity: "WiZink", amount: 8000 },
      { type: "tarjetas", entity: "Cetelem", amount: 5000 },
      { type: "microcreditos", entity: "Vivus", amount: 3000 },
      { type: "prestamos", entity: "Banco Santander", amount: 2000 },
    ],
    entities: ["tarjetas", "microcreditos", "prestamos"],
    debtAmount: 18000,
    isDefault: true,
    employment: "empleado_indefinido",
    monthlyIncome: 1350,
    housing: "alquiler",
    vehicle: "no",
  },
  result: {
    triage: { solution: "lso", title: "Ley de Segunda Oportunidad" },
    diagnosis_internal: [
      {
        emoji: "⚠️",
        title: "Embargo de nómina inminente",
        body: "Con impago confirmado y acreedores llamando, el siguiente paso habitual es la demanda y el embargo de la parte embargable de la nómina. Anticipa la objeción «aún puedo ir pagando»: cada mes que pasa sube el riesgo.",
      },
      {
        emoji: "📉",
        title: "La deuda crece sola",
        body: "Los intereses de demora y comisiones de las revolving disparan el saldo. Lo que hoy son 18.000€ puede ser bastante más en unos meses sin actuar.",
      },
      {
        emoji: "📞",
        title: "Presión y desgaste emocional",
        body: "Las llamadas constantes y el miedo al embargo afectan a su día a día y a sus hijos. Conecta con el agobio que ya ha expresado.",
      },
      {
        emoji: "⚖️",
        title: "Riesgo de ASNEF y demandas",
        body: "La inclusión en ficheros de morosos le cerrará el acceso a cualquier financiación y los monitorios pueden acumularse. Cuanto antes se actúe, mejor posición.",
      },
    ],
    diagnosis_client:
      "María, por lo que me cuentas, tu situación es seria pero tiene salida. Con las cuotas impagadas y las llamadas que ya estás recibiendo, el riesgo real es que la deuda siga creciendo por los intereses y que se inicie un proceso de embargo sobre tu nómina. Sé que es agotador convivir con esa presión cada día. Lo importante es que no estás sola y que actuar ahora cambia mucho el desenlace.",
    solution_internal: [
      {
        emoji: "✅",
        title: "Ley de Segunda Oportunidad",
        body: "Cumple el perfil: insolvencia real y sin bienes de valor que proteger. Se puede cancelar legalmente la deuda y empezar de cero.",
      },
      {
        emoji: "🛡️",
        title: "Frena embargos y llamadas",
        body: "Al iniciar el proceso se paraliza la presión de los acreedores. Es el alivio inmediato que más le importa ahora mismo.",
      },
      {
        emoji: "📋",
        title: "Qué hacemos exactamente",
        body: "Analizamos su caso gratis, preparamos la documentación y la acompañamos en todo el procedimiento judicial hasta la exoneración.",
      },
      {
        emoji: "🚀",
        title: "Siguiente paso",
        body: "Agendar el análisis gratuito hoy mismo para no perder más tiempo ni dejar que crezca la deuda.",
      },
    ],
    solution_client:
      "María, hay una solución pensada exactamente para casos como el tuyo: la Ley de Segunda Oportunidad. Te permite cancelar legalmente las deudas que no puedes pagar y volver a empezar sin esa carga. Al iniciar el proceso se frenan las llamadas y la amenaza de embargo. El primer paso es un análisis gratuito de tu caso, sin compromiso, para confirmar que cumples los requisitos y explicarte el camino con claridad.",
  },
};

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
  const [engagement, setEngagement] = useState(1);

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
    setEngagement(1);
  };

  const loadTestCase = () => {
    setLabel(TEST_CASE.label);
    setCaseText(TEST_CASE.caseText);
    setGuide({ ...emptyGuide(), ...TEST_CASE.guide });
    setResult(TEST_CASE.result);
    setSavedId(null);
    setStep(0);
    setEngagement(1);
    toast.success("Caso de prueba cargado");
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

  const runGeneration = async (nextStep: number) => {
    if (caseText.trim().length < 10) {
      toast.error("Describe el caso (mínimo 10 caracteres).");
      return;
    }
    setGenerating(true);
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
        body: { caseText: caseText.trim(), guide: payloadGuide, engagement },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setResult(data as AiResult);
      setSavedId(null);
      setStep(nextStep);
    } catch (e) {
      toast.error("No se pudo generar el diagnóstico. Inténtalo de nuevo.");
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  // Paso 0 → 1: prepara el diagnóstico según el engagement.
  const generate = () => {
    setResult(null);
    void runGeneration(1);
  };

  // Paso 1 → 2: re-prepara TODO el discurso (incl. solución) con el
  // engagement actualizado, para que el siguiente paso encaje con él.
  const proceedToSolution = () => void runGeneration(2);

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
            engagement,
          } as never,
          triage_solution: result.triage.solution,
          triage_title: result.triage.title,
          diagnosis_internal: JSON.stringify(result.diagnosis_internal),
          diagnosis_client: result.diagnosis_client,
          solution_internal: JSON.stringify(result.solution_internal),
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
    setEngagement(
      typeof (c.guide_fields as { engagement?: number })?.engagement === "number"
        ? (c.guide_fields as { engagement?: number }).engagement!
        : 1,
    );
    setResult({
      triage: { solution: c.triage_solution ?? "", title: c.triage_title ?? "" },
      diagnosis_internal: parseCards(c.diagnosis_internal),
      diagnosis_client: c.diagnosis_client ?? "",
      solution_internal: parseCards(c.solution_internal),
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
            <Button variant="orange" size="sm" onClick={loadTestCase}>
              <Sparkles className="mr-1 h-4 w-4" /> Caso de prueba
            </Button>
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
              onClick={() => setStep(i)}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                step === i
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
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

            <EngagementGate
              value={engagement}
              onChange={setEngagement}
              title="Engagement antes del diagnóstico"
              ctaLabel="Generar diagnóstico"
              onContinue={generate}
              loading={generating}
            />
          </Card>
        )}

        {/* Step 2: Diagnóstico */}
        {(step === 1 || step === 2) && !result && (
          <Card className="space-y-3 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Aún no hay diagnóstico. Genera uno desde la Cualificación o carga el
              caso de prueba para navegar entre secciones.
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setStep(0)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Ir a Cualificación
              </Button>
              <Button variant="orange" size="sm" onClick={loadTestCase}>
                <Sparkles className="mr-1 h-4 w-4" /> Caso de prueba
              </Button>
            </div>
          </Card>
        )}

        {step === 1 && result && (
          <Card className="space-y-4 border-destructive/30 bg-destructive/5 p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-poppins text-lg font-bold text-destructive">
                <AlertTriangle className="h-5 w-5" /> Diagnóstico · consecuencias de no actuar
              </h2>
              <Badge variant="destructive">{result.triage.title}</Badge>
            </div>
            <ResultBlock
              internal={result.diagnosis_internal}
              client={result.diagnosis_client}
              tone="alert"
            />
            {result.approach && (
              <div className="rounded-lg border border-destructive/30 bg-background/60 p-3 text-xs text-foreground/90">
                <span className="font-semibold text-destructive">Cómo abordar el siguiente paso: </span>
                {result.approach}
              </div>
            )}
            <EngagementGate
              value={engagement}
              onChange={setEngagement}
              title="Re-evalúa el engagement antes de la solución"
              ctaLabel="Preparar solución"
              onContinue={proceedToSolution}
              loading={generating}
            />
            <div className="flex justify-start pt-1">
              <Button variant="outline" onClick={() => setStep(0)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Editar caso
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
            {result.approach && (
              <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 text-xs text-foreground/90">
                <span className="font-semibold text-foreground">Cómo abordar el siguiente paso: </span>
                {result.approach}
              </div>
            )}
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