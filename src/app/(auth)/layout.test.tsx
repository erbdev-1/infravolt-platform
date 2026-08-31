import { describe, expect, it } from "vitest";

import { metadata } from "./layout";

describe("(auth) layout metadata", () => {
  it("is always noindex/nofollow, independent of the public site-indexing flag", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});
