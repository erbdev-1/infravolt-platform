# InfraVolt Project Log

This append-only log records material repository work, decisions applied, verification evidence, blockers, and the safest next actions. It does not replace the specifications, decision register, RAID register, ADRs, or Git history.

## 2026-07-15 — Repository governance baseline

**Authority:** G0-COND-001 — Conditional Pass, granted by Founder Erhan Baydi  
**Scope:** Repository governance and documentation baseline only  
**Engineering agent:** Codex

### Completed work

- Verified the numbered specification inventory and normalised the INF-17 filename from `17_SPRINT_0_EXECUTION_PACK (1).md` to `17_SPRINT_0_EXECUTION_PACK.md`.
- Preserved INF-17 content exactly; SHA-256 before and after the rename is `7F4F45640223A0683DB7680C1F24C106C1DD71132D1CB54FBEA1EA54843381F0`.
- Added the repository overview, contributor rules, changelog, and ignore policy.
- Recorded the G0 conditional-pass scope and its prohibitions.
- Recorded all eight binding Founder decisions.
- Opened a RAID register without inventing missing ownership, authorisation, content, domain, provider, or legal answers.
- Added four accepted ADRs for the specification conflicts resolved by G0-COND-001.
- Did not install packages, scaffold an application, create empty application folders, add credentials, deploy, commit, or push.

### Decisions applied

The eight binding decisions are recorded as `G0-DEC-001` through `G0-DEC-008` in [`governance/DECISION_REGISTER.md`](governance/DECISION_REGISTER.md). Architectural consequences are recorded in ADRs 0001 through 0004.

### Verification

- INF-17 content-preservation check: passed by matching SHA-256 hashes.
- Canonical specification inventory: passed for the active set — 19 files, exactly one numeric prefix from `00` through `18`, no duplicate-suffix copies, and filenames aligned with the current document titles.
- All 13 requested governance-baseline files exist; required-scope, decision, risk, and ADR-content assertions passed.
- No `package.json`, lockfile, Next.js configuration, `src`, `app`, or `apps` scaffold exists.
- Relative Markdown-link and credential-pattern checks passed for the created files.
- Git status and `git diff --stat` were captured at task closeout; all work remains untracked because the repository has no initial commit and no file was staged.
- Document-control conflict retained: INF-00 Section 37 contains an older planned filename/list structure that does not match the active evolved `00`–`18` set. The specifications were not edited; see RAID-013.

### Unresolved blockers and risks

See [`governance/RAID_REGISTER.md`](governance/RAID_REGISTER.md). Material open items include written Gersan authorisation, claim/certificate/asset evidence, final Ukraine production-domain selection, business-controlled provider ownership and recovery, legal/privacy decisions, unassigned specialist owners, and local development-tool gaps.

### Next steps

1. Founder reviews this governance baseline and requests corrections or explicitly approves a commit.
2. No commit or push occurs before that approval.
3. After approval, prepare the development environment within G0-COND-001 and re-verify Node.js 24 LTS, pnpm 11, Docker, and the approved Supabase CLI strategy.
4. Close or confirm INF-18 WP-01 (`FND-001`/`FND-002`), then execute WP-02 (`FND-003`/`FND-004`) before WP-03 (`FND-005`–`FND-010`), using bounded task branches and INF-18 acceptance evidence.
5. Keep all publication, production, destructive database, production-domain purchase, and restricted-rights actions behind their stated gates.

## 2026-07-16 — WP-01 closeout and runtime pinning

**Authority:** Founder decision under G0-COND-001
**Scope:** WP-01 and FND-001 through FND-004 only
**Engineering agent:** Codex

### Completed work

- Confirmed the canonical workspace, remote, active task branch, governance baseline commit, and actual `origin/main` commit.
- Confirmed `docs/content` was outside the repository and the pre-change working tree was clean.
- Accepted the existing user-scoped `fnm` 1.39.0 installation and did not rerun winget.
- Installed Node.js `24.18.0` in fnm user storage, selected it for verification sessions, and set it as the fnm default.
- Preserved the existing `C:\Program Files\nodejs\node.exe` installation at `v22.13.1`.
- Installed Corepack `0.35.0` under the fnm-managed Node installation.
- Enabled and activated pnpm `11.13.0` through Corepack.
- Recorded Founder-provided evidence that the user's `~/.bashrc` persistently initialises fnm for new Git Bash sessions.
- Added `.node-version`, minimal root `package.json`, and the pnpm-generated lockfile.
- Stored [`S1-REPO-001`](evidence/sprint-1/S1-REPO-001.md) and [`S1-RUNTIME-001`](evidence/sprint-1/S1-RUNTIME-001.md).

