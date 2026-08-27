import { describe, expect, it } from "vitest";

import { evChargingFamilies } from "./ev-charging";

describe("evChargingFamilies", () => {
  it("offers exactly one system-level family with no invented models or order codes", () => {
    const families = evChargingFamilies("uk");

    expect(families).toHaveLength(1);
    expect(families[0].options).toEqual([]);
    expect(families[0].familyItem?.model).toBeUndefined();
  });

  it("produces a valid EnquiryItem with the ev-charging system key", () => {
    const [family] = evChargingFamilies("uk");

    expect(family.familyItem?.system).toBe("ev-charging");
  });

  it("has a localised UA label", () => {
    const [family] = evChargingFamilies("ua");

    expect(family.label).toBe("Системи зарядки електромобілів");
  });
});
