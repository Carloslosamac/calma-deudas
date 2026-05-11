import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import BlogSidebar, { type TocItem } from "@/components/blog/BlogSidebar";
import { blogPosts, getPostBySlug } from "@/data/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  const toc: TocItem[] = useMemo(
    () => (post ? post.sections.map((s) => ({ id: s.id, label: s.title })) : []),
    [post]
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    const others = blogPosts.filter((p) => p.slug !== post.slug);
    const sameCategory = others.filter((p) => p.category === post.category);
    const rest = others.filter((p) => p.category !== post.category);
    return [...sameCategory, ...rest].slice(0, 3);
  }, [post]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} — Blog Calma`;
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
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

  return (
    <div className="min-h-screen bg-background text-foreground">
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
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readTime}
              </span>
              <span>· {post.author}</span>
            </div>
          </header>

          <figure className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[2rem] border border-border shadow-large">
            <img src={post.heroImage} alt={post.heroAlt} className="aspect-[16/9] w-full object-cover" />
          </figure>

          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <div className="max-w-none">
                {post.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    <h2 className="mt-14 flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-6 text-base leading-relaxed text-foreground/85 [&_p]:text-base [&_p]:leading-relaxed">
                      {section.body}
                    </div>
                  </section>
                ))}

                <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-surface p-6">
                  <div>
                    <p className="font-poppins font-semibold text-foreground">
                      ¿Te ha sido útil este artículo?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Compártelo con alguien que pueda necesitarlo.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: post.title, url: window.location.href });
                      } else {
                        navigator.clipboard?.writeText(window.location.href);
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
              <BlogSidebar toc={toc} />
            </div>
          </div>
        </article>

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
                Artículos relacionados
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    to={`/blog/${rp.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-medium"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={rp.heroImage}
                        alt={rp.heroAlt}
                        loading="lazy"
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
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
