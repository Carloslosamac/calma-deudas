import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import type { PropsWithChildren } from "react";

export const InternalLink = ({
  to,
  children,
}: PropsWithChildren<{ to: string }>) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

export const ExtLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-accent-deep underline-offset-4 hover:underline"
  >
    {children}
    <ExternalLink className="ml-0.5 inline-block h-3 w-3 align-baseline" />
  </a>
);