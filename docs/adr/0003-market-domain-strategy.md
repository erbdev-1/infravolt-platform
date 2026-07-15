# ADR-0003: Shared application with separate market domains

- **Status:** Accepted
- **Date:** 2026-07-15
- **Decision authority:** Founder and Product Owner, Erhan Baydi
- **Decision records:** G0-DEC-004 and G0-DEC-005

## Context and specification conflict

The specifications require United Kingdom and Ukraine markets, `en-GB` and `uk-UA`, separate market domains, and one shared application. Across INF-00, INF-05, INF-13, INF-15, INF-16, and INF-18, some hostnames are requirements while others are proposed, illustrative, or awaiting market/legal approval. Local-development hostname examples were not consistent, and selecting a permanent Ukraine production domain now would contradict the unresolved domain gate and G0 prohibition on purchase or final approval.

## Decision

- Serve both markets from the same application and deployment codebase, with the trusted request host resolved server-side to a market configuration.
- Use `uk.infravolt.localhost` for United Kingdom local development.
- Use `ua.infravolt.localhost` for Ukraine local development.
- Keep production hostnames environment-configurable and allow the exact Ukraine production domain to remain unset or provisional until the Ukraine release gate.
- Do not hard-code an unapproved Ukraine production domain into routes, canonical metadata, email, legal copy, storage policy, or business logic.
- Reject unknown or malformed hosts safely. Do not accept a client-provided market value as authority over trusted server-side host resolution.
- Keep market, locale, lead routing, legal content, canonical URLs, and publication state explicit and testable.

This ADR does not purchase, approve, launch, or transfer any production domain.

## Consequences

- Local automation and test fixtures have stable host contracts.
- The application can develop market isolation without prematurely fixing the Ukraine production hostname.
- Environment validation must distinguish required local/preview values from production values that become mandatory only at the applicable gate.
- Host-to-market mapping, canonical/hreflang output, redirects, sitemap/robots behaviour, cookies, auth redirects, lead routing, and analytics require cross-host tests.
- Final production domains, entity/legal copy, DNS, certificates, email authentication, and launch remain separate approved actions.

## Alternatives considered

- **Locale path prefixes on one production domain:** rejected because the binding product strategy requires separate UK and Ukraine domains.
- **Separate codebases or deployments by market:** rejected because the product requires one shared application/codebase.
- **Select the Ukraine production domain now:** deferred because the Founder explicitly permits configurability until the Ukraine gate and forbids purchase/final approval under G0-COND-001.

## References

- INF-00 — mandatory markets, locales, shared application, and separate-domain requirements
- INF-05 — host-derived market architecture and domain examples
- INF-13 — environment and deployment/domain controls
- INF-15 and INF-16 — release gates and domain dependencies
- INF-18 — local domain and market-foundation task acceptance
- G0-COND-001, G0-DEC-004, and G0-DEC-005