### Verification evidence

- Active branch: `chore/engineering-foundation`.
- Governance commit: `d60bd84f80b28f526d93ebb41878ebaf0b2bd07a` locally and at actual remote `refs/heads/main`.
- Active toolchain: Node `v24.18.0`, npm `11.16.0`, Corepack `0.35.0`, pnpm `11.13.0`.
- fnm current/default: `v24.18.0`.
- `pnpm install --frozen-lockfile`: passed after lockfile creation.
- Runtime pins and lockfile: consistent.
- Fresh Git Bash verification: automatic fnm initialisation selected Node `v24.18.0`, exposed pnpm `11.13.0`, and placed the ephemeral fnm session path before the preserved Program Files Node path.
- Next.js scaffold: absent.
- Credential-pattern hits in tracked baseline and runtime files: zero.
- Specifications `00` through `18`: not edited.

### User-level and local changes

- fnm stored Node `24.18.0` under `C:\Users\erhan\AppData\Roaming\fnm`.
- The user added `eval "$(fnm env --use-on-cd --shell bash)"` to the user-level `~/.bashrc`; this was externally verified in a completely new Git Bash terminal.
- Git Bash activation prepends an ephemeral fnm multishell path for each session; its numeric identifier is not a stable requirement.
- No PowerShell profile or system-wide PATH was edited. PowerShell persistence remains unconfigured.
- Corepack and pnpm shims belong to the fnm-managed Node installation.
- Frozen verification created only ignored `node_modules` metadata; no dependency package or application scaffold was added.

### Status and next step

FND-001 through FND-004 have implementation and verification evidence and await Founder review. No commit or push occurred. FND-005 and all application scaffolding remain outside the authorised scope.

## 2026-07-17 — WP-03 Next.js application foundation

**Authority:** Founder-controlled increment under G0-COND-001
**Scope:** FND-005 through FND-010 only
**Engineering agent:** Codex

### Completed work

- Confirmed the clean `chore/nextjs-foundation` branch at toolchain commit `04932f82592c3d9a58ce067929881c45e7540c7d` before editing.
- Preserved Node `24.18.0`, pnpm `11.13.0`, `engines.node: 24.x` and `packageManager: pnpm@11.13.0`.
- Added an exact-version Next.js `16.2.10`, React `19.2.7`, strict TypeScript `5.9.3`, ESLint 9 flat-config and Tailwind CSS 4 foundation.
- Added the required `dev`, `build`, `start`, `lint` and `typecheck` scripts.
- Established the root `src/` App Router layout, the prescribed public/auth/admin/portal route-group skeleton, the `@/*` alias and a minimal module-boundary convention.
- Added one semantic public InfraVolt placeholder page; no feature, service, market-routing or production implementation was added.
- Stored [`S1-ARCH-001`](evidence/sprint-1/S1-ARCH-001.md).

### Dependency policy correction

- The first `pnpm install` resolved the graph but exited with `ERR_PNPM_IGNORED_BUILDS` for `sharp@0.34.5` and `unrs-resolver@1.12.2` under pnpm 11's strict lifecycle-script policy.
- Reviewed both packages in the resolved graph and added exact-version `allowBuilds` entries in `pnpm-workspace.yaml`.
- The file declares no workspace packages and does not change the approved single-application architecture.
- The second install passed; future unreviewed lifecycle-script packages remain blocked.

### Verification evidence

- Node `v24.18.0` and pnpm `11.13.0`: passed.
- `pnpm install --frozen-lockfile`: passed.
- Initial `pnpm lint`: passed with one warning in `postcss.config.mjs`; the anonymous default export was corrected in scope.
- Final `pnpm lint`: passed with no warnings.
- `pnpm typecheck`: passed.
- `pnpm build`: passed with Next.js `16.2.10`; the public `/` placeholder was statically generated.
- No Pages Router, `middleware.ts`, proxy, authentication, Supabase, database, API, form, admin feature, portal feature, analytics, Resend, Turnstile, Docker, environment file or deployment configuration was added.
- Specifications `00` through `18` were not edited.

### Status and next step

