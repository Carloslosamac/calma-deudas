import {
  CostFactorsGrid,
  DebtTypesDonut,
  DocumentsChecklist,
  MythVsReality,
  PersonasGrid,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import { Building2, FileSpreadsheet, Landmark, Truck, Wrench } from "lucide-react";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogAutonomos from "@/assets/blog-autonomos.jpg";

export const autonomosConDeudas: BlogPost = {
  slug: "autonomos-con-deudas",
  category: "Autónomos",
  title: "Autónomos con deudas: cómo proteger tu actividad y empezar de nuevo",
  seoTitle: "💼 Autónomos con deudas: cancela y vuelve a empezar",
  metaDescription:
    "Autónomos con deudas: opciones legales para proteger tu actividad, qué se puede cancelar (IVA, IRPF, Seguridad Social) y empezar de nuevo.",
  faq: [
    {
      question: "¿Un autónomo puede acogerse a la Ley de Segunda Oportunidad?",
      answer:
        "Sí. La ley está pensada especialmente para autónomos y particulares insolventes que actúan de buena fe.",
    },
    {
      question: "¿Se puede cancelar la deuda con Hacienda y la Seguridad Social?",
      answer:
        "La deuda pública tiene límites de exoneración, pero buena parte puede cancelarse o reestructurarse en un plan de pagos asumible.",
    },
    {
      question: "¿Tengo que cerrar mi negocio?",
      answer:
        "No necesariamente. Según el caso es posible mantener la actividad mientras se reordena y reduce la deuda.",
    },
    {
      question: "¿Respondo con mis bienes personales?",
      answer:
        "Si firmaste avales o eras administrador, puedes responder con bienes personales; el procedimiento ayuda a separar y limitar esa responsabilidad.",
    },
  ],
  excerpt:
    "Si trabajas por cuenta propia, hay formas de ordenar deudas sin cerrar la persiana. Repasamos opciones legales y errores frecuentes.",
  date: "30 abril 2026",
  readTime: "10 min",
  author: "Equipo legal Calma",
  authors: ["javier-ferrer", "lucia-ordonez"],
  heroImage: blogAutonomos,
  heroAlt: "Autónomo revisando facturas y cuentas en su pequeño negocio",
  keywords: [
    "autónomos",
    "deuda fiscal",
    "hacienda",
    "seguridad social",
    "cuota autónomos",
    "IVA",
    "IRPF",
    "avales personales",
    "segunda oportunidad",
  ],
  sidebar: {
    ctaTitle: "¿Eres autónomo y las deudas ahogan tu negocio?",
    ctaDescription:
      "Analizamos gratis tu caso y te decimos cómo cancelar tus deudas y volver a empezar.",
    ctaLabel: "Salvar mi negocio",
    benefits: [
      "Especialistas en deudas de autónomos",
      "Consulta gratuita y sin compromiso",
      "Si no ganamos, no cobramos",
      "Más de 500 casos gestionados",
    ],
  },
  sections: [
    {
      id: "panorama",
      title: "Por qué la deuda del autónomo es distinta",
      body: (
        <>
          <p>
            Ser autónomo en España implica responder con todo tu patrimonio: no hay separación entre tu actividad y
            tu vida personal salvo que hayas constituido una sociedad. Eso significa que una mala racha del negocio
            puede convertirse rápidamente en una deuda personal, especialmente con{" "}
            <ExtLink href="https://sede.agenciatributaria.gob.es/">Hacienda</ExtLink> y la{" "}
            <ExtLink href="https://sede.seg-social.gob.es/">Seguridad Social</ExtLink>, que tienen capacidad de
            embargo directo sin pasar por un juez.
          </p>
          <p>
            La regulación específica del autónomo está recogida en la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-12792">Ley 20/2007 del Estatuto del Trabajo Autónomo</ExtLink>,
            que define derechos como la figura del autónomo económicamente dependiente y la protección por cese de
            actividad. Pero la herramienta clave cuando la deuda ahoga la actividad es la Ley de Segunda Oportunidad,
            específicamente pensada para personas físicas que arrastran deuda profesional.
          </p>
        </>
      ),
    },
    {
      id: "tipos-deuda",
      title: "Qué tipo de deudas suele acumular un autónomo",
      body: (
        <>
          <p>
            En consulta vemos una mezcla habitual: cuotas de autónomos atrasadas, IVA e IRPF trimestrales sin
            ingresar, préstamos ICO o créditos al consumo solicitados para hacer frente a meses flojos,
            descubiertos con proveedores y, en muchos casos, avales personales firmados a la sociedad.
          </p>
          <DebtTypesDonut
            title="Composición típica de la deuda del autónomo"
            subtitle="Reparto medio en los casos que atendemos cada mes"
            segments={[
              { label: "Cuota de autónomos atrasada", value: 22, color: "hsl(25 90% 60%)" },
              { label: "IVA e IRPF (Hacienda)", value: 28, color: "hsl(0 70% 55%)" },
              { label: "Préstamos ICO / bancos", value: 24, color: "hsl(145 60% 35%)" },
              { label: "Proveedores y facturas", value: 16, color: "hsl(84 75% 55%)" },
              { label: "Avales personales", value: 10, color: "hsl(160 30% 18%)" },
            ]}
          />
          <p>
            La parte pública (Hacienda + Seguridad Social) suele ser la más urgente, porque tiene capacidad de
            embargo directo sin pasar por un juez. Si ya tienes una nómina o una cuenta embargada, te recomendamos
            leer la guía específica sobre{" "}
            <InternalLink to="/blog/embargos-segunda-oportunidad">cómo parar un embargo</InternalLink>.
          </p>
        </>
      ),
    },
    {
      id: "perfiles",
      title: "Tres perfiles típicos del autónomo endeudado",
      body: (
        <>
          <p>
            Aunque los importes y los sectores cambian, en consulta se repiten tres perfiles muy reconocibles:
            el oficio que vio caer el volumen de trabajo, el comercio de proximidad asfixiado por costes fijos y
            el profesional con sociedad disuelta que arrastra avales personales. Reconocerse en uno de ellos
            ayuda a diseñar la estrategia correcta desde el primer día.
          </p>
          <PersonasGrid
            title="Tres autónomos, tres puntos de partida"
            personas={[
              { icon: Wrench, title: "Oficio o reforma", desc: "Cuotas y materiales sin cobrar a tiempo por clientes morosos" },
              { icon: Truck, title: "Comercio o transporte", desc: "Costes fijos altos y márgenes que se han estrechado" },
              { icon: Building2, title: "Ex-administrador", desc: "Cerraste la sociedad y respondes con avales personales" },
            ]}
          />
          <p>
            El patrón compartido es similar: actividad que perdió rentabilidad, cuotas que se mantuvieron por
            inercia y una bola de nieve que crece con recargos e intereses. La buena noticia es que la ley
            permite poner orden de forma estructurada, sin tener que cerrar necesariamente la actividad.
          </p>
          <p>
            Si quieres ver la vía adaptada punto por punto a tu caso, tenemos una página dedicada a la{" "}
            <InternalLink to="/ley-segunda-oportunidad/perfiles/autonomos">
              Ley de Segunda Oportunidad para autónomos
            </InternalLink>{" "}
            con los matices de AEAT, Seguridad Social y cómo salvar la actividad. Si ya cerraste tu sociedad,
            mira también la{" "}
            <InternalLink to="/ley-segunda-oportunidad/perfiles/exempresarios">
              LSO tras cerrar tu SL
            </InternalLink>
            .
          </p>
        </>
      ),
    },
    {
      id: "opciones",
      title: "Opciones legales según tu situación",
      body: (
        <>
          <p>
            Dependiendo del volumen de deuda y de tus ingresos actuales hay tres caminos: <strong>renegociar</strong>{" "}
            con tus acreedores, solicitar un plan de pagos a Hacienda y Seguridad Social (regulado en la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2003-23186">Ley General Tributaria</ExtLink>{" "}
            y normativa de aplazamientos), o iniciar un{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">procedimiento de Segunda Oportunidad</InternalLink>{" "}
            que cancele lo que ya no puedes pagar.
          </p>
          <p>
            Para casos intermedios, donde la actividad sigue siendo viable, suele tener sentido combinar{" "}
            <InternalLink to="/blog/renegociar-acreedores">renegociación con acreedores privados</InternalLink> y
            aplazamiento con la administración pública, ganando tiempo sin entrar en el procedimiento judicial.
          </p>
          <InlineCTA
            title="¿Tu actividad está al límite?"
            description="Analizamos tu situación como autónomo y te decimos qué vía encaja antes de cerrar nada."
            buttonLabel="Salvar mi negocio"
          />
        </>
      ),
    },
    {
      id: "que-cubre",
      title: "Qué deuda se puede cancelar y cuál no",
      body: (
        <>
          <p>
            La normativa actual permite exonerar la mayoría de deuda privada (préstamos, tarjetas, microcréditos,
            descubiertos, proveedores, avales) y, con límites, deuda pública: hasta 10.000 € con Hacienda y otros
            10.000 € con Seguridad Social, ampliables con plan de pagos al resto.
          </p>
          <p>
            Quedan fuera las pensiones de alimentos, las responsabilidades civiles derivadas de delito y las
            multas penales. La ley está pensada para la actividad económica honesta, no para encubrir
            responsabilidades ajenas al negocio. Esa frontera es la que valida un juez antes de aprobar la
            exoneración.
          </p>
        </>
      ),
    },
    {
      id: "coste",
      title: "Cuánto cuesta arreglarlo y cuánto cuesta no hacerlo",
      body: (
        <>
          <p>
            El coste depende del volumen de deuda, del número de acreedores y de si hay sociedad o solo persona
            física implicada. Pero el verdadero coste suele estar al otro lado: recargos, intereses de demora del
            20% en Hacienda y Seguridad Social, y la imposibilidad de facturar con normalidad mientras los
            embargos siguen activos.
          </p>
          <CostFactorsGrid
            title="Qué encarece (o abarata) el caso de un autónomo"
            subtitle="Estos factores marcan la diferencia frente a un asalariado"
            factors={[
              { icon: FileSpreadsheet, title: "Deuda fiscal pendiente", desc: "IVA e IRPF acumulados requieren cruce con Hacienda" },
              { icon: Landmark, title: "Cuotas de Seguridad Social", desc: "Tesorería General aplica recargos del 20% sobre el principal" },
              { icon: Building2, title: "Sociedad y avales", desc: "Si hubo sociedad, hay que separar responsabilidades personales" },
              { icon: Truck, title: "Bienes afectos a la actividad", desc: "Vehículo, local o maquinaria requieren tratamiento específico" },
            ]}
          />
          <p>
            En la mayoría de casos, el coste del procedimiento se recupera en pocos meses solo por el cese de los
            recargos públicos y la suspensión de los embargos. La pregunta correcta no es <em>cuánto cuesta</em>,
            sino <em>cuánto te está costando no hacer nada</em> cada trimestre.
          </p>
        </>
      ),
    },
    {
      id: "proceso",
      title: "Cómo es el proceso para un autónomo",
      body: (
        <>
          <p>
            En un autónomo, el procedimiento sigue una estructura clara pero con matices propios: hay que separar
            actividad y persona, identificar si existen sociedades disueltas con avales y coordinar los plazos con
            las obligaciones fiscales en curso. Esto no debe asustar: es trabajo del equipo legal, no del cliente.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Diagnóstico", desc: "Revisamos contabilidad, deudas y avales firmados" },
              { title: "Estrategia", desc: "Decidimos: aplazar, renegociar o procedimiento" },
              { title: "Solicitud", desc: "Presentamos el expediente con la documentación" },
              { title: "Resolución", desc: "Cancelación o plan de pagos viable y sostenible" },
            ]}
          />
          <p>
            Mientras el procedimiento avanza, el autónomo puede seguir facturando con normalidad si la actividad
            es viable. No hay incompatibilidad legal entre acogerse a la Segunda Oportunidad y mantener el alta en
            el RETA: lo importante es que las nuevas cuotas se paguen al día desde el inicio del expediente.
          </p>
          <DocumentsChecklist
            title="Documentación específica del autónomo"
            subtitle="A diferencia del asalariado, hay que aportar también lo fiscal"
            items={[
              "Declaraciones de IVA e IRPF de los últimos ejercicios",
              "Modelo 347 si aplica",
              "Vida laboral actualizada",
              "Cuotas pendientes de Seguridad Social",
              "Listado de proveedores y saldos pendientes",
              "Contratos y avales personales firmados",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos del autónomo en deuda",
      body: (
        <>
          <p>
            En el día a día del autónomo circulan ideas equivocadas que retrasan la decisión durante años: que
            darse de baja borra la deuda, que Hacienda no negocia nunca, que tras cancelar ya no se podrá volver
            a facturar. Aclararlas suele ser el primer paso para mover ficha con cabeza.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Si me doy de baja, las deudas desaparecen",
                reality: "La deuda persiste; solo deja de generarse nueva cuota",
              },
              {
                myth: "Hacienda nunca negocia",
                reality: "Existen aplazamientos y fraccionamientos reglados por ley",
              },
              {
                myth: "Si cancelo, no podré volver a ser autónomo",
                reality: "Puedes seguir o reabrir actividad tras la resolución",
              },
            ]}
          />
          <p>
            La realidad es que la mayoría de autónomos que se acogen al procedimiento siguen trabajando durante
            todo el proceso y mantienen su actividad después. Lo que cambia no es el oficio, sino la mochila de
            deuda que se arrastraba.
          </p>
          <InlineCTA
            title="Ordenemos tu situación antes de tomar decisiones drásticas"
            description="Te decimos qué vía encaja con tu actividad sin cerrar nada precipitadamente."
            buttonLabel="Hablar con un especialista"
          />
        </>
      ),
    },
  ],
};
