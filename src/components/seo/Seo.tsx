import { Helmet } from "react-helmet-async";
import {
  SITE_LANG,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  TWITTER_CREATOR,
  TWITTER_SITE,
  absoluteUrl,
} from "@/lib/seo/config";
import { normalizeStructuredData } from "@/lib/seo/structuredData";

type StructuredData = Record<string, unknown>;

export type SeoProps = {
  /** Título de la pestaña. Se le añade "| Calma" salvo que `titleTemplate` sea false. */
  title: string;
  description: string;
  /** Path relativo (ej. "/blog") o URL absoluta. */
  canonical: string;
  ogType?: "website" | "article";
  keywords?: string[];
  robots?: string; // ej. "noindex,nofollow"
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  structuredData?: StructuredData[];
  /** Si false, no añade " | Calma" al título. */
  appendSiteName?: boolean;
};

const Seo = ({
  title,
  description,
  canonical,
  ogType = "website",
  keywords,
  robots = "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
  publishedAt,
  updatedAt,
  author,
  structuredData,
  appendSiteName = true,
}: SeoProps) => {
  // Si NO estamos en el dominio canónico, forzamos noindex para evitar
  // duplicado con id-preview-*.lovable.app y calma-deudas.lovable.app.
  const isCanonicalHost =
    typeof window === "undefined" ||
    window.location.hostname.endsWith("mi-calma.es");
  const effectiveRobots = isCanonicalHost ? robots : "noindex,nofollow";

  const fullTitle =
    appendSiteName && !title.toLowerCase().includes(SITE_NAME.toLowerCase())
      ? `${title} | ${SITE_NAME}`
      : title;
  const canonicalUrl = absoluteUrl(canonical);

  return (
    <Helmet prioritizeSeoTags>
      <html lang={SITE_LANG} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords?.length ? (
        <meta name="keywords" content={keywords.join(", ")} />
      ) : null}
      <meta name="robots" content={effectiveRobots} />
      <meta name="googlebot" content={effectiveRobots} />
      {author ? <meta name="author" content={author} /> : null}

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="es-ES" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={SITE_LOCALE} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      {publishedAt ? (
        <meta property="article:published_time" content={publishedAt} />
      ) : null}
      {updatedAt ? (
        <meta property="article:modified_time" content={updatedAt} />
      ) : null}

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={TWITTER_SITE} />
      <meta name="twitter:creator" content={TWITTER_CREATOR} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      <meta name="theme-color" content="#0a3a23" />

      {structuredData?.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(normalizeStructuredData(data))}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
