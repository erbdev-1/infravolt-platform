# InfraVolt — Implementation Roadmap and Delivery Plan

> Document ID: INF-15  
> Version: 0.1.0  
> Status: Draft for Founder, Product, Design, Engineering, QA, Content, Legal and Market Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Programme Owner: Product Director / CTO / Head Agent  
> Delivery Model: Stage-gated, iterative, evidence-based product delivery  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0, 06_DATABASE_SCHEMA.md v0.1.0, 07_BACKEND_API_AND_WORKFLOWS.md v0.1.0, 08_ADMIN_AND_SALES_OPERATIONS.md v0.1.0, 09_PARTNER_PORTAL.md v0.1.0, 10_AUTH_SECURITY_AND_PERMISSIONS.md v0.1.0, 11_CONTENT_SEO_AND_ANALYTICS.md v0.1.0, 12_TEST_QA_AND_ACCESSIBILITY.md v0.1.0, 13_DEVOPS_DEPLOYMENT_AND_OBSERVABILITY.md v0.1.0, 14_LEGAL_PRIVACY_AND_COMPLIANCE.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required public locales: en-GB + uk-UA  
> Architecture: Modular monolith / one repository / one shared application  
> Baseline stack: Next.js App Router, React, TypeScript, Node.js 24 LTS, pnpm 11, Tailwind CSS, Supabase, Resend, Cloudflare Turnstile, Vercel  
> Accessibility target: WCAG 2.2 Level AA  
> Last updated: 15 July 2026  
> Document language: Turkish; task, branch, release, gate, role, metric and code identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt ürün tanımını uygulanabilir bir delivery programme’a dönüştürür.

Amaç:

- 00–14 belgelerindeki kararları doğru sırada hayata geçirmek,
- Founder, product, design, frontend, backend, database, QA, SEO, content, legal ve DevOps işlerini ayırmak,
- agent ve insan ekiplerinin aynı source of truth üzerinden çalışmasını sağlamak,
- MVP’yi gereksiz kapsamla geciktirmemek,
- UK ve Ukraine yayınlarını ayrı fakat ortak mimari üzerinde yönetmek,
- her release için ölçülebilir giriş/çıkış kriterleri koymak,
- teslimatı yalnız “kod yazıldı” değil, production’da güvenle çalışan ürün olarak tanımlamak.

Bu belge kod değildir; kodun hangi sırada, kim tarafından, hangi kanıtla ve hangi onaydan sonra üretileceğinin işletim sistemidir.

---

## 2. Ana Teslimat Kararı

InfraVolt tek seferde “tam sistem” olarak yapılmayacaktır.

Programme dört ticari release’e ayrılır:

| Release | Ana sonuç | Sonraki release’i bekler mi? |
|---|---|---|
| R1 — UK Public + Sales MVP | UK public site, katalog, Application Map, formlar ve temel admin/sales operasyonu | Hayır |
| R2 — Ukraine Public MVP | Ukrainian domain, uk-UA içerik, market-specific legal/SEO/forms | R1 ortak çekirdeğini kullanır; portalı beklemez |
| R3 — Partner Portal MVP | Approved partner authentication, company-scoped data, controlled documents, quote/project visibility | R1/R2 public launch’ı engellemez |
| R4 — Operational V1 | Kanıtlanmış ihtiyaca göre order milestones, gelişmiş workflow, raporlama ve entegrasyonlar | R1–R3 kullanım verisine bağlı |

Public fiyat, checkout, payment, otomatik binding quote, otomatik dealer approval, ERP ve public API baseline değildir.

---

## 3. Başarı Tanımı

Başarı:

- iki ülkede çok sayıda sayfa açmak değil,
- satışa dönüşen doğru talepler almak,
- teknik ürün ve doküman bilgisini güvenilir sunmak,
- talepleri admin üzerinden kaybetmeden yönetmek,
- private veriyi doğru company/user sınırında korumak,
- UK ve Ukraine deneyimini dil, hukuk ve pazar bakımından gerçek hale getirmek,
- sürdürülebilir deployment ve support sistemi kurmaktır.

---

## 4. Delivery İlkeleri

1. Outcome before output.
2. Public sales value before portal complexity.
3. Foundation before feature volume.
4. Server and database authorization before visual hiding.
5. Real content before placeholder-rich launch.
6. UK and Ukraine are separate publications, not string substitutions.
7. Human review remains in quote, dealer and claim decisions.
8. Small tasks, small patches, frequent integration.
9. Every release has evidence and rollback.
10. No feature is done without accessibility, security, privacy and observability.

---

## 5. Source of Truth Hiyerarşisi

Karar çatışmasında sıra:

1. Approved founder/legal decision
2. 00_MASTER_PROJECT_SPEC
3. İlgili numbered domain document
4. Approved ADR/RFC
5. Current implementation task
6. Source code and tests
7. Eski uploaded execution/tech guides

Eski rehberlerde bulunan ve 00–15 belgeleriyle çelişen stack, scope veya release kararı uygulanmaz.

---

## 6. Programme Kapsamı

### 6.1 Public

- Corporate pages
- Industries
- Application Map
- Product catalogue
- Product detail
- Technical documents
- Project List / quote request
- Contact and support forms
- Dealer programme and application
- Market-specific legal pages
- Search/filter where approved

### 6.2 Internal

- Admin authentication
- Lead/enquiry/quote queues
- Company/contact records
- Dealer review
- Product/content/document administration
- Assignment, status, note and audit
- Notification/outbox visibility
- Basic operational reporting

### 6.3 Partner

- Invitation/authentication
- Company-scoped users
- Quote/project visibility
- Controlled document access
- Support requests
- Approved account administration

### 6.4 Platform

- Dual-domain market resolution
- Database/RLS/storage
- Email and anti-spam
- CI/CD and environments
- Security/privacy/compliance
- SEO, analytics decision and observability
- Test automation

---

## 7. Bilinçli Olarak Kapsam Dışı

MVP’de:

- ecommerce checkout,
- card payment,
- automatic legal acceptance of quote/order,
- realtime ERP integration,
- complex logistics optimization,
- native mobile app,
- public partner API,
- microservices,
- Kubernetes,
- Redis/queue platform without evidence,
- 3D Application Map requirement,
- AI-generated technical claims,
- uncontrolled user file sharing,
- fully automated dealer scoring/approval

yapılmaz.

---

## 8. Release Architecture

~~~mermaid
flowchart TD
    F["Foundation and Decisions"] --> D["Design and Content System"]
    D --> P["R1 UK Public + Sales MVP"]
    P --> U["R2 Ukraine Public MVP"]
    P --> A["Admin Operations Maturity"]
    A --> R["R3 Partner Portal MVP"]
    U --> V["R4 Operational V1"]
    R --> V
~~~

Ukraine content çalışması R1 sonunu beklemeden paralel başlayabilir; production release ortak foundation ve approved market content’e bağlıdır.

---

## 9. Workstream Modeli

| Code | Workstream | Primary owner |
|---|---|---|
| WS-01 | Product and Programme | Product Director |
| WS-02 | Research, IA and UX | UX Lead |
| WS-03 | Design System and UI | Design Lead |
| WS-04 | Public Frontend | Frontend Lead |
| WS-05 | Application Map and Assets | Frontend + Asset Lead |
| WS-06 | Backend and Workflows | Backend Lead |
| WS-07 | Database, RLS and Storage | Data/Backend Lead |
| WS-08 | Admin and Sales Operations | Full-stack Lead + Sales Owner |
| WS-09 | Authentication and Portal | Security-aware Full-stack Lead |
| WS-10 | Content, Product Data and Translation | Content Lead + Market Leads |
| WS-11 | SEO and Measurement | SEO Lead |
| WS-12 | QA and Accessibility | QA Lead |
| WS-13 | Security, Privacy and Legal | Security/Privacy/Legal Owners |
| WS-14 | DevOps and Observability | DevOps Lead |
| WS-15 | Documentation and Enablement | Head Agent + Domain Owners |

---

## 10. Organizasyon Modeli

~~~mermaid
flowchart TD
    CEO["Founder / CEO"] --> PO["Product Director / Head Agent"]
    PO --> DX["Design + UX"]
    PO --> ENG["Frontend + Backend + Data"]
    PO --> QO["QA + Security + DevOps"]
    PO --> BO["Content + SEO + Sales Ops"]
    CEO --> LO["Legal + UK/Ukraine Market Approval"]
    LO --> PO
~~~

Bu şema reporting değil decision flow gösterir. Küçük ekipte bir kişi birden fazla rol üstlenebilir; görev ve onay ayrımı yine korunur.

---

## 11. Founder / CEO Sorumluluğu

Founder:

- commercial priorities,
- market/domain/entity decisions,
- Gersan relationship and content authority,
- budget/procurement,
- final scope approval,
- launch go/no-go,
- legal counsel appointment,
- release acceptance

için accountable’dır.

Founder günlük component implementation detayını yönetmez; açık decision queue üzerinden karar verir.

---

## 12. Product Director / Head Agent Sorumluluğu

- roadmap ve backlog,
- document traceability,
- architecture protection,
- work package decomposition,
- owner assignment,
- dependency management,
- scope control,
- cross-workstream review,
- build/test/release evidence,
- risk escalation,
- release recommendation.

Head Agent bütün kodu tek başına yazmak zorunda değildir; bütün çıktının tek ürün olarak çalışmasından sorumludur.

---

## 13. Project Manager / Delivery Manager

- sprint/release tracking,
- RAID register,
- dependency dates,
- meeting/action log,
- acceptance evidence collection,
- vendor/domain/content follow-up,
- weekly status.

Küçük ekipte Product Director bu rolü üstlenebilir.

---

## 14. UX Lead

- user flow fidelity,
- information architecture,
- form burden,
- navigation,
- responsive behavior,
- interaction states,
- accessibility interaction,
- usability testing.

UX Lead visual polish ile sınırlı değildir.

---

## 15. Design Lead

- design tokens,
- Figma/code parity,
- components and variants,
- responsive templates,
- asset usage,
- visual QA,
- market/localization resilience.

Design system değişikliği 04_DESIGN_SYSTEM.md ile izlenir.

---

## 16. Frontend Lead

- Next.js page/component implementation,
- Server/Client Component boundaries,
- semantic UI,
- responsive performance,
- form interaction,
- Application Map interaction,
- frontend tests,
- design-system consumption.

---

## 17. Backend Lead

- use cases,
- API/Server Actions/Route Handlers,
- transactions and idempotency,
- notification outbox,
- validation,
- audit,
- integration boundaries,
- failure recovery.

---

## 18. Database and Data Lead

- migrations,
- constraints,
- indexes,
- generated types,
- RLS,
- storage policies,
- seed data,
- backup/restore verification,
- data quality.

Production data manual dashboard edits ile migration’ın yerine geçirilmez.

---

## 19. QA Lead

- test strategy,
- acceptance traceability,
- exploratory testing,
- cross-browser/device coverage,
- accessibility verification,
- regression gates,
- defect triage,
- release evidence.

QA yalnız son haftaya bırakılmaz.

---

## 20. Security and Privacy Owners

- threat model,
- auth/RLS review,
- secret handling,
- vulnerability triage,
- logging/privacy review,
- consent and rights operation,
- incident exercises,
- release sign-off.

---

## 21. DevOps Lead

- environments,
- CI/CD,
- deploy protection,
- domains/DNS/TLS,
- monitoring/alerts,
- backup/restore,
- rollback,
- production runbook.

---

## 22. Content and Product Data Lead

- page copy,
- product taxonomy,
- technical evidence,
- document metadata,
- image/asset metadata,
- translation package,
- content QA,
- publication workflow.

---

## 23. SEO and Measurement Lead

- crawl/index architecture,
- metadata and structured data,
- sitemap/hreflang/canonical,
- consent-aware measurement,
- business event dictionary,
- search performance monitoring.

---

## 24. UK and Ukraine Market Leads

Her market lead:

- terminology,
- commercial truth,
- local contact details,
- local CTA,
- legal publication coordination,
- market-specific content approval,
- launch UAT

için responsible’dır.

Ukraine translation yalnız dilbilgisi değil technical/commercial market review içerir.

---

## 25. Legal Counsel

- entity/controller wording,
- terms/privacy/cookies,
- marketing basis,
- transfer and processor contracts,
- Ukrainian publication,
- product claim/conformity,
- sanctions/export/dealer terms,
- go-live legal approval.

Legal review yazılım ekibinin uygun basis veya policy metni uydurmasıyla ikame edilmez.

---

## 26. Agent Delivery Modeli

Agentlar rol bazlı ve bounded task paketleriyle çalışır:

- Head Agent
- Architecture Agent
- Design System/UI Agent
- Public Frontend Agent
- Application Map/Asset Agent
- Backend/Workflow Agent
- Database/RLS Agent
- Admin Agent
- Portal/Auth Agent
- Content/SEO Agent
- Test/Accessibility Agent
- Security/Privacy Agent
- DevOps Agent
- Documentation Agent

Aynı anda açık agent sayısı ekip review kapasitesinden fazla olmamalıdır.

---

## 27. Agent Kullanım Kuralları

1. Her agent yalnız assigned scope’u değiştirir.
2. Shared/high-risk dosya Head Agent ownership’indedir.
3. Task başlamadan relevant numbered documents verilir.
4. Agent repo’yu inspect eder; varsayımla yeni pattern kurmaz.
5. Küçük patch üretir.
6. Test/build çıktısını bildirir.
7. Bilinmeyen kararı kodla gizlemez; blocker yazar.
8. Secret üretmez veya commit etmez.
9. Existing user changes korunur.
10. Handoff dosya, karar, test ve risk içerir.

---

## 28. RACI Özeti

| Karar/iş | A | R | C |
|---|---|---|---|
| Product scope | Founder | Product Director | Sales, Design, Engineering |
| Architecture | Product Director/CTO | Architect | Security, DevOps |
| UX/UI | Product Director | UX/Design Lead | Frontend, Market Leads |
| Database/RLS | CTO | Data Lead | Backend, Security |
| Legal publication | Founder | Counsel/Privacy | Product, Market Lead |
| Product claims | Founder/Commercial Owner | Content Lead | Gersan, Counsel, Technical Lead |
| UK launch | Founder | Product Director | All leads |
| Ukraine launch | Founder | Product + UA Lead | Counsel, SEO, Engineering |
| Production incident | CTO | Incident Commander | Privacy, Vendor, Product |

A = Accountable, R = Responsible, C = Consulted.

---

## 29. Decision Rights

- Founder: business, budget, entity, contractual and final launch.
- CTO/Head Agent: architecture within approved scope.
- Product Director: priority and acceptance.
- Design Lead: visual system within product constraints.
- Security/Privacy: veto for unresolved critical risk.
- Legal Counsel: legal publication approval.
- QA Lead: release-quality recommendation.
- Market Lead: local language/market acceptance.

No single agent self-approves its own high-risk change.

---

## 30. Escalation Modeli

| Severity | Example | Action |
|---|---|---|
| S0 Blocker | Entity/domain/data authority unknown | Stop affected work; founder decision |
| S1 Critical | Auth/RLS/data exposure risk | Stop merge/release; security escalation |
| S2 Major | Core flow broken, major legal/content gap | Release blocked |
| S3 Moderate | Workaround exists, non-core regression | Fix or accepted risk |
| S4 Minor | Cosmetic/non-blocking | Backlog |

---

## 31. Çalışma Ritmi

Recommended:

- daily async status,
- two-week sprint,
- twice-weekly integration window,
- weekly product/risk review,
- weekly founder decision review,
- sprint demo and retrospective,
- release go/no-go session,
- monthly architecture/security/legal review during active build.

Meetings task üretmek yerine blocker kaldırmalıdır.

---

## 32. Backlog Hiyerarşisi

~~~text
Programme
  Release
    Epic
      Capability
        User Story / Enabler
          Task
            Test Evidence
~~~

Her iş item’ı document requirement, owner, dependency, acceptance ve release’e bağlanır.

---

## 33. Work Package Standardı

Her paket:

- Task ID
- Objective
- In scope
- Out of scope
- Relevant documents/sections
- Allowed files
- Protected files
- Inputs/assets
- Acceptance criteria
- Required tests
- Security/privacy/accessibility notes
- Handoff format

içerir.

---

## 34. Context Pack Standardı

Agent’a bütün 00–15 belgeleri otomatik yüklemek yerine:

- task brief,
- relevant document excerpts,
- affected code tree,
- current types/contracts,
- design reference,
- test command,
- known decisions

verilir.

Head Agent tüm document indexini korur.

---

## 35. Agent Output Contract

Her çıktı:

1. Outcome summary
2. Files changed
3. Behavior implemented
4. Tests run and results
5. Decisions/assumptions
6. Remaining risks
7. Suggested next task

formatındadır.

“Done” tek başına handoff değildir.

---

## 36. File Ownership

| Area | Primary owner |
|---|---|
| package/config/root layout | Head Agent/Architect |
| design tokens/primitives | Design System owner |
| public routes | Public Frontend |
| map components/data adapters | Application Map owner |
| migrations/RLS/seeds | Database owner |
| server use cases | Backend owner |
| admin routes | Admin owner |
| auth/portal routes | Auth/Portal owner |
| tests | Feature owner + QA |
| CI/deploy config | DevOps owner |
| content data/import | Content/Data owner |

