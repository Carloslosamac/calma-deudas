import type { MoneyContent } from "./types";
import { A, KeyCallout, FactGrid } from "@/components/seo/modules";
import p1 from "@/assets/casos/revolving-1.jpg";
import p2 from "@/assets/casos/revolving-2.jpg";
import p3 from "@/assets/casos/revolving-3.jpg";
import p4 from "@/assets/casos/revolving-4.jpg";
import p5 from "@/assets/casos/revolving-5.jpg";
import p6 from "@/assets/casos/revolving-6.jpg";

/**
 * Money page "Cancelar tarjetas revolving". Ángulo usura: intereses abusivos.
 * Módulo exclusivo: calculadora de usura. Deriva a microcréditos y ASNEF.
 */
export const cancelarTarjetasRevolving: MoneyContent = {
  path: "/tarjetas-revolving/cancelar-tarjetas-revolving",
  reviewed: true,
  tone: "transactional",
  layout: [
    "usuryCalculator",
    "benefits",
    "steps",
    "quiz",
    "metrics",
    "testimonials",
    "sections",
    "eligibility",
    "faq",
    "beforeAfter",
    "closing",
  ],
  intro: (
    <>
      Las <strong>tarjetas revolving</strong> aplican intereses tan altos que la deuda casi no
      baja por mucho que pagues. Cuando la TAE es desproporcionada, se consideran usura y la
      deuda puede anularse. Revisamos tu contrato gratis.
    </>
  ),
  hero: {
    badge: "Cancelar tarjetas revolving",
    titleLead: "Tu revolving es usura:",
    titleAccent: "puedes cancelarla.",
    subtitle: (
      <>
        Si tu tarjeta tiene una TAE desproporcionada, los tribunales la consideran usura y la
        deuda puede <strong>anularse</strong>, además de recuperar lo pagado de más. Revisamos
        tu contrato gratis y sin compromiso.
      </>
    ),
    trustNote: "Revisión gratis · Sin compromiso",
  },
  socialProof: {
    rating: "4,8",
    ratingCount: "+1.200 valoraciones",
    casesLabel: "+19.000 familias sin deudas",
    trustSeal: "Revisión gratis · Respuesta en 24h · Sin compromiso",
    mediaLabel: "Han hablado de nosotros",
  },
  benefitsTitle: "Qué consigues al reclamar tu revolving",
  benefits: [
    { icon: "shield", title: "Anulación de la deuda", text: "Si hay usura, el contrato se anula y solo debes el capital prestado, no los intereses." },
    { icon: "wallet", title: "Recuperas lo pagado de más", text: "Puedes recuperar los intereses abusivos que ya has abonado." },
    { icon: "scale", title: "Respaldo del Supremo", text: "La jurisprudencia ampara la nulidad de las revolving con interés desproporcionado." },
    { icon: "ban", title: "Salida del ASNEF", text: "Al anularse la deuda, desaparece el motivo de tu inclusión en ficheros de morosos." },
    { icon: "phone-off", title: "Se acaban los recobros", text: "Frenamos las llamadas de la financiera y de las empresas de recobro." },
    { icon: "sparkles", title: "Cierras el agujero", text: "Dejas de alimentar una deuda que no bajaba por mucho que pagaras." },
  ],
  testimonialsTitle: "Personas que cancelaron su revolving",
  testimonialsSubtitle: "Casos reales de tarjetas anuladas por intereses abusivos.",
  testimonialsMoreHref: "/ley-segunda-oportunidad/casos",
  testimonials: [
    { name: "Cristina R.", amount: "6.750 €", location: "Valencia", text: "Tenía dos revolving y pagaba sin que bajaran. Recuperé parte de lo pagado de más.", photo: p1 },
    { name: "David P.", amount: "9.300 €", location: "Madrid", text: "Pagaba cada mes y la deuda seguía igual. La anularon por usura y dejé de deber.", photo: p2 },
    { name: "Sergio M.", amount: "12.100 €", location: "Sevilla", text: "Llevaba años atrapado con la tarjeta. La TAE era abusiva y se canceló entera.", photo: p3 },
    { name: "Laura T.", amount: "4.980 €", location: "Bilbao", text: "No sabía que era ilegal cobrar tanto interés. La reclamación salió adelante.", photo: p4 },
    { name: "Marta D.", amount: "7.420 €", location: "Málaga", text: "Una sola tarjeta que no terminaba nunca. La declararon usuraria y respiré.", photo: p5 },
    { name: "Antonio G.", amount: "11.250 €", location: "Zaragoza", text: "Devolví solo el capital prestado. Los intereses abusivos se anularon por completo.", photo: p6 },
  ],
  stepsTitle: "Cómo cancelamos tu tarjeta revolving",
  stepsSubtitle: "Cuatro pasos, empezando por revisar tu contrato",
  steps: [
    { title: "Revisión gratuita", text: "Analizamos la TAE y las condiciones de tu tarjeta para ver si hay usura." },
    { title: "Reclamación", text: "Reclamamos a la financiera la nulidad por intereses abusivos." },
    { title: "Vía judicial si hace falta", text: "Si no acceden, lo llevamos al juzgado con la jurisprudencia a favor." },
    { title: "Deuda anulada", text: "Dejas de pagar intereses abusivos y recuperas lo cobrado de más.", highlight: true },
  ],
  metrics: [
    { value: "Hasta 100%", label: "De los intereses, anulables si hay usura" },
    { value: "Gratis", label: "Revisamos tu contrato sin compromiso" },
    { value: "+19.000", label: "Familias ya libres de deudas" },
  ],
  eligibility: {
    title: "¿Mi tarjeta es usura?",
    intro: (
      <>
        Si la TAE de tu revolving es muy superior al interés medio de mercado, es muy probable
        que sea usura. Esto es lo que revisamos gratis:
      </>
    ),
    requirements: [
      "Tienes (o tuviste) una tarjeta revolving o de pago aplazado.",
      "La TAE ronda o supera el 20-26%.",
      "La deuda apenas baja por mucho que pagas.",
      "Conservas el contrato o los extractos (si no, los pedimos por ti).",
    ],
    trustTitle: "Jurisprudencia a tu favor",
    trustText: "El Tribunal Supremo ha anulado numerosas revolving por usura.",
  },
  closing: {
    title: "Cada cuota alimenta una deuda que no baja",
    text: "Si tu revolving es usura, no tienes por qué seguir pagándola. Pide tu revisión gratis y descúbrelo hoy.",
  },
  interactive: {
    usuryCalculator: {
      title: "¿Cuánto pagas de más con tu revolving?",
      subtitle: "Compara el interés de tu tarjeta con el de referencia legal.",
      legalApr: 20,
      cardApr: 26,
      defaultBalance: 3000,
      maxBalance: 15000,
    },
    quiz: {
      title: "¿Puedes anular tu revolving? Descúbrelo",
      subtitle: "4 preguntas rápidas. Sin dar tus datos.",
      questions: [
        { text: "¿Tu tarjeta es revolving o de pago aplazado?", goodAnswer: "yes" },
        { text: "¿La TAE ronda o supera el 20%?", goodAnswer: "yes" },
        { text: "¿La deuda casi no baja aunque pagas?", goodAnswer: "yes" },
        { text: "¿Estás en insolvencia (no puedes pagar el resto de tus deudas)?", goodAnswer: "no" },
        { text: "¿La contrataste hace menos de un mes?", goodAnswer: "no" },
      ],
      resultPass: { title: "Tu tarjeta podría ser usura", text: "Tu caso encaja con las revolving que se anulan. Pide tu revisión gratis ahora." },
      resultDoubt: { title: "Vale la pena revisarlo", text: "Muchas revolving se anulan aunque no lo parezca. Y si estás en insolvencia con varias deudas, quizá te convenga más la Ley de Segunda Oportunidad que reclamar solo esta tarjeta. Lo revisamos gratis en 24h." },
    },
    beforeAfter: {
      title: "Antes y después de reclamar",
      subtitle: "Lo que cambia al anular una revolving abusiva.",
      beforeLabel: "Con la revolving",
      afterLabel: "Después, con Calma",
      before: ["Intereses que devoran tu pago", "Deuda que no baja", "Riesgo de entrar en ASNEF", "Llamadas de la financiera", "Sensación de no salir nunca"],
      after: ["Intereses abusivos anulados", "Solo devuelves el capital", "Recuperas lo pagado de más", "Se acaban los recobros", "Cierras el agujero"],
    },
  },
  sections: [
    {
      title: "¿Qué es una tarjeta revolving y por qué es peligrosa?",
      body: (
        <KeyCallout
          eyebrow="En una frase"
          headline={
            <>
              Pagas una cuota pequeña, pero la deuda{" "}
              <span className="text-accent-deep">apenas baja</span>.
            </>
          }
        >
          <p>La revolving es una tarjeta de crédito con pago aplazado e intereses tan altos que puedes pasar años pagando sin reducir el saldo.</p>
          <p>Cuando la TAE es desproporcionada, la ley la considera <strong>usura</strong> y el contrato es nulo.</p>
        </KeyCallout>
      ),
    },
    {
      title: "Qué puedes recuperar al anularla",
      body: (
        <div className="space-y-5">
          <FactGrid
            items={[
              { value: "Solo capital", label: "Lo que debes", detail: "Tras la nulidad respondes solo por el capital dispuesto." },
              { value: "Se devuelve", label: "Intereses y comisiones", detail: "Lo pagado de más se devuelve o se descuenta." },
              { value: "La diferencia", label: "Si ya pagaste de más", detail: "Recuperas todo lo abonado por encima del capital." },
            ]}
          />
          <p className="text-base leading-relaxed text-foreground/85">
            ¿Tienes también microcréditos? Mira cómo <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelar microcréditos</A>.
          </p>
        </div>
      ),
    },
    {
      title: "Coste y plazos de la reclamación",
      body: (
        <FactGrid
          items={[
            { value: "Gratis", label: "Revisión inicial", detail: "Estudiamos tu contrato sin coste ni compromiso." },
            { value: "Extrajudicial", label: "Muchos casos", detail: "Muchas entidades aceptan la nulidad sin llegar a juicio." },
            { value: "Favorable", label: "Jurisprudencia", detail: "Si hay que litigar, los criterios del Supremo te respaldan." },
          ]}
        />
      ),
    },
  ],
  faq: [
    { q: "¿Cuándo es usura una revolving?", a: (<>Cuando la TAE es notablemente superior al interés medio de mercado del momento de la contratación. El Tribunal Supremo ha fijado este criterio.</>), plain: "Cuando la TAE es notablemente superior al interés medio de mercado del momento de la contratación. El Tribunal Supremo ha fijado este criterio." },
    { q: "¿Puedo reclamar si ya cancelé la tarjeta?", a: (<>Sí. Aunque ya no la uses o la hayas terminado de pagar, puedes reclamar los intereses abusivos abonados.</>), plain: "Sí. Aunque ya no la uses o la hayas terminado de pagar, puedes reclamar los intereses abusivos abonados." },
    { q: "¿Qué recupero si gano?", a: (<>Dejas de deber los intereses y solo respondes por el capital dispuesto. Lo pagado de más se devuelve o se descuenta.</>), plain: "Dejas de deber los intereses y solo respondes por el capital dispuesto. Lo pagado de más se devuelve o se descuenta." },
    { q: "¿La revisión tiene coste?", a: (<>No. Revisamos tu contrato gratis y sin compromiso.</>), plain: "No. Revisamos tu contrato gratis y sin compromiso." },
  ],
};