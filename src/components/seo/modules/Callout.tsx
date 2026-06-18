import type { ReactNode } from "react";
import { Info, AlertTriangle } from "lucide-react";

export type CalloutProps = {
  /** título corto opcional */
  title?: string;
  children: ReactNode;
  variant?: "info" | "warning";
};

const STYLES = {
  info: {
    wrap: "border-accent/30 bg-accent-soft/30",
    icon: "text-accent-deep",
    Icon: Info,
  },
  warning: {
    wrap: "border-orange-deep/30 bg-orange-soft/40",
    icon: "text-orange-deep",
    Icon: AlertTriangle,
  },
} as const;

/** Nota destacada (info o aviso). Útil para el matiz de bienes pagados → reunificar. */
const Callout = ({ title, children, variant = "info" }: CalloutProps) => {
  const s = STYLES[variant];
  const Icon = s.Icon;
  return (
    <div className={`flex gap-4 rounded-3xl border p-5 md:p-6 ${s.wrap}`}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${s.icon}`} aria-hidden />
      <div className="space-y-2 text-sm leading-relaxed text-foreground/85">
        {title && <p className="font-poppins font-semibold text-foreground">{title}</p>}
        {children}
      </div>
    </div>
  );
};

export const InfoCallout = (props: Omit<CalloutProps, "variant">) => (
  <Callout {...props} variant="info" />
);
export const WarningCallout = (props: Omit<CalloutProps, "variant">) => (
  <Callout {...props} variant="warning" />
);

export default Callout;