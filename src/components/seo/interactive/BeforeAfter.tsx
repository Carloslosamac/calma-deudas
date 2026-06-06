import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyBeforeAfter } from "@/data/seo/content/types";

/** Comparador antes / después con toggle. */
const BeforeAfter = ({ data }: { data: MoneyBeforeAfter }) => {
  const [after, setAfter] = useState(false);
  const items = after ? data.after : data.before;

  return (
    <section className="text-center">
      <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {data.title}
      </h2>
      {data.subtitle && <p className="mt-2 text-muted-foreground">{data.subtitle}</p>}

      {/* toggle */}
      <div className="mx-auto mt-7 inline-flex rounded-full border border-border bg-surface p-1">
        <button
          type="button"
          onClick={() => setAfter(false)}
          aria-pressed={!after}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
            !after ? "bg-foreground text-background shadow-soft" : "text-muted-foreground"
          }`}
        >
          {data.beforeLabel}
        </button>
        <button
          type="button"
          onClick={() => setAfter(true)}
          aria-pressed={after}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
            after ? "bg-accent text-accent-foreground shadow-soft" : "text-muted-foreground"
          }`}
        >
          {data.afterLabel}
        </button>
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <AnimatePresence mode="wait">
          <motion.ul
            key={after ? "after" : "before"}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
            className="space-y-3 text-left"
          >
            {items.map((t) => (
              <li
                key={t}
                className={`flex items-start gap-3 rounded-2xl border p-4 ${
                  after
                    ? "border-accent/30 bg-accent-soft/40"
                    : "border-border bg-surface-elevated"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                    after ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {after ? <Check className="h-4 w-4" aria-hidden /> : <X className="h-4 w-4" aria-hidden />}
                </span>
                <span className="text-sm leading-relaxed text-foreground">{t}</span>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        {after && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-7 flex justify-center"
          >
            <CtaButton className="h-14 px-8 text-base">Quiero llegar aquí</CtaButton>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BeforeAfter;
