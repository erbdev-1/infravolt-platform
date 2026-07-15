# InfraVolt — Sprint 1 Engineering Foundation Execution Pack

> Document ID: INF-18  
> Version: 0.1.0  
> Status: Final Planning Document — Ready after G0 Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Sprint Owner: Product Director / CTO / Head Agent  
> Parent documents: 00_MASTER_PROJECT_SPEC.md through 17_SPRINT_0_EXECUTION_PACK.md  
> Sprint: S1 — Engineering Foundation  
> Timebox: 10 working days  
> Entry gate: G0 — Programme Ready  
> Exit gate: G1 — Foundation Ready  
> Architecture: Modular monolith / one repository / one shared application  
> Markets: United Kingdom + Ukraine  
> Locales: en-GB + uk-UA  
> Runtime baseline: Node.js 24 LTS  
> Framework baseline: Next.js 16.2.x App Router + React 19.2-compatible release  
> Package manager baseline: pnpm 11.x, exact version pinned  
> Database platform: Supabase PostgreSQL/Auth/Storage, local-first migrations  
> Hosting: Vercel  
> Last updated: 15 July 2026  
> Document language: Turkish; source paths, commands, task IDs, types, environment variables and evidence identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt specification setinin son genel planlama dokümanıdır.

Amaç:

- Sprint 1 engineering foundation’ı gerçek kod görevlerine dönüştürmek,
- repository/runtime/package/config kararlarını kesinleştirmek,
- dual-domain UK/Ukraine context temelini kurmak,
- local Supabase migration/seed/type workflow’unu kurmak,
- CI, test, preview, security ve documentation baseline’ını oluşturmak,
- Sprint 2 design-system çalışmalarına güvenli bir codebase devretmek.

Bu belgeden sonra yeni genel architecture dokümanı üretilmeden implementation repository’sinde çalışılır.

---

## 2. Sprint Goal

Fresh checkout’tan kurulabilen, typecheck/test/build çalıştırabilen, UK ve Ukraine hostlarını güvenilir server context olarak ayıran, local database’i migration/seed ile yeniden oluşturabilen ve production verisi/secreti olmadan preview’a deploy edilen engineering foundation oluşturmak.

---

## 3. Sprint Outcome

Sprint sonunda:

- canonical repository,
- pinned runtime/package manager,
- Next.js modular-monolith skeleton,
- public/auth/admin/portal route groups,
- validated environment contract,
- server-only boundaries,
- trusted host/market/locale resolver,
- local Supabase,
- migration/seed/generated-type workflow,
- unit/component/E2E test foundation,
- protected CI checks,
- Vercel preview,
- security/dependency/secret baseline,
- setup/ADR/contributor documentation,
- G1 evidence

hazır olur.

---

## 4. Entry Condition

Sprint 1 starts only after:

- R1/R2/R3 scope approved,
- Product/Technical owner named,
- canonical repository ownership known,
- UK/Ukraine domain strategy sufficient for host config,
- provider access owner known,
- Sprint 0 G0 Pass or safe Conditional Pass,
- unresolved blockers cannot change core architecture silently.

---

## 5. Conditional Entry

Sprint 1 may start while these remain publication blockers:

- some product image licences,
- specific conformity claim approval,
- non-foundation content gaps,
- later Application Map scene approval.

They must not affect repository, market-context or environment architecture.

---

## 6. Sprint 1 Out of Scope

- final design system,
- full corporate/public pages,
- real product catalogue,
- Application Map implementation,
- public forms/email,
- admin business workflows,
- production Supabase data,
- production domain cutover,
- production authentication,
- portal features,
- analytics provider,
- checkout/order/ERP/AI features.

One synthetic vertical slice may be built only to prove foundation.

---

## 7. Technical Baseline

| Area | Baseline |
|---|---|
| Framework | Next.js 16.2.x App Router |
| UI runtime | React 19.2-compatible |
| Language | TypeScript 5.x strict |
| Node | 24.x LTS |
| Package manager | pnpm 11.x exact pinned |
| Styling | Tailwind CSS 4.x |
| Database | Supabase PostgreSQL |
| Auth client | Supabase JS + SSR when auth starts |
| Test | Vitest, React Testing Library, Playwright |
| Hosting | Vercel |
| Proxy boundary | src/proxy.ts |
| Repository | One app / modular monolith |

---

## 8. Version Pinning Decision

Bootstrap day:

1. Verify current supported stable patch within approved majors.
2. Record exact Node developer version.
3. Set package.json engines.node to 24.x for Vercel.
4. Set packageManager to exact pnpm 11 patch.
5. Install exact dependency versions into lockfile.
6. Commit pnpm-lock.yaml.
7. Record versions in setup guide.

Do not use floating latest in CI after bootstrap.

---

## 9. Verified July 2026 Reference

At document date:

- official Next.js documentation displays 16.2.10,
- Node.js 24.18.0 is the current 24 LTS patch,
- pnpm 11.10 is available,
- Vercel supports Node 24.x,
- Supabase documents local migration, seed and db reset workflow.

Patch versions are rechecked once when repository bootstrap actually runs.

---

## 10. Next.js 16 Rules

- App Router.
- Server Component-first.
- src/proxy.ts, not new middleware.ts.
- Async params/searchParams/cookies/headers APIs.
- Turbopack default.
- ESLint run explicitly; next build does not replace lint.
- Cache Components not enabled automatically.
- React Compiler not enabled automatically.
- No experimental flag without ADR.

---

## 11. Node and pnpm Rules

- Node 24.x LTS in package engines.
- Developer patch recorded with .nvmrc and/or .node-version.
- Corepack/pnpm exact version.
- pnpm frozen lockfile in CI.
- engineStrict enabled where compatible.
- package scripts are the single command interface.
- dependency install scripts reviewed through pnpm 11 controls.

---

## 12. Supabase Rules

- Local-first.
- SQL migrations are source of truth.
- Seed is synthetic and deterministic.
- Clean db reset must pass.
- Generated types come from schema.
- No manual production schema drift.
- No production project needed to develop foundation.
- Public/private schema and grants prepared early.

---

## 13. Repository Strategy

One repository contains:

- application code,
- migrations,
- seeds,
- tests,
- CI,
- architecture decisions,
- setup/operations documentation.

Large source archives and private contracts are not blindly committed.

---

## 14. Sprint Work Packages

