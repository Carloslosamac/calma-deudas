import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, Share2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import BlogSidebar, { type TocItem } from "@/components/blog/BlogSidebar";
import InlineCTA from "@/components/blog/InlineCTA";
import {
  BeforeAfterSplit,
  BudgetBreakdownStack,
  CostFactorsGrid,
  CostVsDebtBars,
  DebtTypesDonut,
  DocumentsChecklist,
  EmbargoFlowChart,
  EmotionalArcLine,
  MythVsReality,
  PersonasGrid,
  ProcessTimeline,
  RequirementsChecklist,
} from "@/components/blog/diagrams";
import stepStrategy from "@/assets/step-strategy.jpg";
import personCouple from "@/assets/person-couple-sofa.jpg";
import personWoman from "@/assets/person-woman-walking.jpg";

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const post = {
  slug: "cancelar-deudas-requisitos",
  category: "Segunda oportunidad",
  title: "Cómo saber si puedes cancelar tus deudas con la Segunda Oportunidad",
  excerpt:
    "Una guía clara para entender si cumples los requisitos, qué documentación conviene preparar y qué señales indican que puedes acogerte al procedimiento.",
  date: "8 mayo 2026",
  readTime: "9 min",
  author: "Equipo legal Calma",
  heroImage: stepStrategy,
};

