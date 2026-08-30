import { beforeEach, describe, expect, it, vi } from "vitest";

const mockTrackAddToEnquiry = vi.fn();
vi.mock("@/modules/analytics/tracker", () => ({
  trackAddToEnquiry: (...args: unknown[]) => mockTrackAddToEnquiry(...args),
}));

import { addEnquiryItem, clearEnquiry, getEnquiryItems, isInEnquiry, removeEnquiryItem, updateEnquiryItemQuantity } from "./store";
import type { EnquiryItem } from "./types";

const ITEM_A: EnquiryItem = {
  id: "cable-management:cable-ladders:GKT-100",
  title: "GKT-100 Cable Ladder",
  system: "cable-management",
  model: "GKT-100",
  categoryLabel: "Cable Ladders",
  sourceRoute: "/products/cable-support-systems/cable-ladders",
};

const ITEM_B: EnquiryItem = {
  id: "led-systems:ldbe:LDBE-150",
  title: "LDBE-150",
  system: "led-systems",
  model: "150 W",
  categoryLabel: "LED-BUS LDBE",
  sourceRoute: "/products/led-systems/industrial-high-bay-lighting/led-bus-ldbe",
};

beforeEach(() => {
  window.localStorage.clear();
});

describe("enquiry store (basket)", () => {
  it("starts empty", () => {
    expect(getEnquiryItems()).toEqual([]);
  });

  it("adds an item and persists it to localStorage", () => {
    addEnquiryItem(ITEM_A, "uk");

    expect(getEnquiryItems()).toEqual([ITEM_A]);
    expect(isInEnquiry(ITEM_A.id)).toBe(true);
  });

  it("does not add a duplicate id", () => {
    addEnquiryItem(ITEM_A, "uk");
    addEnquiryItem({ ...ITEM_A, title: "Different title, same id" }, "uk");

    expect(getEnquiryItems()).toHaveLength(1);
    expect(getEnquiryItems()[0].title).toBe(ITEM_A.title);
  });

  it("removes an item by id", () => {
    addEnquiryItem(ITEM_A, "uk");
    addEnquiryItem(ITEM_B, "uk");
    removeEnquiryItem(ITEM_A.id);

    expect(getEnquiryItems()).toEqual([ITEM_B]);
  });

  it("updates an item's quantity", () => {
    addEnquiryItem(ITEM_A, "uk");
    updateEnquiryItemQuantity(ITEM_A.id, "12");

    expect(getEnquiryItems()[0].quantity).toBe("12");
  });

  it("rejects a non-numeric quantity", () => {
    addEnquiryItem(ITEM_A, "uk");
    updateEnquiryItemQuantity(ITEM_A.id, "twelve");

    expect(getEnquiryItems()[0].quantity).toBeUndefined();
  });

  it("clears every item", () => {
    addEnquiryItem(ITEM_A, "uk");
    addEnquiryItem(ITEM_B, "uk");
    clearEnquiry();

    expect(getEnquiryItems()).toEqual([]);
  });

  it("survives a corrupted localStorage value by treating it as empty", () => {
    window.localStorage.setItem("infravolt.enquiry.items", "{not valid json");

    expect(getEnquiryItems()).toEqual([]);
  });
});

describe("enquiry store — add_to_enquiry analytics", () => {
  it("fires add_to_enquiry with market/locale and product context on a genuine add", () => {
    addEnquiryItem(ITEM_A, "uk");

    expect(mockTrackAddToEnquiry).toHaveBeenCalledTimes(1);
    expect(mockTrackAddToEnquiry).toHaveBeenCalledWith(
      { market: "uk", locale: "en-GB" },
      { product_family: "cable-management", product_slug: "GKT-100" },
    );
  });

  it("does not fire again for a duplicate id (no re-add, no re-render-triggered duplicate)", () => {
    addEnquiryItem(ITEM_A, "uk");
    addEnquiryItem({ ...ITEM_A, title: "Different title, same id" }, "uk");

    expect(mockTrackAddToEnquiry).toHaveBeenCalledTimes(1);
  });

  it("attaches the Ukrainian locale for a ua add", () => {
    addEnquiryItem(ITEM_A, "ua");

    expect(mockTrackAddToEnquiry).toHaveBeenCalledWith(
      { market: "ua", locale: "uk-UA" },
      expect.anything(),
    );
  });
});
