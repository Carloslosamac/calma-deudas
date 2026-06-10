import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Entity } from "@/data/seo/entities";

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

/** Nota corta y específica por entidad (aporta detalle real al copy). */
const NOTES: Record<string, string> = {
  // Recobro
  kruk: "Kruk es uno de los mayores grupos de recobro de Europa y compra grandes carteras de deuda impagada en España.",
  intrum: "Intrum es la mayor gestora de deuda de Europa y reclama carteras compradas a bancos y financieras.",
  eos: "EOS Spain forma parte del grupo alemán EOS y gestiona deuda comprada a entidades financieras.",
  axactor: "Axactor es un grupo noruego de gestión de deuda con fuerte actividad de compra de carteras en España.",
  "link-finanzas": "Link Finanzas se dedica a la adquisición y gestión de carteras de deuda de consumo.",
  // Microcréditos
  vivus: "Vivus ofrece microcréditos rápidos online con TAE muy elevadas y plazos de devolución cortos.",
  moneyman: "Moneyman concede préstamos rápidos online de importes pequeños con intereses altos.",
  mykredit: "MyKredit ofrece minicréditos inmediatos con costes financieros muy elevados.",
  dineo: "Dineo Crédito concede microcréditos rápidos, también a través de puntos físicos.",
  cofidis: "Cofidis ofrece préstamos y líneas de crédito al consumo de fácil acceso.",
  // Revolving
  wizink: "WiZink es una de las entidades con más reclamaciones por tarjetas revolving usurarias en España.",
  cetelem: "Cetelem (grupo BNP Paribas) comercializa tarjetas y créditos al consumo, varios de tipo revolving.",
  oney: "Oney emite tarjetas de financiación en comercios, muchas de modalidad revolving.",
  carrefour: "La tarjeta Pass de Carrefour, gestionada por Oney, suele funcionar como tarjeta revolving.",
  klarna: "Klarna ofrece pago aplazado y financiación en compras online que puede generar deuda acumulada.",
  // Bancos
  santander: "Banco Santander es la mayor entidad de España, con préstamos, hipotecas y tarjetas.",
  bbva: "BBVA es uno de los grandes bancos del país, con amplia cartera de crédito al consumo e hipotecario.",
  caixabank: "CaixaBank es uno de los mayores bancos de España tras integrar Bankia.",
  bankinter: "Bankinter ofrece financiación, hipotecas y tarjetas a particulares y empresas.",
  sabadell: "Banco Sabadell concede préstamos, hipotecas y crédito al consumo.",
  abanca: "Abanca es una entidad con fuerte presencia en el noroeste de España.",
  openbank: "Openbank es el banco digital del grupo Santander, con préstamos y tarjetas online.",
};

const recobroContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si ${e.name} te reclama una deuda, tienes derechos: aquí te explicamos cómo comprobar que la deuda es real y qué opciones tienes.`,
  sections: [
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
  ],
});

const microcreditoContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si arrastras deuda con ${e.name}, aquí te explicamos cómo funciona este tipo de préstamo y cómo cancelarlo de forma definitiva.`,
  sections: [
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
  ],
});

const revolvingContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si tienes una tarjeta revolving de ${e.name}, puede que estés pagando intereses usurarios. Aquí te explicamos cómo reclamar y cancelar.`,
  sections: [
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
      title: `Reclamar o cancelar tu tarjeta de ${e.name}`,
      body: (
        <P>
          Puedes reclamar la nulidad por usura o, si tu deuda es más amplia, cancelarla por
          completo. Empieza por{" "}
          <A to="/tarjetas-revolving/cancelar-tarjetas-revolving">cancelar tarjetas revolving</A>.
        </P>
      ),
    },
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
  ],
});

const bancoContent = (e: Entity, note: string): EntityContent => ({
  intro: `${note} Si tienes deudas con ${e.name} que no puedes pagar, aquí reunimos tus opciones para reducirlas, reunificarlas o cancelarlas.`,
  sections: [
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
  ],
});

export const getEntityContent = (entity?: Entity): EntityContent | undefined => {
  if (!entity) return undefined;
  const note = NOTES[entity.slug] ?? "";
  switch (entity.kind) {
    case "recobro":
      return recobroContent(entity, note);
    case "microcredito":
      return microcreditoContent(entity, note);
    case "revolving":
      return revolvingContent(entity, note);
    case "banco":
      return bancoContent(entity, note);
    default:
      return undefined;
  }
};