import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyValueComparison } from "@/data/seo/content/types";

const eur = (n: number) =>
  n.toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €";

/** Comparador "lo que pediste vs lo que devuelves" (microcréditos). */
const ValueComparison = ({ data }: { data: MoneyValueComparison }) => {
  const factor = data.factor ?? 2.6;
  const max = data.maxBorrowed ?? 10000;
  const [borrowed, setBorrowed] = useState(data.defaultBorrowed ?? 1500);
  const repaid = Math.round(borrowed * factor);
  const extra = repaid - borrowed;

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-7 md:p-10">
      <div className="text-center">
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{data.subtitle}</p>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex items-center justify-between text-sm font-medium text-foreground">
          <span>Importe que pediste</span>
          <span className="font-poppins text-lg font-bold text-accent-deep">{eur(borrowed)}</span>
        </div>
        <Slider
          value={[borrowed]}
          min={100}
          max={max}
          step={100}
          onValueChange={(v) => setBorrowed(v[0])}
          className="mt-4"
        />

        <div className="mt-8 grid items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{data.borrowedLabel}</p>
            <p className="mt-1 font-poppins text-2xl font-bold text-foreground">{eur(borrowed)}</p>
          </div>
          <ArrowRight className="mx-auto hidden h-6 w-6 text-muted-foreground sm:block" aria-hidden />
          <div className="rounded-2xl border border-orange/40 bg-orange-soft p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-orange-deep">{data.repaidLabel}</p>
            <p className="mt-1 font-poppins text-2xl font-bold text-orange-deep">{eur(repaid)}</p>
          </div>
        </div>

        <p className="mt-5 text-center text-sm leading-relaxed text-foreground">
          Acabas devolviendo <strong className="text-orange-deep">{eur(extra)} de más</strong>. Con
          intereses así de altos, gran parte de la deuda suele poder anularse.
        </p>

        <div className="mt-7 flex justify-center">
          <CtaButton className="h-14 px-8 text-base">Cancelar mis microcréditos</CtaButton>
        </div>
      </div>
    </section>
  );
};

export default ValueComparison;