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
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogRequisitos from "@/assets/blog-requisitos.jpg";
import personCouple from "@/assets/person-couple-sofa.jpg";

export const cancelarDeudasRequisitos: BlogPost = {
  slug: "cancelar-deudas-requisitos",
  category: "Segunda oportunidad",
  title: "Cómo saber si puedes cancelar tus deudas con la Segunda Oportunidad",
  seoTitle: "✅ Cancelar deudas: ¿cumples los requisitos en 2026?",
  metaDescription:
    "📋 Comprueba si cumples los requisitos para cancelar tus deudas: buena fe, insolvencia, deudas incluidas, coste y plazos reales.",
  faq: [
    {
      question: "¿Qué requisitos pide la Ley de Segunda Oportunidad?",
      answer:
        "Ser deudor de buena fe, estar en situación de insolvencia, no superar ciertos límites de deuda y no haber sido condenado por delitos socioeconómicos en los últimos diez años.",
    },
    {
      question: "¿Qué deudas se pueden cancelar?",
      answer:
        "La mayoría de deudas con bancos, financieras, proveedores y particulares. La deuda pública con Hacienda y Seguridad Social tiene un tratamiento especial y límites de exoneración.",
    },
    {
      question: "¿Cuánto tarda el procedimiento?",
      answer:
        "Entre 6 y 18 meses según la complejidad del caso y el juzgado, aunque los embargos pueden frenarse mucho antes de la resolución final.",
    },
    {
      question: "¿Puedo acogerme si soy asalariado?",
      answer:
        "Sí. La ley protege tanto a particulares asalariados como a autónomos que estén en situación de insolvencia y actúen de buena fe.",
    },
  ],
  excerpt:
    "Una guía clara para entender si cumples los requisitos, qué documentación conviene preparar y qué señales indican que puedes acogerte al procedimiento.",
  date: "11 mayo 2026",
  readTime: "14 min",
  author: "Equipo legal Calma",
  heroImage: blogRequisitos,
  heroAlt:
    "Mujer revisando con un abogado la documentación para cancelar sus deudas mediante la Ley de Segunda Oportunidad",
  keywords: [
    "segunda oportunidad",
    "cancelar deudas",
    "requisitos",
    "exoneración del pasivo",
    "EPI",
    "ley concursal",
    "insolvencia",
    "buena fe",
    "deudor",
  ],
  sections: [
    {
      id: "que-es",
      title: "Qué es la Ley de Segunda Oportunidad",
      body: (
        <>
          <p>
            La <strong>Ley de Segunda Oportunidad</strong> es un mecanismo legal regulado por el{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-2109">Real Decreto-Ley 1/2015</ExtLink>{" "}
            y consolidado en el{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">Texto Refundido de la Ley Concursal</ExtLink>,
            que permite a personas físicas, autónomos y exempresarios <strong>cancelar sus deudas</strong> cuando no
            pueden hacer frente a ellas. No es una rebaja comercial, ni una refinanciación: es un procedimiento
            judicial reconocido por el ordenamiento español y por la normativa europea sobre insolvencia.
          </p>
          <p>
            Su finalidad es dar una salida real al deudor de buena fe que, por circunstancias sobrevenidas, no
            puede pagar préstamos personales, tarjetas revolving, microcréditos, descubiertos, hipotecas
            impagadas, deudas con proveedores, avales firmados o una parte de la deuda pública con{" "}
            <ExtLink href="https://sede.agenciatributaria.gob.es/">Hacienda</ExtLink> y{" "}
            <ExtLink href="https://sede.seg-social.gob.es/">Seguridad Social</ExtLink>. La idea es sencilla: que un mal año, un divorcio,
            una enfermedad o el cierre de un negocio no condenen a una persona a vivir endeudada el resto de su vida.
          </p>
          <p>
            En la práctica permite paralizar embargos, frenar las llamadas de recobro y terminar con una resolución
            judicial llamada <em>Exoneración del Pasivo Insatisfecho (EPI)</em> que cancela el grueso de la deuda
            restante. Lo que no se pueda pagar con tu patrimonio actual deja de ser exigible.
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
            Una de las dudas más frecuentes es si los <strong>requisitos para cancelar deudas con la Ley de Segunda
            Oportunidad</strong> son inalcanzables. La respuesta corta es no: la ley está pensada para personas
            normales y la mayoría de quienes nos consultan cumplen las condiciones sin saberlo.
          </p>
          <p>
            Los requisitos esenciales son cuatro: ser persona física, estar en insolvencia actual o inminente,
            actuar de buena fe a lo largo del procedimiento y no haber sido condenado por determinados delitos
            económicos en los diez años previos. La famosa <em>buena fe del deudor</em> significa no haber ocultado
            bienes, no haber provocado la insolvencia de forma deliberada y haber colaborado con los acreedores
            hasta donde ha sido razonable.
          </p>
          <RequirementsChecklist />
          <p>
            Los perfiles que encajan son muy variados: personas con varios microcréditos,{" "}
            <InternalLink to="/blog/autonomos-con-deudas">autónomos con deuda fiscal y de Seguridad Social</InternalLink>,
            familias golpeadas por un divorcio, avalistas, o exempresarios con deudas personales como
            administradores. Si además figuras en ficheros de morosos, te interesará la guía para{" "}
            <InternalLink to="/blog/salir-asnef">salir de ASNEF</InternalLink>.
          </p>
          <InlineCTA
            title="¿Crees que cumples los requisitos?"
            description="Te lo confirmamos en 24 horas con un análisis personal sin compromiso."
            buttonLabel="Comprobar requisitos"
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
            No existe un único perfil. Atendemos cada semana situaciones muy distintas, pero casi todas comparten
            un patrón: una etapa vital concreta en la que los ingresos dejaron de cubrir los gastos y, a partir de
            ahí, la deuda empezó a crecer sola por intereses, comisiones y refinanciaciones.
          </p>
          <p>
            Los tres grandes grupos son: trabajadores con varios microcréditos y tarjetas revolving en marcha,
            autónomos con deuda fiscal y de Seguridad Social acumulada, y exempresarios o administradores que
            cerraron su sociedad arrastrando responsabilidades personales.
          </p>
          <PersonasGrid />
          <p>
            Más allá del perfil económico hay un denominador común emocional: el agotamiento. La mayoría de
            personas llevan meses, a veces años, conviviendo con llamadas diarias, cartas certificadas y ansiedad
            ante cada nómina. Saber que existe una vía legal para parar todo eso suele ser, en sí mismo, el primer
            alivio del proceso.
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
            La inmensa mayoría de deudas privadas pueden quedar incluidas en el expediente: préstamos personales,
            créditos al consumo, tarjetas revolving, microcréditos, descubiertos, líneas de crédito, financiación
            de coches o electrodomésticos, deudas con proveedores, facturas impagadas, avales firmados y la deuda
            hipotecaria cuando se opta por no conservar la vivienda.
          </p>
          <p>
            La deuda pública también entra dentro del procedimiento, con matices: hasta diez mil euros con Hacienda
            y otros diez mil con Seguridad Social, y calendarios de pago razonables al resto. Para autónomos suele
            ser un punto crítico, porque es la deuda que más rápido genera embargos.
          </p>
          <DebtTypesDonut />
          <p>
            Quedan fuera las deudas por pensiones de alimentos, responsabilidades civiles derivadas de delito y
            multas penales. El procedimiento cancela deuda económica ordinaria, no responsabilidades personales.
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
            Los embargos son la consecuencia más dolorosa de tener deudas impagadas: ver cómo cada mes una parte de
            la nómina desaparece o descubrir que la cuenta del banco está bloqueada genera una sensación de pérdida
            de control. La Segunda Oportunidad tiene mecanismos específicos para frenar esa situación.
          </p>
          <p>
            Una vez admitida a trámite la solicitud, el juzgado puede acordar la <strong>suspensión de los embargos</strong>{" "}
            en curso y la paralización de nuevas ejecuciones. La nómina vuelve íntegra y las empresas de recobro
            pierden cualquier base legal para presionarte.
          </p>
          <EmbargoFlowChart />
          <p>
            Cuanto antes se inicia el expediente, antes se puede pedir esa suspensión. Para profundizar puedes
            leer la guía específica sobre{" "}
            <InternalLink to="/blog/embargos-segunda-oportunidad">cómo parar un embargo con la Segunda Oportunidad</InternalLink>.
          </p>
          <InlineCTA
            title="¿Tienes un embargo activo?"
            description="Cuanto antes lo veamos, antes podemos pedir su suspensión legal."
            buttonLabel="Parar mi embargo"
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
            El cambio más importante no es solo económico, es vital: cambia cómo suena el teléfono, cómo se duerme y
            cómo se hablan las cuentas en casa. También cambia la relación con el sistema financiero: pasados los
            plazos legales es posible volver a contratar productos básicos y reconstruir un historial crediticio,
            según los criterios del <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>.
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
            Cuando las cuotas mensuales superan el 25-30% de los ingresos netos, el presupuesto familiar se ahoga:
            ya no se trata de pagar deuda, sino de no poder cubrir vivienda, suministros o alimentación. Es la
            puerta de entrada al efecto bola de nieve.
          </p>
          <BudgetBreakdownStack />
          <p>
            Por eso, una vez cancelada la deuda, conviene reorganizar el presupuesto con hábitos sostenibles que
            eviten recaer. Lo desarrollamos en nuestra guía sobre la{" "}
            <InternalLink to="/blog/vida-despues-deuda">vida después de cancelar la deuda</InternalLink>.
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
            No hay un precio único: cada expediente tiene una complejidad distinta. Lo correcto es analizar primero
            la situación real (acreedores, tipo de deuda, embargos, patrimonio, ingresos) y, a partir de ahí, hablar
            de honorarios con datos concretos.
          </p>
          <CostFactorsGrid />
          <p>
            Lo verdaderamente relevante es comparar el coste con el volumen de deuda que se va a cancelar. En la
            mayoría de casos el coste total del proceso representa una fracción pequeña frente a la deuda exonerada.
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
            El <strong>procedimiento de Segunda Oportunidad</strong> sigue una estructura clara: análisis previo y
            preparación del expediente, presentación de la solicitud, admisión a trámite, medidas cautelares para
            paralizar embargos, fase contradictoria con los acreedores y, finalmente, la resolución que aprueba la
            Exoneración del Pasivo Insatisfecho.
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
            Como horquilla realista, entre seis y dieciocho meses desde la presentación de la solicitud hasta la
            resolución firme. Depende del juzgado, del número de acreedores y de la complejidad patrimonial.
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
            No necesitas esperar a la resolución final para empezar a notar cambios: una vez aprobadas las medidas
            cautelares, los embargos se suspenden y las llamadas pierden fundamento.
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
            La documentación inicial es sencilla. Trabajamos con DNI, declaraciones de la renta, últimas nóminas o
            ingresos como autónomo, vida laboral, listado de acreedores y documentación de bienes relevantes.
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
            La mayoría de personas que se acogen reconocen lo mismo: podrían haberlo hecho antes. Los años de
            bloqueo casi siempre vienen de mitos que no se sostienen.
          </p>
          <MythVsReality />
          <p>
            La{" "}
            <ExtLink href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32019L1023">
              Directiva (UE) 2019/1023
            </ExtLink>{" "}
            deja claro que la insolvencia es un riesgo natural del sistema económico y que debe existir un
            procedimiento legal para que personas honestas vuelvan a empezar. Si quieres explorar antes vías
            intermedias, revisa la guía para{" "}
            <InternalLink to="/blog/renegociar-acreedores">renegociar con tus acreedores</InternalLink>.
          </p>
          <InlineCTA
            title="Hablemos sin compromiso"
            description="En 15 minutos te decimos si tu caso encaja y qué pasos seguir."
            buttonLabel="Cancelar mi deuda"
          />
        </>
      ),
    },
  ],
};