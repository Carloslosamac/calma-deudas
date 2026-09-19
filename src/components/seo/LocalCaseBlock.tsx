import type { LocalCase } from "@/data/seo/localCases";

/**
 * Bloque "Caso real" integrado dentro de la landing local.
 * No enlaza a otra página y no se muestra si el caso no es real.
 * Misma estructura para todas las ciudades: sustituir un caso = editar datos.
 */
const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="border-t border-border/60 py-3 first:border-t-0 sm:grid sm:grid-cols-[170px_1fr] sm:gap-4">
      <dt className="text-sm font-medium text-foreground/60">{label}</dt>
      <dd className="text-base leading-relaxed text-foreground/85">{value}</dd>
    </div>
  ) : null;

const LocalCaseBlock = ({ caso }: { caso?: LocalCase }) => {
  if (!caso?.isReal) return null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-accent-deep">
          Caso real · {caso.city}
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
      <p className="text-sm leading-relaxed text-foreground/70">
        Caso real de un cliente de {caso.city}, anonimizado. Cada expediente es distinto: el
        resultado depende de tus ingresos, tus bienes y el origen de la deuda.
      </p>
    </div>
  );
};

export default LocalCaseBlock;
