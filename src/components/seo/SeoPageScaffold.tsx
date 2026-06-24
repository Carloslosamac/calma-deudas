import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import Seo from "@/components/seo/Seo";
import Breadcrumbs, { type Crumb } from "@/components/seo/Breadcrumbs";
import CtaButton from "@/components/seo/CtaButton";
import FaqList from "@/components/blog/FaqList";
import MoneyToolLinks from "@/components/seo/MoneyToolLinks";
import type { Tool } from "@/data/seo/tools";
import type { TemplateType } from "@/data/seo/architecture";

/**
 * Scaffold genérico para todas las plantillas SEO (esqueleto técnico).
 * Renderiza la estructura obligatoria de cada plantilla con bloques
 * placeholder (TODO) listos para rellenar copy. Incluye Seo, breadcrumbs,
 * bloque editorial E-E-A-T, enlazado interno y el formulario de captación.
 */

/** Secciones obligatorias por plantilla (Diccionario del Excel). */
const SECTIONS: Record<TemplateType, string[]> = {
  money: [
    "Propuesta de valor",
    "Para quién es y requisitos",
    "Cómo funciona (proceso)",
    "Qué vas a conseguir",
    "Coste y plazos",
    "Casos reales",
    "Preguntas frecuentes",
  ],
  hub: [
    "Qué encontrarás en esta sección",
    "Páginas destacadas",
    "Guías relacionadas",
  ],
  urgente: [
    "Respuesta rápida: qué hacer hoy",
    "Plazos y riesgos si no actúas",
    "Pasos a seguir",
    "Cuándo pedir ayuda",
    "Preguntas frecuentes",
  ],
  entidad: [
    "Quién es esta entidad / quién reclama",
    "Tus derechos",
    "Cómo verificar la deuda",
    "Tus opciones",
    "Preguntas frecuentes",
  ],
  comparativa: [
    "Tabla comparativa (pros y contras)",
    "Cuándo conviene cada opción",
    "Riesgos a tener en cuenta",
    "Nuestra recomendación",
  ],
  guia: [
    "Respuesta clara",
    "Ejemplos prácticos",
    "Contenido relacionado",
    "Preguntas frecuentes",
  ],
};

export type RelatedLink = { label: string; to: string };


/** Sección con copy real (sustituye al placeholder). */
export type ContentSection = { title: string; body: React.ReactNode };
/** FAQ para la UI. */
export type ScaffoldFaq = { q: string; a: React.ReactNode };

export type SeoPageScaffoldProps = {
  template: TemplateType;
  h1: string;
  eyebrow?: string;
  intro?: React.ReactNode;
  seoTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbs: Crumb[];
  structuredData?: Record<string, unknown>[];
  related?: RelatedLink[];
  /** respuesta directa (answer-first) para AEO/GEO; se muestra destacada bajo el H1 */
  tldr?: React.ReactNode;
  /** secciones con copy real; si se omite, se muestran placeholders */
  sections?: ContentSection[];
  /** preguntas frecuentes (se renderiza un acordeón al final del contenido) */
  faq?: ScaffoldFaq[];
  /** herramientas relevantes para el bloque "Calcula tu caso" */
  tools?: Tool[];
  /** marca el contenido como pendiente de revisión legal */
  needsLegalReview?: boolean;
  children?: React.ReactNode;
};

const SeoPageScaffold = ({
  template,
  h1,
  eyebrow,
  intro,
  seoTitle,
  metaDescription,
  canonical,
  breadcrumbs,
  structuredData,
  related,
  tldr,
  sections: contentSections,
  faq,
  tools,
  needsLegalReview,
  children,
}: SeoPageScaffoldProps) => {
  const placeholderSections = SECTIONS[template];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={seoTitle}
        description={metaDescription}
        canonical={canonical}
        ogType={template === "guia" || template === "entidad" ? "article" : "website"}
        structuredData={structuredData}
      />
      <Header />

      <main className="px-6 pb-8 pt-32 md:pt-36">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={breadcrumbs} />

          <header className="mt-6">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent-deep">
                {eyebrow}
              </p>
            )}
            <h1 className="font-poppins text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {h1}
            </h1>
            {intro && (
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                {intro}
              </p>
            )}
            {tldr && (
              <div className="mt-6 rounded-2xl border border-accent/30 bg-accent-soft/40 p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                  Respuesta directa
                </p>
                <div className="text-base leading-relaxed text-foreground">{tldr}</div>
              </div>
            )}
            <div className="mt-7">
              <CtaButton />
            </div>
          </header>

          {/* Contenido: copy real si existe, si no bloques placeholder */}
          <div className="mt-14 space-y-12">
            {contentSections && contentSections.length > 0
              ? contentSections.map((s) => (
                  <section key={s.title} className="scroll-mt-28">
                    <h2 className="flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                      {s.title}
                    </h2>
                    <div className="mt-5">{s.body}</div>
                  </section>
                ))
              : placeholderSections.map((title) => (
                  <section key={title} className="scroll-mt-28">
                    <h2 className="flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                      {title}
                    </h2>
                    <div className="mt-4 rounded-2xl border border-dashed border-border bg-surface/60 p-6 text-sm text-muted-foreground">
                      Contenido pendiente · {title}
                    </div>
                  </section>
                ))}

            {faq && faq.length > 0 && (
              <section className="scroll-mt-28">
                <h2 className="flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                  Preguntas frecuentes
                </h2>
                <div className="mt-5">
                  <FaqList items={faq.map((f) => ({ q: f.q, a: f.a }))} />
                </div>
              </section>
            )}
          </div>

          {children}

          {/* Calcula tu caso — enlaces a herramientas relevantes */}
          {tools && tools.length > 0 && (
            <div className="mt-14">
              <MoneyToolLinks tools={tools} />
            </div>
          )}

          {/* Bloque editorial E-E-A-T obligatorio */}
          <div className="mt-14 rounded-3xl border border-border bg-surface p-6">
            <p className="font-poppins font-semibold text-foreground">
              Contenido elaborado por el equipo de Calma
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {needsLegalReview
                ? "Pendiente de revisión por abogado especialista. La información legal debe validarse antes de publicar."
                : "Revisado por abogado especialista en la Ley de Segunda Oportunidad."}
            </p>
          </div>

          {/* Enlazado interno */}
          {related && related.length > 0 && (
            <nav aria-label="Contenido relacionado" className="mt-14">
              <h2 className="mb-5 font-poppins text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                Contenido relacionado
              </h2>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.to}>
                    <Link
                      to={r.to}
                      className="block rounded-2xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground transition-colors hover:border-accent/50 hover:bg-accent-soft/40"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </main>

      {/* Formulario de captación (#hero-form) — destino de todos los CTA */}
      <FormSection />
      <Footer />
    </div>
  );
};

export default SeoPageScaffold;