| WP | Outcome | Backlog mapping |
|---|---|---|
| WP-01 | Repository baseline | FND-001/002 |
| WP-02 | Runtime/package pinning | FND-003/004 |
| WP-03 | Next.js bootstrap and modules | FND-005–010 |
| WP-04 | Environment contract | FND-011/012 |
| WP-05 | Server boundaries/common types/log context | FND-013/018/019 |
| WP-06 | Trusted host/market/locale | FND-014–016 |
| WP-07 | Global safe states | FND-020 |
| WP-08 | CI and supply-chain baseline | FND-021–025 |
| WP-09 | ADR/contributor/dependency governance | FND-026–028 |
| WP-10 | Preview and G1 evidence | FND-029/030 |
| WP-11 | Local Supabase foundation | DAT-001/002/004/007/008/010 |
| WP-12 | Vercel/environment ownership | OPS-001–007 |
| WP-13 | Supabase environment baseline | OPS-019 |
| WP-14 | Branch protection/required checks | OPS-021/022 |
| WP-15 | Test foundation | QA-003–005/008/009 |
| WP-16 | Security foundation | IAM-022/026/027 |
| WP-17 | Setup/ADR documentation | DOC-001–003 |
| WP-18 | Synthetic vertical slice | Foundation proof |

---

## 15. Priority Groups

### Must for G1

WP-01 through WP-17.

### Proof/Should

WP-18 vertical slice.

### Stretch

- health endpoint shell,
- design token placeholder contract,
- basic automated accessibility smoke,
- preview protection enhancement beyond baseline.

Stretch never replaces Must.

---

## 16. Team Split

Recommended standard capacity:

| Role | Primary work |
|---|---|
| Head Agent/Architect | WP-01–10/17/18 integration |
| Backend/Data Engineer | WP-11/13 |
| DevOps Engineer | WP-12/14 |
| QA Engineer | WP-15 |
| Security Reviewer | WP-16 and cross-review |
| Product/Founder | G0 inputs, preview/G1 acceptance |

Small team may combine roles but not skip review.

---

## 17. Working Agreement

1. Inspect before bootstrap.
2. Preserve existing user work.
3. Small patches.
4. One owner per high-risk file.
5. No secrets.
6. No production data.
7. Every config change tested locally/CI.
8. No dependency without reason.
9. Main remains deployable.
10. G1 requires evidence, not code volume.

---

## 18. Branch Strategy

- protected main,
- short-lived branches,
- task/WP reference in branch/PR,
- required review/checks,
- no direct production deployment from unreviewed branch,
- merge foundation packages in dependency order.

Exact naming follows chosen repo platform.

---

## 19. Commit Strategy

Preferred small logical commits:

- chore(runtime): pin node and pnpm
- chore(app): bootstrap Next.js foundation
- feat(markets): add trusted host resolver
- chore(db): initialize Supabase migrations
- test(markets): add host matrix
- ci: add required verification checks
- docs: add setup and ADR register

No giant “initial website” commit.

---

## 20. Review Order

1. Runtime/package.
2. Bootstrap/module tree.
3. Environment/security.
4. Market resolver.
5. Supabase.
6. Tests.
7. CI.
8. Preview.
9. Evidence/docs.

Downstream work does not review against moving contracts.

---

## 21. Definition of Ready

WP is Ready when:

- repo/provider access exists,
- relevant Sprint 0 inputs are available,
- owner/reviewer named,
- allowed/protected files listed,
- acceptance/tests known,
- no external secret required.

---

## 22. Definition of Done

WP is Done when:

- code/config/docs complete,
- peer/domain review complete,
- test commands pass,
- no unrelated changes,
- evidence attached,
- affected documentation updated,
- main integration verified.

---

## 23. G1 Exit Criteria

- fresh checkout setup documented,
- exact runtime/package versions reproduce,
- install/typecheck/lint/unit/build pass,
- local Supabase start/reset/seed/type generation pass,
- UK/UA/unknown-host tests pass,
- public/auth/admin/portal skeleton builds,
- preview deploy succeeds,
- preview is non-production and non-indexed,
- secrets absent from repo/logs,
- CI checks required,
- ADR/contributor/setup docs available.

---

## 24. Day 1 — Inspect and Baseline

Targets:

- locate canonical repository,
- inspect git/worktree/files,
- record existing changes,
- verify owner/access,
- decide in-place bootstrap vs new app root,
- open WP tracking.

Do not overwrite existing files with create-next-app before inspection.

---

## 25. Day 2 — Runtime and Bootstrap

Targets:

- Node 24/pnpm 11 pin,
- Next.js 16.2 bootstrap,
- strict TypeScript,
- Tailwind baseline,
- root scripts,
- initial build.

Evidence:

- versions,
- clean install,
- build result.

---

## 26. Day 3 — Architecture Skeleton

Targets:

- route groups,
- module tree,
- aliases,
- server-only boundary,
- common result/error types,
- global safe states.

No business feature implementation.

---

## 27. Day 4 — Market Context

Targets:

- host allowlist,
- trusted market resolver,
- locale config,
- src/proxy.ts boundary,
- UK/UA/unknown-host tests,
- local host simulation.

Client input cannot set market.

---

## 28. Day 5 — Local Supabase

Targets:

- Supabase CLI init/start,
- schema-boundary migration,
- synthetic seed,
- db reset,
- generated type command,
- database CI strategy.

Midpoint review after results.

---

## 29. Day 6 — Test Foundation

Targets:

- Vitest,
- React Testing Library,
- Playwright,
- test selectors policy,
- failure artifacts,
- market resolver/unit smoke,
- page/route smoke.

---

## 30. Day 7 — CI and Security

Targets:

- frozen install,
- typecheck,
- lint,
- unit,
- build,
- secret scan,
- dependency process,
- security headers baseline,
- protected checks configuration.

---

## 31. Day 8 — Preview Deployment

Targets:

- Vercel project/link,
- preview variables with non-production values,
- Node 24.x,
- non-indexing/protection,
- preview deploy,
- UK/UA host-context simulation strategy,
- smoke checks.

No production database credentials.

---

## 32. Day 9 — Vertical Slice and Documentation

Targets:

- one synthetic market-aware page,
- server-rendered market marker,
- no real product claim,
- setup guide tested,
- ADRs,
- contributor/agent rules,
- G1 evidence draft.

---

## 33. Day 10 — G1 Review

Run:

- fresh install,
- verify script,
- local DB reset,
- market tests,
- preview smoke,
- security/secret review,
- documentation walkthrough.

Decision:

- Pass
- Conditional Pass
- Fail/targeted extension

---

## 34. Midpoint Review

Questions:

- Is clean install reproducible?
- Did bootstrap preserve existing work?
- Are environment names stable?
- Does market resolver trust only approved host?
- Does local DB reset from code?
- Are CI/test/preview access blockers visible?
- Can G1 pass in five remaining days?

