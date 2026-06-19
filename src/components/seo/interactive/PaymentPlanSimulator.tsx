import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { TrendingDown, AlertTriangle } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import { CONSUMER_AVG_APR } from "@/data/seo/tools";

const eur = (n: number) =>
  Math.round(n).toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €";

/** Formatea un número de meses como "X años Y meses". */
const formatMonths = (months: number) => {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts: string[] = [];
  if (y > 0) parts.push(`${y} ${y === 1 ? "año" : "años"}`);
  if (m > 0) parts.push(`${m} ${m === 1 ? "mes" : "meses"}`);
  return parts.join(" y ") || "menos de 1 mes";
};

const MAX_MONTHS = 1200; // tope de seguridad (100 años)

/** Simula cuánto se tarda y cuántos intereses cuesta liquidar una deuda con cuotas fijas. */
const PaymentPlanSimulator = () => {
  const [debt, setDebt] = useState(12000);
  const [payment, setPayment] = useState(300);
  const [apr, setApr] = useState(CONSUMER_AVG_APR);

  const monthlyRate = apr / 100 / 12;
  const firstInterest = debt * monthlyRate;
  // La deuda no baja nunca si la cuota no cubre ni los intereses del primer mes.
  const neverPaysOff = payment <= firstInterest;

  let months = 0;
  let totalInterest = 0;
  if (!neverPaysOff) {
    let balance = debt;
    while (balance > 0 && months < MAX_MONTHS) {
      const interest = balance * monthlyRate;
      totalInterest += interest;
      balance = balance + interest - payment;
      months += 1;
    }
  }

  const totalPaid = debt + totalInterest;

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-7 md:p-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
          <TrendingDown className="h-3.5 w-3.5" aria-hidden /> Plan de pagos
        </span>
      </div>

      <div className="mx-auto mt-8 max-w-xl space-y-6">
        <div>
          <div className="flex items-center justify-between text-sm font-medium text-foreground">
            <span>Deuda total</span>
            <span className="font-poppins text-lg font-bold text-accent-deep">{eur(debt)}</span>
          </div>
          <Slider value={[debt]} min={500} max={80000} step={500} onValueChange={(v) => setDebt(v[0])} className="mt-4" />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium text-foreground">
            <span>Cuota que puedes pagar al mes</span>
            <span className="font-poppins text-lg font-bold text-accent-deep">{eur(payment)}</span>
          </div>
          <Slider value={[payment]} min={20} max={3000} step={10} onValueChange={(v) => setPayment(v[0])} className="mt-4" />
        </div>

        <div>
          <div className="flex items-center justify-between text-sm font-medium text-foreground">
            <span>TAE media</span>
            <span className="font-poppins text-lg font-bold text-accent-deep">{apr}%</span>
          </div>
          <Slider value={[apr]} min={5} max={40} step={1} onValueChange={(v) => setApr(v[0])} className="mt-4" />
        </div>

        {neverPaysOff ? (
          <div className="flex items-start gap-3 rounded-2xl border border-orange/40 bg-orange-soft p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-deep" aria-hidden />
            <div>
              <p className="font-poppins font-semibold text-orange-deep">Tu deuda no bajaría nunca</p>
              <p className="mt-1 text-sm text-foreground/75">
                Con esta cuota no cubres ni los intereses ({eur(firstInterest)} solo el primer mes). El
                saldo se queda igual o crece: es la trampa de la deuda. Necesitas una solución legal,
                no más cuotas.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 text-center">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Tardarías</p>
              <p className="mt-1 font-poppins text-xl font-bold text-foreground">{formatMonths(months)}</p>
            </div>
            <div className="rounded-2xl border border-orange/40 bg-orange-soft p-5 text-center">
              <p className="text-xs uppercase tracking-wide text-orange-deep">Intereses pagados</p>
              <p className="mt-1 font-poppins text-xl font-bold text-orange-deep">{eur(totalInterest)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-elevated p-5 text-center">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Total a pagar</p>
              <p className="mt-1 font-poppins text-xl font-bold text-foreground">{eur(totalPaid)}</p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-accent/40 bg-accent-soft/40 p-5 text-center">
          <p className="text-sm text-foreground/80">
            Con una solución legal podrías <strong>cancelar</strong> la deuda o reunificarla en una
            cuota más baja, reduciendo plazo y total a pagar.
          </p>
          <div className="mt-4 flex justify-center">
            <CtaButton className="h-14 px-8 text-base">Reducir mi deuda gratis</CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPlanSimulator;
