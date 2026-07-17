import "server-only";

import { isCorrelationId } from "./correlation-id.ts";

import type { CorrelationId } from "../../types/correlation-id";

export const LOG_REDACTION_POLICY = Object.freeze({
  replacement: "[REDACTED]",
  forbiddenFields: Object.freeze([
    "password",
    "accessToken",
    "refreshToken",
    "cookie",
    "secret",
    "apiKey",
    "signedUrl",
    "privateSignedUrl",
    "fullQueryUrl",
    "formValue",
    "personalData",
    "webhookPayload",
  ]),
});

export type SafeLogEnvironment =
  | "development"
  | "test"
  | "preview"
  | "production";
export type SafeLogRouteClass =
  | "public"
  | "auth"
  | "admin"
  | "portal"
  | "api"
  | "system";
export type SafeLogMarket = "uk" | "ua";

export type SafeLogContextInput = Readonly<{
  environment?: SafeLogEnvironment;
  release?: string;
  routeClass?: SafeLogRouteClass;
  market?: SafeLogMarket;
  errorCode?: string;
}>;

export type SafeLogContext = Readonly<{
  correlationId: CorrelationId;
  environment?: SafeLogEnvironment;
  release?: string;
  routeClass?: SafeLogRouteClass;
  market?: SafeLogMarket;
  errorCode?: string;
}>;

const SAFE_IDENTIFIER_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/u;
const SAFE_LOG_ENVIRONMENTS: readonly SafeLogEnvironment[] = [
  "development",
  "test",
  "preview",
  "production",
];
const SAFE_LOG_ROUTE_CLASSES: readonly SafeLogRouteClass[] = [
  "public",
  "auth",
  "admin",
  "portal",
  "api",
  "system",
];
const SAFE_LOG_MARKETS: readonly SafeLogMarket[] = ["uk", "ua"];

function validateAllowedValue<Value extends string>(
  field: "environment" | "routeClass" | "market",
  value: Value | undefined,
  allowedValues: readonly Value[],
): Value | undefined {
  if (value !== undefined && !allowedValues.includes(value)) {
    throw new Error(`Invalid safe log context field: ${field}`);
  }

  return value;
}

function validateSafeIdentifier(
  field: "release" | "errorCode",
  value: string | undefined,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!SAFE_IDENTIFIER_PATTERN.test(value)) {
    throw new Error(`Invalid safe log context field: ${field}`);
  }

  return value;
}

export function createSafeLogContext(
  correlationId: CorrelationId,
  input: SafeLogContextInput = {},
): SafeLogContext {
  if (!isCorrelationId(correlationId)) {
    throw new Error("Invalid safe log context field: correlationId");
  }

  const release = validateSafeIdentifier("release", input.release);
  const errorCode = validateSafeIdentifier("errorCode", input.errorCode);
  const environment = validateAllowedValue(
    "environment",
    input.environment,
    SAFE_LOG_ENVIRONMENTS,
  );
  const routeClass = validateAllowedValue(
    "routeClass",
    input.routeClass,
    SAFE_LOG_ROUTE_CLASSES,
  );
  const market = validateAllowedValue("market", input.market, SAFE_LOG_MARKETS);

  return Object.freeze({
    correlationId,
    ...(environment === undefined ? {} : { environment }),
    ...(release === undefined ? {} : { release }),
    ...(routeClass === undefined ? {} : { routeClass }),
    ...(market === undefined ? {} : { market }),
    ...(errorCode === undefined ? {} : { errorCode }),
  });
}
