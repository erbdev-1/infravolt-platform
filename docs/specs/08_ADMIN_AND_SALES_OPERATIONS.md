# InfraVolt — Admin and Sales Operations

> Document ID: INF-08  
> Version: 0.1.0  
> Status: Draft for Founder and Operations Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Operations Owner: Sales Operations / Administration  
> Technical Owner: Product Director / CTO / Head Agent  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0, 06_DATABASE_SCHEMA.md v0.1.0, 07_BACKEND_API_AND_WORKFLOWS.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required admin locales: en-GB baseline; uk-UA supported by user preference when content is ready  
> Accessibility target: WCAG 2.2 AA  
> Last updated: 15 July 2026  
> Document language: Turkish; route, role, permission, status and component identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt internal Admin & Sales Operations ürününü tanımlar.

Belge:

- Internal rollerin görev sınırlarını,
- admin navigation ve route’larını,
- dashboard ve work queue’ları,
- enquiry, quote, company ve contact workspace’lerini,
- dealer review ve partner onboarding’i,
- document access ve version operasyonlarını,
- product/content/Application Map publishing’i,
- user, permission, audit ve platform governance ekranlarını,
- günlük operasyon prosedürlerini,
- SLA, escalation, quality ve security kurallarını

kesinleştirir.

Bu belge yalnız UI ekran listesi değildir. Admin’in günlük işleyişini, kayıt sahipliğini ve karar noktalarını birlikte tanımlar.

---

## 2. Ana Karar

InfraVolt Admin action-first bir operasyon sistemi olacaktır.

Dashboard ve navigation şu sorulara hızlı cevap vermelidir:

- Şu anda hangi kayıt aksiyon bekliyor?
- Hangi iş sahipsiz?
- Hangisi gecikiyor?
- Benim sıradaki görevim ne?
- Hangi karar teknik veya yönetici onayı bekliyor?
- Hangi customer/partner iletişimi cevaplanmadı?
- Hangi notification veya background job başarısız?

Admin, public website’in arkasına eklenmiş basit CMS olmayacaktır. Sales operations, partner management, technical governance ve content publishing aynı protected surface içinde permission-aware modüller olarak çalışacaktır.

---

## 3. Admin Hedefleri

- Yeni commercial lead’leri kaybetmemek
- Her quote/enquiry için açık owner ve next action tutmak
- Dealer approval’ı evidence ve review ile yapmak
- Product/document technical data’yı kontrolsüz yayınlamamak
- UK ve Ukraine yayınlarını bağımsız yönetmek
- Company/contact ilişkilerini tek kaynaktan görmek
- Private document access’i traceable yapmak
- Küçük ekibin günlük işini gereksiz CRM karmaşası olmadan yönetmek
- Kritik role/publish/status değişikliklerini audit etmek
- Responsive ve keyboard-accessible operasyon deneyimi sağlamak

---

## 4. Operasyon İlkeleri

### 4.1 Action before analytics

Admin ana sayfası vanity metrics yerine action queues gösterir.

### 4.2 Every active record has an owner

Triage sonrası active quote, enquiry, dealer application ve document request owner’sız kalmaz.

### 4.3 Every waiting record has a reason

`waiting_customer`, `information_requested` veya blocked state next action ve due date olmadan kullanılamaz.

### 4.4 Status is a business statement

Status yalnız renkli badge değildir. Allowed transition, timestamp, reason, history ve notification etkisi vardır.

### 4.5 Market scope is visible

UK/UA context record header, list and publishing action’da görünürdür.

### 4.6 No hidden authorization

Navigation permission-aware olur; fakat gerçek permission server-side action/route içinde tekrar doğrulanır.

### 4.7 Audit without surveillance

Critical decisions audit edilir. Normal çalışan davranışını gereksiz ayrıntıyla izleyen bir sistem kurulmaz.

### 4.8 Progressive operations

MVP core queues ile başlar. Opportunity, order, supplier request ve advanced automation measured need sonrası eklenir.

---

## 5. Admin Surface Boundary

### 5.1 Included

- Dashboard
- Unified inbox/enquiries
- Quotes
- Dealer applications
- Companies and contacts
- Technical documents and access requests
- Products/categories/industries/Application Maps
- Users, roles and audit
- Operational notifications/jobs

### 5.2 Not included in MVP

- Full accounting
- Invoice/payment processing
- Warehouse management
- ERP
- Advanced CRM marketing automation
- Native email client
- Public customer chat
- Complex sales forecasting
- HR/employee management

### 5.3 Protected host

Recommended canonical location:

~~~text
https://app.infravolt.co.uk/admin
~~~

Exact host `TA-001/API-001` Founder approvalına bağlıdır.

---

## 6. Internal Role Model

### 6.1 `super_admin`

- Platform governance
- User/role/permission administration
- Market/domain and critical settings
- All operational modules
- Emergency access with audit

### 6.2 `admin`

- Broad day-to-day operations
- Companies, contacts, enquiries, quotes
- Content/catalogue operations according to permissions
- No automatic role governance authority

### 6.3 `sales_admin`

- Enquiry and quote triage
- Company/contact maintenance
- Assignment, activity and allowed lifecycle changes
- No technical publication approval
- No user role escalation

### 6.4 `dealer_manager`

- Dealer application review
- Information requests
- Partner scope and onboarding
- Partner suspension proposal/action according to permission
- No product technical approval by default

### 6.5 `technical_manager`

- Product technical data verification
- Document version review and approval
- Certificate/test report management
- Industry/Application Map technical review
- Market-specific technical publication permission where granted

---

## 7. Role Capability Matrix

| Capability | Super Admin | Admin | Sales Admin | Dealer Manager | Technical Manager |
|---|:---:|:---:|:---:|:---:|:---:|
| Dashboard | Full | Full | Sales | Dealer summary | Technical summary |
| Enquiries | Full | Manage | Manage | Related read | Technical related |
| Quotes | Full | Manage | Manage | Related read | Technical support/read |
| Companies/contacts | Full | Manage | Manage | Partner-related manage | Read where needed |
| Dealer applications | Full | Manage if granted | Read/triage | Manage/decide | Technical review |
| Partners | Full | Manage if granted | Read | Manage | Scope read |
| Products | Full | Edit if granted | Read | Read | Edit/approve |
| Documents | Full | Manage if granted | Request handling | Partner access context | Edit/approve/publish |
| Industries/maps/content | Full | Edit/publish if granted | Read | Read | Technical review/publish if granted |
| Users/invitations | Full | Limited invite if granted | No baseline | Partner invite request | No baseline |
| Roles/permissions | Full | No baseline | No | No | No |
| Audit | Full | Limited | Own module | Own module | Own module |
| Platform settings | Full | Limited | No | No | No |

Matrix UI visibility guide’dır; atomic permissions 05–07 belgelerindeki RBAC engine ile uygulanır.

---

## 8. Permission Design Rules

