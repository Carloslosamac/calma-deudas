/**
 * Genera src/data/seo/routePaths.generated.ts: solo los paths necesarios para
 * declarar rutas en App.tsx, sin arrastrar los datasets SEO al bundle inicial.
 * Se ejecuta en predev/prebuild.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { moneyPages } from "../src/data/seo/moneyPages";
import { tools } from "../src/data/seo/tools";
import { comparativas } from "../src/data/seo/comparativas";
import { guias } from "../src/data/seo/guias";

const arr = (name: string, paths: string[]) =>
  `export const ${name}: readonly string[] = [\n${paths
    .map((p) => `  ${JSON.stringify(p)},`)
    .join("\n")}\n];\n`;

const out = `// AUTO-GENERADO por scripts/generate-route-paths.ts — no editar a mano.\n\n${[
  arr("moneyPagePaths", moneyPages.map((p) => p.path)),
  arr("toolPaths", tools.map((t) => t.path)),
  arr("guiaPaths", guias.map((g) => g.path)),
  arr("comparativaPaths", comparativas.map((c) => c.path)),
].join("\n")}`;

writeFileSync(resolve(import.meta.dirname, "../src/data/seo/routePaths.generated.ts"), out);
console.log("routePaths.generated.ts actualizado");
