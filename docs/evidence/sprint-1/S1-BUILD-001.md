# S1-BUILD-001 — Test Foundation

| Field | Evidence |
|---|---|
| Date | 2026-07-18 |
| Work package | WP-15 — Test Foundation |
| Backlog tasks | QA-003, QA-004, QA-005, QA-008, QA-009; local runner portion of FND-023 |
| Authority | Founder-authorised Sprint 1 increment under G0-COND-001 and the recorded WP-15 binding resolutions |
| Engineering owner | Erhan Baydı |
| Review authority | Founder |
| Status | Local implementation and verification complete — pending Founder/PR review |

## Binding scope resolution

- WP-15 owns the local Vitest runner and sample proof required by the authorised local portion of FND-023.
- WP-08 retains GitHub Actions, CI orchestration, CI-pass evidence and required-check integration.
- QA-009 in this package owns local failure trace, screenshot and redacted diagnostic proof. CI upload, retention and CI proof remain in WP-08.
- Historical evidence-status reconciliation was not performed.

## Specification basis

- INF-05 §§32, 38, 39 and 48: required install/lint/type/test/build/browser commands, semantic accessibility, the test pyramid and the approved test dependency family.
- INF-12 §§5, 12–30, 43–48, 118 and 128–131: deterministic synthetic tests, accessible locators, UK/UA host projects, no production data, bounded retries and safe artifacts.
- INF-16 FND-023 and QA-003/004/005/008/009: local unit runner, Vitest, React Testing Library, Playwright, user-centric selectors and failure artifacts.
- INF-18 WP-15 §§87–93, task pack §110 and integration order §113: root `src/` test layout, first unit/component/E2E smoke coverage and safe failure evidence.
- ADR-0001: tests remain in the approved single root application rather than an `apps/web` monorepo.

## Task acceptance evidence

| Task | Local acceptance evidence | Status |
|---|---|---|
| FND-023, authorised local portion | Exact Vitest runner scripts execute three test files and four tests successfully. | Complete locally; CI ownership remains WP-08 |
| QA-003 | Root Vitest configuration uses jsdom, strict isolation, one deterministic worker, native Vite 8 `@/*` resolution and deny-by-default browser network APIs. | Complete locally; CI-pass evidence deferred to WP-08 |
| QA-004 | React Testing Library, jest-dom and user-event prove semantic public structure plus a keyboard/click-safe route-error recovery without rendering internal error data. | Complete locally |
| QA-005 | Chromium projects prove UK 200/`en-GB`, UA 200/`uk-UA`, unknown-host 404, semantic page structure and no unexpected page/network errors. | Complete locally |
| QA-008 | [`tests/README.md`](../../../tests/README.md) records role/name, label, visible-text, semantic and last-resort test-ID ordering. | Complete locally |
| QA-009 | A controlled failing browser assertion produces exactly one trace, screenshot and redacted diagnostic attachment under bounded file/size policies; all temporary proof material is removed. | Complete locally; CI upload/retention deferred to WP-08 |

## Exact dependency baseline

All new direct packages are exact development dependencies:

| Package | Version | Reason |
|---|---:|---|
| `vitest` | `4.1.10` | Deterministic TypeScript unit/component runner |
| `@vitejs/plugin-react` | `6.0.3` | React JSX transform for Vitest/Vite |
| `jsdom` | `29.1.1` | Browser-like component environment |
| `@testing-library/react` | `16.3.2` | User-visible React component behavior |
| `@testing-library/dom` | `10.4.1` | Semantic DOM query contract required by RTL |
| `@testing-library/jest-dom` | `6.9.1` | Accessible DOM assertions for Vitest |
| `@testing-library/user-event` | `14.6.1` | User-level retry interaction proof |
| `@playwright/test` | `1.61.1` | Chromium host/locale smoke and failure artifacts |

Vitest and `@vitejs/plugin-react` resolve one compatible transitive Vite version, `8.1.5`. Vite 8's native `resolve.tsconfigPaths` support is used; the initially evaluated `vite-tsconfig-paths` package was removed after the runner identified it as redundant. `pnpm-workspace.yaml` and its two existing build-script approvals were unchanged. No repository `preinstall`, `install`, `postinstall` or `prepare` script was added.

Playwright installed its pinned Chromium revision `1228` for Chrome for Testing `149.0.7827.55`, plus the matching headless shell and support binaries, in the user-level Playwright cache. No global project tooling, administrator installation or repository binary was added.

## Test architecture and boundaries

### Unit and component

