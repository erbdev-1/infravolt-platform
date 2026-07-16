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
