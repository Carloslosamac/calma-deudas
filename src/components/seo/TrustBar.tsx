import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import type { MoneySocialProof } from "@/data/seo/content/types";

const MEDIA = ["El País", "Expansión", "La Razón", "20minutos", "ABC", "Cinco Días"];

/** Banda de prueba social de marca: valoración, casos y medios. */
const TrustBar = ({ data }: { data?: MoneySocialProof }) => {
  const rating = data?.rating ?? "4,8";
  const ratingCount = data?.ratingCount ?? "+1.200 valoraciones";
  const casesLabel = data?.casesLabel ?? "+19.000 familias sin deudas";
  const trustSeal = data?.trustSeal ?? "Respuesta en 24h · Gratis · Sin compromiso";
  const mediaLabel = data?.mediaLabel ?? "Han hablado de nosotros";

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-10">
          {/* Valoración */}
          <div className="flex items-center gap-3">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </span>
            <div className="text-left">
              <p className="font-poppins text-lg font-bold leading-none text-foreground">
                {rating}<span className="text-muted-foreground">/5</span>
              </p>
              <p className="text-xs text-muted-foreground">{ratingCount}</p>
            </div>
          </div>

          <span aria-hidden className="hidden h-10 w-px bg-border md:block" />

          {/* Casos */}
          <div className="flex items-center gap-2 text-foreground">
            <ShieldCheck className="h-5 w-5 text-accent-deep" aria-hidden />
            <p className="font-poppins text-sm font-semibold">{casesLabel}</p>
          </div>

          <span aria-hidden className="hidden h-10 w-px bg-border md:block" />

          {/* Sello */}
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-accent-deep" aria-hidden />
            {trustSeal}
          </p>
        </div>

        {/* Medios */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            {mediaLabel}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {MEDIA.map((m) => (
              <span
                key={m}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-foreground/55 md:text-xl"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;