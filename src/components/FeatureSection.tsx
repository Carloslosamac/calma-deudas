import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-medium mb-6 text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Tu asesor financiero personal.
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Especializado en ayudarte a salir de cualquier endeudamiento.
          </p>
        </div>

        <div className="space-y-8">
          {/* First Feature - Create at the speed of thought */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-4xl font-medium text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Análisis instantáneo de tu situación
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Cuéntanos tu situación financiera y nuestro software analizará automáticamente todas tus deudas, ingresos y gastos para crear un plan personalizado de liberación de deudas.
                </p>
                <Button 
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3"
                  onClick={() => {
                    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  Analizar mi situación
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">C</span>
                      </div>
                      <span className="font-medium">Calma - Análisis Financiero</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Deudas Totales</span>
                        <span className="text-sm text-gray-600">Ahorro Potencial</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-red-600">€45,680</span>
                        <span className="text-lg text-green-600">€22,340</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Tengo deudas con 3 bancos, tarjetas de crédito y un préstamo personal. No puedo hacer frente a los pagos mensuales.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Feature - Backend built-in automatically */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2 space-y-6">
                <h3 className="text-4xl font-medium text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Estrategias legales automatizadas
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Nuestro sistema identifica automáticamente las mejores opciones legales para tu caso: Ley de Segunda Oportunidad, renegociación de deudas, refinanciación o prescripción de deudas.
                </p>
                <Button 
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3"
                  onClick={() => {
                    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  Ver mis opciones
                </Button>
              </div>
              <div className="lg:order-1 relative">
                <div className="bg-gradient-to-br from-orange-100 to-pink-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-semibold mb-4">Estrategias Legales Disponibles</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm">Ley de Segunda Oportunidad - Aplicable</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm">Renegociación con acreedores - Recomendada</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm">Prescripción de deudas - 2 casos detectados</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Refinanciación bancaria - En evaluación</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-400">Documentación legal - Pendiente</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third Feature - Ready to use instantly */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-4xl font-medium text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Acompañamiento hasta tu libertad financiera
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Te guiamos paso a paso durante todo el proceso. Desde la documentación necesaria hasta el seguimiento de cada gestión, nunca estarás solo en tu camino hacia la libertad financiera.
                </p>
                <Button 
                  className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3"
                  onClick={() => {
                    document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  Comenzar ahora
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 to-blue-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">C</span>
                        </div>
                        <span className="font-medium">Mi Progreso - Libertad Financiera</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    <h4 className="font-semibold mb-4">Estado de Mis Gestiones</h4>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <div className="text-xs text-gray-500">Deudas Canceladas</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">€18,240</div>
                        <div className="text-xs text-gray-500">Ahorrado Este Mes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">45%</div>
                        <div className="text-xs text-gray-500">Progreso Completado</div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Últimas Gestiones</h5>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div>Banco Santander - Renegociado</div>
                          <div>BBVA Tarjeta - Condonado 60%</div>
                          <div>Préstamo Personal - En trámite</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Estado General</h5>
                        <div className="w-20 h-20 bg-gradient-to-br from-green-200 to-blue-300 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-green-700">45%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;