import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Considérate sin límites.
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Si puedes describirlo, puedes crearlo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-gradient-card rounded-2xl p-8 mb-6 border border-white/20">
              <div className="h-32 w-full bg-accent/20 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-4xl">⚡</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Crea a la velocidad del pensamiento
            </h3>
            <p className="text-foreground/70 mb-4">
              Cuéntale tu idea a Base44 y observa cómo se transforma en una aplicación funcional—completa con todos los componentes, páginas, flujos y características necesarias.
            </p>
            <Button variant="outline" className="rounded-full">
              Empezar a crear
            </Button>
          </div>

          <div className="text-center">
            <div className="bg-gradient-card rounded-2xl p-8 mb-6 border border-white/20">
              <div className="h-32 w-full bg-orange/20 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Hermoso por diseño
            </h3>
            <p className="text-foreground/70 mb-4">
              Cada aplicación viene con componentes de interfaz pulidos y diseño responsivo que se ve genial en cualquier dispositivo.
            </p>
            <Button variant="outline" className="rounded-full">
              Explorar diseños
            </Button>
          </div>

          <div className="text-center">
            <div className="bg-gradient-card rounded-2xl p-8 mb-6 border border-white/20">
              <div className="h-32 w-full bg-accent/20 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Despliega al instante
            </h3>
            <p className="text-foreground/70 mb-4">
              Tu aplicación está lista para producción desde el primer día. Despliega con un solo clic para compartir con el mundo.
            </p>
            <Button variant="outline" className="rounded-full">
              Saber más
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;