import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Entity } from "@/data/seo/entities";
import { getEntityProfile, type EntityProfile } from "@/data/seo/content/entityProfiles";
import CtaButton from "@/components/seo/CtaButton";
import KeyCallout from "@/components/seo/modules/KeyCallout";
import CheckList from "@/components/seo/modules/CheckList";
import EntityRating from "@/components/seo/modules/EntityRating";
import { getEntityRating } from "@/data/seo/content/entityRatings";
import {
  getRecobroData,
  historicalBrandsFor,
  buysDebt,
  ROLE_LABEL,
  ROLE_MEANING,
  type RecobroEntityData,
} from "@/data/seo/recobroData";
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
  // Suministros
  endesa: "Endesa es una de las mayores comercializadoras de luz y gas de España y reclama recibos impagados con insistencia.",
  iberdrola: "Iberdrola es una de las grandes eléctricas del país y gestiona la reclamación de facturas de luz y gas impagadas.",
  naturgy: "Naturgy comercializa luz y gas en toda España y puede reclamar recibos atrasados o cortar el suministro.",
  "repsol-luz-gas": "Repsol comercializa luz y gas para hogares y negocios, con reclamación activa de facturas impagadas.",
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

/* ------------------------------------------------------------------ *
 * RECOBRO — plantilla adaptativa según el papel real de la entidad
 * ------------------------------------------------------------------ */

