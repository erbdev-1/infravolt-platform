# S1-REPO-001 — Repository Baseline

| Field | Evidence |
|---|---|
| Date | 2026-07-16 |
| Work package | WP-01 — Repository Baseline |
| Backlog tasks | FND-001, FND-002 |
| Authority | Founder decision under G0-COND-001 |
| Engineering owner | Erhan Baydı |
| Reviewer | Founder — pending review |
| Status | Complete — pending Founder review |

## Specification basis

- INF-05: one canonical repository and one root application architecture.
- INF-16 §34.1: FND-001 requires a controlled canonical repository; FND-002 requires an existing-change and ownership baseline.
- INF-18 §36: confirm path/remote, inspect Git and files, preserve existing work, identify unsafe material, and store a baseline report.
- INF-18 §132: repository evidence identifier `S1-REPO-001`.

## Canonical repository

| Check | Result |
|---|---|
| Workspace | `C:\Users\erhan\Desktop\infravolt` |
| Remote | `https://github.com/erbdev-1/infravolt-platform.git` |
| Default integration branch | `main` |
| Active task branch | `chore/engineering-foundation` |
| Governance baseline commit | `d60bd84f80b28f526d93ebb41878ebaf0b2bd07a` — `chore(repo): establish project governance baseline` |
| Local `main` | `d60bd84f80b28f526d93ebb41878ebaf0b2bd07a` |
| Local `origin/main` tracking ref | `d60bd84f80b28f526d93ebb41878ebaf0b2bd07a` |
| Actual remote `refs/heads/main` | `d60bd84f80b28f526d93ebb41878ebaf0b2bd07a`, verified with `git ls-remote` |

## Pre-change baseline

The mandatory preflight completed before runtime changes:

- `docs/content` was absent; the prior catalogue-review working file had been moved outside the repository.
- `git status --short` returned no output.
- The active branch was `chore/engineering-foundation`.
- User-scoped `fnm` resolved at version `1.39.0`.
- HEAD contained 32 tracked governance and specification files.
- No existing work required overwrite or deletion.

## Safety inspection

- Credential-pattern scan across the 32 tracked files and the three runtime files returned zero hits.
- No workspace file outside `.git` and ignored `node_modules` exceeded 1 MiB.
- The largest inspected file was `docs/specs/06_DATABASE_SCHEMA.md` at 109,808 bytes.
- No archive, PDF, PNG, application scaffold, production credential, or customer data was added by WP-01.
- Specifications `00` through `18` were not edited.

## Acceptance

- Canonical path, remote, branch, and baseline commit are recorded.
- Local and actual remote `main` point to the same governance commit.
- Pre-existing working-tree state and ownership boundary are recorded.
- No existing work was overwritten.
- The repository baseline is stored in this evidence record.
