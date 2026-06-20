import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  Briefcase,
  CalendarDays,
  Clock3,
  FileText,
  Gavel,
  Home,
  Landmark,
  LayoutGrid,
  Lightbulb,
  MessageCircle,
  PiggyBank,
  Scale,
  Search,
  ShieldBan,
  ShieldCheck,
  Star,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Seo from "@/components/seo/Seo";
import {
  buildBreadcrumb,
  buildItemList,
  buildOrganization,
} from "@/lib/seo/structuredData";
import { blogPosts } from "@/data/blog";
import stepStrategy from "@/assets/step-strategy.jpg";

const categoryIcons: Record<string, LucideIcon> = {
  "Todos": LayoutGrid,
  "Segunda oportunidad": Scale,
  "Embargos": Gavel,
  "ASNEF": ShieldBan,
  "Autónomos": Briefcase,
  "Deuda pública": Landmark,
  "Deudas públicas": Landmark,
  "Tarjetas revolving": Wallet,
  "Microcréditos": Wallet,
  "Juicio monitorio": Gavel,
  "Hipotecas": Home,
  "Tarjetas y créditos": Wallet,
  "Ahorro": PiggyBank,
  "Finanzas familiares": Banknote,
  "Consejos": Lightbulb,
};

const featuredArticle = {
  slug: "guia-ley-segunda-oportunidad",
  category: "Guía completa",
  title:
    "Ley de Segunda Oportunidad 2026: la guía más completa y actualizada para cancelar tus deudas",
  excerpt:
    "Qué es, requisitos, proceso, costes, embargos, vivienda, deuda pública y vida después. Todo lo que necesitas saber sobre la Ley de Segunda Oportunidad en un solo sitio.",
  tags: ["Requisitos", "Proceso", "Embargos", "ASNEF", "Deuda pública"],
  image: stepStrategy,
  imageAlt: "Equipo legal revisando documentación para cancelar deudas",
};

type BlogArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  authors?: string[];
  author: string;
};

const articles: BlogArticle[] = blogPosts
  .filter((post) => post.slug !== featuredArticle.slug)
  .map((post) => ({
    slug: post.slug,
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    readTime: post.readTime,
    image: post.heroImage,
    imageAlt: post.heroAlt,
    authors: post.authors,
    author: post.author,
  }));

