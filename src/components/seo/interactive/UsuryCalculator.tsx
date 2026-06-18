import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { AlertTriangle } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyUsuryCalculator } from "@/data/seo/content/types";

const eur = (n: number) =>
  n.toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €";

/** Calculadora de usura: estima el interés pagado de más en una revolving. */
const UsuryCalculator = ({ data }: { data: MoneyUsuryCalculator }) => {
  const legalApr = data.legalApr ?? 20;
  const cardApr = data.cardApr ?? 26;
  const max = data.maxBalance ?? 12000;
  const [balance, setBalance] = useState(data.defaultBalance ?? 3000);

  // Estimación simple de intereses anuales pagados de más frente a la TAE legal.
  const cardInterest = Math.round((balance * cardApr) / 100);
  const legalInterest = Math.round((balance * legalApr) / 100);
  const overpaid = Math.max(cardInterest - legalInterest, 0);

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-7 md:p-10">
      <div className="text-center">
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{data.subtitle}</p>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex items-center justify-between text-sm font-medium text-foreground">
          <span>Saldo pendiente (tarjetas + microcréditos)</span>
          <span className="font-poppins text-lg font-bold text-accent-deep">{eur(balance)}</span>
        </div>
        <Slider
          value={[balance]}
          min={500}
          max={max}
          step={100}
          onValueChange={(v) => setBalance(v[0])}
          className="mt-4"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-elevated p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Interés revolving ({cardApr}% TAE)
            </p>
            <p className="mt-1 font-poppins text-2xl font-bold text-foreground">{eur(cardInterest)}/año</p>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent-soft/40 p-5 text-center">
            <p className="text-xs uppercase tracking-wide text-accent-deep">
              Interés legal de referencia ({legalApr}%)
            </p>
            <p className="mt-1 font-poppins text-2xl font-bold text-accent-deep">{eur(legalInterest)}/año</p>
          </div>
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-orange/40 bg-orange-soft p-5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-deep" aria-hidden />
          <p className="text-sm leading-relaxed text-foreground">
            Podrías estar pagando <strong className="text-orange-deep">{eur(overpaid)} al año</strong> de
            intereses de más. Si la TAE es desproporcionada, la deuda puede anularse por usura.
          </p>
        </div>

        <div className="mt-7 flex justify-center">
          <CtaButton className="h-14 px-8 text-base">Revisar mi tarjeta gratis</CtaButton>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Estimación orientativa. El cálculo real depende del histórico de tu contrato.
        </p>
      </div>
    </section>
  );
};

export default UsuryCalculator;