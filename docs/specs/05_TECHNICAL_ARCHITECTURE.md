# InfraVolt — Technical Architecture

> Document ID: INF-05  
> Version: 0.1.0  
> Status: Draft for Founder Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Technical Owner: Product Director / CTO / Head Agent  
> Delivery Model: Modular Monolith / One Repository / One Shared Platform  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required locales: en-GB + uk-UA  
> Accessibility target: WCAG 2.2 AA  
> Last updated: 15 July 2026  
> Document language: Turkish; source code, route key, table, event and environment variable identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt platformunun nasıl inşa edileceğini teknik olarak tanımlar.

Belge:

- Public B2B website, internal admin ve approved partner portalın sistem sınırlarını kurar.
- UK ve Ukraine domainlerinin tek uygulamada güvenli biçimde çözülmesini tanımlar.
- Frontend, backend, database, authentication, authorization, storage ve email mimarisini kesinleştirir.
- Public formlar, quote lifecycle, controlled documents ve Application Map için uygulama kuralları verir.
- Cache, güvenlik, gözlemlenebilirlik, deployment ve test stratejisini belirler.
- MVP’de kullanılacak ve özellikle kullanılmayacak teknolojileri açıklar.
- Daha sonraki database, API, admin, portal ve DevOps belgeleri için teknik anayasa görevi görür.

Bu belge tek tek tablo kolonlarını veya endpoint payload’larını son hâliyle tanımlamaz. Bunlar sırasıyla database schema ve API/backend workflow belgelerinde ayrıntılandırılır.

---

## 2. Karar Özeti

| Alan | Baseline karar |
|---|---|
| Architecture style | Modular monolith |
| Repository | One repository |
| Web framework | Next.js App Router + React + TypeScript |
| Runtime | Node.js 24 LTS |
| Package manager | pnpm 11, pinned |
| UI | Tailwind CSS + shadcn/ui primitives + Radix UI |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth, SSR cookie sessions |
| Authorization | Application membership rules + PostgreSQL RLS |
| Storage | Supabase Storage; public and private buckets separated |
| Form layer | React Hook Form + Zod; server validation authoritative |
| Client server-state | TanStack Query only where justified |
| Small global UI state | Zustand; no secrets or PII |
| Transactional email | Resend |
| Anti-bot | Cloudflare Turnstile + server-side verification |
| Hosting | Vercel |
| Unit/component tests | Vitest + React Testing Library |
| End-to-end tests | Playwright |
| Markets | UK and Ukraine in the same application |
| Public URL model | Separate domains, no locale prefix |
| Protected surfaces | One canonical protected host recommended |
| Public pricing | Not supported |
| Checkout/payment | Not supported |
| Public API | Not in MVP |
| Microservices | Not in MVP |
| Prisma | Not required in MVP |
| Redux | Not permitted without a new ADR |

---

## 3. Mimari Hedefler

### 3.1 Birincil hedefler

- Küçük bir ekiple güvenli ve sürdürülebilir ürün geliştirmek
- UK ve Ukraine pazarlarını kod kopyalamadan çalıştırmak
- Public, admin ve portal verilerini aynı kaynaktan fakat farklı izinlerle sunmak
- Quote ve document işlemlerini audit edilebilir hâle getirmek
- İçerik yayınını pazar bazında kontrol etmek
- Hızlı public sayfalar ve güvenli private işlemler arasında doğru dengeyi kurmak
- Tasarım sistemi ile frontend uygulamasının aynı token ve component sözlüğünü kullanmasını sağlamak
- İleride gerçek ihtiyaç oluşursa modüllerin servis olarak ayrılabilmesini mümkün kılmak

### 3.2 Kalite hedefleri

- Type-safe sınırlar
- Default-deny authorization
- Server-first rendering
- Minimal client JavaScript
- Idempotent commercial operations
- Reproducible environments
- Backward-compatible deployments
- Measurable reliability
- Privacy-conscious logging
- Automated regression protection

---

## 4. Mimari İlkeler

### 4.1 Server-first

Public ve protected sayfalar Server Component ile başlar. Client Component yalnız browser interaction, local state veya client-owned refresh gerektiğinde kullanılır.

### 4.2 One source of truth

Product, document, company, contact, quote ve permission verileri PostgreSQL içinde tek kaynak olarak tutulur. Aynı business record email veya analytics içinde ikinci ana kayıt hâline gelmez.

### 4.3 Authorization at every boundary

Route koruması tek başına güvenlik değildir. Page, Server Action, Route Handler, data access function, storage policy ve database RLS seviyelerinde yetki tekrar doğrulanır.

### 4.4 Market is trusted server context

Market bilgisi form alanından veya client header’dan doğrudan kabul edilmez. Request host allowlist üzerinden server tarafında çözülür ve commercial record’a yazılır.

### 4.5 Private by default

Teknik dokümanlar, form attachments, partner files ve unpublished content private kabul edilir. Public olma durumu açıkça onaylanmış bir yayın kararıdır.

### 4.6 Progressive complexity

Queue, search engine, microservice, external cache ve enterprise CMS ancak ölçülmüş ihtiyaç veya risk ile eklenir.

### 4.7 Business transaction before notification

Önce database işlemi başarıyla commit edilir, sonra notification outbox oluşturulur. Email gönderilememesi quote veya enquiry kaydını kaybettirmez.

### 4.8 URLs and content identities are stable

Kullanıcıya görünen slug pazar bazında değişebilir. İç route key, content ID ve business ID sabit kalır.

### 4.9 No sensitive client persistence

PII, access token, private URL, internal note veya complete form payload localStorage/Zustand persist içinde tutulmaz.

### 4.10 Accessibility is implementation architecture

Keyboard, focus, semantic markup, reduced motion ve live-region davranışları component architecture’ın parçasıdır; sonradan eklenen polish değildir.

---

## 5. Sistem Bağlamı

~~~mermaid
flowchart TD
    U["Public Buyer / Dealer Applicant"] --> W["InfraVolt Web Platform"]
    P["Approved Partner"] --> W
    I["Internal Team"] --> W
    W --> S["Supabase Platform"]
    W --> R["Resend"]
    W --> T["Cloudflare Turnstile"]
    W --> O["Vercel Runtime and Observability"]
~~~

### 5.1 External actors

- Public buyer
- Technical specifier
- Contractor / wholesaler
- Dealer applicant
- Approved partner user
- InfraVolt sales admin
- Dealer manager
- Technical manager
- Administrator
- Super admin

### 5.2 External systems

- Supabase PostgreSQL, Auth and Storage
- Resend transactional email
- Cloudflare Turnstile
- Vercel deployment, functions, logs and scheduled jobs
- DNS registrar/provider
- Corporate mailbox provider, decision pending
- Optional consent-aware analytics provider, decision pending

---

## 6. Architecture Style — Modular Monolith

InfraVolt MVP tek deploy edilen Next.js uygulaması olacaktır. Ancak kod bir “büyük karışık uygulama” olmayacaktır. Domain modülleri kendi business rules, data access, schemas, services ve UI entry points sınırına sahip olacaktır.

### 6.1 Neden modular monolith

- İlk ekip ve trafik için düşük operasyon maliyeti
- Tek transaction içinde quote, company, contact ve line item oluşturabilme
- Tek type system
- Kolay local development
- Daha az deployment failure surface
- Daha hızlı product iteration
- Gereksiz network ve distributed transaction yükü olmaması

### 6.2 Modül sınırları

| Modül | Sorumluluk |
|---|---|
| `markets` | Domain, locale, currency-display policy, SEO pairing |
| `catalog` | Products, categories, attributes, product relations |
| `industries` | Industry content, solution mapping, Application Map data |
| `resources` | Technical document metadata, version and access policy |
| `companies` | Company and contact identity |
| `quotes` | Project List submission, quote lifecycle and line items |
| `enquiries` | Contact, technical and project support enquiries |
| `dealers` | Application, review, approval and partner membership |
| `accounts` | User profile, role, membership and permission resolution |
| `notifications` | Email outbox, templates, delivery events |
| `audit` | Security and business audit events |
| `analytics` | Consent-aware product/business events |

### 6.3 Module contract rule

Bir modül başka modülün internal repository dosyasını import etmez. Cross-module işlem:

- public service contract,
- application use case,
- typed event,
- veya açık database foreign key

üzerinden yapılır.

