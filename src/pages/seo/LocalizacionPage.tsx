import { useParams } from "react-router-dom";
import SeoPageScaffold, { type RelatedLink } from "@/components/seo/SeoPageScaffold";
import NotFound from "@/pages/NotFound";
import { getLocalizacion, localizaciones } from "@/data/seo/localizaciones";
import { getLocalizacionContent } from "@/data/seo/content/localizacionContent";
import { buildBreadcrumb, buildLegalService, buildFaq } from "@/lib/seo/structuredData";

/** Landing local de abogados LSO: /abogados-ley-segunda-oportunidad/<ciudad>. */
const LocalizacionPage = () => {
  const { ciudad } = useParams();
  const city = getLocalizacion(ciudad);

  if (!city) return <NotFound />;

  const canonical = `${city.path}/`;
  const content = getLocalizacionContent(city);

  const seoTitle = `Abogados Ley Segunda Oportunidad en ${city.name} | Calma`;
  const metaDescription = `Abogados especialistas en la Ley de Segunda Oportunidad en ${city.name}. Cancela tus deudas legalmente. Diagnóstico gratis y sin compromiso.`;

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
    buildLegalService(),
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