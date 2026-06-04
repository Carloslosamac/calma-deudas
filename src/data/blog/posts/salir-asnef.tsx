import {
  BeforeAfterSplit,
  DocumentsChecklist,
  MythVsReality,
  ProcessTimeline,
} from "@/components/blog/diagrams";
import InlineCTA from "@/components/blog/InlineCTA";
import { ExtLink, InternalLink } from "../shared";
import type { BlogPost } from "../types";
import blogAsnef from "@/assets/blog-asnef.jpg";

export const salirAsnef: BlogPost = {
  slug: "salir-asnef",
  category: "ASNEF",
  title: "ASNEF: cómo salir de un fichero de morosidad después de cancelar deuda",
  seoTitle: "Cómo salir de ASNEF tras cancelar tu deuda",
  excerpt:
    "Estar en un fichero puede bloquearte durante años. Estos son los pasos para pedir la baja y recuperar acceso a financiación básica.",
  date: "5 mayo 2026",
  readTime: "8 min",
  author: "Equipo legal Calma",
  heroImage: blogAsnef,
  heroAlt: "Mujer comprobando en el portátil su situación financiera tras salir de ASNEF",
  keywords: [
    "ASNEF",
    "fichero de morosidad",
    "baja ASNEF",
    "RGPD",
    "LOPDGDD",
    "AEPD",
    "derecho de acceso",
    "historial crediticio",
  ],
  sections: [
    {
      id: "que-es-asnef",
      title: "Qué es ASNEF y por qué te bloquea",
      body: (
        <>
          <p>
            ASNEF (Asociación Nacional de Establecimientos Financieros de Crédito) es el <strong>fichero de
            morosidad</strong> más utilizado en España. Cuando un acreedor declara una deuda como impagada, los datos
            se comparten con bancos y financieras, lo que en la práctica equivale a cerrar la puerta a cualquier
            préstamo, hipoteca, tarjeta o incluso, en algunos casos, contratos con compañías de telefonía o energía.
          </p>
          <p>
            Estar en ASNEF no es una condena permanente, pero tampoco se borra solo. Existen reglas muy claras
            sobre cuándo se puede pedir la baja y, sobre todo, sobre qué derechos tienes para exigirla, recogidos
            en el{" "}
            <ExtLink href="https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673">
              Reglamento General de Protección de Datos y la LOPDGDD
            </ExtLink>.
          </p>
        </>
      ),
    },
    {
      id: "cuando-borrar",
      title: "Cuándo puedes pedir la baja en ASNEF",
      body: (
        <>
          <p>
            Hay tres situaciones típicas que permiten solicitar la baja: cuando la deuda se ha pagado, cuando ha
            sido cancelada por una resolución judicial (por ejemplo, mediante la{" "}
            <InternalLink to="/blog/cancelar-deudas-requisitos">Ley de Segunda Oportunidad</InternalLink>) o cuando
            ha caducado el plazo máximo de cinco años desde su exigibilidad.
          </p>
          <p>
            También puede solicitarse si la inclusión fue indebida: importes incorrectos, deudas prescritas o
            datos comunicados sin requerimiento previo de pago. En estos casos, la baja debe ser inmediata y, además,
            puede dar derecho a indemnización.
          </p>
        </>
      ),
    },
    {
      id: "pasos",
      title: "Pasos para salir de ASNEF tras cancelar deudas",
      body: (
        <>
          <p>
            Una vez cancelada la deuda mediante el procedimiento legal, salir de ASNEF es un trámite documental.
            Lo importante es seguir el orden correcto para que el fichero no vuelva a reactivarse.
          </p>
          <ProcessTimeline
            steps={[
              { title: "Resolución", desc: "Obtienes la cancelación judicial de la deuda" },
              { title: "Notificación", desc: "Se comunica al acreedor el cambio de estado" },
              { title: "Solicitud", desc: "Pides la baja por escrito a ASNEF y al acreedor" },
              { title: "Verificación", desc: "Confirmamos que ya no apareces en el fichero" },
            ]}
          />
          <p>
            Si solo quieres comprobar si estás incluido, puedes ejercer el <em>derecho de acceso</em> ante la{" "}
            <ExtLink href="https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos">Agencia Española de Protección de Datos</ExtLink>{" "}
            y solicitar gratuitamente tus datos al fichero.
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
            La solicitud de baja en ASNEF es un trámite documental, pero hay que aportar exactamente lo que el
            responsable del fichero puede aceptar como prueba. Cuanto más claros sean los documentos, más rápida
            será la baja efectiva (la ley obliga a resolver en un mes desde la solicitud).
          </p>
          <DocumentsChecklist
            title="Documentos para pedir la baja en ASNEF"
            subtitle="La mayoría se obtienen en el momento, no hace falta papeleo extra"
            items={[
              "DNI en vigor",
              "Sentencia o resolución judicial de cancelación",
              "Justificante de pago, si lo hubiera",
              "Notificaciones previas del acreedor",
              "Solicitud de baja firmada",
            ]}
          />
          <p>
            Toda esta documentación se presenta junto a la solicitud al responsable del fichero. Si quieres ver el
            modelo oficial, la{" "}
            <ExtLink href="https://www.aepd.es/">AEPD</ExtLink> publica formularios estándar para ejercer derechos
            ARCO y de oposición.
          </p>
        </>
      ),
    },
    {
      id: "antes-despues",
      title: "Antes y después de salir del fichero",
      body: (
        <>
          <p>
            La diferencia, una vez fuera de ASNEF, es muy concreta: vuelves a tener acceso a productos básicos y
            puedes volver a planificar a medio plazo. No significa que recuperes inmediatamente la confianza de
            los bancos para grandes operaciones, pero abre la puerta para reconstruir el historial.
          </p>
          <BeforeAfterSplit
            before={[
              "Te rechazan tarjetas y préstamos",
              "No puedes domiciliar suministros nuevos",
              "Compañías de telefonía piden fianza",
              "Pides dinero a familiares por necesidad",
            ]}
            after={[
              "Vuelves a contratar productos básicos",
              "Puedes financiar pequeñas compras",
              "Recuperas autonomía con tus suministros",
              "Empiezas a reconstruir historial crediticio",
            ]}
          />
        </>
      ),
    },
    {
      id: "mitos",
      title: "Mitos frecuentes sobre ASNEF",
      body: (
        <>
          <p>
            Sobre ASNEF circulan creencias muy extendidas que han retrasado durante años la baja de muchas
            personas que ya tenían derecho a salir. Repasamos las tres más comunes para que decidas con la ley en
            la mano, no con rumores de foro.
          </p>
          <MythVsReality
            rows={[
              {
                myth: "Una vez en ASNEF, son 6 años mínimo",
                reality: "El plazo máximo es de 5 años y, si pagas o cancelas, debes salir antes",
              },
              {
                myth: "No puedo hacer nada hasta pagar todo",
                reality: "La Segunda Oportunidad cancela judicialmente la deuda y permite la baja",
              },
              {
                myth: "ASNEF puede mantenerme indefinidamente",
                reality: "El RGPD obliga a borrar los datos cuando ya no son necesarios",
              },
            ]}
          />
          <p>
            Si la causa de tu inclusión está vinculada a deudas que ya no puedes pagar, lo razonable es atacar el
            problema desde la raíz. Antes de centrarte solo en el fichero, valora si encaja una{" "}
            <InternalLink to="/blog/renegociar-acreedores">renegociación con acreedores</InternalLink> o un
            procedimiento legal completo.
          </p>
          <InlineCTA
            title="¿Estás en ASNEF y no sabes por dónde empezar?"
            description="Analizamos tu caso y te decimos qué pasos seguir para salir del fichero."
            buttonLabel="Salir de ASNEF"
          />
        </>
      ),
    },
  ],
};