import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, RotateCcw, Sparkles, ArrowRight } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";

type Answers = {
  solvente?: boolean;
  activosPagados?: boolean;
  usura?: boolean;
};

type Question = {
  key: keyof Answers;
  text: string;
  help?: string;
  yes: string;
  no: string;
};

const QUESTIONS: Question[] = [
  {
    key: "solvente",
    text: "¿Puedes pagar tus deudas con tus ingresos actuales?",
    help: "Piensa si llegas a cubrir las cuotas sin pedir más préstamos.",
    yes: "Sí, voy pagando",
    no: "No, no puedo",
  },
  {
    key: "activosPagados",
    text: "¿Tienes bienes valiosos ya pagados (vivienda o terreno en propiedad)?",
    help: "Bienes sin hipoteca que querrías proteger.",
    yes: "Sí, tengo",
    no: "No tengo",
  },
  {
    key: "usura",
    text: "¿Tu deuda viene sobre todo de tarjetas revolving o microcréditos con intereses muy altos?",
    help: "TAE desproporcionadas, deuda que no baja por más que pagas.",
    yes: "Sí, sobre todo eso",
    no: "No, son otras deudas",
  },
];

type Result = {
  title: string;
  text: string;
  ctaLabel: string;
  to: string;
  toLabel: string;
};

const resolve = (a: Answers): Result => {
  if (a.solvente === false) {
    if (a.activosPagados) {
      return {
        title: "Te encaja una reunificación de deudas",
        text: "No puedes pagar pero tienes bienes valiosos ya pagados que querrías proteger. Una negociación para rebajar tu cuota (y el total) suele ser la vía más prudente antes de recurrir a otras soluciones.",
        ctaLabel: "Quiero rebajar mi cuota gratis",
        to: "/reunificar-deudas",
        toLabel: "Ver cómo reunificar deudas",
      };
    }
    return {
      title: "Te encaja la Ley de Segunda Oportunidad",
      text: "No puedes pagar tus deudas y no tienes bienes valiosos que proteger: la Ley de Segunda Oportunidad te permite cancelar la deuda legalmente y empezar de cero.",
      ctaLabel: "Analizar mi caso gratis",
      to: "/ley-segunda-oportunidad",
      toLabel: "Ver la Ley de Segunda Oportunidad",
    };
  }
  if (a.usura) {
    return {
      title: "Te encaja una reclamación por usura",
      text: "Puedes ir pagando, pero tu deuda viene de intereses abusivos (revolving o microcréditos). Esa deuda puede anularse por usura y podrías recuperar parte de lo pagado de más.",
      ctaLabel: "Revisar mi tarjeta gratis",
      to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
      toLabel: "Ver cómo reclamar revolving",
    };
  }
  return {
    title: "Te encaja una reunificación de deudas",
    text: "Puedes pagar, pero las cuotas te aprietan. Una reunificación negociada puede bajar tu cuota mensual y el total a devolver para que recuperes margen.",
    ctaLabel: "Quiero rebajar mi cuota gratis",
    to: "/reunificar-deudas",
    toLabel: "Ver cómo reunificar deudas",
  };
};

/** Test orientativo que recomienda la vía adecuada según la situación. */
const SolutionDiagnosisTool = () => {
  const total = QUESTIONS.length;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);

  const answer = (value: boolean) => {
    const q = QUESTIONS[step];
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    if (step + 1 >= total) setDone(true);
    else setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const progress = done ? 100 : (step / total) * 100;
  const result = done ? resolve(answers) : null;

  return (
    <section className="overflow-hidden rounded-[2rem] border border-accent/30 bg-accent-soft/40 p-7 md:p-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
          <Sparkles className="h-3.5 w-3.5" aria-hidden /> Test rápido · 1 minuto
        </span>
      </div>

      <div className="mx-auto mt-6 h-1.5 max-w-xl overflow-hidden rounded-full bg-surface-elevated">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!done && result === null && (
        <div className="mx-auto mt-8 max-w-xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-deep">
            Pregunta {step + 1} de {total}
          </p>
          <h3 className="mt-2 font-poppins text-xl font-bold text-foreground md:text-2xl">
            {QUESTIONS[step].text}
          </h3>
          {QUESTIONS[step].help && (
            <p className="mt-2 text-sm text-muted-foreground">{QUESTIONS[step].help}</p>
          )}
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => answer(true)}
              className="rounded-2xl border border-border bg-surface-elevated px-5 py-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent-soft/60"
            >
              {QUESTIONS[step].yes}
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="rounded-2xl border border-border bg-surface-elevated px-5 py-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent-soft/60"
            >
              {QUESTIONS[step].no}
            </button>
          </div>
        </div>
      )}

      {done && result && (
        <div className="mx-auto mt-8 max-w-xl text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-accent" aria-hidden />
          <h3 className="mt-3 font-poppins text-2xl font-bold text-foreground">{result.title}</h3>
          <p className="mt-3 text-muted-foreground">{result.text}</p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton className="h-14 px-8 text-base">{result.ctaLabel}</CtaButton>
            <Link
              to={result.to}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border bg-surface-elevated px-7 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent-soft/50"
            >
              {result.toLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <button
            type="button"
            onClick={reset}
            className="mx-auto mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden /> Repetir el test
          </button>
        </div>
      )}
    </section>
  );
};

export default SolutionDiagnosisTool;