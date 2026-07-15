# InfraVolt Platform

InfraVolt is a production B2B platform for the United Kingdom and Ukraine. One shared application and codebase will serve separate market domains while enforcing server-side market, locale, content, legal, and lead-routing boundaries.

## Application surfaces

The planned modular monolith has three surfaces:

- A public B2B website for market-specific company, solution, product, resource, and lead-generation journeys.
- An internal admin and sales-operations surface for governed content, product data, leads, documents, assets, and operational workflows.
- A company-scoped partner portal for authorised partner users and their organisation's data.

The required markets are the United Kingdom and Ukraine. The required locales are `en-GB` and `uk-UA`. Local market hosts are `uk.infravolt.localhost` and `ua.infravolt.localhost`. The exact Ukraine production domain remains configurable until the Ukraine release gate; no production-domain purchase or approval is authorised by the current gate.

## Technology baseline

The approved baseline is a root, single-application `src/` layout using:

- Next.js App Router, React, and strict TypeScript
- Node.js 24 LTS and pnpm 11
- Tailwind CSS
- Supabase PostgreSQL, Auth, and Storage
- Resend for transactional email
- Cloudflare Turnstile for abuse protection
- Vercel for hosting and deployment
- Vitest, React Testing Library, and Playwright
- WCAG 2.2 AA as the accessibility target

The application has not yet been scaffolded. Package versions must be pinned during the separately approved engineering-foundation task; this governance baseline does not install dependencies or create application folders.

## Source of truth

The authoritative project documentation is the canonical numbered set in [`docs/specs/`](docs/specs/), from `00_MASTER_PROJECT_SPEC.md` through `18_SPRINT_1_ENGINEERING_FOUNDATION_EXECUTION_PACK.md`.

Founder-approved decisions are recorded in [`docs/governance/DECISION_REGISTER.md`](docs/governance/DECISION_REGISTER.md), and architectural conflict resolutions are recorded in [`docs/adr/`](docs/adr/). When documents conflict, the conflict must be surfaced and resolved explicitly; contributors must not silently select an interpretation.

## Repository status

Current gate: **G0-COND-001 — Conditional Pass**.

The gate authorises repository governance, documentation baseline, development-environment preparation, and Sprint 1 engineering-foundation work. It does not authorise production deployment, production credentials or customer data, Ukraine production launch, destructive database operations, production-domain purchase or final approval, or publication of unverified claims, certificates, licensed assets, or official Gersan-authorisation claims.

No Next.js application or feature implementation exists yet. The next work requires review of this governance baseline and explicit approval before any commit or push.

## Local-development prerequisites

Before engineering-foundation work begins, a workstation needs:

1. Git.
2. Node.js 24 LTS.
3. Corepack with pnpm 11 activated at the repository-pinned version.
4. Docker Desktop with the Docker daemon and Compose available for local services.
5. The approved Supabase CLI execution strategy.
6. Local hostname resolution for `uk.infravolt.localhost` and `ua.infravolt.localhost` if the operating system or browser does not resolve those subdomains automatically.
7. Access to development or preview provider projects only when explicitly provisioned through the approved secret-management process.

Never commit secrets, real credentials, production data, private contracts, or unapproved licensed assets. Use documented placeholders and future committed `.env.example` files for variable names only.

## Working in this repository

Read [`AGENTS.md`](AGENTS.md) before making changes. Work uses protected `main` plus short-lived task branches; there is no `develop` branch. Commits and pushes require explicit approval.
