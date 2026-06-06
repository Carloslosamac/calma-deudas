import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyTestimonial } from "@/data/seo/content/types";

type Props = {
  title: string;
  subtitle?: string;
  items: MoneyTestimonial[];
  /** enlace del botón secundario "ver más casos" */
  moreHref?: string;
  moreLabel?: string;
};

/** Tarjeta individual de testimonio con foto. */
const TestimonialCard = ({ t }: { t: MoneyTestimonial }) => (
  <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium">
    <div className="relative aspect-[4/3] overflow-hidden">
      {t.photo && (
        <img
          src={t.photo}
          alt={`${t.name}, caso real de cancelación de deuda`}
          loading="lazy"
          width={768}
          height={576}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
        <p className="font-poppins text-sm font-medium italic text-primary-foreground/85">{t.name}</p>
        <p className="font-poppins text-3xl font-bold leading-none text-accent">{t.amount}</p>
        <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-primary-foreground/85">
          de deuda cancelada
        </p>
      </div>
    </div>

    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-semibold text-foreground">Excelente</span>
        <span className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden />
          ))}
        </span>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
      <p className="mt-3 text-xs font-medium uppercase tracking-wide text-accent-deep">
        {t.location} · Ley de Segunda Oportunidad
      </p>
    </div>
  </div>
);

/** Diapositiva grande de un caso, con foto a tamaño completo. */
const TestimonialSlide = ({ t }: { t: MoneyTestimonial }) => (
  <div className="grid items-stretch overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-medium md:grid-cols-2">
    <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto">
      {t.photo && (
        <img
          src={t.photo}
          alt={`${t.name}, caso real de cancelación de deuda`}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent md:bg-gradient-to-r" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
        <p className="font-poppins text-sm font-medium italic text-primary-foreground/85">{t.name}</p>
        <p className="font-poppins text-4xl font-bold leading-none text-accent md:text-5xl">{t.amount}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground/85">
          de deuda cancelada
        </p>
      </div>
    </div>

    <div className="flex flex-col justify-center p-7 md:p-10">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">Excelente</span>
        <span className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-accent text-accent" aria-hidden />
          ))}
        </span>
      </div>
      <p className="mt-4 text-lg leading-relaxed text-foreground/90 md:text-xl">"{t.text}"</p>
      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-accent-deep">
        {t.location} · Ley de Segunda Oportunidad
      </p>
    </div>
  </div>
);

/** Prueba social: casos reales en un slider de una sola imagen. */
const Testimonials = ({ title, subtitle, items, moreHref, moreLabel }: Props) => {
  const [index, setIndex] = useState(0);
  const count = items.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <section>
      <div className="text-center">
        <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="relative mx-auto mt-10 max-w-4xl">
        {items[index] && <TestimonialSlide t={items[index]} />}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Caso anterior"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface-elevated/90 text-foreground shadow-soft backdrop-blur transition-colors hover:border-accent hover:bg-accent-soft/60 md:-left-5"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Caso siguiente"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface-elevated/90 text-foreground shadow-soft backdrop-blur transition-colors hover:border-accent hover:bg-accent-soft/60 md:-right-5"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver caso ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-7 bg-accent" : "w-2.5 bg-border hover:bg-accent/50"
              }`}
            />
          ))}
        </div>
      )}

      <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CtaButton className="h-14 px-8 text-base">Quiero ser el próximo caso</CtaButton>
        {moreHref && (
          <Link
            to={moreHref}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated px-8 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent-soft/50"
          >
            {moreLabel ?? "Ver más casos"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}
      </div>
    </section>
  );
};

export { TestimonialCard };
export default Testimonials;