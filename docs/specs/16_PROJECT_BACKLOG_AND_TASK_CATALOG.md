# InfraVolt — Project Backlog and Task Catalog

> Document ID: INF-16  
> Version: 0.1.0  
> Status: Draft for Founder, Product, Design, Engineering, QA, Content, Legal and Market Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Backlog Owner: Product Director / CTO / Head Agent  
> Parent documents: 00_MASTER_PROJECT_SPEC.md through 15_IMPLEMENTATION_ROADMAP_AND_DELIVERY_PLAN.md  
> Required markets: United Kingdom + Ukraine  
> Required public locales: en-GB + uk-UA  
> Delivery releases: R1 UK Public + Sales MVP, R2 Ukraine Public MVP, R3 Partner Portal MVP, R4 Evidence-led Operational V1  
> Planning unit: two-week sprint unless re-approved  
> Accessibility target: WCAG 2.2 Level AA  
> Last updated: 15 July 2026  
> Document language: Turkish; backlog IDs, states, roles, code identifiers and evidence names use English.

---

## 1. Belgenin Amacı

Bu belge 00–15 arasındaki product, design, architecture, data, workflow, admin, portal, security, content, QA, DevOps ve legal kararlarını yürütülebilir backlog’a dönüştürür.

Belge:

- epic ve task ID sistemini,
- release/sprint eşlemesini,
- bağımlılık ve blocker modelini,
- agent/human ownership sınırlarını,
- acceptance ve evidence kurallarını,
- R1, R2 ve R3 için uygulanabilir task catalog’unu,
- ilk execution queue’yu

tanımlar.

---

## 2. Ana Backlog Kararı

Backlog bir fikir deposu değildir.

Her active item:

- business/product outcome’a,
- approved release’e,
- requirement/doc reference’a,
- named owner’a,
- testable acceptance’a,
- evidence’a

bağlıdır.

Bu alanları olmayan iş implementation queue’ya alınmaz.

---

## 3. Backlog Hiyerarşisi

~~~text
Programme
  Release
    Epic
      Capability
        Story / Enabler
          Task
            Subtask
              Evidence
~~~

Task seviyesinden küçük işler yalnız execution sırasında açılır.

---

## 4. Source of Truth

Priority order:

1. Approved founder/legal decision
2. 00_MASTER_PROJECT_SPEC
3. Relevant 01–14 domain document
4. 15_IMPLEMENTATION_ROADMAP_AND_DELIVERY_PLAN
5. This backlog
6. Approved ADR/RFC
7. Current task brief
8. Code/tests

Backlog üst belgedeki kararı sessizce değiştiremez.

---

## 5. Backlog Item Types

| Type | Meaning |
|---|---|
| DEC | Founder/product/legal decision |
| EPIC | Multi-capability outcome |
| CAP | User/business capability |
| STORY | User-observable behavior |
| ENABLER | Architecture/platform prerequisite |
| TASK | Bounded implementation/review work |
| BUG | Expected behavior defect |
| RISK | Preventive/mitigating action |
| SPIKE | Time-boxed uncertainty reduction |
| APPROVAL | Formal sign-off |
| OPS | Operational action/runbook |

---

## 6. Task ID Standardı

Format:

~~~text
<WORKSTREAM>-<NNN>
~~~

Prefixes:

| Prefix | Workstream |
|---|---|
| GOV | Governance/decisions |
| FND | Repository/foundation |
| DSG | UX/design system |
| CNT | Content/product data/assets |
| DAT | Database/RLS/storage |
| BE | Backend/API/workflows |
| WEB | Public frontend |
| MAP | Application Map |
| FRM | Forms/Project List/email |
| ADM | Admin/sales operations |
| IAM | Auth/security/permissions |
| SEO | SEO/analytics/measurement |
| QA | Test/accessibility/performance |
| OPS | DevOps/observability/operations |
| LEG | Legal/privacy/compliance |
| UA | Ukraine market release |
| POR | Partner Portal |
| REL | Release/cutover/hypercare |
| DOC | Documentation/training |
| V1 | Evidence-led later scope |

---

## 7. Required Item Fields

Every item includes:

- ID
- title
- type
- outcome
- release
- target sprint/gate
- priority
- estimate
- owner
- dependencies
- document references
- acceptance criteria
- test/evidence
- status
- risk/security/privacy/accessibility notes

---

## 8. Backlog States

| State | Meaning |
|---|---|
| Idea | Unassessed |
| Discovery | Problem/option being clarified |
| Blocked | Cannot progress; dependency named |
| Ready | Definition of Ready passed |
| In Progress | One active owner |
| In Review | Code/content/design review |
| In Verification | QA/UAT/security/legal evidence |
| Done | Definition of Done passed |
| Released | Production/published |
| Deferred | Valid but outside current release |
| Rejected | Explicitly not pursued |

---

## 9. Priority

| Priority | Rule |
|---|---|
| P0 | Release safety/core purpose; blocks gate |
| P1 | High value; expected in release |
| P2 | Valuable improvement; may move without breaking release |
| P3 | Later enhancement |

Priority is not estimate.

---

## 10. MoSCoW

- Must: release purpose fails without it.
- Should: high value; remove only through approval.
- Could: capacity-dependent.
- Won’t now: explicitly excluded.

Every R1/R2/R3 item has both Priority and MoSCoW.

---

## 11. Estimate

| Size | Expected focused effort |
|---|---|
| XS | Under one day |
| S | One to two days |
| M | Three to five days |
| L | One to two weeks |
| XL | Must split before Ready |

Review/test/documentation included.

---

## 12. Release Labels

| Label | Meaning |
|---|---|
| R0 | Programme/foundation |
| R1 | UK Public + Sales MVP |
| R2 | Ukraine Public MVP |
| R3 | Partner Portal MVP |
| R4 | Evidence-led Operational V1 |
| ALL | Shared across releases |

---

## 13. Sprint Labels

| Sprint | Focus |
|---|---|
| S0 | Mobilisation |
| S1 | Repository/platform skeleton |
| S2 | Design system/shared layout |
| S3 | Content/markets/core data |
| S4 | Catalogue/documents |
| S5 | Application Map |
| S6 | Forms/Project List/email |
| S7 | Admin/sales operations |
| S8 | UK integration/hardening |
| S9 | UK launch |
| S10 | Ukraine content integration |
| S11 | Ukraine QA/hardening |
| S12 | Ukraine launch |
| S13 | Portal foundation |
| S14 | Portal workflows |
| S15 | Portal pilot |
| S16 | Portal production |

Target sprint is planning guidance; gate remains authoritative.

---

## 14. Gate Labels

- G0 Programme Ready
- G1 Foundation Ready
- G2 Experience Ready
- G3 Data/Workflow Ready
- G4 UK Public Ready
- G5 Sales Operations Ready
- G6 UK Launch Approved
- G7 Ukraine Launch Approved
- G8 Portal Pilot Ready
- G9 Portal Production Approved

---

## 15. Dependency Syntax

- none: no prerequisite
- ID: specific item
- Gx: gate
- decision: founder/legal/product choice
- external: provider/asset/content/vendor
- parallel: may progress concurrently

Dependency complete without evidence is not complete.

---

## 16. Blocker Record

Every blocker records:

- blocked item,
- blocker reason,
- owner,
- needed decision/input,
- due date,
- impact,
- workaround if safe,
- escalation level.

---

## 17. Definition of Ready

- outcome bounded
- owner assigned
- requirement/document references
- dependencies available
- design/content contract available
- acceptance testable
- security/privacy/accessibility considered
- estimate below XL
- allowed/protected files known

---

## 18. Definition of Done

- behavior complete
- acceptance pass
- review complete
- tests pass
- no unresolved P0/P1 defect
- accessibility/locale states covered
- authorization/privacy/logging correct
- docs/migrations updated
- preview/staging evidence
- owner/product/QA acceptance

---

## 19. Acceptance Criteria Style

Use observable rules:

~~~text
Given <context>
When <action>
Then <observable result>
And <security/accessibility/operational result>
~~~

Avoid “looks good”, “works correctly” and “complete” without definition.

---

## 20. Evidence Types

| Code | Evidence |
|---|---|
| E-CODE | Reviewed code/patch |
| E-TEST | Automated test result |
| E-UI | Screenshot/video/preview |
| E-A11Y | Accessibility evidence |
| E-SEC | Permission/RLS/security result |
| E-DATA | Migration/constraint/data proof |
| E-CONTENT | Approved content/source |
| E-LEGAL | Counsel/privacy approval |
| E-OPS | Runbook/monitor/restore proof |
| E-UAT | Business/market/pilot acceptance |

---

## 21. Ownership Rule

One task has one primary accountable executor.

Reviewers may be many; ownership cannot be “everyone”.

---

## 22. Human vs Agent Work

Agent-suitable:

- code/scaffold,
- test generation,
- structured migration draft,
- document/data transformation,
- validation/reporting,
- bounded UI implementation.

Human-required:

- founder commercial decisions,
- legal approval,
- licence authority,
- technical claim truth,
- native market approval,
- production go/no-go,
- customer/pilot coordination.

---

## 23. Agent Execution Rule

Each agent task includes:

- no more than one main outcome,
- relevant context pack,
- allowed files,
- protected files,
- acceptance/tests,
- handoff format.

Agent does not start the next task automatically unless assigned.

---

## 24. Review Levels

| Risk | Required review |
|---|---|
| Low | Peer/code or content review |
| Medium | Domain owner + QA |
| High | Domain + security/privacy/architecture |
| Legal/production | Counsel/Founder/Go-No-Go as applicable |

---

## 25. Backlog Change Control

Changes to Must/P0, release or gate require:

- reason,
- impact,
- dependency change,
- what leaves scope,
- owner approval,
- version/change log update if architectural.

---

## 26. Backlog Views

Maintain:

- Now
- Next
- Later
- Blocked
- By release
- By sprint
- By workstream
- By owner
- By gate
- By risk
- Decision queue

---

## 27. Now / Next / Later Rule

- Now: Ready items for current sprint.
- Next: Dependencies likely ready in one sprint.
- Later: Approved but not scheduled.

Only Now items may be In Progress.

---

## 28. Work-in-Progress Limits

Recommended per person/agent:

- one main implementation task,
- one review task,
- one small blocker-resolution item.

Starting more work does not increase finished work.

---

## 29. Backlog Metrics

- Ready depth
- cycle time
- blocker age
- review wait
- reopen rate
- escaped defects
- unplanned work
- decision lead time
- Must requirement coverage
- gate evidence completeness

---

## 30. Epic Catalog

| Epic | Outcome | Release |
|---|---|---|
| E01 | Programme governance and decisions | ALL |
| E02 | Engineering foundation | ALL |
| E03 | Design system and experience foundation | ALL |
| E04 | Market content/product data/assets | R1/R2 |
| E05 | Database, RLS and storage | ALL |
| E06 | Backend/business workflows | R1/R3 |
| E07 | UK public website | R1 |
| E08 | Application Map | R1/R2 |
| E09 | Forms, Project List and notification | R1/R2 |
| E10 | Admin and sales operations | R1 |
| E11 | Identity, security and privacy | ALL |
| E12 | SEO, analytics and measurement | R1/R2 |
| E13 | Quality and accessibility | ALL |
| E14 | DevOps and observability | ALL |
| E15 | Legal and compliance | R1/R2/R3 |
| E16 | Ukraine market release | R2 |
| E17 | Partner Portal | R3 |
| E18 | Release, training and operations | ALL |

---

## 31. Catalog Reading Rule

Task rows are executable backlog candidates.

Before Ready:

- owner name,
- exact repo files,
- exact document sections,
- detailed Given/When/Then,
- environment/test command

are added to the task brief.

---

## 32. GOV — Governance and Decisions

Primary owner: Founder + Product Director.

### 32.1 GOV Task Catalog

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| GOV-001 | Approve R1/R2/R3 scope boundaries | ALL/S0 | P0 | none | Signed scope; E-UAT |
| GOV-002 | Select delivery capacity scenario | ALL/S0 | P0 | budget/team | Named capacity; E-UAT |
| GOV-003 | Assign product/technical/backlog owner | ALL/S0 | P0 | none | Named accountable owners |
| GOV-004 | Assign UK sales/operations owner | R1/S0 | P0 | none | Owner and escalation published |
| GOV-005 | Assign Ukraine market reviewer | R2/S0 | P0 | none | Native reviewer confirmed |
| GOV-006 | Assign content/product-data owner | R1/S0 | P0 | none | Owner and workflow confirmed |
| GOV-007 | Confirm UK legal entity/model | R1/S0 | P0 | counsel | Decision record; E-LEGAL |
| GOV-008 | Confirm controller/privacy owner | ALL/S0 | P0 | GOV-007 | Controller record; E-LEGAL |
| GOV-009 | Confirm UK domain | R1/S0 | P0 | ownership | Domain decision |
| GOV-010 | Confirm Ukraine domain/entity presence | R2/S0 | P0 | counsel | Domain/legal decision; E-LEGAL |
| GOV-011 | Confirm Gersan commercial relationship | R1/S0 | P0 | external | Signed/approved record |
| GOV-012 | Confirm brand/document/image authority | R1/S0 | P0 | GOV-011 | Rights register |
| GOV-013 | Approve R1 industries/products | R1/S0 | P0 | sales/data | Priority list |
| GOV-014 | Approve R1 Application Map scenes | R1/S0 | P0 | assets | Scene list |
| GOV-015 | Approve dealer programme rules | R1/S0 | P1 | sales/legal | Review matrix |
| GOV-016 | Choose portal pilot companies | R3/S12 | P1 | R1 usage | Named pilot candidates |
| GOV-017 | Create RAID register | ALL/S0 | P0 | none | Register active |
| GOV-018 | Create decision log | ALL/S0 | P0 | none | DEL/GOV decisions tracked |
| GOV-019 | Create weekly status cadence | ALL/S0 | P1 | owners | Calendar/template accepted |
| GOV-020 | Establish scope change process | ALL/S0 | P0 | GOV-001 | Change template and authority |

---

## 33. GOV Exit Criteria

- GOV-001–014 resolved or explicitly accepted blocker.
- Named owners can review work.
- G0 evidence package complete.
- No engineer/agent must invent legal/entity/domain/product authority.

---

## 34. FND — Repository and Engineering Foundation

Primary owner: Head Agent / Architect.