const sections: Section[] = [
  {
    id: "que-es",
    title: "Qué es la Ley de Segunda Oportunidad",
    body: (
      <>
        <p>
          La Ley de Segunda Oportunidad es un mecanismo legal que permite a personas
          físicas, autónomos y exempresarios cancelar las deudas que no pueden pagar.
          No es magia ni un atajo: es un procedimiento judicial diseñado precisamente
          para personas honestas que se han visto desbordadas.
        </p>
        <p>
          A grandes rasgos, el proceso permite paralizar embargos, parar las llamadas
          de cobro y, en la mayoría de casos, terminar con una resolución que cancela
          el grueso de la deuda. La idea: recuperar la calma para volver a empezar.
        </p>
        <EmotionalArcLine />
      </>
    ),
  },
  {
    id: "requisitos",
    title: "Requisitos para acogerse",
    body: (
      <>
        <p>
          Mucha gente cree que es un procedimiento solo para casos extremos. En la
          práctica, los requisitos son razonables y la mayoría de personas que nos
          consultan los cumplen sin haberse dado cuenta.
        </p>
        <RequirementsChecklist />
        <p>
          La buena fe es clave: no haber ocultado bienes ni provocado la situación
          de forma deliberada. Si te has visto arrastrado por gastos médicos,
          paro, divorcio, cierre de negocio o intereses imposibles, sueles encajar.
        </p>
        <InlineCTA
          title="¿Crees que cumples los requisitos?"
          description="Te lo confirmamos en 24 horas con un análisis personal sin compromiso."
          buttonLabel="Comprobar mi caso"
        />
      </>
    ),
  },
  {
    id: "perfiles",
    title: "Quién suele acogerse al procedimiento",
    body: (
      <>
        <p>
          No hay un perfil único. Atendemos desde personas asalariadas con varios
          microcréditos hasta autónomos que han cerrado y arrastran deuda pública.
        </p>
        <PersonasGrid />
        <figure className="overflow-hidden rounded-3xl border border-border shadow-soft">
          <img
            src={personWoman}
            alt="Persona caminando con tranquilidad tras cancelar sus deudas"
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </figure>
      </>
    ),
  },
  {
    id: "tipos-deuda",
    title: "Qué deudas se pueden cancelar",
    body: (
      <>
        <p>
          La mayoría de deudas privadas son cancelables: préstamos personales,
          tarjetas, microcréditos, descubiertos, hipotecas si se renuncia al bien,
          deudas con proveedores y avales firmados. Una parte de la deuda pública
          también puede entrar dentro del procedimiento.
        </p>
        <DebtTypesDonut />
      </>
    ),
  },
  {
    id: "embargos",
    title: "Qué pasa con los embargos",
    body: (
      <>
        <p>
          Si ya tienes nómina o cuenta embargada, iniciar el procedimiento permite
          solicitar al juzgado la <strong>suspensión del embargo</strong>. En la
          mayoría de casos esa nómina vuelve íntegra mientras se tramita el expediente.
        </p>
        <EmbargoFlowChart />
        <InlineCTA
          title="¿Tienes un embargo activo?"
          description="Cuanto antes lo veamos, antes podemos pedir su suspensión legal."
          buttonLabel="Hablar con un abogado"
        />
      </>
    ),
  },
  {
    id: "antes-despues",
    title: "Antes y después del proceso",
    body: (
      <>
        <p>
          El cambio más importante no es solo económico, es vital. Cambia el
          teléfono, cambia el sueño, cambia la forma de mirar el futuro.
        </p>
        <BeforeAfterSplit />
      </>
    ),
  },
  {
    id: "presupuesto",
    title: "Cómo afecta a tu presupuesto",
    body: (
      <>
        <p>
          Cuando las cuotas mensuales superan el 25-30% de la nómina, el resto del
          presupuesto se ahoga: ya no se trata solo de pagar deuda, sino de no
          poder vivir. La cancelación libera ese porcentaje y devuelve oxígeno
          al mes a mes.
        </p>
        <BudgetBreakdownStack />
      </>
    ),
  },
  {
    id: "coste",
    title: "Cuánto cuesta el procedimiento",
    body: (
      <>
        <p>
          No hay un precio único: depende de la complejidad real de tu caso.
          Lo correcto es analizar primero la situación y, a partir de ahí, hablar
          de números con honestidad.
        </p>
        <CostFactorsGrid />
        <p>
          En la inmensa mayoría de casos, el coste es muy inferior al volumen de
          deuda cancelada. Por eso siempre miramos los dos lados juntos:
        </p>
        <CostVsDebtBars />
      </>
    ),
  },
  {
    id: "proceso",
    title: "Cómo es el procedimiento paso a paso",
    body: (
      <>
        <p>
          El proceso tiene fases muy claras. Te acompañamos en todas, así nunca
          tienes que enfrentarte a un papel o a un juzgado solo.
        </p>
        <ProcessTimeline />
        <figure className="overflow-hidden rounded-3xl border border-border shadow-soft">
          <img
            src={personCouple}
            alt="Pareja revisando con calma su nueva etapa sin deudas"
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </figure>
      </>
    ),
  },
  {
    id: "documentacion",
    title: "Qué documentación necesitas",
    body: (
      <>
        <p>
          La documentación inicial es sencilla. A partir de ahí, nosotros nos
          encargamos del expediente y de los plazos judiciales.
        </p>
        <DocumentsChecklist />
      </>
    ),
  },
  {
    id: "mitos",
    title: "Mitos que te están frenando",
    body: (
      <>
        <p>
          La mayoría de personas que nos llaman llevan años bloqueadas por miedos
          que no se sostienen. Estos son los más habituales:
        </p>
        <MythVsReality />
        <InlineCTA
          title="Hablemos sin compromiso"
          description="En 15 minutos te decimos si tu caso encaja y qué pasos seguir."
          buttonLabel="Analizar mi deuda gratis"
        />
      </>
    ),
  },
];

const BlogPost = () => {
  const { slug } = useParams();
  const toc: TocItem[] = useMemo(
    () => sections.map((s) => ({ id: s.id, label: s.title })),
    []
  );

  useEffect(() => {
    document.title = `${post.title} — Blog Calma`;
  }, []);

  // For now only the test post exists. Future slugs route to same content.
  if (slug && slug !== post.slug) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="mx-auto max-w-3xl px-6 pb-24 pt-36 text-center">
          <h1 className="font-poppins text-3xl font-semibold">Artículo no disponible aún</h1>
          <p className="mt-4 text-muted-foreground">
            Estamos preparando este contenido. Mientras tanto puedes ver el resto del blog.
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
          {/* Breadcrumb / back */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>
          </div>

          {/* Hero */}
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
            <img
              src={post.heroImage}
              alt="Equipo legal acompañando a una persona en su proceso de Segunda Oportunidad"
              className="aspect-[16/9] w-full object-cover"
            />
          </figure>

          {/* Body + sidebar */}
          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              <div className="max-w-none">
                {sections.map((section) => (
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
                        navigator.share({
                          title: post.title,
                          url: window.location.href,
                        });
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
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;