### 6.4 Gelecekte servis ayrıştırma kriteri

Bir modül ancak aşağıdaki kanıtlardan biri varsa ayrı servise dönüşür:

- Bağımsız scaling ihtiyacı
- Bağımsız release zorunluluğu
- Güçlü security/isolation ihtiyacı
- Uzun süren background workloads
- Farklı runtime zorunluluğu
- Ölçülmüş takım ownership problemi

---

## 7. High-Level Container Architecture

~~~mermaid
flowchart TB
    B["Browser"] --> E["Vercel Edge / Proxy"]
    E --> N["Next.js Application"]
    N --> D["Server-only Data Access Layer"]
    D --> P["Supabase PostgreSQL + RLS"]
    N --> A["Supabase Auth"]
    N --> F["Supabase Storage"]
    N --> M["Email Outbox Worker"]
    M --> R["Resend API"]
~~~

### 7.1 Browser responsibility

- Rendered HTML and hydrated interactive islands
- Form UX validation
- Public compare/project-list safe local state
- Auth cookie transport managed by browser
- No service secret
- No authorization decision authority

### 7.2 Next.js responsibility

- Request context and market resolution
- Server rendering
- Business validation
- Authentication and authorization orchestration
- Safe DTO creation
- Mutations and transactions
- Signed URL issuance
- Webhook and scheduled worker endpoints

### 7.3 Supabase responsibility

- Durable relational data
- Authentication identity
- Row-level authorization backstop
- Private/public object storage
- Database constraints and transactions

---

## 8. Runtime ve Version Policy

### 8.1 Foundation baseline

| Technology | Approved baseline |
|---|---|
| Node.js | 24.x LTS |
| pnpm | 11.x, exact `packageManager` pin |
| Next.js | 16.x stable at Foundation start |
| React | Next.js-compatible 19.x |
| TypeScript | 5.x, strict mode |
| Tailwind CSS | 4.x |
| Zod | 4.x |
| TanStack Query | 5.x, selective use |

Exact patch versions `pnpm-lock.yaml` içinde dondurulur. Production build her zaman `pnpm install --frozen-lockfile` kullanır.

### 8.2 Upgrade policy

- Dependency upgrades ayrı pull request olur.
- Major upgrade otomatik merge edilmez.
- Security patch öncelikli değerlendirilir.
- Framework upgrade sonrası build, unit, integration ve E2E smoke çalışır.
- Database, Auth ve SDK breaking changes migration note gerektirir.
- Aylık dependency health review yapılır.

### 8.3 Prohibited version habits

- “latest” ile üretim build’i
- Lockfile olmadan deploy
- Local ve CI Node major farkı
- Deprecated `middleware.ts` convention ile yeni Foundation
- Experimental feature’ı ADR ve fallback olmadan core path’e almak

---

## 9. Repository Architecture

~~~text
infravolt-platform/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── admin/
│   │   ├── portal/
│   │   ├── api/
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── proxy.ts
│   ├── components/
│   │   ├── ui/
│   │   ├── patterns/
│   │   └── domain/
│   ├── modules/
│   │   ├── markets/
│   │   ├── catalog/
│   │   ├── industries/
│   │   ├── resources/
│   │   ├── companies/
│   │   ├── quotes/
│   │   ├── enquiries/
│   │   ├── dealers/
│   │   ├── accounts/
│   │   ├── notifications/
│   │   └── audit/
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── env/
│   │   ├── security/
│   │   ├── observability/
│   │   └── utils/
│   ├── styles/
│   └── types/
├── public/
│   └── assets/
├── emails/
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
├── tests/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
├── scripts/
├── docs/
│   └── adr/
├── .env.example
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
└── vercel.json
~~~

### 9.1 Placement rules

- Generic low-level components: `components/ui`
- Repeated composed layouts: `components/patterns`
- Business-aware visual components: relevant module or `components/domain`
- Business validation: module `schemas`
- Database access: module `server/repository`
- Use cases: module `server/service` or `application`
- Browser-only code: explicit `client` boundary
- Secrets and admin clients: `server-only` import protection

### 9.2 Import rules

- `app` may import public module APIs.
- Client Component server repository import edemez.
- `components/ui` business module import edemez.
- Module internals başka modülden deep import edilmez.
- Environment variables doğrudan dağınık biçimde okunmaz; typed env module kullanılır.

---

## 10. Application Surfaces

### 10.1 Public B2B website

- UK and Ukraine public domains
- Product discovery
- Industry and Application Map
- Technical resources metadata
- Project List and quote submission
- Dealer application
- Company/trust content

### 10.2 Internal Admin

- Authenticated internal users only
- Company/contact management
- Quote and enquiry lifecycle
- Dealer review
- Product/content/document publishing
- Audit and operational reporting

### 10.3 Approved Partner Portal

- Invitation-only account
- Approved technical documents
- Partner resources
- Quote/project visibility where policy permits
- Company membership-aware data access

### 10.4 Surface isolation rule

Shared component and shared database aynı yetki anlamına gelmez. Public, admin ve portal her request’te ayrı policy context ile çalışır.

---

## 11. Domain ve Market Resolution

### 11.1 Production host matrix

| Host | Market | Locale | Surface |
|---|---|---|---|
| `infravolt.co.uk` | `uk` | `en-GB` | Public |
| `www.infravolt.co.uk` | `uk` | `en-GB` | Redirect to canonical |
| Ukraine domain — TBD | `ua` | `uk-UA` | Public |
| Ukraine `www` — TBD | `ua` | `uk-UA` | Redirect to canonical |
| Protected host — proposed `app.infravolt.co.uk` | Profile/record based | en-GB or uk-UA | Admin + Portal |

Ukraine production domain ve protected host Founder/DNS kararı gelene kadar configuration placeholder olarak kalır.

### 11.2 Resolution flow

~~~mermaid
flowchart TD
    R["Incoming Request"] --> H{"Host allowlisted?"}
    H -- No --> X["Reject or controlled non-canonical response"]
    H -- Yes --> M["Resolve market and locale"]
    M --> P["Set trusted internal request context"]
    P --> A["Render allowed route surface"]
~~~

### 11.3 `proxy.ts` responsibilities

Next.js 16 Foundation’da `src/proxy.ts` kullanılır.

Sorumluluklar:

- Host normalization
- Canonical `www` redirect
- Public/protected surface routing
- Unknown host rejection/fallback
- Incoming spoofed internal headers’ın temizlenmesi
- Trusted market/locale context header’larının eklenmesi
- Auth session cookie refresh where required
- Narrow matcher; static asset ve image routes excluded

`proxy.ts` business data fetch etmez, ağır authorization yapmaz ve database query katmanı olmaz.

### 11.4 Trusted request context

Server-side `getRequestContext()` şu değerleri üretir:

~~~ts
type RequestContext = {
  requestId: string
  host: string
  market: 'uk' | 'ua'
  locale: 'en-GB' | 'uk-UA'
  surface: 'public' | 'admin' | 'portal'
  canonicalOrigin: string
}
~~~

Context her server entry point’te yeniden doğrulanır. Client tarafından gönderilen `market`, `locale` veya `role` güvenilir kaynak değildir.

### 11.5 Local development hosts

Recommended:

- `uk.localhost:3000`
- `ua.localhost:3000`
- `app.localhost:3000`

Query parameter ile market değiştirme yalnız test helper olabilir; canonical application logic değildir.

### 11.6 No forced geo redirect

- IP bazlı zorunlu ülke redirect yoktur.
- Kullanıcı market switcher ile diğer pazara geçebilir.
- Switcher equivalent content varsa karşılığına, yoksa target-market landing page’e gider.
- Source domain ve selected market commercial record’a ayrı alan olarak kaydedilir.

---

## 12. URL, Route Key ve Localization Architecture

### 12.1 Stable route identity

~~~ts
type LocalizedRoute = {
  key: 'products' | 'industries' | 'resources' | 'quote' | 'contact'
  market: 'uk' | 'ua'
  locale: 'en-GB' | 'uk-UA'
  pathname: string
}
~~~

Route key code içinde sabit, pathname pazara göre çevrilebilir.

### 12.2 Content identity

- Shared logical entity has one stable UUID.
- Market-specific content has separate publish record.
- Slug uniqueness market + content type içinde uygulanır.
- Redirect history saklanır.
- Missing translation source-market fallback olarak sessizce yayınlanmaz.

