import type { LocalCase } from "@/data/seo/localCases";

/**
 * Casos resueltos integrados dentro de la landing local: sin foto, sin enlace
 * a otra página y con la misma estructura en todas las ciudades.
 */
const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="border-t border-border/60 py-2.5 first:border-t-0 sm:grid sm:grid-cols-[170px_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-foreground/60">{label}</dt>
      <dd className="text-base leading-relaxed text-foreground/85">{value}</dd>
    </div>
  ) : null;

const CaseCard = ({ caso, index }: { caso: LocalCase; index: number }) => (
  <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
    <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-accent-deep">
      Caso {index} · {caso.city}
      {caso.province && caso.province !== caso.city ? ` (${caso.province})` : ""}
    </p>
    <dl>
      <Row
        label="Perfil"
        value={
          caso.profile
            ? caso.age
              ? `${caso.profile}, ${caso.age} años`
              : caso.profile
            : undefined
        }
      />
      <Row label="Situación inicial" value={caso.initialSituation} />
      <Row label="Deuda de partida" value={caso.debtAmount} />
      <Row
        label="Principales acreedores"
        value={caso.creditors?.length ? caso.creditors.join(", ") : undefined}
      />
      <Row label="Ingresos" value={caso.income} />
      <Row label="Patrimonio" value={caso.assets} />
      <Row label="Solución aplicada" value={caso.solution} />
      <Row label="Resultado" value={caso.cancelledAmount ?? caso.outcome} />
      {caso.cancelledAmount && caso.outcome ? (
        <Row label="Después" value={caso.outcome} />
      ) : null}
    </dl>
  </div>
);

const LocalCaseBlock = ({ casos }: { casos?: LocalCase[] }) => {
  if (!casos?.length) return null;

  return (
    <div className="space-y-4">
      {casos.map((c, i) => (
        <CaseCard key={`${c.city}-${i}`} caso={c} index={i + 1} />
      ))}
      <p className="text-sm leading-relaxed text-foreground/70">
        Expedientes anonimizados de clientes de la zona. Los importes y los plazos de cada
        procedimiento dependen de los ingresos, los bienes y el origen de la deuda de cada
        persona.
      </p>
    </div>
  );
};

export default LocalCaseBlock;
