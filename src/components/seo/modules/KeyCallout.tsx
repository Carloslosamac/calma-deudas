import type { ReactNode } from "react";

export type KeyCalloutProps = {
  /** etiqueta pequeña sobre el titular, ej. "En una frase" */
  eyebrow?: string;
  /** titular destacado (puede incluir <span> con acento) */
  headline: ReactNode;
  /** párrafo(s) de apoyo */
  children?: ReactNode;
  /** variante visual del bloque */
  tone?: "accent" | "neutral";
};

/** Tarjeta de idea-fuerza: el "en una frase" de una sección. */
const KeyCallout = ({ eyebrow, headline, children, tone = "accent" }: KeyCalloutProps) => (
  <div
    className={
      tone === "accent"
        ? "rounded-3xl border border-accent/30 bg-accent-soft/40 p-6 md:p-8"
        : "rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft md:p-8"
    }
  >
    {eyebrow && (
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
        {eyebrow}
      </p>
    )}
    <p className="mt-3 font-poppins text-xl font-semibold leading-snug text-foreground md:text-2xl">
      {headline}
    </p>
    {children && (
      <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/80">{children}</div>
    )}
  </div>
);

export default KeyCallout;