### 12.3 SEO output

Her public response:

- correct canonical URL,
- self hreflang,
- equivalent cross-market hreflang if truly equivalent,
- localized title/description,
- market-specific sitemap membership

üretir.

### 12.4 Protected route SEO

Admin, portal, auth callbacks, preview ve signed download endpoints:

- `noindex, nofollow`
- sitemap dışı
- canonical public content gibi davranmaz

---

## 13. Rendering Architecture

### 13.1 Defaults

| Screen type | Rendering baseline |
|---|---|
| Public marketing/content | Server Component |
| Product/category | Server Component + selective client filters |
| Application Map | Server shell + lazy client interaction |
| Public form | Server shell + client form island |
| Admin | Dynamic authenticated server shell + client tables where needed |
| Portal | Dynamic authenticated server shell + selective client data |
| Preview | Dynamic, no shared cache |

### 13.2 Client Component criteria

Client Component yalnız aşağıdaki ihtiyaçlardan biri varsa açılır:

- Browser event interaction
- React Hook Form state
- Application Map pan/selection
- Comparator state
- Project List local state
- Admin filter/table refresh
- Portal background refresh
- Browser-only API

### 13.3 Client boundary discipline

- Page’in tamamı gereksiz yere `use client` olmaz.
- Büyük server-fetched object client’a serialize edilmez.
- Client’a only safe DTO geçer.
- Private fields React props içinde “gizli ama gönderilmiş” tutulmaz.

---

## 14. Data Access Layer

Next.js server code içinde server-only Data Access Layer kullanılır.

### 14.1 DAL responsibilities

- Authenticated identity lookup
- Permission resolution
- Market scoping
- Database query
- Row existence and state checks
- Safe DTO projection
- Audit trigger where required
- Internal errors to public-safe error mapping

### 14.2 Safe DTO example

~~~ts
type PublicProductCardDTO = {
  id: string
  slug: string
  name: string
  shortDescription: string | null
  image: PublicImageDTO | null
  keyAttributes: Array<{ label: string; value: string }>
}
~~~

Database row doğrudan Client Component’a veya public JSON response’a verilmez.

### 14.3 Database clients

| Client | Usage |
|---|---|
| Request-scoped SSR client | User session-aware reads/mutations |
| Browser client | Auth flow and explicitly approved RLS-protected operations |
| Service/secret client | Narrow server-only jobs and privileged repositories |

### 14.4 Service key rule

- Client bundle’a asla girmez.
- Generic helper olarak her yerde kullanılmaz.
- Her privileged operation function-level reason içerir.
- Authorization application layer’da ayrıca yapılır.
- Audit event gerektiren işlemler audit edilir.

---

## 15. Mutation ve Integration Boundaries

### 15.1 Server Actions

First-party same-application mutations:

- Project List update where server-owned
- Quote submission
- Admin record edit
- Partner preference update
- Content publish action

Her Server Action:

1. Parses input.
2. Validates with server-side Zod.
3. Resolves identity/context.
4. Authorizes operation.
5. Executes transaction.
6. Invalidates relevant cache.
7. Returns public-safe result.

### 15.2 Route Handlers

Route Handlers şu sınırlar için kullanılır:

- Resend webhooks
- Supabase/auth callbacks where needed
- Signed document download intent
- Public upload intent
- Client-owned admin/portal queries
- Scheduled worker endpoints
- Health/readiness endpoint
- External integration callback

### 15.3 Not a public API

MVP’de partnerlara veya üçüncü taraflara genel public REST/GraphQL API sunulmaz. Internal Route Handler varlığı public integration contract anlamına gelmez.

### 15.4 Standard result envelope

~~~ts
type ActionResult<T> =
  | { ok: true; data: T; requestId: string }
  | {
      ok: false
      error: {
        code: string
        message: string
        fieldErrors?: Record<string, string[]>
      }
      requestId: string
    }
~~~

Stack trace, SQL error, secret, provider payload veya internal policy detail user response’a verilmez.

---

## 16. Frontend State Architecture

### 16.1 State decision table

| State | Owner |
|---|---|
| URL filters/sort/page | URL search params |
| Server content | Server Components/DAL |
| Form values/errors | React Hook Form |
| Validation schema | Zod |
| Project List safe item IDs/qty | Zustand, optional safe persistence |
| Comparator IDs | Zustand or URL depending shareability |
| Drawer/dialog state | Local React state |
| Admin interactive server data | TanStack Query where justified |
| Auth identity | Supabase session + server resolution |

### 16.2 Zustand restrictions

Persist edilebilir:

- Product ID
- Quantity
- Unit
- Non-sensitive display preference

Persist edilemez:

- Name, email, phone
- Company confidential data
- Access/refresh token
- Signed URL
- Admin role/permission
- Internal notes
- Full quote form payload

### 16.3 TanStack Query restrictions

- Entire application wrapper olarak varsayılan kullanılmaz.
- Public Server Component data için kullanılmaz.
- Interactive admin/portal grid, polling veya background refresh için kullanılabilir.
- Query function client-accessible Route Handler kullanır.
- Server Action query function olarak kullanılmaz.
- Query key market, company and permission context leakage yaratmayacak biçimde scope edilir.

---

## 17. Database Architecture

### 17.1 Database engine

Supabase managed PostgreSQL canonical transactional database’tir.

### 17.2 Schema boundaries

| Schema | Purpose |
|---|---|
| `public` | Application tables/views exposed only through RLS-aware access |
| `private` | Internal helper tables/functions not exposed through data API |
| `auth` | Supabase-managed identity |
| `storage` | Supabase-managed object metadata |

### 17.3 Core rules

- UUID primary keys
- UTC timestamps
- Explicit foreign keys
- Check constraints for invariant states
- Unique constraints for idempotency and slug scope
- Soft delete only where business/audit need exists
- Immutable audit records
- RLS enabled on exposed tables
- Default-deny policies
- No production schema change from dashboard-only manual operation

### 17.4 Migration ownership

- SQL migrations: `supabase/migrations`
- Migration immutable after shared environment use
- New correction uses new migration
- Seed data synthetic and non-sensitive
- Generated TypeScript database types committed or generated in CI with controlled diff

### 17.5 ORM decision

Prisma MVP baseline değildir. Supabase client, typed SQL/RPC and generated database types yeterlidir.

Prisma ancak:

- complex repository ergonomics,
- provider portability,
- veya proven type/query maintenance benefit

gösterilirse ADR ile eklenebilir.

### 17.6 Transaction boundaries

Multi-record business operations database transaction veya RPC içinde atomic olmalıdır.

Örnek quote submission:

- Idempotency record
- Company/contact resolution
- Quote creation
- Line item creation
- Source attribution
- Initial activity
- Notification outbox

tek transaction boundary içinde yürütülür.

---

## 18. Row-Level Security

### 18.1 Policy model

RLS uygulama authorization’ının database backstop’udur.

Policy dimensions:

- Authenticated user ID
- Active account status
- Company membership
- Internal role
- Market scope
- Record ownership/assignment
- Publish status
- Partner approval state

### 18.2 Default policy expectations

| Data | Public | Partner | Admin |
|---|---|---|---|
| Published product content | Market-scoped read | Read | Manage by permission |
| Draft content | No | No | Authorized read/write |
| Private document metadata | Limited public metadata | Policy-based | Manage |
| Private object | No direct public read | Authorized | Authorized |
| Quote | No | Own company if permitted | Assigned/authorized |
| Internal notes | No | No | Authorized roles only |
| Audit log | No | No | Restricted internal read |

### 18.3 RLS test requirement

Her protected table için en az:

- anonymous denied,
- wrong company denied,
- inactive membership denied,
- correct membership allowed,
- admin permission allowed/denied variants

integration test olarak çalışır.

---

## 19. Authentication Architecture

### 19.1 Provider

Supabase Auth SSR cookie session pattern kullanılır.

### 19.2 Account creation policy

- Public self-sign-up baseline değildir.
- Internal user Super Admin tarafından invite edilir.
- Partner user dealer approval sonrası invite edilir.
- Email address doğrulaması zorunludur.
- Suspended company/member login sonrası protected data göremez.

### 19.3 Session rules

- HTTP-only cookie-based SSR session
- Secure production cookies
- SameSite policy documented and tested
- Session freshness sensitive action’da yeniden doğrulanır
- Logout active session’ı sonlandırır
- Password reset generic responses ile account enumeration azaltır

