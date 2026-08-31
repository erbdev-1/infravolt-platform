import { describe, expect, it } from "vitest";

import { publicSiteContentForMarket } from "./content";

describe("publicSiteContentForMarket — UK footer registered office address", () => {
  it("UK shell carries the registered office label and address lines", () => {
    const uk = publicSiteContentForMarket("uk");

    expect(uk.shell.registeredOffice).toEqual({
      label: "Registered Office",
      lines: [
        "HTS Building, Tyne View Terrace",
        "Wallsend, Tyne and Wear",
        "NE28 6SG, United Kingdom",
      ],
    });
  });

  it("UA shell does not carry a registered office address (UK-only legal detail)", () => {
    const ua = publicSiteContentForMarket("ua");

    expect(ua.shell.registeredOffice).toBeUndefined();
  });
});
