import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import HerramientasHub from "@/pages/seo/HerramientasHub";
import ToolPage from "@/pages/seo/ToolPage";
import { tools } from "@/data/seo/tools";
import { renderRoute, setViewport } from "@/test/renderRoute";

const VIEWPORTS = [
  { name: "mobile", width: 375 },
  { name: "desktop", width: 1280 },
];

describe("Hub /herramientas", () => {
  for (const vp of VIEWPORTS) {
    it(`carga el hub con todas las herramientas en ${vp.name}`, () => {
      setViewport(vp.width);
      renderRoute("/herramientas", <HerramientasHub />);

      const h1 = screen.getByRole("heading", { level: 1 });
      expect(h1).toHaveTextContent(/herramientas/i);

      for (const tool of tools) {
        const link = screen.getByRole("link", { name: new RegExp(tool.cardTitle, "i") });
        expect(link).toHaveAttribute("href", tool.path);
      }
    });
  }
});

describe("ToolPage por herramienta", () => {
  for (const tool of tools) {
    for (const vp of VIEWPORTS) {
      it(`carga ${tool.slug} en ${vp.name}`, () => {
        setViewport(vp.width);
        renderRoute(tool.path, <ToolPage />);

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(tool.h1);
        expect(screen.getByText(tool.disclaimer)).toBeInTheDocument();
        expect(screen.getAllByRole("button").length).toBeGreaterThan(0);

        for (const rel of tool.related) {
          expect(
            screen.getByRole("link", { name: new RegExp(rel.label, "i") }),
          ).toHaveAttribute("href", rel.to);
        }
      });
    }
  }
});
