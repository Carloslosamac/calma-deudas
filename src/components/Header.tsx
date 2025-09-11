import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-80 z-50 bg-card/95 backdrop-blur-md border-r border-border shadow-2xl">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center p-6 border-b border-border">
          <img 
            src="/lovable-uploads/8698ae24-c99d-402f-ba9e-a4bb74712c31.png" 
            alt="Calma Logo" 
            className="h-8"
          />
        </div>
        
        {/* Navigation Section */}
        <nav className="flex-1 p-6">
          <div className="space-y-6">
            <a href="#" className="block text-foreground/80 hover:text-foreground hover:font-bold transition-all py-3 px-4 rounded-lg hover:bg-foreground/5">
              Segunda Oportunidad
            </a>
            <a href="#" className="block text-foreground/80 hover:text-foreground hover:font-bold transition-all py-3 px-4 rounded-lg hover:bg-foreground/5">
              Renegociación
            </a>
            <a href="#" className="block text-foreground/80 hover:text-foreground hover:font-bold transition-all py-3 px-4 rounded-lg hover:bg-foreground/5">
              Refinanciación
            </a>
            <a href="#" className="block text-foreground/80 hover:text-foreground hover:font-bold transition-all py-3 px-4 rounded-lg hover:bg-foreground/5">
              Guías
            </a>
          </div>
        </nav>

        {/* Bottom Button */}
        <div className="p-6 border-t border-border">
          <Button variant="orange" className="w-full rounded-full">
            Encuentra tu solución
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Header;