FND-005 through FND-010 have implementation and verification evidence and await Founder review. No file was staged, committed or pushed. Later Sprint 1 tasks remain outside this increment.

## 2026-07-17 — WP-04 environment contract

**Authority:** Founder-controlled increment under G0-COND-001

**Scope:** FND-011 and FND-012 only

**Engineering agent:** Codex

### Completed work

- Confirmed the clean `chore/environment-contract` branch at merged foundation commit `d2b8617` before editing.
- Preserved Node `24.18.0`, pnpm `11.13.0`, the root single-application layout and all existing dependency pins.
- Added exact runtime dependency `zod@4.4.3`.
- Added separate public and server environment parsers without a general barrel export.
- Added an explicit six-name `NEXT_PUBLIC_*` allowlist; server-only names cannot appear in client output.
- Added native URL/origin and host normalization supporting the approved `uk.infravolt.localhost` and `ua.infravolt.localhost` aliases.
- Made UK and Ukraine public site URLs required in production while keeping future provider variables optional until their integrations exist.
- Enforced the actual client/server contracts in Next.js production build and server phases without requiring a dev-only compiler at runtime.
- Required explicit client parser/reader modes, omitted empty optional values from output and added plain/display-name mailbox validation.
- Added names-only, classified `.env.example` documentation with safe local site origins and empty provider fields.
- Added a narrow fixture verification command without introducing the WP-15 test framework early.
- Stored [`S1-ENV-001`](evidence/sprint-1/S1-ENV-001.md).

### Verification evidence

- Node `v24.18.0` and pnpm `11.13.0`: passed.
- `pnpm install` and `pnpm install --frozen-lockfile`: passed.
- The initial environment matrix exposed absent server keys retained as `undefined`; final parsing omits both absent and empty-string optional values.
- Review findings for production enforcement, empty optional output, permissive default mode and email semantics were corrected.
- Internal review also replaced a runtime TypeScript-compilation preflight with native Next.js production build/server configuration validation.
- Final `pnpm verify:env`: passed all ten checks covering requiredness, production reader behavior, redaction, URL origin/host/port rules, client allowlisting, empty optional values, email mailboxes and optional server configuration.
- Negative production build/start checks failed for missing UK/UA URLs with name-only errors; malformed email build validation failed with a name-only error.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- The first sandboxed build compiled but hit `spawn EPERM`; the identical authorised rerun completed successfully with safe process-local UK/UA origins.
- `git diff --check`, specification-diff, credential-pattern, environment-file and client/server-name checks passed.
- Only `.env.example` exists; real environment files remain ignored.

### Status and next step

FND-011 and FND-012 have implementation and verification evidence and await Founder/PR review before merge. FND-013 and all later work packages remain outside this increment.

## 2026-07-17 — WP-05 server-only boundary

**Authority:** Founder-authorised Sprint 1 continuation under G0-COND-001

**Scope:** FND-013 only

**Engineering agent:** Codex

### Completed work

- Fast-forward synchronized clean `main` at squash-merged WP-04 commit `d56aca3` and verified its tree matched the reviewed WP-04 branch tip.
- Created `chore/server-boundaries` only after confirming no local or remote branch with that name existed.
- Added exact Next-supported dependency `server-only@0.0.1` and marked the server environment contract directly.
- Preserved separate client/server contracts and avoided a general environment barrel.
- Moved WP-04 production preflight execution out of `next.config.ts` into a Node 24 server-conditioned script so the poisoned module remains protected without requiring the TypeScript devDependency at production startup.
- Added an isolated Next.js verifier proving a Server Component import succeeds and a Client Component import fails with the exact Next boundary error.
- Stored [`S1-ARCH-002`](evidence/sprint-1/S1-ARCH-002.md) without modifying historical `S1-ARCH-001` or `S1-ENV-001` evidence.

### Verification evidence

- Node `v24.18.0` and pnpm `11.13.0`: preserved.
- `pnpm install --frozen-lockfile`: passed.
- WP-04 `pnpm verify:env`: passed all ten checks.
- `pnpm verify:server-boundary`: valid server import passed; client import was rejected.
- Missing UK build and missing UA start preflights failed with variable names only.
- `pnpm lint` and `pnpm typecheck`: passed.
- Positive production build with safe process-local UK/UA origins: passed.
- `git diff --check`, credential-pattern, environment-file, specification-change, historical-evidence and client secret-name checks passed.

### Internal review

