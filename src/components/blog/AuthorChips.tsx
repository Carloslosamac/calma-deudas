import { getAuthors } from "@/data/team";

/**
 * Chips de autoría: foto + nombre y apellidos de cada abogado que firma el
 * artículo (1-3). Si no hay autores del equipo, hace fallback a un texto.
 */
const AuthorChips = ({
  authorIds,
  fallback = "Equipo legal Calma",
  size = "md",
}: {
  authorIds?: string[];
  fallback?: string;
  size?: "sm" | "md";
}) => {
  const authors = getAuthors(authorIds);

  if (authors.length === 0) {
    return <span className="text-sm text-muted-foreground">{fallback}</span>;
  }

  const photo = size === "sm" ? "h-6 w-6" : "h-8 w-8";

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="shrink-0 text-sm text-muted-foreground">Por</span>
      {authors.map((a) => (
        <span
          key={a.id}
          className="inline-flex min-w-0 items-center gap-2 rounded-full border border-border bg-surface-elevated py-1 pl-1 pr-2 shadow-soft sm:pr-3"
          title={a.role}
        >
          <img
            src={a.photo}
            alt={`${a.name}, ${a.role}`}
            loading="lazy"
            width={32}
            height={32}
            className={`${photo} rounded-full object-cover`}
          />
          <span className="truncate text-xs font-medium text-foreground sm:text-sm">
            {a.name}
          </span>
        </span>
      ))}
    </div>
  );
};

export default AuthorChips;
