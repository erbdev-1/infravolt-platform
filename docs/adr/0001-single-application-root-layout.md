# ADR-0001: Single application at the repository root

- **Status:** Accepted
- **Date:** 2026-07-15
- **Decision authority:** Founder and interim Technical Owner, Erhan Baydi
- **Decision record:** G0-DEC-003

## Context and specification conflict

InfraVolt requires one repository, one shared application/codebase, and a modular monolith. INF-05, particularly its target repository structure, and INF-18's Sprint 1 foundation tasks define a single Next.js application at the repository root with application code under `src/`. INF-12 includes an `apps/web` plus `packages/*` example that could instead be read as a workspace/monorepo layout.

Those structures are incompatible as simultaneous initial repository layouts. Leaving the choice implicit would change import paths, commands, deployment roots, ownership boundaries, and foundation-task acceptance evidence.

## Decision

Use the root single-application `src/` layout defined by INF-05 and INF-18.

- The Next.js application, `package.json`, configuration, and lockfile belong at the repository root.
- Runtime code belongs under root `src/`, organised into explicit modular-monolith boundaries.
- Do not create `apps/web`, a workspace application tree, or speculative `packages/*` during the engineering foundation.
- Shared concerns remain modules within the one application until an authorised, evidenced need justifies a later extraction.
- Do not create empty application folders before the task that owns their implementation.

## Consequences

- Local, CI, and Vercel commands have one application root.
- Cross-surface reuse occurs within one TypeScript application while public, admin, and partner boundaries remain explicit in routes, modules, authorisation, and tests.
- INF-12 remains authoritative for testing and accessibility intent, but its `apps/web` repository-path example is not used.
- A future move to workspaces or independently deployable services requires a new authorised ADR and migration plan; it is not an incidental refactor.

## Alternatives considered

- **`apps/web` with shared packages:** rejected for the initial foundation because it conflicts with the Founder-selected INF-05/INF-18 root layout and introduces workspace complexity not required by the one-application decision.
- **Multiple applications or repositories:** rejected because it violates the binding shared-application and modular-monolith architecture.

## References

- INF-00 — master product and repository constraints
- INF-05 — technical architecture and proposed root repository structure
- INF-12 — test/QA examples that include `apps/web`
- INF-18 — Sprint 1 engineering-foundation root-layout tasks
- G0-COND-001 and G0-DEC-003