### 34.1 Repository Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| FND-001 | Create/inspect canonical repository | ALL/S1 | P0 | GOV-003 | Controlled repo; E-CODE |
| FND-002 | Record existing changes and baseline | ALL/S1 | P0 | FND-001 | Clean ownership report |
| FND-003 | Pin Node.js 24 LTS | ALL/S1 | P0 | FND-001 | Local/CI same runtime |
| FND-004 | Pin pnpm 11 and lockfile | ALL/S1 | P0 | FND-001 | Reproducible install |
| FND-005 | Bootstrap Next.js/TypeScript | ALL/S1 | P0 | FND-003 | Build passes |
| FND-006 | Configure strict TypeScript | ALL/S1 | P0 | FND-005 | Typecheck pass |
| FND-007 | Configure lint/format policy | ALL/S1 | P1 | FND-005 | CI lint pass |
| FND-008 | Establish src/module structure | ALL/S1 | P0 | FND-005 | 05 architecture reflected |
| FND-009 | Create route-group skeleton | ALL/S1 | P0 | FND-008 | Public/auth/admin/portal routes build |
| FND-010 | Configure import aliases | ALL/S1 | P1 | FND-008 | No fragile deep imports |

### 34.2 Configuration and Context Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| FND-011 | Implement environment schema validation | ALL/S1 | P0 | FND-005 | Missing/invalid env fails safely |
| FND-012 | Create safe environment example | ALL/S1 | P0 | FND-011 | Names only; no secrets |
| FND-013 | Implement server-only boundary helpers | ALL/S1 | P0 | FND-008 | Client import test fails |
| FND-014 | Implement trusted host allowlist | ALL/S1 | P0 | GOV-009/010 | Unknown host rejected |
| FND-015 | Implement market context resolver | ALL/S1 | P0 | FND-014 | UK/UA context test |
| FND-016 | Implement locale configuration | ALL/S1 | P0 | FND-015 | en-GB/uk-UA contracts |
| FND-017 | Create feature-flag contract | ALL/S1 | P1 | FND-011 | Server-owned flags |
| FND-018 | Create common result/error types | ALL/S1 | P1 | FND-008 | Typed boundary pattern |
| FND-019 | Create request/correlation ID utility | ALL/S1 | P1 | FND-018 | Logs correlate without PII |
| FND-020 | Add root error/not-found/loading shells | ALL/S1 | P1 | FND-009 | Accessible safe states |

### 34.3 CI and Documentation Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| FND-021 | Add typecheck CI | ALL/S1 | P0 | FND-006 | Required check |
| FND-022 | Add lint CI | ALL/S1 | P1 | FND-007 | Required check |
| FND-023 | Add unit test runner | ALL/S1 | P0 | FND-005 | Sample test pass |
| FND-024 | Add production build CI | ALL/S1 | P0 | FND-005 | Build required |
| FND-025 | Add secret scanning baseline | ALL/S1 | P0 | FND-001 | Seed test detects secret |
| FND-026 | Create ADR directory/register | ALL/S1 | P1 | GOV-018 | First ADR recorded |
| FND-027 | Create contributor/task conventions | ALL/S1 | P1 | FND-001 | Agent/human guide |
| FND-028 | Add dependency approval policy | ALL/S1 | P1 | FND-026 | New major deps require ADR |
| FND-029 | Deploy minimal preview | ALL/S1 | P0 | OPS-001 | Preview URL and smoke proof |
| FND-030 | Produce G1 evidence package | ALL/S1 | P0 | FND-001–029 | G1 review complete |

---

## 35. FND Exit Criteria

- Fresh install, typecheck, unit test and build pass.
- Preview deploy works without production secrets/data.
- UK/UA trusted market context has automated tests.
- Architecture skeleton supports all future modules without feature implementation.

---

## 36. DSG — UX and Design System

Primary owner: UX/Design Lead.

### 36.1 Foundation Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DSG-001 | Confirm design direction and references | ALL/S2 | P0 | GOV-001 | Founder/product approval |
| DSG-002 | Implement color tokens | ALL/S2 | P0 | DSG-001 | Light-state contrast verified |
| DSG-003 | Implement typography tokens | ALL/S2 | P0 | DSG-001 | Locale-safe type scale |
| DSG-004 | Implement spacing/size/radius tokens | ALL/S2 | P0 | DSG-001 | Code tokens documented |
| DSG-005 | Implement elevation/border/motion tokens | ALL/S2 | P1 | DSG-001 | Reduced motion supported |
| DSG-006 | Decide font files/licence/loading | ALL/S2 | P0 | LEG-asset | Legal/performance evidence |
| DSG-007 | Build page container/grid | ALL/S2 | P0 | DSG-002–004 | Responsive QA |
| DSG-008 | Build icon policy/wrapper | ALL/S2 | P1 | asset audit | Accessible icon behavior |
| DSG-009 | Build image/media component policy | ALL/S2 | P1 | CNT-asset | Sizes/crops/alt behavior |
| DSG-010 | Create design QA viewport matrix | ALL/S2 | P1 | QA-setup | Viewport evidence |

### 36.2 Component Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DSG-011 | Button/link variants | ALL/S2 | P0 | DSG-002–005 | States/keyboard tests |
| DSG-012 | Input/textarea/select primitives | ALL/S2 | P0 | DSG-003–004 | Labels/errors/disabled |
| DSG-013 | Checkbox/radio/switch primitives | ALL/S2 | P0 | DSG-011 | Optional consent semantics |
| DSG-014 | Card/list-item primitives | ALL/S2 | P0 | DSG-007 | Responsive variants |
| DSG-015 | Badge/status primitives | ALL/S2 | P1 | DSG-002 | Non-color status cues |
| DSG-016 | Dialog/sheet/popover primitives | ALL/S2 | P1 | DSG-011 | Focus trap/escape |
| DSG-017 | Tabs/accordion primitives | ALL/S2 | P1 | DSG-011 | Keyboard semantics |
| DSG-018 | Table/data-list primitives | R1/S2 | P0 | DSG-007 | Mobile alternative |
| DSG-019 | Toast/alert/inline message | ALL/S2 | P0 | DSG-002 | Live-region behavior |
| DSG-020 | Skeleton/empty/error states | ALL/S2 | P0 | DSG-014 | Reusable accessible states |

### 36.3 Layout Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DSG-021 | Public header/navigation | R1/S2 | P0 | IA routes | Desktop/mobile/keyboard |
| DSG-022 | Public footer/legal/contact | R1/S2 | P0 | CNT contact | Market-aware rendering |
| DSG-023 | Breadcrumb pattern | R1/S2 | P1 | DSG-021 | Semantic/crawlable |
| DSG-024 | Public page templates | R1/S2 | P0 | DSG-007/021 | Core templates preview |
| DSG-025 | Admin app shell | R1/S2 | P0 | IAM shell | Desktop/mobile access |
| DSG-026 | Portal shell concept | R3/S2 | P2 | DSG-025 | Deferred reusable plan |
| DSG-027 | Form layout/error summary | R1/S2 | P0 | DSG-012/019 | Error focus tested |
| DSG-028 | Product/data density patterns | R1/S2 | P0 | DSG-014/018 | Long technical data tested |
| DSG-029 | Ukrainian length/Cyrillic stress test | R2/S2 | P0 | FND-016 | Layout resilience report |
| DSG-030 | Produce G2 design evidence | ALL/S2 | P0 | DSG-001–029 | Component/state audit |

---

## 37. DSG Exit Criteria

- Core components are coded, not only drawn.
- Keyboard/focus/error/reduced-motion states pass.
- en-GB and uk-UA text lengths fit defined templates.
- Public/admin teams can build without inventing new primitives.

---

## 38. CNT — Content, Product Data and Assets

Primary owner: Content/Product Data Lead.

### 38.1 Inventory and Governance Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| CNT-001 | Create content inventory | R1/S0 | P0 | GOV-006 | Source/status/owner register |
| CNT-002 | Create product/category inventory | R1/S0 | P0 | GOV-013 | Priority/data-gap register |
| CNT-003 | Create document inventory | R1/S0 | P0 | GOV-011 | Version/right/market register |
| CNT-004 | Create asset inventory | R1/S0 | P0 | GOV-012 | Source/licence/derivative |
| CNT-005 | Create claim evidence register | R1/S0 | P0 | LEG-claims | Claim/source/expiry |
| CNT-006 | Define content lifecycle | ALL/S3 | P0 | DAT content model | Draft/review/publish/archive |
| CNT-007 | Define content ownership | ALL/S0 | P0 | GOV-006 | Named reviewers |
| CNT-008 | Define source/provenance fields | ALL/S3 | P0 | DAT model | No untraceable technical fact |
| CNT-009 | Define editorial style en-GB | R1/S3 | P1 | brand | Style guide |
| CNT-010 | Define Ukrainian glossary | R2/S3 | P0 | GOV-005 | Approved termbase |

### 38.2 Corporate and Market Content Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| CNT-011 | Approve company proposition | R1/S3 | P0 | Founder | Homepage/about copy |
| CNT-012 | Approve UK contact/company data | R1/S3 | P0 | GOV-007 | Verified disclosures |
| CNT-013 | Author homepage content | R1/S3 | P0 | CNT-011 | Product/sales approval |
| CNT-014 | Author About content | R1/S3 | P1 | CNT-011 | Approved source |
| CNT-015 | Author contact/support content | R1/S3 | P0 | OPS routing | Correct channels |
| CNT-016 | Author dealer programme content | R1/S3 | P0 | GOV-015 | No automatic approval claim |
| CNT-017 | Author navigation/footer labels | R1/S2 | P0 | IA | UK labels approved |
| CNT-018 | Create trust/technical wording | R1/S3 | P1 | CNT-005 | Evidence-backed |
| CNT-019 | Create FAQs only from real questions | R1/S4 | P2 | sales | Approved factual answers |
| CNT-020 | Create page parity matrix | R2/S3 | P0 | IA | UK/UA page decisions |

### 38.3 Product and Document Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| CNT-021 | Normalize category taxonomy | R1/S3 | P0 | CNT-002 | Stable hierarchy |
| CNT-022 | Select R1 product records | R1/S3 | P0 | GOV-013 | Complete priority list |
| CNT-023 | Complete R1 product core fields | R1/S4 | P0 | CNT-022 | Required fields valid |
| CNT-024 | Complete technical attributes | R1/S4 | P0 | evidence | Technical review |
| CNT-025 | Link product media with rights | R1/S4 | P0 | CNT-004 | Licence evidence |
| CNT-026 | Link documents/products/markets | R1/S4 | P0 | CNT-003 | Applicability verified |
| CNT-027 | Mark document public/private | R1/S4 | P0 | LEG access | Access matrix |
| CNT-028 | Mark superseded/expired documents | R1/S4 | P0 | source | No stale public file |
| CNT-029 | Create product SEO fields | R1/S4 | P1 | SEO templates | Unique approved metadata |
| CNT-030 | Create missing-data escalation | ALL/S3 | P0 | CNT-002 | Unknown remains explicit |

### 38.4 Asset Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| CNT-031 | Extract uploaded Application Map archive | R1/S0 | P0 | uploaded archive | Safe inventory |
| CNT-032 | Review archive for duplicates/corruption | R1/S0 | P0 | CNT-031 | Review report |
| CNT-033 | Verify map asset source/licence | R1/S0 | P0 | GOV-012 | Publication authority |
| CNT-034 | Rename assets to project convention | R1/S3 | P1 | CNT-033 | Mapping manifest |
| CNT-035 | Create optimized derivatives | R1/S4 | P0 | CNT-034 | Size/quality report |
| CNT-036 | Define responsive crops/focal points | R1/S4 | P0 | CNT-035 | Viewport proof |
| CNT-037 | Identify text embedded in images | R2/S3 | P0 | CNT-031 | Translation risk list |
| CNT-038 | Author alt/purpose descriptions | R1/S4 | P0 | map/product context | A11y review |
| CNT-039 | Create asset expiry/withdrawal review | ALL/S4 | P1 | CNT-004 | Owner/cadence |
| CNT-040 | Produce content readiness dashboard | ALL/S3+ | P0 | CNT-001–039 | Gate-ready status |

---

## 39. CNT Exit Criteria

- No R1 product/document/map asset is published without owner/source/status.
- Required content exists before page acceptance.
- Ukraine terminology/parity work begins before UK launch.
- Content readiness is visible by gate.

---

## 40. DAT — Database, RLS and Storage

Primary owner: Database/Data Lead.

### 40.1 Database Foundation Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DAT-001 | Initialize local Supabase | ALL/S1 | P0 | FND repo | Local reset succeeds |
| DAT-002 | Create migration naming/order standard | ALL/S1 | P0 | DAT-001 | Documented convention |
| DAT-003 | Enable approved extensions | ALL/S1 | P1 | 06 decision | Migration test |
| DAT-004 | Create app/private schema boundaries | ALL/S1 | P0 | DAT-001 | Grants verified |
| DAT-005 | Create common enums/domains policy | ALL/S1 | P1 | 06 | Review accepted |
| DAT-006 | Create updated_at/audit helper | ALL/S1 | P1 | DAT-004 | Trigger tests |
| DAT-007 | Create generated type workflow | ALL/S1 | P0 | DAT-001 | CI detects drift |
| DAT-008 | Create seed architecture | ALL/S1 | P0 | DAT-001 | Synthetic deterministic seed |
| DAT-009 | Add database lint/advisor check | ALL/S3 | P1 | DAT migrations | Report in CI/staging |
| DAT-010 | Add migration reset/test CI | ALL/S3 | P0 | DAT-002/008 | Clean rebuild passes |

### 40.2 Market and Content Schema Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DAT-011 | Create markets/domains tables | ALL/S3 | P0 | FND-015 | Host maps to active market |
| DAT-012 | Create locales/currencies config | ALL/S3 | P0 | DAT-011 | UK/UA seed |
| DAT-013 | Create content page/version tables | R1/R2/S3 | P0 | CNT-006 | Market publication test |
| DAT-014 | Create navigation tables | R1/R2/S3 | P1 | DAT-013 | Locale order/visibility |
| DAT-015 | Create media/file metadata tables | ALL/S3 | P0 | CNT-004 | Provenance fields |
| DAT-016 | Create manufacturer/category tables | R1/S3 | P0 | CNT-021 | Constraints tested |
| DAT-017 | Create product core tables | R1/S3 | P0 | DAT-016 | Slug/publication unique rules |
| DAT-018 | Create product translation/market tables | R1/R2/S3 | P0 | DAT-017 | No silent fallback query |
| DAT-019 | Create product attributes/values | R1/S3 | P0 | DAT-017 | Type/unit validation |
| DAT-020 | Create product relation/media tables | R1/S3 | P1 | DAT-015/017 | Referential integrity |