---

## 37. High-Risk Files

- package manifest and lockfile
- Next.js config
- proxy/middleware
- root layout
- environment schema
- Supabase migrations
- RLS/storage policies
- auth session/permission resolver
- shared database types
- CI/CD workflows
- production domain config
- legal content source

Bu dosyalarda concurrent edit yapılmaz.

---

## 38. Conflict Prevention

- One owner per high-risk file at a time.
- Small branches/patches.
- Rebase/merge before new dependent task.
- Generated files regenerated by owner.
- No broad formatter over unrelated files.
- No dependency addition without approval.
- Shared types changed contract-first.
- Migration number reservation controlled.

---

## 39. Definition of Ready

Bir item ready’dir only if:

- outcome understood,
- scope bounded,
- owner assigned,
- dependencies available,
- design/content or explicit placeholder policy ready,
- acceptance testable,
- legal/security notes known,
- target release known,
- affected interfaces identified.

---

## 40. Definition of Done

Bir item done’dır only if:

- acceptance criteria pass,
- code reviewed,
- typecheck/lint/tests pass,
- accessibility states covered,
- authorization validated where relevant,
- telemetry/logging appropriate,
- docs updated,
- no secret/PII leakage,
- migration/rollback considered,
- deployed to preview/staging where applicable,
- Product/QA accepts.

---

## 41. Evidence Bundle

Feature evidence:

- requirement link,
- screenshots/video where visual,
- automated test result,
- manual test notes,
- accessibility evidence,
- security/RLS evidence for protected data,
- before/after migration proof,
- monitoring event proof,
- approval record.

---

## 42. Estimation Modeli

Use:

- XS: under one focused day
- S: one to two days
- M: three to five days
- L: one to two weeks
- XL: must split

Estimate includes implementation, review, tests and documentation.

Unknown content/legal/vendor wait ayrı dependency olarak gösterilir.

---

## 43. Dependency Types

- Product decision
- Design
- Content
- Asset/licence
- Technical architecture
- Database contract
- External provider
- Legal/counsel
- Market translation
- Security review
- Environment/domain
- Human UAT

Dependency “engineering işi” gibi gizlenmez.

---

## 44. Critical Path

~~~mermaid
flowchart TD
    C["Founder decisions + entity/domain"] --> F["Repository + environments"]
    F --> S["Design system + data foundation"]
    S --> K["Catalogue + content + documents"]
    K --> Q["Forms + quote + admin"]
    Q --> H["Security, legal, QA hardening"]
    H --> L["UK launch"]
    L --> U["Ukraine market release"]
    Q --> P["Partner portal foundation"]
~~~

Asset licence, product evidence and Ukrainian approved translation can become critical-path blockers even when code is complete.

---

## 45. Stage Gates

| Gate | Name | Outcome |
|---|---|---|
| G0 | Programme Ready | Decisions, owners, scope and access ready |
| G1 | Foundation Ready | Repo, environments, CI, architecture skeleton |
| G2 | Experience Ready | Tokens, components, templates and content model |
| G3 | Data/Workflow Ready | Schema, RLS, storage, backend contracts |
| G4 | UK Public Ready | Public experience and sales intake complete |
| G5 | Sales Operations Ready | Admin workflow supports real leads |
| G6 | UK Launch Approved | Production, legal, QA and operations go/no-go |
| G7 | Ukraine Launch Approved | Ukrainian market publication complete |
| G8 | Portal Pilot Ready | Auth/company scope/private workflows safe |
| G9 | Portal Production Approved | Pilot issues closed and operations ready |

---

## 46. Gate G0 — Programme Ready

Required:

- founder decision queue assigned,
- exact UK/Ukraine domain plan,
- entity/controller direction,
- Gersan authority and asset status,
- repository/hosting account ownership,
- core team/roles,
- R1 scope,
- content/product-data owner,
- counsel and market reviewers,
- budget envelope.

---

## 47. Gate G1 — Foundation Ready

- repository bootstrap
- pinned runtime/package manager
- route/module skeleton
- environment validation
- CI baseline
- preview deploy
- local Supabase/migrations
- market host resolver
- error/logging baseline
- ADR register
- secret ownership

---

## 48. Gate G2 — Experience Ready

- tokens implemented
- typography/color/spacing pass
- core components
- header/footer/navigation
- responsive templates
- form primitives
- table/admin primitives
- localization-safe layout
- keyboard/focus states
- Storybook or equivalent decision
- visual regression baseline if adopted

---

## 49. Gate G3 — Data and Workflow Ready

- core migrations
- data constraints/indexes
- RLS/storage policies
- permission resolver
- seed fixtures
- form use cases
- idempotency
- notification outbox
- audit
- generated types
- integration tests

---

## 50. Gate G4 — UK Public Ready

- approved en-GB content
- industries/products/documents
- Application Map
- project list/quote flow
- contact/support/dealer forms
- legal pages
- metadata/sitemap/canonical
- accessibility/performance pass
- error/empty/loading states
- no placeholder content

---

## 51. Gate G5 — Sales Operations Ready

- authenticated admin
- queue/search/filter
- assignment/status/note
- company/contact linking
- quote/dealer workflows
- email visibility/retry
- audit
- export policy
- permissions tested
- sales owner UAT

---

## 52. Gate G6 — UK Launch Approved

- production domain/TLS
- production environment isolation
- backup/restore check
- alert routing
- security review
- legal approval
- content/claim approval
- SEO crawl review
- performance/accessibility/QA sign-off
- incident/rollback runbook
- support owner and hypercare schedule

---

## 53. Gate G7 — Ukraine Launch Approved

- real uk-UA publication
- no silent legal/content fallback
- Ukrainian page parity matrix
- local contact/CTA truth
- Ukrainian legal documents
- hreflang/canonical/domain validation
- technical terminology QA
- market-specific claim/conformity review
- form/email templates
- UA lead routing
- local market UAT

---

## 54. Gate G8 — Portal Pilot Ready

- invite/auth/recovery
- MFA policy
- company membership
- default-deny permission
- company-scoped RLS
- private document signed access
- quote/project views
- portal terms/privacy
- audit
- support runbook
- synthetic and pilot-company test

---

## 55. Gate G9 — Portal Production Approved

- pilot completed
- critical/high defects closed
- access review complete
- company admin training
- account lifecycle runbook
- revocation test
- incident escalation
- support SLA
- monitoring
- customer communication approved

---

## 56. Release Train

Recommended:

- feature preview continuously,
- staging candidate at least weekly,
- production release in controlled windows,
- schema changes expand/migrate/contract,
- security/legal fixes expedited,
- portal release independent from public content release.

---

## 57. Environment Strategy

| Environment | Data | Purpose |
|---|---|---|
| Local | Synthetic | Development and integration |
| Preview | Synthetic/masked only | Branch/PR review |
| Staging | Production-like, no uncontrolled live PII | UAT, release candidate |
| Production | Live | Approved release |

Production credentials never copied into preview.

---

## 58. Branch and Review Strategy

- protected main,
- short-lived task branches,
- PR required,
- one feature/concern per PR,
- required checks,
- CODEOWNERS-equivalent ownership,
- no direct production mutation,
- merge only after dependency compatibility.

Exact branching adapts to repo platform; trunk-based principles remain.

---

## 59. Feature Flags

Flags are useful for:

- Ukraine host release,
- portal availability,
- attachment upload,
- analytics provider,
- advanced quote feature,
- new Application Map scenes.

Flags do not replace authorization.

---

## 60. Migration Strategy

- forward-only numbered SQL migrations
- schema reviewed
- local reset test
- staging test
- generated types updated
- backfill observable/idempotent
- destructive change delayed
- rollback/forward-fix plan
- backup/restore gate for high risk

---

## 61. Content Migration Strategy

1. Define canonical fields.
2. Inventory source content.
3. Verify rights/evidence.
4. Clean taxonomy.
5. Import draft records.
6. Technical review.
7. Market translation.
8. Preview.
9. Publish per market.
10. Record source/version.

---

## 62. Asset Pipeline

Every asset receives:

- internal asset ID,
- source,
- owner/licensor,
- licence/permission,
- original filename,
- project filename,
- market/use scope,
- alt-text need,
- dimensions/format,
- derivative history,
- approval status.

Renaming uploaded assets does not create usage rights.

---

## 63. Application Map Asset Plan

The uploaded airport/Application Map archive is treated as source material.

Before implementation:

- archive inventory,
- corruption/malware check,
- licence/source review,
- scene/zone identification,
- duplicate removal,
- naming normalization,
- text-in-image assessment,
- WebP/AVIF derivative plan,
- responsive crop plan,
- hotspot coordinate calibration.

UI labels and hotspot controls remain HTML/React where possible.

---

## 64. Localization Pipeline

Canonical content record supports:

- stable content identity,
- market publication status,
- en-GB version,
- uk-UA version,
- translation status,
- technical reviewer,
- market reviewer,
- legal reviewer where needed,
- last approved source/version.

Machine translation may create draft only; it does not publish.

---

## 65. UK Content Track

Priority:

1. company proposition
2. industries
3. core product categories/products
4. documents
5. quote/support/dealer journeys
6. legal/contact
7. trust/technical evidence
8. lower-priority editorial pages

---

## 66. Ukraine Content Track

Start early with:

- terminology glossary,
- domain/contact/entity decision,
- page parity matrix,
- product/category names,
- Application Map labels,
- legal wording owner,
- email templates,
- metadata/search language,
- claim/conformity differences.

Ukraine track can run parallel after canonical content fields stabilize.

---

## 67. Legal Publication Track

Per market:

- Terms of Use
- Privacy Notice
- Cookie Notice
- Accessibility Statement
- company/contact disclosures
- form short notices
- optional Portal Terms
- optional Dealer Terms

Document version/effective date/publication evidence retained.

---

## 68. Product Data Track

Product data must distinguish:

- manufacturer-provided fact,
- InfraVolt-authored explanation,
- verified certificate/test,
- market-specific conformity,
- marketing claim,
- internal-only note,
- unknown/unapproved field.

Unknown data is not filled by AI inference.

---

## 69. Technical Document Track

- source and owner
- version/effective date
- applicable products/markets
- public/private policy
- checksum/file metadata
- withdrawal/supersession
- controlled access
- access audit
- expiry review

---

## 70. Test Data Strategy

- synthetic personas/companies
- UK and Ukraine addresses
- Unicode/Cyrillic
- long names/titles
- duplicate submissions
- permission boundary cases
- expired/revoked users
- document version cases
- failed email/webhook
- large/invalid uploads
- accessibility input methods

No real customer data in routine development.

---

## 71. Quality Engineering Model

Quality is owned by feature team; QA provides strategy and independent evidence.

Each capability covers:

- happy path,
- validation/failure,
- permissions,
- accessibility,
- responsive behavior,
- observability,
- localization,
- privacy/security,
- recovery.

---

## 72. Test Pyramid

| Level | Purpose |
|---|---|
| Static | TypeScript, lint, schema checks |
| Unit | Pure rules, formatting, permission helpers |
| Component | UI states, keyboard, validation |
| Integration | Database, RLS, use cases, storage |
| E2E | Critical user/business journeys |
| Manual exploratory | Unknown interactions and content quality |
| UAT | Business/market acceptance |

---

## 73. Critical E2E Journeys

- UK visitor → product → Project List → quote request
- UK visitor → Application Map → solution/product
- document request/access
- dealer application
- admin login → queue → assignment/status/note
- email outbox failure/retry
- Ukraine domain → uk-UA content → lead routing
- partner invite → login → company-scoped quote/document
- revoked user denied
- unauthorized cross-company access denied

---

## 74. Accessibility Track

Every sprint includes:

- semantic headings/landmarks,
- keyboard operation,
- visible focus,
- form labels/errors,
- screen-reader announcements,
- contrast,
- reflow/zoom,
- reduced motion,
- target size,
- alternative to map hotspot interaction,
- locale and language attributes.

WCAG 2.2 AA is product target; legal review remains separate.

---

## 75. Performance Track

Budgets are set before media-heavy implementation.

Monitor:

- Core Web Vitals
- server response
- JS per route
- image weight
- font loading
- Application Map load
- search/filter responsiveness
- database query latency
- signed document access

No 3D or animation library is added without measured value.

---

## 76. Security Track

- threat model
- SSR auth session
- default-deny permissions
- RLS and storage policy tests
- rate limit/Turnstile
- idempotency
- upload restrictions
- secret scanning
- dependency review
- CSP/security headers
- audit events
- MFA for privileged users
- incident/tabletop

---

## 77. Privacy Track

- data inventory/RoPA
- lawful basis matrix
- notice at collection
- optional marketing consent
- cookie/storage audit
- processor/transfer register
- retention jobs
- rights request runbook
- export/delete behavior
- breach coordination
- production logging review

---

## 78. SEO Track

- crawlable server content
- market domains
- canonical
- hreflang
- sitemap
- robots
- metadata
- structured data only when truthful
- redirect map
- 404/410
- image/document discoverability policy
- Search Console setup

---

## 79. Analytics Track

Baseline:

- business-critical event dictionary,
- no PII in event payload,
- consent/legal decision before optional analytics,
- operational metrics separated from marketing analytics,
- test traffic excluded,
- market/domain attribution,
- funnel interpretation documented.

GA4 and session recording are not installed by habit.

---

## 80. Observability Track

- structured application errors
- request/correlation ID
- form/quote success/failure counts
- outbox backlog/failure
- auth/permission anomaly
- cron/retention job status
- storage access errors
- deployment health
- uptime checks
- alert ownership

---

## 81. UAT Modeli

UAT personas:

- UK buyer/specifier
- UK sales admin
- dealer manager
- Ukraine buyer
- Ukraine market reviewer
- approved partner user
- company admin

UAT scripted core journeys + exploratory notes içerir.

---

## 82. Pilot Modeli

Partner Portal doğrudan tüm partnerlara açılmaz.

Pilot:

- one or two approved companies,
- named users,
- limited data set,
- explicit support channel,
- daily issue review,
- access audit,
- exit criteria.

---

## 83. Cutover Strategy

- content freeze window
- final database migration
- DNS/domain verification
- smoke tests
- sitemap/index checks
- email/lead routing test
- analytics/consent validation if enabled
- support coverage
- old-site redirect activation
- go/no-go record

---

## 84. Rollback Strategy

- prior application deployment
- reversible domain routing
- backward-compatible database migrations
- feature flags
- content unpublish
- provider credential revocation
- incident communication path

Rollback tested in staging before launch.

---

## 85. Hypercare

Recommended first production period:

- daily error/lead review,
- no unattended failed form,
- SEO/index observation,
- performance watch,
- user feedback channel,
- priority defect lane,
- twice-weekly release if needed,
- end-of-hypercare report.

Duration is risk-based, not a fixed promise.

---

## 86. Operations Handoff

Before normal operations:

- ownership directory,
- admin guide,
- content publication guide,
- dealer review guide,
- incident contacts,
- backup/restore guide,
- rights/privacy guide,
- alert runbook,
- support escalation,
- release notes.

---

## 87. Documentation Deliverables

- architecture decision records
- environment inventory
- setup guide
- schema/API documentation
- admin handbook
- portal handbook
- content/SEO handbook
- security/privacy runbooks
- incident/rollback runbooks
- release notes
- known limitations

---

## 88. Training Plan

| Audience | Training |
|---|---|
| Founder/Sales | Lead, quote and dashboard workflow |
| Content team | Product/document publication |
| Market leads | Translation and market approval |
| Admins | User/company/dealer management |
| Support | Account/document/incident escalation |
| Engineers | Deployment, migrations, monitoring |
| Privacy owner | Rights, retention, breach intake |

---

## 89. Delivery Phase Overview

| Phase | Name | Main result |
|---|---|---|
| P0 | Mobilisation and Decisions | Team/access/scope unblocked |
| P1 | Engineering Foundation | Repo, environments, CI, skeleton |
| P2 | Experience Foundation | Design system, templates, content model |
| P3 | Data and Workflow Foundation | Schema, RLS, storage, backend |
| P4 | UK Public Build | Public discovery and technical content |
| P5 | Sales Operations Build | Forms, quote and admin |
| P6 | UK Hardening and Launch | Production R1 |
| P7 | Ukraine Localisation and Launch | Production R2 |
| P8 | Portal Pilot and Launch | Production R3 |
| P9 | Evidence-led V1 | Approved operational enhancements |

---

## 90. Phase P0 — Mobilisation and Decisions

Outputs:

- approved R1/R2/R3 scope,
- decision log,
- role assignment,
- repository and vendor ownership,
- domain plan,
- entity/controller direction,
- Gersan/content/asset authority,
- product data inventory,
- legal/counsel schedule,
- initial risk register,
- delivery scenario selection.

Exit: G0.

---

## 91. Phase P1 — Engineering Foundation

Outputs:

- Next.js/TypeScript bootstrap,
- Node.js 24 LTS and pnpm 11 pinning,
- modular folder boundaries,
- public/auth/admin/portal route skeleton,
- market/domain resolver,
- environment schema,
- local Supabase,
- initial migrations,
- CI checks,
- preview deployment,
- structured logging baseline,
- security headers baseline.

Exit: G1.

---

## 92. Phase P2 — Experience Foundation

Outputs:

- code tokens,
- fonts/colors/spacing,
- primitives and form components,
- responsive layouts,
- public page templates,
- admin shell,
- localization utilities,
- content render contracts,
- accessibility baseline,
- image/asset component rules.

Exit: G2.

---

## 93. Phase P3 — Data and Workflow Foundation

Outputs:

- core schema and constraints,
- RLS/storage policy baseline,
- auth/profile/membership,
- product/industry/document data,
- contact/company/quote/dealer models,
- use-case layer,
- audit,
- notification outbox,
- seed fixtures,
- database integration tests.

Exit: G3.

---

## 94. Phase P4 — UK Public Build

Outputs:

- home/about/contact,
- industries,
- products/categories/detail,
- technical documents,
- Application Map,
- Project List,
- quote/support/dealer journeys,
- legal pages,
- SEO metadata/site maps,
- en-GB content.

Exit: G4.

---

## 95. Phase P5 — Sales Operations Build

Outputs:

- admin authentication,
- dashboard/queues,
- company/contact views,
- quote/enquiry lifecycle,
- dealer review,
- assignment/internal notes,
- email delivery status,
- audit,
- filters/search/export as approved,
- sales UAT.

Exit: G5.

---

## 96. Phase P6 — UK Hardening and Launch

Outputs:

- full regression,
- accessibility audit,
- permission/RLS testing,
- performance optimization,
- legal/content/claim sign-off,
- production environment,
- domain/DNS/TLS,
- monitoring/alerts,
- backup/restore,
- incident/rollback drill,
- UK production launch.

Exit: G6.

---

## 97. Phase P7 — Ukraine Localisation and Launch

Outputs:

- uk-UA content,
- Ukrainian terminology QA,
- market publication controls,
- Ukrainian legal pages,
- market-specific forms/email,
- domain/hreflang/canonical,
- local lead routing,
- product/claim/conformity review,
- Ukrainian UAT,
- Ukraine production launch.

Exit: G7.

---

## 98. Phase P8 — Portal Pilot and Launch

Outputs:

- invite/auth/account recovery,
- company membership,
- portal navigation,
- quote/project views,
- controlled documents,
- support requests,
- company admin controls as approved,
- portal terms/privacy,
- pilot,
- production rollout.

Exit: G8 then G9.

---

## 99. Phase P9 — Evidence-led V1

Candidates:

- order records/milestones,
- quote PDF,
- supplier request workflow,
- advanced reporting,
- approved integrations,
- product comparison,
- enhanced document subscriptions,
- partner dashboards,
- search improvements.

Each candidate requires evidence, owner, ROI/risk and ADR where architectural.

---

## 100. Sprint Modeli

Baseline planning unit two weeks.

Each sprint:

1. planning and risk confirmation,
2. implementation,
3. continuous review/test,
4. integration,
5. demo,
6. acceptance,
7. retrospective and backlog update.

Sprint numbering is relative; exact calendar starts after G0.

---

## 101. Sprint 0 — Mobilisation

- Confirm R1/R2/R3.
- Resolve highest blockers.
- Set repo/vendor access.
- Assign owners.
- Create backlog/decision/RAID.
- Inventory content/assets/product data.
- Confirm legal and market review path.
- Choose delivery capacity scenario.

Deliverable: G0 package.

---

## 102. Sprint 1 — Repository and Platform Skeleton

- Bootstrap stack.
- Pin versions.
- Establish module/route structure.
- Add environment validation.
- Add CI.
- Connect preview.
- Create local database workflow.
- Implement trusted market resolver skeleton.
- Add error boundary/logging baseline.

Deliverable: deployable empty product shell.

---

## 103. Sprint 2 — Design System and Shared Layout

- Implement foundations.
- Core buttons/links/forms/cards.
- Header/footer/navigation.
- Page/container templates.
- Admin shell primitives.
- Focus/reduced-motion behavior.
- Locale-length stress test.
- Asset/image rules.

Deliverable: reusable UI foundation.

---

## 104. Sprint 3 — Content, Markets and Core Data

- Market/content publication model.
- Industry/category/product/document schema.
- Initial RLS.
- Seed fixtures.
- Homepage/industry/product templates.
- Content preview.
- en-GB canonical copy pipeline.
- uk-UA glossary start.

Deliverable: end-to-end content slice.

---

## 105. Sprint 4 — Catalogue and Documents

- Product listing/detail.
- Category/filter.
- Product relations.
- Document metadata/access policy.
- Public/private storage behavior.
- Admin draft/publish minimum.
- SEO metadata.
- component/integration tests.

Deliverable: browsable controlled product library.

---

## 106. Sprint 5 — Application Map

- Asset normalization.
- Scene/list data model.
- Responsive map.
- hotspots and product panel.
- keyboard/equivalent list.
- uk-UA-ready labels.
- performance budgets.
- editor/admin scope if required for R1.

Deliverable: accessible application discovery.

---

## 107. Sprint 6 — Forms, Project List and Notification

- Contact/support/dealer forms.
- Project List.
- Server validation.
- market attribution.
- Turnstile/rate limit.
- idempotent persistence.
- notification outbox.
- Resend adapter.
- privacy short notices.

Deliverable: reliable commercial intake.

---

## 108. Sprint 7 — Admin Sales Operations

- Admin auth/permissions.
- lead/quote/dealer queues.
- detail views.
- assignment/status/note.
- company/contact linkage.
- email/outbox status.
- audit.
- sales UAT start.

Deliverable: usable sales back office.

---

## 109. Sprint 8 — UK Integration and Hardening

- Full UK content.
- legal pages.
- critical E2E.
- RLS/permission tests.
- accessibility review.
- performance.
- SEO crawl.
- failure/retry.
- operational training.

Deliverable: UK release candidate 1.

---

## 110. Sprint 9 — UK Launch

- Defect closure.
- production provisioning.
- migration/seed.
- domain/DNS/TLS.
- monitoring/alerts.
- backup/restore.
- rollback drill.
- go/no-go.
- controlled production launch.

Deliverable: R1 production.

---

## 111. Sprint 10 — Ukraine Content Integration

Can start earlier when capacity permits.

- Page parity.
- uk-UA content import.
- Ukrainian legal pages.
- local email/form copy.
- domain/market config.
- product/claim review.
- local contact/lead routing.

Deliverable: Ukraine release candidate content-complete.

---

## 112. Sprint 11 — Ukraine QA and Hardening

- native language UAT,
- terminology,
- Cyrillic/layout,
- SEO/hreflang/canonical,
- legal/no-fallback,
- forms/email/routing,
- cross-market cache/content isolation,
- accessibility/performance.

Deliverable: G7 candidate.

---

## 113. Sprint 12 — Ukraine Launch

- final approvals,
- production domain,
- redirects/sitemap,
- monitoring segmentation,
- smoke tests,
- go/no-go,
- release/hypercare.

Deliverable: R2 production.

---

## 114. Sprint 13 — Portal Foundation

May begin after admin/auth foundation is stable.

- invite/auth/recovery,
- MFA policy,
- profile/membership,
- company scope,
- portal shell,
- permission/RLS integration tests,
- terms/privacy visibility.

Deliverable: safe portal identity slice.

---

## 115. Sprint 14 — Portal Workflows

- quote/project views,
- controlled document access,
- support request,
- notification/preferences,
- company admin scope if approved,
- audit,
- empty/error/loading,
- portal E2E.

Deliverable: pilot-complete feature set.

---

## 116. Sprint 15 — Portal Pilot

- seed/select pilot company,
- invite named users,
- access review,
- pilot training,
- daily feedback,
- defect closure,
- support runbook,
- revoke/offboard test.

Deliverable: pilot report and G9 recommendation.

---

## 117. Sprint 16 — Portal Production Rollout

- final regression/security,
- customer data preparation,
- communication,
- production flags,
- staged company enablement,
- monitoring/support,
- post-release review.

Deliverable: R3 production.

---

## 118. Sprint Sequence Is Not a Promise

The sequence is dependency architecture, not a signed delivery date.

Sprint content changes when:

- team capacity differs,
- founder decisions wait,
- content/assets arrive late,
- legal/vendor access blocks,
- risk/quality requires rework,
- scope changes.

Release gate remains fixed even if calendar shifts.

---

## 119. Delivery Capacity Scenarios