- Role broad job function’dır; action atomic permission ile korunur.
- Market-specific publish permissions separate olur.
- Permission changes effective immediately or next request; stale UI action denied safely.
- “Can view screen” ile “can execute critical action” ayrı permission olabilir.
- Delete, export, publish, approve, grant, revoke and role-change permissions sensitive kabul edilir.
- Super Admin emergency action reason ve audit gerektirir where configured.
- User kendi role/scope’unu değiştiremez.
- Son aktif Super Admin account korunur; kendisini son Super Admin olarak revoke edemez.

---

## 9. Authentication and Session UX

### 9.1 Login

- Protected canonical host
- InfraVolt branded minimal login
- Generic invalid credential message
- Approved return path only
- Password manager compatible fields

### 9.2 MFA

Internal production access için required baseline.

States:

- MFA enrollment required
- Challenge required
- Verified
- Recovery/support required

### 9.3 Session expiry

- Unsaved form content protected where safe
- Re-auth prompt
- Sensitive action automatically replay edilmez
- User returns to validated record route after re-auth

### 9.4 Account unavailable

Suspended/revoked user generic support screen görür; internal role configuration detail gösterilmez.

---

## 10. Admin Information Architecture

~~~mermaid
flowchart TD
    A["Dashboard"] --> W["Work"]
    A --> R["Relationships"]
    A --> C["Catalogue and Content"]
    A --> G["Governance"]
    W --> Q["Inbox, Quotes, Dealers, Requests"]
    R --> P["Companies, Contacts, Partners"]
    C --> D["Products, Industries, Maps, Documents"]
    G --> S["Users, Audit, Settings, Operations"]
~~~

---

## 11. Primary Navigation Groups

### 11.1 Dashboard

- Action dashboard

### 11.2 Work

- Inbox
- Quotes
- Dealer Applications
- Document Requests
- Tasks — V1

### 11.3 Relationships

- Companies
- Contacts
- Partners
- Customer Projects — V1

### 11.4 Catalogue

- Products
- Categories
- Product Families
- Attributes

### 11.5 Content and Resources

- Industries
- Application Maps
- Pages
- Navigation
- Documents
- Certifications — V1

### 11.6 Governance

- Users
- Audit
- Markets and Domains
- Feature Flags
- Notifications and Jobs

Navigation groups/items permission-aware render edilir.

---

## 12. Admin Route Register — Work

| Route | Screen | Phase |
|---|---|---|
| `/admin` | Action dashboard | Sales Ops MVP |
| `/admin/inbox` | Unified enquiry queue | Sales Ops MVP |
| `/admin/inbox/[enquiryId]` | Enquiry workspace | Sales Ops MVP |
| `/admin/quotes` | Quote queue | Sales Ops MVP |
| `/admin/quotes/[quoteId]` | Quote workspace | Sales Ops MVP |
| `/admin/dealer-applications` | Dealer application queue | Sales Ops MVP |
| `/admin/dealer-applications/[applicationId]` | Dealer review workspace | Sales Ops MVP |
| `/admin/document-requests` | Access request queue | Sales Ops MVP |
| `/admin/document-requests/[requestId]` | Access request workspace | Sales Ops MVP |
| `/admin/tasks` | Tasks/follow-ups | V1 |

---

## 13. Admin Route Register — Relationships

| Route | Screen | Phase |
|---|---|---|
| `/admin/companies` | Company list | Sales Ops MVP/V1 |
| `/admin/companies/[companyId]` | Company workspace | Sales Ops MVP/V1 |
| `/admin/contacts` | Contact list | V1 |
| `/admin/contacts/[contactId]` | Contact workspace | V1 |
| `/admin/partners` | Approved partner list | V1 |
| `/admin/partners/[partnerId]` | Partner workspace | V1 |
| `/admin/projects` | Customer projects | V1 |
| `/admin/projects/[projectId]` | Project workspace | V1 |

---

## 14. Admin Route Register — Catalogue and Content

| Route | Screen | Phase |
|---|---|---|
| `/admin/catalogue/products` | Product list | Foundation/Public MVP |
| `/admin/catalogue/products/[productId]` | Product editor | Foundation/Public MVP |
| `/admin/catalogue/categories` | Category manager | Foundation/Public MVP |
| `/admin/catalogue/families` | Product families | Foundation/Public MVP |
| `/admin/catalogue/attributes` | Technical attribute manager | Public MVP/V1 |
| `/admin/content/industries` | Industry list/editor | Public MVP |
| `/admin/content/application-maps` | Map list | Public MVP |
| `/admin/content/application-maps/[mapId]` | Map editor | Public MVP |
| `/admin/content/pages` | Page list/editor | V1 or selected MVP pages |
| `/admin/content/navigation` | Menu manager | V1 |
| `/admin/documents` | Document list | Sales Ops MVP/V1 |
| `/admin/documents/[documentId]` | Document workspace | Sales Ops MVP/V1 |

---

## 15. Admin Route Register — Governance

| Route | Screen | Phase |
|---|---|---|
| `/admin/users` | Internal users | Foundation |
| `/admin/users/[userId]` | User detail | Foundation/V1 |
| `/admin/audit` | Audit events | V1 |
| `/admin/settings/markets` | Market/domain settings | Foundation |
| `/admin/settings/features` | Feature flags | Foundation/V1 |
| `/admin/operations/notifications` | Outbox/delivery operations | Sales Ops MVP |
| `/admin/operations/jobs` | Scheduled job operations | Sales Ops MVP/V1 |

---

## 16. Admin Application Shell

### 16.1 Wide layout

- Collapsible left navigation
- Top utility bar
- Breadcrumb/current location
- Main content region
- Optional right context/activity rail

### 16.2 Top utility bar

- Global search/command — V1
- Market context indicator/filter
- Notification/task indicator — V1
- Help/documentation
- User menu

### 16.3 Left navigation

- Current module active state
- Permission-filtered items
- Badge only for actionable count
- Collapse preserves icon + accessible label behavior
- No hidden hover-only essential navigation

### 16.4 Density

Admin uses `compact` or `standard` density from 04_DESIGN_SYSTEM.md. Destructive or critical controls remain full-size and explicit.

---

## 17. Responsive Admin Behavior

### Compact

- Navigation drawer
- Record header stacks
- Tables become priority cards/rows
- Secondary filters in sheet
- Primary action remains visible
- Right rail moves below main content

### Medium

- Collapsed navigation rail
- Two-column where safe
- Table horizontal overflow only as last resort

### Wide/Expanded

- Persistent navigation
- List/detail or main/right-rail layout
- Dense tables
- Sticky record action header where useful

Admin is primarily desktop-efficient but critical tasks tablet/phone’da complete edilebilir olmalıdır.

---

## 18. Common Screen States

Every admin screen defines:

