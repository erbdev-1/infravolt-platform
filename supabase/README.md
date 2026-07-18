# Local Supabase Foundation

This directory is the source of truth for InfraVolt's local database configuration, ordered SQL migrations and deterministic seed workflow. It is local-only: no remote project reference, provider credential or production data belongs here.

## Schema boundary

- `public` is the application schema exposed through the Data API. Future objects require explicit grants and RLS before browser access.
- `private` is excluded from the Data API schema list. Browser roles have no schema access; server-owned access must be granted narrowly for each future object.
- `auth` and `storage` remain Supabase-managed and are not changed by application migrations.
- WP-11 adds no business tables, RLS policies, extensions, functions or storage buckets.

## Migration convention

Migration filenames use `<UTC timestamp>_<snake_case_concern>.sql`, for example `20260718133937_foundation_schemas.sql`. Supabase applies files lexically and therefore chronologically during `pnpm db:reset`.

Keep one coherent concern per migration. Create the next file with `pnpm exec supabase migration new <snake_case_concern>`. A migration may be corrected while it is private and unapplied outside the local branch. After merge or shared-environment use, history is forward-only: add a corrective migration instead of renaming or silently rewriting an existing one. Production dashboard edits are not a migration workflow.

Local recovery is a clean `pnpm db:reset`. Shared and production recovery uses reviewed forward fixes or an approved restore procedure; destructive down migrations are not the default.

## Local workflow

Prerequisites are Node.js `24.18.0`, pnpm `11.13.0`, Docker Desktop with Linux containers and free ports `54320` through `54324`.

```bash
pnpm db:start
pnpm db:reset
pnpm db:types
pnpm db:types:check
pnpm verify:database-boundary
pnpm db:verify
pnpm db:stop
```

`pnpm db:types` regenerates `src/types/database.generated.ts` from the applied local schema. The generated database Row/Insert/Update shapes are persistence contracts, not public application DTOs. `pnpm db:types:check` generates into an operating-system temporary directory, normalises line-ending encoding and the terminal newline count only, and fails without overwriting the committed file when drift exists. Both reset and type generation pass the same local network ID because the CLI otherwise recreates or inspects Postgres on its generated default network. `pnpm db:verify` is the deterministic local entry point intended for later CI integration; WP-11 does not add a workflow file.

The seed currently executes one constant SQL probe because no WP-11 business table is legitimately seedable. Deterministic UK/UA fixtures will be introduced with the migrations that own their tables; a table is not invented merely to hold seed evidence.

CLI status output can contain local development credentials. Do not copy it into repository files, logs, screenshots or review reports.

Lifecycle and type-generation commands resolve the effective Docker endpoint once, normalise it and pin it into a dedicated immutable child environment as `DOCKER_HOST`. `DOCKER_CONTEXT` and Docker TLS-selection variables are removed from that environment, so a later parent-environment or active-context change cannot redirect Docker or Supabase after validation.

The supported local endpoint allowlist is intentionally narrow:

- Windows named pipes `npipe:////./pipe/dockerDesktopLinuxEngine` and `npipe:////./pipe/docker_engine`;
- system Unix sockets `unix:///var/run/docker.sock` and `unix:///run/docker.sock`;
- rootless Unix sockets `unix:///run/user/<numeric-uid>/docker.sock`;
- Docker Desktop user sockets `unix:///home/<user>/.docker/{run,desktop}/docker.sock` and `unix:///Users/<user>/.docker/{run,desktop}/docker.sock`.

Arbitrary `/tmp` or proxy sockets, traversal-like paths, relative paths, TCP and SSH endpoints fail before any Docker engine command or Supabase lifecycle operation. `pnpm verify:database-boundary` exercises the endpoint, environment-pinning, health, deadline and cleanup policies without touching Docker.

`pnpm db:start` creates or verifies the project-owned `infravolt-local` Docker bridge with host bindings restricted to `127.0.0.1`, then passes it to the CLI through `--network-id`. An existing network must carry the InfraVolt ownership label and may contain only the expected project containers. Start, reset, status and type-generation readiness checks inspect the real container project labels, exact network membership, published host bindings, running state and configured health checks.

The readiness deadline is 30 monotonic seconds. Every Docker child receives the smaller of its own 10-second ceiling and the remaining overall budget, and polling sleep cannot exceed that budget. Only a missing expected container, a created/restarting container or a `starting` health check is retried. Unhealthy or malformed state, missing required health metadata, foreign ownership/network membership, a name collision, or a non-loopback binding fails immediately. Only the REST container may omit health metadata under its explicit image policy. Start/reset cleanup keeps the original lifecycle failure primary and attaches any cleanup failure as secondary diagnostic context. Credential-bearing child output remains suppressed.
