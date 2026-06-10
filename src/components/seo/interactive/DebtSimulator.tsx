import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import CtaButton from "@/components/seo/CtaButton";
import { TrendingDown } from "lucide-react";
import type { MoneySimulator } from "@/data/seo/content/types";

const eur = (n: number) =>
  new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(Math.round(n));

/** Soluciones comparables y su efecto orientativo sobre deuda y cuota. */
const SOLUTIONS = [
  {
    key: "lso",
    label: "LSO",
    desc: "Cancela las deudas que no puedes pagar. Empiezas de cero, sin cuota.",
    result: (d: number, m: number) => ({ cancela: d * 0.75, total: d * 0.25, cuota: 0 }),
  },
  {
    key: "reunificar",
    label: "Reunificar",
    desc: "No cancela: agrupa todo en un préstamo y reduce el total a pagar y la cuota.",
    result: (d: number, m: number) => ({ cancela: 0, total: d * 0.92, cuota: m * 0.5 }),
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
    desc: "Reduce la cuota pero alarga el plazo: la deuda total acaba siendo mayor.",
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

  // Estimación ORIENTATIVA: cancelación media en torno al 75% de la deuda.
  const canceled = useMemo(() => debt * 0.75, [debt]);

  const compare = config.compareSolutions;
  const sol = SOLUTIONS.find((s) => s.key === solKey) ?? SOLUTIONS[0];
  const r = sol.result(debt, monthly);

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

            {compare && (
              <div>
                <label className="text-sm font-medium text-foreground">Compara soluciones</label>
                <div className="mt-3 flex flex-wrap gap-2">
                  {SOLUTIONS.map((s) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSolKey(s.key)}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
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
            )}
          </div>
        </div>

        {compare ? (
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
        ) : (
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
        )}
      </div>
    </section>
  );
};

export default DebtSimulator;
