import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import CtaButton from "@/components/seo/CtaButton";
import { TrendingDown, Sparkles } from "lucide-react";
import type { MoneySimulator } from "@/data/seo/content/types";

const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(Math.round(n));

/** Soluciones comparables y su efecto orientativo sobre deuda y cuota. */
const SOLUTIONS = [
  {
    key: "lso",
    label: "LSO",
    desc: "Cancela las deudas que no puedes pagar y empiezas de cero, sin cuota. Ojo: si tienes vivienda u otros bienes de valor totalmente pagados, en la práctica no encaja (entrarían en la liquidación).",
    result: (d: number, m: number) => ({ cancela: d, total: 0, cuota: 125 }),
  },
  {
    key: "reunificar",
    label: "Reunificar",
    desc: "No es un préstamo nuevo: negociamos extrajudicialmente con tus entidades para bajar la cuota mensual y el total que debes.",
    result: (d: number, m: number) => ({ cancela: d * 0.5, total: d * 0.5, cuota: m * 0.5 }),
  },
  {
    key: "reclamacion",
    label: "Reclamación",
    desc: "Anula las deudas reclamables (intereses abusivos) y deja intactas las demás.",
    result: (d: number, m: number) => ({ cancela: d * 0.4, total: d * 0.6, cuota: m * 0.6 }),
  },
  {
    key: "refinanciar",
    label: "Refinanciar",
    desc: "Pides un préstamo nuevo que agrupa todo: baja la cuota pero alarga el plazo y la deuda total acaba siendo mayor.",
    result: (d: number, m: number) => ({ cancela: 0, total: d * 1.25, cuota: m * 0.6 }),
  },
] as const;