---

## 35. Evidence Codes

| Code | Evidence |
|---|---|
| S1-REPO | Repository baseline |
| S1-RUNTIME | Node/pnpm/package versions |
| S1-BUILD | Typecheck/lint/test/build |
| S1-ARCH | Module/route structure |
| S1-MARKET | Host/market/locale matrix |
| S1-ENV | Environment validation |
| S1-DATA | Migration/reset/seed/types |
| S1-CI | Required checks |
| S1-SEC | Secret/dependency/header review |
| S1-PREVIEW | Vercel preview/smoke |
| S1-DOC | Setup/ADR/contributor docs |
| S1-GATE | G1 result |

---

## 36. WP-01 — Repository Baseline

Backlog: FND-001/002.

Steps:

1. Confirm canonical path/remote.
2. Run file and git status inspection.
3. Identify framework/package manager/history.
4. Record user/uncommitted changes.
5. Identify secrets/large binaries without exposing content.
6. Decide bootstrap method.

Acceptance:

- no existing work overwritten,
- repo owner/remote/default branch recorded,
- baseline report stored.

---

## 37. WP-02 — Runtime and Package Manager

Backlog: FND-003/004.

Required files:

- package.json
- pnpm-lock.yaml
- .nvmrc and/or .node-version
- pnpm-workspace.yaml if settings needed

Acceptance:

- Node 24.x engine,
- exact developer patch recorded,
- exact pnpm 11 packageManager,
- frozen install succeeds,
- CI/developer match documented.

---

## 38. WP-03 — Next.js Bootstrap

Backlog: FND-005–010.

Baseline options:

- TypeScript
- ESLint
- Tailwind CSS
- App Router
- src directory
- import alias

Acceptance:

- Next.js 16.2.x exact lock,
- strict TypeScript,
- dev/build works,
- no pages-router,
- no old middleware.ts,
- minimal dependencies.

---

## 39. Bootstrap Command Pattern

For an empty approved repository:

~~~bash
corepack enable
corepack prepare pnpm@11.10.0 --activate
pnpm create next-app@16.2.10 . --ts --eslint --tailwind --app --src-dir --import-alias "@/*" --use-pnpm
~~~

Before execution:

- recheck official patch,
- ensure directory safe/empty enough,
- preserve git/user files,
- review generated dependencies/files.

Existing repository uses targeted integration, not destructive regeneration.

---

## 40. Required Package Scripts

Recommended interface:

~~~json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "db:start": "supabase start",
    "db:stop": "supabase stop",
    "db:reset": "supabase db reset",
    "verify": "pnpm typecheck && pnpm lint && pnpm test && pnpm build"
  }
}
~~~

Exact DB/type commands adapt to installed CLI strategy.

---

## 41. Dependency Baseline

Sprint 1 minimum:

- next
- react
- react-dom
- typescript/tooling
- tailwind baseline from scaffold
- zod for environment validation
- vitest
- testing-library packages
- jsdom or approved test environment
- playwright
- Supabase CLI strategy

Do not add:

- Redux,
- Prisma,
- animation libraries,
- charts,
- CMS,
- analytics,
- queue/cache/search services

in foundation without approved need.

---

## 42. Module Architecture

~~~text
src/
  app/
  components/
  config/
  lib/
  modules/
  styles/
  types/
tests/
supabase/
docs/
public/
~~~

---

## 43. App Route Skeleton

~~~text
src/app/
  (public)/
    layout.tsx
    page.tsx
  (auth)/
    layout.tsx
  (admin)/
    admin/
      layout.tsx
  (portal)/
    portal/
      layout.tsx
  error.tsx
  global-error.tsx
  loading.tsx
  not-found.tsx
  layout.tsx
  globals.css
~~~

Route groups do not automatically create URL segments.

---

## 44. Domain Module Skeleton

~~~text
src/modules/
  markets/
  catalog/
  industries/
  resources/
  companies/
  quotes/
  enquiries/
  dealers/
  accounts/
  notifications/
  audit/
  analytics/
~~~

Sprint 1 modules contain contracts/placeholders only where needed.

---

## 45. Module Internal Pattern

Future-capable pattern:

~~~text
module/
  application/
  domain/
  infrastructure/
  presentation/
  index.ts
~~~

Do not create empty folders everywhere. Establish convention with markets vertical slice, then replicate when work begins.

---

## 46. Import Boundary Rule

- App routes import module public contracts.
- Module A does not import Module B internals.
- Server-only infrastructure stays server-only.
- Components do not call database directly.
- Shared library remains generic; business rules stay in modules.
- Circular dependency check added later if justified.

---

## 47. WP-04 — Environment Contract

Backlog: FND-011/012.

Outputs:

- server environment schema,
- client/public environment schema,
- normalized URL/host parser,
- safe .env.example,
- test strategy.

Errors name missing variable but never print secret value.

---

## 48. Public Environment Variables

From architecture:

~~~text
NEXT_PUBLIC_SITE_URL_UK=
NEXT_PUBLIC_SITE_URL_UA=
NEXT_PUBLIC_PROTECTED_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
~~~

Only browser-required values use NEXT_PUBLIC.

---

## 49. Server-only Environment Variables

~~~text
SUPABASE_SECRET_KEY=
RESEND_API_KEY=
RESEND_WEBHOOK_SECRET=
TURNSTILE_SECRET_KEY=
CRON_SECRET=
EMAIL_FROM_UK=
EMAIL_REPLY_TO_UK=
EMAIL_FROM_UA=
EMAIL_REPLY_TO_UA=
LOG_LEVEL=
~~~

Sprint 1 may mark future-provider variables optional outside relevant environment. It must not use fake production secrets.

---

## 50. Environment Classification

| Class | Example | Browser | Commit value |
|---|---|---|---|
| Public config | site URL, publishable key | Yes | Name/example only |
| Server secret | service/secret key | No | Never |
| Local synthetic | local Supabase public keys | Local use | Follow safe local policy |
| Build config | feature/environment name | Sometimes | Non-secret |
| Production operational | email/cron/provider secret | No | Never |

---

## 51. Environment Validation Behavior

- server schema imported only in server code,
- client schema exposes explicit allowlist,
- URL values parsed/normalized,
- required variables environment-aware,
- test environment supports safe fixtures,
- secret values redacted from thrown errors/logs,
- CI can build with approved preview-safe set.

---

## 52. WP-05 — Server Boundaries and Common Contracts

Backlog: FND-013/018/019.

Build:

- server-only import guard,
- Result/error type baseline,
- request/correlation ID utility,
- safe logger context interface,
- redaction policy placeholder.

No business-specific giant global types file.

---

## 53. Common Result Pattern

Example contract:

~~~ts
type Success<T> = {
  ok: true;
  data: T;
};

type Failure = {
  ok: false;
  error: {
    code: string;
    message: string;
    fieldErrors?: Record<string, string[]>;
    correlationId?: string;
  };
};

type Result<T> = Success<T> | Failure;
~~~

Exact error taxonomy is finalized in backend implementation.

---

## 54. Correlation ID Rules

- generated or accepted only from trusted format,
- included in safe server logs,
- returned on unexpected error where useful,
- contains no user/company/market PII,
- not used as authentication,
- propagated to backend/provider context when safe.

---

## 55. WP-06 — Trusted Host, Market and Locale

Backlog: FND-014–016.

Core contract:

~~~ts
type MarketCode = "uk" | "ua";
type LocaleCode = "en-GB" | "uk-UA";

type MarketContext = {
  market: MarketCode;
  locale: LocaleCode;
  host: string;
  publicSiteUrl: URL;
};
~~~

Exact names may align with 05/06 types.

---

## 56. Host Trust Rules

- resolve from server request host,
- normalize lowercase/trailing dot/port for local rules,
- use explicit allowlist,
- respect trusted platform forwarding contract only,
- reject unknown production host,
- never accept market from form/query as authority,
- preview host requires explicit safe strategy,
- logs avoid sensitive full URL/query.

---

## 57. Host Matrix

| Environment | Host class | Expected |
|---|---|---|
| Local | localhost UK port/alias | UK/en-GB |
| Local | configured UA alias | UA/uk-UA |
| Preview | Vercel preview host | Explicit preview market/default |
| Production | approved UK domain | UK/en-GB |
| Production | approved UA domain | UA/uk-UA |
| Any | unknown/untrusted | Reject/safe error |

Preview strategy must not make arbitrary Host trusted.

---

## 58. Preview Market Strategy

Recommended:

- preview deployment defaults to UK for basic review,
- explicit protected preview routes or test-only host simulation cover UA,
- production mapping remains exact allowlist,
- no public query parameter changes trusted market,
- E2E can set approved local host header only in controlled test environment.

---

## 59. src/proxy.ts Responsibility

Allowed:

- request/host normalization,
- safe redirects,
- protected route pre-routing hints,
- locale/market headers under controlled contract,
- rejection of unsupported host.

Not allowed as sole control:

- final authorization,
- database RLS,
- sensitive business decisions,
- full user profile lookup.

---

## 60. Market Resolver Unit Tests

Required:

- UK production host,
- UK www/canonical rule,
- UA production host,
- uppercase host,
- explicit port/local alias,
- unknown host,
- spoofed query market,
- spoofed form market,
- preview host policy,
- malformed forwarded host.

---

## 61. Locale Rules

- UK public default en-GB.
- Ukraine public default uk-UA.
- HTML lang reflects locale.
- No automatic English fallback for Ukrainian legal/content publication.
- Protected surfaces may use approved preference later.
- Locale text/content storage remains separate from market authority.

---

## 62. WP-07 — Global Safe States

Backlog: FND-020.

Create minimal:

- loading,
- not found,
- route error,
- global error,
- unknown host/market error.

Acceptance:

- accessible headings/focus,
- no stack/secret output,
- correlation ID optional,
- no brand polish dependency,
- builds without client overuse.

---

## 63. Error Boundary Rules

- expected domain errors rendered near action later,
- unexpected route error uses error boundary,
- global error owns html/body as required,
- retry only when safe,
- production hides internal details,
- development retains useful diagnostics.

---

## 64. WP-08 — CI Verification

Backlog: FND-021–025.

Required pipeline:

1. checkout,
2. install exact pnpm,
3. verify Node major,
4. pnpm install --frozen-lockfile,
5. typecheck,
6. lint,
7. unit tests,
8. production build,
9. secret/security checks as configured,
10. artifacts on failure where safe.

---

## 65. CI Matrix Decision

Sprint 1 baseline:

- one supported Node major: 24,
- one exact pnpm,
- Linux runner,
- no unnecessary multi-OS matrix,
- Playwright smoke may run separately due browser cost,
- database integration job added when stable.

---

## 66. CI Environment Rules

- no production secrets,
- synthetic/non-sensitive variables,
- preview-specific publishable config,
- secret values masked,
- forks/untrusted contributions cannot access secrets,
- build validation cannot send real email or write production DB.

---

## 67. Secret Scanning

Baseline:

- repository history/worktree scan,
- pre-merge CI signal,
- .gitignore review,
- common token patterns,
- response runbook,
- test fixture proves detection without real secret.

If a real secret is found, rotate; deleting file alone is insufficient.

---

## 68. Dependency Security

- lockfile committed,
- minimal packages,
- exact major policy,
- pnpm 11 supply-chain defaults retained unless ADR,
- install scripts reviewed,
- vulnerability findings triaged by reachability/severity,
- automated updates only with tests/review.

---

## 69. WP-09 — ADR and Contributor Governance

Backlog: FND-026–028.

Create:

- docs/adr/README.md
- ADR-0001 architecture baseline
- ADR-0002 market/domain context
- ADR-0003 local Supabase/migrations
- contributor/agent guide
- dependency approval policy.

---

## 70. ADR-0001

Decision:

- one Next.js modular monolith,
- one repository,
- public/admin/portal route groups,
- Supabase,
- Vercel,
- no microservices/Prisma/Redux/public API in MVP.

Include context, alternatives and consequences.

---

## 71. ADR-0002

Decision:

- separate UK/Ukraine public domains,
- one shared app,
- server-trusted host resolver,
- market + locale context,
- explicit preview/local rules,
- no form/query authority.

---

## 72. ADR-0003

Decision:

- local-first Supabase,
- SQL migrations,
- deterministic seed,
- generated TypeScript database types,
- reset/test workflow,
- production drift prohibited.

---

## 73. Contributor/Agent Guide

Include:

- read relevant numbered docs,
- inspect repo/status,
- bounded task,
- allowed/protected files,
- small patch,
- no secrets,
- tests required,
- handoff format,
- preserve user changes,
- no dependency/architecture invention.

---

## 74. WP-10 — Preview and G1 Evidence

Backlog: FND-029/030.

Preview acceptance:

- linked to correct repo/branch,
- Node 24.x,
- pnpm exact install,
- preview variables,
- no production DB/auth/email,
- robots/noindex/protection,
- UK default/synthetic page,
- safe error behavior,
- smoke check.