### 40.3 Industry, Map and Document Schema Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DAT-021 | Create industry/translation tables | R1/R2/S3 | P0 | DAT-011 | Market publication |
| DAT-022 | Create solution/product mapping | R1/S3 | P0 | DAT-017/021 | Relation tests |
| DAT-023 | Create map scene/zone/hotspot tables | R1/S3 | P0 | DAT-021 | Coordinate constraints |
| DAT-024 | Create map locale labels | R1/R2/S3 | P0 | DAT-023 | Locale test |
| DAT-025 | Create resource/document tables | R1/S3 | P0 | DAT-015 | Version/status rules |
| DAT-026 | Create document-product/market links | R1/S3 | P0 | DAT-017/025 | Applicability test |
| DAT-027 | Create certificate/claim metadata | R1/S3 | P1 | CNT-005 | Expiry/source |
| DAT-028 | Create document access policy/grant | R1/R3/S3 | P0 | DAT-025 | Default private |
| DAT-029 | Create document access audit | R1/R3/S3 | P0 | DAT-028 | Download event record |
| DAT-030 | Create publication transaction/function | R1/R2/S4 | P0 | DAT-013/017/025 | Atomic publish tests |

### 40.4 Company, Lead and Quote Schema Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DAT-031 | Create companies/contacts | R1/S3 | P0 | market model | Dedup/link constraints |
| DAT-032 | Create customer projects | R1/S3 | P1 | DAT-031 | Company/project relation |
| DAT-033 | Create enquiries | R1/S3 | P0 | DAT-031 | Market/source/status |
| DAT-034 | Create quote requests | R1/S3 | P0 | DAT-031/032 | Required lifecycle fields |
| DAT-035 | Create quote line items | R1/S3 | P0 | DAT-017/034 | Snapshot/product rules |
| DAT-036 | Create dealer applications | R1/S3 | P0 | DAT-031 | State constraints |
| DAT-037 | Create internal notes | R1/S3 | P0 | DAT-033/034/036 | Authorship/audit |
| DAT-038 | Create assignment/status history | R1/S3 | P0 | lead tables | Transition evidence |
| DAT-039 | Create idempotency/rate-limit storage | R1/S3 | P0 | private schema | Expiry/unique tests |
| DAT-040 | Create notification outbox tables | R1/S3 | P0 | lead tables | Unique/retry state |

### 40.5 Identity, Audit and Policy Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DAT-041 | Create profiles/roles | ALL/S3 | P0 | auth contract | Least data |
| DAT-042 | Create company memberships | R3/S3 | P0 | DAT-031/041 | Scoped membership |
| DAT-043 | Create invitations | R3/S3 | P0 | DAT-042 | Token hash/expiry |
| DAT-044 | Create audit/security event tables | ALL/S3 | P0 | private schema | Tamper-aware append |
| DAT-045 | Create scheduled job records | ALL/S3 | P1 | OPS cron | Job status |
| DAT-046 | Implement public-content RLS | R1/R2/S3 | P0 | DAT content | Published market only |
| DAT-047 | Implement internal-admin RLS | R1/S3 | P0 | IAM roles | Role matrix tests |
| DAT-048 | Implement company/partner RLS | R3/S13 | P0 | DAT-042 | Cross-company denial |
| DAT-049 | Implement storage bucket policies | ALL/S3 | P0 | DAT-015/028 | Public/private tests |
| DAT-050 | Produce G3 database evidence | ALL/S3 | P0 | DAT-001–049 | Migrations/RLS suite |

---

## 41. DAT Exit Criteria

- Clean migration reset and seed pass.
- Generated types match schema.
- Public, admin and partner access is proven at database/storage layer.
- Core business transactions can be implemented without schema invention.

---

## 42. DAT Deferred Items

Defer to R4 unless evidence:

- advanced order/shipment tables,
- ERP sync tables,
- generic workflow engine,
- public API credentials,
- external search index tables,
- AI training/evaluation datasets,
- driver/fleet/dispatch schema.

---

## 43. Initial Backlog Count

Through DAT:

- GOV: 20
- FND: 30
- DSG: 30
- CNT: 40
- DAT: 50

Subtotal: 170 executable/decision items.

---

## 44. BE — Backend, API and Business Workflows

Primary owner: Backend Lead.

### 44.1 Backend Boundary Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| BE-001 | Create request-context contract | ALL/S3 | P0 | FND-015/019 | Market/actor/correlation tests |
| BE-002 | Create actor/session resolver | ALL/S3 | P0 | IAM auth | Anonymous/user/admin contexts |
| BE-003 | Create DAL/repository boundaries | ALL/S3 | P0 | FND-013/DAT types | No direct unsafe data access |
| BE-004 | Create service/use-case convention | ALL/S3 | P0 | BE-003 | Cross-module contract review |
| BE-005 | Implement common action result | ALL/S3 | P1 | FND-018 | Stable error/result types |
| BE-006 | Implement error taxonomy | ALL/S3 | P0 | BE-005 | Safe user vs internal messages |
| BE-007 | Implement server validation pattern | ALL/S3 | P0 | Zod contract | Client bypass fails safely |
| BE-008 | Implement pagination/filter/sort contract | R1/S3 | P1 | DAT indexes | Boundaries tested |
| BE-009 | Implement cache/revalidation helpers | R1/S3 | P1 | publication model | Market-safe invalidation |
| BE-010 | Implement DTO minimization | ALL/S3 | P0 | BE-003 | Private fields omitted |

### 44.2 Public Read Workflow Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| BE-011 | Read market-aware pages/navigation | R1/R2/S3 | P0 | DAT-013/014 | No cross-market fallback |
| BE-012 | Read published categories/products | R1/R2/S4 | P0 | DAT-016–020 | Market/locale tests |
| BE-013 | Read product detail/relations | R1/R2/S4 | P0 | BE-012 | DTO/query tests |
| BE-014 | Read industries/solutions | R1/R2/S4 | P0 | DAT-021/022 | Publication tests |
| BE-015 | Read map scenes/hotspots | R1/R2/S5 | P0 | DAT-023/024 | Stable ordered payload |
| BE-016 | Read public documents | R1/R2/S4 | P0 | DAT-025/026 | Private metadata excluded |
| BE-017 | Resolve private document entitlement | R1/R3/S4 | P0 | DAT-028/029 | Deny-by-default |
| BE-018 | Issue short-lived signed download | R1/R3/S4 | P0 | BE-017 | Audit + expiry test |
| BE-019 | Handle withdrawn/superseded document | R1/R2/S4 | P0 | DAT-025 | No stale access |
| BE-020 | Add safe not-found/redirect lookup | R1/R2/S4 | P1 | market/slug | No open redirect |

### 44.3 Submission Workflow Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| BE-021 | Implement idempotency service | R1/S6 | P0 | DAT-039 | Duplicate request one record |
| BE-022 | Implement rate-limit adapter | R1/S6 | P0 | DAT-039 | Abuse tests |
| BE-023 | Implement Turnstile verification adapter | R1/S6 | P0 | OPS keys | Server verification |
| BE-024 | Implement quote submission transaction | R1/S6 | P0 | DAT-031/034/035 | Atomic E-DATA |
| BE-025 | Implement enquiry submission | R1/S6 | P0 | DAT-033 | Persist before email |
| BE-026 | Implement dealer application submission | R1/S6 | P0 | DAT-036 | State/audit |
| BE-027 | Implement document request submission | R1/S6 | P1 | DAT-028 | Access decision |
| BE-028 | Implement free-text sanitization/minimization | R1/S6 | P0 | LEG policy | No HTML/log leakage |
| BE-029 | Implement consent/notice evidence fields | R1/R2/S6 | P0 | LEG semantics | Separate marketing status |
| BE-030 | Implement safe confirmation response | R1/R2/S6 | P0 | BE-024–027 | No record existence leakage |

### 44.4 Admin Workflow Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| BE-031 | Implement admin list queries | R1/S7 | P0 | DAT leads/IAM | Authorized filters |
| BE-032 | Implement assignment action | R1/S7 | P0 | DAT-038 | Audit/concurrency |
| BE-033 | Implement quote status transition | R1/S7 | P0 | state machine | Invalid transition rejected |
| BE-034 | Implement enquiry status transition | R1/S7 | P0 | state machine | History recorded |
| BE-035 | Implement dealer review transition | R1/S7 | P0 | DAT-036 | No automatic approval |
| BE-036 | Implement internal note create | R1/S7 | P0 | DAT-037 | Author/audit/access |
| BE-037 | Implement company/contact linking | R1/S7 | P1 | DAT-031 | Merge/dedup safe |
| BE-038 | Implement content draft/publish actions | R1/R2/S4 | P0 | DAT-030 | Approval and revalidation |
| BE-039 | Implement document version workflow | R1/S4 | P0 | DAT-025 | Withdraw/supersede |
| BE-040 | Implement safe export request | R1/S7 | P1 | LEG export | Authorization/audit |

### 44.5 Notification and Maintenance Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| BE-041 | Implement notification outbox writer | R1/S6 | P0 | DAT-040 | Same transaction as record |
| BE-042 | Implement Resend send adapter | R1/S6 | P0 | OPS email | Idempotent provider call |
| BE-043 | Implement retry/backoff/dead-letter state | R1/S6 | P0 | BE-042 | Failure recovery test |
| BE-044 | Implement signed webhook ingestion | R1/S6 | P0 | Resend secret | Replay/signature test |
| BE-045 | Implement delivery/bounce/complaint updates | R1/S6 | P1 | BE-044 | Outbox state accurate |
| BE-046 | Implement notification cron endpoint | R1/S6 | P0 | OPS cron auth | Unauthorized denied |
| BE-047 | Implement maintenance/retention job shell | ALL/S8 | P1 | LEG schedule | Dry-run/evidence |
| BE-048 | Implement health/readiness endpoint | ALL/S1 | P1 | OPS | No secret data |
| BE-049 | Implement structured safe logging | ALL/S3 | P0 | FND-019 | PII review |
| BE-050 | Produce backend contract test evidence | R1/S8 | P0 | BE-001–049 | Critical workflow suite |

---

## 45. BE Exit Criteria

- Business record commits before notification.
- Duplicate/retry behavior is deterministic.
- Backend rechecks market, actor, permission and input.
- Critical use cases have integration/contract evidence.

---

## 46. WEB — UK Public Frontend

Primary owner: Public Frontend Lead.

### 46.1 Public Shell Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| WEB-001 | Implement public root layout | R1/S2 | P0 | DSG-021/022 | Server-rendered shell |
| WEB-002 | Implement market-aware metadata shell | R1/R2/S2 | P0 | FND-015/SEO | Correct domain/locale |
| WEB-003 | Implement desktop navigation | R1/S2 | P0 | DSG-021/CNT labels | Keyboard/crawl proof |
| WEB-004 | Implement mobile navigation | R1/S2 | P0 | WEB-003 | Focus/escape/scroll |
| WEB-005 | Implement footer | R1/S2 | P0 | DSG-022/CNT-012 | Legal/company truth |
| WEB-006 | Implement breadcrumbs | R1/S3 | P1 | DSG-023 | Semantic structured path |
| WEB-007 | Implement global skip/landmarks | R1/S2 | P0 | DSG foundation | Keyboard proof |
| WEB-008 | Implement not-found page | R1/R2/S3 | P1 | FND-020 | Market-aware recovery |
| WEB-009 | Implement global error UI | R1/R2/S3 | P0 | FND-020 | Retry/correlation safe |
| WEB-010 | Implement loading/skeleton policy | R1/S3 | P1 | DSG-020 | No layout jump |

### 46.2 Corporate Page Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| WEB-011 | Build UK homepage | R1/S3 | P0 | CNT-013/DSG-024 | Responsive content-complete |
| WEB-012 | Build About page | R1/S3 | P1 | CNT-014 | Approved claims |
| WEB-013 | Build Contact page | R1/S3 | P0 | CNT-015/FRM | Correct routing |
| WEB-014 | Build Project Support page | R1/S6 | P0 | FRM support | Complete journey |
| WEB-015 | Build Dealer Programme page | R1/S6 | P0 | CNT-016/FRM | Human-review wording |
| WEB-016 | Build legal route templates | R1/R2/S8 | P0 | LEG docs | Version/effective date |
| WEB-017 | Build accessibility statement route | R1/R2/S8 | P0 | LEG/QA | Accurate current status |
| WEB-018 | Build generic content page template | R1/S3 | P1 | DAT content | Accessible headings/media |
| WEB-019 | Build CTA section patterns | R1/S3 | P1 | DSG | Correct intent links |
| WEB-020 | Add external-link behavior | R1/S3 | P1 | LEG policy | Accessible/security-safe |

### 46.3 Industry Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| WEB-021 | Build industries index | R1/S4 | P0 | BE-014/CNT | Filter/list responsive |
| WEB-022 | Build industry detail template | R1/S4 | P0 | WEB-021 | Solutions/products/docs |
| WEB-023 | Build solution cards | R1/S4 | P1 | DSG | Technical content resilient |
| WEB-024 | Build related-product sections | R1/S4 | P1 | BE-013/014 | Correct market data |
| WEB-025 | Build industry CTA/Project List entry | R1/S6 | P0 | FRM project list | Context carried safely |

### 46.4 Product Catalogue Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| WEB-026 | Build category/product index | R1/S4 | P0 | BE-012 | Crawlable/filterable |
| WEB-027 | Build product filter UI | R1/S4 | P1 | BE query | URL/state/accessibility |
| WEB-028 | Build product card | R1/S4 | P0 | DSG/CNT data | No unsupported claim |
| WEB-029 | Build product detail page | R1/S4 | P0 | BE-013 | Technical tables responsive |
| WEB-030 | Build product media gallery | R1/S4 | P1 | CNT rights | Keyboard/alt/performance |
| WEB-031 | Build technical attributes | R1/S4 | P0 | DAT attributes | Units/data semantics |
| WEB-032 | Build related products | R1/S4 | P1 | BE-013 | No cross-market leak |
| WEB-033 | Build product document section | R1/S4 | P0 | BE-016–019 | Public/private states |
| WEB-034 | Add product to Project List | R1/S6 | P0 | FRM list | Quantity/context accessible |
| WEB-035 | Build no-results/empty states | R1/S4 | P1 | DSG-020 | Helpful no invented content |

### 46.5 Technical Document Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| WEB-036 | Build resources index | R1/S4 | P0 | BE-016 | Type/product filters |
| WEB-037 | Build resource metadata display | R1/S4 | P0 | DAT/CNT | Version/date/market |
| WEB-038 | Build public download action | R1/S4 | P0 | BE-016 | Safe public URL policy |
| WEB-039 | Build controlled-access request | R1/S6 | P1 | BE-017/027 | Clear state/privacy |
| WEB-040 | Build withdrawn/unavailable state | R1/S4 | P0 | BE-019 | No broken/stale link |

