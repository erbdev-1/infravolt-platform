# InfraVolt — Database Schema and Data Model

> Document ID: INF-06  
> Version: 0.1.0  
> Status: Draft for Founder and Technical Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Technical Owner: Product Director / CTO / Head Agent  
> Database Owner: Backend / Data Engineering  
> Database platform: Supabase PostgreSQL  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required locales: en-GB + uk-UA  
> Last updated: 15 July 2026  
> Document language: Turkish; database objects and code identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt platformunun canonical relational data modelini tanımlar.

Belge:

- PostgreSQL schema sınırlarını,
- tablo ve kolon adlarını,
- primary/foreign key ilişkilerini,
- lifecycle status değerlerini,
- unique/check constraint’leri,
- index stratejisini,
- Row Level Security modelini,
- storage metadata ilişkilerini,
- transaction ve RPC sınırlarını,
- migration, seed ve test kurallarını

kesinleştirir.

Bu belge doğrudan tek parça production migration değildir. Her release fazı bu modelden yalnız kendi kapsamındaki tabloları versioned SQL migration olarak çıkaracaktır.

---

## 2. Ana Karar

InfraVolt’un verisi Supabase managed PostgreSQL içinde tutulacaktır.

Şema:

- normalize edilmiş relational core,
- market-specific publication/localization records,
- company-scoped authorization,
- immutable commercial snapshots,
- private operational tables,
- default-deny RLS

üzerine kurulacaktır.

Target catalogue yaklaşık 100 mantıksal tablodur. Bu sayı bir “ilk migration hedefi” değildir. Foundation ve MVP yalnız ihtiyaç duyduğu çekirdek tabloları oluşturur; V1 ve conditional tablolar ilgili feature onaylandığında eklenir.

---

## 3. Veri Modeli Hedefleri

- UK ve Ukraine içeriğini aynı entity identity ile fakat bağımsız publish state ile yönetmek
- Product technical data’nın kaynağını ve değişimini izlemek
- Company, contact, partner ve internal account ilişkilerini doğru scope etmek
- Quote submission’ı atomic ve idempotent kaydetmek
- Private document erişimini company/project/user seviyesinde kontrol etmek
- Admin işlemlerini audit edebilmek
- Public, portal ve admin için güvenli ve minimal read projections üretmek
- Catalog, CRM ve content verisini JSON blob içine gömmemek
- Daha sonraki API ve workflow belgelerine kararlı contract sağlamak

---

## 4. Tasarım İlkeleri

### 4.1 Stable identity, localised presentation

Product, industry, document ve page bir stable UUID’ye sahiptir. İsim, slug ve SEO alanları market/localization tablolarında tutulur.

### 4.2 Publish is explicit

Bir entity oluşturulunca public olmaz. Her market için ayrı publication record ve `published` state gerekir.

### 4.3 Database constraints protect invariants

Application validation önemli olsa da duplicate slug, invalid quantity, one-active-membership veya inconsistent status gibi kurallar database constraint ile de korunur.

### 4.4 JSONB is exception, not default

JSONB yalnız:

- immutable submission snapshot,
- provider metadata,
- flexible non-query configuration,
- audit diff

için kullanılır. Sık filtrelenen veya ilişki kurulan alanlar gerçek kolon/tablo olur.

### 4.5 Business records are not casually deleted

Quote, dealer application, document access ve audit kayıtları cascade ile kaybolmaz. Lifecycle state, archive veya controlled anonymization kullanılır.

### 4.6 RLS is defense in depth

Application DAL yetkilendirme yapar; RLS database seviyesinde ikinci güvenlik sınırıdır.

### 4.7 Notifications are derivative

Email provider record canonical business record değildir. Önce business transaction, sonra outbox.

---

## 5. PostgreSQL Schema Sınırları

| Schema | Access | Purpose |
|---|---|---|
| `public` | Data API’ye açık; grants + RLS zorunlu | Application domain tables, safe views and approved RPC entry points |
| `private` | Data API additional schemas listesine eklenmez | Outbox, audit, security, rate limits, idempotency, helper functions |
| `auth` | Supabase-managed | Authentication identities and sessions |
| `storage` | Supabase-managed | Bucket and object metadata; direct writes prohibited |
| `extensions` | Platform convention | Approved PostgreSQL extensions |

### 5.1 Private schema rule

`private` tablolar browser client tarafından doğrudan okunmaz. Server-only DAL veya narrow security-definer function üzerinden erişilir.

### 5.2 Managed schemas rule

`auth` ve `storage` schema tablolarına application migration ile ownership-changing veya destructive operation yapılmaz.

---

## 6. Approved Extensions

| Extension | Purpose | Phase |
|---|---|---|
| `pgcrypto` | UUID/random cryptographic helpers | Foundation |
| `citext` | Case-insensitive email/domain/code uniqueness | Foundation |
| `pg_trgm` | Search and similarity | V1 search |
| `unaccent` | Search normalization | V1 search |

Extension installation migration içinde idempotent olur.

~~~sql
create extension if not exists pgcrypto with schema extensions;
create extension if not exists citext with schema extensions;
~~~

---

## 7. Global Naming Standard

### 7.1 Object names

- Table: plural `snake_case`
- Column: singular `snake_case`
- Primary key: `id`
- Foreign key: `{entity}_id`
- Boolean: `is_*`, `has_*`, `can_*`
- Timestamp: `*_at`
- Date: `*_on`
- Count: `*_count`
- Status: `status`
- External provider ID: `{provider}_id`

### 7.2 Constraint names

~~~text
pk_{table}
fk_{table}_{column}
uq_{table}_{columns}
ck_{table}_{rule}
ex_{table}_{rule}
~~~

### 7.3 Index names

~~~text
idx_{table}_{columns}
idx_{table}_{purpose}
~~~

### 7.4 RLS policy names

~~~text
{table}_{operation}_{actor}_{scope}
~~~

Örnek:

~~~text
quotes_select_partner_company
products_select_public_published
documents_update_technical_manager
~~~

---

## 8. Common Column Patterns

### 8.1 Mutable entity

~~~sql
id uuid primary key default gen_random_uuid(),
created_at timestamptz not null default now(),
created_by uuid null references auth.users(id),
updated_at timestamptz not null default now(),
updated_by uuid null references auth.users(id)
~~~

### 8.2 Archivable entity

~~~sql
archived_at timestamptz null,
archived_by uuid null references auth.users(id)
~~~

### 8.3 Ordered child

~~~sql
sort_order integer not null default 0 check (sort_order >= 0)
~~~

### 8.4 Public-safe reference

Database UUID yerine public confirmation’da `public_reference` kullanılır.

~~~sql
public_reference text not null unique
~~~

Reference sequential business volume açığa çıkarmamalıdır.

### 8.5 Version column

Optimistic concurrency gereken admin records:

~~~sql
row_version integer not null default 1 check (row_version > 0)
~~~

Update `where id = ? and row_version = ?` ile yapılır.

---

## 9. Type Standardı

| Data | PostgreSQL type | Rule |
|---|---|---|
| Entity ID | `uuid` | `gen_random_uuid()` |
| Auth user ID | `uuid` | References `auth.users(id)` where permitted |
| Email | `citext` | Trimmed, case-insensitive unique when required |
| Phone | `text` | Normalized E.164 when possible; original optional separately |
| Country | `char(2)` | ISO 3166-1 alpha-2 uppercase |
| Locale | `text` | Approved BCP 47 value |
| Market key | `text` | `uk`, `ua` |
| URL/slug | `text` | Lowercase normalized by application + constraint/index |
| Quantity | `numeric(18,4)` | Greater than zero where required |
| Money | `numeric(19,4)` | Not public MVP; never float |
| Percentage | `numeric(7,4)` | Explicit scale |
| Timestamp | `timestamptz` | UTC storage |
| Date only | `date` | No timezone semantics |
| Coordinates percent | `numeric(6,3)` | 0–100 |
| Flexible metadata | `jsonb` | Size and shape validated |
| IP/network | `inet` | Only if retention/legal policy permits |

---

## 10. Status Modelling

PostgreSQL native enum yalnız gerçekten sabit bir value set için düşünülür. Business lifecycle status’ları `text + check constraint` kullanır; böylece controlled migration ile genişletilebilir.

### 10.1 Publication status

~~~text
draft | review | published | archived
~~~

### 10.2 Company status

~~~text
prospect | active | inactive | blocked | archived
~~~

### 10.3 Membership status

~~~text
invited | active | suspended | revoked
~~~

### 10.4 Enquiry status

~~~text
new | triage | in_progress | waiting_customer | resolved | closed | spam
~~~

### 10.5 Quote status

~~~text
new | triage | qualified | preparing | sent | revision_requested |
won | lost | cancelled | archived
~~~

### 10.6 Dealer application status

~~~text
draft | submitted | under_review | information_requested |
approved | rejected | withdrawn
~~~

### 10.7 Document status

~~~text
draft | review | approved | published_metadata | superseded |
withdrawn | archived
~~~

### 10.8 File status

~~~text
quarantine | pending_review | approved | rejected | deleted
~~~

### 10.9 Notification status

~~~text
pending | processing | sent | failed | dead | cancelled
~~~

---

## 11. Release Phase Labels

| Label | Meaning |
|---|---|
| `FND` | Foundation before public feature work |
| `PUB` | Public Website MVP |
| `OPS` | Sales Operations MVP |
| `UA` | Ukraine Market Release |
| `V1` | Approved post-MVP capability |
| `COND` | Create only when dependent feature is approved |

Bir tabloda `V1` yazması ilk migration’a eklenmesi gerektiği anlamına gelmez.

---

## 12. Target Table Catalogue

### 12.1 Market, content and platform

| # | Table | Phase | Purpose |
|---:|---|---|---|
| 1 | `public.markets` | FND | Market identity and defaults |
| 2 | `public.domains` | FND | Allowlisted/canonical hosts |
| 3 | `public.route_definitions` | FND | Stable route keys |
| 4 | `public.route_localizations` | PUB/UA | Market pathnames and SEO pairing |
| 5 | `public.redirect_rules` | PUB | Managed redirects |
| 6 | `public.site_settings` | FND | Market-scoped non-secret settings |
| 7 | `public.feature_flags` | FND | Feature definitions |
| 8 | `public.feature_flag_scopes` | FND | Environment/market scope |
| 9 | `public.content_pages` | PUB | Stable page identity |
| 10 | `public.page_market_publications` | PUB/UA | Page lifecycle by market |
| 11 | `public.page_localizations` | PUB/UA | Localized page copy and SEO |
| 12 | `public.navigation_menus` | PUB | Menu identity |
| 13 | `public.navigation_items` | PUB | Menu hierarchy and targets |
| 14 | `public.navigation_item_localizations` | PUB/UA | Localized navigation labels |
| 15 | `public.file_assets` | PUB/OPS | Canonical storage object metadata |
| 16 | `public.media_assets` | PUB | Public/staging visual asset metadata |
| 17 | `public.media_variants` | V1 | Responsive/derived media variants |
| 18 | `public.tags` | V1 | Stable tagging identity |
| 19 | `public.tag_localizations` | V1/UA | Localized tag labels |

### 12.2 Identity, CRM and authorization

| # | Table | Phase | Purpose |
|---:|---|---|---|
| 20 | `public.user_profiles` | FND | Application profile for `auth.users` |
| 21 | `public.user_preferences` | V1 | Locale and UI preferences |
| 22 | `public.roles` | FND | Application roles |
| 23 | `public.permissions` | FND | Atomic permission catalogue |
| 24 | `public.role_permissions` | FND | Role-permission mapping |
| 25 | `public.companies` | OPS | Company master |
| 26 | `public.company_addresses` | OPS | Typed company addresses |
| 27 | `public.contacts` | OPS | Person/contact master |
| 28 | `public.company_contacts` | OPS | Contact-company relationship |
| 29 | `public.company_memberships` | FND/V1 | Auth user-company membership |
| 30 | `public.membership_roles` | FND/V1 | Membership role mapping |
| 31 | `public.user_invitations` | FND/V1 | Auditable invitation workflow |
| 32 | `public.company_market_scopes` | V1 | Partner/company market authorization |

### 12.3 Product catalogue

| # | Table | Phase | Purpose |
|---:|---|---|---|
| 33 | `public.manufacturers` | PUB | Manufacturer identity |
| 34 | `public.product_families` | PUB | Product family identity |
| 35 | `public.product_family_localizations` | PUB/UA | Family label/copy |
| 36 | `public.product_categories` | PUB | Hierarchical categories |
| 37 | `public.product_category_localizations` | PUB/UA | Category label/slug/SEO |
| 38 | `public.products` | PUB | Stable technical product identity |
| 39 | `public.product_market_publications` | PUB/UA | Availability and publish state |
| 40 | `public.product_localizations` | PUB/UA | Localized product content |
| 41 | `public.attribute_definitions` | PUB | Technical attribute definitions |
| 42 | `public.attribute_definition_localizations` | PUB/UA | Attribute labels/help |
| 43 | `public.attribute_options` | PUB | Controlled categorical values |
| 44 | `public.attribute_option_localizations` | PUB/UA | Option labels |
| 45 | `public.product_attribute_values` | PUB | Typed product specifications |
| 46 | `public.product_relations` | V1 | Related/compatible/accessory links |
| 47 | `public.product_media` | PUB | Product-media mapping |
| 48 | `public.product_tags` | V1 | Product-tag mapping |
| 49 | `public.product_external_codes` | V1 | Manufacturer/market/code identifiers |