| Scenario | Typical active capacity | Expected shape |
|---|---|---|
| Lean | 1–2 delivery people, part-time reviewers | Sequential, 9–12+ months for R1–R3 |
| Standard | 3–5 delivery people + named reviewers | R1 roughly 4–5 months; R2 and R3 progressive |
| Accelerated | 6–8 focused specialists + fast decisions/content | R1–R3 roughly 5–7 months with parallel tracks |

These are planning ranges, not commercial commitments.

---

## 120. Recommended Capacity

For balanced delivery:

- 1 Product/Head Agent
- 1 UX/Design lead, heavier early
- 1 Frontend engineer
- 1 Full-stack/backend/database engineer
- 1 QA/accessibility specialist, part-time early/full near release
- 1 Content/product-data lead
- 1 UK commercial reviewer
- 1 Ukraine translator/market reviewer
- part-time DevOps/security/privacy/legal

Some roles may be combined by demonstrable skill.

---

## 121. Parallelisation Rules

Safe parallel work:

- content inventory while repo foundation builds,
- Ukrainian glossary while UK canonical content is authored,
- design tokens while database foundations begin,
- QA plan while feature contracts form,
- legal drafts while public pages build,
- portal discovery after admin/auth contracts stabilize.

Unsafe parallel work:

- multiple people changing auth resolver,
- schema-dependent features before schema contract,
- translation before canonical meaning stabilizes,
- full portal before company/RLS model,
- production deploy before runbooks/monitoring.

---

## 122. Founder Input Schedule

Founder supplies or approves:

- brand/company proposition,
- exact legal entities,
- domains,
- market contacts,
- sales routing,
- product/category priorities,
- Gersan authority,
- certificates/claims,
- dealer rules,
- portal pilot companies,
- launch dates only after gate forecast.

Unanswered decision receives owner/deadline/impact.

---

## 123. External Procurement Track

Potential purchases/accounts:

- UK domain management
- Ukraine domain and eligibility/registrant arrangements
- Vercel
- Supabase
- Cloudflare
- Resend
- corporate email
- monitoring/error provider if approved
- consent platform if approved
- legal counsel
- translation/review
- asset/font/licences

Account owner and recovery method must belong to InfraVolt-controlled access.

---

## 124. Domain and DNS Plan

- choose exact UK domain,
- choose eligible Ukraine domain strategy,
- ownership/registrar record,
- Cloudflare/DNS authority,
- Vercel verification,
- email DNS separated and tested,
- SPF/DKIM/DMARC,
- redirects,
- staging not indexed,
- renewal/recovery ownership,
- incident contacts.

---

## 125. Supabase Provisioning Plan

- local setup,
- staging project/branch decision,
- production isolation,
- region/legal transfer assessment,
- key ownership,
- migration pipeline,
- auth URL/email config,
- storage buckets/policies,
- backup/PITR plan,
- restore exercise,
- usage/budget alerts.

---

## 126. Vercel Provisioning Plan

- team/project ownership,
- Git integration,
- environment separation,
- Node/runtime compatibility,
- domains,
- preview protection,
- environment variables,
- logs/observability,
- deployment retention,
- rollback access,
- budget alerts.

---

## 127. Cloudflare and Turnstile Plan

- DNS/security responsibility,
- Turnstile site/secret keys per environment,
- server verification,
- test keys,
- rate-limit strategy,
- CSP/domain allowlist,
- outage/failure behavior,
- privacy/provider register.

---

## 128. Resend and Email Plan

- sender domain,
- SPF/DKIM/DMARC,
- from/reply-to,
- operational template ownership,
- market/language templates,
- idempotency,
- outbox,
- webhook verification,
- bounce/complaint handling,
- suppression,
- alerting,
- corporate inbox handoff.

---

## 129. Analytics Provider Decision

Before installation:

- business questions,
- minimum events,
- cookie/storage behavior,
- consent requirement,
- market/legal assessment,
- provider transfer/DPA,
- retention,
- user rights,
- performance cost,
- owner and deletion process.

No decision means optional analytics remains off.

---

## 130. Environment Variable Governance

Every variable:

- stable name,
- public/server classification,
- environments,
- owner,
- source,
- rotation,
- required/optional,
- validation,
- incident impact.

Values never appear in specification, prompt, issue, screenshot or commit.

---

## 131. Secret Ownership

- InfraVolt-controlled team vault/provider.
- Named least-privilege users.
- MFA.
- No shared personal accounts.
- Break-glass record.
- Rotation after exposure/offboarding.
- Production access log.
- Recovery codes protected.

---

## 132. Content Readiness Matrix

| Content type | Source | Technical review | Market review | Legal review |
|---|---|---|---|---|
| Corporate | Founder | As needed | UK/UA | Claims/legal |
| Product | Gersan/approved source | Required | UK/UA | Conformity/claims |
| Document | Rights owner | Required | Applicability | Access/licence |
| Industry | Content lead | Required | UK/UA | Objective claims |
| Legal | Counsel | Privacy/Product | UK/UA | Required |
| Email | Operations | Workflow owner | UK/UA | Privacy/marketing |

---

## 133. Claim Evidence Gate

Before objective claim publication:

- exact wording,
- evidence source,
- product/version,
- market,
- date/expiry,
- owner,
- permitted use,
- technical review,
- legal/commercial approval.

“Certified”, “tested” and “compliant” are not interchangeable.

---

## 134. Gersan Dependency Plan

Required clarifications:

- distributor/reseller/representative status,
- logo/trademark permission,
- image/document licence,
- product data source,
- certificate ownership/use,
- warranty and support claims,
- lead sharing/data role,
- update/withdrawal notification,
- territory/market limits.

Until resolved, affected items remain draft.

---

## 135. Application Map Dependency Plan

For every scene:

- business priority,
- source image,
- licence,
- products/solutions,
- hotspot list,
- copy,
- responsive crop,
- uk-UA text,
- accessibility list,
- technical validation,
- publish approval.

---

## 136. Translation Workflow

1. Canonical en-GB meaning approved.
2. Translation brief/glossary attached.
3. Ukrainian draft.
4. Technical terminology review.
5. Native market/commercial review.
6. Legal review if regulated/legal.
7. UI preview.
8. SEO metadata review.
9. Publish.
10. Source change triggers translation outdated state.

---

## 137. UK R1 Acceptance Criteria

- correct UK domain/en-GB,
- core public journeys complete,
- real approved content,
- product/document discovery,
- Application Map equivalent access,
- reliable form/quote persistence,
- admin sees and acts on submissions,
- operational email,
- legal pages,
- accessibility/performance/security/SEO gates,
- monitoring/backup/rollback,
- no critical/high open defect.

---

## 138. Ukraine R2 Acceptance Criteria

- Ukrainian domain and default uk-UA,
- no accidental UK legal/contact/commercial content,
- page parity decisions documented,
- translation and technical review,
- local legal pages,
- correct form/email/lead routing,
- market-specific claims,
- canonical/hreflang/sitemap,
- cross-market isolation tests,
- Ukraine reviewer approval.

---

## 139. Admin Acceptance Criteria

- authorized internal roles only,
- queues reflect database truth,
- status transitions valid,
- assignment/note audited,
- no silent email failure,
- search/filter predictable,
- PII/logging minimized,
- export controlled,
- sales team completes UAT,
- support/runbook ready.

---

## 140. Portal Acceptance Criteria

- invite-only baseline,
- authenticated company context,
- no cross-company access,
- private document access short-lived/audited,
- revocation effective,
- terms/privacy visible,
- empty/error/session states,
- pilot feedback resolved,
- support/account lifecycle ready,
- critical security tests pass.

---

## 141. Business Operations Acceptance

The system must answer:

- Who owns a new lead?
- What is response expectation?
- What happens if email fails?
- How is duplicate handled?
- Who approves a dealer?
- Who publishes product/document changes?
- Who responds to rights/security issue?
- Who disables a user?
- Who can release production?

Unknown operational ownership blocks launch.

---

## 142. Product KPIs

Initial:

- qualified enquiry/quote submissions,
- Project List completion,
- product/document discovery,
- Application Map engagement,
- dealer applications,
- admin response time,
- lead status completeness,
- portal active companies/users after R3.

KPI definitions require denominator, market and time window.

---

## 143. Delivery KPIs

- sprint goal completion,
- cycle time,
- review wait,
- blocker age,
- escaped defect,
- rework,
- deployment frequency,
- change failure,
- decision lead time,
- content readiness.

Velocity is planning signal, not performance quota.

---

## 144. Quality KPIs

- critical journey pass rate,
- automated regression health,
- accessibility defects,
- cross-browser defects,
- production error rate,
- failed form rate,
- outbox failure/backlog,
- rollback/recovery time,
- defect reopen rate.

