import { z } from "zod";

const supportedProtocols = new Set(["http:", "https:"]);

function invalidConfiguredUrl(): Error {
  return new Error("Invalid configured URL");
}

export function normalizeConfiguredHost(input: string): string {
  const candidate = input.trim();

  if (!candidate) {
    throw invalidConfiguredUrl();
  }

  let parsed: URL;

  try {
    parsed = new URL(`http://${candidate}`);
  } catch {
    throw invalidConfiguredUrl();
  }

  if (
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  ) {
    throw invalidConfiguredUrl();
  }

  const hostname = parsed.hostname.toLowerCase().replace(/\.$/u, "");

  if (!hostname) {
    throw invalidConfiguredUrl();
  }

  return parsed.port ? `${hostname}:${parsed.port}` : hostname;
}

export function normalizeConfiguredUrl(input: string): URL {
  let parsed: URL;

  try {
    parsed = new URL(input.trim());
  } catch {
    throw invalidConfiguredUrl();
  }

  if (
    !supportedProtocols.has(parsed.protocol) ||
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash
  ) {
    throw invalidConfiguredUrl();
  }

  parsed.host = normalizeConfiguredHost(parsed.host);

  return parsed;
}

export const configuredUrlSchema = z
  .string()
  .trim()
  .min(1)
  .superRefine((value, context) => {
    try {
      normalizeConfiguredUrl(value);
    } catch {
      context.addIssue({
        code: "custom",
        message: "Invalid URL",
      });
    }
  })
  .transform((value) => normalizeConfiguredUrl(value));