### 12.4 Industries, maps and references

| # | Table | Phase | Purpose |
|---:|---|---|---|
| 50 | `public.industries` | PUB | Stable industry identity |
| 51 | `public.industry_market_publications` | PUB/UA | Market publish state |
| 52 | `public.industry_localizations` | PUB/UA | Localized industry content |
| 53 | `public.industry_product_links` | PUB | Industry-product relevance |
| 54 | `public.application_maps` | PUB | Application Map identity/config |
| 55 | `public.application_map_localizations` | PUB/UA | Map title/instructions |
| 56 | `public.application_hotspots` | PUB | Coordinate and stable hotspot identity |
| 57 | `public.application_hotspot_localizations` | PUB/UA | Hotspot labels/copy |
| 58 | `public.application_hotspot_products` | PUB | Hotspot-product mapping |
| 59 | `public.project_references` | V1 | Reference/case-study identity |
| 60 | `public.project_reference_market_publications` | V1/UA | Reference publication |
| 61 | `public.project_reference_localizations` | V1/UA | Localized case-study copy |
| 62 | `public.project_reference_products` | V1 | Reference-product relation |
| 63 | `public.project_reference_industries` | V1 | Reference-industry relation |

### 12.5 Technical resources

| # | Table | Phase | Purpose |
|---:|---|---|---|
| 64 | `public.resource_types` | PUB | Datasheet/certificate/catalogue types |
| 65 | `public.resource_type_localizations` | PUB/UA | Localized resource type labels |
| 66 | `public.documents` | OPS | Stable document identity and policy |
| 67 | `public.document_versions` | OPS | Immutable version/file records |
| 68 | `public.document_market_publications` | OPS/UA | Market metadata publication |
| 69 | `public.document_product_links` | OPS | Document-product mapping |
| 70 | `public.document_industry_links` | V1 | Document-industry mapping |
| 71 | `public.document_company_grants` | V1 | Company access grants |
| 72 | `public.document_project_grants` | V1 | Project access grants |
| 73 | `public.document_access_requests` | OPS | Request lifecycle |
| 74 | `public.document_access_grants` | OPS/V1 | User/company/project grant result |
| 75 | `public.document_access_events` | OPS | Issue/download/deny audit trail |
| 76 | `public.certifications` | V1 | Certificate-specific structured data |
| 77 | `public.certification_products` | V1 | Certificate-product coverage |

### 12.6 Commercial operations

| # | Table | Phase | Purpose |
|---:|---|---|---|
| 78 | `public.customer_projects` | OPS/V1 | Customer project identity |
| 79 | `public.enquiries` | OPS | Contact/project/technical enquiries |
| 80 | `public.enquiry_context_items` | OPS | Product/industry/document context |
| 81 | `public.enquiry_attachments` | COND | Private attachment mapping |
| 82 | `public.quotes` | OPS | Quote request/commercial record |
| 83 | `public.quote_items` | OPS | Requested products and snapshots |
| 84 | `public.quote_status_history` | OPS | Immutable status transitions |
| 85 | `public.quote_assignments` | OPS | Internal assignee history |
| 86 | `public.quote_activities` | OPS | Calls/emails/tasks/customer updates |
| 87 | `public.quote_attachments` | COND/V1 | Quote file mapping |
| 88 | `public.internal_notes` | OPS | Restricted notes on business records |

### 12.7 Dealer and partner operations

| # | Table | Phase | Purpose |
|---:|---|---|---|
| 89 | `public.dealer_applications` | OPS | Dealer application lifecycle |
| 90 | `public.dealer_application_products` | OPS | Product interest mapping |
| 91 | `public.dealer_reviews` | OPS | Structured review decisions |
| 92 | `public.partner_profiles` | V1 | Approved company partner settings |
| 93 | `public.partner_market_scopes` | V1 | Partner market permissions |
| 94 | `public.partner_product_scopes` | V1 | Partner product/family scope |

### 12.8 Private operational tables

| # | Table | Phase | Purpose |
|---:|---|---|---|
| 95 | `private.idempotency_keys` | OPS | Duplicate mutation protection |
| 96 | `private.form_rate_limits` | OPS | Atomic public form rate limiting |
| 97 | `private.notification_templates` | OPS | Versioned email template registry |
| 98 | `private.notification_outbox` | OPS | Durable send queue |
| 99 | `private.notification_deliveries` | OPS | Provider attempts and results |
| 100 | `private.provider_webhook_events` | OPS | Idempotent webhook ingestion |
| 101 | `private.audit_events` | FND/OPS | Immutable privileged/business audit |
| 102 | `private.security_events` | FND | Auth/abuse/security events |
| 103 | `private.job_runs` | OPS | Scheduled job execution |
| 104 | `private.data_export_jobs` | COND/V1 | Controlled export lifecycle |

### 12.9 Count interpretation

- Target catalogue: 104 tables
- First Foundation migration: approximately 15–20 tables
- Public + Sales Operations MVP cumulative target: approximately 60–70 tables
- V1/conditional tables are not created until their feature is approved

Table count architecture quality metric değildir. Her table repeated business need, permission boundary veya relational integrity gerekçesi taşır.

---

## 13. High-Level ERD — Identity and Company

