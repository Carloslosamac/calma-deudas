import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  PhoneOff,
  Gavel,
  Users,
  Scale,
  Sparkles,
  Wallet,
  Clock,
  Lock,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormSection from "@/components/FormSection";
import Seo from "@/components/seo/Seo";
import Breadcrumbs, { type Crumb } from "@/components/seo/Breadcrumbs";
import CtaButton from "@/components/seo/CtaButton";
import FaqList from "@/components/blog/FaqList";
import type { RelatedLink } from "@/components/seo/SeoPageScaffold";
import type { MoneyContent, MoneyIcon } from "@/data/seo/content/types";
import DebtSimulator from "@/components/seo/interactive/DebtSimulator";
import DebtTypeSelector from "@/components/seo/interactive/DebtTypeSelector";
import EligibilityQuiz from "@/components/seo/interactive/EligibilityQuiz";
import BeforeAfter from "@/components/seo/interactive/BeforeAfter";

const ICONS: Record<MoneyIcon, LucideIcon> = {
  shield: ShieldCheck,
  "phone-off": PhoneOff,
  gavel: Gavel,
  users: Users,
  scale: Scale,
  sparkles: Sparkles,
  wallet: Wallet,
  clock: Clock,
  lock: Lock,
};

/** Revelado suave por scroll. */
const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Reveal = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    className={className}
    variants={reveal}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    transition={{ delay }}
  >
    {children}
  </motion.div>
);

export type MoneyJourneyProps = {
  content: MoneyContent;
  h1: string;
  eyebrow?: string;
  seoTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbs: Crumb[];
  structuredData?: Record<string, unknown>[];
  related?: RelatedLink[];
};

