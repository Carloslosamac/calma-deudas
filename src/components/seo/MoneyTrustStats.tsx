import { CheckCircle2, Star, ShieldCheck } from "lucide-react";
import { BRAND_STATS, BRAND_DIFFERENTIATORS, BRAND_RATING, type BrandStat } from "@/data/seo/brandStats";

export type MoneyTrustStatsProps = {
  /** título "el mejor para X" (citable). */
  title: string;
  /** métricas; por defecto las de marca. */
  stats?: BrandStat[];
  /** diferenciadores; por defecto los de marca. */
  differentiators?: string[];
};

/** Render de estrellas para la métrica de valoración. */
const RatingStars = () => {
  const full = Math.floor(Number(BRAND_RATING.value));
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < full ? "fill-accent-deep text-accent-deep" : "text-border"}`}
        />
      ))}
    </span>
  );
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
    className="geo-trust-stats scroll-mt-28 overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-soft"
    aria-label="Por qué elegir Calma"
  >
    <div className="border-b border-border bg-accent-soft/40 px-7 py-6 md:px-10">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-soft">
          <ShieldCheck className="h-5 w-5" aria-hidden />
        </span>
        <h2 className="geo-trust-stats__title font-poppins text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl">
          {title}
        </h2>
      </div>
    </div>

    <div className="grid grid-cols-2 divide-x divide-y divide-border border-b border-border lg:grid-cols-4 lg:divide-y-0">
      {stats.map((s, i) => {
        const isRating = i === 1;
        return (
          <div key={s.label} className="px-5 py-7 text-center">
            <p className="font-poppins text-2xl font-bold leading-none text-accent-deep md:text-3xl">
              {s.value}
            </p>
            {isRating && (
              <div className="mt-2 flex justify-center">
                <RatingStars />
              </div>
            )}
            <p className="mt-2.5 text-xs leading-snug text-muted-foreground md:text-sm">{s.label}</p>
          </div>
        );
      })}
    </div>

    <ul className="geo-trust-stats__reasons grid gap-x-8 gap-y-4 px-7 py-7 sm:grid-cols-2 md:px-10">
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
