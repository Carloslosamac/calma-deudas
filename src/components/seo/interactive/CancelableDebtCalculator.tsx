import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Sparkles } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";

const eur = (n: number) =>
  Math.round(n).toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €";

type DebtType = {
  id: string;
  label: string;
  /** porcentaje orientativo cancelable de este tipo de deuda */
  rate: number;
};

const TYPES: DebtType[] = [
  { id: "personal", label: "Préstamos personales", rate: 0.95 },
  { id: "revolving", label: "Tarjetas / revolving", rate: 0.98 },
  { id: "micro", label: "Microcréditos", rate: 0.97 },
  { id: "publica", label: "Hacienda / Seguridad Social", rate: 0.4 },
];

/** Estima el rango de deuda cancelable y el alivio mensual aproximado. */
const CancelableDebtCalculator = () => {
  const [total, setTotal] = useState(25000);
  const [selected, setSelected] = useState<string[]>(["personal", "revolving"]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const active = TYPES.filter((t) => selected.includes(t.id));
  const avgRate = active.length
    ? active.reduce((a, t) => a + t.rate, 0) / active.length
    : 0.9;

  const cancelable = total * avgRate;
  const low = cancelable * 0.85;
  const high = Math.min(cancelable, total);
  // Alivio mensual aproximado: cuota tipo de la deuda actual (~2% del saldo).
  const monthlyRelief = (cancelable * 0.02);

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-7 md:p-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> Estimación gratis
        </span>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex items-center justify-between text-sm font-medium text-foreground">
          <span>Deuda total aproximada</span>
          <span className="font-poppins text-lg font-bold text-accent-deep">{eur(total)}</span>
        </div>
        <Slider
          value={[total]}
          min={1000}
          max={150000}
          step={1000}
          onValueChange={(v) => setTotal(v[0])}
          className="mt-4"
        />

        <p className="mt-7 text-sm font-medium text-foreground">¿De dónde viene tu deuda?</p>
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {TYPES.map((t) => {
            const on = selected.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(t.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
                  on
                    ? "border-accent bg-accent-soft/60 text-foreground"
                    : "border-border bg-surface-elevated text-muted-foreground hover:border-accent/50"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-accent/40 bg-accent-soft/40 p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-accent-deep">
              Deuda potencialmente cancelable
            </p>
            <p className="mt-1 font-poppins text-2xl font-bold text-accent-deep">
              {eur(low)} – {eur(high)}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Alivio mensual aproximado
            </p>
            <p className="mt-1 font-poppins text-2xl font-bold text-foreground">
              ~{eur(monthlyRelief)}/mes
            </p>
          </div>
        </div>

        <div className="mt-7 flex justify-center">
          <CtaButton className="h-14 px-8 text-base">Calcular mi caso real gratis</CtaButton>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Estimación orientativa. El importe real depende de tu insolvencia y del tipo de cada deuda.
        </p>
      </div>
    </section>
  );
};

export default CancelableDebtCalculator;