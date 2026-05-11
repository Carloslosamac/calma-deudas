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
            que solo retrasan el problema. Por eso conviene saber distinguir.
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
            (vivienda, vehículo) y si todavía no han iniciado procedimientos judiciales.
          </p>
          <p>
            En esos casos, una propuesta bien preparada puede traducirse en una rebaja real, sobre todo con
            financieras de microcrédito y fondos que han comprado carteras de deuda morosa.
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
          <CostVsDebtBars />
          <p>
            Si ya estás con embargo, prioriza leer{" "}
            <InternalLink to="/blog/embargos-segunda-oportunidad">cómo parar un embargo</InternalLink> antes de
            ofrecer ningún pago, porque pagar mal puede empeorar tu posición legal.
          </p>
        </>
      ),
    },
    {
      id: "como-negociar",
      title: "Cómo preparar una renegociación realista",
      body: (
        <>
          <ProcessTimeline
            steps={[
              { title: "Inventario", desc: "Lista de acreedores, importes y estado" },
              { title: "Capacidad", desc: "Calcula tu margen real mensual" },
              { title: "Propuesta", desc: "Oferta por escrito con condiciones claras" },
              { title: "Acuerdo", desc: "Firma con calendario y novación documentada" },
            ]}
          />
          <DocumentsChecklist
            items={[
              "Contratos originales",
              "Últimos extractos bancarios",
              "Notificaciones recibidas",
              "Justificante de ingresos",
              "Propuesta de pago por escrito",
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
          <InlineCTA
            title="¿Renegociar o ir por la vía legal?"
            description="Te decimos cuál encaja con tu situación antes de mover ficha."
            buttonLabel="Analizar mi caso"
          />
        </>
      ),
    },
  ],
};