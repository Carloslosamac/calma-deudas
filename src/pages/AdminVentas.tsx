import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  AlertTriangle,
  FileText,
  Download,
  PenLine,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";
import Seo from "@/components/seo/Seo";
import ConversionChart from "@/components/ventas/ConversionChart";
import {
  ContractFields,
  emptyContract,
} from "@/lib/contratoPdf";
import { buildZohoLeadFields, syncLeadToZoho } from "@/lib/zohoSync";
import {
  triage as computeTriage,
  type Profile as TriageProfile,
  type TriageResult,
  VARIANT_LABEL,
  MODALITY_LABEL,
} from "@/lib/seo/triage";

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
  monthlyPayment?: number;
  isDefault?: boolean;
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
  housingPayment?: number;
  isPrimaryResidence?: boolean;
  vehicle: Vehicle;
  vehicleValue?: number;
  vehiclePaid?: number;
  vehicleRemaining?: number;
  vehiclePayment?: number;
  wantsToKeepVehicle?: boolean;
  employment?: Employment;
  monthlyIncome?: number;
  monthlyExpenses?: number;
  profile?: TriageProfile;
  publicDebtAmount?: number;
};

type ScriptCard = { emoji: string; title: string; body: string };

type AiResult = {
  triage: { solution: string; title: string };
  presentation_internal?: ScriptCard[];
  presentation_client?: string;
  diagnosis_internal: ScriptCard[];
  diagnosis_client: string;
  solution_internal: ScriptCard[];
  solution_client: string;
  approach?: string;
  engagement?: number;
  signing_internal?: ScriptCard[];
  signing_client?: string;
  contract_internal?: ScriptCard[];
  contract_message?: string;
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

// Frases con las que la persona ha respondido a la fase anterior. El comercial
// marca las que encajan y la IA cincela el tono del siguiente paso.
const REACTION_PHRASES_PRESENTATION = [
  "Ah, ¿quién me llama?",
  "No tengo mucho tiempo ahora",
  "A ver, cuéntame",
  "¿Esto es de fiar?",
  "Justo estaba esperando que me llamarais",
  "No sé si esto es para mí",
];

const REACTION_PHRASES_QUALIFICATION = [
  "Me da vergüenza haber llegado a esto",
  "No es para tanto, lo controlo",
  "Llevo meses sin dormir por esto",
  "No tengo tiempo para esto ahora",
  "¿Esto cuánto me va a costar?",
  "No me fío de estas cosas",
  "Quiero solucionarlo ya",
];

const REACTION_PHRASES_DIAGNOSIS = [
  "No sabía que podía perder la nómina",
  "Ya he intentado de todo",
  "Suena bien pero no me fío",
  "Necesito pensarlo",
  "¿Y si no funciona?",
  "Lo tengo que consultar con mi pareja",
  "Quiero empezar ya",
];

const REACTION_PHRASES_SOLUTION = [
  "Esto me convence",
  "¿Y cuánto tarda?",
  "Me lo tengo que pensar",
  "¿Seguro que me sirve a mí?",
  "¿Qué pasa si no cumplo?",
  "Vale, ¿cómo empezamos?",
];

const REACTION_PHRASES_CONTRACT = [
  "Déjame leerlo con calma",
  "¿Esto a qué me compromete?",
  "¿Y si luego me arrepiento?",
  "El precio me echa para atrás",
  "Mándamelo y ya te digo",
  "Vale, lo firmo ahora",
];

const REACTION_PHRASES_SIGN = [
  "Me lo pienso esta noche",
  "Lo consulto con mi pareja",
  "No sé si es buen momento",
  "No me aclaro con la firma online",
  "¿Es seguro firmar así?",
  "Listo, ya he firmado",
];

const SIGNATURE_STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: "pendiente", label: "Pendiente de envío" },
  { value: "enviado", label: "Enviado" },
  { value: "firmado", label: "Firmado" },
  { value: "rechazado", label: "Rechazado" },
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

// Modelos de presentación FIJOS. La presentación va antes de conocer el caso,
// así que no depende de la IA ni de los datos relevantes: siempre es la misma.
// Carlos, abogado especialista en Ley de Segunda Oportunidad (+6 años).
type PresentationScript = {
  id: string;
  title: string;
  when: string;
  text: string;
};

const PRESENTATION_SCRIPTS: PresentationScript[] = [
  {
    id: "directo",
    title: "A · Directo de autoridad",
    when: "Por defecto. Cliente receptivo, quiere ir al grano.",
    text: "Le explico rápido quién soy para que sepa con quién habla: soy Carlos, abogado especialista en Ley de Segunda Oportunidad, llevo más de 6 años dedicado en exclusiva a esto y he acompañado a muchas personas en su misma situación a cancelar deudas que creían imposibles de pagar. No le vendo humo: le voy a decir con claridad si su caso tiene solución legal y cuál es. Para eso necesito hacerle unas preguntas concretas. ¿Le parece que empecemos?",
  },
  {
    id: "empatico",
    title: "B · Empático + autoridad",
    when: "Cliente nervioso, agobiado o avergonzado por su situación.",
    text: "Antes de nada, tranquilícese: lo que le pasa lo he visto muchas veces y tiene solución. Me llamo Carlos, soy abogado especializado en Ley de Segunda Oportunidad desde hace más de 6 años y me dedico solo a esto. Mi trabajo es mirar su situación con criterio legal y decirle la verdad, aunque no siempre sea lo que espera oír. Si hay salida, se la voy a enseñar paso a paso. ¿Le hago unas preguntas para verlo?",
  },
  {
    id: "contundente",
    title: "C · Contundente de credibilidad",
    when: "Cliente escéptico o que ya ha hablado con otra empresa.",
    text: "Le hablo claro porque su tiempo vale: soy Carlos, abogado, más de 6 años dedicado en exclusiva a la Ley de Segunda Oportunidad. Esto no es un call center ni una reunificadora: es un procedimiento legal amparado por la ley y lo lleva un abogado de principio a fin. He visto a mucha gente perder meses con quien no debía. Deme cinco minutos y le digo con honestidad si su caso encaja o no. ¿Empezamos?",
  },
];

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

const STEPS = [
  "Presentación",
  "Cualificación",
  "Diagnóstico",
  "Solución",
  "Contrato",
  "Firma",
] as const;

// Color propio por fase (clases literales para que Tailwind las detecte).
const PHASE_THEMES = [
  {
    active: "bg-phase-presentation text-phase-presentation-foreground",
    dot: "bg-phase-presentation",
    text: "text-phase-presentation",
    soft: "bg-phase-presentation-soft",
    border: "border-phase-presentation",
    var: "--phase-presentation",
  },
  {
    active: "bg-phase-qualify text-phase-qualify-foreground",
    dot: "bg-phase-qualify",
    text: "text-phase-qualify",
    soft: "bg-phase-qualify-soft",
    border: "border-phase-qualify",
    var: "--phase-qualify",
  },
  {
    active: "bg-phase-diagnosis text-phase-diagnosis-foreground",
    dot: "bg-phase-diagnosis",
    text: "text-phase-diagnosis",
    soft: "bg-phase-diagnosis-soft",
    border: "border-phase-diagnosis",
    var: "--phase-diagnosis",
  },
  {
    active: "bg-phase-solution text-phase-solution-foreground",
    dot: "bg-phase-solution",
    text: "text-phase-solution",
    soft: "bg-phase-solution-soft",
    border: "border-phase-solution",
    var: "--phase-solution",
  },
  {
    active: "bg-phase-contract text-phase-contract-foreground",
    dot: "bg-phase-contract",
    text: "text-phase-contract",
    soft: "bg-phase-contract-soft",
    border: "border-phase-contract",
    var: "--phase-contract",
  },
  {
    active: "bg-phase-sign text-phase-sign-foreground",
    dot: "bg-phase-sign",
    text: "text-phase-sign",
    soft: "bg-phase-sign-soft",
    border: "border-phase-sign",
    var: "--phase-sign",
  },
] as const;

// Helper para aplicar el color de fase como variable CSS local (`--phase`) en la
// card, de modo que fields, botones secundarios y chips tomen ese tono.
const phaseStyle = (i: number) =>
  ({
    ["--phase" as string]: `var(${PHASE_THEMES[i].var})`,
    ["--phase-fg" as string]: `var(${PHASE_THEMES[i].var}-foreground)`,
  }) as React.CSSProperties;

// Jerarquía de botones dentro de las cards, coherente con el color de la fase:
// - primario (avanzar / acción principal): relleno sólido con el color de fase.
// - secundario (añadir, copiar, acciones de apoyo): contorno teñido de fase.
// Ambos usan la variable local `--phase`, así cada card mantiene su tono.
const phasePrimaryBtn: React.CSSProperties = {
  backgroundColor: "hsl(var(--phase))",
  borderColor: "hsl(var(--phase))",
  color: "hsl(var(--phase-fg))",
};
const phaseOutlineBtn: React.CSSProperties = {
  borderColor: "hsl(var(--phase) / 0.5)",
  color: "hsl(var(--phase))",
};

