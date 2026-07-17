import { strict as assert } from "node:assert";

import {
  createCorrelationId,
  isCorrelationId,
  resolveCorrelationIdFromTrustedSource,
} from "../src/lib/observability/correlation-id.ts";
import {
  createSafeLogContext,
  LOG_REDACTION_POLICY,
} from "../src/lib/observability/log-context.ts";

import type { Result } from "../src/types/result.ts";

type Check = {
  readonly name: string;
  readonly run: () => void;
};

const checks: readonly Check[] = [
  {
    name: "Result contract discriminates success and failure",
    run: () => {
      const correlationId = createCorrelationId();
      const success: Result<number> = { ok: true, data: 42 };
      const failure: Result<number> = {
        ok: false,
        error: {
          code: "FOUNDATION_ERROR",
          message: "A safe error occurred.",
          fieldErrors: { field: ["A safe field error."] },
          correlationId,
        },
      };

      assert.equal(success.ok, true);
      assert.equal(failure.ok, false);
      assert.equal(failure.error.correlationId, correlationId);
    },
  },
  {
    name: "generated correlation IDs use the safe UUID v4 format",
    run: () => {
      const correlationId = createCorrelationId();

      assert(isCorrelationId(correlationId));
      assert(!correlationId.includes("@"));
    },
  },
  {
    name: "only trusted-format correlation IDs are accepted",
    run: () => {
      const trustedCandidate = "B3C902B9-1A22-4E60-8E88-BF7EAC295E74";
      const accepted = resolveCorrelationIdFromTrustedSource(trustedCandidate);
      const rejectedValue = "person@example.test";
      const generated = resolveCorrelationIdFromTrustedSource(rejectedValue);

      assert.equal(accepted, trustedCandidate.toLowerCase());
      assert(isCorrelationId(generated));
      assert.notEqual(generated, rejectedValue);
    },
  },
  {
    name: "safe log context is allowlisted and omits undefined fields",
    run: () => {
      const correlationId = createCorrelationId();
      const input = {
        environment: "test",
        routeClass: "system",
        market: "uk",
        errorCode: "FOUNDATION_ERROR",
        secret: "synthetic-sensitive-fixture",
        personalData: "person@example.test",
      } as const;
      const context = createSafeLogContext(correlationId, input);

      assert.deepEqual(context, {
        correlationId,
        environment: "test",
        routeClass: "system",
        market: "uk",
        errorCode: "FOUNDATION_ERROR",
      });
      assert(!("secret" in context));
      assert(!("personalData" in context));
      assert(!("release" in context));
      assert(Object.isFrozen(context));
    },
  },
  {
    name: "unsafe log values fail without echoing their value",
    run: () => {
      const unsafeValue = "person@example.test";

      assert.throws(
        () => createSafeLogContext(createCorrelationId(), { release: unsafeValue }),
        (error: unknown) => {
          assert(error instanceof Error);
          assert.match(error.message, /release/u);
          assert(!error.message.includes(unsafeValue));
          return true;
        },
      );
      assert.throws(
        () =>
          createSafeLogContext(createCorrelationId(), {
            routeClass: unsafeValue,
          } as never),
        (error: unknown) => {
          assert(error instanceof Error);
          assert.match(error.message, /routeClass/u);
          assert(!error.message.includes(unsafeValue));
          return true;
        },
      );
    },
  },
  {
    name: "redaction policy names forbidden log fields without values",
    run: () => {
      assert.equal(LOG_REDACTION_POLICY.replacement, "[REDACTED]");
      assert(LOG_REDACTION_POLICY.forbiddenFields.includes("secret"));
      assert(LOG_REDACTION_POLICY.forbiddenFields.includes("personalData"));
    },
  },
];

for (const check of checks) {
  check.run();
  console.log(`PASS: ${check.name}`);
}

console.log(`Common contract verification passed (${checks.length} checks).`);