- Loading skeleton
- Empty first-use state
- Empty filtered state
- Error with request reference
- Permission denied/safe not found
- Stale data/conflict
- Offline/network interruption where detectable
- Partial provider degradation
- Success confirmation

Blank table veya endless spinner accepted state değildir.

---

## 19. Dashboard Architecture

Dashboard role-aware action modules gösterir.

Recommended order:

1. Critical operational alerts
2. My overdue work
3. Unassigned new work
4. Work queues by module
5. Approvals waiting
6. Recent activity
7. Trend/volume summaries

### 19.1 Not dashboard priorities

- Total product count
- Total contact count
- Total page views without action context
- Decorative charts
- Metrics without date/market definition

---

## 20. Dashboard Action Cards

| Card | Count definition | Primary action |
|---|---|---|
| New unassigned enquiries | `new/triage`, no owner | Open queue filtered |
| New unassigned quotes | `new/triage`, no owner | Assign/triage |
| Overdue follow-ups | Due date passed, active | Open my overdue |
| Dealer reviews waiting | Submitted/under review with pending step | Review |
| Document requests waiting | Pending access requests | Decide |
| Technical approvals waiting | Product/document/map review state | Review |
| Failed notifications | Retryable/dead outbox | Inspect/retry |
| Failed jobs | Recent failed/partial job runs | Inspect |

Counts follow same query definition as destination queue; card and list must not disagree.

---

## 21. Dashboard Role Personalisation

### Sales Admin

- My enquiries
- My quotes
- Unassigned sales work
- Due follow-ups
- Recent customer activity

### Dealer Manager

- New dealer applications
- Information requested and overdue
- Reviews pending
- Partner onboarding/invitations
- Suspended/expiring partner scopes

### Technical Manager

- Products awaiting technical review
- Documents awaiting approval
- Expiring/withdrawn certifications
- Application Maps/content awaiting technical review
- Technical enquiries

### Super Admin

- Cross-module critical alerts
- Security events
- Failed notifications/jobs
- User/invitation problems
- Market/domain configuration warnings

---

## 22. Queue Architecture

All work queues share:

- Title and count definition
- Default saved view
- Search
- Filter bar
- Sort
- Table/card results
- Selection only when safe bulk action exists
- Empty states
- Pagination/cursor
- Row primary click target
- Row quick actions, limited

### 22.1 Default queue rule

Default view shows active/actionable records, not archived/all history.

### 22.2 Queue ownership filters

- Mine
- Unassigned
- Team/all permitted
- Overdue
- Recently updated

### 22.3 Market filters

UK, UA or both only if actor has both scopes. Market badge remains visible when filter is “all.”

---

## 23. Unified Inbox

The Inbox is enquiry-centric, not a full email inbox.

Includes:

- Contact enquiries
- Project support
- Technical questions
- Optional linked document requests summary

Does not include:

- Raw personal mailbox email sync in MVP
- Quote queue duplication
- Dealer application duplication
- System notifications

### 23.1 Default columns

| Column | Purpose |
|---|---|
| Reference | Stable case reference |
| Type | Contact/project/technical |
| Requester/company | Safe display |
| Context | Product/industry/document summary |
| Market | UK/UA |
| Priority | Operational priority |
| Status | Lifecycle |
| Assignee | Owner/unassigned |
| Age/updated | Time awareness |

### 23.2 Default sort

Urgency/overdue first, then oldest untriaged. Sort logic visible and deterministic.

---

## 24. Enquiry Workspace

### 24.1 Header

- Enquiry reference
- Type
- Status
- Priority
- Market
- Assignee
- Created/age
- Primary action

### 24.2 Main sections

1. Requester and company snapshot
2. Message
3. Product/industry/document context
4. Linked company/contact/project
5. Activity timeline
6. Internal notes
7. Attachments, if feature enabled
8. Audit summary

### 24.3 Primary actions

- Assign to me/user
- Change status
- Change priority
- Link/create company/contact
- Add activity/note
- Resolve
- Mark spam

### 24.4 Safe response support

Admin may copy email/contact details or use approved send action later. MVP is not a full mailbox; customer response sent outside or through controlled notification template is logged as activity.

---

## 25. Enquiry Triage Procedure

1. Confirm request is legitimate, not spam.
2. Identify type and market.
3. Review supplied context.
4. Link or create company/contact safely.
5. Set priority.
6. Assign owner.
7. Add next action/due time if follow-up required.
8. Change `new` → `triage` or appropriate next state.
9. Record customer response/activity.

No enquiry is marked resolved merely because automated acknowledgement was sent.

---

## 26. Quote Queue

### 26.1 Default columns

- Reference
- Company/requester
- Project
- Item count/key product family
- Market
- Status
- Assignee
- Submitted age
- Required-by date
- Last activity/next action

### 26.2 Default views

- New and unassigned
- My active quotes
- Waiting for customer
- Sent awaiting decision
- Overdue follow-up
- Won/lost this period
- Archived

`waiting_customer` quote status does not exist in baseline state machine; view derives from open follow-up/activity context without inventing lifecycle state.

---

## 27. Quote Workspace

### 27.1 Header

- Public reference
- Status
- Market
- Assignee
- Company/contact
- Submitted date/age
- Required-by date
- Primary status action

### 27.2 Recommended tabs

- Overview
- Items
- Activity
- Company & Contacts
- Project
- Files
- History & Audit

### 27.3 Overview

- Request snapshot
- Project summary
- Item summary
- Customer message
- Current owner
- Next action/due date
- Recent activity
- Related enquiries/document requests

### 27.4 Items

Each item shows:

- Submission snapshot name/code
- Current product link/state
- Quantity/unit
- Selected options
- Customer note
- Availability warning if catalog changed

Original snapshot cannot be overwritten by catalog edit.

---

## 28. Quote Actions

| Action | Permission | Required input |
|---|---|---|
| Assign | `quotes.assign` | Active assignee |
| Qualify | `quotes.change_status` | Qualification complete |
| Start preparing | `quotes.change_status` | Qualified state |
| Mark sent | `quotes.change_status` | Sent timestamp/activity |
| Request revision | State rule | Customer request context |
| Mark won | Sensitive status | Optional outcome metadata |
| Mark lost | Sensitive status | Reason code + optional note |
| Cancel | Sensitive status | Reason |
| Archive | Terminal state | Confirmation |
| Add activity | `quotes.update` | Type, summary, time |

Status dropdown only valid transitions shows. Disabled impossible states are not submitted and rejected server-side if forged.

---

## 29. Quote Follow-Up Discipline

Active quote should contain:

- Owner
- Current status
- Last meaningful activity
- Next action or explicit reason none required
- Due date where waiting/follow-up

Sent quote without next follow-up becomes “attention needed” after configurable internal threshold.

Customer response, phone call or external email is logged as concise activity. Full mailbox body needlessly copied into notes değildir.

---

## 30. Company List

### 30.1 Columns

