import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyDebtType } from "@/data/seo/content/types";

type Props = {
  title: string;
  subtitle?: string;
  options: MoneyDebtType[];
};

/** Selector de tipo de deuda con mensaje adaptado. */
const DebtTypeSelector = ({ title, subtitle, options }: Props) => {
  const [active, setActive] = useState(0);
  const current = options[active];

  return (
    <section>
      <div className="text-center">
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      </div>

      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2.5">
        {options.map((o, i) => {
          const selected = i === active;
          return (
            <button
              key={o.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={selected}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                selected
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-surface-elevated text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-6 max-w-2xl rounded-3xl border border-border bg-surface-elevated p-7 text-center shadow-soft"
        >
          <p className="text-base leading-relaxed text-foreground/85">{current.message}</p>
          {current.to && (
            <Link
              to={current.to}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep underline-offset-4 hover:underline"
            >
              {current.linkLabel ?? "Ver más"}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          )}
          <div className="mt-6 flex justify-center">
            <CtaButton>Analizar mi caso gratis</CtaButton>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default DebtTypeSelector;
