import { useParams } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { getEntity, entitiesByCluster } from "@/data/seo/entities";
import { getCluster } from "@/data/seo/architecture";
import { moneyPagesByPath } from "@/data/seo/moneyPages";
import { buildBreadcrumb, buildLegalService } from "@/lib/seo/structuredData";

/** Ficha de entidad: /<cluster>/<slug> (banco, financiera, recobro…). */
const EntityPage = () => {
  const { cluster: clusterSlug, slug } = useParams();
  const entity = getEntity(clusterSlug, slug);

  if (!entity) return <NotFound />;

  const cluster = getCluster(entity.cluster);
  const solution = moneyPagesByPath[entity.solutionPath];
  const canonical = `/${entity.cluster}/${entity.slug}/`;

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
  ];

  return (
    <SeoPageScaffold
      template="entidad"
      h1={`Deudas con ${entity.name}: qué hacer`}
      eyebrow={cluster?.label}
      intro={`Tienes una deuda o reclamación de ${entity.name}. Te explicamos tus derechos y opciones. [Contenido pendiente]`}
      seoTitle={`Deudas con ${entity.name}: derechos y soluciones | Calma`}
      metaDescription={`Qué hacer ante una deuda o reclamación de ${entity.name}: tus derechos, cómo verificar la deuda y tus opciones. [Placeholder]`}
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
    />
  );
};

export default EntityPage;