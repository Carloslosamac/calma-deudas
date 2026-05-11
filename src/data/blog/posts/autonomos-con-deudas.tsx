import {
  CostFactorsGrid,
  DebtTypesDonut,
  DocumentsChecklist,
  MythVsReality,
  PersonasGrid,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogAutonomos from "@/assets/blog-autonomos.jpg";

export const autonomosConDeudas: BlogPost = {
  slug: "autonomos-con-deudas",
  category: "Autónomos",
  title: "Autónomos con deudas: cómo proteger tu actividad y empezar de nuevo",
  excerpt:
    "Si trabajas por cuenta propia, hay formas de ordenar deudas sin cerrar la persiana. Repasamos opciones legales y errores frecuentes.",
  date: "30 abril 2026",
  readTime: "10 min",
  author: "Equipo legal Calma",
  heroImage: blogAutonomos,
  heroAlt: "Autónomo revisando facturas y cuentas en su pequeño negocio",
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
            <ExtLink href="https://sede.seg-social.gob.es/">Seguridad Social</ExtLink>.
          </p>
          <p>
            La regulación específica del autónomo está recogida en la{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-12792">Ley 20/2007 del Estatuto del Trabajo Autónomo</ExtLink>,
            que define derechos como la figura del autónomo económicamente dependiente y la protección por cese de
            actividad. Pero la herramienta clave cuando la deuda ahoga la actividad es la Ley de Segunda Oportunidad.
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
            En consulta vemos una mezcla habitual: cuotas de autónomos atrasadas, IVA y IRPF trimestrales sin
            ingresar, préstamos ICO o créditos al consumo solicitados para hacer frente a meses flojos,
            descubiertos con proveedores y, en muchos casos, avales personales firmados a la sociedad.
          </p>
          <DebtTypesDonut />
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
          <PersonasGrid />
          <p>
            Aunque las cifras cambian, el patrón es similar: actividad que perdió rentabilidad, cuotas que se
            mantuvieron por inercia, y una bola de nieve que crece con recargos e intereses. La buena noticia es
            que la ley permite poner orden de forma estructurada, sin tener que cerrar necesariamente la actividad.
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
            buttonLabel="Analizar mi caso"
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
            responsabilidades ajenas al negocio.
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
            20% en Hacienda y Seguridad Social, y la imposibilidad de facturar con normalidad.
          </p>
          <CostFactorsGrid />
        </>
      ),
    },
    {
      id: "proceso",
      title: "Cómo es el proceso para un autónomo",
      body: (
        <>
          <ProcessTimeline
            steps={[
              { title: "Diagnóstico", desc: "Revisamos contabilidad, deudas y avales" },
              { title: "Estrategia", desc: "Decidimos: aplazar, renegociar o procedimiento" },
              { title: "Solicitud", desc: "Se presenta el expediente con la documentación" },
              { title: "Resolución", desc: "Cancelación o plan de pagos viable" },
            ]}
          />
          <DocumentsChecklist
            items={[
              "Declaraciones de IVA e IRPF",
              "Modelo 347 si aplica",
              "Vida laboral",
              "Cuotas pendientes de Seguridad Social",
              "Listado de proveedores y saldos",
              "Avales personales firmados",
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