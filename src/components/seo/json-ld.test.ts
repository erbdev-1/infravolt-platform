import { describe, expect, it } from "vitest";

import { escapeJsonLd } from "./json-ld";

describe("escapeJsonLd", () => {
  it("produces valid, parseable JSON for a plain node", () => {
    const json = JSON.stringify({ "@type": "Organization", name: "InfraVolt" });
    const escaped = escapeJsonLd(json);

    expect(() => JSON.parse(escaped)).not.toThrow();
    expect(JSON.parse(escaped)).toEqual({ "@type": "Organization", name: "InfraVolt" });
  });

  it("escapes '<' so a literal '</script>' sequence can never appear in the output", () => {
    const json = JSON.stringify({ description: "</script><script>alert(1)</script>" });
    const escaped = escapeJsonLd(json);

    expect(escaped).not.toContain("</script>");
    expect(escaped).toContain("\\u003cscript");
  });

  it("still parses correctly after escaping, round-tripping the original unsafe string", () => {
    const original = { description: "</script><script>alert(1)</script>" };
    const escaped = escapeJsonLd(JSON.stringify(original));

    expect(JSON.parse(escaped)).toEqual(original);
  });
});
