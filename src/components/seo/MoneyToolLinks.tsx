import { Link } from "react-router-dom";
import { ArrowRight, Calculator, CreditCard, ShieldCheck, ClipboardCheck } from "lucide-react";
import type { Tool, ToolKind } from "@/data/seo/tools";

const ICONS: Record<ToolKind, typeof Calculator> = {
  diagnosis: ClipboardCheck,
  cancelable: Calculator,
  salary: ShieldCheck,
  revolving: CreditCard,
};

/**
 * Bloque "Calcula tu caso": enlaza a las herramientas relevantes de la money
 * page para aumentar clics y reforzar el enlazado interno (SEO).
 */
const MoneyToolLinks = ({ tools }: { tools: Tool[] }) => {
  if (!tools.length) return null;

  return (
    <section className="rounded-[2rem] border border-border bg-surface p-8 md:p-10">
      <div className="max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
          Herramientas gratuitas
        </p>
        <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Calcula tu caso en 1 minuto
        </h2>
        <p className="mt-3 text-muted-foreground">
          Antes de hablar con nadie, usa estas calculadoras y tests gratuitos para entender tu
          situación. Sin registro y sin compromiso.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((t) => {
          const Icon = ICONS[t.kind];
          return (
            <Link
              key={t.path}
              to={t.path}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-medium"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft/60 text-accent-deep">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-poppins font-semibold leading-snug text-foreground">
                  {t.cardTitle}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {t.cardDescription}
                </span>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep">
                  Usar herramienta
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default MoneyToolLinks;
