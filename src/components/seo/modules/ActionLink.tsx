import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export type ActionLinkProps = {
  to: string;
  children: ReactNode;
};

/** Caja-enlace con flecha para derivar a la página de acción/siguiente paso. */
const ActionLink = ({ to, children }: ActionLinkProps) => (
  <Link
    to={to}
    className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface-elevated p-5 transition-colors hover:border-accent/50"
  >
    <span className="text-base font-medium text-foreground">{children}</span>
    <ArrowRight
      className="h-5 w-5 shrink-0 text-accent-deep transition-transform group-hover:translate-x-1"
      aria-hidden
    />
  </Link>
);

export default ActionLink;