- Legal/trading name
- Type
- Status
- Primary market
- Owner
- Primary contact
- Active quotes/enquiries
- Partner status if any
- Last activity

### 30.2 Filters

- Company type
- Status
- Market
- Owner
- Has active quote
- Dealer/partner
- Recently created/updated

### 30.3 Search

Legal name, trading name, approved registration number and primary contact identity. Search results respect permissions and never expose unrelated partner-private data.

---

## 31. Company Workspace

### 31.1 Header

- Legal/trading name
- Company type/status
- Primary market
- Owner/account manager
- Partner badge where applicable
- Primary action

### 31.2 Tabs

- Overview
- Contacts
- Enquiries
- Quotes
- Projects
- Dealer/Partner
- Documents
- Activity & Notes
- Audit

### 31.3 Overview

- Registration/business identity
- Website
- Addresses
- Primary contact
- Current owner
- Active commercial records
- Relationship summary
- Data quality warnings

### 31.4 Company edits

Master data change requires row version. Submission snapshots remain unchanged. Registration number, company type, blocked status and partner identity changes are audited.

---

## 32. Contact Workspace

Contains:

- Name/job title
- Email/phone
- Company relationships
- Preferred locale
- Consent status/history summary
- Enquiries and quotes
- Activities
- Data quality/duplicate warning

### 32.1 Contact privacy

- Minimum necessary data
- No personal sensitive notes
- Marketing consent separate from transactional contact
- Email/phone click/copy accessible and deliberate
- Archived contact retained/anonymized according to policy

---

## 33. Company and Contact Matching

### 33.1 Exact/high-confidence signals

- Normalized registration number + country
- Verified domain/website
- Exact email and known company relationship
- Admin-confirmed match

### 33.2 Weak signals

- Similar company name
- Shared generic mailbox
- Similar phone
- Same city

Weak signals create duplicate suggestion, not automatic merge.

### 33.3 Merge

Company/contact merge is V1 sensitive operation requiring:

- Side-by-side source/target
- Relationship preview
- Conflict choices
- Reassignment count
- Confirmation
- Audit
- Roll-forward recovery plan

No destructive merge in Sales Operations MVP.

---

## 34. Customer Project Workspace — V1

Tabs:

- Overview
- Company & Contacts
- Quotes
- Enquiries
- Documents
- Activity

Project is private commercial entity. It is not automatically a public reference/case study.

Conversion to public `project_reference` requires separate content approval and customer disclosure policy.

---

## 35. Dealer Application Queue

### 35.1 Columns

- Application reference
- Company
- Contact
- Market/territory
- Product interests
- Status
- Review owner
- Age/last update
- Missing information indicator
- Risk/review summary

### 35.2 Views

- New submissions
- Under review
- Waiting for applicant
- Ready for decision
- Approved
- Rejected/withdrawn
- Overdue

---

## 36. Dealer Review Workspace

### 36.1 Header

- Reference
- Company
- Requested market/territory
- Status
- Review owner
- Submitted/age
- Decision actions

### 36.2 Sections

1. Company identity
2. Applicant contact
3. Business profile and channels
4. Product interests
5. Technical capability
6. Territory/requested scope
7. Evidence/attachments if enabled
8. Review checklist
9. Internal notes/activity
10. Decision history

### 36.3 Review types

- Initial completeness
- Commercial suitability
- Technical capability
- Compliance/risk
- Final decision

---

## 37. Dealer Review Checklist

### Company

- Legal/trading identity
- Registration information if required
- Website/business presence
- Market/territory fit

### Commercial

- Customer base/channel
- Product fit
- Sales/support capacity
- Territory conflicts

### Technical

- Relevant competence
- Installation/support ability where applicable
- Training need
- Document/product scope

### Risk

- Duplicate/existing relationship
- Incomplete/inconsistent information
- Restricted/sanctions/compliance review where legally required
- Reputation/contract concerns

Checklist decision support’tur; hidden automated scoring approval vermez.

---

## 38. Dealer Information Request

When information is missing:

1. Select required fields/evidence.
2. Add public-safe message.
3. Set response due date.
4. Change state to `information_requested`.
5. Enqueue notification.
6. Record activity/audit.

Internal risk notes customer message’e dahil edilmez.

---

## 39. Dealer Approval

Approval modal/step requires:

- Confirm company/contact
- Partner type
- Market scope
- Territory note
- Product family/product scope
- Document access tier
- Account manager
- Agreement dates if available
- Portal enabled state
- Invitation recipient/role
- Decision summary

Approval and invitation are related but separate outcomes. Approval success does not mean invitation accepted or user active.

---

## 40. Dealer Rejection and Withdrawal

### Rejection

- Internal reason code
- Internal detail
- Public-safe explanation/template
- Decision actor/time
- Optional reapplication policy

### Withdrawal

- Applicant or internal documented source
- Reason where known
- No partner profile or invitation activation

Rejected/withdrawn records remain searchable in archive according to retention policy.

---

## 41. Partner List and Workspace — V1

### Partner list

- Partner code/company
- Type
- Status
- Markets/territory
- Product scopes
- Portal enabled
- Account manager
- Agreement dates
- Active users

### Partner workspace

- Overview
- Users/memberships
- Market/product scopes
- Quotes/projects
- Documents/access
- Activity
- Agreement metadata
- Audit

Partner suspension immediately affects portal authorization; scope change is audited.

---

## 42. Document List

### 42.1 Columns

- Internal/public title
- Resource type
- Document code
- Status
- Current version
- Access level
- UK publication
- UA publication
- Owner
- Updated/expiry warning

### 42.2 Views

- Draft/review
- Awaiting approval
- Published metadata
- Missing current approved version
- Expiring certifications
- Withdrawn/superseded
- Access restricted

---

## 43. Document Workspace

### 43.1 Header

- Internal title/code
- Type/status
- Access level
- Current version
- Owner
- Market publication badges
- Primary action

### 43.2 Tabs

- Overview
- Versions
- Market Metadata
- Products & Industries
- Access Policy
- Requests & Grants
- Access Events
- Audit

### 43.3 Overview

- Resource type/manufacturer
- Access/default grant policy
- Current approved version
- Linked products/industries
- Publication health
- Expiry/withdrawal warnings

---

## 44. Document Version Review

Version row shows:

- Version label/number
- Filename/type/size
- Checksum
- Language
- Issue/validity dates
- Scan/file status
- State
- Approver/time
- Supersedes relation

### Review actions

- Preview/download authorized internal file
- Return to draft with reason
- Approve
- Set current
- Supersede
- Withdraw

Approved version bytes cannot be replaced. UI offers “Create new version,” not “Replace file.”

---

## 45. Document Access Request Queue

### Columns

- Request reference
- Document/version
- Requester/company
- Market
- Reason/project
- Status
- Age
- Decision owner
- Existing grant indicator

### Decision workspace

