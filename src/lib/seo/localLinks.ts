/**
 * Regla común de enlazado territorial para las landings locales.
 *
 * - Las páginas nacionales enlazan al hub territorial (LOCAL_HUB), no a una
 *   selección manual de ciudades.
 * - Entre ciudades solo se enlaza cuando hay relación territorial real:
 *   misma provincia primero, después misma comunidad autónoma; dentro de
 *   cada nivel, por proximidad geográfica (y slug como desempate). Es
 *   determinista, sin autorreferencias ni duplicados.
 */

export const LOCAL_HUB = {
  label: "Abogados de la Ley de Segunda Oportunidad",
  to: "/abogados-ley-segunda-oportunidad",
} as const;

export type TerritorialCity = {
  slug: string;
  name: string;
  path: string;
  provincia: string;
  comunidad: string;
  lat: number;
  lng: number;
};

const distanceKm = (a: TerritorialCity, b: TerritorialCity): number => {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
};

/** Ciudades relacionadas territorialmente con `city` (puede devolver []). */
export const territorialNeighbors = <T extends TerritorialCity>(
  city: TerritorialCity,
  all: readonly T[],
  limit = 4,
): T[] => {
  const seen = new Set<string>([city.slug]);
  const candidates: { c: T; tier: number; d: number }[] = [];
  for (const c of all) {
    if (seen.has(c.slug) || c.path === (city as T).path) continue;
    const tier = c.provincia === city.provincia ? 0 : c.comunidad === city.comunidad ? 1 : -1;
    if (tier < 0) continue;
    seen.add(c.slug);
    candidates.push({ c, tier, d: distanceKm(city, c) });
  }
  return candidates
    .sort((x, y) => x.tier - y.tier || x.d - y.d || x.c.slug.localeCompare(y.c.slug))
    .slice(0, limit)
    .map((x) => x.c);
};