~~~mermaid
erDiagram
    AUTH_USERS ||--|| USER_PROFILES : extends
    AUTH_USERS ||--o{ COMPANY_MEMBERSHIPS : has
    COMPANIES ||--o{ COMPANY_MEMBERSHIPS : contains
    COMPANY_MEMBERSHIPS ||--o{ MEMBERSHIP_ROLES : receives
    ROLES ||--o{ MEMBERSHIP_ROLES : assigns
    ROLES ||--o{ ROLE_PERMISSIONS : includes
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : maps
~~~

---

## 14. High-Level ERD — Catalogue and Market Content

~~~mermaid
erDiagram
    MANUFACTURERS ||--o{ PRODUCTS : owns
    PRODUCT_CATEGORIES ||--o{ PRODUCTS : classifies
    PRODUCTS ||--o{ PRODUCT_MARKET_PUBLICATIONS : publishes
    MARKETS ||--o{ PRODUCT_MARKET_PUBLICATIONS : scopes
    PRODUCTS ||--o{ PRODUCT_LOCALIZATIONS : translates
    PRODUCTS ||--o{ PRODUCT_ATTRIBUTE_VALUES : specifies
    ATTRIBUTE_DEFINITIONS ||--o{ PRODUCT_ATTRIBUTE_VALUES : defines
~~~

---

## 15. High-Level ERD — Quote and Enquiry

~~~mermaid
erDiagram
    COMPANIES ||--o{ QUOTES : requests
    CONTACTS ||--o{ QUOTES : submits
    CUSTOMER_PROJECTS ||--o{ QUOTES : groups
    QUOTES ||--|{ QUOTE_ITEMS : contains
    PRODUCTS ||--o{ QUOTE_ITEMS : references
    QUOTES ||--o{ QUOTE_STATUS_HISTORY : transitions
    QUOTES ||--o{ QUOTE_ACTIVITIES : records
~~~

---

## 16. High-Level ERD — Documents

~~~mermaid
erDiagram
    DOCUMENTS ||--|{ DOCUMENT_VERSIONS : versions
    DOCUMENTS ||--o{ DOCUMENT_PRODUCT_LINKS : covers
    PRODUCTS ||--o{ DOCUMENT_PRODUCT_LINKS : documented
    DOCUMENTS ||--o{ DOCUMENT_ACCESS_REQUESTS : requested
    DOCUMENT_ACCESS_REQUESTS ||--o{ DOCUMENT_ACCESS_GRANTS : resolves
    DOCUMENT_VERSIONS ||--o{ DOCUMENT_ACCESS_EVENTS : accessed
    FILE_ASSETS ||--o{ DOCUMENT_VERSIONS : stores
~~~

---

## 17. High-Level ERD — Dealer to Partner

~~~mermaid
erDiagram
    COMPANIES ||--o{ DEALER_APPLICATIONS : submits
    CONTACTS ||--o{ DEALER_APPLICATIONS : represents
    DEALER_APPLICATIONS ||--o{ DEALER_REVIEWS : reviewed
    DEALER_APPLICATIONS ||--o{ DEALER_APPLICATION_PRODUCTS : requests
    DEALER_APPLICATIONS ||--o| PARTNER_PROFILES : approves_to
    PARTNER_PROFILES ||--o{ PARTNER_MARKET_SCOPES : authorizes
~~~

---

## 18. Foreign Key Delete Policy

| Relationship type | `ON DELETE` baseline |
|---|---|
| Entity → localization | `CASCADE` before entity has business history |
| Entity → publication | `CASCADE` for draft-only content; production delete restricted by service |
| Entity → join table | `CASCADE` |
| Company → quote/enquiry/application | `RESTRICT` |
| Contact → quote/enquiry/application | `RESTRICT` or anonymize, not cascade |
| User → audit/history | `SET NULL` only where actor may be removed |
| Product → quote item | `RESTRICT`; quote snapshot must survive |
| Document → version | `RESTRICT`; version history preserved |
| File asset → document version | `RESTRICT` |
| Role → membership role | `RESTRICT` if assigned |
| Market → publication | `RESTRICT` |

Business history bulunan root entity hard delete edilmez.

---

## 19. Market and Domain Tables

### 19.1 `public.markets`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `key` | text | No | Unique; `uk` or `ua` |
| `name` | text | No | Internal display name |
| `default_locale` | text | No | `en-GB` or `uk-UA` |
| `country_code` | char(2) | No | `GB` or `UA` |
| `timezone` | text | No | IANA timezone |
| `is_enabled` | boolean | No | Default false except approved market |
| `launch_status` | text | No | `planned`, `internal`, `live`, `paused` |
| standard audit columns | — | — | Mutable entity pattern |

Constraints:

- Unique `lower(key)`
- Approved locale format check
- `live` requires `is_enabled = true`

Seed:

| key | default_locale | country_code |
|---|---|---|
| `uk` | `en-GB` | `GB` |
| `ua` | `uk-UA` | `UA` |

### 19.2 `public.domains`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `market_id` | uuid | Yes | FK markets; protected host may be market-neutral |
| `host` | citext | No | Unique normalized hostname, no protocol/path |
| `surface` | text | No | `public`, `protected` |
| `is_canonical` | boolean | No | One canonical public host per market |
| `redirect_to_domain_id` | uuid | Yes | Self FK for aliases |
| `environment` | text | No | `preview`, `staging`, `production` |
| `is_active` | boolean | No | Allowlist control |
| standard audit columns | — | — | — |

Indexes/constraints:

- `uq_domains_host_environment`
- Partial unique canonical public host per `(market_id, environment)`
- Self redirect cannot target self
- Canonical domain cannot have `redirect_to_domain_id`

### 19.3 `public.route_definitions`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `key` | text | No | Unique stable key |
| `surface` | text | No | public/admin/portal/auth |
| `entity_type` | text | Yes | For dynamic content route |
| `is_indexable` | boolean | No | Default false |
| `is_enabled` | boolean | No | — |
| `sort_order` | integer | No | — |

Example keys: `home`, `products`, `product_detail`, `industries`, `resources`, `quote`, `contact`.

### 19.4 `public.route_localizations`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `route_definition_id` | uuid | No | FK |
| `market_id` | uuid | No | FK |
| `locale` | text | No | Approved for market |
| `path_pattern` | text | No | Starts `/`; no host/query |
| `title_template` | text | Yes | Optional SEO template |
| `is_active` | boolean | No | — |

Unique:

- `(route_definition_id, market_id, locale)`
- `(market_id, locale, path_pattern)`

### 19.5 `public.redirect_rules`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `market_id` | uuid | No | FK |
| `source_path` | text | No | Exact normalized path |
| `target_path` | text | No | Same-market path baseline |
| `status_code` | smallint | No | 301, 302, 307, 308 |
| `reason` | text | Yes | Admin note |
| `is_active` | boolean | No | — |
| `starts_at` | timestamptz | Yes | — |
| `ends_at` | timestamptz | Yes | — |

Checks:

- Source and target differ
- No redirect chain at publish validation
- Unique active `(market_id, source_path)` via partial unique index

---

## 20. Platform Configuration Tables

### 20.1 `public.site_settings`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `market_id` | uuid | Yes | Null means global |
| `key` | text | No | Controlled setting key |
| `value` | jsonb | No | Non-secret only |
| `value_type` | text | No | `string`, `number`, `boolean`, `json` |
| `description` | text | Yes | — |
| standard audit columns | — | — | — |

Unique: `(market_id, key)` with null-safe uniqueness.

Prohibited values:

- API keys
- SMTP credentials
- webhook secret
- session secret

### 20.2 `public.feature_flags`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `key` | text | No | Unique |
| `description` | text | No | — |
| `default_enabled` | boolean | No | Default false |
| `owner` | text | No | Team/role |
| `expires_on` | date | Yes | Cleanup date |
| standard audit columns | — | — | — |

### 20.3 `public.feature_flag_scopes`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `feature_flag_id` | uuid | No | FK |
| `market_id` | uuid | Yes | Optional market override |
| `environment` | text | No | local/preview/staging/production |
| `is_enabled` | boolean | No | — |
| `config` | jsonb | No | Default `{}`; non-secret |

Unique: `(feature_flag_id, market_id, environment)` with null-safe semantics.

---

## 21. Content Page Tables

### 21.1 `public.content_pages`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `page_type` | text | No | `standard`, `landing`, `legal`, `coverage`, `about` |
| `route_key` | text | Yes | Stable special route link |
| `internal_name` | text | No | Admin label |
| `schema_version` | integer | No | Structured blocks version |
| `archived_at` | timestamptz | Yes | — |
| standard audit columns | — | — | — |

### 21.2 `public.page_market_publications`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `page_id` | uuid | No | FK |
| `market_id` | uuid | No | FK |
| `status` | text | No | Publication status |
| `slug` | text | No | Market-local slug |
| `published_at` | timestamptz | Yes | Required when published |
| `published_by` | uuid | Yes | Auth user |
| `reviewed_at` | timestamptz | Yes | — |
| `reviewed_by` | uuid | Yes | — |
| `row_version` | integer | No | Optimistic concurrency |
| standard timestamps | — | — | — |

Unique:

- `(page_id, market_id)`
- `(market_id, slug)`

Check: `status = 'published'` requires `published_at`, `published_by`, approved localization.

### 21.3 `public.page_localizations`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `page_id` | uuid | No | FK |
| `market_id` | uuid | No | FK |
| `locale` | text | No | — |
| `title` | text | No | — |
| `summary` | text | Yes | — |
| `content_blocks` | jsonb | No | Versioned validated block schema |
| `seo_title` | text | Yes | — |
| `seo_description` | text | Yes | — |
| `og_media_asset_id` | uuid | Yes | FK media_assets |
| `translation_status` | text | No | `draft`, `review`, `approved` |
| standard audit columns | — | — | — |

Unique: `(page_id, market_id, locale)`.

`content_blocks` is allowed JSONB because blocks are presentation content, versioned and not core relational business data.

---

## 22. Navigation Tables

### 22.1 `public.navigation_menus`

Columns:

- `id uuid PK`
- `key text unique`
- `surface text`
- `market_id uuid null FK`
- `is_active boolean`
- audit columns

Examples: `public_primary`, `public_utility`, `public_footer`, `portal_primary`.

### 22.2 `public.navigation_items`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `menu_id` | uuid | No | FK |
| `parent_id` | uuid | Yes | Self FK |
| `route_definition_id` | uuid | Yes | FK |
| `entity_type` | text | Yes | Optional content target |
| `entity_id` | uuid | Yes | Validated by service |
| `external_url` | text | Yes | Allowlisted scheme |
| `sort_order` | integer | No | — |
| `is_enabled` | boolean | No | — |
| `visibility_rule` | jsonb | No | Non-security presentation condition |

Exactly one target mode is required: route, entity or external URL.

### 22.3 `public.navigation_item_localizations`

- `id uuid PK`
- `navigation_item_id uuid FK`
- `market_id uuid FK`
- `locale text`
- `label text`
- `description text null`
- `aria_label text null`
- unique `(navigation_item_id, market_id, locale)`

Navigation visibility authorization yerine kullanılamaz.

---

## 23. File and Media Tables

### 23.1 `public.file_assets`

Canonical file metadata tablosudur. File bytes Supabase Storage içindedir.

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `bucket_id` | text | No | Approved bucket |
| `object_path` | text | No | Opaque path; unique per bucket |
| `original_filename` | text | No | Sanitized display metadata |
| `mime_type` | text | No | Validated |
| `size_bytes` | bigint | No | `>= 0` |
| `sha256` | text | Yes | 64 lowercase hex chars |
| `status` | text | No | File status |
| `visibility` | text | No | `public`, `private`, `internal` |
| `uploaded_by` | uuid | Yes | Auth user or null public flow |
| `upload_session_id` | uuid | Yes | Public upload correlation |
| `scan_status` | text | No | `not_required`, `pending`, `clean`, `infected`, `failed` |
| `scan_completed_at` | timestamptz | Yes | — |
| `approved_by` | uuid | Yes | — |
| `approved_at` | timestamptz | Yes | — |
| `metadata` | jsonb | No | Default `{}` |
| standard timestamps | — | — | — |

Unique: `(bucket_id, object_path)`.

Checks:

- Approved private files require clean/not-required scan according to policy.
- Public visibility only approved file status.
- Object path cannot contain `..`, backslash or control characters.

### 23.2 `public.media_assets`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `file_asset_id` | uuid | No | FK |
| `media_type` | text | No | image/video/svg/illustration/map |
| `width_px` | integer | Yes | Positive |
| `height_px` | integer | Yes | Positive |
| `duration_ms` | integer | Yes | Video only |
| `alt_policy` | text | No | `required`, `decorative`, `contextual` |
| `focal_x` | numeric(6,3) | Yes | 0–100 |
| `focal_y` | numeric(6,3) | Yes | 0–100 |
| `copyright_owner` | text | Yes | — |
| `usage_rights` | text | Yes | — |
| `source_reference` | text | Yes | — |
| standard audit columns | — | — | — |

### 23.3 `public.media_variants`

- `id uuid PK`
- `media_asset_id uuid FK`
- `file_asset_id uuid FK`
- `variant_key text`
- `width_px integer`
- `height_px integer`
- `format text`
- unique `(media_asset_id, variant_key)`

Derived variant silinirse original asset etkilenmez.

---

## 24. User and RBAC Tables

### 24.1 `public.user_profiles`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `user_id` | uuid | No | PK + FK `auth.users(id)` |
| `display_name` | text | No | — |
| `given_name` | text | Yes | — |
| `family_name` | text | Yes | — |
| `phone_e164` | text | Yes | — |
| `status` | text | No | invited/active/suspended/deactivated |
| `user_type` | text | No | internal/partner |
| `last_active_at` | timestamptz | Yes | Coarse activity only |
| `created_at` | timestamptz | No | — |
| `updated_at` | timestamptz | No | — |

Email canonical source `auth.users`; duplicate application email column tutulmaz unless search projection requires controlled copy.

### 24.2 `public.user_preferences`

- `user_id uuid PK FK user_profiles`
- `locale text not null`
- `timezone text null`
- `date_format text null`
- `email_preferences jsonb not null default '{}'`
- `ui_preferences jsonb not null default '{}'`
- `updated_at timestamptz`

Preferences authorization data içermez.

### 24.3 `public.roles`

- `id uuid PK`
- `key text unique`
- `name text`
- `scope_type text`: `platform`, `company`
- `is_system boolean`
- `is_assignable boolean`
- `description text`
- audit columns

Seed roles:

- `super_admin`
- `admin`
- `sales_admin`
- `dealer_manager`
- `technical_manager`
- `partner_admin`
- `partner_user`

### 24.4 `public.permissions`

- `id uuid PK`
- `key text unique`
- `resource text`
- `action text`
- `description text`
- `is_sensitive boolean`

### 24.5 `public.role_permissions`

- `role_id uuid FK`
- `permission_id uuid FK`
- `created_at timestamptz`
- `created_by uuid`
- composite PK `(role_id, permission_id)`

Role permission edit critical audit event oluşturur.

---

## 25. Company and Contact Tables

### 25.1 `public.companies`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `legal_name` | text | No | — |
| `trading_name` | text | Yes | — |
| `company_type` | text | No | prospect/customer/partner/etc. |
| `status` | text | No | Company status |
| `registration_country` | char(2) | Yes | ISO |
| `registration_number` | text | Yes | Country-scoped uniqueness when known |
| `vat_number` | text | Yes | Normalized |
| `website_url` | text | Yes | Valid URL |
| `primary_market_id` | uuid | Yes | FK markets |
| `source` | text | No | public_form/import/admin/dealer_application |
| `source_domain_id` | uuid | Yes | FK domains |
| `owner_user_id` | uuid | Yes | Internal owner |
| `row_version` | integer | No | — |
| `archived_at` | timestamptz | Yes | — |
| standard audit columns | — | — | — |

Indexes:

- `idx_companies_status_owner`
- `idx_companies_primary_market_status`
- Trigram on legal/trading name in V1
- Partial unique registration number per country when non-null

### 25.2 `public.company_addresses`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `company_id` | uuid | No | FK |
| `address_type` | text | No | registered/billing/shipping/site/office |
| `line_1` | text | No | — |
| `line_2` | text | Yes | — |
| `city` | text | No | — |
| `region` | text | Yes | — |
| `postal_code` | text | Yes | — |
| `country_code` | char(2) | No | — |
| `is_primary` | boolean | No | — |
| standard audit columns | — | — | — |

Partial unique primary address per `(company_id, address_type)`.

### 25.3 `public.contacts`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `given_name` | text | No | — |
| `family_name` | text | Yes | — |
| `email` | citext | Yes | Normalized |
| `phone_e164` | text | Yes | — |
| `phone_original` | text | Yes | Optional raw user input |
| `job_title` | text | Yes | — |
| `preferred_locale` | text | Yes | — |
| `marketing_consent_status` | text | No | unknown/opted_in/opted_out/not_applicable |
| `marketing_consent_at` | timestamptz | Yes | — |
| `source` | text | No | — |
| `source_domain_id` | uuid | Yes | FK |
| `archived_at` | timestamptz | Yes | — |
| standard audit columns | — | — | — |

At least one of email or phone is required for commercial contact unless internal import exception is explicitly used.

Email globally unique değildir; shared procurement inbox mümkün olabilir. Deduplication service controlled matching kullanır.

### 25.4 `public.company_contacts`

- `id uuid PK`
- `company_id uuid FK`
- `contact_id uuid FK`
- `relationship_type text`: employee/consultant/buyer/technical/other
- `is_primary boolean`
- `starts_on date null`
- `ends_on date null`
- unique active `(company_id, contact_id, relationship_type)`
- partial unique primary commercial contact where business rule requires

### 25.5 `public.company_market_scopes`

- `company_id uuid FK`
- `market_id uuid FK`
- `status text`: active/suspended/revoked
- `starts_at timestamptz`
- `ends_at timestamptz null`
- composite PK `(company_id, market_id)`

---

## 26. Membership and Invitation Tables

### 26.1 `public.company_memberships`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `company_id` | uuid | No | FK |
| `user_id` | uuid | No | FK auth.users |
| `status` | text | No | Membership status |
| `is_primary` | boolean | No | — |
| `invited_at` | timestamptz | Yes | — |
| `activated_at` | timestamptz | Yes | — |
| `suspended_at` | timestamptz | Yes | — |
| `revoked_at` | timestamptz | Yes | — |
| standard audit columns | — | — | — |

Unique active membership `(company_id, user_id)`.

Check: active requires `activated_at`; revoked requires `revoked_at`.

Internal platform users may use a dedicated InfraVolt internal company record, so the same membership/role engine remains consistent.

### 26.2 `public.membership_roles`

- `membership_id uuid FK`
- `role_id uuid FK`
- `market_id uuid null FK`
- `granted_at timestamptz`
- `granted_by uuid`
- `revoked_at timestamptz null`
- `revoked_by uuid null`
- composite identity or surrogate `id`

Partial unique active `(membership_id, role_id, market_id)`.

### 26.3 `public.user_invitations`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `email` | citext | No | — |
| `company_id` | uuid | No | FK |
| `invited_role_id` | uuid | No | FK |
| `market_id` | uuid | Yes | Scope |
| `status` | text | No | pending/accepted/expired/revoked |
| `token_hash` | text | No | Never store raw token |
| `expires_at` | timestamptz | No | — |
| `accepted_at` | timestamptz | Yes | — |
| `accepted_user_id` | uuid | Yes | FK auth.users |
| `invited_by` | uuid | No | Internal actor |
| `created_at` | timestamptz | No | — |

Partial unique pending invitation per `(lower(email), company_id)`.

Raw invite URL/token logs and database’te tutulmaz.

---

## 27. Manufacturer and Product Taxonomy Tables

### 27.1 `public.manufacturers`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `key` | text | No | Unique stable identifier |
| `legal_name` | text | No | — |
| `display_name` | text | No | — |
| `website_url` | text | Yes | — |
| `country_code` | char(2) | Yes | — |
| `logo_media_asset_id` | uuid | Yes | FK |
| `is_active` | boolean | No | — |
| standard audit columns | — | — | — |

Initial seed can include Gersan only; InfraVolt remains distributor/platform identity rather than fake manufacturer record unless it owns a product line.

### 27.2 `public.product_families`

- `id uuid PK`
- `manufacturer_id uuid FK`
- `key text`
- `internal_name text`
- `sort_order integer`
- `is_active boolean`
- audit columns
- unique `(manufacturer_id, key)`

Examples: busbar, cable_support, earthing_lightning, distribution_panels, underfloor, ev_charging.

### 27.3 `public.product_family_localizations`

- `id uuid PK`
- `product_family_id uuid FK`
- `market_id uuid FK`
- `locale text`
- `name text`
- `short_description text null`
- `seo_title text null`
- `seo_description text null`
- unique `(product_family_id, market_id, locale)`

### 27.4 `public.product_categories`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `manufacturer_id` | uuid | Yes | Null for cross-manufacturer taxonomy |
| `product_family_id` | uuid | No | FK |
| `parent_id` | uuid | Yes | Self FK |
| `key` | text | No | Stable category key |
| `internal_name` | text | No | — |
| `depth` | smallint | No | Maintained/validated |
| `sort_order` | integer | No | — |
| `is_active` | boolean | No | — |
| standard audit columns | — | — | — |

Constraints:

- No self parent
- Parent belongs to same family
- Max supported depth baseline 4
- Cycle prevention function/trigger
- Unique `(product_family_id, key)`

### 27.5 `public.product_category_localizations`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `product_category_id` | uuid | No | FK |
| `market_id` | uuid | No | FK |
| `locale` | text | No | — |
| `name` | text | No | — |
| `slug` | text | No | — |
| `short_description` | text | Yes | — |
| `body_blocks` | jsonb | No | Default `[]` |
| `seo_title` | text | Yes | — |
| `seo_description` | text | Yes | — |
| `translation_status` | text | No | draft/review/approved |

Unique:

- `(product_category_id, market_id, locale)`
- `(market_id, locale, slug)`

---

## 28. Product Core Tables

### 28.1 `public.products`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `manufacturer_id` | uuid | No | FK |
| `product_family_id` | uuid | No | FK |
| `primary_category_id` | uuid | No | FK |
| `parent_product_id` | uuid | Yes | Optional range/model parent |
| `product_type` | text | No | `range`, `model`, `component`, `accessory`, `service` |
| `manufacturer_code` | citext | Yes | Controlled source code |
| `internal_code` | citext | No | Unique InfraVolt code |
| `technical_status` | text | No | draft/verification/approved/obsolete |
| `lifecycle_status` | text | No | active/discontinued/superseded/archived |
| `technical_source` | text | Yes | Manufacturer document/reference |
| `technical_verified_at` | timestamptz | Yes | — |
| `technical_verified_by` | uuid | Yes | Technical manager |
| `superseded_by_product_id` | uuid | Yes | Self FK |
| `row_version` | integer | No | — |
| standard audit/archive columns | — | — | — |

Constraints:

- Primary category belongs to product family
- Product cannot supersede itself
- Approved technical status requires verifier and timestamp
- Unique `lower(internal_code)`
- Manufacturer code unique within manufacturer when non-null

### 28.2 `public.product_market_publications`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `product_id` | uuid | No | FK |
| `market_id` | uuid | No | FK |
| `status` | text | No | Publication status |
| `is_available` | boolean | No | Commercial availability |
| `availability_note` | text | Yes | Internal/public-safe controlled note |
| `published_at` | timestamptz | Yes | — |
| `published_by` | uuid | Yes | — |
| `reviewed_at` | timestamptz | Yes | — |
| `reviewed_by` | uuid | Yes | — |
| `effective_from` | timestamptz | Yes | — |
| `effective_to` | timestamptz | Yes | — |
| `row_version` | integer | No | — |
| standard timestamps | — | — | — |

Unique `(product_id, market_id)`.

Publish invariant:

- Product technical status approved
- Approved localization exists
- Primary media or approved “no image” state
- Required attributes satisfied
- Market is enabled

### 28.3 `public.product_localizations`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `product_id` | uuid | No | FK |
| `market_id` | uuid | No | FK |
| `locale` | text | No | — |
| `name` | text | No | — |
| `slug` | text | No | — |
| `short_description` | text | No | — |
| `overview_blocks` | jsonb | No | Versioned content blocks |
| `application_notes` | text | Yes | — |
| `technical_disclaimer` | text | Yes | — |
| `seo_title` | text | Yes | — |
| `seo_description` | text | Yes | — |
| `translation_status` | text | No | draft/review/approved |
| `translated_from_locale` | text | Yes | Provenance |
| standard audit columns | — | — | — |

Unique:

- `(product_id, market_id, locale)`
- `(market_id, locale, slug)`

Product technical values localization tablosuna string olarak gömülmez.

### 28.4 `public.product_external_codes`

- `id uuid PK`
- `product_id uuid FK`
- `code_type text`: manufacturer/gtin/ean/customs/legacy/partner
- `market_id uuid null FK`
- `issuer text null`
- `code citext`
- `is_primary boolean`
- `valid_from date null`
- `valid_to date null`
- unique active `(code_type, market_id, issuer, code)`

Customs classification expert verification gerektirir; code existence technical/legal approval yerine geçmez.

---

## 29. Technical Attribute Tables

### 29.1 `public.attribute_definitions`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `product_family_id` | uuid | Yes | Family-specific or global |
| `key` | text | No | Stable key |
| `data_type` | text | No | text/number/boolean/option/range/json |
| `unit_code` | text | Yes | Canonical engineering unit |
| `is_filterable` | boolean | No | — |
| `is_comparable` | boolean | No | — |
| `is_required` | boolean | No | — |
| `is_public` | boolean | No | — |
| `sort_order` | integer | No | — |
| `validation_rules` | jsonb | No | Min/max/regex/precision |
| standard audit columns | — | — | — |

Unique `(product_family_id, key)` with global null-safe handling.

### 29.2 `public.attribute_definition_localizations`

- `id uuid PK`
- `attribute_definition_id uuid FK`
- `market_id uuid FK`
- `locale text`
- `label text`
- `short_label text null`
- `help_text text null`
- `unit_label_override text null`
- unique `(attribute_definition_id, market_id, locale)`

### 29.3 `public.attribute_options`

- `id uuid PK`
- `attribute_definition_id uuid FK`
- `key text`
- `sort_order integer`
- `is_active boolean`
- unique `(attribute_definition_id, key)`

### 29.4 `public.attribute_option_localizations`

- `id uuid PK`
- `attribute_option_id uuid FK`
- `market_id uuid FK`
- `locale text`
- `label text`
- unique `(attribute_option_id, market_id, locale)`

### 29.5 `public.product_attribute_values`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `product_id` | uuid | No | FK |
| `attribute_definition_id` | uuid | No | FK |
| `value_text` | text | Yes | Text type |
| `value_number` | numeric(24,8) | Yes | Numeric type |
| `value_boolean` | boolean | Yes | Boolean type |
| `value_option_id` | uuid | Yes | FK option |
| `value_min` | numeric(24,8) | Yes | Range min |
| `value_max` | numeric(24,8) | Yes | Range max |
| `value_json` | jsonb | Yes | Exceptional structured value |
| `unit_code_override` | text | Yes | Only approved conversion case |
| `source_document_version_id` | uuid | Yes | Provenance FK |
| `verified_at` | timestamptz | Yes | — |
| `verified_by` | uuid | Yes | — |
| standard audit columns | — | — | — |

Unique `(product_id, attribute_definition_id)` unless definition explicitly supports multiple values.

Check constraint enforces correct one-of value shape based on definition through service plus validation trigger. Simple SQL constraint ensures at least one and prevents incompatible simultaneous scalar values.

Unit values canonical units in database; localized display conversion is presentation concern unless market engineering standard requires separate approved value.

---

## 30. Product Relationship and Media Tables

### 30.1 `public.product_relations`

- `id uuid PK`
- `source_product_id uuid FK`
- `target_product_id uuid FK`
- `relation_type text`: accessory/compatible/alternative/replacement/required_with/related
- `market_id uuid null FK`
- `sort_order integer`
- `is_bidirectional boolean`
- `notes text null` internal
- unique `(source_product_id, target_product_id, relation_type, market_id)`
- check source differs from target

### 30.2 `public.product_media`

- `id uuid PK`
- `product_id uuid FK`
- `media_asset_id uuid FK`
- `market_id uuid null FK`
- `role text`: primary/gallery/drawing/application/diagram/icon
- `alt_text text null`
- `caption text null`
- `sort_order integer`
- `is_public boolean`
- unique `(product_id, media_asset_id, market_id, role)`

`alt_text` may be moved to a localization child if media becomes heavily reused across locales. MVP product mapping keeps context-specific accessible text.

### 30.3 `public.tags`, `public.tag_localizations`, `public.product_tags`

`tags`:

- `id`, `key`, `tag_type`, `is_active`

`tag_localizations`:

- `tag_id`, `market_id`, `locale`, `label`

`product_tags`:

- composite PK `(product_id, tag_id)`

Tags navigation taxonomy veya authorization mekanizması değildir.

---

## 31. Industry Tables

### 31.1 `public.industries`

- `id uuid PK`
- `key text unique`
- `internal_name text`
- `sort_order integer`
- `is_active boolean`
- audit columns

### 31.2 `public.industry_market_publications`

- `id uuid PK`
- `industry_id uuid FK`
- `market_id uuid FK`
- `status text`
- `published_at`, `published_by`
- `row_version integer`
- unique `(industry_id, market_id)`

### 31.3 `public.industry_localizations`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `industry_id` | uuid | No | FK |
| `market_id` | uuid | No | FK |
| `locale` | text | No | — |
| `name` | text | No | — |
| `slug` | text | No | Unique per market/locale |
| `short_description` | text | No | — |
| `body_blocks` | jsonb | No | — |
| `seo_title` | text | Yes | — |
| `seo_description` | text | Yes | — |
| `translation_status` | text | No | — |

### 31.4 `public.industry_product_links`

- `industry_id uuid FK`
- `product_id uuid FK`
- `relevance_type text`: primary/secondary/example
- `market_id uuid null FK`
- `sort_order integer`
- `application_note text null`
- composite unique `(industry_id, product_id, market_id)`

---

## 32. Application Map Tables

### 32.1 `public.application_maps`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `industry_id` | uuid | No | FK |
| `key` | text | No | Stable key |
| `base_media_asset_id` | uuid | No | Clean base image |
| `status` | text | No | draft/review/published/archived |
| `interaction_version` | integer | No | Data contract version |
| `default_zoom` | numeric(6,3) | Yes | UI config |
| `row_version` | integer | No | — |
| standard audit columns | — | — | — |

Unique `(industry_id, key)`.

### 32.2 `public.application_map_localizations`

- `application_map_id uuid FK`
- `market_id uuid FK`
- `locale text`
- `title text`
- `instruction text`
- `mobile_intro text null`
- `accessibility_summary text`
- `translation_status text`
- unique `(application_map_id, market_id, locale)`

### 32.3 `public.application_hotspots`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `application_map_id` | uuid | No | FK |
| `key` | text | No | Stable key |
| `x_percent` | numeric(6,3) | No | 0–100 |
| `y_percent` | numeric(6,3) | No | 0–100 |
| `radius_percent` | numeric(6,3) | Yes | Positive, bounded |
| `sort_order` | integer | No | Also keyboard/list order |
| `is_active` | boolean | No | — |
| standard audit columns | — | — | — |

Unique `(application_map_id, key)`.

Coordinate values screenshot pixels değil normalized percentage olarak saklanır.

### 32.4 `public.application_hotspot_localizations`

- `hotspot_id uuid FK`
- `market_id uuid FK`
- `locale text`
- `label text`
- `short_description text null`
- `aria_label text`
- unique `(hotspot_id, market_id, locale)`

### 32.5 `public.application_hotspot_products`

- `hotspot_id uuid FK`
- `product_id uuid FK`
- `sort_order integer`
- `relationship_note text null`
- composite PK `(hotspot_id, product_id)`

Only target-market published products public projection’a girer.

---

## 33. Project Reference Tables

### 33.1 `public.project_references`

- `id uuid PK`
- `key text unique`
- `client_display_policy text`: named/anonymized/confidential
- `completion_year smallint null`
- `country_code char(2) null`
- `source_reference text null`
- `technical_verified_at/by`
- audit/archive columns

### 33.2 Publication and localization

`project_reference_market_publications`:

- reference, market, status, publish/review fields, unique pair

`project_reference_localizations`:

- reference, market, locale
- title, slug, summary, body blocks
- client display name only if approved
- SEO fields
- unique market slug

### 33.3 Relation tables

`project_reference_products`:

- reference/product, role, sort order

`project_reference_industries`:

- reference/industry, is_primary, sort order

No confidential customer or project name public localization’a approval olmadan yazılmaz.

---

## 34. Resource Type and Document Tables

### 34.1 `public.resource_types`

- `id uuid PK`
- `key text unique`
- `access_default text`
- `sort_order integer`
- `is_active boolean`

Seed examples:

- datasheet
- catalogue
- installation_guide
- certificate
- test_report
- declaration
- bim
- drawing

### 34.2 `public.resource_type_localizations`

- resource type, market, locale
- name, description
- unique triple

### 34.3 `public.documents`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `resource_type_id` | uuid | No | FK |
| `manufacturer_id` | uuid | Yes | FK |
| `internal_title` | text | No | Admin title |
| `document_code` | citext | Yes | Manufacturer/internal code |
| `status` | text | No | Document status |
| `access_level` | text | No | public/registered/approved_partner/company/project/internal |
| `auto_grant_policy` | text | No | none/verified_contact/active_partner/explicit |
| `current_version_id` | uuid | Yes | FK added after versions exist |
| `owner_user_id` | uuid | Yes | Technical owner |
| `row_version` | integer | No | — |
| standard audit/archive columns | — | — | — |

`current_version_id` must reference same document; enforce with deferred constraint trigger.

### 34.4 `public.document_versions`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `document_id` | uuid | No | FK |
| `version_label` | text | No | Manufacturer/user-visible version |
| `version_number` | integer | No | Internal monotonic integer |
| `file_asset_id` | uuid | No | FK private/approved file |
| `language_code` | text | Yes | Document file language |
| `issued_on` | date | Yes | — |
| `valid_from` | date | Yes | — |
| `valid_until` | date | Yes | — |
| `status` | text | No | draft/review/approved/superseded/withdrawn |
| `checksum_sha256` | text | No | Immutable file proof |
| `approved_at` | timestamptz | Yes | — |
| `approved_by` | uuid | Yes | — |
| `supersedes_version_id` | uuid | Yes | Same document self FK |
| `created_at` | timestamptz | No | — |
| `created_by` | uuid | Yes | — |

Unique:

- `(document_id, version_number)`
- `(document_id, version_label)` when version labels reliable

Approved version’s file reference, checksum and version identity are immutable. Correction creates a new version.

### 34.5 `public.document_market_publications`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `document_id` | uuid | No | FK |
| `market_id` | uuid | No | FK |
| `status` | text | No | Publication status |
| `public_title` | text | No | Localized metadata title |
| `public_summary` | text | Yes | No secret content |
| `slug` | text | No | — |
| `published_at` | timestamptz | Yes | — |
| `published_by` | uuid | Yes | — |
| `download_label` | text | Yes | — |
| `seo_title` | text | Yes | — |
| `seo_description` | text | Yes | — |
| `row_version` | integer | No | — |

Unique `(document_id, market_id)` and `(market_id, slug)`.

Metadata publication file access permission vermez.

---

## 35. Document Relationship and Certification Tables

### 35.1 `public.document_product_links`

- `document_id uuid FK`
- `product_id uuid FK`
- `relationship_type text`: applies_to/references/supersedes_supporting
- `is_primary boolean`
- composite PK `(document_id, product_id, relationship_type)`

### 35.2 `public.document_industry_links`

- `document_id uuid FK`
- `industry_id uuid FK`
- `sort_order integer`
- composite PK `(document_id, industry_id)`

### 35.3 `public.certifications`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `document_id` | uuid | No | FK unique |
| `certificate_number` | text | Yes | — |
| `standard_code` | text | No | e.g. standard identifier |
| `issuing_body` | text | Yes | — |
| `scope_summary` | text | Yes | Internal structured summary |
| `issued_on` | date | Yes | — |
| `valid_until` | date | Yes | — |
| `verification_url` | text | Yes | Allowlisted URL |
| `verification_status` | text | No | unverified/verified/expired/withdrawn |
| `verified_at` | timestamptz | Yes | — |
| `verified_by` | uuid | Yes | — |

Certificate structured record original certificate file yerine geçmez.

### 35.4 `public.certification_products`

- `certification_id uuid FK`
- `product_id uuid FK`
- `coverage_note text null`
- composite PK `(certification_id, product_id)`

---

## 36. Document Access Tables

### 36.1 `public.document_company_grants`

- `id uuid PK`
- `document_id uuid FK`
- `company_id uuid FK`
- `market_id uuid null FK`
- `starts_at timestamptz`
- `expires_at timestamptz null`
- `status text`: active/revoked/expired
- `granted_by uuid`
- `grant_reason text`
- unique active document/company/market

### 36.2 `public.document_project_grants`

- same grant pattern
- `customer_project_id uuid FK`
- unique active document/project

### 36.3 `public.document_access_requests`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `public_reference` | text | No | Unique |
| `document_id` | uuid | No | FK |
| `requested_version_id` | uuid | Yes | FK |
| `market_id` | uuid | No | Source market |
| `source_domain_id` | uuid | No | Source host |
| `requester_user_id` | uuid | Yes | Auth user if logged in |
| `company_id` | uuid | Yes | Known/qualified company |
| `contact_id` | uuid | Yes | Known/created contact |
| `customer_project_id` | uuid | Yes | Optional project |
| `requester_name_snapshot` | text | No | Immutable submission context |
| `requester_email_snapshot` | citext | No | — |
| `company_name_snapshot` | text | Yes | — |
| `reason` | text | Yes | Sanitized user message |
| `status` | text | No | pending/approved/rejected/expired/cancelled |
| `decision_reason` | text | Yes | Internal; never public DTO |
| `decided_at` | timestamptz | Yes | — |
| `decided_by` | uuid | Yes | — |
| `created_at` | timestamptz | No | — |

### 36.4 `public.document_access_grants`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `document_id` | uuid | No | FK |
| `document_version_id` | uuid | Yes | Null means current approved version by policy |
| `request_id` | uuid | Yes | FK access request |
| `user_id` | uuid | Yes | Direct user grant |
| `company_id` | uuid | Yes | Company grant |
| `customer_project_id` | uuid | Yes | Project grant |
| `status` | text | No | active/revoked/expired |
| `starts_at` | timestamptz | No | — |
| `expires_at` | timestamptz | Yes | — |
| `granted_by` | uuid | Yes | Null for approved auto-grant |
| `grant_source` | text | No | manual/request/auto_policy/dealer_approval |
| `revoked_at` | timestamptz | Yes | — |
| `revoked_by` | uuid | Yes | — |

At least one grantee scope: user, company or project. Multiple may exist only if policy explicitly supports combined scope.

### 36.5 `public.document_access_events`

Immutable append-only record:

- `id uuid PK`
- `document_id`, `document_version_id`
- `grant_id null`
- `request_id null`
- `actor_user_id null`
- `company_id null`
- `event_type`: requested/authorized/denied/signed_url_issued/download_started/revoked
- `request_id_correlation text`
- `source_domain_id`, `market_id`
- `reason_code text null`
- `created_at timestamptz`

Signed URL, token veya raw storage URL bu tabloya yazılmaz.

---

## 37. Customer Project Table

### 37.1 `public.customer_projects`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `public_reference` | text | No | Unique |
| `company_id` | uuid | Yes | FK |
| `primary_contact_id` | uuid | Yes | FK |
| `market_id` | uuid | No | FK |
| `name` | text | No | Private business data |
| `project_type` | text | Yes | — |
| `country_code` | char(2) | Yes | — |
| `city_region` | text | Yes | — |
| `status` | text | No | prospect/active/on_hold/won/lost/completed/archived |
| `estimated_start_on` | date | Yes | — |
| `estimated_end_on` | date | Yes | — |
| `owner_user_id` | uuid | Yes | Internal owner |
| `source` | text | No | — |
| `row_version` | integer | No | — |
| standard audit/archive columns | — | — | — |

Customer project public case study değildir. `project_references` ayrı, approved public content entity’sidir.

---

## 38. Enquiry Tables

### 38.1 `public.enquiries`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `public_reference` | text | No | Unique public-safe reference |
| `enquiry_type` | text | No | contact/project_support/technical/document_request/other |
| `status` | text | No | Enquiry status |
| `priority` | text | No | low/normal/high/urgent |
| `market_id` | uuid | No | Trusted server context |
| `source_domain_id` | uuid | No | FK |
| `locale` | text | No | Submission locale |
| `company_id` | uuid | Yes | FK after create/match |
| `contact_id` | uuid | Yes | FK after create/match |
| `customer_project_id` | uuid | Yes | FK |
| `requester_name_snapshot` | text | No | Submitted name |
| `requester_email_snapshot` | citext | No | Submitted email |
| `requester_phone_snapshot` | text | Yes | — |
| `company_name_snapshot` | text | Yes | — |
| `subject` | text | Yes | — |
| `message` | text | No | Sanitized plain text |
| `consent_terms_version` | text | No | Legal copy version |
| `consent_recorded_at` | timestamptz | No | — |
| `assigned_to_user_id` | uuid | Yes | Internal assignee |
| `first_response_at` | timestamptz | Yes | — |
| `resolved_at` | timestamptz | Yes | — |
| `closed_at` | timestamptz | Yes | — |
| `row_version` | integer | No | — |
| `created_at` | timestamptz | No | — |
| `updated_at` | timestamptz | No | — |

Indexes:

- `(status, created_at desc)`
- `(assigned_to_user_id, status, created_at desc)`
- `(market_id, enquiry_type, created_at desc)`
- `contact_id`, `company_id`, `customer_project_id`

### 38.2 `public.enquiry_context_items`

One enquiry can carry selected product, industry, document or Application Map hotspot context.

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `enquiry_id` | uuid | No | FK |
| `context_type` | text | No | product/industry/document/hotspot/category |
| `product_id` | uuid | Yes | FK |
| `industry_id` | uuid | Yes | FK |
| `document_id` | uuid | Yes | FK |
| `hotspot_id` | uuid | Yes | FK |
| `product_category_id` | uuid | Yes | FK |
| `display_snapshot` | jsonb | No | Public label/code at submission |
| `sort_order` | integer | No | — |

Exactly one typed FK must match `context_type`.

### 38.3 `public.enquiry_attachments`

- `enquiry_id uuid FK`
- `file_asset_id uuid FK`
- `attachment_type text`
- `is_customer_visible boolean default false`
- `created_at timestamptz`
- composite PK `(enquiry_id, file_asset_id)`

Only private approved/clean files may be linked.

---

## 39. Quote Tables

### 39.1 `public.quotes`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `public_reference` | text | No | Unique |
| `status` | text | No | Quote lifecycle |
| `market_id` | uuid | No | Trusted market |
| `source_domain_id` | uuid | No | Trusted domain |
| `locale` | text | No | Submission locale |
| `company_id` | uuid | Yes | FK |
| `contact_id` | uuid | Yes | FK |
| `customer_project_id` | uuid | Yes | FK |
| `requester_user_id` | uuid | Yes | Auth partner/public user if any |
| `requester_name_snapshot` | text | No | Immutable submission |
| `requester_email_snapshot` | citext | No | — |
| `requester_phone_snapshot` | text | Yes | — |
| `company_name_snapshot` | text | Yes | — |
| `project_name_snapshot` | text | Yes | — |
| `project_country_code` | char(2) | Yes | — |
| `project_location` | text | Yes | — |
| `required_by_on` | date | Yes | — |
| `message` | text | Yes | Plain text |
| `assigned_to_user_id` | uuid | Yes | Current assignee projection |
| `submitted_at` | timestamptz | No | — |
| `qualified_at` | timestamptz | Yes | — |
| `sent_at` | timestamptz | Yes | Internal quote sent |
| `won_at` | timestamptz | Yes | — |
| `lost_at` | timestamptz | Yes | — |
| `lost_reason_code` | text | Yes | — |
| `consent_terms_version` | text | No | — |
| `row_version` | integer | No | — |
| standard timestamps | — | — | — |

MVP public quote price içermez. Future internal commercial totals nullable ayrı migration ile eklenir; `float` kullanılmaz.

Indexes:

- `(status, submitted_at desc)`
- `(assigned_to_user_id, status, submitted_at desc)`
- `(company_id, submitted_at desc)`
- `(contact_id, submitted_at desc)`
- `(market_id, status, submitted_at desc)`
- `(customer_project_id)`

### 39.2 `public.quote_items`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `quote_id` | uuid | No | FK |
| `product_id` | uuid | Yes | FK; nullable only custom item |
| `line_number` | integer | No | Starts 1 |
| `quantity` | numeric(18,4) | No | `> 0` |
| `unit_code` | text | No | Controlled unit |
| `product_name_snapshot` | text | No | Immutable |
| `product_code_snapshot` | text | Yes | Immutable |
| `configuration_snapshot` | jsonb | No | Selected public options, default `{}` |
| `customer_note` | text | Yes | — |
| `internal_note` | text | Yes | Admin-only, consider notes table for sensitive content |
| `sort_order` | integer | No | — |
| `created_at` | timestamptz | No | — |

Unique `(quote_id, line_number)`.

Product deletion is restricted; snapshot still ensures historical meaning if product later archived.

### 39.3 `public.quote_status_history`

Append-only:

- `id uuid PK`
- `quote_id uuid FK`
- `from_status text null`
- `to_status text`
- `reason_code text null`
- `comment text null`
- `changed_by uuid null`
- `changed_at timestamptz`
- `request_id text`

First row uses `from_status = null`, `to_status = new`.

### 39.4 `public.quote_assignments`

- `id uuid PK`
- `quote_id uuid FK`
- `assigned_to_user_id uuid FK auth.users`
- `assigned_by uuid`
- `assigned_at timestamptz`
- `unassigned_at timestamptz null`
- `reason text null`

Partial unique one active assignment per quote. `quotes.assigned_to_user_id` is current projection maintained transactionally.

### 39.5 `public.quote_activities`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `quote_id` | uuid | No | FK |
| `activity_type` | text | No | call/email/meeting/task/customer_update/system |
| `direction` | text | Yes | inbound/outbound/internal |
| `summary` | text | No | — |
| `occurred_at` | timestamptz | No | — |
| `due_at` | timestamptz | Yes | Task |
| `completed_at` | timestamptz | Yes | — |
| `visibility` | text | No | internal/partner_visible |
| `created_by` | uuid | Yes | — |
| `created_at` | timestamptz | No | — |

Provider email body copy default olarak burada tutulmaz; summary and provider reference sufficient.

### 39.6 `public.quote_attachments`

- quote/file composite link
- `attachment_type`: customer_input/internal_quote/technical_pack/other
- `visibility`: internal/partner
- `uploaded_by`
- timestamps

---

## 40. Generic Internal Notes

### 40.1 `public.internal_notes`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `entity_type` | text | No | company/contact/enquiry/quote/dealer_application/project/document_request |
| `entity_id` | uuid | No | Validated by service/function |
| `body` | text | No | Plain text or approved limited rich text |
| `visibility` | text | No | internal/restricted |
| `is_pinned` | boolean | No | — |
| `created_by` | uuid | No | — |
| `created_at` | timestamptz | No | — |
| `updated_at` | timestamptz | No | — |
| `deleted_at` | timestamptz | Yes | Controlled soft delete |
| `deleted_by` | uuid | Yes | — |

Bu kontrollü polymorphic table istisnadır. Entity existence service + database validation function ile doğrulanır. Public/partner RLS always denied.

---

## 41. Dealer Application Tables

### 41.1 `public.dealer_applications`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `public_reference` | text | No | Unique |
| `status` | text | No | Dealer application lifecycle |
| `market_id` | uuid | No | Source/requested market |
| `source_domain_id` | uuid | No | — |
| `locale` | text | No | — |
| `company_id` | uuid | Yes | Matched/created company |
| `primary_contact_id` | uuid | Yes | Matched/created contact |
| `company_name_snapshot` | text | No | — |
| `contact_name_snapshot` | text | No | — |
| `email_snapshot` | citext | No | — |
| `phone_snapshot` | text | Yes | — |
| `website_snapshot` | text | Yes | — |
| `registration_country` | char(2) | Yes | — |
| `registration_number_snapshot` | text | Yes | — |
| `company_profile` | text | No | Applicant response |
| `territory_requested` | text | Yes | — |
| `sales_channels` | jsonb | No | Validated controlled array |
| `technical_capability` | text | Yes | — |
| `annual_business_band` | text | Yes | Controlled band, not forced exact revenue |
| `consent_terms_version` | text | No | — |
| `submitted_at` | timestamptz | No | — |
| `review_owner_user_id` | uuid | Yes | — |
| `decision_at` | timestamptz | Yes | — |
| `decision_by` | uuid | Yes | — |
| `decision_reason_code` | text | Yes | — |
| `row_version` | integer | No | — |
| standard timestamps | — | — | — |

Application submission auto membership veya partner access oluşturmaz.

### 41.2 `public.dealer_application_products`

- `dealer_application_id uuid FK`
- `product_family_id uuid null FK`
- `product_id uuid null FK`
- `interest_level text`: primary/secondary/exploratory
- `notes text null`
- exactly one family/product
- unique application + selected scope

### 41.3 `public.dealer_reviews`

Append-only structured review:

- `id uuid PK`
- `dealer_application_id uuid FK`
- `review_type text`: initial/commercial/technical/compliance/final
- `outcome text`: pass/fail/more_information/not_applicable
- `summary text`
- `risk_level text`: low/medium/high
- `reviewed_by uuid`
- `reviewed_at timestamptz`
- `evidence jsonb default '{}'` containing references, not raw secrets

Final approval requires approved review rules defined in backend workflow document.

---

## 42. Partner Profile Tables

### 42.1 `public.partner_profiles`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `company_id` | uuid | No | Unique FK |
| `approved_from_application_id` | uuid | Yes | FK |
| `partner_type` | text | No | dealer/distributor/installer/specifier/other |
| `status` | text | No | onboarding/active/suspended/terminated |
| `partner_code` | citext | No | Unique |
| `onboarding_completed_at` | timestamptz | Yes | — |
| `agreement_start_on` | date | Yes | — |
| `agreement_end_on` | date | Yes | — |
| `portal_enabled` | boolean | No | — |
| `document_access_tier` | text | No | Controlled tier |
| `account_manager_user_id` | uuid | Yes | — |
| standard audit columns | — | — | — |

### 42.2 `public.partner_market_scopes`

- `partner_profile_id uuid FK`
- `market_id uuid FK`
- `status text`: active/suspended/revoked
- `territory_note text null`
- `starts_on date`
- `ends_on date null`
- composite PK `(partner_profile_id, market_id)`

### 42.3 `public.partner_product_scopes`

- `id uuid PK`
- `partner_profile_id uuid FK`
- `product_family_id uuid null FK`
- `product_id uuid null FK`
- `scope_type text`: sell/support/access/training
- `starts_on`, `ends_on`
- `status`
- exactly one family/product

Partner product scope exclusive distributorship legal proof değildir; agreement metadata/document relation later legal module may own.

---

## 43. Private Idempotency and Rate Limit Tables

### 43.1 `private.idempotency_keys`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `scope` | text | No | quote_submission/enquiry/dealer/document_request/etc. |
| `key_hash` | text | No | Hash, not raw key if sensitive |
| `request_fingerprint` | text | Yes | Safe hash |
| `status` | text | No | processing/completed/failed |
| `resource_type` | text | Yes | Created entity type |
| `resource_id` | uuid | Yes | Created entity ID |
| `response_snapshot` | jsonb | Yes | Public-safe minimal result |
| `locked_until` | timestamptz | Yes | Recovery from abandoned processing |
| `expires_at` | timestamptz | No | Cleanup |
| `created_at` | timestamptz | No | — |
| `completed_at` | timestamptz | Yes | — |

Unique `(scope, key_hash)`.

### 43.2 `private.form_rate_limits`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `bucket_key_hash` | text | No | Composite PK component |
| `form_type` | text | No | Composite PK component |
| `window_started_at` | timestamptz | No | Composite PK component |
| `request_count` | integer | No | >= 0 |
| `blocked_until` | timestamptz | Yes | — |
| `updated_at` | timestamptz | No | — |

Atomic upsert/increment function kullanılır. Raw IP long-term tutulmaz; exact retention legal/privacy kararına bağlıdır.

---

## 44. Notification Tables

### 44.1 `private.notification_templates`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `key` | text | No | Template key |
| `market_id` | uuid | Yes | Global or market-specific |
| `locale` | text | No | — |
| `version` | integer | No | Monotonic |
| `subject_template` | text | No | — |
| `body_template` | text | No | React email ref or controlled markup |
| `status` | text | No | draft/active/retired |
| `activated_at` | timestamptz | Yes | — |
| `created_by` | uuid | Yes | — |
| `created_at` | timestamptz | No | — |

Unique `(key, market_id, locale, version)`; one active version partial unique.

### 44.2 `private.notification_outbox`

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `event_key` | text | No | Unique business event idempotency key |
| `template_key` | text | No | — |
| `template_version` | integer | Yes | Resolved at enqueue or send |
| `market_id` | uuid | Yes | — |
| `locale` | text | No | — |
| `recipient_to` | citext | No | — |
| `recipient_cc` | jsonb | No | Default `[]` |
| `reply_to` | citext | Yes | — |
| `payload` | jsonb | No | Template variables, minimized |
| `status` | text | No | Notification status |
| `attempt_count` | integer | No | >= 0 |
| `next_attempt_at` | timestamptz | No | — |
| `locked_at` | timestamptz | Yes | — |
| `locked_by` | text | Yes | Worker ID |
| `last_error_code` | text | Yes | Safe code |
| `last_error_message` | text | Yes | Redacted |
| `sent_at` | timestamptz | Yes | — |
| `created_at` | timestamptz | No | — |

Indexes:

- Partial `(next_attempt_at, created_at)` where status in pending/failed
- Unique `event_key`
- Dead rows index for operations

### 44.3 `private.notification_deliveries`

- `id uuid PK`
- `outbox_id uuid FK`
- `attempt_number integer`
- `provider text`
- `provider_message_id text null`
- `provider_status text`
- `response_code text null`
- `error_code text null`
- `started_at`, `completed_at`
- unique `(outbox_id, attempt_number)`
- unique provider message ID when non-null

### 44.4 `private.provider_webhook_events`

- `id uuid PK`
- `provider text`
- `provider_event_id text`
- `event_type text`
- `signature_verified boolean`
- `payload_hash text`
- `payload jsonb` with retention/minimization
- `status text`: received/processed/ignored/failed
- `received_at`, `processed_at`
- unique `(provider, provider_event_id)`

Signature check application boundary’de event trusted kabul edilmeden önce yapılır.

---

## 45. Audit, Security and Job Tables

### 45.1 `private.audit_events`

Append-only:

| Column | Type | Null | Rule |
|---|---|---:|---|
| `id` | uuid | No | PK |
| `occurred_at` | timestamptz | No | Default now |
| `actor_user_id` | uuid | Yes | Null system event |
| `actor_type` | text | No | user/system/provider |
| `action` | text | No | Stable event key |
| `target_type` | text | No | — |
| `target_id` | uuid | Yes | — |
| `market_id` | uuid | Yes | — |
| `company_id` | uuid | Yes | Scope |
| `request_id` | text | Yes | Correlation |
| `reason` | text | Yes | Required for selected actions |
| `before_data` | jsonb | Yes | Redacted safe diff |
| `after_data` | jsonb | Yes | Redacted safe diff |
| `metadata` | jsonb | No | Default `{}` |

No update/delete grants for application roles.

### 45.2 `private.security_events`

- `id uuid PK`
- `event_type text`
- `severity text`: info/warn/high/critical
- `actor_user_id uuid null`
- `request_id text null`
- `source_hash text null`
- `market_id uuid null`
- `outcome text`
- `reason_code text null`
- `metadata jsonb` redacted
- `occurred_at timestamptz`

Examples: invalid invite token, repeated form block, webhook signature failure, cross-company denial, admin MFA issue.

### 45.3 `private.job_runs`

- `id uuid PK`
- `job_key text`
- `scheduled_for timestamptz null`
- `started_at`, `finished_at`
- `status text`: running/succeeded/failed/partial/skipped
- `worker_id text`
- `items_claimed`, `items_succeeded`, `items_failed` integer
- `error_summary text null`
- `metadata jsonb`
- partial unique active run where overlap prohibited

### 45.4 `private.data_export_jobs`

- `id uuid PK`
- `export_type text`
- `requested_by uuid`
- `scope jsonb`
- `status text`: pending/processing/ready/failed/expired
- `file_asset_id uuid null`
- `expires_at timestamptz null`
- `created_at`, `completed_at`
- audit event required

Export files private bucket and short retention use.

---

## 46. Grants and Data API Exposure

### 46.1 Two-layer access

Supabase Data API access iki katmandır:

1. PostgreSQL grants object’e erişim izni verir.
2. RLS hangi row’ların erişilebilir olduğunu belirler.

RLS açık olsa bile gereksiz table/function grant verilmez.

### 46.2 Anonymous role

`anon` role yalnız approved public read views/RPC ve required public mutation RPC entry points’e erişir.

`anon` doğrudan şu tablolara insert yapmaz:

- quotes
- enquiries
- dealer_applications
- document_access_requests
- contacts
- companies

Public submissions security-definer değil, carefully permissioned transaction RPC veya server-only service layer üzerinden yürütülür.

### 46.3 Authenticated role

`authenticated`:

- own profile/preference,
- active company membership scope,
- permitted partner quote/document projections

üzerinde minimum grants alır.

### 46.4 Service role

Service role RLS bypass edebilir. Bu nedenle:

- browser’a verilmez,
- generic client helper olmaz,
- server-only module’da tutulur,
- every privileged use case application authorization içerir,
- critical mutation audit edilir.

---

## 47. RLS Helper Functions

RLS policy tekrarını ve performansını yönetmek için `private` schema’da küçük, stable helper functions kullanılır.

### 47.1 Function list

| Function | Purpose |
|---|---|
| `private.current_user_id()` | `auth.uid()` wrapper where useful |
| `private.is_active_user()` | Active application profile check |
| `private.is_internal_user()` | Active internal membership check |
| `private.is_company_member(uuid)` | Active company membership |
| `private.has_role(text, uuid)` | Role in company/platform scope |
| `private.has_permission(text, uuid, uuid)` | Permission + optional company/market scope |
| `private.can_access_document(uuid, uuid)` | Document/version authorization |
| `private.can_view_quote(uuid)` | Partner company/internal permission |

### 47.2 Security-definer standard

~~~sql
create or replace function private.is_company_member(target_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.company_memberships cm
    join public.user_profiles up on up.user_id = cm.user_id
    where cm.company_id = target_company_id
      and cm.user_id = (select auth.uid())
      and cm.status = 'active'
      and up.status = 'active'
  );
$$;
~~~

Rules:

- `search_path = ''`
- Fully qualified object names
- Minimal owner privileges
- Explicit execute grants
- No dynamic SQL unless unavoidable and reviewed
- Stable/volatile marking correct
- Unit and RLS integration tests

### 47.3 Performance pattern

Policy içinde helper result her row için tekrar hesaplanmaması amacıyla appropriate `(select private.function(...))` wrapper ve indexed columns kullanılır. Exact query plan representative data ile test edilir.

---

## 48. Public Content RLS

### 48.1 Public read predicate

Public product projection requires:

- market enabled,
- product technical/lifecycle valid,
- market publication status published,
- effective date window active,
- approved localization,
- requested host market context application tarafından scoped.

Database session’a host market güvenilir şekilde aktarılmadığı doğrudan Data API çağrılarında market explicit filter zorunludur. Public website primary reads server DAL’den gelir.

### 48.2 Base tables versus views

Anonymous access için complex base-table join policies yerine security-invoker safe public views tercih edilebilir:

- `public.public_products_v`
- `public.public_product_categories_v`
- `public.public_industries_v`
- `public.public_documents_v`
- `public.public_pages_v`

Views private/internal columns içermez.

### 48.3 Draft protection

Anonymous and partner roles draft/review/unpublished row’ları hiçbir base table üzerinden göremez.

---

## 49. Partner and Company RLS

### 49.1 Company scope

Partner record access baseline:

~~~text
auth user active
AND company membership active
AND partner profile active
AND portal enabled
AND relevant market/product/document scope active
~~~

### 49.2 Quote read

Partner user quote okuyabilir only if:

- quote company matches active membership company,
- partner profile active,
- quote portal visibility policy allows,
- record not internal-only.

Partner never sees:

- internal notes,
- lost reason internal detail,
- assignment history,
- restricted activities,
- other company identifiers.

### 49.3 Company isolation test

Every company-scoped table must include negative test:

- User A company A row allowed
- User A company B row returns no row/denied
- Suspended membership denied
- Revoked partner profile denied
- Correct user but wrong market scope denied where applicable

---

## 50. Internal Admin RLS

### 50.1 Permission-based policies

Internal user status alone broad access vermez.

Examples:

- `quotes.read`
- `quotes.change_status`
- `companies.manage`
- `dealers.review`
- `dealers.approve`
- `documents.publish`
- `documents.issue_access`
- `products.publish.uk`
- `products.publish.ua`
- `audit.read`

### 50.2 Market-scoped permissions

`sales_admin` veya `technical_manager` assignment market-scoped olabilir. Permission helper optional `market_id` ile current active role grant’i doğrular.

### 50.3 Super admin

Super Admin unrestricted UI görünümü alabilir ancak:

- critical actions still validated,
- reason required where configured,
- audit required,
- service role kullanılmadan normal user identity preserved

olur.

---

## 51. RLS Policy Matrix

| Table family | Anonymous | Partner | Internal |
|---|---|---|---|
| Published catalog/content | Published market-safe read | Same public read | Permissioned manage |
| Draft content | Deny | Deny | Permissioned |
| User profile | Deny | Own row | Own + user-admin permission |
| Company | Deny | Own active company safe view | CRM permission |
| Contact | Deny | Own safe contact where enabled | CRM permission |
| Quotes | RPC submit only | Own company safe view | Quote permission |
| Enquiries | RPC submit only | No baseline read | Enquiry permission |
| Dealer applications | RPC submit only | Applicant status by secure reference only if approved | Dealer permission |
| Documents metadata | Published safe metadata | Published + granted | Document permission |
| File assets | No base read | Policy-mediated | Permissioned |
| Access events | No | Own limited optional | Document/audit permission |
| Internal notes | Deny | Deny | Restricted permission |
| Private operational | Deny | Deny | Server-only/narrow function |

---

## 52. Storage RLS Mapping

### 52.1 Buckets

| Bucket | Public | Upload actor | Read actor |
|---|---:|---|---|
| `published-media` | Yes | Internal approved workflow | Everyone |
| `media-staging` | No | Technical/content staff | Authorized staff |
| `technical-documents` | No | Technical staff | Authorized server/user policy |
| `form-attachments` | No | Short-lived upload intent | Authorized staff |
| `partner-documents` | No | Authorized staff | Scoped partner/internal |

### 52.2 Storage object path

~~~text
{entity-class}/{opaque-uuid}/{version-or-opaque-filename}
~~~

No email, company legal name, project name or raw document title in private object path.

### 52.3 Metadata link

`storage.objects` metadata is managed by Storage API. Application owns `public.file_assets` reference and business policy.

Direct SQL update/delete on `storage.objects` prohibited.

### 52.4 Policy rule

Storage RLS policy may validate:

- bucket ID,
- authenticated user,
- object path prefix/session ID,
- matching `file_assets` status,
- company/document grant helper.

Complex business authorization signed URL issuance route’unda server DAL tarafından tekrar doğrulanır.

---

## 53. Index Strategy

### 53.1 Mandatory index classes

- Every foreign key used in joins/deletes
- RLS predicate columns
- List screen status + time ordering
- Market + publish status
- Active partial uniqueness
- Lower/citext exact lookup
- Search indexes only when feature launches

### 53.2 Core index list

| Table | Index |
|---|---|
| `domains` | `(host, environment)` unique |
| `company_memberships` | `(user_id, status, company_id)` |
| `membership_roles` | `(membership_id, revoked_at, role_id)` |
| `product_market_publications` | `(market_id, status, product_id)` |
| `product_localizations` | `(market_id, locale, slug)` unique |
| `product_attribute_values` | `(attribute_definition_id, value_number)` for filterable numeric attrs where justified |
| `documents` | `(status, resource_type_id)` |
| `document_access_grants` | `(user_id, status, expires_at)` and company/project equivalents |
| `quotes` | `(status, submitted_at desc)` |
| `quotes` | `(assigned_to_user_id, status, submitted_at desc)` |
| `enquiries` | `(status, created_at desc)` |
| `dealer_applications` | `(status, submitted_at desc)` |
| `notification_outbox` | partial `(next_attempt_at)` pending/failed |
| `audit_events` | `(target_type, target_id, occurred_at desc)` |

### 53.3 Partial unique examples

~~~sql
create unique index uq_company_memberships_active
on public.company_memberships (company_id, user_id)
where status in ('invited', 'active', 'suspended');
~~~

~~~sql
create unique index uq_quote_assignments_one_active
on public.quote_assignments (quote_id)
where unassigned_at is null;
~~~

### 53.4 Index discipline

- Index every column “just in case” yapılmaz.
- Query plan before/after ölçülür.
- Write-heavy history/outbox tables index count controlled.
- Unused/duplicate index review quarterly.
- Large production index creation may use `concurrently` in separate non-transactional migration procedure.

---

## 54. Search Indexes — V1

When search launches:

- `pg_trgm` for product name/code/company search
- `unaccent` normalized generated/search expression
- GIN for full-text search vector
- Market/publish filters remain B-tree

Search projection must contain public-safe fields only.

Possible table/materialized view:

`public.search_documents` is not created in MVP. V1 may introduce a dedicated denormalized search table if query plans justify it.

---

## 55. Trigger Standard

### 55.1 `updated_at`

One reusable trigger function updates `updated_at`; application-supplied value is not trusted.

### 55.2 Row version

Selected tables increment `row_version` on meaningful update.

### 55.3 Auth profile creation

Auth user trigger may create minimal `user_profiles` row only if failure behavior is understood and tested. Invitation workflow remains application-controlled; trigger does not grant roles.

### 55.4 Audit triggers

Database trigger audit only for high-value tables where it reliably captures changes. Business reason and actor context often require application/RPC explicit audit event.

### 55.5 Prohibited trigger behavior

- External HTTP/email call
- Long-running logic
- Silent role grant
- Cross-domain hidden business workflow
- Mutation of immutable version history

---

## 56. Database Function and RPC Catalogue

### 56.1 Public/business RPCs

| Function | Purpose | Caller |
|---|---|---|
| `submit_quote_request(...)` | Atomic quote + items + outbox | Server-only public form action |
| `submit_enquiry(...)` | Atomic enquiry + context + outbox | Server-only |
| `submit_dealer_application(...)` | Atomic application + interests + outbox | Server-only |
| `request_document_access(...)` | Request + policy result + outbox | Server-only/authenticated |
| `change_quote_status(...)` | Validate transition + history + audit | Authorized internal |
| `assign_quote(...)` | Close prior assignment + new assignment | Authorized internal |
| `publish_product(...)` | Validate publish invariant + audit | Technical/content permission |
| `approve_dealer_application(...)` | Decision + company/partner setup, no accidental user grant | Dealer approver |

### 56.2 Private helper functions

- Permission helpers
- Rate limit increment/check
- Outbox row claim
- Idempotency start/complete
- Human-safe public reference generation
- Category cycle validation
- Current document access check

### 56.3 RPC security

- Input types explicit
- Zod application validation plus database validation
- `security invoker` default
- `security definer` only when necessary
- Fixed empty search path for definer
- Explicit grants/revokes
- No raw SQL string input
- Stable error codes
- Transaction atomicity tested

---

## 57. Quote Submission Transaction

### 57.1 Inputs

- Trusted market/domain/locale context
- Idempotency key
- Requester/contact/company fields
- Optional project fields
- Product items
- Consent version/timestamp
- Turnstile/rate-limit result already verified or verified in adjacent server layer

### 57.2 Atomic steps

~~~mermaid
flowchart TD
    I["Claim idempotency key"] --> C["Match or create contact/company"]
    C --> P["Create or link project"]
    P --> Q["Create quote"]
    Q --> L["Create quote item snapshots"]
    L --> H["Create initial status history"]
    H --> O["Enqueue notifications"]
    O --> R["Commit and return reference"]
~~~

Any step fails → entire transaction rolls back except separately recorded abuse/security event if intentionally outside business transaction.

### 57.3 Deduplication

- Same idempotency key and matching fingerprint returns prior safe result.
- Same key with different fingerprint returns conflict.
- Locked stale processing row recovered after controlled timeout.

---

## 58. Dealer Approval Transaction

Approval operation:

1. Locks application row.
2. Validates current state and required reviews.
3. Matches/creates company and contact.
4. Updates company type/status as approved.
5. Creates partner profile and scopes if requested.
6. Records dealer review/decision.
7. Changes application status.
8. Enqueues invitation workflow request.
9. Writes audit event.

It does not:

- create a password,
- mark invitation accepted,
- activate a user membership before invite acceptance,
- grant Super Admin,
- expose all documents automatically.

---

## 59. Document Access Transaction

### 59.1 Access decision order

1. Document and current approved version exist.
2. Document market metadata is available if public discovery path.
3. User/company/project identity resolved.
4. Document access level evaluated.
5. Active grant/partner scope checked.
6. Expiry and revoked status checked.
7. Access event recorded.
8. Short signed URL generated outside database.

### 59.2 Database responsibility

Database returns authorization decision and target object identity. It does not store or generate long-lived public URLs.

---

## 60. Publication Transaction

Product publish function validates:

- Product technical status approved
- Market enabled
- Approved product localization
- Unique slug
- Category publication/availability
- Required attribute values present
- Attribute sources/verification where required
- Primary media state
- No withdrawn critical certificate policy violation where configured

On success:

- publication state changes,
- publish actor/time saved,
- audit event inserted,
- application receives cache invalidation tags after commit.

Database does not call Next.js cache API.

---

## 61. Views and Read Models

### 61.1 Public views

Candidate safe views:

- `public_products_v`
- `public_product_details_v`
- `public_categories_v`
- `public_industries_v`
- `public_application_maps_v`
- `public_document_metadata_v`
- `public_pages_v`

### 61.2 Portal views

- `partner_company_summary_v`
- `partner_quotes_v`
- `partner_documents_v`

### 61.3 Admin list views

- `admin_quote_queue_v`
- `admin_enquiry_queue_v`
- `admin_dealer_queue_v`
- `admin_document_queue_v`

### 61.4 View rules

- Security-invoker behavior confirmed
- RLS not accidentally bypassed
- No secret/private column
- Stable DTO-facing aliases
- Pagination-friendly indexed base predicates
- Views not used to hide broken data model

---

## 62. Data Validation Constraints

### 62.1 Email

Database performs basic length/non-empty normalization, not a false “perfect RFC regex.” Application validation handles UX; email verification provides stronger evidence.

### 62.2 Phone

- Normalized E.164 when parseable
- Country context stored separately if needed
- Original input optional for recovery
- No numeric type

### 62.3 Slug

- Lowercase
- No leading/trailing slash
- No query/fragment
- Allowed character policy locale-aware
- Reserved words blocked by service/constraint table
- Unique within market/entity route family

### 62.4 URLs

- HTTP/HTTPS only unless explicit scheme
- External redirect domains allowlisted
- No javascript/data scheme for user-controlled values

### 62.5 JSONB

- Default object/array explicit
- Zod schema version
- Size limit at application boundary
- GIN index only for real query
- No secret key/value

### 62.6 Dates

- End after start
- Expiry after grant time
- Published timestamp required for published state
- Withdrawn/superseded state requires actor/time where applicable

---

## 63. Data Provenance

Technical/commercial confidence requires source fields.

### 63.1 Product technical values

- `source_document_version_id`
- `verified_at`
- `verified_by`
- optional change request/audit diff

### 63.2 Market content

- created/updated/reviewed/published actor and time
- translation source locale
- translation status

### 63.3 Commercial submissions

- source domain
- market
- locale
- submission timestamp
- consent terms version
- immutable display snapshots

### 63.4 Imported data

Bulk import later adds import job ID/reference; imported row must be traceable to source file and validation report.

---

## 64. Data Retention and Anonymization

Exact retention periods legal/business decision bekler. Schema retention action’ını destekler.

### 64.1 Data classes

| Class | Default action concept |
|---|---|
| Public content | Archive/version history |
| Quote/business records | Retain per commercial/legal policy |
| Dealer applications | Retain then anonymize/restrict |
| Public attachments | Short retention unless linked to active case |
| Signed access events | Security/compliance retention |
| Notification payloads | Minimize and purge earlier than business record |
| Rate-limit data | Very short retention |
| Webhook raw payload | Short/minimized retention |
| Audit events | Longer controlled retention |

### 64.2 Anonymization

Anonymization service:

- preserves business/audit reference where required,
- replaces direct identifiers,
- removes message/attachment content according to policy,
- writes audit event,
- does not create orphan/broken foreign keys.

---

## 65. Migration Architecture

### 65.1 Source of truth

~~~text
supabase/migrations/*.sql
~~~

All shared environment changes versioned migration’dır.

### 65.2 Migration ordering

Recommended initial groups:

1. Extensions and schemas
2. Shared functions/triggers
3. Markets/domains/config
4. Identity/RBAC
5. Catalogue/content
6. CRM/commercial
7. Documents/storage metadata
8. Private operations
9. RLS/grants
10. Views/RPC
11. Seed/reference data

### 65.3 Expand-contract

- Add nullable/new object
- Deploy compatible code
- Backfill
- Add validation/not-null if safe
- Switch reads
- Remove legacy later

### 65.4 Prohibited migration behavior

- Edit already-applied shared migration
- Production-only dashboard schema drift
- Large unbounded update in request deploy window
- Drop column/table without verified usage search and recovery plan
- Disable RLS to “make it work”
- Seed real customer data

---

## 66. Seed Data

### 66.1 Foundation seed

- Markets `uk`, `ua`
- Approved locales
- Route keys
- System roles
- Permissions
- Role-permission defaults
- Resource types
- Product families/categories where verified
- Feature flag definitions

### 66.2 Local/test seed

- Synthetic internal users
- Synthetic partner companies
- UK and UA content examples
- Products with verified dummy technical values clearly marked non-production
- Quote/enquiry/application scenarios
- Document grants and cross-company denial fixtures

### 66.3 Production seed

Production seed is idempotent and contains reference/config data only. User/password/customer submission seed yoktur.

---

## 67. Generated Types

Supabase schema’dan TypeScript types üretilir.

~~~text
src/types/database.generated.ts
~~~

Rules:

- File manually edited olmaz.
- Migration sonrası regenerate edilir.
- CI unexpected diff tespit edebilir.
- Application DTO types generated row types’tan ayrı tutulur.
- Public response database row değildir.

---

## 68. Database Test Strategy

### 68.1 Schema tests

- Required constraints reject invalid data
- Unique rules
- FK delete behavior
- Status checks
- Timestamp invariants
- One-of typed value constraints

### 68.2 RLS tests

For every protected family:

- anonymous denied
- unauthenticated function denied
- active correct user allowed
- wrong company denied
- wrong market denied
- suspended user denied
- revoked membership denied
- internal role without permission denied
- permission holder allowed

### 68.3 Transaction tests

- Quote successful atomic create
- Invalid item rolls back all
- Duplicate idempotency returns same reference
- Notification outbox created once
- Dealer approval concurrent attempt only one result
- Quote status transition invalid path rejected
- Document grant expired/revoked denied

### 68.4 Performance tests

Representative dataset query plans:

- Public product list/filter
- Admin quote queue
- Partner quote list
- Document access helper
- Permission helper
- Outbox claim

`EXPLAIN (ANALYZE, BUFFERS)` staging/local representative data; never casually production sensitive output.

---

## 69. Supabase Advisors and Operational Checks

Before release:

- Security Advisor reviewed
- Performance Advisor reviewed
- Missing RLS warnings resolved
- Permissive/always-true policies justified or removed
- Unindexed foreign keys reviewed
- Function search path warnings resolved
- Exposed private schema check
- Storage buckets/policies verified

Advisor clean result manual authorization tests yerine geçmez.

---

## 70. Database Monitoring

Monitor:

- Connection usage
- Slow queries
- Lock waits/deadlocks
- Database/storage size
- Index hit/use patterns
- Autovacuum health
- Outbox backlog
- Failed job runs
- RLS-related 4xx/permission error spikes
- Migration duration/failure

Alerts raw PII/SQL payload içermemelidir.

---

## 71. MVP Physical Table Set

Exact migration plan sprint planning’de finalized olur. Recommended cumulative MVP core:

### Foundation

- markets, domains
- site settings, feature flags/scopes
- user profiles
- roles, permissions, role permissions
- companies
- company memberships, membership roles, invitations
- audit/security events

### Public Website

- files/media
- manufacturers
- product families/categories and localizations
- products, market publications, localizations
- attribute definitions/options/values
- product media
- industries and localizations/links
- Application Map tables
- pages/navigation if database-managed content launches in MVP

### Sales Operations

- contacts/company contacts/addresses
- enquiries/context
- quotes/items/history/assignments/activities
- dealer applications/products/reviews
- documents/versions/publications/product links
- document access requests/grants/events
- idempotency/rate limits
- notification templates/outbox/deliveries/webhooks
- job runs

Conditional attachments remain off until upload security policy is ready.

---

## 72. Deferred Tables and Features

Create only with approved feature:

- media variants pipeline
- generic tags
- project reference/case studies
- document company/project broad grants
- certification structured coverage
- full customer project workspace
- partner profiles/scopes/portal
- attachment tables
- data export jobs
- dedicated search projection
- internal pricing/offer tables
- ERP/CRM integration tables

Deferred table absence must not cause placeholder JSON blob in unrelated table. Feature waits or gets its proper migration.

---

## 73. Data Model Risks and Controls

| Risk | Control |
|---|---|
| UK content appears on UA | Market publication FK + market-scoped views/tests |
| Duplicate public slug | Market/locale unique constraint |
| Product data loses source | Source document + verifier fields |
| Product edit changes historic quote | Quote item immutable snapshot |
| Company B sees Company A quote | Membership RLS + negative tests |
| Dealer approval creates excessive access | Separate approval, invitation, membership and grant steps |
| Private document becomes public | Private bucket + access level + grant + signed URL |
| Email failure loses request | Business transaction + outbox |
| Duplicate submission | Idempotency unique key |
| Provider webhook repeated | Provider event unique constraint |
| Status changes without history | Transaction function + append-only history |
| JSON becomes hidden database | JSON exception policy + schema validation |
| RLS becomes slow | Indexed predicates + helper plan tests |
| Manual dashboard drift | Versioned migrations only |
| Hard delete loses audit | Restrict/archive/anonymize policy |

---

## 74. Open Data Decisions

| ID | Decision | Recommended baseline | Due |
|---|---|---|---|
| DB-001 | UK/UA page content: DB blocks or code/MDX at MVP | DB for managed content after first templates; static legal copy can begin code-owned | Before CMS migration |
| DB-002 | Protected app host | `app.infravolt.co.uk` | Before auth production |
| DB-003 | Anonymous attachment launch | Off until scanning/policy ready | Before form release |
| DB-004 | Partner quote visibility detail | Status + safe summary only initially | Before portal |
| DB-005 | Document auto-grant | None except explicitly approved policy | Before resource launch |
| DB-006 | Product variant modelling depth | Parent product + attribute values baseline | Before catalogue import |
| DB-007 | Pricing tables | Deferred; no public price | Before internal quotation V1 |
| DB-008 | Data retention durations | Legal/business review | Before production |
| DB-009 | Search projection | PostgreSQL view first | Before V1 search |
| DB-010 | Declarative schema files vs imperative migrations | Versioned migrations baseline; revisit after team workflow | Foundation |

---

## 75. Database Definition of Ready

Before new table/column:

- Requirement/feature ID
- Entity owner
- Data classification
- Source of truth
- Lifecycle/status
- Cardinality
- Required constraints
- Delete/retention behavior
- RLS actors/scopes
- Index/query patterns
- Audit need
- Migration/backfill plan
- Test fixtures

---

## 76. Database Definition of Done

- Migration reviewed and reproducible
- Local reset succeeds
- Constraints tested
- Foreign keys indexed/reviewed
- RLS enabled and negative tests pass
- Grants minimal
- Security-definer search path safe
- Generated types updated
- Seed remains synthetic/idempotent
- Query plan acceptable for critical path
- Audit/retention documented
- Roll-forward recovery known
- Supabase advisors reviewed

---

## 77. Initial Migration Backlog

~~~text
0001_extensions_and_schemas.sql
0002_common_functions.sql
0003_markets_domains_and_config.sql
0004_identity_rbac.sql
0005_companies_and_memberships.sql
0006_file_and_media_metadata.sql
0007_catalogue_taxonomy.sql
0008_products_attributes_and_publications.sql
0009_industries_and_application_maps.sql
0010_crm_enquiries.sql
0011_quotes_and_transactions.sql
0012_dealer_applications.sql
0013_documents_and_access.sql
0014_notifications_and_jobs.sql
0015_audit_security_and_rls.sql
0016_safe_views_and_rpc.sql
0017_reference_seed.sql
~~~

Migration filenames actual Supabase timestamp prefix kullanabilir; yukarıdaki sıra logical backlog’dur.

---

## 78. Resmi Teknik Kaynaklar

Bu model 15 July 2026 tarihinde aşağıdaki resmi kaynaklarla doğrulanmıştır:

### Supabase

- [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Securing the Data API with grants and RLS](https://supabase.com/docs/guides/api/securing-your-api)
- [RLS performance and best practices](https://supabase.com/docs/guides/troubleshooting/rls-performance-and-best-practices-Z5Jjwv)
- [Database functions and security definer guidance](https://supabase.com/docs/guides/database/functions)
- [Storage access control](https://supabase.com/docs/guides/storage/security/access-control)
- [Storage buckets and private bucket behavior](https://supabase.com/docs/guides/storage/buckets/fundamentals)
- [Storage schema design](https://supabase.com/docs/guides/storage/schema/design)
- [Local development and migrations](https://supabase.com/docs/guides/local-development/overview)
- [Database migrations](https://supabase.com/docs/guides/deployment/database-migrations)
- [Generating TypeScript types](https://supabase.com/docs/guides/api/rest/generating-types)
- [Database Performance and Security Advisors](https://supabase.com/docs/guides/database/database-advisors)

### PostgreSQL

- [PostgreSQL CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html)
- [PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html)
- [PostgreSQL partial indexes](https://www.postgresql.org/docs/current/indexes-partial.html)
- [PostgreSQL JSON functions and operators](https://www.postgresql.org/docs/current/functions-json.html)
- [PostgreSQL GIN indexes](https://www.postgresql.org/docs/current/gin.html)

---

## 79. Onay Kaydı

~~~text
Founder / Product Owner approval: Pending
Technical Owner approval: Pending
Database Owner approval: Pending
Security/RLS review: Pending
Approved by:
Approval date:
Approved version:
Notes:
~~~

---

## 80. Sürüm Geçmişi

| Sürüm | Durum | Değişiklik |
|---|---|---|
| 0.1.0 | Current Draft | 104-table phased target catalogue, detailed core table contracts, constraints, indexes, RLS, storage, RPC, transactions, migration and test architecture established |

---

## 81. Son Karar

InfraVolt database’i Supabase PostgreSQL üzerinde, `public` application schema ve Data API’ye kapalı `private` operational schema olarak kurulacaktır. Stable entity identity ile market-specific localization/publication ayrılacak; UK publish state Ukraine publish state’i otomatik oluşturmayacaktır.

Company, contact, membership, role ve permission modeli portal ile internal admin’in ortak authorization omurgası olacaktır. Application DAL her request’i authorize edecek; grants ve RLS database defense-in-depth katmanı sağlayacaktır. Partner company isolation negative integration test olmadan release edilmeyecektir.

Quote, enquiry, dealer application ve document request kayıtları trusted market/source context, immutable submission snapshots, idempotency ve audit ile oluşturulacaktır. Quote item’ları catalog daha sonra değişse bile original request’i koruyacaktır. Notification outbox business transaction içinde oluşacak; email provider failure business record kaybına yol açmayacaktır.

Technical documents private Storage bucket’ta tutulacak; approved version file/checksum değiştirilmeyecek, correction yeni version olacaktır. Metadata publication file erişim izni değildir. Access grant, current policy check, short signed URL ve access event birlikte uygulanacaktır.

104 tabloluk target catalogue tek seferde oluşturulmayacaktır. Foundation, Public MVP ve Sales Operations MVP tabloları ihtiyaç sırasıyla migration edilir; V1 ve conditional tablolar ilgili feature onayından önce database’e eklenmez.

Bir sonraki belge `07_BACKEND_API_AND_WORKFLOWS.md` olmalıdır. Bu dosya burada tanımlanan RPC, Server Action, Route Handler, validation payload, error code, webhook, cron ve transaction akışlarını application contract seviyesinde kesinleştirecektir.
