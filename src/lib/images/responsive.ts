import { optimizedImage } from "@/data/blog/dbPosts";

const WIDTHS = [480, 768, 1200];

/**
 * Variantes AVIF/WebP generadas en build por vite-imagetools para las
 * imágenes locales del blog. Solo se resuelven URLs (no bytes en el bundle),
 * así que el coste en runtime es nulo.
 */
const eager = { eager: true, import: "default" } as const;

const plain = import.meta.glob("/src/assets/blog-*.jpg", eager) as Record<string, string>;
const avifSets = import.meta.glob(
  "/src/assets/blog-*.jpg?w=480;768;1200&format=avif&as=srcset",
  eager
) as Record<string, string>;
const webpSets = import.meta.glob(
  "/src/assets/blog-*.jpg?w=480;768;1200&format=webp&as=srcset",
  eager
) as Record<string, string>;

const QUERY_AVIF = "?w=480;768;1200&format=avif&as=srcset";
const QUERY_WEBP = "?w=480;768;1200&format=webp&as=srcset";

const byUrl = new Map<string, { avif?: string; webp?: string }>();
for (const [key, url] of Object.entries(plain)) {
  byUrl.set(url, {
    avif: avifSets[`${key}${QUERY_AVIF}`],
    webp: webpSets[`${key}${QUERY_WEBP}`],
  });
}

export type ImageSources = {
  fallback: string;
  srcSet?: string;
  avif?: string;
  webp?: string;
};

export const imageSources = (src?: string): ImageSources => {
  if (!src) return { fallback: "" };

  // Storage: srcset vía transformador de imágenes (WebP/AVIF según Accept).
  if (src.includes("/storage/v1/object/sign/")) {
    return {
      fallback: optimizedImage(src, 1200),
      srcSet: WIDTHS.map((w) => `${optimizedImage(src, w)} ${w}w`).join(", "),
    };
  }

  const local = byUrl.get(src);
  if (local) return { fallback: src, avif: local.avif, webp: local.webp };

  return { fallback: src };
};