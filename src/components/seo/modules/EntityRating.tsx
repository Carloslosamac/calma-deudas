import type { EntityKind } from "@/data/seo/entities";

/** Nivel semáforo cualitativo (sin cifras). */
export type RatingLevel = "verde" | "ambar" | "rojo";

export type RatingIndicator = {
  /** aspecto valorado, ej. "Presión de recobro" */
  label: string;
  level: RatingLevel;
  /** etiqueta corta del nivel, ej. "Alta", "Bajo" */
  levelLabel: string;
  /** frase de contexto de una línea */
  note: string;
};

export type EntityRatingProps = {
  kind: EntityKind;
  indicators: RatingIndicator[];
};

const KIND_LABEL: Record<EntityKind, string> = {
  recobro: "Empresa de recobro",
  microcredito: "Microcréditos",
  revolving: "Tarjeta revolving",
  banco: "Banco",
  publica: "Organismo público",
};

const DOT: Record<RatingLevel, string> = {
  verde: "bg-accent-deep",
  ambar: "bg-amber-deep",
  rojo: "bg-orange-deep",
};

const BADGE: Record<RatingLevel, string> = {
  verde: "bg-accent-soft text-accent-deep",
  ambar: "bg-amber-soft text-amber-deep",
  rojo: "bg-orange-soft text-orange-deep",
};

/**
 * Ficha visual de valoración por entidad con etiquetas semáforo.
 * Valores cualitativos curados (sin cifras inventadas). Cada indicador lleva
 * una frase de contexto porque el color no siempre es "malo" (ej. alto riesgo
 * de usura = más opciones de defensa para la persona).
 */
const EntityRating = ({ kind, indicators }: EntityRatingProps) => (
  <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft md:p-7">
    <div className="flex flex-wrap items-center gap-3">
      <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-poppins text-xs font-semibold uppercase tracking-wide text-accent-deep">
        {KIND_LABEL[kind]}
      </span>
      <p className="text-sm font-medium text-foreground/70">Valoración rápida de la entidad</p>
    </div>

    <ul className="mt-5 space-y-4">
      {indicators.map((ind) => (
        <li key={ind.label} className="flex gap-3">
          <span aria-hidden className={`mt-1.5 block h-3 w-3 shrink-0 rounded-full ${DOT[ind.level]}`} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-poppins text-sm font-semibold text-foreground">{ind.label}</span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE[ind.level]}`}>
                {ind.levelLabel}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ind.note}</p>
          </div>
        </li>
      ))}
    </ul>

    <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
      Valoración orientativa del equipo de Calma según el perfil de la entidad. No es asesoramiento
      jurídico: cada caso se estudia de forma individual y gratuita.
    </p>
  </div>
);

export default EntityRating;