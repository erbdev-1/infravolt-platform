import "server-only";

import { randomUUID } from "node:crypto";

import type { CorrelationId } from "../../types/correlation-id";

const CORRELATION_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu;

export function isCorrelationId(value: unknown): value is CorrelationId {
  return typeof value === "string" && CORRELATION_ID_PATTERN.test(value);
}

export function createCorrelationId(): CorrelationId {
  return randomUUID() as CorrelationId;
}

export function resolveCorrelationIdFromTrustedSource(
  candidate: unknown,
): CorrelationId {
  return isCorrelationId(candidate)
    ? (candidate.toLowerCase() as CorrelationId)
    : createCorrelationId();
}
