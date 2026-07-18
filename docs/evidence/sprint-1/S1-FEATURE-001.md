# S1-FEATURE-001 — Feature Flag Foundation

| Field | Evidence |
|---|---|
| Date | 2026-07-18 |
| Work package | Founder-authorised WP-07 — Feature Flag Foundation |
| Backlog task | FND-017 — Create feature-flag contract |
| Authority | Founder-controlled Sprint 1 increment under G0-COND-001 |
| Engineering owner | Codex |
| Reviewer | Founder — pending review |
| Status | Complete — pending Founder review |

## Specification and governance basis

- INF-16 defines FND-017 with the acceptance criterion `Server-owned flags` and a dependency on FND-011.
- INF-05 §46 requires server evaluation for security-sensitive features, a tested flag-off path, separation from operational configuration, stale-flag ownership/review and an explicit rule that flags are not permissions.
- G0-COND-001 continues to prohibit Ukraine production launch and other restricted production, legal and commercial actions. A flag cannot grant those permissions.
- INF-18 assigns its package label `WP-07` to FND-020 global safe states and does not prescribe a feature-flag evidence identifier. The Founder-controlled task instead explicitly authorises `WP-07 — Feature Flag Foundation`, FND-017, and `S1-FEATURE-001`. This increment implements only FND-017 and does not claim or modify FND-020.

## Canonical registry

| Flag | Default | Allowed markets | Release stage | Review milestone | Purpose |
|---|---:|---|---|---|---|
| `ukraineMarketEnabled` | Disabled | UA only | R2 | G7 | Gates the Ukraine market release |
| `partnerPortalEnabled` | Disabled | UK and UA | R3 | R3 | Gates company-scoped partner portal release |
| `productComparatorEnabled` | Disabled | UK and UA | R4/V1 | R4/V1 | Preserves the Founder decision deferring the comparator |

The registry is the single runtime source of flag names. `FeatureFlagName` is derived from it, metadata and market arrays are frozen, and every definition is a release control with `product-owner` cleanup ownership. No operational setting, permission, credential or arbitrary environment name is represented as a flag.

## Resolution and security policy

- The application-facing resolver is server-only and defaults every canonical flag to disabled.
- A missing override never enables a flag. Unknown flag names and invalid overrides throw code-only errors without supplied names or values.
- Explicit fixture/future server-owned overrides are limited to known boolean keys. They are copied, validated and frozen before evaluation.
- A market-restricted flag remains disabled outside its registry allowlist even when its server-owned override is true.
- Evaluation requires the complete trusted WP-06 market context and validates the market/locale pairing, host presence and URL object.
- Query, form, cookie, forwarded-host and arbitrary header data are not read as authority and cannot override a flag.
- Registry and resolver modules directly import Next.js `server-only`; isolated Client Component imports fail during compilation.
- No `NEXT_PUBLIC_*` flag variable, provider integration, database lookup or client-side override mechanism was added.

## Files changed

- `src/config/features/registry.ts`
- `src/config/features/types.ts`
- `src/config/features/server.ts`
- `scripts/verify-feature-flags.ts`
- `scripts/verify-server-boundary.ts`
- `package.json`
- `docs/evidence/sprint-1/S1-FEATURE-001.md`
- `docs/PROJECT_LOG.md`

## Commands and exact results

| Command | Result |
|---|---|
| `node --version` | `v24.18.0` |
| `pnpm --version` | `11.13.0` |
| `pnpm install --frozen-lockfile` | Passed; lockfile already up to date |
| `pnpm verify:features` | Passed: ten checks |
| `pnpm verify:env` | Passed: ten checks |
| `pnpm verify:common-contracts` | Passed: six checks |
| `pnpm verify:market` | Passed: twelve checks |
| `pnpm verify:server-boundary` | Passed: one positive server build and six independent negative Client Component builds, including feature registry and resolver imports |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| Positive `pnpm build` with safe process-local UK/UA localhost origins | Passed with Next.js 16.2.10; production environment validation passed |
| `git diff --check` | Passed |
| Credential-pattern scan | Passed: zero credential-like matches in the WP-07 implementation |
| Environment-file inventory | Passed: `.env.example` only |
| Specification-change scan | Passed: zero changes |
| Historical-evidence scan | Passed: no existing evidence record changed |
| Relative Markdown-link validation | Passed |
| Out-of-scope implementation scan | Passed: no provider, database, authentication, deployment or UI work found |

## Negative verification matrix

- Unknown runtime flag names fail with `UNKNOWN_FLAG` and do not echo the rejected name.
- Unknown override keys and non-boolean override values fail with `INVALID_OVERRIDE` and do not echo supplied data.
- Invalid market contexts fail with `INVALID_CONTEXT` and do not echo supplied data.
- All three canonical flags remain disabled without an explicit server-owned override.
- `ukraineMarketEnabled` remains disabled for the UK market even when the UA release fixture is enabled.
- Added query, form, cookie, forwarded and header fields do not change the default resolution.
- Client Component imports of both the registry and resolver fail with Next.js's server-only boundary error.

## Internal review and corrections

- Replaced the initial market-code-only evaluation input with the complete trusted WP-06 `MarketContext` and added runtime validation for its market/locale/host/URL invariants.
- Restricted override fixtures to plain or null-prototype records before copying, validating and freezing them.
- Confirmed the default application API has no provider, environment or user-controlled override path.

No unresolved in-scope correctness, security, type-safety, spoof-resistance, immutability or server/client-boundary finding remains.

## Assumptions and unresolved release decisions

- INF-16 and INF-18 do not define a complete initial registry. The three names above are the smallest set tied to existing documented release controls and the Founder-provided preferred list.
- Calendar cleanup dates are not specified. The registry records the named owner and the binding release/gate review milestone without inventing a date; calendar scheduling remains a Product Owner release-planning decision.
- The exact Ukraine production domain remains unresolved and configuration-owned until G7. This package adds no domain and does not launch the UA market.
- Enabling a flag in future does not satisfy legal, content, authorization, deployment, authentication or permission gates. G0 restrictions remain authoritative.
- No package dependency, lockfile entry or pnpm lifecycle approval was added or changed.