---

## 145. Security and Privacy KPIs

- privileged MFA coverage,
- RLS/policy test coverage,
- dependency vulnerability age,
- secret exposure incidents,
- access review completion,
- rights request SLA,
- retention job health,
- breach/tabletop readiness,
- processor review completion.

No KPI encourages under-reporting.

---

## 146. SEO and Performance KPIs

- valid indexed pages by market,
- crawl errors,
- canonical/hreflang errors,
- Core Web Vitals,
- organic qualified conversions,
- non-brand discovery,
- broken links,
- metadata coverage,
- sitemap health.

Rankings alone are not product success.

---

## 147. Weekly Status Report

~~~text
Week:
Release/Gate:

Completed outcomes:
In progress:
Next:

Decisions required:
Blockers:
Top risks:
Quality/security/legal status:

Scope/budget/schedule variance:
Owner actions:
~~~

---

## 148. RAID Register

Track:

- Risks
- Assumptions
- Issues
- Dependencies

Fields:

- ID
- description
- category
- probability
- impact
- owner
- response
- due date
- status
- affected gate

---

## 149. Initial Risk Register

| Risk | Impact | Response |
|---|---|---|
| Scope too broad | Delayed half-built release | Fixed R1/R2/R3 gates |
| Founder decisions delayed | Blocked architecture/content | Weekly decision queue |
| Product data incomplete | Untrustworthy catalogue | Prioritized data pack and evidence gate |
| Gersan rights unclear | Publication/legal risk | Licence/authority track |
| Map assets unusable | UX/performance delay | Early audit and accessible fallback |
| Ukraine treated as translation | Legal/market failure | Separate release gate and native review |
| RLS/auth error | Data exposure | Default deny and integration tests |
| Portal starts too early | Public MVP delay | Separate release train |
| Email-only lead storage | Lead loss | DB transaction + outbox |
| Content arrives at end | Launch delay | Content workstream from Sprint 0 |
| Optional analytics installed early | Privacy/performance risk | Decision gate, off by default |
| Single-person knowledge | Operational fragility | Docs, review and training |

---

## 150. Schedule Risk Controls

- relative roadmap,
- dependency dates,
- decision SLA,
- content readiness tracking,
- buffer before external launch,
- no hidden QA phase,
- parallel work only where safe,
- split XL tasks,
- scope trade-off before overtime.

---

## 151. Scope Change Control

Any change states:

- request,
- business reason,
- affected release,
- benefit,
- effort,
- dependencies,
- security/legal/content impact,
- what leaves scope,
- decision owner.

“Small addition” is not accepted without impact assessment.

---

## 152. Architecture Change Control

ADR required for:

- new major dependency,
- provider change,
- data model boundary,
- public API,
- queue/cache/search service,
- auth/session approach,
- storage model,
- analytics provider,
- cross-market/domain behavior,
- deviation from modular monolith.

---

## 153. ADR Format

~~~text
ADR ID / Title
Status / Date / Owners
Context
Decision
Alternatives
Consequences
Security/privacy/legal impact
Migration/rollback
Related documents/tasks
~~~

---

## 154. RFC Usage

RFC is used when a cross-team change requires consultation before decision.

RFC does not replace:

- PR for code,
- ADR for final architecture,
- legal approval,
- release gate.

---

## 155. Budget Categories

- product/design/engineering labor
- content/product-data preparation
- translation/market review
- legal/privacy
- domains/DNS/email
- hosting/database/storage
- monitoring/security
- licences/assets/fonts
- testing/device/accessibility
- contingency

Budget is tracked per release, not only total.

---

## 156. Procurement Gate

No provider is purchased because old guide listed it.

Check:

- required capability,
- current architecture fit,
- contract/DPA/transfer,
- data region,
- security/MFA,
- export/delete,
- pricing/limits,
- vendor lock-in,
- owner/renewal,
- exit plan.

---

## 157. Defect Triage

| Priority | Rule |
|---|---|
| P0 | Active security/data-loss/production outage; immediate |
| P1 | Core journey or critical compliance failure; release blocker |
| P2 | Major behavior with workaround; fix before/soon after gate by decision |
| P3 | Minor non-core issue; backlog |
| P4 | Polish/enhancement |

Severity and business priority are related but distinct.

---

## 158. Release Candidate Process

1. Scope freeze.
2. Migration/content versions fixed.
3. Automated suite.
4. Manual exploratory.
5. Accessibility/security/privacy/SEO review.
6. Business/market UAT.
7. Defect triage.
8. Deployment/rollback rehearsal.
9. Approval evidence.
10. Go/no-go.

---

## 159. Go/No-Go Checklist

- [ ] Scope complete or accepted exclusions
- [ ] No unresolved P0/P1
- [ ] Core E2E passing
- [ ] Security/RLS approval
- [ ] Accessibility approval
- [ ] Legal/content/claim approval
- [ ] Production config/domain ready
- [ ] Backup/rollback tested
- [ ] Monitoring and owners ready
- [ ] Sales/support trained
- [ ] Incident contacts available
- [ ] Founder approval recorded

---

## 160. Release Notes Standard

- release/version/date,
- markets,
- user-visible features,
- operational changes,
- migrations,
- flags,
- known limitations,
- support notes,
- rollback reference,
- approvals.

---

## 161. Post-Launch Review

Within the agreed hypercare window review:

- business outcomes,
- form/lead reliability,
- errors/performance,
- accessibility feedback,
- SEO/index health,
- security/privacy events,
- content gaps,
- support load,
- unexpected behavior,
- R4/V1 evidence.

---

## 162. Maintenance Model

After launch:

- dependency/runtime updates,
- security patches,
- certificate/document expiry,
- content/product review,
- access review,
- backup/restore exercise,
- legal/processor review,
- broken-link/crawl review,
- alert tuning,
- cost monitoring.

---

## 163. Technical Debt Policy

Debt item records:

- reason accepted,
- risk,
- affected area,
- owner,
- remediation trigger/date,
- tests/mitigation.

“Temporary” without owner is permanent.

---

## 164. Deprecation Policy

Before removing:

- usage measured,
- dependent users/data identified,
- migration/export,
- communication,
- redirect/fallback,
- retention/legal impact,
- rollback.

---

## 165. V1 Candidate Evaluation

Score:

- commercial value,
- user evidence,
- operational savings,
- risk reduction,
- implementation cost,
- dependency,
- maintainability,
- legal/security impact.

Highest idea volume does not determine priority.

---

## 166. Features Not to Pull Forward

Unless approved evidence exists:

- full order/dispatch engine,
- ERP integration,
- advanced AI engine,
- complex SaaS multi-tenancy,
- mobile driver app,
- realtime chat,
- 3D scenes,
- generalized workflow builder,
- public developer API.

These may belong to later product documents/projects, not R1.

---

## 167. Open Programme Decisions

| ID | Decision | Owner | Required by |
|---|---|---|---|
| DEL-001 | Delivery scenario/capacity | Founder | G0 |
| DEL-002 | Repository host and ownership | Founder/CTO | G0 |
| DEL-003 | Exact UK domain | Founder | G0/G1 |
| DEL-004 | Exact Ukraine domain/entity presence | Founder/Counsel | Before G7 |
| DEL-005 | Corporate email provider/inboxes | Founder/Ops | Sprint 6 |
| DEL-006 | Product/category R1 priority | Founder/Sales | Sprint 3 |
| DEL-007 | R1 Application Map scenes | Founder/Content | Sprint 4 |
| DEL-008 | Asset/licence status | Founder/Gersan | Before publication |
| DEL-009 | Analytics provider/off decision | Product/Privacy | Before G6 |
| DEL-010 | Anonymous attachment launch | Security/Product | Sprint 6 |
| DEL-011 | Admin roles and named users | Founder/Ops | Sprint 7 |
| DEL-012 | Ukraine translator/market reviewer | Founder | Sprint 3 |
| DEL-013 | Portal pilot companies | Founder/Sales | Before G8 |
| DEL-014 | Portal MFA/account policy | Security/Product | Sprint 13 |
| DEL-015 | Production backup/PITR target | CTO/Founder | Before G6 |
| DEL-016 | Error monitoring provider need | CTO | Sprint 8 |
| DEL-017 | Quote PDF release | Product | After R1 evidence |
| DEL-018 | Order milestone scope | Product/Sales | R4 planning |

---

## 168. First 10 Working Days

### Days 1–2

- Approve R1/R2/R3 boundaries.
- Assign owners.
- Open decision/RAID registers.
- Confirm repository/vendor account ownership.

### Days 3–4

- Audit content/product/documents/assets.
- Confirm domains/entity/counsel work.
- Select initial industries/products/map scenes.