const MoneyJourney = ({
  content,
  h1,
  eyebrow,
  seoTitle,
  metaDescription,
  canonical,
  breadcrumbs,
  structuredData,
  related,
}: MoneyJourneyProps) => {
  const { hero, benefits, steps, metrics, eligibility, closing, sections, faq, interactive } =
    content;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title={seoTitle}
        description={metaDescription}
        canonical={canonical}
        ogType="website"
        structuredData={structuredData}
      />
      <Header />

      <main className="pt-28 md:pt-32">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="mx-auto max-w-4xl px-6 pb-16 pt-12 text-center md:pb-24 md:pt-16">
            <Breadcrumbs items={breadcrumbs} />
            <motion.div variants={reveal} initial="hidden" animate="show" className="mt-8">
              {(hero?.badge ?? eyebrow) && (
                <span className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                  {hero?.badge ?? eyebrow}
                </span>
              )}
              <h1 className="mx-auto mt-6 max-w-3xl font-poppins text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
                {hero ? (
                  <>
                    {hero.titleLead}{" "}
                    <span className="text-accent-deep">{hero.titleAccent}</span>
                  </>
                ) : (
                  h1
                )}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {hero?.subtitle ?? content.intro}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <CtaButton className="h-14 px-8 text-base">
                  Analizar mi deuda gratis
                </CtaButton>
                {hero?.trustNote && (
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-accent-deep" aria-hidden />
                    {hero.trustNote}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-20 px-6 py-16 md:space-y-28 md:py-24">
          {/* ---------- Beneficios ---------- */}
          {benefits && benefits.length > 0 && (
            <section className="grid gap-4 md:grid-cols-2">
              {benefits.map((b, i) => {
                const Icon = ICONS[b.icon] ?? Sparkles;
                return (
                  <Reveal key={b.title} delay={i * 0.06}>
                    <div className="group flex h-full gap-4 rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-medium">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
                        <Icon className="h-6 w-6" aria-hidden />
                      </div>
                      <div>
                        <h3 className="font-poppins font-semibold text-foreground">{b.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </section>
          )}

          {/* ---------- Journey de pasos ---------- */}
          {steps && steps.length > 0 && (
            <section>
              <Reveal className="text-center">
                <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {content.stepsTitle ?? "Tu camino, paso a paso"}
                </h2>
                {content.stepsSubtitle && (
                  <p className="mt-3 text-muted-foreground">{content.stepsSubtitle}</p>
                )}
              </Reveal>
              <div className="mt-10 space-y-5">
                {steps.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.06}>
                    <div
                      className={`flex items-start gap-5 rounded-3xl border p-6 transition-colors ${
                        s.highlight
                          ? "border-accent/40 bg-accent-soft/50"
                          : "border-border bg-surface-elevated shadow-soft"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-poppins text-sm font-bold ${
                          s.highlight
                            ? "bg-accent text-accent-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-poppins font-semibold text-foreground">{s.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/75">{s.text}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* ---------- Métricas ---------- */}
          {metrics && metrics.length > 0 && (
            <Reveal>
              <section className="grid gap-6 rounded-3xl border border-border bg-surface p-8 sm:grid-cols-3 md:p-10">
                {metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <p className="font-poppins text-3xl font-bold text-accent-deep md:text-4xl">{m.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </section>
            </Reveal>
          )}

          {/* ---------- Secciones en prosa ---------- */}
          {sections && sections.length > 0 && (
            <div className="space-y-14">
              {sections.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.04}>
                  <section className="scroll-mt-28">
                    <h2 className="flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                      <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                      {s.title}
                    </h2>
                    <div className="mt-5">{s.body}</div>
                  </section>
                </Reveal>
              ))}
            </div>
          )}

          {/* ---------- ¿Es para mí? (bloque oscuro) ---------- */}
          {eligibility && (
            <Reveal>
              <section className="rounded-[2rem] bg-gradient-dark p-8 text-primary-foreground md:p-12">
                <div className="max-w-2xl">
                  <h2 className="font-poppins text-3xl font-bold tracking-tight md:text-4xl">
                    {eligibility.title}
                  </h2>
                  <p className="mt-4 text-primary-foreground/70">{eligibility.intro}</p>
                  <ul className="mt-8 space-y-3">
                    {eligibility.requirements.map((r) => (
                      <li key={r} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
                        <span className="text-sm leading-relaxed text-primary-foreground/90">{r}</span>
                      </li>
                    ))}
                  </ul>
                  {(eligibility.trustTitle || eligibility.trustText) && (
                    <div className="mt-9 flex items-center gap-3 border-t border-primary-foreground/15 pt-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-accent">
                        <Scale className="h-5 w-5" aria-hidden />
                      </div>
                      <div className="text-sm">
                        {eligibility.trustTitle && (
                          <p className="font-semibold text-primary-foreground">{eligibility.trustTitle}</p>
                        )}
                        {eligibility.trustText && (
                          <p className="text-primary-foreground/60">{eligibility.trustText}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </Reveal>
          )}

          {/* ---------- FAQ ---------- */}
          {faq && faq.length > 0 && (
            <Reveal>
              <section className="scroll-mt-28">
                <h2 className="flex items-center gap-3 font-poppins text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  <span aria-hidden className="block h-7 w-1 rounded-full bg-accent" />
                  Preguntas frecuentes
                </h2>
                <div className="mt-6">
                  <FaqList items={faq.map((f) => ({ q: f.q, a: f.a }))} />
                </div>
              </section>
            </Reveal>
          )}

          {/* ---------- CTA de cierre ---------- */}
          {closing && (
            <Reveal>
              <section className="rounded-[2rem] border border-accent/30 bg-accent-soft/50 p-10 text-center md:p-14">
                <h2 className="font-poppins text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {closing.title}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">{closing.text}</p>
                <div className="mt-8 flex justify-center">
                  <CtaButton className="h-14 px-8 text-base">
                    <span className="flex items-center gap-2">
                      Analizar mi deuda gratis
                      <ArrowRight className="h-5 w-5" aria-hidden />
                    </span>
                  </CtaButton>
                </div>
                <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" aria-hidden />
                  Te llamamos en menos de 24h · Sin compromiso
                </p>
              </section>
            </Reveal>
          )}

          {/* ---------- E-E-A-T ---------- */}
          <div className="rounded-3xl border border-border bg-surface p-6">
            <p className="font-poppins font-semibold text-foreground">
              Contenido elaborado por el equipo de Calma
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {content.reviewed
                ? "Revisado por abogado especialista en la Ley de Segunda Oportunidad."
                : "Pendiente de revisión por abogado especialista."}
            </p>
          </div>

          {/* ---------- Enlazado interno ---------- */}
          {related && related.length > 0 && (
            <nav aria-label="Contenido relacionado">
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

      <FormSection />
      <Footer />
    </div>
  );
};

export default MoneyJourney;
