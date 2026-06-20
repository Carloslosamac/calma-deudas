import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Entity } from "@/data/seo/entities";
import { getEntityProfile, type EntityProfile } from "@/data/seo/content/entityProfiles";
import CtaButton from "@/components/seo/CtaButton";
import KeyCallout from "@/components/seo/modules/KeyCallout";
import CheckList from "@/components/seo/modules/CheckList";
import EntityRating from "@/components/seo/modules/EntityRating";
import { getEntityRating } from "@/data/seo/content/entityRatings";
import { ShieldCheck, XCircle, CheckCircle2 } from "lucide-react";

/**
 * Contenido real de las fichas de entidad (banco, recobro, microcrédito, revolving).
 * Se genera por plantillas según `entity.kind`, personalizando con el nombre y, si
 * existe, una nota específica de la entidad. Mismo patrón que hubContent:
 * `body: ReactNode` para la UI + `plain` para el JSON-LD FAQPage.
 */

export type EntitySection = { title: string; body: ReactNode };
export type EntityFaq = { q: string; a: ReactNode; plain: string };
export type EntityContent = {
  intro: ReactNode;
  sections: EntitySection[];
  faq: EntityFaq[];
};

const A = ({ to, children }: { to: string; children: ReactNode }) => (
  <Link to={to} className="font-medium text-accent-deep underline-offset-4 hover:underline">
    {children}
  </Link>
);
const P = ({ children }: { children: ReactNode }) => (
  <p className="text-base leading-relaxed text-muted-foreground">{children}</p>
);
const UL = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
    {items.map((it, i) => (
      <li key={i} className="flex gap-2">
        <span aria-hidden className="mt-2 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

/** CTA cálido reutilizable dentro de una sección (siempre lleva a #hero-form). */
const InlineCta = ({ label = "Cuéntanos tu caso, sin compromiso" }: { label?: string }) => (
  <div className="mt-6">
    <CtaButton>{label}</CtaButton>
    <p className="mt-2 text-sm text-muted-foreground">
      Gratis y confidencial. Te decimos con calma qué se puede hacer en tu caso.
    </p>
  </div>
);

/** Par "mito vs realidad" para desmontar miedos falsos. */
type Myth = { myth: ReactNode; reality: ReactNode };
const MythReality = ({ items }: { items: Myth[] }) => (
  <div className="space-y-4">
    {items.map((m, i) => (
      <div key={i} className="rounded-3xl border border-border bg-surface-elevated p-5 shadow-soft md:p-6">
        <p className="flex items-start gap-3 text-base leading-relaxed text-foreground/70">
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-orange-deep" aria-hidden />
          <span><span className="font-semibold text-foreground">Lo que temes:</span> {m.myth}</span>
        </p>
        <p className="mt-3 flex items-start gap-3 text-base leading-relaxed text-foreground/85">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" aria-hidden />
          <span><span className="font-semibold text-foreground">La realidad:</span> {m.reality}</span>
        </p>
      </div>
    ))}
  </div>
);

/** Bloque de tranquilidad emocional: primera sección de toda ficha. */
/**
 * Hash determinista por slug para rotar variantes de copy y evitar que los
 * bloques emocionales sean clones literales entre las 100+ fichas (duplicate content).
 */
const slugIndex = (slug: string, mod: number): number => {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h % mod;
};

/** Bloque de tranquilidad emocional: primera sección de toda ficha (con variantes). */
const calmSection = (e: Entity): EntitySection => {
  const headlines: ReactNode[] = [
    <>Deber dinero a {e.name} <span className="text-accent-deep">no te define</span>, y tampoco es el final del camino.</>,
    <>Tener una deuda con {e.name} no te convierte en mal pagador: <span className="text-accent-deep">te convierte en alguien que busca soluciones</span>.</>,
    <>El problema con {e.name} <span className="text-accent-deep">tiene salida</span>, aunque ahora mismo no la veas.</>,
  ];
  const bodies: ReactNode[] = [
    "Sabemos el nudo en el estómago cada vez que suena el teléfono o llega una carta. Miles de personas han pasado por exactamente lo mismo y hoy duermen tranquilas. Tu situación tiene salida y nosotros te acompañamos en cada paso.",
    "Vivir pendiente del teléfono y del buzón agota. No estás solo/a: cada día acompañamos a personas en tu misma situación que hoy han recuperado la calma. Lo primero es entender tus opciones reales, sin presión.",
    "El agobio que sientes es normal, pero no significa que no haya salida. Personas con deudas iguales o mayores que la tuya las han dejado atrás. Te explicamos con calma qué se puede hacer en tu caso concreto.",
  ];
  const i = slugIndex(e.slug, 3);
  return {
    title: "Respira: tu deuda tiene solución",
    body: (
      <>
        <KeyCallout eyebrow="No estás solo/a" headline={headlines[i]}>
          <p>{bodies[i]}</p>
        </KeyCallout>
        <InlineCta />
      </>
    ),
  };
};

/** Bloque de autoridad "Por qué Calma": cierre persuasivo de toda ficha. */
/** Bloque de autoridad "Por qué Calma": cierre persuasivo de toda ficha (con variantes). */
const calmaSection = (e: Entity): EntitySection => {
  const intros: string[] = [
    `Llevamos años ayudando a personas con deudas como la tuya con ${e.name}. No vendemos humo: analizamos tu caso, te decimos la verdad y solo seguimos si de verdad podemos ayudarte.`,
    `Frente a ${e.name}, lo que marca la diferencia es saber exactamente qué se puede hacer. Estudiamos tu situación, te explicamos tus opciones reales y solo damos el paso si tiene sentido para ti.`,
    `Con ${e.name} no improvisamos: revisamos tu caso a fondo, te contamos con sinceridad qué esperar y te acompañamos en cada decisión. Sin letra pequeña ni promesas vacías.`,
  ];
  const i = slugIndex(e.slug, 3);
  return {
    title: "Por qué confiar en Calma",
    body: (
      <>
        <div className="mb-5 flex items-start gap-3 rounded-3xl border border-accent/30 bg-accent-soft/40 p-6">
          <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-accent-deep" aria-hidden />
          <p className="text-base leading-relaxed text-foreground/85">{intros[i]}</p>
        </div>
        <CheckList
          items={[
            "Especialistas en Ley de Segunda Oportunidad y deuda bancaria, no una gestoría improvisada.",
            "Acompañamiento humano y cercano: una persona contigo de principio a fin.",
            "Cientos de casos resueltos y deudas canceladas de forma definitiva.",
            "Primer análisis gratuito y sin compromiso: tú decides después.",
          ]}
        />
        <InlineCta label="Empezar mi análisis gratuito" />
      </>
    ),
  };
};

/** Nota corta y específica por entidad (aporta detalle real al copy). */
const NOTES: Record<string, string> = {
  // Recobro
  kruk: "Kruk es uno de los mayores grupos de recobro de Europa y compra grandes carteras de deuda impagada en España.",
  intrum: "Intrum es la mayor gestora de deuda de Europa y reclama carteras compradas a bancos y financieras.",
  eos: "EOS Spain forma parte del grupo alemán EOS y gestiona deuda comprada a entidades financieras.",
  axactor: "Axactor es un grupo noruego de gestión de deuda con fuerte actividad de compra de carteras en España.",
  "link-finanzas": "Link Finanzas se dedica a la adquisición y gestión de carteras de deuda de consumo.",
  gescobro: "Gescobro es una empresa española especializada en recuperación de deuda para bancos, utilities y grandes compañías.",
  "hoist-finance": "Hoist Finance compra y gestiona carteras de deuda impagada de entidades financieras en Europa.",
  servdebt: "Servdebt trabaja en gestión y recuperación de deuda y activos distressed en el mercado ibérico.",
  hipoges: "Hipoges gestiona carteras de crédito e inmuebles y puede intervenir en reclamaciones de deuda adquirida.",
  "pepper-advantage": "Pepper Advantage actúa como servicer de préstamos y carteras de deuda en España.",
  // Microcréditos
  vivus: "Vivus ofrece microcréditos rápidos online con TAE muy elevadas y plazos de devolución cortos.",
  moneyman: "Moneyman concede préstamos rápidos online de importes pequeños con intereses altos.",
  mykredit: "MyKredit ofrece minicréditos inmediatos con costes financieros muy elevados.",
  dineo: "Dineo Crédito concede microcréditos rápidos, también a través de puntos físicos.",
  cofidis: "Cofidis ofrece préstamos y líneas de crédito al consumo de fácil acceso.",
  creditea: "Creditea comercializa líneas de crédito flexibles online con costes financieros elevados.",
  cashper: "Cashper ofrece mini préstamos rápidos con importes reducidos y vencimientos muy cortos.",
  quebueno: "QueBueno es una marca habitual en financiación rápida online de pequeño importe.",
  wandoo: "Wandoo concede préstamos rápidos al consumo con aprobación online y alto coste efectivo.",
  ferratum: "Ferratum ha sido una de las marcas más conocidas de micropréstamos digitales en Europa.",
  // Revolving
  wizink: "WiZink es una de las entidades con más reclamaciones por tarjetas revolving usurarias en España.",
  cetelem: "Cetelem (grupo BNP Paribas) comercializa tarjetas y créditos al consumo, varios de tipo revolving.",
  oney: "Oney emite tarjetas de financiación en comercios, muchas de modalidad revolving.",
  carrefour: "La tarjeta Pass de Carrefour, gestionada por Oney, suele funcionar como tarjeta revolving.",
  klarna: "Klarna ofrece pago aplazado y financiación en compras online que puede generar deuda acumulada.",
  "caixabank-payments": "CaixaBank Payments comercializa tarjetas con modalidades de pago aplazado que conviene revisar con detalle.",
  "santander-consumer": "Santander Consumer Finance comercializa financiación al consumo y tarjetas con pago aplazado.",
  bankintercard: "Bankinter Consumer Finance ha comercializado tarjetas de pago aplazado y financiación al consumo.",
  "tarjeta-you": "La Tarjeta YOU se ha hecho conocida por modalidades de pago aplazado y coste elevado si se financia de forma continuada.",
  "carrefour-pass": "La tarjeta PASS de Carrefour es una de las tarjetas de financiación más conocidas asociadas a compras y pago aplazado.",
  // Bancos
  santander: "Banco Santander es la mayor entidad de España, con préstamos, hipotecas y tarjetas.",
  bbva: "BBVA es uno de los grandes bancos del país, con amplia cartera de crédito al consumo e hipotecario.",
  caixabank: "CaixaBank es uno de los mayores bancos de España tras integrar Bankia.",
  bankinter: "Bankinter ofrece financiación, hipotecas y tarjetas a particulares y empresas.",
  sabadell: "Banco Sabadell concede préstamos, hipotecas y crédito al consumo.",
  abanca: "Abanca es una entidad con fuerte presencia en el noroeste de España.",
  openbank: "Openbank es el banco digital del grupo Santander, con préstamos y tarjetas online.",
  unicaja: "Unicaja es una de las entidades tradicionales con financiación hipotecaria y al consumo.",
  ibercaja: "Ibercaja mantiene una fuerte presencia regional en hipotecas, préstamos y banca minorista.",
  kutxabank: "Kutxabank es una de las grandes entidades del norte de España, con fuerte actividad hipotecaria.",
  cajamar: "Cajamar es una entidad muy presente en financiación de familias, autónomos y sector agrario.",
  ing: "ING opera en España con productos de ahorro, hipoteca, cuenta y financiación al consumo.",
};

const recobroContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si ${e.name} te reclama una deuda, tienes derechos: aquí te explicamos cómo comprobar que la deuda es real y qué opciones tienes.`,
  sections: [
    calmSection(e),
    {
      title: `Por qué te reclama ${e.name}`,
      body: (
        <>
          <P>
            {note} Las empresas de recobro compran carteras de deuda a bancos y financieras
            por una fracción de su valor y después reclaman el importe completo. Que {e.name}{" "}
            te contacte no significa que la deuda sea correcta o esté actualizada.
          </P>
          <P>
            Lo primero es verificar el origen: a menudo son deudas antiguas, ya pagadas o
            incluso prescritas. Más contexto en{" "}
            <A to="/empresas-de-recobro">empresas de recobro</A>.
          </P>
        </>
      ),
    },
    {
      title: "Tus derechos frente a las reclamaciones",
      body: (
        <UL
          items={[
            `Puedes exigir a ${e.name} el documento que acredita la deuda y su importe actual.`,
            "No pueden acosarte con llamadas constantes ni avisar a tu entorno.",
            "Comprueba si la deuda está prescrita o si ya la habías abonado.",
            "Guarda por escrito todas las comunicaciones.",
          ]}
        />
      ),
    },
    {
      title: "Tus miedos, resueltos",
      body: (
        <MythReality
          items={[
            {
              myth: `Que ${e.name} mande a alguien a tu casa a cobrar o a llevarse tus cosas.`,
              reality:
                "Nadie puede presentarse en tu domicilio a embargar bienes. Solo un juzgado, con una orden judicial, puede embargar, y siempre con avisos previos.",
            },
            {
              myth: "Que llamen a tu trabajo, a tus padres o a tus vecinos y todos se enteren.",
              reality:
                "Contar tu deuda a terceros o presionar a tu entorno es ilegal. Puedes exigir que cesen esas prácticas y, si insisten, denunciarlas.",
            },
            {
              myth: "Que de un día para otro te embarguen la nómina o la cuenta.",
              reality:
                "Un embargo necesita una sentencia previa. Hay margen de actuación y, además, una parte de tu salario es inembargable por ley.",
            },
            {
              myth: "Estar fichado en ASNEF para siempre.",
              reality:
                "Si resuelves o cancelas la deuda, sales de los ficheros. Y si el apunte es incorrecto, puede retirarse antes.",
            },
          ]}
        />
      ),
    },
    {
      title: "Qué hacer si llegan al juzgado",
      body: (
        <P>
          Muchas reclamaciones acaban en un{" "}
          <A to="/juicio-monitorio-recobro/juicio-monitorio-deuda">juicio monitorio</A> o en un{" "}
          <A to="/embargos/parar-embargo">embargo</A>. Si la deuda es real e inasumible, lo más
          eficaz es <A to="/cancelar-deudas">cancelarla de forma definitiva</A> con la Ley de
          Segunda Oportunidad.
        </P>
      ),
    },
    calmaSection(e),
  ],
  faq: [
    {
      q: `¿Tengo que pagar a ${e.name}?`,
      a: <P>Solo si la deuda es real, exigible y está debidamente acreditada. Tienes derecho a pedir la prueba antes de pagar nada.</P>,
      plain: `Solo si la deuda es real, exigible y está acreditada. Tienes derecho a exigir la prueba a ${e.name} antes de pagar.`,
    },
    {
      q: `¿Puede ${e.name} embargarme?`,
      a: <P>No directamente. Necesita una resolución judicial previa, normalmente tras un juicio monitorio que no se contestó a tiempo.</P>,
      plain: `${e.name} no puede embargar directamente: necesita una resolución judicial, normalmente tras un juicio monitorio no contestado.`,
    },
    {
      q: "¿Y si la deuda es muy antigua?",
      a: <P>Puede estar prescrita. Conviene revisar las fechas antes de reconocer o pagar la deuda reclamada.</P>,
      plain: "Puede estar prescrita; conviene revisar las fechas antes de reconocer o pagar la deuda reclamada.",
    },
    {
      q: `¿Puede ${e.name} venir a mi casa?`,
      a: <P>No. Ningún gestor de cobros puede entrar en tu domicilio ni llevarse nada. Solo un juzgado puede ordenar un embargo, con avisos previos.</P>,
      plain: `No. ${e.name} no puede entrar en tu casa ni llevarse bienes; solo un juzgado puede embargar, con avisos previos.`,
    },
    {
      q: "¿Pueden llamar a mi trabajo o a mi familia?",
      a: <P>No deben revelar tu deuda a terceros ni presionar a tu entorno. Es una práctica ilegal que puedes exigir que cese y denunciar.</P>,
      plain: "No. Revelar tu deuda a tu trabajo o familia y presionar a tu entorno es ilegal; puedes exigir que cese y denunciarlo.",
    },
    {
      q: `¿Cómo dejo de tener deudas con ${e.name} para siempre?`,
      a: <P>Si la deuda es real pero inasumible, la Ley de Segunda Oportunidad permite cancelarla por completo. Analizamos tu caso gratis y te decimos si encajas.</P>,
      plain: `Si la deuda es real e inasumible, la Ley de Segunda Oportunidad permite cancelarla por completo. Calma analiza tu caso gratis.`,
    },
  ],
});

const microcreditoContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si arrastras deuda con ${e.name}, aquí te explicamos cómo funciona este tipo de préstamo y cómo cancelarlo de forma definitiva.`,
  sections: [
    calmSection(e),
    {
      title: `Cómo funcionan los préstamos de ${e.name}`,
      body: (
        <P>
          {note} Se conceden en minutos y sin apenas requisitos, pero con TAE muy altas y
          plazos cortos. Para devolver uno se acaba pidiendo otro, y en pocos meses la suma de
          microcréditos se vuelve imposible de pagar.
        </P>
      ),
    },
    {
      title: "Tus derechos frente a la financiera",
      body: (
        <UL
          items={[
            "Puedes exigir transparencia sobre intereses y comisiones.",
            `Revisa si el interés aplicado por ${e.name} es abusivo.`,
            "Comprueba que la inclusión en ASNEF, si la hay, es correcta.",
          ]}
        />
      ),
    },
    {
      title: "Tus miedos, resueltos",
      body: (
        <MythReality
          items={[
            {
              myth: "Que tengas que pedir otro préstamo para tapar el de este mes, sin fin.",
              reality:
                "Romper la bola de nieve es justo lo que hacemos. Se aborda el conjunto de tu deuda de una vez, no préstamo a préstamo.",
            },
            {
              myth: `Que los intereses de ${e.name} hagan tu deuda impagable para siempre.`,
              reality:
                "Muchas TAE de microcréditos son abusivas y se pueden reclamar. Y si la deuda ya es inasumible, se puede cancelar entera.",
            },
            {
              myth: "Quedar fichado en ASNEF por un impago pequeño.",
              reality:
                "Al cancelar o regularizar la deuda sales de ASNEF. Un apunte por una cantidad pequeña no te condena de por vida.",
            },
            {
              myth: "Que te juzguen o te dé vergüenza pedir ayuda.",
              reality:
                "Aquí nadie te juzga. Atendemos cada día a personas trabajadoras que se vieron atrapadas por estos productos.",
            },
          ]}
        />
      ),
    },
    {
      title: `Cómo cancelar tu deuda con ${e.name}`,
      body: (
        <P>
          Cuando la deuda es inasumible, la Ley de Segunda Oportunidad permite eliminarla por
          completo. Lo vemos en{" "}
          <A to="/microcreditos-prestamos/cancelar-microcreditos">cancelar microcréditos</A>. Si
          además estás fichado, combínalo con{" "}
          <A to="/asnef/salir-de-asnef">salir de ASNEF</A>.
        </P>
      ),
    },
    calmaSection(e),
  ],
  faq: [
    {
      q: `¿Se puede cancelar la deuda con ${e.name}?`,
      a: <P>Sí. Los microcréditos encajan muy bien en la Ley de Segunda Oportunidad porque suelen acumularse en cantidades inasumibles.</P>,
      plain: `Sí. La deuda con ${e.name} puede cancelarse con la Ley de Segunda Oportunidad, que encaja muy bien con los microcréditos.`,
    },
    {
      q: "¿Y si no puedo pagar la cuota de este mes?",
      a: <P>No pidas otro préstamo para taparlo. Lo recomendable es analizar el conjunto de tu deuda y buscar una salida definitiva.</P>,
      plain: "Evita pedir otro préstamo para taparlo; analiza el conjunto de tu deuda y busca una salida definitiva.",
    },
    {
      q: `¿Puedo reclamar intereses abusivos a ${e.name}?`,
      a: <P>En muchos casos sí. Si la TAE es notablemente superior a la del mercado, puede considerarse abusiva.</P>,
      plain: `En muchos casos sí: si la TAE de ${e.name} es notablemente superior a la del mercado, puede considerarse abusiva.`,
    },
    {
      q: `¿Qué pasa si dejo de pagar a ${e.name}?`,
      a: <P>Pueden añadir intereses e incluirte en ASNEF, pero no pueden embargarte sin sentencia ni entrar en tu casa. Lo importante es buscar salida antes de que escale.</P>,
      plain: `Pueden sumar intereses e incluirte en ASNEF, pero no embargarte sin sentencia. ${e.name} no puede entrar en tu casa.`,
    },
    {
      q: "Tengo microcréditos de varias empresas a la vez, ¿hay solución?",
      a: <P>Sí, y es lo más habitual. Se analiza el conjunto de toda tu deuda y se busca una salida única y definitiva, no empresa por empresa.</P>,
      plain: "Sí. Lo habitual es tener varios a la vez; se analiza el conjunto de la deuda y se busca una salida única y definitiva.",
    },
    {
      q: "Me da vergüenza, ¿de verdad puedo salir de esto?",
      a: <P>Sí. No estás solo/a y no te vamos a juzgar. Miles de personas han cancelado deudas como la tuya y han recuperado la tranquilidad.</P>,
      plain: "Sí. No estás solo/a; miles de personas han cancelado deudas de microcréditos y recuperado su tranquilidad.",
    },
  ],
});

const revolvingContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si tienes una tarjeta revolving de ${e.name}, puede que estés pagando intereses usurarios. Aquí te explicamos cómo reclamar y cancelar.`,
  sections: [
    calmSection(e),
    {
      title: `Por qué tu deuda con ${e.name} no baja`,
      body: (
        <P>
          {note} Con una revolving pagas una cuota cómoda, pero la mayor parte se va en
          intereses (a menudo por encima del 24-26% TAE). El capital apenas se reduce y el saldo
          se renueva mes a mes: es el efecto bola de nieve.
        </P>
      ),
    },
    {
      title: "Cuándo es usura",
      body: (
        <P>
          El Tribunal Supremo considera usurarios los intereses notablemente superiores al
          dinero normal del mercado. Si tu tarjeta de {e.name} encaja, puedes anular el contrato
          y recuperar lo pagado de más por encima del capital prestado.
        </P>
      ),
    },
    {
      title: "Tus miedos, resueltos",
      body: (
        <MythReality
          items={[
            {
              myth: "Pagar cada mes y ver que la deuda no baja, como si nunca terminara.",
              reality:
                "No estás haciendo nada mal: la revolving está diseñada así. Al anularla por usura, dejas de alimentar ese bucle.",
            },
            {
              myth: "Que ya no puedas reclamar porque terminaste de pagar o cancelaste la tarjeta.",
              reality:
                "Sí puedes. La nulidad por usura es imprescriptible: aunque la tarjeta lleve años cerrada, puedes recuperar lo pagado de más.",
            },
            {
              myth: `Que reclamar a ${e.name} arruine tu historial o te traiga problemas.`,
              reality:
                "Reclamar es un derecho. No perjudica tu historial; al contrario, si hay apuntes ligados a una deuda usuraria pueden retirarse.",
            },
          ]}
        />
      ),
    },
    {
      title: `Reclamar o cancelar tu tarjeta de ${e.name}`,
      body: (
        <P>
          Puedes reclamar la nulidad por usura o, si tu deuda es más amplia, cancelarla por
          completo. Empieza por{" "}
          <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">cancelar tarjetas revolving</A>.
        </P>
      ),
    },
    calmaSection(e),
  ],
  faq: [
    {
      q: `¿Qué pasa si anulan mi tarjeta de ${e.name} por usura?`,
      a: <P>El contrato queda sin efecto y solo tendrías que devolver el capital prestado. Todo lo pagado de más en intereses se recupera.</P>,
      plain: `El contrato con ${e.name} queda sin efecto y solo devuelves el capital; lo pagado de más en intereses se recupera.`,
    },
    {
      q: "¿Puedo reclamar si ya terminé de pagar la tarjeta?",
      a: <P>Sí. Aunque la hayas cancelado, puedes reclamar la devolución de los intereses cobrados de forma abusiva.</P>,
      plain: "Sí. Aunque la hayas cancelado, puedes reclamar la devolución de los intereses abusivos.",
    },
    {
      q: `¿Por qué la deuda de mi tarjeta ${e.name} no baja aunque pago?`,
      a: <P>Porque la cuota se va casi entera en intereses y el saldo se renueva cada mes. Es el diseño de la revolving, no un error tuyo.</P>,
      plain: `Porque la cuota de la revolving de ${e.name} se va en intereses y el saldo se renueva cada mes; es su diseño, no un error tuyo.`,
    },
    {
      q: "¿Cuánto dinero puedo recuperar?",
      a: <P>Todo lo pagado por encima del capital que dispusiste. En muchos casos son varios miles de euros, según los años y el saldo.</P>,
      plain: "Todo lo pagado por encima del capital dispuesto; en muchos casos varios miles de euros según años y saldo.",
    },
    {
      q: "¿Y si además tengo otras deudas?",
      a: <P>Se valora el conjunto. Puedes reclamar la revolving por usura y, si el total es inasumible, cancelar toda tu deuda con la Ley de Segunda Oportunidad.</P>,
      plain: "Se valora el conjunto: reclamar la revolving por usura y, si el total es inasumible, cancelar toda la deuda con la Ley de Segunda Oportunidad.",
    },
  ],
});

const bancoContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si tienes deudas con ${e.name} que no puedes pagar, aquí reunimos tus opciones para reducirlas, reunificarlas o cancelarlas.`,
  sections: [
    calmSection(e),
    {
      title: `Deudas con ${e.name}`,
      body: (
        <P>
          {note} Préstamos personales, descubiertos, avales, hipoteca o tarjetas: cuando se
          acumulan, conviene revisar condiciones y actuar antes de que la deuda escale a recobro
          o embargo.
        </P>
      ),
    },
    {
      title: "Si no llegas a la cuota",
      body: (
        <P>
          Existen alternativas antes de que la situación empeore: reestructuración, carencia,
          dación en pago en el caso hipotecario o acogerse a la Ley de Segunda Oportunidad. La
          clave es anticiparse a la ejecución y proteger tu vivienda. Más detalle en{" "}
          <A to="/bancos-hipoteca-vivienda">bancos, hipoteca y vivienda</A>.
        </P>
      ),
    },
    {
      title: "Tus miedos, resueltos",
      body: (
        <MythReality
          items={[
            {
              myth: `Perder tu casa de un día para otro porque no pagas a ${e.name}.`,
              reality:
                "La ejecución hipotecaria es un proceso largo con plazos y avisos. Hay carencia, novación, dación o Segunda Oportunidad antes de llegar ahí. Cuanto antes actúes, más opciones de proteger tu vivienda.",
            },
            {
              myth: "Que te embarguen toda la nómina y te quedes sin nada.",
              reality:
                "El salario mínimo interprofesional es inembargable, y por encima solo se embarga un porcentaje por tramos. Y nada de esto ocurre sin sentencia previa.",
            },
            {
              myth: "Quedarte sin cuenta bancaria y sin poder cobrar tu sueldo.",
              reality:
                "Tienes derecho a una cuenta de pago básica. Una deuda con tu banco no te deja fuera del sistema bancario.",
            },
            {
              myth: "Que la deuda crezca para siempre y no haya salida.",
              reality:
                "Si la situación es inasumible de buena fe, la Ley de Segunda Oportunidad puede cancelar la deuda bancaria por completo.",
            },
          ]}
        />
      ),
    },
    {
      title: `Reducir o cancelar tu deuda con ${e.name}`,
      body: (
        <P>
          Si la situación es inasumible, puedes{" "}
          <A to="/cancelar-deudas">cancelar deudas</A> o{" "}
          <A to="/reunificacion-deudas">reunificarlas</A> en una sola cuota. Te ayudamos a elegir
          la vía adecuada según tus ingresos y el importe total.
        </P>
      ),
    },
    calmaSection(e),
  ],
  faq: [
    {
      q: `¿Puedo cancelar mi deuda con ${e.name} con la Ley de Segunda Oportunidad?`,
      a: <P>Sí, si tu situación encaja. La deuda bancaria es perfectamente exonerable cuando no puedes hacerle frente de buena fe.</P>,
      plain: `Sí, si tu situación encaja: la deuda bancaria con ${e.name} es exonerable cuando no puedes pagarla de buena fe.`,
    },
    {
      q: "¿Qué es mejor, reunificar o cancelar?",
      a: <P>Reunificar baja la cuota pero mantiene la deuda; cancelar la elimina. La elección depende de tus ingresos y del importe total.</P>,
      plain: "Reunificar baja la cuota pero mantiene la deuda; cancelar la elimina. Depende de tus ingresos y del importe total.",
    },
    {
      q: `¿Puede ${e.name} embargarme la nómina?`,
      a: <P>Solo con sentencia previa y respetando los límites legales: el salario mínimo es inembargable y por encima solo se embarga un porcentaje por tramos.</P>,
      plain: `${e.name} solo puede embargar con sentencia previa y dentro de los límites legales: el salario mínimo es inembargable.`,
    },
    {
      q: "No puedo pagar la hipoteca, ¿voy a perder mi casa?",
      a: <P>No de inmediato. Hay carencia, novación, dación en pago y Segunda Oportunidad. Cuanto antes actúes, más opciones de proteger tu vivienda.</P>,
      plain: "No de inmediato: hay carencia, novación, dación y Segunda Oportunidad. Actuar pronto da más opciones de proteger la vivienda.",
    },
    {
      q: "¿Por dónde empiezo si me agobia toda mi deuda?",
      a: <P>Por un análisis gratuito y sin compromiso. Vemos tu caso con calma y te decimos qué vía encaja mejor según tus ingresos y tu deuda total.</P>,
      plain: "Por un análisis gratuito y sin compromiso: vemos tu caso y te decimos qué vía encaja según tus ingresos y deuda total.",
    },
  ],
});

