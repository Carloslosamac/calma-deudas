import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; to?: string };

const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Migas de pan" className="text-sm text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <li key={item.name} className="flex items-center gap-1.5">
            {item.to && !last ? (
              <Link to={item.to} className="hover:text-foreground transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className={last ? "text-foreground" : undefined} aria-current={last ? "page" : undefined}>
                {item.name}
              </span>
            )}
            {!last && <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;