import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Title and description */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-medium mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Consulta gratuita para{" "}
              <span className="text-orange-500">toda necesidad</span>
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Comienza tu camino hacia la libertad financiera sin ningún costo inicial. 
              Nuestro análisis y asesoramiento son completamente gratuitos.
            </p>
          </div>

          {/* Right side - Free service card */}
          <div className="flex justify-center">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-white/20 max-w-md w-full">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Comienza gratis.
                </h3>
                <p className="text-gray-600">
                  Obtén acceso completo a:
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Análisis completo de tu situación financiera</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Identificación de estrategias legales aplicables</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Plan personalizado de liberación de deudas</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Acompañamiento durante todo el proceso</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Sin costos ocultos ni sorpresas</span>
                </div>
              </div>

              <Button className="w-full bg-gray-900 text-white hover:bg-gray-800 rounded-2xl py-4 text-lg font-medium">
                Comenzar gratis
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  ✨ Solo cobramos cuando recuperas tu dinero
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;