import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-medium mb-6 text-foreground font-poppins">
            Considérate sin límites.
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Si puedes describirlo, puedes crearlo.
          </p>
        </div>

        <div className="space-y-8">
          {/* First Feature - Create at the speed of thought */}
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-4xl font-medium text-foreground font-poppins">
                  Crea a la velocidad del pensamiento
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Cuéntale tu idea a Base44 y observa cómo se transforma en una aplicación funcional—completa con todos los componentes, páginas, flujos y características necesarias.
                </p>
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3">
                  Empezar a crear
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">S</span>
                      </div>
                      <span className="font-medium">SubTracker</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Active Subscriptions</span>
                        <span className="text-sm text-gray-600">Next Payment</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold">$110.36</span>
                        <span className="text-lg">$1324.27</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Create an app that helps people keep track of their subscriptions and alerts them to upcoming renewals</p>
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
                <h3 className="text-4xl font-medium text-foreground font-poppins">
                  El backend se construye automáticamente
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Todo lo que tu idea necesita para funcionar, como permitir que los usuarios se registren, guardar sus datos o crear permisos basados en roles, se maneja automáticamente detrás de escena.
                </p>
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3">
                  Empezar a crear
                </Button>
              </div>
              <div className="lg:order-1 relative">
                <div className="bg-gradient-to-br from-orange-100 to-pink-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h4 className="font-semibold mb-4">Building your Subscription Tracker app</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm">Setting up user authentication</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm">Building subscription database</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-sm">Configuring email notifications</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Configuring SMS notifications</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <span className="text-sm text-gray-400">Designing subscription cards</span>
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
                <h3 className="text-4xl font-medium text-foreground font-poppins">
                  Listo para usar al instante
                </h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  Nuestra plataforma viene con alojamiento integrado, así que cuando tu aplicación esté lista, lo único que tienes que hacer es publicarla, ponerla en uso y compartirla con tus amigos o comunidad.
                </p>
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 py-3">
                  Empezar a crear
                </Button>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-green-100 to-blue-200 rounded-3xl p-8 shadow-2xl">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">S</span>
                        </div>
                        <span className="font-medium">SubTracker</span>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      </div>
                    </div>
                    <h4 className="font-semibold mb-4">My Subscriptions</h4>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">10</div>
                        <div className="text-xs text-gray-500">Active Subscriptions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">$110.36</div>
                        <div className="text-xs text-gray-500">Next This Month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">$1324.27</div>
                        <div className="text-xs text-gray-500">Average Last 12 Months</div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <h5 className="font-medium text-sm mb-2">Recent Activity</h5>
                        <div className="space-y-1 text-xs text-gray-600">
                          <div>Daily Posts - $10.99</div>
                          <div>The Plaid - $16.99</div>
                          <div>SecondMind - $49.99</div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-sm mb-2">Overview</h5>
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full"></div>
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