/** Sección única "Quién es {entidad}" a partir del perfil real generado. */
const originSection = (e: Entity, profile: EntityProfile): EntitySection => ({
  title: `Quién es ${e.name} y por qué te afecta`,
  body: (
    <>
      <P>{profile.origin}</P>
      <P>{profile.detail}</P>
    </>
  ),
});

/** Ficha visual de valoración (semáforo) por entidad. */
const ratingSection = (e: Entity): EntitySection => ({
  title: `Valoración rápida de ${e.name}`,
  body: <EntityRating kind={e.kind} indicators={getEntityRating(e)} />,
});

/** Sección única de miedos específicos de la entidad. */
const profileWorriesSection = (e: Entity, profile: EntityProfile): EntitySection => ({
  title: `Tus dudas concretas sobre ${e.name}`,
  body: (
    <MythReality
      items={profile.worries.map((w) => ({ myth: w.fear, reality: w.reality }))}
    />
  ),
});

/** FAQ únicas de la entidad (al principio del acordeón). */
const profileFaqs = (profile: EntityProfile): EntityFaq[] =>
  profile.faqs.map((f) => ({
    q: f.q,
    a: <P>{f.a}</P>,
    plain: f.a,
  }));

/**
 * Combina la estructura común de cada tipo con el contenido ÚNICO por entidad
 * (intro, origen, prácticas, miedos y FAQ propios) para evitar duplicados.
 * El bloque de origen se inserta tras el bloque de tranquilidad (índice 1) y
 * los miedos específicos justo antes del cierre "Por qué confiar en Calma".
 */
