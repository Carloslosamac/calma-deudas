import { useLocation } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { guiasByPath, guiasByCluster } from "@/data/seo/guias";
import { getCluster } from "@/data/seo/architecture";
import { getGuiaContent } from "@/data/seo/content/guiaContent";
import { buildBreadcrumb, buildLegalService, buildFaq } from "@/lib/seo/structuredData";
import { buildCrossLinks } from "@/data/seo/internalLinks";
import RelatedResources from "@/components/seo/RelatedResources";

/** Guía de educación financiera: /guias/<slug>. */
const GuiaPage = () => {
  const { pathname } = useLocation();
  const guia = guiasByPath[pathname.replace(/\/$/, "")];

  if (!guia) return <NotFound />;

  const cluster = getCluster(guia.cluster);
  const canonical = `${guia.path}`;
  const content = getGuiaContent(guia.cluster, guia.slug);

  const breadcrumbs = [
    { name: "Inicio", to: "/" },
    ...(cluster ? [{ name: cluster.label, to: `/${cluster.slug}` }] : []),
    { name: guia.label },
  ];

  const related: RelatedLink[] = guiasByCluster(guia.cluster)
    .filter((g) => g.slug !== guia.slug)
    .map((g) => ({ label: g.label, to: g.path }));

  const crossLinks = buildCrossLinks({ topic: "consejos", origin: "none" });

  const structuredData = [
    buildBreadcrumb(breadcrumbs.map((b) => ({ name: b.name, url: b.to ?? canonical }))),
    buildLegalService(),
    ...(content?.faq?.length
      ? [buildFaq(content.faq.map((f) => ({ question: f.q, answer: f.plain })))]
      : []),
  ];

  return (
    <SeoPageScaffold
      template="guia"
      h1={guia.h1}
      eyebrow={cluster?.label}
      intro={content?.intro}
      seoTitle={guia.seoTitle}
      metaDescription={guia.metaDescription}
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
      sections={content?.sections}
      faq={content?.faq?.map((f) => ({ q: f.q, a: f.a }))}
    >
      <RelatedResources groups={crossLinks} />
    </SeoPageScaffold>
  );
};

export default GuiaPage;