import { useEffect, useState } from "react";
import { MessageCircle, ShieldCheck } from "lucide-react";

export type TocItem = { id: string; label: string };

export type SidebarContent = {
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  benefits: string[];
};

const DEFAULT_SIDEBAR: SidebarContent = {
  ctaTitle: "¿Quieres saber cuánto costaría tu procedimiento?",
  ctaDescription:
    "Te hacemos un análisis gratuito y te decimos con claridad qué solución encaja contigo.",
  ctaLabel: "Analizar mi caso",
  benefits: [
    "Especialistas en Ley de Segunda Oportunidad",
    "Consulta gratuita y sin compromiso",
    "Si no ganamos, no cobramos",
    "Más de 500 casos gestionados",
  ],
};

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top));
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join("|")]);

  return active;
};

const BlogSidebar = ({
  toc,
  sidebar,
}: {
  toc: TocItem[];
  sidebar?: SidebarContent;
}) => {
  const active = useActiveSection(toc.map((t) => t.id));
  const content = sidebar ?? DEFAULT_SIDEBAR;

  return (
    <aside className="sticky top-28 space-y-6">
      {/* Tabla de contenido */}
      <nav
        aria-label="Contenido del artículo"
        className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft"
      >
        <p className="mb-4 font-poppins font-semibold text-foreground">Contenido</p>
        <ul className="space-y-3 text-sm">
          {toc.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <span
                  aria-hidden
                  className={`absolute left-0 top-0 h-full w-0.5 rounded-full transition-colors ${
                    isActive ? "bg-accent-deep" : "bg-transparent"
                  }`}
                />
                <a
                  href={`#${item.id}`}
                  className={`block pl-3 leading-snug transition-colors ${
                    isActive
                      ? "font-semibold text-accent-deep"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* CTA principal */}
      <div className="rounded-3xl border border-accent/30 bg-accent-soft/40 p-6 shadow-soft">
        <h3 className="font-poppins text-lg font-semibold leading-snug text-foreground">
          {content.ctaTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {content.ctaDescription}
        </p>
        <a
          href="/#hero-form"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-glow"
        >
          <MessageCircle className="h-4 w-4" />
          {content.ctaLabel}
        </a>
      </div>

      {/* Por qué nosotros */}
      <div className="rounded-3xl border border-border bg-surface-elevated p-6 shadow-soft">
        <p className="mb-4 font-poppins font-semibold text-foreground">¿Por qué Calma?</p>
        <ul className="space-y-3 text-sm">
          {content.benefits.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent-deep" />
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default BlogSidebar;