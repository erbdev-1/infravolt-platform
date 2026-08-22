import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { industrialFacilityApplicationMapContentForMarket } from "@/modules/application-map/industrial-facility-content";
import { INDUSTRIAL_FACILITY_APPLICATION_MAP } from "@/modules/application-map/industrial-facility";
import { resolveApplicationMap } from "@/modules/application-map/resolve";

import { DataCentreApplicationMap } from "./data-centre-application-map";

beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
});

afterEach(() => {
  cleanup();
});

function renderMap() {
  const content = industrialFacilityApplicationMapContentForMarket("uk");
  const map = resolveApplicationMap(INDUSTRIAL_FACILITY_APPLICATION_MAP, "uk");

  return render(
    <DataCentreApplicationMap
      content={content}
      industryId="industrial-facility"
      map={map}
      sourcePath="/application-map/industrial-facility"
    />,
  );
}

function getZoneNav() {
  return screen.getByRole("navigation", { name: "Facility zones" });
}

function getProductNav() {
  return screen.getByRole("navigation", { name: "InfraVolt product families" });
}

async function clickZone(user: ReturnType<typeof userEvent.setup>, name: RegExp) {
  await user.click(within(getZoneNav()).getByRole("button", { name }));
}

describe("DataCentreApplicationMap (Industrial Facilities, multi-product Busbar)", () => {
  it("opens GGD Medium Power directly from Main Electrical Room's single busbar hotspot", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Main Electrical Room$/);
    await user.click(
      screen.getByRole("button", { name: "Busbar Systems, GGD Medium Power" }),
    );

    expect(
      screen.getByRole("dialog", { name: "GGD Medium Power Busbar" }),
    ).toBeInTheDocument();
  });

  it("opens GGD Medium Power directly from Main Electrical Room's left selector (single match, no chooser)", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Main Electrical Room$/);
    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "GGD Medium Power Busbar" }),
    ).toBeInTheDocument();
  });

  it("Production Line: on-image hotspots open GGD and GNL directly; the left selector opens a chooser between them", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Production Line$/);

    await user.click(
      screen.getByRole("button", { name: "Busbar Systems, GGD Medium Power" }),
    );
    expect(
      screen.getByRole("dialog", { name: "GGD Medium Power Busbar" }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Busbar Systems, GNL Lighting Busbar" }),
    );
    expect(
      screen.getByRole("dialog", { name: "GNL Lighting Busbar" }),
    ).toBeInTheDocument();

    // Sol seçici: bu zone'da "busbar" ailesine ait İKİ hotspot var, bu
    // yüzden doğrudan bir ürün açmak yerine seçim listesi (chooser) açılır.
    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );

    const chooser = screen.getByRole("dialog", { name: "Busbar Systems" });

    expect(
      within(chooser).getByRole("button", { name: /GGD Medium Power Busbar/ }),
    ).toBeInTheDocument();
    expect(
      within(chooser).getByRole("button", { name: /GNL Lighting Busbar/ }),
    ).toBeInTheDocument();

    await user.click(
      within(chooser).getByRole("button", { name: /GNL Lighting Busbar/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "GNL Lighting Busbar" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: "Busbar Systems" }),
    ).not.toBeInTheDocument();
  });

  it("Production Line: LED Systems stays a distinct selection from Busbar Systems", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Production Line$/);

    await user.click(
      within(getProductNav()).getByRole("button", { name: /^LED Systems$/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "LED Systems" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("dialog", { name: /GNL|GGD/ }),
    ).not.toBeInTheDocument();
  });

  it("Process Area opens GR Cast Resin", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Process Area$/);
    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "GR Cast Resin Busbar" }),
    ).toBeInTheDocument();
  });

  it("Control Room opens GNL Lighting Busbar and keeps Underfloor Cable Trunking as a separate selection", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Control Room$/);
    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "GNL Lighting Busbar" }),
    ).toBeInTheDocument();

    await user.click(
      within(getProductNav()).getByRole("button", {
        name: /Underfloor Cable Trunking/,
      }),
    );

    expect(
      screen.getByRole("dialog", { name: "Underfloor Cable Trunking" }),
    ).toBeInTheDocument();
  });

  it("External Utilities Yard opens GS Super Compact and EV Charging as separate selections", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^External Utilities Yard$/);
    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "GS Super Compact" }),
    ).toBeInTheDocument();

    await user.click(
      within(getProductNav()).getByRole("button", { name: /EV Charging Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "EV Charging Systems" }),
    ).toBeInTheDocument();
  });

  it("Tank Farm opens GR Cast Resin", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Tank Farm$/);
    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "GR Cast Resin Busbar" }),
    ).toBeInTheDocument();
  });

  it("Warehouse / Logistics Hall keeps GGD, GNL and LED Systems as three separate selections", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Warehouse \/ Logistics Hall$/);

    await user.click(
      screen.getByRole("button", { name: "Busbar Systems, GGD Medium Power" }),
    );
    expect(
      screen.getByRole("dialog", { name: "GGD Medium Power Busbar" }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Busbar Systems, GNL Lighting Busbar" }),
    );
    expect(
      screen.getByRole("dialog", { name: "GNL Lighting Busbar" }),
    ).toBeInTheDocument();

    await user.click(
      within(getProductNav()).getByRole("button", { name: /^LED Systems$/ }),
    );
    expect(
      screen.getByRole("dialog", { name: "LED Systems" }),
    ).toBeInTheDocument();
  });

  it("Transformer Connection opens GS Super Compact", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Transformer Connection$/);
    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "GS Super Compact" }),
    ).toBeInTheDocument();
  });

  it("Pump & Motor Room opens GR Cast Resin", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Pump & Motor Room$/);
    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "GR Cast Resin Busbar" }),
    ).toBeInTheDocument();
  });

  it("Factory Lighting & Assembly Hall opens GNL Lighting Busbar and LED Systems as separate selections", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Factory Lighting & Assembly Hall$/);

    await user.click(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    );
    expect(
      screen.getByRole("dialog", { name: "GNL Lighting Busbar" }),
    ).toBeInTheDocument();

    await user.click(
      within(getProductNav()).getByRole("button", { name: /^LED Systems$/ }),
    );
    expect(
      screen.getByRole("dialog", { name: "LED Systems" }),
    ).toBeInTheDocument();
  });

  it("Industrial Street & Loading Yard exposes LED Systems but never Busbar or EV Charging", async () => {
    const user = userEvent.setup();
    renderMap();

    await clickZone(user, /^Industrial Street & Loading Yard$/);

    const productNav = getProductNav();

    expect(within(productNav).getByText("LED Systems")).toBeInTheDocument();
    expect(within(productNav).queryByText("Busbar Systems")).not.toBeInTheDocument();
    expect(
      within(productNav).queryByText("EV Charging Systems"),
    ).not.toBeInTheDocument();
  });
});