### 19.4 MFA

- Internal admin ve Super Admin için production launch öncesi MFA zorunlu hedefidir.
- Partner MFA risk/contract policy’ye göre V1’de optional veya required yapılabilir.
- MFA bypass manual database edit ile yapılmaz; audited recovery workflow gerekir.

### 19.5 Authentication versus authorization

Authentication “kim” sorusunu, authorization “hangi kayıtta ne yapabilir” sorusunu cevaplar. Login olmuş olmak admin veya partner data erişimi için yeterli değildir.

---

## 20. Authorization Model

### 20.1 Core entities

- `user_profile`
- `company`
- `company_membership`
- `role`
- `permission`
- `membership_role`
- optional record assignment

### 20.2 Baseline roles

| Role | Scope |
|---|---|
| `super_admin` | Platform governance |
| `admin` | Broad operation with explicit restrictions |
| `sales_admin` | Companies, enquiries, quotes |
| `dealer_manager` | Dealer application and partner management |
| `technical_manager` | Product/document technical approval |
| `partner_admin` | Own partner company membership management where enabled |
| `partner_user` | Own company permitted resources |

### 20.3 Permission examples

- `quotes.read`
- `quotes.assign`
- `quotes.change_status`
- `companies.manage`
- `dealers.approve`
- `products.publish.uk`
- `products.publish.ua`
- `documents.publish`
- `documents.issue_access`
- `users.invite_internal`
- `audit.read`

### 20.4 Role claims rule

JWT claims performance hint olabilir; sole authorization source değildir. Sensitive operation current membership/account state’i database’den doğrular.

---

## 21. Protected Host Decision

### 21.1 Recommended architecture

Public domains ayrı kalırken protected surfaces için tek canonical host önerilir:

~~~text
app.infravolt.co.uk/admin
app.infravolt.co.uk/portal
~~~

### 21.2 Neden

- Tek auth cookie boundary
- Ukraine ve UK partner hesaplarının aynı session modelinde çalışması
- Duplicate protected content olmaması
- Domain switching sırasında auth kaybının önlenmesi
- Güvenlik header ve CSP politikasının kolay yönetimi

### 21.3 Locale

Protected UI locale user profile preference ile `en-GB` veya `uk-UA` olur. Protected locale public domain’e bağlı değildir.

### 21.4 Approval status

Bu öneri `TA-001` open decision’dır. Founder onayına kadar implementation:

- protected host config variable kullanır,
- route code host adı hard-code etmez,
- UK public host üzerinde geçici local/preview fallback destekleyebilir.

---

## 22. Storage Architecture

### 22.1 Asset classes

| Class | Storage | Access |
|---|---|---|
| Version-controlled UI assets | Repository `/public/assets` | Public |
| Approved published product media | Public bucket or repository | Public |
| Product media staging | Private bucket | Internal review |
| Technical documents | Private bucket | Policy + short signed URL |
| Public form attachments | Private quarantine bucket | Authorized internal only |
| Partner documents | Private bucket | Company/policy scoped |

### 22.2 Recommended buckets

- `published-media`
- `media-staging`
- `technical-documents`
- `form-attachments`
- `partner-documents`

### 22.3 Object path policy

Object path:

- Opaque UUID kullanır.
- Email, person name veya confidential project name içermez.
- Market, document ID and version IDs controlled segments olabilir.
- Original filename metadata olarak sanitized biçimde saklanır.

### 22.4 Private document delivery

~~~mermaid
sequenceDiagram
    participant U as User
    participant A as InfraVolt App
    participant D as Database
    participant S as Private Storage
    U->>A: Request document download
    A->>D: Verify identity, access and version
    D-->>A: Access decision
    A->>S: Create short-lived signed URL
    A->>D: Write access audit
    A-->>U: Return redirect/download response
~~~

### 22.5 Signed URL policy

- Default expiry: 120 seconds
- Maximum standard expiry: 5 minutes
- Fresh authorization check before every issuance
- URL not stored in analytics or application logs
- URL not emailed as long-lived access mechanism
- Signed URL expiry’den önce reliably revoke edilemeyeceği varsayılır
- Highly sensitive document direct streamed download ile değerlendirilebilir

### 22.6 Upload validation

- Allowlisted MIME types
- File extension and detected content match
- Explicit size limit
- Filename sanitation
- Random object key
- Quarantine state
- Malware scanning decision before broad attachment launch
- No automatic public publishing

---

## 23. Application Map Technical Architecture

### 23.1 Core principle

Application Map screenshot veya composite artwork içine gömülü UI değildir. Görsel base layer; hotspots, labels, controls, list and product panel React/HTML component’leridir.

### 23.2 Data model concept

~~~ts
type ApplicationMap = {
  id: string
  industryId: string
  market: 'uk' | 'ua'
  imageAssetId: string
  hotspots: ApplicationHotspot[]
  publishStatus: 'draft' | 'review' | 'published' | 'archived'
}

type ApplicationHotspot = {
  id: string
  xPercent: number
  yPercent: number
  labelKey: string
  productIds: string[]
  sortOrder: number
}
~~~

### 23.3 Asset source

Canonical input package:

- `infravolt-application-map-assets-v1.zip`
- `manifests/asset-manifest.json`
- Canonical filenames only

Legacy upload names production code’a girmez.

### 23.4 Responsive behavior

- Wide: image + hotspot interaction
- Medium: image with controlled panel
- Compact: list-first accessible alternative
- Keyboard: hotspot list and selected state
- Screen reader: semantic linked list, not coordinate-only navigation
- Localization: text overlay only, no translated text baked into raster image

### 23.5 Performance

- Lazy load below fold
- Responsive image sizes
- No full-resolution image on Compact
- Hotspot JSON cached with published map
- Panel product data fetched/projected minimally

---

## 24. Public Form Architecture

### 24.1 Forms in scope

- Contact enquiry
- Basic quote request
- Project support
- Technical question
- Dealer/trade account application
- Controlled document access request

### 24.2 Validation layers

| Layer | Purpose |
|---|---|
| Browser constraints | Basic usability |
| React Hook Form | Interaction and error display |
| Shared Zod schema | Consistent shape |
| Server Zod validation | Authoritative validation |
| Database constraints | Durable invariants |

Client validation passed sonucu server güven kararı değildir.

### 24.3 Submission flow

~~~mermaid
flowchart TD
    S["Submit"] --> V["Server Validation"]
    V --> T["Turnstile Verification"]
    T --> R["Rate Limit"]
    R --> I["Idempotency Check"]
    I --> D["Database Transaction"]
    D --> O["Notification Outbox"]
    O --> C["Safe Confirmation"]
~~~

### 24.4 Turnstile rules

- Server-side Siteverify mandatory
- Token single use kabul edilir
- Token lifetime kısa kabul edilir
- Hostname/action expected values validate edilir
- Test environments official test keys kullanır
- Turnstile failure database business record oluşturmadan döner

### 24.5 Rate limit

In-memory function instance counter production rate limiter değildir.

MVP baseline:

- Turnstile
- Database-backed atomic rate limit for high-value public mutations
- Hashed network/client signal where legally appropriate
- Per form and rolling time window
- Generic user response
- Security event logging without raw sensitive fingerprint storage

Traffic artarsa dedicated managed rate-limit store ADR ile eklenir.

### 24.6 Idempotency

- Client form instance UUID üretir.
- Server form type + idempotency key unique constraint uygular.
- Repeated same submission duplicate quote/enquiry oluşturmaz.
- Existing success result safe biçimde döndürülebilir.

### 24.7 File attachment flow

Public anonymous upload yalnız feature policy aktifse açılır:

1. Turnstile-protected upload intent.
2. Short-lived restricted upload permission.
3. Private quarantine object.
4. Server validates object ownership/nonce.
5. Final submission references attachment ID.
6. Internal scan/review status.

Attachment feature, malware and size policy hazır değilse launch’ta kapalı kalır.

---

## 25. Quote Submission Architecture

### 25.1 Project List state

Anonymous Project List yalnız safe item information tutar:

- Product ID
- Quantity
- Unit
- Optional public configuration ID

Contact/project confidential fields final form aşamasına kadar local persistence’a yazılmaz.

### 25.2 Server transaction

