import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, PiggyBank, CheckCircle2 } from "lucide-react";
import type { TriageResult } from "@/lib/seo/triage";

const eur = (n: number) =>
  Math.round(n).toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €";

/** Anima un número de 0 → value cuando entra en pantalla. */
const useCountUp = (value: number, duration = 1200) => {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  useEffect(() => {
    let raf: number;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const p = Math.min((t - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
};

type Benefit = {
  /** Etiqueta del antes */
  beforeLabel: string;
  before: number;
  /** Etiqueta del después */
  afterLabel: string;
  after: number;
  /** Métrica destacada (ahorro / recuperado) */
  highlightLabel: string;
  highlight: number;
  note: string;
};

const computeBenefit = (solution: TriageResult["solution"], debt: number): Benefit => {
  switch (solution) {
    case "lso":
      return {
        beforeLabel: "Deuda actual",
        before: debt,
        afterLabel: "Deuda tras exoneración",
        after: 0,
        highlightLabel: "Lo que dejarías de pagar",
        highlight: debt,
        note: "Con la Ley de Segunda Oportunidad puedes llegar a cancelar el 100% de la deuda exonerable.",
      };
    case "reclamacion": {
      const recovered = Math.round(debt * 0.45);
      return {
        beforeLabel: "Deuda reclamada",
        before: debt,
        afterLabel: "Deuda tras anular usura",
        after: 0,
        highlightLabel: "Intereses que podrías recuperar",
        highlight: recovered,
        note: "Si la TAE es usuraria, la deuda se anula y recuperas los intereses pagados de más.",
      };
    }
    case "reunificar":
    default: {
      const after = Math.round((debt * 0.6) / 100) * 100;
      return {
        beforeLabel: "Deuda actual",
        before: debt,
        afterLabel: "Total a pagar tras negociar",
        after,
        highlightLabel: "Ahorro estimado",
        highlight: debt - after,
        note: "Negociamos de forma extrajudicial para bajar la cuota y el total, sin pedir un préstamo nuevo.",
      };
    }
  }
};

const BenefitSimulator = ({
  solution,
  debtAmount,
}: {
  solution: TriageResult["solution"];
  debtAmount: number;
}) => {
  const b = computeBenefit(solution, debtAmount);
  const before = useCountUp(b.before);
  const after = useCountUp(b.after);
  const highlight = useCountUp(b.highlight);
  const barPct = b.before > 0 ? Math.max((b.after / b.before) * 100, 2) : 2;

  return (
    <div className="rounded-2xl border border-accent/40 bg-accent-soft/30 p-6 mb-8">
      <div className="flex items-center gap-2 text-accent-deep mb-5">
        <TrendingDown className="h-5 w-5" />
        <span className="text-xs font-medium uppercase tracking-wider">
          Simulación orientativa de tu beneficio
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl bg-background border border-border p-4">
          <p className="text-xs text-muted-foreground mb-1">{b.beforeLabel}</p>
          <p className="font-poppins text-2xl font-bold text-foreground line-through decoration-muted-foreground/40">
            {eur(before)}
          </p>
        </div>
        <div className="rounded-xl bg-background border border-accent/40 p-4">
          <p className="text-xs text-muted-foreground mb-1">{b.afterLabel}</p>
          <p className="font-poppins text-2xl font-bold text-accent-deep">{eur(after)}</p>
        </div>
      </div>

      <div className="relative h-3 rounded-full bg-muted overflow-hidden mb-6">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${barPct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
        />
      </div>

      <div className="flex items-center justify-between rounded-xl bg-foreground text-background p-5">
        <div className="flex items-center gap-3">
          <PiggyBank className="h-6 w-6 shrink-0" />
          <span className="text-sm font-medium">{b.highlightLabel}</span>
        </div>
        <span className="font-poppins text-2xl md:text-3xl font-bold">{eur(highlight)}</span>
      </div>

      <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
        <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-deep mt-0.5" />
        {b.note}
      </p>
    </div>
  );
};

export default BenefitSimulator;