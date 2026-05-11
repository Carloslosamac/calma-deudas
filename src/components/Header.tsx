import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () => {
    const form = document.getElementById("hero-form");

    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    window.location.href = "/#hero-form";
  };

  return (
    <header className="fixed top-4 left-2 right-2 z-50">
      <div
        className={`mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border border-border/60 shadow-medium"
            : "bg-white/60 backdrop-blur-md border border-white/40 shadow-soft"
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/lovable-uploads/8698ae24-c99d-402f-ba9e-a4bb74712c31.png"
            alt="Calma Logo"
            className="h-8"
          />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground ml-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            Asesores online
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          <a href="/#como-funciona" className="text-foreground/70 hover:text-foreground transition-colors">
            Cómo funciona
          </a>
          <a href="/#soluciones" className="text-foreground/70 hover:text-foreground transition-colors">
            Soluciones
          </a>
          <Link to="/blog" className="text-foreground/70 hover:text-foreground transition-colors">
            Blog
          </Link>
          <a href="/#testimonios" className="text-foreground/70 hover:text-foreground transition-colors">
            Casos reales
          </a>
          <a href="/#preguntas" className="text-foreground/70 hover:text-foreground transition-colors">
            FAQ
          </a>
        </nav>

        <Button
          className="rounded-full px-5 h-10 text-sm shadow-soft bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={scrollToForm}
        >
          Analizar mi deuda
        </Button>
      </div>
    </header>
  );
};

export default Header;
