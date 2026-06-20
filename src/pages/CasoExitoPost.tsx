import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Wallet } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import FaqList from "@/components/blog/FaqList";
import CtaButton from "@/components/seo/CtaButton";
import Seo from "@/components/seo/Seo";
import RelatedResources from "@/components/seo/RelatedResources";
import { buildCrossLinks, resolveCasoTopic } from "@/data/seo/internalLinks";
import { casosExito, getCasoBySlug } from "@/data/casos";
import {
  buildArticle,
  buildBreadcrumb,
  buildFaq,
} from "@/lib/seo/structuredData";
import { absoluteUrl } from "@/lib/seo/config";

const CasoExitoPost = () => {
  const { slug } = useParams();
  const caso = getCasoBySlug(slug);

  const relatedCasos = useMemo(() => {
    if (!caso) return [];
    return casosExito.filter((c) => c.slug !== caso.slug).slice(0, 3);
  }, [caso]);

  const crossLinks = useMemo(() => {
    if (!caso) return [];
    const topic = resolveCasoTopic(caso.category);
    if (!topic) return [];
    return buildCrossLinks({ topic, origin: "caso", excludeSlug: caso.slug });
  }, [caso]);

  if (!caso) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Seo
          title="Caso no disponible"
          description="Este caso de éxito no existe o ha sido movido. Vuelve al listado de casos reales de Calma."
          canonical={`/casos-de-exito/${slug ?? ""}`}
          robots="noindex,follow"
          appendSiteName={false}
        />
        <Header />
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
          <h1 className="font-poppins text-3xl font-semibold">Caso no disponible</h1>
          <p className="mt-4 text-muted-foreground">
            No hemos encontrado este caso. Vuelve al listado para ver el resto de historias.
          </p>
          <Link
            to="/casos-de-exito"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 font-semibold text-background hover:bg-foreground/90"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver casos de éxito
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const url = `/casos-de-exito/${caso.slug}`;
  const structured: Record<string, unknown>[] = [
    buildBreadcrumb([
      { name: "Inicio", url: "/" },
      { name: "Casos de éxito", url: "/casos-de-exito" },
      { name: caso.headline, url },
    ]),
    buildArticle({
      title: caso.seoTitle ?? caso.headline,
      description: caso.metaDescription ?? caso.dek,
      url,
      image: absoluteUrl(caso.heroImage),
      publishedAt: caso.publishedAt,
      updatedAt: caso.updatedAt,
      keywords: caso.keywords,
    }),
  ];
  if (caso.faq?.length) structured.push(buildFaq(caso.faq));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={caso.seoTitle ?? caso.headline}
        description={caso.metaDescription ?? caso.dek}
        canonical={url}
        ogType="article"
        keywords={caso.keywords}
        publishedAt={caso.publishedAt}
        updatedAt={caso.updatedAt}
        appendSiteName={false}
        structuredData={structured}
      />
      <ReadingProgressBar />
      <Header />

      <main className="px-6 pb-24 pt-32 md:pt-36">
        <article className="mx-auto max-w-3xl">
          <div className="mb-8">
            <Link
              to="/casos-de-exito"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Casos de éxito
            </Link>
          </div>

          <header>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
              {caso.category}
            </p>
            <h1 className="font-poppins text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {caso.headline}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              {caso.dek}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {caso.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {caso.readTime}
              </span>
            </div>
          </header>

          <figure className="mt-10 overflow-hidden rounded-[2rem] border border-border shadow-large">
            <img src={caso.heroImage} alt={caso.heroAlt} className="aspect-[16/9] w-full object-cover" />
          </figure>

          {/* Ficha del caso */}
          <dl className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
            <div className="bg-surface p-5">
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Wallet className="h-3.5 w-3.5" /> Deuda cancelada
              </dt>
              <dd className="mt-2 font-poppins text-xl font-bold text-accent-deep">{caso.debtAmount}</dd>
            </div>
            <div className="bg-surface p-5">
              <dt className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> Lugar
              </dt>
              <dd className="mt-2 font-poppins text-lg font-semibold text-foreground">{caso.location}</dd>
            </div>
            <div className="bg-surface p-5">
              <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Solución
              </dt>
              <dd className="mt-2 text-sm font-medium leading-snug text-foreground">{caso.solution}</dd>
            </div>
          </dl>

          <div className="mt-6">
            {caso.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="mt-14 flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                  {section.title}
                </h2>
                <div className="mt-5 space-y-6 text-base leading-relaxed text-foreground/85 [&_p]:text-base [&_p]:leading-relaxed">
                  {section.html !== undefined ? (
                    <div
                      className="space-y-6 [&_h3]:font-poppins [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1"
                      dangerouslySetInnerHTML={{ __html: section.html }}
                    />
                  ) : (
                    section.body
                  )}
                </div>
              </section>
            ))}
          </div>

          {caso.faq && caso.faq.length > 0 && (
            <section className="mt-20">
              <h2 className="mb-6 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Preguntas frecuentes
              </h2>
              <FaqList items={caso.faq.map((item) => ({ q: item.question, a: item.answer }))} />
            </section>
          )}

          <div className="mt-16 rounded-[2rem] border border-accent/30 bg-accent-soft/50 p-10 text-center">
            <h2 className="font-poppins text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              ¿Tu caso se parece a este?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Pide tu estudio gratis y descubre cuánta deuda puedes cancelar. Sin anticipos ni compromiso.
            </p>
            <div className="mt-8 flex justify-center">
              <CtaButton className="h-14 px-8 text-base">Analizar mi deuda gratis</CtaButton>
            </div>
          </div>
        </article>

        {relatedCasos.length > 0 && (
          <aside className="mx-auto mt-20 max-w-5xl border-t border-border pt-14">
            <h2 className="mb-6 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Otros casos reales
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCasos.map((rc) => (
                <Link
                  key={rc.slug}
                  to={`/casos-de-exito/${rc.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-medium"
                >
                  <div className="overflow-hidden">
                    <img
                      src={rc.heroImage}
                      alt={rc.heroAlt}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                      {rc.category}
                    </p>
                    <h3 className="mt-3 font-poppins text-lg font-semibold leading-snug text-foreground group-hover:text-accent-deep">
                      {rc.headline}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}

        <RelatedResources groups={crossLinks} heading="Da el siguiente paso" />
      </main>

      <FormSection />
      <Footer />
    </div>
  );
};

export default CasoExitoPost;