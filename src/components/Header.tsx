import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between bg-background/80 backdrop-blur-md border border-border rounded-2xl px-6 py-4 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange">
            <span className="text-lg font-bold text-orange-foreground">B</span>
          </div>
          <span className="text-xl font-semibold text-foreground">Base 44</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Product
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Resources
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Enterprise
          </a>
        </nav>

        <Button variant="orange" className="rounded-full px-6">
          Start Building
        </Button>
      </div>
    </header>
  );
};

export default Header;