const mergeProfile = (base: EntityContent, e: Entity, profile: EntityProfile): EntityContent => {
  // Quitamos el bloque genérico "Tus miedos, resueltos" (clónico entre fichas):
  // el perfil aporta una sección de miedos ÚNICA por entidad que lo sustituye.
  const sections = base.sections.filter((s) => s.title !== "Tus miedos, resueltos");
  // tras calmSection (índice 0): origen único
  sections.splice(1, 0, originSection(e, profile));
  // tras el origen: ficha de valoración semáforo
  sections.splice(2, 0, ratingSection(e));
  // antes de la última sección (calmaSection): miedos específicos
  const insertAt = Math.max(1, sections.length - 1);
  sections.splice(insertAt, 0, profileWorriesSection(e, profile));
  return {
    intro: profile.intro,
    sections,
    faq: [...profileFaqs(profile), ...base.faq],
  };
};

export const getEntityContent = (entity?: Entity): EntityContent | undefined => {
  if (!entity) return undefined;
  const note = NOTES[entity.slug] ?? "";
  let base: EntityContent | undefined;
  switch (entity.kind) {
    case "recobro":
      base = recobroContent(entity, note);
      break;
    case "microcredito":
      base = microcreditoContent(entity, note);
      break;
    case "revolving":
      base = revolvingContent(entity, note);
      break;
    case "banco":
      base = bancoContent(entity, note);
      break;
    default:
      return undefined;
  }
  const profile = getEntityProfile(entity.slug);
  return profile ? mergeProfile(base, entity, profile) : base;
};