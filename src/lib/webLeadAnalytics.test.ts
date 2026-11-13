import { describe, expect, it } from "vitest";
import { dailyLeadSeries, leadChannel } from "./webLeadAnalytics";

const empty = { utm_source: null, utm_medium: null, utm_campaign: null };
describe("web lead attribution", () => {
  it("separates organic from direct", () => {
    expect(leadChannel({ ...empty, utm_medium: "organic", utm_source: "google" })).toBe("organic");
    expect(leadChannel({ ...empty, utm_source: "direct" })).toBe("direct");
  });
  it("never assumes untagged historical leads are direct", () => {
    expect(leadChannel(empty)).toBe("unknown");
    expect(leadChannel({ ...empty, payload: {} })).toBe("unknown");
  });
  it("keeps paid Google separate from organic", () => {
    expect(leadChannel({ ...empty, utm_source: "google", utm_medium: "cpc" })).toBe("campaign");
    expect(leadChannel({ ...empty, utm_source: "google" })).toBe("referral");
  });
  it("uses recorded external referrers without matching impostor domains", () => {
    expect(leadChannel({ ...empty, payload: { referrer: "https://www.google.es/search?q=deuda" } })).toBe("organic");
    expect(leadChannel({ ...empty, payload: { referrer: "" } })).toBe("direct");
    expect(leadChannel({ ...empty, payload: { referrer: "https://google.es.example.com" } })).toBe("referral");
    expect(leadChannel({ ...empty, payload: { referrer: "https://mi-calma.es/blog" } })).toBe("unknown");
  });
  it("counts each filtered lead once and fills days with zero leads", () => {
    const series = dailyLeadSeries([
      { ...empty, created_at: "2026-11-01T12:00:00", utm_medium: "organic" },
      { ...empty, created_at: "2026-11-03T12:00:00", utm_source: "direct" },
    ], "2026-11-01", "2026-11-03");
    expect(series).toEqual([
      { date: "2026-11-01", organic: 1, direct: 0, campaign: 0, referral: 0, unknown: 0 },
      { date: "2026-11-02", organic: 0, direct: 0, campaign: 0, referral: 0, unknown: 0 },
      { date: "2026-11-03", organic: 0, direct: 1, campaign: 0, referral: 0, unknown: 0 },
    ]);
  });
});