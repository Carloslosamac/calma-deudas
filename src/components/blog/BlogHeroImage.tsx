import { imageSources } from "@/lib/images/responsive";

type Props = {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Imagen responsive para heros y miniaturas del blog: AVIF/WebP + srcset,
 * con width/height explícitos para mantener CLS en 0.
 */
const BlogHeroImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 1200px",
}: Props) => {
  const { fallback, srcSet, avif, webp } = imageSources(src);

  const img = (
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={className}
    />
  );

  if (!avif && !webp) return img;

  return (
    <picture>
      {avif ? <source type="image/avif" srcSet={avif} sizes={sizes} /> : null}
      {webp ? <source type="image/webp" srcSet={webp} sizes={sizes} /> : null}
      {img}
    </picture>
  );
};

export default BlogHeroImage;