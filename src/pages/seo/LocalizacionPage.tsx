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

  const canonical = `${city.path}`;
  const content = getLocalizacionContent(city);

  // Length-aware (sin marca "| Calma": resta caracteres y no aporta CTR) para
  // no truncar en SERP con nombres de ciudad largos. Gancho diferenciador.
  const titleCandidates = [
    `⚖️ Abogados Segunda Oportunidad en ${city.name}: cancela deudas`,
    `Abogados Segunda Oportunidad en ${city.name}: cancela tus deudas`,
    `Abogados Segunda Oportunidad en ${city.name}: cancela deudas`,
    `Abogados Ley Segunda Oportunidad en ${city.name}`,
    `Abogados Segunda Oportunidad en ${city.name}`,
  ];
  const seoTitle =
    titleCandidates.find((t) => t.length <= 60) ?? titleCandidates[2];
  const metaVariants = [
    `Abogados especialistas en la Ley de Segunda Oportunidad en ${city.name} (${city.provincia}). Cancela tus deudas legalmente. Diagnóstico gratis y sin compromiso.`,
    `¿Deudas en ${city.name}? Abogados de la Ley de Segunda Oportunidad para cancelarlas legalmente en toda la provincia de ${city.provincia}. Primer diagnóstico gratuito.`,
    `Cancela tus deudas en ${city.name} con la Ley de Segunda Oportunidad. Abogados especialistas para ${city.provincia}, atención online y diagnóstico gratis.`,
  ];
  let h = 0;
  for (let i = 0; i < city.slug.length; i++) h = (h * 31 + city.slug.charCodeAt(i)) >>> 0;
  const chosen = metaVariants[h % metaVariants.length];
  const metaDescription =
    chosen.length <= 160
      ? chosen
      : `¿Deudas en ${city.name}? Abogados de la Ley de Segunda Oportunidad para cancelarlas legalmente. Diagnóstico gratuito y sin compromiso.`;

  const breadcrumbs = [
    { name: "Inicio", to: "/" },
    { name: "Abogados Ley de Segunda Oportunidad", to: "/abogados-ley-segunda-oportunidad" },
    { name: city.name },
  ];

  // Enlazado: hub local + ciudades del cluster, priorizando las que ya reciben
  // impresiones en Search Console para concentrar autoridad interna hacia ellas
  // (de página 5-9 a página 1) sin canibalizar (cada ciudad es intención local
  // distinta y todas apuntan al hub maestro).
  const TRACTION_CITIES = [
    "granada",
    "a-coruna",
    "barcelona",
    "sevilla",
    "almeria",
    "murcia",
    "vigo",
  ];
  const otherCities = localizaciones.filter((l) => l.slug !== city.slug);
  const prioritized = [
    ...otherCities.filter((l) => TRACTION_CITIES.includes(l.slug)),
    ...otherCities.filter((l) => !TRACTION_CITIES.includes(l.slug)),
  ];
  const related: RelatedLink[] = [
    { label: "Abogados de la Ley de Segunda Oportunidad", to: "/abogados-ley-segunda-oportunidad" },
    ...prioritized
      .slice(0, 9)
      .map((l) => ({ label: `Abogados LSO en ${l.name}`, to: l.path })),
  ];

  // Respuesta directa (AEO): resume la propuesta local en 1-2 frases para
  // featured snippets y respuestas de IA.
  const tldr = (
    <p>
      En <strong>{city.name}</strong> ({city.provincia}) puedes cancelar tus deudas con la{" "}
      <strong>Ley de Segunda Oportunidad</strong> si estás en situación de insolvencia y actúas de buena fe.
      El procedimiento se tramita en {city.tribunal.toLowerCase()} y puede gestionarse en gran parte online,
      con un primer diagnóstico gratuito y sin compromiso.
    </p>
  );

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
      tldr={tldr}
      related={related}
      sections={content.sections}
      faq={content.faq.map((f) => ({ q: f.q, a: f.a }))}
    />
  );
};

export default LocalizacionPage;