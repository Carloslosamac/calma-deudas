import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyBeforeAfter } from "@/data/seo/content/types";

/** Comparador antes / después en dos columnas, visibles a la vez. */
const BeforeAfter = ({ data }: { data: MoneyBeforeAfter }) => (
  <section className="text-center">
    <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
      {data.title}
    </h2>
    {data.subtitle && <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{data.subtitle}</p>}

    <div className="mx-auto mt-9 grid max-w-4xl gap-5 md:grid-cols-2">
      {/* Antes */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-border bg-surface-elevated p-6 text-left"
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          {data.beforeLabel}
        </p>
        <ul className="space-y-3">
          {data.before.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <X className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm leading-relaxed text-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Después */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-3xl border border-accent/40 bg-accent-soft/40 p-6 text-left shadow-soft"
      >
        <p className="mb-4 text-sm font-bold uppercase tracking-wide text-accent-deep">
          {data.afterLabel}
        </p>
        <ul className="space-y-3">
          {data.after.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-sm leading-relaxed text-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>

    <div className="mt-9 flex justify-center">
      <CtaButton className="h-14 px-8 text-base">Quiero llegar aquí</CtaButton>
    </div>
  </section>
);

export default BeforeAfter;