- Co-located `src/**/*.test.ts(x)` files run in jsdom.
- `localeForMarket` is the pure TypeScript contract and proves the exact UK/UA locale map.
- The synchronous public page is tested through a level-one accessible heading and semantic `main` content.
- The route-error Client Component is tested through accessible heading/button queries, hidden internal error content and `userEvent` retry behavior.
- Async Server Component and request-header behavior is not forced into jsdom; Playwright owns document-language and host-derived rendering.
- `fetch`, `XMLHttpRequest` and `WebSocket` are blocked by default in Vitest setup. Tests that later require integration I/O must opt into an explicitly owned layer.

### Browser smoke

- Three Chromium projects use `uk.infravolt.localhost:3100`, `ua.infravolt.localhost:3100` and an untrusted `.localhost` host.
- The browser network fixture permits only HTTP/WebSocket requests to the exact controlled hosts and port; other requests are blocked and counted.
- UK and UA require zero console, page and unexpected-network errors.
- Chromium reports the expected main-document 404 as one console error for the unknown-host negative case; that test requires exactly that one event and zero page/network errors, preventing a broad console-error waiver.
- The fixed port, one worker, no retry, bounded action/navigation/test/web-server timeouts and `reuseExistingServer: false` prevent hidden foreign-server reuse and unbounded execution.
- Next.js `allowedDevOrigins` contains only the two binding local market hosts. Production host authority remains in `src/proxy.ts`.

### Safe failure artifacts

- `trace: retain-on-failure`, `screenshot: only-on-failure`, video disabled and deterministic ignored output directories are configured.
- Each test attaches only three integer diagnostic counts; raw console messages, URLs, request payloads and environment values are never attached.
- `pnpm verify:test-artifacts` creates its config and failing fixture under ignored `test-results/artifact-proof`, starts a sanitized local server and requires child exit `1` for the exact missing accessible heading `EXPECTED_ARTIFACT_ASSERTION` and `toBeVisible` assertion.
- The verifier requires one trace, one screenshot and one zero-valued diagnostic attachment; no more than 20 files, 25 MiB per file or 50 MiB total.
- It inspects every textual trace entry for strong private-key, bearer-token, JWT, production-key and email patterns. Binary screenshots and base64 screencast frames are identified as binary rather than misclassified as text.
- The child inherits only required operating-system execution variables. All 16 approved application environment names are overwritten with empty or safe local values before the test server starts.
- The fixture and proof output are removed on success or failure. Cleanup failure is secondary to, and cannot replace, an earlier verification failure.

## Final verification matrix

| Command/check | Expected behavior | Actual result and exit | Unexpected result meaning |
|---|---|---|---|
| `node --version` | Approved runtime | `v24.18.0`; exit `0` | Runtime pin drift |
| `pnpm --version` | Approved package manager | `11.13.0`; exit `0` | Package-manager pin drift |
| `pnpm install --frozen-lockfile` | Manifest and lockfile reproduce without mutation | Already up to date; exit `0` | Lockfile drift or supply-chain/install failure |
| `pnpm test` | Unit/component suite passes deterministically | 3 files, 4 tests passed; exit `0` | Local FND-023/QA-003/004 failure |
| `pnpm verify:test-artifacts` | Intended child assertion fails while verifier passes after artifact inspection/cleanup | Expected child exit `1`; verifier exit `0` | False-positive negative fixture, missing/unsafe/unbounded artifact or cleanup failure |
| `pnpm test:e2e:smoke` | UK, UA and unknown-host Chromium projects pass | 3 tests passed; exit `0` | Market/locale/host, semantic UI, browser error or local-network regression |
| `pnpm verify:env` | WP-04 environment contract remains intact | 10 checks passed; exit `0` | Environment validation/redaction regression |
| `pnpm verify:common-contracts` | WP-05 common contracts remain intact | 6 checks passed; exit `0` | Result/correlation/log-context regression |
| `pnpm verify:server-boundary` | Server imports pass and all protected client imports fail | Positive server plus 6 negative client cases passed; exit `0` | Server configuration could enter a Client Component |
| `pnpm verify:market` | Trusted UK/UA host context remains intact | 12 checks passed; exit `0` | Host, market, locale, spoofing or proxy regression |
| `pnpm verify:features` | Feature flags remain server-owned/default-off | 10 checks passed; exit `0` | Feature trust or default-state regression |
| `pnpm verify:safe-states` | Accessible redacted global states remain intact | 6 checks passed; exit `0` | Accessibility, retry or error-data regression |
| `pnpm verify:database-boundary` | Local Docker target/lifecycle boundary remains intact | 6 focused groups passed; exit `0` | Remote/foreign Docker or cleanup-policy regression |
| `pnpm db:verify` | Owned local stack cleanly resets, seeds and verifies schema/types/restart | 18 controls passed; exit `0` | WP-11 reproducibility, privilege, ownership or health regression |
| `pnpm db:types:check` | Generated types match local schema | Passed; exit `0` | Committed database type drift |
| `pnpm lint` | Repository lint policy passes | Passed; exit `0` | Static policy or unsafe pattern failure |
| `pnpm typecheck` | Strict TypeScript passes | Passed; exit `0` | Contract or configuration type failure |
| Safe process-local `pnpm build` | Environment preflight and Next.js production build pass | Validation passed; build compiled, typed and generated 3 pages; exit `0` | Production preflight, type or framework build regression |
| `git diff --check` | No whitespace error | Passed; exit `0` | Invalid patch whitespace |
| Relative Markdown link validation | Every repository-relative Markdown target exists | 45 Markdown files passed; exit `0` | Broken evidence/governance navigation |
| Credential-pattern scan | No strong credential value in tracked/untracked repository text | 105 text files, 0 matches; exit `0` | Potential credential committed or generated |
| Environment-file inventory | Only `.env.example` exists outside ignored dependencies/build output | Passed; exit `0` | Real or unexpected environment file present |
| Specification-change scan | INF-00–18 remain unchanged | 0 changes; exit `0` | Authorised scope breach |
| Dependency/lifecycle review | Eight exact dev dependencies, no broadened approvals or repository lifecycle hooks | Passed; exit `0` | Floating dependency or unsafe install execution |
| Generated-artifact review | Outputs ignored and temporary proof removed | Passed; exit `0` | Generated report/fixture could enter a commit |
| Out-of-scope and ownership-attribution scans | No protected service/spec paths or prohibited attribution | 14 pre-evidence changed files reviewed, 0 attribution matches; exit `0` | WP-15 scope or repository-ownership breach |

