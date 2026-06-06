import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

// "Soluciones" = servicios / métodos que ofrece Calma.
const solucionesItems = [
  { label: "Ley de Segunda Oportunidad", to: "/ley-segunda-oportunidad" },
  { label: "Cancelar deudas", to: "/cancelar-deudas" },
  { label: "Reunificar deudas", to: "/reunificar-deudas" },
  { label: "Exoneración del pasivo insatisfecho", to: "/ley-segunda-oportunidad/exoneracion-pasivo-insatisfecho" },
  { label: "Concurso de persona física", to: "/autonomos-concurso-acreedores/concurso-persona-fisica" },
  { label: "Cancelar tarjetas revolving", to: "/tarjetas-revolving/cancelar-tarjetas-revolving" },
  { label: "Cancelar microcréditos", to: "/microcreditos-prestamos/cancelar-microcreditos" },
];

// "¿Qué necesitas?" = situaciones urgentes, en primera persona.
const necesitasItems = [
  { label: "Me van a embargar", to: "/embargos/parar-embargo" },
  { label: "Estoy en ASNEF", to: "/asnef/salir-de-asnef" },
  { label: "Me ha llegado un juicio monitorio", to: "/juicio-monitorio-recobro/juicio-monitorio-deuda" },
  { label: "Una empresa de recobro me reclama", to: "/empresas-de-recobro" },
  { label: "Recibo llamadas de acoso", to: "/empresas-de-recobro" },
];

const entidadesItems = [
  { label: "Empresas de recobro", to: "/empresas-de-recobro" },
  { label: "Microcréditos", to: "/microcreditos-prestamos" },
  { label: "Tarjetas revolving", to: "/tarjetas-revolving" },
  { label: "Bancos e hipoteca", to: "/bancos-hipoteca-vivienda" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const menus: { id: string; label: string; items: { label: string; to: string }[] }[] = [
    { id: "soluciones", label: "Soluciones", items: solucionesItems },
    { id: "problema", label: "¿Qué necesitas?", items: necesitasItems },
    { id: "entidades", label: "Entidades", items: entidadesItems },
  ];

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

        <nav
          className="hidden lg:flex items-center gap-6 text-sm"
          onMouseLeave={() => setOpenMenu(null)}
        >
          {menus.map((menu) => (
            <div
              key={menu.id}
              className="relative"
              onMouseEnter={() => setOpenMenu(menu.id)}
            >
              <button
                type="button"
                className="inline-flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
                aria-expanded={openMenu === menu.id}
              >
                {menu.label}
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              {openMenu === menu.id && (
                <div className="absolute left-0 top-full pt-3">
                  <ul className="w-64 rounded-2xl border border-border/60 bg-white/95 backdrop-blur-xl p-2 shadow-medium">
                    {menu.items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className="block rounded-xl px-3 py-2 text-foreground/80 hover:bg-accent-soft/50 hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
          <a href="/#como-funciona" className="text-foreground/70 hover:text-foreground transition-colors">
            Cómo funciona
          </a>
          <Link to="/blog" className="text-foreground/70 hover:text-foreground transition-colors">
            Blog
          </Link>
        </nav>

        <Button
          className="rounded-full px-5 h-10 text-sm shadow-soft bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={scrollToForm}
        >
          Analizar mi deuda
        </Button>

        <button
          type="button"
          className="lg:hidden inline-flex items-center justify-center rounded-full p-2 text-foreground/70 hover:text-foreground transition-colors"
          aria-label="Abrir menú"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mx-auto mt-2 w-full max-w-6xl rounded-3xl border border-border/60 bg-white/95 backdrop-blur-xl p-4 shadow-medium">
          <nav className="flex flex-col gap-1 text-sm">
            {menus.map((menu) => (
              <div key={menu.id} className="py-1">
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {menu.label}
                </p>
                <ul>
                  {menu.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-3 py-2 text-foreground/80 hover:bg-accent-soft/50 hover:text-foreground transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href="/#como-funciona"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-foreground/80 hover:bg-accent-soft/50 hover:text-foreground transition-colors"
            >
              Cómo funciona
            </a>
            <Link
              to="/blog"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-2 text-foreground/80 hover:bg-accent-soft/50 hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
