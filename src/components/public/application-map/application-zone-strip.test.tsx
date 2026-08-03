import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  ApplicationZoneStrip,
  type ZoneThumbnailItem,
} from "./application-zone-strip";

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

const ITEMS: readonly ZoneThumbnailItem[] = [
  {
    id: "overview",
    name: "Overview",
    image: "/assets/application-map/data-centre/overview.webp",
    imageAlt: "Overview",
    active: true,
  },
  {
    id: "main-electrical-room",
    name: "Main Electrical Room",
    image: "/assets/application-map/data-centre/main-electrical-room.webp",
    imageAlt: "Main Electrical Room",
    active: false,
  },
  {
    id: "server-hall",
    name: "Server Hall",
    image: "/assets/application-map/data-centre/server-hall.webp",
    imageAlt: "Server Hall",
    active: false,
  },
];

function renderStrip(items: readonly ZoneThumbnailItem[] = ITEMS) {
  const onSelect = vi.fn();

  render(
    <ApplicationZoneStrip
      items={items}
      label="Data Centre zones"
      nextLabel="Show next zones"
      onSelect={onSelect}
      previousLabel="Show previous zones"
    />,
  );

  return { onSelect };
}

describe("ApplicationZoneStrip", () => {
  it("renders zone cards in the supplied order with the title before the thumbnail", () => {
    renderStrip();

    const nav = screen.getByRole("navigation", { name: "Data Centre zones" });
    const cardButtons = within(nav)
      .getAllByRole("button")
      .filter((button) => button.className.includes("zoneStripItem"));

    expect(cardButtons.map((button) => button.getAttribute("aria-label"))).toEqual([
      "Overview",
      "Main Electrical Room",
      "Server Hall",
    ]);

    // Başlık, kart içinde görselden önce gelmelidir (title-above-thumbnail).
    const [firstCard] = cardButtons;
    const children = Array.from(firstCard?.children ?? []);
    const nameIndex = children.findIndex((child) =>
      child.className.includes("zoneStripName"),
    );
    const thumbIndex = children.findIndex((child) =>
      child.className.includes("zoneStripThumb"),
    );

    expect(nameIndex).toBeGreaterThanOrEqual(0);
    expect(thumbIndex).toBeGreaterThan(nameIndex);
  });

  it("exposes the selected zone via aria-current and leaves others unmarked", () => {
    renderStrip();

    expect(screen.getByRole("button", { name: "Overview" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(
      screen.getByRole("button", { name: "Main Electrical Room" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("exposes accessible English labels for the previous and next controls", () => {
    renderStrip();

    expect(
      screen.getByRole("button", { name: "Show previous zones" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Show next zones" }),
    ).toBeInTheDocument();
  });

  it("scrolls the gallery by roughly one visible card group when an arrow is activated", async () => {
    const user = userEvent.setup();
    renderStrip();

    const nav = screen.getByRole("navigation", { name: "Data Centre zones" });
    const scroller = nav.querySelector("ul");

    if (!scroller) {
      throw new Error("Zone strip scroller not found");
    }

    Object.defineProperty(scroller, "scrollWidth", {
      configurable: true,
      value: 900,
    });
    Object.defineProperty(scroller, "clientWidth", {
      configurable: true,
      value: 300,
    });
    const scrollBy = vi.fn();

    scroller.scrollBy = scrollBy;
    fireEvent.scroll(scroller);

    await user.click(screen.getByRole("button", { name: "Show next zones" }));

    expect(scrollBy).toHaveBeenCalledTimes(1);
    expect(scrollBy.mock.calls[0]?.[0]).toMatchObject({ left: 270 });
  });

  it("disables the previous/next arrows at the scroll boundaries and re-enables them as the position changes", () => {
    renderStrip();

    const nav = screen.getByRole("navigation", { name: "Data Centre zones" });
    const scroller = nav.querySelector("ul");

    if (!scroller) {
      throw new Error("Zone strip scroller not found");
    }

    Object.defineProperty(scroller, "scrollWidth", {
      configurable: true,
      value: 900,
    });
    Object.defineProperty(scroller, "clientWidth", {
      configurable: true,
      value: 300,
    });
    Object.defineProperty(scroller, "scrollLeft", {
      configurable: true,
      value: 0,
      writable: true,
    });

    fireEvent.scroll(scroller);

    expect(screen.getByRole("button", { name: "Show previous zones" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Show next zones" })).toBeEnabled();

    Object.defineProperty(scroller, "scrollLeft", {
      configurable: true,
      value: 600,
    });
    fireEvent.scroll(scroller);

    expect(screen.getByRole("button", { name: "Show previous zones" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Show next zones" })).toBeDisabled();
  });

  it("invokes onSelect with the zone id when a card is activated via the keyboard", async () => {
    const user = userEvent.setup();
    const { onSelect } = renderStrip();

    await user.click(screen.getByRole("button", { name: "Server Hall" }));

    expect(onSelect).toHaveBeenCalledWith("server-hall");
  });
});
