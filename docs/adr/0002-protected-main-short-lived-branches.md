# ADR-0002: Protected main with short-lived task branches

- **Status:** Accepted
- **Date:** 2026-07-15
- **Decision authority:** Founder and interim Technical Owner, Erhan Baydi
- **Decision record:** G0-DEC-002

## Context and specification conflict

INF-13 describes a Git model that includes a long-lived `develop` branch. INF-18 defines protected `main` plus short-lived task branches and explicitly excludes a `develop` branch for the engineering foundation. Applying both models would create ambiguous integration, protection, CI, and release authority.

## Decision

Use protected `main` plus short-lived task branches. Do not create or use a `develop` branch.

- Branch from current `main` for one bounded task or coherent task pack.
- Keep branches short-lived, narrowly scoped, and reviewable.
- Merge only through the approved review and required-check process once remote protection is configured.
- Do not commit directly to `main` after branch protection is established.
- Do not commit or push at all without explicit approval under the current repository instructions.
- Release tags and production promotion require their separately approved workflow and gates.

## Consequences

- One integration line reduces drift and avoids double-merging between `develop` and `main`.
- Small task branches make specification/task traceability and rollback clearer.
- Remote branch protection, required reviews, and required checks are external configuration work and remain unverified until authorised access exists.
- Any emergency process must still preserve evidence, review, and gate boundaries; this ADR does not create a production-deployment exception.

## Alternatives considered

- **Git Flow with `develop`:** rejected because the Founder selected INF-18's simpler protected-main model.
- **Direct unprotected commits to `main`:** rejected because it provides insufficient production governance and contradicts the binding decision.

## References

- INF-13 — DevOps, deployment, observability, and the conflicting `develop` model
- INF-18 — Sprint 1 foundation workflow using protected `main` and short-lived branches
- G0-COND-001 and G0-DEC-002