~~~mermaid
sequenceDiagram
    participant B as Buyer
    participant A as App
    participant DB as PostgreSQL
    B->>A: Submit project list + details
    A->>A: Validate, anti-bot, rate limit
    A->>DB: Atomic quote submission transaction
    DB-->>A: Quote reference + outbox record
    A-->>B: Safe confirmation reference
~~~

### 25.3 Product snapshot

Quote line item product ID yanında submission-time snapshot tutar:

- Product display name
- Product code if approved
- Requested quantity/unit
- Selected public attributes
- Market/locale

Catalog daha sonra değişse bile original request anlamını korur.

### 25.4 Reference number

Public confirmation database UUID göstermez. Separate human-safe non-sequential or controlled reference üretir.

### 25.5 Pricing

- Public quote submission price calculate etmez.
- Checkout veya payment intent oluşturmaz.
- Internal pricing ileride eklenirse permissioned ayrı module olur.

---

## 26. Email ve Notification Architecture

### 26.1 Provider scope

Resend transactional sending provider’dır. Corporate mailbox hosting ve human inbox workflow ayrı karardır.

### 26.2 Outbox pattern

`notification_outbox` business transaction ile aynı database transaction içinde yazılır.

Suggested states:

- `pending`
- `processing`
- `sent`
- `failed`
- `dead`
- `cancelled`

### 26.3 Worker flow

1. Scheduled worker authenticates with `CRON_SECRET`.
2. Small batch locks with safe concurrency control.
3. Template and recipient policy are resolved.
4. Resend call uses stable idempotency key.
5. Provider ID saved.
6. Failure retry count and next attempt updated.
7. Maximum attempt sonrası `dead` and internal alert.

### 26.4 Idempotency

Resend idempotency window sınırlı olduğu için application-level outbox uniqueness provider’a ek güvence olur.

### 26.5 Domain-aware sender policy

| Market | From | Reply-to |
|---|---|---|
| UK | Verified UK sending identity | UK sales mailbox |
| Ukraine | Verified Ukraine/brand identity | Ukraine operations mailbox |

Exact addresses environment/config kararıdır; code içine hard-code edilmez.

### 26.6 Webhooks

- Signature verified before parsing as trusted event
- Duplicate provider event idempotently ignored
- Delivery/bounce/complaint stored
- Webhook response fast; heavy work deferred
- Raw payload retention minimized

### 26.7 Email data minimization

- Sensitive internal notes customer email’e girmez.
- Private document permanent public link olarak gönderilmez.
- Full provider payload application log’una yazılmaz.

---

## 27. Cache Architecture

### 27.1 Cache classes

| Data | Cache policy |
|---|---|
| Published public content | Cacheable by explicit policy |
| Public catalogue projections | Cacheable with market key |
| Draft/preview | No shared cache |
| Admin data | Dynamic/no shared cache |
| Portal/user data | Dynamic/no shared cache |
| Signed URL | Never cache |
| Auth/session result | Request scoped |

### 27.2 Cache key rule

Public cache key must include relevant:

- Market
- Locale
- Stable content ID/slug
- Published version
- Filter/page where applicable

UK response hiçbir koşulda UA hostname altında cache-hit olarak servis edilmez.

### 27.3 Suggested tags

- `product:{id}`
- `category:{id}`
- `industry:{id}`
- `application-map:{id}`
- `resource:{id}`
- `market:{market}`

### 27.4 Invalidation

Publish/unpublish/update transaction başarıyla tamamlandıktan sonra ilgili cache tags invalidate edilir.

### 27.5 Next.js Cache Components decision

- Foundation ilk sprintte explicit rendering/cache policy ile başlar.
- `cacheComponents: true` ancak cache tests ve invalidation proof sonrası ADR ile etkinleştirilir.
- Production’da experimental `use cache: private` kullanılmaz.
- User-specific/private data shared cache boundary’ye sokulmaz.

---

## 28. Search Architecture

### 28.1 MVP

MVP için external search service yoktur. Navigation, taxonomy, product filters ve direct links birincil discovery modelidir.

### 28.2 V1 search

Gerekli olduğunda PostgreSQL:

- Full-text search
- Trigram similarity
- Market-scoped published search view
- Weighted name/code/category fields

ile başlanır.

### 28.3 External engine trigger

Algolia/Meilisearch/OpenSearch ancak:

- catalogue scale,
- typo tolerance,
- advanced ranking,
- indexing latency,
- veya measured database load

gerektirirse değerlendirilir.

---

## 29. Security Architecture

### 29.1 Threat priorities

- Unauthorized private document access
- Cross-company portal data leakage
- Admin privilege escalation
- Form spam and automated abuse
- Stored/reflected XSS
- CSRF/state-changing request abuse
- Host header and market spoofing
- Secret leakage
- SQL/RLS misconfiguration
- Signed URL leakage
- Malicious file upload
- Webhook forgery/replay

### 29.2 Security headers

Production baseline:

- Strict-Transport-Security
- Content-Security-Policy
- X-Content-Type-Options: nosniff
- Referrer-Policy
- Permissions-Policy
- frame-ancestors via CSP
- Secure cookie flags

### 29.3 CSP strategy

Nonce-based CSP Next.js pagesini dynamic rendering’e zorlayabildiği için public performance trade-off yaratır.

Baseline:

- Strict deploy-time header allowlist
- Minimal third-party scripts
- No unnecessary inline scripts
- No production `unsafe-eval`
- Analytics/consent sources explicit
- Nonce CSP only after ADR and performance measurement

### 29.4 CSRF and origin protection

- No state-changing GET
- SameSite cookies
- Server Actions origin validation
- Route Handlers for mutation check allowed origin where appropriate
- Webhook routes signature-based, not browser session-based

### 29.5 XSS

- React output escaping retained
- `dangerouslySetInnerHTML` default prohibited
- Rich text requires allowlist sanitizer
- URL schemes validated
- User content never trusted as HTML

### 29.6 SSRF/open redirect

- Redirect target allowlist
- Storage/provider URLs generated server-side
- User-supplied arbitrary fetch URL prohibited
- Host and protocol validation

### 29.7 Secrets

- Server secrets Vercel encrypted environment variables
- Local `.env.local`, never committed
- `.env.example` names only
- Public variables explicitly prefixed
- Secret rotation runbook
- Logs redact token/key/cookie

### 29.8 Dependency security

- Lockfile committed
- Dependency review
- Automated vulnerability signal
- Minimal package count
- No abandoned package without owner review

---

## 30. Environment Variable Architecture

### 30.1 Public variables

~~~text
NEXT_PUBLIC_SITE_URL_UK=
NEXT_PUBLIC_SITE_URL_UA=
NEXT_PUBLIC_PROTECTED_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
~~~

### 30.2 Server-only variables

~~~text
SUPABASE_SECRET_KEY=
RESEND_API_KEY=
RESEND_WEBHOOK_SECRET=
TURNSTILE_SECRET_KEY=
CRON_SECRET=
EMAIL_FROM_UK=
EMAIL_REPLY_TO_UK=
EMAIL_FROM_UA=
EMAIL_REPLY_TO_UA=
LOG_LEVEL=
~~~

Supabase project yalnız legacy keys sunuyorsa equivalent server-only service role key transitional olarak kullanılır; client’a verilmez.

### 30.3 Validation

- Server env and client env separate Zod schemas
- App startup/build sırasında required variable validation
- Secret values error message içinde yazılmaz
- Preview/production variable sets ayrı
- Domain values normalized URL olarak parse edilir

---

## 31. Environments

### 31.1 Environment matrix

| Environment | App | Database/Auth/Storage | Data |
|---|---|---|---|
| Local | Local Next.js | Local Supabase CLI | Synthetic seed |
| Preview | Vercel preview | Isolated preview/staging project or branch | Synthetic/masked |
| Staging | Stable staging deployment | Dedicated staging | Non-production |
| Production | Vercel production | Dedicated production | Live |

### 31.2 Isolation rules

- Preview production database’e bağlanmaz.
- Production user list staging’e kopyalanmaz.
- Storage buckets environment-specific.
- Email staging recipient allowlist veya safe sink kullanır.
- Turnstile test keys local/test only.
- Analytics production and non-production separated.

### 31.3 Supabase branching

Preview branches data-less ve separate credentials yaklaşımıyla kullanılabilir. Branch support/cost uygun değilse dedicated shared staging project kullanılır; production credentials hiçbir preview environment’a verilmez.

