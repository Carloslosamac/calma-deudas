import { useParams } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { getComparativa } from "@/data/seo/comparativas";
import { getCluster } from "@/data/seo/architecture";
import { moneyPagesByCluster } from "@/data/seo/moneyPages";
import { getComparativaContent } from "@/data/seo/content/comparativaContent";
import { buildBreadcrumb, buildLegalService, buildFaq } from "@/lib/seo/structuredData";

/** Página comparativa: /<cluster>/<slug>. */
const ComparativaPage = () => {
  const { cluster: clusterSlug, slug } = useParams();
  const comparativa = getComparativa(clusterSlug, slug);

  if (!comparativa) return <NotFound />;

  const cluster = getCluster(comparativa.cluster);
  const canonical = `${comparativa.path}`;
  const content = getComparativaContent(comparativa.cluster, comparativa.slug);

  const breadcrumbs = [
    { name: "Inicio", to: "/" },
    ...(cluster ? [{ name: cluster.label, to: `/${cluster.slug}` }] : []),
    { name: comparativa.label },
  ];

  const related: RelatedLink[] = [
    ...moneyPagesByCluster(comparativa.cluster).map((p) => ({ label: p.h1, to: p.path })),
    ...(cluster?.related ?? [])
      .map((s) => {
        const c = getCluster(s);
        return c ? { label: c.label, to: `/${c.slug}` } : null;
      })
      .filter(Boolean) as RelatedLink[],
  ];

  const structuredData = [
    buildBreadcrumb(breadcrumbs.map((b) => ({ name: b.name, url: b.to ?? canonical }))),
    buildLegalService(),
    ...(content?.faq?.length
      ? [buildFaq(content.faq.map((f) => ({ question: f.q, answer: f.plain })))]
      : []),
  ];

  return (
    <SeoPageScaffold
      template="comparativa"
      h1={comparativa.h1}
      eyebrow={cluster?.label}
      intro={content?.intro}
      seoTitle={comparativa.seoTitle}
      metaDescription={comparativa.metaDescription}
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
      sections={content?.sections}
      faq={content?.faq?.map((f) => ({ q: f.q, a: f.a }))}
    />
  );
};

export default ComparativaPage;