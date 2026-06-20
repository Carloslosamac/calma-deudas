import {
  ArrowRight,
  Check,
  X,
  TrendingDown,
  RefreshCw,
  Scale,
  Wallet,
  AlertTriangle,
  CircleDollarSign,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ---------- helpers compartidos (estilo coherente con index.tsx) ---------- */

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
    {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
  </div>
);

const Caption: React.FC<React.PropsWithChildren> = ({ children }) => (
  <p className="mt-5 text-center text-xs text-muted-foreground">{children}</p>
);

/* =========================================================================
   REUNIFICACIÓN
   ========================================================================= */

/* Compara la suma de cuotas dispersas con una única cuota negociada más baja. */
export const ReunificacionCuotaCompare = ({
  cuotasActuales = [
    { label: "Préstamo personal", value: 240 },
    { label: "Tarjeta revolving", value: 180 },
    { label: "Microcrédito", value: 150 },
    { label: "Financiera coche", value: 120 },
  ],
  cuotaNueva = 360,
}: {
  cuotasActuales?: { label: string; value: number }[];
  cuotaNueva?: number;
}) => {
  const sumActual = cuotasActuales.reduce((a, b) => a + b.value, 0);
  const max = Math.max(sumActual, cuotaNueva);
  const ahorro = sumActual - cuotaNueva;
  return (
    <Card>
      <DiagramTitle subtitle="Ejemplo ilustrativo. Tu resultado depende de tu situación.">
        Antes y después de reunificar
      </DiagramTitle>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">Hoy: varias cuotas</p>
          <div className="space-y-2">
            {cuotasActuales.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{c.label}</span>
                  <span>{c.value} €</span>
                </div>
                <div className="mt-1 h-2.5 rounded-full bg-muted">
                  <div
                    className="h-2.5 rounded-full bg-destructive/70"
                    style={{ width: `${(c.value / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm font-semibold text-destructive">
            Total: {sumActual} €/mes
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold text-foreground">Después: una sola cuota</p>
          <div className="rounded-2xl border border-accent/40 bg-accent-soft/40 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wallet className="h-4 w-4 text-accent-deep" /> Cuota única negociada
            </div>
            <div className="mt-2 h-3 rounded-full bg-muted">
              <div
                className="h-3 rounded-full bg-accent"
                style={{ width: `${(cuotaNueva / max) * 100}%` }}
              />
            </div>
            <p className="mt-3 font-poppins text-2xl font-bold text-accent-deep">
              {cuotaNueva} €/mes
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-surface p-3 text-sm font-medium text-foreground">
            <TrendingDown className="h-4 w-4 text-accent-deep" />
            Pagas {ahorro} €/mes menos y, además, baja el total adeudado.
          </div>
        </div>
      </div>
      <Caption>
        Reunificar con Calma es negociación con tus acreedores: baja la cuota y el total, sin
        pedir un préstamo nuevo.
      </Caption>
    </Card>
  );
};

type CompareRow = { criterio: string; reunificar: string; refinanciar: string; reuOk: boolean };

/* Diferencia clave: reunificar (negociación) vs refinanciar (préstamo nuevo). */
export const ReunificarVsRefinanciar = ({
  rows = [
    { criterio: "¿Pides un préstamo nuevo?", reunificar: "No", refinanciar: "Sí", reuOk: true },
    { criterio: "¿Baja el total que debes?", reunificar: "Sí", refinanciar: "No (suele subir)", reuOk: true },
    { criterio: "¿Baja la cuota mensual?", reunificar: "Sí", refinanciar: "Sí", reuOk: true },
    { criterio: "¿Alarga el plazo?", reunificar: "No es el objetivo", refinanciar: "Casi siempre", reuOk: true },
    { criterio: "¿Hace falta aval o hipoteca?", reunificar: "No", refinanciar: "A menudo", reuOk: true },
  ],
}: {
  rows?: CompareRow[];
}) => (
  <Card className="p-0">
    <div className="p-6 md:p-8">
      <DiagramTitle subtitle="No es lo mismo: confundirlas puede costarte caro.">
        Reunificar ≠ Refinanciar
      </DiagramTitle>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-y border-border bg-surface text-left">
            <th className="px-5 py-3 font-semibold text-muted-foreground">Criterio</th>
            <th className="px-5 py-3 font-semibold text-accent-deep">Reunificar (Calma)</th>
            <th className="px-5 py-3 font-semibold text-muted-foreground">Refinanciar</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.criterio} className="border-b border-border">
              <td className="px-5 py-3 text-foreground">{r.criterio}</td>
              <td className="px-5 py-3">
                <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                  <Check className="h-4 w-4 text-accent-deep" /> {r.reunificar}
                </span>
              </td>
              <td className="px-5 py-3 text-muted-foreground">{r.refinanciar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

/* =========================================================================
   TRIAGE (cancelar deudas / reunificar / reclamar)
   ========================================================================= */

type Branch = {
  pregunta: string;
  si: string;
  no: string;
  icon: LucideIcon;
};

export const CancelarDecisionTree = ({
  branches = [
    {
      pregunta: "¿Puedes pagar tus deudas con tus ingresos y bienes?",
      si: "Si hay intereses abusivos y la deuda es baja → reclamación judicial",
      no: "Sigue a la siguiente pregunta",
      icon: Wallet,
    },
    {
      pregunta: "¿Tienes bienes pagados de valor (casa, terreno)?",
      si: "Reunificar deudas (negociar cuota y total)",
      no: "Ley de Segunda Oportunidad (exoneración)",
      icon: Scale,
    },
  ],
}: {
  branches?: Branch[];
}) => (
  <Card>
    <DiagramTitle subtitle="Triage orientativo. El análisis final siempre es individual.">
      ¿Qué vía de cancelación encaja contigo?
    </DiagramTitle>
    <div className="space-y-5">
      {branches.map((b, i) => (
        <div key={i} className="rounded-2xl border border-border bg-surface p-5">
          <div className="flex items-center gap-2 font-medium text-foreground">
            <b.icon className="h-5 w-5 text-accent-deep" />
            {b.pregunta}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-2 rounded-xl bg-accent-soft/40 p-3 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" />
              <span className="text-foreground">
                <strong className="text-accent-deep">Sí:</strong> {b.si}
              </span>
            </div>
            <div className="flex items-start gap-2 rounded-xl bg-muted/60 p-3 text-sm">
              <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-foreground">
                <strong className="text-muted-foreground">No:</strong> {b.no}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

export const InsolvenciaBienesMatrix = () => {
  const cells = [
    { x: "Insolvente", y: "Sin bienes pagados", label: "Ley de Segunda Oportunidad", strong: true },
    { x: "Insolvente", y: "Con bienes pagados", label: "Reunificar deudas", strong: true },
    { x: "Solvente", y: "Sin bienes pagados", label: "Reclamación / renegociar", strong: false },
    { x: "Solvente", y: "Con bienes pagados", label: "Optimizar pagos / reclamar usura", strong: false },
  ];
  return (
    <Card>
      <DiagramTitle subtitle="Tu situación define la mejor herramienta legal.">
        Insolvencia × bienes pagados
      </DiagramTitle>
      <div className="grid grid-cols-2 gap-3">
        {cells.map((c) => (
          <div
            key={c.label}
            className={`rounded-2xl border p-4 ${
              c.strong ? "border-accent/40 bg-accent-soft/40" : "border-border bg-surface"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {c.x} · {c.y}
            </p>
            <p className={`mt-2 font-poppins font-semibold ${c.strong ? "text-accent-deep" : "text-foreground"}`}>
              {c.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

/* =========================================================================
   REVOLVING
   ========================================================================= */

/* Muestra cómo el interés revolving dispara el coste real frente al capital. */
export const RevolvingCosteReal = ({
  capital = 3000,
  intereses = 4200,
}: {
  capital?: number;
  intereses?: number;
}) => {
  const total = capital + intereses;
  return (
    <Card>
      <DiagramTitle subtitle="Ejemplo ilustrativo con TAE revolving típica (>20%).">
        Lo que pediste vs. lo que acabas pagando
      </DiagramTitle>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Capital dispuesto</span>
            <span className="font-medium text-foreground">{capital.toLocaleString("es-ES")} €</span>
          </div>
          <div className="mt-1 h-3 rounded-full bg-muted">
            <div className="h-3 rounded-full bg-accent" style={{ width: `${(capital / total) * 100}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Intereses revolving</span>
            <span className="font-medium text-destructive">+{intereses.toLocaleString("es-ES")} €</span>
          </div>
          <div className="mt-1 h-3 rounded-full bg-muted">
            <div className="h-3 rounded-full bg-destructive/70" style={{ width: `${(intereses / total) * 100}%` }} />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-surface p-3 text-sm font-medium text-foreground">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        Pagando solo la cuota mínima, los intereses pueden superar al capital prestado.
      </div>
      <Caption>Si la TAE es abusiva, puedes reclamar y recuperar lo pagado de más.</Caption>
    </Card>
  );
};

export const ReclamacionRevolvingTimeline = ({
  steps = [
    "Reunimos el contrato y el histórico de movimientos de la tarjeta.",
    "Analizamos si la TAE es usuraria o el contrato no fue transparente.",
    "Reclamación extrajudicial a la entidad.",
    "Si no hay acuerdo, demanda judicial.",
    "Anulación de intereses y devolución de lo pagado de más.",
  ],
}: {
  steps?: string[];
}) => (
  <Card>
    <DiagramTitle subtitle="De la documentación a recuperar tu dinero.">
      Cómo es una reclamación revolving
    </DiagramTitle>
    <ol className="space-y-3">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
            {i + 1}
          </span>
          <span className="pt-0.5 text-sm leading-relaxed text-foreground">{s}</span>
        </li>
      ))}
    </ol>
  </Card>
);

/* =========================================================================
   MICROCRÉDITOS
   ========================================================================= */

/* Visualiza el bucle de pedir un microcrédito para pagar otro. */
export const MicrocreditosBucle = ({
  steps = [
    "Pides un microcrédito para llegar a fin de mes",
    "La cuota + intereses se comen el siguiente sueldo",
    "Pides otro microcrédito para cubrir el anterior",
    "La deuda total crece cada mes",
  ],
}: {
  steps?: string[];
}) => (
  <Card>
    <DiagramTitle subtitle="El patrón que hay que romper.">El bucle del microcrédito</DiagramTitle>
    <div className="grid gap-3 sm:grid-cols-2">
      {steps.map((s, i) => (
        <div key={i} className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4">
          <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Paso {i + 1}
            </p>
            <p className="mt-1 text-sm text-foreground">{s}</p>
          </div>
        </div>
      ))}
    </div>
    <Caption>Salir del bucle no es pagar más rápido: es cambiar de estrategia legal.</Caption>
  </Card>
);

export const TaeComparada = ({
  items = [
    { label: "Préstamo personal banco", tae: 8 },
    { label: "Tarjeta revolving", tae: 24 },
    { label: "Microcrédito rápido", tae: 1200 },
  ],
}: {
  items?: { label: string; tae: number }[];
}) => {
  const max = Math.max(...items.map((i) => i.tae));
  return (
    <Card>
      <DiagramTitle subtitle="TAE orientativa. Los microcréditos rápidos disparan el coste.">
        Compara el coste real (TAE)
      </DiagramTitle>
      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.label}>
            <div className="flex justify-between text-sm">
              <span className="text-foreground">{it.label}</span>
              <span className="font-semibold text-foreground">{it.tae}% TAE</span>
            </div>
            <div className="mt-1 h-3 rounded-full bg-muted">
              <div
                className={`h-3 rounded-full ${it.tae > 100 ? "bg-destructive/70" : "bg-accent"}`}
                style={{ width: `${Math.max(6, (it.tae / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export const RutaSalidaSteps = ({
  title = "Tu ruta de salida",
  subtitle = "Pasos concretos hacia el alta financiera.",
  steps = [
    "Paramos la rueda: dejas de pedir nuevos microcréditos.",
    "Revisamos si hay intereses reclamables.",
    "Elegimos la vía: reclamación, reunificación o Ley de Segunda Oportunidad.",
    "Negociamos o tramitamos hasta cancelar o reducir la deuda.",
    "Reconstruyes tu economía sin el agujero de las cuotas.",
  ],
}: {
  title?: string;
  subtitle?: string;
  steps?: string[];
}) => (
  <Card>
    <DiagramTitle subtitle={subtitle}>{title}</DiagramTitle>
    <ol className="relative space-y-5 border-l border-border pl-6">
      {steps.map((s, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            {i + 1}
          </span>
          <p className="text-sm leading-relaxed text-foreground">{s}</p>
        </li>
      ))}
    </ol>
    <div className="mt-5 flex items-center gap-2 rounded-xl bg-accent-soft/40 p-3 text-sm font-medium text-accent-deep">
      <CircleDollarSign className="h-4 w-4" /> Objetivo: dejar de alimentar la deuda y empezar de cero.
    </div>
  </Card>
);