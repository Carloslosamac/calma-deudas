export const leadChannels = {
  organic: "Orgánico",
  direct: "Directo",
  campaign: "Campañas",
  referral: "Otras fuentes",
  unknown: "Sin atribución",
} as const;

export type LeadChannel = keyof typeof leadChannels;
type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  payload?: unknown;
};

export function leadChannel(row: Attribution): LeadChannel {
  const source = row.utm_source?.trim().toLowerCase() || "";
  const medium = row.utm_medium?.trim().toLowerCase() || "";
  if (medium === "organic") return "organic";
  if (row.utm_campaign || (medium && !["direct", "(none)", "none", "referral"].includes(medium))) return "campaign";
  if (["direct", "(direct)"].includes(source) || medium === "direct") return "direct";
  if (source || medium === "referral") return "referral";
  // Only use an explicitly recorded referrer; missing history is not direct traffic.
  if (row.payload && typeof row.payload === "object" && "referrer" in row.payload) {
    const referrer = row.payload.referrer;
    if (referrer === "" || referrer === null) return "direct";
    if (typeof referrer === "string") {
      try {
        const host = new URL(referrer).hostname;
        if (/^(www\.)?(google\.(com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})|bing\.com|search\.yahoo\.com|duckduckgo\.com|ecosia\.org)$/.test(host)) return "organic";
        if (host !== "mi-calma.es" && host !== "www.mi-calma.es" && host !== "calma-deudas.lovable.app") return "referral";
      } catch { /* Invalid referrers cannot establish attribution. */ }
    }
  }
  return "unknown";
}

const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export function dailyLeadSeries(rows: (Attribution & { created_at: string })[], from = "", to = "") {
  const dates = rows.map(row => new Date(row.created_at)).filter(date => !Number.isNaN(date.getTime())).sort((a, b) => a.getTime() - b.getTime());
  const first = from || (dates[0] ? dateKey(dates[0]) : to);
  const latest = dates[dates.length - 1];
  const last = to || (latest ? dateKey(latest) : from);
  if (!first || !last || first > last) return [];
  const days = new Map<string, { date: string } & Record<LeadChannel, number>>();
  const end = new Date(`${last}T00:00:00`);
  for (const day = new Date(`${first}T00:00:00`); day <= end; day.setDate(day.getDate() + 1)) {
    const date = dateKey(day);
    days.set(date, { date, organic: 0, direct: 0, campaign: 0, referral: 0, unknown: 0 });
  }
  for (const row of rows) {
    const day = days.get(dateKey(new Date(row.created_at)));
    if (day) day[leadChannel(row)] += 1;
  }
  return Array.from(days.values());
}