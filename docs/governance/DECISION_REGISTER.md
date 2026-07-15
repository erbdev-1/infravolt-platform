# Decision Register

This register records the binding Founder decisions attached to G0-COND-001. The records apply from 2026-07-15 and may be changed only by a later authorised, recorded decision. Unknown details are not inferred here.

| ID | Binding decision | Authority / owner | Specification conflict or effect | Record |
|---|---|---|---|---|
| G0-DEC-001 | Product Comparator is deferred from MVP to R4/V1. | Founder / Product Owner: Erhan Baydi | Resolves inconsistent MVP/backlog timing across INF-15 and INF-16. Comparator work is excluded from MVP task selection. | [ADR-0004](../adr/0004-comparator-release-scope.md) |
| G0-DEC-002 | Git uses protected `main` plus short-lived task branches. There is no `develop` branch. | Founder / interim Technical Owner: Erhan Baydi | Resolves the branching conflict between INF-13 and INF-18. | [ADR-0002](../adr/0002-protected-main-short-lived-branches.md) |
| G0-DEC-003 | The repository uses the root single-application `src/` layout defined by INF-05 and INF-18. | Founder / interim Technical Owner: Erhan Baydi | Resolves INF-12's `apps/web` example against the binding root layout in INF-05/INF-18. | [ADR-0001](../adr/0001-single-application-root-layout.md) |
| G0-DEC-004 | Local market hosts are `uk.infravolt.localhost` and `ua.infravolt.localhost`. | Founder / Product Owner: Erhan Baydi | Replaces conflicting or provisional local-host examples and fixes the development host contract. | [ADR-0003](../adr/0003-market-domain-strategy.md) |
| G0-DEC-005 | The exact Ukraine production domain may remain configurable until the Ukraine release gate. | Founder / Product Owner: Erhan Baydi | Resolves the need for a dual-domain architecture without inventing a final Ukraine domain before approval. No purchase or final approval is implied. | [ADR-0003](../adr/0003-market-domain-strategy.md) |
| G0-DEC-006 | Product Owner and interim Technical Owner are Erhan Baydi. | Founder: Erhan Baydi | Supplies the current decision owner for product and interim technical matters; specialist and operational roles remain open where not explicitly assigned. | G0-COND-001 |
| G0-DEC-007 | Codex acts as Engineering Agent, not as legal or commercial decision owner. | Founder: Erhan Baydi | Defines the agent's authority boundary. Legal, commercial, rights, and production approvals require authorised human owners. | G0-COND-001 |
| G0-DEC-008 | Official Gersan-authorisation claims and restricted assets remain blocked until written authorisation is recorded. | Founder: Erhan Baydi; rights approval owner unresolved | Enforces the rights/evidence constraints across INF-00, INF-03, INF-10, INF-11, INF-15, INF-16, and INF-17. | G0-COND-001 / RAID-002 |

## Change control

A proposed change must identify the affected decision ID, reason, authority, impacted specifications/tasks, risk, and migration consequence. Architectural changes also require a superseding or updated ADR. The prior decision remains binding until the replacement is approved and recorded.
