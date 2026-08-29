import SolutionBridge, {
  DEFAULT_BRIDGE_CTA,
  type BridgeLink,
} from "@/components/seo/SolutionBridge";

/**
 * CTA inline del blog. Es un envoltorio fino de `SolutionBridge` para que
 * exista un único sistema de CTA de contenido en todo el sitio.
 */
const InlineCTA = ({
  title,
  description,
  buttonLabel = DEFAULT_BRIDGE_CTA,
  links,
  placement = "inline",
}: {
  title: string;
  description: string;
  buttonLabel?: string;
  links?: BridgeLink[];
  placement?: "inline" | "closing";
}) => (
  <SolutionBridge
    title={title}
    description={description}
    ctaLabel={buttonLabel}
    links={links}
    placement={placement}
    ctaId="inline-cta"
  />
);

export default InlineCTA;