### 46.6 Public Integration Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| WEB-041 | Add responsive image sizing | R1/S4 | P0 | CNT derivatives | Performance evidence |
| WEB-042 | Add route-level language attributes | R1/R2/S3 | P0 | FND locale | Screen-reader correct |
| WEB-043 | Add print/basic PDF-friendly styles | R1/S8 | P2 | core pages | Technical page usable |
| WEB-044 | Add browser/device fixes | R1/S8 | P0 | QA matrix | Supported matrix pass |
| WEB-045 | Run public frontend visual QA | R1/S8 | P0 | all public | E-UI/E-A11Y |
| WEB-046 | Remove placeholders/dev labels | R1/S8 | P0 | CNT ready | Audit zero findings |
| WEB-047 | Verify all CTA destinations | R1/S8 | P0 | route complete | Link/journey test |
| WEB-048 | Verify public errors disclose no internals | R1/S8 | P0 | BE errors | Security review |
| WEB-049 | Verify server-first/minimal JS | R1/S8 | P1 | performance | Route bundle report |
| WEB-050 | Produce G4 frontend evidence | R1/S8 | P0 | WEB-001–049 | G4 acceptance |

---

## 47. WEB Exit Criteria

- Core UK buyer/specifier journeys work without client-only dependence.
- Real approved content replaces placeholders.
- Technical data/media remain responsive and accessible.
- Public routes meet G4 and feed operational workflows.

---

## 48. MAP — Application Map

Primary owner: Application Map Frontend + Asset Lead.

### 48.1 Map Data and Asset Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| MAP-001 | Confirm R1 scenes/zones | R1/S0 | P0 | GOV-014 | Approved scene matrix |
| MAP-002 | Complete asset/licence audit | R1/S0 | P0 | CNT-031–033 | Publication approved |
| MAP-003 | Define scene/hotspot content contract | R1/S3 | P0 | DAT-023/024 | Typed contract |
| MAP-004 | Calibrate hotspot coordinates | R1/S5 | P0 | CNT-035/036 | Viewport coordinate proof |
| MAP-005 | Link hotspots to products/solutions | R1/S5 | P0 | DAT-022/023 | Technical review |
| MAP-006 | Create UK labels/descriptions | R1/S5 | P0 | CNT | Approved copy |
| MAP-007 | Create Ukraine labels/descriptions | R2/S10 | P0 | CNT-010/UA | Native review |
| MAP-008 | Prepare optimized image variants | R1/S4 | P0 | CNT-035 | Budgets met |
| MAP-009 | Define focal/crop metadata | R1/S4 | P0 | CNT-036 | Mobile/desktop proof |
| MAP-010 | Create equivalent list structure | R1/S5 | P0 | MAP-003 | Full non-map access |

### 48.2 Interaction Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| MAP-011 | Build scene selector | R1/S5 | P0 | BE-015 | Keyboard/URL/state |
| MAP-012 | Build responsive image stage | R1/S5 | P0 | MAP-008/009 | Reflow/performance |
| MAP-013 | Build hotspot component | R1/S5 | P0 | MAP-004 | Button semantics |
| MAP-014 | Build product/solution panel | R1/S5 | P0 | MAP-005 | Focus/close/state |
| MAP-015 | Build equivalent list navigation | R1/S5 | P0 | MAP-010 | Same destinations/content |
| MAP-016 | Implement selected/focus/hover states | R1/S5 | P0 | DSG tokens | Non-color and touch |
| MAP-017 | Implement deep-link behavior if approved | R1/S5 | P2 | route decision | Safe stable state |
| MAP-018 | Implement reduced-motion behavior | R1/S5 | P0 | DSG motion | OS preference test |
| MAP-019 | Implement empty/error fallback | R1/S5 | P0 | DSG-020 | List remains usable |
| MAP-020 | Add Project List action from panel | R1/S6 | P0 | FRM list | Correct product/context |

### 48.3 Map Quality Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| MAP-021 | Keyboard-only test | R1/S5 | P0 | MAP-011–020 | E-A11Y |
| MAP-022 | Screen-reader structure test | R1/S5 | P0 | MAP-010/015 | E-A11Y |
| MAP-023 | Touch/mobile test | R1/S5 | P0 | MAP-012–016 | E-UI |
| MAP-024 | Zoom/reflow test | R1/S5 | P0 | MAP-012 | 200/400% evidence |
| MAP-025 | Image weight/load test | R1/S5 | P0 | MAP-008 | Performance budget |
| MAP-026 | Cross-locale layout test | R2/S11 | P0 | MAP-007 | Cyrillic/no clipping |
| MAP-027 | Technical mapping review | R1/S5 | P0 | MAP-005 | Expert approval |
| MAP-028 | Claim/licence final review | R1/S8 | P0 | LEG/CNT | E-LEGAL/E-CONTENT |
| MAP-029 | Admin edit scope decision | R1/S4 | P1 | product | Build or defer recorded |
| MAP-030 | Produce Application Map release evidence | R1/S8 | P0 | MAP-001–029 | G4 bundle |

---

## 49. MAP Exit Criteria

- Map is not a screenshot containing UI.
- All hotspot destinations are available through equivalent list/navigation.
- Asset rights and product mapping are approved.
- Map does not prevent R1 if advanced editor/animation is deferred.

---

## 50. FRM — Forms, Project List and Email

Primary owner: Full-stack Forms/Workflow Lead.

### 50.1 Shared Form Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| FRM-001 | Build shared form wrapper | R1/S6 | P0 | DSG-027/BE-007 | Error summary/focus |
| FRM-002 | Build field schemas | R1/S6 | P0 | 01/07 contracts | Server/client aligned |
| FRM-003 | Build required/optional semantics | R1/S6 | P0 | LEG minimization | Labels/consequences |
| FRM-004 | Add privacy short notice | R1/R2/S6 | P0 | LEG approved copy | Notice version captured |
| FRM-005 | Add optional marketing consent | R1/R2/S6 | P1 | legal decision | Off by default/separate |
| FRM-006 | Integrate Turnstile | R1/S6 | P0 | BE-023 | Failure no record |
| FRM-007 | Add submit idempotency | R1/S6 | P0 | BE-021 | Double click one record |
| FRM-008 | Add accessible error handling | R1/S6 | P0 | DSG-019/027 | Keyboard/SR evidence |
| FRM-009 | Add safe success state | R1/S6 | P0 | BE-030 | No duplicate retry |
| FRM-010 | Add failure/retry state | R1/S6 | P0 | backend errors | User retains safe input |

### 50.2 Form Journey Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| FRM-011 | Build contact enquiry form | R1/S6 | P0 | BE-025 | DB/admin/email evidence |
| FRM-012 | Build project support form | R1/S6 | P0 | BE-025 | Type/routing captured |
| FRM-013 | Build dealer application | R1/S6 | P0 | BE-026/GOV-015 | Human review wording |
| FRM-014 | Build document request form | R1/S6 | P1 | BE-027 | Access decision evidence |
| FRM-015 | Build callback/general CTA form if approved | R1/S6 | P2 | product | Explicit outcome |
| FRM-016 | Localize UK form copy | R1/S6 | P0 | CNT | en-GB approved |
| FRM-017 | Localize Ukraine form copy | R2/S10 | P0 | UA content | uk-UA approved |
| FRM-018 | Add market/source attribution | R1/R2/S6 | P0 | FND-015 | Server-trusted value |
| FRM-019 | Add UTM/referrer minimization | R1/S6 | P1 | SEO/privacy | Allowlisted metadata |
| FRM-020 | Test duplicate/abuse/error paths | R1/S8 | P0 | FRM-001–019 | E2E/security proof |

### 50.3 Project List Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| FRM-021 | Define Project List client-state policy | R1/S4 | P0 | privacy/architecture | No PII/secret persist |
| FRM-022 | Add product to list | R1/S6 | P0 | WEB-034/MAP-020 | Quantity/dedupe |
| FRM-023 | Edit/remove list item | R1/S6 | P0 | FRM-022 | Keyboard/confirmation |
| FRM-024 | Build list review page/drawer | R1/S6 | P0 | DSG | Responsive accessible |
| FRM-025 | Build quote request details step | R1/S6 | P0 | BE-024 | Validation/notice |
| FRM-026 | Submit quote transaction | R1/S6 | P0 | BE-024/041 | DB/outbox atomically |
| FRM-027 | Clear list after confirmed success | R1/S6 | P0 | FRM-026 | Failure retains list |
| FRM-028 | Handle discontinued product | R1/S6 | P0 | product status | Clear user message |
| FRM-029 | Add market isolation to list | R1/R2/S6 | P0 | FND market | No mixed-market request |
| FRM-030 | E2E Project List to admin | R1/S8 | P0 | ADM queue | E-TEST/E-UAT |

### 50.4 Email Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| FRM-031 | Create transactional template system | R1/S6 | P0 | BE-041/042 | Typed market templates |
| FRM-032 | Create quote acknowledgement | R1/S6 | P0 | CNT/LEGAL | Correct non-binding copy |
| FRM-033 | Create contact/support acknowledgement | R1/S6 | P0 | CNT | Correct reply path |
| FRM-034 | Create dealer acknowledgement | R1/S6 | P0 | legal | No approval promise |
| FRM-035 | Create internal sales notification | R1/S6 | P0 | OPS routing | Minimal PII/safe links |
| FRM-036 | Create Ukraine template variants | R2/S10 | P0 | UA translation | Native review |
| FRM-037 | Verify sender authentication | R1/S8 | P0 | OPS email DNS | SPF/DKIM/DMARC proof |
| FRM-038 | Verify bounce/complaint handling | R1/S8 | P1 | BE-045 | Status/suppression |
| FRM-039 | Verify outbox retry alert | R1/S8 | P0 | OPS alert | Simulated failure |
| FRM-040 | Produce form/email release evidence | R1/S8 | P0 | FRM-001–039 | G4/G5 bundle |

---

## 51. FRM Exit Criteria

- Every submission persists before email.
- Marketing choice is separate and optional.
- Market, privacy notice and source semantics are recorded correctly.
- Sales can see failed/complete notification state.

---

## 52. ADM — Admin and Sales Operations

Primary owner: Admin Full-stack Lead + Sales Owner.

### 52.1 Admin Shell and Access Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| ADM-001 | Build protected admin layout | R1/S7 | P0 | IAM-roles/DSG-025 | Unauthorized denied |
| ADM-002 | Build admin navigation | R1/S7 | P0 | 08 IA | Permission-filtered |
| ADM-003 | Build admin dashboard summary | R1/S7 | P1 | BE list | Operational metrics |
| ADM-004 | Build global admin search scope | R1/S7 | P2 | DAT indexes | Authorized only |
| ADM-005 | Build safe session/error states | R1/S7 | P0 | IAM | No data flash/leak |
| ADM-006 | Add market filter/context | R1/R2/S7 | P0 | DAT market | UK/UA attribution |
| ADM-007 | Add role-aware action rendering | R1/S7 | P0 | IAM permission | Server recheck |
| ADM-008 | Add admin responsive baseline | R1/S7 | P1 | DSG-018/025 | Tablet/mobile key tasks |
| ADM-009 | Add audit context display | R1/S7 | P1 | DAT-044 | Authorized readable |
| ADM-010 | Add operational empty/loading/error states | R1/S7 | P0 | DSG-020 | Recovery paths |

### 52.2 Enquiry and Quote Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| ADM-011 | Build enquiry queue | R1/S7 | P0 | BE-031 | Sort/filter/pagination |
| ADM-012 | Build enquiry detail | R1/S7 | P0 | ADM-011 | PII role-restricted |
| ADM-013 | Build quote queue | R1/S7 | P0 | BE-031 | Status/owner/market |
| ADM-014 | Build quote detail/line items | R1/S7 | P0 | ADM-013 | Snapshot/context |
| ADM-015 | Build assignment action | R1/S7 | P0 | BE-032 | Concurrency/audit |
| ADM-016 | Build status transition control | R1/S7 | P0 | BE-033/034 | Valid states only |
| ADM-017 | Build internal notes | R1/S7 | P0 | BE-036 | Audit/no unsafe content |
| ADM-018 | Build company/contact links | R1/S7 | P1 | BE-037 | Correct relation |
| ADM-019 | Build notification delivery panel | R1/S7 | P0 | outbox | Retry/status visible |
| ADM-020 | Build duplicate handling workflow | R1/S7 | P1 | product rule | No data loss |

### 52.3 Dealer and Content Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| ADM-021 | Build dealer application queue | R1/S7 | P0 | BE-031/035 | Review status |
| ADM-022 | Build dealer detail/checklist | R1/S7 | P0 | GOV-015 | Evidence/reason fields |
| ADM-023 | Build approve/reject/needs-info actions | R1/S7 | P0 | BE-035 | No automatic user creation |
| ADM-024 | Build product draft list/editor minimum | R1/S4/7 | P1 | BE-038 | Validation/publication |
| ADM-025 | Build industry/map editor decision scope | R1/S4 | P2 | MAP-029 | Implement or defer |
| ADM-026 | Build document metadata/version admin | R1/S4/7 | P0 | BE-039 | Withdraw/supersede |
| ADM-027 | Build market publication controls | R1/R2/S7 | P0 | DAT-030 | Separate UK/UA state |
| ADM-028 | Build media/asset selector minimum | R1/S7 | P1 | CNT/DAT media | Rights/status visible |
| ADM-029 | Build claim/evidence warning display | R1/S7 | P1 | CNT-005 | Prevent unapproved publish |
| ADM-030 | Build preview link behavior | R1/R2/S7 | P1 | preview auth | No index/public leak |

### 52.4 Admin Operations and QA Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| ADM-031 | Define sales response SLA/status policy | R1/S0 | P0 | GOV-004 | Ops approval |
| ADM-032 | Configure assignment rules | R1/S7 | P0 | ADM-031 | Owner coverage |
| ADM-033 | Configure lead routing notifications | R1/R2/S7 | P0 | FRM email | Market/team correct |
| ADM-034 | Implement controlled CSV export if approved | R1/S7 | P2 | BE-040/LEG | Audit/minimization |
| ADM-035 | Test lower-role denial | R1/S8 | P0 | IAM/DAT RLS | E-SEC |
| ADM-036 | Test cross-market visibility | R1/R2/S8 | P0 | market policy | E-SEC |
| ADM-037 | Test concurrent assignment/status | R1/S8 | P0 | BE concurrency | E-TEST |
| ADM-038 | Run sales UAT | R1/S8 | P0 | ADM core | E-UAT |
| ADM-039 | Train admin/sales owners | R1/S9 | P0 | DOC guide | Attendance/scenario |
| ADM-040 | Produce G5 admin evidence | R1/S8 | P0 | ADM-001–039 | G5 approval |

---

## 53. ADM Exit Criteria

- Real submission is visible, assignable and auditable.
- Sales can distinguish database record from email status.
- Roles and RLS block unauthorized operations.
- Sales owner completes core journey UAT.

---

## 54. IAM — Authentication, Security and Permissions

