# ADR-0004: Product Comparator deferred to R4/V1

- **Status:** Accepted
- **Date:** 2026-07-15
- **Decision authority:** Founder and Product Owner, Erhan Baydi
- **Decision record:** G0-DEC-001

## Context and specification conflict

The project documents describe a Product Comparator but do not assign it consistently to the same release. INF-15 places comparator capability in a later V1/R4 stage, while INF-16 contains MVP/backlog wording or task placement that could cause it to be selected earlier. Treating the comparator as MVP would add product-data normalisation, evidence, accessibility, responsive-table, URL-state, analytics, and test scope before its prerequisites are approved.

## Decision

The Product Comparator is deferred from MVP to R4/V1.

- Do not select, implement, expose, or imply comparator functionality in MVP or the Sprint 1 engineering foundation.
- Foundation work may establish general typed product data and reusable accessibility/security primitives only when required by an authorised current-release task; it must not build hidden comparator scope.
- Comparator tasks remain backlog items until R4/V1 is authorised and their product data, claims/evidence, UX, accessibility, localisation, and performance prerequisites are ready.
- Any move back into MVP requires a new Founder scope decision, dependency review, backlog/release update, and ADR supersession.

## Consequences

- MVP planning can focus on approved discovery, product/content, lead, admin, partner, and Application Map priorities without comparator scope creep.
- Product schemas should not be distorted around unapproved comparison assumptions.
- Navigation, copy, acceptance tests, analytics events, and public claims must not advertise the comparator before its release gate.
- INF-16 remains the task catalogue, but comparator entries are scheduled according to this R4/V1 decision rather than conflicting MVP wording.

## Alternatives considered

- **Include a minimal comparator in MVP:** rejected because the Founder deferred the complete capability and a partial version could present misleading or unevidenced product comparisons.
- **Remove the comparator permanently:** rejected because the decision is a release deferral, not cancellation.

## References

- INF-15 — staged release plan placing comparator work in R4/V1
- INF-16 — task catalogue and conflicting MVP/backlog timing
- INF-03 and INF-04 — product/content evidence and public experience dependencies
- INF-12 — accessibility and test expectations relevant to future comparison UI
- G0-COND-001 and G0-DEC-001
