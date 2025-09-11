import { Button } from "@/components/ui/button";

const FeatureSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Consider yourself limitless.
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            If you can describe it, you can build it.
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
              Create at the speed of thought
            </h3>
            <p className="text-foreground/70 mb-4">
              Tell Base44 your idea, and watch it transform into a working app—complete with all the necessary components, pages, flows and features.
            </p>
            <Button variant="outline" className="rounded-full">
              Start building
            </Button>
          </div>

          <div className="text-center">
            <div className="bg-gradient-card rounded-2xl p-8 mb-6 border border-white/20">
              <div className="h-32 w-full bg-orange/20 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Beautiful by design
            </h3>
            <p className="text-foreground/70 mb-4">
              Every app comes with polished UI components and responsive design that looks great on any device.
            </p>
            <Button variant="outline" className="rounded-full">
              Explore designs
            </Button>
          </div>

          <div className="text-center">
            <div className="bg-gradient-card rounded-2xl p-8 mb-6 border border-white/20">
              <div className="h-32 w-full bg-accent/20 rounded-xl mb-4 flex items-center justify-center">
                <span className="text-4xl">🚀</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">
              Deploy instantly
            </h3>
            <p className="text-foreground/70 mb-4">
              Your app is production-ready from day one. Deploy with a single click to share with the world.
            </p>
            <Button variant="outline" className="rounded-full">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;