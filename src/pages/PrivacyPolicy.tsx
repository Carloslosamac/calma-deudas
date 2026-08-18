import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "@/components/seo/Seo";
import { buildBreadcrumb } from "@/lib/seo/structuredData";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Política de privacidad"
        description="Política de privacidad de Calma: cómo tratamos tus datos cuando solicitas información sobre la Ley de Segunda Oportunidad."
        canonical="/politica-de-privacidad"
        structuredData={[
          buildBreadcrumb([
            { name: "Inicio", url: "/" },
            { name: "Política de privacidad", url: "/politica-de-privacidad" },
          ]),
        ]}
      />
      <Header />
      
      <main className="flex-1 bg-gradient-to-br from-background via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            Política de Privacidad
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/80">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Responsable del tratamiento</h2>
              <p>
                El responsable del tratamiento de tus datos personales es <strong>808 HI TECH ADVERTISING, S.L.</strong> (en
                adelante, "Calma"), con CIF <strong>B26602045</strong>, titular del sitio web mi-calma.es.
              </p>
              <p className="font-semibold">
                Email de contacto y privacidad: hello@mi-calma.es<br />
                Teléfono: +34 611 62 56 98
              </p>
              <p>
                Puedes dirigirte a esa dirección para cualquier cuestión relacionada con la protección de tus datos,
                incluido el ejercicio de tus derechos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Qué datos tratamos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identificativos y de contacto:</strong> nombre y apellidos, teléfono, email, provincia o localidad.</li>
                <li>
                  <strong>Datos económicos y de situación financiera:</strong> importe total de deuda, número y tipo de
                  préstamos, ingresos, situación laboral, existencia de embargos, impagos o inclusión en ficheros de
                  morosidad, bienes en propiedad y su estado de pago.
                </li>
                <li><strong>Datos de la interacción:</strong> conversaciones, llamadas, formularios completados y notas del asesor.</li>
                <li><strong>Datos técnicos:</strong> dirección IP, dispositivo, navegador, páginas visitadas y origen de la visita.</li>
              </ul>
              <p>
                Solo tratamos los datos que tú nos facilitas o que se generan en tu interacción con nosotros. No solicitamos
                categorías especiales de datos (salud, ideología, etc.); te pedimos que no los incluyas en campos libres.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Para qué usamos tus datos y con qué base legal</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Analizar tu caso y orientarte sobre soluciones de deuda</strong> (Ley de Segunda Oportunidad u
                  otras alternativas). Base legal: tu <em>consentimiento</em> y la aplicación de medidas precontractuales a
                  petición tuya.
                </li>
                <li>
                  <strong>Ponerte en contacto con el despacho, abogado o entidad colaboradora que pueda gestionar tu caso</strong>,
                  cediéndole los datos necesarios para ello. Base legal: tu <em>consentimiento expreso</em>, prestado de forma
                  específica e informada antes del envío.
                </li>
                <li><strong>Comunicaciones sobre tu solicitud</strong> (llamadas, email, WhatsApp o SMS). Base legal: consentimiento y ejecución de la relación.</li>
                <li><strong>Comunicaciones comerciales</strong> sobre servicios similares. Base legal: consentimiento o interés legítimo, con derecho de oposición en cualquier momento.</li>
                <li><strong>Medición, analítica y mejora del sitio</strong>. Base legal: consentimiento otorgado en el aviso de cookies.</li>
                <li><strong>Cumplimiento de obligaciones legales</strong> (fiscales, contables y de atención a autoridades). Base legal: obligación legal.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Terceros: cesiones y encargados</h2>
              <p>
                Queremos ser completamente transparentes con esto porque es el punto más importante de esta política.
                Calma opera en dos sentidos: <strong>por un lado captamos y cualificamos solicitudes de personas con deudas</strong>
                y <strong>por otro trabajamos con despachos y entidades especializadas</strong> que son quienes finalmente
                pueden prestar el servicio jurídico o financiero. Esto implica que, en determinados casos, tus datos se
                <strong> comunican a un tercero</strong>.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">4.1 Cesión a despachos y entidades colaboradoras</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  La cesión solo se produce <strong>si has marcado la casilla específica de consentimiento</strong> para que tu
                  caso sea remitido a un despacho o entidad colaboradora. Sin ese consentimiento, tus datos no se ceden.
                </li>
                <li>
                  Se cede únicamente <strong>la información necesaria</strong> para valorar y contactar tu caso: identificativos,
                  contacto y datos económicos relevantes.
                </li>
                <li>
                  El tercero que recibe tus datos actúa como <strong>responsable independiente</strong>: tratará tus datos bajo su
                  propia política de privacidad y será tu interlocutor para los derechos relativos a ese tratamiento. Te
                  informaremos de su identidad antes o en el momento de la cesión, y puedes solicitárnosla en cualquier
                  momento escribiendo a hello@mi-calma.es.
                </li>
                <li>
                  Trabajamos únicamente con colaboradores con los que hemos formalizado un acuerdo por escrito que incluye
                  obligaciones de confidencialidad, limitación de finalidad y prohibición de cesión ulterior no autorizada.
                </li>
                <li>
                  Puedes <strong>retirar tu consentimiento</strong> a la cesión en cualquier momento; la retirada no afecta a la
                  licitud del tratamiento anterior.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">4.2 Proveedores que tratan datos por cuenta de Calma</h3>
              <p>
                Además, contamos con proveedores que actúan como <strong>encargados del tratamiento</strong>, únicamente bajo
                nuestras instrucciones y con contrato conforme al art. 28 del RGPD. Por categorías:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Alojamiento web, bases de datos y copias de seguridad.</li>
                <li>CRM y herramientas de gestión comercial y seguimiento de solicitudes.</li>
                <li>Servicios de email, telefonía y mensajería para contactar contigo.</li>
                <li>Analítica web y medición de campañas publicitarias.</li>
                <li>Asesoría contable, fiscal y jurídica de la propia empresa.</li>
              </ul>
              <p>
                Puedes solicitar el listado actualizado y nominativo de encargados escribiendo a hello@mi-calma.es.
              </p>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">4.3 Lo que nunca hacemos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>No vendemos ni alquilamos tus datos a terceros ajenos a la finalidad para la que nos los diste.</li>
                <li>No cedemos tus datos a entidades financieras, aseguradoras o comercializadoras para fines propios de estas.</li>
                <li>No cedemos tus datos a ficheros de solvencia patrimonial ni a empresas de recobro.</li>
                <li>No utilizamos tus datos económicos para elaborar perfiles con efectos jurídicos ni decisiones automatizadas que te afecten significativamente: la valoración final de tu caso siempre la revisa una persona.</li>
              </ul>

              <h3 className="text-xl font-semibold text-foreground mt-6 mb-2">4.4 Si llegas a nosotros desde un colaborador</h3>
              <p>
                Cuando recibimos tus datos de un tercero (por ejemplo, un portal o comparador con el que colaboramos), lo
                hacemos amparados en el consentimiento que prestaste ante ese tercero, tratamos las mismas categorías de
                datos descritas en el apartado 2 y te informamos de ello en el primer contacto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Transferencias internacionales</h2>
              <p>
                Con carácter general, tus datos se tratan dentro del Espacio Económico Europeo. Si alguno de nuestros
                proveedores tecnológicos implica una transferencia fuera del EEE, se realiza con las garantías previstas en
                el RGPD: decisión de adecuación de la Comisión Europea o cláusulas contractuales tipo, junto con medidas
                adicionales cuando resulten necesarias. Puedes solicitar información sobre estas garantías en hello@mi-calma.es.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Plazos de conservación</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Solicitudes que no derivan en contratación:</strong> hasta 1 año desde el último contacto, salvo que retires antes tu consentimiento.</li>
                <li><strong>Casos derivados a un colaborador:</strong> conservamos la trazabilidad del consentimiento y de la cesión durante el plazo necesario para acreditar su licitud.</li>
                <li><strong>Relaciones contractuales:</strong> durante la relación y, después, durante los plazos de prescripción legal y fiscal aplicables.</li>
                <li><strong>Datos de marketing:</strong> hasta que te des de baja u opongas al tratamiento.</li>
              </ul>
              <p>Transcurridos esos plazos, los datos se suprimen o anonimizan de forma segura.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Seguridad</h2>
              <p>
                Aplicamos medidas técnicas y organizativas apropiadas al riesgo: cifrado de las comunicaciones, control de
                accesos por rol, autenticación de los usuarios internos, registro de actividad, copias de seguridad y
                acuerdos de confidencialidad con el personal y los colaboradores.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Tus derechos</h2>
              <p>Conforme al RGPD y a la LOPDGDD, puedes ejercer en cualquier momento los derechos de:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceso a tus datos personales y a la información sobre su tratamiento.</li>
                <li>Rectificación de datos inexactos o incompletos.</li>
                <li>Supresión ("derecho al olvido").</li>
                <li>Limitación del tratamiento.</li>
                <li>Oposición, incluida la oposición a comunicaciones comerciales.</li>
                <li>Portabilidad de los datos que nos facilitaste.</li>
                <li>Retirada del consentimiento en cualquier momento, incluida la cesión a colaboradores.</li>
              </ul>
              <p>
                Para ejercerlos, escribe a <strong>hello@mi-calma.es</strong> indicando el derecho que ejercitas y adjuntando
                un documento que acredite tu identidad. Responderemos en el plazo máximo de un mes. Si consideras que no
                hemos atendido correctamente tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos
                (www.aepd.es).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Cookies</h2>
              <p>
                Utilizamos cookies propias y de terceros para el funcionamiento del sitio, la analítica y la medición de
                campañas. Las cookies no necesarias solo se activan con tu consentimiento y puedes modificarlo en cualquier
                momento desde el panel de configuración de cookies o desde tu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Cambios en esta política</h2>
              <p>
                Podemos actualizar esta política para adaptarla a cambios legales u operativos. Publicaremos siempre la
                versión vigente en esta página e indicaremos la fecha de la última actualización.
              </p>
            </section>

            <p className="text-sm text-muted-foreground mt-8">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;