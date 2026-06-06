import { Star, Quote } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyTestimonial } from "@/data/seo/content/types";

type Props = {
  title: string;
  subtitle?: string;
  items: MoneyTestimonial[];
};

/** Prueba social: casos reales de deuda cancelada. */
const Testimonials = ({ title, subtitle, items }: Props) => (
  <section>
    <div className="text-center">
      <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{subtitle}</p>}
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-3">
      {items.map((t) => (
        <div
          key={t.name}
          className="flex h-full flex-col rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium"
        >
          <div className="rounded-2xl bg-gradient-dark p-6 text-primary-foreground">
            <Quote className="h-6 w-6 text-accent" aria-hidden />
            <p className="mt-3 font-poppins text-base font-medium italic text-primary-foreground/90">
              {t.name}
            </p>
            <p className="mt-2 font-poppins text-3xl font-bold leading-none text-accent md:text-4xl">
              {t.amount}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-primary-foreground/80">
              de deuda cancelada
            </p>
          </div>

          <div className="mt-5 flex items-center gap-1.5">
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
      ))}
    </div>

    <div className="mt-9 flex justify-center">
      <CtaButton className="h-14 px-8 text-base">Quiero ser el próximo caso</CtaButton>
    </div>
  </section>
);

export default Testimonials;