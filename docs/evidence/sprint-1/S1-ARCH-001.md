# S1-ARCH-001 — Next.js Architecture Baseline

| Field | Evidence |
|---|---|
| Date | 2026-07-17 |
| Work package | WP-03 — Next.js Application Foundation |
| Backlog tasks | FND-005 through FND-010 |
| Authority | Founder-controlled increment under G0-COND-001 |
| Engineering owner | Codex |
| Reviewer | Founder — pending review |
| Status | Complete — pending Founder review |

## Specification basis

- INF-05 §§8–9 and §49: Next.js 16, React 19, TypeScript 5 strict mode, Tailwind CSS 4, pnpm, the root `src/` application layout and enforced import boundaries.
- INF-16 §34.1: FND-005 through FND-010 acceptance criteria for bootstrap, strict TypeScript, lint policy, source/module structure, route groups and import aliases.
- INF-18 §§38–46 and §106: targeted Next.js integration, exact Next.js 16.2.x pin, App Router, `src/`, flat-config ESLint, Tailwind, route-group skeleton, module convention and `@/*` alias.
- INF-18 §132: architecture evidence identifier `S1-ARCH-001`.

## Task acceptance evidence

| Task | Acceptance evidence | Status |
|---|---|---|
| FND-005 | Next.js `16.2.10`, React and App Router are installed in the existing root application; `pnpm build` passed. | Complete — pending review |
| FND-006 | `tsconfig.json` sets `strict: true`; `pnpm typecheck` passed. | Complete — pending review |
| FND-007 | Next.js 16 flat ESLint configuration and `eslint .` script are present; the final `pnpm lint` run passed with no warnings. | Complete — pending review |
| FND-008 | `src/app`, `src/lib` and `src/modules` establish the minimum required structure; the module convention prohibits empty pre-created domains and internal deep imports. | Complete — pending review |
| FND-009 | The prescribed public, auth, admin and portal route-group layout skeleton typechecked and built. Only the public `/` placeholder is routable in this increment; feature pages remain deferred. | Complete — pending review |
| FND-010 | `@/*` maps to `./src/*` and is exercised by imports from `@/lib/site`; typecheck and build passed. | Complete — pending review |

## Exact dependency baseline

### Runtime dependencies

| Package | Version | Reason |
|---|---:|---|
| `next` | `16.2.10` | Binding INF-18 16.2.x application framework patch. |
| `react` | `19.2.7` | Current React 19 patch compatible with Next.js `16.2.10`. |
| `react-dom` | `19.2.7` | React DOM version aligned exactly with React. |

### Development dependencies

| Package | Version | Reason |
|---|---:|---|
| `typescript` | `5.9.3` | Current TypeScript 5 patch for the binding strict-TypeScript baseline. |
| `eslint` | `9.39.5` | Supported ESLint 9 flat-config baseline. |
| `eslint-config-next` | `16.2.10` | Next.js, React, Core Web Vitals and TypeScript lint rules aligned with Next.js. |
| `tailwindcss` | `4.3.3` | Binding Tailwind CSS 4 baseline. |
| `@tailwindcss/postcss` | `4.3.3` | Official Tailwind 4 PostCSS integration for Next.js. |
| `@types/node` | `24.13.3` | Node.js 24 TypeScript declarations. |
| `@types/react` | `19.2.17` | React 19 TypeScript declarations. |
| `@types/react-dom` | `19.2.3` | React DOM 19 TypeScript declarations. |

All direct package versions are exact. The lockfile was generated and verified with pnpm `11.13.0` under Node `v24.18.0`.

## Dependency build-script policy

The first `pnpm install` resolved the intended graph but exited with `ERR_PNPM_IGNORED_BUILDS` because pnpm 11 defaults to rejecting unreviewed dependency lifecycle scripts. It identified:

- `sharp@0.34.5`, an optional Next.js dependency;
- `unrs-resolver@1.12.2`, used by the TypeScript ESLint import resolver.

The repository-level `pnpm-workspace.yaml` explicitly allows only those exact versions. It contains no `packages` declaration and does not create a monorepo. A second `pnpm install` ran the two reviewed scripts and passed. `dangerouslyAllowAllBuilds` is not enabled, so new or changed lifecycle-script packages remain blocked by default.

## Implemented foundation

- One root application using `src/`; no `apps/web` or workspace package tree.
- App Router only; no `pages/` directory.
- Root layout with an `en-GB` fallback document language and one semantic public placeholder page.
- Public, auth, admin and portal route-group layout skeletons without feature implementation.
- Strict TypeScript and the `@/*` import alias.
- Official Next.js 16 ESLint CLI/flat configuration.
- Tailwind CSS 4 PostCSS integration without visual-design or component-system work.
- A documented vertical-slice module convention without empty domain folders.
- No `middleware.ts` or `proxy.ts`; host/locale routing remains in the later market-routing scope.

## Verification outcomes

- Active branch before editing: `chore/nextjs-foundation`.
- Pre-change working tree: clean.
- Pre-change HEAD: `04932f82592c3d9a58ce067929881c45e7540c7d` (`chore(toolchain): pin Node 24 and pnpm 11`).
- Runtime: Node `v24.18.0`; pnpm `11.13.0`.
- `pnpm install --frozen-lockfile`: passed; lockfile already up to date.
- Initial `pnpm lint`: exited successfully with one warning for the anonymous PostCSS default export.
- Correction: named the PostCSS configuration object.
- Final `pnpm lint`: passed with no warnings.
- `pnpm typecheck`: passed.
- `pnpm build`: passed with Next.js `16.2.10`; `/` and `/_not-found` were statically generated.
- No specification, secret, credential, environment file, production deployment configuration or out-of-scope service integration was added.

No file was staged, committed or pushed. Founder review remains required before commit approval.
