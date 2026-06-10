import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyLegalTimeline } from "@/data/seo/content/types";

/** Línea temporal de fases legales (LSO, EPI, concurso). */
const LegalTimeline = ({ data }: { data: MoneyLegalTimeline }) => (
  <section>
    <div className="text-center">
      <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {data.title}
      </h2>
      {data.subtitle && (
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{data.subtitle}</p>
      )}
    </div>

    <div className="mx-auto mt-10 max-w-3xl">
      {data.phases.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          className="flex gap-5"
        >
          <div className="flex flex-col items-center">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft font-poppins text-sm font-bold text-accent-deep">
              {i + 1}
            </span>
            {i < data.phases.length - 1 && (
              <span aria-hidden className="my-1 w-px flex-1 bg-border" />
            )}
          </div>
          <div className="pb-8">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-poppins font-semibold text-foreground">{p.title}</h3>
              {p.duration && (
                <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-accent-deep">
                  {p.duration}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
          </div>
        </motion.div>
      ))}
      <div className="flex items-center gap-3 rounded-2xl border border-accent/40 bg-accent-soft/40 p-5">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-accent-deep" aria-hidden />
        <p className="text-sm font-medium text-foreground">
          Nosotros llevamos todas las fases por ti. Tú solo das el primer paso.
        </p>
      </div>
    </div>

    <div className="mt-8 flex justify-center">
      <CtaButton className="h-14 px-8 text-base">Empezar mi proceso gratis</CtaButton>
    </div>
  </section>
);

export default LegalTimeline;