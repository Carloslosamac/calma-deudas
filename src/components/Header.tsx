import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-4 left-2 right-2 z-50">
      <div className="mx-auto flex w-full items-center justify-between bg-card backdrop-blur-md border border-border rounded-full px-6 py-4 shadow-lg">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/8698ae24-c99d-402f-ba9e-a4bb74712c31.png" 
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

        <Button 
          variant="orange" 
          className="rounded-full px-6"
          onClick={() => {
            document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
        >
          Encuentra tu solución
        </Button>
      </div>
    </header>
  );
};

export default Header;