// Card única de la fase: contenedor con borde/color de fase que envuelve todas
// las secciones internas de esa fase (unicard).
const PhaseCard = ({
  phase,
  children,
  className,
}: {
  phase: number;
  children: React.ReactNode;
  className?: string;
}) => (
  <Card
    className={`phase-card space-y-3 border-l-4 p-3 sm:p-4 ${PHASE_THEMES[phase].border} ${PHASE_THEMES[phase].soft} ${className ?? ""}`}
    style={phaseStyle(phase)}
  >
    {children}
  </Card>
);

// Sección interna de una PhaseCard: título + contenido, separada de la anterior
// por una línea sutil con el tono de la fase (no es una card independiente).
const Section = ({
  title,
  subtitle,
  icon,
  children,
  className,
}: {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`space-y-2.5 border-t pt-3 first:border-t-0 first:pt-0 ${className ?? ""}`} style={{ borderColor: "hsl(var(--phase) / 0.18)" }}>
    {(title || icon) && (
      <div className="flex items-center gap-2.5">
        {icon && (
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{
              backgroundColor: "hsl(var(--phase) / 0.15)",
              color: "hsl(var(--phase))",
            }}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0">
          {title && (
            <h3 className="font-poppins text-sm font-bold leading-tight text-foreground">
              {title}
            </h3>
          )}
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    )}
    {children}
  </div>
);

// Panel del caso en la cabecera sticky: etiqueta + datos relevantes que se
// añaden uno a uno. Colapsable para no ocupar demasiado alto. Alimenta la IA.
const CaseFactsPanel = ({
  label,
  onLabelChange,
  facts,
  newFact,
  onNewFactChange,
  onAddFact,
  onRemoveFact,
}: {
  label: string;
  onLabelChange: (v: string) => void;
  facts: string[];
  newFact: string;
  onNewFactChange: (v: string) => void;
  onAddFact: () => void;
  onRemoveFact: (i: number) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 rounded-xl border border-border bg-card/80 p-2.5">
      {/* Añadir dato: siempre visible */}
      <div className="flex gap-2">
        <Input
          value={newFact}
          onChange={(e) => onNewFactChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onAddFact();
            }
          }}
          placeholder="Añadir dato relevante y pulsa Enter…"
        />
        <Button type="button" size="icon" onClick={onAddFact} aria-label="Añadir dato relevante">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Datos del caso: siempre minimizados (colapsados por defecto) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-3 flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
          Datos del caso
          <Badge variant="secondary" className="ml-1">
            {facts.length}
          </Badge>
          {!open && label.trim() && (
            <span className="ml-1 truncate font-normal text-muted-foreground">
              · {label.trim()}
            </span>
          )}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          <Input
            value={label}
            onChange={(e) => onLabelChange(e.target.value)}
            placeholder="Etiqueta del caso (ej. María · revolving 12.000€)"
          />
          {facts.length > 0 && (
            <ul className="space-y-1.5">
              {facts.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start justify-between gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-sm"
                >
                  <span className="min-w-0 flex-1">{f}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveFact(i)}
                    aria-label="Eliminar dato"
                    className="mt-0.5 shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

type EngagementGateProps = {
  value: number;
  onChange: (v: number) => void;
  title: string;
  ctaLabel: string;
  onContinue: () => void;
  loading?: boolean;
  phrases?: string[];
  selectedPhrases?: string[];
  onTogglePhrase?: (p: string) => void;
  onReinforce?: () => void;
  reinforceLoading?: boolean;
  reinforceData?: { internal: ScriptCard[]; client: string };
};

// Bloque "Si aún no quiere avanzar": argumentario de manejo de objeciones para
// quedarse en la fase actual. Usa el color de la fase activa (--phase).
const ReinforceBlock = ({
  data,
}: {
  data?: { internal: ScriptCard[]; client: string };
}) => {
  if (!data || (!data.internal.length && !data.client)) return null;
  return (
    <div
      className="space-y-3 rounded-xl border p-4"
      style={{
        borderColor: "hsl(var(--phase) / 0.4)",
        backgroundColor: "hsl(var(--phase) / 0.05)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <h3
          className="font-poppins text-sm font-bold"
          style={{ color: "hsl(var(--phase))" }}
        >
          Si aún no quiere avanzar
        </h3>
        {data.internal.length > 0 && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => copyText(cardsToText(data.internal))}
          >
            <Copy className="mr-1 h-3.5 w-3.5" /> Copiar todo
          </Button>
        )}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.internal.map((card, i) => (
          <div
            key={i}
            className="rounded-xl border bg-background/60 p-4"
            style={{ borderColor: "hsl(var(--phase) / 0.3)" }}
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className="text-xl leading-none">{card.emoji}</span>
              <h4 className="font-poppins text-sm font-bold text-foreground">
                {card.title}
              </h4>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {card.body}
            </p>
          </div>
        ))}
      </div>
      {data.client && (
        <div className="relative rounded-lg border border-border bg-background/60 p-3 pr-24">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="absolute right-2 top-2"
            onClick={() => copyText(data.client)}
          >
            <Copy className="mr-1 h-3.5 w-3.5" /> Copiar
          </Button>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {data.client}
          </p>
        </div>
      )}
    </div>
  );
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
  phrases,
  selectedPhrases,
  onTogglePhrase,
  onReinforce,
  reinforceLoading,
  reinforceData,
}: EngagementGateProps) => {
  const active = ENGAGEMENT_LEVELS.find((l) => l.value === value);
  return (
    <div className="space-y-2.5 rounded-xl border border-border bg-muted/40 p-3">
      <h3 className="font-poppins text-sm font-bold text-foreground">{title}</h3>

      <div className="grid grid-cols-4 gap-1.5">
        {ENGAGEMENT_LEVELS.map((l) => {
          const selected = value === l.value;
          return (
            <button
              key={l.value}
              type="button"
              onClick={() => onChange(l.value)}
              className="flex flex-col items-center gap-1 rounded-lg border p-2 text-center transition-colors shadow-sm"
              style={
                selected
                  ? {
                      borderColor: "hsl(var(--phase))",
                      backgroundColor: "hsl(var(--phase) / 0.12)",
                    }
                  : {
                      borderColor: "hsl(var(--phase) / 0.25)",
                      backgroundColor: "hsl(var(--phase) / 0.04)",
                    }
              }
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white"
                style={{ backgroundColor: l.color }}
              >
                {l.value}
              </span>
              <span className="text-[10px] font-semibold leading-tight text-foreground">
                {l.label}
              </span>
            </button>
          );
        })}
      </div>

      {active && (
        <p className="text-[11px] text-foreground/80">
          <span
            className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
            style={{ backgroundColor: active.color }}
          />
          {active.hint}
        </p>
      )}

      {phrases && phrases.length > 0 && onTogglePhrase && (
        <div className="space-y-1.5 border-t border-border pt-2.5">
          <p className="text-xs font-semibold text-foreground">
            ¿Cómo ha reaccionado?
          </p>
          <div className="flex flex-wrap gap-1.5">
            {phrases.map((p) => {
              const on = (selectedPhrases ?? []).includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onTogglePhrase(p)}
                  className="rounded-full border px-2.5 py-1 text-[10px] font-medium leading-tight transition-colors"
                  style={
                    on
                      ? {
                          backgroundColor: "hsl(var(--phase) / 0.9)",
                          borderColor: "hsl(var(--phase))",
                          color: "hsl(0 0% 100%)",
                        }
                      : {
                          backgroundColor: "hsl(var(--phase) / 0.16)",
                          borderColor: "hsl(var(--phase) / 0.4)",
                          color: "hsl(var(--phase))",
                        }
                  }
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {onReinforce && (
        <div className="space-y-2 border-t border-border pt-2.5">
          <Button
            type="button"
            variant="outline"
            onClick={onReinforce}
            disabled={reinforceLoading}
            className="h-8 w-full text-xs"
            style={{
              borderColor: "hsl(var(--phase) / 0.5)",
              color: "hsl(var(--phase))",
            }}
          >
            {reinforceLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparando
                refuerzo...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" /> Reforzar esta fase
              </>
            )}
          </Button>
        </div>
      )}

      <Button
        onClick={onContinue}
        disabled={loading}
        variant="outline"
        className="w-full hover:opacity-90"
        style={phasePrimaryBtn}
      >
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
// Reconstruye la lista de datos relevantes a partir del texto guardado del
// caso (formato "- dato" por línea; compat con casos antiguos de texto libre).
const parseFactsFromText = (text: string | null | undefined): string[] => {
  if (!text) return [];
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.toLowerCase().startsWith("etiqueta:"));
  const bullets = lines
    .filter((l) => l.startsWith("- "))
    .map((l) => l.replace(/^-\s+/, ""));
  if (bullets.length) return bullets;
  return lines.length ? lines : [text.trim()];
};

const TEST_CASE: {
  label: string;
  relevantFacts: string[];
  guide: GuideFields;
  result: AiResult;
  contract: ContractFields;
} = {
  label: "PRUEBA · María · revolving 18.000€",
  relevantFacts: [
    "María, 42 años, separada con dos hijos",
    "Administrativa con contrato indefinido, ~1.350€/mes",
    "Varias tarjetas revolving y microcréditos pedidos para llegar a fin de mes",
    "Ya no puede pagar las cuotas y recibe llamadas de los acreedores",
    "Muy agobiada, teme que le embarguen la nómina",
  ],
  guide: {
    debts: [
      { type: "tarjetas", entity: "WiZink", amount: 8000, monthlyPayment: 240, isDefault: true },
      { type: "tarjetas", entity: "Cetelem", amount: 5000, monthlyPayment: 160, isDefault: true },
      { type: "microcreditos", entity: "Vivus", amount: 3000, monthlyPayment: 130, isDefault: true },
      { type: "prestamos", entity: "Banco Santander", amount: 2000, monthlyPayment: 90, isDefault: false },
    ],
    entities: ["tarjetas", "microcreditos", "prestamos"],
    debtAmount: 18000,
    isDefault: true,
    employment: "empleado_indefinido",
    monthlyIncome: 1350,
    monthlyExpenses: 650,
    housing: "alquiler",
    housingPayment: 600,
    vehicle: "no",
  },
  result: {
    triage: { solution: "lso", title: "Ley de Segunda Oportunidad" },
    approach:
      "María ya muestra agobio y miedo al embargo: conecta con la emoción antes de proponer nada y avanza paso a paso confirmando que se siente acompañada.",
    presentation_internal: [
      {
        emoji: "👋",
        title: "Preséntate y encuadra la llamada",
        body: "«Hola María, soy [nombre], de Calma. Te llamo por la solicitud que dejaste sobre tus deudas.» Nombre, empresa y motivo en una frase: que sepa quién llama y por qué.",
      },
      {
        emoji: "🛡️",
        title: "Da confianza desde el principio",
        body: "Calma acompaña a personas con deudas en toda España. Menciona que la primera llamada es un análisis gratuito y sin compromiso para bajar la guardia.",
      },
      {
        emoji: "🎯",
        title: "Pide permiso para avanzar",
        body: "«¿Te viene bien que te haga un par de preguntas para ver tu caso?» Consigue el sí a seguir hablando antes de entrar en la cualificación.",
      },
    ],
    presentation_client:
      "Hola María, soy [nombre], de Calma. Te contacto por la consulta que dejaste sobre tus deudas. Somos especialistas en ayudar a personas en tu situación y la primera revisión de tu caso es gratuita y sin compromiso. ¿Te va bien que hablemos unos minutos?",
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
    contract_internal: [
      {
        emoji: "📝",
        title: "Recoge los datos en caliente",
        body: "Aprovecha el sí: pide nombre completo, DNI, dirección, email y teléfono mientras está convencida. «Para dejarlo todo en marcha hoy necesito solo unos datos, ¿lo vemos en un minuto?»",
      },
      {
        emoji: "💶",
        title: "Presenta los honorarios con seguridad",
        body: "Enmarca el coste frente a los 18.000€ que cancela y a los 620€/mes que hoy paga en cuotas. Cuota asumible y plan claro: nada de letra pequeña.",
      },
      {
        emoji: "🛡️",
        title: "Reafirma qué incluye",
        body: "Análisis, documentación y acompañamiento judicial completo hasta la exoneración. Que sienta que delega el problema entero.",
      },
      {
        emoji: "⏱️",
        title: "Crea urgencia honesta",
        body: "Cada mes sin actuar sube intereses y acerca el embargo. Firmar hoy congela la situación y arranca su segunda oportunidad ya.",
      },
    ],
    contract_message:
      "María, te paso el contrato de servicios con todos los datos que hemos hablado. Es la plantilla estándar de la Ley de Segunda Oportunidad: revisa nombre, DNI y honorarios, y cuando lo tengas claro lo firmamos para arrancar hoy mismo. Cualquier duda, aquí estoy.",
    signing_internal: [
      {
        emoji: "✍️",
        title: "Guía la firma sin fricción",
        body: "Acompáñala paso a paso: «te llega el documento, lo abres, firmas abajo y ya está». Quédate en línea hasta que confirme.",
      },
      {
        emoji: "🤝",
        title: "Refuerza la decisión",
        body: "Felicítala por el paso: hoy deja de cargar sola con la deuda. Anticipa el alivio de no recibir más llamadas.",
      },
      {
        emoji: "📅",
        title: "Cierra próximos pasos",
        body: "Confirma qué documentación traerá y agenda la siguiente llamada para empezar el procedimiento. Que cuelgue con un plan concreto.",
      },
      {
        emoji: "💚",
        title: "Deja la puerta abierta",
        body: "Recuérdale que estás para cualquier duda. La firma es el principio del acompañamiento, no el final.",
      },
    ],
    signing_client:
      "¡Enhorabuena, María! Con la firma ya damos el primer paso real para cancelar tu deuda y frenar la presión. A partir de aquí me encargo yo de todo el procedimiento y te voy informando en cada fase. Cuando quieras me dices y agendamos la siguiente llamada para empezar con la documentación.",
  },
  contract: {
    fullName: "María López García",
    dni: "12345678Z",
    address: "Calle Mayor 12, 3ºB, 28013 Madrid",
    email: "maria.lopez@email.com",
    phone: "600123456",
    service: "lso",
    fee: "",
    initialPayment: "150",
    installments: "30",
    installmentAmount: "99",
    signCity: "Madrid",
  },
};

const AdminVentas = () => {
  const DRAFT_KEY = "calma_ventas_draft";
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { session, isAdmin, loading } = useAdminAuth();

  const [step, setStep] = useState(0);
  const [qualStep, setQualStep] = useState(0);
  // Guiones de apertura elegidos (multiselect por tipo de cliente).
  const [selectedPresentations, setSelectedPresentations] = useState<string[]>([]);
  // Índice de la sub-pantalla dentro de la fase actual (flujo typeform).
  const [sub, setSub] = useState(0);
  // Cuando se retrocede de fase, aterrizar en la última pantalla de la anterior.
  const landOnLastRef = useRef<number | null>(null);
  // Panel plegable de "datos del caso" en la barra superior del flujo typeform.
  const [showCase, setShowCase] = useState(false);
  const [label, setLabel] = useState("");
  const [relevantFacts, setRelevantFacts] = useState<string[]>([]);
  const [newFact, setNewFact] = useState("");
  const [guide, setGuide] = useState<GuideFields>(emptyGuide());
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  // Lead de origen (cuando se llega desde /admin/ventas/leads) para sincronizar
  // estado y vincular el caso trabajado.
  const [leadId, setLeadId] = useState<string | null>(null);
  const [leadExternalId, setLeadExternalId] = useState<string | null>(null);
  const [result, setResult] = useState<AiResult | null>(null);
  // Evita re-disparar la pre-generación automática del guion de contrato/firma.
  const autoGenRef = useRef<Record<number, boolean>>({});
  const [engagementByPhase, setEngagementByPhase] = useState<number[]>([
    1, 1, 1, 1, 1, 1,
  ]);
  // El engagement "activo" es el tier registrado en la fase actual.
  const engagement = engagementByPhase[step] ?? 1;
  const setEngagement = (v: number) =>
    setEngagementByPhase((prev) =>
      prev.map((x, i) => (i === step ? v : x)),
    );
  const [reactions, setReactions] = useState<string[]>([]);
  const [contract, setContract] = useState<ContractFields>(emptyContract());
  const [signatureStatus, setSignatureStatus] = useState("pendiente");
  // Refuerzo de la fase actual cuando la persona no quiere avanzar.
  const [reinforcing, setReinforcing] = useState(false);
  const [reinforceByStep, setReinforceByStep] = useState<
    Record<number, { internal: ScriptCard[]; client: string }>
  >({});

  // Persistencia del borrador del formulario: si el comercial avanza y navega
  // fuera (p. ej. a /leads), al volver se restaura el progreso en lugar de
  // perderse. Se guarda un único borrador activo en localStorage.
  const hydratedRef = useRef(false);
  const applyDraft = (d: Record<string, unknown>) => {
    if (typeof d.step === "number") setStep(d.step);
    if (typeof d.sub === "number") setSub(d.sub);
    if (typeof d.qualStep === "number") setQualStep(d.qualStep);
    if (Array.isArray(d.selectedPresentations)) setSelectedPresentations(d.selectedPresentations as string[]);
    if (typeof d.label === "string") setLabel(d.label);
    if (Array.isArray(d.relevantFacts)) setRelevantFacts(d.relevantFacts as string[]);
    if (d.guide && typeof d.guide === "object") setGuide((prev) => ({ ...prev, ...(d.guide as GuideFields) }));
    if (d.result !== undefined) setResult((d.result as AiResult) ?? null);
    if (d.savedId !== undefined) setSavedId((d.savedId as string) ?? null);
    if (d.leadId !== undefined) setLeadId((d.leadId as string) ?? null);
    if (d.leadExternalId !== undefined) setLeadExternalId((d.leadExternalId as string) ?? null);
    if (Array.isArray(d.engagementByPhase)) setEngagementByPhase(d.engagementByPhase as number[]);
    if (Array.isArray(d.reactions)) setReactions(d.reactions as string[]);
    if (d.contract && typeof d.contract === "object") setContract((prev) => ({ ...prev, ...(d.contract as ContractFields) }));
    if (typeof d.signatureStatus === "string") setSignatureStatus(d.signatureStatus);
    if (d.reinforceByStep && typeof d.reinforceByStep === "object")
      setReinforceByStep(d.reinforceByStep as Record<number, { internal: ScriptCard[]; client: string }>);
  };

  const togglePhrase = (p: string) =>
    setReactions((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p],
    );

  // El caso ya no es un textarea: se compone a partir de la etiqueta y los
  // "datos relevantes" añadidos uno a uno, para alimentar la IA sin tocar el
  // edge function (sigue recibiendo `caseText`).
  const caseText = [
    label.trim() ? `Etiqueta: ${label.trim()}` : "",
    ...relevantFacts.map((f) => `- ${f}`),
  ]
    .filter(Boolean)
    .join("\n");
  const hasCaseData = relevantFacts.length > 0;

  const addFact = () => {
    const v = newFact.trim();
    if (!v) return;
    setRelevantFacts((prev) => [...prev, v]);
    setNewFact("");
  };
  const removeFact = (i: number) =>
    setRelevantFacts((prev) => prev.filter((_, idx) => idx !== i));

  useEffect(() => {
    if (!loading && !session) navigate("/admin/auth", { replace: true });
  }, [session, loading, navigate]);

  // Precarga desde la lista de llamadas: rellena etiqueta y datos económicos
  // conocidos del lead y guarda el vínculo para sincronizar su estado.
  useEffect(() => {
    const lead = (location.state as { lead?: {
      id: string;
      external_id?: string | null;
      label?: string;
      guide?: Partial<GuideFields>;
    } } | null)?.lead;

    // Intenta restaurar un borrador guardado.
    let restored = false;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Record<string, unknown>;
        // Si se abre un lead concreto, solo se restaura si el borrador es suyo.
        if (!lead || draft.leadId === lead.id) {
          applyDraft(draft);
          restored = true;
        }
      }
    } catch {
      /* borrador corrupto: se ignora */
    }

    if (lead) {
      // El vínculo al lead siempre se refresca desde el state entrante.
      setLeadId(lead.id);
      setLeadExternalId(lead.external_id ?? null);
      if (!restored) {
        if (lead.label) setLabel(lead.label);
        if (lead.guide) setGuide((prev) => ({ ...prev, ...lead.guide }));
      }
      // Limpia el state para no re-precargar al navegar internamente.
      navigate(location.pathname, { replace: true, state: null });
    }
    hydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Guarda el borrador ante cualquier cambio, una vez hidratado.
  useEffect(() => {
    if (!hydratedRef.current) return;
    const snapshot = {
      step, sub, qualStep, selectedPresentations, label, relevantFacts,
      guide, result, savedId, leadId, leadExternalId, engagementByPhase,
      reactions, contract, signatureStatus, reinforceByStep,
    };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(snapshot));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [
    step, sub, qualStep, selectedPresentations, label, relevantFacts, guide,
    result, savedId, leadId, leadExternalId, engagementByPhase, reactions,
    contract, signatureStatus, reinforceByStep,
  ]);

  // Sincroniza datos económicos / vínculo del lead. NO cambia el estado del
  // lead automáticamente: el estado solo lo edita el comercial manualmente.
  const syncLead = async (patch: Record<string, unknown>) => {
    if (!leadId) return;
    const { error } = await supabase
      .from("sales_leads")
      .update(patch as never)
      .eq("id", leadId);
    if (error) console.error("No se pudo sincronizar el lead", error);
  };

  // Al cambiar de fase, reposiciona la sub-pantalla: 0 al avanzar, o la última
  // de la fase si venimos de un "Atrás" que cruza el límite de fase.
  useEffect(() => {
    if (landOnLastRef.current != null) {
      setSub(landOnLastRef.current);
      landOnLastRef.current = null;
    } else {
      setSub(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const { data: cases } = useQuery({
    queryKey: ["sales-cases"],
    queryFn: fetchCases,
    enabled: !!session && isAdmin,
  });

  const resetForm = () => {
    setStep(0);
    setSub(0);
    setQualStep(0);
    setSelectedPresentations([]);
    setLabel("");
    setLeadExternalId(null);
    setLeadId(null);
    setRelevantFacts([]);
    setNewFact("");
    setGuide(emptyGuide());
    setResult(null);
    setSavedId(null);
    setEngagementByPhase([1, 1, 1, 1, 1, 1]);
    setReactions([]);
    setContract(emptyContract());
    setSignatureStatus("pendiente");
    setReinforceByStep({});
    autoGenRef.current = {};
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* almacenamiento no disponible */
    }
  };

  const loadTestCase = () => {
    setReinforceByStep({});
    setSub(0);
    setLabel(TEST_CASE.label);
    setRelevantFacts(TEST_CASE.relevantFacts);
    setNewFact("");
    setGuide({ ...emptyGuide(), ...TEST_CASE.guide });
    setResult(TEST_CASE.result);
    setSavedId(null);
    setStep(0);
    setEngagementByPhase([1, 1, 1, 1, 1, 1]);
    setReactions([]);
    setContract({ ...emptyContract(), ...TEST_CASE.contract });
    setSignatureStatus("pendiente");
    setReinforceByStep({});
    autoGenRef.current = {};
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

  // Cuotas que la persona REALMENTE paga hoy (solo deudas NO impagadas):
  // es lo único que sale de su bolsillo y lo único que se libera al reestructurar.
  const debtsMonthlyPaying = guide.debts
    .filter((d) => d.isDefault !== true)
    .reduce((sum, d) => sum + (d.monthlyPayment ?? 0), 0);
  // Cuotas YA impagadas: no salen de su bolsillo (no liberan caja), solo contexto del diagnóstico.
  const debtsMonthlyDefaulted = guide.debts
    .filter((d) => d.isDefault === true)
    .reduce((sum, d) => sum + (d.monthlyPayment ?? 0), 0);
  // Salida real mensual: solo lo que de verdad paga + cargas fijas.
  const monthlyOutflow =
    debtsMonthlyPaying +
    (guide.housingPayment ?? 0) +
    (guide.vehiclePayment ?? 0) +
    (guide.monthlyExpenses ?? 0);

  // Capacidad de pago: ingresos menos gastos esenciales (vivienda + vehículo + gastos de vida),
  // sin contar las cuotas de deudas (que es justo lo que se reestructura).
  const essentialOutflow =
    (guide.housingPayment ?? 0) +
    (guide.vehiclePayment ?? 0) +
    (guide.monthlyExpenses ?? 0);
  const paymentCapacity =
    guide.monthlyIncome != null ? guide.monthlyIncome - essentialOutflow : null;
  // Importe asumible: cuota recomendada y prudente (60% de la capacidad libre).
  const affordablePayment =
    paymentCapacity != null ? Math.max(0, Math.round((paymentCapacity * 0.6) / 5) * 5) : null;

  const runGeneration = async (
    nextStep: number,
    target: "diagnosis" | "solution" = "diagnosis",
  ) => {
    if (!hasCaseData) {
      toast.error("Añade al menos un dato relevante del caso.");
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
        // Derivado de las deudas: en impago si alguna entidad lo está.
        isDefault: guide.debts.some((d) => d.isDefault) || guide.isDefault,
      };
      const { data, error } = await supabase.functions.invoke("sales-diagnosis", {
        body: { caseText: caseText.trim(), guide: payloadGuide, engagement, engagementByPhase, reactions, contract, phase: target },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      // Solo genera el paso siguiente: fusiona con lo ya generado en vez de reemplazar todo.
      setResult((prev) => {
        if (target === "solution") {
          const base: AiResult =
            prev ?? ({
              triage: data.triage,
              diagnosis_internal: [],
              diagnosis_client: "",
              solution_internal: [],
              solution_client: "",
            } as AiResult);
          return {
            ...base,
            triage: data.triage ?? base.triage,
            solution_internal: data.solution_internal ?? [],
            solution_client: data.solution_client ?? "",
            approach: data.approach ?? base.approach,
          };
        }
        // diagnosis: preserva cualquier solución previa (por si se retrocede).
        return {
          ...(prev ?? ({} as AiResult)),
          triage: data.triage,
          diagnosis_internal: data.diagnosis_internal ?? [],
          diagnosis_client: data.diagnosis_client ?? "",
          solution_internal: prev?.solution_internal ?? [],
          solution_client: prev?.solution_client ?? "",
          approach: data.approach ?? "",
        };
      });
      setSavedId(null);
      setStep(nextStep);
    } catch (e) {
      toast.error("No se pudo generar el diagnóstico. Inténtalo de nuevo.");
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  // Presentación → Cualificación: avanza al formulario de cualificación.
  // Opcionalmente ya se ha generado el guion de apertura en esta fase.
  const proceedToQualification = () => setStep(1);

  // Cualificación → Diagnóstico: prepara el diagnóstico según el engagement.
  const generate = () => {
    setResult(null);
    void runGeneration(2);
  };

  // Diagnóstico → Solución: re-prepara TODO el discurso (incl. solución) con el
  // engagement actualizado, para que el siguiente paso encaje con él.
  const proceedToSolution = () => void runGeneration(3, "solution");

  // Solución → Contrato: pasa a contrato (el guion de envío se pre-genera solo al entrar).
  const goToContract = () => {
    if (result) {
      setContract((c) => (c.service ? c : { ...c, service: result.triage.solution }));
    }
    autoGenRef.current[4] = false;
    setStep(4);
  };

  // Contrato → Firma: pasa a firma (el guion de cierre se pre-genera solo al entrar).
  const goToSign = () => {
    autoGenRef.current[5] = false;
    setStep(5);
  };

  // Genera una fase puntual (mensaje de envío del contrato o guion de firma)
  // sin sobreescribir el diagnóstico/solución ya generados.
  const runPhase = async (
    phase: "contract_message" | "signing" | "presentation",
    nextStep?: number,
  ) => {
    if (!hasCaseData) {
      toast.error("Añade al menos un dato relevante del caso.");
      return;
    }
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("sales-diagnosis", {
        body: { caseText: caseText.trim(), guide, engagement, engagementByPhase, reactions, phase, contract },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      const patch =
        phase === "signing"
          ? {
              signing_internal: data.signing_internal ?? [],
              signing_client: data.signing_client ?? "",
            }
          : phase === "presentation"
            ? {
                presentation_internal: data.presentation_internal ?? [],
                presentation_client: data.presentation_client ?? "",
              }
            : {
                contract_internal: data.contract_internal ?? [],
                contract_message: data.contract_message ?? "",
              };
      setResult((prev) =>
        prev
          ? { ...prev, ...patch }
          : phase === "presentation"
            ? ({
                triage: { solution: "", title: "" },
                diagnosis_internal: [],
                diagnosis_client: "",
                solution_internal: [],
                solution_client: "",
                ...patch,
              } as AiResult)
            : prev,
      );
      if (typeof nextStep === "number") setStep(nextStep);
    } catch (e) {
      toast.error("No se pudo generar. Inténtalo de nuevo.");
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  // Refuerza la fase ACTUAL sin avanzar: cuando la persona duda, dice que se lo
  // tiene que pensar o quiere colgar, genera argumentario de manejo de
  // objeciones anclado en el caso y las reacciones marcadas.
  const reinforcePhase = async (currentStep: number) => {
    if (!hasCaseData) {
      toast.error("Añade al menos un dato relevante del caso.");
      return;
    }
    setReinforcing(true);
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
        body: {
          caseText: caseText.trim(),
          guide: payloadGuide,
          engagement,
          engagementByPhase,
          reactions,
          phase: "reinforce",
          currentStep,
          contract,
        },
      });
      if (error) throw error;
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      setReinforceByStep((prev) => ({
        ...prev,
        [currentStep]: {
          internal: data.reinforce_internal ?? [],
          client: data.reinforce_client ?? "",
        },
      }));
      toast.success("Argumentario para no perder a la persona listo");
    } catch (e) {
      toast.error("No se pudo generar el refuerzo. Inténtalo de nuevo.");
      console.error(e);
    } finally {
      setReinforcing(false);
    }
  };

  // Pre-genera automáticamente el guion al entrar en Contrato (envío) y Firma,
  // usando el itinerario de engagements + reacciones acumulado. El comercial
  // puede regenerarlo después si reajusta el engagement o las reacciones.
  useEffect(() => {
    if (!result || generating) return;
    if (step === 4 && !(result.contract_internal?.length) && !autoGenRef.current[4]) {
      autoGenRef.current[4] = true;
      void runPhase("contract_message");
    } else if (step === 5 && !(result.signing_internal?.length) && !autoGenRef.current[5]) {
      autoGenRef.current[5] = true;
      void runPhase("signing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, result, generating]);

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
            engagementByPhase,
            reactions,
            contract,
            signatureStatus,
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
      if (leadId) {
        void syncLead({
          sales_case_id: data.id,
          debt: debtsTotal > 0 ? debtsTotal : guide.debtAmount ?? null,
          income: guide.monthlyIncome ?? null,
          expense: guide.monthlyExpenses ?? null,
        });
      }
      // Sincroniza los datos económicos del caso hacia Zoho CRM.
      if (leadExternalId) {
        const entitiesList = Array.from(
          new Set(guide.debts.map((d) => d.entity?.trim()).filter(Boolean) as string[]),
        );
        const fields = buildZohoLeadFields({
          debtTotal: debtsTotal > 0 ? debtsTotal : guide.debtAmount ?? null,
          isDefault: guide.debts.some((d) => d.isDefault) || guide.isDefault || null,
          entitiesCount: guide.debts.length || null,
          entitiesList,
          housing: guide.housing || null,
          mortgagePaid: guide.mortgagePaid ?? null,
          vehicle: guide.vehicle || null,
          income: guide.monthlyIncome ?? null,
          expenses: guide.monthlyExpenses ?? null,
          housingPayment: guide.housingPayment ?? null,
          vehiclePayment: guide.vehiclePayment ?? null,
          debtsMonthlyPaying,
          monthlyOutflow,
          paymentCapacity,
          affordablePayment,
          employment: guide.employment ?? null,
          solution: result.triage?.title ?? null,
        });
        void syncLeadToZoho(leadExternalId, fields).then((ok) => {
          if (!ok) toast.warning("Caso guardado, pero no se pudo sincronizar con Zoho");
        });
      }
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
    setRelevantFacts(parseFactsFromText(c.case_text));
    setNewFact("");
    setGuide({ ...emptyGuide(), ...(c.guide_fields || {}) });
    const gf = (c.guide_fields || {}) as {
      engagement?: number;
      engagementByPhase?: number[];
      reactions?: string[];
      contract?: ContractFields;
      signatureStatus?: string;
    };
    if (Array.isArray(gf.engagementByPhase) && gf.engagementByPhase.length === 6) {
      setEngagementByPhase(gf.engagementByPhase.map((v) => v ?? 1));
    } else if (Array.isArray(gf.engagementByPhase) && gf.engagementByPhase.length === 5) {
      // Compat: casos con 5 fases (sin Presentación) → antepone la fase nueva.
      setEngagementByPhase([1, ...gf.engagementByPhase.map((v) => v ?? 1)]);
    } else {
      // Compat: solo existía el tier global → a Cualificación (índice 1).
      const old = typeof gf.engagement === "number" ? gf.engagement : 1;
      setEngagementByPhase([1, old, 1, 1, 1, 1]);
    }
    setReactions(Array.isArray(gf.reactions) ? gf.reactions : []);
    setContract({ ...emptyContract(), ...(gf.contract || {}) });
    setSignatureStatus(gf.signatureStatus || "pendiente");
    setResult({
      triage: { solution: c.triage_solution ?? "", title: c.triage_title ?? "" },
      diagnosis_internal: parseCards(c.diagnosis_internal),
      diagnosis_client: c.diagnosis_client ?? "",
      solution_internal: parseCards(c.solution_internal),
      solution_client: c.solution_client ?? "",
    });
    setSavedId(c.id);
    setStep(2);
    setSub(0);
    autoGenRef.current = {};
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

  // Gate de engagement de la fase actual. Se renderiza una sola vez y se
  // coloca en la columna izquierda (desktop) o en el flujo de la fase (móvil).
  const currentEngagementGate = (() => {
    if (step === 0)
      return (
        <EngagementGate
          value={engagement}
          onChange={setEngagement}
          title="¿Cómo te ha recibido?"
          ctaLabel="Ir a cualificación"
          onContinue={proceedToQualification}
          loading={generating}
          phrases={REACTION_PHRASES_PRESENTATION}
          selectedPhrases={reactions}
          onTogglePhrase={togglePhrase}
          onReinforce={() => void reinforcePhase(0)}
          reinforceLoading={reinforcing}
          reinforceData={reinforceByStep[0]}
        />
      );
    if (step === 1)
      return (
        <EngagementGate
          value={engagement}
          onChange={setEngagement}
          title="Engagement antes del diagnóstico"
          ctaLabel="Generar diagnóstico"
          onContinue={generate}
          loading={generating}
          phrases={REACTION_PHRASES_QUALIFICATION}
          selectedPhrases={reactions}
          onTogglePhrase={togglePhrase}
          onReinforce={() => void reinforcePhase(1)}
          reinforceLoading={reinforcing}
          reinforceData={reinforceByStep[1]}
        />
      );
    if (step === 2 && result)
      return (
        <EngagementGate
          value={engagement}
          onChange={setEngagement}
          title="Re-evalúa el engagement antes de la solución"
          ctaLabel="Preparar solución"
          onContinue={proceedToSolution}
          loading={generating}
          phrases={REACTION_PHRASES_DIAGNOSIS}
          selectedPhrases={reactions}
          onTogglePhrase={togglePhrase}
          onReinforce={() => void reinforcePhase(2)}
          reinforceLoading={reinforcing}
          reinforceData={reinforceByStep[2]}
        />
      );
    if (step === 3 && result)
      return (
        <EngagementGate
          value={engagement}
          onChange={setEngagement}
          title="Engagement antes del contrato"
          ctaLabel="Ir a contrato"
          onContinue={goToContract}
          loading={generating}
          phrases={REACTION_PHRASES_SOLUTION}
          selectedPhrases={reactions}
          onTogglePhrase={togglePhrase}
          onReinforce={() => void reinforcePhase(3)}
          reinforceLoading={reinforcing}
          reinforceData={reinforceByStep[3]}
        />
      );
    if (step === 4 && result)
      return (
        <EngagementGate
          value={engagement}
          onChange={setEngagement}
          title="Engagement antes de la firma"
          ctaLabel="Ir a firma"
          onContinue={goToSign}
          loading={generating}
          phrases={REACTION_PHRASES_CONTRACT}
          selectedPhrases={reactions}
          onTogglePhrase={togglePhrase}
          onReinforce={() => void reinforcePhase(4)}
          reinforceLoading={reinforcing}
          reinforceData={reinforceByStep[4]}
        />
      );
    if (step === 5 && result)
      return (
        <EngagementGate
          value={engagement}
          onChange={setEngagement}
          title="Engagement en la firma"
          ctaLabel="Regenerar guion de cierre"
          onContinue={() => void runPhase("signing")}
          loading={generating}
          phrases={REACTION_PHRASES_SIGN}
          selectedPhrases={reactions}
          onTogglePhrase={togglePhrase}
          onReinforce={() => void reinforcePhase(5)}
          reinforceLoading={reinforcing}
          reinforceData={reinforceByStep[5]}
        />
      );
    return null;
  })();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Seo
        title="Ventas · Diagnóstico"
        description="Herramienta interna de ventas"
        canonical="/admin/ventas"
        robots="noindex,nofollow"
      />
      {(() => {
        type Screen = { key: string; kind: "content" | "gate"; node: React.ReactNode };

        const kicker = (t: string) => (
          <p
            className="text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "hsl(var(--phase))" }}
          >
            {t}
          </p>
        );

        const scriptScreen = (k: string, card: ScriptCard): Screen => ({
          key: k,
          kind: "content",
          node: (
            <div className="space-y-4">
              {kicker(STEPS[step] + " · guion")}
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none">{card.emoji}</span>
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                  {card.title}
                </h2>
              </div>
              <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
                {card.body}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                style={phaseOutlineBtn}
                onClick={() => void copyText(card.emoji + " " + card.title + "\n" + card.body)}
              >
                <Copy className="mr-1 h-3.5 w-3.5" /> Copiar
              </Button>
            </div>
          ),
        });

        const clientScreen = (k: string, text: string, note?: string): Screen => ({
          key: k,
          kind: "content",
          node: (
            <div className="space-y-4">
              {kicker(STEPS[step] + " · para el cliente")}
              <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                Qué decirle al cliente
              </h2>
              <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
                {text || "—"}
              </p>
              {note && (
                <div
                  className="rounded-lg border p-3 text-xs text-foreground/90"
                  style={{ borderColor: "hsl(var(--phase) / 0.3)", backgroundColor: "hsl(var(--phase) / 0.05)" }}
                >
                  <span className="font-semibold" style={{ color: "hsl(var(--phase))" }}>
                    Cómo abordar el siguiente paso:{" "}
                  </span>
                  {note}
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                style={phaseOutlineBtn}
                onClick={() => void copyText(text)}
              >
                <Copy className="mr-1 h-3.5 w-3.5" /> Copiar
              </Button>
            </div>
          ),
        });

        const gate: Screen = { key: "gate", kind: "gate", node: currentEngagementGate };

        const screens: Screen[] = [];

        // Refuerzo: si se ha generado refuerzo para esta fase, sus guiones
        // entran como pantallas más del flujo typeform (antes del gate),
        // en lugar de renderizarse "a la antigua" debajo del gate.
        const pushGate = () => {
          const r = reinforceByStep[step];
          if (r) {
            r.internal.forEach((c, i) => screens.push(scriptScreen("reinforce-" + i, c)));
            if (r.client) screens.push(clientScreen("reinforce-client", r.client));
          }
          screens.push(gate);
        };

        if (step === 0) {
          // Pantalla 1: elegir el/los guion(es) de apertura según el tipo de cliente.
          const toggleP = (id: string) =>
            setSelectedPresentations((prev) =>
              prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
            );
          screens.push({
            key: "presentation-select",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Guion de apertura · elige el enfoque")}
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                  ¿Cómo es la persona al otro lado?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Selecciona uno o varios perfiles. Verás solo los guiones que elijas.
                </p>
                <div className="space-y-2.5">
                  {PRESENTATION_SCRIPTS.map((s) => {
                    const on = selectedPresentations.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleP(s.id)}
                        className={
                          "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition-colors " +
                          (on
                            ? "border-phase-presentation bg-phase-presentation-soft"
                            : "border-border hover:bg-muted/50")
                        }
                      >
                        <span
                          className={
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border " +
                            (on
                              ? "border-phase-presentation bg-phase-presentation text-phase-presentation-foreground"
                              : "border-muted-foreground/40")
                          }
                        >
                          {on && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span className="text-sm font-medium leading-snug text-foreground">
                          {s.when}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ),
          });
          const chosen = PRESENTATION_SCRIPTS.filter((s) =>
            selectedPresentations.includes(s.id),
          );
          chosen.forEach((s, i) =>
            screens.push({
              key: s.id,
              kind: "content",
              node: (
                <div className="space-y-4">
                  {kicker("Guion de apertura · " + (i + 1) + "/" + chosen.length)}
                  <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                    {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{s.when}</p>
                  <p className="whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
                    {s.text}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    style={phaseOutlineBtn}
                    onClick={() => void copyText(s.text)}
                  >
                    <Copy className="mr-1 h-3.5 w-3.5" /> Copiar
                  </Button>
                </div>
              ),
            }),
          );
          pushGate();
        } else if (step === 1) {
          // Datos del caso
          screens.push({
            key: "case",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Cualificación · el caso")}
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                  ¿Quién es y qué le pasa?
                </h2>
                <CaseFactsPanel
                  label={label}
                  onLabelChange={setLabel}
                  facts={relevantFacts}
                  newFact={newFact}
                  onNewFactChange={setNewFact}
                  onAddFact={addFact}
                  onRemoveFact={removeFact}
                />
              </div>
            ),
          });
          // Deudas
          screens.push({
            key: "debts",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Cualificación · deudas")}
                <div className="flex items-center justify-between">
                  <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                    Deudas por entidad
                  </h2>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    style={phaseOutlineBtn}
                    onClick={addDebt}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Añadir entidad
                  </Button>
                </div>
                <div className="max-h-[42vh] space-y-1.5 overflow-y-auto pr-1">
                  {guide.debts.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Añade cada entidad con su importe y cuota.
                    </p>
                  )}
                  {guide.debts.map((d, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[minmax(110px,1.2fr)_minmax(100px,1.4fr)_80px_80px_auto_auto] items-center gap-1.5 rounded-md border border-border bg-background/60 px-1.5 py-1"
                    >
                      <Select value={d.type} onValueChange={(v) => updateDebt(i, { type: v })}>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Tipo" />
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
                        className="h-8 text-xs"
                        value={d.entity}
                        onChange={(e) => updateDebt(i, { entity: e.target.value })}
                        placeholder="Entidad"
                      />
                      <Input
                        className="h-8 text-xs"
                        type="number"
                        value={d.amount ?? ""}
                        onChange={(e) =>
                          updateDebt(i, { amount: e.target.value ? Number(e.target.value) : undefined })
                        }
                        placeholder="Importe €"
                      />
                      <Input
                        className="h-8 text-xs"
                        type="number"
                        value={d.monthlyPayment ?? ""}
                        onChange={(e) =>
                          updateDebt(i, { monthlyPayment: e.target.value ? Number(e.target.value) : undefined })
                        }
                        placeholder="Cuota €"
                      />
                      <div className="flex h-8 items-center gap-0.5 rounded-md bg-muted p-0.5">
                        {[
                          { v: true, l: "Impago" },
                          { v: false, l: "Al día" },
                        ].map((o) => {
                          const activeState = d.isDefault === o.v;
                          return (
                            <button
                              key={o.l}
                              type="button"
                              onClick={() => updateDebt(i, { isDefault: o.v })}
                              style={
                                activeState && !o.v
                                  ? { backgroundColor: "hsl(var(--phase))", color: "hsl(var(--phase-fg))" }
                                  : undefined
                              }
                              className={"rounded px-2.5 py-1 text-[10px] font-semibold transition-colors " +
                                (activeState
                                  ? o.v
                                    ? "bg-destructive text-destructive-foreground shadow-sm"
                                    : "shadow-sm"
                                  : "text-muted-foreground hover:text-foreground")}
                            >
                              {o.l}
                            </button>
                          );
                        })}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => removeDebt(i)}
                        aria-label="Eliminar entidad"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
                {guide.debts.length > 0 && (
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm font-semibold text-foreground">
                    <span>Deuda total: {debtsTotal.toLocaleString("es-ES")} €</span>
                    {debtsMonthlyPaying > 0 && (
                      <span>Cuotas que paga: {debtsMonthlyPaying.toLocaleString("es-ES")} €/mes</span>
                    )}
                    {debtsMonthlyDefaulted > 0 && (
                      <span className="text-muted-foreground">
                        Cuotas impagadas: {debtsMonthlyDefaulted.toLocaleString("es-ES")} €/mes
                      </span>
                    )}
                  </div>
                )}
              </div>
            ),
          });
          // Empleo
          screens.push({
            key: "empleo",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Cualificación · empleo")}
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                  Situación laboral
                </h2>
                <Select
                  value={guide.employment ?? ""}
                  onValueChange={(v) => setGuide((g) => ({ ...g, employment: v as Employment }))}
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
            ),
          });
          // Ingresos
          screens.push({
            key: "ingresos",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Cualificación · ingresos")}
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                  Ingresos mensuales
                </h2>
                <Input
                  type="number"
                  value={guide.monthlyIncome ?? ""}
                  onChange={(e) =>
                    setGuide((g) => ({ ...g, monthlyIncome: e.target.value ? Number(e.target.value) : undefined }))
                  }
                  placeholder="1200"
                />
                <p className="text-xs text-muted-foreground">Ingresos netos que entran cada mes (€).</p>
              </div>
            ),
          });
          // Gastos
          screens.push({
            key: "gastos",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Cualificación · gastos")}
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                  Gastos mensuales de vida
                </h2>
                <Input
                  type="number"
                  value={guide.monthlyExpenses ?? ""}
                  onChange={(e) =>
                    setGuide((g) => ({ ...g, monthlyExpenses: e.target.value ? Number(e.target.value) : undefined }))
                  }
                  placeholder="650"
                />
                <p className="text-xs text-muted-foreground">
                  Comida, suministros, etc. (sin contar deudas, vivienda ni coche).
                </p>
              </div>
            ),
          });
          // Vivienda
          screens.push({
            key: "vivienda",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Cualificación · vivienda")}
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">Vivienda</h2>
                <div className="flex flex-wrap gap-2">
                  {(["propiedad", "hipoteca", "alquiler"] as const).map((h) => (
                    <Button
                      key={h}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={guide.housing === h ? "hover:opacity-90" : undefined}
                      style={guide.housing === h ? phasePrimaryBtn : phaseOutlineBtn}
                      onClick={() => setGuide((g) => ({ ...g, housing: g.housing === h ? "" : h }))}
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
                          setGuide((g) => ({ ...g, housingValue: e.target.value ? Number(e.target.value) : undefined }))
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
                              setGuide((g) => ({ ...g, mortgagePaid: e.target.value ? Number(e.target.value) : undefined }))
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
                              setGuide((g) => ({ ...g, mortgageRemaining: e.target.value ? Number(e.target.value) : undefined }))
                            }
                            placeholder="120000"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
                {(guide.housing === "alquiler" || guide.housing === "hipoteca") && (
                  <div className="space-y-1">
                    <Label className="text-xs">
                      {guide.housing === "alquiler" ? "Cuota de alquiler (€/mes)" : "Cuota de hipoteca (€/mes)"}
                    </Label>
                    <Input
                      type="number"
                      value={guide.housingPayment ?? ""}
                      onChange={(e) =>
                        setGuide((g) => ({ ...g, housingPayment: e.target.value ? Number(e.target.value) : undefined }))
                      }
                      placeholder="650"
                    />
                  </div>
                )}
              </div>
            ),
          });
          // Vehículo
          screens.push({
            key: "vehiculo",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Cualificación · vehículo")}
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">Vehículo</h2>
                <div className="flex flex-wrap gap-2">
                  {(["propiedad", "financiado", "no"] as const).map((v) => (
                    <Button
                      key={v}
                      type="button"
                      variant="outline"
                      size="sm"
                      className={guide.vehicle === v ? "hover:opacity-90" : undefined}
                      style={guide.vehicle === v ? phasePrimaryBtn : phaseOutlineBtn}
                      onClick={() => setGuide((g) => ({ ...g, vehicle: g.vehicle === v ? "" : v }))}
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
                          setGuide((g) => ({ ...g, vehicleValue: e.target.value ? Number(e.target.value) : undefined }))
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
                              setGuide((g) => ({ ...g, vehiclePaid: e.target.value ? Number(e.target.value) : undefined }))
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
                              setGuide((g) => ({ ...g, vehicleRemaining: e.target.value ? Number(e.target.value) : undefined }))
                            }
                            placeholder="6000"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
                {guide.vehicle === "financiado" && (
                  <div className="space-y-1">
                    <Label className="text-xs">Cuota del vehículo (€/mes)</Label>
                    <Input
                      type="number"
                      value={guide.vehiclePayment ?? ""}
                      onChange={(e) =>
                        setGuide((g) => ({ ...g, vehiclePayment: e.target.value ? Number(e.target.value) : undefined }))
                      }
                      placeholder="220"
                    />
                  </div>
                )}
              </div>
            ),
          });
          // Resumen económico
          screens.push({
            key: "resumen",
            kind: "content",
            node: (
              <div className="space-y-4">
                {kicker("Cualificación · resumen")}
                <h2 className="font-poppins text-xl font-bold leading-tight text-foreground">
                  Resumen económico
                </h2>
                {monthlyOutflow > 0 ? (
                  <div className="space-y-1 rounded-lg border border-accent/30 bg-accent/5 p-3">
                    <p className="text-sm font-semibold text-foreground">
                      Total que paga al mes: {monthlyOutflow.toLocaleString("es-ES")} €
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {debtsMonthlyPaying > 0 && "Cuotas que paga " + debtsMonthlyPaying.toLocaleString("es-ES") + " € · "}
                      {(guide.housingPayment ?? 0) > 0 && "Vivienda " + (guide.housingPayment ?? 0).toLocaleString("es-ES") + " € · "}
                      {(guide.vehiclePayment ?? 0) > 0 && "Vehículo " + (guide.vehiclePayment ?? 0).toLocaleString("es-ES") + " € · "}
                      {(guide.monthlyExpenses ?? 0) > 0 && "Gastos de vida " + (guide.monthlyExpenses ?? 0).toLocaleString("es-ES") + " €"}
                    </p>
                    {debtsMonthlyDefaulted > 0 && (
                      <p className="text-xs text-muted-foreground/80">
                        Cuotas ya impagadas: {debtsMonthlyDefaulted.toLocaleString("es-ES")} €/mes — no salen de su bolsillo, pero generan intereses/ASNEF.
                      </p>
                    )}
                    {guide.monthlyIncome != null && (
                      (() => {
                        // Compromiso real total: lo que paga + las cuotas que ya
                        // impaga (esas deudas siguen siendo suyas y debería pagarlas).
                        const totalCommitment = monthlyOutflow + debtsMonthlyDefaulted;
                        const gap = guide.monthlyIncome - totalCommitment;
                        return (
                          <p className={"text-xs font-medium " + (gap < 0 ? "text-destructive" : "text-foreground/80")}>
                            {gap < 0
                              ? "Le faltan " + Math.abs(gap).toLocaleString("es-ES") + " €/mes para cubrir todas sus cuotas (incluidas las impagadas), con ingresos de " + guide.monthlyIncome.toLocaleString("es-ES") + " €"
                              : "Le quedan " + gap.toLocaleString("es-ES") + " €/mes tras cubrir todas sus cuotas (incluidas las impagadas), con ingresos de " + guide.monthlyIncome.toLocaleString("es-ES") + " €"}
                          </p>
                        );
                      })()
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Completa las preguntas anteriores para ver el resumen económico.
                  </p>
                )}
              </div>
            ),
          });
          pushGate();
        } else if (result) {
          if (step === 2) {
            if (paymentCapacity != null) {
              screens.push({
                key: "capacidad",
                kind: "content",
                node: (
                  <div className="space-y-4">
                    {kicker("Diagnóstico · capacidad de pago")}
                    <h2 className="flex items-center gap-2 font-poppins text-xl font-bold text-destructive">
                      <AlertTriangle className="h-5 w-5" /> Capacidad de pago mensual
                    </h2>
                    <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Ingresos</p>
                        <p className="font-semibold text-foreground">{(guide.monthlyIncome ?? 0).toLocaleString("es-ES")} €</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Gastos esenciales</p>
                        <p className="font-semibold text-foreground">{essentialOutflow.toLocaleString("es-ES")} €</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Capacidad libre</p>
                        <p className={"font-semibold " + (paymentCapacity < 0 ? "text-destructive" : "text-foreground")}>
                          {paymentCapacity.toLocaleString("es-ES")} €
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Cuota asumible</p>
                        <p className="font-semibold text-phase-solution">{(affordablePayment ?? 0).toLocaleString("es-ES")} €</p>
                      </div>
                    </div>
                  </div>
                ),
              });
            }
            result.diagnosis_internal.forEach((c, i) => screens.push(scriptScreen("diag-" + i, c)));
            screens.push(clientScreen("diag-client", result.diagnosis_client, result.approach));
          } else if (step === 3) {
            result.solution_internal.forEach((c, i) => screens.push(scriptScreen("sol-" + i, c)));
            screens.push(clientScreen("sol-client", result.solution_client, result.approach));
          } else if (step === 4) {
            if (generating && !(result.contract_internal?.length)) {
              screens.push({
                key: "contract-loading",
                kind: "content",
                node: (
                  <div className="flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 p-8 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Preparando el guion de cierre…
                  </div>
                ),
              });
            } else {
              (result.contract_internal ?? []).forEach((c, i) => screens.push(scriptScreen("contract-" + i, c)));
              if (result.contract_message) screens.push(clientScreen("contract-client", result.contract_message));
              if (!(result.contract_internal?.length) && !result.contract_message) {
                screens.push({
                  key: "contract-empty",
                  kind: "content",
                  node: (
                    <div className="space-y-3 text-center">
                      <p className="text-sm text-muted-foreground">Genera el guion de cierre.</p>
                      <Button size="sm" variant="outline" style={phasePrimaryBtn} onClick={() => void runPhase("contract_message")} disabled={generating}>
                        <Sparkles className="mr-2 h-4 w-4" /> Generar guion de cierre
                      </Button>
                    </div>
                  ),
                });
              }
            }
          } else if (step === 5) {
            if (generating && !(result.signing_internal?.length)) {
              screens.push({
                key: "sign-loading",
                kind: "content",
                node: (
                  <div className="flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 p-8 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Preparando el guion de cierre…
                  </div>
                ),
              });
            } else {
              (result.signing_internal ?? []).forEach((c, i) => screens.push(scriptScreen("sign-" + i, c)));
              if (result.signing_client) screens.push(clientScreen("sign-client", result.signing_client));
            }
            // Estado de firma + guardar
            screens.push({
              key: "sign-status",
              kind: "content",
              node: (
                <div className="space-y-4">
                  {kicker("Firma · cierre")}
                  <h2 className="flex items-center gap-2 font-poppins text-xl font-bold text-foreground">
                    <PenLine className="h-5 w-5" /> Estado de la firma
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {SIGNATURE_STATUS_OPTIONS.map((o) => (
                      <Button
                        key={o.value}
                        type="button"
                        variant="outline"
                        size="sm"
                        className={signatureStatus === o.value ? "hover:opacity-90" : undefined}
                        style={signatureStatus === o.value ? phasePrimaryBtn : phaseOutlineBtn}
                        onClick={() => setSignatureStatus(o.value)}
                      >
                        {o.label}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="hover:opacity-90"
                    style={phasePrimaryBtn}
                    onClick={saveCase}
                    disabled={saving || !!savedId}
                  >
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {savedId ? "Guardado" : "Guardar caso"}
                  </Button>
                </div>
              ),
            });
          }
          pushGate();
        } else {
          screens.push({
            key: "noresult",
            kind: "content",
            node: (
              <div className="space-y-3 text-center">
                <p className="text-sm text-muted-foreground">
                  Aún no hay diagnóstico. Vuelve a Cualificación y genéralo, o carga el caso de prueba.
                </p>
                <div className="flex justify-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                    <ArrowLeft className="mr-1 h-4 w-4" /> Ir a Cualificación
                  </Button>
                  <Button variant="orange" size="sm" onClick={loadTestCase}>
                    <Sparkles className="mr-1 h-4 w-4" /> Caso de prueba
                  </Button>
                </div>
              </div>
            ),
          });
        }

        const idx = Math.min(sub, screens.length - 1);
        const current = screens[idx];
        const isGate = current?.kind === "gate";
        const atFirstOverall = step === 0 && idx === 0;
        const progress = ((step + (idx + 1) / screens.length) / STEPS.length) * 100;

        const goNext = () => setSub((s) => Math.min(screens.length - 1, s + 1));
        const goBack = () => {
          if (idx > 0) {
            setSub((s) => Math.max(0, s - 1));
            return;
          }
          if (step > 0) {
            landOnLastRef.current = 9999;
            setStep(step - 1);
          }
        };

        return (
          <>
            {/* Barra superior mínima: progreso + fase + acceso a datos del caso */}
            <div
              className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
              style={phaseStyle(step)}
            >
              <div className="mx-auto w-full max-w-2xl px-4 py-2.5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: "hsl(var(--phase))" }}>
                      {step + 1}. {STEPS[step]}
                    </span>
                    {label.trim() && (
                      <span className="truncate text-[11px] text-muted-foreground">· {label.trim()}</span>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setShowCase((o) => !o)}
                      className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-[11px] font-semibold text-foreground hover:bg-muted"
                    >
                      <ClipboardList className="h-3.5 w-3.5 text-muted-foreground" />
                      Datos
                      <Badge variant="secondary" className="ml-0.5">{relevantFacts.length}</Badge>
                    </button>
                    <Button variant="orange" size="sm" onClick={loadTestCase}>
                      <Sparkles className="mr-1 h-4 w-4" /> Prueba
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetForm}>
                      <Plus className="mr-1 h-4 w-4" /> Nuevo
                    </Button>
                    <Link to="/admin/ventas/leads">
                      <Button variant="ghost" size="sm">Llamadas</Button>
                    </Link>
                    <Link to="/admin">
                      <Button variant="ghost" size="sm">Panel</Button>
                    </Link>
                  </div>
                </div>
                <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: progress + "%", backgroundColor: "hsl(var(--phase))" }}
                  />
                </div>
                {/* Añadir dato: siempre disponible en cualquier paso del flujo */}
                <div className="mt-2 flex gap-2">
                  <Input
                    value={newFact}
                    onChange={(e) => setNewFact(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFact();
                      }
                    }}
                    placeholder="Añadir dato relevante y pulsa Enter…"
                    className="h-8 text-xs"
                  />
                  <Button type="button" size="icon" className="h-8 w-8 shrink-0" onClick={addFact} aria-label="Añadir dato relevante">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {showCase && (
                  <CaseFactsPanel
                    label={label}
                    onLabelChange={setLabel}
                    facts={relevantFacts}
                    newFact={newFact}
                    onNewFactChange={setNewFact}
                    onAddFact={addFact}
                    onRemoveFact={removeFact}
                  />
                )}
              </div>
            </div>

            {/* Card única centrada (typeform) */}
            <div className="flex flex-1 items-start justify-center px-4 py-8" style={phaseStyle(step)}>
              <div
                key={step + "-" + idx}
                className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div
                  className={"phase-card space-y-6 rounded-2xl border border-l-4 p-6 shadow-sm sm:p-8 " + PHASE_THEMES[step].border + " " + PHASE_THEMES[step].soft}
                  style={phaseStyle(step)}
                >
                  {current?.node}
                  <div
                    className="flex items-center justify-between border-t pt-5"
                    style={{ borderColor: "hsl(var(--phase) / 0.18)" }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={goBack}
                      disabled={atFirstOverall}
                      style={phaseOutlineBtn}
                    >
                      <ArrowLeft className="mr-1 h-4 w-4" /> Atrás
                    </Button>
                    {!isGate && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goNext}
                        className="hover:opacity-90"
                        style={phasePrimaryBtn}
                      >
                        Siguiente <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};

export default AdminVentas;