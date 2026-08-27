import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { publicSiteContentForMarket } from "@/modules/public-site/content";

import { supportMetadataText } from "./page";

describe("UK Support metadata", () => {
  it("uses English support content for UK", () => {
    const metadata = supportMetadataText(
      publicSiteContentForMarket("uk").support,
    );

    expect(metadata.title).toBe("UK support & operations | InfraVolt");
  });

  it("uses localized Ukrainian support content for UA", () => {
    const content = publicSiteContentForMarket("ua").support;
    const metadata = supportMetadataText(content);

    expect(metadata.title).toBe(`${content.eyebrow} | InfraVolt`);
    expect(metadata.title).toMatch(/[А-Яа-яІіЇїЄє]/u);
    expect(metadata.description).toBe(content.introduction);
  });
});