Primary owner: Security-aware Auth Lead.

### 54.1 Identity Foundation Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| IAM-001 | Configure Supabase Auth per environment | ALL/S3 | P0 | DAT/OPS | Allowed redirects |
| IAM-002 | Implement SSR cookie clients | ALL/S3 | P0 | IAM-001 | Server/client/session tests |
| IAM-003 | Implement session refresh/proxy | ALL/S3 | P0 | IAM-002 | Expiry/recovery |
| IAM-004 | Implement profile resolution | ALL/S3 | P0 | DAT-041 | Disabled/missing safe |
| IAM-005 | Implement role/membership resolver | ALL/S3 | P0 | DAT-041/042 | Matrix tests |
| IAM-006 | Implement permission service | ALL/S3 | P0 | IAM-005 | Default deny |
| IAM-007 | Protect admin routes | R1/S7 | P0 | IAM-006 | Direct URL denied |
| IAM-008 | Protect portal routes | R3/S13 | P0 | IAM-006 | Company scope |
| IAM-009 | Add safe return-path handling | ALL/S3 | P0 | auth routes | No open redirect |
| IAM-010 | Add logout/revocation behavior | ALL/S3 | P0 | IAM-002 | Session invalidated |

### 54.2 Authentication Journey Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| IAM-011 | Build admin sign-in | R1/S7 | P0 | IAM-001–009 | Accessible/errors safe |
| IAM-012 | Build forgot-password | R1/S7 | P0 | email auth | Anti-enumeration |
| IAM-013 | Build reset-password | R1/S7 | P0 | IAM-012 | Token/expiry |
| IAM-014 | Build expired/invalid-link states | ALL/S7 | P0 | IAM-012/013 | Recovery |
| IAM-015 | Configure privileged MFA | R1/S8 | P0 | provider plan | Admin coverage |
| IAM-016 | Build portal invitation acceptance | R3/S13 | P0 | DAT-043 | Hash/expiry/company |
| IAM-017 | Build first-login/onboarding | R3/S13 | P0 | IAM-016 | Terms/profile |
| IAM-018 | Build portal sign-in/recovery | R3/S13 | P0 | IAM-011–014 | Portal copy/host |
| IAM-019 | Build account-disabled state | ALL/S7 | P0 | IAM-004 | No data exposure |
| IAM-020 | Build session-expired recovery | ALL/S7 | P0 | IAM-003 | Unsaved-safe behavior |

### 54.3 Security Control Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| IAM-021 | Create threat model | ALL/S1 | P0 | architecture | Reviewed threats |
| IAM-022 | Configure security headers | R1/S1/8 | P0 | FND | Header test |
| IAM-023 | Define CSP strategy | R1/S1/8 | P1 | dependencies | Report-only/enforce decision |
| IAM-024 | Implement origin/CSRF controls | ALL/S6 | P0 | backend boundaries | Attack tests |
| IAM-025 | Implement safe CORS policy | ALL/S6 | P0 | route catalog | Deny unintended origins |
| IAM-026 | Add dependency vulnerability process | ALL/S1 | P0 | CI | SLA/report |
| IAM-027 | Add secret scanning/rotation runbook | ALL/S1 | P0 | FND-025 | Simulated finding |
| IAM-028 | Add upload security decision/control | R1/S6 | P0 conditional | product/security | Off or quarantined safely |
| IAM-029 | Add audit event taxonomy | ALL/S3 | P0 | DAT-044 | Critical events recorded |
| IAM-030 | Add privileged access review | ALL/S8+ | P0 | named users | Approval record |

### 54.4 Authorization Verification Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| IAM-031 | Test anonymous/public matrix | R1/S8 | P0 | DAT RLS | E-SEC |
| IAM-032 | Test admin role matrix | R1/S8 | P0 | ADM/IAM | E-SEC |
| IAM-033 | Test disabled/revoked user | R1/R3/S8/15 | P0 | IAM-010/019 | Immediate denial |
| IAM-034 | Test cross-company portal matrix | R3/S14 | P0 | DAT-048 | E-SEC |
| IAM-035 | Test storage public/private matrix | R1/R3/S8/14 | P0 | DAT-049 | E-SEC |
| IAM-036 | Test signed URL expiry/replay | R1/R3/S8/14 | P0 | BE-018 | E-SEC |
| IAM-037 | Test invite token expiry/reuse | R3/S13 | P0 | IAM-016 | E-SEC |
| IAM-038 | Test auth enumeration responses | R1/R3/S8 | P0 | auth journeys | E-SEC |
| IAM-039 | Run pre-launch security review | R1/S8 | P0 | IAM core | Findings closed |
| IAM-040 | Produce security gate evidence | ALL/gates | P0 | IAM-001–039 | G6/G8/G9 bundle |

---

## 55. IAM Exit Criteria

- UI, server, database and storage enforce compatible authorization.
- Privileged users use approved MFA.
- Cross-company access is explicitly tested, not assumed.
- Security review findings have owner/severity/disposition.

---

## 56. Running Backlog Count

Added:

- BE: 50
- WEB: 50
- MAP: 30
- FRM: 40
- ADM: 40
- IAM: 40

Running total: 420 items.

---

## 57. SEO — SEO, Analytics and Measurement

Primary owner: SEO/Measurement Lead.

### 57.1 Technical SEO Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| SEO-001 | Define URL/slug register | R1/R2/S3 | P0 | IA/market | Stable unique paths |
| SEO-002 | Implement metadata templates | R1/R2/S3 | P0 | WEB/CNT | Title/description coverage |
| SEO-003 | Implement canonical rules | R1/R2/S3 | P0 | domains | Self/market correct |
| SEO-004 | Implement hreflang pairs | R2/S10 | P0 | UA parity | Reciprocal valid pairs |
| SEO-005 | Implement XML sitemaps by domain | R1/R2/S8 | P0 | publication | Only approved URLs |
| SEO-006 | Implement robots policy | R1/R2/S8 | P0 | env/domain | Preview/private blocked |
| SEO-007 | Implement noindex for preview/draft/auth | ALL/S3 | P0 | routes | Crawler test |
| SEO-008 | Implement breadcrumb structured data | R1/R2/S4 | P1 | WEB-006 | Valid truthful markup |
| SEO-009 | Implement organization/product schema policy | R1/R2/S4 | P1 | LEG claims | Valid factual fields |
| SEO-010 | Implement 404/redirect map | R1/R2/S8 | P0 | legacy URLs | No chains/loops |

### 57.2 Content SEO Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| SEO-011 | Create UK keyword/topic map | R1/S3 | P1 | product/industry | Intent-page mapping |
| SEO-012 | Create Ukraine search-term map | R2/S10 | P1 | native reviewer | Ukrainian intent map |
| SEO-013 | Review headings/internal links | R1/R2/S8/11 | P0 | content complete | Crawl report |
| SEO-014 | Review product metadata uniqueness | R1/R2/S4/10 | P1 | CNT-029 | Duplicate report |
| SEO-015 | Review image alt/index policy | R1/R2/S4 | P1 | CNT-038 | Purpose-appropriate |
| SEO-016 | Review document indexing policy | R1/R2/S4 | P0 | LEG/doc access | Private files excluded |
| SEO-017 | Build related content link rules | R1/R2/S4 | P1 | data relations | Useful/non-spam |
| SEO-018 | Create launch crawl checklist | R1/R2/S8 | P0 | SEO core | Repeatable checklist |
| SEO-019 | Configure Search Console properties | R1/R2/S9/12 | P1 | domain access | Ownership verified |
| SEO-020 | Create post-launch index report | R1/R2/S9+ | P1 | launch | Errors/actions |

### 57.3 Measurement Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| SEO-021 | Define business questions | R1/S3 | P0 | Product/Sales | Approved questions |
| SEO-022 | Define event dictionary | R1/R2/S3 | P0 | 11 spec | Names/properties/owners |
| SEO-023 | Complete analytics legal/provider decision | R1/S8 | P0 | LEG/privacy | On/off/provider record |
| SEO-024 | Implement consent-aware loader if approved | R1/S8 | P1 | SEO-023 | No pre-consent optional call |
| SEO-025 | Implement page/view events | R1/R2/S8 | P1 | SEO-022/024 | No PII |
| SEO-026 | Implement product/map events | R1/R2/S8 | P1 | SEO-022 | Market attribution |
| SEO-027 | Implement form funnel events | R1/R2/S8 | P1 | FRM | No field values/PII |
| SEO-028 | Implement operational conversion metrics | R1/S7 | P0 | DB/admin | Server/database truth |
| SEO-029 | Exclude test/internal traffic | R1/R2/S8 | P1 | provider | Verified filter |
| SEO-030 | Validate event payload privacy | R1/R2/S8/11 | P0 | privacy | Payload audit |

---

## 58. SEO Exit Criteria

- Both market domains expose correct crawl/index signals.
- Private/draft/admin/portal data is not indexed.
- Measurement cannot leak form/product-list PII.
- Optional analytics remains disabled until approved.

---

## 59. QA — Testing, Accessibility and Performance

Primary owner: QA/Accessibility Lead.

### 59.1 Test Foundation Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| QA-001 | Create test strategy | ALL/S0 | P0 | roadmap | Approved matrix |
| QA-002 | Define supported browser/device matrix | ALL/S0 | P0 | audience | Current matrix |
| QA-003 | Configure Vitest | ALL/S1 | P0 | FND-023 | CI pass |
| QA-004 | Configure React Testing Library | ALL/S1 | P0 | QA-003 | Accessible query pattern |
| QA-005 | Configure Playwright | ALL/S1 | P0 | preview/local | Smoke test |
| QA-006 | Configure database integration tests | ALL/S3 | P0 | DAT local | Isolated/resettable |
| QA-007 | Create synthetic fixtures/personas | ALL/S3 | P0 | DAT seed | UK/UA/roles/company |
| QA-008 | Create test ID/selectors policy | ALL/S1 | P1 | components | User-centric first |
| QA-009 | Add test result artifacts | ALL/S1 | P1 | CI | Traces/screens on fail |
| QA-010 | Create defect template/triage | ALL/S0 | P1 | governance | Severity/repro/evidence |

### 59.2 Accessibility Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| QA-011 | Create WCAG 2.2 AA requirement matrix | ALL/S1 | P0 | 12 | Owner/test mapping |
| QA-012 | Add automated accessibility checks | ALL/S2 | P1 | QA-005 | Critical routes |
| QA-013 | Test landmarks/headings/skip links | R1/R2/S8/11 | P0 | WEB | Manual/automated |
| QA-014 | Test keyboard/focus | ALL/S2+ | P0 | components/features | E-A11Y |
| QA-015 | Test forms/errors/live regions | R1/R2/S6/11 | P0 | FRM | E-A11Y |
| QA-016 | Test dialogs/sheets/navigation | ALL/S2/8 | P0 | DSG/WEB | E-A11Y |
| QA-017 | Test Map equivalent interaction | R1/R2/S5/11 | P0 | MAP | E-A11Y |
| QA-018 | Test tables/admin responsive alternatives | R1/S7/8 | P0 | ADM | E-A11Y |
| QA-019 | Test zoom/reflow/text spacing | R1/R2/S8/11 | P0 | public/portal | E-A11Y |
| QA-020 | Test contrast/non-color states | ALL/S2/8 | P0 | DSG | Contrast evidence |
| QA-021 | Test reduced motion | ALL/S2/5 | P0 | DSG/MAP | Preference evidence |
| QA-022 | Test screen reader critical journeys | R1/R2/R3 | P0 | features ready | Manual evidence |
| QA-023 | Test uk-UA language/Cyrillic | R2/S11 | P0 | UA | Native/accessibility |
| QA-024 | Produce accessibility statement inputs | R1/R2/S8/11 | P0 | audit | Accurate limitations |
| QA-025 | Conduct pre-launch accessibility review | R1/R2/R3 | P0 | release candidate | Findings disposition |

### 59.3 Functional and Non-functional Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| QA-026 | Unit-test market resolver | ALL/S1 | P0 | FND-015 | Host matrix |
| QA-027 | Unit-test permission helpers | ALL/S3 | P0 | IAM-006 | Role matrix |
| QA-028 | Integration-test RLS/storage | ALL/S3/14 | P0 | DAT policies | E-SEC |
| QA-029 | Integration-test quote transaction | R1/S6 | P0 | BE-024 | Atomic/duplicate |
| QA-030 | Integration-test outbox/retry | R1/S6/8 | P0 | BE-041–046 | Provider failure |
| QA-031 | E2E product to quote | R1/R2/S8/11 | P0 | WEB/FRM/ADM | Critical journey |
| QA-032 | E2E map to product/list | R1/R2/S8/11 | P0 | MAP | Critical journey |
| QA-033 | E2E dealer application/review | R1/S8 | P0 | FRM/ADM | Human workflow |
| QA-034 | E2E private document access | R1/R3/S8/14 | P0 | BE/IAM | Entitlement/expiry |
| QA-035 | E2E admin assignment/status | R1/S8 | P0 | ADM | Audit/concurrency |
| QA-036 | E2E Ukraine domain isolation | R2/S11 | P0 | UA | No UK fallback |
| QA-037 | E2E portal cross-company denial | R3/S14 | P0 | POR/IAM | E-SEC |
| QA-038 | Run performance budgets | R1/R2/R3 | P0 | release candidate | CWV/bundle/image |
| QA-039 | Run exploratory regression | R1/R2/R3 | P0 | release candidate | Session notes |
| QA-040 | Produce gate quality evidence | ALL/gates | P0 | QA-001–039 | QA sign-off |

---

## 60. QA Exit Criteria

- Must/P0 requirements map to tests/evidence.
- Automated checks complement, not replace, manual accessibility/exploration.
- Critical business and permission paths pass in release-like environment.
- Known limitations are documented and approved.

---

## 61. OPS — DevOps, Observability and Operations

Primary owner: DevOps/Platform Lead.

### 61.1 Account and Environment Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| OPS-001 | Create/confirm Vercel team/project | ALL/S1 | P0 | GOV ownership | InfraVolt-controlled access |
| OPS-002 | Configure Git deployment integration | ALL/S1 | P0 | FND repo | Preview/main behavior |
| OPS-003 | Configure preview environment | ALL/S1 | P0 | OPS-001 | Protected/non-indexed |
| OPS-004 | Configure staging environment | ALL/S3 | P0 | Supabase staging | Production-like |
| OPS-005 | Configure production environment | R1/S8 | P0 | G5 | Isolated access |
| OPS-006 | Create environment inventory | ALL/S1 | P0 | providers | Owner/purpose/data |
| OPS-007 | Configure environment variables | ALL/S1+ | P0 | FND schema | Scope validation |
| OPS-008 | Configure access/MFA for providers | ALL/S0 | P0 | accounts | Named least privilege |
| OPS-009 | Create break-glass/recovery procedure | ALL/S8 | P1 | OPS-008 | Tested custody |
| OPS-010 | Configure budget/usage alerts | ALL/S3 | P1 | provider plans | Alert recipients |

