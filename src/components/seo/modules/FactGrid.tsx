import type { ReactNode } from "react";

export type Fact = {
  /** valor destacado, ej. "6–18 meses" */
  value: string;
  /** etiqueta, ej. "Duración" */
  label: string;
  /** detalle opcional bajo la etiqueta */
  detail?: ReactNode;
};

export type FactGridProps = {
  items: Fact[];
  columns?: 2 | 3;
};

const COLS: Record<2 | 3, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
};

/** Mosaico de cifras/hechos para "plazos y coste", límites, etc. */
const FactGrid = ({ items, columns = 3 }: FactGridProps) => (
  <div className={`grid gap-4 ${COLS[columns]}`}>
    {items.map((f) => (
      <div key={f.label} className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
        <p className="font-poppins text-2xl font-bold text-accent-deep md:text-3xl">{f.value}</p>
        <p className="mt-1 font-poppins text-sm font-semibold text-foreground">{f.label}</p>
        {f.detail && <p className="mt-2 text-sm leading-relaxed text-foreground/75">{f.detail}</p>}
      </div>
    ))}
  </div>
);

export default FactGrid;