# InfraVolt — Test, QA and Accessibility

> Document ID: INF-12  
> Version: 0.1.0  
> Status: Draft for Founder, Product, QA, Accessibility, Security and Technical Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Quality Owner: QA Lead / Product Lead  
> Accessibility Owner: Product Designer / Accessibility Reviewer  
> Security Owner: Technical Owner / Security Reviewer  
> Technical Owner: Product Director / CTO / Head Agent  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0, 06_DATABASE_SCHEMA.md v0.1.0, 07_BACKEND_API_AND_WORKFLOWS.md v0.1.0, 08_ADMIN_AND_SALES_OPERATIONS.md v0.1.0, 09_PARTNER_PORTAL.md v0.1.0, 10_AUTH_SECURITY_AND_PERMISSIONS.md v0.1.0, 11_CONTENT_SEO_AND_ANALYTICS.md v0.1.0  
> Product surfaces: Public Site + Admin + Partner Portal  
> Required markets: United Kingdom + Ukraine  
> Required public locales: en-GB + uk-UA  
> Runtime baseline: Next.js 16 App Router + Node.js 24 + TypeScript + Supabase  
> Automation baseline: Vitest + React Testing Library + Playwright  
> Accessibility target: WCAG 2.2 Level AA  
> Last updated: 15 July 2026  
> Document language: Turkish; test, code, route, schema, event and fixture identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt’un test, quality assurance ve accessibility sözleşmesini tanımlar.

Belge:

- kalite sahipliğini,
- risk temelli test stratejisini,
- test ortamı ve synthetic data kurallarını,
- unit, component, integration, database ve E2E katmanlarını,
- Public Site, Admin ve Partner Portal kritik yolculuklarını,
- authentication, authorization, RLS ve company isolation kontrollerini,
- content, localization, SEO ve analytics doğrulamasını,
- Core Web Vitals ve performans kalite kapılarını,
- WCAG 2.2 AA conformance yaklaşımını,
- manual assistive technology testlerini,
- defect, flaky test, evidence ve exception yönetimini,
- pull request, nightly, release ve production smoke gate’lerini

kesinleştirir.

Bu belge yalnız “test yapıldı” checklist’i değildir. Requirement’tan production evidence’a uzanan quality operating system’dir.

---

## 2. Ana Karar

InfraVolt production release’i şu tek cümleyle yönetilir:

> Kritik business journey, authorization boundary, market/locale davranışı ve accessibility acceptance’ı kanıtlanmadan özellik tamamlanmış sayılmaz.

Kalite:

- yalnız QA kişinin işi değildir,
- yalnız automated test sayısı değildir,
- yalnız son hafta regression değildir,
- yalnız happy path değildir,
- yalnız Lighthouse veya axe skoru değildir.

Her özellik; product, content, UX, accessibility, functional, security, SEO ve performance etkisine göre test edilir.

---

## 3. Numaralandırma Uyumluluk Notu

Önceki belgelerin bazı draft bölümlerinde test dokümanı geçici olarak `11_TEST_QA_AND_ACCESSIBILITY.md` adıyla anılmıştır.

Kanonik dosya:

`12_TEST_QA_AND_ACCESSIBILITY.md`

olarak kabul edilir.

Eski placeholder referansları bu belgeyi işaret eder; belgeler revize edilirken dosya adı ayrıca düzeltilir.

---

## 4. Kalite Hedefleri

- Qualified quote/dealer/document taleplerinin kaybolmaması
- UK ve Ukraine domain/market/locale ayrımının doğru çalışması
- Company ve market scope dışına veri sızmaması
- Public content’in doğru, published ve indexlenebilir olması
- Admin workflow’larının geçersiz state üretmemesi
- Partner Portal’ın güvenilir self-service deneyimi sunması
- Keyboard ve assistive technology ile kritik görevlerin tamamlanması
- Temel public sayfaların Core Web Vitals “good” aralığında kalması
- Provider arızalarının business record kaybına dönüşmemesi
- Release kararının yorum yerine izlenebilir evidence’a dayanması
- Regression’ın mümkün olduğunca merge öncesinde yakalanması
- Production incident sonrası aynı hatanın regression testine dönüşmesi

---

## 5. Quality Principles

### 5.1 Risk before volume

Bin düşük değerli assertion, tek bir cross-company erişim testinin yerini tutmaz.

### 5.2 Test the contract

Implementation detail yerine kullanıcı, domain, API, database ve security contract test edilir.

### 5.3 Default deny is tested negatively

Yetkili kullanıcının erişmesi kadar yetkisiz kullanıcının erişememesi de kanıtlanır.

### 5.4 Deterministic by default

Clock, random data, external providers ve async job davranışı kontrol edilebilir olmalıdır.

### 5.5 Production-like, never production data

Test ortamı representative olur; gerçek müşteri veya production export’u içermez.

### 5.6 Accessibility is a functional requirement

Keyboard ile tamamlanamayan quote form işlevsel olarak da başarısızdır.

### 5.7 Automation supports, humans verify

Automated accessibility scan WCAG conformance kararı değildir.

### 5.8 Flaky is broken

Tekrar çalıştırınca bazen geçen test güvenilir quality gate değildir.

### 5.9 Evidence over memory

Release approval; test report, issue, screenshot, trace, audit veya signed checklist ile kaydedilir.

### 5.10 Small, reversible releases

Küçük change set regression alanını ve rollback riskini azaltır.

---

## 6. Kapsam

### 6.1 Dahil

- Public Site
- UK ve Ukraine domain davranışı
- Admin
- Partner Portal
- Authentication ve invitations
- Product, content ve Application Map
- Quote, dealer, project-support ve document request
- Controlled partner documents
- Notifications, email outbox ve webhooks
- PostgreSQL schema, constraints, RPC ve RLS
- Supabase Auth ve Storage boundary
- SEO metadata ve indexing controls
- Analytics event contracts
- Accessibility ve assistive technology
- Performance, resilience ve release verification

### 6.2 Kapsam dışı veya ayrı onay gerektirenler

- Gersan upstream sistemlerinin internal QA’sı
- Third-party provider’ın kendi internal testleri
- Formal legal compliance audit
- Formal accessibility certification
- Full external penetration test
- Native mobile application testing
- Hardware/electrical product certification testing

Bu alanlar InfraVolt integration boundary’sinde yine test edilir.

---

## 7. Quality Surface Model

| Surface | Primary quality risk | Test emphasis |
|---|---|---|
| Public Site | Yanlış content/market, kayıp lead, SEO/performance/accessibility | Journey, localization, content, metadata, forms, CWV |
| Admin | Yanlış workflow/permission/market mutation | RBAC/ABAC, state transition, audit, concurrency |
| Partner Portal | Cross-company leakage, document access, confusing self-service | RLS, object authorization, company scope, portal UX |
| Shared backend | Transaction failure, duplicate, provider outage | Integration, RPC, idempotency, outbox, resilience |
| Database/Storage | Constraint veya policy açığı | Migration, grants, RLS, storage policy, query plan |

---

## 8. Quality Ownership

Quality Owner koordinasyon sağlar; kaliteyi tek başına “veren kişi” değildir.

| Role | Primary accountability |
|---|---|
| Founder / Product Owner | Business acceptance ve release risk kabulü |
| Product Lead | Requirement traceability, acceptance ve UAT |
| Designer | UX, responsive ve accessibility design acceptance |
| Frontend Engineer | Component, interaction, browser ve client accessibility testleri |
| Backend Engineer | Domain, integration, transaction, authorization ve resilience testleri |
| Database Engineer | Migration, constraint, RLS, grant ve query performance testleri |
| Content / Market Lead | Content accuracy, en-GB/uk-UA ve market appropriateness |
| SEO Lead | Metadata, canonical, hreflang, sitemap ve indexing |
| QA Lead | Strategy, risk coverage, exploratory, regression ve evidence |
| Security Reviewer | Threat-driven negative tests ve security gate |
| Operations Owner | Production smoke, alert, runbook ve incident verification |

Bir kişi birden fazla rolü üstlenebilir; accountability kaybolmaz.

---

## 9. Three Amigos Kuralı

Yüksek riskli feature geliştirmeden önce en az şu üç bakış birlikte acceptance criteria’yı inceler:

1. Product/business
2. Design/content
3. Engineering/QA

Security veya accessibility riski yüksekse ilgili reviewer dahil edilir.

Çıktı:

- happy path,
- negative path,
- boundary conditions,
- data/permission scope,
- locale/market behavior,
- accessibility behavior,
- observability/evidence

olarak issue içinde tutulur.

---

## 10. Risk Classification

| Risk class | Definition | Examples | Minimum expectation |
|---|---|---|---|
| R0 — Critical | Veri sızıntısı, privilege escalation, business record kaybı, severe outage | Cross-company document, lost quote, auth bypass | Unit/integration/E2E negative evidence + manual review |
| R1 — High | Ana journey tamamlanamaz veya ciddi yanlış business state | Quote submit, dealer approval, publish | Integration + E2E + exploratory |
| R2 — Medium | Önemli işlev bozulur fakat workaround var | Filter, export, noncritical notification | Unit/component/integration as applicable |
| R3 — Low | Cosmetic veya düşük etkili içerik problemi | Minor spacing, noncritical copy | Review/manual or targeted automation |

R0/R1 değişiklikler release note ve explicit acceptance gerektirir.

---

## 11. Requirement Traceability

Her implementation issue en az bir requirement veya risk kimliğine bağlanır.

