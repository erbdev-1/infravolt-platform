import { describe, expect, it } from "vitest";

import { parseClientEnvironment } from "./client";
import { EnvironmentValidationError } from "./validation";

const PRODUCTION_ENVIRONMENT = {
  NEXT_PUBLIC_SITE_URL_UK: "https://infravolt.co.uk",
  NEXT_PUBLIC_SITE_URL_UA: "https://infravolt.com.ua",
};

describe("parseClientEnvironment market origins", () => {
  it("accepts HTTPS market origins in production", () => {
    expect(
      parseClientEnvironment(PRODUCTION_ENVIRONMENT, "production"),
    ).toMatchObject({
      NEXT_PUBLIC_SITE_URL_UK: new URL("https://infravolt.co.uk"),
      NEXT_PUBLIC_SITE_URL_UA: new URL("https://infravolt.com.ua"),
    });
  });

  it.each([
    "NEXT_PUBLIC_SITE_URL_UK",
    "NEXT_PUBLIC_SITE_URL_UA",
  ] as const)("rejects an HTTP %s origin in production", (variable) => {
    expect(() =>
      parseClientEnvironment(
        { ...PRODUCTION_ENVIRONMENT, [variable]: "http://example.com" },
        "production",
      ),
    ).toThrowError(
      expect.objectContaining<Partial<EnvironmentValidationError>>({
        variables: [variable],
      }),
    );
  });

  it("preserves HTTP local origins in development", () => {
    expect(
      parseClientEnvironment(
        {
          NEXT_PUBLIC_SITE_URL_UK: "http://uk.infravolt.localhost:3000",
          NEXT_PUBLIC_SITE_URL_UA: "http://ua.infravolt.localhost:3000",
        },
        "development",
      ),
    ).toMatchObject({
      NEXT_PUBLIC_SITE_URL_UK: new URL("http://uk.infravolt.localhost:3000"),
      NEXT_PUBLIC_SITE_URL_UA: new URL("http://ua.infravolt.localhost:3000"),
    });
  });
});
