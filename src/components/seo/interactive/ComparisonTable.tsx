import { Check, Minus } from "lucide-react";
import CtaButton from "@/components/seo/CtaButton";
import type { MoneyComparisonTable } from "@/data/seo/content/types";

/** Renderiza el valor de una celda: ✓ / ✗ / texto. */
const Cell = ({ value }: { value: string }) => {
  if (value === "si" || value === "sí") return <Check className="mx-auto h-5 w-5 text-accent-deep" aria-hidden />;
  if (value === "no") return <Minus className="mx-auto h-5 w-5 text-muted-foreground" aria-hidden />;
  return <span className="text-sm text-foreground/85">{value}</span>;
};

/** Versión en línea de un valor para la vista apilada en móvil. */
const InlineValue = ({ value }: { value: string }) => {
  if (value === "si" || value === "sí")
    return (
      <span className="inline-flex items-center gap-1 font-medium text-accent-deep">
        <Check className="h-4 w-4" aria-hidden /> Sí
      </span>
    );
  if (value === "no")
    return (
      <span className="inline-flex items-center gap-1 font-medium text-muted-foreground">
        <Minus className="h-4 w-4" aria-hidden /> No
      </span>
    );
  return <span className="text-sm text-foreground/85">{value}</span>;
};

/** Tabla comparativa entre soluciones (ej. reunificar vs cancelar). */
const ComparisonTable = ({ data }: { data: MoneyComparisonTable }) => (
  <section>
    <div className="text-center">
      <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {data.title}
      </h2>
      {data.subtitle && (
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{data.subtitle}</p>
      )}
    </div>

    {/* Móvil: una tarjeta por columna con sus valores apilados */}
    <div className="mx-auto mt-8 grid max-w-xl gap-4 md:hidden">
      {data.columns.map((col, ci) => (
        <div
          key={col.title}
          className={`overflow-hidden rounded-3xl border ${
            col.highlight ? "border-accent/60 bg-accent-soft/25" : "border-border bg-surface-elevated"
          }`}
        >
          <p
            className={`px-5 py-3 font-poppins text-base font-bold ${
              col.highlight ? "bg-accent-soft/60 text-accent-deep" : "text-foreground"
            }`}
          >
            {col.title}
          </p>
          <dl className="divide-y divide-border px-5 py-1">
            {data.rows.map((row) => (
              <div key={row.feature} className="flex items-start justify-between gap-4 py-3">
                <dt className="text-sm font-medium text-muted-foreground">{row.feature}</dt>
                <dd className="text-right">
                  <InlineValue value={row.values[ci]} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>

    {/* Tablet y escritorio: tabla con scroll horizontal si hace falta */}
    <div className="mx-auto mt-8 hidden max-w-3xl overflow-x-auto rounded-3xl border border-border md:block">
      <table className="w-full min-w-[640px] border-collapse text-center">
        <thead>
          <tr className="bg-surface">
            <th className="p-4 text-left text-sm font-semibold text-muted-foreground" />
            {data.columns.map((c) => (
              <th
                key={c.title}
                className={`p-4 font-poppins text-sm font-bold ${
                  c.highlight ? "bg-accent-soft/50 text-accent-deep" : "text-foreground"
                }`}
              >
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={row.feature} className={ri % 2 ? "bg-surface/50" : "bg-surface-elevated"}>
              <td className="p-4 text-left text-sm font-medium text-foreground">{row.feature}</td>
              {row.values.map((v, ci) => (
                <td
                  key={ci}
                  className={`p-4 align-middle ${
                    data.columns[ci]?.highlight ? "bg-accent-soft/30" : ""
                  }`}
                >
                  <Cell value={v} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-8 flex justify-center">
      <CtaButton className="h-14 px-8 text-base">¿Cuál me conviene? Pregúntanos gratis</CtaButton>
    </div>
  </section>
);

export default ComparisonTable;