---

## 32. Deployment Architecture

### 32.1 Hosting

Tek Vercel project:

- UK public domain
- Ukraine public domain
- protected app host
- preview deployments

ile çalışır.

### 32.2 Pipeline

~~~mermaid
flowchart TD
    C["Code Change"] --> Q["Lint + Typecheck + Unit"]
    Q --> B["Production Build"]
    B --> I["Integration + E2E Smoke"]
    I --> P["Preview / Approval"]
    P --> M["Backward-compatible Migration"]
    M --> D["Production Deploy"]
    D --> S["Smoke + Monitoring"]
~~~

### 32.3 Required CI commands

~~~text
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e:smoke
~~~

### 32.4 Migration deployment

- Expand-contract migration pattern
- New nullable/additive fields before code dependency
- Backfill separately if large
- Old code and new schema short overlap compatible
- Destructive drop after verified release
- Production migration logs retained

### 32.5 Rollback

- Application rollback can use prior Vercel deployment.
- Database rollback default olarak destructive down migration değildir.
- Data schema issue çoğunlukla forward-fix edilir.
- Irreversible migration backup/recovery note gerektirir.

---

## 33. Scheduled ve Background Work

### 33.1 Initial jobs

- Notification outbox delivery
- Failed email retry
- Expired access cleanup
- Stale application reminders if approved
- Operational digest if approved

### 33.2 Vercel Cron security

- `CRON_SECRET` required
- Endpoint public anonymous behavior sunmaz
- Method and authorization checked
- Job idempotent
- Small batch size
- Execution time bounded

### 33.3 Concurrency

Worker rows atomic claim/lock ile alır. Birden fazla invocation aynı notification’ı duplicate göndermemelidir.

### 33.4 Queue trigger

Outbox polling yetersiz kalırsa managed queue şu kanıtlarla eklenir:

- Backlog latency
- High event volume
- Long processing
- Retry complexity
- External integration fan-out

---

## 34. Observability

### 34.1 Baseline

- Structured server logs
- Vercel function/runtime logs
- Request correlation ID
- Deployment/build status
- Database health and slow query review
- Notification delivery states
- Security and business audit tables

### 34.2 Log shape

~~~ts
type LogEvent = {
  timestamp: string
  level: 'debug' | 'info' | 'warn' | 'error'
  event: string
  requestId?: string
  market?: 'uk' | 'ua'
  surface?: 'public' | 'admin' | 'portal'
  actorId?: string
  recordType?: string
  recordId?: string
  durationMs?: number
}
~~~

### 34.3 Never log

- Password
- Access/refresh token
- Cookie value
- Secret/API key
- Full signed URL
- Full public form message by default
- Raw document bytes
- Full webhook payload unless redacted and justified

### 34.4 Error tracking

Launch baseline Vercel observability + structured application error events’tir. Error grouping, source map or alerting ihtiyacı karşılanmazsa Sentry-class provider ADR ile eklenir.

### 34.5 Alerts

Minimum alerts:

- Production build/deploy failed
- Repeated 5xx increase
- Quote submission failure spike
- Notification outbox backlog/dead rows
- Auth abnormal errors
- Database/storage quota risk
- Webhook signature failure spike

---

## 35. Audit Architecture

### 35.1 Audit events

- Login/security-sensitive account event
- User invitation
- Membership/role change
- Dealer approval/rejection
- Quote status/assignment change
- Product publish/unpublish
- Document version/publish/access change
- Signed document access issuance
- Internal note create/update where policy requires
- Export action

### 35.2 Audit event content

- Actor
- Action
- Target type/ID
- Timestamp
- Market/surface
- Request ID
- Before/after safe diff where appropriate
- Reason for privileged action where required

### 35.3 Audit integrity

Audit logs normal UI delete işlemine açık değildir. Retention and export policy later compliance document defines exact duration.

---

## 36. Analytics Architecture

### 36.1 Baseline

Business-critical conversions database business records’den ölçülür:

- Quote submitted
- Project support submitted
- Dealer application submitted
- Controlled document request
- Approved document access

### 36.2 Web analytics

- One lightweight provider baseline
- Consent and legal review before non-essential cookies
- No sensitive form values
- Market/domain separation
- Internal/admin traffic excluded where possible
- GA4 and Clarity default olarak birlikte kurulmaz

### 36.3 Event naming

~~~text
product_viewed
project_list_item_added
quote_submission_completed
dealer_application_completed
document_access_requested
document_download_authorized
~~~

Event payload public-safe IDs and categorical metadata only contains.

---

## 37. Performance Architecture

### 37.1 Public page priorities

- Server-rendered meaningful HTML
- Minimal client JS
- Optimized responsive images
- Self-hosted/subset font strategy
- Lazy Application Map
- No heavy animation library baseline
- Pagination/limited result sets
- Cache only proven public data

### 37.2 Performance budgets — provisional

| Metric | Target |
|---|---|
| LCP | Good CWV range on representative mobile |
| CLS | ≤ 0.1 |
| INP | Good CWV range |
| Initial JS | Page-template budget defined during Foundation |
| Hero image | Responsive, compressed, no oversized original |

Exact byte budgets real screen prototype ve device test sonrası frozen olur.

### 37.3 Admin performance

- Server-side pagination
- Bounded select fields
- No unfiltered full-table load
- Index-backed search/filter
- Debounced client search where applicable
- Optimistic UI only reversible low-risk actions

---

## 38. Accessibility Technical Architecture

### 38.1 Required implementation

- Semantic landmarks
- Correct heading hierarchy
- Keyboard navigation
- Visible focus
- Form labels/descriptions/errors
- Error summary linked to fields
- Dialog focus trap/return
- Live-region only meaningful updates
- Reduced-motion support
- 44 px target guidance where applicable
- Table semantics and mobile alternatives

### 38.2 Application Map

Coordinate hotspots equivalent list navigation olmadan release edilmez.

### 38.3 Automation

- Static lint/accessibility checks
- Component interaction tests
- Playwright keyboard smoke
- Manual screen reader and zoom checks for critical flows

Automation WCAG approval yerine geçmez.

---

## 39. Test Architecture

### 39.1 Test pyramid

| Layer | Tool | Purpose |
|---|---|---|
| Unit | Vitest | Pure business rules, market routing, validation |
| Component | React Testing Library | States, keyboard, forms, rendering |
| Database integration | Local Supabase/PostgreSQL | RLS, constraints, RPC/transactions |
| App integration | Vitest/Next test harness | Actions, DAL, provider adapters |
| E2E | Playwright | Critical user journeys and domain behavior |

### 39.2 Critical E2E journeys

- UK domain renders en-GB canonical page
- UA domain renders uk-UA canonical page
- Market switch equivalent/missing-content behavior
- Product to Project List to quote confirmation
- Form anti-bot test path
- Dealer application
- Internal login and permission denial
- Partner cross-company access denial
- Private document authorized access
- Private document unauthorized denial
- Admin publish then public cache invalidation

### 39.3 Provider tests

- Resend adapter mocked in normal tests
- Webhook signature fixture tests
- Turnstile official test keys in E2E test environment
- No real customer email during test

### 39.4 Test data

- Synthetic companies and users
- Deterministic product fixtures
- No production export
- Role/membership matrix fixture
- UK and Ukraine content variants

---

## 40. API and Schema Contract Discipline

### 40.1 Schema reuse

Zod schemas:

- Input validation
- Server Action contract
- Route Handler payload
- Environment validation
- Provider webhook safe parsing

için kullanılır.

### 40.2 Generated database types

Database migrations sonrası Supabase-generated TypeScript types update edilir. Manual duplicate table row interfaces azaltılır.

### 40.3 Compatibility

- Internal response changes calling client ile aynı deployment içinde olabilir.
- Webhook endpoints versioned/provider contract aware olur.
- Future external API semantic versioning olmadan açılmaz.

---

## 41. Content Publishing Architecture

### 41.1 Independent market state

~~~ts
type MarketPublication = {
  entityId: string
  market: 'uk' | 'ua'
  locale: 'en-GB' | 'uk-UA'
  status: 'draft' | 'review' | 'published' | 'archived'
  publishedAt: string | null
  publishedBy: string | null
}
~~~

UK publish UA publish anlamına gelmez.

### 41.2 Publish checks

