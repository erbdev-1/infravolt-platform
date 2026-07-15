# InfraVolt Repository Instructions

These instructions apply to the entire repository.

## Before editing

1. Read the master specification and every numbered specification relevant to the task in `docs/specs/`.
2. Read the applicable records in `docs/governance/` and `docs/adr/`.
3. Inspect the current working tree and preserve user-owned or unrelated changes.
4. Confirm the task's allowed scope, protected files, acceptance criteria, dependencies, and release gate.

Specifications `00` through `18` are authoritative project documentation. Do not alter them unless the task explicitly authorises a specification change. If specifications, ADRs, or current instructions conflict, report the conflict and obtain or record an explicit decision. Never make a silent architectural, product-scope, legal, market, security, or provider decision.

## Change discipline

- Make the smallest coherent change needed for the approved task.
- Keep the root single-application `src/` architecture and modular-monolith boundaries unless an approved ADR changes them.
- Do not create speculative abstractions, empty application folders, unrequested features, or unrelated formatting churn.
- Do not install or upgrade packages, scaffold applications, change providers, or mutate external systems unless the task explicitly authorises it.
- Do not use production credentials, production customer data, or destructive database operations.
- Do not add secrets, tokens, passwords, private keys, private contracts, or real credentials to files, logs, fixtures, commits, or messages.
- Do not publish or imply official Gersan authorisation, or use restricted claims, certificates, product documents, images, logos, or other licensed assets, until written authorisation and rights evidence are recorded.
- Codex and other engineering agents implement approved engineering work; they are not legal or commercial decision owners.

## Verification

Before declaring an implementation task complete, run the tests and checks proportionate to the change. For application work this normally includes formatting or lint checks, TypeScript checks, relevant Vitest/React Testing Library tests, relevant Playwright coverage, accessibility checks, and a production build when the task pack requires it.

If a required check cannot run, report the exact command, result, reason, and resulting risk. Do not claim verification that did not occur.

## Git and handoff

- Use protected `main` and short-lived task branches. Do not create a `develop` branch.
- Do not commit or push without explicit approval from the user for that action.
- Do not rewrite, discard, stage, or include unrelated work.
- At handoff, list changed files, checks run, results, unresolved blockers, assumptions, and any decision that still needs an authorised owner.
