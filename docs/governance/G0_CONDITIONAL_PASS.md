# G0-COND-001 — Conditional Pass

| Field | Value |
|---|---|
| Decision ID | G0-COND-001 |
| Status | Conditional Pass — active |
| Decision date | 2026-07-15 |
| Authority | Founder |
| Founder / Product Owner / interim Technical Owner | Erhan Baydi |
| Engineering agent | Codex |
| Supersession | Active until replaced by a recorded Founder decision or later gate result |

## Purpose

This record converts the Founder-authorised G0 conditional pass into an auditable implementation boundary. It permits safe governance and engineering-foundation work while unresolved commercial, legal, rights, content, provider, domain, and production risks remain gated.

## Authorised scope

G0-COND-001 authorises only:

- Repository governance.
- Documentation baseline.
- Development-environment preparation.
- Sprint 1 engineering-foundation work within the approved specifications, binding decisions, and task acceptance criteria.

This baseline task is limited further to repository governance and documentation. It does not itself authorise application scaffolding, dependency installation, a commit, or a push.

## Prohibited scope

G0-COND-001 does not authorise:

- Production deployment.
- Production credentials or customer data.
- Public claims of official Gersan authorisation.
- Publication of unverified product claims, certificates, or licensed assets.
- Ukraine production launch.
- Destructive database operations.
- Purchase or final approval of production domains.

Written Gersan authorisation and rights evidence must be recorded before official-authorisation claims or restricted assets are published. Engineering agents must not substitute their judgement for legal, commercial, product-owner, or rights-holder approval.

## Binding conditions

1. Apply the eight decisions in [`DECISION_REGISTER.md`](DECISION_REGISTER.md).
2. Track unresolved gaps in [`RAID_REGISTER.md`](RAID_REGISTER.md), with an authorised owner assigned where one is known and no invented answer where one is not.
3. Use one repository, one shared application/codebase, and the accepted root `src/` modular-monolith layout.
4. Use protected `main` plus short-lived task branches; do not create a `develop` branch.
5. Treat the Product Comparator as R4/V1, outside MVP.
6. Use `uk.infravolt.localhost` and `ua.infravolt.localhost` locally. Keep the Ukraine production domain configurable until its release gate.
7. Preserve market, locale, tenant, authorisation, accessibility, security, privacy, and evidence requirements from the specifications.
8. Stop and escalate if work would cross a prohibited boundary or require an unrecorded architectural, legal, commercial, rights, provider, or production decision.

## Exit and review

This conditional pass is not evidence that unresolved risks are closed. Each later release gate must evaluate the applicable RAID items and required approval evidence. A change to this scope or any binding decision requires a new recorded authorised decision and, where architectural, an ADR update or superseding ADR.