## Initial failures and corrections

1. The first sandboxed Vitest launch received Windows `spawn EPERM`; a normally permitted run proved the source suite. This was an execution sandbox limitation, not accepted as test evidence.
2. Vite 8 warned that `vite-tsconfig-paths` was redundant; it was removed and native `resolve.tsconfigPaths` now owns `@/*` resolution.
3. Default parallel Vitest workers stalled in the Windows execution environment. The small foundation suite now uses one bounded worker with file parallelism disabled and passes through the normal `pnpm test` interface.
4. TypeScript exposed incompatible generic env return types for Node child processes and Playwright web-server config; the helper now returns their exact safe intersection. ESLint's React Hook rule treated Playwright's conventional `use` fixture callback name as a hook; it was renamed without suppressing the rule.
5. The first full browser run passed UK/UA but correctly observed Chromium's main-document 404 console event for the unknown host. The negative test now accepts exactly that one event instead of weakening positive-project diagnostics.
6. Initial artifact checks assumed Playwright body attachments used visible filenames. Inspection showed diagnostics live as hash-addressed resources inside the trace ZIP; verification now follows trace attachment metadata and validates the exact JSON contract.
7. Raw binary ZIP/image and base64 screencast bytes produced false sensitive-text matches. The scanner now applies patterns only to valid textual artifacts and non-binary trace events while continuing to scan console/network/DOM/source/diagnostic text.
8. Internal review narrowed browser HTTP and WebSocket access from host-only to exact host, port and protocol and blocked jsdom XHR/WebSocket paths. No unresolved in-scope correctness, security, accessibility, process-cleanup or scope issue remains.

## Files changed

Created:

- `vitest.config.mts`
- `playwright.config.ts`
- `tests/setup/vitest.setup.ts`
- `tests/helpers/test-environment.ts`
- `tests/e2e/fixtures/test.ts`
- `tests/e2e/market-smoke.spec.ts`
- `tests/README.md`
- `src/modules/markets/locale.test.ts`
- `src/app/(public)/page.test.tsx`
- `src/app/error.test.tsx`
- `scripts/verify-test-artifacts.ts`
- `docs/evidence/sprint-1/S1-BUILD-001.md`

Modified:

- `package.json`
- `pnpm-lock.yaml`
- `next.config.ts`
- `docs/PROJECT_LOG.md`

`.gitignore`, `pnpm-workspace.yaml`, application routes/components, specifications, historical evidence, Supabase source, production configuration and provider integrations were not changed.

## Deferred responsibilities and residual scope

- WP-08: GitHub Actions, CI orchestration, CI-pass evidence, artifact upload/retention and required checks.
- WP-16: security-test implementation and automated accessibility tooling.
- Firefox/WebKit, mobile, nightly/full regression, preview smoke and real-device evidence remain later matrix work; WP-15's authorised browser baseline is Chromium smoke.
- No production deployment, preview deployment, remote Supabase, credential, customer data, authentication, admin/portal/product feature or provider integration was introduced.