/** Descripción del papel de la entidad, adaptada a los datos disponibles. */
const roleSection = (e: Entity, d?: RecobroEntityData): EntitySection => {
  const hist = historicalBrandsFor(e.slug);
  return {
    title: `Qué es ${e.name} y qué papel tiene en tu deuda`,
    body: (
      <>
        <P>
          {d?.legalName ? `${e.name} (${d.legalName}) ` : `${e.name} `}
          {d
            ? `opera en España como ${ROLE_LABEL[d.entityType].toLowerCase()}.`
            : "es una compañía dedicada a la reclamación de deudas impagadas en España."}
          {d?.group ? ` Forma parte de ${d.group}.` : ""}
          {d?.formerNames?.length
            ? ` Anteriormente operaba como ${d.formerNames.join(", ")}.`
            : ""}
        </P>
        {d ? (
          <UL
            items={d.roles.map((r) => (
              <>
                <span className="font-semibold text-foreground">{ROLE_LABEL[r]}.</span>{" "}
                {ROLE_MEANING[r]}
              </>
            ))}
          />
        ) : (
          <P>
            No hay información pública suficiente para afirmar si {e.name} ha comprado tu deuda o
            si la reclama por cuenta de otra empresa. Puedes (y conviene) exigir que te lo aclaren
            por escrito: cambia por completo con quién negocias y quién debe acreditar la deuda.
          </P>
        )}
        {d?.debtTypes?.length ? (
          <P>
            Tipo de deuda que gestiona habitualmente: {d.debtTypes.join(", ")}.
          </P>
        ) : null}
        {d?.knownOriginators?.length ? (
          <P>
            Entidades de origen documentadas públicamente: {d.knownOriginators.join(", ")}. Que
            aparezcan aquí no significa que tu deuda venga de ninguna de ellas: eso debe
            acreditarlo {e.name} en tu caso concreto.
          </P>
        ) : null}
        {hist.length > 0 && (
          <P>
            {hist.map((h) => `${h.name}: ${h.note}`).join(" ")} Si te reclamaron con ese nombre, la
            interlocución hoy es con {e.name}.
          </P>
        )}
        {d?.officialWebsite && (
          <P>
            Web oficial:{" "}
            <a
              href={d.officialWebsite}
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="font-medium text-accent-deep underline-offset-4 hover:underline"
            >
              {d.officialWebsite.replace(/^https?:\/\//, "")}
            </a>
            . Comprueba siempre que la carta o el correo que has recibido procede de un canal real
            de la compañía: la suplantación de agencias de recobro existe.
          </P>
        )}
      </>
    ),
  };
};

const recobroContent = (e: Entity, note: string): EntityContent => {
  const d = getRecobroData(e.slug);
  const compra = buysDebt(d);
  const soloGestor =
    !!d && !compra && (d.roles.includes("gestor-terceros") || d.roles.includes("recobro"));
  const esDespacho = !!d?.roles.includes("despacho");

  return {
    intro: `${note ? note + " " : ""}Si ${e.name} te reclama una deuda, aquí tienes lo importante: quién es realmente, por qué te contacta, cómo comprobar que puede reclamarte, qué puede y qué no puede hacer, y qué opciones tienes para negociar, defenderte o cancelar la deuda.`,
    sections: [
      calmSection(e),
      roleSection(e, d),
      {
        title: `Por qué te reclama ${e.name} si tú no contrataste nada con ellos`,
        body: (
          <>
            <P>
              Es la duda más frecuente. Una deuda impagada puede cambiar de manos: la entidad
              original (banco, financiera, telefonía, suministros) puede{" "}
              <strong className="text-foreground">venderla</strong> a un comprador de carteras o{" "}
              <strong className="text-foreground">encargar su cobro</strong> a una agencia sin
              dejar de ser la titular. En ambos casos quien te llama no es con quien firmaste.
            </P>
            <P>
              {compra
                ? `Según la información pública disponible, ${e.name} adquiere carteras de deuda, así que es probable que te reclame como nuevo titular. Debe poder acreditar la cesión.`
                : soloGestor
                  ? `Según la información pública disponible, ${e.name} gestiona el cobro de deuda de la que no siempre es titular. Pregunta por escrito a quién pertenece hoy la deuda.`
                  : `Pide por escrito a ${e.name} que te concrete si te reclama como titular de la deuda o en nombre de un tercero.`}
              {esDespacho
                ? " Al tratarse de una firma jurídica, sus comunicaciones pueden anticipar una reclamación judicial; aun así, una carta de un despacho no es una notificación del juzgado."
                : ""}
            </P>
            <P>
              Más contexto sobre el sector en{" "}
              <A to="/empresas-de-recobro">empresas de recobro</A>.
            </P>
          </>
        ),
      },
      {
        title: `Cómo comprobar que ${e.name} tiene derecho a reclamarte`,
        body: (
          <>
            <P>
              Antes de pagar, reconocer la deuda o aceptar un plan, pide por escrito (correo
              electrónico o burofax) esta documentación. Es tu derecho y frena la conversación
              telefónica:
            </P>
            <CheckList
              items={[
                "Contrato original que da origen a la deuda y fecha de la última cuota pagada.",
                "Documento de cesión o mandato: quién es hoy el titular de la deuda y desde cuándo.",
                "Notificación de la cesión: deben comunicarte el cambio de acreedor.",
                "Desglose del importe: principal, intereses, intereses de demora y comisiones.",
                "Identificación de la persona que gestiona el expediente y canal escrito de contacto.",
              ]}
            />
            <P>
              Mientras no acrediten esos extremos, no estás obligado a pagar nada. Y ojo con la
              fecha: si han pasado más de 5 años desde la última reclamación o pago (3 en algunos
              supuestos), la deuda puede estar{" "}
              <strong className="text-foreground">prescrita</strong>. Reconocerla por teléfono o
              hacer un pago simbólico reinicia el plazo.
            </P>
            <InlineCta label="Que revisemos tu carta de reclamación" />
          </>
        ),
      },
      {
        title: `Qué puede y qué no puede hacer ${e.name}`,
        body: (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-surface-elevated p-5">
                <p className="font-poppins font-semibold text-foreground">Sí puede</p>
                <UL
                  items={[
                    "Contactarte para reclamar el pago en horario razonable.",
                    "Proponerte acuerdos, quitas o fraccionamientos.",
                    "Incluirte en un fichero de morosos (ASNEF y similares) si la deuda es cierta, vencida, exigible y te ha requerido antes.",
                    "Reclamar judicialmente: demanda o juicio monitorio ante el juzgado.",
                  ]}
                />
              </div>
              <div className="rounded-3xl border border-border bg-surface-elevated p-5">
                <p className="font-poppins font-semibold text-foreground">No puede</p>
                <UL
                  items={[
                    "Embargarte la nómina, la cuenta o un bien: el embargo solo lo acuerda un juzgado.",
                    "Entrar en tu domicilio ni llevarse nada.",
                    "Contar tu deuda a tu familia, tus vecinos o tu empresa.",
                    "Acosarte con llamadas continuas, amenazas o avisos falsos de juicio inminente.",
                    "Cobrarte importes que no puede acreditar.",
                  ]}
                />
              </div>
            </div>
            <P>
              Si las llamadas se vuelven acoso, pídeles por escrito que toda la comunicación sea
              por escrito y guarda copia. Puedes reclamar ante la Agencia Española de Protección
              de Datos.
            </P>
          </>
        ),
      },
      {
        title: `Si ${e.name} lleva la deuda al juzgado: monitorio y embargo`,
        body: (
          <>
            <P>
              La vía habitual es el{" "}
              <A to="/juicio-monitorio-recobro/juicio-monitorio-deuda">juicio monitorio</A>. Si te
              llega, tienes{" "}
              <strong className="text-foreground">20 días hábiles</strong> para oponerte. No
              responder es el error más caro: el procedimiento sigue y puede terminar en{" "}
              <A to="/embargos/parar-embargo">embargo</A> de nómina o cuenta.
            </P>
            <UL
              items={[
                "Una carta con membrete de abogado NO es una notificación judicial: el juzgado notifica por su propio cauce.",
                "Oponerse permite discutir el importe, los intereses de demora y la propia titularidad de la deuda.",
                "Una parte de tu salario (el SMI) es inembargable por ley.",
                "Si inicias la Ley de Segunda Oportunidad, los embargos por deuda ordinaria pueden paralizarse.",
              ]}
            />
          </>
        ),
      },
      {
        title: `Negociar con ${e.name} o cancelar la deuda: qué te conviene`,
        body: (
          <>
            <P>
              {compra
                ? `Los compradores de cartera adquieren la deuda con un fuerte descuento, así que suele existir margen para cerrar con una quita, sobre todo en pago único. Pero negociar solo tiene sentido si puedes pagar el acuerdo: un plan que no puedes sostener reabre el problema meses después.`
                : `Cuando la entidad gestiona la deuda por cuenta de un tercero, el margen de quita depende del acreedor real, no de quien te llama. Por eso conviene identificar primero a quién pertenece la deuda.`}
            </P>
            <P>
              Si la deuda es real y no puedes asumirla, negociar solo alarga la situación. La{" "}
              <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A> permite{" "}
              <A to="/cancelar-deudas">cancelar la deuda por completo</A> cuando hay insolvencia
              real y buena fe, incluidas las deudas que reclama {e.name}. Y si la deuda procede de
              una tarjeta revolving o de microcréditos, puede haber además{" "}
              <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">intereses reclamables</A>.
            </P>
            <InlineCta label="Saber qué salida encaja en mi caso" />
          </>
        ),
      },
      ...(d?.sources?.length
        ? [
            {
              title: "Fuentes de esta ficha",
              body: (
                <>
                  <UL
                    items={d.sources.map((s) => (
                      <a
                        href={s.url}
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                        className="font-medium text-accent-deep underline-offset-4 hover:underline"
                      >
                        {s.label}
                      </a>
                    ))}
                  />
                  {d.lastVerifiedAt && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Datos verificados el{" "}
                      {new Date(d.lastVerifiedAt).toLocaleDateString("es-ES")}. Solo publicamos
                      información contrastable: si un dato no consta en una fuente pública, no
                      aparece en esta ficha.
                    </p>
                  )}
                </>
              ),
            } as EntitySection,
          ]
        : []),
      calmaSection(e),
    ],
    faq: [
      {
        q: `¿Qué es ${e.name} y quién está detrás?`,
        a: (
          <P>
            {d
              ? `${e.name}${d.legalName ? ` (${d.legalName})` : ""} opera en España como ${ROLE_LABEL[d.entityType].toLowerCase()}${d.group ? `, dentro de ${d.group}` : ""}.`
              : `${e.name} es una compañía dedicada a la reclamación de deudas impagadas en España.`}{" "}
            No es un juzgado ni un organismo público: es una empresa privada.
          </P>
        ),
        plain: d
          ? `${e.name}${d.legalName ? ` (${d.legalName})` : ""} opera en España como ${ROLE_LABEL[d.entityType].toLowerCase()}${d.group ? `, dentro de ${d.group}` : ""}. Es una empresa privada, no un organismo público.`
          : `${e.name} es una empresa privada dedicada a la reclamación de deudas impagadas en España; no es un juzgado ni un organismo público.`,
      },
      {
        q: `¿Por qué me reclama ${e.name} una deuda que yo tenía con un banco?`,
        a: (
          <P>
            Porque la deuda se ha vendido o se ha encargado su cobro a un tercero. Puedes exigir
            que te acrediten la cesión o el mandato y la identidad del titular actual.
          </P>
        ),
        plain: `Porque la entidad original vendió la deuda o encargó su cobro. Puedes exigir a ${e.name} que acredite la cesión o el mandato y quién es el titular actual.`,
      },
      {
        q: `¿${e.name} es fiable?`,
        a: (
          <P>
            {d?.officialWebsite
              ? `Es una compañía real que opera en España y tiene presencia pública${d.group ? ` dentro de ${d.group}` : ""}.`
              : "Antes de nada, comprueba que la comunicación procede de un canal oficial de la compañía y no de una suplantación."}{" "}
            Que la empresa sea legal no significa que la cantidad que te reclama sea correcta: el
            importe, los intereses y la propia titularidad se pueden discutir.
          </P>
        ),
        plain: `${e.name} puede ser una compañía legalmente constituida, pero eso no implica que el importe reclamado sea correcto: puedes discutir la cantidad, los intereses y la titularidad de la deuda.`,
      },
      {
        q: `¿Puede ${e.name} embargarme la nómina o la cuenta?`,
        a: (
          <P>
            No por su cuenta. El embargo solo lo acuerda un juzgado tras un procedimiento, y una
            parte del salario es inembargable.
          </P>
        ),
        plain: `No. ${e.name} no puede embargar por su cuenta: el embargo solo lo acuerda un juzgado tras un procedimiento judicial, y parte del salario es inembargable.`,
      },
      {
        q: `¿Puede ${e.name} llevarme a juicio o presentar un monitorio?`,
        a: (
          <P>
            Sí, puede presentar una demanda o un juicio monitorio. Si te notifican uno, tienes 20
            días hábiles para oponerte; no contestar es lo que abre la puerta al embargo.
          </P>
        ),
        plain: `Sí, ${e.name} puede presentar demanda o juicio monitorio. Si te lo notifican tienes 20 días hábiles para oponerte; no contestar es lo que permite el embargo.`,
      },
      {
        q: `¿Puede ${e.name} incluirme en ASNEF?`,
        a: (
          <P>
            Solo si la deuda es cierta, vencida y exigible y te han requerido de pago antes. Si
            falla alguno de esos requisitos o la deuda está discutida, puedes pedir la baja del
            fichero.
          </P>
        ),
        plain: `Solo si la deuda es cierta, vencida y exigible y te requirieron de pago previamente. Si no, puedes exigir a ${e.name} la baja del fichero.`,
      },
      {
        q: `¿Y si la deuda que reclama ${e.name} está prescrita?`,
        a: (
          <P>
            Si han pasado más de 5 años sin reclamación válida ni reconocimiento por tu parte,
            puede estar prescrita. Cuidado: reconocerla por teléfono o pagar una cantidad pequeña
            reinicia el plazo.
          </P>
        ),
        plain: "Si han pasado más de 5 años sin reclamación válida ni reconocimiento, la deuda puede estar prescrita; reconocerla por teléfono o pagar algo reinicia el plazo.",
      },
      {
        q: `¿Puedo negociar la deuda con ${e.name}?`,
        a: (
          <P>
            {compra
              ? "Sí. Al haber comprado la cartera con descuento, suele haber margen para una quita, sobre todo en pago único y por escrito."
              : "Depende de quién sea el titular real de la deuda: identifícalo primero, porque el margen de quita lo decide el acreedor, no quien gestiona el cobro."}{" "}
            Cualquier acuerdo, siempre por escrito y con carta de saldo y finiquito.
          </P>
        ),
        plain: compra
          ? `Sí: ${e.name} suele tener margen para aceptar una quita, sobre todo en pago único. Siempre por escrito y con carta de saldo y finiquito.`
          : `Depende del titular real de la deuda; identifícalo primero. Cualquier acuerdo con ${e.name} debe quedar por escrito y con carta de saldo y finiquito.`,
      },
      {
        q: `¿Puedo cancelar la deuda con ${e.name} sin pagarla?`,
        a: (
          <P>
            Si hay insolvencia real y buena fe, la Ley de Segunda Oportunidad cancela la deuda de
            forma definitiva, incluida la que reclama {e.name}. Analizamos tu caso gratis.
          </P>
        ),
        plain: `Sí: con la Ley de Segunda Oportunidad, si hay insolvencia real y buena fe, la deuda que reclama ${e.name} se cancela de forma definitiva.`,
      },
      {
        q: `¿Puede ${e.name} venir a mi casa?`,
        a: (
          <P>
            No. Ninguna empresa de recobro puede entrar en tu domicilio ni llevarse bienes. Solo un
            juzgado puede embargar, y con notificación previa.
          </P>
        ),
        plain: `No. ${e.name} no puede entrar en tu casa ni llevarse bienes; solo un juzgado puede embargar y con notificación previa.`,
      },
    ],
  };
};


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

const suministroContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si debes recibos de luz o gas a ${e.name}, tienes más opciones de las que crees: desde negociar un aplazamiento hasta cancelar la deuda por completo.`,
  sections: [
    calmSection(e),
    {
      title: `Qué pasa si no pago los recibos de ${e.name}`,
      body: (
        <div className="space-y-4">
          <P>
            {note} Cuando dejas de pagar, {e.name} te reclama primero por carta, correo y
            llamadas. Si la deuda sigue viva, puede <strong>venderla a una empresa de
            recobro</strong> o llevarla a un juicio monitorio para reclamarla judicialmente.
          </P>
          <P>
            Las deudas de suministros suelen ser de importe moderado, pero si se acumulan con
            otras deudas (tarjetas, préstamos, alquiler) pueden formar parte de una situación de
            insolvencia que sí tiene solución legal.
          </P>
        </div>
      ),
    },
    {
      title: "¿Pueden cortarme la luz o el gas?",
      body: (
        <P>
          Sí, pero no de un día para otro: la ley exige avisos previos y plazos. Además, si eres{" "}
          <strong>consumidor vulnerable</strong> (bono social), el corte está prohibido o muy
          limitado. Si te han incluido en un fichero de morosos por esta deuda, puedes{" "}
          <A to="/asnef">reclamar tu salida de ASNEF</A> si no se cumplieron los requisitos.
        </P>
      ),
    },
    {
      title: "Tus miedos, resueltos",
      body: (
        <MythReality
          items={[
            {
              myth: "Me van a cortar la luz mañana mismo.",
              reality:
                "El corte exige avisos y plazos legales, y los consumidores vulnerables están protegidos. Además, negociar o iniciar la Ley de Segunda Oportunidad frena la reclamación.",
            },
            {
              myth: "Una deuda de luz es poca cosa, no vale la pena hacer nada.",
              reality:
                "La deuda crece con intereses y costas si llega a juicio, y puede acabar en ficheros de morosos. Actuar pronto es más barato y más fácil.",
            },
            {
              myth: "Las eléctricas nunca aceptan quitar deuda.",
              reality:
                "Aceptan aplazamientos y, si venden la deuda, el comprador suele negociar descuentos importantes. Y con la Ley de Segunda Oportunidad la deuda puede cancelarse del todo.",
            },
          ]}
        />
      ),
    },
    {
      title: `Cómo cancelar tu deuda con ${e.name}`,
      body: (
        <div className="space-y-4">
          <P>
            Si la deuda de suministros es solo una parte de un problema mayor, la{" "}
            <A to="/ley-segunda-oportunidad">Ley de Segunda Oportunidad</A> permite{" "}
            <A to="/cancelar-deudas">cancelar las deudas</A> de luz y gas junto al resto
            (préstamos, tarjetas, microcréditos), siempre que actúes de buena fe.
          </P>
          <InlineCta label="Cuéntanos tu caso, es gratis" />
        </div>
      ),
    },
    calmaSection(e),
  ],
  faq: [
    {
      q: `¿Puede ${e.name} cortarme la luz por no pagar?`,
      a: <P>Sí, pero solo tras avisarte por escrito y respetar plazos. Si eres consumidor vulnerable o tienes el bono social, el corte está prohibido o muy restringido.</P>,
      plain: `Sí, pero ${e.name} debe avisarte por escrito y respetar plazos; los consumidores vulnerables con bono social están protegidos frente al corte.`,
    },
    {
      q: "¿Me pueden meter en ASNEF por una factura de luz o gas?",
      a: <P>Solo si la deuda es cierta, vencida y exigible, y te han avisado previamente. Si no cumplen estos requisitos, puedes reclamar tu salida del fichero.</P>,
      plain: "Solo si la deuda es cierta, vencida y exigible y te avisaron antes; si no, puedes reclamar tu salida de ASNEF.",
    },
    {
      q: "¿Prescriben las deudas de luz y gas?",
      a: <P>Sí: las deudas con compañías de suministros prescriben a los 5 años si no hay reclamación judicial ni reconocimiento de la deuda por tu parte.</P>,
      plain: "Sí, las deudas de suministros prescriben a los 5 años si no hay reclamación judicial ni reconocimiento de la deuda.",
    },
    {
      q: `¿Puedo cancelar la deuda de ${e.name} con la Ley de Segunda Oportunidad?`,
      a: <P>Sí. Las deudas con comercializadoras de luz y gas son exonerables como cualquier deuda privada cuando no puedes pagarlas de buena fe.</P>,
      plain: `Sí, la deuda con ${e.name} es exonerable con la Ley de Segunda Oportunidad si no puedes pagarla de buena fe.`,
    },
    {
      q: "¿Merece la pena negociar directamente con la eléctrica?",
      a: <P>Puedes intentarlo: suelen ofrecer aplazamientos o fraccionamientos. Si la deuda ya la reclama otra empresa o convive con otras deudas, un análisis global te dará una salida mejor.</P>,
      plain: "Puedes intentarlo: suelen ofrecer aplazamientos; si la deuda ya la reclama otra empresa o tienes más deudas, un análisis global te dará una salida mejor.",
    },
  ],
});

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
    case "suministro":
      base = suministroContent(entity, note);
      break;
    default:
      return undefined;
  }
  const profile = getEntityProfile(entity.slug);
  return profile ? mergeProfile(base, entity, profile) : base;
};