import { BudgetBreakdownStack, EmotionalArcLine, MythVsReality } from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogVidaDespues from "@/assets/blog-vida-despues.jpg";

export const vidaDespuesDeuda: BlogPost = {
  slug: "vida-despues-deuda",
  category: "Consejos",
  title: "Después de cancelar deuda: hábitos sencillos para no volver al bloqueo",
  excerpt:
    "Una segunda oportunidad también necesita un plan tranquilo. Presupuesto, ahorro mínimo y decisiones prácticas para mantener la calma.",
  date: "18 abril 2026",
  readTime: "7 min",
  author: "Equipo legal Calma",
  heroImage: blogVidaDespues,
  heroAlt: "Pareja planificando su presupuesto familiar después de cancelar la deuda",
  sections: [
    {
      id: "primeros-meses",
      title: "Los primeros meses sin deuda",
      body: (
        <>
          <p>
            Tras una <InternalLink to="/blog/cancelar-deudas-requisitos">cancelación judicial de deudas</InternalLink>{" "}
            llegan unos meses extraños: vuelve la nómina íntegra y, con ella, una sensación de margen que hace años
            que no se vivía. Es el mejor momento para construir hábitos básicos antes de que aparezcan nuevas tentaciones
            de financiación rápida.
          </p>
          <EmotionalArcLine />
        </>
      ),
    },
    {
      id: "presupuesto",
      title: "Reconstruir un presupuesto sano",
      body: (
        <>
          <p>
            Un presupuesto realista divide los ingresos en gastos fijos, gastos variables y ahorro. El{" "}
            <ExtLink href="https://www.finanzasparatodos.es/">portal Finanzas para Todos</ExtLink> del Banco de
            España y la CNMV ofrece guías gratuitas para personas que parten de cero.
          </p>
          <BudgetBreakdownStack />
          <p>
            La regla más útil al empezar: que las cuotas de cualquier financiación no superen el 25-30% de los
            ingresos netos. Por encima de ese umbral, vuelve el riesgo de bola de nieve.
          </p>
        </>
      ),
    },
    {
      id: "colchon",
      title: "Construir un colchón de seguridad",
      body: (
        <>
          <p>
            Un colchón equivalente a 2-3 meses de gastos básicos evita el 80% de las recaídas. No hace falta empezar
            con cifras grandes: 50-100 € al mes durante el primer año marcan la diferencia entre tener margen ante
            un imprevisto o volver al microcrédito.
          </p>
        </>
      ),
    },
    {
      id: "credito",
      title: "Reconstruir el historial crediticio",
      body: (
        <>
          <p>
            Una vez fuera de los ficheros de morosidad (puedes consultar la guía para{" "}
            <InternalLink to="/blog/salir-asnef">salir de ASNEF</InternalLink>), la reconstrucción del historial
            llega con pequeñas operaciones bien pagadas: una tarjeta de débito, una domiciliación estable, una
            financiación pequeña pagada en plazo. El{" "}
            <ExtLink href="https://www.bde.es/clientebanca/es/areas/Central_de_riesgos/">
              fichero CIRBE del Banco de España
            </ExtLink>{" "}
            recoge la información que ven los bancos al evaluarte.
          </p>
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos sobre la vida después",
      body: (
        <>
          <MythVsReality
            rows={[
              { myth: "Nunca volveré a tener una hipoteca", reality: "Pasados unos años con historial sano, es posible" },
              { myth: "Tengo que pagar todo en efectivo", reality: "Conviene usar productos básicos para reconstruir historial" },
              { myth: "Si recaigo, no podré volver a usar la ley", reality: "Hay plazos, pero existen excepciones reguladas" },
            ]}
          />
          <InlineCTA
            title="¿Acabas de cancelar tu deuda?"
            description="Te orientamos sobre los siguientes pasos para mantener la calma a largo plazo."
            buttonLabel="Hablar con Calma"
          />
        </>
      ),
    },
  ],
};