- Request snapshot
- Document access policy
- Current version status
- Company/partner/project context
- Existing/revoked/expired grants
- Access history summary
- Approve/reject actions

Decision cannot be based only on requester email domain; company and policy context is reviewed.

---

## 46. Document Access Decision

### Approve

- Grant scope: user/company/project/request link
- Fixed version or current version policy
- Start/expiry
- Reason
- Notification template
- Optional maximum tier policy

### Reject

- Internal reason
- Public-safe reason code/message
- No object existence/internal policy leakage

### Revoke

- Reason mandatory
- Existing grant status changed immediately
- New signed download issuance denied
- Audit event

Previously issued Storage signed URL remains valid until short expiry; this is why default is 120 seconds.

---

## 47. Catalogue Operations Overview

Catalogue admin separates:

- Stable product identity
- Technical data
- Market content
- Market availability/publication
- Media
- Relationships
- Resources/documents

Product list/edit is not one large unstructured form.

### Catalogue health indicators

- Missing technical source
- Missing required attribute
- Missing approved media
- Missing UK localization
- Missing UA localization
- Draft/review/published by market
- Discontinued/superseded
- Certificate/document gap

---

## 48. Product List

### Columns

- Internal/manufacturer code
- Product name
- Family/category
- Technical status
- Lifecycle status
- UK publication/availability
- UA publication/availability
- Required-data warnings
- Updated/owner

### Views

- Draft products
- Awaiting technical verification
- Ready to publish UK
- Ready to publish UA
- Missing localization
- Missing technical attributes
- Discontinued/superseded

### Actions

- Create product
- Open editor
- Submit selected draft for review where safe
- Export list only if authorized/approved feature

Bulk publish/technical approval baseline değildir.

---

## 49. Product Editor

### Tabs

1. Core Identity
2. Market Content
3. Technical Attributes
4. Media
5. Relationships
6. Documents & Certifications
7. Publication
8. History & Audit

### 49.1 Core Identity

- Manufacturer
- Family/category
- Product type
- Manufacturer/internal code
- Parent/range relation
- Lifecycle/superseded product
- Technical source

### 49.2 Market Content

UK and UA selected explicitly. Shows:

- Name/slug
- Short description
- Overview blocks
- Application notes
- SEO
- Translation status
- Preview

Switching market with unsaved changes requires save/discard/cancel choice.

### 49.3 Technical Attributes

- Grouped by family definition
- Required/comparable/filterable indicators
- Canonical unit
- Source document
- Verification state
- Difference from previous saved value

---

## 50. Product Technical Approval

Approval review displays:

- Changed technical values
- Source document/version
- Required missing values
- Unit/format checks
- Related product/category implications
- Current public publication state

### Four-eyes principle

Recommended: editor and technical approver are different people.

If small team temporarily requires same-person approval:

- Elevated permission
- Explicit exception reason
- Audit flag
- Periodic review

Technical approval does not automatically publish either market.

---

## 51. Product Publication

Publication panel shows UK and UA independently.

For each market:

- Localization status
- Slug uniqueness
- Technical approval
- Category/industry state
- Media state
- Availability
- Required document/certificate warnings
- SEO preview
- Last publish actor/time

Actions:

- Submit market content for review
- Publish market
- Unpublish market with reason
- Schedule/effective date if supported

“Publish all markets” is not MVP action.

---

## 52. Category and Family Management

### Category tree

- Drag/reorder only if accessible alternative provided
- Parent/child cycle prevented
- Max depth indication
- Product count
- Market localization health
- Active/inactive state

### Deactivation

Category with published products cannot be silently deleted/deactivated without relocation/public impact review.

### Attribute management

Changing attribute data type/unit after product values exist is sensitive migration-like operation, not simple inline edit.

---

## 53. Industry Content Operations

Industry editor:

- Stable identity
- UK/UA content
- Linked product relevance
- Application Map relation
- References
- SEO
- Publication status

Publish validation ensures linked public products and accessible context. Missing UA content does not silently publish English fallback.

---

## 54. Application Map Editor

### Layout

- Base image canvas
- Hotspot list
- Selected hotspot properties
- Product relation panel
- Market/localization panel
- Preview modes

### Hotspot editing

- Click or keyboard coordinate entry
- Percentage coordinates
- Stable key
- Sort/keyboard order
- Localized label/description/aria label
- Linked products
- Active state

### Preview

- Wide image interaction
- Compact list-first view
- UK content
- UA content
- Keyboard order

### Asset rule

Only canonical Application Map asset package and approved clean base files. Legacy filenames/composite UI screenshots cannot become production base asset accidentally.

---

## 55. Page and Navigation Operations

### Page editor

- Stable page identity
- Market publication
- Locale content blocks
- SEO
- Preview
- Revision/row version conflict

### Navigation editor

- Menu hierarchy
- Route/entity/external target
- Localized label
- Sort order
- Visibility presentation rule
- Broken/ unpublished target warning

Navigation visibility is not authorization. Admin/portal routes remain server-protected.

---

## 56. User Management

### User list columns

- Display name/email
- Type: internal/partner
- Status
- Company/membership
- Roles/scopes
- MFA status indicator
- Last active time, coarse
- Invitation state

### Internal user actions

- Invite
- Resend/revoke pending invite
- Suspend/reactivate
- Grant/revoke role/scope
- Require MFA recovery procedure

### Restrictions

- Password never displayed/set by admin
- Reset token never displayed
- No user impersonation baseline
- No self-role elevation
- Last Super Admin safeguard
- Every role/status change audited

---

## 57. Invitation Management

Invitation detail shows:

- Recipient
- Company
- Intended role and market scope
- Inviter
- Created/expiry
- Status
- Resend/revoke controls

Resend should create/rotate secure invitation according to backend policy, not reveal existing raw token.

Accepted invitation scope changes require normal role management, not editing history.

---

## 58. Role and Permission Governance

### Baseline

System roles and permission mapping are code/seed-governed initially. Admin UI may display them read-only.

### Editable mapping — future

If UI editing is enabled:

- Super Admin only
- Side-by-side diff
- Sensitive permission warning
- Reason
- Re-auth/MFA freshness
- Audit
- Prevent lockout/last admin removal

Custom arbitrary roles are not MVP requirement.

---

## 59. Audit Viewer

### Filters

- Date/time
- Actor
- Action
- Target type/reference
- Market
- Company scope
- Request ID

### Event detail

- Actor and type
- Action
- Target
- Timestamp
- Request ID
- Reason
- Redacted safe before/after diff

### Restrictions

- No audit edit/delete UI
- Sensitive fields redacted
- Export permission separate
- Audit access itself may be audited

Audit viewer is investigation/governance tool, not employee productivity leaderboard.

---

## 60. Market and Domain Settings

Shows:

- Market key/name
- Locale
- Enabled/launch status
- Canonical domain
- Alias/redirect domain
- Protected host
- SEO/sitemap status summary

