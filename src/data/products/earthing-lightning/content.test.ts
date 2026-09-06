import { describe, expect, it } from "vitest";

import { earthingHubContentForMarket } from "./content";

describe("Earthing & Lightning Protection hub — Data Centres application card (Phase 2)", () => {
  it("UK: the Data Centres card now links to the dedicated landing page, with truthful localized action text", () => {
    const uk = earthingHubContentForMarket("uk");
    const dataCentresCard = uk.applications.find((application) => application.id === "data-centres");

    expect(dataCentresCard?.href).toBe("/products/earthing-and-lightning-protection/data-centre-earthing");
    expect(dataCentresCard?.actionLabel).toBe("Explore Data Centre Earthing");
    // Card title/description/image are unchanged — only the destination and its label were added.
    expect(dataCentresCard?.title).toBe("Data Centres");
    expect(dataCentresCard?.description).toBe(
      "Low-resistance earthing and equipotential bonding supporting sensitive electrical and IT infrastructure.",
    );
  });

  it("UA: the Data Centres card links to the same landing page with a natural Ukrainian action label, title/description unchanged", () => {
    const ua = earthingHubContentForMarket("ua");
    const dataCentresCard = ua.applications.find((application) => application.id === "data-centres");

    expect(dataCentresCard?.href).toBe("/products/earthing-and-lightning-protection/data-centre-earthing");
    expect(dataCentresCard?.actionLabel).toBe("Заземлення для ЦОД");
    expect(dataCentresCard?.title).toBe("Центри обробки даних");
  });

  it("every other application card keeps no href/actionLabel override, both markets", () => {
    for (const market of ["uk", "ua"] as const) {
      const content = earthingHubContentForMarket(market);
      const otherCards = content.applications.filter((application) => application.id !== "data-centres");

      expect(otherCards.length).toBe(7);
      for (const card of otherCards) {
        expect(card.href).toBeUndefined();
        expect(card.actionLabel).toBeUndefined();
      }
    }
  });

  it("has exactly 8 applications in both markets, Data Centres included", () => {
    for (const market of ["uk", "ua"] as const) {
      const content = earthingHubContentForMarket(market);
      expect(content.applications).toHaveLength(8);
      expect(content.applications.some((application) => application.id === "data-centres")).toBe(true);
    }
  });
});
