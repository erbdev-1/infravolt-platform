# S1-ARCH-002 — Server-only Boundary

| Field | Evidence |
|---|---|
| Date | 2026-07-17 |
| Work package | WP-05 — Server Boundaries and Common Contracts |
| Backlog task | FND-013 |
| Authority | Founder-authorised Sprint 1 continuation under G0-COND-001 |
| Engineering owner | Codex |
| Reviewer | Founder — pending review |
| Status | Complete — pending Founder review |

## Specification basis

- INF-05 §§9.1, 14, 49.2 and production security criteria require `server-only` protection for secrets, privileged clients and server data access.
- INF-16 §34.2 defines FND-013 acceptance as a failing Client Component import test.
- INF-18 §52 requires a server-only import guard; §107 requires server secrets to remain unavailable to client modules.
- INF-18 §§35 and 132 assign WP-05 to the `S1-ARCH` evidence family. This sequential `S1-ARCH-002` record preserves the historical FND-005–010 `S1-ARCH-001` record unchanged.

## Implemented boundary

- Added the exact Next-supported runtime marker dependency `server-only@0.0.1`.
- Added `import "server-only"` directly to `src/config/env/server.ts` without creating a barrel export.
- Preserved the separate WP-04 client and server environment contracts.
- Kept the public client contract limited to the six approved `NEXT_PUBLIC_*` variables; it contains no server-only name.
- Kept production environment validation on the actual WP-04 readers by executing the preflight under Node's `react-server` condition before `next build` and `next start`.
- Used Node `24.18.0` native TypeScript stripping for the preflight and environment verifier, avoiding a production-startup dependency on the dev-only TypeScript compiler.
- Added a reproducible boundary verifier that creates ignored temporary Next.js fixtures, builds a valid Server Component import, and requires Next to reject a Client Component import of the same real server module.

No Result/error contract, correlation ID, logger context or redaction-policy placeholder from FND-018/FND-019 was added.

## Acceptance evidence

| Scenario | Result |
|---|---|
| Server Component imports `src/config/env/server.ts` | Passed: isolated Next production build succeeded |
| Client Component imports `src/config/env/server.ts` | Passed: isolated Next production build failed with Next's exact Client Component rejection |
| General environment barrel | Absent |
| Server-only names in `src/config/env/client.ts` | Zero matches |
| Client environment output allowlist | WP-04 ten-check matrix passed |
| Missing production UK URL | Build preflight failed with the variable name only |
| Missing production UA URL | Start preflight failed with the variable name only |
| Positive production build with safe local origins | Passed |

## Commands and results

| Command | Result |
|---|---|
| `node --version` | `v24.18.0` |
| `pnpm --version` | `11.13.0` |
| `pnpm install --frozen-lockfile` | Passed; lockfile already up to date |
| `pnpm verify:env` | Passed: ten checks |
| `pnpm verify:server-boundary` | Passed: server import accepted, client import rejected |
| Negative `pnpm build` without UK site URL | Failed as expected; name-only error |
| Negative `pnpm start` without UA site URL | Failed as expected; name-only error |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| Positive `pnpm build` with safe process-local UK/UA origins | Passed |
| `git diff --check` | Passed |
| Credential-pattern scan | Passed: zero matches |
| Environment-file inventory | Passed: `.env.example` only |
| Specification-change scan | Passed: zero changes |

The first positive build after adding the marker reached Next compilation and then hit the sandbox-only `spawn EPERM` worker restriction. The authorised rerun with worker execution permission passed.

## Internal review

The first negative verifier accepted either Next's exact rejection text or the broad term `server-only`. Review identified that the broad alternative could mask an unrelated failure. The verifier was narrowed to require `cannot be imported from a Client Component module`, then both fixture builds passed again.

No unresolved in-scope correctness or security finding remains.

## Security and scope

- No secret value, real credential, customer data or real environment file was added.
- The client contract does not import the server contract and cannot return server-only configuration.
- Temporary verification applications exist only under ignored `.next` state and are removed by the verifier.
- No host allowlist, market/locale resolver, proxy, feature flag, logging infrastructure, Supabase, database, authentication, API, UI, CI or deployment work was added.
- Specifications and historical Sprint 1 evidence records were not modified.
- FND-014 and later tasks remain out of scope.
