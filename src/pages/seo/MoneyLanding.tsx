import { useLocation } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { moneyPagesByPath, moneyPagesByCluster } from "@/data/seo/moneyPages";
import { getCluster } from "@/data/seo/architecture";
import { getMoneyContent } from "@/data/seo/content";
import { buildBreadcrumb, buildLegalService, buildFaq } from "@/lib/seo/structuredData";
import { absoluteUrl } from "@/lib/seo/config";

/** Resuelve una money page a partir del pathname y la renderiza. */
const MoneyLanding = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, "");
  const page = moneyPagesByPath[path];

  if (!page) return <NotFound />;

  const cluster = getCluster(page.cluster);
  const canonical = `${page.path}/`;
  const content = getMoneyContent(page.path);

  const breadcrumbs = [
    { name: "Inicio", to: "/" },
    ...(cluster && cluster.slug !== page.path.slice(1)
      ? [{ name: cluster.label, to: `/${cluster.slug}` }]
      : []),
    { name: page.label },
  ];

  // Enlazado interno: hermanos del cluster + clusters relacionados.
  const siblings = moneyPagesByCluster(page.cluster).filter((p) => p.path !== page.path);
  const relatedClusters = (cluster?.related ?? [])
    .map((slug) => getCluster(slug))
    .filter(Boolean);
  const related: RelatedLink[] = [
    ...siblings.map((p) => ({ label: p.h1, to: p.path })),
    ...relatedClusters.map((c) => ({ label: c!.label, to: `/${c!.slug}` })),
  ];

  const structuredData = [
    buildBreadcrumb(
      breadcrumbs.map((b) => ({ name: b.name, url: b.to ?? canonical })),
    ),
    buildLegalService(),
    ...(content?.faq?.length
      ? [buildFaq(content.faq.map((f) => ({ question: f.q, answer: f.plain })))]
      : []),
  ];

  return (
    <SeoPageScaffold
      template={page.template}
      h1={page.h1}
      eyebrow={cluster?.label}
      intro={content?.intro ?? page.metaDescription}
      seoTitle={page.seoTitle}
      metaDescription={page.metaDescription}
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
      sections={content?.sections}
      faq={content?.faq?.map((f) => ({ q: f.q, a: f.a }))}
      needsLegalReview={
        content ? !content.reviewed : page.metaDescription.includes("revisión legal")
      }
    />
  );
};

export default MoneyLanding;