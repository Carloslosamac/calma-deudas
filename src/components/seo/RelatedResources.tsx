import { Link } from "react-router-dom";
import { ArrowRight, FileText, Sparkles, Trophy } from "lucide-react";
import type { CrossLinkGroup, ResourceKind } from "@/data/seo/internalLinks";

const KIND_ICON: Record<ResourceKind, typeof FileText> = {
  tool: Sparkles,
  caso: Trophy,
  post: FileText,
};

type Props = {
  groups: CrossLinkGroup[];
  /** Título de la sección. */
  heading?: string;
  className?: string;
};

/**
 * Bloque de enlazado interno cruzado (posts ↔ casos ↔ herramientas).
 * Recibe grupos ya resueltos por intención desde `buildCrossLinks`.
 */
const RelatedResources = ({
  groups,
  heading = "Da el siguiente paso",
  className = "",
}: Props) => {
  if (!groups.length) return null;

  return (
    <section
      aria-label="Contenido relacionado"
      className={`mx-auto mt-20 max-w-6xl border-t border-border pt-14 ${className}`}
    >
      <h2 className="mb-8 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {heading}
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
              {group.title}
            </p>
            <ul className="space-y-3">
              {group.links.map((link) => {
                const Icon = KIND_ICON[link.kind];
                return (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group flex gap-3 rounded-2xl border border-border bg-surface p-4 transition-shadow hover:shadow-medium"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" />
                      <span className="min-w-0">
                        <span className="block font-poppins text-sm font-semibold leading-snug text-foreground group-hover:text-accent-deep">
                          {link.label}
                        </span>
                        {link.description && (
                          <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-muted-foreground">
                            {link.description}
                          </span>
                        )}
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-deep">
                          Ver más
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedResources;