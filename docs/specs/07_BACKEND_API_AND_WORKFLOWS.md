# InfraVolt — Backend API and Workflows

> Document ID: INF-07  
> Version: 0.1.0  
> Status: Draft for Founder and Technical Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Technical Owner: Product Director / CTO / Head Agent  
> Backend Owner: Backend / Platform Engineering  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0, 06_DATABASE_SCHEMA.md v0.1.0  
> Runtime baseline: Next.js 16 App Router / Node.js 24 / TypeScript  
> Required markets: United Kingdom + Ukraine  
> Required locales: en-GB + uk-UA  
> Last updated: 15 July 2026  
> Document language: Turkish; action, endpoint, schema, event and error identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt’un backend application contract’larını ve iş akışlarını tanımlar.

Belge:

- Server Action kataloğunu,
- Route Handler kataloğunu,
- server-only Data Access Layer sınırlarını,
- request/response schemasını,
- authentication ve authorization sırasını,
- error code ve HTTP status modelini,
- quote, enquiry, dealer ve document lifecycle’larını,
- upload, notification, webhook ve scheduled job akışlarını,
- cache invalidation, audit, logging ve test kurallarını

kesinleştirir.

Bu belge public üçüncü taraf API ilanı değildir. MVP’deki backend endpoints InfraVolt web application’ının Backend-for-Frontend sınırıdır.

---

## 2. Ana Karar

InfraVolt backend’i ayrı Express/NestJS servisi olarak başlamayacaktır. Next.js App Router içinde modular monolith backend kurulacaktır.

| İhtiyaç | Baseline boundary |
|---|---|
| Server-rendered public reads | Server Component → DAL |
| First-party form mutation | Server Action |
| Admin/portal mutation | Server Action |
| Client-owned admin/portal list | Authenticated Route Handler |
| Provider webhook | Route Handler |
| Cron/worker invocation | Route Handler |
| Private document download | Route Handler |
| Conditional direct upload intent | Route Handler |
| Multi-table atomic change | PostgreSQL RPC/transaction |
| Public third-party integration | Not in MVP |

---

## 3. Backend Hedefleri

- Her request’te trusted market/surface context üretmek
- Server Function doğrudan çağrılsa bile auth ve permission doğrulamak
- External input’u Zod ile parse etmek
- Multi-record operations’ı atomic yapmak
- Duplicate mutation’ı idempotently yönetmek
- Provider failure nedeniyle business record kaybetmemek
- Private data’yı safe DTO dışında client’a göndermemek
- Cross-company ve cross-market leakage’i engellemek
- Error’ları user-safe fakat operationally traceable yapmak
- Workflow state transition’larını tek service/RPC contract’ında toplamak

---

## 4. Backend İlkeleri

### 4.1 Every mutation is an endpoint

Server Action yalnız UI içinden çağrılan güvenli local function değildir. Direct POST ile ulaşılabilir kabul edilir; validation, authentication ve authorization action içinde yapılır.

### 4.2 Parse, do not trust

FormData, JSON body, path params, search params, headers ve webhook payload external input’tur.

### 4.3 Market comes from host

Public commercial record market değeri hidden form field’dan alınmaz. Host allowlist üzerinden request context tarafından belirlenir.

### 4.4 Authenticated is not authorized

Session varlığı permission veya company scope sağlamaz.

### 4.5 Business commit before side effect

Database commit olmadan confirmation email, cache invalidation veya analytics completion event yoktur.

### 4.6 Retry only idempotent work

Mutation retry, idempotency key veya safe state transition olmadan yapılmaz.

### 4.7 No internal API round-trip from Server Components

Server Component kendi application’ının Route Handler’ına HTTP request atmaz; DAL/use case’i doğrudan çağırır.

### 4.8 Private response is no-store

Admin, portal, signed access, preview ve auth response’ları shared cache’e girmez.

---

## 5. Backend Layer Modeli

~~~mermaid
flowchart TD
    E["Entry Point"] --> C["Request Context"]
    C --> V["Parse and Validate"]
    V --> A["Authenticate and Authorize"]
    A --> U["Application Use Case"]
    U --> R["Repository / Database RPC"]
    U --> P["Provider Adapter"]
    U --> O["Audit / Outbox / Cache Intent"]
~~~

### 5.1 Entry points

- Server Component
- Server Action
- Route Handler
- Provider webhook
- Cron worker

### 5.2 Request context

- Request ID
- Host/domain
- Market
- Locale
- Surface
- Actor/session
- Environment

### 5.3 Application use case

Business workflow orchestration. Next.js `Request`, `Response`, `FormData` veya React types use case içine sızmaz.

### 5.4 Repository/RPC

Database query, transaction and persistence. Provider SDK çağırmaz.

### 5.5 Provider adapter

Turnstile, Resend ve Supabase Storage gibi external provider contracts.

---

## 6. Recommended Module Structure

~~~text
src/modules/quotes/
├── actions/
│   ├── submit-quote-request.action.ts
│   ├── change-quote-status.action.ts
│   └── assign-quote.action.ts
├── api/
│   └── quote-list.query.ts
├── application/
│   ├── submit-quote-request.ts
│   ├── change-quote-status.ts
│   └── assign-quote.ts
├── domain/
│   ├── quote-status.ts
│   ├── quote-errors.ts
│   └── quote-types.ts
├── schemas/
│   ├── quote-input.schema.ts
│   └── quote-filter.schema.ts
├── server/
│   ├── quote.repository.ts
│   └── quote.queries.ts
└── dto/
    ├── public-quote-result.dto.ts
    ├── admin-quote-list.dto.ts
    └── partner-quote.dto.ts
~~~

Same pattern enquiries, dealers, resources, accounts, catalog and notifications modules için uygulanır.

---

## 7. Request Context Contract

~~~ts
type RequestContext = {
  requestId: string
  host: string
  domainId: string
  market: 'uk' | 'ua'
  marketId: string
  locale: 'en-GB' | 'uk-UA'
  surface: 'public' | 'admin' | 'portal'
  environment: 'local' | 'preview' | 'staging' | 'production'
  actor: AnonymousActor | AuthenticatedActor
}

type AnonymousActor = {
  type: 'anonymous'
}

type AuthenticatedActor = {
  type: 'authenticated'
  userId: string
  userType: 'internal' | 'partner'
  activeCompanyIds: string[]
  mfaSatisfied: boolean
}
~~~

### 7.1 Context rules

- Request ID server generates or validates trusted platform ID.
- Client-supplied `x-infravolt-market` stripped before proxy adds internal header.
- Entry point `getRequestContext()` revalidates host mapping.
- Role/permission lists JWT’den blindly accepted olmaz.
- Sensitive action current membership and permission from database checks.
- Public locale must belong to resolved market.

---

## 8. Actor and Session Resolution

### 8.1 Anonymous public request

No auth lookup required unless endpoint optionally personalises behavior. Market/domain still resolved.

### 8.2 Authenticated request

Supabase SSR cookie client current session identity’yi provider-verified yöntemle resolves. Cookie existence tek başına identity proof değildir.

### 8.3 Internal actor

Requires:

- Valid auth identity
- Active `user_profiles` row
- `user_type = internal`
- Active internal company membership
- Required role/permission
- MFA satisfied for protected internal policy

### 8.4 Partner actor

Requires:

- Valid auth identity
- Active user profile
- Active company membership
- Active partner profile
- Portal enabled
- Relevant market/product/document scope

---

## 9. Boundary Selection Rules

### 9.1 Use Server Action when

- Same application form submits mutation
- UI needs field errors/action state
- Mutation can return typed result
- No third-party caller contract
- No streaming/file download response

### 9.2 Use Route Handler when

- Third-party webhook/callback
- Cron invocation
- Client Query needs GET endpoint
- File/download redirect or streaming
- Content-Type/body/header control needed
- Signed upload intent/complete callback
- Health endpoint

### 9.3 Use database RPC when

- Multiple writes must commit atomically
- Concurrent state transition needs lock
- Idempotency must be enforced with record creation
- History/outbox/audit must match state exactly

### 9.4 Do not create endpoint when

- Server Component can call DAL directly
- State is local UI-only
- Static configuration can be code-owned
- Feature is not approved

