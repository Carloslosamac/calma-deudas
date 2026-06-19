import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import MoneyLanding from "@/pages/seo/MoneyLanding";
import { moneyPages } from "@/data/seo/moneyPages";
import { toolsForCluster } from "@/data/seo/tools";
import { renderRoute, setViewport } from "@/test/renderRoute";

const VIEWPORTS = [
  { name: "mobile", width: 375 },
  { name: "desktop", width: 1280 },
];

// Una muestra representativa de cada tipo de triaje (embargos, LSO, revolving).
const SAMPLE_PATHS = [
  "/embargos/parar-embargo",
  "/ley-segunda-oportunidad",
  "/tarjetas-revolving/cancelar-tarjetas-revolving",
];

describe('Bloque "Calcula tu caso" en money pages', () => {
  for (const path of SAMPLE_PATHS) {
    const page = moneyPages.find((p) => p.path === path)!;
    const expectedTools = toolsForCluster(page.cluster);

    for (const vp of VIEWPORTS) {
      it(`muestra el bloque y las herramientas relevantes en ${path} (${vp.name})`, () => {
        setViewport(vp.width);
        renderRoute(path, <MoneyLanding />);

        // Cabecera del bloque.
        expect(screen.getByText(/calcula tu caso/i)).toBeInTheDocument();

        // Enlaza a las herramientas relevantes del cluster.
        expect(expectedTools.length).toBeGreaterThan(0);
        for (const tool of expectedTools) {
          const links = screen.getAllByRole("link", {
            name: new RegExp(tool.cardTitle, "i"),
          });
          expect(links.some((l) => l.getAttribute("href") === tool.path)).toBe(true);
        }
      });
    }
  }

  it("la herramienta de embargos enlaza al sueldo inembargable", () => {
    renderRoute("/embargos/parar-embargo", <MoneyLanding />);
    expect(
      screen.getAllByRole("link", { name: /sueldo inembargable/i }).length,
    ).toBeGreaterThan(0);
  });
});
