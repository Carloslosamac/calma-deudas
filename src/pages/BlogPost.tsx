import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3, ExternalLink, Share2 } from "lucide-react";
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

// Helpers for SEO interlinking
const InternalLink: React.FC<React.PropsWithChildren<{ to: string }>> = ({ to, children }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);

const ExtLink: React.FC<React.PropsWithChildren<{ href: string }>> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-accent-deep underline-offset-4 hover:underline"
  >
    {children}
    <ExternalLink className="ml-0.5 inline-block h-3 w-3 align-baseline" />
  </a>
);

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
  date: "11 mayo 2026",
  readTime: "14 min",
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
          La <strong>Ley de Segunda Oportunidad</strong> es un mecanismo legal regulado
          por el{" "}
          <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-2109">
            Real Decreto-Ley 1/2015
          </ExtLink>{" "}
          y consolidado en el{" "}
          <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">
            Texto Refundido de la Ley Concursal
          </ExtLink>,
          que permite a personas físicas, autónomos y exempresarios <strong>cancelar
          sus deudas</strong> cuando no pueden hacer frente a ellas. No es una rebaja
          comercial, ni una refinanciación, ni una promesa publicitaria: es un
          procedimiento judicial reconocido por el ordenamiento español y por la
          normativa europea sobre insolvencia.
        </p>
        <p>
          Su finalidad es muy concreta: dar una salida real al deudor de buena fe que,
          por circunstancias sobrevenidas, no puede pagar préstamos personales,
          tarjetas revolving, microcréditos, descubiertos bancarios, hipotecas
          impagadas, deudas con proveedores, avales firmados a familiares o incluso
          una parte de la deuda pública con{" "}
          <ExtLink href="https://sede.agenciatributaria.gob.es/">Hacienda</ExtLink> y{" "}
          <ExtLink href="https://sede.seg-social.gob.es/">Seguridad Social</ExtLink>. La idea
          es sencilla y profundamente humana: que un mal año, un divorcio, una
          enfermedad, un ERE o el cierre de un negocio no condenen a una persona a
          vivir endeudada el resto de su vida.
        </p>
        <p>
          En la práctica, acogerse a la <strong>Ley de Segunda Oportunidad en España</strong>
          permite paralizar embargos de nómina y cuenta corriente, frenar las llamadas
          de las empresas de recobro, suspender procedimientos judiciales abiertos por
          tus acreedores y, en la mayoría de casos, terminar con una resolución
          judicial llamada <em>Exoneración del Pasivo Insatisfecho (EPI)</em> que
          cancela el grueso de la deuda restante. Es decir: lo que no se pueda pagar
          con tu patrimonio actual, deja de ser exigible.
        </p>
        <p>
          Conviene desmontar un mito desde el principio. No hace falta estar
          arruinado del todo, ni haber perdido la vivienda, ni haber dejado de pagar
          durante años para poder iniciar el procedimiento. De hecho, cuanto antes
          se analiza la situación, más opciones existen de proteger lo que todavía
          se conserva, evitar nuevos intereses de demora y reducir el desgaste
          emocional que produce vivir con deuda crónica.
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
          Una de las dudas más frecuentes que recibimos es si los <strong>requisitos
          para cancelar deudas con la Ley de Segunda Oportunidad</strong> son
          inalcanzables. La respuesta corta es no. La ley está pensada para personas
          normales, no para casos extremos, y la mayoría de quienes nos consultan
          cumplen las condiciones sin saberlo.
        </p>
        <p>
          Los requisitos esenciales son cuatro: ser persona física (particular,
          autónomo o exempresario), encontrarse en una situación real de insolvencia
          actual o inminente, actuar de buena fe a lo largo de todo el procedimiento
          y no haber sido condenado por determinados delitos económicos en los diez
          años previos. La famosa <em>buena fe del deudor</em> es el eje del
          procedimiento: significa no haber ocultado bienes, no haber provocado la
          insolvencia de forma deliberada y haber colaborado con los acreedores
          hasta donde ha sido razonable.
        </p>
        <RequirementsChecklist />
        <p>
          En la práctica, los perfiles que encajan son muy variados. Personas que
          han ido encadenando microcréditos para llegar a fin de mes, <InternalLink to="/blog/autonomos-con-deudas">autónomos que arrastran cuotas atrasadas con Hacienda y Seguridad Social</InternalLink>,
          familias golpeadas por un divorcio o una enfermedad, antiguos avalistas
          que respondieron por un familiar o un socio, o exempresarios que cerraron
          su sociedad y se quedaron con deudas personales como administradores. Si
          además figuras en ficheros de morosos, te interesará nuestra guía
          específica para <InternalLink to="/blog/salir-asnef">salir de ASNEF</InternalLink>.
          Si te reconoces en alguno de estos escenarios, lo más probable es que
          cumplas los requisitos y solo necesites un análisis legal para confirmarlo.
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
          No existe un único perfil de persona que se acoge a la Segunda
          Oportunidad. En Calma atendemos cada semana situaciones muy distintas y,
          aun así, casi todas comparten un patrón común: una etapa vital concreta
          en la que los ingresos dejaron de cubrir los gastos y, a partir de ahí,
          la deuda empezó a crecer sola por intereses, comisiones y refinanciaciones.
        </p>
        <p>
          Los tres grandes grupos que más se acogen son: trabajadores por cuenta
          ajena con varios microcréditos y tarjetas revolving en marcha, autónomos
          con deuda fiscal y de Seguridad Social acumulada, y exempresarios o
          administradores que cerraron su sociedad arrastrando responsabilidades
          personales. Aunque las cifras y los acreedores cambian, el procedimiento
          y el objetivo son el mismo: cancelar lo que no se puede pagar.
        </p>
        <PersonasGrid />
        <p>
          Más allá del perfil económico, hay un denominador común claramente
          emocional: el agotamiento. La mayoría de personas que llegan a nuestra
          consulta llevan meses, a veces años, conviviendo con llamadas diarias,
          cartas certificadas, miedo a abrir el buzón y ansiedad ante cada nómina.
          Saber que existe una vía legal para parar todo eso suele ser, en sí mismo,
          el primer alivio del proceso.
        </p>
      </>
    ),
  },
  {
    id: "historias",
    title: "Cómo cambia la vida después del procedimiento",
    body: (
      <>
        <p>
          La parte menos visible de la Ley de Segunda Oportunidad es su impacto
          personal. Detrás de cada expediente hay una persona que vuelve a dormir
          ocho horas seguidas, una pareja que deja de discutir por dinero, un
          autónomo que se atreve a facturar otra vez sin miedo a que le embarguen,
          una madre que puede planificar el curso escolar de sus hijos sin números
          rojos. La <strong>cancelación de deudas</strong> no es solo un trámite
          legal: es un cambio de etapa.
        </p>
        <figure className="overflow-hidden rounded-3xl border border-border shadow-soft">
          <img
            src={personWoman}
            alt="Persona caminando con tranquilidad tras cancelar sus deudas con la Ley de Segunda Oportunidad"
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </figure>
        <p>
          También cambia la relación con el dinero. Cuando las cuotas dejan de
          devorar la nómina, vuelve a tener sentido ahorrar, planificar, invertir
          en formación o pensar en un proyecto a medio plazo. No es una idea
          abstracta: es lo que vemos cada mes en las personas que han terminado
          el procedimiento y vuelven a contarnos cómo están seis meses después.
        </p>
      </>
    ),
  },
  {
    id: "tipos-deuda",
    title: "Qué deudas se pueden cancelar",
    body: (
      <>
        <p>
          Una de las grandes ventajas del procedimiento es su amplitud. La inmensa
          mayoría de deudas que afectan a particulares y autónomos pueden quedar
          incluidas dentro del expediente y, por tanto, ser canceladas mediante la
          <em> Exoneración del Pasivo Insatisfecho</em>. Hablamos de
          <strong> préstamos personales</strong>, créditos al consumo, tarjetas
          revolving, microcréditos rápidos, descubiertos en cuenta, líneas de
          crédito, financiación de coches o electrodomésticos, deudas con
          proveedores, facturas impagadas, avales firmados a familiares o socios,
          y la deuda hipotecaria cuando se opta por no conservar la vivienda.
        </p>
        <p>
          La deuda pública también entra dentro del procedimiento, aunque con
          matices. La normativa actual permite exonerar hasta diez mil euros con
          Hacienda y otros diez mil euros con la Seguridad Social, y aplicar
          calendarios de pago razonables al resto. Para autónomos y exadministradores
          esto suele ser un punto crítico, porque la deuda pública es precisamente
          la que más miedo da y la que más rápido genera embargos.
        </p>
        <DebtTypesDonut />
        <p>
          Quedan fuera, en cambio, las deudas por pensiones de alimentos, las
          responsabilidades civiles derivadas de delito y las multas penales. Es
          decir, el procedimiento cancela deuda económica ordinaria, no
          responsabilidades personales o penales. Esta distinción es importante y
          siempre la explicamos con detalle antes de iniciar cualquier trámite,
          porque conviene saber con exactitud qué se cancela y qué no.
        </p>
      </>
    ),
  },
  {
    id: "embargos",
    title: "Qué pasa con los embargos",
    body: (
      <>
        <p>
          Los embargos son, probablemente, la consecuencia más dolorosa de tener
          deudas impagadas. Ver cómo cada mes una parte de la nómina desaparece
          antes de poder usarla, descubrir que la cuenta del banco está bloqueada
          o recibir la notificación de un embargo sobre un bien concreto genera
          una sensación de pérdida de control que la mayoría de personas no había
          experimentado nunca. La buena noticia es que la Ley de Segunda Oportunidad
          tiene mecanismos específicos para frenar esa situación.
        </p>
        <p>
          En el momento en que se admite a trámite la solicitud de procedimiento
          de insolvencia, el juzgado puede acordar la <strong>suspensión de los
          embargos</strong> en curso y la paralización de las nuevas ejecuciones
          que pretendan iniciar los acreedores. En la práctica, esto significa
          que la nómina vuelve a entrar íntegra, la cuenta deja de estar
          bloqueada y las llamadas de las empresas de recobro pierden cualquier
          base legal para presionarte.
        </p>
        <EmbargoFlowChart />
        <p>
          Aquí el tiempo importa: cuanto antes se inicia el expediente, antes se
          puede pedir esa suspensión. Si llevas meses con la nómina embargada o
          acabas de recibir una notificación de embargo, te recomendamos leer
          también nuestra guía sobre{" "}
          <InternalLink to="/blog/embargos-segunda-oportunidad">cómo parar un embargo con la Segunda Oportunidad</InternalLink>.
          Es el mejor momento para
          analizar tu caso, porque el ahorro real (recuperar parte de tu salario
          desde el mes siguiente) suele compensar ampliamente el coste del
          procedimiento.
        </p>
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
          Cuando hablamos del antes y el después de un procedimiento de Segunda
          Oportunidad solemos pensar solo en los números: cuánta deuda había, cuánta
          deuda queda. Pero el cambio más relevante para nuestros clientes casi
          nunca está en la hoja de cálculo. Está en cómo suena el teléfono cuando
          deja de sonar, en cómo se duerme cuando el cerebro deja de hacer cuentas
          a las tres de la madrugada, en cómo cambia la conversación familiar
          cuando el dinero deja de ser el tema central.
        </p>
        <p>
          También cambia la relación con el sistema financiero. Pasados los plazos
          legales correspondientes, es posible volver a ser titular de cuentas,
          contratar productos básicos y, con el tiempo, reconstruir un historial
          crediticio razonable según los criterios del{" "}
          <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>. La
          cancelación de deudas no es el final del camino: es la línea desde la
          que se puede empezar a construir algo sostenible, como contamos en
          nuestro artículo sobre la{" "}
          <InternalLink to="/blog/vida-despues-deuda">vida después de cancelar la deuda</InternalLink>.
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
          Los manuales clásicos de finanzas personales recomiendan que las cuotas
          mensuales de deuda no superen el 25-30% de los ingresos netos. Cuando se
          atraviesa ese umbral, el presupuesto familiar deja de tener oxígeno: ya
          no se trata solo de pagar deuda, sino de no poder cubrir vivienda,
          suministros, alimentación o transporte sin recurrir a más crédito. Es la
          puerta de entrada al efecto bola de nieve.
        </p>
        <p>
          La cancelación de deudas devuelve ese porcentaje al presupuesto. Por
          poner cifras realistas: una persona con una nómina de mil cuatrocientos
          euros y seiscientos euros mensuales en cuotas de microcréditos y
          tarjetas, recupera casi la mitad de su salario en cuanto se suspenden
          los pagos durante la tramitación. Ese margen permite estabilizar gastos
          básicos, dejar de pedir prestado para llegar a fin de mes y, en muchos
          casos, empezar a ahorrar pequeñas cantidades por primera vez en años.
        </p>
        <BudgetBreakdownStack />
        <p>
          La planificación posterior es igual de importante que el procedimiento
          en sí. Por eso, en Calma, además del trámite legal, acompañamos al
          cliente con pautas sencillas para reorganizar el presupuesto, evitar
          recaer en productos financieros tóxicos y construir un colchón mínimo
          de seguridad que reduzca la dependencia del crédito.
        </p>
      </>
    ),
  },
  {
    id: "coste",
    title: "Cuánto cuesta el procedimiento",
    body: (
      <>
        <p>
          La pregunta sobre el <strong>coste de la Ley de Segunda Oportunidad</strong>
          es legítima y siempre la respondemos con transparencia: no existe un
          precio único, porque cada expediente tiene una complejidad distinta.
          Lo correcto es analizar primero la situación real (número de acreedores,
          tipo de deuda, embargos activos, patrimonio, ingresos) y, a partir de
          ahí, hablar de honorarios con datos concretos en lugar de un eslogan
          publicitario.
        </p>
        <CostFactorsGrid />
        <p>
          Lo verdaderamente relevante es comparar el coste del procedimiento con
          el volumen de deuda que se va a cancelar y con lo que se está pagando
          hoy en intereses, comisiones y cuotas. En la inmensa mayoría de casos,
          el coste total del proceso representa una fracción muy pequeña frente
          a la deuda exonerada, y se recupera en pocos meses gracias al cese de
          los embargos y al ahorro en cuotas mensuales.
        </p>
        <CostVsDebtBars />
        <p>
          En nuestra forma de trabajar, la primera consulta es siempre gratuita y
          el presupuesto se entrega por escrito antes de firmar nada. No cobramos
          por adelantado el total del procedimiento, ni utilizamos fórmulas opacas
          ligadas al volumen de la deuda. Si después del análisis tu caso no
          encaja en el procedimiento, te lo decimos con claridad y te orientamos
          hacia la alternativa más adecuada.
        </p>
      </>
    ),
  },
  {
    id: "proceso",
    title: "Cómo es el procedimiento paso a paso",
    body: (
      <>
        <p>
          Aunque cada caso tiene matices, el <strong>procedimiento de Segunda
          Oportunidad</strong> sigue siempre una estructura clara que conviene
          conocer antes de tomar una decisión. Saber qué fases existen, cuánto
          tarda cada una y qué se espera del cliente en cada momento reduce el
          estrés y permite avanzar con tranquilidad.
        </p>
        <p>
          La primera fase es el análisis previo y la preparación del expediente:
          se reúne la documentación, se cuantifica la deuda total y se diseña la
          estrategia (con o sin plan de pagos, con o sin liquidación de bienes).
          A continuación se presenta la solicitud ante el juzgado competente, que
          la admite a trámite y abre formalmente el procedimiento. Es aquí donde
          se pueden solicitar las medidas cautelares para paralizar embargos.
        </p>
        <p>
          Después llega la fase contradictoria con los acreedores, en la que
          aceptan o discuten el procedimiento, y finalmente la resolución
          judicial que aprueba la <em>Exoneración del Pasivo Insatisfecho</em>.
          A partir de ese momento, las deudas quedan canceladas en los términos
          que el juez establezca.
        </p>
        <ProcessTimeline />
      </>
    ),
  },
  {
    id: "duracion",
    title: "Cuánto tarda el proceso completo",
    body: (
      <>
        <p>
          La duración total de un procedimiento de Segunda Oportunidad depende del
          juzgado, del número de acreedores y de la complejidad patrimonial del
          caso. Como horquilla realista, hablamos de entre seis y dieciocho meses
          desde la presentación de la solicitud hasta la resolución firme de
          exoneración. Algunos juzgados resuelven antes; otros, especialmente en
          provincias muy saturadas, pueden tardar más.
        </p>
        <figure className="overflow-hidden rounded-3xl border border-border shadow-soft">
          <img
            src={personCouple}
            alt="Pareja revisando con calma su nueva etapa sin deudas después de la Segunda Oportunidad"
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </figure>
        <p>
          Lo importante es que no necesitas esperar a la resolución final para
          empezar a notar cambios. Desde el momento en que el juzgado admite a
          trámite el expediente y, sobre todo, una vez aprobadas las medidas
          cautelares, los embargos se suspenden y las llamadas de recobro pierden
          fundamento. En la práctica, el alivio empieza mucho antes de que llegue
          la resolución final.
        </p>
      </>
    ),
  },
  {
    id: "documentacion",
    title: "Qué documentación necesitas",
    body: (
      <>
        <p>
          La documentación inicial necesaria para iniciar un procedimiento de
          Segunda Oportunidad es más sencilla de lo que mucha gente imagina. No
          hace falta tener todas las facturas, ni recopilar cinco años de
          movimientos bancarios. Lo esencial es poder demostrar la situación
          actual de ingresos, deudas y patrimonio, y nosotros nos encargamos
          después de pedir a los acreedores los detalles que falten.
        </p>
        <p>
          Habitualmente trabajamos con DNI, declaraciones de la renta de los
          últimos ejercicios, últimas nóminas o ingresos como autónomo, vida
          laboral, listado aproximado de acreedores con saldos pendientes y
          documentación de cualquier bien relevante (vivienda, vehículo,
          participaciones). En ningún momento se exige una contabilidad
          impecable: se trabaja con lo que el cliente realmente tiene.
        </p>
        <DocumentsChecklist />
        <p>
          Una vez recopilado el expediente, el equipo legal lo organiza, lo
          completa con la información oficial obtenida de Hacienda, Seguridad
          Social y las entidades financieras, y prepara la solicitud judicial.
          A partir de ese momento, las gestiones técnicas y los plazos procesales
          recaen sobre el equipo, no sobre el cliente.
        </p>
      </>
    ),
  },
  {
    id: "mitos",
    title: "Mitos que te están frenando",
    body: (
      <>
        <p>
          La mayoría de personas que finalmente se acogen a la Ley de Segunda
          Oportunidad reconocen lo mismo: podrían haberlo hecho mucho antes. Los
          años de bloqueo casi siempre tienen que ver con mitos que circulan en
          conversaciones informales, foros y vídeos sensacionalistas, y que no
          se corresponden con la realidad legal del procedimiento. Aclararlos
          es, muchas veces, lo único que falta para dar el paso.
        </p>
        <MythVsReality />
        <p>
          A esto se suma una dimensión cultural muy española: la idea de que
          tener deudas es una falta moral. La normativa europea y el espíritu
          de la ley dicen exactamente lo contrario: la{" "}
          <ExtLink href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32019L1023">
            Directiva (UE) 2019/1023 sobre marcos de reestructuración
          </ExtLink>{" "}
          deja claro que la insolvencia es un riesgo natural del sistema
          económico y que debe existir un procedimiento legal para permitir que
          personas honestas vuelvan a empezar. Si quieres explorar antes vías
          intermedias, revisa nuestra guía para{" "}
          <InternalLink to="/blog/renegociar-acreedores">renegociar con tus acreedores</InternalLink>.
          No estás aprovechándote de un atajo; estás usando un derecho.
        </p>
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