---

## 10. Server Action Standard

Every Server Action follows:

~~~ts
'use server'

export async function exampleAction(
  previousState: ActionResult<unknown>,
  formData: FormData,
): Promise<ActionResult<ExampleSuccess>> {
  const context = await getRequestContext()
  const parsed = parseExampleForm(formData)

  if (!parsed.success) {
    return validationFailure(parsed.error, context.requestId)
  }

  return executeExampleUseCase(context, parsed.data)
}
~~~

### 10.1 Required sequence

1. Resolve request context.
2. Apply transport size/type guard and bounded parse.
3. Authenticate and authorize immediately if the action is protected.
4. Normalize and fully validate input.
5. Return safe validation errors if invalid.
6. Apply rate-limit/anti-bot if public.
7. Execute use case/transaction.
8. Run after-commit side effects.
9. Return safe typed result.

Protected action unauthenticated caller’a detailed field/business validation sonucu açmaz.

### 10.2 Action restrictions

- No raw database row return
- No stack trace
- No `redirect` before transaction result is known
- No provider key in closure/serialized data
- No user role taken from form input
- No unbounded FormData file body

---

## 11. Route Handler Standard

~~~ts
export async function POST(request: Request): Promise<Response> {
  const context = await getRequestContext(request)
  const parsed = await parseJsonRequest(request, schema)

  if (!parsed.ok) return jsonError(parsed.error, context.requestId)

  const result = await executeUseCase(context, parsed.data)
  return jsonResult(result)
}
~~~

### 11.1 Required controls

- Allowed method only
- Content-Type validation
- Body size guard
- Zod parsing
- Auth/permission
- Origin check for browser mutation where appropriate
- Rate limit for public endpoint
- `Cache-Control: no-store` for private/mutation responses
- Correlation ID response header
- Safe JSON serialization

### 11.2 Webhook exception

Webhook handler reads raw text/bytes once, verifies signature, then parses verified payload.

---

## 12. Common Action Result

~~~ts
type ActionResult<T> =
  | {
      ok: true
      data: T
      requestId: string
    }
  | {
      ok: false
      error: {
        code: ErrorCode
        message: string
        fieldErrors?: Record<string, string[]>
        formErrors?: string[]
        retryable?: boolean
      }
      requestId: string
    }
~~~

User message localized UI copy olabilir; `code` stable English identifier’dır.

---

## 13. Common JSON Response

### 13.1 Success

~~~json
{
  "data": {},
  "meta": {
    "requestId": "req_..."
  }
}
~~~

### 13.2 List success

~~~json
{
  "data": [],
  "meta": {
    "requestId": "req_...",
    "nextCursor": null,
    "hasMore": false
  }
}
~~~

### 13.3 Error

~~~json
{
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Please check the highlighted fields.",
    "fieldErrors": {
      "contact.email": ["Enter a valid email address."]
    }
  },
  "meta": {
    "requestId": "req_..."
  }
}
~~~

---

## 14. Error Code Taxonomy

### 14.1 Authentication

- `AUTH_UNAUTHENTICATED`
- `AUTH_SESSION_EXPIRED`
- `AUTH_ACCOUNT_INACTIVE`
- `AUTH_MFA_REQUIRED`
- `AUTH_INVITATION_INVALID`
- `AUTH_INVITATION_EXPIRED`

### 14.2 Authorization

- `AUTHZ_FORBIDDEN`
- `AUTHZ_PERMISSION_REQUIRED`
- `AUTHZ_COMPANY_SCOPE_DENIED`
- `AUTHZ_MARKET_SCOPE_DENIED`
- `AUTHZ_DOCUMENT_ACCESS_DENIED`

### 14.3 Input/business

- `VALIDATION_FAILED`
- `RESOURCE_NOT_FOUND`
- `INVALID_STATE_TRANSITION`
- `CONFLICT_STALE_VERSION`
- `CONFLICT_ALREADY_EXISTS`
- `IDEMPOTENCY_CONFLICT`
- `RATE_LIMITED`
- `BOT_VERIFICATION_FAILED`

### 14.4 File/provider/system

- `FILE_TYPE_NOT_ALLOWED`
- `FILE_TOO_LARGE`
- `FILE_SCAN_PENDING`
- `FILE_NOT_AVAILABLE`
- `PROVIDER_UNAVAILABLE`
- `WEBHOOK_SIGNATURE_INVALID`
- `TEMPORARY_FAILURE`
- `INTERNAL_ERROR`

### 14.5 Non-disclosure

Protected record wrong-company or nonexistent distinction client’a açıklanmaz. Both may map to `RESOURCE_NOT_FOUND` or safe generic denial according to route threat model.

---

## 15. HTTP Status Mapping

| Status | Usage |
|---:|---|
| 200 | Successful query/idempotent existing result |
| 201 | Route Handler resource creation where applicable |
| 202 | Accepted background job/upload scan |
| 204 | Successful no-body operation/webhook duplicate acknowledgement |
| 303 | Authorized POST download redirect |
| 400 | Malformed request/validation |
| 401 | No valid authentication |
| 403 | Authenticated but denied, if existence disclosure safe |
| 404 | Not found or protected non-disclosure |
| 409 | State/idempotency/version conflict |
| 413 | Request/file too large |
| 415 | Unsupported content type |
| 422 | Semantically invalid payload when JSON API context benefits |
| 429 | Rate limit |
| 500 | Unexpected server failure |
| 502/503 | Temporary provider/dependency failure |

Server Action transport may return HTTP 200 while typed `ActionResult` contains expected validation/business error. Monitoring distinguishes expected action failure from system exception.

---

## 16. Validation Architecture

### 16.1 Schema ownership

