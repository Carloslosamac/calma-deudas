import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import type { MoneyMythVsReality } from "@/data/seo/content/types";

/** Tarjetas educativas que contraponen un mito frecuente con la realidad legal. */
const MythVsReality = ({ data }: { data: MoneyMythVsReality }) => (
  <section className="text-center">
    <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
      {data.title}
    </h2>
    {data.subtitle && (
      <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{data.subtitle}</p>
    )}

    <div className="mx-auto mt-9 grid max-w-4xl gap-5 sm:grid-cols-2">
      {data.items.map((it, i) => (
        <motion.div
          key={it.myth}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="rounded-3xl border border-border bg-surface-elevated p-6 text-left"
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <X className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-sm font-semibold text-foreground">{it.myth}</p>
          </div>
          <div className="mt-4 flex items-start gap-3 border-t border-border pt-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Check className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-foreground/85">{it.reality}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default MythVsReality;
