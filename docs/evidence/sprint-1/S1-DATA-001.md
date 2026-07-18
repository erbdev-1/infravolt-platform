# S1-DATA-001 — Local Supabase Foundation

| Field | Evidence |
|---|---|
| Date | 2026-07-18 |
| Work package | WP-11 — Local Supabase Foundation |
| Backlog tasks | DAT-001, DAT-002, DAT-004, DAT-007, DAT-008, DAT-010 |
| Authority | Founder-authorised Sprint 1 increment under G0-COND-001 |
| Engineering owner | Erhan Baydı |
| Review authority | Founder |
| Status | Complete — pending Founder/PR review |

## Specification basis

- INF-05 §§17 and 31: Supabase PostgreSQL, `public`/`private` boundaries, version-controlled migrations, synthetic local data and committed generated types.
- INF-06 §§5, 65–68: `public` as the RLS-governed application/Data API schema, `private` outside the Data API, timestamped migrations, synthetic seed rules, generated types and database tests.
- INF-10 §§63–64: minimum grants, private-schema denial, explicit function execution and migration security review.
- INF-12 §§18–23 and 37–38: isolated deterministic local data, schema/grant checks, clean migration application, seed and generated-type verification.
- INF-13 §§13, 26–27 and 43–53: project-local CLI, Docker-compatible local runtime, immutable migration source, deterministic reset and generated-file drift detection.
- INF-16 DAT-001/002/004/007/008/010 and INF-18 WP-11 §§76–81 plus evidence index §132.

## Task acceptance evidence

| Task | Acceptance evidence | Status |
|---|---|---|
| DAT-001 | Root `supabase/config.toml` is local-only; the pinned CLI starts the Docker stack and `pnpm db:reset` succeeds. | Complete — pending review |
| DAT-002 | `supabase/README.md` defines timestamped snake_case names, chronological ordering, one-concern migrations and forward-only correction after sharing. | Complete — pending review |
| DAT-004 | Migration `20260718133937_foundation_schemas.sql` creates the approved `private` boundary. Effective PostgreSQL queries verify all 12 role/schema `USAGE`/`CREATE` combinations and all 66 future-object privilege combinations across both schemas and all three application roles, with `postgres` ownership verified. | Complete — pending review |
| DAT-007 | `pnpm db:types` generates `src/types/database.generated.ts`; `pnpm db:types:check` detects drift without overwriting it. | Complete — pending review |
| DAT-008 | `supabase/seed.sql` is deterministic and synthetic. Two clean resets prove execution; no business table or row was invented. | Complete — pending review |
| DAT-010 | `pnpm db:verify` completes clean reset, migration, seed, schema/grant smoke, type drift, stop, restart, status and post-restart query checks. | Complete — pending review |

## Pinned local toolchain

- Registry query: `pnpm view supabase version dist-tags engines bin --json` on 2026-07-18.
- Stable npm `latest` result: `2.109.1`; beta was excluded.
- Installation: `pnpm add --save-dev --save-exact supabase@2.109.1`.
- Invocation: project package scripts and `pnpm exec supabase`; no global installation or unpinned runner.
- Runtime proof: Node `v24.18.0`, pnpm `11.13.0`, Supabase CLI `2.109.1` on Windows with Docker Desktop Linux containers.
- The package has no install lifecycle script. `pnpm-workspace.yaml` was unchanged and no lifecycle approval was broadened.

## Docker and local-only boundary

- Docker `28.0.1`, Compose `v2.33.1-desktop.1`, Linux engine `28.0.1`.
- Docker reported `name=seccomp,profile=unconfined`; this pre-existing security warning was recorded and not modified.
- The first standard CLI start published `54321`–`54324` on all interfaces. Internal review rejected that state.
- The effective Docker endpoint is resolved once, normalised and returned with an immutable child environment. That environment pins `DOCKER_HOST`, removes `DOCKER_CONTEXT` and Docker TLS-selection variables, and is used by every later Docker, Supabase, database-type and verifier child without mutating `process.env`.
- Approved endpoints are the Windows `dockerDesktopLinuxEngine`/`docker_engine` named pipes, system Unix sockets at `/var/run/docker.sock` and `/run/docker.sock`, rootless `/run/user/<numeric-uid>/docker.sock`, and Docker Desktop user sockets below `/home/<user>/.docker/{run,desktop}` or `/Users/<user>/.docker/{run,desktop}`. Arbitrary `/tmp`, proxy, traversal-like, relative, TCP, SSH and malformed targets are rejected before Docker engine or Supabase lifecycle execution.
- `pnpm db:start` now creates or validates the project-owned `infravolt-local` bridge with `com.infravolt.owner=local-supabase-foundation` and `com.docker.network.bridge.host_binding_ipv4=127.0.0.1`, then starts the stack with `--network-id infravolt-local`.
- Existing networks fail closed when ownership, driver, loopback option or container membership is unexpected. The previously verified project-only bridge was stopped, confirmed empty, removed by exact name and recreated with ownership metadata.
- Start, reset, status, type generation and the verifier inspect actual project labels, exact network membership, published bindings, running state and configured health checks. Missing containers, created/restarting state and `starting` health are the only retryable convergence states. Unhealthy or malformed inspections, missing required health metadata, foreign ownership/network/name collisions and unsafe bindings fail immediately; REST alone may omit health metadata under its explicit image policy.
- Readiness uses a real 30-second monotonic deadline. Every Docker child timeout and polling sleep is capped by the remaining budget; command timeout, deadline exhaustion and the secondary finite attempt guard have distinct errors.
- Final inspection: driver `bridge`, owner label present, host binding `127.0.0.1`; published API, database, Studio and mail-capture ports all use `127.0.0.1`.
- Start/status wrappers suppress local development keys. No key, password or connection string is recorded here.
- `supabase/.temp/project-ref` is absent. No login, link, remote project ID, access token, remote database URL or production credential is required.

