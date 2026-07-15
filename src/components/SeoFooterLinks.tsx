import { Link } from "react-router-dom";
import { moneyPages } from "@/data/seo/moneyPages";
import { clusters } from "@/data/seo/architecture";
import { comparativas } from "@/data/seo/comparativas";
import { guias } from "@/data/seo/guias";
import { tools } from "@/data/seo/tools";
import { entities } from "@/data/seo/entities";
import { localizaciones } from "@/data/seo/localizaciones";

/**
 * Bloque de enlazado interno rastreable (sitemap HTML).
 * Renderiza enlaces <a> reales (vía <Link>) de forma incondicional —sin
 * depender de hover ni de estado JS— para que Googlebot alcance las 200+
 * páginas SEO a 1 salto desde cualquier página del sitio.
 */

type Item = { to: string; label: string };

const LinkColumn = ({
  title,
  items,
  listClassName,
}: {
  title: string;
  items: Item[];
  listClassName?: string;
}) => {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="font-poppins font-semibold text-foreground mb-3 text-sm">
        {title}
      </h3>
      <ul className={listClassName ?? "space-y-2 text-sm"}>
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SeoFooterLinks = () => {
  // Money pages generales (excluye las sub-páginas del cluster LSO, que
  // tienen su propio bloque más abajo para no repetir 15+ entradas).
  const soluciones: Item[] = moneyPages
    .filter(
      (p) =>
        !(p.cluster === "ley-segunda-oportunidad" && p.path.includes("/", 1)),
    )
    .map((p) => ({ to: p.path, label: p.label }));

  // Bloque dedicado a las sub-páginas del hub LSO (requisitos, coste,
  // plazos, perfiles…). Añade autoridad temática y enlaza a un salto.
  const lsoDetalle: Item[] = moneyPages
    .filter(
      (p) =>
        p.cluster === "ley-segunda-oportunidad" && p.path.includes("/", 1),
    )
    .map((p) => ({ to: p.path, label: p.label }));

  const sectores: Item[] = clusters.map((c) => ({
    to: `/${c.slug}`,
    label: c.label,
  }));

  const recursos: Item[] = [
    ...comparativas.map((c) => ({ to: c.path, label: c.label })),
    ...guias.map((g) => ({ to: g.path, label: g.label })),
    ...tools.map((t) => ({ to: t.path, label: t.navLabel })),
  ];

  // Selección de entidades destacadas (las fichas completas se enlazan desde
  // cada hub de cluster; aquí mostramos solo las de mayor búsqueda para no
  // inflar el footer con 100+ enlaces).
  const entidadesDestacadas = [
    "cofidis", "cetelem", "wizink", "vivus", "creditea", "moneyman",
    "kruk", "intrum", "santander", "bbva", "caixabank", "sabadell",
  ];
  const entidades: Item[] = entidadesDestacadas
    .map((slug) => entities.find((e) => e.slug === slug))
    .filter((e): e is (typeof entities)[number] => Boolean(e))
    .map((e) => ({ to: `/${e.cluster}/${e.slug}`, label: e.name }));

  const ciudades: Item[] = [...localizaciones]
    .sort((a, b) => a.rank - b.rank)
    .map((l) => ({ to: l.path, label: `Abogados Segunda Oportunidad ${l.name}` }));

  return (
    <nav
      aria-label="Mapa del sitio"
      className="bg-surface border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="sr-only">Mapa del sitio: todas las soluciones, entidades y ciudades</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <LinkColumn title="Soluciones para tu deuda" items={soluciones} />
          <LinkColumn title="Por tipo de deuda" items={sectores} />
          <LinkColumn title="Guías y herramientas" items={recursos} />
          <LinkColumn title="Entidades y acreedores" items={entidades} />
        </div>
        <div className="mb-8">
          <LinkColumn
            title="Segunda Oportunidad en detalle"
            items={lsoDetalle}
            listClassName="text-sm columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-x-8 [&>li]:mb-2 [&>li]:break-inside-avoid"
          />
        </div>
        <LinkColumn
          title="Abogados de Segunda Oportunidad por ciudad"
          items={ciudades}
          listClassName="text-sm columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-x-8 [&>li]:mb-2 [&>li]:break-inside-avoid"
        />
      </div>
    </nav>
  );
};

export default SeoFooterLinks;