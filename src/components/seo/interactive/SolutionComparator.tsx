import { useState } from "react";
import { Scale, Check, Star } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";

type SolutionKey = "lso" | "reunificar" | "reclamar";

type ToggleState = {
  /** ¿puede pagar sus deudas? */
  solvent: boolean;
  /** ¿tiene vivienda/terreno ya pagado? */
  paidAssets: boolean;
  /** ¿hay tarjetas revolving / usura? */
  usura: boolean;
};

const SOLUTIONS: { key: SolutionKey; label: string }[] = [
  { key: "lso", label: "Ley de Segunda Oportunidad" },
  { key: "reunificar", label: "Reunificación" },
  { key: "reclamar", label: "Reclamación por usura" },
];

const ROWS: { feature: string; values: Record<SolutionKey, string> }[] = [
  {
    feature: "Qué hace",
    values: {
      lso: "Cancela legalmente las deudas que no puedes pagar.",
      reunificar: "Negocia extrajudicialmente una cuota y un total más bajos, sin préstamo nuevo.",
      reclamar: "Anula los intereses abusivos y recupera lo pagado de más.",
    },
  },
  {
    feature: "A quién conviene",
    values: {
      lso: "Insolvente y sin bienes valiosos que perder.",
      reunificar: "Insolvente con vivienda o terreno pagado que quiere proteger.",
      reclamar: "Puede pagar, pero arrastra deuda cara por intereses desproporcionados.",
    },
  },
  {
    feature: "Qué pasa con tus bienes",
    values: {
      lso: "Pueden tener que liquidarse bienes valiosos para exonerar.",
      reunificar: "Conservas tus bienes; el objetivo es protegerlos.",
      reclamar: "No afecta a tus bienes.",
    },
  },
  {
    feature: "Resultado",
    values: {
      lso: "Empezar de cero sin la deuda exonerada.",
      reunificar: "Una sola cuota asumible y menos intereses.",
      reclamar: "Deuda reducida o anulada y dinero recuperado.",
    },
  },
  {
    feature: "Plazo orientativo",
    values: {
      lso: "Meses (procedimiento judicial).",
      reunificar: "Semanas (negociación).",
      reclamar: "Variable según reclamación.",
    },
  },
];

/** Decide la vía recomendada según los toggles, siguiendo la regla de triaje. */
const recommend = (s: ToggleState): SolutionKey => {
  if (!s.solvent) return s.paidAssets ? "reunificar" : "lso";
  if (s.usura) return "reclamar";
  return "reunificar";
};

const Toggle = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    type="button"
    onClick={() => onChange(!value)}
    aria-pressed={value}
    className={`flex items-center justify-between gap-3 rounded-2xl border p-4 text-left text-sm font-medium transition-colors ${
      value
        ? "border-accent/50 bg-accent-soft/50 text-foreground"
        : "border-border bg-surface-elevated text-muted-foreground"
    }`}
  >
    <span>{label}</span>
    <span
      className={`flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors ${
        value ? "bg-accent" : "bg-border"
      }`}
    >
      <span
        className={`h-5 w-5 rounded-full bg-surface shadow-soft transition-transform ${
          value ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </span>
  </button>
);

/** Comparador interactivo de las 3 vías de deuda con columna recomendada destacada. */
const SolutionComparator = () => {
  const [state, setState] = useState<ToggleState>({
    solvent: false,
    paidAssets: false,
    usura: false,
  });
  const best = recommend(state);

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-7 md:p-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
          <Scale className="h-3.5 w-3.5" aria-hidden /> Comparador
        </span>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Toggle
          label="Puedo pagar mis deudas"
          value={state.solvent}
          onChange={(v) => setState((s) => ({ ...s, solvent: v }))}
        />
        <Toggle
          label="Tengo casa o terreno pagado"
          value={state.paidAssets}
          onChange={(v) => setState((s) => ({ ...s, paidAssets: v }))}
        />
        <Toggle
          label="Tengo tarjetas revolving / usura"
          value={state.usura}
          onChange={(v) => setState((s) => ({ ...s, usura: v }))}
        />
      </div>

      {/* Vista de tarjetas apiladas para móvil */}
      <div className="mt-8 grid gap-4 sm:hidden">
        {SOLUTIONS.map((sol) => {
          const isBest = sol.key === best;
          return (
            <div
              key={sol.key}
              className={`rounded-2xl border p-4 ${
                isBest ? "border-accent bg-accent-soft/40" : "border-border bg-surface-elevated"
              }`}
            >
              <div
                className={`-mx-4 -mt-4 mb-4 flex items-center justify-center gap-1.5 rounded-t-2xl px-4 py-3 text-center font-poppins font-semibold ${
                  isBest ? "bg-accent text-accent-foreground" : "text-foreground"
                }`}
              >
                {isBest && <Star className="h-4 w-4" aria-hidden />}
                {sol.label}
              </div>
              {isBest && (
                <p className="mb-3 text-center text-xs font-medium text-accent-deep">
                  Recomendada para tu caso
                </p>
              )}
              <dl className="space-y-3">
                {ROWS.map((row) => (
                  <div key={row.feature}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {row.feature}
                    </dt>
                    <dd className="mt-0.5 text-sm text-foreground/80">{row.values[sol.key]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          );
        })}
      </div>

      {/* Tabla comparativa para pantallas medianas y grandes */}
      <div className="mt-8 hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-40 p-3 text-left font-medium text-muted-foreground" />
              {SOLUTIONS.map((sol) => {
                const isBest = sol.key === best;
                return (
                  <th
                    key={sol.key}
                    className={`rounded-t-2xl p-3 text-center align-top font-poppins font-semibold ${
                      isBest
                        ? "bg-accent text-accent-foreground"
                        : "bg-surface-elevated text-foreground"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      {isBest && <Star className="h-4 w-4" aria-hidden />}
                      {sol.label}
                    </span>
                    {isBest && (
                      <span className="mt-1 block text-xs font-normal opacity-90">
                        Recomendada para tu caso
                      </span>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.feature} className="align-top">
                <th className="p-3 text-left font-medium text-foreground">{row.feature}</th>
                {SOLUTIONS.map((sol) => {
                  const isBest = sol.key === best;
                  return (
                    <td
                      key={sol.key}
                      className={`border-t border-border p-3 text-center text-foreground/80 ${
                        isBest ? "bg-accent-soft/40" : ""
                      }`}
                    >
                      {row.values[sol.key]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Check className="h-3.5 w-3.5 text-accent-deep" aria-hidden />
        Tener una vivienda o terreno pagado suele dificultar la Ley de Segunda Oportunidad sin
        perderlo: por eso a menudo conviene reunificar.
      </p>

      <div className="mt-7 flex justify-center">
        <CtaButton className="h-14 px-8 text-base">Confirmar mi mejor opción gratis</CtaButton>
      </div>
    </section>
  );
};

export default SolutionComparator;
