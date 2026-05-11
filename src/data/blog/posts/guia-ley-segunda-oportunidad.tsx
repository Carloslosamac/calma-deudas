import {
  BeforeAfterSplit,
  BudgetBreakdownStack,
  ComparisonTable,
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
  RiskMatrix,
  StatHighlights,
  SuccessRateBar,
  WarningSignsList,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import FaqList from "@/components/blog/FaqList";
import ContentHub from "@/components/blog/ContentHub";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import heroImage from "@/assets/blog-guia-segunda-oportunidad.jpg";
import personWoman from "@/assets/person-woman-window.jpg";
import personCouple from "@/assets/person-couple-sofa.jpg";

export const guiaLeySegundaOportunidad: BlogPost = {
  slug: "guia-ley-segunda-oportunidad",
  category: "Segunda oportunidad",
  title:
    "Ley de Segunda Oportunidad 2026: la guía más completa y actualizada para cancelar tus deudas",
  excerpt:
    "La guía más completa y actualizada de 2026 sobre la Ley de Segunda Oportunidad: requisitos, fases, embargos, vivienda, deuda pública, autónomos y vida después. Todo lo que necesitas saber para cancelar tus deudas con la Ley de Segunda Oportunidad, en lenguaje claro y sin tecnicismos.",
  date: "11 mayo 2026",
  readTime: "28 min",
  author: "Equipo legal Calma",
  heroImage,
  heroAlt:
    "Mujer leyendo con tranquilidad un documento sobre la Ley de Segunda Oportunidad junto a una ventana iluminada",
  keywords: [
    "ley de segunda oportunidad",
    "ley segunda oportunidad",
    "ley de la segunda oportunidad",
    "ley de segunda oportunidad 2026",
    "LSO",
    "cancelar deudas",
    "exoneración del pasivo insatisfecho",
    "EPI",
    "ley concursal",
    "ley 25/2015",
    "ley 16/2022",
    "insolvencia",
    "buena fe",
    "concurso de acreedores",
    "plan de pagos",
    "deudor de buena fe",
    "BEPI",
    "directiva 2019/1023",
    "deuda pública",
    "exoneración del crédito público",
    "Hacienda",
    "Seguridad Social",
    "embargo",
    "autónomos",
    "particulares",
    "asnef",
  ],
  sections: [
    {
      id: "introduccion",
      title: "La guía más completa y actualizada de la Ley de Segunda Oportunidad",
      body: (
        <>
          <p>
            Esta es <strong>la guía más completa y actualizada sobre la Ley de
            Segunda Oportunidad en 2026</strong>: qué es, cómo funciona la Ley de
            Segunda Oportunidad, a quién protege, qué deudas cancela, cuánto cuesta,
            cuánto tarda y cómo se aplica tras la reforma de 2022 y la jurisprudencia
            más reciente del Tribunal Supremo. Está escrita para personas que no son
            abogadas y reúne, en un solo lugar, todo lo que necesitas saber sobre la
            Ley de Segunda Oportunidad antes de tomar una decisión.
          </p>
          <p>
            Toda la información proviene de fuentes oficiales e institucionales: el{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-8469">
              texto oficial de la Ley 25/2015 publicado en el BOE
            </ExtLink>
            , el{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2020-4859">
              Texto Refundido de la Ley Concursal
            </ExtLink>{" "}
            tras la reforma de la Ley 16/2022, la{" "}
            <ExtLink href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32019L1023">
              Directiva (UE) 2019/1023
            </ExtLink>
            , la jurisprudencia reciente del Tribunal Supremo recogida por el{" "}
            <ExtLink href="https://www.abogacia.es/publicaciones/blogs/blog-de-derecho-de-los-los-consumidores/el-alcance-de-la-segunda-oportunidad-innovaciones-del-tribunal-supremo-sobre-exoneracion-y-buena-fe/">
              Consejo General de la Abogacía Española
            </ExtLink>
            , análisis legal especializado como el de{" "}
            <ExtLink href="https://www.lawandtrends.com/noticias/mercantil/la-revolucion-silenciosa-de-la-ley-de-la-segunda-oportunidad-2026-la-exoneracion-del-credito-publico-ya-es-una-1.html">
              Law&amp;Trends sobre la exoneración del crédito público en 2026
            </ExtLink>
            , y datos de{" "}
            <ExtLink href="https://sede.agenciatributaria.gob.es/">
              Agencia Tributaria
            </ExtLink>
            ,{" "}
            <ExtLink href="https://sede.seg-social.gob.es/">Seguridad Social</ExtLink>{" "}
            y{" "}
            <ExtLink href="https://www.bde.es/">Banco de España</ExtLink>. También
            cubrimos la cobertura en prensa generalista, como{" "}
            <ExtLink href="https://www.larazon.es/sociedad/ley-segunda-oportunidad-permite-cancelar-deudas-cumplen-requisitos-asi-funciona-mecanismo-que-protege-personas-vulnerables-b50m_2026042669ee3fee20f31556905a7d36.html">
              La Razón
            </ExtLink>
            .
          </p>
          <StatHighlights
            title="La Ley de Segunda Oportunidad en cifras"
            subtitle="Datos consolidados a partir de resoluciones judiciales y memorias de despachos especializados"
            stats={[
              { value: "+30.000", label: "Personas exoneradas", hint: "desde 2015" },
              { value: "97%", label: "Resoluciones favorables", hint: "casos bien preparados" },
              { value: "6-18 m.", label: "Duración media", hint: "según juzgado" },
            ]}
          />
        </>
      ),
    },
    {
      id: "que-es",
      title: "Qué es la Ley de Segunda Oportunidad y cómo funciona",
      body: (
        <>
          <p>
            La <strong>Ley de Segunda Oportunidad</strong> es un{" "}
            <strong>procedimiento judicial</strong> que permite a personas físicas
            (particulares y autónomos) <strong>cancelar deudas legalmente</strong>{" "}
            cuando ya no pueden afrontarlas. También conocida popularmente como{" "}
            <em>Ley Segunda Oportunidad</em> o, en su denominación más formal,{" "}
            <em>Ley de la Segunda Oportunidad</em> (LSO), no es una refinanciación, ni
            una reunificación, ni una rebaja comercial: es un derecho reconocido en la
            ley española y armonizado con la normativa europea.
          </p>
          <p>
            Está pensada para personas honradas que, por una circunstancia sobrevenida
            (divorcio, enfermedad, despido, cierre del negocio, una operación financiera
            que salió mal), entran en una espiral de impagos imposible de remontar con
            ingresos ordinarios. La finalidad de la Ley de Segunda Oportunidad es
            exactamente esa: dar una salida real al <strong>deudor de buena fe</strong>{" "}
            y permitir que vuelva a tener una economía sostenible.
          </p>
          <p>
            El resultado final del proceso, cuando se completa con éxito, se llama{" "}
            <strong>Exoneración del Pasivo Insatisfecho (EPI)</strong>, también
            conocida como <strong>Beneficio de Exoneración del Pasivo Insatisfecho
            (BEPI)</strong>. Es la resolución judicial dictada al amparo de la Ley de
            Segunda Oportunidad que cancela las deudas que el patrimonio del deudor no
            ha podido cubrir. A partir de ese momento, esos importes ya no son
            exigibles. Ni por el banco, ni por la financiera, ni por la empresa de
            recobro.
          </p>
          <EmotionalArcLine />
        </>
      ),
    },
    {
      id: "origen",
      title: "Origen y evolución de la Ley de Segunda Oportunidad: del BOE de 2015 a 2026",
      body: (
        <>
          <p>
            La Ley de Segunda Oportunidad nació con el{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-2109">
              Real Decreto-Ley 1/2015
            </ExtLink>
            , que introdujo por primera vez en España un mecanismo para que una persona
            física pudiera cancelar deudas por vía judicial. Se consolidó después con la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2015-8469">
              Ley 25/2015
            </ExtLink>
            , la norma conocida popularmente como <strong>“Ley de Segunda Oportunidad”</strong>{" "}
            o, abreviadamente, <strong>LSO</strong>.
          </p>
          <p>
            En 2020 toda la regulación se integró en el{" "}
            <strong>Texto Refundido de la Ley Concursal</strong>, y en{" "}
            <strong>septiembre de 2022</strong> se aprobó la <strong>Ley 16/2022</strong>
            , que reformó profundamente el mecanismo para trasponer la{" "}
            <ExtLink href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32019L1023">
              Directiva (UE) 2019/1023 sobre marcos de reestructuración e insolvencia
            </ExtLink>
            . Esta reforma trajo tres novedades clave en la Ley de Segunda Oportunidad:
            se simplificó el procedimiento, se permitió la{" "}
            <strong>exoneración inmediata sin liquidar</strong> bajo ciertas
            condiciones y se abrió la puerta a cancelar parte de la{" "}
            <strong>deuda pública</strong> (Hacienda y Seguridad Social) —lo que el
            análisis de{" "}
            <ExtLink href="https://www.lawandtrends.com/noticias/mercantil/la-revolucion-silenciosa-de-la-ley-de-la-segunda-oportunidad-2026-la-exoneracion-del-credito-publico-ya-es-una-1.html">
              Law&amp;Trends califica como la “revolución silenciosa” de la Ley de la
              Segunda Oportunidad en 2026
            </ExtLink>
            .
          </p>
          <p>
            En la práctica, esto significa que la Ley de Segunda Oportunidad que
            existe hoy es bastante más favorable para el deudor de buena fe que la
            versión original de 2015. Si alguien intentó acogerse a la Ley Segunda
            Oportunidad hace años y le dijeron que no podía, conviene volver a revisar
            el caso con la normativa de 2026.
          </p>
        </>
      ),
    },
    {
      id: "para-que-sirve",
      title: "Para qué sirve realmente",
      body: (
        <>
          <p>
            Más allá del lenguaje técnico, la Segunda Oportunidad sirve para tres cosas
            muy concretas y muy reconocibles para cualquiera que esté pasando por una
            situación de sobreendeudamiento.
          </p>
          <p>
            <strong>Primero</strong>: detener las llamadas, las cartas y la presión.
            Una vez admitido a trámite el procedimiento, los acreedores y las empresas
            de recobro pierden la base legal para seguir reclamando como hasta entonces.
          </p>
          <p>
            <strong>Segundo</strong>: paralizar los <InternalLink to="/blog/embargos-segunda-oportunidad">
              embargos
            </InternalLink>{" "}
            sobre la nómina, las cuentas bancarias o los bienes. Esto se solicita al
            juzgado en cuanto se presenta la solicitud y, en la inmensa mayoría de los
            casos, se acuerda.
          </p>
          <p>
            <strong>Tercero</strong>: obtener una sentencia firme que{" "}
            <strong>cancela las deudas</strong>. A partir de ahí, el deudor puede
            reorganizar su vida sin esa losa encima.
          </p>
          <BeforeAfterSplit />
          <InlineCTA
            title="¿Estás pasando por esto ahora?"
            description="Te decimos en 24 horas, gratis y sin compromiso, si tu caso encaja en la Ley de Segunda Oportunidad."
            buttonLabel="Cancelar mi deuda"
          />
        </>
      ),
    },
    {
      id: "requisitos",
      title: "Requisitos para acogerse",
      body: (
        <>
          <p>
            Una de las grandes dudas es si los requisitos son inalcanzables. La
            respuesta corta es: <strong>no</strong>. La ley está diseñada para
            personas normales, y en la práctica la mayoría de quienes nos consultan
            cumplen las condiciones aunque crean que no.
          </p>
          <p>Los requisitos esenciales son los siguientes:</p>
          <RequirementsChecklist />
          <p>
            En detalle: hay que ser <strong>persona física</strong> (particular o
            autónomo, incluso ex empresario), estar en una situación de{" "}
            <strong>insolvencia actual o inminente</strong> —es decir, no poder pagar
            de manera regular las deudas que vencen—, actuar de <strong>buena fe</strong>{" "}
            (no haber ocultado bienes, no haber generado la insolvencia con dolo, haber
            colaborado), <strong>no haber sido condenado</strong> en los diez años
            previos por determinados delitos económicos (contra el patrimonio, orden
            socioeconómico, falsedad documental o Hacienda) y, si ya te exoneraron
            antes, respetar el plazo mínimo entre exoneraciones que fija la ley.
          </p>
          <p>
            La <strong>buena fe</strong> es el concepto que más preocupa, pero en la
            práctica se interpreta de forma razonable: no hace falta haber sido
            “perfecto”, basta con no haber actuado de manera fraudulenta. Haber pedido
            varios créditos para intentar cubrir gastos, haber refinanciado o haber
            usado tarjetas revolving <em>no</em> impide acogerse a la ley.
          </p>
          <RiskMatrix
            title="¿Tu caso encaja? Matriz rápida"
            subtitle="Cruce entre urgencia (embargos, llamadas, impagos) y viabilidad legal del expediente"
          />
        </>
      ),
    },
    {
      id: "perfiles",
      title: "A quién protege la ley",
      body: (
        <>
          <p>
            Aunque cada caso es único, en los expedientes que tramitamos se repiten una
            y otra vez tres grandes perfiles. Reconocerse en uno de ellos no es
            decisivo, pero ayuda a entender que no estás solo.
          </p>
          <PersonasGrid />
          <p>
            Son sobre todo trabajadores asalariados con varios microcréditos y tarjetas
            revolving acumulados,{" "}
            <InternalLink to="/blog/autonomos-con-deudas">
              autónomos con deuda de Hacienda y Seguridad Social
            </InternalLink>{" "}
            tras un mal año, y exempresarios o administradores que cerraron una
            sociedad arrastrando avales personales. También personas separadas o
            divorciadas a las que la economía dejó de cuadrarles, y familias golpeadas
            por una enfermedad o un despido.
          </p>
          <p>
            La Ley de Segunda Oportunidad está pensada, en palabras de la propia
            directiva europea, para <em>“deudores honestos pero desafortunados”</em>.
            No es para quien quiere escapar de pagar lo que puede pagar: es para quien,
            por mucho que se esfuerce, no llega.
          </p>
        </>
      ),
    },
    {
      id: "tipos-deuda",
      title: "Qué deudas se pueden cancelar y cuáles no",
      body: (
        <>
          <p>
            La inmensa mayoría de deudas privadas entran dentro del expediente:
            préstamos personales, créditos al consumo, microcréditos, tarjetas
            revolving, descubiertos, líneas de crédito, financiación de coches o
            electrodomésticos, deudas con proveedores, facturas impagadas, avales
            firmados y la propia deuda hipotecaria cuando se opta por no conservar la
            vivienda.
          </p>
          <DebtTypesDonut />
          <p>
            <strong>Deuda pública.</strong> Desde la reforma de 2022 también puede
            exonerarse, aunque con límites: hasta <strong>10.000 €</strong> con
            Hacienda y otros <strong>10.000 €</strong> con Seguridad Social pueden
            cancelarse de forma íntegra; el primer tramo (los primeros 5.000 € de cada
            organismo) se exonera al 100% y, a partir de ahí, hasta los 10.000 €, al
            50%. Lo que quede por encima se reestructura en un plan de pagos a plazos
            razonables.
          </p>
          <p>
            <strong>Qué queda fuera.</strong> No se exoneran las deudas por pensiones
            de alimentos, las multas penales, las responsabilidades civiles derivadas
            de un delito ni, en general, deudas vinculadas a actuaciones dolosas. La
            ley cancela deuda económica ordinaria, no responsabilidades personales.
          </p>
        </>
      ),
    },
    {
      id: "modalidades",
      title: "Dos caminos: exoneración inmediata o con plan de pagos",
      body: (
        <>
          <p>
            Tras la reforma de 2022, la ley contempla dos vías distintas para llegar a
            la cancelación. La elección no es libre: depende de las circunstancias del
            deudor.
          </p>
          <p>
            <strong>1. Exoneración con liquidación de patrimonio.</strong> Si el deudor
            tiene bienes (vehículos, una segunda vivienda, ahorros), se liquidan para
            pagar a los acreedores en la medida de lo posible y, después, se exonera lo
            que queda sin pagar. Es la vía más conocida y la que más se ha usado desde
            2015.
          </p>
          <p>
            <strong>2. Exoneración con plan de pagos (sin liquidar).</strong> Si el
            deudor no tiene bienes significativos pero sí ingresos recurrentes, puede
            mantener su patrimonio (incluida, en muchos casos, su vivienda habitual) y
            cumplir un plan de pagos de <strong>3 a 5 años</strong> sobre la parte que
            sus ingresos permitan asumir. Al terminar el plan, lo que no se haya pagado
            se exonera.
          </p>
          <ComparisonTable
            title="Comparativa entre las dos vías"
            subtitle="Cada caso debe analizarse de forma individual"
            optionA="Exoneración con liquidación"
            optionB="Exoneración con plan de pagos"
            rows={[
              {
                label: "Patrimonio del deudor",
                a: "Se liquida lo no esencial",
                b: "Se conserva (incl. vivienda en muchos casos)",
                highlight: "b",
              },
              {
                label: "Duración del proceso",
                a: "6 - 12 meses",
                b: "3 - 5 años con plan",
                highlight: "a",
              },
              {
                label: "Encaja mejor con",
                a: "Personas sin ingresos estables",
                b: "Asalariados o autónomos con nómina",
              },
              {
                label: "Resultado final",
                a: "EPI sobre lo no cubierto",
                b: "EPI al cumplir el plan",
                highlight: "b",
              },
            ]}
          />
          <p>
            En la práctica, la vía adecuada se decide tras un análisis completo de
            ingresos, patrimonio, número y tipo de acreedores, y voluntad personal de
            conservar determinados bienes.
          </p>
        </>
      ),
    },
    {
      id: "proceso",
      title: "El procedimiento paso a paso",
      body: (
        <>
          <p>
            Conviene desmitificar el proceso. No hay juicios públicos, no hay vistas
            multitudinarias y no se llama a tu familia ni a tu empresa. El expediente
            es eminentemente documental y se desarrolla en cinco fases claras.
          </p>
          <ProcessTimeline />
          <p>
            <strong>1. Análisis previo y preparación.</strong> Se estudia tu situación
            completa: ingresos, gastos, patrimonio, listado real de acreedores, tipo de
            deudas, embargos en curso. Aquí se decide si encajas y por qué vía.
          </p>
          <p>
            <strong>2. Presentación de la solicitud</strong> ante el juzgado de lo
            mercantil (o de primera instancia, según el caso) competente por tu
            domicilio. Junto con la solicitud se aporta la documentación.
          </p>
          <p>
            <strong>3. Admisión a trámite y medidas cautelares.</strong> El juzgado
            revisa que el expediente está bien presentado y puede acordar la{" "}
            <strong>suspensión de los embargos</strong> y de las ejecuciones en curso.
          </p>
          <p>
            <strong>4. Fase de oposición de acreedores.</strong> Los acreedores son
            notificados y pueden manifestar lo que consideren. En la inmensa mayoría
            de los casos no se oponen, o sus oposiciones no prosperan.
          </p>
          <p>
            <strong>5. Resolución y EPI.</strong> El juzgado dicta la resolución que
            concede (o, excepcionalmente, deniega) la Exoneración del Pasivo
            Insatisfecho. Esa resolución es la que cancela tu deuda.
          </p>
          <InlineCTA
            title="¿Quieres ver qué fase te tocaría?"
            description="Te explicamos en 15 minutos cómo se aplicaría todo esto a tu caso real."
            buttonLabel="Analizar mi caso"
          />
        </>
      ),
    },
    {
      id: "embargos",
      title: "Qué pasa con los embargos y las llamadas",
      body: (
        <>
          <p>
            Es la pregunta más urgente para quien tiene la nómina embargada, la cuenta
            bloqueada o varias llamadas diarias de empresas de recobro. La respuesta es
            clara: la Segunda Oportunidad tiene mecanismos legales específicos para{" "}
            <strong>parar todo eso</strong>.
          </p>
          <EmbargoFlowChart />
          <p>
            Una vez presentada la solicitud y admitida a trámite, el juzgado puede
            acordar la <strong>suspensión de los embargos en curso</strong> y la
            paralización de nuevas ejecuciones. La nómina vuelve íntegra. La cuenta
            deja de estar bloqueada. Y las empresas de recobro pierden la base legal
            para seguir presionándote por las mismas deudas.
          </p>
          <WarningSignsList
            title="Señales de que el cerco se está cerrando"
            subtitle="Si reconoces dos o más de estas señales, conviene actuar antes que después"
          />
          <p>
            Profundizamos en este tema en la guía específica sobre{" "}
            <InternalLink to="/blog/embargos-segunda-oportunidad">
              cómo parar un embargo con la Segunda Oportunidad
            </InternalLink>
            . Y si además figuras en ficheros de morosos, te interesará leer{" "}
            <InternalLink to="/blog/salir-asnef">cómo salir de ASNEF</InternalLink>.
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
      id: "vivienda",
      title: "¿Pierdo mi vivienda habitual?",
      body: (
        <>
          <p>
            Es uno de los miedos más comunes y, a la vez, uno de los más malinterpretados.
            La Segunda Oportunidad <strong>no obliga automáticamente a vender la
            vivienda habitual</strong>. Cuando se opta por la vía de la{" "}
            <strong>exoneración con plan de pagos</strong>, en muchos casos es posible
            conservar la vivienda siempre que la hipoteca esté al corriente o pueda
            ponerse al día.
          </p>
          <figure className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <img
              src={personWoman}
              alt="Mujer mirando por la ventana de su vivienda habitual tras acogerse a la Ley de Segunda Oportunidad"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </figure>
          <p>
            Si, por el contrario, la vivienda está ya en ejecución hipotecaria o las
            cuotas son inasumibles, se puede optar por la vía de la liquidación. La
            deuda hipotecaria entra entonces en el expediente y, tras la venta, lo que
            no se cubra puede quedar exonerado. Es decir: ni siquiera en el peor
            escenario quedas con la deuda colgando después de perder la casa.
          </p>
          <p>
            Cada situación se analiza de manera personalizada. La frase “vas a perder
            la casa” que tantas veces se repite no es cierta como norma general: lo es
            sólo en escenarios concretos y, casi siempre, evitable con planificación.
          </p>
        </>
      ),
    },
    {
      id: "autonomos",
      title: "Particularidades para autónomos y exempresarios",
      body: (
        <>
          <p>
            Los autónomos son uno de los colectivos más golpeados por las deudas. La
            mezcla de IVA trimestral, IRPF, cuota de autónomos, proveedores y, a
            menudo, avales personales para créditos del negocio, hace que un mal año
            convierta a un profesional solvente en un deudor en pocos meses.
          </p>
          <p>
            La buena noticia es que la Ley de Segunda Oportunidad protege
            específicamente a este colectivo. Puede acogerse tanto un autónomo en
            activo como un exautónomo o un administrador de una sociedad ya cerrada,
            siempre que la deuda figure a nombre de la persona física. Además, la
            reforma de 2022 permite cancelar parte de la deuda pública, que era el
            gran tapón del modelo anterior.
          </p>
          <p>
            En la guía específica para{" "}
            <InternalLink to="/blog/autonomos-con-deudas">
              autónomos con deudas
            </InternalLink>{" "}
            entramos al detalle en cómo se ordena el expediente cuando hay deuda fiscal,
            deuda con Seguridad Social y deuda con proveedores en paralelo.
          </p>
        </>
      ),
    },
    {
      id: "presupuesto",
      title: "Cómo afecta a tu economía mientras dura el proceso",
      body: (
        <>
          <p>
            Una de las dudas más prácticas es <em>“¿de qué voy a vivir mientras tanto?”</em>.
            La idea clave es que la Ley de Segunda Oportunidad no te obliga a vivir
            peor durante el proceso: te permite vivir, justamente, sin las cuotas
            asfixiantes que tenías antes.
          </p>
          <BudgetBreakdownStack />
          <p>
            Durante el procedimiento, las cuotas a acreedores quedan suspendidas o se
            ajustan al plan de pagos. Tu ingreso mensual deja de ir mayoritariamente a
            tarjetas y financieras y vuelve a cubrir lo esencial: vivienda,
            suministros, alimentación y un margen para volver a ahorrar.
          </p>
          <p>
            En la guía sobre{" "}
            <InternalLink to="/blog/vida-despues-deuda">
              la vida después de cancelar la deuda
            </InternalLink>{" "}
            explicamos cómo consolidar ese cambio una vez termine el proceso.
          </p>
        </>
      ),
    },
    {
      id: "coste",
      title: "Cuánto cuesta y cómo se paga",
      body: (
        <>
          <p>
            No existe un “precio único”. El coste del procedimiento depende de variables
            objetivas que conviene transparentar desde el primer minuto, en lugar de
            ofrecer cifras genéricas que después no se sostienen.
          </p>
          <CostFactorsGrid />
          <p>
            Lo verdaderamente relevante es la comparación entre coste y deuda cancelada.
            En la inmensa mayoría de casos, el coste total del expediente representa una
            fracción muy pequeña frente al volumen de deuda exonerada.
          </p>
          <CostVsDebtBars />
          <p>
            En Calma estructuramos los honorarios en cuotas mensuales razonables y
            adaptadas a tu capacidad real, precisamente porque no tendría sentido
            ofrecer una salida a las deudas creando una nueva.
          </p>
        </>
      ),
    },
    {
      id: "duracion",
      title: "Cuánto tarda el proceso completo",
      body: (
        <>
          <p>
            La duración varía según el juzgado, el número de acreedores y la
            complejidad patrimonial. Como horquilla realista, entre{" "}
            <strong>6 y 18 meses</strong> desde la presentación de la solicitud hasta
            la resolución firme en la vía de liquidación. En la vía con plan de pagos,
            el plan en sí dura entre 3 y 5 años, aunque la cancelación se decreta al
            cumplirlo.
          </p>
          <figure className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <img
              src={personCouple}
              alt="Pareja revisando con calma su nueva etapa sin deudas tras la Segunda Oportunidad"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </figure>
          <p>
            No necesitas esperar a la resolución final para empezar a notar cambios.
            Desde las primeras semanas, una vez admitida la solicitud, los embargos se
            paralizan y las llamadas pierden fundamento. Esa fase intermedia es, para
            muchas personas, la primera vez en años que respiran tranquilas.
          </p>
        </>
      ),
    },
    {
      id: "documentacion",
      title: "Qué documentación vas a necesitar",
      body: (
        <>
          <p>
            La documentación inicial es razonable. Trabajamos con tu DNI, las últimas
            declaraciones de la renta, vida laboral, justificantes de ingresos
            (nóminas o, en autónomos, modelos trimestrales), un listado de acreedores
            y documentación de los bienes relevantes.
          </p>
          <DocumentsChecklist />
          <p>
            No hace falta tenerlo todo perfecto el primer día. En el análisis previo
            te indicamos exactamente qué falta y cómo conseguirlo. La gran mayoría de
            documentación puede obtenerse online en la web de{" "}
            <ExtLink href="https://sede.agenciatributaria.gob.es/">
              Agencia Tributaria
            </ExtLink>{" "}
            o en la{" "}
            <ExtLink href="https://sede.seg-social.gob.es/">
              Sede Electrónica de la Seguridad Social
            </ExtLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos que están frenando a muchas personas",
      body: (
        <>
          <p>
            La mayoría de personas que finalmente se acogen a la Segunda Oportunidad
            reconocen lo mismo: podrían haberlo hecho antes. Los años de bloqueo casi
            siempre vienen de mitos que no se sostienen.
          </p>
          <MythVsReality />
          <p>
            La{" "}
            <ExtLink href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32019L1023">
              Directiva (UE) 2019/1023
            </ExtLink>{" "}
            es clara: la insolvencia es un riesgo natural del sistema económico y debe
            existir un procedimiento legal para que personas honestas puedan volver a
            empezar. España la ha incorporado a su ordenamiento. Acogerse a la ley no
            es <em>“escaquearse”</em>: es <strong>ejercer un derecho</strong>.
          </p>
        </>
      ),
    },
    {
      id: "tasas-exito",
      title: "Tasas de éxito reales del procedimiento",
      body: (
        <>
          <p>
            Cuando el expediente está bien preparado, el porcentaje de resoluciones
            favorables es muy alto. Los casos en los que se deniega la exoneración
            están casi siempre vinculados a problemas de buena fe (ocultación de
            bienes, datos falsos en la solicitud) o a expedientes presentados sin
            análisis previo.
          </p>
          <SuccessRateBar
            title="Distribución de resoluciones"
            subtitle="Resultado típico en expedientes correctamente preparados"
          />
          <p>
            Por eso es tan importante el análisis previo: no se trata de “rellenar y
            entregar”, sino de presentar al juzgado un caso sólido, ordenado y honesto.
          </p>
        </>
      ),
    },
    {
      id: "alternativas",
      title: "¿Hay alternativas antes de acogerse?",
      body: (
        <>
          <p>
            Sí, y conviene conocerlas. En algunos casos —pocas deudas, pocos
            acreedores, importes manejables— puede tener sentido intentar primero una{" "}
            <InternalLink to="/blog/renegociar-acreedores">
              renegociación directa con los acreedores
            </InternalLink>
            . En otros, una reunificación bien planteada puede aliviar temporalmente
            la situación, aunque no la resuelva de raíz.
          </p>
          <p>
            La Segunda Oportunidad es la herramienta más potente, pero no siempre es la
            primera. Lo correcto es analizar tu caso concreto y proponerte la vía que
            mejor encaje, no “venderte” el procedimiento por defecto.
          </p>
        </>
      ),
    },
    {
      id: "despues",
      title: "Y después… ¿qué pasa con mi vida financiera?",
      body: (
        <>
          <p>
            Una vez dictada la EPI, las deudas exoneradas dejan de ser exigibles. Las
            entradas en ficheros como ASNEF asociadas a esas deudas deben cancelarse.
            Y, con el tiempo, se puede volver a contratar productos financieros básicos
            (cuentas, tarjetas de débito y, más adelante, crédito) reconstruyendo el
            historial poco a poco.
          </p>
          <p>
            La clave para no recaer es reorganizar el presupuesto familiar con hábitos
            sostenibles. Lo desarrollamos al detalle en la guía sobre la{" "}
            <InternalLink to="/blog/vida-despues-deuda">
              vida después de cancelar la deuda
            </InternalLink>
            .
          </p>
          <InlineCTA
            title="Empieza por saber dónde estás"
            description="En una llamada de 15 minutos te decimos si tu caso encaja, qué vía sería la tuya y qué pasos seguir."
            buttonLabel="Empezar de cero"
          />
        </>
      ),
    },
    {
      id: "faq",
      title: "Preguntas frecuentes sobre la Ley de Segunda Oportunidad",
      body: (
        <>
          <p>
            Estas son las 20 dudas que más nos llegan al equipo legal de Calma. Si la
            tuya no está, escríbenos: la añadimos y te respondemos personalmente.
          </p>
          <FaqList
            items={[
              {
                q: "1. ¿La Ley de Segunda Oportunidad cancela realmente las deudas o solo las aplaza?",
                a: "Las cancela. La resolución judicial (EPI) extingue las deudas exoneradas, que dejan de ser exigibles legalmente. No es un aplazamiento ni una refinanciación.",
              },
              {
                q: "2. ¿Cuánta deuda mínima hace falta tener para acogerse?",
                a: "La ley no fija un mínimo, pero por coherencia económica el procedimiento tiene sentido a partir de unos 5.000 €. Por debajo, suele ser más eficaz una renegociación directa con los acreedores.",
              },
              {
                q: "3. ¿Puedo acogerme si solo tengo un acreedor?",
                a: "Como norma general se exigen al menos dos acreedores. Si solo tienes uno, conviene analizar otras vías como la negociación individual o las nulidades por intereses abusivos.",
              },
              {
                q: "4. ¿Aparecerá publicado mi nombre en algún sitio?",
                a: "El procedimiento se publica en el Registro Público Concursal a efectos legales, pero no es una lista pública de morosos ni se difunde en medios. Tu entorno no se entera salvo que tú lo cuentes.",
              },
              {
                q: "5. ¿Mi empresa o mi jefe se van a enterar?",
                a: "No. No se notifica al empleador. Solo lo sabría si tu nómina estuviese ya embargada (en cuyo caso, justamente, la suspensión del embargo se notifica a la empresa para devolverte el dinero).",
              },
              {
                q: "6. ¿Puedo seguir cobrando mi nómina o pensión durante el proceso?",
                a: "Sí. La nómina y la pensión se cobran con normalidad. Si estaban embargadas, con la admisión del expediente vuelven íntegras.",
              },
              {
                q: "7. ¿Y si tengo bienes a mi nombre? ¿Me los quitan todos?",
                a: "No automáticamente. Si vas por la vía de plan de pagos, conservas el patrimonio. En la vía de liquidación se vende lo no esencial, pero los bienes inembargables (mínimo vital, enseres) están protegidos por ley.",
              },
              {
                q: "8. ¿Pierdo siempre mi vivienda habitual?",
                a: "No. En la vía con plan de pagos suele ser posible conservarla si la hipoteca está al corriente. Solo en escenarios concretos (cuotas inasumibles, ejecución avanzada) entra en juego la venta.",
              },
              {
                q: "9. ¿Se cancela la hipoteca?",
                a: "Si decides no conservar la vivienda, la deuda hipotecaria entra en el expediente: tras la venta, lo que no se cubra queda exonerado. Si la conservas, sigues pagando la hipoteca como hasta ahora.",
              },
              {
                q: "10. ¿Se puede cancelar la deuda con Hacienda o la Seguridad Social?",
                a: "Sí, con límites: hasta 10.000 € con cada uno pueden exonerarse (los primeros 5.000 al 100% y el siguiente tramo al 50%). El resto se reestructura en un plan de pagos a plazos asumibles.",
              },
              {
                q: "11. ¿Y las pensiones de alimentos? ¿También se cancelan?",
                a: "No. Las pensiones de alimentos, las multas penales y las responsabilidades civiles derivadas de delito están expresamente excluidas. Se cancela deuda económica ordinaria, no responsabilidades personales.",
              },
              {
                q: "12. ¿Cuánto tarda todo el procedimiento?",
                a: "Entre 6 y 18 meses en la vía de liquidación, hasta la resolución firme. En la vía con plan de pagos, el plan dura entre 3 y 5 años y la exoneración llega al cumplirlo.",
              },
              {
                q: "13. ¿Cuándo dejan de llamarme las empresas de recobro?",
                a: "En la práctica, desde las primeras semanas. Una vez admitido el expediente, los recobros pierden su base legal para insistir por las deudas incluidas en el procedimiento.",
              },
              {
                q: "14. ¿Tengo que ir al juzgado a declarar?",
                a: "En la gran mayoría de casos no. El procedimiento es documental. Si en algún momento se requiere comparecencia, vas acompañado de tu abogado y se prepara con antelación.",
              },
              {
                q: "15. ¿Necesito abogado y procurador obligatoriamente?",
                a: "Sí. Es un procedimiento judicial y requiere representación letrada. En Calma te asignamos un equipo legal especializado en Segunda Oportunidad que lleva todo el expediente.",
              },
              {
                q: "16. ¿Y si no tengo dinero para pagar al abogado?",
                a: "Estructuramos los honorarios en cuotas mensuales razonables y proporcionales a tus ingresos. No tendría sentido sacarte de las deudas creándote otra.",
              },
              {
                q: "17. ¿Puedo volver a pedir un crédito después?",
                a: "Sí. Una vez exonerado y, con el tiempo, fuera de los ficheros de morosos, se puede reconstruir el historial crediticio paso a paso. Muchos clientes vuelven a contratar productos en 1-2 años.",
              },
              {
                q: "18. ¿Puedo acogerme dos veces a la Ley de Segunda Oportunidad?",
                a: "Sí, pero hay que respetar un plazo mínimo entre exoneraciones (actualmente entre 2 y 5 años según el tipo). La ley no impide volver a usarla si las circunstancias lo justifican.",
              },
              {
                q: "19. Si soy autónomo en activo, ¿tengo que cerrar mi negocio?",
                a: "No necesariamente. Puedes seguir desarrollando tu actividad mientras dure el procedimiento. Lo desarrollamos en la guía para autónomos con deudas.",
              },
              {
                q: "20. ¿Qué pasa si mi pareja tiene también deudas? ¿Hace un solo expediente o dos?",
                a: "Se puede presentar un expediente conjunto si las deudas están entrelazadas y comparten economía. En otros casos, se hace por separado. Lo decidimos tras el análisis previo de ambos.",
              },
            ]}
          />
        </>
      ),
    },
    {
      id: "hub",
      title: "Encuentra la respuesta a tu situación concreta",
      body: (
        <>
          <p>
            Cada caso es distinto. Si lo que te preocupa ahora mismo es un embargo, no
            es lo mismo que si tu duda es qué pasa con tu vivienda o con la deuda de
            Hacienda. Aquí abajo tienes los temas más buscados, ordenados por
            situación, para que vayas directo a lo que te toca.
          </p>
          <p>
            Los que están enlazados ya puedes leerlos. El resto los iremos publicando
            para responder, una por una, a las preguntas que más nos llegan al equipo
            legal.
          </p>
          <ContentHub
            groups={[
              {
                angle: "Requisitos y elegibilidad",
                description: "Cómo saber si encajas y qué condiciones se exigen.",
                items: [
                  { title: "Cómo saber si puedes cancelar tus deudas con la Segunda Oportunidad", to: "/blog/cancelar-deudas-requisitos" },
                  { title: "Qué se entiende por “deudor de buena fe” en la práctica" },
                  { title: "Insolvencia actual vs. insolvencia inminente: diferencias" },
                  { title: "Acogerse con antecedentes: qué delitos lo impiden y cuáles no" },
                  { title: "¿Puedo acogerme si ya me exoneraron hace años?" },
                ],
              },
              {
                angle: "Tipos de deuda que entran en el expediente",
                description: "Qué se cancela, qué no, y matices por tipo de deuda.",
                items: [
                  { title: "Cancelar microcréditos y préstamos rápidos con la Segunda Oportunidad" },
                  { title: "Tarjetas revolving: cómo se incluyen en el expediente" },
                  { title: "Cancelar avales personales firmados por un familiar" },
                  { title: "Deudas con proveedores: cómo se ordenan en el procedimiento" },
                  { title: "Préstamos entre particulares y deudas con familia: ¿se cancelan?" },
                ],
              },
              {
                angle: "Procedimiento paso a paso",
                description: "Cómo se desarrolla el expediente desde dentro.",
                items: [
                  { title: "Qué documentos pide el juzgado y cómo prepararlos" },
                  { title: "Cómo se elige juzgado competente en Segunda Oportunidad" },
                  { title: "Diferencias entre exoneración con liquidación y con plan de pagos" },
                  { title: "Qué es el administrador concursal y cuándo aparece" },
                  { title: "Oposición de un acreedor: qué pasa y cómo se resuelve" },
                ],
              },
              {
                angle: "Embargos y cuentas bloqueadas",
                description: "Cómo se frena la presión legal en curso.",
                items: [
                  { title: "Qué ocurre con los embargos cuando inicias el proceso legal", to: "/blog/embargos-segunda-oportunidad" },
                  { title: "Cómo desbloquear una cuenta bancaria embargada" },
                  { title: "Embargo de nómina: en qué momento vuelve íntegra" },
                  { title: "Embargo del vehículo: cuándo se puede evitar la subasta" },
                  { title: "Embargos por varias deudas a la vez: cómo se unifican" },
                ],
              },
              {
                angle: "Vivienda habitual e hipotecas",
                description: "El miedo a perder la casa, despejado caso por caso.",
                items: [
                  { title: "¿Pierdo mi vivienda habitual con la Segunda Oportunidad?" },
                  { title: "Cómo conservar la vivienda mediante plan de pagos" },
                  { title: "Ejecución hipotecaria en marcha: ¿se puede parar?" },
                  { title: "Dación en pago vs. Segunda Oportunidad: cuándo conviene cada una" },
                  { title: "Segunda vivienda y casas heredadas: cómo se tratan en el expediente" },
                ],
              },
              {
                angle: "Autónomos y exempresarios",
                description: "Casuísticas profesionales y societarias.",
                items: [
                  { title: "Autónomos con deudas: proteger tu actividad y empezar de nuevo", to: "/blog/autonomos-con-deudas" },
                  { title: "Cancelar deudas siendo autónomo en activo" },
                  { title: "Avales personales de administrador: cómo se incluyen" },
                  { title: "Tras cerrar la SL: qué deudas siguen siendo tuyas" },
                  { title: "Autónomos con deuda de IVA acumulada: vías reales de salida" },
                ],
              },
              {
                angle: "Deuda pública (Hacienda y Seguridad Social)",
                description: "El cambio más importante de la reforma de 2022.",
                items: [
                  { title: "Cancelar deuda con Hacienda: hasta dónde llega la exoneración" },
                  { title: "Cancelar deuda con la Seguridad Social: límites y plan de pagos" },
                  { title: "Apremios, recargos y intereses: cómo se calculan en el expediente" },
                  { title: "Embargo de la AEAT sobre la cuenta: cómo se levanta" },
                  { title: "Aplazamientos con Hacienda fracasados: qué pasa ahora" },
                ],
              },
              {
                angle: "ASNEF y ficheros de morosidad",
                description: "Salir de las listas y recuperar acceso al sistema financiero.",
                items: [
                  { title: "ASNEF: cómo salir tras cancelar deuda", to: "/blog/salir-asnef" },
                  { title: "Diferencias entre ASNEF, Badexcug, RAI y CIRBE" },
                  { title: "Cómo pedir formalmente la baja de un fichero" },
                  { title: "Estar en ASNEF y alquilar piso: qué dice la ley" },
                  { title: "Cuánto tarda en limpiarse el historial financiero" },
                ],
              },
              {
                angle: "Después de la cancelación",
                description: "Reconstruir economía, ahorro y vida financiera.",
                items: [
                  { title: "Después de cancelar deuda: hábitos para no volver al bloqueo", to: "/blog/vida-despues-deuda" },
                  { title: "Cómo reconstruir tu historial crediticio paso a paso" },
                  { title: "Volver a abrir una cuenta bancaria sin restricciones" },
                  { title: "Primer crédito tras una Segunda Oportunidad: cuándo y cómo" },
                  { title: "Plan de ahorro mínimo viable tras salir de las deudas" },
                ],
              },
              {
                angle: "Casos especiales y comparativas",
                description: "Dudas frecuentes y comparativas con otras vías.",
                items: [
                  { title: "Cuándo conviene renegociar deudas y cuándo iniciar una vía legal", to: "/blog/renegociar-acreedores" },
                  { title: "Reunificación de deudas vs. Segunda Oportunidad" },
                  { title: "Concurso de acreedores tradicional vs. Segunda Oportunidad" },
                  { title: "Acogerse en pareja: expediente conjunto o separado" },
                  { title: "Herencia con deudas: aceptarla a beneficio de inventario o repudiar" },
                ],
              },
            ]}
          />
          <InlineCTA
            title="¿No encuentras tu caso?"
            description="Cuéntanoslo: te decimos qué guía leer y, si encaja, cómo aplicarte la Segunda Oportunidad."
            buttonLabel="Analizar mi caso"
          />
        </>
      ),
    },
  ],
};