- Narrowed the negative verifier from a broad `server-only` text match to Next's exact Client Component rejection phrase.
- Confirmed ignored verification fixtures are removed and no server remains listening.
- No unresolved in-scope correctness or security finding remains.

### Status and next step

FND-013 has implementation and verification evidence and awaits Founder/PR review before merge. FND-014 and all later work remain outside this increment.

## 2026-07-17 — WP-05 common contracts and log context

**Authority:** Founder-authorised Sprint 1 continuation under G0-COND-001

**Scope:** FND-018 and FND-019 only

**Engineering agent:** Codex

### Completed work

- Fast-forward synchronized clean `main` at squash-merged FND-013 commit `31cf6cd` and created `chore/common-contracts` after confirming no local or remote branch with that name existed.
- Added the small shared discriminated `Result<T>`/error pattern owned by FND-018 and a branded shared correlation-ID type.
- Added server-only UUID v4 correlation generation and trusted-format resolution without user, company or market PII.
- Added a runtime-validated, explicitly allowlisted safe log-context interface and the WP-05 redaction-policy placeholder without adding logging infrastructure.
- Expanded the existing boundary verifier to prove separate client-import rejection for the environment, correlation and log-context server modules.
- Added a six-check common-contract verifier without introducing the later WP-15 test framework.
- Stored [`S1-ARCH-003`](evidence/sprint-1/S1-ARCH-003.md) without modifying historical Sprint 1 evidence.

### Verification evidence

- Node `v24.18.0`, pnpm `11.13.0` and `pnpm install --frozen-lockfile`: passed; lockfile unchanged.
- `pnpm verify:common-contracts`: passed six checks for Result discrimination, UUID v4 format, trusted-format resolution, PII rejection, safe context allowlisting, name-only errors and the redaction placeholder.
- WP-04 `pnpm verify:env`: passed all ten checks.
- `pnpm verify:server-boundary`: the Server Component fixture passed; independent environment, correlation and log-context Client Component imports were rejected by Next.js.
- `pnpm lint` and `pnpm typecheck`: passed.
- Positive production build with safe process-local UK/UA localhost origins: passed.
- Final whitespace, credential, environment-file, specification-change and Markdown-link scans are recorded in `S1-ARCH-003` after completion.

### Corrections and internal review

- The first common verifier run exposed a missing `.ts` extension required by Node's native TypeScript loader; the import was corrected and verification passed.
- The first expanded isolated server fixture exposed a root-alias dependency; server utility type imports were made explicit and the full boundary matrix passed.
- Runtime validation was added for all allowlisted log fields after review identified that compile-time unions alone were insufficient for JavaScript callers.
- Independent negative fixtures replaced a combined fixture so an existing protected import cannot mask a missing boundary on another module.
- No unresolved in-scope correctness or security finding remains.

### Status and next step

FND-018 and FND-019 have implementation and verification evidence and await Founder/PR review before merge. WP-05 is complete across `S1-ARCH-002` and `S1-ARCH-003`. WP-06/FND-014–016 is the next integration-order package; it remains outside this increment.

## 2026-07-18 — WP-06 trusted host, market and locale

**Authority:** Founder-authorised Sprint 1 continuation under G0-COND-001

**Scope:** FND-014, FND-015 and FND-016 only

**Engineering agent:** Codex

### Completed work

- Fast-forward synchronized clean `main` at squash-merged WP-05 commit `f456935` and created `feat/market-context` after confirming no local or remote branch with that name existed.
- Applied G0-DEC-004/005 and ADR-0003: local UK/UA hosts are fixed, while the unresolved Ukraine production domain remains environment-configurable and outside engineering approval.
- Added the typed UK/UA market and locale contracts, a server-only explicit host allowlist and a trusted market-context resolver.
- Added a narrow Next.js 16 `src/proxy.ts` for Host resolution, canonical alias redirects, spoofed-header replacement and safe unknown-host rejection.
- Added exact UK `en-GB` and UA `uk-UA` root HTML language behavior through server-side revalidation of trusted proxy context.
- Added a twelve-check market verifier and extended the server-boundary matrix to prove the market server API cannot enter a Client Component.
- Stored [`S1-MARKET-001`](evidence/sprint-1/S1-MARKET-001.md) without modifying historical Sprint 1 evidence.

### Verification evidence