### Change control

Domain setting change may require DNS/Vercel deployment configuration. Admin UI cannot claim success solely because database row changed.

Critical changes:

- Super Admin
- Confirmation and reason
- Deployment/config validation
- Audit
- Rollback plan

---

## 61. Feature Flag Operations

Feature flag list:

- Key/description
- Default
- Market/environment overrides
- Owner
- Expiry date
- Last change

Rules:

- Security permission yerine kullanılamaz
- Production change sensitive permission
- Expired flags highlighted
- Flag-off path tested
- Config JSON validated
- Secret values prohibited

---

## 62. Notification Operations

### Views

- Pending
- Processing/locked
- Failed retryable
- Dead
- Sent/delivered
- Bounced/complained

### Columns

- Event/template
- Business record reference
- Market
- Recipient masked in list
- Status/attempts
- Next attempt
- Provider result
- Created/sent time

### Actions

- Inspect safe payload variables
- Retry dead/failed
- Cancel pending
- Open related business record

No arbitrary recipient/body edit during retry. Correction creates a new controlled notification event.

---

## 63. Scheduled Job Operations

Displays:

- Job key
- Scheduled/start/finish
- Status
- Claimed/succeeded/failed counts
- Duration
- Safe error summary
- Worker/deployment version

Actions:

- View run
- Retry safe idempotent job if permissioned
- Open affected outbox/records

Manual retry cannot bypass retention, permission or idempotency rules.

---

## 64. Global Search and Command Palette — V1

Searchable entities:

- Quote reference
- Enquiry reference
- Dealer application reference
- Company
- Contact
- Product code/name
- Document code/title

### Rules

- Permission-scoped results
- Entity type grouped
- Keyboard accessible
- Recent records local safe IDs only
- No full private message indexing in global search baseline
- Command execution requires confirmation/permission; search does not grant action

---

## 65. Filters and Saved Views

### Filter behavior

- URL-backed where practical
- Clear active filter summary
- Reset all
- Result count
- Market visible
- Invalid/stale filter safely removed

### Saved views — V1

- Personal views first
- Team views permissioned
- Name, filters, sort, visible columns
- Default view per user/module
- No stored sensitive query string beyond necessary IDs

---

## 66. Table Standards

### Required

- Accessible column headers
- Sort state announced
- Row primary link
- Stable column alignment
- Loading skeleton
- Empty/error states
- Keyboard reachable actions
- Mobile priority representation

### Selection

Checkbox selection only when approved bulk action exists. Selection count and scope visible.

### Row actions

Maximum common quick actions. Critical action preferably record workspace, not hidden overflow.

### Pagination

Default 25, maximum 100. Cursor/next page preserves filters.

---

## 67. Record Workspace Standard

~~~mermaid
flowchart TD
    H["Record Header"] --> S["Status and Primary Actions"]
    H --> T["Tabs / Sections"]
    T --> M["Main Record Data"]
    T --> R["Relationships and Activity"]
    T --> A["History and Audit"]
~~~

Header always includes:

- Human reference/name
- Entity type
- Status
- Market/company context
- Owner where relevant
- Last updated/row conflict state
- Primary action

---

## 68. Admin Form Standards

- Labels, help and validation
- Required-field intro
- Error summary linked to fields
- Dirty state indication
- Save/Cancel hierarchy
- Leave-with-unsaved-changes guard
- Row version conflict handling
- Read-only fields visually distinct but readable
- Sensitive action reason field
- Confirmation for irreversible/high-impact changes

Autosave baseline değildir for technical/publish/permission forms. Explicit save provides review boundary.

---

## 69. Bulk Action Policy

Allowed candidates:

- Assign selected enquiries/quotes to active user
- Change low-risk list metadata where state-valid
- Archive selected terminal records, V1
- Add/remove simple tag, V1

Not allowed baseline:

- Bulk dealer approve/reject
- Bulk product technical approval
- Bulk publish all markets
- Bulk document grant/revoke
- Bulk role/permission change
- Bulk hard delete

Bulk action preview shows affected count, excluded invalid rows and resulting change.

---

## 70. Internal Notes and Activity

### Notes

- Plain text baseline
- Internal/restricted visibility
- Author/time
- Edit history or bounded edit window
- Soft delete with audit where required

### Activity

- Customer call
- Email sent/received summary
- Meeting
- Task/follow-up
- System status event

### Prohibited content

- Password/token/API key
- Payment card data
- Unnecessary health/sensitive personal data
- Discriminatory or speculative comments
- Full private document URL
- Unsupported accusations

Notes should be factual, concise and business-relevant.

---

## 71. Task and Follow-Up Model — V1

Task fields:

- Related entity
- Title
- Owner
- Due time
- Priority
- Status
- Completion note
- Created by/time

Tasks supplement, not replace, business lifecycle. Quote remains `sent` while follow-up task tracks next call.

MVP may store next action as activity/due fields without full generic task module. V1 adds cross-entity task queue after repeated need is confirmed.

---

## 72. Internal Service Targets

These are provisional internal targets, not public contractual SLA.

| Work type | Triage target | First human response target |
|---|---:|---:|
| New quote request | Within 4 business hours | Within 1 business day |
| General enquiry | Within 4 business hours | Within 1 business day |
| Urgent technical/project blocker | Within 2 business hours | Same business day where possible |
| Document access request | Within 1 business day | Within 1 business day |
| Dealer application | Within 1 business day completeness check | Initial review within 3 business days |
| Failed critical notification | Within 1 business hour during coverage | Recovery/escalation based on cause |
| Security-critical event | Immediate alert | Incident procedure |

Business hours and holiday calendars market/team policy’ye göre tanımlanır. Response target resolution guarantee değildir.

---

## 73. Priority Model

### `urgent`

- Active project safety/technical blocker
- Material tender deadline within immediate window
- Security/private document incident
- Major production failure

### `high`

- Near-term quote/tender deadline
- Key customer/partner blocked
- Repeated failed customer communication

### `normal`

- Standard quote/enquiry/document request

### `low`

- Informational/non-time-sensitive request

Priority can be suggested automatically but final value/reason visible. VIP/company name alone does not automatically override safety/deadline logic.

---

## 74. Overdue Definition

A record is overdue when:

- Triage target passed and still new/unassigned,
- Next action due date passed,
- Waiting customer response review date passed,
- Dealer information response/review deadline passed,
- Document request decision target passed,
- Failed notification retry window exhausted,
- Technical approval blocks published commitment beyond target.

Overdue badge shows why, not just red colour.

---

## 75. Start-of-Day Procedure

Recommended daily sequence:

1. Review critical alerts/security events.
2. Check failed/dead notifications and failed jobs.
3. Review new unassigned quotes/enquiries.
4. Assign owners and priorities.
5. Review overdue follow-ups.
6. Review pending document requests.
7. Role-specific queues: dealer or technical approvals.
8. Confirm today’s urgent deadlines.