## Schema and migration strategy

INF-06 makes `public` the application schema and approved Data API surface. It remains present and receives `USAGE` only for `anon`, `authenticated` and `service_role`; object access remains explicit and future exposed tables require RLS. `private` is created for internal objects and is not included in the Data API schema list. `anon` and `authenticated` have neither `USAGE` nor `CREATE` there. `service_role` has schema `USAGE` but no `CREATE` or automatic object privilege, so future server-owned access must be granted narrowly.

The first migration is `supabase/migrations/20260718133937_foundation_schemas.sql`. The timestamp was generated once and preserved. It adds no table, extension, policy, storage bucket or function.

Default privileges owned by `postgres` revoke table, sequence and function access from broad/browser roles in both application schemas. PostgreSQL's implicit global `PUBLIC` function-execution default is revoked before schema-scoped rules. A self-check locks the expected roles, schemas and operation names. A rolled-back probe verifies 66 combinations: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `TRUNCATE`, `REFERENCES` and `TRIGGER`; all sequence privileges; and function `EXECUTE` for `anon`, `authenticated` and `service_role` in both `public` and `private`. It also proves the probe objects and active default-privilege source are owned by `postgres`.

Managed `auth` and `storage` schemas are untouched. No production RLS-completeness claim is made.

## Seed and generated types

WP-11 owns no seedable business table, so `supabase/seed.sql` executes one constant SQL readiness probe. It contains no person, company, email, phone, customer/product record, random value or production identifier. UK/UA business fixtures remain deferred until their owning tables exist.

`pnpm db:types` runs the pinned CLI against the verified local endpoint and healthy owned stack, then writes `src/types/database.generated.ts`. Its deterministic Turkish header instructs regeneration rather than manual editing. `pnpm db:types:check` writes a fresh result to the operating-system temporary directory, normalises CRLF/LF encoding and terminal newline count only, compares exact content and exits non-zero on drift. Cleanup failure is reported separately without replacing an earlier drift/read error. Raw Row/Insert/Update shapes are persistence contracts, not application DTOs.

## Verification matrix

| Verification | Final redacted result |
|---|---|
| `pnpm install --frozen-lockfile` | Passed; lockfile already up to date. |
| `pnpm verify:database-boundary` | Passed six focused groups for the socket allowlist, immutable endpoint/environment pinning, Docker/Supabase child inheritance, typed health policy, monotonic deadline and lifecycle cleanup diagnostics. |
| `pnpm exec supabase --version` | `2.109.1`. |
| Initial remediation `pnpm db:verify` | Failed at the first reset and completed failure cleanup. A focused rerun exposed Realtime's normal post-reset `starting` state; a bounded 30-second readiness convergence check was added without weakening persistent health failures. |
| Final remediation `pnpm db:verify` | Passed 18 control groups against the pinned owned local endpoint, including two resets, privilege matrices, type drift, stop/restart and smoke query. |
| Clean reset and seed, repeated twice | Passed; migration and `supabase/seed.sql` applied both times. |
| Schema/grant smoke | Passed all 12 `USAGE`/`CREATE` combinations for three roles and two schemas. |
| Default-privilege smoke | Passed all 66 table, sequence and function denials plus owner/source assertions; transaction rolled back. |
| `pnpm db:types:check` | Passed; exact generated output matches committed file. |
| Stop/start/status/post-restart query | Passed; all expected containers running, loopback-only bindings, database responsive. |
| `pnpm verify:safe-states` | Passed 6 checks. |
| `pnpm verify:features` | Passed 10 checks. |
| `pnpm verify:env` | Passed 10 checks. |
| `pnpm verify:common-contracts` | Passed 6 checks. |
| `pnpm verify:market` | Passed 12 checks. |
| `pnpm verify:server-boundary` | Passed positive server import and six negative client imports. |
| `pnpm lint` | Passed. |
| `pnpm typecheck` | Passed. |
| `pnpm build` with safe process-local UK/UA origins | Passed with Next.js `16.2.10`. |
| `git diff --check` and changed-file trailing-whitespace scan | Passed. |
| Credential-value scan | Passed with zero strong credential-value matches across all tracked repository text; local-foundation remote-endpoint scan also passed. |
| Environment-file inventory | Only committed `.env.example`; no real environment file. |
| Specification, historical-evidence and `.github` scans | No changes. |
| Unsafe SQL and scope review | No broad object grants, `SECURITY DEFINER`, business table, extension, RLS, auth/storage object or provider integration. |