### 61.2 Domain and Provider Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| OPS-011 | Register/verify UK domain control | R1/S0/8 | P0 | GOV-009 | Ownership/renewal |
| OPS-012 | Register/verify Ukraine domain control | R2/S0/10 | P0 | GOV-010 | Eligibility/ownership |
| OPS-013 | Configure Cloudflare/DNS | R1/R2/S8/10 | P0 | OPS domains | DNS authority documented |
| OPS-014 | Configure TLS/domain in Vercel | R1/R2/S8/10 | P0 | OPS-013 | HTTPS/redirect proof |
| OPS-015 | Configure corporate/sender email domain | R1/S6 | P0 | GOV provider | Inbox ownership |
| OPS-016 | Configure Resend | R1/S6 | P0 | OPS-015 | Environment keys |
| OPS-017 | Configure SPF/DKIM/DMARC | R1/S6/8 | P0 | OPS-015/016 | Verification report |
| OPS-018 | Configure Turnstile environments | R1/S6 | P0 | Cloudflare | Test/prod key separation |
| OPS-019 | Configure Supabase local/staging/prod | ALL/S1/3/8 | P0 | data region/plan | Isolation proof |
| OPS-020 | Configure storage buckets/limits | ALL/S3 | P0 | DAT-049 | Policy/size/type |

### 61.3 CI/CD and Database Operations Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| OPS-021 | Protect main/release permissions | ALL/S1 | P0 | repo host | Required reviews/checks |
| OPS-022 | Configure CI required checks | ALL/S1 | P0 | FND CI | Merge blocked on fail |
| OPS-023 | Create migration deployment process | ALL/S3 | P0 | DAT | Staging-before-prod |
| OPS-024 | Create rollback/forward-fix process | ALL/S3 | P0 | OPS-023 | Rehearsed |
| OPS-025 | Configure production deploy approval | R1/S8 | P0 | owner | Named approver |
| OPS-026 | Create release tagging/versioning | ALL/S8 | P1 | repo | Traceable release |
| OPS-027 | Verify backup/PITR target | R1/S8 | P0 | founder/provider | Capability evidence |
| OPS-028 | Conduct restore exercise | R1/S8 | P0 | OPS-027 | Timed successful restore |
| OPS-029 | Create content/data seed/import runbook | R1/R2/S8/10 | P0 | CNT/DAT | Repeatable |
| OPS-030 | Create deployment smoke suite | ALL/S8 | P0 | QA | Automatic/manual proof |

### 61.4 Observability and Incident Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| OPS-031 | Configure structured runtime logs | ALL/S1/3 | P0 | BE-049 | PII reviewed |
| OPS-032 | Configure deployment/runtime alerts | ALL/S8 | P0 | Vercel | Tested routing |
| OPS-033 | Monitor form/quote success/failure | R1/R2/S6/8 | P0 | DB/events | Dashboard/alert |
| OPS-034 | Monitor outbox backlog/failure | R1/R2/S6/8 | P0 | BE-043 | Simulated alert |
| OPS-035 | Monitor auth/permission anomaly | ALL/S8/14 | P1 | audit | Threshold/owner |
| OPS-036 | Monitor cron/maintenance jobs | ALL/S8 | P0 | BE-046/047 | Missed job alert |
| OPS-037 | Configure uptime/synthetic checks | R1/R2/R3 | P0 | domains/routes | Public/form/portal |
| OPS-038 | Create incident response runbook | ALL/S8 | P0 | LEG/security | Roles/severity/contact |
| OPS-039 | Conduct incident tabletop | R1/S8 | P0 | OPS-038 | Action report |
| OPS-040 | Produce DevOps/observability gate evidence | ALL/gates | P0 | OPS-001–039 | G1/G6/G7/G9 |

---

## 62. OPS Exit Criteria

- InfraVolt controls accounts/domains/recovery.
- Environments/data/secrets are isolated.
- Backup, restore, deploy and rollback have evidence.
- Alerts reach a named person with a runbook.

---

## 63. LEG — Legal, Privacy and Compliance

Primary owner: Founder-appointed counsel/privacy lead.

### 63.1 Entity and Publication Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| LEG-001 | Confirm exact legal entities/disclosures | R1/R2/S0 | P0 | GOV-007/010 | Counsel approval |
| LEG-002 | Confirm controller/contact | ALL/S0 | P0 | LEG-001 | Privacy owner/contact |
| LEG-003 | Draft/approve UK Terms | R1/S8 | P0 | product model | Published version |
| LEG-004 | Draft/approve UK Privacy Notice | R1/S8 | P0 | data inventory | Published version |
| LEG-005 | Draft/approve UK Cookie Notice | R1/S8 | P0 | cookie audit | Published version |
| LEG-006 | Draft/approve Accessibility Statement | R1/S8 | P0 | QA audit | Accurate version |
| LEG-007 | Draft/approve Ukrainian legal set | R2/S10/11 | P0 | local counsel | uk-UA publication |
| LEG-008 | Define legal version/publication evidence | ALL/S8 | P0 | DAT content | Effective/history |
| LEG-009 | Approve form short notices | R1/R2/S6/10 | P0 | workflows | Market copy |
| LEG-010 | Approve dealer/portal terms scope | R1/R3/S6/13 | P0 | programme rules | Separate acceptance |

### 63.2 Privacy Operations Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| LEG-011 | Complete data inventory/RoPA | ALL/S3 | P0 | system map | Approved register |
| LEG-012 | Complete lawful-basis matrix | ALL/S3 | P0 | purposes | UK/UA review |
| LEG-013 | Correct notice/terms/marketing semantics | ALL/S3/6 | P0 | DAT/FRM | Separate fields |
| LEG-014 | Complete processor/subprocessor register | ALL/S3 | P0 | providers | Contracts/status |
| LEG-015 | Complete transfer assessment/safeguards | ALL/S3/8 | P0 | provider regions | Counsel/privacy approval |
| LEG-016 | Approve cookie/storage audit | R1/R2/S8/11 | P0 | implementation | Category/consent evidence |
| LEG-017 | Approve retention schedule | ALL/S8 | P0 | data inventory | Owner/period/action |
| LEG-018 | Create rights request runbook | ALL/S8 | P0 | data capabilities | Intake/search/export/delete |
| LEG-019 | Create breach notification runbook | ALL/S8 | P0 | OPS incident | UK/UA counsel path |
| LEG-020 | Test privacy rights/deletion path | ALL/S8 | P1 | system ready | Tabletop/evidence |

### 63.3 Product/IP/Trade Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| LEG-021 | Approve Gersan trademark/content licence | R1/S0 | P0 | GOV-011/012 | Signed authority |
| LEG-022 | Approve map/icon/image licences | R1/S0/4 | P0 | CNT register | Rights evidence |
| LEG-023 | Review technical claim register | R1/R2/S4/10 | P0 | CNT-005 | Wording/evidence |
| LEG-024 | Review GB conformity wording | R1/S4/8 | P0 | product matrix | Product-specific approval |
| LEG-025 | Review Ukraine conformity wording | R2/S10/11 | P0 | local rules/evidence | Market approval |
| LEG-026 | Define document access/use terms | R1/R3/S4/13 | P0 | rights owner | Download wording |
| LEG-027 | Review sanctions/export/end-use process | R1/R2/S7/10 | P0 | sales/dealer | Due-diligence control |
| LEG-028 | Review dealer anti-bribery/competition | R1/R3/S7/13 | P0 | dealer rules | Approved process |
| LEG-029 | Approve no-binding-quote wording | R1/R2/S6/10 | P0 | quote workflow | UI/email/terms aligned |
| LEG-030 | Produce legal launch evidence | R1/R2/R3 gates | P0 | LEG-001–029 | G6/G7/G8/G9 |

---

## 64. LEG Exit Criteria

- Legal pages reflect real entity, data and product behavior.
- Privacy Notice is not a forced consent checkbox.
- Marketing, cookies, transfers, retention and rights are operational.
- Product/IP/claim authority is evidenced before publication.

---

## 65. UA — Ukraine Market Release

Primary owner: Ukraine Market Lead + Product.

### 65.1 Ukraine Foundation Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| UA-001 | Confirm Ukraine domain/market model | R2/S0 | P0 | GOV-010/LEG-001 | Approved decision |
| UA-002 | Configure Ukraine trusted host | R2/S10 | P0 | OPS-012/FND-014 | Server context test |
| UA-003 | Configure uk-UA default locale | R2/S10 | P0 | FND-016 | No English default |
| UA-004 | Complete page parity matrix | R2/S3/10 | P0 | CNT-020 | Include/exclude reasons |
| UA-005 | Finalize Ukrainian glossary | R2/S3/10 | P0 | CNT-010 | Native/technical approval |
| UA-006 | Define UA contact/lead routing | R2/S10 | P0 | Founder/Ops | Named inbox/owner |
| UA-007 | Define UA commercial CTA | R2/S10 | P0 | sales | Truthful action |
| UA-008 | Define UA product availability | R2/S10 | P0 | product/sales | Market publication matrix |
| UA-009 | Define UA conformity/claim matrix | R2/S10 | P0 | LEG-025 | Product-level record |
| UA-010 | Configure Ukraine feature flag | R2/S10 | P0 | FND-017 | Off until G7 |

### 65.2 Translation and Content Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| UA-011 | Translate corporate pages | R2/S10 | P0 | UK source approved | Native review |
| UA-012 | Translate navigation/footer/CTA | R2/S10 | P0 | UA glossary | UI preview |
| UA-013 | Translate industry content | R2/S10 | P0 | product priority | Technical review |
| UA-014 | Translate product core content | R2/S10 | P0 | R1 products | Technical review |
| UA-015 | Translate attributes/units labels | R2/S10 | P0 | data model | Consistent terminology |
| UA-016 | Translate document metadata | R2/S10 | P0 | document applicability | No false availability |
| UA-017 | Translate Application Map labels | R2/S10 | P0 | MAP-007 | Native/technical |
| UA-018 | Translate forms/error/success copy | R2/S10 | P0 | FRM-017 | Full state coverage |
| UA-019 | Translate transactional emails | R2/S10 | P0 | FRM-036 | Native/legal |
| UA-020 | Publish Ukrainian legal pages | R2/S10/11 | P0 | LEG-007 | Version evidence |

### 65.3 Ukraine Implementation and QA Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| UA-021 | Render Ukraine homepage/routes | R2/S10 | P0 | UA content | Correct domain/content |
| UA-022 | Enforce no silent content/legal fallback | R2/S10 | P0 | DAT/BE | Missing content blocks |
| UA-023 | Configure UA metadata/canonical/hreflang | R2/S10 | P0 | SEO | Reciprocal tests |
| UA-024 | Configure UA sitemap/robots | R2/S10/11 | P0 | SEO/flag | Approved URLs only |
| UA-025 | Configure UA form attribution/routing | R2/S10 | P0 | UA-006/FRM | DB/admin/email proof |
| UA-026 | Validate Cyrillic/layout/text length | R2/S11 | P0 | DSG/QA | E-UI/E-A11Y |
| UA-027 | Validate market data isolation/cache | R2/S11 | P0 | BE/DAT | No UK leak |
| UA-028 | Run native reviewer UAT | R2/S11 | P0 | candidate | E-UAT |
| UA-029 | Run Ukraine legal/claim approval | R2/S11 | P0 | LEG | E-LEGAL |
| UA-030 | Produce G7 Ukraine evidence | R2/S11 | P0 | UA-001–029 | G7 approval |

---

## 66. UA Exit Criteria

- Ukraine is a real market publication, not an English fallback.
- Domain, content, contact, legal, forms, SEO and claims are aligned.
- Native reviewer and counsel approve applicable scope.
- Release remains disabled until G7.

---

## 67. POR — Partner Portal

Primary owner: Portal Full-stack Lead.

### 67.1 Portal Scope and Foundation Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| POR-001 | Reconfirm R3 MVP scope | R3/S12 | P0 | R1 usage/GOV | Approved Must list |
| POR-002 | Select pilot companies/users | R3/S12 | P0 | GOV-016 | Named participants |
| POR-003 | Confirm protected host/URL | R3/S12 | P0 | architecture/domain | Security decision |
| POR-004 | Confirm portal roles/capabilities | R3/S12 | P0 | 09/10 | Matrix approved |
| POR-005 | Confirm company data ownership | R3/S12 | P0 | legal/sales | Role map |
| POR-006 | Confirm MFA/session policy | R3/S12 | P0 | security | Approved control |
| POR-007 | Confirm Portal Terms/privacy | R3/S12 | P0 | LEG-010 | Version/acceptance |
| POR-008 | Prepare pilot synthetic/company data | R3/S13 | P0 | DAT | Approved safe data |
| POR-009 | Create portal feature flag/company allowlist | R3/S13 | P0 | FND flags | Closed by default |
| POR-010 | Produce portal threat model update | R3/S13 | P0 | IAM-021 | Company/file threats |

### 67.2 Portal Shell and Account Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| POR-011 | Build protected portal layout | R3/S13 | P0 | IAM-008/DSG | Auth/company context |
| POR-012 | Build portal navigation | R3/S13 | P0 | 09 routes | Role-aware |
| POR-013 | Build dashboard | R3/S14 | P1 | read models | Safe summary |
| POR-014 | Build account/profile | R3/S13 | P0 | IAM profile | Allowed fields |
| POR-015 | Build company summary | R3/S14 | P0 | DAT company | Company scope |
| POR-016 | Build onboarding/terms acknowledgement | R3/S13 | P0 | IAM-017/LEG | Separate privacy notice |
| POR-017 | Build session-expired/error states | R3/S13 | P0 | IAM-020 | Safe recovery |
| POR-018 | Build notification preferences | R3/S14 | P1 | data/legal | Operational vs marketing |
| POR-019 | Build support entry | R3/S14 | P0 | backend | Company/context |
| POR-020 | Build responsive portal shell | R3/S13 | P0 | DSG | Mobile key tasks |

### 67.3 Portal Quote and Project Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| POR-021 | Build company-scoped quote list | R3/S14 | P0 | DAT-048/BE | No cross-company |
| POR-022 | Build quote detail | R3/S14 | P0 | POR-021 | Partner-safe fields |
| POR-023 | Build partner status labels | R3/S14 | P0 | state mapping | No internal status leak |
| POR-024 | Build quote file/proposal area if approved | R3/S14 | P1 | document grant | Secure access |
| POR-025 | Build project list/detail | R3/S14 | P1 | customer projects | Company scope |
| POR-026 | Build new quote request entry | R3/S14 | P1 | FRM/BE | Company attribution |
| POR-027 | Build safe activity timeline | R3/S14 | P1 | audit/read model | Partner-safe only |
| POR-028 | Define order visibility as deferred/limited | R3/S12 | P0 | R4 decision | No fake order module |
| POR-029 | Add portal empty/loading/error states | R3/S14 | P0 | DSG-020 | Accessible |
| POR-030 | Test quote/project company isolation | R3/S14 | P0 | IAM/QA | E-SEC |