/** Simulador orientativo de deuda cancelable (100% cliente). */
const DebtSimulator = ({ config }: { config: MoneySimulator }) => {
  const maxDebt = config.maxDebt ?? 120000;
  const maxMonthly = config.maxMonthly ?? 2000;
  const [debt, setDebt] = useState(config.defaultDebt ?? 25000);
  const [monthly, setMonthly] = useState(config.defaultMonthly ?? 450);
  const [solKey, setSolKey] = useState<(typeof SOLUTIONS)[number]["key"]>("lso");
  // Entradas de triaje (solo en la variante comparativa).
  const [hasAssets, setHasAssets] = useState(false);
  const [canPay, setCanPay] = useState(false);

  // Estimación ORIENTATIVA: cancelación media en torno al 75% de la deuda.
  const canceled = useMemo(() => debt * 0.75, [debt]);

  const compare = config.compareSolutions;
  const sol = SOLUTIONS.find((s) => s.key === solKey) ?? SOLUTIONS[0];
  const r = sol.result(debt, monthly);

  // Motor de recomendación según la regla de triaje:
  // insolvente + sin bienes pagados → LSO
  // insolvente + con bienes pagados → reunificar
  // solvente + deuda baja → reclamación / negociar
  const recommendation = useMemo(() => {
    if (canPay) {
      if (debt <= 15000)
        return {
          key: "reclamacion" as const,
          reason:
            "Puedes pagar y la deuda es contenida: revisar intereses abusivos y reclamar suele compensar más que cancelar.",
        };
      return {
        key: "reunificar" as const,
        reason:
          "Aún puedes asumir una cuota: negociamos con tus entidades para bajar el pago mensual y el total, sin tocar tus bienes.",
      };
    }
    if (hasAssets)
      return {
        key: "reunificar" as const,
        reason:
          "No puedes pagar pero tienes bienes de valor pagados: reunificar (negociar con tus acreedores) protege ese patrimonio, que la LSO podría liquidar.",
      };
    return {
      key: "lso" as const,
      reason:
        "No puedes pagar y no tienes bienes de valor que perder: la Ley de Segunda Oportunidad cancela lo que no puedes asumir.",
    };
  }, [canPay, hasAssets, debt]);

  const recommendedSol = SOLUTIONS.find((s) => s.key === recommendation.key) ?? SOLUTIONS[0];

  if (compare) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-border bg-surface-elevated p-7 shadow-soft md:p-10">
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {config.title}
        </h2>
        {config.subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{config.subtitle}</p>
        )}

        {/* Preguntas de triaje: bienes y solvencia */}
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {[
            {
              label: "¿Tienes vivienda u otros bienes de valor totalmente pagados?",
              value: hasAssets,
              set: setHasAssets,
            },
            {
              label: "¿Puedes asumir alguna cuota mensual?",
              value: canPay,
              set: setCanPay,
            },
          ].map((t) => (
            <div
              key={t.label}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
            >
              <span className="text-sm font-medium text-foreground">{t.label}</span>
              <div className="flex shrink-0 gap-1.5">
                {([true, false] as const).map((opt) => (
                  <button
                    key={String(opt)}
                    type="button"
                    onClick={() => t.set(opt)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      t.value === opt
                        ? "bg-accent text-accent-foreground"
                        : "bg-surface-elevated text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {opt ? "Sí" : "No"}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recomendación derivada del triaje */}
        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-accent/40 bg-accent-soft/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" aria-hidden />
            <p className="text-sm text-foreground/85">
              Lo que más te conviene:{" "}
              <strong className="text-accent-deep">{recommendedSol.label}</strong>.{" "}
              {recommendation.reason}
            </p>
          </div>
          {solKey !== recommendation.key && (
            <button
              type="button"
              onClick={() => setSolKey(recommendation.key)}
              className="shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground"
            >
              Ver esta opción
            </button>
          )}
        </div>

        {/* Selector a lo ancho de todo el módulo */}
        <div className="mt-7">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SOLUTIONS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setSolKey(s.key)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                  s.key === solKey
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-surface text-foreground hover:border-accent/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center">
          <div className="md:w-1/2">
            <div className="space-y-7">
              <div>
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-medium text-foreground">Deuda total</label>
                  <span className="font-poppins text-lg font-bold text-accent-deep">{eur(debt)} €</span>
                </div>
                <Slider
                  className="mt-3"
                  value={[debt]}
                  min={1000}
                  max={maxDebt}
                  step={500}
                  onValueChange={(v) => setDebt(v[0])}
                  aria-label="Deuda total"
                />
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <label className="text-sm font-medium text-foreground">Cuota que pagas al mes</label>
                  <span className="font-poppins text-lg font-bold text-accent-deep">{eur(monthly)} €</span>
                </div>
                <Slider
                  className="mt-3"
                  value={[monthly]}
                  min={50}
                  max={maxMonthly}
                  step={25}
                  onValueChange={(v) => setMonthly(v[0])}
                  aria-label="Cuota mensual"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-dark p-7 text-primary-foreground md:w-1/2">
            <div className="flex items-center gap-2 text-accent">
              <TrendingDown className="h-5 w-5" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">{sol.label}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">{sol.desc}</p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between border-b border-primary-foreground/10 pb-3">
                <span className="text-sm text-primary-foreground/70">Deuda que desaparece</span>
                <span className="font-poppins text-lg font-bold text-accent">{eur(r.cancela)} €</span>
              </div>
              <div className="flex items-center justify-between border-b border-primary-foreground/10 pb-3">
                <span className="text-sm text-primary-foreground/70">Deuda total resultante</span>
                <span className="font-poppins text-lg font-bold text-primary-foreground">{eur(r.total)} €</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-foreground/70">Nueva cuota mensual</span>
                <span className="font-poppins text-lg font-bold text-primary-foreground">
                  {r.cuota === 0 ? "0 €" : `${eur(r.cuota)} €`}
                </span>
              </div>
            </div>
            <p className="mt-5 text-xs text-primary-foreground/50">
              Estimación orientativa. La cifra real la confirmamos en tu estudio gratis.
            </p>
            <div className="mt-6">
              <CtaButton className="w-full">Quiero saber qué me conviene</CtaButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-border bg-surface-elevated p-7 shadow-soft md:p-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <div className="md:w-1/2">
          <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{config.subtitle}</p>
          )}

          <div className="mt-8 space-y-7">
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium text-foreground">Deuda total</label>
                <span className="font-poppins text-lg font-bold text-accent-deep">{eur(debt)} €</span>
              </div>
              <Slider
                className="mt-3"
                value={[debt]}
                min={1000}
                max={maxDebt}
                step={500}
                onValueChange={(v) => setDebt(v[0])}
                aria-label="Deuda total"
              />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium text-foreground">Cuota que pagas al mes</label>
                <span className="font-poppins text-lg font-bold text-accent-deep">{eur(monthly)} €</span>
              </div>
              <Slider
                className="mt-3"
                value={[monthly]}
                min={50}
                max={maxMonthly}
                step={25}
                onValueChange={(v) => setMonthly(v[0])}
                aria-label="Cuota mensual"
              />
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-dark p-7 text-primary-foreground md:w-1/2">
          <div className="flex items-center gap-2 text-accent">
            <TrendingDown className="h-5 w-5" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-[0.18em]">Estimación</span>
          </div>
          <p className="mt-4 text-sm text-primary-foreground/70">Podrías cancelar hasta</p>
          <p className="font-poppins text-4xl font-bold md:text-5xl">{eur(canceled)} €</p>
          <p className="mt-4 text-sm text-primary-foreground/70">
            Y dejar de pagar hasta{" "}
            <strong className="text-primary-foreground">{eur(monthly)} € al mes</strong>.
          </p>
          <p className="mt-3 rounded-2xl bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/80">
            Cada año que esperas regalas{" "}
            <strong className="text-accent">{eur(monthly * 12)} €</strong> a tus
            acreedores. Dinero que no vas a recuperar.
          </p>
          <p className="mt-4 text-xs text-primary-foreground/50">
            Estimación orientativa. Lo confirmamos con cifras reales en tu estudio gratis.
          </p>
          <div className="mt-6">
            <CtaButton className="w-full">Quiero saber mi caso exacto</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebtSimulator;
