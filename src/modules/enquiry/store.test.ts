import { beforeEach, describe, expect, it } from "vitest";

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
    addEnquiryItem(ITEM_A);

    expect(getEnquiryItems()).toEqual([ITEM_A]);
    expect(isInEnquiry(ITEM_A.id)).toBe(true);
  });

  it("does not add a duplicate id", () => {
    addEnquiryItem(ITEM_A);
    addEnquiryItem({ ...ITEM_A, title: "Different title, same id" });

    expect(getEnquiryItems()).toHaveLength(1);
    expect(getEnquiryItems()[0].title).toBe(ITEM_A.title);
  });

  it("removes an item by id", () => {
    addEnquiryItem(ITEM_A);
    addEnquiryItem(ITEM_B);
    removeEnquiryItem(ITEM_A.id);

    expect(getEnquiryItems()).toEqual([ITEM_B]);
  });

  it("updates an item's quantity", () => {
    addEnquiryItem(ITEM_A);
    updateEnquiryItemQuantity(ITEM_A.id, "12");

    expect(getEnquiryItems()[0].quantity).toBe("12");
  });

  it("rejects a non-numeric quantity", () => {
    addEnquiryItem(ITEM_A);
    updateEnquiryItemQuantity(ITEM_A.id, "twelve");

    expect(getEnquiryItems()[0].quantity).toBeUndefined();
  });

  it("clears every item", () => {
    addEnquiryItem(ITEM_A);
    addEnquiryItem(ITEM_B);
    clearEnquiry();

    expect(getEnquiryItems()).toEqual([]);
  });

  it("survives a corrupted localStorage value by treating it as empty", () => {
    window.localStorage.setItem("infravolt.enquiry.items", "{not valid json");

    expect(getEnquiryItems()).toEqual([]);
  });
});