### 67.4 Portal Document and Team Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| POR-031 | Build controlled document library | R3/S14 | P0 | BE-017/018 | Entitled only |
| POR-032 | Build document filters/search | R3/S14 | P1 | query/index | Bound and accessible |
| POR-033 | Build secure download interaction | R3/S14 | P0 | signed URL | Expiry/audit |
| POR-034 | Build withdrawn/expired grant state | R3/S14 | P0 | document policy | No stale download |
| POR-035 | Build team list | R3/S14 | P1 | membership | Company scope |
| POR-036 | Build invite teammate if approved | R3/S14 | P1 | role policy | Authority/expiry |
| POR-037 | Build revoke teammate | R3/S14 | P0 if team enabled | membership | Immediate denial |
| POR-038 | Build company-change request | R3/S14 | P2 | ops process | Human review |
| POR-039 | Audit portal data/download actions | R3/S14 | P0 | DAT audit | Event verification |
| POR-040 | Test revoke/expired/private document paths | R3/S14 | P0 | POR core | E-SEC/E-TEST |

### 67.5 Portal Pilot and Release Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| POR-041 | Prepare pilot agreement/communication | R3/S15 | P0 | LEG/Founder | Approved communication |
| POR-042 | Invite pilot users | R3/S15 | P0 | G8 | Named accounts only |
| POR-043 | Train pilot users/support | R3/S15 | P0 | DOC | Completion |
| POR-044 | Monitor pilot access/errors | R3/S15 | P0 | OPS | Daily review |
| POR-045 | Collect structured feedback | R3/S15 | P0 | pilot | Findings register |
| POR-046 | Close P0/P1 pilot defects | R3/S15 | P0 | POR-045 | Zero blockers |
| POR-047 | Conduct access review | R3/S15 | P0 | pilot data | E-SEC |
| POR-048 | Test offboarding/revocation | R3/S15 | P0 | IAM/POR | Immediate denial |
| POR-049 | Approve staged production rollout | R3/S16 | P0 | G9 evidence | Founder/Product/Security |
| POR-050 | Produce portal G8/G9 evidence | R3/S15/16 | P0 | POR-001–049 | Release approval |

---

## 68. POR Exit Criteria

- Portal is company-scoped and deny-by-default.
- Pilot precedes general rollout.
- Revocation and private document expiry are proven.
- Orders/advanced collaboration are not simulated if not implemented.

---

## 69. REL — Release, Cutover and Hypercare

Primary owner: Product Director + DevOps + QA.

### 69.1 UK Release Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| REL-001 | Create UK release scope manifest | R1/S8 | P0 | backlog | Included/deferred list |
| REL-002 | Freeze UK release candidate | R1/S8 | P0 | G4/G5 | Version recorded |
| REL-003 | Complete UK regression | R1/S8 | P0 | QA | Pass report |
| REL-004 | Complete UK legal/content approval | R1/S8 | P0 | LEG/CNT | E-LEGAL/E-CONTENT |
| REL-005 | Complete UK security/privacy approval | R1/S8 | P0 | IAM/LEG | E-SEC/E-LEGAL |
| REL-006 | Complete UK accessibility/performance approval | R1/S8 | P0 | QA | E-A11Y/test |
| REL-007 | Complete UK SEO crawl review | R1/S8 | P0 | SEO | Crawl evidence |
| REL-008 | Rehearse migration/deploy/rollback | R1/S8 | P0 | OPS | Timed rehearsal |
| REL-009 | Conduct UK go/no-go | R1/S9 | P0 | G6 evidence | Recorded approval |
| REL-010 | Launch UK production | R1/S9 | P0 | REL-009 | Smoke/monitoring |

### 69.2 Ukraine Release Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| REL-011 | Create Ukraine scope/parity manifest | R2/S10 | P0 | UA-004 | Included/excluded |
| REL-012 | Freeze Ukraine release candidate | R2/S11 | P0 | UA content | Version |
| REL-013 | Complete Ukraine regression | R2/S11 | P0 | QA-036 | Pass report |
| REL-014 | Complete native/legal/claim approval | R2/S11 | P0 | UA/LEG | Approval |
| REL-015 | Complete domain/SEO/routing validation | R2/S11 | P0 | OPS/SEO/FRM | Evidence |
| REL-016 | Conduct Ukraine go/no-go | R2/S12 | P0 | G7 | Recorded approval |
| REL-017 | Launch Ukraine production | R2/S12 | P0 | REL-016 | Smoke/monitoring |
| REL-018 | Monitor no-fallback/market isolation | R2/S12 | P0 | launch | Hypercare report |
| REL-019 | Submit/validate Ukraine sitemap | R2/S12 | P1 | SEO | Search Console |
| REL-020 | Close Ukraine hypercare | R2/S12+ | P1 | issue review | Acceptance report |

### 69.3 Portal and Operational Release Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| REL-021 | Conduct portal G8 go/no-go | R3/S15 | P0 | POR-050 | Pilot approval |
| REL-022 | Enable portal pilot | R3/S15 | P0 | REL-021 | Allowlist only |
| REL-023 | Conduct portal G9 go/no-go | R3/S16 | P0 | pilot closure | Recorded approval |
| REL-024 | Stage portal company rollout | R3/S16 | P0 | REL-023 | Controlled enablement |
| REL-025 | Verify post-release access review | R3/S16 | P0 | rollout | E-SEC |
| REL-026 | Run daily hypercare triage | ALL/launch | P0 | each launch | Issue log |
| REL-027 | Verify no unattended failed leads | R1/R2/launch | P0 | OPS monitor | Daily evidence |
| REL-028 | Publish release notes | ALL/launch | P1 | DOC | Approved notes |
| REL-029 | Conduct post-launch review | ALL/post | P1 | metrics/feedback | Actions/R4 evidence |
| REL-030 | Close release and hand to operations | ALL/post | P0 | DOC/OPS | Handoff accepted |

---

## 70. REL Exit Criteria

- Each release has immutable scope/evidence/approval record.
- Migration, rollback, monitoring and support are ready.
- Hypercare confirms leads, access and market behavior.
- Operations formally accepts ownership.

---

## 71. DOC — Documentation and Training

Primary owner: Head Agent + Domain Owners.

### 71.1 Documentation Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DOC-001 | Create repository setup guide | ALL/S1 | P0 | FND | Fresh setup tested |
| DOC-002 | Create environment/secret guide | ALL/S1 | P0 | OPS/FND | No values exposed |
| DOC-003 | Maintain ADR register | ALL/continuous | P0 | decisions | Current decisions |
| DOC-004 | Create migration/seed guide | ALL/S3 | P0 | DAT/OPS | Dry-run by second person |
| DOC-005 | Create content publication guide | R1/R2/S4/10 | P0 | CNT/ADM | Market workflow |
| DOC-006 | Create product/document evidence guide | R1/R2/S4 | P0 | CNT/LEG | Source/expiry |
| DOC-007 | Create admin sales handbook | R1/S8 | P0 | ADM | UAT-reviewed |
| DOC-008 | Create dealer review handbook | R1/S8 | P0 | ADM/GOV | Human decision |
| DOC-009 | Create portal admin/support handbook | R3/S15 | P0 | POR | Pilot-reviewed |
| DOC-010 | Create SEO/content checklist | R1/R2/S8/11 | P1 | SEO | Used in release |
| DOC-011 | Create accessibility maintenance guide | ALL/S8 | P1 | QA | Component/content rules |
| DOC-012 | Create privacy rights/retention guide | ALL/S8 | P0 | LEG | Tabletop tested |
| DOC-013 | Create incident/rollback runbooks | ALL/S8 | P0 | OPS/LEG | Exercise evidence |
| DOC-014 | Create known limitations register | ALL/gates | P0 | QA/Product | Approved risks |
| DOC-015 | Create support ownership directory | ALL/S8 | P0 | owners | Contacts/escalation |

### 71.2 Training Tasks

| ID | Task | Rel/Sprint | Pri | Depends | Acceptance/Evidence |
|---|---|---|---|---|---|
| DOC-016 | Train Founder/Sales on lead/quote | R1/S8/9 | P0 | ADM | Scenario completion |
| DOC-017 | Train content team | R1/S4/8 | P0 | ADM content | Draft/publish exercise |
| DOC-018 | Train document/product owner | R1/S4/8 | P0 | evidence workflow | Version/withdraw exercise |
| DOC-019 | Train Ukraine market reviewer | R2/S10 | P0 | UA workflow | Approval exercise |
| DOC-020 | Train privacy owner | ALL/S8 | P0 | LEG runbooks | Rights/breach tabletop |
| DOC-021 | Train production release owners | ALL/S8 | P0 | OPS runbooks | Deploy/rollback |
| DOC-022 | Train admin account owner | R1/S8 | P0 | IAM | Invite/revoke/MFA |
| DOC-023 | Train portal support | R3/S15 | P0 | POR | Access/support scenario |
| DOC-024 | Record training attendance/evidence | ALL/gates | P1 | sessions | Completion register |
| DOC-025 | Produce operations handoff package | ALL/post | P0 | DOC-001–024 | Owner acceptance |

---

## 72. DOC Exit Criteria

- A second authorized person can operate critical workflows.
- Setup/deploy/migration/incident steps are reproducible.
- Sales/content/privacy/support ownership is documented.
- Known limitations are visible, not hidden.

---

## 73. V1 — Deferred Evidence-led Backlog

Primary owner: Product Director.

| ID | Candidate | Rel | Pri now | Trigger |
|---|---|---|---|---|
| V1-001 | Quote PDF generation | R4 | P3 | Sales need/manual cost |
| V1-002 | Order records/milestones | R4 | P3 | Won quote operations |
| V1-003 | Dispatch/delivery tracking | R4 | P3 | Volume/process evidence |
| V1-004 | Supplier request workflow | R4 | P3 | Repeated supplier coordination |
| V1-005 | Advanced admin reporting | R4 | P3 | Named decisions/KPIs |
| V1-006 | External search engine | R4 | P3 | Measured discovery failure |
| V1-007 | ERP integration | R4 | P3 | System/contract/ROI |
| V1-008 | CRM integration | R4 | P3 | Duplication/ownership evidence |
| V1-009 | Product comparison | R4 | P3 | User research |
| V1-010 | Document update subscriptions | R4 | P3 | Partner demand/legal model |
| V1-011 | Advanced portal team management | R4 | P3 | Pilot demand |
| V1-012 | Partner quote messaging | R4 | P3 | Operational workflow |
| V1-013 | 3D Application Map | R4 | P3 | Demonstrated conversion value |
| V1-014 | BIM/Revit delivery workflow | R4 | P3 | Asset availability/demand |
| V1-015 | Public integration API | R4 | P3 | Contracted partner need |
| V1-016 | Advanced analytics warehouse | R4 | P3 | Data volume/decisions |
| V1-017 | AI content assistance | R4 | P3 | Governance + non-technical scope |
| V1-018 | AI recommendation | R4 | P3 | Data/evaluation/safety evidence |
| V1-019 | SaaS multi-tenant commercialisation | Separate | P3 | Business validation |
| V1-020 | Driver/dispatch/mobile modules | Separate | P3 | Separate product approval |

---

## 74. Complete Catalog Count

| Workstream | Items |
|---|---:|
| GOV | 20 |
| FND | 30 |
| DSG | 30 |
| CNT | 40 |
| DAT | 50 |
| BE | 50 |
| WEB | 50 |
| MAP | 30 |
| FRM | 40 |
| ADM | 40 |
| IAM | 40 |
| SEO | 30 |
| QA | 40 |
| OPS | 40 |
| LEG | 30 |
| UA | 30 |
| POR | 50 |
| REL | 30 |
| DOC | 25 |
| V1 | 20 |
| **Total** | **715** |

The total is a catalog, not a commitment to run 715 tickets unchanged. Items are refined/split/merged during sprint planning while IDs/traceability remain controlled.

---

## 75. R1 Must Workstreams

R1 production cannot launch without Must items from:

- GOV
- FND
- DSG
- CNT
- DAT
- BE
- WEB
- MAP
- FRM
- ADM
- IAM
- SEO
- QA
- OPS
- LEG
- REL
- DOC

UA and POR tasks do not block R1 except shared architecture decisions.

---

## 76. R2 Must Workstreams

R2 requires:

- stable R1 shared platform,
- UA tasks,
- Ukrainian CNT/WEB/MAP/FRM variants,
- SEO market-domain work,
- QA localization/isolation,
- LEG Ukrainian publication,
- OPS domain/routing/monitoring,
- REL Ukraine gate.

---

## 77. R3 Must Workstreams

R3 requires:

- stable identity/company/data foundation,
- IAM company-scope security,
- POR tasks,
- private document workflow,
- QA cross-company tests,
- LEG portal terms/data roles,
- OPS portal monitoring,
- pilot and staged release.

---

## 78. Critical Path Task Chain

~~~mermaid
flowchart TD
    G["GOV-001–014"] --> F["FND-001–030"]
    F --> D["DAT/DSG Foundation"]
    D --> C["CNT + WEB Catalogue"]
    C --> Q["FRM + BE Quote"]
    Q --> A["ADM Sales Operations"]
    A --> H["QA/IAM/LEG/OPS Hardening"]
    H --> R["REL-010 UK Launch"]
~~~

---

## 79. R2 Parallel Path

~~~mermaid
flowchart TD
    T["CNT-010 Glossary"] --> P["UA-004 Parity"]
    P --> U["UA-011–020 Content"]
    U --> I["UA-021–027 Integration"]
    I --> V["UA-028/029 Approval"]
    V --> L["REL-017 Ukraine Launch"]
~~~

---

## 80. R3 Portal Path

~~~mermaid
flowchart TD
    S["POR-001–010 Scope/Security"] --> A["IAM + DAT Company Scope"]
    A --> W["POR-011–040 Workflows"]
    W --> P["POR-041–048 Pilot"]
    P --> G["G9 Approval"]
    G --> R["POR/REL Production Rollout"]
~~~

---

## 81. Sprint 0 Ready Queue

Recommended immediate Now:

1. GOV-001
2. GOV-002
3. GOV-003
4. GOV-004
5. GOV-005
6. GOV-006
7. GOV-007
8. GOV-008
9. GOV-009
10. GOV-010
11. GOV-011
12. GOV-012
13. GOV-013
14. GOV-014
15. GOV-017
16. GOV-018
17. CNT-001
18. CNT-002
19. CNT-003
20. CNT-004
21. CNT-005
22. CNT-031
23. CNT-032
24. CNT-033
25. QA-001
26. QA-002
27. IAM-021
28. OPS-008
29. OPS-011
30. OPS-012

---

## 82. Sprint 1 Ready Candidates

After G0:

- FND-001–030
- DAT-001–010
- OPS-001–007
- OPS-019/021/022
- QA-003–005/008/009
- IAM-022/026/027
- DOC-001–003

No feature-page flood before foundation preview.

---

## 83. Sprint 2 Ready Candidates

- DSG-001–030
- WEB-001–010 where inputs ready
- FND state refinement
- QA-011/012/014/020/021
- CNT-017
- UA/CNT glossary/parity parallel

---

## 84. Sprint 3 Ready Candidates

- DAT-011–050
- BE-001–016
- CNT-006–030
- WEB-011–020/021 templates
- SEO-001–003/007/011/021/022
- LEG-011–015
- OPS staging/migration

---

## 85. Sprint 4 Ready Candidates

- catalogue/document data and UI
- WEB-021–040
- BE-012–020/038/039
- CNT product/document/asset completion
- MAP asset preparation
- ADM content/document minimum
- SEO product/document controls
- QA component/data integration

---

## 86. Sprint 5 Ready Candidates

- MAP-001–030
- DAT/BE map integration
- Application Map QA/accessibility/performance
- content technical review
- Project List entry integration preparation

---

## 87. Sprint 6 Ready Candidates

- BE-021–030/041–046
- FRM-001–040
- Project List/quote
- Turnstile/rate limit/idempotency
- email/provider/DNS
- privacy/form legal review
- E2E persistence/outbox

---

## 88. Sprint 7 Ready Candidates

- ADM-001–040
- BE-031–040
- IAM admin journeys/roles
- sales routing/SLA
- operational metrics
- admin/permission/database tests

---

## 89. Sprint 8 Ready Candidates

- full R1 regression
- QA/IAM/LEG/SEO/OPS gate tasks
- content/claim/legal sign-off
- performance/accessibility
- restore/rollback/incident rehearsal
- training/runbooks
- REL-001–008

---

## 90. Sprint 9 Ready Candidates

- REL-009/010
- production smoke
- hypercare
- lead/outbox monitoring
- Search Console/sitemap
- defect lane
- post-launch review start

---

## 91. Sprint 10–12 Ready Candidates

- UA-001–030
- Ukraine variants from CNT/WEB/MAP/FRM/SEO/LEG/OPS
- QA localization/isolation
- REL-011–020
- Ukraine hypercare.

---

## 92. Sprint 13–16 Ready Candidates

- POR-001–050
- IAM portal journey/security
- DAT company RLS
- BE portal actions
- QA portal/cross-company
- LEG portal terms/data role
- OPS monitoring
- REL-021–025
- DOC portal support/training.

---

## 93. Gate G0 Evidence Items

- GOV-001–014
- GOV-017–020
- named roles
- domain/entity/Gersan/asset decisions
- initial RAID
- capacity scenario
- R1 content/product/map priorities

---

## 94. Gate G1 Evidence Items

- FND-001–030
- DAT-001–010
- OPS preview/CI
- QA foundation
- IAM threat/security baseline
- setup/ADR docs

---

## 95. Gate G2 Evidence Items

- DSG-001–030
- responsive/keyboard/locale evidence
- public/admin templates
- design/code parity
- component state inventory

---

## 96. Gate G3 Evidence Items

- DAT-011–050
- BE core boundaries
- RLS/storage tests
- seed/generated types
- business transaction contracts
- content/publication model.

---

## 97. Gate G4 Evidence Items

- WEB core
- MAP core
- catalogue/documents
- FRM public journeys
- real UK content
- legal routes
- public accessibility/performance/SEO.

---

## 98. Gate G5 Evidence Items

- ADM core
- BE admin actions
- IAM admin permissions/MFA
- sales UAT
- notification failure visibility
- operational handbook.

---

## 99. Gate G6 Evidence Items

- REL-001–009
- QA-040
- IAM-040
- OPS-040
- LEG-030 UK
- SEO crawl
- backup/restore/rollback
- Founder go/no-go.

---

## 100. Gate G7 Evidence Items

- UA-001–030
- REL-011–016
- Ukrainian legal/native/technical approval
- SEO/domain/routing/isolation
- QA localization.

---

## 101. Gate G8 Evidence Items

- POR scope/foundation/workflows
- IAM/DAT company scope
- private document security
- pilot plan/terms/support
- critical portal E2E.

---

## 102. Gate G9 Evidence Items

- completed pilot
- POR-041–050
- REL-023
- access/offboarding review
- support/training/monitoring
- P0/P1 closed
- staged rollout approval.

---

## 103. Agent Task Pack Example — FND-015

~~~text
Task: FND-015 Implement market context resolver
Release/Gate: ALL / G1

Read:
- 00 market/domain sections
- 05 trusted market context
- 11 domain SEO
- 13 environment/domain
- 15 Gate G1

Allowed:
- market config/resolver/tests

Protected:
- production DNS
- secrets
- unrelated routes

Acceptance:
- approved UK host resolves UK/en-GB
- approved Ukraine host resolves UA/uk-UA
- unknown host fails safely
- request form field/header cannot override host
- unit tests pass

Evidence:
- code review
- host matrix tests
- preview behavior
~~~

---

## 104. Agent Task Pack Example — FRM-026

~~~text
Task: FRM-026 Submit quote transaction
Release/Gate: R1 / G4-G5

Dependencies:
BE-021, BE-023, BE-024, BE-041
DAT-031, DAT-034, DAT-035, DAT-039, DAT-040
LEG-009, LEG-013, LEG-029

Acceptance:
- server resolves trusted market
- validates input and Turnstile
- idempotent duplicate creates one quote
- quote and line items commit atomically
- outbox record is created in transaction
- provider failure does not lose quote
- response contains no internal identifiers unnecessarily
- admin sees record

Evidence:
- database integration test
- duplicate test
- provider-failure test
- end-to-end preview
~~~

---

## 105. Agent Task Pack Example — POR-030

~~~text
Task: POR-030 Test quote/project company isolation
Release/Gate: R3 / G8

Create:
- company A user/data
- company B user/data
- internal admin
- revoked user

Acceptance:
- A can read only A
- B can read only B
- ID guessing, query changes and direct URL fail
- revoked user fails
- admin access follows role
- UI, server and RLS results agree
- denial is audited without leaking target data

Evidence:
- RLS integration tests
- route/action tests
- Playwright direct-URL test
- security review
~~~

---

## 106. Bug Intake Rule

Bug must include:

- environment/version,
- expected/actual,
- steps,
- evidence,
- affected market/role/company,
- severity,
- data/security/privacy impact,
- regression status.

Security/privacy issue uses restricted channel.

---

## 107. Production Incident Backlog Rule

Incident action items:

- link incident ID,
- contain/remediate/prevent category,
- owner/deadline,
- evidence,
- recurrence test,
- legal/privacy review if applicable.

Incident work may interrupt sprint under severity policy.

---

## 108. Content Defect Rule

Content issue identifies:

- page/product/document,
- market/locale,
- source of truth,
- claim/legal impact,
- current publication status,
- corrected wording/data,
- reviewer.

Technical facts are not “quick copy fixes”.

---

## 109. Dependency Update Rule

When a task completes:

- attach evidence,
- unblock direct dependents,
- re-check interface changes,
- update risk/gate,
- do not bulk-mark downstream Done.

---

## 110. Backlog Refinement Cadence

Weekly:

- refine Next,
- close/age blockers,
- verify dependencies,
- split XL,
- update estimates,
- confirm content/legal inputs,
- check gate coverage,
- remove stale/duplicate items.

---

## 111. Sprint Planning Rule

Sprint plan balances:

- product outcome,
- capacity,
- dependencies,
- review/QA capacity,
- operational work,
- risk reduction.

Not all available tasks should be selected.

---

## 112. Sprint Goal Standard

Good:

“A UK visitor can select products and submit one durable quote request that sales can see, even when email delivery fails.”

Bad:

“Finish forms, APIs and admin.”

---

## 113. Sprint Close Rule

- Done items meet DoD.
- Incomplete items return to Ready/In Progress with remaining work.
- No partial credit.
- Demo evidence retained.
- Release forecast/risk updated.

---

## 114. Backlog Anti-Patterns

Do not:

- create tickets per file without outcome,
- assign one giant task “build website”,
- mark design/content/legal as engineering subtasks with no owner,
- treat waiting as progress,
- hide unauthorized access behind UI,
- add every V1 idea to R1,
- count generated code as accepted work,
- close task without tests/evidence,
- duplicate shared foundation per market,
- launch portal without pilot.

---

## 115. Immediate Founder Decisions

Highest-value decision queue:

1. GOV-001 R1/R2/R3 scope
2. GOV-002 delivery capacity
3. GOV-007 UK entity
4. GOV-009 UK domain
5. GOV-010 Ukraine domain/entity
6. GOV-011 Gersan relationship
7. GOV-012 brand/document/image rights
8. GOV-013 R1 product priorities
9. GOV-014 R1 map scenes
10. GOV-005 Ukraine reviewer

---

## 116. Immediate Head Agent Actions

1. Resolve G0 blockers.
2. Inspect/create canonical code repository.
3. Convert Sprint 0 items into tracker tickets.
4. Assign owners/reviewers.
5. Create first vertical-slice task pack.
6. Start FND, CNT inventory and legal/provider tracks.
7. Report current G1 forecast.

---

## 117. First Vertical Slice

Recommended slice:

~~~text
Trusted UK host
  → market context
  → seeded product/category
  → server-rendered product page
  → approved design components
  → metadata/canonical
  → component/integration/E2E test
  → preview deployment
~~~

This slice validates architecture before page volume.

---

## 118. Vertical Slice Task Set

- FND-001–025 essential subset
- DAT-001–018 essential subset
- BE-001–013 essential subset
- DSG-001–014/021/024
- CNT-002/021–025
- WEB-001–011/026–031
- SEO-001–003/007
- QA-003–007/026
- OPS-001–007/019/021/022
- DOC-001–004

Exact slice is split into reviewable tasks.

---

## 119. Tracker Import Recommendation

When code repository/tracker is chosen, create fields:

- ID
- Type
- Release
- Epic
- Sprint
- Gate
- Priority
- MoSCoW
- Estimate
- Owner
- Reviewer
- Status
- Dependencies
- Requirement refs
- Evidence links
- Market
- Risk tags.

---

## 120. Suggested Tracker Status Automation

Allowed automation:

- PR opened → In Review
- required checks passed → In Verification candidate
- merged → not automatically Done unless evidence/acceptance
- released tag → Released for approved included items

Automation never self-approves legal/security/UAT.

---

## 121. Backlog Versioning

This catalog is versioned when:

- workstream/task IDs materially change,
- release/gate mappings change,
- Must/P0 scope changes,
- new major epic added,
- deferred work pulled forward,
- programme architecture changes.

Routine status updates live in tracker, not specification version.

---

## 122. Traceability Audit

Before each gate:

1. List relevant Must/P0 requirements.
2. Map to backlog IDs.
3. Map to implementation.
4. Map to tests/evidence.
5. Map to approval.
6. Resolve gaps.

---

## 123. Catalogue Maintenance Ownership

- Product Director: priorities/releases.
- Head Agent: technical decomposition/dependencies.
- QA: acceptance/evidence.
- Domain owners: task accuracy.
- Delivery Manager: status/blockers.
- Founder: scope/go-no-go.

---

## 124. Backlog Definition of Ready for Coding

Coding starts only when:

- business behavior is understood,
- design/data/API contract is sufficient,
- content placeholder policy is explicit,
- required decision not missing,
- test and affected boundaries are known.

---

## 125. Backlog Definition of Ready for Content

Content starts only when:

- audience/page purpose,
- canonical source,
- product/claim evidence,
- market/language,
- reviewer,
- publication status

are known.

---

## 126. Backlog Definition of Ready for Legal Review

Legal review receives:

- exact entity/market,
- actual product behavior,
- data flow/provider list,
- proposed wording,
- open decisions,
- release date/gate,
- technical implementation owner.

---

## 127. Backlog Definition of Ready for QA

QA receives:

- acceptance criteria,
- test environment/data,
- feature flag,
- role/market combinations,
- known limitations,
- migration/build version,
- security/privacy notes.

---

## 128. Catalogue Limitations

This document does not:

- assign real calendar dates,
- guarantee estimates,
- replace detailed task briefs,
- replace legal advice,
- authorize assets/claims,
- create the code repository,
- automatically import tickets into a tracker.

---

## 129. Approval Checklist

- [ ] Releases and gates accepted
- [ ] ID/workstream taxonomy accepted
- [ ] P0/Must interpretation accepted
- [ ] Founder decision queue owned
- [ ] Sprint 0 queue accepted
- [ ] First vertical slice accepted
- [ ] Deferred V1 boundaries accepted
- [ ] Agent task pack standard accepted
- [ ] Evidence/DoR/DoD accepted
- [ ] Tracker ownership accepted

---

## 130. Sonuç

InfraVolt artık yalnız bir specification setine değil, uygulanabilir bir task catalog’una sahiptir.

Ana kararlar:

1. 715 catalog item’ı tek seferde yapılmayacaktır.
2. Current sprint yalnız Ready/Now item’larından oluşacaktır.
3. R1 UK satış değerini ve operational reliability’yi önce teslim eder.
4. R2 Ukraine gerçek market publication olarak ayrı gate’ten geçer.
5. R3 Portal company-scope security ve pilot olmadan yayınlanmaz.
6. Human/legal/content decisions agent tarafından uydurulmaz.
7. Task test/evidence olmadan Done olmaz.
8. İlk implementation bir vertical slice ile başlar.

---

## 131. Document Control

### 131.1 Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1.0 | 15 July 2026 | InfraVolt Product Team | Initial 715-item governance, foundation, design, content, data, backend, public, map, forms, admin, security, SEO, QA, DevOps, legal, Ukraine, portal, release, documentation and V1 task catalog |

### 131.2 Change Control

Task IDs are stable references. Removed work becomes Rejected/Deferred rather than silently disappearing. Major task merge/split retains predecessor links.

### 131.3 Required Approval

- Founder / CEO
- Product Director / Head Agent
- Engineering Lead
- Design Lead
- Content/Product Data Lead
- QA/Accessibility Lead
- Security/Privacy Lead
- UK Sales/Operations Owner
- Ukraine Market Owner
- Legal Counsel for applicable items

