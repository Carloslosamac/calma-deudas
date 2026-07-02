import { useParams } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { getEntity, entitiesByCluster } from "@/data/seo/entities";
import { getCluster } from "@/data/seo/architecture";
import { moneyPagesByPath } from "@/data/seo/moneyPages";
import { getEntityContent } from "@/data/seo/content/entityContent";
import { getEntityProfile } from "@/data/seo/content/entityProfiles";
import { buildBreadcrumb, buildLegalService, buildFaq } from "@/lib/seo/structuredData";
import { buildCrossLinks, type LinkTopic } from "@/data/seo/internalLinks";
import RelatedResources from "@/components/seo/RelatedResources";
import type { EntityKind } from "@/data/seo/entities";

/** Emoji + topic de enlazado según el tipo de entidad. */
const KIND_EMOJI: Record<EntityKind, string> = {
  recobro: "🛑",
  microcredito: "💸",
  revolving: "💳",
  banco: "🏦",
  publica: "🧾",
};
const KIND_TOPIC: Record<EntityKind, LinkTopic> = {
  recobro: "embargos",
  microcredito: "microcreditos",
  revolving: "revolving",
  banco: "lso",
  publica: "hacienda",
};

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

  // Título CTR (emoji + keyword + gancho + power word), sin branding,
  // length-aware (<60). Gancho diferenciado por tipo de entidad para ganar
  // clics: las revolving atacan la usura, los bancos/microcréditos la
  // cancelación, el recobro frenar el cobro. Cada patrón cae a una variante
  // más corta si supera 60 caracteres visuales.
  const emoji = KIND_EMOJI[entity.kind];
  const TITLE_CANDIDATES: Record<EntityKind, string[]> = {
    revolving: [
      `${emoji} ${entity.name}: reclama la usura y anula la deuda`,
      `${emoji} ${entity.name}: recupera lo pagado de más`,
      `${emoji} ${entity.name}: anula tu deuda revolving`,
    ],
    banco: [
      `${emoji} Deudas con ${entity.name}: cancélalas legalmente`,
      `${emoji} ¿Deudas con ${entity.name}? Cancélalas YA`,
      `${emoji} Cancela tus deudas con ${entity.name}`,
    ],
    microcredito: [
      `${emoji} ¿No puedes pagar ${entity.name}? Cancela la deuda`,
      `${emoji} Cancela tu deuda con ${entity.name} YA`,
      `${emoji} Deudas con ${entity.name}: cómo cancelarlas`,
    ],
    recobro: [
      `${emoji} ¿Te reclama ${entity.name}? Frena el cobro`,
      `${emoji} ${entity.name} te reclama: tus derechos`,
      `${emoji} Deudas con ${entity.name}: cómo actuar`,
    ],
    publica: [
      `${emoji} Deudas con ${entity.name}: aplázalas o cancélalas`,
      `${emoji} ${entity.name}: cómo afrontar la deuda`,
      `${emoji} Deudas con ${entity.name}: tus opciones`,
    ],
  };
  const seoTitle =
    TITLE_CANDIDATES[entity.kind].find((t) => t.length <= 60) ??
    `${emoji} Deudas con ${entity.name}`;

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

  const crossLinks = buildCrossLinks({ topic: KIND_TOPIC[entity.kind], origin: "none" });

  const tldr = `Sí. Si no puedes pagar lo que debes a ${entity.name}, hay salida legal: cancelar la deuda con la Ley de Segunda Oportunidad o reclamar si los intereses son abusivos. El primer paso es un análisis gratuito de tu caso.`;

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
      seoTitle={seoTitle}
      metaDescription={
        profile?.metaDescription ??
        `¿Deuda o reclamación de ${entity.name}? Resolvemos tus miedos reales (embargo, ASNEF, llamadas) y te explicamos con calma cómo cancelarla. Análisis gratis.`
      }
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
      tldr={tldr}
      sections={content?.sections}
      faq={content?.faq?.map((f) => ({ q: f.q, a: f.a }))}
    >
      <RelatedResources groups={crossLinks} />
    </SeoPageScaffold>
  );
};

export default EntityPage;