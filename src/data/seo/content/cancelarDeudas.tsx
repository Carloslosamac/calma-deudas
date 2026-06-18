import type { MoneyContent } from "./types";
import { A, OptionCards, CheckList, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/person-closeup-man-1.jpg";
import p2 from "@/assets/person-closeup-woman-1.jpg";
import p3 from "@/assets/person-closeup-man-2.jpg";
import p4 from "@/assets/person-closeup-woman-2.jpg";
import p5 from "@/assets/person-closeup-man-3.jpg";
import p6 from "@/assets/person-closeup-woman-3.jpg";
import team1 from "@/assets/team-lawyer-1.jpg";
import team2 from "@/assets/team-lawyer-2.jpg";
import team3 from "@/assets/team-lawyer-3.jpg";
import team4 from "@/assets/team-lawyer-4.jpg";
import team5 from "@/assets/team-lawyer-5.jpg";
import team6 from "@/assets/team-lawyer-6.jpg";

/**
 * Money page "Cancelar deudas". Ángulo acción/resultado: eliminar lo que no
 * puedes pagar. Deriva al hub LSO y a productos abusivos. La versión informativa
 * vive en /cancelacion-de-deudas (enlazada) para no canibalizar.
 */
export const cancelarDeudas: MoneyContent = {
  path: "/cancelar-deudas",
  reviewed: true,
  tone: "transactional",
  layout: [
    "simulator",
    "debtTypes",
    "comparisonTable",
    "benefits",
    "urgencyTimeline",
    "legalTimeline",
    "steps",
    "quiz",
    "metrics",
    "teamCredentials",
    "testimonials",
    "sections",
    "beforeAfter",
    "eligibility",
    "faq",
    "closing",
  ],
  intro: (
    <>
      Quieres que tu deuda <strong>desaparezca</strong>, pero no sabes por dónde empezar.
      Existen varias vías legales y la clave está en <strong>elegir la correcta para tu
      caso</strong>. Te decimos hoy, gratis, cuál es la tuya.
    </>
  ),
  hero: {
    badge: "Cancelar deudas",
    titleLead: "Quieres que tu deuda desaparezca.",
    titleAccent: "Te decimos cómo.",
    subtitle: (
      <>
        No hay una sola forma de eliminar una deuda: cancelar por ley, anular intereses
        abusivos, negociar una quita o reunificar. Lo difícil es saber{" "}
        <strong>cuál encaja contigo</strong>. Lo estudiamos hoy mismo, gratis, y te
        decimos por qué vía tu deuda puede desaparecer.
      </>
    ),
    trustNote: "Respuesta en 24h · Gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Respuesta en 24h · Gratis · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "El resultado, elijas la vía que elijas",
  benefits: [
    {
      icon: "shield",
      title: "Eliminación de la deuda",
      text: "Sea por la vía que sea, el objetivo es el mismo: que la deuda desaparezca y no vuelva.",
    },
    {
      icon: "wallet",
      title: "Recuperas tu sueldo",
      text: "Sin cuotas que te asfixian, tu nómina vuelve a ser tuya para vivir.",
    },
    {
      icon: "phone-off",
      title: "Se acaban las llamadas",
      text: "Paramos la presión de acreedores y empresas de recobro.",
    },
    {
      icon: "gavel",
      title: "Embargos suspendidos",
      text: "Frenamos los embargos en curso, incluido el de la nómina, desde el primer paso.",
    },
    {
      icon: "ban",
      title: "Salida del ASNEF",
      text: "Limpiamos tus datos de los ficheros de morosos para que vuelvas a empezar.",
    },
    {
      icon: "sparkles",
      title: "Empiezas de cero",
      text: "Recuperas la tranquilidad y el control de tus finanzas sin esa carga.",
    },
  ],
  testimonialsTitle: "Personas que ya cancelaron sus deudas",
  testimonialsSubtitle:
    "Casos reales de personas que dejaron de pagar lo que la ley les permitía cancelar.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    {
      name: "Iván T.",
      amount: "37.420 €",
      location: "Madrid",
      text: "Tarjetas y dos préstamos personales. Hoy no debo nada y vuelvo a llegar a fin de mes.",
      photo: p1,
    },
    {
      name: "Sara M.",
      amount: "21.960 €",
      location: "Murcia",
      text: "Microcréditos que se multiplicaban. Los cancelé todos y recuperé mi nómina.",
      photo: p2,
    },
    {
      name: "Andrés L.",
      amount: "45.180 €",
      location: "Valencia",
      text: "Deudas con varios bancos. Empecé de cero y dejé atrás las llamadas constantes.",
      photo: p3,
    },
    {
      name: "Nuria P.",
      amount: "28.300 €",
      location: "Sevilla",
      text: "Préstamos personales que me ahogaban. Hoy tengo margen para vivir y para mis hijos.",
      photo: p4,
    },
    {
      name: "Carlos H.",
      amount: "52.040 €",
      location: "Bilbao",
      text: "Acumulé deuda con cinco financieras. Lo cancelé todo y se acabó la presión.",
      photo: p5,
    },
    {
      name: "Beatriz V.",
      amount: "24.870 €",
      location: "Zaragoza",
      text: "Tarjetas revolving que crecían cada mes. Las cancelé y recuperé la tranquilidad.",
      photo: p6,
    },
  ],
  stepsTitle: "De no saber qué hacer a tu deuda eliminada",
  stepsSubtitle: "Cuatro pasos claros, sin que tengas que decidir solo",
  steps: [
    {
      title: "Diagnóstico gratuito",
      text: "Analizamos tus deudas e ingresos para ver qué vías encajan con tu caso.",
    },
    {
      title: "Elegimos la vía correcta",
      text: "Comparamos cancelar, reclamar, negociar o reunificar y te decimos cuál te conviene.",
    },
    {
      title: "Inicio del proceso",
      text: "Ponemos en marcha la cancelación y frenamos la presión de los acreedores.",
    },
    {
      title: "Deuda eliminada",
      text: "Te quitas la carga y empiezas de cero.",
      highlight: true,
    },
  ],
  metrics: [
    { value: "Hasta 100%", label: "De tus deudas, canceladas para siempre" },
    { value: "+19.000", label: "Familias ya libres de deudas en España" },
    { value: "Gratis", label: "Sabes hoy mismo cuánto puedes dejar de pagar" },
  ],
  eligibility: {
    title: "¿Puede desaparecer mi deuda?",
    intro: (
      <>
        Casi siempre hay una vía para eliminar la deuda; lo que cambia es cuál. Si te
        reconoces en estos puntos, lo más probable es que podamos hacerla desaparecer.
        Lo confirmamos gratis.
      </>
    ),
    requirements: [
      "No puedes pagar tus deudas con tus ingresos actuales.",
      "Actúas de buena fe: no has ocultado bienes ni provocado tu insolvencia de forma fraudulenta.",
      "Tus deudas vienen de préstamos, tarjetas, microcréditos o proveedores (no solo de sanciones).",
      "Eres particular o autónomo.",
    ],
    trustTitle: "Contenido revisado por abogado",
    trustText: "Actualizado según la última reforma concursal.",
  },
  closing: {
    title: "No necesitas saber la vía. Solo dar el primer paso",
    text: "Tú nos cuentas tu situación y nosotros te decimos por dónde tu deuda puede desaparecer. Mientras lo piensas, los intereses crecen y los embargos avanzan. Pide tu estudio gratis ahora.",
  },
  interactive: {
    legalTimeline: {
      title: "Cómo es el proceso, paso a paso",
      subtitle: "Tú no decides solo: te guiamos desde el primer día hasta que la deuda desaparece.",
      phases: [
        {
          title: "Diagnóstico gratuito",
          duration: "24-48h",
          text: "Analizamos tus deudas, tus ingresos y de dónde viene cada una. Sin coste ni compromiso.",
        },
        {
          title: "Elegimos la vía correcta",
          duration: "Semana 1",
          text: "Comparamos cancelar (LSO), reclamar, reunificar o refinanciar y te decimos cuál elimina más deuda en tu caso.",
        },
        {
          title: "Puesta en marcha",
          duration: "Variable",
          text: "Iniciamos el procedimiento elegido y frenamos llamadas, reclamaciones y embargos en curso.",
        },
        {
          title: "Deuda eliminada",
          duration: "Resolución",
          text: "Tu deuda desaparece por la vía adecuada y empiezas de cero, con tranquilidad.",
        },
      ],
    },
    teamCredentials: {
      title: "El equipo que elige la vía correcta por ti",
      subtitle:
        "No eres un número de expediente. Un equipo de abogados especialistas en insolvencia analiza tu caso y lleva el procedimiento de principio a fin.",
      members: [
        { name: "Marta Belmonte", role: "Socia directora", credential: "Abogada colegiada · 15 años en insolvencia", photo: team1 },
        { name: "Javier Ferrer", role: "Abogado concursal sénior", credential: "Especialista en exoneración del pasivo", photo: team2 },
        { name: "Lucía Ordóñez", role: "Abogada de admisión", credential: "Diagnóstico y viabilidad del caso", photo: team3 },
        { name: "Andrés Solís", role: "Responsable de litigación", credential: "Representación ante el juzgado", photo: team4 },
        { name: "Sara Belda", role: "Abogada de litigación", credential: "Oposición a embargos y ejecuciones", photo: team5 },
        { name: "Nuria Cano", role: "Atención al cliente", credential: "Acompañamiento durante todo el proceso", photo: team6 },
      ],
      highlights: [
        "+19.000 familias sin deudas",
        "Abogados colegiados",
        "Presupuesto cerrado desde el inicio",
      ],
    },
    simulator: {
      title: "¿Cuánta deuda podrías cancelar?",
      subtitle: "Mueve los controles y compara qué hace cada solución con tu deuda y tu cuota.",
      maxDebt: 120000,
      maxMonthly: 2000,
      defaultDebt: 22000,
      defaultMonthly: 400,
      compareSolutions: true,
    },
    comparisonTable: {
      title: "¿Qué solución te conviene?",
      subtitle:
        "No todas las deudas se eliminan igual. Esta es la guía rápida para situarte; tu caso lo confirmamos gratis.",
      columns: [
        { title: "LSO", highlight: true },
        { title: "Reunificar" },
        { title: "Reclamación judicial" },
        { title: "Refinanciar" },
      ],
      rows: [
        {
          feature: "Cuándo encaja",
          values: [
            "No puedes pagar y no tienes bienes de valor",
            "No puedes pagar pero tienes bienes que proteger (o aún pagas)",
            "Intereses o cláusulas abusivas",
            "Quieres mejores condiciones",
          ],
        },
        {
          feature: "Con bienes de valor pagados",
          values: ["Pueden liquidarse", "Los protege", "no", "no"],
        },
        {
          feature: "Qué pasa con la deuda",
          values: ["Se cancela entera", "Se agrupa", "Se anula la abusiva", "Se rebaja la cuota"],
        },
        {
          feature: "¿Sigues pagando?",
          values: ["no", "sí", "no", "sí"],
        },
        {
          feature: "Para deuda pública",
          values: ["sí", "no", "no", "no"],
        },
        {
          feature: "Plazo aproximado",
          values: ["6-18 meses", "Inmediato", "Meses", "Semanas"],
        },
        {
          feature: "Resultado",
          values: ["Empiezas de cero", "Una sola cuota", "Deuda anulada", "Cuota más baja"],
        },
      ],
    },
    debtTypesTitle: "¿En qué situación estás?",
    debtTypesSubtitle: "Elige la que más se parece a la tuya y te decimos por dónde tu deuda puede desaparecer.",
    debtTypes: [
      {
        label: "Ya no puedo pagar nada",
        message:
          "Si tus ingresos no cubren las cuotas, la vía más potente es cancelar toda la deuda con la Ley de Segunda Oportunidad.",
        to: "/ley-segunda-oportunidad",
        linkLabel: "Cancelar con la Ley de Segunda Oportunidad",
      },
      {
        label: "No puedo pagar, pero tengo bienes (casa/terreno pagado)",
        message:
          "Si tienes vivienda u otros bienes de valor totalmente pagados, la LSO podría liquidarlos: reunificar suele proteger ese patrimonio agrupando todo en una sola cuota.",
        to: "/reunificar-deudas",
        linkLabel: "Ver reunificación de deudas",
      },
      {
        label: "Mis intereses son altísimos",
        message:
          "Tarjetas revolving y microcréditos suelen tener intereses abusivos: muchas veces la deuda se anula por usura.",
        to: "/tarjetas-revolving/cancelar-tarjetas-revolving",
        linkLabel: "Anular tarjetas revolving por usura",
      },
      {
        label: "Tengo deuda con Hacienda / SS",
        message:
          "La deuda pública también se exonera, con ciertos límites. Te decimos cuánto puedes eliminar en tu caso.",
        to: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho",
        linkLabel: "Exoneración del pasivo insatisfecho",
      },
      {
        label: "Me reclaman o me embargan",
        message:
          "Si ya hay reclamación judicial o embargo, hay que actuar rápido: podemos frenarlo y cancelar la deuda de fondo.",
        to: "/microcreditos-prestamos/cancelar-microcreditos",
        linkLabel: "Cómo cancelar microcréditos",
      },
      {
        label: "No sé por dónde empezar",
        message:
          "Lo más habitual: varias deudas y mil dudas. Estudiamos tu caso gratis y elegimos la mejor vía por ti.",
        to: "/cancelacion-de-deudas",
        linkLabel: "Guía de cancelación de deudas",
      },
    ],
    urgencyTimeline: {
      title: "Qué pasa si no eliges una salida",
      subtitle: "Cuanto más esperas, más caro y más difícil. Esta es la línea que sigue una deuda sin solución.",
      items: [
        {
          time: "Hoy",
          title: "Los intereses siguen creciendo",
          text: "Cada mes que pasa, la deuda es mayor y tu margen para vivir, menor.",
        },
        {
          time: "Semanas",
          title: "Reclamaciones y recobro",
          text: "Llamadas, cartas y empresas de recobro presionando para que pagues.",
        },
        {
          time: "Meses",
          title: "Demanda y juicio monitorio",
          text: "El acreedor reclama judicialmente la deuda y se acumulan costas.",
          danger: true,
        },
        {
          time: "Después",
          title: "Embargo de nómina y cuentas",
          text: "Se traba tu sueldo y tus cuentas. Evitarlo es mucho más fácil antes de llegar aquí.",
          danger: true,
        },
      ],
    },
    quiz: {
      title: "¿Cuál es tu vía? Descúbrelo",
      subtitle: "4 preguntas rápidas para orientarte. Sin dar tus datos.",
      questions: [
        { text: "¿No puedes pagar tus deudas con tus ingresos actuales?", goodAnswer: "yes" },
        { text: "¿Tus deudas suman más de 5.000 €?", goodAnswer: "yes" },
        { text: "¿Vienen de préstamos, tarjetas o microcréditos (no solo sanciones)?", goodAnswer: "yes" },
        { text: "¿Tienes vivienda u otros bienes de valor totalmente pagados?", goodAnswer: "no" },
        { text: "¿Has ocultado bienes o provocado tu insolvencia a propósito?", goodAnswer: "no" },
      ],
      resultPass: {
        title: "Tu deuda puede desaparecer",
        text: "Tu perfil encaja con las vías para eliminar deuda. Pide tu estudio gratis y te decimos exactamente cuál es la tuya y cuánto puedes borrar.",
      },
      resultDoubt: {
        title: "Seguramente hay una vía para ti",
        text: "Si tienes bienes de valor pagados, cancelar con la LSO podría liquidarlos y quizá te convenga más reunificar para protegerlos. Lo resolvemos gratis en 24h y te decimos la vía exacta.",
      },
    },
    beforeAfter: {
      title: "Antes y después de elegir tu salida",
      subtitle: "La diferencia entre seguir atrapado y dejar que la deuda desaparezca.",
      beforeLabel: "Hoy, con deudas",
      afterLabel: "Después, con Calma",
      before: [
        "Cuotas que se comen tu sueldo",
        "Llamadas y cartas de acreedores",
        "Intereses que no paran de crecer",
        "Miedo constante a un embargo",
        "Sin margen para vivir",
      ],
      after: [
        "Deudas canceladas legalmente",
        "Recuperas tu nómina",
        "Se acaban las llamadas y la presión",
        "Embargos suspendidos durante el proceso",
        "Empiezas de cero, con tranquilidad",
      ],
    },
  },
  sections: [
    {
      title: "¿Por dónde empiezo?",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            Si te sientes perdido, hazte estas tres preguntas. La respuesta te acerca a la
            vía que mejor encaja contigo:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>¿Puedes pagar algo cada mes?</strong> Si <strong>sí</strong>, valora{" "}
              <A to="/reunificar-deudas">reunificar</A> en una sola cuota. Si <strong>no</strong>,
              y <strong>no tienes bienes de valor pagados</strong>, tu vía es cancelar con la{" "}
              <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>; si tienes vivienda o
              terreno pagado, suele convenir <A to="/reunificar-deudas">reunificar</A> para
              protegerlo.
            </li>
            <li>
              <strong>¿Tus intereses son altísimos?</strong> En{" "}
              <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">tarjetas revolving</A> y{" "}
              <A to="/microcreditos-prestamos/cancelar-microcreditos">microcréditos</A> muchas
              veces la deuda se anula por usura.
            </li>
            <li>
              <strong>¿Ya te reclaman o te embargan?</strong> Hay que actuar rápido: podemos
              frenarlo y atacar la deuda de fondo.
            </li>
          </ul>
          <p>
            No tienes que acertar tú. Cuéntanos tu situación y lo resolvemos gratis. Si
            prefieres entenderlo a fondo antes, lee la guía de{" "}
            <A to="/cancelacion-de-deudas">cancelación de deudas</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Las 4 vías para que tu deuda desaparezca",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">
            No existe una sola forma de eliminar una deuda. Según tu situación, la salida
            puede ser una de estas cuatro:
          </p>
          <OptionCards
            columns={2}
            items={[
              {
                icon: "scale",
                title: "Cancelar con la LSO",
                text: "Cuando no puedes pagar, se cancela la deuda entera, incluida la pública con límites.",
                links: <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>,
              },
              {
                icon: "wallet",
                title: "Reunificar",
                text: "Agrupar todo en una sola cuota asumible si todavía puedes pagar.",
                links: <A to="/reunificar-deudas">Reunificar deudas</A>,
              },
              {
                icon: "gavel",
                title: "Reclamación judicial",
                text: "En revolving y microcréditos con intereses abusivos, se anula la deuda total o parcialmente ante el juzgado.",
                links: (
                  <>
                    <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">Revolving</A>
                    <A to="/microcreditos-prestamos/cancelar-microcreditos">Microcréditos</A>
                  </>
                ),
              },
              {
                icon: "landmark",
                title: "Refinanciar",
                text: "Renegociar con el banco para rebajar cuota e intereses cuando aún puedes pagar pero las condiciones te ahogan.",
              },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            Si quieres entender a fondo las vías legales, plazos y requisitos, lee nuestra
            guía de <A to="/cancelacion-de-deudas">cancelación de deudas</A>.
          </p>
        </div>
      ),
    },
    {
      title: "¿Cómo sé cuál es la mía?",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">
            La vía correcta depende de tres cosas: <strong>cuánto puedes pagar</strong>,{" "}
            <strong>si tienes bienes de valor pagados</strong> y{" "}
            <strong>de dónde viene la deuda</strong>. Como guía rápida:
          </p>
          <CheckList
            items={[
              <>Si <strong>no puedes pagar nada y no tienes bienes de valor</strong> → cancelar con la <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A>.</>,
              <>Si <strong>no puedes pagar pero tienes vivienda o terreno pagado</strong> → <A to="/reunificar-deudas">reunificar</A> para no arriesgar esos bienes en una liquidación.</>,
              <>Si tus <strong>intereses son abusivos</strong> y la deuda es contenida → anular por usura.</>,
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            No tienes que acertar tú: en el diagnóstico gratuito comparamos las vías
            contigo y elegimos la que más deuda elimina en tu caso.
          </p>
        </div>
      ),
    },
    {
      title: "Cancelar vs reunificar vs reclamar",
      body: (
        <div className="space-y-4 text-base leading-relaxed text-foreground/85">
          <p>
            <strong>Cancelar</strong> hace desaparecer la deuda cuando ya no puedes pagar.{" "}
            <strong>Reclamar</strong> por usura la anula si los intereses son abusivos.{" "}
            <A to="/reunificar-deudas">Reunificar</A> no la elimina, pero la convierte en una
            sola cuota más baja si todavía puedes pagar. La peor opción casi siempre es no
            elegir ninguna: en el diagnóstico gratuito te decimos cuál encaja mejor contigo,
            sin compromiso.
          </p>
        </div>
      ),
    },
    {
      title: "Coste y plazos por vía",
      body: (
        <div className="space-y-5">
          <FactGrid
            items={[
              { value: "Casi inmediata", label: "Reunificación", detail: "Una sola cuota en cuanto se aprueba la operación." },
              { value: "Meses", label: "Reclamación por usura", detail: "Anulación de intereses, muchas veces sin juicio." },
              { value: "6–18 meses", label: "Ley de Segunda Oportunidad", detail: "Los embargos se suspenden mucho antes del final." },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            El <strong>diagnóstico inicial es gratuito</strong>. Si sigues adelante, te damos
            un presupuesto cerrado desde el principio, con opción de pago fraccionado.
          </p>
        </div>
      ),
    },
    {
      title: "Nuestro compromiso contigo",
      body: (
        <div className="space-y-5">
          <p className="text-base leading-relaxed text-foreground/85">Antes de decidir nada, queremos que lo tengas todo claro:</p>
          <CheckList
            items={[
              <><strong>Diagnóstico gratuito</strong> y sin compromiso: primero estudiamos tu caso.</>,
              <><strong>Respuesta en 24h</strong> con una idea clara de qué vía te conviene.</>,
              <><strong>Contenido y casos revisados por abogado</strong> especialista en insolvencia.</>,
              <><strong>Presupuesto cerrado desde el inicio</strong>, con opción de pago fraccionado.</>,
              <><strong>Sin letra pequeña:</strong> nada se pone en marcha sin que lo entiendas y lo apruebes.</>,
            ]}
          />
        </div>
      ),
    },
  ],
  faq: [
    {
      q: "No sé qué vía me conviene, ¿cómo lo decido?",
      a: (
        <>No tienes que decidirlo tú. En el diagnóstico gratuito analizamos cuánto puedes pagar y de dónde viene tu deuda, comparamos las vías (cancelar, reclamar, negociar o reunificar) y te decimos cuál elimina más deuda en tu caso.</>
      ),
      plain:
        "No tienes que decidirlo tú. En el diagnóstico gratuito analizamos cuánto puedes pagar y de dónde viene tu deuda, comparamos las vías (cancelar, reclamar, negociar o reunificar) y te decimos cuál elimina más deuda en tu caso.",
    },
    {
      q: "¿Qué deudas puedo eliminar?",
      a: (
        <>La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites.</>
      ),
      plain:
        "La mayoría de deudas con bancos, financieras, tarjetas, microcréditos, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social se cancela con límites.",
    },
    {
      q: "¿Y si me equivoco de vía?",
      a: (
        <>No vas a elegir a ciegas: la vía la definimos nosotros tras estudiar tu caso, y solo seguimos adelante cuando tiene sentido para ti. Si tu situación cambia, reorientamos la estrategia.</>
      ),
      plain:
        "No vas a elegir a ciegas: la vía la definimos nosotros tras estudiar tu caso, y solo seguimos adelante cuando tiene sentido para ti. Si tu situación cambia, reorientamos la estrategia.",
    },
    {
      q: "¿Cuánto cuesta eliminar mis deudas?",
      a: (
        <>El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado y opción de pago fraccionado.</>
      ),
      plain:
        "El primer diagnóstico es gratuito. Si sigues adelante, trabajamos con un presupuesto cerrado y opción de pago fraccionado.",
    },
    {
      q: "¿Es mejor cancelar o reunificar?",
      a: (
        <>Si ya no puedes pagar, lo habitual es cancelar. Si aún puedes asumir una cuota, reunificar puede ayudarte. Lo valoramos gratis en tu caso.</>
      ),
      plain:
        "Si ya no puedes pagar, lo habitual es cancelar. Si aún puedes asumir una cuota, reunificar puede ayudarte. Lo valoramos gratis en tu caso.",
    },
    {
      q: "¿Cuánto tarda?",
      a: (
        <>Depende de la vía. Una reclamación por usura es más rápida; la Ley de Segunda Oportunidad suele tardar de 6 a 18 meses, con embargos suspendidos antes.</>
      ),
      plain:
        "Depende de la vía. Una reclamación por usura es más rápida; la Ley de Segunda Oportunidad suele tardar de 6 a 18 meses, con embargos suspendidos antes.",
    },
  ],
};