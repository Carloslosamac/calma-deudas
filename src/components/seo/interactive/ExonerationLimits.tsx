import { Landmark, Info } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyExonerationLimits } from "@/data/seo/content/types";

/** Bloque de límites de exoneración para deuda pública. */
const ExonerationLimits = ({ data }: { data: MoneyExonerationLimits }) => (
  <section className="rounded-[2rem] border border-border bg-surface p-7 md:p-10">
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
        <Landmark className="h-6 w-6" aria-hidden />
      </span>
      <div>
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {data.title}
        </h2>
        {data.subtitle && <p className="mt-2 text-muted-foreground">{data.subtitle}</p>}
      </div>
    </div>

    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {data.items.map((it) => (
        <div key={it.label} className="rounded-2xl border border-border bg-surface-elevated p-5">
          <p className="font-poppins font-semibold text-accent-deep">{it.label}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
        </div>
      ))}
    </div>

    {data.note && (
      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-surface-elevated p-5">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" aria-hidden />
        <p className="text-sm leading-relaxed text-foreground/85">{data.note}</p>
      </div>
    )}

    <div className="mt-7 flex justify-center">
      <CtaButton className="h-14 px-8 text-base">Ver mi límite de exoneración</CtaButton>
    </div>
  </section>
);

export default ExonerationLimits;