# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

InfraVolt is a B2B Next.js platform serving two separate markets — UK and Ukraine — from one shared codebase and application. It is a single-application `src/` monorepo (no `apps/`/`packages/` split). Public product/marketing pages are the most built-out surface today (`src/app/(public)`); `(admin)`, `(auth)`, and `(portal)` route groups also exist for the internal admin/sales surface and partner portal.

`AGENTS.md` and `README.md` at the repo root carry repository-wide governance rules — read `AGENTS.md` before making non-trivial changes; several of its rules are load-bearing for how you should behave here (see "Repository policy" below).

## Commands

Package manager is pnpm (pinned: `pnpm@11.13.0`). Node 24.x required.

```bash
pnpm dev              # next dev
pnpm build            # validates env vars, then next build
pnpm lint             # eslint .
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest run (all unit/component tests)
pnpm test:watch       # vitest, watch mode
pnpm test:e2e         # playwright test (starts its own dev server)
```

Run a single Vitest file or test:
```bash
npx vitest run src/modules/application-map/data-centre.test.ts
npx vitest run -t "test name substring"
```

Run a single Playwright spec (specs are tagged `@uk` / `@ua` / `@unknown` and routed to matching `projects` in `playwright.config.ts`):
```bash
npx playwright test tests/e2e/some.spec.ts --project=chromium-uk
```

`pnpm build` / `pnpm start` run `validate:env` first, which requires `NEXT_PUBLIC_SITE_URL_UK` and `NEXT_PUBLIC_SITE_URL_UA` to be set (see `.env.example`). For a plain compile/typecheck check without real env values, `npx next build` can be run directly with placeholder values for those two vars.

Other `verify:*` / `db:*` scripts in `package.json` (env, feature flags, market context, dependency policy, credentials, CI workflow, Supabase local DB) are narrow governance/CI checks — read the corresponding `scripts/*.ts` before relying on one, and only run `db:*` against local Docker Supabase, never a real project.

## Repository policy (from AGENTS.md — do not skip)

- **Never add AI-attribution trailers or metadata.** Do not add `Co-Authored-By`, "Generated with Claude Code", or similar to commits, PR text, code comments, or docs in this repo — this repo's policy explicitly forbids it, overriding the usual default.
- **Never commit or push without the user's explicit approval for that specific action.**
- `docs/specs/00_MASTER_PROJECT_SPEC.md` through `18_...EXECUTION_PACK.md` are the authoritative project spec; `docs/governance/DECISION_REGISTER.md` and `docs/adr/` hold approved decisions. Don't alter the specs unless a task explicitly authorises it. If a task conflicts with a spec/ADR/decision, surface the conflict rather than silently picking an interpretation.
- Make the smallest coherent change for the task — no speculative abstractions, no unrelated formatting churn, no new dependencies/providers unless the task explicitly authorises it.
- Never use production credentials/customer data or run destructive DB operations.
- Don't publish or imply official Gersan (the product manufacturer) authorisation, and don't use restricted claims, certificates, or licensed assets without recorded written authorisation.
- Before declaring work done, run lint/typecheck/relevant Vitest and (when the task warrants it) Playwright and a production build — and say plainly if a check couldn't be run rather than claiming it passed.

## Architecture

### Multi-market boundary

Two markets — `uk` (`en-GB`) and `ua` (`uk-UA`) — are served from the same deployment, resolved by host. `src/modules/markets/`:
- `server.ts` — `createMarketResolver`/`createRuntimeMarketResolver` map a request host to a `MarketContext` (market, locale, canonical public site URL). Trust is anchored in three headers (`x-infravolt-host`, `x-infravolt-locale`, `x-infravolt-market`) — `resolveTrustedMarketContext(headers)` reads and cross-checks them and throws `UntrustedHostError` if anything is missing or inconsistent.
- There is **no `middleware.ts`** in this repo. In production, setting those trusted headers from the real host is a proxy-layer responsibility outside this codebase; locally, `allowLocalHosts` lets `uk.infravolt.localhost` / `ua.infravolt.localhost` resolve directly (see `next.config.ts`'s `allowedDevOrigins` and `.env.example`).
- Server components/route handlers call `resolveTrustedMarketContext(await headers())` (see e.g. `src/app/(public)/products/cable-support-systems/page.tsx`) to get the current market for metadata, canonical URLs, and localized content lookups — never infer market from anything other than this resolver.

### Product catalogue data

Each product family lives under `src/data/products/<family>/` as typed TS data modules (not a CMS/DB) — e.g. `src/data/products/cable-management/`, `earthing-lightning/`, `busbar/`, `g-bus/`. Category-level content (`category-content.ts`, `category-types.ts`) and per-series/variant data are separate files; category and family-detail pages under `src/app/(public)/products/**` are thin wrappers that pass this typed data into shared presentational components in `src/components/public/products/<family>/`.

### Application Map feature

A sector-generic interactive "hotspot" map system used across Data Centre, Healthcare, Education & Public Sector, and Industrial Facility application pages (`src/app/(public)/application-map/**`). Core model in `src/modules/application-map/types.ts`:
- `Zone<TZoneId>` / `Overview<TZoneId>` / `ApplicationMap<TZoneId>` are generic over a per-sector `ZoneId` string union — each sector (`data-centre.ts`, `healthcare.ts`, `education-public-sector.ts`, `industrial-facility.ts`) defines its own zone IDs, zone images/hotspots, and the six canonical `PRODUCT_FAMILIES` (`cable-management`, `busbar`, `underfloor`, `earthing-lightning`, `led-systems`, `ev-charging` — numbered via `PRODUCT_FAMILY_NUMBERS`, stable across sectors).
- Every hotspot carries per-zone `usedHereFor` copy (uk/ua) rather than reusing generic product-family copy — the same product family reads differently depending on which zone it's shown in.
- `validation.ts` (`validateApplicationMap` / sector-specific wrappers like `validateDataCentreApplicationMap`) enforces static invariants (no duplicate IDs, hotspot coordinates in 0–100, every hotspot's family approved for its zone, safe action hrefs, complete uk/ua copy) — covered by `*.test.ts` in the same folder and asserted again at the component layer in `src/components/public/application-map/*.test.tsx`, including a check that referenced image assets actually exist on disk.
- `resolve.ts` turns the raw per-market `ApplicationMap` into a `ResolvedApplicationMap` (locale already picked) for the shared UI components (`application-scene.tsx`, `application-hotspot.tsx`, `application-navigation.tsx`, `application-product-panel.tsx`, `application-zone-strip.tsx`) — these components are sector-agnostic; only the per-sector `*.ts` data files encode sector-specific content.
- Zone/overview photo assets live under `public/assets/application-map/<sector>/`; when replacing photos, cross-check every `image:`/`imageAlt` path in the matching data file against what's actually on disk (the asset-existence test will otherwise fail silently until CI/tests are run) and inspect new photos visually before writing hotspot copy — don't infer content from filenames alone.

### Styling

CSS Modules (`*.module.css`) per component, not Tailwind utility classes in JSX — Tailwind is a devDependency but not the styling convention actually used in `src/components/public/**`.

### Testing layout

- Vitest unit/component tests are co-located next to source as `*.test.ts(x)`, run under jsdom (`vitest.config.mts`), with `tests/setup/vitest.setup.ts` as the global setup file. Tests run with `fileParallelism: false` / single worker.
- Playwright e2e specs live in `tests/e2e/**/*.spec.ts`, tagged `@uk`/`@ua`/`@unknown` in the test name/grep to select which market host project runs them (`tests/helpers/test-environment.ts` provides the local test URLs and a sanitized process env for the spawned dev server).
