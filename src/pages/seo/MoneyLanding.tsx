import { useLocation } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import MoneyJourney from "@/components/seo/MoneyJourney";
import NotFound from "@/pages/NotFound";
import { moneyPagesByPath, moneyPagesByCluster } from "@/data/seo/moneyPages";
import { getCluster } from "@/data/seo/architecture";
import { getMoneyContent } from "@/data/seo/content";
import { toolsForCluster } from "@/data/seo/tools";
import {
  buildBreadcrumb,
  buildLegalService,
  buildFaq,
  buildOrganization,
  buildWebPage,
  buildService,
  buildQAPage,
} from "@/lib/seo/structuredData";
import { absoluteUrl } from "@/lib/seo/config";

/** Resuelve una money page a partir del pathname y la renderiza. */
const MoneyLanding = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/$/, "");
  const page = moneyPagesByPath[path];

  if (!page) return <NotFound />;

  const cluster = getCluster(page.cluster);
  const canonical = `${page.path}`;
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

  // Herramientas relevantes para el bloque "Calcula tu caso".
  const tools = toolsForCluster(page.cluster);

  const structuredData = [
    buildWebPage({
      url: canonical,
      name: page.seoTitle,
      description: page.metaDescription,
      hasBreadcrumb: true,
      ...(content?.directAnswer
        ? { speakableSelectors: [".geo-direct-answer__q", ".geo-direct-answer__a"] }
        : {}),
    }),
    buildOrganization(),
    buildBreadcrumb(
      breadcrumbs.map((b) => ({ name: b.name, url: b.to ?? canonical })),
      canonical,
    ),
    buildLegalService(),
    buildService({
      name: page.h1,
      description: page.metaDescription,
      url: canonical,
      serviceType: cluster?.label ?? page.label,
    }),
    ...(content?.directAnswer
      ? [
          buildQAPage({
            question: content.directAnswer.question,
            answer: content.directAnswer.plain,
            url: canonical,
          }),
        ]
      : []),
    ...(content?.faq?.length
      ? [buildFaq(content.faq.map((f) => ({ question: f.q, answer: f.plain })))]
      : []),
  ];

  // Si la money page tiene módulos visuales (hero), se renderiza el journey.
  if (content?.hero) {
    return (
      <MoneyJourney
        content={content}
        h1={page.h1}
        eyebrow={cluster?.label}
        seoTitle={page.seoTitle}
        metaDescription={page.metaDescription}
        canonical={canonical}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
        related={related}
        tools={tools}
      />
    );
  }

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
      tools={tools}
      needsLegalReview={
        content ? !content.reviewed : page.metaDescription.includes("revisión legal")
      }
    />
  );
};

export default MoneyLanding;