import { CalendarDays, Clock3, ShieldCheck } from "lucide-react";
import AuthorChips from "@/components/blog/AuthorChips";
import { TEAM } from "@/data/team";

const formatDate = (iso?: string): string => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

export type AuthorBylineProps = {
  authorIds?: string[];
  authorFallback?: string;
  /** Id del abogado que ha revisado el contenido. Solo revisiones REALES. */
  reviewer?: string;
  /** Fecha de esa revisión editorial. */
  reviewedAt?: string;
  /** Fecha de publicación (texto ya formateado o ISO). */
  publishedLabel?: string;
  /** Fecha real de última actualización de contenido (ISO). */
  contentUpdatedAt?: string;
  readTime?: string;
};

/**
 * Firma editorial: autor, revisor jurídico (solo si hay revisión real),
 * fecha de publicación y fecha de actualización de contenido.
 * Los bloques sin dato simplemente no se muestran.
 */
const AuthorByline = ({
  authorIds,
  authorFallback = "Equipo legal Calma",
  reviewer,
  reviewedAt,
  publishedLabel,
  contentUpdatedAt,
  readTime,
}: AuthorBylineProps) => {
  const reviewerMember = reviewer ? TEAM[reviewer] : undefined;
  const updated = formatDate(contentUpdatedAt);

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <AuthorChips authorIds={authorIds} fallback={authorFallback} />

      {reviewerMember && (
        <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-accent-deep" aria-hidden />
          <span>
            Revisado por{" "}
            <span className="font-medium text-foreground">{reviewerMember.name}</span>
            {reviewerMember.credential ? ` · ${reviewerMember.credential}` : ""}
            {reviewedAt ? ` · ${formatDate(reviewedAt)}` : ""}
          </span>
        </p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
        {publishedLabel && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden />
            Publicado el {publishedLabel}
          </span>
        )}
        {updated && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden />
            Actualizado el {updated}
          </span>
        )}
        {readTime && (
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4" aria-hidden />
            {readTime}
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthorByline;