Dashboard supports this order.

---

## 76. During-Day Record Discipline

After meaningful interaction:

- Add concise activity
- Update status if state changed
- Set/adjust next action and due date
- Confirm owner
- Link company/contact/project where known
- Do not duplicate same information across notes and activity unnecessarily
- Do not mark resolved before actual business outcome

---

## 77. End-of-Day Procedure

1. Review my overdue and due-today work.
2. Ensure new records are assigned/triaged.
3. Add missing activity from calls/emails.
4. Set next actions for active quotes/enquiries.
5. Escalate blockers.
6. Check failed customer acknowledgements.
7. Avoid leaving sensitive draft changes unsaved.

This is an operational checklist, not forced employee time tracking.

---

## 78. Quote Triage SOP

### Required checks

- Contact/company data usable
- Product items valid and market available
- Project location/timing understood
- Tender/deadline urgency
- Technical clarification needed
- Owner assigned

### Outcomes

- Qualified → preparing
- Need clarification → activity + next action, remain appropriate state
- Invalid/not feasible → lost/cancelled with reason
- Duplicate → link/controlled resolution, no silent deletion

---

## 79. Technical Enquiry SOP

- Confirm exact product/industry context
- Do not improvise unverified technical claim
- Link source document/product data
- Assign Technical Manager when needed
- Customer response clearly separates verified fact from pending confirmation
- Record source/reference in activity
- Escalate safety/compliance implications

AI-generated response cannot be sent as technical fact without human verification.

---

## 80. Dealer Review SOP

1. Completeness check.
2. Company/contact match.
3. Commercial fit review.
4. Technical capability review if relevant.
5. Compliance/risk evidence.
6. Territory/product scope proposal.
7. Information request if gaps.
8. Final decision by authorized role.
9. Approved partner setup.
10. Invitation and onboarding tracking.

Approval speed does not override required review evidence.

---

## 81. Document Request SOP

1. Confirm document/version and access level.
2. Confirm current approved version exists.
3. Review requester/company/project/partner context.
4. Check existing grants and prior access.
5. Approve with minimal necessary scope/expiry or reject safely.
6. Ensure notification is generated.
7. Access/download events remain traceable.

Document file is never attached from an unverified local copy outside version workflow.

---

## 82. Publishing SOP

### Product/content

- Review target market
- Verify approved localization
- Verify technical/media/category dependencies
- Preview desktop/mobile
- Check SEO/canonical intent
- Publish only selected market
- Smoke-test public route

### Document

- Current approved version
- Access policy
- Market metadata
- Linked products
- Download route authorization test

### Rollback

Unpublish/withdraw with reason; do not delete history.

---

## 83. Escalation Model

| Issue | First owner | Escalation |
|---|---|---|
| Quote/customer deadline | Sales Admin | Admin/Founder |
| Technical uncertainty | Technical Manager | Manufacturer/approved technical authority |
| Dealer risk/conflict | Dealer Manager | Admin/Founder/legal as needed |
| Private document access concern | Technical/Admin | Super Admin/security |
| User/permission issue | Admin | Super Admin |
| Failed notification/job | Admin/technical owner | Technical Owner |
| Production/security incident | Technical Owner | Super Admin/Founder and incident procedure |

Escalation is recorded as activity/incident, not only informal message.

---

## 84. Operational Incident Handling

Examples:

- Private document exposed incorrectly
- Cross-company data visibility
- Admin account compromise
- Quote submissions failing
- Email acknowledgements failing broadly
- Wrong-market publication
- Incorrect technical data published

Immediate steps:

1. Contain feature/account/publication.
2. Preserve logs/audit evidence.
3. Identify affected records/users.
4. Notify internal owner.
5. Correct with approved workflow.
6. Customer/legal notification decision by authorized person.
7. Post-incident cause and prevention action.

Do not delete evidence or silently rewrite history.

---

## 85. Data Quality Operations

Dashboard/list warnings identify:

- Company without usable contact
- Duplicate candidates
- Quote without owner/next action
- Invalid/missing market scope
- Product missing required technical data
- Published item missing approved localization/media
- Document without current approved version
- Partner without active market scope
- Expired invitation/grant

Data quality fix action must respect audit and snapshot history.

---

## 86. Security and Privacy Rules

- Admin pages `noindex` and no shared cache
- MFA required for internal production
- Least privilege
- Company/market scope visible and enforced
- Sensitive actions require reason/confirmation
- No secrets/tokens in notes
- No full signed URL in UI history/logs
- Contact data shown only where business need/permission exists
- Exports disabled until policy/permission ready
- Clipboard/download actions deliberate
- Session expiry prevents silent sensitive replay
- Audit and access logs protected

---

## 87. Accessibility Requirements

- Full keyboard navigation
- Skip link/main landmark
- Visible focus
- Navigation drawer focus management
- Table/card accessible names
- Sort/filter state announced
- Status not colour-only
- Error summary and field links
- Dialog focus trap/return
- Confirmation not dependent on drag/drop
- Application Map editor coordinate fields accessible
- Live-region only for meaningful async updates
- Zoom and reflow at critical sizes

Admin density does not justify smaller inaccessible targets/text.

---

## 88. Performance Requirements

- Server-side pagination/filter
- Explicit list DTO fields
- Lazy detail tabs where beneficial
- No full company/contact table load
- No N+1 relationship queries
- Skeleton and progressive data states
- Optimistic update only reversible low-risk action
- Status/publish/permission action waits for confirmed server result
- Large document uploads direct to Storage
- Dashboard cards share consistent efficient queries, not duplicate expensive counts

---

## 89. Admin Analytics

Operational metrics:

- Time to triage
- Time to first human response
- Unassigned age
- Overdue count
- Quote stage volume/conversion, carefully defined
- Dealer application stage/age
- Document request decision time
- Notification failure rate
- Technical approval backlog

Metrics are process improvement signals, not isolated employee scorecards. Volume and outcome interpreted with market, complexity and coverage context.

---

## 90. Admin Test Scenarios

### Authentication/permissions

- No session
- MFA incomplete
- Sales Admin opens role settings
- Dealer Manager attempts product publish
- Technical Manager attempts quote assignment
- Revoked permission while screen open

### Queues/workspaces

- Empty/new/overdue/filter states
- Pagination and stable sort
- Row opens correct record
- Conflict/stale row version
- Compact responsive layout

### Workflows

- Quote triage/assignment/status history
- Enquiry link/resolve/reopen
- Dealer information request/approve/reject
- Invite acceptance separation
- Document version approve/supersede
- Document grant/revoke
- UK publish without UA publish
- Failed notification retry

### Accessibility

- Keyboard-only critical flows
- Screen reader status/filter errors
- Focus return from modal
- Error summary

---

## 91. Sales Operations MVP Scope

### Required screens

