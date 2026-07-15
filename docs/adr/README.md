# Architecture Decision Records

ADRs record material, authorised architectural decisions and explicit resolutions where project documents conflict. They explain the context, decision, consequences, and affected specifications; they do not silently rewrite the specifications.

## Status values

- **Proposed:** awaiting an authorised decision.
- **Accepted:** currently binding.
- **Superseded:** replaced by a later ADR, which must be linked.
- **Deprecated:** retained for history but no longer recommended.

## Index

| ADR | Status | Decision |
|---|---|---|
| [0001](0001-single-application-root-layout.md) | Accepted | Root single-application `src/` layout |
| [0002](0002-protected-main-short-lived-branches.md) | Accepted | Protected `main` with short-lived task branches |
| [0003](0003-market-domain-strategy.md) | Accepted | Shared application, separate market domains, fixed local hosts |
| [0004](0004-comparator-release-scope.md) | Accepted | Product Comparator deferred to R4/V1 |

## Process

Use the next four-digit number. State the authorised decider, date, affected requirements, considered alternatives, consequences, and migration needs. A change to an accepted decision requires an updated or superseding ADR and an entry in the decision register. Do not use an ADR to invent legal, commercial, rights, product-scope, or production approval.