~~~text
src/modules/{module}/schemas/*.schema.ts
~~~

### 16.2 Validation stages

1. Transport/body type
2. Primitive normalization
3. Zod shape/length/format
4. Context consistency
5. Authorization
6. Business state/invariant
7. Database constraint

### 16.3 Normalization

- Trim human text fields
- Lowercase email through canonical handling
- Phone normalize where possible
- Empty strings → `null` only for optional fields
- UUID/date explicit parsing
- Quantity decimal string → safe decimal representation
- Unicode normalization where necessary
- HTML input treated as plain text unless approved rich-text path

### 16.4 Unknown keys

Public/security-sensitive payload schemas reject or strip unknown fields explicitly. Unknown role, status, market or internal note input never flows into use case.

---

## 17. Input Size Limits — Provisional

| Input | Limit |
|---|---:|
| Public JSON/FormData without files | 256 KB |
| Quote items | 50 |
| Enquiry context items | 20 |
| Message/notes public | 4,000 characters |
| Dealer company profile | 6,000 characters |
| Admin internal note | 10,000 characters |
| Admin list page size | 100 maximum |
| Provider webhook body | 1 MB maximum unless provider requires more |
| Public attachment | Feature off; proposed 10 MB each, max 3 |
| Internal technical document | Proposed 100 MB direct-to-storage |

File bytes Next.js mutation body üzerinden taşınmaz; direct signed upload pattern kullanılır.

---

## 18. Idempotency Contract

### 18.1 Server Action forms

Input field:

~~~ts
submissionId: z.string().uuid()
~~~

Scope examples:

- `quote_submission`
- `contact_enquiry`
- `dealer_application`
- `document_access_request`

### 18.2 Route Handler mutations

Use `Idempotency-Key` header where caller contract supports it. Max length 128 application baseline.

### 18.3 Rules

- Scope + normalized key unique
- Request fingerprint stored as hash
- Same key + same fingerprint returns prior safe success
- Same key + different fingerprint returns `IDEMPOTENCY_CONFLICT`
- Processing lock timeout allows controlled recovery
- Provider idempotency supplements, never replaces, application idempotency

---

## 19. Pagination, Filtering and Sorting

### 19.1 Query contract

~~~ts
type ListQuery = {
  cursor?: string
  limit?: number
  search?: string
  status?: string[]
  market?: 'uk' | 'ua'
  assignedTo?: string
  sort?: string
}
~~~

### 19.2 Rules

- Default limit 25
- Maximum 100
- Sort fields allowlisted
- Cursor opaque base64url encoded and schema-validated
- Stable tie-breaker always `id`
- Search length bounded
- Date range bounded
- Partner market/company filters server-forced, not client-controlled
- Total count optional; not run by default for expensive lists

---

## 20. Cache and Revalidation Contract

### 20.1 Public reads

Public Server Components call DAL. Published content may use explicit cache tags once Cache Components decision is enabled.

### 20.2 Private reads

Admin/portal Route Handlers:

~~~text
Cache-Control: private, no-store
~~~

### 20.3 Mutation invalidation

After successful commit:

- Product publish → product/category/market tags
- Industry publish → industry/market tags
- Map publish → application-map/industry tags
- Page publish → page/route/market tags
- Document metadata publish → resource/document tags

Cache invalidation failure logs retryable operational event; transaction is not rolled back after commit.

---

## 21. Public Server Action Catalogue

| Action | Auth | Anti-bot | Transaction/RPC | Result |
|---|---|---|---|---|
| `submitContactEnquiryAction` | Anonymous allowed | Required | `submit_enquiry` | Enquiry reference |
| `submitProjectSupportAction` | Anonymous allowed | Required | `submit_enquiry` | Enquiry reference |
| `submitTechnicalEnquiryAction` | Anonymous allowed | Required | `submit_enquiry` | Enquiry reference |
| `submitQuoteRequestAction` | Anonymous/partner | Required for anonymous; risk-based partner | `submit_quote_request` | Quote reference |
| `submitDealerApplicationAction` | Anonymous allowed | Required | `submit_dealer_application` | Application reference |
| `requestDocumentAccessAction` | Anonymous/partner | Required for anonymous | `request_document_access` | Request result/reference |
| `switchMarketContextAction` | Anonymous | No | None | Validated target route |

Public actions accept locale-specific UI input but trusted market and source domain come from request context.

---

## 22. Authentication Server Action Catalogue

| Action | Purpose | Notes |
|---|---|---|
| `signInAction` | Email/password or approved auth method | Rate limited, generic failure |
| `signOutAction` | End session | POST mutation |
| `requestPasswordResetAction` | Start reset | Generic response prevents enumeration |
| `updatePasswordAction` | Complete reset | Fresh verified recovery session |
| `acceptInvitationAction` | Validate invite and activate membership | Atomic invitation acceptance |
| `enrolMfaAction` | Internal MFA setup | Provider flow; sensitive |
| `verifyMfaAction` | Complete MFA challenge | Rate limited |

Public self-sign-up action yoktur.

---

## 23. Admin Quote and Enquiry Actions

### 23.1 Quote actions

- `assignQuoteAction`
- `unassignQuoteAction`
- `changeQuoteStatusAction`
- `addQuoteActivityAction`
- `updateQuoteProjectAction`
- `markQuoteLostAction`
- `archiveQuoteAction`

### 23.2 Enquiry actions

- `assignEnquiryAction`
- `changeEnquiryStatusAction`
- `changeEnquiryPriorityAction`
- `linkEnquiryCompanyAction`
- `linkEnquiryProjectAction`
- `addEnquiryNoteAction`
- `resolveEnquiryAction`

### 23.3 Common requirements

- Valid internal session
- Specific permission
- `rowVersion` for editable record
- State transition validation
- Audit event
- No client-supplied actor/market trust

---

## 24. Admin Dealer Actions

- `assignDealerApplicationAction`
- `addDealerReviewAction`
- `requestDealerInformationAction`
- `approveDealerApplicationAction`
- `rejectDealerApplicationAction`
- `withdrawDealerApplicationAction`
- `suspendPartnerAction`
- `resumePartnerAction`
- `updatePartnerMarketScopeAction`
- `updatePartnerProductScopeAction`
- `invitePartnerUserAction`

Approval, invitation acceptance and membership activation are separate operations.

---

## 25. Admin Catalogue and Content Actions

### 25.1 Product catalogue

- `createProductAction`
- `updateProductCoreAction`
- `updateProductLocalizationAction`
- `updateProductAttributesAction`
- `setProductMediaAction`
- `submitProductForReviewAction`
- `approveProductTechnicalDataAction`
- `publishProductAction`
- `unpublishProductAction`
- `archiveProductAction`

### 25.2 Taxonomy/industry

- `createCategoryAction`
- `updateCategoryLocalizationAction`
- `reorderCategoryAction`
- `createIndustryAction`
- `updateIndustryLocalizationAction`
- `publishIndustryAction`

### 25.3 Application Map

- `createApplicationMapAction`
- `updateApplicationMapAction`
- `upsertApplicationHotspotAction`
- `deleteApplicationHotspotAction`
- `reorderApplicationHotspotsAction`
- `publishApplicationMapAction`

### 25.4 Pages/navigation

- `updatePageLocalizationAction`
- `submitPageForReviewAction`
- `publishPageAction`
- `updateNavigationAction`

Every publish action market-specific permission and approved localization checks.

---

## 26. Admin Document Actions

- `createDocumentAction`
- `createDocumentVersionAction`
- `submitDocumentVersionForReviewAction`
- `approveDocumentVersionAction`
- `setCurrentDocumentVersionAction`
- `publishDocumentMetadataAction`
- `withdrawDocumentVersionAction`
- `supersedeDocumentVersionAction`
- `grantDocumentAccessAction`
- `revokeDocumentAccessAction`
- `approveDocumentAccessRequestAction`
- `rejectDocumentAccessRequestAction`

Approved document file/checksum is immutable. Replace operation yoktur; new version oluşturulur.

---

## 27. Partner Portal Actions

- `updateOwnProfileAction`
- `updateOwnPreferencesAction`
- `requestPartnerDocumentAccessAction`
- `addPartnerQuoteMessageAction` — V1 conditional
- `inviteCompanyUserAction` — only `partner_admin`, V1
- `revokeCompanyUserAction` — constrained and audited, V1

Partner can never choose arbitrary `companyId`; company scope current active membership’den forced edilir.

---

## 28. Route Handler Catalogue

### 28.1 Authentication and callbacks

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/auth/callback` | Supabase PKCE/invite/reset callback |

### 28.2 Webhooks

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/webhooks/resend` | Email delivery events |

### 28.3 Scheduled jobs

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/cron/notifications` | Claim/send/retry outbox |
| GET | `/api/cron/maintenance` | Expiry and cleanup batch |
| GET | `/api/cron/alerts` | Operational digest/alert evaluation, conditional |

### 28.4 Documents/files

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/documents/[documentId]/download` | Authorize and redirect to short signed URL |
| POST | `/api/uploads/intents` | Conditional restricted upload intent |
| POST | `/api/uploads/complete` | Verify upload metadata and register file |

### 28.5 Admin query endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/admin/quotes` | Interactive quote queue |
| GET | `/api/admin/enquiries` | Interactive enquiry queue |
| GET | `/api/admin/dealer-applications` | Dealer queue |
| GET | `/api/admin/documents` | Document queue |
| GET | `/api/admin/products` | Product admin grid |
| GET | `/api/admin/companies` | Company lookup/list |

### 28.6 Portal query endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/portal/quotes` | Company-scoped quote list |
| GET | `/api/portal/documents` | Authorized document list |
| GET | `/api/portal/company` | Safe own-company summary |

### 28.7 Operational

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health/live` | Minimal liveness |
| GET | `/api/health/ready` | Protected readiness, optional |

---

## 29. Route Handler Rules by Class

| Class | Auth | Cache | Body | CORS |
|---|---|---|---|---|
| Auth callback | Provider flow | no-store | Query params | Same-site redirect rules |
| Webhook | Signature | no-store | Raw body | Not browser CORS |
| Cron | `CRON_SECRET` | no-store | None | Not browser CORS |
| Private download | Session/grant token | no-store | Small JSON/form | Same origin |
| Upload | Session or protected anonymous intent | no-store | JSON only | Same origin |
| Admin query | Internal auth + permission | private/no-store | Query params | Same origin |
| Portal query | Partner auth + company scope | private/no-store | Query params | Same origin |
| Health | Minimal/protected | no-store | None | No broad CORS |

No `Access-Control-Allow-Origin: *` on authenticated or mutation endpoints.

---

## 30. Public Quote Input Contract

~~~ts
const QuoteSubmissionSchema = z.object({
  submissionId: z.string().uuid(),
  turnstileToken: z.string().min(1).max(2048).optional(),
  locale: z.enum(['en-GB', 'uk-UA']),
  contact: z.object({
    name: z.string().trim().min(2).max(160),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(40).optional(),
  }),
  company: z.object({
    name: z.string().trim().min(2).max(240),
    website: z.string().url().max(500).optional(),
    countryCode: z.string().length(2).optional(),
  }),
  project: z.object({
    name: z.string().trim().max(240).optional(),
    countryCode: z.string().length(2).optional(),
    location: z.string().trim().max(240).optional(),
    requiredBy: z.iso.date().optional(),
  }),
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.string().trim()
      .regex(/^(?:0|[1-9]\\d*)(?:\\.\\d{1,4})?$/)
      .refine((value) => Number(value) > 0 && Number(value) <= 1_000_000),
    unitCode: z.string().min(1).max(24),
    selectedOptions: z.record(z.string(), z.string()).default({}),
    note: z.string().trim().max(500).optional(),
  })).min(1).max(50),
  message: z.string().trim().max(4000).optional(),
  consent: z.object({
    accepted: z.literal(true),
    termsVersion: z.string().min(1).max(64),
  }),
})
~~~

### 30.1 Server-derived fields

- `marketId`
- `sourceDomainId`
- trusted host
- request ID
- submitted time
- authenticated user ID if present
- product name/code snapshots from database

Client cannot submit price, internal status, assignee, product snapshot or notification recipient.

Anonymous submission requires `turnstileToken`; authenticated partner submission applies the risk policy. Quantity remains a decimal string until validated/persisted as PostgreSQL `numeric`, so monetary/engineering quantities do not depend on binary floating-point storage.

### 30.2 Success

~~~ts
type QuoteSubmissionSuccess = {
  reference: string
  receivedAt: string
}
~~~

---

## 31. Public Enquiry Input Contract

~~~ts
type EnquiryInput = {
  submissionId: string
  turnstileToken: string
  enquiryType: 'contact' | 'project_support' | 'technical'
  locale: 'en-GB' | 'uk-UA'
  contact: {
    name: string
    email: string
    phone?: string
  }
  company?: {
    name?: string
    website?: string
  }
  subject?: string
  message: string
  contextItems?: Array<
    | { type: 'product'; id: string }
    | { type: 'industry'; id: string }
    | { type: 'document'; id: string }
    | { type: 'hotspot'; id: string }
    | { type: 'category'; id: string }
  >
  consent: {
    accepted: true
    termsVersion: string
  }
}
~~~

Context IDs server validates and safe display snapshots from database creates.

---

## 32. Dealer Application Input Contract

~~~ts
type DealerApplicationInput = {
  submissionId: string
  turnstileToken: string
  locale: 'en-GB' | 'uk-UA'
  company: {
    legalName: string
    tradingName?: string
    website?: string
    registrationCountry?: string
    registrationNumber?: string
    companyProfile: string
  }
  contact: {
    name: string
    email: string
    phone?: string
    jobTitle?: string
  }
  requestedTerritory?: string
  salesChannels: string[]
  productInterests: Array<{
    productFamilyId?: string
    productId?: string
    interestLevel: 'primary' | 'secondary' | 'exploratory'
  }>
  technicalCapability?: string
  annualBusinessBand?: string
  consent: {
    accepted: true
    termsVersion: string
  }
}
~~~

Constraints:

- At least one product interest
- Exactly one family or product per interest
- Sales channel values allowlisted
- No exact revenue forced when band is sufficient
- Submission creates no account/role

---

## 33. Document Access Request Contract

~~~ts
type DocumentAccessRequestInput = {
  submissionId: string
  turnstileToken?: string
  documentId: string
  requestedVersionId?: string
  locale: 'en-GB' | 'uk-UA'
  contact?: {
    name: string
    email: string
    phone?: string
  }
  company?: {
    name: string
  }
  projectReference?: string
  reason?: string
  consent: {
    accepted: true
    termsVersion: string
  }
}
~~~

If authenticated partner:

- User/contact/company fields derived from membership where possible.
- Client company name does not override membership company.
- Turnstile risk-based may be omitted.

Response may be:

- public direct access,
- already authorized,
- request submitted/pending,
- safe denial/unavailable.

It never returns raw object path.

---

## 34. Admin Mutation Contract Pattern

~~~ts
type AdminMutationInput<T> = {
  entityId: string
  rowVersion: number
  data: T
  reason?: string
}
~~~

### 34.1 Stale write

If current row version differs:

~~~text
CONFLICT_STALE_VERSION
~~~

UI reloads current safe record and asks user to reapply intentional change; blind automatic overwrite yoktur.

### 34.2 Reason required actions

- Reject dealer
- Revoke document access
- Mark quote lost
- Suspend user/partner
- Withdraw document/version
- Unpublish approved content
- Permission/role change

---

## 35. Admin List Query Contract

Example `/api/admin/quotes`:

~~~ts
const AdminQuoteListQuerySchema = z.object({
  cursor: z.string().max(500).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  status: z.array(QuoteStatusSchema).optional(),
  market: z.enum(['uk', 'ua']).optional(),
  assignedTo: z.string().uuid().optional(),
  search: z.string().trim().min(2).max(100).optional(),
  sort: z.enum(['submitted_desc', 'submitted_asc', 'priority_desc']).default('submitted_desc'),
})
~~~

Response DTO excludes raw provider data, sensitive internal notes and unrestricted contact fields from list view.

---

## 36. Public Form Security Pipeline

### 36.1 Processing order

~~~mermaid
flowchart TD
    R["Receive submission"] --> S["Cheap size and schema checks"]
    S --> L["Rate-limit pre-check"]
    L --> T["Turnstile Siteverify"]
    T --> I["Idempotency claim"]
    I --> B["Business validation"]
    B --> D["Atomic database RPC"]
    D --> N["Best-effort immediate notification"]
    N --> C["Return confirmation"]
~~~

### 36.2 Failure behavior

| Failure | Business row | Response |
|---|---|---|
| Oversized/malformed | None | Safe validation error |
| Rate limited | None | 429/generic retry guidance |
| Turnstile failed | None | Bot verification error |
| Idempotent prior success | Existing only | Same safe success |
| Business validation | None | Field/form error |
| Database transaction | Rollback | Temporary failure |
| Email send | Business row remains | Success; outbox retries |

### 36.3 Enumeration resistance

Public response does not reveal whether company/contact/email already exists.

---

## 37. Turnstile Adapter

### 37.1 Input

~~~ts
type TurnstileVerificationInput = {
  token: string
  expectedHostname: string
  expectedAction: string
  idempotencyKey: string
  remoteIp?: string
}
~~~

### 37.2 Validation

- Siteverify server-side call mandatory
- `success = true`
- hostname matches current approved domain
- action matches form type
- token fresh and single-use
- error codes mapped safely
- production/test keys separated

Turnstile token 5-minute and single-use kabul edilir. Validation retry gerekiyorsa same Siteverify idempotency key used; replayed form business idempotency still separate.

### 37.3 Failure mode

- Provider timeout/failure: fail closed for public mutation
- User message: retry challenge/submission
- Log only safe error code and request ID
- Raw token never logged/stored

---

## 38. Rate Limit Workflow

### 38.1 Signal

Rate bucket may include privacy-reviewed hash of:

- form type
- network signal
- session/browser nonce
- authenticated user ID
- email hash for repeated abuse pattern

### 38.2 Windows — provisional

Exact values production testing ile tune edilir. Example baseline:

| Operation | Proposed limit |
|---|---|
| Contact/technical enquiry | 5 per 15 minutes per source bucket |
| Quote submission | 3 per 30 minutes |
| Dealer application | 2 per 24 hours |
| Document request | 10 per hour |
| Login attempts | Provider + application risk control |

### 38.3 Rules

- Database atomic increment
- In-memory counter not authoritative
- Success/failure may use separate weights
- Admin/partner endpoints also protected against abuse
- `Retry-After` header on Route Handler 429 where meaningful
- Raw IP retention minimized

---

## 39. Quote Submission Workflow

### 39.1 Sequence

~~~mermaid
sequenceDiagram
    participant U as Buyer
    participant A as Server Action
    participant T as Turnstile
    participant DB as PostgreSQL RPC
    participant E as Outbox/Resend
    U->>A: Submit project list and contact data
    A->>A: Context, schema, rate limit
    A->>T: Verify token
    T-->>A: Verified
    A->>DB: submit_quote_request
    DB-->>A: Quote reference and outbox ID
    A->>E: Best-effort immediate send attempt
    A-->>U: Durable success reference
~~~

### 39.2 Product validation

For every item:

- Product exists
- Product published/available in resolved market
- Quantity/unit valid
- Selected options apply to product
- Public display name/code loaded from database
- Snapshot created server-side

Unavailable product causes clear item error; silent removal forbidden.

### 39.3 Company/contact matching

Public form must not overwrite existing CRM master data automatically. Use case:

- normalizes input,
- searches controlled candidates,
- links high-confidence exact match where policy permits,
- otherwise creates prospect/contact,
- stores submission snapshot regardless.

### 39.4 Completion

Success means quote record + items + status history + outbox committed. Email delivery does not define submission success.

---

## 40. Quote Status State Machine

~~~mermaid
stateDiagram-v2
    [*] --> new
    new --> triage
    new --> cancelled
    triage --> qualified
    triage --> lost
    triage --> cancelled
    qualified --> preparing
    qualified --> lost
    preparing --> sent
    preparing --> cancelled
    sent --> revision_requested
    sent --> won
    sent --> lost
    revision_requested --> preparing
    revision_requested --> lost
    won --> archived
    lost --> archived
    cancelled --> archived
~~~

### 40.1 Transition rules

- Only `changeQuoteStatus` use case changes status.
- Current row locked/version checked.
- From/to pair allowlisted.
- Required reason fields enforced.
- Status history inserted in same transaction.
- Relevant timestamps set/cleared consistently.
- Audit event same transaction.
- Customer/partner notification only approved transitions.

### 40.2 Terminal state edits

Won/lost/cancelled quote reopening requires elevated permission and reason; baseline transition not available in normal UI.

---

## 41. Quote Assignment Workflow

1. Authenticate internal actor.
2. Require `quotes.assign`.
3. Validate assignee active internal user with market scope.
4. Lock quote/current active assignment.
5. Close prior assignment.
6. Insert new assignment.
7. Update current projection.
8. Add activity/audit event.
9. Optional internal notification outbox.

Concurrent assignment unique partial constraint ensures one active assignee.

---

## 42. Enquiry Submission Workflow

### 42.1 Types

- Contact
- Project support
- Technical question

Document request uses specialized document workflow although it may create/link enquiry for operations.

### 42.2 Processing

- Common form security pipeline
- Validate referenced products/industry/hotspot/documents are public in market
- Create safe context snapshots
- Match/create prospect and contact without destructive merge
- Create enquiry `new`
- Auto-priority rules may suggest, not silently mark urgent without trace
- Enqueue acknowledgement and internal notification

### 42.3 Routing

Assignment suggestion can depend on market + enquiry type + product family. Final current owner is database record and manually changeable.

---

## 43. Enquiry Status State Machine

~~~mermaid
stateDiagram-v2
    [*] --> new
    new --> triage
    new --> spam
    triage --> in_progress
    triage --> waiting_customer
    triage --> resolved
    triage --> spam
    in_progress --> waiting_customer
    in_progress --> resolved
    waiting_customer --> in_progress
    waiting_customer --> resolved
    resolved --> closed
    resolved --> in_progress
    spam --> closed
~~~

Reopen from resolved requires reason/activity. Closed baseline terminal; elevated reopen is separate workflow if later needed.

---

## 44. Dealer Application Submission Workflow

1. Resolve market/domain/locale.
2. Validate form and allowed interest scopes.
3. Rate limit and Turnstile.
4. Claim idempotency key.
5. Match/create prospect company/contact conservatively.
6. Create application `submitted`.
7. Create product interests.
8. Create initial activity/audit reference.
9. Enqueue acknowledgement/internal review notification.
10. Return public application reference.

No login, membership, role, document grant or partner profile at submission.

---

## 45. Dealer Application State Machine

~~~mermaid
stateDiagram-v2
    [*] --> draft
    draft --> submitted
    submitted --> under_review
    submitted --> withdrawn
    under_review --> information_requested
    information_requested --> under_review
    information_requested --> withdrawn
    under_review --> approved
    under_review --> rejected
    under_review --> withdrawn
~~~

### 45.1 Approval prerequisites

- Company/contact matched or verified
- Required review types completed
- No blocking compliance issue
- Market and requested scope explicit
- Partner code unique
- Approver has `dealers.approve`
- Decision reason/summary present

### 45.2 Rejection

Internal detailed reason and public-safe customer message separate fields/templates use.

---

## 46. Dealer Approval to Portal Workflow

~~~mermaid
sequenceDiagram
    participant M as Dealer Manager
    participant A as Approval Use Case
    participant DB as Database
    participant N as Notification Outbox
    participant U as Applicant
    M->>A: Approve with scopes
    A->>DB: Atomic partner setup
    DB-->>A: Partner profile + pending invitation
    A->>N: Enqueue invite
    N-->>U: Secure invitation
    U->>A: Accept invitation
    A->>DB: Activate user membership and role
~~~

Approval transaction creates partner configuration and invitation request. Membership becomes active only after verified invitation acceptance.

---

## 47. Invitation Acceptance Workflow

### 47.1 Invite creation

- Only authorized internal/partner admin
- Email normalized
- Company/role/market scope validated
- Pending duplicate prevented
- Raw token generated once, database stores hash only
- Expiry set
- Outbox email includes InfraVolt app link

### 47.2 Callback/acceptance

1. Validate callback host and allowlisted return path.
2. Complete Supabase PKCE/auth flow.
3. Verify authenticated email matches invitation policy.
4. Lock invitation.
5. Verify pending/not expired/not revoked.
6. Create/activate profile and membership.
7. Grant invited role/scope.
8. Mark invitation accepted.
9. Audit.
10. Redirect to portal/admin onboarding.

### 47.3 Failure

Generic invalid/expired screen; no disclosure of company membership details before authentication.

---

## 48. Sign-In Workflow

### 48.1 Entry

- Protected host only baseline
- Email/password or approved Supabase auth method
- Rate limit/provider protection
- Generic invalid credentials response
- Validated `returnTo` from allowlist

### 48.2 Post-auth routing

| Actor | Destination |
|---|---|
| Active internal + MFA | `/admin` or safe return path |
| Active internal, MFA pending | MFA challenge |
| Active partner | `/portal` or safe return path |
| Suspended/inactive | Safe account unavailable screen |
| No membership | Safe support/onboarding screen |

Role names or company details are not exposed in unauthenticated error.

---

## 49. Password Reset Workflow

- Request always returns generic acknowledgement.
- Recovery link limited to protected canonical host.
- `returnTo` allowlisted.
- Recovery session verified before password update.
- Password provider policy enforced.
- Existing sessions revocation policy decided for sensitive reset.
- Audit/security event without password/token content.

---

## 50. Product Editing Workflow

### 50.1 Draft update

- Require product edit permission
- Parse typed core/localization/attribute input
- Check row version
- Preserve technical provenance
- Save draft
- Audit significant technical changes

### 50.2 Technical approval

- Require technical approver permission
- Required attributes/source documents
- Approver not blindly trusting imported values
- Set verifier/time
- Product remains unpublished until market publish action

### 50.3 Market publish

- Require market-specific publish permission
- Validate approved localization/media/category/technical state
- Commit publication and audit
- After commit invalidate tags
- UK action never publishes UA record

---

## 51. Application Map Workflow

### 51.1 Editing

- Clean base media asset required
- Hotspot coordinate 0–100
- Stable hotspot key
- Localized label/accessibility summary
- Product links validated
- Sort order drives keyboard/list order

### 51.2 Publish validation

- Map industry published in target market
- Base asset approved
- At least one active hotspot
- Every public hotspot approved localization
- Linked products published/available or intentionally hidden
- Compact/list accessible alternative data complete

---

## 52. Document Version Workflow

~~~mermaid
stateDiagram-v2
    [*] --> draft
    draft --> review
    review --> draft
    review --> approved
    approved --> superseded
    approved --> withdrawn
    superseded --> archived
    withdrawn --> archived
~~~

### 52.1 Upload version

1. Authorized technical user requests upload intent.
2. Direct upload to private `technical-documents` bucket.
3. Complete endpoint verifies object metadata.
4. File asset registered pending review/scan policy.
5. Draft version references file and checksum.

### 52.2 Approval

- File approved/clean
- Checksum recorded
- Version label/number unique
- Language/date metadata checked
- Approver and timestamp set
- Existing approved bytes never overwritten

### 52.3 Supersede

New approved version becomes current in atomic transaction; prior current becomes superseded where policy requires. Access grants resolving “current version” now point logically to new current; fixed-version grants remain fixed.

---

## 53. Document Metadata Publication Workflow

Publication validates:

- Current approved version exists
- Resource type
- Public title/slug/summary
- Market metadata
- Product/industry links
- Access level and auto-grant policy
- No withdrawn/expired critical state

Published metadata does not change private bucket visibility.

---

## 54. Document Access Decision Workflow

### 54.1 Decision matrix

| Access level | Anonymous | Active partner | Internal |
|---|---|---|---|
| `public` | Direct authorized download route | Allowed | Allowed |
| `registered` | Login/request | Authenticated policy | Allowed |
| `approved_partner` | Request/login | Active partner scope | Allowed |
| `company` | Request | Active company grant | Allowed |
| `project` | Request | Project/company grant | Allowed |
| `internal` | Denied | Denied | Permissioned |

### 54.2 Decision result

~~~ts
type DocumentAccessDecision =
  | { decision: 'allow'; versionId: string; grantId?: string }
  | { decision: 'request_required' }
  | { decision: 'login_required' }
  | { decision: 'pending'; requestReference: string }
  | { decision: 'deny'; publicReasonCode: string }
~~~

No object path or signed URL in decision DTO.

---

## 55. Private Document Download Route

### 55.1 Request

~~~text
POST /api/documents/{documentId}/download
Cache-Control: no-store
~~~

Body may include fixed `versionId` and approved grant-link token. Authenticated users usually send session cookie only.

### 55.2 Processing

1. Resolve context.
2. Validate document/version IDs.
3. Authenticate session or verify signed InfraVolt grant link.
4. Run current access decision.
5. Verify file asset approved and private.
6. Write authorized/denied access event.
7. Create Supabase Storage signed URL, default 120 seconds.
8. Return `303 See Other` to signed URL or controlled streaming response.

### 55.3 Response controls

- `Cache-Control: no-store`
- `Referrer-Policy: no-referrer`
- No signed URL in logs/analytics
- No permanent URL in email
- Unknown/denied response does not reveal object existence details

### 55.4 Anonymous approved request link

Email link targets InfraVolt, not Storage. It contains a short-lived HMAC-signed grant context. Route rechecks grant/request status before issuing the 120-second Storage URL. Link expiry baseline 24 hours; exact policy documented per document tier.

Signed context contains only versioned token format, grant/request identifier, expiry and random nonce. It is signed with a dedicated server-only, rotatable `DOCUMENT_GRANT_LINK_SECRET`; raw secret and token are never stored in logs.

---

## 56. Upload Intent Workflow — Conditional

Anonymous attachments launch gate remains closed until scanning and retention policy are ready.

### 56.1 Intent request

~~~ts
type UploadIntentInput = {
  purpose: 'enquiry_attachment' | 'quote_attachment' | 'dealer_attachment' | 'document_version'
  filename: string
  mimeType: string
  sizeBytes: number
  turnstileToken?: string
  submissionId?: string
}
~~~

### 56.2 Server checks

- Feature flag on
- Actor/purpose allowed
- MIME allowlist
- Size/count quota
- Filename sanitized
- Rate limit/Turnstile for anonymous
- Opaque object path generated server-side
- Short-lived signed upload permission
- `upsert = false`

### 56.3 Intent response

~~~ts
type UploadIntentSuccess = {
  uploadId: string
  objectPathToken: string
  signedUpload: unknown
  expiresAt: string
}
~~~

Actual provider response wrapped/minimized; service secret never returned.

---

## 57. Upload Completion Workflow

1. Validate upload ID/session ownership.
2. Read object metadata through Storage API.
3. Confirm expected path/bucket.
4. Verify size and detected MIME policy.
5. Compute/obtain checksum where supported.
6. Register `file_assets` as quarantine/pending review.
7. Queue malware scan if required.
8. Return attachment/file ID, not raw path.

If completion fails or expires, orphan cleanup job removes stale object after safe retention window.

No public submission can reference arbitrary bucket/path; it references issued `fileAssetId` tied to same submission/upload session.

---

## 58. Notification Outbox Workflow

### 58.1 Enqueue

Business RPC inserts outbox row in same transaction using stable `event_key`.

Examples:

~~~text
quote.received:{quoteId}:customer:v1
quote.received:{quoteId}:internal:v1
dealer.submitted:{applicationId}:customer:v1
document.requested:{requestId}:internal:v1
partner.invitation:{invitationId}:v1
~~~

### 58.2 Immediate attempt

After commit, request path may perform one bounded best-effort send attempt so acknowledgement is usually immediate. Failure does not change successful business response; outbox remains retryable.

### 58.3 Worker claim

~~~sql
select ...
from private.notification_outbox
where status in ('pending', 'failed')
  and next_attempt_at <= now()
order by next_attempt_at, created_at
for update skip locked
limit 25;
~~~

Actual claim/update happens inside short transaction; network send is not performed while holding long database lock. Lease/lock fields prevent duplicate workers.

---

## 59. Resend Send Adapter

~~~ts
interface EmailProvider {
  send(input: {
    from: string
    to: string[]
    replyTo?: string
    subject: string
    html: string
    text: string
    headers?: Record<string, string>
  }, idempotencyKey: string): Promise<EmailSendResult>
}
~~~

### 59.1 Rules

- Market-aware verified sender
- Reply-to business mailbox config
- Recipient allowlist outside production
- Template variables escaped/controlled
- Resend idempotency key max 256 chars
- Provider key secret server-only
- Provider response stored minimally
- No private signed Storage URL as long-lived attachment path

### 59.2 Application versus provider idempotency

Resend idempotency keys expire after 24 hours. InfraVolt outbox `event_key` uniqueness remains permanent enough for business workflow and prevents late duplicate sends.

---

## 60. Notification Retry Policy

Provisional schedule:

| Attempt | Delay |
|---:|---:|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 30 minutes |
| 5 | 2 hours |
| 6 | 12 hours |

After maximum attempt:

- status `dead`
- internal operational alert
- manual retry action available to authorized admin
- business record remains intact

Permanent provider errors such as invalid recipient may skip repeated retry and mark failed/dead according to error classification.

Vercel plan cron frequency production readiness sırasında doğrulanır. If plan only supports daily scheduling, immediate attempt + admin retry remains; production operations requiring minute-level retry must use suitable Vercel plan or approved worker alternative.

---

## 61. Resend Webhook Route

### 61.1 Endpoint

~~~text
POST /api/webhooks/resend
~~~

### 61.2 Processing

~~~mermaid
flowchart TD
    R["Receive raw body + Svix headers"] --> S["Verify signature"]
    S --> P["Parse verified event"]
    P --> I["Insert provider event idempotently"]
    I --> U["Update delivery/outbox state"]
    U --> A["Acknowledge 2xx"]
~~~

### 61.3 Signature verification

- Read `request.text()` once
- Verify using `RESEND_WEBHOOK_SECRET`
- Use required Svix headers
- Parse only after verification
- Invalid signature → 400/401 safe response and security event
- Never log secret/signature/raw full payload

### 61.4 Duplicate delivery

Provider event ID unique. Duplicate verified event returns 2xx without second state transition.

### 61.5 Event handling

Relevant events may update:

- sent
- delivered
- delivery delayed
- bounced
- complained
- failed

Unknown verified event stored/ignored safely; handler does not fail simply because new provider event type appears.

### 61.6 Retry response

- Invalid signature: 4xx, no retry expectation
- Duplicate: 2xx
- Successfully stored: 2xx quickly
- Temporary database failure before durable store: 5xx so provider can retry

---

## 62. Cron Notification Route

### 62.1 Endpoint

~~~text
GET /api/cron/notifications
Authorization: Bearer {CRON_SECRET}
~~~

### 62.2 Controls

- Exact bearer secret comparison
- Secret minimum 16 random characters; longer preferred
- No query-string secret
- `Cache-Control: no-store`
- Job run row
- Bounded batch/time
- Idempotent claim
- Safe summary only

### 62.3 Response

~~~json
{
  "data": {
    "claimed": 20,
    "sent": 18,
    "failed": 2
  },
  "meta": {
    "requestId": "req_..."
  }
}
~~~

No recipient address/provider payload in cron response.

---

## 63. Maintenance Cron Workflow

`/api/cron/maintenance` may process small idempotent tasks:

- Expire invitation records
- Mark expired document grants
- Remove stale upload intents/orphan quarantine objects
- Purge expired idempotency/rate-limit rows
- Retire old webhook payloads according to retention
- Expire data export files

One endpoint can orchestrate task registry initially. Long/independent workloads split only when measured.

Destructive cleanup requires retention policy, dry-run/report capability and bounded batch.

---

## 64. Provider Timeout and Retry Policy

| Provider call | Request path | Timeout baseline | Retry |
|---|---|---:|---|
| Turnstile Siteverify | Required before public mutation | 5s provisional | One safe retry only with same verification idempotency key if network failure |
| Resend email | After commit/best effort | 8s provisional | Outbox worker |
| Supabase signed URL | Download request | 5s provisional | One safe retry where appropriate |
| Supabase mutation/RPC | Core request | Platform/client timeout policy | Do not blindly retry without idempotency |
| Webhook signature | Local | Immediate | None |

Timeout values are configuration constants with telemetry; never infinite.

---

## 65. Health Endpoints

### 65.1 Liveness

`GET /api/health/live` proves application process can respond.

Response contains:

- status
- deployment version/build ID
- timestamp

No environment variables, database URL, provider configuration or stack detail.

### 65.2 Readiness

Optional protected `GET /api/health/ready` may perform bounded dependency checks. It is not public detailed diagnostics page.

### 65.3 Status semantics

- Liveness should not fail because noncritical email provider is unavailable.
- Readiness may report degraded internally.
- Expensive dependency query not run on every public request.

---

## 66. Origin, CSRF and CORS Controls

### 66.1 Server Actions

- Same-origin framework protections retained
- Allowed origins configured only for approved hosts if needed
- Auth/permission still checked inside action

### 66.2 Browser Route Handler mutations

- Verify `Origin` against exact domain allowlist
- SameSite secure cookies
- No state-changing GET
- Content-Type allowlist
- CSRF token considered for any cross-site-compatible auth requirement

### 66.3 Webhooks/cron

Do not use browser Origin as authentication. Webhook signature or cron bearer secret is authoritative.

### 66.4 CORS

MVP internal BFF endpoints same-origin only. Cross-domain public API CORS not enabled.

---

## 67. Safe Redirect Rules

Applicable to auth callback, market switch and post-login.

Allowed:

- Relative path beginning `/`
- Approved same application origin
- Explicit canonical market/protected origin

Denied:

- `javascript:` or non-http scheme
- Protocol-relative `//evil.example`
- Unknown host
- Credential-bearing URL
- Nested encoded external redirect

Fallback destination determined by actor/market, not user input.

---

## 68. DTO and Data Minimization

### 68.1 Public DTO

Only published localized fields and public technical data.

### 68.2 Admin list DTO

- Reference
- Status/priority
- Market
- Company/contact display summary
- Assignee
- Submitted/updated time

Full message, notes, access data and provider payload detail view only.

### 68.3 Partner DTO

- Own company safe identity
- Permitted quote summary
- Customer-visible activities only
- Authorized document metadata

Internal status reasons, assignments, notes and other companies excluded at query projection, not hidden with CSS.

### 68.4 Sensitive field rule

Database row spread syntax into response prohibited.

---

## 69. Logging and Correlation

### 69.1 Entry log

- request ID
- route/action name
- method/surface
- market
- actor type/user ID when authenticated
- duration
- outcome code

### 69.2 Mutation log

- use case
- target type/ID
- state transition
- audit event ID
- idempotent replay flag

### 69.3 Never log

- Password
- Auth cookie/token
- Turnstile token
- Invitation/reset token
- Webhook secret/signature
- Full signed URL
- Raw private document path in general logs
- Full form message/profile text
- Provider API key

### 69.4 Error logging

Expected validation/permission errors do not produce noisy stack traces. Unexpected errors include request ID and safe structured context; user receives generic localized message.

---

## 70. Audit Rules by Workflow

| Workflow | Audit events |
|---|---|
| Quote | create, assign, status change, archive, export |
| Enquiry | assignment, priority/status, sensitive link/merge |
| Dealer | review, request info, approve/reject, partner suspend |
| Account | invite, accept, role grant/revoke, suspension, MFA recovery |
| Product | technical approval, publish/unpublish, archive |
| Document | version approve/withdraw, publish, grant/revoke, access issuance |
| Content | publish/unpublish, redirect change |
| File | approve/reject/delete where sensitive |

Audit event is in same transaction where possible. Provider delivery event is operational history, not replacement for business audit.

---

## 71. Analytics Event Timing

Client button click alone conversion değildir.

| Event | Emit when |
|---|---|
| `quote_submission_completed` | Quote transaction committed |
| `enquiry_submission_completed` | Enquiry committed |
| `dealer_application_completed` | Application committed |
| `document_access_requested` | Request committed |
| `document_download_authorized` | Access decision allowed and URL issuance attempted |
| `product_published` | Market publication committed |

PII and free text analytics payload’a girmez.

---

## 72. Workflow Concurrency Controls

### 72.1 Optimistic

Admin editable records use `rowVersion`.

### 72.2 Pessimistic/row lock

- Dealer final approval
- Quote status transition
- Quote assignment
- Document current version switch
- Outbox claim
- Invitation acceptance

### 72.3 Unique constraints

- Active assignment
- Active membership
- Pending invitation
- Idempotency key
- Provider webhook event
- Notification event key

Application pre-check improves UX; database constraint is final arbiter.

---

## 73. Failure and Recovery Matrix

| Scenario | Response | Recovery |
|---|---|---|
| Validation failed | Field/form error | User corrects |
| Session expired | Safe auth error/redirect | Re-authenticate |
| Permission revoked mid-screen | Generic denied/not found | Refresh/session check |
| Stale admin edit | Conflict | Reload and reapply |
| Duplicate form | Original success | No duplicate |
| Database unavailable | Temporary failure | Safe retry with same idempotency key |
| Email unavailable | Business success | Outbox retry |
| Webhook duplicate | 2xx no-op | None |
| Webhook DB failure | 5xx | Provider retry |
| Signed URL failure | No download success | Retry/access event |
| Upload scan pending | Accepted/pending | Poll/admin workflow |
| Cache invalidation failure | Mutation success | Operational retry |

---

## 74. Security Test Matrix

### Public

- Forged/missing Turnstile token
- Expired/single-use token replay
- Rate-limit bypass attempts
- Duplicate submission
- Market hidden-field spoofing
- Unknown product/context IDs
- Oversized input
- HTML/script payload

### Admin

- No session
- Partner session on admin action
- Internal role without permission
- Wrong market permission
- Direct Server Action POST
- Stale row version
- Invalid state transition
- Role escalation payload

### Portal

- Company A user requests Company B quote
- Revoked membership
- Suspended partner
- Unauthorized document ID
- Expired grant
- Tampered grant link

### Integrations

- Invalid webhook signature
- Duplicate event ID
- Cron without/incorrect secret
- Upload path tampering
- Wrong MIME/size

---

## 75. Contract and Workflow Test Strategy

### 75.1 Unit

- Zod schemas
- Status transition maps
- Error mapping
- Redirect allowlist
- DTO projection
- Retry classification

### 75.2 Integration

- Server Action → use case → local Supabase RPC
- Route Handler auth/permission
- RLS negative paths
- Atomic rollback
- Idempotency
- Outbox
- Webhook signature fixtures

### 75.3 E2E

- UK and UA quote submission
- Turnstile official test keys pass/fail/duplicate
- Admin quote triage
- Dealer approval and invite acceptance
- Partner company isolation
- Document request/approval/download
- Email failure simulation with successful business save

### 75.4 Contract snapshots

DTO examples may be snapshot-tested, but semantic assertions required. Snapshot approval cannot silently expose a new sensitive field.

---

## 76. Performance Rules

- Server Component reads DAL directly
- List queries select explicit fields
- Cursor pagination for growing queues
- N+1 query prohibited in product/admin lists
- Batch relation queries
- Provider calls outside DB lock
- Webhook acknowledges quickly
- Cron bounded batch
- No synchronous email prerequisite for business success
- Search/filter columns indexed according to 06 schema
- File upload bypasses application body path

---

## 77. Backend Release Sequence

### Foundation

- Request context
- Typed env
- Supabase SSR clients
- Auth/permission DAL
- Common result/error/logging
- Zod schema conventions

### Public commercial MVP

- Turnstile adapter
- Rate limit/idempotency
- Enquiry and quote actions
- Outbox + Resend
- Webhook + cron retry

### Sales Operations

- Admin list handlers
- Assignment/status actions
- Dealer review/approval
- Audit

### Documents

- Upload intent for internal documents
- Version workflow
- Access request/grant
- Private download route

### Partner Portal

- Invitation acceptance
- Company-scoped read handlers
- Partner document access

---

## 78. Route and Action Definition of Ready

- Requirement ID
- Actor and surface
- Authentication requirement
- Permission/company/market scope
- Input schema and size
- Output DTO
- Error codes
- Transaction boundary
- Idempotency strategy
- Rate-limit/anti-bot strategy
- Audit/notification/analytics events
- Cache policy
- Test cases
- Rollback/recovery behavior

---

## 79. Route and Action Definition of Done

- Context derived server-side
- Zod parsing
- Authentication and authorization inside boundary
- RLS/transaction verified
- Expected error mapping
- No sensitive DTO leakage
- Idempotency for retryable mutation
- Audit/outbox created correctly
- Cache behavior explicit
- Structured logs with request ID
- Unit/integration/E2E risk coverage
- UK/UA context tested
- Direct-call security test
- Documentation updated

---

## 80. Open Backend Decisions

| ID | Decision | Recommended baseline | Due |
|---|---|---|---|
| API-001 | Protected host | `app.infravolt.co.uk` | Before auth production |
| API-002 | Immediate email retry frequency | Immediate attempt + suitable cron plan | Before production |
| API-003 | Anonymous attachments | Disabled until scan/retention ready | Before form attachment feature |
| API-004 | Anonymous approved document grant-link TTL | 24 hours, storage URL 120 seconds | Before controlled download |
| API-005 | Partner quote detail visibility | Safe status/summary only | Before portal |
| API-006 | Internal MFA enforcement | Required | Before admin production |
| API-007 | Public form exact limits | Start conservative; tune from telemetry | Before load/security test |
| API-008 | Page/content editor payload model | Versioned blocks | Before CMS actions |
| API-009 | Error monitoring provider | Vercel baseline, ADR if insufficient | Before launch monitoring review |
| API-010 | Future external API | Not in MVP; `/api/v1` only after contract approval | Future |

---

## 81. Initial Implementation Backlog

~~~text
01 request-context-and-errors
02 supabase-ssr-and-auth-dal
03 permissions-and-company-scope
04 shared-form-validation
05 turnstile-and-rate-limit
06 idempotency-service
07 enquiry-submission
08 quote-submission-rpc-and-action
09 notification-outbox-and-resend
10 resend-webhook
11 cron-notification-worker
12 admin-quote-and-enquiry-queries
13 quote-state-and-assignment-actions
14 dealer-application-and-review
15 partner-invitation-acceptance
16 document-upload-version-workflow
17 document-access-and-download
18 portal-company-scoped-queries
~~~

Each item migration dependency, tests and feature flag ile teslim edilir.

---

## 82. Resmi Teknik Kaynaklar

Bu belge 15 July 2026 tarihinde aşağıdaki resmi kaynaklarla doğrulanmıştır.

### Next.js

- [Next.js Server Actions and mutating data](https://nextjs.org/docs/app/getting-started/mutating-data)
- [Next.js forms with Server Actions](https://nextjs.org/docs/app/guides/forms)
- [Next.js `use server` directive](https://nextjs.org/docs/app/api-reference/directives/use-server)
- [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers)
- [Next.js Backend for Frontend guide](https://nextjs.org/docs/app/guides/backend-for-frontend)
- [Next.js data security and DAL](https://nextjs.org/docs/app/guides/data-security)
- [Next.js authentication guide](https://nextjs.org/docs/app/guides/authentication)

### Supabase

- [Supabase SSR Auth](https://supabase.com/docs/guides/auth/server-side)
- [Creating Supabase SSR clients](https://supabase.com/docs/guides/auth/server-side/creating-a-client)
- [Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
- [Supabase Storage private buckets](https://supabase.com/docs/guides/storage/buckets/fundamentals)
- [Serving private Storage assets](https://supabase.com/docs/guides/storage/serving/downloads)
- [Supabase Storage access control](https://supabase.com/docs/guides/storage/security/access-control)

### Turnstile

- [Cloudflare Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Cloudflare Turnstile test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/)

### Resend and Vercel

- [Resend Send Email and idempotency](https://resend.com/docs/api-reference/emails/send-email)
- [Resend webhook signature verification](https://resend.com/docs/webhooks/verify-webhooks-requests)
- [Resend webhook ingester patterns](https://resend.com/docs/webhooks/ingester)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Securing Vercel Cron Jobs](https://vercel.com/docs/cron-jobs/manage-cron-jobs)

---

## 83. Onay Kaydı

~~~text
Founder / Product Owner approval: Pending
Technical Owner approval: Pending
Backend Owner approval: Pending
Security review: Pending
Approved by:
Approval date:
Approved version:
Notes:
~~~

---

## 84. Sürüm Geçmişi

| Sürüm | Durum | Değişiklik |
|---|---|---|
| 0.1.0 | Current Draft | Server Action and Route Handler boundaries, common contracts, public/admin/portal actions, lifecycle workflows, Turnstile, idempotency, documents, outbox, Resend webhook, cron, security and test strategy established |

---

## 85. Son Karar

InfraVolt backend’i Next.js App Router içinde modular Backend-for-Frontend olarak geliştirilecektir. Public ve protected Server Components database’e server-only DAL üzerinden erişecek; kendi Route Handler endpoints’ine gereksiz internal HTTP request atmayacaktır.

First-party mutations Server Actions ile, provider webhooks, cron jobs, private document downloads, upload intents ve client-owned admin/portal queries Route Handlers ile uygulanacaktır. Server Actions direct POST ile erişilebilir kabul edilecek; her action kendi authentication, authorization ve validation kontrollerini gerçekleştirecektir.

Quote, enquiry, dealer application ve document request akışları server-derived market/domain context, Turnstile, rate limit, idempotency ve atomic database RPC ile çalışacaktır. Business transaction commit olduktan sonra outbox email gönderimini yönetecek; Resend veya cron failure lead/business record kaybına neden olmayacaktır.

Private document download her istekte current grant/policy kontrolü yapacak, access event yazacak ve default 120-second Supabase Storage signed URL üretecektir. Permanent private Storage link’i email veya database’e yazılmayacaktır.

MVP’de public external REST/GraphQL API açılmayacaktır. Mevcut `/api` paths InfraVolt application’ın internal BFF contract’larıdır. External API ihtiyacı doğarsa ayrı versioning, authentication, rate limit ve compatibility belgesiyle tasarlanacaktır.

Bir sonraki belge `08_ADMIN_AND_SALES_OPERATIONS.md` olmalıdır. Bu dosya admin rollerini, dashboard ve queue davranışlarını, company/contact workspace’lerini, quote/enquiry/dealer/document operation ekranlarını ve günlük çalışma prosedürlerini kesinleştirecektir.