---

## 75. Preview Protection

At minimum:

- preview not indexed,
- random preview URL not considered authorization,
- sensitive future admin/portal data absent,
- provider deployment access controlled,
- preview environment variables isolated.

---

## 76. WP-11 — Local Supabase Foundation

Backlog: DAT-001/002/004/007/008/010.

Outputs:

- supabase/config.toml,
- migrations directory,
- seed.sql,
- schema-boundary migration,
- type generation command/output location,
- db reset command,
- CI/local documentation.

---

## 77. Local Supabase Commands

Pattern:

~~~bash
pnpm exec supabase init
pnpm exec supabase start
pnpm exec supabase migration new foundation_schemas
pnpm exec supabase db reset
pnpm exec supabase gen types typescript --local
pnpm exec supabase stop
~~~

Choose local CLI dependency or approved invocation; pin strategy documented.

---

## 78. Initial Database Migration

Foundation only:

- app/public application schema decision,
- private schema,
- extension decisions,
- minimal helper conventions,
- grants/default privileges baseline,
- no complete 100-table schema in one migration.

Database phase expands incrementally from 06.

---

## 79. Seed Rules

- deterministic,
- synthetic,
- no real company/person/email,
- idempotent via reset,
- minimal market/config fixture if schema exists,
- stable IDs only where tests require,
- documented purpose.

---

## 80. Generated Types

Recommended location:

~~~text
src/types/database.generated.ts
~~~

Rules:

- generated, not hand-edited,
- regeneration command documented,
- CI drift check if practical,
- app DTOs not identical to raw rows by default.

---

## 81. DB Reset Acceptance

From clean local state:

1. start services,
2. apply all migrations,
3. apply seed,
4. generate types,
5. run smoke query/test,
6. stop/restart successfully.

---

## 82. WP-12 — Vercel and Environment Ownership

Backlog: OPS-001–007.

Outputs:

- team/project ownership,
- Git integration,
- preview/staging/production distinction,
- environment inventory,
- variable ownership,
- deploy permissions,
- recovery/billing owner.

No sensitive values in document.

---

## 83. Vercel Node Configuration

- package.json engines.node: 24.x,
- Vercel project Node version: 24.x,
- deploy logs verify runtime,
- minor/patch updates managed by Vercel within major,
- local/CI uses recorded 24 LTS patch.

---

## 84. Environment Matrix

| Env | App | Supabase | Data | Email | Index |
|---|---|---|---|---|---|
| Local | Local | Local CLI | Synthetic | Safe/mock | No |
| Preview | Vercel | Isolated/non-prod | Synthetic | Disabled/safe | No |
| Staging | Stable | Dedicated non-prod | Synthetic/non-prod | Allowlist | No |
| Production | Vercel prod | Dedicated prod | Live | Live | Approved |

---

## 85. WP-13 — Supabase Environment Baseline

Backlog: OPS-019.

Sprint 1 decision:

- local project required,
- staging/preview strategy recorded,
- production project may be provisioned later,
- no preview uses production credentials,
- project region/legal/provider review retained for G6.

---

## 86. WP-14 — Branch Protection

Backlog: OPS-021/022.

Configure:

- main protected,
- PR required,
- required checks,
- review requirement,
- force-push/delete restriction,
- deployment authority,
- admin bypass policy,
- secret/access ownership.

---

## 87. WP-15 — Test Foundation

Backlog: QA-003–005/008/009.

Deliver:

- Vitest configuration,
- React Testing Library setup,
- Playwright config,
- test directories/naming,
- selector policy,
- CI artifacts,
- first unit/component/E2E smoke tests.

---

## 88. Test Directory Pattern

~~~text
src/
  **/*.test.ts
  **/*.test.tsx
tests/
  e2e/
  integration/
  fixtures/
  helpers/
~~~

Co-location may be adjusted consistently.

---

## 89. Initial Unit Tests

- host normalization,
- market resolver,
- locale mapping,
- environment parsing,
- common Result helpers if logic,
- safe correlation ID format.

---

## 90. Initial Component Tests

- public foundation page semantic heading,
- unknown-market error state,
- not-found/error presentation where practical,
- HTML lang/market marker.

Use accessible queries before test IDs.

---

## 91. Initial Playwright Tests

- root page responds,
- UK local/preview context,
- UA controlled context,
- unknown host behavior where environment supports,
- no obvious console/page error,
- admin/portal skeleton does not expose data.

---

## 92. Selector Policy

Priority:

1. role/name/label,
2. visible text,
3. semantic locator,
4. stable test ID only when no user-facing locator.

Test IDs never encode sensitive/business IDs.

---

## 93. Failure Artifacts

On E2E failure:

- trace,
- screenshot,
- video only if helpful,
- console/network summary,
- no secrets/PII,
- bounded retention.

---

## 94. WP-16 — Security Foundation

Backlog: IAM-022/026/027.

Deliver:

- security header baseline,
- dependency vulnerability workflow,
- secret scanning/rotation runbook,
- .gitignore/env review,
- client/server boundary test,
- threat-model control links.

---

## 95. Security Headers Baseline

Prepare in Next.js/Vercel-compatible configuration:

- Content-Security-Policy initial strict allowlist/report plan,
- X-Content-Type-Options,
- Referrer-Policy,
- Permissions-Policy,
- frame-ancestors via CSP,
- HSTS only where correct for deployed HTTPS production scope.

Do not add unsafe-eval to solve development inconvenience in production.

---

## 96. CSP Sprint 1 Decision

Baseline:

- minimal third-party origins,
- no analytics,
- no nonce-based dynamic rendering until ADR/performance need,
- environment-aware dev requirements,
- report-only vs enforce decision documented,
- no false “fully secure” claim.

---

## 97. Secret Rotation Runbook

If exposure:

1. classify secret/provider/environment,
2. revoke/rotate,
3. contain affected access,
4. inspect logs/history,
5. update environments,
6. verify application,
7. record incident,
8. prevent recurrence.

Deleting commit alone is not remediation.

---

## 98. WP-17 — Documentation Foundation

Backlog: DOC-001–003.

Create:

- README/setup,
- environment guide,
- ADR index,
- contribution/agent rules,
- command reference,
- troubleshooting,
- known limitations.

---

## 99. Setup Guide Test

A second authorized person follows:

1. prerequisites,
2. clone,
3. runtime/package setup,
4. install,
5. environment setup,
6. local Supabase,
7. dev server,
8. verify.

Failures update guide before G1.

---

## 100. WP-18 — Synthetic Vertical Slice

