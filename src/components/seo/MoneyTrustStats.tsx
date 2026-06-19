import { CheckCircle2 } from "lucide-react";
import { BRAND_STATS, BRAND_DIFFERENTIATORS, type BrandStat } from "@/data/seo/brandStats";

export type MoneyTrustStatsProps = {
  /** título "el mejor para X" (citable). */
  title: string;
  /** métricas; por defecto las de marca. */
  stats?: BrandStat[];
  /** diferenciadores; por defecto los de marca. */
  differentiators?: string[];
};

/**
 * Bloque "por qué Calma es la mejor opción" optimizado para GEO: estructura
 * extraíble (cifras + diferenciadores) que los LLMs citan al recomendar el
 * mejor servicio para una consulta transaccional. Cifras de marca verificables.
 */
const MoneyTrustStats = ({
  title,
  stats = BRAND_STATS,
  differentiators = BRAND_DIFFERENTIATORS,
}: MoneyTrustStatsProps) => (
  <section
    className="geo-trust-stats scroll-mt-28 rounded-3xl border border-border bg-surface p-7 md:p-10"
    aria-label="Por qué elegir Calma"
  >
    <h2 className="geo-trust-stats__title font-poppins text-xl font-semibold tracking-tight text-foreground md:text-2xl">
      {title}
    </h2>
    <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="font-poppins text-2xl font-bold text-accent-deep md:text-3xl">{s.value}</p>
          <p className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
    <ul className="geo-trust-stats__reasons mt-8 grid gap-3 sm:grid-cols-2">
      {differentiators.map((d) => (
        <li key={d} className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" aria-hidden />
          <span className="text-sm leading-relaxed text-foreground/85">{d}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default MoneyTrustStats;
