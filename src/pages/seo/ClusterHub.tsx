import { useParams } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { getCluster } from "@/data/seo/architecture";
import { moneyPagesByCluster } from "@/data/seo/moneyPages";
import { entitiesByCluster } from "@/data/seo/entities";
import { buildBreadcrumb, buildLegalService } from "@/lib/seo/structuredData";

/** Índice de un cluster satélite (hub de sección). */
const ClusterHub = () => {
  const { cluster: clusterSlug } = useParams();
  const cluster = getCluster(clusterSlug);

  if (!cluster) return <NotFound />;

  const canonical = `/${cluster.slug}/`;
  const breadcrumbs = [{ name: "Inicio", to: "/" }, { name: cluster.label }];

  const related: RelatedLink[] = [
    ...moneyPagesByCluster(cluster.slug).map((p) => ({ label: p.h1, to: p.path })),
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
  ];

  return (
    <SeoPageScaffold
      template="hub"
      h1={cluster.title}
      eyebrow="Sección"
      intro={cluster.description}
      seoTitle={`${cluster.title} | Calma`}
      metaDescription={cluster.description}
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
    />
  );
};

export default ClusterHub;