Önerilen kimlik biçimleri:

- `REQ-*` — product requirement
- `SEC-*` — security control
- `A11Y-*` — accessibility requirement
- `SEO-*` — SEO requirement
- `PERF-*` — performance requirement
- `TQ-*` — test/quality control
- `BUG-*` — defect

Test case adı mümkünse requirement kimliğini taşır:

```text
REQ-QUOTE-004 submit multi-item project quote atomically
SEC-AUTHZ-012 deny partner access to another company quote
A11Y-FORM-006 move focus to linked error summary
```

---

## 12. Evidence Model

Kabul edilebilir evidence:

- automated test result
- CI job URL/result
- Playwright trace/video/screenshot when failure investigation requires it
- manual test session record
- accessibility checklist
- assistive technology notes
- database query plan
- security test report
- UAT approval
- production smoke result
- analytics/debug event record with personal data removed

Screenshot tek başına behavior kanıtı değildir; context ve expected result ile saklanır.

---

## 13. Test Pyramid

InfraVolt test katmanları:

1. Static quality checks
2. Unit tests
3. Component/interaction tests
4. Application integration tests
5. Database/RLS/transaction tests
6. End-to-end tests
7. Manual exploratory, accessibility ve UAT

E2E suite her permutation’ı taşımaz. Business logic mümkün olan en alt güvenilir katmanda test edilir.

---

## 14. Toolchain Baseline

| Need | Baseline |
|---|---|
| Type safety | TypeScript strict checks |
| Lint/static rules | ESLint + project rules |
| Unit/integration | Vitest |
| Component behavior | React Testing Library + Vitest |
| Browser E2E | Playwright Test |
| Accessibility automation | `@axe-core/playwright` or equivalent axe-core integration |
| Database local integration | Supabase local stack + PostgreSQL test database |
| API/schema validation | Zod contract tests + HTTP/RPC integration |
| Performance lab | Lighthouse/Playwright timing + bundle analysis as agreed |
| Security dependency checks | Package audit/advisory checks in CI policy |

Yeni tool eklemek; bakım, CI süresi, duplicate capability ve false-positive etkisi incelenmeden yapılmaz.

---

## 15. Repository Test Layout

Önerilen yapı:

```text
apps/web/
  src/**/*.test.ts
  src/**/*.test.tsx
  tests/
    integration/
    accessibility/
    e2e/
      public/
      admin/
      portal/
      security/
packages/
  domain/**/*.test.ts
  db/tests/
supabase/
  tests/
    schema/
    rls/
    rpc/
    performance/
test/
  fixtures/
  factories/
  helpers/
  contracts/
```

Exact monorepo yapısı 05_TECHNICAL_ARCHITECTURE.md ile uyumlu hale getirilir.

---

## 16. Test Naming Convention

Test adı actor, action ve expected outcome’u anlatmalıdır.

İyi:

```text
partner member cannot read a quote owned by another company
uk-UA product without publication returns market-safe 404
quote transaction stores submission and outbox message once
```

Zayıf:

```text
works
test quote
auth test 2
```

---

## 17. Tags ve Suite Classification

Önerilen tags:

- `@smoke`
- `@regression`
- `@critical`
- `@security`
- `@a11y`
- `@seo`
- `@performance`
- `@uk`
- `@ua`
- `@admin`
- `@portal`
- `@provider`
- `@slow`

Tag, test’in gerçek çalıştırılma politikasına bağlı olmalıdır; dekoratif metadata değildir.

---

## 18. Test Environment Strategy

| Environment | Purpose | Data | External effects |
|---|---|---|---|
| Local | Fast development and integration | Deterministic synthetic seed | Mock/test providers |
| CI ephemeral | Merge gate | Fresh isolated database | No real customer email |
| Preview | Feature/UAT visual verification | Synthetic isolated data | Sandbox/test endpoints |
| Staging | Release rehearsal | Representative synthetic data | Provider test mode or controlled allowlist |
| Production | Smoke/monitoring only | Real operational data | Real effects, safest possible read/write probes |

Production destructive veya synthetic lead-generating testlerle kirletilmez.

---

## 19. Environment Parity

Staging production’a şu alanlarda benzemelidir:

- runtime major versions,
- database extensions,
- migration order,
- RLS/grants,
- storage bucket policy,
- hostname/market resolution,
- caching topology,
- scheduled jobs,
- security headers,
- provider adapter configuration.

Secret values, recipient addresses ve data gerçek olmak zorunda değildir.

---

## 20. Environment Isolation

- Her CI run ayrı schema/database veya temiz reset kullanır.
- Parallel worker’lar unique entity prefix/ID kullanır.
- Preview ortamı production database’e bağlanamaz.
- Test storage bucket production bucket değildir.
- Test email recipient allowlist dışına çıkamaz.
- Test webhook secret production secret değildir.
- UK ve Ukraine hostname testleri explicit project/config ile çalışır.

---

## 21. Test Data Policy

### 21.1 Allowed

- Synthetic people and companies
- Fake business email domains
- Deterministic product/catalog records
- Representative long Ukrainian text
- Safe sample files
- Generated IDs and timestamps

### 21.2 Forbidden

- Production database export
- Real customer lead copy
- Real partner documents
- Production access token/session
- Real mailbox without explicit controlled test purpose
- Secrets in fixture, snapshot, screenshot or trace

### 21.3 Data minimisation

Bir test için gerekli olmayan field doldurulmaz.

---

## 22. Canonical Fixture Set

Minimum fixture set:

| Fixture | Required variants |
|---|---|
| Market | `UK`, `UA` |
| Locale | `en-GB`, `uk-UA` |
| User state | invited, active, suspended, deactivated |
| Internal role | super admin, content, sales, dealer manager, readonly |
| Partner role | partner admin, member, viewer |
| Company | company A, company B, suspended company |
| Product | UK published, UA published, unpublished, archived |
| Quote | new, acknowledged, in progress, closed |
| Document | public metadata, gated, company grant, expired/revoked grant |
| Notification | unread, read, archived |

Company A ve Company B negative authorization testlerinin temelidir.

---

## 23. Factory Rules

- Factory default’u valid minimum entity üretir.
- Invalid state explicit override ile üretilir.
- Factory database constraint’i gizlemez.
- Locale-dependent text gerçekçi uzunlukta örnek içerir.
- Permission testinde “admin gibi çok yetkili default user” kullanılmaz.
- Random generation seed edilebilir olmalıdır.

---

## 24. Clock ve Timezone Testing

Saat bağımlı alanlar kontrollü clock ile test edilir:

- invitation expiry
- signed document expiry
- notification timestamps
- SLA age
- rate-limit window
- retry/backoff
- scheduled job
- Ukraine/UK daylight-saving boundary

Business timestamp database’te UTC tutulur; UI locale/timezone gösterimi ayrıca test edilir.

---

## 25. External Provider Test Policy

Normal CI provider’a gerçek request göndermeden adapter contract’ını test eder.

| Provider boundary | Test approach |
|---|---|
| Resend/email | Adapter mock + provider payload contract + controlled staging smoke |
| Email webhook | Signed fixture, invalid signature, replay and duplicate event |
| Cloudflare Turnstile | Official test keys in E2E environment + forged/missing token tests |
| Supabase Auth | Local/test project with synthetic users |
| Supabase Storage | Test bucket and policy tests |
| Analytics | Typed adapter capture; no real personal data |

Provider sandbox başarı testi, InfraVolt transaction testinin yerini tutmaz.

---

## 26. Static Quality Gates

