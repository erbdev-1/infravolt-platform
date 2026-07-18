# S1-MARKET-001 — Trusted Host, Market and Locale

| Field | Evidence |
|---|---|
| Date | 2026-07-18 |
| Work package | WP-06 — Trusted Host, Market and Locale |
| Backlog tasks | FND-014, FND-015 and FND-016 |
| Authority | Founder-authorised Sprint 1 continuation under G0-COND-001 |
| Engineering owner | Erhan Baydı |
| Reviewer | Founder — pending review |
| Status | Complete — pending Founder review |

## Specification and governance basis

- INF-05 §11 requires host allowlisting, canonical alias handling, server-owned market/locale context, `src/proxy.ts`, spoofed-header cleanup and unknown-host rejection.
- INF-16 §34.2 requires an unknown-host rejection, UK/UA context proof and exact `en-GB`/`uk-UA` contracts for FND-014–016.
- INF-18 §§55–61 requires the typed `MarketContext`, lowercase/trailing-dot/port normalization, explicit host allowlisting, controlled preview policy, canonical `www` behavior, spoofing resistance and locale-aware HTML.
- G0-DEC-004 fixes local hosts as `uk.infravolt.localhost` and `ua.infravolt.localhost`.
- G0-DEC-005 and ADR-0003 allow the exact Ukraine production domain to remain environment-configurable until its release gate. WP-06 implements that configuration boundary and does not close GOV-010, approve a domain or launch Ukraine.
- INF-18 §132 prescribes `S1-MARKET-001` for WP-06 evidence.

## Implemented contracts

- Added exact shared `MarketCode`, `LocaleCode`, `MarketContext` and resolution contracts for UK/`en-GB` and UA/`uk-UA`.
- Added a server-only market resolver that validates configured public origins, normalizes request hosts, applies an explicit allowlist, supports explicitly configured preview origins, handles approved local aliases and ports, and rejects unknown or malformed hosts without echoing values.
- Added canonical alias support. The known UK `www.infravolt.co.uk` alias and a future configured `.ua` alias redirect only when their corresponding canonical production origin is configured.
- Added `src/proxy.ts` using the actual request `Host` header as the allowlisted authority. Query, form, forwarded-host and incoming internal market/locale headers cannot choose the market.
- Removed `Forwarded`/`X-Forwarded-Host` metadata before downstream handling, replaced spoofable internal headers with trusted normalized context and returned a no-store 404 for unknown hosts.
- Revalidated trusted proxy headers at the server layout boundary before using the locale. The root HTML `lang` now follows `en-GB` or `uk-UA` and the application is server-rendered per request.
- Kept proxy responsibilities narrow: no database, authentication, business data, provider call, geo redirect or final authorization was added.

## Host and locale matrix

| Scenario | Result |
|---|---|
| Configured UK host | `uk` / `en-GB` |
| Configured UA host | `ua` / `uk-UA` |
| Uppercase/trailing-dot host | Normalized and resolved |
| UK and UA local aliases with explicit ports | Resolved to the matching market only |
| Bare localhost | Rejected |
| Configured UK/UA `www` aliases | Resolved with canonical redirect |
| Explicit preview origin | Resolved only to its configured market |
| Arbitrary preview origin | Rejected |
| Unknown/malformed/multi-value host | Rejected without value disclosure |
| Spoofed query/form/internal headers | Ignored or overwritten; Host remains authoritative |
| Malformed forwarded host | Removed and ignored |
| Mismatched trusted market/locale headers | Rejected during server revalidation |
| Repeated resolution after caller mutates a returned URL | Original trusted configuration preserved |

## Commands and results

| Command | Result |
|---|---|
| `node --version` | `v24.18.0` |
| `pnpm --version` | `11.13.0` |
| `pnpm install --frozen-lockfile` | Passed; lockfile already up to date |
| `pnpm verify:market` | Passed: twelve checks |
| `pnpm verify:env` | Passed: ten checks |
| `pnpm verify:common-contracts` | Passed: six checks |
| `pnpm verify:server-boundary` | Passed: one positive and four independent negative builds |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| Positive `pnpm build` with safe process-local UK/UA origins | Passed; proxy recognized and `/` server-rendered dynamically |
| Built-server Host smoke | Passed: UK 200/`en-GB`, UA 200/`uk-UA`, unknown 404/redacted |
| `git diff --check` | Passed |
| Credential-pattern scan | Passed: zero high-confidence matches |
| Environment-file inventory | Passed: `.env.example` only |
| Specification-change scan | Passed: zero changes |
| Relative Markdown-link validation | Passed |

Vitest and Playwright remain owned by later WP-15 and were not introduced early. The package-specific verifier exercises the actual production resolver and proxy modules rather than duplicating their logic.

## Corrections and internal review

- Corrected native Node verification imports to use Next's concrete server entry and explicit relative TypeScript paths.
- Made identical trusted-host registration idempotent so development defaults do not conflict, while cross-market or behavior conflicts still fail safely.
- Added runtime URL cloning so caller mutation cannot change later resolution.
- Removed forwarded-host metadata after review identified that ignoring it for resolution was insufficient if it remained available downstream.
- Wired root HTML language to a revalidated trusted context after review identified the hard-coded `en-GB` foundation value.
- Runtime smoke first showed the expected rejection of a port that differed from the build-time public origin, then exposed that `request.nextUrl.host` represented Next's internal listening origin under `next start`. The proxy was corrected to validate the actual request `Host` header, and the complete runtime smoke passed.

No unresolved in-scope code, architecture, security or scope finding remains.

## Security and scope

- No real credential, secret, customer data, production service or real environment file was added.
- No Ukraine production domain was invented, purchased, approved or launched; the value remains configuration-owned.
- No client-provided market, locale, query, form or forwarded host is authoritative.
- Unknown production-like hosts do not fall back to UK.
- No dependency or pnpm lifecycle approval changed.
- No specification or historical evidence record changed.
- No SEO metadata/canonical implementation, market switcher, content, feature flag, global error UI, Supabase, database, auth, API, CI, deployment or production configuration was added.
- WP-07/FND-020 and all later packages remain outside this increment.
