import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { scrollToForm } from "@/lib/seo/scrollToForm";
import { trackEvent } from "@/lib/tracking";

export type BridgeLink = { label: string; to: string };

export type SolutionBridgeProps = {
  /** Titular del puente. Debe leerse como continuación del contenido. */
  title: string;
  /** 1-2 frases que conectan la duda resuelta con el servicio. */
  description: string;
  /** Texto del botón. */
  ctaLabel?: string;
  /** Destino. Por defecto el formulario de diagnóstico. */
  href?: string;
  /** 1-2 enlaces internos relacionados. */
  links?: BridgeLink[];
  /** Posición dentro de la página (para medición y estilo). */
  placement?: "inline" | "closing";
  /** Tipo de página (blog, banco, revolving, recobro, microcredito…). */
  pageType?: string;
  /** Identificador del CTA para la analítica. */
  ctaId?: string;
  className?: string;
};

export const DEFAULT_BRIDGE_CTA = "Comprueba si puedes cancelar tus deudas";

/**
 * Puente comercial: conecta el contenido informativo con el servicio de
 * cancelación de deudas. Tono editorial (mismo lenguaje visual que los
 * callouts del kit SEO), nunca banner publicitario.
 *
 * Es el ÚNICO sistema de CTA de contenido: `InlineCTA` del blog y el CTA
 * inline de las fichas de entidad se apoyan en este componente.
 */
const SolutionBridge = ({
  title,
  description,
  ctaLabel = DEFAULT_BRIDGE_CTA,
  href = "/#hero-form",
  links,
  placement = "inline",
  pageType,
  ctaId = "solution-bridge",
  className,
}: SolutionBridgeProps) => {
  const isForm = href.includes("#hero-form");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent("cta_click", {
      pageType,
      ctaId,
      ctaLabel,
      placement,
      targetUrl: href,
    });
    if (isForm) {
      e.preventDefault();
      scrollToForm();
    }
  };

  return (
    <aside
      data-solution-bridge
      data-placement={placement}
      className={`my-10 min-w-0 overflow-hidden rounded-3xl border border-accent/30 bg-accent-soft/40 p-6 shadow-soft md:p-8 ${className ?? ""}`}
    >
      <h3 className="text-balance font-poppins text-xl font-semibold leading-snug text-foreground md:text-2xl">
        {title}
      </h3>
      <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
        {description}
      </p>

      <a
        href={href}
        onClick={handleClick}
        className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-center font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-glow sm:w-auto"
      >
        <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
        <span className="min-w-0">{ctaLabel}</span>
      </a>

      {links && links.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2 border-t border-accent/20 pt-4 sm:flex-row sm:flex-wrap sm:gap-x-6">
          {links.slice(0, 2).map((l) => (
            <li key={l.to} className="min-w-0">
              <Link
                to={l.to}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-accent-deep underline-offset-4 hover:underline"
              >
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
                <span className="min-w-0">{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default SolutionBridge;
