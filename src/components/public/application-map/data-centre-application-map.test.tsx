import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { applicationMapContentForMarket } from "@/modules/application-map/content";
import { DATA_CENTRE_APPLICATION_MAP } from "@/modules/application-map/data-centre";
import { resolveDataCentreApplicationMap } from "@/modules/application-map/resolve";

import { DataCentreApplicationMap } from "./data-centre-application-map";

beforeEach(() => {
  // Panel, mobil bottom-sheet olup olmadığını anlamak için matchMedia
  // kullanır; jsdom bunu uygulamaz, testler masaüstü genişliğini varsayar.
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

function renderMap(market: "uk" | "ua") {
  const content = applicationMapContentForMarket(market);
  const map = resolveDataCentreApplicationMap(DATA_CENTRE_APPLICATION_MAP, market);

  return render(
    <DataCentreApplicationMap
      content={content}
      industryId="data-centre"
      map={map}
      sourcePath="/application-map"
    />,
  );
}

function getZoneNav() {
  return screen.getByRole("navigation", { name: "Data Centre zones" });
}

function getProductNav() {
  return screen.getByRole("navigation", { name: "InfraVolt product families" });
}

async function clickZone(user: ReturnType<typeof userEvent.setup>, name: RegExp) {
  await user.click(within(getZoneNav()).getByRole("button", { name }));
}

describe("DataCentreApplicationMap", () => {
  it("renders a single page-level heading, a Back to Application Maps link and all eight zones plus Overview", () => {
    renderMap("uk");

    expect(
      screen.getByRole("heading", { level: 1, name: "Data Centre Application Map" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Application Maps" }),
    ).toHaveAttribute("href", "/");

    const zoneNav = getZoneNav();
    const zoneNames = [
      "Overview",
      "Main Electrical / UPS Room",
      "Data Hall",
      "Electrical Riser / Floor Distribution",
      "Generator / Resilient Power Hall",
      "Cooling Plant / Pump Room",
      "NOC / Control Room",
      "Utility Intake & Transformer Interface",
      "Parking & EV Services",
    ];

    for (const name of zoneNames) {
      expect(within(zoneNav).getByRole("button", { name })).toBeInTheDocument();
    }
  });

  it("renders localized UA content, including the Ukrainian Back to Application Maps link", () => {
    renderMap("ua");

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Карта застосувань центру обробки даних",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: "Зони центру обробки даних" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "До карт застосувань" }),
    ).toHaveAttribute("href", "/");
  });

  it("shows all six InfraVolt product families with an icon as scope on the overview", () => {
    renderMap("uk");

    const productNav = getProductNav();

    for (const name of [
      "Cable Management Systems",
      "Busbar Systems",
      "Underfloor Cable Trunking",
      "Earthing & Lightning Protection",
      "LED Systems",
      "EV Charging Systems",
    ]) {
      expect(within(productNav).getByText(name)).toBeInTheDocument();
    }

    // İkonlar dekoratif olduğu için (alt="") "img" rolüne sahip değildir;
    // varlıklarını doğrudan <img> elemanı olarak doğrularız.
    const icons = productNav.querySelectorAll<HTMLImageElement>(
      'img[src^="/assets/icons/products/"]',
    );

    expect(icons).toHaveLength(6);
  });

  it("does not open a product panel before a zone or hotspot is selected", () => {
    renderMap("uk");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("changes the active scene and narrows the product families when a zone is selected", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Main Electrical/);

    expect(
      screen.getByAltText(
        "Main electrical / UPS room with overhead busbar trunking, cable ladder and a copper earthing bar",
      ),
    ).toBeInTheDocument();

    const productNav = getProductNav();

    expect(within(productNav).getByText("Busbar Systems")).toBeInTheDocument();
    expect(within(productNav).getByText("Cable Management Systems")).toBeInTheDocument();
    expect(within(productNav).getByText("Earthing & Lightning Protection")).toBeInTheDocument();
    expect(within(productNav).queryByText("EV Charging Systems")).not.toBeInTheDocument();
    expect(within(productNav).queryByText("Underfloor Cable Trunking")).not.toBeInTheDocument();
  });

  it("opens the correct product panel from a scene hotspot and keeps navigation synchronized", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Main Electrical/);
    await user.click(
      screen.getByRole("button", {
        name: "Busbar Systems, overhead distribution run",
      }),
    );

    const dialog = screen.getByRole("dialog", { name: "Busbar Systems" });

    expect(
      within(dialog).getByText(
        "Distributing incoming power from switchgear to downstream distribution and UPS equipment within the main electrical room.",
      ),
    ).toBeInTheDocument();

    const productNav = getProductNav();

    expect(
      within(productNav).getByRole("button", { name: /Busbar Systems/ }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("renders the Busbar product panel media using the zone-specific product asset with contain sizing", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Main Electrical/);
    await user.click(
      screen.getByRole("button", {
        name: "Busbar Systems, overhead distribution run",
      }),
    );

    const dialog = screen.getByRole("dialog", { name: "Busbar Systems" });
    const media = within(dialog).getByAltText(
      "GGD medium power busbar system cutaway view",
    );

    expect(media).toHaveAttribute(
      "src",
      expect.stringContaining("ggd-main-transparent-product.webp"),
    );
    expect(media.className).toMatch(/panelMediaImage/);
  });

  it("opens the correct product panel from the product navigation and syncs the hotspot", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Data Hall/);

    const productNav = getProductNav();

    await user.click(
      within(productNav).getByRole("button", { name: /LED Systems/ }),
    );

    expect(
      screen.getByRole("dialog", { name: "LED Systems" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "LED Systems, aisle lighting" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("does not lock body scroll while the product panel is open on a desktop viewport", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Data Hall/);
    await user.click(
      screen.getByRole("button", { name: "LED Systems, aisle lighting" }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("returns to the overview and closes the panel via the Overview thumbnail", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Data Hall/);
    await user.click(
      screen.getByRole("button", { name: "LED Systems, aisle lighting" }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await clickZone(user, /^Overview$/);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Aerial night view of a Data Centre campus showing the substation, main building, generator hall and EV charging area",
      ),
    ).toBeInTheDocument();
  });

  it("clears the zone and product selection via Reset View without touching fullscreen", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Main Electrical/);
    await user.click(
      screen.getByRole("button", {
        name: "Busbar Systems, overhead distribution run",
      }),
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reset View" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Aerial night view of a Data Centre campus showing the substation, main building, generator hall and EV charging area",
      ),
    ).toBeInTheDocument();
  });

  it("falls back to the CSS fullscreen mode when the browser Fullscreen API is unavailable", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    // jsdom implements neither document.fullscreenEnabled nor
    // Element.prototype.requestFullscreen by default, so this exercises the
    // same "API unavailable" path mobile Safari hits — the control must stay
    // visible and usable via the CSS fallback rather than being hidden.
    const fullscreenButton = await screen.findByRole("button", {
      name: "Fullscreen",
    });

    await user.click(fullscreenButton);

    expect(
      await screen.findByRole("button", { name: "Exit Fullscreen" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Exit Fullscreen" }));

    expect(
      await screen.findByRole("button", { name: "Fullscreen" }),
    ).toBeInTheDocument();
  });

  it("toggles fullscreen and reflects browser fullscreenchange events", async () => {
    const user = userEvent.setup();
    const requestFullscreen = vi.fn().mockImplementation(function (
      this: HTMLElement,
    ) {
      Object.defineProperty(document, "fullscreenElement", {
        configurable: true,
        value: this,
      });
      document.dispatchEvent(new Event("fullscreenchange"));

      return Promise.resolve();
    });
    const exitFullscreen = vi.fn().mockImplementation(() => {
      Object.defineProperty(document, "fullscreenElement", {
        configurable: true,
        value: null,
      });
      document.dispatchEvent(new Event("fullscreenchange"));

      return Promise.resolve();
    });

    Object.defineProperty(document, "fullscreenEnabled", {
      configurable: true,
      value: true,
    });
    Object.defineProperty(
      HTMLElement.prototype,
      "requestFullscreen",
      { configurable: true, value: requestFullscreen },
    );
    Object.defineProperty(document, "exitFullscreen", {
      configurable: true,
      value: exitFullscreen,
    });

    renderMap("uk");

    const fullscreenButton = await screen.findByRole("button", {
      name: "Fullscreen",
    });

    await user.click(fullscreenButton);

    expect(requestFullscreen).toHaveBeenCalledTimes(1);
    expect(
      await screen.findByRole("button", { name: "Exit Fullscreen" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Exit Fullscreen" }));

    expect(exitFullscreen).toHaveBeenCalledTimes(1);
    expect(
      await screen.findByRole("button", { name: "Fullscreen" }),
    ).toBeInTheDocument();

    Reflect.deleteProperty(document, "fullscreenEnabled");
    Reflect.deleteProperty(HTMLElement.prototype, "requestFullscreen");
    Reflect.deleteProperty(document, "exitFullscreen");
    Reflect.deleteProperty(document, "fullscreenElement");
  });

  it("only ever exposes EV Charging Systems within Parking & EV Services", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Parking & EV Services/);

    expect(
      within(getProductNav()).getByText("EV Charging Systems"),
    ).toBeInTheDocument();

    await clickZone(user, /^Overview$/);
    await clickZone(user, /Main Electrical/);

    expect(
      within(getProductNav()).queryByText("EV Charging Systems"),
    ).not.toBeInTheDocument();
  });

  it("never renders contextual/generic equipment as a selectable product family", () => {
    renderMap("uk");

    const productNav = getProductNav();

    for (const disallowedText of [
      "Distribution Panel",
      "Switchboard",
      "Outdoor Enclosure",
      "Surge Protection",
      "Support Systems",
    ]) {
      expect(within(productNav).queryByText(disallowedText)).not.toBeInTheDocument();
    }
  });

  it("renders the full product panel content (used-here, points, benefits, actions) at once with no internal scroll container", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Main Electrical/);
    await user.click(
      screen.getByRole("button", {
        name: "Busbar Systems, overhead distribution run",
      }),
    );

    const dialog = screen.getByRole("dialog", { name: "Busbar Systems" });

    expect(
      within(dialog).getByText("Used here for"),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText("Application points"),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("Key benefits")).toBeInTheDocument();
    expect(
      within(dialog).getAllByRole("link").length,
    ).toBeGreaterThan(0);

    // Panel'in kendisi tek bir kayan bölge olmalı; iç içe ayrı bir scroll
    // konteyneri (ör. panelBody için ayrı bir overflow sarmalayıcı) olmamalı.
    expect(dialog.querySelectorAll('[class*="panelScroll"]')).toHaveLength(0);
  });

  it("closes the panel on Escape and restores focus to the product navigation", async () => {
    const user = userEvent.setup();
    renderMap("uk");

    await clickZone(user, /Main Electrical/);

    const hotspotButton = screen.getByRole("button", {
      name: "Busbar Systems, overhead distribution run",
    });

    await user.click(hotspotButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    expect(
      within(getProductNav()).getByRole("button", { name: /Busbar Systems/ }),
    ).toHaveFocus();
  });
});

// Mobile/tablet label rendering is CSS-driven (see application-map-viewer.module.css
// section 05b, <=860px) rather than JS-conditional, so it can't be asserted
// via jsdom viewport simulation — these tests instead verify the underlying
// state/markup the CSS depends on: exactly one hotspot carries the "active"
// marker classes at any time, every pin stays in the DOM, and the active
// one tracks selection/navigation correctly.
describe("DataCentreApplicationMap — overview active-pin label state", () => {
  it("marks exactly one overview hotspot active by default (hotspot 1)", () => {
    const { container } = renderMap("uk");

    const pins = container.querySelectorAll('button[id^="app-map-hotspot-"]');
    expect(pins).toHaveLength(8);

    const activePins = container.querySelectorAll('[class*="hotspotActiveMobile"]');
    expect(activePins).toHaveLength(1);
    expect(activePins[0]).toBe(pins[0]);

    const activeLabels = container.querySelectorAll('[class*="hotspotLabelActive"]');
    expect(activeLabels).toHaveLength(1);
  });

  it("keeps all eight zone pins in the DOM regardless of which one is active", () => {
    const { container } = renderMap("uk");

    expect(
      container.querySelectorAll('button[id^="app-map-hotspot-"]'),
    ).toHaveLength(8);
  });

  it("moves the active pin/label to the last-viewed zone when the carousel returns to Overview", async () => {
    const user = userEvent.setup();
    const { container } = renderMap("uk");

    await clickZone(user, /Data Hall/);
    await clickZone(user, /^Overview$/);

    const activePins = container.querySelectorAll('[class*="hotspotActiveMobile"]');
    expect(activePins).toHaveLength(1);

    const dataHallPin = container.querySelector(
      'button[id^="app-map-hotspot-"][aria-label*="Data Hall"]',
    );
    expect(activePins[0]).toBe(dataHallPin);

    const activeLabels = container.querySelectorAll('[class*="hotspotLabelActive"]');
    expect(activeLabels).toHaveLength(1);
  });

  it("does not change which overview hotspot is active while browsing inside a zone (no duplicate state leak)", async () => {
    const user = userEvent.setup();
    const { container } = renderMap("uk");

    await clickZone(user, /Main Electrical/);

    // Overview pins are unmounted while a zone scene is showing.
    expect(container.querySelectorAll('[class*="hotspotActiveMobile"]')).toHaveLength(0);

    await clickZone(user, /^Overview$/);

    // Returning without having tapped a different overview pin restores
    // Main Electrical as active (the zone just viewed).
    const activePins = container.querySelectorAll('[class*="hotspotActiveMobile"]');
    expect(activePins).toHaveLength(1);
    expect(activePins[0].getAttribute("aria-label")).toMatch(/Main Electrical/);
  });
});