Purpose: prove foundation, not design/product completeness.

Build one server-rendered page showing:

- resolved market,
- locale,
- environment-safe product/category fixture or generic foundation marker,
- correct HTML lang,
- market-aware metadata/canonical placeholder only where domain known,
- test coverage,
- preview deploy.

No unapproved technical claim or real customer data.

---

## 101. Vertical Slice Acceptance

- UK host resolves UK/en-GB.
- UA controlled host resolves UA/uk-UA.
- unknown production-like host fails safely.
- page is server-rendered.
- client cannot override market.
- test suite proves matrix.
- preview contains no production data.
- build passes.

---

## 102. Recommended Market Fixture

Use synthetic configuration:

~~~ts
const markets = {
  uk: {
    locale: "en-GB",
    label: "United Kingdom"
  },
  ua: {
    locale: "uk-UA",
    label: "Україна"
  }
} as const;
~~~

Production domain values come from validated environment/config.

---

## 103. File Ownership Matrix

| File/area | Owner | Review |
|---|---|---|
| package.json/lockfile | Head Agent | Engineering/Security |
| runtime/version files | Head Agent | DevOps |
| next.config.ts | Architect | Security/DevOps |
| src/proxy.ts | Architect | Security |
| env schema/example | Architect | Security/DevOps |
| markets module | Architect | QA/Product |
| Supabase config/migrations | Data Engineer | Architect/Security |
| CI workflows | DevOps | Engineering/Security |
| test config | QA | Engineering |
| README/ADR | Head Agent | Domain owners |

---

## 104. High-Risk Concurrent Edit Rule

At one time only one owner changes:

- package.json/pnpm-lock.yaml,
- next.config.ts,
- src/proxy.ts,
- environment schemas,
- first migration/config,
- CI workflow,
- tsconfig/eslint config.

---

## 105. Agent Task Pack — WP-01/02

~~~text
Role: Repository and Runtime Agent
Outcome: Safe baseline and pinned Node/pnpm

Read: 05, 13, 15, 16, 17, 18
Allowed: root version/package/docs files
Protected: user changes, secrets, assets, domain code

Acceptance:
- inspect before editing
- preserve existing work
- Node 24.x engine
- exact pnpm 11 packageManager
- frozen install
- version/setup evidence

Return:
- baseline
- files changed
- commands/results
- risks
~~~

---

## 106. Agent Task Pack — WP-03

~~~text
Role: Project Architect Agent
Outcome: Next.js modular-monolith skeleton

Use Next.js 16 App Router, TypeScript strict, Tailwind,
src directory and import alias.

Create only foundation routes and module convention.
Use src/proxy.ts, not middleware.ts.
Do not add feature libraries or business implementation.

Run install, typecheck, lint, test if available, build.
Report generated files and dependency versions.
~~~

---

## 107. Agent Task Pack — WP-04/05

~~~text
Role: Environment and Boundary Agent
Outcome: Validated public/server env and server-only contracts

Never add real values.
Public schema explicitly allowlists NEXT_PUBLIC values.
Server secrets cannot be imported into client modules.
Validation errors redact values.

Add tests for missing, invalid and normalized URL config.
~~~

---

## 108. Agent Task Pack — WP-06

~~~text
Role: Market Context Agent
Outcome: Trusted UK/UA host resolver

Use server request host allowlist.
Do not trust query, form or arbitrary client headers.
Document local/preview rules.
Implement UK, UA and unknown-host tests.
Keep proxy light; authorization remains layered.
~~~

---

## 109. Agent Task Pack — WP-11

~~~text
Role: Database Foundation Agent
Outcome: Local Supabase migration/reset/seed/types workflow

Use SQL migrations as source of truth.
Create only foundation schema boundaries and synthetic seed.
Do not create full product/business schema yet.
No real remote project or production data required.

Prove clean db reset and generated types.
~~~

---

## 110. Agent Task Pack — WP-15

~~~text
Role: Test Foundation Agent
Outcome: Vitest/RTL/Playwright baseline

Add first market/env/component/E2E smoke tests.
Use accessible selectors.
Keep fixtures synthetic.
Configure safe failure artifacts.
Do not test implementation details unnecessarily.
~~~

---

## 111. Agent Task Pack — WP-08/14

~~~text
Role: CI and Repository Protection Agent
Outcome: Required install/typecheck/lint/test/build checks

Use exact Node/pnpm and frozen lockfile.
No production secrets.
Configure branch protection or provide exact owner action
when platform permission is required.
Add secret scanning and safe failure evidence.
~~~

---

## 112. Agent Task Pack — WP-12

~~~text
Role: Preview Deployment Agent
Outcome: Safe Vercel preview

Use InfraVolt-controlled account/project.
Configure Node 24.x and preview-only environment variables.
Never use production Supabase/email credentials.
Prevent indexing and verify smoke behavior.
Return deployment evidence without exposing internal secrets.
~~~

---

## 113. Head Agent Integration Order

1. WP-01
2. WP-02
3. WP-03
4. WP-04/05
5. WP-06/07
6. WP-11
7. WP-15
8. WP-08/16
9. WP-12/13/14
10. WP-17/18
11. WP-10 G1

---

## 114. Handoff Contract

Every package returns:

- outcome,
- files,
- dependencies added,
- commands,
- results,
- assumptions,
- unresolved risks,
- evidence paths,
- next unblocked packages.

---

## 115. Local Setup Sequence

~~~bash
node --version
corepack enable
pnpm --version
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm db:start
pnpm db:reset
pnpm dev
~~~

Environment values are populated through safe local instructions, not copied from production.

---

## 116. Verification Sequence

~~~bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
~~~

Database checks run before relevant integration/E2E.

---

## 117. One-command Verification

pnpm verify must run deterministic non-interactive checks suitable for local/CI.

If E2E or DB requires services, either:

- include explicit verify:ci orchestration,
- or keep separately required CI jobs.

Do not hide skipped critical checks.

---

## 118. .gitignore Baseline

Ignore:

- node_modules
- build/cache outputs
- .env and local variants
- Playwright local artifacts as policy
- Supabase local temporary/state files
- editor/OS noise
- private downloaded contracts/source archives where not intended.

Keep:

- .env.example
- lockfile
- migrations
- seed
- test configs
- approved public assets.

---

## 119. .env.example Rule

Contains:

- variable names,
- safe empty/example URLs,
- comments/classification,
- required/optional indication.

Does not contain:

- real provider key,
- production identifier when sensitive,
- password/token,
- private email data beyond approved example.

---

## 120. README Baseline

