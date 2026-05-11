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
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Información que Recopilamos</h2>
              <p>
                En Adiós Deudas, recopilamos la información que nos proporcionas directamente cuando utilizas nuestros servicios, 
                incluyendo pero no limitado a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Información sobre tu situación financiera (monto de deuda, número de préstamos, estado de morosidad)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Uso de la Información</h2>
              <p>
                Utilizamos la información recopilada para los siguientes propósitos:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar y mejorar nuestros servicios de cancelación de deuda</li>
                <li>Comunicarnos contigo sobre tu solicitud y nuestros servicios</li>
                <li>Analizar tu situación financiera para ofrecerte la mejor solución</li>
                <li>Cumplir con requisitos legales y regulatorios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Protección de Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal 
                contra el acceso no autorizado, alteración, divulgación o destrucción. Esto incluye:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encriptación de datos en tránsito y en reposo</li>
                <li>Acceso restringido a información personal solo a empleados autorizados</li>
                <li>Auditorías de seguridad regulares</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Compartir Información</h2>
              <p>
                No vendemos ni alquilamos tu información personal a terceros. Solo compartimos información con:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proveedores de servicios que nos ayudan a operar nuestro negocio</li>
                <li>Asesores legales y financieros cuando sea necesario para prestarte nuestros servicios</li>
                <li>Autoridades cuando sea requerido por ley</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Tus Derechos</h2>
              <p>
                Conforme al Reglamento General de Protección de Datos (RGPD), tienes derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar datos inexactos o incompletos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
                <li>Solicitar la portabilidad de tus datos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies</h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. 
                Puedes controlar el uso de cookies a través de la configuración de tu navegador.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cambios en esta Política</h2>
              <p>
                Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. 
                Te notificaremos sobre cambios significativos publicando la nueva política en esta página.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tu información personal, 
                puedes contactarnos en:
              </p>
              <p className="font-semibold">
                Email: info@adiosdeudas.com<br />
                Teléfono: +34 900 123 456
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