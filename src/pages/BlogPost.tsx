import { Fragment, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import BlogSidebar, { type TocItem } from "@/components/blog/BlogSidebar";
import FaqList from "@/components/blog/FaqList";
import AnswerSummary from "@/components/blog/AnswerSummary";
import BlogHeroImage from "@/components/blog/BlogHeroImage";
import { blogPosts, isStaticPost, loadStaticPost } from "@/data/blog";
import { fetchGeneratedPostBySlug, fetchGeneratedPostsIndex } from "@/data/blog/dbPosts";
import Seo from "@/components/seo/Seo";
import RelatedResources from "@/components/seo/RelatedResources";
import AuthorByline from "@/components/blog/AuthorByline";
import SolutionBridge from "@/components/seo/SolutionBridge";
import MobileContactBar from "@/components/MobileContactBar";
import { getAuthors, TEAM } from "@/data/team";
import { authorsToName } from "@/data/team";
import { buildCrossLinks, resolvePostTopic } from "@/data/seo/internalLinks";
import {
  buildArticle,
  buildBreadcrumb,
  buildFaq,
  buildHowTo,
} from "@/lib/seo/structuredData";
import { absoluteUrl } from "@/lib/seo/config";

/**
 * Redirecciones 301 de slugs antiguos → nuevos (p. ej. limpiar nombres de
 * competidores del slug). Mantiene el enlace jugo y evita 404.
 */
const SLUG_REDIRECTS: Record<string, string> = {
  "5-maneras-frenar-embargo-misolvencia": "5-maneras-frenar-un-embargo",
};

const BlogPost = () => {
  const { slug } = useParams();
  if (slug && SLUG_REDIRECTS[slug]) {
    return <Navigate to={`/blog/${SLUG_REDIRECTS[slug]}`} replace />;
  }
  const isStatic = isStaticPost(slug);
  const { data: staticPost, isLoading: loadingStatic } = useQuery({
    queryKey: ["static-post", slug],
    queryFn: () => loadStaticPost(slug),
    enabled: isStatic,
    staleTime: Infinity,
  });
  const { data: dbPost, isLoading: loadingDb } = useQuery({
    queryKey: ["generated-post", slug],
    queryFn: () => fetchGeneratedPostBySlug(slug!),
    enabled: !!slug && !isStatic,
  });
  const isLoading = isStatic ? loadingStatic : loadingDb;
  const post = staticPost ?? dbPost ?? undefined;

  // Pool completo (estáticos + generados) para calcular relacionados y
  // enlazado interno por intención. Sin esto los posts auto-generados no
  // se enlazan entre sí ni con la guía madre de su cluster.
  const { data: generatedPosts = [] } = useQuery({
    queryKey: ["generated-posts-index"],
    queryFn: fetchGeneratedPostsIndex,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const allPosts = useMemo(() => {
    const seen = new Set<string>();
    const out: typeof blogPosts = [];
    for (const p of [...blogPosts, ...generatedPosts]) {
      if (seen.has(p.slug)) continue;
      seen.add(p.slug);
      out.push(p);
    }
    return out;
  }, [generatedPosts]);

  const toc: TocItem[] = useMemo(
    () => (post ? post.sections.map((s) => ({ id: s.id, label: s.title })) : []),
    [post]
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const others = allPosts.filter((p) => p.slug !== post.slug);
    // Ordena de más reciente a más antiguo cuando hay fecha (los generados
    // sí la tienen; los estáticos manuales pueden no traerla).
    const byRecency = (a: typeof others[number], b: typeof others[number]) => {
      const at = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bt = b.publishedAt ? Date.parse(b.publishedAt) : 0;
      return bt - at;
    };
    const sameCategory = others.filter((p) => p.category === post.category);
    const rest = others.filter((p) => p.category !== post.category);
    // Prioriza la guía madre (guia-*) al inicio de la sección relacionada:
    // así todo post auto-generado enlaza claramente a su guía madre.
    const guides = sameCategory.filter((p) => p.slug.startsWith("guia-"));
    const nonGuides = sameCategory.filter((p) => !p.slug.startsWith("guia-"));
    return [...guides, ...nonGuides.sort(byRecency), ...rest.sort(byRecency)].slice(0, 6);
  }, [post, allPosts]);

  const crossLinks = useMemo(() => {
    if (!post) return [];
    const topic = resolvePostTopic(post.slug, post.category);
    if (!topic) return [];
    return buildCrossLinks({
      topic,
      origin: "post",
      excludeSlug: post.slug,
      postsPool: allPosts,
    });
  }, [post, allPosts]);

  if (!post) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
            <p className="text-muted-foreground">Cargando artículo…</p>
          </main>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Seo
          title="Artículo no disponible"
          description="Este artículo no existe o ha sido movido. Vuelve al blog de Calma para ver el resto de guías sobre la Ley de Segunda Oportunidad."
          canonical={`/blog/${slug ?? ""}`}
          robots="noindex,follow"
        />
        <Header />
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
          <h1 className="font-poppins text-3xl font-semibold">Artículo no disponible</h1>
          <p className="mt-4 text-muted-foreground">
            No hemos encontrado este artículo. Vuelve al blog para ver el resto de guías.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-semibold text-background hover:bg-foreground/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Puente comercial: si el post no define uno, se genera desde su categoría.
  const bridge = {
    title: post.bridge?.title ?? "¿Y si tu caso ya cumple los requisitos?",
    closingTitle:
      post.bridge?.title ?? "Comprueba en 2 minutos si puedes cancelar tus deudas",
    description:
      post.bridge?.description ??
      "Revisamos tu situación (deuda, ingresos y bienes) y te decimos con claridad qué salida legal encaja: Ley de Segunda Oportunidad, negociación o reclamación. Sin compromiso.",
    ctaLabel: post.bridge?.ctaLabel,
    links: post.bridge?.links,
  };
  // Puente intermedio tras la 2ª sección (o antes de la última si el post es corto).
  const midBridgeIndex = post.sections.length >= 4 ? 2 : -1;

  const structured: Record<string, unknown>[] = [
    // Nombre de autoría: abogados del equipo si están definidos, si no el campo legacy.
    buildBreadcrumb([
      { name: "Inicio", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
    buildArticle({
      title: post.seoTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      url: `/blog/${post.slug}`,
      image: absoluteUrl(post.ogImage ?? post.heroImage),
      author: authorsToName(post.authors, post.author),
      authorPersons: getAuthors(post.authors).map((a) => ({ name: a.name, jobTitle: a.role })),
      reviewer: post.reviewer && TEAM[post.reviewer]
        ? { name: TEAM[post.reviewer].name, jobTitle: TEAM[post.reviewer].role }
        : undefined,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      keywords: post.keywords,
      abstract: post.directAnswer ?? post.tldr,
    }),
  ];
  if (post.faq?.length) structured.push(buildFaq(post.faq));
  if (post.howToSteps?.length)
    structured.push(
      buildHowTo({
        name: post.seoTitle ?? post.title,
        description: post.metaDescription ?? post.excerpt,
        steps: post.howToSteps,
      })
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={post.seoTitle ?? post.title}
        description={post.metaDescription ?? post.excerpt}
        canonical={post.canonicalUrl ?? `/blog/${post.slug}`}
        ogType="article"
        keywords={post.keywords}
        author={authorsToName(post.authors, post.author)}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        robots={post.noindex ? "noindex,follow" : undefined}
        appendSiteName={false}
        structuredData={structured}
      />
      <ReadingProgressBar />
      <Header />

      <main className="px-6 pb-24 pt-32 md:pt-36">
        <article className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </div>

          <header className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              {post.category}
            </p>
            <h1 className="font-poppins text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {post.excerpt}
            </p>
            <AuthorByline
              authorIds={post.authors}
              authorFallback={post.author}
              reviewer={post.reviewer}
              reviewedAt={post.reviewedAt}
              publishedLabel={post.date}
              contentUpdatedAt={post.contentUpdatedAt}
              readTime={post.readTime}
            />
          </header>

          <figure className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] border border-border shadow-large">
            <BlogHeroImage
              src={post.heroImage}
              alt={post.heroAlt}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 1024px"
              className="aspect-[16/9] w-full object-cover"
            />
          </figure>

          <AnswerSummary tldr={post.directAnswer ?? post.tldr} takeaways={post.keyTakeaways} />

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <div className="max-w-none">
                {post.sections.map((section, i) => (
                  <Fragment key={section.id}>
                  {i === midBridgeIndex && bridge && (
                    <SolutionBridge
                      title={bridge.title}
                      description={bridge.description}
                      ctaLabel={bridge.ctaLabel}
                      links={bridge.links}
                      placement="inline"
                      pageType="blog"
                    />
                  )}
                  <section id={section.id} className="scroll-mt-28">
                    <h2 className="mt-14 flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-6 text-base leading-relaxed text-foreground/85 [&_p]:text-base [&_p]:leading-relaxed">
                      {section.html !== undefined ? (
                        <div
                          className="space-y-6 [&_a]:font-medium [&_a]:text-accent-deep [&_a]:underline [&_h3]:mt-8 [&_h3]:font-poppins [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-1 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_blockquote]:italic"
                          dangerouslySetInnerHTML={{ __html: section.html }}
                        />
                      ) : (
                        section.body
                      )}
                    </div>
                  </section>
                  </Fragment>
                ))}

                {bridge && (
                  <SolutionBridge
                    title={bridge.closingTitle}
                    description={bridge.description}
                    ctaLabel={bridge.ctaLabel}
                    links={bridge.links}
                    placement="closing"
                    pageType="blog"
                  />
                )}

                <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-surface p-6">
                  <div>
                    <p className="font-poppins font-semibold text-foreground">
                      ¿Crees que alguien necesita ver esto?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Ayuda a tus familiares y amigos a salir del ciclo de las deudas.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const shareData = {
                        title: post.title,
                        text: post.excerpt ?? post.title,
                        url: window.location.href,
                      };
                      try {
                        if (navigator.share) {
                          await navigator.share(shareData);
                        } else if (navigator.clipboard) {
                          await navigator.clipboard.writeText(window.location.href);
                          toast.success("Enlace copiado al portapapeles");
                        }
                      } catch (err) {
                        if ((err as DOMException)?.name !== "AbortError") {
                          try {
                            await navigator.clipboard?.writeText(window.location.href);
                            toast.success("Enlace copiado al portapapeles");
                          } catch {
                            toast.error("No se pudo compartir el artículo");
                          }
                        }
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-semibold text-background hover:bg-foreground/90"
                  >
                    <Share2 className="h-4 w-4" />
                    Compartir
                  </button>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <BlogSidebar toc={toc} sidebar={post.sidebar} />
            </div>
          </div>
        </article>

        {post.faq && post.faq.length > 0 && (
          <section className="mx-auto mt-20 max-w-3xl">
            <h2 className="mb-6 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Preguntas frecuentes
            </h2>
            <FaqList
              items={post.faq.map((item) => ({ q: item.question, a: item.answer }))}
            />
          </section>
        )}

        {/* Keyword cloud + related posts */}
        <aside className="mx-auto mt-20 max-w-6xl border-t border-border pt-14">
          {post.keywords && post.keywords.length > 0 && (
            <div className="mb-14">
              <h2 className="mb-5 font-poppins text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Temas tratados en este artículo
              </h2>
              <ul className="flex flex-wrap gap-2.5">
                {post.keywords.map((kw) => (
                  <li key={kw}>
                    <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted-foreground">
                      {kw}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div>
              <h2 className="mb-6 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Sigue explorando esta guía
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-medium"
                  >
                    <div className="overflow-hidden">
                      <BlogHeroImage
                        src={rp.heroImage}
                        alt={rp.heroAlt}
                        width={640}
                        height={400}
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                        {rp.category}
                      </p>
                      <h3 className="mt-3 font-poppins text-lg font-semibold leading-snug text-foreground group-hover:text-accent-deep">
                        {rp.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                        {rp.excerpt}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-deep">
                        Leer artículo
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>

        <RelatedResources
          groups={crossLinks}
          heading="Da el siguiente paso"
        />
      </main>

      <Footer />
      <MobileContactBar pageType="blog" />
    </div>
  );
};

export default BlogPost;
