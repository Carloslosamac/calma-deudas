import { motion } from "framer-motion";
import { AlertTriangle, Clock } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyUrgencyTimeline } from "@/data/seo/content/types";

/** Línea temporal de urgencia: qué pasa, paso a paso, si no actúas. */
const UrgencyTimeline = ({ data }: { data: MoneyUrgencyTimeline }) => (
  <section className="rounded-[2rem] bg-gradient-dark p-8 text-primary-foreground md:p-12">
    <div className="max-w-2xl">
      <span className="inline-flex items-center gap-2 rounded-full bg-orange/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-orange">
        <Clock className="h-4 w-4" aria-hidden /> El tiempo corre
      </span>
      <h2 className="mt-5 font-poppins text-3xl font-bold tracking-tight md:text-4xl">{data.title}</h2>
      {data.subtitle && <p className="mt-3 text-primary-foreground/70">{data.subtitle}</p>}
    </div>

    <ol className="mt-9 space-y-4 border-l border-primary-foreground/15 pl-6">
      {data.items.map((it, i) => (
        <motion.li
          key={it.title}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.06 }}
          className="relative"
        >
          <span
            className={`absolute -left-[31px] flex h-4 w-4 items-center justify-center rounded-full ${
              it.danger ? "bg-orange" : "bg-accent"
            }`}
            aria-hidden
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/60">
            {it.time}
          </p>
          <p className="mt-0.5 flex items-center gap-2 font-poppins font-semibold text-primary-foreground">
            {it.danger && <AlertTriangle className="h-4 w-4 text-orange" aria-hidden />}
            {it.title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-primary-foreground/75">{it.text}</p>
        </motion.li>
      ))}
    </ol>

    <div className="mt-9">
      <CtaButton className="h-14 px-8 text-base">Actuar ahora · es gratis</CtaButton>
    </div>
  </section>
);

export default UrgencyTimeline;