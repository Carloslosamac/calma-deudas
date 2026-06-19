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
    <div className="rounded-2xl border border-accent/40 bg-accent-soft/30 p-4 mb-5">
      <div className="flex items-center gap-2 text-accent-deep mb-3">
        <TrendingDown className="h-4 w-4" />
        <span className="text-[11px] font-medium uppercase tracking-wider">Tu beneficio estimado</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-xl bg-background border border-border p-3">
          <p className="text-[11px] text-muted-foreground mb-0.5">{b.beforeLabel}</p>
          <p className="font-poppins text-lg font-bold text-foreground line-through decoration-muted-foreground/40">
            {eur(before)}
          </p>
        </div>
        <div className="rounded-xl bg-background border border-accent/40 p-3">
          <p className="text-[11px] text-muted-foreground mb-0.5">{b.afterLabel}</p>
          <p className="font-poppins text-lg font-bold text-accent-deep">{eur(after)}</p>
        </div>
      </div>

      <div className="relative h-2 rounded-full bg-muted overflow-hidden mb-3">
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: `${barPct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
        />
      </div>

      <div className="flex items-center justify-between rounded-xl bg-foreground text-background px-4 py-3">
        <div className="flex items-center gap-2">
          <PiggyBank className="h-5 w-5 shrink-0" />
          <span className="text-xs font-medium">{b.highlightLabel}</span>
        </div>
        <span className="font-poppins text-xl font-bold">{eur(highlight)}</span>
      </div>
    </div>
  );
};

export default BenefitSimulator;