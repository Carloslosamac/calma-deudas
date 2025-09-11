import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-card backdrop-blur-md border border-border rounded-full px-6 py-4 shadow-lg">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/beb08b22-aa72-4711-b632-b8ca0e28d20a.png" 
            alt="Calma Logo" 
            className="h-8"
          />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground/80 hover:text-foreground hover:font-bold transition-all">
            Segunda Oportunidad
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground hover:font-bold transition-all">
            Renegociación
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground hover:font-bold transition-all">
            Refinanciación
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground hover:font-bold transition-all">
            Guías
          </a>
        </nav>

        <Button variant="orange" className="rounded-full px-6">
          Encuentra tu solución
        </Button>
      </div>
    </header>
  );
};

export default Header;