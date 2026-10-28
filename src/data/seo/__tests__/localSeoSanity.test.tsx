import { readFileSync } from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { localizaciones } from "@/data/seo/localizaciones";
import { getLocalizacionContent } from "@/data/seo/content/localizacionContent";
import { getLocalCases } from "@/data/seo/localCases";
import { readFileSync as rf } from "fs";
import { territorialNeighbors } from "@/lib/seo/localLinks";
import { moneyPages } from "@/data/seo/moneyPages";

const html = (node: React.ReactNode) =>
  renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>);

const city = (slug: string) => localizaciones.find((l) => l.slug === slug)!;

describe("casos locales: solo expedientes documentados", () => {
  it("las 41 ciudades existen", () => {
    expect(localizaciones).toHaveLength(41);
  });

  it.each(localizaciones.map((l) => [l.slug]))("%s no nombra juzgados mercantiles construidos", (slug) => {
    const c = city(slug);
    const content = getLocalizacionContent(c);
    const text = [...content.sections.map((s) => html(s.body)), ...content.faq.map((f) => f.plain ?? "")].join(" ");
    expect(text).not.toMatch(/Juzgados? de lo Mercantil de/);
    if (slug === "donostia") expect(text).toContain("Sección de lo Mercantil del Tribunal de Instancia de San Sebastián");
  });

  it("no queda generador ni bandera isReal", () => {
    const src = rf(path.resolve(__dirname, "../localCases.ts"), "utf8");
    expect(src).not.toMatch(/isReal|TEMPLATES|buildCase/);
  });

  it.each(localizaciones.map((l) => [l.slug]))("%s solo muestra su catálogo documentado", (slug) => {
    const c = city(slug);
    const documented = getLocalCases(slug);
    expect(c.localCases).toEqual(documented);
    const content = getLocalizacionContent(c);
    const casosSection = content.sections.find((s) => s.title.startsWith("Casos resueltos"));
    const casosFaq = content.faq.find((f) => f.q.startsWith("¿Tenéis casos resueltos"));
    if (documented.length === 0) {
      expect(casosSection).toBeUndefined();
      expect(casosFaq).toBeUndefined();
    } else {
      const n = (html(casosSection!.body).match(/Caso \d+ ·/g) ?? []).length;
      expect(n).toBe(documented.length);
      expect(casosFaq).toBeDefined();
    }
  });

  it("solo 12 expedientes documentados en total", () => {
    expect(localizaciones.reduce((n, l) => n + l.localCases.length, 0)).toBe(12);
  });

  it("Zaragoza muestra solo su caso documentado, no Utebo/Zuera/Alagón", () => {
    const content = getLocalizacionContent(city("zaragoza"));
    const casos = html(content.sections.find((s) => s.title.startsWith("Casos resueltos"))!.body);
    expect((casos.match(/Caso \d+ ·/g) ?? []).length).toBe(1);
    expect(casos).not.toMatch(/Utebo|Zuera|Alagón/);
  });
});

describe("enlazado territorial", () => {
  it("nunca se autoenlaza, no duplica y solo misma provincia/comunidad", () => {
    for (const c of localizaciones) {
      const n = territorialNeighbors(c, localizaciones);
      expect(n.map((x) => x.slug)).not.toContain(c.slug);
      expect(new Set(n.map((x) => x.slug)).size).toBe(n.length);
      for (const x of n) expect(x.comunidad).toBe(c.comunidad);
      expect(n.length).toBeLessThanOrEqual(4);
    }
  });

  it("prioriza misma provincia antes que comunidad", () => {
    const n = territorialNeighbors(city("alicante"), localizaciones).map((x) => x.slug);
    expect(n[0]).toBe("elche");
  });

  it("es determinista", () => {
    const a = territorialNeighbors(city("bilbao"), localizaciones).map((x) => x.slug);
    const b = territorialNeighbors(city("bilbao"), [...localizaciones].reverse()).map((x) => x.slug);
    expect(a).toEqual(b);
  });
});

describe("metadatos", () => {
  it("ninguna meta description pública lleva notas internas", () => {
    for (const p of moneyPages) expect(p.metaDescription).not.toMatch(/\[|revisión legal/i);
  });

  it("los fallbacks de index.html los gestiona Helmet (data-rh) para no duplicarse", () => {
    const index = readFileSync(path.resolve(__dirname, "../../../../index.html"), "utf8");
    const tags = [
      'name="description"',
      'property="og:title"',
      'property="og:description"',
      'property="og:url"',
      'property="og:type"',
      'name="twitter:card"',
    ];
    for (const t of tags) {
      const m = index.match(new RegExp(`<meta[^>]*${t}[^>]*>`, "g")) ?? [];
      expect(m).toHaveLength(1);
      expect(m[0]).toContain('data-rh="true"');
    }
    expect(index).not.toMatch(/rel="canonical"/);
  });
});