## Corrections from internal review

1. Standard CLI networking exposed local ports on `0.0.0.0`; a loopback-only Docker bridge and fail-safe network validation replaced it.
2. The first reset omitted the custom network ID, so recreated Postgres could not be resolved by Storage. Reset and type generation now use the same explicit local network.
3. A default-privilege probe found implicit `PUBLIC` function execution. The migration now revokes PostgreSQL's global default before schema-specific rules.
4. The drift normaliser initially removed trailing whitespace beyond line endings. It now changes CRLF/LF only, and the generated file was regenerated.
5. Container verification now requires the complete expected local service set, rejects unhealthy/restarting services and rejects external port binds.
6. Effective Docker endpoint validation rejects remote TCP/SSH targets, including inherited `DOCKER_HOST` and `DOCKER_CONTEXT` selection, before lifecycle or type-generation work.
7. Lifecycle readiness now inspects actual container project labels, exact network membership, published bindings and health instead of trusting CLI exit status or network options alone.
8. The local bridge now has explicit InfraVolt ownership metadata and rejects foreign attached containers.
9. Container-state negative fixtures cover restarting, unhealthy and all-interface publishing; bounded readiness checks handle only the normal post-start/reset health transition.
10. The rolled-back default-privilege probe now covers 48 table, sequence and function privilege combinations across both schemas and all application roles.
11. Type and verifier cleanup paths preserve the original failure while reporting cleanup failure safely.
12. Strong credential-value patterns are checked across all tracked repository text rather than a selected WP-11 file subset.
13. Endpoint validation now returns an immutable normalised target; every Docker and Supabase child uses its pinned `DOCKER_HOST` environment with `DOCKER_CONTEXT` removed, closing the post-validation redirect gap.
14. Unix socket acceptance is an explicit documented allowlist; arbitrary forwarded, proxy, custom and traversal-like socket paths are rejected.
15. Typed readiness errors restrict retries to documented convergence states. Ownership, network, binding, malformed-health and unhealthy failures are terminal on the first attempt.
16. The readiness loop now enforces a monotonic overall deadline and bounds each child timeout and sleep by the remaining budget.
17. Schema checks cover all 12 combinations, while the future-object matrix covers all 66 required operations and verifies the `postgres` owner/default-privilege source.
18. Start/reset cleanup diagnostics name the originating lifecycle operation, preserve the original thrown error and attach cleanup failure only as secondary context.

All actionable PostgreSQL, Supabase, TypeScript, database-security, migration/reproducibility and scope findings were corrected. The final internal review found no unresolved in-scope issue.

## Files and dependency changes

Created:

- `scripts/database-types.ts`
- `scripts/local-docker.ts`
- `scripts/local-supabase.ts`
- `scripts/verify-database-foundation.ts`
- `scripts/verify-local-docker-boundary.ts`
- `src/types/database.generated.ts`
- `supabase/.gitignore`
- `supabase/README.md`
- `supabase/config.toml`
- `supabase/migrations/20260718133937_foundation_schemas.sql`
- `supabase/seed.sql`
- `docs/evidence/sprint-1/S1-DATA-001.md`

Modified:

- `package.json`
- `pnpm-lock.yaml`
- `docs/PROJECT_LOG.md`

The only direct dependency added is exact development dependency `supabase@2.109.1`. No Supabase JavaScript client, runtime provider integration or unrelated package was added.

## Turkish explanatory comments

New Turkish TypeScript and SQL comments explain endpoint pinning and TOCTOU protection, the socket trust allowlist, terminal versus transient readiness, monotonic child budgets, credential-output suppression, loopback fail-safe networking, privilege-matrix completeness, cleanup-error precedence, temporary cleanup and drift false-positive prevention. Identifiers and required CLI patterns remain in English.

## Deferred work and residual decisions

- DAT-003 approved extensions, DAT-005 baseline business tables, DAT-006 table RLS, DAT-009 storage buckets and all WP-12/WP-13 work remain deferred.
- UK/UA market/config rows remain deferred until an owning schema migration exists.
- CI workflow integration remains owned by WP-08; `pnpm db:verify` is the future local/CI entry point.
- Production Supabase project, region, credentials, backup/PITR, migration permissions and deployment remain blocked by G0-COND-001 and were not touched.
- The Docker seccomp profile warning remains an external local-environment hardening consideration and is not changed by repository code.
