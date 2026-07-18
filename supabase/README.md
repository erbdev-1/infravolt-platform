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
pnpm db:verify
pnpm db:stop
```

`pnpm db:types` regenerates `src/types/database.generated.ts` from the applied local schema. The generated database Row/Insert/Update shapes are persistence contracts, not public application DTOs. `pnpm db:types:check` generates into an operating-system temporary directory, normalises line-ending encoding and the terminal newline count only, and fails without overwriting the committed file when drift exists. Both reset and type generation pass the same local network ID because the CLI otherwise recreates or inspects Postgres on its generated default network. `pnpm db:verify` is the deterministic local entry point intended for later CI integration; WP-11 does not add a workflow file.

The seed currently executes one constant SQL probe because no WP-11 business table is legitimately seedable. Deterministic UK/UA fixtures will be introduced with the migrations that own their tables; a table is not invented merely to hold seed evidence.

CLI status output can contain local development credentials. Do not copy it into repository files, logs, screenshots or review reports.

`pnpm db:start` creates or verifies the `infravolt-local` Docker bridge with host bindings restricted to `127.0.0.1`, then passes it to the CLI through `--network-id`. If a network with that name exists without the loopback option, startup fails instead of silently exposing the stack. The wrapper also suppresses credential-bearing start and status output.
