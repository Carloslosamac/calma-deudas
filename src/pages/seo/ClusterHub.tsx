import { useParams } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { getCluster } from "@/data/seo/architecture";
import { moneyPagesByCluster } from "@/data/seo/moneyPages";
import { entitiesByCluster } from "@/data/seo/entities";
import { comparativasByCluster } from "@/data/seo/comparativas";
import { guiasByCluster } from "@/data/seo/guias";
import { getHubContent } from "@/data/seo/content/hubContent";
import { buildBreadcrumb, buildLegalService, buildFaq } from "@/lib/seo/structuredData";

/** Índice de un cluster satélite (hub de sección). */
const ClusterHub = () => {
  const { cluster: clusterSlug } = useParams();
  const cluster = getCluster(clusterSlug);

  if (!cluster) return <NotFound />;

  const canonical = `/${cluster.slug}/`;
  const breadcrumbs = [{ name: "Inicio", to: "/" }, { name: cluster.label }];
  const content = getHubContent(cluster.slug);

  const related: RelatedLink[] = [
    ...moneyPagesByCluster(cluster.slug).map((p) => ({ label: p.h1, to: p.path })),
    ...comparativasByCluster(cluster.slug).map((c) => ({ label: c.label, to: c.path })),
    ...guiasByCluster(cluster.slug).map((g) => ({ label: g.label, to: g.path })),
    ...entitiesByCluster(cluster.slug).map((e) => ({
      label: e.name,
      to: `/${e.cluster}/${e.slug}`,
    })),
    ...(cluster.related ?? []).map((slug) => {
      const c = getCluster(slug);
      return c ? { label: c.label, to: `/${c.slug}` } : null;
    }).filter(Boolean) as RelatedLink[],
  ];

  const structuredData = [
    buildBreadcrumb([
      { name: "Inicio", url: "/" },
      { name: cluster.label, url: canonical },
    ]),
    buildLegalService(),
    ...(content?.faq?.length
      ? [buildFaq(content.faq.map((f) => ({ question: f.q, answer: f.plain })))]
      : []),
  ];

  const intro = content?.intro ?? cluster.description;
  const metaDescription = content?.metaDescription ?? cluster.description;
  const seoTitle = content?.seoTitle ?? `${cluster.title} | Calma`;

  return (
    <SeoPageScaffold
      template="hub"
      h1={cluster.title}
      eyebrow="Sección"
      intro={intro}
      seoTitle={seoTitle}
      metaDescription={metaDescription}
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
      sections={content?.sections}
      faq={content?.faq?.map((f) => ({ q: f.q, a: f.a }))}
    />
  );
};

export default ClusterHub;