- Node `v24.18.0`, pnpm `11.13.0` and `pnpm install --frozen-lockfile`: passed; lockfile unchanged.
- `pnpm verify:market`: passed twelve checks covering UK, UA, uppercase/trailing-dot normalization, local ports, canonical aliases, explicit preview policy, unknown/malformed hosts, spoofing resistance, locale mapping, server revalidation and immutable resolver configuration.
- WP-04 `pnpm verify:env`: passed all ten checks.
- WP-05 `pnpm verify:common-contracts`: passed all six checks.
- `pnpm verify:server-boundary`: Server Component imports passed; environment, correlation, log-context and market server imports were independently rejected from Client Components.
- `pnpm lint`, `pnpm typecheck` and the positive production build passed.
- Built-server smoke passed with UK 200/`en-GB`, UA 200/`uk-UA` and unknown-host 404 without host/query disclosure.
- Final whitespace, credential, environment-file, specification-change and Markdown-link scans are recorded in `S1-MARKET-001` after completion.

### Corrections and internal review

- Corrected native ESM import paths used by verification and isolated server modules.
- Made identical local-host registration idempotent while preserving conflict rejection.
- Removed forwarded-host metadata rather than only ignoring it for resolution.
- Replaced the hard-coded root `en-GB` attribute with revalidated request-market locale.
- Runtime smoke exposed that `request.nextUrl.host` is Next's internal listening origin under `next start`; the proxy now validates the actual incoming `Host` header against the allowlist.
- No unresolved in-scope code, architecture, security or scope finding remains.

### Status and next step

FND-014 through FND-016 have implementation and verification evidence and await Founder/PR review before merge. WP-06 is complete. WP-07/FND-020 is the next integration-order package and remains outside this increment.

## 2026-07-18 — WP-07 feature flag foundation

**Authority:** Founder-controlled Sprint 1 increment under G0-COND-001

**Scope:** FND-017 only

**Engineering agent:** Codex

### Scope reconciliation

- INF-18 uses the label WP-07 for FND-020 global safe states, while the Founder-controlled task explicitly authorises WP-07 Feature Flag Foundation for FND-017.
- Implemented FND-017 only under that narrower task authority. FND-020 global safe states remain unimplemented and are not claimed by this entry.

### Completed work

- Confirmed clean `feat/feature-flags` at merged main commit `3db6b5a` before editing, with Node `v24.18.0` and pnpm `11.13.0`.
- Added one immutable, server-owned feature registry with derived literal flag types for `ukraineMarketEnabled`, `partnerPortalEnabled` and `productComparatorEnabled`.
- Defaulted every flag to disabled, limited each flag to its documented market/release scope and recorded product ownership plus review milestones.
- Added server-only resolution against the complete trusted WP-06 market context, code-only failures, strict override allowlisting and immutable results.
- Added a ten-check feature verifier covering default-off behavior, unknown/invalid inputs, redaction, market restrictions, spoof resistance and immutability.
- Expanded the isolated boundary matrix with independent Client Component rejection fixtures for the feature registry and resolver.
- Stored [`S1-FEATURE-001`](evidence/sprint-1/S1-FEATURE-001.md) without modifying historical Sprint 1 evidence.

### Verification evidence

- Node `v24.18.0`, pnpm `11.13.0` and `pnpm install --frozen-lockfile`: passed; lockfile unchanged.
- `pnpm verify:features`: passed ten checks.
- Existing `pnpm verify:env`, `pnpm verify:common-contracts` and `pnpm verify:market`: passed ten, six and twelve checks respectively.
- `pnpm verify:server-boundary`: the positive Server Component fixture passed; six independent Client Component imports, including both feature modules, were rejected.
- `pnpm lint`, `pnpm typecheck` and the production build with safe process-local UK/UA localhost origins passed.
- Whitespace, credential, environment-file, specification-change, historical-evidence, Markdown-link and out-of-scope scans passed.

### Corrections and internal review

- Replaced a market-code-only input with the full trusted market context and runtime market/locale/host/URL validation.
- Restricted override fixtures to plain or null-prototype records before validation and freezing.
- Confirmed flags are release controls, not permissions, and cannot bypass G0 restrictions.
- No unresolved in-scope correctness or security finding remains.

### Status and next step

FND-017 has implementation and verification evidence and awaits Founder/PR review before merge. Calendar stale-flag review dates remain a Product Owner release-planning decision; release milestones are recorded without inventing dates. FND-020 global safe states and all later packages remain outside this increment.
