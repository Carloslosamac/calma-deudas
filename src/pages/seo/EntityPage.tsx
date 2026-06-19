import { useParams } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { getEntity, entitiesByCluster } from "@/data/seo/entities";
import { getCluster } from "@/data/seo/architecture";
import { moneyPagesByPath } from "@/data/seo/moneyPages";
import { getEntityContent } from "@/data/seo/content/entityContent";
import { getEntityProfile } from "@/data/seo/content/entityProfiles";
import { buildBreadcrumb, buildLegalService, buildFaq } from "@/lib/seo/structuredData";

/** Ficha de entidad: /<cluster>/<slug> (banco, financiera, recobro…). */
const EntityPage = () => {
  const { cluster: clusterSlug, slug } = useParams();
  const entity = getEntity(clusterSlug, slug);

  if (!entity) return <NotFound />;

  const cluster = getCluster(entity.cluster);
  const solution = moneyPagesByPath[entity.solutionPath];
  const canonical = `/${entity.cluster}/${entity.slug}`;
  const content = getEntityContent(entity);
  const profile = getEntityProfile(entity.slug);

  // Título length-aware: prioriza la versión rica y, si supera ~60 chars
  // (nombres de entidad largos), cae a una versión corta para no truncar en SERP.
  const richTitle = `Deudas con ${entity.name}: soluciones | Calma`;
  const seoTitle =
    richTitle.length <= 60 ? richTitle : `Deudas con ${entity.name} | Calma`;

  const breadcrumbs = [
    { name: "Inicio", to: "/" },
    ...(cluster ? [{ name: cluster.label, to: `/${cluster.slug}` }] : []),
    { name: entity.name },
  ];

  const related: RelatedLink[] = [
    ...(solution ? [{ label: solution.h1, to: solution.path }] : []),
    ...entitiesByCluster(entity.cluster)
      .filter((e) => e.slug !== entity.slug)
      .slice(0, 5)
      .map((e) => ({ label: e.name, to: `/${e.cluster}/${e.slug}` })),
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

  const intro = content
    ? content.intro
    : `Tienes una deuda o reclamación de ${entity.name}. Te explicamos tus derechos y opciones.`;

  return (
    <SeoPageScaffold
      template="entidad"
      h1={`Deudas con ${entity.name}: respira, tiene solución`}
      eyebrow={cluster?.label}
      intro={intro}
      seoTitle={`Deudas con ${entity.name}: derechos, miedos y soluciones | Calma`}
      metaDescription={
        profile?.metaDescription ??
        `¿Deuda o reclamación de ${entity.name}? Resolvemos tus miedos reales (embargo, ASNEF, llamadas) y te explicamos con calma cómo cancelarla. Análisis gratis.`
      }
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
      sections={content?.sections}
      faq={content?.faq?.map((f) => ({ q: f.q, a: f.a }))}
    />
  );
};

export default EntityPage;