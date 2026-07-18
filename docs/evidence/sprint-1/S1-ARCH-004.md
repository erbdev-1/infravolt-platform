# S1-ARCH-004 — Global Safe States

| Field | Evidence |
|---|---|
| Date | 2026-07-18 |
| Work package | WP-07 — Global Safe States |
| Backlog task | FND-020 — Add root error/not-found/loading shells |
| Authority | Founder-authorised Sprint 1 continuation under G0-COND-001 |
| Engineering owner | Erhan Baydı |
| Review authority | Founder |
| Status | Complete — pending Founder review |

## Specification and evidence basis

- INF-16 §34.2 defines FND-020 acceptance as accessible safe states and depends on the completed FND-009 App Router foundation.
- INF-18 §§62–63 requires minimal loading, not-found, route-error, global-error and unknown-host states with accessible headings/focus, no stack or secret output, safe retry behavior and no unnecessary Client Components.
- INF-18 §127 requires semantic main/heading structure, preserved focus-visible behavior, meaningful error/not-found messages and keyboard operation.
- INF-18 §132 maps WP-03, WP-05 and WP-07 to the `S1-ARCH-001` evidence family. Existing `S1-ARCH-002` and `S1-ARCH-003` supplements establish an immutable sequential convention, so this `S1-ARCH-004` supplement records FND-020 without rewriting the historical WP-03 record.

## Naming clarification

The binding INF-18 package table assigns WP-07 to Global Safe States and FND-020. The earlier Founder-controlled feature-flag increment delivered FND-017 under a local WP-07 label. This record applies the specification mapping for FND-020, does not alter the completed feature-flag implementation and does not rewrite its historical evidence.

## Implemented safe states

- `loading.tsx` remains a Server Component, exposes one primary heading, one polite status region and `aria-busy` without animation, fake progress or skeleton layout.
- `not-found.tsx` remains a Server Component, exposes one primary heading and uses a relative Next.js `Link` to `/`, preserving the already trusted market host without exposing route internals.
- `error.tsx` is the required Client Component with explicit `Error & { digest?: string }` and `reset: () => void` props. It destructures only `reset`, renders no error property and limits retry to the framework callback.
- `global-error.tsx` is the required Client Component, owns `html` and `body`, uses the safe `en-GB` document fallback and does not depend on the root layout or a server-only module.
- Existing proxy behavior remains unchanged: unknown production hosts return plain-text HTTP 404 with `Cache-Control: no-store` and no host/query disclosure.
- No shared presentation component was introduced. The four small files intentionally retain their server/client boundaries instead of coupling Server Components to a client-marked abstraction.

## Accessibility and language decisions

- Every rendered state contains exactly one `h1` and one semantic `main`.
- Loading text uses `role="status"` once and has no repeated announcements, autoplay motion or percentage claim.
- Recovery uses native `Link` and `button` semantics; retry controls declare `type="button"` and receive the supplied `reset` callback directly.
- No autofocus behavior, mouse-only interaction, color-only communication or fake ARIA role was added.
- The existing trusted root `html lang` remains authoritative where the root layout is available. Neutral foundation copy is explicitly marked `en-GB`; `global-error` uses the same safe fallback because the root layout may have failed. No unapproved market-specific copy was invented.

## Error and correlation policy

- Route and global boundaries accept the compile-time Next.js error prop but never read it at runtime. Message, stack, cause, digest and serialized error data cannot enter rendered output.
- No raw error logging, manual development diagnostic UI or suppression of Next.js development reporting was added.
- Retry wording is limited to “Try again” and does not promise recovery.
- A correlation ID is intentionally omitted. The existing generator is server-only and no trustworthy request-linked identifier reaches these Client Component props. Creating a random browser reference would not correlate with server logs and would be misleading.

## Verification design

`scripts/verify-safe-states.ts` transpiles and renders the four actual route files in ignored temporary state. It checks rendered semantics and secret fixtures, then uses the TypeScript AST for Client Component directives, typed boundary contracts and exact `onClick={reset}`/`type="button"` behavior because event handlers are absent from static HTML. A child process under the `react-server` export condition imports the actual proxy and market resolver to verify UK/UA locale resolution and the redacted unknown-host response. Temporary output and process-local environment values are restored in `finally` blocks.

## Commands and exact results

| Command | Result |
|---|---|
| `node --version` | `v24.18.0` |
| `pnpm --version` | `11.13.0` |
| `pnpm install --frozen-lockfile` | Passed; lockfile already up to date |
| `pnpm verify:safe-states` | Passed: six checks |
| `pnpm verify:features` | Passed: ten checks |
| `pnpm verify:env` | Passed: ten checks |
| `pnpm verify:common-contracts` | Passed: six checks |
| `pnpm verify:market` | Passed: twelve checks |
| `pnpm verify:server-boundary` | Passed: one positive Server Component build and six independent negative Client Component builds |
| `pnpm lint` | Passed |
| `pnpm typecheck` | Passed |
| Positive `pnpm build` with safe process-local UK/UA localhost origins | Passed with Next.js 16.2.10; production environment validation passed |
| `git diff --check` | Passed |
| Credential-pattern scan | Passed: no credential-like assignments |
| Environment-file inventory | Passed: `.env.example` only |
| Specification-change scan | Passed: zero changes |
| Historical-evidence scan | Passed: no existing evidence record changed |
| Lockfile/lifecycle-policy scan | Passed: zero changes |
| Raw error/console scan | Passed: no raw exception rendering or logging |
| Relative Markdown-link validation | Passed |
| Out-of-scope scan | Passed: no database, provider, auth, deployment, design-system or product work |

## Corrections and internal review

- The first renderer import exposed the React 19 CommonJS export shape; the import was corrected. The next run proved that `react-dom/server` is unavailable under the `react-server` condition, so UI rendering and server-only market verification were separated into their correct runtime conditions.
- A refactor parse error caused by a stray comma was corrected before behavioral verification.
- Next.js lint rejected a plain root anchor; the recovery action now uses the supported `Link` component with the same relative destination.
- Strict typecheck required descriptor-based runtime module guards and identifier-only JSX attribute matching; both were corrected.
- The first Link assertion assumed a React attribute order. It was replaced with a sequence-independent check so renderer ordering cannot create a false failure.
- The nested child process was blocked only by the restricted execution sandbox; its direct command passed, and the complete verifier passed when rerun with normal process execution.

Final review found no unresolved App Router, TypeScript, accessibility, redaction, retry, client/server-boundary, host-authority or scope issue.

## Dependencies and scope

- No dependency, lockfile entry or pnpm lifecycle approval changed.
- No shared design system, branded content, feature-flag change, correlation/logging provider, database, authentication, analytics, CI or deployment configuration was added.
- No specification or historical evidence record changed.