- project purpose,
- architecture summary,
- prerequisites,
- setup,
- commands,
- environments,
- market/domain model,
- local database,
- tests,
- contribution,
- security reporting,
- linked specifications/ADRs.

---

## 121. Local Host Simulation

Preferred safe options:

- OS hosts aliases such as uk.localhost/ua.localhost if supported,
- distinct localhost ports/config,
- controlled test request host,
- platform preview config.

Document OS-specific instructions without requiring admin changes when avoidable.

---

## 122. Unknown Host Behavior

Production-like environment:

- reject with safe response,
- no fallback to UK,
- log normalized unknown host without query/PII,
- alert later if repeated.

Local/test may have explicit allowlisted aliases.

---

## 123. Market Context Propagation

MarketContext is passed through:

- metadata,
- content/data query later,
- form record attribution later,
- canonical/hreflang later,
- email/routing later.

It is not stored in browser global state as authority.

---

## 124. Public vs Protected Hosts

Sprint 1 prepares:

- UK public host,
- Ukraine public host,
- protected application host decision/config placeholder.

Protected auth/admin/portal routes still recheck user/role/company later.

---

## 125. Caching Decision

Sprint 1:

- keep behavior explicit and simple,
- do not globally enable Cache Components without task/ADR,
- dynamic host context must not leak across markets,
- synthetic page proves correct host-specific output,
- later content caching uses market-aware keys/tags.

---

## 126. Styling Baseline

Tailwind 4 scaffold only:

- global CSS entry,
- minimal semantic foundation,
- no final design tokens invented,
- no large component library generated.

04 design system enters Sprint 2.

---

## 127. Accessibility Baseline

Foundation must include:

- correct html lang,
- semantic main/heading,
- focus-visible defaults preserved,
- reduced-motion not overridden,
- error/not-found semantic messages,
- no interaction requiring mouse.

Full component audit is Sprint 2+.

---

## 128. Performance Baseline

- server-first page,
- minimal client components,
- no analytics/animation,
- no large map assets loaded,
- no remote image domains broadly allowed,
- build/bundle output recorded,
- no premature optimization service.

---

## 129. Logging Baseline

Allowed:

- environment,
- release/version,
- route class,
- market code,
- correlation ID,
- safe error code.

Forbidden:

- secrets,
- cookies/tokens,
- form values,
- full query URLs,
- personal data,
- private signed URLs.

---

## 130. Preview Smoke Checklist

- [ ] Deployment succeeded
- [ ] Correct commit/version
- [ ] Node 24.x
- [ ] UK foundation route 200
- [ ] UA controlled context works
- [ ] Unknown host safe per preview policy
- [ ] HTML lang correct
- [ ] No production DB/email
- [ ] No index
- [ ] Security headers reviewed
- [ ] No secret in logs/client bundle
- [ ] Test/build evidence linked

---

## 131. CI Required Checks

- install/frozen lockfile
- typecheck
- lint
- unit/component tests
- production build
- secret scan
- database reset/migration test when job enabled
- E2E smoke when stable.

---

## 132. G1 Evidence Index

| Evidence | WP | Owner | Status |
|---|---|---|---|
| S1-REPO-001 | WP-01 |  |  |
| S1-RUNTIME-001 | WP-02 |  |  |
| S1-ARCH-001 | WP-03/05/07 |  |  |
| S1-ENV-001 | WP-04 |  |  |
| S1-MARKET-001 | WP-06 |  |  |
| S1-DATA-001 | WP-11/13 |  |  |
| S1-CI-001 | WP-08/14 |  |  |
| S1-SEC-001 | WP-16 |  |  |
| S1-PREVIEW-001 | WP-10/12 |  |  |
| S1-DOC-001 | WP-09/17 |  |  |
| S1-GATE-001 | G1 |  |  |

---

## 133. G1 Scoring

| Area | Weight |
|---|---:|
| Reproducible runtime/install | 15 |
| Build/type/lint/tests | 15 |
| Architecture/routes/modules | 10 |
| Env/server boundaries | 10 |
| Market/locale resolver | 15 |
| Local database workflow | 15 |
| CI/security | 10 |
| Preview | 5 |
| Documentation/evidence | 5 |
| **Total** | **100** |

Pass target: 85+, with no critical blocker.

---

## 134. G1 Automatic Fail Conditions

- production secret committed,
- existing user work overwritten without recovery,
- unknown host silently becomes UK in production policy,
- preview uses production data/credentials,
- clean install/build cannot reproduce,
- database changes exist only manually,
- main can merge despite required critical check failure,
- no repo/provider owner.

---

## 135. G1 Conditional Pass

Allowed only when:

- remaining item is noncritical/owned/due,
- Sprint 2 can proceed safely,
- architecture/security/data contract not ambiguous,
- evidence and accepted risk recorded.

---

## 136. Initial Risk Register

| Risk | Impact | Control |
|---|---|---|
| Existing repo unknown | Work loss | WP-01 inspect first |
| Version drift | Build mismatch | Exact pins/lockfile |
| Agent over-scaffold | Empty complexity | Vertical slice convention |
| Env secret leak | Incident | Separate schemas/scan |
| Host spoofing | Cross-market errors | Allowlist/tests |
| Preview→prod DB | Privacy/data risk | Environment isolation |
| Migration drift | Broken deploy | Local-first/reset/CI |
| CI too slow/flaky | Bypass pressure | Minimal deterministic jobs |
| Too many dependencies | Maintenance/security | Approval policy |
| Supabase local platform mismatch | Later integration issue | Staging verification |
| CSP breaks Next/dev | Delay | Environment-aware staged policy |
| Scope pulls in UI/features | G1 delay | Sprint out-of-scope |

---

## 137. Blocker Escalation

- same day: owner/impact,
- one day: Head Agent,
- two days: Founder/technical decision,
- affected WP replan,
- G1 forecast updated.

---

## 138. Daily Status Template

~~~text
Day / Owner / WP:

Outcome completed:
Files changed:
Checks:
Evidence:
Blocked/waiting:
Risk:
Next:
~~~

---

## 139. Midpoint Report

~~~text
Sprint: S1 / Day 5
Overall: Green / Amber / Red

Done WPs:
In review:
Blocked:

Install/build:
Market resolver:
Local database:
Test/CI:
Preview:

G1 forecast:
Founder/owner action:
~~~

---

## 140. G1 Review Agenda

1. Fresh clone/setup demonstration
2. Version/lockfile
3. Module/route tree
4. Environment/server boundary
5. UK/UA/unknown-host test
6. Supabase reset/seed/types
7. CI required checks
8. Preview smoke/security
9. Documentation
10. Risks/conditional items
11. Sprint 2 recommendation

