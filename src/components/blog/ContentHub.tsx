import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export type HubItem = { title: string; to?: string };
export type HubGroup = { angle: string; description?: string; items: HubItem[] };

const ContentHub: React.FC<{ groups: HubGroup[] }> = ({ groups }) => (
  <div className="space-y-8">
    {groups.map((group) => (
      <section key={group.angle} className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft md:p-8">
        <header className="mb-5">
          <h3 className="font-poppins text-lg font-semibold tracking-tight text-foreground md:text-xl">
            {group.angle}
          </h3>
          {group.description && (
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{group.description}</p>
          )}
        </header>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {group.items.map((item) => {
            const inner = (
              <span className="flex items-start justify-between gap-3 rounded-2xl border border-border bg-background/40 px-4 py-3 text-sm leading-snug text-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft/40">
                <span>{item.title}</span>
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              </span>
            );
            return (
              <li key={item.title}>
                {item.to ? (
                  <Link to={item.to} className="block">
                    {inner}
                  </Link>
                ) : (
                  <span className="block cursor-default opacity-90">{inner}</span>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    ))}
  </div>
);

export default ContentHub;