Her pull request için minimum:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e:smoke
```

Gerekli ek gate’ler:

- migration lint/check
- generated type drift check
- forbidden secret scan
- dependency advisory policy
- route/metadata contract tests
- changed-scope integration suites

---

## 27. Unit Test Scope

Unit test öncelikleri:

- market/locale resolution
- hostname normalization
- canonical/hreflang builders
- quote validation and calculation rules
- status transition guards
- permission predicates
- document grant expiry logic
- rate-limit key generation
- idempotency key handling
- analytics event schema
- safe DTO mappers
- email template input mapping
- search/filter helpers
- date/number formatting wrappers
- content fallback decisions

Framework veya trivial getter için test yazmak hedef değildir.

---

## 28. Boundary ve Property Tests

Uygun domain functions için:

- empty/min/max lengths
- zero/negative/overflow numeric values
- Unicode and Cyrillic
- whitespace normalization
- duplicate identifiers
- case normalization
- invalid state combinations
- timestamp boundary
- list count and pagination boundary

test edilir.

Property-based testing değerli olduğu alanlarda sonradan eklenebilir; MVP hard dependency değildir.

---

## 29. Coverage Policy

Coverage bir risk sinyalidir; kalite kanıtının tamamı değildir.

Başlangıç politikası:

- Yeni/changed business logic test edilmeden merge edilmez.
- Authorization, state transition, market resolution, idempotency ve document policy branch’leri yüksek kapsam alır.
- Coverage düşüşü PR review’da açıklanır.
- Generated code, type-only files ve thin framework wiring bilinçli exclude edilebilir.
- Global yüzde hedefi ilk stable baseline ölçümünden sonra CI gate olarak dondurulur.

Geçici öneri:

| Scope | Advisory floor before baseline freeze |
|---|---:|
| Changed business/domain code | 80% branch coverage |
| Security-critical pure policy code | 90% branch coverage |

Yüzdeyi yükseltmek için anlamsız snapshot/assertion eklenmez.

---

## 30. Component Test Scope

Component testleri browser’a göre daha hızlı biçimde şunları doğrular:

- visible state
- accessible role/name
- keyboard interaction
- focus movement
- validation/error relationship
- loading/empty/error/success states
- locale expansion
- permission-controlled actions
- callback/event contract

CSS pixel-perfect layout component testinin ana amacı değildir.

---

## 31. Component State Matrix

Her reusable component uygun olduğunda şu state’lerle değerlendirilir:

- default
- hover
- focus-visible
- active/pressed
- selected
- disabled
- readonly
- loading
- empty
- error
- success
- long en-GB text
- long uk-UA text
- narrow viewport
- high zoom

State desteği olmayan component için irrelevant satır açıkça atlanabilir.

---

## 32. Form Component Tests

Form controls için:

- programmatic label
- required state
- description association
- invalid state
- inline error association
- error summary link/focus
- keyboard submission
- pending state and duplicate prevention
- server error preservation
- locale-specific message
- autocomplete purpose
- paste/password-manager behavior where applicable

test edilir.

---

## 33. Snapshot Policy

Large DOM snapshot’ları baseline değildir.

Snapshot yalnız:

- stable serialized contract,
- generated metadata object,
- email structure,
- safe schema output

gibi bilinçli review edilen alanlarda kullanılır.

Snapshot update komutu değişikliği otomatik doğru yapmaz.

---

## 34. Visual Regression Policy

Visual regression hedefli kullanılır:

- header/navigation
- product cards/grids
- Application Map panel
- quote project list
- admin data table
- portal document/quote screens
- critical responsive breakpoints
- en-GB/uk-UA expansion

Rules:

- deterministic fonts/data/clock
- dynamic areas masked only with reason
- baseline change human-reviewed
- minor anti-aliasing noise için aşırı tolerans verilmez
- visual pass accessibility pass anlamına gelmez

MVP’de tool seçimi implementation sırasında kesinleşebilir.

---

## 35. Application Integration Tests

Next.js application boundary’sinde:

- Server Actions
- Route Handlers
- form parsing and Zod validation
- auth context resolution
- permission guard
- DAL query/filter
- provider adapter
- cache invalidation intent
- structured response/error mapping

test edilir.

Server Action direct attacker request modeliyle çağrılabilir kabul edilir.

---

## 36. API/RPC Contract Tests

Her mutable endpoint/RPC için minimum:

- valid request
- missing field
- wrong type
- oversized payload
- unexpected field policy
- unauthenticated
- unauthorized role
- wrong market/company/object
- duplicate/idempotent replay
- invalid state transition
- provider/database failure
- safe error output

test edilir.

Internal exception veya database detail response’a sızmamalıdır.

---

## 37. Database Schema Tests

Migration sonrası doğrulanır:

- required table/column/type
- primary and foreign keys
- unique constraints
- check constraints
- enum/domain behavior
- defaults
- `NOT NULL`
- indexes
- RLS enabled state
- grants/revokes
- trigger/function ownership and security mode
- storage bucket policy

Schema testleri yalnız ORM typecheck’ine bırakılmaz.

---

## 38. Migration Tests

Her migration:

1. Fresh database’e apply edilir.
2. Önceki stable schema’dan forward apply edilir.
3. Seed/test suite çalıştırılır.
4. Generated types güncellenir.
5. Destructive/data migration ise representative copy üzerinde rehearsal yapılır.
6. Lock/downtime riski review edilir.
7. Roll-forward veya restore planı kaydedilir.

Production RLS’yi geçici kapatan migration kabul edilmez.

---

## 39. RLS Test Matrix

Her protected entity için minimum:

| Actor | Expected |
|---|---|
| Anonymous | Denied unless explicitly public-safe view |
| Unauthenticated function call | Denied |
| Correct internal permission + market | Allowed |
| Internal role without permission | Denied |
| Correct partner company member | Allowed only scoped rows |
| Another company member | Denied |
| Suspended/revoked membership | Denied |
| Wrong market | Denied unless explicit cross-market permission |
| Service path | Explicit, narrow and separately tested |

Policy change negative tests olmadan merge edilmez.

---

## 40. RLS Protected Entity Set

En az:

- partner companies
- company memberships
- quotes and quote items
- partner-visible projects/orders when introduced
- document grants
- document access logs
- notifications
- saved lists
- internal-only operational tables
- storage objects

RLS/grant test kapsamına girer.

---

## 41. Transaction/RPC Tests

Critical workflows:

- quote header + items + event + outbox atomic commit
- invalid item causes full rollback
- repeated idempotency key returns same business reference
- outbox created once
- concurrent dealer/quote update obeys optimistic/version rules
- invalid status transition rejected
- expired/revoked document grant denied
- notification state change scoped to actor
- audit record created with safe fields

Business record commit olup notification provider fail ederse business record kaybolmaz.

---

## 42. Database Performance Tests

Representative non-production data üzerinde `EXPLAIN (ANALYZE, BUFFERS)` ile incelenir:

- public product/category listing
- public search where introduced
- admin quote queue
- admin dealer application queue
- partner quote list/detail
- document access helper
- permission/RLS helpers
- notification feed
- outbox claim job

Review:

- unexpected sequential scan
- N+1 query
- unbounded select
- policy/helper repeated cost
- poor sort/filter index
- excessive row transfer

sonuçlarını kaydeder.

---

## 43. E2E Strategy

Playwright gerçek browser düzeyinde yalnız kritik cross-layer davranışı doğrular.

E2E test:

- kullanıcı gözünden başlar,
- UI üzerinden ilerler,
- gerektiğinde API/database fixture ile hazırlanır,
- stable user-visible locator kullanır,
- business result’ı doğrular,
- başka teste bağımlı olmaz.

`waitForTimeout` normal synchronization yöntemi değildir.

---

## 44. E2E Locator Policy

Öncelik:

1. Role + accessible name
2. Label
3. Visible text
4. Stable test ID only when semantic locator insufficient

CSS class ve DOM ancestry locator’ları brittle kabul edilir.

Accessible locator kullanımı accessibility testinin tamamı değildir; fakat semantic regression’ı erken yakalar.

---

## 45. Browser Matrix

| Browser engine / browser | PR smoke | Nightly regression | Pre-release manual |
|---|---:|---:|---:|
| Chromium | Full critical | Full | Chrome + Edge current |
| Firefox | Critical | Full | Firefox current |
| WebKit | Critical | Full | Safari current on real Apple device |
| Mobile Chromium emulation | Critical public | Full public | Real Android smoke |
| Mobile WebKit emulation | Critical public | Full public | Real iPhone/iPad smoke |

Playwright emulation gerçek cihaz testinin yerine tamamen geçmez.

Support policy:

- current and previous major stable where practical,
- browser usage/partner need ile yeniden değerlendirme,
- unsupported browser için graceful core content erişimi.

---

## 46. Viewport ve Input Matrix

Minimum representative profiles:

- narrow mobile portrait
- mobile landscape
- tablet portrait
- standard laptop
- wide desktop
- keyboard-only desktop
- touch input
- 200% zoom
- 400% reflow equivalent

Exact pixels design token/breakpoint sözleşmesiyle senkron tutulur.

---

## 47. Domain/Locale E2E Projects

Playwright projects/config en az şu kombinasyonları destekler:

| Host context | Locale | Expected market |
|---|---|---|
| UK canonical domain | en-GB | UK |
| Ukraine canonical domain | uk-UA | UA |
| Preview/local UK override | en-GB | UK |
| Preview/local UA override | uk-UA | UA |

Test yalnız language string’e bakmaz; market attribution, contact details, metadata ve submitted record scope’unu da doğrular.

---

## 48. E2E Suite Levels

### 48.1 Smoke

- site boots
- canonical key page renders
- critical login works
- one quote flow
- one admin queue read
- one portal authorized read
- security-critical denial

### 48.2 Critical regression

R0/R1 journeys ve negative authorization cases.

### 48.3 Full regression

Broader filters, states, browser matrix, locales, content and secondary flows.

### 48.4 Exploratory charter

Script dışı risk investigation.

---

## 49. Release-Blocking End-to-End Journeys

1. UK visitor product detail’den single-item quote gönderir.
2. UK visitor Project List’e birden fazla item ekleyip structured quote gönderir.
3. Ukraine domain uk-UA içerik ve UA contact context gösterir.
4. Ukraine submission Admin’de `UA` market olarak görünür.
5. Email provider fail ederken business submission kaybolmaz.
6. Visitor controlled technical document request’i gönderir.
7. Authorized partner granted document’i signed delivery ile açar.
8. Unauthorized partner başka company document/quote’una erişemez.
9. Dealer application approval kullanıcıya otomatik dealer role vermez.
10. Application Map keyboard ve mobile accessible list alternatifiyle çalışır.
11. Unpublished product search, sitemap, related content ve direct route’tan sızmaz.
12. Missing market translation silent wrong-language publication oluşturmaz.
13. Internal user permission dışında action çalıştıramaz.
14. Admin publish sonrası public cache doğru invalidate/revalidate olur.

Bu senaryolardan biri başarısızsa ilgili surface release edilmez.

---

## 50. Public Site Journey Matrix

| Journey | Happy path | Required negative/boundary |
|---|---|---|
| Browse product | Category → detail → CTA | unpublished/archived/missing locale |
| Application Map | hotspot/list → solution/product | keyboard, no-image/list-only, mobile |
| Project List | add/update/remove → submit | duplicate, max count, stale/unavailable item |
| Quote | valid submit → reference | invalid, spam, duplicate, provider failure |
| Dealer application | submit → acknowledgement | invalid company data, spam, duplicate |
| Document request | request → acknowledgement | unauthorized direct file, expired link |
| Market switch | equivalent destination | missing equivalent, host mismatch |
| Contact | correct market details | wrong-market attribution |

---

## 51. Application Map Test Charter

Application Map için:

- image loads progressively
- structured hotspot data maps correct products
- hotspot accessible name meaningful
- keyboard tab order logical
- Enter/Space activates applicable control
- focus visible and not obscured
- panel closes with Escape and focus returns
- mobile list alternative provides same destinations
- no hover-only information
- image missing still leaves useful HTML content
- uk-UA labels do not clip
- touch targets meet product baseline
- zoom/reflow remains usable
- map is lazy-loaded without layout shift

test edilir.

Map image üzerindeki text primary accessible content değildir.

---

## 52. Public Form Security/Quality Matrix

Her public mutation formu için:

- missing Turnstile
- forged/invalid Turnstile
- reused/replayed token
- atomic rate-limit boundary
- rate-limit key bypass attempt
- duplicate submission
- idempotency replay
- oversized string/list/file
- XSS/HTML payload
- host/market spoof
- direct endpoint call
- invalid content type
- provider timeout
- safe user error
- stored business record and audit/outbox correctness

test edilir.

---

## 53. Admin Journey Matrix

| Area | Critical behavior |
|---|---|
| Login | Authorized internal user enters correct surface |
| Quote queue | Market-scoped list, filters, detail and assignment |
| Quote workflow | Valid status transitions, notes, audit and concurrency |
| Dealer applications | Review/decision without automatic role grant |
| Content | Draft/review/publish/unpublish with locale/market scope |
| Product data | Valid technical data and publication rules |
| Documents | Metadata, classification, grants and revocation |
| Users/roles | Invite, membership, least privilege, deactivation |
| Export | Permission, market scope, audit and safe columns |

UI action hidden olsa bile direct mutation denial test edilir.

---

## 54. Admin Negative Matrix

- no session
- partner session on admin route
- valid internal role without required permission
- wrong market scope
- direct Server Action/Route Handler invocation
- self role elevation
- last super-admin removal
- stale version/concurrent update
- invalid workflow transition
- unpublished content preview escape
- export without permission
- audit log tampering attempt
- service-role-only operation via user surface

Her denial güvenli, observable ve data-leak-free olmalıdır.

---

## 55. Partner Portal Journey Matrix

| Journey | Critical acceptance |
|---|---|
| Invitation | valid acceptance, expired/reused denial |
| Sign-in | safe redirect to portal, correct session |
| Dashboard | only company-scoped summary |
| Quotes | create/list/detail only permitted company records |
| Documents | granted current documents only |
| Notifications | actor-scoped feed and safe deep link |
| Company members | partner admin only, no privilege escape |
| Profile/support | safe update/request and audit |

---

## 56. Partner Portal Cross-Company Suite

Company A actor, Company B identifiersini şu yöntemlerle dener:

- direct URL
- route parameter
- query/filter
- search
- API/RPC body
- nested resource ID
- document key
- signed link tampering
- notification deep link
- pagination cursor
- export/download

Beklenti:

- no data,
- no metadata leak,
- no timing-dependent obvious enumeration where practical,
- no mutation,
- safe audit/security signal.

Herhangi bir cross-company erişim release blocker’dır.

---

## 57. Authentication E2E Suite

- valid login
- invalid login without user enumeration
- invitation acceptance
- expired/reused invitation
- safe return path
- open redirect denial
- session fixation resistance
- logout/revocation
- suspended/deactivated user
- stale session after membership change
- callback host confusion
- brute-force/rate-limit behavior
- MFA/recovery where enabled
- cookie security flags in production-like environment

Browser password manager ve paste engellenmez.

---

## 58. Notification and Email Tests

### 58.1 Template

- correct market/locale
- correct recipient class
- no secret/private data beyond need
- valid link host
- expired link behavior
- plain-text fallback
- accessible semantic structure

### 58.2 Outbox

- claim once
- retry transient failure
- stop/alert permanent failure
- duplicate event idempotency
- business record independent of provider success
- safe log redaction

### 58.3 Webhook

- valid signature
- invalid/missing signature
- replay
- duplicate event
- out-of-order event
- unknown event type
- safe failure/retry

---

## 59. Cache and Revalidation Tests

- published public content becomes visible
- unpublished content disappears
- correct locale/market cache key
- one market publish does not expose another market
- protected page is not publicly cached
- personalized response is not shared
- `Set-Cookie` response is not incorrectly CDN-cached
- stale data window matches policy
- failure falls back safely

Cache success yalnız “page refreshed” gözlemiyle kabul edilmez.

---

## 60. SEO QA Scope

Public indexable templates için:

- status code
- title
- meta description
- canonical
- hreflang
- robots directive
- sitemap inclusion
- structured data
- Open Graph/social metadata
- heading structure
- internal links
- rendered HTML content
- image alt purpose
- unpublished/private exclusion

test edilir.

---

## 61. Canonical and Hreflang Tests

- canonical absolute and correct host
- query/filter variants canonicalized appropriately
- UK page does not canonicalize to UA page
- UA page does not canonicalize to UK page
- reciprocal hreflang only when equivalent pages published
- `en-GB` and `uk-UA` values correct
- missing translation does not invent reciprocal alternate
- preview/staging canonical/index behavior safe
- hostname spoof does not alter trusted metadata

---

## 62. Sitemap and Robots Tests

- only canonical indexable URLs included
- unpublished/archived/private routes excluded
- auth/admin/portal excluded
- preview/staging noindex or access-controlled
- market sitemap uses correct host
- `lastmod` only meaningful update source
- no filter/search parameter explosion
- removed content status/redirect policy correct
- sitemap parses as valid XML

---

## 63. Structured Data Tests

- schema type appropriate
- required properties present
- values match visible page
- no fabricated rating/review/availability
- URL and image absolute
- market/locale value correct
- unpublished data absent
- generated JSON-LD serializes safely
- rich result eligibility validation when applicable

Structured data visual content’in yerine geçmez.

---

## 64. Content QA

Her publishable content için:

- technical claim source/evidence
- product naming and model consistency
- units and values
- certification/compliance wording
- contact and market details
- CTA destination
- image rights/source
- alt text purpose
- document metadata/classification
- legal review flag where needed
- owner and review date
- broken link check
- spell/grammar review

SEO baskısı doğrulanmamış teknik claim’i meşrulaştırmaz.

---

## 65. Localization QA

### 65.1 Linguistic

- Ukrainian natural, not machine-placeholder quality
- technical terminology approved glossary ile uyumlu
- product/brand terms consistent
- CTA and validation messages action-specific
- no mixed-language accidental UI

### 65.2 Functional

- Cyrillic input/search/sort
- long string expansion
- date/number/unit format
- plural rules where used
- line break/truncation
- font glyph coverage
- locale attribute and language metadata
- correct market contact/legal copy

### 65.3 Publication

- translation status approved
- no silent English fallback presented as Ukrainian publication
- reciprocal SEO only on equivalent published pages

---

## 66. Pseudo-localization

Implementation supports a non-production pseudo-locale or transformation that:

- expands strings,
- exposes hardcoded copy,
- preserves placeholders,
- stresses buttons/tables/navigation,
- highlights truncation.

Cyrillic-specific glyph and linguistic QA yine gerçek uk-UA sample ile yapılır.

---

## 67. Link and Asset QA

- internal links resolve
- external links use safe relationship where needed
- download link authorization correct
- image dimensions/responsive sources correct
- missing image fallback useful
- document type/size labelled where helpful
- no mixed content
- no private storage URL in public HTML
- asset cache headers appropriate
- renamed Application Map assets have stable meaningful identifiers

Rar içindeki legacy composite görseller UI semantics’in yerine geçmez.

---

## 68. Analytics Contract Tests

Her event için:

- approved event name
- typed required properties
- market/locale
- correct lifecycle timing
- no duplicate accidental fire
- no event before required consent where policy demands
- no email/name/message/free-text/secret
- safe IDs or categories
- navigation/submit failure behavior
- adapter disabled behavior
- analytics provider failure does not block business journey

Business conversion database kaydıyla reconcile edilir.

---

## 69. Analytics Journey Tests

Minimum:

- product/category view
- Application Map interaction
- Project List add/remove
- quote started/submitted
- dealer application submitted
- document request submitted
- market switch
- public search when introduced
- form validation failure as approved categorical signal

Event count, browser back/forward ve React re-render nedeniyle duplicate olmamalıdır.

---

## 70. Consent and Privacy QA

- necessary storage works without optional consent
- optional analytics follows consent decision
- reject as easy as accept where applicable
- consent can be changed
- no pre-consent optional network/storage
- banner keyboard/screen-reader accessible
- consent state does not break core form flow
- privacy links correct per market
- logs/traces/screenshots redact personal data

Exact legal basis legal review ile onaylanır.

---

## 71. Performance Quality Model

Performance üç düzeyde ölçülür:

1. Field — gerçek kullanıcı Core Web Vitals
2. Lab — deterministic route/profile measurements
3. Diagnostic — bundle, image, query ve server timing

Tek Lighthouse skoru release kararının tamamı değildir.

---

## 72. Core Web Vitals Targets

Public key routes için hedef, page-view’ların 75th percentile ölçümünde:

| Metric | Good target |
|---|---:|
| Largest Contentful Paint (LCP) | ≤ 2.5 seconds |
| Interaction to Next Paint (INP) | ≤ 200 milliseconds |
| Cumulative Layout Shift (CLS) | ≤ 0.1 |

Mobil ve desktop ayrı değerlendirilir.

Field data yeterli değilse lab measurement regression guard olarak kullanılır; field sonucunun aynısı olduğu iddia edilmez.

---

## 73. Performance Route Set

Minimum public route set:

- homepage
- product category
- product detail
- industry/Application Map
- quote/project list
- contact/dealer form entry

Protected route set:

- admin quote queue
- admin content editor/list
- partner dashboard
- partner quote list/detail
- partner document list

Public ve protected budget’lar aynı olmak zorunda değildir.

---

## 74. Performance Budget Governance

İlk production-like templates tamamlandığında şu baseline dondurulur:

- route JavaScript transferred/parsed
- CSS
- image bytes
- font bytes
- request count
- LCP element and timing
- CLS
- interaction latency
- server response timing
- key database query timing

PR regression threshold baseline’a göre belirlenir. Temporary exception owner ve expiry gerektirir.

Exact byte budgets prototype ölçülmeden bu belgede sahte kesinlikle belirlenmez.

---

## 75. Frontend Performance Checks

- meaningful server-rendered HTML
- client component boundary minimum
- route-level code splitting
- no unnecessary heavy animation library
- responsive compressed images
- explicit image dimensions/aspect ratio
- hero priority only where justified
- below-fold lazy loading
- map lazy loading
- font subset/self-host strategy
- no layout shift from banner/header/image
- third-party scripts delayed/limited
- long lists paginated/virtualized only when appropriate

---

## 76. Backend Performance Checks

- bounded select
- indexed filters/sorts
- no N+1
- server pagination
- request timeout
- provider timeout
- connection usage
- cache scope correctness
- RLS helper cost
- job batch size
- outbox claim concurrency
- payload size

Fast fakat authorization’sız query kabul edilmez.

---

## 77. Load and Concurrency Testing

Launch öncesi risk-based testler:

- public form burst with rate limiting
- duplicate/replay submission
- concurrent quote assignment/status update
- concurrent invitation acceptance
- concurrent document download/grant revoke
- outbox workers claiming same records
- public cached page traffic
- search/filter with representative dataset

Test production provider’a zarar verecek şekilde çalıştırılmaz.

---

## 78. Resilience and Failure Injection

Simüle edilir:

- email provider timeout/5xx
- analytics provider blocked
- storage temporary failure
- database transaction failure
- job retry and dead-letter condition
- webhook duplicate/out-of-order
- cache revalidation failure
- browser offline during submit
- interrupted upload/download

Beklenti business riskine göre retry, safe error, durable record veya rollback’tir.

---

## 79. Accessibility Conformance Target

InfraVolt hedefi WCAG 2.2 Level AA’dır.

Bu hedef:

- public pages,
- authentication,
- Admin kritik workflows,
- Partner Portal kritik workflows,
- forms,
- Application Map alternatives,
- documents delivered as part of a process where applicable

için değerlendirilir.

Conformance sayfa parçalarına değil, complete page ve complete process’e göre ele alınır.

---

## 80. Accessibility Acceptance Model

Her feature şu dört evidence katmanından uygun olanları alır:

1. Design review
2. Semantic/component automated test
3. Automated page scan
4. Manual keyboard, zoom/reflow ve assistive technology review

Critical process’ler dört katmanın tamamını gerektirir.

---

## 81. WCAG 2.2 New-Criterion Focus

WCAG 2.2 ile özellikle:

- 2.4.11 Focus Not Obscured (Minimum) — AA
- 2.5.7 Dragging Movements — AA
- 2.5.8 Target Size (Minimum) — AA
- 3.2.6 Consistent Help — A
- 3.3.7 Redundant Entry — A
- 3.3.8 Accessible Authentication (Minimum) — AA

test planına açıkça dahil edilir.

Bunlar diğer WCAG 2.2 Level A/AA kriterlerini daraltmaz.

---

## 82. Automated Accessibility Scans

axe-core scan en az:

- key public templates,
- quote/dealer/document forms,
- Application Map open/closed states,
- login/invitation,
- admin main layouts and dialogs,
- partner dashboard/quotes/documents,
- error and empty states

üzerinde çalışır.

Rules:

- serious/critical violations PR/release blocker’dır,
- moderate/minor issue triage edilir,
- rule disable yalnız reason, owner ve expiry ile,
- scan dynamic state açıldıktan sonra da yapılır,
- iframe/third-party boundary not edilir.

“0 axe violation” WCAG conformance beyanı değildir.

---

## 83. Semantic Structure Tests

- unique descriptive page title
- correct `lang`
- landmark regions
- one useful primary heading
- logical heading hierarchy
- lists as lists
- tables as tables
- buttons for actions
- links for navigation
- form controls with labels
- accessible name/role/value
- visible label included in accessible name where applicable

ARIA native semantic’in yerine gereksiz kullanılmaz.

---

## 84. Keyboard Navigation

Her critical page keyboard-only test edilir:

- Tab/Shift+Tab order logical
- all controls reachable
- all actions operable
- no keyboard trap
- no positive `tabindex`
- skip link works
- menus/listboxes/dialogs use expected keys
- Escape closes dismissible overlay
- focus returns to trigger
- destructive action confirmation accessible
- hover-only content keyboard equivalent has

Browser shortcut’ları engellenmez.

---

## 85. Focus Appearance

- focus indicator visible in every theme/state
- indicator not removed without stronger replacement
- focus contrast against adjacent colors sufficient
- focus state is not color-only subtle change
- focused control remains identifiable at zoom
- disabled controls do not create confusing focus stops

Design system token’ları automated contrast ve visual review ile doğrulanır.

---

## 86. Focus Not Obscured

Focused component:

- sticky header,
- sticky CTA,
- cookie banner,
- toast,
- bottom navigation,
- modal/drawer edge,
- virtual keyboard related viewport

tarafından tamamen gizlenemez.

Test:

- sequential tab through page,
- anchor navigation,
- error summary jump,
- mobile/narrow viewport,
- 200%/400% zoom

ile yapılır.

---

## 87. Dialog, Drawer and Popover Accessibility

- trigger exposes meaningful name/state where needed
- opening moves focus appropriately
- modal traps focus
- background inert/non-interactive
- close button reachable and named
- Escape behavior consistent
- focus returns logically
- destructive confirmation explicit
- screen reader title/description meaningful
- scroll remains usable at zoom

Nested modal baseline olarak kullanılmaz.

---

## 88. Target Size

WCAG 2.2 AA minimum target size criterion, applicable exception/spacing koşullarıyla en az 24×24 CSS pixel yaklaşımını gerektirir.

InfraVolt product baseline:

- primary touch controls: preferably at least 44×44 CSS pixels
- hotspot visual dot smaller olabilir; interactive hit area yeterli olmalıdır
- adjacent controls accidental activation yaratmamalıdır
- inline text links context exception’ına göre değerlendirilir

24×24 compliance floor’dur; 44×44 preferred usability target’tır.

---

## 89. Pointer and Dragging

- drag-only interaction yoktur
- comparator/order controls button alternative sağlar
- Application Map pan/drag varsa list/search alternative sunar
- swipe action visible button equivalent taşır
- path-based gesture single-pointer alternative taşır
- pointer cancellation/undo behavior destructive actionlarda güvenlidir

Keyboard alternative tek başına dragging criterion’ının tüm pointer kullanıcılarını çözmeyebilir; simple pointer alternative gerekir.

---

## 90. Contrast

Target baselines:

| Content | Minimum target |
|---|---:|
| Normal text | 4.5:1 |
| Large text | 3:1 |
| Essential UI component/boundary | 3:1 |
| Focus indicator adjacent contrast | Applicable WCAG 2.2 requirement |

Test edilir:

- default/hover/focus/disabled states
- error/success/warning
- text on image/gradient
- charts/status badges
- placeholders are not the only label
- dark/light asset variants if introduced

Brand red her background üzerinde otomatik accessible değildir.

---

## 91. Color and Sensory Characteristics

- error yalnız kırmızı ile anlatılmaz
- selected yalnız color ile anlatılmaz
- chart/status text/icon/pattern support alır
- instruction yalnız “sağdaki kırmızı düğme” demez
- required field color-only değildir
- link context içinde distinguishable olur

---

## 92. Zoom and Reflow

### 92.1 200% zoom

- task complete
- content/control lost or overlapped değil
- fixed UI critical content’i kapatmıyor

### 92.2 400% reflow

- equivalent 320 CSS pixel width’te normal content tek eksende reflow eder
- horizontal scroll yalnız genuine two-dimensional content için kabul edilir
- wide table/map accessible stacked/list alternative sunar
- dialog, banner ve sticky CTA usable kalır

Browser zoom ve responsive resize birlikte test edilir.

---

## 93. Text Spacing

User-applied text spacing ile content/function kaybı olmamalıdır:

- line height at least 1.5× font size
- paragraph spacing at least 2× font size
- letter spacing at least 0.12× font size
- word spacing at least 0.16× font size

Component fixed height nedeniyle text kesemez.

---

## 94. Orientation and Responsive Accessibility

- essential olmadığı sürece portrait/landscape kilidi yok
- mobile keyboard form field’i kapatmıyor
- browser zoom disabled değil
- viewport meta pinch zoom’u engellemiyor
- responsive source order logical reading/focus order ile uyumlu
- visual CSS reorder misleading tab order üretmiyor

---

## 95. Motion and Animation

- `prefers-reduced-motion` respected
- nonessential autoplay motion reduced/disabled
- no flashing beyond safety criteria
- parallax/large movement optional
- loading state understandable without animation
- transition focus/interaction’ı geciktirmez
- pause/stop control where required

Application Map hotspot pulse bilgi vermek için tek kanal olamaz.

---

## 96. Images and Icons

- informative image meaningful alt text
- decorative image empty alt or CSS treatment
- linked image purpose describes destination
- icon-only button accessible name
- accessible name not filename
- complex diagram has text equivalent/summary
- product image alt context-specific
- text embedded in image repeated in HTML when meaningful

Application Map’ın accessible list’i ana equivalent’tir.

---

## 97. Forms and Instructions

- visible label
- programmatic label
- purpose/autocomplete where applicable
- required/optional clear
- format/example before error when needed
- group label for related controls
- no placeholder-only instruction
- input purpose understandable
- submit result clearly announced
- entered data preserved after recoverable error

---

## 98. Error Identification and Recovery

- error in text
- specific corrective guidance
- field linked with `aria-describedby` or equivalent
- invalid state programmatically available
- summary receives focus when appropriate
- summary link moves to field
- first error behavior predictable
- server/global error distinguishable
- destructive/legal/financial-like important submission reviewable where applicable

“Something went wrong” tek başına actionable validation değildir.

---

## 99. Redundant Entry

Aynı process içinde kullanıcıdan daha önce verdiği bilgi gereksiz tekrar istenmez.

Örnek:

- signed-in partner company bilgisi prefilled veya selectable olur
- Project List item bilgisi quote formunda yeniden yazdırılmaz
- market/domain context tekrar sorulmaz unless user correction needed
- copied contact data edit edilebilir kalır

Security veya data freshness nedeniyle tekrar gerekli ise açık gerekçesi olur.

---

## 100. Accessible Authentication

- password paste allowed
- password manager allowed
- no memory/transcription puzzle as sole path
- CAPTCHA/Turnstile accessible support/fallback path
- error does not enumerate account
- MFA method keyboard/screen-reader usable
- recovery flow usable
- one-time code can be pasted
- timeout warning accessible where applicable
- “show password” control named/stateful

Authentication security, cognitive function testine zorlayarak sağlanmaz.

---

## 101. Consistent Help

Birden fazla sayfada aynı help/contact mechanism bulunuyorsa relative order ve labeling tutarlı olur.

Örnek:

- contact/help link header/footer içinde tutarlı
- portal support entry aynı yerde/isimde
- form guidance pattern’leri tutarlı

Help her sayfada zorunlu değildir; mevcut olduğunda consistency test edilir.

---

## 102. Status Messages and Live Regions

Programmatic focus taşımadan önemli status mesajı assistive technology’ye iletilir:

- item added to Project List
- form submission success/failure
- filter result count where meaningful
- document generation/loading completion
- upload state
- autosave result if introduced

Rules:

- live region pre-exists when needed
- no chatty repeated announcement
- `assertive` only urgent
- visual message remains available long enough
- toast is not sole persistent evidence

---

## 103. Tables

- real table semantics
- caption/heading context
- header cells scoped
- sortable state announced
- filter controls labelled
- row action accessible name includes context
- keyboard access
- pagination accessible
- empty/loading/error state
- narrow viewport alternative
- no inaccessible div-grid without need

Admin dense tables can horizontal scroll only with preserved labels/actions and usable keyboard behavior.

---

## 104. Application Map Accessibility Contract

Map release için zorunlu equivalent:

- semantic heading
- descriptive introduction
- searchable/filterable accessible list where useful
- list item → same industry/product destination
- no information only in coordinate/colour
- keyboard-operable hotspot
- focus/selection synchronization without context loss
- meaningful image alt/description
- zoom/reflow/mobile behavior

Map unavailable olduğunda list ile core task tamamlanmalıdır.

---

## 105. File and Document Accessibility

- download purpose/type/size clear where relevant
- link accessible name descriptive
- HTML alternative preferred for core web content
- supplied PDF accessibility status assessed
- inaccessible legacy document için request/support path offered where feasible
- scanned-only document critical content’in tek kaynağı değildir
- signed download errors accessible
- document viewer keyboard trap üretmez

Website WCAG hedefi, third-party/legacy PDF’lerin otomatik compliant olduğu iddiası değildir.

---

## 106. Language Accessibility

- root `lang` correct
- inline language changes marked when pronunciation materially changes
- abbreviations expanded/explained where audience needs
- technical language clear
- button/link purpose localized
- validation and status messages same locale
- accessible names do not remain accidental English on uk-UA

Brand/product names dil değişimi olarak gereksiz işaretlenmez.

---

## 107. Screen Reader Matrix

Practical pre-release matrix:

| Platform | Browser | Assistive technology | Scope |
|---|---|---|---|
| Windows | Chrome | NVDA | Critical public/admin/portal flows |
| Windows | Firefox | NVDA | Semantic/interaction smoke |
| macOS | Safari | VoiceOver | Critical public/portal smoke |
| iOS | Safari | VoiceOver | Public form/map/mobile smoke |
| Android | Chrome | TalkBack | Public mobile smoke |

Exact versions release record’ına yazılır.

---

## 108. Screen Reader Test Script

Her critical flow için reviewer:

- page title and landmarks
- heading navigation
- link/button list clarity
- form label/instruction/error
- dialog announcement and focus
- dynamic status
- table/list reading
- route/page change announcement strategy
- document/map alternative
- completion confirmation

notlarını kaydeder.

Screen reader yalnız ses dinleme değil, task completion testidir.

---

## 109. Accessibility Defect Severity

| Severity | Example | Release effect |
|---|---|---|
| A11Y Critical | Core task keyboard/screen reader ile imkânsız; trap | Blocker |
| A11Y High | Critical content/control unnamed, focus lost, severe reflow | Blocker for affected surface |
| A11Y Medium | Workaround var fakat significant friction | Fix before release or approved exception |
| A11Y Low | Minor verbosity/consistency | Planned remediation |

Legal risk severity’den ayrı değerlendirilebilir.

---

## 110. Accessibility Exception Process

Exception kaydı:

- affected criterion/user/task
- reason
- current impact
- available alternative
- owner
- remediation plan
- expiry date
- product/accessibility approval

içerir.

Critical journey blocker için “sonra düzeltiriz” exception kabul edilmez.

---

## 111. Security Test Mapping

10_AUTH_SECURITY_AND_PERMISSIONS.md control’ları test case seviyesinde şu kategorilere map edilir:

- authentication
- session/cookie
- RBAC/ABAC
- object authorization/IDOR
- RLS/grants
- input/output handling
- upload/storage/document delivery
- anti-abuse/rate limit/idempotency
- webhook/cron/provider
- logging/redaction/audit
- headers/CSP/cache
- secrets/dependencies
- backup/restore/incident readiness

OWASP ASVS control mapping ayrı appendix/table olarak implementation repository’de tutulabilir.

---

## 112. Security Negative Suite — Public

- forged/missing/replayed Turnstile
- rate-limit bypass
- duplicate/idempotency abuse
- host/market spoof
- oversized/nested payload
- XSS/HTML/script URI
- SQL/meta-character payload
- invalid upload type/magic bytes/path
- direct private asset access
- email/record enumeration
- cache poisoning inputs
- redirect manipulation

---

## 113. Security Negative Suite — Auth

- account enumeration
- expired/reused invite
- brute force
- open redirect
- callback host confusion
- session fixation
- stale/revoked session
- cookie flags
- MFA bypass/recovery misuse
- suspended/deactivated account
- CSRF where applicable
- return path to unauthorized object

---

## 114. Security Negative Suite — Admin

- partner/non-admin route access
- missing permission
- wrong market
- direct action invocation
- mass assignment
- self-elevation
- last privileged admin removal
- stale update
- invalid transition
- unrestricted export
- audit manipulation
- service role path abuse

---

## 115. Security Negative Suite — Portal

- cross-company list/detail/search
- nested object ID swap
- wrong market/product
- expired/revoked grant
- signed link tamper/share
- revoked/suspended membership
- notification deep-link escape
- partner role escalation
- last partner-admin removal rules
- private file URL leakage

---

## 116. Security Negative Suite — Integrations

- invalid/duplicate/replayed webhook
- wrong cron secret
- provider timeout/retry storm
- outbox duplicate send
- callback SSRF/open redirect where relevant
- signed URL leak in log/referrer
- preview email recipient escape
- wrong environment secret/config
- production endpoint from CI

---

## 117. Header and Browser Security Tests

Production-like response verification:

- CSP policy/reporting as approved
- HSTS on canonical production hosts
- `X-Content-Type-Options`
- frame ancestor/clickjacking protection
- referrer policy
- permissions policy
- secure HttpOnly SameSite cookies
- no protected response public cache
- no secret/debug header

Header presence kadar actual route behavior da test edilir.

---

## 118. Privacy and Redaction Tests

Automated tests verify no sensitive fields in:

- application logs
- analytics events
- error monitoring context
- audit metadata
- email webhook logs
- Playwright trace/screenshot artifact policy
- public response
- signed link referrer
- export without authorization

Password, session, token, Turnstile token ve service secret hiçbir log’a girmez.

---

## 119. Backup and Restore Exercise

Release testing yalnız request path’i kapsamaz.

Operations düzenli olarak:

- backup exists,
- restore to isolated environment,
- schema/data consistency,
- auth/storage dependencies,
- critical record recovery,
- documented RPO/RTO assumption

kontrolünü yapar.

Restore edilmemiş backup güvenilir recovery kanıtı değildir.

---

## 120. Usability Testing

Minimum moderated/unmoderated research charters:

- visitor doğru product/industry bulur mu?
- Project List mental model anlaşılır mı?
- quote form hangi bilgiyi neden istediğini anlatıyor mu?
- Application Map keşif sağlıyor mu, yoksa dikkat dağıtıyor mu?
- Ukrainian user terminology’yi doğal buluyor mu?
- sales user quote queue’yu verimli işleyebiliyor mu?
- partner document/quote durumunu anlayabiliyor mu?

Finding, severity ve product decision’a bağlanır.

---

## 121. Prototype Test Gates

Kod öncesi test edilmesi gerekenler:

- mobile navigation
- product detail CTA/sticky behavior
- Project List/comparator count and editing
- Application Map desktop/mobile interaction
- long uk-UA navigation/content
- admin dense table actions
- portal dashboard information hierarchy
- form error and recovery

Figma prototype test sonucu production accessibility testinin yerine geçmez.

---

## 122. Exploratory Testing

Session-based charter örnekleri:

- “UA market identity can never become UK during a submission”
- “Company A actor cannot infer Company B data”
- “Interrupt every step of quote submission”
- “Use the whole public site with keyboard and 400% zoom”
- “Publish/unpublish during active browsing”
- “Break every provider dependency safely”

Session kaydı:

- charter
- build/environment
- timebox
- data/accounts
- findings
- risks/questions
- evidence

içerir.

---

## 123. UAT Model

UAT actor-based yapılır:

| Actor | Acceptance focus |
|---|---|
| Founder | Brand, commercial promise, launch scope |
| Sales | Quote/dealer workflow and data quality |
| Content lead | Publish/localization/technical evidence |
| Dealer manager | Application and partner operations |
| UK visitor representative | Product discovery and quote |
| Ukrainian reviewer | Language, market trust and journey |
| Pilot partner | Portal self-service and documents |

UAT automated regression’ın yerine geçmez.

---

## 124. Defect Severity

| Severity | Definition | Examples |
|---|---|---|
| S0 Critical | Active breach/data loss/full critical outage | Cross-company access, lost submission |
| S1 High | Critical journey unavailable or severe wrong state | Login/quote/publish failure |
| S2 Medium | Important function impaired, workaround exists | Filter/export issue |
| S3 Low | Minor/cosmetic/content issue | Small alignment/copy defect |

Severity impact’tır; priority business scheduling decision’dır.

---

## 125. Defect Lifecycle

1. New
2. Triaged
3. In progress
4. Ready for verification
5. Verified
6. Closed

Alternatives:

- Duplicate
- Cannot reproduce
- Expected behavior
- Deferred with accepted risk

Closed defect için regression evidence veya explicit reason gerekir.

---

## 126. Bug Report Minimum

- concise title
- environment/build
- actor/role/market/company
- preconditions
- steps
- expected
- actual
- severity/risk
- evidence
- reproducibility
- suspected scope if known
- privacy-safe data

Security issue public backlog’a sensitive detail ile yazılmaz.

---

## 127. Regression Rule

Her fixed S0/S1 bug mümkün olduğunda:

1. failing automated regression test,
2. fix,
3. passing test,
4. broader adjacent verification

ile kapanır.

Automation uygun değilse repeatable manual regression case yazılır.

---

## 128. Flaky Test Policy

Flaky test:

- owner alır,
- root cause issue alır,
- failure artifact saklar,
- kısa süreli quarantine tag alabilir,
- expiry/date alır,
- critical gate’i sessizce bypass edemez.

Test retry en fazla tanılama/infra tolerance için kullanılır; ürün hatasını yeşile boyamaz.

---

## 129. Retry Policy

- Local: default no retry
- CI PR: default no retry or one infrastructure-classified retry
- Nightly: retry result separately reported
- Production smoke: mutation retry idempotency bilinmeden yapılmaz

İlk-attempt failure rate quality metric olarak tutulur.

---

## 130. Test Quarantine

Quarantine koşulları:

- non-security/non-critical
- known issue link
- owner
- created date
- expiry
- replacement/manual mitigation

Cross-company, auth bypass, record-loss veya core accessibility testleri quarantine edilerek release açılamaz.

---

## 131. Pull Request Quality Gate

PR merge için:

- acceptance criteria linked
- typecheck/lint/build pass
- changed-scope unit/component pass
- database migration/RLS tests pass when applicable
- critical smoke pass
- no unresolved R0/R1 defect introduced
- accessibility scan/interaction tests for changed UI
- locale/market test for public copy/routing change
- security review for auth/permission/upload/provider change
- evidence and reviewer approval

---

## 132. Nightly Gate

Nightly:

- full browser regression
- UK/UA projects
- full RLS/transaction suite
- accessibility scans across key states
- SEO crawl/metadata checks
- visual regression
- provider contract tests
- dependency/advisory scans
- selected performance baselines

çalıştırır.

Nightly failure sabah triage edilir; sürekli kırmızı suite normalleştirilmez.

---

## 133. Pre-Release Gate

Release candidate için:

- clean deployment rehearsal
- migrations applied and verified
- R0/R1 regression green
- browser/device matrix evidence
- manual keyboard/accessibility review
- screen reader smoke
- UK/UA content and localization sign-off
- SEO/canonical/sitemap check
- performance baseline
- security negative suite
- provider failure/retry check
- backup/rollback readiness
- UAT approval
- known risk register

gereklidir.

---

## 134. Production Smoke

Deploy sonrası güvenli smoke:

- canonical UK and UA home/product response
- correct market/locale metadata
- login route/session boundary
- authorized internal read
- authorized partner read with test/controlled account
- forbidden cross-scope read
- public form endpoint health using controlled non-sales-impact method
- job/webhook health signal
- error rate/log/alert check
- Core Web Vitals/real-user monitoring starts receiving safely

Production smoke gerçek customer record’larını değiştirmez.

---

## 135. Rollback / Roll-Forward Triggers

Immediate stop/rollback consideration:

- unauthorized data access
- lost/duplicated critical submissions
- login or critical journey widespread failure
- wrong market data/contact/legal presentation
- destructive migration/data corruption
- protected content public cache/index exposure
- severe accessibility regression blocking critical process
- major error/latency spike

Database migration nedeniyle rollback unsafe ise prepared roll-forward plan uygulanır.

---

## 136. Release Blockers

Release edilmez if:

- any known cross-company leakage
- any auth/permission bypass
- quote/dealer/document business record loss
- required RLS missing/disabled
- production data used in test/preview
- UK/UA domain attribution wrong
- unpublished/private content exposed
- core keyboard/screen-reader journey impossible
- serious/critical unresolved automated accessibility violation in affected journey
- critical migration not rehearsed
- required provider failure path unsafe
- S0/S1 defect unresolved without explicit valid non-release scope separation

---

## 137. Risk Acceptance / Waiver

Waiver contains:

- issue/control
- user/business/security impact
- likelihood
- affected market/surface
- workaround
- owner
- fix deadline
- monitoring
- Founder/Product and relevant specialist approval

Waiver permanent sessiz borç değildir.

Cross-company access, secret exposure veya business record loss normal waiver ile kabul edilmez.

---

## 138. Quality Metrics

İzlenir:

- escaped defects by severity
- defect reopen rate
- flaky test rate
- first-attempt CI pass rate
- critical journey pass rate
- mean time to verify/fix
- accessibility issues by severity/age
- Core Web Vitals good percentage
- failed/duplicate submission rate
- authorization denial anomaly
- provider retry/dead-letter rate
- UK/UA content defect rate
- regression duration

Test count tek başına KPI değildir.

---

## 139. Quality Dashboard

Dashboard audiences:

| Audience | Needs |
|---|---|
| Founder/Product | Release status, blockers, business journey risk |
| Engineering | failing suites, flaky, coverage delta, performance regression |
| Design/Content | accessibility, visual, localization/content findings |
| Security | authz/RLS/provider/security failures |
| Operations | production smoke, error, job, provider and CWV health |

Personal data dashboard’a taşınmaz.

---

## 140. Test Report Format

Release report:

```text
Release candidate:
Build/commit:
Environment:
Scope:
Markets/locales:
Suites executed:
Passed/failed/quarantined:
Critical journeys:
Accessibility evidence:
Security evidence:
Performance evidence:
Known defects/risks:
Approvals:
Decision:
```

---

## 141. Accessibility Conformance Report

Public launch sonrası gerekli olursa lightweight Accessibility Statement/ACR için evidence tutulur:

- WCAG version/level
- evaluated pages/processes
- test date/version
- browser/assistive technology
- automated/manual methods
- known limitations
- contact/support path
- remediation plan

Formal VPAT/ACR ancak gerçek assessment ile hazırlanır; pazarlama iddiası olarak uydurulmaz.

---

## 142. MVP Test Scope

MVP minimum:

- UK public critical journeys
- shared backend transaction/RLS
- Admin quote/content minimum workflows
- authentication baseline
- Application Map accessible list and keyboard behavior
- public form security/anti-abuse
- en-GB content/SEO
- accessibility automated + manual critical flows
- CWV lab baseline
- production smoke/monitoring

Ukraine launch bağımsız gate’tir; yarım localization MVP’ye gizlice dahil edilmez.

---

## 143. Ukraine Launch Gate

Ukraine domain açılmadan:

- uk-UA critical content approved
- UA contact/legal/commercial copy approved
- domain/host/market resolution E2E
- UA submission attribution
- canonical/hreflang/sitemap
- Cyrillic font/search/input
- long-copy responsive/accessibility
- Ukrainian reviewer UAT
- provider email templates
- analytics market segmentation
- missing translation safe behavior

kanıtlanır.

---

## 144. Partner Portal Launch Gate

- pilot company and synthetic second company
- invitation/auth/session
- company membership states
- cross-company negative suite
- quote/document/notification object authorization
- signed link expiry/revocation
- portal keyboard/screen-reader smoke
- responsive real-device smoke
- provider/outbox failure
- audit/monitoring/runbook
- pilot partner UAT

Her cross-company failure blocker’dır.

---

## 145. Admin Launch Gate

- least-privilege roles
- market scope
- direct action denial
- valid workflow transitions
- concurrency/stale update
- audit log
- export permission
- content preview/publish/cache behavior
- dense table keyboard/zoom
- error/empty/loading states
- operational UAT

---

## 146. Definition of Ready

Feature ready when:

- problem and actor clear
- acceptance criteria testable
- requirement/risk IDs linked
- UI states known
- market/locale impact known
- permission/data classification known
- accessibility behavior considered
- analytics/observability decision known
- test data/environment available
- dependencies/provider failure considered

---

## 147. Definition of Done

Feature done when:

- implementation reviewed
- acceptance criteria pass
- unit/integration/E2E coverage risk-appropriate
- negative permission/data-scope tests pass
- responsive and accessibility checked
- en-GB/uk-UA behavior checked where applicable
- content/SEO approved where applicable
- performance regression reviewed
- analytics/privacy checked
- docs/runbook updated
- no unresolved release blocker
- evidence linked

---

## 148. Test Automation Backlog Order

1. Local/CI deterministic environment
2. Domain/market resolution unit tests
3. Public quote transaction integration
4. RLS/company isolation suite
5. Critical public Playwright flow
6. Auth/Admin/Portal smoke projects
7. Accessibility scan harness
8. UK/UA metadata/localization tests
9. Provider/outbox failure tests
10. Critical full regression
11. Visual/performance baselines
12. Nightly and release reporting

---

## 149. Initial Critical Test IDs

| ID | Test |
|---|---|
| TQ-001 | UK single-item quote persists once |
| TQ-002 | Multi-item Project List quote is atomic |
| TQ-003 | Provider failure cannot erase submission |
| TQ-004 | UA host produces UA record and uk-UA UI |
| TQ-005 | Missing translation does not silently publish English |
| TQ-006 | Unpublished product absent from public/SEO/search |
| TQ-007 | Unauthorized company cannot read quote |
| TQ-008 | Unauthorized company cannot download document |
| TQ-009 | Revoked/expired grant denied |
| TQ-010 | Dealer approval cannot auto-grant partner role |
| TQ-011 | Admin role without permission cannot mutate |
| TQ-012 | Wrong-market internal actor denied |
| TQ-013 | Application Map has equal keyboard/list path |
| TQ-014 | Quote form labels/errors/focus pass |
| TQ-015 | Login supports paste/password manager |
| TQ-016 | Sticky UI does not obscure focus |
| TQ-017 | Key public templates pass axe serious/critical gate |
| TQ-018 | Key routes meet lab performance baseline |
| TQ-019 | Canonical/hreflang/sitemap match publication state |
| TQ-020 | Analytics event contains no personal/free-text data |

---

## 150. Open Decisions

| ID | Decision | Recommendation | Deadline |
|---|---|---|---|
| QA-001 | Test management location | Repository-linked issue/test catalog | Before implementation sprint |
| QA-002 | Visual regression provider | Start Playwright screenshots; external service only if needed | Before design system build |
| QA-003 | Coverage hard thresholds | Freeze after first stable code baseline | Before CI release gate |
| QA-004 | Exact public asset/JS budgets | Measure representative templates first | Before public beta |
| QA-005 | Real-device lab ownership | Small physical matrix + browser service if justified | Before launch |
| QA-006 | Accessibility external audit timing | Before broad public/portal launch based on scope | Before release candidate |
| QA-007 | External penetration test timing | Before high-risk portal expansion | Before broad portal launch |
| QA-008 | Supported browser version window | Current + previous major baseline | Before public beta |
| QA-009 | Performance field monitoring provider | Use typed adapter and privacy review | Before production |
| QA-010 | Formal Accessibility Statement | Publish at public launch if approved | Before launch |

---

## 151. Founder / Product Approval Checklist

- [ ] Critical journeys doğru mu?
- [ ] UK ve Ukraine ayrı launch gate mi?
- [ ] Record loss ve cross-company risk blocker mı?
- [ ] UAT actor’ları doğru mu?
- [ ] Performance hedefleri kabul edildi mi?
- [ ] Accessibility hedefi WCAG 2.2 AA mı?
- [ ] Application Map equal alternative zorunlu mu?
- [ ] Quality waiver yetkisi ve sınırı doğru mu?
- [ ] MVP test kapsamı gerçekçi mi?
- [ ] Partner Portal pilot gate’i kabul edildi mi?

---

## 152. Engineering Approval Checklist

- [ ] Test pyramid uygulanabilir mi?
- [ ] CI/local isolation mümkün mü?
- [ ] Synthetic fixture matrix yeterli mi?
- [ ] RLS/transaction test harness planlandı mı?
- [ ] Playwright browser/host projects planlandı mı?
- [ ] Provider test boundary doğru mu?
- [ ] Secret/production data koruması yeterli mi?
- [ ] Performance baselines ölçülebilir mi?
- [ ] Flaky/quarantine policy uygulanabilir mi?
- [ ] Production smoke güvenli mi?

---

## 153. Accessibility Approval Checklist

- [ ] WCAG 2.2 AA full scope kabul edildi mi?
- [ ] New 2.2 criteria explicit mi?
- [ ] 24×24 minimum ile 44×44 product target ayrımı net mi?
- [ ] Keyboard/focus/dialog contracts net mi?
- [ ] 200% zoom ve 400% reflow testleri var mı?
- [ ] Forms/errors/status messages tanımlı mı?
- [ ] Accessible authentication tanımlı mı?
- [ ] Application Map equivalent list zorunlu mu?
- [ ] Screen reader/device matrix gerçekçi mi?
- [ ] Exception process yeterli mi?

---

## 154. Official Reference Baseline

Implementation ve audit sırasında primary references:

- W3C, Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- W3C WAI, ARIA Authoring Practices Guide: https://www.w3.org/WAI/ARIA/apg/
- Playwright, Accessibility testing: https://playwright.dev/docs/accessibility-testing
- Playwright, Projects: https://playwright.dev/docs/test-projects
- Playwright, Browsers: https://playwright.dev/docs/browsers
- Vitest Guide: https://vitest.dev/guide/
- Vitest Coverage: https://vitest.dev/guide/coverage
- web.dev, Web Vitals: https://web.dev/articles/vitals
- web.dev, Defining Core Web Vitals thresholds: https://web.dev/articles/defining-core-web-vitals-thresholds
- OWASP Application Security Verification Standard: https://owasp.org/www-project-application-security-verification-standard/

Standart veya tool version’ı değişirse bu belge review edilir.

---

## 155. Immediate Next Actions

1. Open decisions QA-001–010 founder/technical review’e alınır.
2. Requirement IDs test catalog’a taşınır.
3. Local Supabase deterministic seed hazırlanır.
4. Company A/B RLS harness kurulur.
5. Playwright UK/UA host projects kurulur.
6. Public quote critical flow automate edilir.
7. axe-core critical template scan’i eklenir.
8. Manual keyboard/screen-reader checklist repo’ya eklenir.
9. First public templates ile performance baseline ölçülür.
10. CI pull-request ve nightly suites ayrılır.

---

## 156. Sonuç

InfraVolt kalitesi son sprintte yapılan bug avına bırakılmayacaktır.

Ürün:

- requirement traceability,
- risk-based automation,
- database/RLS negative tests,
- real browser journeys,
- UK/Ukraine market validation,
- WCAG 2.2 AA manual and automated evidence,
- content/SEO/privacy QA,
- performance budgets,
- provider failure resilience,
- explicit release blockers

ile teslim edilecektir.

En kritik kurallar şunlardır:

1. Quote/dealer/document business record kaybı kabul edilmez.
2. Partner company isolation negatif test olmadan release edilmez.
3. UI’da gizli action server authorization yerine geçmez.
4. Ukraine domain gerçek uk-UA ve UA market behavior’u olmadan açılmaz.
5. Application Map erişilebilir list alternative olmadan tamamlanmış sayılmaz.
6. Automated accessibility skoru WCAG conformance’ın tamamı değildir.
7. Flaky test kalite kapısı olarak kabul edilmez.
8. Production release evidence ve açık owner ile yapılır.

---

## 157. Document Control

### 157.1 Version history

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1.0 | 15 July 2026 | InfraVolt Product Team | Initial test strategy, QA governance, WCAG 2.2 AA, security, SEO, localization, performance and release-gate contract |

### 157.2 Change control

Test toolchain, environment, browser support, risk classification, accessibility target, performance threshold, release blocker, provider test, RLS/company isolation veya quality waiver kararındaki değişiklik bu belgenin version update’ini gerektirir.

