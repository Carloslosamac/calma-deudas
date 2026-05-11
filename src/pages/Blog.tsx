import { useMemo, useState } from "react";
import { ArrowRight, CalendarDays, Clock3, FileText, MessageCircle, Search, ShieldCheck, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import stepForm from "@/assets/step-form.jpg";
import stepStrategy from "@/assets/step-strategy.jpg";
import stepFreedom from "@/assets/step-freedom.jpg";
import personWoman from "@/assets/person-woman-walking.jpg";
import personMan from "@/assets/person-man-portrait.jpg";
import personCouple from "@/assets/person-couple-sofa.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";

const categories = [
  "Todos",
  "Segunda oportunidad",
  "Embargos",
  "ASNEF",
  "Autónomos",
  "Consejos",
];

const featuredArticle = {
  category: "Guía completa",
  title: "Ley de Segunda Oportunidad: qué es, requisitos y cómo empezar sin miedo",
  excerpt:
    "Todo lo que necesitas saber para cancelar deudas legalmente, frenar llamadas de cobro y recuperar una vida financiera estable.",
  tags: ["Requisitos", "Proceso", "Embargos", "ASNEF", "Deuda pública"],
  image: stepStrategy,
  imageAlt: "Equipo legal revisando documentación para cancelar deudas",
};

const articles = [
  {
    slug: "cancelar-deudas-requisitos",
    category: "Segunda oportunidad",
    title: "Cómo saber si puedes cancelar tus deudas con la Segunda Oportunidad",
    excerpt:
      "Las claves para entender si cumples los requisitos, qué documentación conviene preparar y qué señales indican que puedes acogerte al procedimiento.",
    date: "8 mayo 2026",
    readTime: "6 min",
    image: personWoman,
    imageAlt: "Mujer caminando tranquila después de ordenar sus deudas",
  },
  {
    slug: "embargos-segunda-oportunidad",
    category: "Embargos",
    title: "Qué ocurre con los embargos cuando inicias el proceso legal",
    excerpt:
      "Te explicamos cuándo pueden frenarse los embargos, qué pasa con la nómina y cómo se protege tu cuenta durante el expediente.",
    date: "7 mayo 2026",
    readTime: "5 min",
    image: stepForm,
    imageAlt: "Persona revisando un formulario de análisis de deuda",
  },
  {
    slug: "salir-asnef",
    category: "ASNEF",
    title: "ASNEF: cómo salir de un fichero de morosidad después de cancelar deuda",
    excerpt:
      "Estar en un fichero puede bloquearte durante años. Estos son los pasos para pedir la baja y recuperar acceso a financiación básica.",
    date: "5 mayo 2026",
    readTime: "4 min",
    image: personMan,
    imageAlt: "Hombre mirando a cámara en una situación de recuperación financiera",
  },
  {
    slug: "autonomos-con-deudas",
    category: "Autónomos",
    title: "Autónomos con deudas: cómo proteger tu actividad y empezar de nuevo",
    excerpt:
      "Si trabajas por cuenta propia, hay formas de ordenar deudas sin cerrar la persiana. Repasamos opciones legales y errores frecuentes.",
    date: "30 abril 2026",
    readTime: "7 min",
    image: testimonial2,
    imageAlt: "Autónomo que ha recuperado la estabilidad tras cancelar deuda",
  },
  {
    slug: "renegociar-acreedores",
    category: "Consejos",
    title: "Cuándo conviene renegociar deudas y cuándo iniciar una vía legal",
    excerpt:
      "No todos los casos necesitan el mismo camino. Aprende a distinguir entre una renegociación viable y una deuda que ya exige protección legal.",
    date: "24 abril 2026",
    readTime: "5 min",
    image: personCouple,
    imageAlt: "Pareja revisando opciones para ordenar sus finanzas familiares",
  },
  {
    slug: "vida-despues-deuda",
    category: "Consejos",
    title: "Después de cancelar deuda: hábitos sencillos para no volver al bloqueo",
    excerpt:
      "Una segunda oportunidad también necesita un plan tranquilo. Presupuesto, ahorro mínimo y decisiones prácticas para mantener la calma.",
    date: "18 abril 2026",
    readTime: "4 min",
    image: stepFreedom,
    imageAlt: "Persona disfrutando de una etapa de tranquilidad financiera",
  },
];

type BlogArticle = (typeof articles)[number];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const BlogCard = ({ article }: { article: BlogArticle }) => (
  <article
    id={article.slug}
    className="group overflow-hidden rounded-[2rem] border border-border bg-surface-elevated shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-large"
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
        <Star className="h-6 w-6 fill-accent text-accent-deep" />
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
        <a
          href={`#${article.slug}`}
          className="inline-flex items-center gap-1.5 font-medium text-accent-deep transition-colors hover:text-foreground"
        >
          Leer más
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  </article>
);

const Blog = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

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

  return (
    <div className="min-h-screen bg-background text-foreground">
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
              className="h-full w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
              type="search"
            />
          </label>

          <article className="mx-auto mt-9 grid max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-[hsl(160_45%_8%)] shadow-large md:grid-cols-[0.95fr_1.35fr]">
            <div className="relative min-h-[270px] overflow-hidden bg-muted md:min-h-full">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.imageAlt}
                className="h-full w-full object-cover"
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

              <a
                href="#cancelar-deudas-requisitos"
                className="mt-8 inline-flex w-fit items-center gap-2 font-semibold text-accent transition-colors hover:text-background"
              >
                Leer la guía
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </article>

          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-glow"
                      : "bg-muted text-muted-foreground hover:bg-accent-soft hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2" aria-live="polite">
            {filteredArticles.map((article) => (
              <BlogCard key={article.slug} article={article} />
            ))}
          </div>

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
