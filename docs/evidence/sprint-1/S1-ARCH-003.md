# S1-ARCH-003 — WP-05 Common Contracts and Log Context

| Field | Evidence |
|---|---|
| Date | 2026-07-17 |
| Work package | WP-05 — Server Boundaries and Common Contracts |
| Backlog tasks | FND-018 and FND-019 |
| Authority | Founder-authorised Sprint 1 continuation under G0-COND-001 |
| Engineering owner | Codex |
| Reviewer | Founder — pending review |
| Status | Complete — pending Founder review |

## Specification basis

- INF-05 §§9.1 and 34 require server-only protection, typed boundaries, request correlation IDs and privacy-conscious server logs.
- INF-16 §34.2 defines FND-018 acceptance as a typed boundary pattern and FND-019 acceptance as correlated logs without PII.
- INF-18 §§52–54 require the Result/error baseline, request/correlation ID utility, safe logger context interface and redaction-policy placeholder.
- INF-18 §129 restricts foundation log context to safe operational fields and forbids secrets, tokens, form values, personal data, full query URLs and private signed URLs.
- INF-18 §§35 and 132 assign WP-05 to the `S1-ARCH` evidence family. This sequential `S1-ARCH-003` record preserves the historical `S1-ARCH-001` and `S1-ARCH-002` records unchanged.

## Implemented contracts

- Added a small shared discriminated `Result<T>` contract with `Success<T>`, `Failure`, `ResultError` and readonly field-error support.
- Added a branded shared `CorrelationId` type without creating a general barrel or business-specific global types file.
- Added a server-only correlation utility that generates UUID v4 identifiers, accepts only the same strict trusted format, normalises accepted identifiers and replaces invalid candidates with a newly generated identifier.
- Added a server-only safe log-context constructor that requires a valid correlation ID, copies only explicitly allowlisted operational fields, omits absent values, validates every allowed value at runtime and rejects unsafe identifiers with name-only errors.
- Added the prescribed redaction-policy placeholder naming forbidden field classes and the `[REDACTED]` replacement without implementing a logger or provider integration.
- Expanded the server-boundary verifier so valid Server Components can import all server-only foundation modules while separate Client Component fixtures must fail for environment, correlation and log-context imports.

## Acceptance evidence

| Scenario | Result |
|---|---|
| `Result<T>` success/failure discrimination | Passed |
| Generated correlation ID | Passed: UUID v4 trusted format |
| Trusted-format incoming ID | Passed: accepted and normalised |
| Invalid/PII-like incoming value | Passed: rejected and replaced; value not returned or logged |
| Safe log context allowlist | Passed: extra secret/personal-data fields discarded |
| Missing safe log fields | Passed: omitted rather than retained as `undefined` |
| Unsafe safe-log field value | Passed: name-only error; rejected value absent |
| Server imports of all protected modules | Passed |
| Client import of server environment | Rejected by Next.js |
| Client import of correlation utility | Rejected by Next.js |
| Client import of log-context utility | Rejected by Next.js |
| WP-04 environment contract | Passed: ten-check regression matrix |

## Commands and results

| Command | Result |
|---|---|
| `node --version` | `v24.18.0` |
| `pnpm --version` | `11.13.0` |
| `pnpm install --frozen-lockfile` | Passed; lockfile already up to date |
| `pnpm verify:common-contracts` | Passed: six checks |
| `pnpm verify:env` | Passed: ten checks |
| `pnpm verify:server-boundary` | Passed: one positive and three independent negative builds |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| Positive `pnpm build` with safe process-local UK/UA origins | Passed |
| `git diff --check` | Passed |
| Credential-pattern scan | Passed: zero high-confidence matches |
| Environment-file inventory | Passed: `.env.example` only |
| Specification-change scan | Passed: zero changes |

The first common-contract verification exposed a missing `.ts` runtime import extension and the first expanded boundary build exposed reliance on the root TypeScript alias from an isolated fixture. Both were corrected in scope and the affected checks passed. A sandbox-only `spawnSync ... EPERM` result was rerun with worker permission. The first wrapped production-build command had a PowerShell quoting error and did not start the build; the direct safe process-local command passed.

## Internal review

- Added runtime allowlist validation for environment, route class and market values after review identified that compile-time unions alone do not constrain JavaScript callers.
- Replaced a combined negative client fixture with independent environment, correlation and log-context fixtures so one boundary error cannot mask an unprotected module.
- Confirmed errors identify fields only and do not interpolate rejected values.
- Confirmed the shared types contain no business-domain model and the server modules have direct `server-only` markers with no weakening barrel export.

No unresolved in-scope correctness or security finding remains.

## Security and scope

- No secret, real credential, customer data, personal data or real environment file was added.
- Correlation IDs are opaque random identifiers, carry no market/user/company data and are not an authentication mechanism.
- No structured logger, telemetry provider, host allowlist, market/locale resolver, proxy, feature flag, Supabase, database, authentication, API, UI, CI or deployment work was added.
- No dependency was added or changed, and the existing pnpm lifecycle policy was not broadened.
- Specifications and historical Sprint 1 evidence records were not modified.
- FND-014–017, FND-020 and all later work remain outside this increment.
