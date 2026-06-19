import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ShieldCheck } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import { SMI_MENSUAL, SMI_ANIO, TRAMOS_EMBARGO } from "@/data/seo/tools";

const eur = (n: number) =>
  Math.round(n).toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €";

/** Calcula la parte embargable/protegida de un salario según el art. 607 LEC. */
const UnseizableSalaryCalculator = () => {
  const [salary, setSalary] = useState(1800);

  // Aplicación de los tramos sobre el SMI.
  let embargable = 0;
  const breakdown: { label: string; base: number; pct: number; amount: number }[] = [];
  let prevLimit = 0;
  for (const tramo of TRAMOS_EMBARGO) {
    const upper = tramo.hasta === Infinity ? Infinity : tramo.hasta * SMI_MENSUAL;
    if (salary <= prevLimit) break;
    const base = Math.min(salary, upper) - prevLimit;
    if (base > 0 && tramo.porcentaje > 0) {
      const amount = (base * tramo.porcentaje) / 100;
      embargable += amount;
      breakdown.push({ label: tramo.etiqueta, base, pct: tramo.porcentaje, amount });
    }
    prevLimit = upper;
    if (upper === Infinity) break;
  }
  const protegido = salary - embargable;

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-7 md:p-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Art. 607 LEC
        </span>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex items-center justify-between text-sm font-medium text-foreground">
          <span>Tu salario neto mensual</span>
          <span className="font-poppins text-lg font-bold text-accent-deep">{eur(salary)}</span>
        </div>
        <Slider
          value={[salary]}
          min={600}
          max={8000}
          step={50}
          onValueChange={(v) => setSalary(v[0])}
          className="mt-4"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-accent/40 bg-accent-soft/40 p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-accent-deep">Protegido (inembargable)</p>
            <p className="mt-1 font-poppins text-2xl font-bold text-accent-deep">{eur(protegido)}</p>
          </div>
          <div className="rounded-2xl border border-orange/40 bg-orange-soft p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-orange-deep">Embargable como máximo</p>
            <p className="mt-1 font-poppins text-2xl font-bold text-orange-deep">{eur(embargable)}</p>
          </div>
        </div>

        {breakdown.length > 0 && (
          <div className="mt-5 rounded-2xl border border-border bg-surface-elevated p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Desglose por tramos
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {breakdown.map((b) => (
                <li key={b.label} className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    {b.label} · {b.pct}% de {eur(b.base)}
                  </span>
                  <span className="font-semibold text-foreground">{eur(b.amount)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-7 flex justify-center">
          <CtaButton className="h-14 px-8 text-base">Frenar mi embargo gratis</CtaButton>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Cálculo orientativo sobre el SMI {SMI_ANIO} ({eur(SMI_MENSUAL)}/mes). Existen excepciones
          como las pensiones de alimentos.
        </p>
      </div>
    </section>
  );
};

export default UnseizableSalaryCalculator;