import {
  CostVsDebtBars,
  DocumentsChecklist,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogRenegociar from "@/assets/blog-renegociar.jpg";

export const renegociarAcreedores: BlogPost = {
  slug: "renegociar-acreedores",
  category: "Consejos",
  title: "Cuándo conviene renegociar deudas y cuándo iniciar una vía legal",
  excerpt:
    "No todos los casos necesitan el mismo camino. Aprende a distinguir entre una renegociación viable y una deuda que ya exige protección legal.",
  date: "24 abril 2026",
  readTime: "8 min",
  author: "Equipo legal Calma",
  heroImage: blogRenegociar,
  heroAlt: "Mujer negociando con un acreedor por teléfono mientras toma notas",
  keywords: [
    "renegociar deuda",
    "quita",
    "novación",
    "acreedores",
    "plan de pagos",
    "fondo buitre",
    "código civil",
    "vía amistosa",
  ],
  sections: [
    {
      id: "que-es-renegociar",
      title: "Qué significa renegociar una deuda",
      body: (
        <>
          <p>
            Renegociar una deuda es acordar con el acreedor unas condiciones de pago distintas a las firmadas:
            ampliación de plazo, reducción de cuota, condonación parcial del capital o de los intereses, o pago
            único con descuento (la llamada <em>quita</em>). Es una vía privada y voluntaria, regulada por el
            principio de libertad contractual del{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763">Código Civil</ExtLink>.
          </p>
          <p>
            Funciona bien cuando la deuda es asumible con cambios razonables. Cuando ya no lo es, fuerza acuerdos
            que solo retrasan el problema. Por eso conviene saber distinguir antes de levantar el teléfono al
            acreedor o aceptar la primera oferta que llegue por carta.
          </p>
        </>
      ),
    },
    {
      id: "cuando-si",
      title: "Cuándo sí tiene sentido renegociar",
      body: (
        <>
          <p>
            Renegociar es razonable si tu nómina o ingresos cubren los gastos fijos y la deuda representa un ahogo
            puntual; si el número de acreedores es bajo (uno o dos); si tu objetivo es conservar un bien concreto
            (vivienda, vehículo) y si todavía no han iniciado procedimientos judiciales contra ti.
          </p>
          <p>
            En esos escenarios, una propuesta bien preparada puede traducirse en una rebaja real, sobre todo con
            financieras de microcrédito y fondos que han comprado carteras de deuda morosa con grandes descuentos.
            Para ellos, cobrar el 40% hoy suele ser más rentable que pelear un 100% incierto durante años.
          </p>
        </>
      ),
    },
    {
      id: "cuando-no",
      title: "Cuándo no basta y conviene la vía legal",
      body: (
        <>
          <p>
            Si las cuotas mensuales superan el 30-40% de tus ingresos, si tienes varios acreedores compitiendo
            entre sí, si ya hay embargos activos o si la deuda incluye una parte importante de Hacienda o
            Seguridad Social, la renegociación privada se queda corta. En ese caso el camino sensato es la{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">Ley de Segunda Oportunidad</InternalLink>.
          </p>
          <CostVsDebtBars
            title="Renegociar vs. cancelar judicialmente"
            subtitle="Lo que se suele conseguir en cada vía"
            costLabel="Quita media renegociando"
            costValue="20-40%"
            costWidthPct={30}
            debtLabel="Cancelación con Segunda Oportunidad"
            debtValue="hasta 100%"
            footnote="La renegociación reduce parte de la deuda; la vía judicial puede eliminar el grueso restante cuando ya no es asumible."
          />
          <p>
            Si ya estás con embargo, prioriza leer{" "}
            <InternalLink to="/blog/embargos-segunda-oportunidad">cómo parar un embargo</InternalLink> antes de
            ofrecer ningún pago, porque pagar mal puede empeorar tu posición legal y consumir margen que
            necesitarás para el resto de acreedores.
          </p>
        </>
      ),
    },
    {
      id: "como-negociar",
      title: "Cómo preparar una renegociación realista",
      body: (
        <>
          <p>
            Una renegociación creíble no se improvisa en una llamada. Se prepara con un inventario claro de
            acreedores, un cálculo honesto de tu capacidad de pago y una propuesta por escrito que el acreedor
            pueda aceptar sin tener que decidirlo todo en caliente. Antes de descolgar el teléfono, conviene
            tener estos cuatro pasos resueltos.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Inventario", desc: "Lista de acreedores, importes y estado" },
              { title: "Capacidad", desc: "Calcula tu margen real mensual" },
              { title: "Propuesta", desc: "Oferta por escrito con condiciones claras" },
              { title: "Acuerdo", desc: "Firma con calendario y novación documentada" },
            ]}
          />
          <p>
            La novación documentada (artículos 1203 y siguientes del{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-1889-4763">Código Civil</ExtLink>) es lo que
            evita que el acreedor vuelva a reclamarte la deuda original meses después. Sin ese documento,
            cualquier acuerdo verbal queda en el aire y puede reactivar intereses, comisiones y reclamaciones.
          </p>
          <DocumentsChecklist
            title="Qué llevar a la mesa de negociación"
            subtitle="Cuanta más información aportes, más seria parecerá tu propuesta"
            items={[
              "Contratos originales del préstamo o tarjeta",
              "Extractos bancarios de los últimos 3 meses",
              "Notificaciones y cartas del acreedor",
              "Justificante de ingresos actualizado",
              "Propuesta de pago redactada por escrito",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos sobre la renegociación",
      body: (
        <>
          <p>
            La renegociación arrastra mitos que vienen de foros, vídeos virales y consejos de barra de bar. Casi
            todos parten de una intuición razonable, pero terminan empeorando el caso. Antes de tomar decisiones
            con tu acreedor, conviene separar lo que la práctica real desmiente cada día.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si dejo de pagar, negocian mejor",
                reality: "Suele activar el embargo y reduce tu margen de negociación",
              },
              {
                myth: "Cualquier acuerdo es buen acuerdo",
                reality: "Sin novación documentada, la deuda puede reactivarse",
              },
              {
                myth: "Negociar siempre evita la vía judicial",
                reality: "A veces solo la pospone; conviene evaluar el procedimiento legal",
              },
            ]}
          />
          <p>
            La regla práctica es sencilla: renegociar tiene sentido cuando la deuda sigue siendo manejable y la
            relación con el acreedor está abierta. Cuando ya hay embargos, cesión a fondos o varios procedimientos
            en marcha, lo razonable es valorar la{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">vía legal completa</InternalLink>.
          </p>
          <InlineCTA
            title="¿Renegociar o ir por la vía legal?"
            description="Te decimos cuál encaja con tu situación antes de mover ficha."
            buttonLabel="Renegociar mi deuda"
          />
        </>
      ),
    },
  ],
};
