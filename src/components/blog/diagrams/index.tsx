import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CreditCard,
  FileText,
  Gavel,
  Home,
  Landmark,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  Users,
  Wallet,
  X,
} from "lucide-react";
import {
  AlertTriangle,
  Phone,
  Mail,
  FileWarning,
  Scale,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => (
  <div
    className={`rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft md:p-8 ${className}`}
  >
    {children}
  </div>
);

const DiagramTitle: React.FC<React.PropsWithChildren<{ subtitle?: string }>> = ({
  children,
  subtitle,
}) => (
  <div className="mb-6 text-center">
    <h3 className="font-poppins text-xl font-semibold tracking-tight text-foreground md:text-2xl">
      {children}
    </h3>
    {subtitle && (
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
    )}
  </div>
);

/* 1. Factores que influyen en el coste */
export const CostFactorsGrid = ({
  title,
  subtitle,
  factors,
}: {
  title?: string;
  subtitle?: string;
  factors?: { icon: LucideIcon; title: string; desc: string }[];
}) => {
  const data = factors ?? [
    { icon: Wallet, title: "Volumen de la deuda", desc: "Cuanto más alta y compleja, más trabajo requiere el caso" },
    { icon: Users, title: "Número de acreedores", desc: "Más acreedores implica más notificaciones y trámites" },
    { icon: Briefcase, title: "Perfil personal", desc: "Asalariado, autónomo o ex-empresario cambia la documentación" },
    { icon: Home, title: "Bienes a tu nombre", desc: "Vivienda, coche o cuentas requieren un análisis específico" },
  ];
  return (
    <Card>
      <DiagramTitle subtitle={subtitle ?? "No todos los procedimientos cuestan lo mismo: depende de tu situación"}>
        {title ?? "Qué influye en el coste de tu caso"}
      </DiagramTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        {data.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex gap-4 rounded-2xl border border-border bg-surface p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-poppins font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* 2. Coste del proceso vs deuda cancelada */
export const CostVsDebtBars = ({
  title,
  subtitle,
  costLabel,
  costValue,
  debtLabel,
  debtValue,
  footnote,
  costWidthPct = 6,
}: {
  title?: string;
  subtitle?: string;
  costLabel?: string;
  costValue?: string;
  debtLabel?: string;
  debtValue?: string;
  footnote?: string;
  costWidthPct?: number;
}) => (
  <Card>
    <DiagramTitle subtitle={subtitle ?? "Ejemplo orientativo basado en casos reales"}>
      {title ?? "Coste del proceso vs. deuda que dejas atrás"}
    </DiagramTitle>
    <div className="space-y-7">
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-medium text-foreground">{costLabel ?? "Coste del procedimiento"}</span>
          <span className="text-sm font-semibold text-muted-foreground">{costValue ?? "~ 1"}</span>
        </div>
        <div className="h-4 w-full rounded-full bg-muted">
          <div className="h-full rounded-full bg-muted-foreground/60" style={{ width: `${costWidthPct}%` }} />
        </div>
      </div>
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-medium text-foreground">{debtLabel ?? "Deuda cancelada"}</span>
          <span className="text-sm font-semibold text-accent-deep">{debtValue ?? "x 20 o más"}</span>
        </div>
        <div className="h-4 w-full rounded-full bg-muted">
          <div className="h-full w-full rounded-full bg-accent-deep" />
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        {footnote ?? "En la mayoría de casos, lo que dejas de pagar supera con creces lo que invertirás en resolver tu situación legalmente."}
      </p>
    </div>
  </Card>
);

/* 3. Timeline horizontal de 4 pasos */
export const ProcessTimeline = ({
  steps,
}: {
  steps?: { title: string; desc: string }[];
}) => {
  const data =
    steps ?? [
      { title: "Análisis", desc: "Estudiamos tu situación y deudas" },
      { title: "Documentación", desc: "Preparamos el expediente legal" },
      { title: "Procedimiento", desc: "Iniciamos el proceso judicial" },
      { title: "Cancelación", desc: "Resolución y vida sin deuda" },
    ];
  return (
    <Card>
      <DiagramTitle>Cómo avanza el proceso</DiagramTitle>
      <ol className="relative grid gap-6 md:grid-cols-4 md:gap-4">
        {data.map((step, i) => (
          <li key={step.title} className="relative">
            <div className="flex items-center gap-3 md:flex-col md:items-start">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-accent-foreground shadow-medium">
                {i + 1}
              </div>
              {i < data.length - 1 && (
                <div className="hidden h-px flex-1 bg-border md:block" aria-hidden />
              )}
            </div>
            <p className="mt-3 font-poppins font-semibold text-foreground">{step.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
};

/* 4. Requisitos checklist */
export const RequirementsChecklist = ({
  items,
}: {
  items?: string[];
}) => {
  const list =
    items ?? [
      "Tener deudas que no puedes pagar",
      "Actuar de buena fe (no haber ocultado bienes)",
      "No haber sido condenado por delitos económicos",
      "Haber intentado un acuerdo previo con acreedores",
      "Residir en España o tener intereses principales aquí",
    ];
  return (
    <Card>
      <DiagramTitle subtitle="La mayoría de personas cumplen los requisitos sin saberlo">
        Requisitos principales
      </DiagramTitle>
      <ul className="space-y-3">
        {list.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

/* 5. Antes / Después */
export const BeforeAfterSplit = ({
  before,
  after,
}: {
  before?: string[];
  after?: string[];
}) => {
  const b = before ?? [
    "Llamadas constantes de cobro",
    "Embargos en la nómina",
    "Préstamos que crecen cada mes",
    "Sin acceso a financiación",
  ];
  const a = after ?? [
    "Fin de llamadas y reclamaciones",
    "Embargos paralizados por ley",
    "Deudas canceladas legalmente",
    "Empiezas de nuevo con calma",
  ];
  return (
    <Card className="!p-0 overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="bg-muted/50 p-6 md:p-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Antes
          </p>
          <h4 className="font-poppins text-lg font-semibold text-foreground">Con la deuda</h4>
          <ul className="mt-5 space-y-3">
            {b.map((item) => (
              <li key={item} className="flex items-start gap-3 text-muted-foreground">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-accent-soft/40 p-6 md:p-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
            Después
          </p>
          <h4 className="font-poppins text-lg font-semibold text-foreground">Sin la deuda</h4>
          <ul className="mt-5 space-y-3">
            {a.map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

/* 6. Donut de tipos de deuda */
export const DebtTypesDonut = ({
  title,
  subtitle,
  segments,
}: {
  title?: string;
  subtitle?: string;
  segments?: { label: string; value: number; color: string }[];
}) => {
  const data = segments ?? [
    { label: "Tarjetas y créditos rápidos", value: 38, color: "hsl(84 75% 55%)" },
    { label: "Préstamos personales", value: 32, color: "hsl(145 60% 35%)" },
    { label: "Hipoteca / vivienda", value: 18, color: "hsl(160 30% 18%)" },
    { label: "Deuda pública", value: 12, color: "hsl(25 90% 60%)" },
  ];
  const total = data.reduce((s, x) => s + x.value, 0);
  let offset = 0;
  const r = 60;
  const c = 2 * Math.PI * r;
  return (
    <Card>
      <DiagramTitle subtitle={subtitle ?? "Distribución típica entre quienes nos consultan"}>
        {title ?? "De qué se componen las deudas"}
      </DiagramTitle>
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-around">
        <svg viewBox="0 0 160 160" className="h-44 w-44 -rotate-90">
          <circle cx="80" cy="80" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="22" />
          {data.map((s) => {
            const len = (s.value / total) * c;
            const dasharray = `${len} ${c - len}`;
            const el = (
              <circle
                key={s.label}
                cx="80"
                cy="80"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="22"
                strokeDasharray={dasharray}
                strokeDashoffset={-offset}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <ul className="space-y-2.5">
          {data.map((s) => (
            <li key={s.label} className="flex items-center gap-3 text-sm">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: s.color }}
                aria-hidden
              />
              <span className="font-medium text-foreground">{s.label}</span>
              <span className="text-muted-foreground">{s.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

/* 7. 3 perfiles */
export const PersonasGrid = ({
  title,
  personas,
}: {
  title?: string;
  personas?: { icon: LucideIcon; title: string; desc: string }[];
}) => {
  const data = personas ?? [
    { icon: Briefcase, title: "Asalariado", desc: "Con nómina embargada o microcréditos que se acumulan" },
    { icon: Building2, title: "Autónomo", desc: "Deudas con proveedores, Hacienda y Seguridad Social" },
    { icon: Users, title: "Ex-empresario", desc: "Cerraste tu negocio y arrastras deudas personales" },
  ];
  return (
    <Card>
      <DiagramTitle>{title ?? "¿Te ves reflejado en alguno?"}</DiagramTitle>
      <div className="grid gap-4 md:grid-cols-3">
        {data.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-border bg-surface p-5 text-center"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
              <Icon className="h-6 w-6" />
            </div>
            <p className="font-poppins font-semibold text-foreground">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* 8. Flow de embargos */
export const EmbargoFlowChart = ({
  title,
  nodes,
}: {
  title?: string;
  nodes?: { icon: LucideIcon; title: string; desc: string }[];
}) => {
  const data = nodes ?? [
    { icon: FileText, title: "Reclamación", desc: "El acreedor inicia el proceso judicial" },
    { icon: Gavel, title: "Embargo declarado", desc: "El juzgado autoriza retener nómina o cuenta" },
    { icon: ShieldCheck, title: "Inicias Segunda Oportunidad", desc: "Se solicita la suspensión del embargo" },
    { icon: Sparkles, title: "Embargo paralizado", desc: "Tu nómina vuelve íntegra a tu cuenta" },
  ];
  return (
    <Card>
      <DiagramTitle>{title ?? "Cómo se frena un embargo paso a paso"}</DiagramTitle>
      <ol className="space-y-3">
        {data.map(({ icon: Icon, title, desc }, i) => (
          <li key={title}>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-poppins font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </div>
            {i < data.length - 1 && (
              <div className="flex justify-center py-1.5 text-accent-deep" aria-hidden>
                <ArrowRight className="h-4 w-4 rotate-90" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </Card>
  );
};

/* 9. Stack de presupuesto */
export const BudgetBreakdownStack = ({
  title,
  subtitle,
  segments,
}: {
  title?: string;
  subtitle?: string;
  segments?: { label: string; value: number; color: string }[];
}) => {
  const data = segments ?? [
    { label: "Vivienda", value: 35, color: "hsl(145 60% 30%)" },
    { label: "Alimentación", value: 20, color: "hsl(84 75% 55%)" },
    { label: "Suministros", value: 10, color: "hsl(160 25% 25%)" },
    { label: "Cuotas de deuda", value: 28, color: "hsl(0 70% 55%)" },
    { label: "Resto", value: 7, color: "hsl(60 10% 80%)" },
  ];
  return (
    <Card>
      <DiagramTitle subtitle={subtitle ?? "Cuando las cuotas crecen, el resto del presupuesto se ahoga"}>
        {title ?? "Dónde se va tu nómina hoy"}
      </DiagramTitle>
      <div className="flex h-7 w-full overflow-hidden rounded-full">
        {data.map((s) => (
          <div
            key={s.label}
            style={{ width: `${s.value}%`, backgroundColor: s.color }}
            title={`${s.label}: ${s.value}%`}
          />
        ))}
      </div>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {data.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: s.color }} aria-hidden />
            <span className="font-medium text-foreground">{s.label}</span>
            <span className="text-muted-foreground">{s.value}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

/* 10. Mitos vs realidad */
export const MythVsReality = ({
  rows,
}: {
  rows?: { myth: string; reality: string }[];
}) => {
  const data =
    rows ?? [
      { myth: "Cancelar deudas arruina tu futuro", reality: "Recuperas estabilidad y vuelves a financiarte con el tiempo" },
      { myth: "Solo funciona si no tienes nada", reality: "Hay soluciones distintas si tienes vivienda o ingresos" },
      { myth: "Es un proceso eterno", reality: "La mayoría de casos se resuelven en meses, no años" },
    ];
  return (
    <Card className="!p-0 overflow-hidden">
      <div className="grid grid-cols-[1fr_1fr] gap-3 border-b border-border bg-surface px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] sm:text-xs sm:tracking-[0.16em] md:px-8">
        <span className="text-destructive">Mito</span>
        <span className="text-accent-deep">Realidad</span>
      </div>
      <ul className="divide-y divide-border">
        {data.map((row) => (
          <li key={row.myth} className="grid grid-cols-[1fr_1fr] gap-3 px-4 py-4 text-sm sm:gap-4 sm:text-base md:px-8 md:py-5">
            <div className="flex items-start gap-2 text-muted-foreground">
              <X className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <span>{row.myth}</span>
            </div>
            <div className="flex items-start gap-2 text-foreground">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" />
              <span>{row.reality}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

/* 11. Documentos necesarios */
export const DocumentsChecklist = ({
  title,
  subtitle,
  items,
}: {
  title?: string;
  subtitle?: string;
  items?: string[];
}) => {
  const docs =
    items ?? [
      "DNI en vigor",
      "Últimas nóminas o ingresos",
      "Contratos de préstamos y tarjetas",
      "Notificaciones de embargo (si las hay)",
      "Vida laboral",
      "Certificado de empadronamiento",
    ];
  return (
    <Card>
      <DiagramTitle subtitle={subtitle ?? "Sin papeleo complicado: te acompañamos en cada paso"}>
        {title ?? "Documentación habitual para empezar"}
      </DiagramTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        {docs.map((d) => (
          <div key={d} className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
              <FileText className="h-4 w-4" />
            </div>
            <span className="text-sm text-foreground">{d}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* 12. Curva emocional / arc */
export const EmotionalArcLine = () => (
  <Card>
    <DiagramTitle subtitle="Cómo se transforma el estado emocional durante el proceso">
      El camino hasta volver a respirar
    </DiagramTitle>
    <div className="relative">
      <svg viewBox="0 0 600 220" className="h-44 w-full">
        <defs>
          <linearGradient id="arc-stroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(0 70% 55%)" />
            <stop offset="50%" stopColor="hsl(25 90% 60%)" />
            <stop offset="100%" stopColor="hsl(145 60% 35%)" />
          </linearGradient>
          <linearGradient id="arc-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(84 75% 55% / 0.25)" />
            <stop offset="100%" stopColor="hsl(84 75% 55% / 0)" />
          </linearGradient>
        </defs>
        <path
          d="M0,180 C120,200 180,40 320,120 C420,180 480,40 600,40 L600,220 L0,220 Z"
          fill="url(#arc-fill)"
        />
        <path
          d="M0,180 C120,200 180,40 320,120 C420,180 480,40 600,40"
          fill="none"
          stroke="url(#arc-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="0" cy="180" r="6" fill="hsl(0 70% 55%)" />
        <circle cx="320" cy="120" r="6" fill="hsl(25 90% 60%)" />
        <circle cx="600" cy="40" r="6" fill="hsl(145 60% 35%)" />
      </svg>
      <div className="mt-4 grid grid-cols-3 text-center text-xs text-muted-foreground">
        <span>Bloqueo inicial</span>
        <span>Procedimiento</span>
        <span className="text-accent-deep font-semibold">Calma recuperada</span>
      </div>
    </div>
  </Card>
);

/* Misceláneos: también exportamos un icono guía para referencia */
export const DiagramIcons = {
  CreditCard,
  TrendingDown,
  Landmark,
};

/* 13. StatHighlights — números grandes con etiqueta */
export const StatHighlights = ({
  title,
  subtitle,
  stats,
}: {
  title?: string;
  subtitle?: string;
  stats?: { value: string; label: string; hint?: string }[];
}) => {
  const data =
    stats ?? [
      { value: "+12.000", label: "Casos resueltos en España", hint: "Datos del sector judicial" },
      { value: "97%", label: "Tasa de exoneración aprobada", hint: "En procedimientos bien preparados" },
      { value: "6-18", label: "Meses de duración media", hint: "Desde la solicitud a la resolución" },
    ];
  return (
    <Card>
      <DiagramTitle subtitle={subtitle}>{title ?? "Las cifras detrás del procedimiento"}</DiagramTitle>
      <div className="grid gap-4 sm:grid-cols-3">
        {data.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-surface p-5 text-center"
          >
            <p className="font-poppins text-3xl font-semibold tracking-tight text-accent-deep md:text-4xl">
              {s.value}
            </p>
            <p className="mt-2 font-medium text-foreground">{s.label}</p>
            {s.hint && (
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.hint}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

/* 14. ComparisonTable — comparativa entre 2 opciones */
export const ComparisonTable = ({
  title,
  subtitle,
  optionA,
  optionB,
  rows,
}: {
  title?: string;
  subtitle?: string;
  optionA?: string;
  optionB?: string;
  rows?: { label: string; a: string; b: string; highlight?: "a" | "b" }[];
}) => {
  const a = optionA ?? "Renegociación privada";
  const b = optionB ?? "Segunda Oportunidad";
  const data =
    rows ?? [
      { label: "Cancela 100% de la deuda", a: "No", b: "Sí (con requisitos)", highlight: "b" },
      { label: "Paraliza embargos", a: "No", b: "Sí, por orden judicial", highlight: "b" },
      { label: "Requiere acuerdo del acreedor", a: "Sí", b: "No es necesario", highlight: "b" },
      { label: "Duración aproximada", a: "1-3 meses", b: "6-18 meses", highlight: "a" },
    ];
  return (
    <Card className="!p-0 overflow-hidden">
      {(title || subtitle) && (
        <div className="border-b border-border px-6 py-5 md:px-8">
          <h3 className="font-poppins text-xl font-semibold text-foreground md:text-2xl">
            {title ?? "Dos caminos, dos resultados"}
          </h3>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 border-b border-border bg-surface px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.16em] md:px-8">
        <span></span>
        <span>{a}</span>
        <span className="text-accent-deep">{b}</span>
      </div>
      <ul className="divide-y divide-border">
        {data.map((row) => (
          <li
            key={row.label}
            className="grid grid-cols-[1.4fr_1fr_1fr] items-center gap-2 px-4 py-4 text-sm sm:gap-4 sm:text-base md:px-8"
          >
            <span className="font-medium text-foreground">{row.label}</span>
            <span
              className={
                row.highlight === "a"
                  ? "font-semibold text-foreground"
                  : "text-muted-foreground"
              }
            >
              {row.a}
            </span>
            <span
              className={
                row.highlight === "b"
                  ? "font-semibold text-accent-deep"
                  : "text-muted-foreground"
              }
            >
              {row.b}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};

/* 15. RiskMatrix — matriz 2x2 (urgencia vs viabilidad) */
export const RiskMatrix = ({
  title,
  subtitle,
  axes,
  cells,
}: {
  title?: string;
  subtitle?: string;
  axes?: { x: string; y: string };
  cells?: { q: 1 | 2 | 3 | 4; label: string; tone: "good" | "warn" | "bad" }[];
}) => {
  const ax = axes ?? { x: "Urgencia", y: "Viabilidad de pago" };
  const data =
    cells ?? [
      { q: 1, label: "Renegociar es la mejor opción", tone: "good" },
      { q: 2, label: "Plan de pagos con acreedores", tone: "warn" },
      { q: 3, label: "Vigilar pero revisar mensualmente", tone: "warn" },
      { q: 4, label: "Segunda Oportunidad: vía legal", tone: "bad" },
    ] as const;
  const toneClass = (t: string) =>
    t === "good"
      ? "bg-accent-soft/60 text-foreground border-accent/40"
      : t === "warn"
        ? "bg-muted text-foreground border-border"
        : "bg-destructive/10 text-foreground border-destructive/30";
  const position = (q: number) =>
    q === 1
      ? "col-start-2 row-start-1"
      : q === 2
        ? "col-start-3 row-start-1"
        : q === 3
          ? "col-start-2 row-start-2"
          : "col-start-3 row-start-2";
  return (
    <Card>
      <DiagramTitle subtitle={subtitle ?? `${ax.y} vs. ${ax.x}`}>
        {title ?? "Qué hacer según tu situación"}
      </DiagramTitle>
      <div className="grid grid-cols-[auto_1fr_1fr] grid-rows-[1fr_1fr_auto] gap-3">
        <div className="row-span-2 flex items-center justify-center">
          <span className="-rotate-90 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {ax.y}
          </span>
        </div>
        {data.map((c) => (
          <div
            key={c.q}
            className={`flex min-h-[110px] items-center justify-center rounded-2xl border p-4 text-center text-sm font-medium ${toneClass(
              c.tone
            )} ${position(c.q)}`}
          >
            {c.label}
          </div>
        ))}
        <div className="col-start-2 col-end-4 row-start-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {ax.x}
        </div>
      </div>
    </Card>
  );
};

/* 16. SavingsProjection — proyección de ahorro tras cancelar */
export const SavingsProjection = ({
  title,
  subtitle,
  points,
}: {
  title?: string;
  subtitle?: string;
  points?: { label: string; value: number }[];
}) => {
  const data =
    points ?? [
      { label: "Mes 1", value: 100 },
      { label: "Mes 3", value: 380 },
      { label: "Mes 6", value: 950 },
      { label: "Mes 12", value: 2400 },
      { label: "Mes 24", value: 6200 },
    ];
  const max = Math.max(...data.map((p) => p.value));
  const w = 600;
  const h = 200;
  const px = (i: number) => (i / (data.length - 1)) * (w - 40) + 20;
  const py = (v: number) => h - 20 - (v / max) * (h - 40);
  const linePath = data.map((p, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(p.value)}`).join(" ");
  const areaPath = `${linePath} L${px(data.length - 1)},${h - 20} L${px(0)},${h - 20} Z`;
  return (
    <Card>
      <DiagramTitle subtitle={subtitle ?? "Cómo crece tu colchón cuando dejan de irse cuotas en deuda"}>
        {title ?? "Proyección de ahorro tras cancelar"}
      </DiagramTitle>
      <div className="relative">
        <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full">
          <defs>
            <linearGradient id="savings-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="hsl(145 60% 35% / 0.35)" />
              <stop offset="100%" stopColor="hsl(145 60% 35% / 0)" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill="url(#savings-fill)" />
          <path d={linePath} fill="none" stroke="hsl(145 60% 35%)" strokeWidth="3" strokeLinecap="round" />
          {data.map((p, i) => (
            <circle key={p.label} cx={px(i)} cy={py(p.value)} r={4.5} fill="hsl(145 60% 35%)" />
          ))}
        </svg>
        <ul className="mt-3 grid grid-cols-5 gap-1 text-center text-xs text-muted-foreground">
          {data.map((p) => (
            <li key={p.label}>
              <span className="block font-semibold text-foreground">{p.value} €</span>
              <span>{p.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

/* 17. WarningSignsList — señales de alerta */
export const WarningSignsList = ({
  title,
  subtitle,
  signs,
}: {
  title?: string;
  subtitle?: string;
  signs?: { icon?: LucideIcon; title: string; desc: string }[];
}) => {
  const data =
    signs ?? [
      { icon: Phone, title: "Llamadas diarias de recobro", desc: "Pierdes el control sobre cuándo y cómo te contactan" },
      { icon: Mail, title: "Cartas certificadas semanales", desc: "Notificaciones formales que ya no puedes ignorar" },
      { icon: FileWarning, title: "Microcréditos para pagar otros", desc: "Pedir nuevo crédito solo para cubrir cuotas anteriores" },
      { icon: Scale, title: "Sentencias en marcha", desc: "Procedimientos judiciales abiertos por uno o más acreedores" },
    ];
  return (
    <Card>
      <DiagramTitle subtitle={subtitle ?? "Si te reconoces en dos o más, conviene actuar pronto"}>
        {title ?? "Señales de que la deuda ya no es manejable"}
      </DiagramTitle>
      <ul className="grid gap-3 sm:grid-cols-2">
        {data.map(({ icon: Icon = AlertTriangle, title, desc }) => (
          <li
            key={title}
            className="flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-poppins font-semibold text-foreground">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

/* 18. SuccessRateBar — barra apilada con % de resultados */
export const SuccessRateBar = ({
  title,
  subtitle,
  segments,
  footnote,
}: {
  title?: string;
  subtitle?: string;
  segments?: { label: string; value: number; color: string }[];
  footnote?: string;
}) => {
  const data =
    segments ?? [
      { label: "Exoneración total", value: 78, color: "hsl(145 60% 35%)" },
      { label: "Exoneración parcial con plan", value: 17, color: "hsl(84 75% 55%)" },
      { label: "Casos archivados o sin éxito", value: 5, color: "hsl(0 70% 55%)" },
    ];
  return (
    <Card>
      <DiagramTitle subtitle={subtitle ?? "Distribución de resultados en expedientes bien preparados"}>
        {title ?? "Qué resultado suelen tener los casos"}
      </DiagramTitle>
      <div className="flex h-8 w-full overflow-hidden rounded-full">
        {data.map((s) => (
          <div
            key={s.label}
            style={{ width: `${s.value}%`, backgroundColor: s.color }}
            title={`${s.label}: ${s.value}%`}
            className="flex items-center justify-center text-xs font-semibold text-background"
          >
            {s.value >= 10 ? `${s.value}%` : ""}
          </div>
        ))}
      </div>
      <ul className="mt-5 grid gap-2 sm:grid-cols-3">
        {data.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: s.color }} aria-hidden />
            <span className="font-medium text-foreground">{s.label}</span>
          </li>
        ))}
      </ul>
      {footnote && (
        <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5 text-accent-deep" />
          {footnote}
        </p>
      )}
    </Card>
  );
};