---

## 141. Sprint 2 Handoff

Provide:

- stable repository/main,
- setup guide,
- tokens/component target from 04,
- market/locale utilities,
- public layout skeleton,
- test/CI preview foundation,
- no hidden G1 critical debt,
- selected Sprint 2 DSG tasks.

---

## 142. Sprint 2 Proposed Goal

Implement design-system foundations and reusable accessible public/admin layout primitives on the verified engineering foundation, resilient to en-GB and uk-UA.

---

## 143. Sprint 2 Ready Candidates

- DSG-001–030 refined by capacity
- WEB-001–010 where design/content ready
- QA accessibility component baseline
- CNT navigation labels
- Ukrainian text-length stress fixtures.

---

## 144. Foundation Maintenance Rule

After G1:

- runtime/dependency upgrades through reviewed PR,
- architecture changes through ADR,
- env names through coordinated migration,
- migrations never edited after production application without policy,
- CI checks not disabled to merge,
- module boundary exceptions documented.

---

## 145. Final Project Document Set

The completed series is:

1. 00 Master Project Spec
2. 01 Product Requirements
3. 02 Information Architecture and User Flows
4. 03 UI/UX Architecture
5. 04 Design System
6. 05 Technical Architecture
7. 06 Database Schema
8. 07 Backend API and Workflows
9. 08 Admin and Sales Operations
10. 09 Partner Portal
11. 10 Auth, Security and Permissions
12. 11 Content, SEO and Analytics
13. 12 Test, QA and Accessibility
14. 13 DevOps, Deployment and Observability
15. 14 Legal, Privacy and Compliance
16. 15 Implementation Roadmap
17. 16 Project Backlog and Task Catalog
18. 17 Sprint 0 Execution Pack
19. 18 Sprint 1 Engineering Foundation Execution Pack

Numbering begins at 00, so this is the nineteenth and final planning artifact.

---

## 146. Implementation Start Rule

After this document:

1. Complete/approve Sprint 0 decisions.
2. Provide or create canonical repository.
3. Execute WP-01.
4. Continue in integration order.
5. Use 16 backlog for task IDs.
6. Update code, tests, ADRs and tracker rather than creating new broad specifications.

---

## 147. Founder Approval Checklist

- [ ] G0 passed/conditional-safe
- [ ] Repository owner approved
- [ ] Vercel/Supabase account ownership approved
- [ ] UK/Ukraine host strategy approved
- [ ] Sprint 1 team/capacity approved
- [ ] No production data/secrets approved for development
- [ ] G1 criteria accepted
- [ ] Implementation start authorized

---

## 148. Head Agent Start Checklist

- [ ] Inspect repository/status
- [ ] Protect user changes
- [ ] Confirm task owners
- [ ] Create WP task briefs
- [ ] Reserve high-risk files
- [ ] Verify official versions
- [ ] Start WP-01/02
- [ ] Maintain daily evidence
- [ ] Integrate in order
- [ ] Run G1 review

---

## 149. Engineering Checklist

- [ ] Node/pnpm exact
- [ ] Lockfile frozen
- [ ] Next 16 App Router
- [ ] TypeScript strict
- [ ] src/proxy.ts
- [ ] env split/validation
- [ ] server-only boundary
- [ ] host allowlist
- [ ] UK/UA tests
- [ ] local Supabase reset
- [ ] synthetic seed
- [ ] generated DB types
- [ ] Vitest/RTL/Playwright
- [ ] CI checks
- [ ] safe preview
- [ ] docs/ADRs

---

## 150. Security Checklist

- [ ] No secrets committed
- [ ] No production credentials in preview
- [ ] No production data locally
- [ ] Unknown host rejected
- [ ] Public/server env separated
- [ ] Dependency/install policy
- [ ] Security headers
- [ ] Branch protection
- [ ] Rotation runbook
- [ ] Logs redact sensitive data

---

## 151. QA Checklist

- [ ] Fresh install tested
- [ ] Typecheck
- [ ] Lint
- [ ] Unit tests
- [ ] Component smoke
- [ ] E2E smoke
- [ ] UK host
- [ ] UA host
- [ ] Unknown host
- [ ] DB reset/seed/types
- [ ] Preview smoke
- [ ] Failure artifacts safe

---

## 152. Official Technical References

- Next.js 16 release: https://nextjs.org/blog/next-16
- Next.js installation: https://nextjs.org/docs/app/getting-started/installation
- Next.js proxy convention: https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- Node.js releases: https://nodejs.org/en/about/previous-releases
- Node.js 24.18.0 LTS: https://nodejs.org/en/blog/release/v24.18.0
- pnpm 11 release: https://pnpm.io/blog/releases/11.0
- pnpm installation: https://pnpm.io/installation
- pnpm CI: https://pnpm.io/continuous-integration
- Vercel Node versions: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions
- Supabase migrations/local development: https://supabase.com/docs/guides/local-development/database-migrations
- Supabase SSR clients: https://supabase.com/docs/guides/auth/server-side/creating-a-client

Current patch versions are verified again on execution day.

---

## 153. Completion Statement

InfraVolt planning phase is complete when:

- Sprint 0 decisions are approved,
- this Sprint 1 pack is accepted,
- canonical repository is available.

The next action is code implementation, not another numbered architecture document.

---

## 154. Sonuç

Sprint 1 will create a small but real product foundation:

- reproducible,
- dual-market aware,
- local-first,
- testable,
- secure by default,
- preview deployable,
- documented.

En önemli rules:

1. Inspect before bootstrap.
2. Node 24 LTS, pnpm 11 and Next.js 16.2 are pinned.
3. Use src/proxy.ts.
4. Market comes from trusted host, not client.
5. Database changes come from migrations.
6. Preview never uses production data/secrets.
7. CI must pass before merge.
8. G1 passes before design/feature expansion.
9. This is the final general planning document.
10. After approval, we start building the site.

---

## 155. Document Control

### 155.1 Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1.0 | 15 July 2026 | InfraVolt Product Team | Final planning artifact: Sprint 1 repository, runtime, modular architecture, trusted dual-market context, local Supabase, test/CI/security, preview and G1 execution pack |

### 155.2 Change Control

Runtime/framework major, repository model, market/domain trust, database migration strategy, environment separation, CI gate or Sprint 1 exit criteria change requires ADR and version update.

### 155.3 Required Approval

- Founder / CEO
- Product Director / Head Agent
- Engineering/Architecture Lead
- Database Lead
- DevOps Lead
- QA Lead
- Security Reviewer

