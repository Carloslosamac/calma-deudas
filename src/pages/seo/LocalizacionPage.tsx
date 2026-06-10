import { useParams } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { getLocalizacion, localizaciones } from "@/data/seo/localizaciones";
import { getLocalizacionContent } from "@/data/seo/content/localizacionContent";
import { buildBreadcrumb, buildLocalLegalService, buildFaq } from "@/lib/seo/structuredData";

/** Landing local de abogados LSO: /abogados-ley-segunda-oportunidad/<ciudad>. */
const LocalizacionPage = () => {
  const { ciudad } = useParams();
  const city = getLocalizacion(ciudad);

  if (!city) return <NotFound />;

  const canonical = `${city.path}/`;
  const content = getLocalizacionContent(city);

  const seoTitle = `Abogados Ley Segunda Oportunidad en ${city.name} | Calma`;
  const metaVariants = [
    `Abogados especialistas en la Ley de Segunda Oportunidad en ${city.name} (${city.provincia}). Cancela tus deudas legalmente. Diagnóstico gratis y sin compromiso.`,
    `¿Deudas en ${city.name}? Abogados de la Ley de Segunda Oportunidad para cancelarlas legalmente en toda la provincia de ${city.provincia}. Primer diagnóstico gratuito.`,
    `Cancela tus deudas en ${city.name} con la Ley de Segunda Oportunidad. Abogados especialistas para ${city.provincia}, atención online y diagnóstico gratis.`,
  ];
  let h = 0;
  for (let i = 0; i < city.slug.length; i++) h = (h * 31 + city.slug.charCodeAt(i)) >>> 0;
  const metaDescription = metaVariants[h % metaVariants.length];

  const breadcrumbs = [
    { name: "Inicio", to: "/" },
    { name: "Abogados Ley de Segunda Oportunidad", to: "/abogados-ley-segunda-oportunidad" },
    { name: city.name },
  ];

  // Enlazado: hub local + otras ciudades cercanas (resto del cluster).
  const related: RelatedLink[] = [
    { label: "Abogados de la Ley de Segunda Oportunidad", to: "/abogados-ley-segunda-oportunidad" },
    ...localizaciones
      .filter((l) => l.slug !== city.slug)
      .slice(0, 9)
      .map((l) => ({ label: `Abogados LSO en ${l.name}`, to: l.path })),
  ];

  const structuredData = [
    buildBreadcrumb(breadcrumbs.map((b) => ({ name: b.name, url: b.to ?? canonical }))),
    buildLocalLegalService(city),
    buildFaq(content.faq.map((f) => ({ question: f.q, answer: f.plain }))),
  ];

  return (
    <SeoPageScaffold
      template="money"
      h1={`Abogados de la Ley de Segunda Oportunidad en ${city.name}`}
      eyebrow={`${city.provincia} · ${city.comunidad}`}
      intro={content.intro}
      seoTitle={seoTitle}
      metaDescription={metaDescription}
      canonical={canonical}
      breadcrumbs={breadcrumbs}
      structuredData={structuredData}
      related={related}
      sections={content.sections}
      faq={content.faq.map((f) => ({ q: f.q, a: f.a }))}
    />
  );
};

export default LocalizacionPage;