- Required localized fields
- Unique slug
- Approved technical data source
- Approved asset
- SEO metadata
- Document access policy
- Internal technical approval where required
- Broken relationship check

### 41.3 Preview

- Authenticated internal only
- No shared/public cache
- Noindex
- Preview token short-lived if token route is used
- Draft leakage protected

---

## 42. Technical Document Lifecycle

### 42.1 States

- `draft`
- `review`
- `approved`
- `published_metadata`
- `superseded`
- `withdrawn`
- `archived`

### 42.2 Version immutability

Approved document version file bytes replaced silently olmaz. New version record and object oluşturulur; old version policy’ye göre superseded kalır.

### 42.3 Access decision

Document access level examples:

- Public metadata only
- Public direct download, explicitly approved exception
- Request required
- Approved partner
- Specific company
- Internal only

Decision database policy + application authorization ile yapılır.

---

## 43. Failure Handling

### 43.1 Public-safe behavior

- Generic form confirmation only after durable save
- Retry UI duplicate create etmez
- Provider outage business record’ı kaybettirmez
- Unknown error request reference gösterir
- No internal stack or database detail

### 43.2 Partial failure examples

| Failure | Required outcome |
|---|---|
| DB save fails | No success response, no email |
| DB save succeeds, email fails | Success remains; outbox retries |
| Cache invalidation fails | Publish recorded; operational retry/alert |
| Signed URL creation fails | No access success; audit failure |
| Webhook duplicate | Idempotent no-op |
| Attachment scan fails | Attachment quarantined, not released |

### 43.3 Timeouts

External provider calls have explicit timeout. Request path provider dependency minimized; email outbox is async.

---

## 44. Backup, Recovery ve Data Durability

### 44.1 Baseline

- Supabase production backup/PITR capability plan leveline göre doğrulanır.
- Storage recovery/version policy documented.
- Schema migrations source control’da.
- Critical configuration source-controlled or exported.
- Recovery access limited.

### 44.2 Recovery objectives

Exact RPO/RTO Founder and business criticality approvalıyla production readiness aşamasında belirlenir. “Provider backup var” tek başına tested recovery değildir.

### 44.3 Recovery test

At least pre-launch tabletop:

- Accidental content deletion
- Bad migration
- Compromised admin account
- Private document exposure
- Email provider outage
- Production deployment failure

senaryolarını içerir.

---

## 45. Privacy ve Data Minimization

### 45.1 Collection

- Yalnız commercial workflow için gerekli fields
- Optional fields explicit
- Consent wording purpose-specific
- No sensitive category data unless business/legal need approved

### 45.2 Retention

Retention rules data class bazında ayrı belgelenecek:

- Enquiries
- Quote requests
- Dealer applications
- Attachments
- Audit records
- Authentication records
- Analytics

### 45.3 Deletion/anonymization

Business, legal and audit obligations doğrulanmadan hard delete uygulanmaz. User request workflow traceable and permissioned olur.

---

## 46. Feature Flag Architecture

MVP’de full external flag platform zorunlu değildir.

### 46.1 Config flags

- Market-level feature availability
- Ukraine launch readiness
- Attachment upload
- Public site search
- Partner portal modules
- Application Map per industry

### 46.2 Rules

- Server-evaluated for security-sensitive features
- Environment + database config separation
- Flag off path tested
- Stale flag cleanup owner/date
- Permission yerine feature flag kullanılmaz

---

## 47. Third-Party Integration Boundary

Her provider module adapter interface arkasında tutulur.

~~~ts
interface EmailProvider {
  send(input: EmailMessage, idempotencyKey: string): Promise<EmailSendResult>
}

interface BotVerificationProvider {
  verify(input: BotVerificationInput): Promise<BotVerificationResult>
}
~~~

Provider SDK types business module dışına yayılmaz. Böylece provider change bütün application’a dokunmaz.

---

## 48. Dependency Rules

### 48.1 Approved baseline dependencies

- Next.js / React
- Supabase JS + SSR package
- Zod
- React Hook Form
- Tailwind CSS
- Radix-backed primitives / shadcn source components
- TanStack Query selective
- Zustand selective
- Resend SDK or thin HTTP adapter
- Vitest / Testing Library / Playwright

### 48.2 Add-before-check

Yeni dependency eklenmeden:

- Existing platform/API çözümü var mı?
- Bundle/runtime impact nedir?
- Maintenance/security health nedir?
- Tree-shaking/server compatibility nedir?
- License uygun mu?
- Owner kim?

kontrol edilir.

### 48.3 Baseline dışı

- Redux
- Full animation framework
- General CMS
- GraphQL layer
- Prisma
- External search engine
- Redis
- Message queue
- Microservice framework
- Kubernetes

Bunlar yasak teknoloji değil; evidence + ADR olmadan baseline değildir.

---

## 49. Coding Standards

### 49.1 TypeScript

- `strict: true`
- No unchecked `any`
- Unknown external input parsed
- Discriminated unions for states/results
- Domain IDs may use branded types where value justifies
- Exhaustive state handling

### 49.2 Server/client clarity

- `server-only` protection for DAL/secrets
- Explicit `use client` only leaf/interaction boundary
- Provider SDK initialized server-side
- No browser import of admin client

### 49.3 Error handling

- Typed domain errors
- Public-safe mapping at boundary
- Correlation ID
- No empty catch
- Expected validation error not logged as system failure

### 49.4 Naming

- Code identifiers English
- Database snake_case
- TypeScript camelCase/PascalCase
- Route keys stable English identifiers
- UI copy locale files/content records

---

## 50. Architecture Decision Records

Significant technical decisions `docs/adr` altında kaydedilir.

### 50.1 ADR template

~~~text
Title
Status
Date
Context
Decision
Alternatives considered
Consequences
Security/privacy impact
Migration/rollback
Owner
~~~

### 50.2 Initial ADR backlog

| ID | Decision | Status |
|---|---|---|
| TA-001 | Canonical protected host | Founder approval pending |
| TA-002 | Ukraine production domain | Founder/DNS decision pending |
| TA-003 | Public approved media: repo vs public storage bucket | Foundation validation |
| TA-004 | CSP static allowlist vs nonce | Static allowlist baseline |
| TA-005 | Cache Components enablement | Deferred until cache tests |
| TA-006 | Attachment malware scanning provider | Required before broad upload |
| TA-007 | Corporate mailbox provider | Business/IT decision pending |
| TA-008 | Web analytics provider and consent mode | Legal/product decision pending |
| TA-009 | Production backup/PITR plan | Cost/risk decision pending |
| TA-010 | Error tracking provider | Observe baseline first |

---

## 51. Non-Functional Requirements Mapping

| Requirement | Architecture response |
|---|---|
| Multi-market | Host allowlist + market context + independent publication |
| Security | SSR auth, DAL, RLS, private buckets, audit |
| Performance | RSC, selective hydration, explicit public caching |
| Reliability | DB transaction + outbox + idempotency |
| Accessibility | Semantic component architecture + critical-flow tests |
| Maintainability | Modular monolith + typed contracts + migrations |
| SEO | Domain-aware canonical/hreflang/sitemaps |
| Operability | Admin surface + structured logs + alerts |
| Privacy | Data minimization + no sensitive client persistence |
| Scalability | Indexed PostgreSQL, pagination, separable modules |

---

## 52. MVP Technical Scope

### 52.1 Included

- One Next.js application
- UK domain baseline
- Ukraine-ready domain and content model
- Public product/industry/resources pages
- Application Map pilot architecture
- Project List safe persistence
- Public quote/contact/dealer/document request forms
- Supabase database/auth/storage
- Admin authentication and core operations
- Partner invitation and controlled access baseline
- Private document signed delivery
- Resend outbox
- Turnstile
- CI/test/deployment baseline
- Structured logging and audit

### 52.2 Conditional at launch

- Ukraine public go-live, domain/content readiness dependent
- Anonymous file attachments, scanning/policy dependent
- Full partner portal modules, commercial readiness dependent
- Public search, catalogue scale dependent
- Advanced analytics, consent decision dependent

### 52.3 Excluded

- Checkout/payment
- Public pricing engine
- Marketplace
- Native mobile app
- Public third-party API
- Microservices
- Kubernetes
- Real-time chat
- AI-generated technical claims without approval
- ERP/CRM deep integration

---

## 53. Foundation Delivery Sequence

