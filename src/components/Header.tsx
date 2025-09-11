import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-background/80 backdrop-blur-md border border-border rounded-full px-6 py-4 shadow-lg">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/51c821dd-bacb-426f-8855-2ad262521efc.png" 
            alt="Calma Logo" 
            className="h-8"
          />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Producto
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Recursos
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Precios
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Empresa
          </a>
        </nav>

        <Button variant="orange" className="rounded-full px-6">
          Empezar a Crear
        </Button>
      </div>
    </header>
  );
};

export default Header;