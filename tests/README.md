# Test Foundation

InfraVolt uses three complementary test layers:

- Vitest covers deterministic TypeScript contracts that do not need a browser.
- React Testing Library covers synchronous component behaviour through the user-visible accessibility tree.
- Playwright covers host-derived market context, document language and other Next.js/browser-owned behaviour. Async Server Components remain in this layer.

## File placement and naming

- Unit and component tests are co-located under `src/` as `*.test.ts` or `*.test.tsx`.
- Browser smoke tests live under `tests/e2e/` as `*.spec.ts`.
- Shared deterministic setup belongs under `tests/setup/`; test-only helpers and fixtures belong under `tests/helpers/` or `tests/e2e/fixtures/`.
- Test names describe the actor or context, the behaviour and the observable result.

## Selector policy

Use selectors in this order:

1. `getByRole` with an accessible name.
2. `getByLabelText` for labelled controls.
3. `getByText` or another stable user-visible semantic query.
4. A stable test ID only when no user-facing selector can express the contract.

Do not select by CSS class, DOM ancestry or implementation-only structure unless a documented technical constraint makes that unavoidable. Test IDs must never contain customer, company, record or other sensitive identifiers.

## Isolation and artifacts

Unit/component tests reject unexpected network access. Browser smoke tests allow only the approved local host contexts and use synthetic, non-sensitive content. Tests must not depend on execution order, retries, production credentials, remote providers or production data.

Playwright records a trace and screenshot only on failure. Each test's small browser diagnostic attachment stores counts rather than raw console messages or URLs, so a failure always has a safe console/network summary. `pnpm verify:test-artifacts` creates a temporary intentional failure under ignored test output, proves the expected assertion produced bounded artifacts, scans them for strong credential and personal-data patterns, and removes the fixture and artifacts before exiting. Video is disabled.