### Phase 0 — Governance and repository

- Repository initialization
- Node/pnpm pins
- Branch protection/CI
- ADR folder
- Environment ownership

### Phase 1 — Application foundation

- Next.js App Router
- Design tokens/Tailwind
- Server/client boundaries
- Error/request ID/logging
- UK/UA host config and `proxy.ts`

### Phase 2 — Supabase foundation

- Local Supabase
- Migration workflow
- Generated types
- Auth SSR clients
- Initial RLS test harness

### Phase 3 — Public catalogue shell

- Public layout/navigation
- Market-aware routes
- Product/category/industry projections
- SEO/canonical/sitemaps

### Phase 4 — Commercial forms

- Shared form architecture
- Turnstile/rate limit/idempotency
- Quote transaction
- Notification outbox/Resend

### Phase 5 — Admin

- Invitation login
- Role/permission checks
- Companies/enquiries/quotes
- Publish workflow
- Audit

### Phase 6 — Resources and portal

- Private buckets
- Document lifecycle
- Signed access
- Partner company membership
- Portal modules

### Phase 7 — Application Map and optimization

- Clean base asset preparation
- Data-driven hotspots
- Accessible Compact alternative
- Performance and localization validation

---

## 54. Technical Definition of Ready — Feature

Feature implementation başlamadan:

- Product requirement ID
- User/role/market
- Happy path
- Failure/empty states
- Data owner
- Authorization matrix
- Input/output schema
- Storage/privacy classification
- Audit requirement
- Cache policy
- Analytics policy
- Accessibility behavior
- Test scenarios
- Rollout/flag decision

hazırdır.

---

## 55. Technical Definition of Done — Feature

- Approved requirement implemented
- Typecheck/lint/build pass
- Server validation
- Authorization at boundary
- RLS/DB constraint where relevant
- No secret/PII leakage
- Loading/empty/error/success states
- UK + Ukraine context tested
- Keyboard/responsive test
- Unit/integration/E2E risk-based coverage
- Audit/logging
- Cache invalidation verified
- Documentation/ADR updated
- Preview approval
- Production smoke plan

---

## 56. Production Readiness Checklist

### Platform

- Production domains verified
- HTTPS and redirects verified
- Environment variables complete
- Node runtime pinned
- Production Supabase isolated
- Backup/recovery settings verified

### Security

- RLS matrix passed
- Internal MFA active
- Service secret server-only proof
- CSP/security headers tested
- Turnstile production keys
- Rate limits tested
- Webhook signatures verified
- Private bucket policies tested

### Business flows

- Quote transaction and idempotency
- Dealer application
- Controlled document request/access
- Admin assignment/status
- Email outbox retry
- Market/source attribution

### Quality

- Critical E2E passed
- WCAG critical flow review
- Mobile/desktop browser smoke
- Core Web Vitals baseline
- Error/alert visibility
- Rollback procedure

---

## 57. Risks and Controls

| Risk | Control |
|---|---|
| Two domains serve wrong content | Host allowlist, market cache key, E2E domain tests |
| Cross-company portal leak | Membership authorization + RLS + negative tests |
| Email failure loses lead | Transactional DB save + outbox retry |
| Duplicate submissions | Idempotency key + unique constraint |
| Private document leak | Private bucket + short signed URL + audit |
| Admin route guard bypass | DAL auth + permission + RLS |
| UA content silently falls back to English | Independent publish state; missing content state |
| Client bundle grows | Server-first and dependency budget |
| Uploaded malicious file | Quarantine, allowlist, scanning gate |
| Cache serves private data | Explicit cache classes; no private shared cache |
| Provider lock-in | Adapter boundaries and canonical database records |
| Microservice complexity too early | Modular monolith baseline |
| Framework experimental regression | Stable features; ADR for experimental use |

---

## 58. Open Founder Decisions

### Required before domain setup

1. Ukraine production domain name
2. `app.infravolt.co.uk` protected host approval
3. Corporate UK and Ukraine reply-to mailboxes

### Required before production readiness

4. Supabase production plan and backup/PITR target
5. Anonymous attachment launch scope
6. Analytics/consent provider
7. Partner MFA policy
8. Data retention durations

Bu kararlar architecture implementation’ı durdurmaz; configuration/feature flag sınırlarıyla foundation geliştirilebilir.

---

## 59. Resmi Teknik Kaynaklar

Bu baseline 15 July 2026 tarihinde aşağıdaki resmi kaynaklarla doğrulanmıştır:

### Next.js

- [Next.js App Router documentation](https://nextjs.org/docs/app)
- [Next.js `proxy.ts` file convention](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)
- [Next.js data security and server-only DAL guidance](https://nextjs.org/docs/app/guides/data-security)
- [Next.js `use cache` directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [Next.js Content Security Policy guide](https://nextjs.org/docs/app/guides/content-security-policy)

### Supabase

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase server-side Auth clients](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase CLI and migrations](https://supabase.com/docs/reference/cli/introduction)
- [Supabase local development](https://supabase.com/docs/guides/local-development/overview)
- [Supabase environment management](https://supabase.com/docs/guides/deployment/managing-environments)
- [Supabase branching](https://supabase.com/docs/guides/deployment/branching)
- [Supabase private buckets and signed URLs](https://supabase.com/docs/guides/storage/serving/downloads)
- [Supabase API keys](https://supabase.com/docs/guides/api/api-keys)

### Hosting and runtime

- [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)
- [Node.js release and LTS status](https://nodejs.org/en/about/previous-releases)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Vercel custom domain setup](https://vercel.com/docs/domains/set-up-custom-domain)
- [Vercel Cron security](https://vercel.com/docs/cron-jobs/manage-cron-jobs)

### Forms, email and client data

- [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Cloudflare Turnstile testing](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)
- [Resend email idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys)
- [Resend webhook ingester and signature pattern](https://resend.com/docs/webhooks/ingester)
- [TanStack Query advanced SSR with Next.js](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)
- [Zustand documentation](https://zustand.docs.pmnd.rs/)
- [Zod documentation](https://zod.dev/)

### UI and testing

- [Tailwind CSS Next.js guide](https://tailwindcss.com/docs/guides/nextjs)
- [Vitest guide](https://vitest.dev/guide/)
- [Playwright introduction](https://playwright.dev/docs/intro)
- [pnpm installation and version support](https://pnpm.io/installation)

---

## 60. Onay Kaydı

~~~text
Founder / Product Owner approval: Pending
Technical Owner approval: Pending
Security review: Pending
Approved by:
Approval date:
Approved version:
Notes:
~~~

---

## 61. Sürüm Geçmişi

| Sürüm | Durum | Değişiklik |
|---|---|---|
| 0.1.0 | Current Draft | Modular monolith, dual-domain market resolution, Next.js/Supabase boundaries, auth/RLS/storage, form/outbox, cache, security, deployment and test architecture established |

---

## 62. Son Karar

InfraVolt; tek repository ve tek Next.js application içinde public website, internal admin ve approved partner portalı barındıran bir modular monolith olarak geliştirilecektir. UK ve Ukraine public domainleri aynı application ve database çekirdeğini kullanacak; host, market, locale, publication ve commercial attribution server tarafında güvenilir context olarak yönetilecektir.

Public experience Server Component-first, fast ve SEO-ready olacaktır. Admin ve portal, Supabase Auth SSR session, application permissions, server-only DAL ve PostgreSQL RLS ile korunacaktır. Private technical documents public URL almayacak; kısa ömürlü signed access ve audit ile sunulacaktır.

Commercial form ve quote kayıtları database transaction, idempotency ve notification outbox ile güvence altına alınacaktır. Resend email gönderimi business record’dan sonra çalışacak; provider failure lead kaybına neden olmayacaktır. Turnstile doğrulaması server tarafında zorunlu olacaktır.

Microservices, Prisma, Redux, public API, external search engine, Redis, queue ve Kubernetes MVP baseline’ına alınmayacaktır. Bu bileşenler ancak ölçülmüş ihtiyaç ve onaylı Architecture Decision Record ile sisteme eklenecektir.

Bir sonraki teknik belge `06_DATABASE_SCHEMA.md` olmalıdır. O belge burada tanımlanan module, RLS, transaction, market publication, quote, dealer, document, notification ve audit modellerini tablo, kolon, constraint, index ve policy seviyesinde kesinleştirecektir.
