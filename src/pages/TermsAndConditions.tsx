import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "@/components/seo/Seo";
import { buildBreadcrumb } from "@/lib/seo/structuredData";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo
        title="Términos y condiciones"
        description="Términos y condiciones del servicio legal de Calma para la Ley de Segunda Oportunidad."
        canonical="/terminos-y-condiciones"
        structuredData={[
          buildBreadcrumb([
            { name: "Inicio", url: "/" },
            { name: "Términos y condiciones", url: "/terminos-y-condiciones" },
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
            Términos y Condiciones
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/80">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar los servicios de Adiós Deudas, aceptas estar vinculado por estos términos y condiciones. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Descripción del Servicio</h2>
              <p>
                Adiós Deudas es un servicio de asesoramiento y gestión para la cancelación de deudas. Nuestros servicios incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Análisis de tu situación financiera</li>
                <li>Negociación con acreedores</li>
                <li>Asesoramiento legal y financiero</li>
                <li>Gestión de procesos de cancelación de deuda</li>
              </ul>
              <p className="mt-4">
                No garantizamos resultados específicos, ya que cada caso depende de múltiples factores únicos a tu situación.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Elegibilidad</h2>
              <p>
                Para utilizar nuestros servicios, debes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Ser mayor de 18 años</li>
                <li>Tener capacidad legal para celebrar contratos vinculantes</li>
                <li>Residir en España</li>
                <li>Proporcionar información veraz y completa</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Tarifas y Pagos</h2>
              <p>
                Nuestros servicios están sujetos a las tarifas establecidas en nuestros planes de precios. Las condiciones incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Todas las tarifas se comunican claramente antes de contratar el servicio</li>
                <li>Los pagos se procesan de forma segura a través de proveedores de pago autorizados</li>
                <li>Las tarifas son no reembolsables excepto donde la ley lo requiera</li>
                <li>Nos reservamos el derecho de modificar las tarifas con previo aviso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Obligaciones del Cliente</h2>
              <p>
                Como cliente de Adiós Deudas, te comprometes a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar información veraz, completa y actualizada</li>
                <li>Cooperar en el proceso de análisis y negociación</li>
                <li>Notificarnos inmediatamente sobre cambios en tu situación financiera</li>
                <li>Cumplir con las recomendaciones y acuerdos establecidos</li>
                <li>No utilizar los servicios para propósitos ilegales o fraudulentos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitación de Responsabilidad</h2>
              <p>
                Adiós Deudas no será responsable por:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Decisiones tomadas por acreedores sobre negociaciones de deuda</li>
                <li>Cambios en tu situación crediticia durante el proceso</li>
                <li>Consecuencias fiscales de la cancelación de deuda</li>
                <li>Interrupciones del servicio debido a circunstancias fuera de nuestro control</li>
              </ul>
              <p className="mt-4">
                Nuestra responsabilidad máxima estará limitada al monto pagado por los servicios en los últimos 12 meses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Confidencialidad</h2>
              <p>
                Toda la información compartida durante el proceso de asesoramiento será tratada como confidencial 
                según lo establecido en nuestra Política de Privacidad y las leyes aplicables de protección de datos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Rescisión</h2>
              <p>
                Tanto tú como Adiós Deudas pueden rescindir el servicio en cualquier momento:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Tú puedes cancelar con 30 días de aviso previo por escrito</li>
                <li>Podemos suspender o terminar servicios si incumples estos términos</li>
                <li>La rescisión no afecta obligaciones ya contraídas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Propiedad Intelectual</h2>
              <p>
                Todo el contenido, marcas registradas, logotipos y propiedad intelectual en nuestro sitio web 
                son propiedad de Adiós Deudas y están protegidos por las leyes de propiedad intelectual.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
                Los cambios significativos serán notificados por correo electrónico o mediante aviso en nuestro sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos términos se rigen por las leyes de España. Cualquier disputa será resuelta en los tribunales 
                competentes de Madrid, España.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contacto</h2>
              <p>
                Para preguntas sobre estos términos y condiciones, puedes contactarnos en:
              </p>
              <p className="font-semibold">
                Email: info@adiosdeudas.com<br />
                Teléfono: +34 900 123 456<br />
                Dirección: Madrid, España
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

export default TermsAndConditions;