- Login/MFA
- Dashboard
- Unified Inbox + enquiry workspace
- Quote queue + workspace
- Dealer application queue + review workspace
- Document request queue/workspace
- Company basic workspace
- Product list/editor baseline
- Document list/workspace baseline
- User invitations baseline
- Notification failure operations

### Required workflows

- Triage/assign/status/activity
- Dealer information request/decision
- Product technical review/market publish
- Document version/access decision
- User invitation
- Audit for critical actions

---

## 92. V1 Scope

- Full company/contact workspaces
- Partner list/workspace
- Customer projects
- Generic tasks
- Saved/team views
- Global search/command palette
- Page/navigation editor
- Certification structured operations
- Audit viewer advanced filters
- Data export jobs
- Duplicate merge workflow
- Advanced operational analytics

---

## 93. Deferred Scope

- Opportunity pipeline separate from quote
- Orders/invoices/payments
- Supplier requests/procurement
- Warehouse/stock
- Email inbox sync
- Advanced workflow automation builder
- Custom role builder
- User impersonation
- Bulk publish/approval
- AI autonomous sales/technical decisions

Deferred capability is not simulated with unsafe notes/status hacks.

---

## 94. Admin Release Sequence

### Phase 1 — Protected shell

- Auth/MFA
- Permission-aware navigation
- Common list/workspace components
- Error/audit foundation

### Phase 2 — Sales queues

- Dashboard
- Enquiries
- Quotes
- Companies basic

### Phase 3 — Dealer operations

- Application queue/review
- Approval/invitation

### Phase 4 — Documents

- Document/version
- Requests/grants/access events
- Notification operations

### Phase 5 — Catalogue/content

- Product/category/industry
- Application Map
- Market publication

### Phase 6 — Partner/governance V1

- Partner workspaces
- User/scopes
- Audit/search/tasks/analytics

---

## 95. Screen Definition of Ready

- User role and permission
- Operational job
- Route
- Data/DTO
- Default view
- Actions and transitions
- Empty/loading/error/conflict states
- Audit/notification implications
- Responsive behavior
- Accessibility behavior
- Test cases
- Release phase

---

## 96. Screen Definition of Done

- Correct permission and market scope
- Safe DTO only
- Loading/empty/error/conflict states
- Keyboard/responsive support
- Action validation and confirmation
- Audit/history created where required
- Status/owner/next-action consistency
- No PII/secret leakage
- UK/UA market behavior
- Automated and manual critical-flow tests
- Operational owner acceptance

---

## 97. Open Admin Decisions

| ID | Decision | Recommended baseline | Due |
|---|---|---|---|
| ADM-001 | Protected host | `app.infravolt.co.uk` | Before production auth |
| ADM-002 | Admin interface default locale | en-GB; uk-UA preference later | Before Ukraine staff onboarding |
| ADM-003 | Exact business hours/SLA calendar | UK baseline + Ukraine coverage policy | Before operations launch |
| ADM-004 | Same-person technical approval exception | Allowed only with reason/audit during small-team phase | Before publishing launch |
| ADM-005 | Customer email sending inside admin | External mailbox + activity log first | Before CRM/email integration |
| ADM-006 | Full company/contact module in MVP | Basic workspace MVP, full V1 | Sprint planning |
| ADM-007 | Document request auto-grant | None except explicitly approved policies | Before resource launch |
| ADM-008 | Export capability | Disabled until permission/retention policy | Before V1 |
| ADM-009 | Opportunity module | Defer; quote is commercial record | After measured need |
| ADM-010 | Task module | Due activity fields MVP; generic tasks V1 | After Sales Ops validation |

---

## 98. Operational Acceptance Checklist

- Every queue has owner and default sort
- Dashboard count matches queue
- Quote/enquiry triage can complete end-to-end
- Dealer approval does not auto-activate user
- Document version cannot be overwritten after approval
- Grant revoke stops new download issuance
- UK/UA publication independent
- Failed email visible/retryable
- Permission changes enforced immediately
- Last Super Admin protected
- Critical audit visible
- Mobile/keyboard critical tasks usable
- SOP tested with realistic sample records

---

## 99. Bağlı Proje Belgeleri

- `01_PRODUCT_REQUIREMENTS.md` — Product and operational requirements
- `02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md` — Routes and user flows
- `03_UI_UX_ARCHITECTURE.md` — Screen/layout behavior
- `04_DESIGN_SYSTEM.md` — Admin density, components and states
- `05_TECHNICAL_ARCHITECTURE.md` — Auth, deployment and application boundaries
- `06_DATABASE_SCHEMA.md` — Records, statuses and RLS
- `07_BACKEND_API_AND_WORKFLOWS.md` — Actions, endpoints and transactions

---

## 100. Onay Kaydı

~~~text
Founder / Product Owner approval: Pending
Operations Owner approval: Pending
Technical Owner approval: Pending
Security review: Pending
Approved by:
Approval date:
Approved version:
Notes:
~~~

---

## 101. Sürüm Geçmişi

| Sürüm | Durum | Değişiklik |
|---|---|---|
| 0.1.0 | Current Draft | Internal roles, admin navigation/routes, dashboard, queues, record workspaces, sales/dealer/document/catalogue operations, governance, SLA, SOP, security and release scope established |

---

## 102. Son Karar

InfraVolt Admin, action-first bir internal operations product olacaktır. Dashboard toplam kayıt sayılarını göstermek yerine sahipsiz, gecikmiş, onay bekleyen veya başarısız olmuş işleri öne çıkaracaktır.

Enquiry, quote, dealer application ve document request queue’ları ortak list/workspace pattern’i kullanacak; fakat her lifecycle kendi allowed actions, status history, permission, audit ve notification kurallarını koruyacaktır. Triage sonrası aktif commercial record owner ve next action olmadan bırakılmayacaktır.

Product ve document yönetiminde edit, technical approval ve market publication ayrı kararlar olacaktır. UK yayını Ukraine yayınını tetiklemeyecek; approved document file/version değiştirilmeyecek, correction yeni version olarak oluşturulacaktır.

Admin navigation permission-aware olacak fakat UI visibility authorization yerine geçmeyecektir. Internal production access MFA, server-side permission, market/company scope ve audit ile korunacaktır. Critical actions direct backend validation’dan geçecek; user interface üzerinden saklanmış olmaları güvenlik sayılmayacaktır.

Sales Operations MVP önce Dashboard, Inbox, Quotes, Dealer Applications, Document Requests, basic Companies, Product/Document operations, invitations ve notification failures ile başlayacaktır. Partner workspaces, tasks, advanced search, saved views, exports ve opportunity/order modules measured need sonrası V1’e alınacaktır.

Bir sonraki belge `09_PARTNER_PORTAL.md` olmalıdır. Bu dosya approved partner/dealer user experience, company-scoped permissions, portal dashboard, quote visibility, document access, user invitations ve onboarding akışlarını kesinleştirecektir.
