import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyQuiz } from "@/data/seo/content/types";

/** Test de elegibilidad por pasos con pantalla de resultado. */
const EligibilityQuiz = ({ quiz }: { quiz: MoneyQuiz }) => {
  const total = quiz.questions.length;
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const answer = (value: "yes" | "no") => {
    const good = value === quiz.questions[step].goodAnswer;
    const nextScore = score + (good ? 1 : 0);
    if (step + 1 >= total) {
      setScore(nextScore);
      setDone(true);
    } else {
      setScore(nextScore);
      setStep(step + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setScore(0);
    setDone(false);
  };

  const pass = score >= Math.ceil(total * 0.75);
  const result = pass ? quiz.resultPass : quiz.resultDoubt;
  const progress = done ? 100 : (step / total) * 100;

  return (
    <section className="overflow-hidden rounded-[2rem] border border-accent/30 bg-accent-soft/40 p-7 md:p-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> Test rápido
        </span>
        <h2 className="mt-4 font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {quiz.title}
        </h2>
        {quiz.subtitle && <p className="mt-2 text-sm text-muted-foreground">{quiz.subtitle}</p>}
      </div>

      {/* barra de progreso */}
      <div className="mx-auto mt-7 h-1.5 max-w-xl overflow-hidden rounded-full bg-foreground/10">
        <motion.div
          className="h-full rounded-full bg-accent"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={`q-${step}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="rounded-3xl bg-surface-elevated p-7 text-center shadow-soft"
            >
              <p className="text-xs font-medium text-muted-foreground">
                Pregunta {step + 1} de {total}
              </p>
              <p className="mt-3 font-poppins text-lg font-semibold text-foreground">
                {quiz.questions[step].text}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => answer("yes")}
                  className="min-w-28 rounded-full border-2 border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent-soft/50"
                >
                  Sí
                </button>
                <button
                  type="button"
                  onClick={() => answer("no")}
                  className="min-w-28 rounded-full border-2 border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent-soft/50"
                >
                  No
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-surface-elevated p-8 text-center shadow-medium"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
                <CheckCircle2 className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-4 font-poppins text-xl font-bold text-foreground md:text-2xl">
                {result.title}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                {result.text}
              </p>
              <div className="mt-6 flex justify-center">
                <CtaButton className="h-14 px-8 text-base">Pedir mi estudio gratis</CtaButton>
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Repetir test
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default EligibilityQuiz;