### Days 5–6

- Bootstrap repository and CI.
- Establish local environment/database.
- Create technical ADR baseline.

### Days 7–8

- Implement design tokens/layout skeleton.
- Define content/import schemas.
- Build initial end-to-end vertical slice plan.

### Days 9–10

- Preview deploy.
- Create first migration/seed.
- Demo one market-aware page.
- Review G1 gaps and Sprint 2 backlog.

---

## 169. First 30-Day Outcomes

Target outcomes, not arbitrary feature count:

- team/access/decisions working,
- repository and preview live,
- local/staging database flow,
- market/domain resolver,
- core design primitives,
- one real content vertical slice,
- product/industry/document schema,
- initial en-GB content pack,
- uk-UA glossary,
- asset/licence register,
- automated quality baseline,
- current delivery forecast.

---

## 170. Founder Immediate Checklist

- [ ] Confirm chosen UK domain
- [ ] Confirm Ukraine domain strategy
- [ ] Confirm legal entities/controller direction
- [ ] Confirm Gersan commercial/IP authority
- [ ] Name UK sales owner
- [ ] Name Ukraine market reviewer
- [ ] Name content/product-data owner
- [ ] Approve R1 product/category priorities
- [ ] Approve initial Application Map scenes
- [ ] Choose team capacity scenario
- [ ] Approve vendor/account ownership
- [ ] Confirm legal/privacy review support

---

## 171. Head Agent Startup Prompt

~~~text
You are the InfraVolt Head Agent and technical delivery owner.

Treat 00_MASTER_PROJECT_SPEC.md through
15_IMPLEMENTATION_ROADMAP_AND_DELIVERY_PLAN.md as the product constitution.

Inspect the repository before changing it. Work in small bounded tasks.
Protect the modular-monolith architecture, dual-market publication model,
default-deny authorization, database transactions, accessibility target,
privacy rules and release gates.

Do not build the full platform at once. Prioritize R1 UK Public + Sales MVP,
then R2 Ukraine Public MVP, then R3 Partner Portal MVP.

For every task state scope, allowed files, acceptance criteria and tests.
After changes run proportionate typecheck, lint, tests and build.
Never place real secrets or customer data in code, prompts, fixtures or logs.
Escalate missing business/legal decisions instead of inventing them.
~~~

---

## 172. Standard Specialist Agent Prompt

~~~text
Role:
Task ID and objective:
Target release/gate:

Read:
Allowed files:
Protected files:

In scope:
Out of scope:
Dependencies:

Acceptance criteria:
Required tests:
Security/privacy/accessibility notes:

Return:
- outcome
- files changed
- tests and results
- decisions/assumptions
- blockers/risks
~~~

---

## 173. Implementation Task Template

~~~text
ID:
Title:
Owner:
Release/Gate:
Estimate:

User/business outcome:
Requirement references:
Dependencies:
In scope:
Out of scope:
Affected contracts/files:

Acceptance criteria:
Test plan:
Telemetry:
Security/privacy/accessibility:
Content/localization:
Migration/rollback:

Status:
Evidence:
~~~

---

## 174. Pull Request Checklist

- [ ] Bounded task/reference
- [ ] No unrelated formatting/change
- [ ] Types/contracts updated
- [ ] Server validation
- [ ] Permission/RLS where relevant
- [ ] Accessible states
- [ ] Locale/market tested
- [ ] No PII/secret logging
- [ ] Tests added/updated
- [ ] Typecheck/lint/test/build pass
- [ ] Migration safe
- [ ] Docs/release notes updated
- [ ] Screens/evidence attached

---

## 175. Sprint Review Checklist

- Sprint goal outcome demonstrated.
- Real/synthetic approved data used.
- Failure states shown.
- Accessibility/permission behavior shown.
- Test evidence available.
- Risks/decisions updated.
- Incomplete work not counted done.
- Next sprint dependencies confirmed.

---

## 176. Documentation Traceability

| Document | Roadmap application |
|---|---|
| 00 | Programme boundaries and governance |
| 01 | Release requirements and acceptance |
| 02 | Routes/user journeys |
| 03 | Screen/interaction architecture |
| 04 | Tokens/components |
| 05 | Technical foundation |
| 06 | Migrations/data contracts |
| 07 | Use cases/API/workflows |
| 08 | Admin/sales operations |
| 09 | Portal release |
| 10 | Auth/security/permissions |
| 11 | Content/SEO/analytics |
| 12 | QA/accessibility gates |
| 13 | environments/deploy/observability |
| 14 | legal/privacy/compliance |
| 15 | sequence, ownership, evidence and releases |

---

## 177. Requirement Traceability Rule

Every Must/P0 requirement maps to:

- release,
- epic/task,
- implementation,
- automated/manual test,
- approval evidence.

Unmapped Must requirement blocks release completeness claim.

---

## 178. Programme Definition of Ready

Implementation may begin when:

- G0 minimum decisions are available,
- repository and access are controlled,
- R1 is bounded,
- technical source of truth accepted,
- content/assets have owners,
- legal/security review channels exist,
- team can review produced work.

---

## 179. Programme Definition of Done

The programme is not done at first launch.

R1–R3 programme is done when:

- UK public/sales MVP operates,
- Ukraine public MVP operates,
- portal release reaches approved scope,
- operations/support owns routine work,
- monitoring/backup/incident processes work,
- documentation/training complete,
- critical risks closed or explicitly accepted,
- post-launch review sets R4 priorities.

---

## 180. Recommended Immediate Execution Order

1. Close DEL-001–008 blockers.
2. Create/inspect the real code repository.
3. Establish G1 foundation.
4. Build one vertical slice:
   market resolution → product data → public page → admin draft → test → preview.
5. Lock design/content/data patterns.
6. Expand catalogue and Application Map.
7. Add reliable forms/outbox.
8. Complete admin sales operations.
9. Harden and launch UK.
10. Complete and launch Ukraine.
11. Pilot portal.

---

## 181. Why Vertical Slice First

The first slice verifies:

- repo/deploy,
- market resolution,
- database,
- content model,
- design system,
- server rendering,
- SEO metadata,
- admin/public boundary,
- tests,
- review workflow.

This exposes architectural problems before dozens of pages depend on them.

---

## 182. Delivery Anti-Patterns

Do not:

- generate all pages before real content,
- let each agent invent folders/types,
- treat hidden UI as authorization,
- store leads only in email,
- launch Ukrainian pages through English fallback,
- start portal before company/RLS model,
- merge giant unreviewable patches,
- add providers/dependencies by preference,
- defer QA/accessibility/security to the end,
- publish unverified technical claims,
- use production data in previews,
- call a release complete without operations handoff.

---

## 183. Decision on Existing Agent Plan

The uploaded InfraVolt UK agent execution plan is useful as an initial role inventory.

This document supersedes it where:

- project is now UK + Ukraine,
- 00–14 specifications define stronger contracts,
- stack/runtime decisions are newer,
- privacy/legal/security gates are explicit,
- public MVP, Ukraine release and portal are separated,
- tasks require evidence and production operations.

Old subagent prompts may be adapted only through the standard task package in this document.

---

## 184. Sonuç

InfraVolt development programme:

- public sales value first,
- shared UK/Ukraine foundation,
- real market publication,
- bounded agent/human work,
- database-backed commercial workflow,
- default-deny security,
- evidence-based quality,
- controlled launch and operations

ile yürütülecektir.

En önemli delivery kararları:

1. UK Public + Sales MVP first production release’tir.
2. Ukraine public release portalı beklemez.
3. Partner Portal ayrı pilot ve release gate’ine sahiptir.
4. Content, product evidence, rights and legal work Sprint 0’dan başlar.
5. Agentlar bounded tasks ve file ownership ile çalışır.
6. Code complete, production ready anlamına gelmez.
7. Gate başarısızsa takvim uğruna release yapılmaz.
8. R4/V1 scope gerçek kullanım kanıtıyla seçilir.

---

## 185. Document Control

### 185.1 Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1.0 | 15 July 2026 | InfraVolt Product Team | Initial implementation roadmap, roles, workstreams, stage gates, sprint/release plan, delivery scenarios, quality controls and agent execution model |

### 185.2 Change Control

Release sequence, gate, scope, capacity, role, critical dependency, launch acceptance, vendor or programme governance değişikliği bu belgenin version update’ini gerektirir.

### 185.3 Approval

Required approval:

- Founder / CEO
- Product Director / Head Agent
- Design Lead
- Engineering Lead
- QA/Accessibility Lead
- Security/Privacy Lead
- UK Market/Sales Owner
- Ukraine Market Owner
- Legal Counsel for applicable gates

