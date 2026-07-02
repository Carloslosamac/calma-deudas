import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
} from "lucide-react";
import Seo from "@/components/seo/Seo";
import ConversionChart from "@/components/ventas/ConversionChart";
import {
  ContractFields,
  emptyContract,
  downloadContractPdf,
  computeContractTotal,
} from "@/lib/contratoPdf";

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
  vehicle: Vehicle;
  vehicleValue?: number;
  vehiclePaid?: number;
  vehicleRemaining?: number;
  vehiclePayment?: number;
  employment?: Employment;
  monthlyIncome?: number;
  monthlyExpenses?: number;
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
    className={`phase-card space-y-4 border-l-4 p-4 sm:p-5 ${PHASE_THEMES[phase].border} ${PHASE_THEMES[phase].soft} ${className ?? ""}`}
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
}: {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="space-y-3 border-t pt-4 first:border-t-0 first:pt-0" style={{ borderColor: "hsl(var(--phase) / 0.18)" }}>
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
          {facts.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Añade los datos clave del caso (deudas, ingresos, situación, preocupaciones…). Alimentan los guiones.
            </p>
          ) : (
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
              className="flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors shadow-sm"
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

      {phrases && phrases.length > 0 && onTogglePhrase && (
        <div className="space-y-2 border-t border-border pt-3">
          <p className="text-xs font-semibold text-foreground">
            ¿Cómo ha reaccionado? <span className="font-normal text-muted-foreground">(marca las frases que apliquen)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {phrases.map((p) => {
              const on = (selectedPhrases ?? []).includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onTogglePhrase(p)}
                  className="rounded-full border px-3 py-1.5 text-[11px] font-medium leading-tight transition-colors"
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
        <div className="space-y-3 border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">
            ¿No quiere avanzar todavía (se lo piensa, lo consulta, quiere
            colgar)? Genera argumentario para rebatir la objeción y reintentar el
            paso sin presionar.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={onReinforce}
            disabled={reinforceLoading}
            className="w-full"
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
          <ReinforceBlock data={reinforceData} />
        </div>
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
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { session, isAdmin, loading } = useAdminAuth();

  const [step, setStep] = useState(0);
  const [qualStep, setQualStep] = useState(0);
  const [label, setLabel] = useState("");
  const [relevantFacts, setRelevantFacts] = useState<string[]>([]);
  const [newFact, setNewFact] = useState("");
  const [guide, setGuide] = useState<GuideFields>(emptyGuide());
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
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

  const { data: cases } = useQuery({
    queryKey: ["sales-cases"],
    queryFn: fetchCases,
    enabled: !!session && isAdmin,
  });

  const resetForm = () => {
    setStep(0);
    setLabel("");
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
  };

  const loadTestCase = () => {
    setReinforceByStep({});
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

  const runGeneration = async (nextStep: number) => {
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
        body: { caseText: caseText.trim(), guide: payloadGuide, engagement, engagementByPhase, reactions, contract },
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
  const proceedToSolution = () => void runGeneration(3);

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
    if (step === 1 && qualStep === 4)
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
    <div className="min-h-screen bg-background px-4 py-4">
      <Seo
        title="Ventas · Diagnóstico"
        description="Herramienta interna de ventas"
        canonical="/admin/ventas"
        robots="noindex,nofollow"
      />
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h1 className="font-poppins text-lg font-bold text-foreground">
            Herramienta de ventas
          </h1>
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

        <div className="lg:grid lg:grid-cols-[320px_minmax(0,1fr)] lg:items-start lg:gap-6">
        {/* Cabecera pegajosa: gráfico de conversión + stepper siempre visibles.
            En móvil va pegada arriba a lo ancho; en desktop se convierte en una
            columna lateral fija para liberar espacio vertical. */}
        <div className="sticky top-0 z-20 -mx-4 mb-4 border-b border-border bg-background/95 px-4 pb-3 pt-2 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:top-4 lg:z-10 lg:mx-0 lg:mb-0 lg:rounded-xl lg:border lg:px-4 lg:py-4 lg:shadow-sm supports-[backdrop-filter]:lg:bg-background/95">
          <ConversionChart
            steps={STEPS}
            currentStep={step}
            engagementByPhase={engagementByPhase}
            compact
          />
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {STEPS.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(i)}
                className={`flex flex-1 basis-[30%] items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-colors sm:basis-0 ${
                  step === i
                    ? PHASE_THEMES[i].active
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                }`}
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    step === i ? "bg-current opacity-80" : PHASE_THEMES[i].dot
                  }`}
                />
                {i + 1}. {s}
              </button>
            ))}
          </div>

          {/* Panel del caso: datos relevantes añadidos uno a uno, disponible en
              cualquier fase y que alimenta la generación de guiones. */}
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

        {/* Columna principal: fase activa + historial */}
        <div className="min-w-0">

        {/* Fase 1: Presentación */}
        {step === 0 && (
          <div className="space-y-4" style={phaseStyle(0)}>
            <PhaseCard phase={0}>
              {/* Encuadre de autoridad: contundente, antes de tocar el caso. */}
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: "hsl(var(--phase) / 0.12)" }}
              >
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "hsl(var(--phase))" }}
                >
                  Encuadre de autoridad
                </p>
                <h2 className="mt-1 font-anton text-2xl uppercase leading-tight text-foreground">
                  Somos Calma. Resolvemos deudas, no las gestionamos.
                </h2>
                <p className="mt-2 text-sm text-foreground/80">
                  Antes de nada, marca autoridad: quiénes somos, qué garantizamos y por qué
                  esta llamada merece toda su atención. Hablas con expertos legales que ya han
                  sacado a cientos de personas de esta misma situación. Tono firme, cercano y
                  sin titubeos.
                </p>
              </div>

              <Section
                icon={<Sparkles className="h-4 w-4" />}
                title="Guion de apertura"
                subtitle="Guiones fijos de Carlos. Elige el que encaje según cómo llegue la persona; la presentación siempre es la misma, va antes del caso."
              >
                <div className="space-y-3">
                  {PRESENTATION_SCRIPTS.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-lg border border-border bg-background/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{s.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{s.when}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="shrink-0"
                          onClick={() => void copyText(s.text)}
                        >
                          <Copy className="mr-1 h-3.5 w-3.5" /> Copiar
                        </Button>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            </PhaseCard>

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
          </div>
        )}

        {/* Fase 2: Cualificación */}
        {step === 1 && (
          <div className="space-y-4" style={phaseStyle(1)}>
            <PhaseCard phase={1}>
            {(() => {
              const QUAL_TITLES = [
                "Deudas por entidad",
                "Empleo, ingresos y gastos",
                "Vivienda",
                "Vehículo",
                "Resumen económico",
              ];
              const last = QUAL_TITLES.length - 1;
              return (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-foreground">
                    Pregunta {qualStep + 1} de {QUAL_TITLES.length}
                    <span className="ml-1 font-normal text-muted-foreground">
                      · {QUAL_TITLES[qualStep]}
                    </span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {QUAL_TITLES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        aria-label={`Ir a pregunta ${i + 1}`}
                        onClick={() => setQualStep(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === qualStep ? "w-5 bg-[hsl(var(--phase))]" : "w-2 bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              );
            })()}

            {qualStep === 0 && (
            <Section
              icon={<ClipboardList className="h-4 w-4" />}
              title="Deudas por entidad"
              subtitle="Cada entidad con su importe, cuota y si está en impago."
            >
              <div className="space-y-3">
            {/* Deudas por entidad */}
            <div className="space-y-3">
              <div className="flex justify-end">
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
                    className="space-y-2 rounded-lg border border-border p-3"
                  >
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto]">
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
                    <Input
                      value={d.entity}
                      onChange={(e) => updateDebt(i, { entity: e.target.value })}
                      placeholder="Entidad (ej. WiZink, Cetelem...)"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        value={d.amount ?? ""}
                        onChange={(e) =>
                          updateDebt(i, {
                            amount: e.target.value ? Number(e.target.value) : undefined,
                          })
                        }
                        placeholder="Importe total (€)"
                      />
                      <Input
                        type="number"
                        value={d.monthlyPayment ?? ""}
                        onChange={(e) =>
                          updateDebt(i, {
                            monthlyPayment: e.target.value ? Number(e.target.value) : undefined,
                          })
                        }
                        placeholder="Cuota mensual (€)"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">¿En impago?</span>
                      {[
                        { v: true, l: "Sí" },
                        { v: false, l: "No" },
                      ].map((o) => (
                        <Button
                          key={o.l}
                          type="button"
                          size="sm"
                          variant={d.isDefault === o.v ? "default" : "outline"}
                          onClick={() => updateDebt(i, { isDefault: o.v })}
                        >
                          {o.l}
                        </Button>
                      ))}
                    </div>
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
              </div>
            </Section>
            )}

            {qualStep === 1 && (
            <Section title="Empleo, ingresos y gastos">
              <div className="space-y-4">
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
              <Label htmlFor="expenses">Gastos mensuales de vida (€)</Label>
              <Input
                id="expenses"
                type="number"
                value={guide.monthlyExpenses ?? ""}
                onChange={(e) =>
                  setGuide((g) => ({
                    ...g,
                    monthlyExpenses: e.target.value ? Number(e.target.value) : undefined,
                  }))
                }
                placeholder="Comida, suministros, etc. (sin contar deudas, vivienda ni coche)"
              />
            </div>
              </div>
            </Section>
            )}

            {qualStep === 2 && (
            <Section title="Vivienda">
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
              {(guide.housing === "alquiler" || guide.housing === "hipoteca") && (
                <div className="space-y-1">
                  <Label className="text-xs">
                    {guide.housing === "alquiler"
                      ? "Cuota de alquiler (€/mes)"
                      : "Cuota de hipoteca (€/mes)"}
                  </Label>
                  <Input
                    type="number"
                    value={guide.housingPayment ?? ""}
                    onChange={(e) =>
                      setGuide((g) => ({
                        ...g,
                        housingPayment: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    placeholder="650"
                  />
                </div>
              )}
            </div>
            </Section>
            )}

            {qualStep === 3 && (
            <Section title="Vehículo">
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
              {guide.vehicle === "financiado" && (
                <div className="space-y-1">
                  <Label className="text-xs">Cuota del vehículo (€/mes)</Label>
                  <Input
                    type="number"
                    value={guide.vehiclePayment ?? ""}
                    onChange={(e) =>
                      setGuide((g) => ({
                        ...g,
                        vehiclePayment: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    placeholder="220"
                  />
                </div>
              )}
            </div>
            </Section>
            )}

            {qualStep === 4 && (
              <Section title="Resumen económico">
              {monthlyOutflow > 0 ? (
              <div className="space-y-1 rounded-lg border border-accent/30 bg-accent/5 p-3">
                <p className="text-sm font-semibold text-foreground">
                  Total que paga al mes: {monthlyOutflow.toLocaleString("es-ES")} €
                </p>
                <p className="text-xs text-muted-foreground">
                  {debtsMonthlyPaying > 0 && `Cuotas que paga ${debtsMonthlyPaying.toLocaleString("es-ES")} € · `}
                  {(guide.housingPayment ?? 0) > 0 && `Vivienda ${(guide.housingPayment ?? 0).toLocaleString("es-ES")} € · `}
                  {(guide.vehiclePayment ?? 0) > 0 && `Vehículo ${(guide.vehiclePayment ?? 0).toLocaleString("es-ES")} € · `}
                  {(guide.monthlyExpenses ?? 0) > 0 && `Gastos de vida ${(guide.monthlyExpenses ?? 0).toLocaleString("es-ES")} €`}
                </p>
                {debtsMonthlyDefaulted > 0 && (
                  <p className="text-xs text-muted-foreground/80">
                    Cuotas ya impagadas: {debtsMonthlyDefaulted.toLocaleString("es-ES")} €/mes — no salen de su bolsillo, pero generan intereses/ASNEF.
                  </p>
                )}
                {guide.monthlyIncome != null && (
                  <p
                    className={`text-xs font-medium ${
                      guide.monthlyIncome - monthlyOutflow < 0
                        ? "text-destructive"
                        : "text-foreground/80"
                    }`}
                  >
                    {guide.monthlyIncome - monthlyOutflow < 0
                      ? `Le faltan ${Math.abs(guide.monthlyIncome - monthlyOutflow).toLocaleString("es-ES")} €/mes para llegar (ingresos ${guide.monthlyIncome.toLocaleString("es-ES")} €)`
                      : `Le quedan ${(guide.monthlyIncome - monthlyOutflow).toLocaleString("es-ES")} €/mes tras pagos (ingresos ${guide.monthlyIncome.toLocaleString("es-ES")} €)`}
                  </p>
                )}
              </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Completa las preguntas anteriores para ver el resumen económico.
                </p>
              )}
              </Section>
            )}

            {/* Navegación entre preguntas */}
            <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: "hsl(var(--phase) / 0.18)" }}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQualStep((q) => Math.max(0, q - 1))}
                disabled={qualStep === 0}
              >
                <ArrowLeft className="mr-1 h-4 w-4" /> Anterior
              </Button>
              {qualStep < 4 && (
                <Button
                  type="button"
                  variant="orange"
                  size="sm"
                  onClick={() => setQualStep((q) => Math.min(4, q + 1))}
                >
                  Siguiente <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              )}
            </div>
            </PhaseCard>

            {qualStep === 4 && (
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
            )}
          </div>
        )}

        {/* Step 2: Diagnóstico */}
        {(step === 2 || step === 3 || step === 4 || step === 5) && !result && (
          <Card
            className={`phase-card space-y-3 border-l-4 p-6 text-center ${PHASE_THEMES[step].border} ${PHASE_THEMES[step].soft}`}
            style={phaseStyle(step)}
          >
            <p className="text-sm text-muted-foreground">
              Aún no hay diagnóstico. Genera uno desde la Cualificación o carga el
              caso de prueba para navegar entre secciones.
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Ir a Cualificación
              </Button>
              <Button variant="orange" size="sm" onClick={loadTestCase}>
                <Sparkles className="mr-1 h-4 w-4" /> Caso de prueba
              </Button>
            </div>
          </Card>
        )}

        {step === 2 && result && (
          <Card
            className={`phase-card space-y-4 border-l-4 p-6 ${PHASE_THEMES[2].border} ${PHASE_THEMES[2].soft}`}
            style={phaseStyle(2)}
          >
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-poppins text-lg font-bold text-destructive">
                <AlertTriangle className="h-5 w-5" /> Diagnóstico · consecuencias de no actuar
              </h2>
              <Badge variant="destructive">{result.triage.title}</Badge>
            </div>
            {paymentCapacity != null && (
              <div className="rounded-lg border border-border bg-background/70 p-4">
                <p className="mb-2 text-sm font-semibold text-foreground">
                  Capacidad de pago mensual
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Ingresos</p>
                    <p className="font-semibold text-foreground">
                      {(guide.monthlyIncome ?? 0).toLocaleString("es-ES")} €
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Gastos esenciales</p>
                    <p className="font-semibold text-foreground">
                      {essentialOutflow.toLocaleString("es-ES")} €
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Capacidad libre</p>
                    <p
                      className={`font-semibold ${
                        paymentCapacity < 0 ? "text-destructive" : "text-phase-solution"
                      }`}
                    >
                      {paymentCapacity.toLocaleString("es-ES")} €
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Cuota asumible</p>
                    <p className="font-semibold text-accent">
                      {(affordablePayment ?? 0).toLocaleString("es-ES")} €
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Capacidad = ingresos − gastos esenciales (vivienda, vehículo y gastos de vida),
                  sin contar las cuotas de deudas. La cuota asumible es el 60 % de esa capacidad,
                  como margen prudente para una propuesta sostenible.
                  {debtsMonthlyPaying > 0 &&
                    ` Hoy paga de verdad ${debtsMonthlyPaying.toLocaleString("es-ES")} €/mes en cuotas (las impagadas no salen de su bolsillo).`}
                </p>
              </div>
            )}
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
              phrases={REACTION_PHRASES_DIAGNOSIS}
              selectedPhrases={reactions}
              onTogglePhrase={togglePhrase}
              onReinforce={() => void reinforcePhase(2)}
              reinforceLoading={reinforcing}
              reinforceData={reinforceByStep[2]}
            />
            <div className="flex justify-start pt-1">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Editar caso
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Solución */}
        {step === 3 && result && (
          <Card
            className={`phase-card space-y-4 border-l-4 p-6 ${PHASE_THEMES[3].border} ${PHASE_THEMES[3].soft}`}
            style={phaseStyle(3)}
          >
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
            <div className="flex justify-start pt-1">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Diagnóstico
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Contrato */}
        {step === 4 && result && (
          <Card
            className={`phase-card space-y-5 border-l-4 p-6 ${PHASE_THEMES[4].border} ${PHASE_THEMES[4].soft}`}
            style={phaseStyle(4)}
          >
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-poppins text-lg font-bold text-foreground">
                <FileText className="h-5 w-5" /> Contrato · {result.triage.title}
              </h2>
              <Badge variant="outline">{result.triage.title}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Rellena los datos del firmante para generar el contrato. Es una
              plantilla base de prestación de servicios; revísala antes de enviarla.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="c-name">Nombre completo</Label>
                <Input
                  id="c-name"
                  value={contract.fullName}
                  onChange={(e) => setContract((c) => ({ ...c, fullName: e.target.value }))}
                  placeholder="Nombre y apellidos"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-dni">DNI / NIE</Label>
                <Input
                  id="c-dni"
                  value={contract.dni}
                  onChange={(e) => setContract((c) => ({ ...c, dni: e.target.value }))}
                  placeholder="00000000X"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="c-address">Domicilio</Label>
                <Input
                  id="c-address"
                  value={contract.address}
                  onChange={(e) => setContract((c) => ({ ...c, address: e.target.value }))}
                  placeholder="Calle, número, ciudad, CP"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-email">Email</Label>
                <Input
                  id="c-email"
                  type="email"
                  value={contract.email}
                  onChange={(e) => setContract((c) => ({ ...c, email: e.target.value }))}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-phone">Teléfono</Label>
                <Input
                  id="c-phone"
                  value={contract.phone}
                  onChange={(e) => setContract((c) => ({ ...c, phone: e.target.value }))}
                  placeholder="600000000"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Servicio contratado</Label>
                <Select
                  value={contract.service || result.triage.solution}
                  onValueChange={(v) => setContract((c) => ({ ...c, service: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lso">Ley de Segunda Oportunidad</SelectItem>
                    <SelectItem value="reunificar">Reunificación de deudas</SelectItem>
                    <SelectItem value="reclamacion">Reclamación judicial por usura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-signcity">Localidad de firma</Label>
                <Input
                  id="c-signcity"
                  value={contract.signCity}
                  onChange={(e) => setContract((c) => ({ ...c, signCity: e.target.value }))}
                  placeholder="Ej. Madrid"
                />
              </div>
            </div>

            {/* Modalidad de pago + cálculo automático */}
            <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
              <Label className="text-sm font-semibold">Modalidad de pago</Label>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="c-initial" className="text-xs">Pago inicial (€)</Label>
                  <Input
                    id="c-initial"
                    inputMode="decimal"
                    value={contract.initialPayment}
                    onChange={(e) => setContract((c) => ({ ...c, initialPayment: e.target.value }))}
                    placeholder="150"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-ninst" className="text-xs">Nº de cuotas</Label>
                  <Input
                    id="c-ninst"
                    inputMode="numeric"
                    value={contract.installments}
                    onChange={(e) => setContract((c) => ({ ...c, installments: e.target.value }))}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="c-amount" className="text-xs">Cuota mensual (€)</Label>
                  <Input
                    id="c-amount"
                    inputMode="decimal"
                    value={contract.installmentAmount}
                    onChange={(e) => setContract((c) => ({ ...c, installmentAmount: e.target.value }))}
                    placeholder="99"
                  />
                </div>
              </div>
              {(() => {
                const pay = computeContractTotal(contract);
                return (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-background p-3 text-sm">
                    <span className="text-muted-foreground">
                      {pay.initial.toLocaleString("es-ES")} € iniciales + {pay.installments} ×{" "}
                      {pay.amount.toLocaleString("es-ES")} € ={" "}
                      {pay.installmentsTotal.toLocaleString("es-ES")} € en cuotas
                    </span>
                    <span className="font-bold text-foreground">
                      Total: {pay.total.toLocaleString("es-ES")} € IVA incl.
                    </span>
                  </div>
                );
              })()}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  if (!contract.fullName.trim()) {
                    toast.error("Indica al menos el nombre del firmante.");
                    return;
                  }
                  downloadContractPdf({
                    ...contract,
                    service: contract.service || result.triage.solution,
                  });
                }}
              >
                <Download className="mr-2 h-4 w-4" /> Generar contrato (PDF)
              </Button>
              <Button
                variant="outline"
                onClick={() => void runPhase("contract_message")}
                disabled={generating}
              >
                {generating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Regenerar guion de envío
              </Button>
            </div>

            {generating && !(result.contract_internal?.length) ? (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Preparando el guion de envío…
              </div>
            ) : (
              ((result.contract_internal && result.contract_internal.length > 0) ||
                result.contract_message) && (
                <ResultBlock
                  internal={result.contract_internal ?? []}
                  client={result.contract_message ?? ""}
                />
              )
            )}

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
            <div className="flex justify-start pt-1">
              <Button variant="outline" onClick={() => setStep(3)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Solución
              </Button>
            </div>
          </Card>
        )}

        {/* Step 5: Firma */}
        {step === 5 && result && (
          <Card
            className={`phase-card space-y-4 border-l-4 p-6 ${PHASE_THEMES[5].border} ${PHASE_THEMES[5].soft}`}
            style={phaseStyle(5)}
          >
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-poppins text-lg font-bold text-foreground">
                <PenLine className="h-5 w-5" /> Firma · cierre online
              </h2>
            </div>

            {generating && !(result.signing_internal?.length) ? (
              <div className="flex items-center justify-center gap-2 rounded-lg border border-border bg-muted/40 p-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Preparando el guion de cierre…
              </div>
            ) : result.signing_internal && result.signing_internal.length > 0 ? (
              <ResultBlock
                internal={result.signing_internal}
                client={result.signing_client ?? ""}
              />
            ) : (
              <div className="rounded-lg border border-border p-4 text-center text-sm text-muted-foreground">
                Genera el guion de cierre de firma.
                <div className="mt-2">
                  <Button size="sm" onClick={() => void runPhase("signing")} disabled={generating}>
                    {generating ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Generar guion de firma
                  </Button>
                </div>
              </div>
            )}

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

            <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-4">
              <Label>Estado de la firma</Label>
              <div className="flex flex-wrap gap-2">
                {SIGNATURE_STATUS_OPTIONS.map((o) => (
                  <Button
                    key={o.value}
                    type="button"
                    variant={signatureStatus === o.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSignatureStatus(o.value)}
                  >
                    {o.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => setStep(4)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Contrato
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
        </div>{/* /columna principal */}
        </div>{/* /grid desktop */}
      </div>
    </div>
  );
};

export default AdminVentas;