const categories: { name: string; icon: LucideIcon }[] = [
  { name: "Todos", icon: LayoutGrid },
  ...Array.from(new Set(articles.map((a) => a.category))).map((name) => ({
    name,
    icon: categoryIcons[name] ?? Star,
  })),
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const BlogCard = ({ article }: { article: BlogArticle }) => {
  const CategoryIcon = categoryIcons[article.category] ?? Star;
  return (
  <Link
    to={`/blog/${article.slug}`}
    id={article.slug}
    className="group block overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-large focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-deep focus-visible:ring-offset-2"
  >
    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
      <img
        src={article.image}
        alt={article.imageAlt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-background/90 text-accent-deep shadow-medium backdrop-blur-sm">
        <CategoryIcon className="h-6 w-6 text-accent-deep" strokeWidth={2.2} />
      </div>
    </div>

    <div className="flex min-h-[270px] flex-col p-6 md:p-7">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-accent-deep">
        {article.category}
      </p>
      <h2 className="font-poppins text-xl font-semibold leading-snug tracking-tight text-foreground">
        {article.title}
      </h2>
      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {article.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4" />
            {article.readTime}
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-medium text-accent-deep transition-colors group-hover:text-foreground">
          Leer más
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </div>
  </Link>
  );
};

const Blog = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showAll, setShowAll] = useState(false);

  const INITIAL_VISIBLE = 6;

  const filteredArticles = useMemo(() => {
    const cleanQuery = normalize(query.trim());

    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "Todos" || article.category === activeCategory;
      const searchable = normalize(
        `${article.title} ${article.excerpt} ${article.category}`
      );
      const matchesQuery = cleanQuery.length === 0 || searchable.includes(cleanQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const isFiltering = query.trim().length > 0 || activeCategory !== "Todos";
  // When filtering/searching we always show every match. Otherwise we reveal
  // the full list progressively for UX — but every card stays rendered in the
  // DOM (hidden via CSS) so crawlers always see every internal link.
  const collapsed = !isFiltering && !showAll;
  const hiddenCount = collapsed
    ? Math.max(0, filteredArticles.length - INITIAL_VISIBLE)
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Blog Calma: guías sobre la Ley de Segunda Oportunidad"
        description="Guías claras y actualizadas sobre la Ley de Segunda Oportunidad, embargos, ASNEF, autónomos y vida después de cancelar deudas."
        canonical="/blog"
        keywords={[
          "blog Ley de Segunda Oportunidad",
          "cancelar deudas",
          "guía ley segunda oportunidad",
          "ASNEF",
          "embargos",
        ]}
        structuredData={[
          buildOrganization(),
          buildBreadcrumb([
            { name: "Inicio", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
          buildItemList(
            blogPosts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` }))
          ),
        ]}
      />
      <Header />

      <main className="px-6 pb-24 pt-32 md:pt-36">
        <section className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              Blog Calma
            </p>
            <h1 className="font-poppins text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
              Guías claras para vivir sin deudas.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Información práctica sobre la Ley de Segunda Oportunidad, embargos,
              ASNEF y decisiones financieras para recuperar la calma paso a paso.
            </p>
          </div>

          <label className="mx-auto mt-10 flex h-14 max-w-2xl items-center gap-3 rounded-2xl border border-border bg-surface-elevated px-5 shadow-soft transition-within focus-within:border-accent/70 focus-within:shadow-medium">
            <Search className="h-5 w-5 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar artículos..."
              aria-label="Buscar artículos"
              className="h-full w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              type="search"
            />
          </label>

          <Link
            to={`/blog/${featuredArticle.slug}`}
            aria-label={`Leer la guía: ${featuredArticle.title}`}
            className="group mx-auto mt-9 grid max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-[hsl(160_45%_8%)] shadow-large transition-shadow hover:shadow-[0_18px_60px_-12px_hsl(145_60%_30%/0.45)] md:grid-cols-[0.95fr_1.35fr]"
          >
            <div className="relative min-h-[270px] overflow-hidden bg-muted md:min-h-full">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[hsl(160_45%_8%)]/20" />
            </div>

            <div className="flex flex-col justify-center p-7 text-background md:p-10">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-background/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                <FileText className="h-3.5 w-3.5" />
                {featuredArticle.category}
              </div>
              <h2 className="font-poppins text-2xl font-semibold leading-tight tracking-tight md:text-3xl">
                {featuredArticle.title}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-background/75 md:text-lg">
                {featuredArticle.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featuredArticle.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-background/12 px-3.5 py-1.5 text-xs font-medium text-background/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="mt-8 inline-flex w-fit items-center gap-2 font-semibold text-accent transition-colors group-hover:text-background">
                Leer la guía
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {categories.map(({ name, icon: Icon }) => {
              const isActive = activeCategory === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => setActiveCategory(name)}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:bg-accent-soft hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2" aria-live="polite">
            {filteredArticles.map((article, index) => {
              const isHidden = collapsed && index >= INITIAL_VISIBLE;
              return (
                <div key={article.slug} className={isHidden ? "hidden" : "contents"}>
                  <BlogCard article={article} />
                </div>
              );
            })}
          </div>

          {hiddenCount > 0 && (
            <div className="mt-12 flex justify-center">
              <Button
                type="button"
                onClick={() => setShowAll(true)}
                variant="outline"
                className="rounded-full border-accent/40 px-7 py-6 text-base font-semibold text-foreground hover:bg-accent-soft"
              >
                Ver más artículos
                <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-sm text-accent-foreground">
                  {hiddenCount}
                </span>
              </Button>
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-border bg-surface p-8 text-center">
              <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-accent-deep" />
              <h2 className="font-poppins text-xl font-semibold text-foreground">
                No hemos encontrado artículos con esa búsqueda.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Prueba con otro término o vuelve a ver todos los contenidos.
              </p>
              <Button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveCategory("Todos");
                }}
                className="mt-6 rounded-full bg-foreground px-5 text-background hover:bg-foreground/90"
              >
                Ver todos
              </Button>
            </div>
          )}
        </section>
      </main>

      <a
        href="/#hero-form"
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-large transition-transform hover:scale-105"
        aria-label="Solicitar ayuda para analizar mi deuda"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      <Footer />
    </div>
  );
};

export default Blog;
