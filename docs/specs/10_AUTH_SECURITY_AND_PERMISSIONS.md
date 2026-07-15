# InfraVolt — Authentication, Security and Permissions

> Document ID: INF-10  
> Version: 0.1.0  
> Status: Draft for Founder, Technical and Security Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Security Owner: Technical Owner / Security Lead  
> Technical Owner: Product Director / CTO / Head Agent  
> Operations Owners: Admin Operations + Dealer / Partner Operations  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0, 06_DATABASE_SCHEMA.md v0.1.0, 07_BACKEND_API_AND_WORKFLOWS.md v0.1.0, 08_ADMIN_AND_SALES_OPERATIONS.md v0.1.0, 09_PARTNER_PORTAL.md v0.1.0  
> Runtime baseline: Next.js 16 App Router / Node.js 24 / TypeScript / Supabase  
> Required markets: United Kingdom + Ukraine  
> Required protected locales: en-GB + uk-UA  
> Verification baseline: OWASP ASVS 5.0 Level 2 risk-based target  
> Last updated: 15 July 2026  
> Document language: Turkish; security control, role, permission, route, status and event identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt’un authentication, authorization, data protection ve application security sözleşmesini tanımlar.

Belge:

- public website, Admin ve Partner Portal trust boundary’lerini,
- identity ve account lifecycle’ını,
- sign-in, MFA, recovery ve session politikasını,
- RBAC + scoped ABAC modelini,
- atomic permission kataloğunu,
- company, market, product, project ve document scope kararlarını,
- Next.js, Supabase Auth, PostgreSQL RLS ve Storage güvenlik kurallarını,
- public form, upload, webhook, cron ve email kontrollerini,
- audit, monitoring, incident response ve access review prosedürlerini,
- security test ve release gate’lerini

kesinleştirir.

Bu belge “login ekranı” dokümanı değildir. Sistem içindeki her güven sınırının nasıl korunacağını tanımlayan bağlayıcı security architecture’dır.

---

## 2. Ana Güvenlik Kararı

InfraVolt default-deny ve defense-in-depth modeli kullanacaktır.

Authentication yalnız kimliği doğrular. Bir kullanıcının herhangi bir veriyi okuyabilmesi veya action çalıştırabilmesi için ayrıca:

1. Active account
2. Active membership
3. Active role grant
4. Atomic permission
5. Record/company scope
6. Market scope
7. Product/project/document policy
8. Current workflow state

doğrulanır.

Route protection, hidden navigation veya JWT role claim tek başına authorization değildir.

---

## 3. Güvenlik Hedefleri

- Private technical document’ların izinsiz erişimini engellemek
- Partner company’ler arasında sıfır veri sızıntısı sağlamak
- Internal privilege escalation’ı önlemek
- Public forms ve upload yüzeylerini abuse’dan korumak
- UK/UA domain ve market context spoofing’ini engellemek
- Approved teknik verinin sessizce değiştirilmesini önlemek
- Secret, token, session ve signed URL sızıntısını önlemek
- Kritik business mutation’ları izlenebilir yapmak
- Provider failure veya attacker replay ile duplicate işlem oluşmasını önlemek
- Güvenlik olaylarını hızlı algılamak, sınırlamak ve iyileştirmek
- Küçük ekipte uygulanabilir fakat büyümeye hazır governance kurmak

---

## 4. Güvenlik İlkeleri

### 4.1 Default deny

Explicit allow yoksa erişim yoktur.

### 4.2 Least privilege

Kullanıcı ve service yalnız görev için gereken minimum yetkiyi alır.

### 4.3 Every boundary authorizes

Page, Server Action, Route Handler, DAL, RPC, RLS ve Storage policy kendi sınırında doğrulama yapar.

### 4.4 Server context is authoritative

Host, company, market, user, role ve scope client hidden field’dan alınmaz.

### 4.5 Sensitive action requires fresh truth

JWT veya daha önce render edilmiş UI sensitive action için current membership/permission yerine geçmez.

### 4.6 No security by obscurity

URL’nin bilinmemesi, navigation’ın gizlenmesi veya UUID kullanımı authorization kontrolü değildir.

### 4.7 Business commit before side effect

Notification ve analytics ancak business transaction commit olduktan sonra çalışır.

### 4.8 Immutable evidence

Approved file bytes, audit event ve historical business snapshot sessizce overwrite edilmez.

### 4.9 Minimise exposed data

Client, email, log ve analytics yalnız görev için gereken minimum alanı alır.

### 4.10 Usable security

Güvenlik kontrolleri erişilebilir, açıklanabilir ve kullanıcıyı riskli workaround’a zorlamayacak şekilde tasarlanır.

---

## 5. Verification Standard

InfraVolt için risk-based hedef OWASP ASVS 5.0 Level 2’dir.

Bu hedef:

- tüm ASVS requirement’larının otomatik olarak karşılandığı iddiası değildir,
- release öncesi applicable/not-applicable mapping gerektirir,
- public brochure content ile protected commercial/technical data arasında risk ayrımı yapar,
- kritik document, role ve company-isolation kontrollerinde daha yüksek rigor uygulanmasına engel değildir.

ASVS control mapping 12_TEST_QA_AND_ACCESSIBILITY.md içinde test case seviyesinde tutulacaktır.

---

## 6. Security Scope

### 6.1 Dahil

- Public UK website
- Public Ukraine website
- Authentication routes/callbacks
- Internal Admin
- Partner Portal
- Next.js Server Actions
- Route Handlers
- Supabase Auth
- PostgreSQL and RLS
- Supabase Storage
- Public form and upload flows
- Resend email/webhooks
- Vercel deployment/cron
- Analytics and consent integration
- Admin operational devices/browsers

### 6.2 Organizasyonel bağımlılıklar

- Founder and staff account hygiene
- Domain/DNS access
- Provider account ownership
- Recovery contacts
- Legal privacy/retention review
- Supplier document classification
- Incident communication ownership

### 6.3 Kapsam dışı fakat gelecekte yeniden değerlendirilir

- Native mobile apps
- Public third-party API
- Supplier portal
- Payment card processing
- ERP/warehouse integrations
- SSO/SAML enterprise federation
- Customer-managed encryption keys

---

## 7. Application Surfaces

| Surface | Actor | Data sensitivity | Auth baseline |
|---|---|---|---|
| Public UK | Anonymous | Public + submitted personal data | No account |
| Public UA | Anonymous | Public + submitted personal data | No account |
| Auth | Invited user | Identity/session | Invitation/account |
| Admin | Internal staff | Confidential/restricted | Auth + MFA + permission |
| Portal | Approved partner | Own-company confidential | Auth + membership/scope |
| Webhooks | Approved provider | Signed integration payload | Provider signature |
| Cron/worker | Platform job | Server-only operational | Dedicated secret |
| Storage delivery | Authorized user/server | Private files | Current policy + signed URL |

---

## 8. Trust Boundary Modeli

~~~mermaid
flowchart TD
    B["Browser / anonymous or user"] --> E["Vercel edge and Next.js"]
    E --> A["Auth and request context"]
    A --> D["DAL / use cases"]
    D --> P["PostgreSQL and RLS"]
    D --> S["Private Storage"]
    D --> X["Email and external providers"]
    X --> W["Signed webhooks"]
    W --> E
~~~

Browser güvenilmeyen ortamdır. Client bundle, DOM, local state, request body, headers ve URL params attacker tarafından değiştirilebilir kabul edilir.

---

## 9. Korunan Varlıklar

En kritik asset’ler:

- Internal ve partner identities
- Session/refresh credentials
- Role/permission assignments
- Company memberships
- Dealer approval evidence
- Quotes, proposals and commercial details
- Private technical documents/certificates
- Partner document grants
- Personal data and support messages
- Approved product technical values
- Environment secrets/provider keys
- Audit/security events
- Database backups and production deployments

---

## 10. Threat Actor Modeli

| Actor | Örnek risk |
|---|---|
| Unauthenticated attacker | Form abuse, enumeration, XSS, upload |
| Malicious partner user | Cross-company IDOR, bulk document export |
| Compromised partner account | Private document/quote access |
| Malicious or compromised staff | Privilege misuse, data export |
| External bot | Spam, scraping, resource exhaustion |
| Compromised provider/webhook | Forged events, replay |
| Supply-chain attacker | Dependency/build compromise |
| Accidental insider | Wrong publish, wrong grant, secret exposure |

Security modeli yalnız dış saldırganı değil, hata ve compromised legitimate identity durumunu da kapsar.

---

## 11. Öncelikli Threat Matrix

| Threat | Impact | Core controls |
|---|---|---|
| Cross-company portal leakage | Critical | Company scope, RLS, safe DTO, negative tests |
| Admin privilege escalation | Critical | Atomic permissions, MFA, re-auth, audit |
| Private document exposure | Critical | Private bucket, grants, fresh check, 120s URL |
| Secret leak | Critical | Server-only env, scanning, rotation, redaction |
| RLS/grant misconfiguration | Critical | Migration review, tests, advisors, default deny |
| Stored/reflected XSS | High | React escaping, sanitizer, CSP, URL validation |
| CSRF | High | SameSite, origin checks, no GET mutation |
| Malicious upload | High | Allowlist, quota, quarantine, scan |
| Webhook forgery/replay | High | Raw-body signature, timestamp/idempotency |
| Form spam/DoS | Medium/High | Turnstile, atomic rate limit, payload limits |
| Host/market spoofing | High | Host allowlist, trusted request context |
| Audit tampering | High | Append-only, restricted access, monitoring |

---

## 12. Data Classification

| Class | Tanım | Örnek |
|---|---|---|
| `public` | Açık yayın için approved | Published product page, public media |
| `internal` | Şirket içi, düşük hassasiyet | General procedures, draft labels |
| `confidential` | Yetkili kullanıcılarla sınırlı | Quotes, contacts, partner profile |
| `restricted` | Yüksek etki, dar erişim | Private document, role grants, audit |
| `secret` | Kimlik doğrulama/cryptographic | API keys, cookies, reset/grant tokens |

`secret` data hiçbir business UI veya normal log içinde gösterilmez.

---

## 13. Data Handling Kuralları

### 13.1 Public

Approved publishing workflow sonrası cache/CDN üzerinden sunulabilir.

### 13.2 Internal

Authenticated internal user ve ilgili permission gerekir.

### 13.3 Confidential

Authentication + record/company/market scope gerekir; shared cache yoktur.

### 13.4 Restricted

Fresh authorization, minimum DTO, audit ve gerektiğinde step-up authentication gerekir.

### 13.5 Secret

Server-only storage, restricted provider access, rotation ve never-log policy gerekir.

---

## 14. Identity Source of Truth

- Authentication identity: Supabase Auth `auth.users`
- Application identity/status: `public.user_profiles`
- Company relationship: `company_memberships`
- Role assignment: `membership_roles`
- Role capability: `role_permissions`
- Partner business state: `partner_profiles`
- Market/product access: partner scope tables

Email’in canonical identity kaynağı Auth provider’dır. Application table içinde gereksiz duplicate credential data tutulmaz.

---

## 15. Account Creation Policy

### 15.1 Public self-sign-up

Baseline’da yoktur.

### 15.2 Internal account

Yalnız authorized Super Admin invitation ile oluşturulur.

### 15.3 Partner account

Approved partner company için internal Dealer/Partner Operations invitation’ı veya V1’de bounded `partner_admin` invitation’ı ile oluşturulur.

### 15.4 Prohibited

- Shared team account
- Generic `admin@` login
- Manual production Auth row + direct role SQL grant
- Unverified email ile protected access
- Public dealer application’ın otomatik portal hesabı oluşturması

---

## 16. User Profile Status

| Status | Login/session davranışı |
|---|---|
| `invited` | Acceptance flow only |
| `active` | Authorization değerlendirilir |
| `suspended` | Protected data denied |
| `deactivated` | Login/access denied |

Auth provider session mevcut olsa bile application profile active değilse erişim yoktur.

---

## 17. Membership Status

Membership üzerinde en az:

- `invited`
- `active`
- `suspended`
- `revoked`

durumları desteklenir.

Active user + inactive membership company access sağlamaz.

---

## 18. Internal Authentication Baseline

Internal production user:

- Invite-only account
- Verified work email
- Email + password sign-in
- MFA mandatory
- Secure cookie SSR session
- Generic credential errors
- Approved relative return path
- Fresh authorization on every sensitive action

`super_admin` için MFA enrollment tamamlanmadan Admin access verilmez.

---

## 19. Partner Authentication Baseline

Partner production user:

- Invite-only account
- Verified email
- Email + password baseline
- Secure cookie SSR session
- Active company membership
- Active partner profile and portal flag
- MFA optional in MVP
- `partner_admin` MFA V1 hedefi

Magic-link daily login ancak provider behavior, account takeover risk ve support impact değerlendirilip AUTH-001 ile onaylanır. Invitation/recovery link’i daily session policy yerine geçmez.

---

## 20. Password Policy

Password complexity’nin tek başına güvenlik sağlamadığı kabul edilir.

Baseline:

- Provider-supported minimum length en az 12 karakter hedefi
- Uzun passphrase’lere izin
- Gereksiz composition zorunluluğu yok
- Common/compromised password protection provider capability ile etkinleştirilir
- Paste ve password manager engellenmez
- Password hiçbir log, email veya admin UI’da görünmez
- Admin kullanıcı adına password belirlemez
- Periodic forced rotation yalnız incident/risk gerekçesiyle

Exact Supabase Auth configuration release runbook’ta doğrulanır.

---

## 21. MFA Policy

| Actor/action | MFA |
|---|---|
| `super_admin` | Required |
| Internal `admin` | Required |
| Other internal roles | Required |
| `partner_admin` | Optional MVP, required-target V1 |
| `partner_user` | Optional V1 |
| Role/permission management | MFA + fresh session |
| MFA recovery | Audited controlled flow |

TOTP baseline authenticator’dır. Phishing-resistant WebAuthn/passkey desteği provider/product maturity ile V1+ değerlendirilir.

---

## 22. MFA Enrollment

1. User primary authentication yapar
2. Enrollment secret secure provider flow’da üretilir
3. User authenticator ile doğrular
4. MFA verified olmadan internal Admin açılmaz
5. Recovery guidance verilir
6. Enrollment event audit edilir

Seed, QR veya TOTP secret application log’una girmez.

---

## 23. MFA Recovery

MFA recovery self-service bypass değildir.

Internal flow:

1. Identity verification
2. Request kaydı
3. Farklı authorized approver
4. Existing factor removal/recovery
5. Immediate re-enrollment
6. All relevant sessions revoked
7. Security notification
8. Audit event and reason

`super_admin` recovery için two-person approval hedeflenir. Manual database edit yasaktır.

---

## 24. Authentication Error Privacy

Login, recovery ve invitation response:

- Account exists/does not exist ayrımını gereksiz açıklamaz
- Suspended role detayını göstermez
- Raw provider error döndürmez
- Localized generic message + request/reference id sunar
- Rate-limit durumunda güvenli retry guidance verir

Admin/operations log daha ayrıntılı nedeni restricted biçimde tutabilir.

---

## 25. Account Recovery

- Recovery link short-lived ve single-purpose olur
- Redirect target allowlist ile sınırlandırılır
- Recovery token loglanmaz
- Email address değişikliği ayrı verification gerektirir
- Recovery role, membership veya scope değiştirmez
- Completion sonrası active sessions revoke/rotate policy uygulanır
- Security event oluşturulur

---

## 26. Invitation Security

Invitation:

- High-entropy opaque token
- Expiry
- Single use
- Target email/company/role server-side kayıtlı
- Revocable
- Resend’de token rotation
- Generic invalid/expired response
- Acceptance concurrency control
- Audit

Request body company/role değiştiremez. Invitation kabulü role elevation formu değildir.

---

## 27. Session Architecture

Supabase Auth SSR cookie session pattern kullanılır.

Kurallar:

- Production HTTPS only
- Secure cookie
- HttpOnly where provider/framework supports the token role
- Explicit SameSite policy
- Narrow domain/path
- No auth token in localStorage
- No session token in URL
- Server-side user validation
- Logout and revocation behavior tested

Session credential’ı authentication strength kadar hassas kabul edilir.

### Supabase SSR implementation note

Current `@supabase/ssr` modelinde browser ve server session refresh için aynı cookie-backed token state’ini kullanır. Bu nedenle generic “auth cookie mutlaka HttpOnly olmalı” varsayımı doğrudan uygulanmaz; provider’ın current resmi pattern’i izlenir.

Compensating controls:

- XSS prevention ve CSP yüksek öncelik,
- `Secure` + uygun `SameSite`,
- authenticated/refresh response’larda `private, no-store`,
- session validity gerektiğinde provider-backed current user validation,
- Supabase client her request içinde oluşturulur,
- module/global scope’ta user-specific client veya state tutulmaz,
- CDN’in `Set-Cookie` içeren response’u başka kullanıcıya cache etmediği production’da test edilir.

05_TECHNICAL_ARCHITECTURE.md içindeki generic HttpOnly hedefi ile current Supabase SSR contract’ı çelişirse bu implementation note geçerlidir; auth architecture değişirse iki belge birlikte güncellenir.

---

## 28. Session Timeouts

Provisional targets:

| Surface | Idle target | Absolute target | Fresh-auth window |
|---|---:|---:|---:|
| Internal Admin | 30 minutes | 12 hours | 15 minutes |
| Partner Portal | 2 hours | 24 hours | 30 minutes |

Provider capability ile application enforcement birlikte test edilmeden bu değerler production promise değildir.

Sensitive unsaved mutation session expiry sonrası otomatik replay edilmez.

---

## 29. Session Revocation

Şu olaylar revocation veya current-access denial tetikler:

- User deactivation/suspension
- Membership revocation/suspension
- Partner suspension/termination
- Role/permission removal
- MFA recovery
- Password reset/change according to provider capability
- Suspected compromise
- Security administrator action

Authorization her request’te current database state’i kontrol ettiği için stale JWT permission grant olarak kullanılmaz.

---

## 30. Concurrent Sessions

MVP’de user-facing session list zorunlu değildir.

Security baseline:

- Suspicious concurrent activity observable olmalı
- Logout current session’ı kapatmalı
- “Log out all sessions” operational capability değerlendirilmeli
- High-risk account recovery tüm sessions’ı revoke etmeli
- Device fingerprint invasive tracking’e dönüşmemeli

---

## 31. Re-Authentication ve Step-Up

Fresh auth gereken action örnekleri:

- Role/permission grant or revoke
- Internal user suspend/reactivate
- MFA factor recovery/reset
- Secret/provider setting change
- Partner suspension/termination
- Broad document grant/revoke
- Audit export
- High-volume export
- Critical domain/market setting

Re-auth action body’deki data’yı doğrudan yeniden çalıştırmaz; validated intent yeniden kurulur.

---

## 32. Auth Callback Security

- Callback state/PKCE provider contract’a göre doğrulanır
- Redirect yalnız allowlisted relative route
- Host/protocol trusted config’ten gelir
- Token query string loglanmaz
- Callback response no-store
- Error generic
- Callback completion sonrası user profile/membership current state doğrulanır

Open redirect ve alternate-host cookie confusion release-blocking test’tir.

---

## 33. Authentication vs Authorization

Authentication:

> Bu request hangi identity’ye ait?

Authorization:

> Bu identity bu exact resource üzerinde bu exact action’ı şu anda yapabilir mi?

Login olmuş user:

- otomatik Admin değildir,
- otomatik partner değildir,
- active company’ye otomatik bağlı değildir,
- document access grant’ına otomatik sahip değildir.

---

## 34. Authorization Modeli

InfraVolt hybrid model kullanır:

- RBAC: job function ve reusable permission set
- ABAC/scope: company, market, product, project, document, assignment ve state
- RLS: database backstop
- Application policy: business decision ve safe DTO

~~~mermaid
flowchart TD
    A["Authenticated actor"] --> R["Active membership and role"]
    R --> P["Atomic permission"]
    P --> S["Company / market / resource scope"]
    S --> W["Workflow and record state"]
    W --> D["Allow with safe DTO"]
~~~

---

## 35. Core Authorization Entities

- `user_profiles`
- `companies`
- `company_memberships`
- `roles`
- `permissions`
- `role_permissions`
- `membership_roles`
- partner market/product scopes
- document access grants
- record assignments
- workflow status

Roles platform veya company scope type’ına sahip olur.

---

## 36. Baseline Roles

| Role | Scope | Primary responsibility |
|---|---|---|
| `super_admin` | Platform | Governance and emergency control |
| `admin` | Platform/assigned | Broad daily operations |
| `sales_admin` | Internal/market | Companies, enquiries, quotes |
| `dealer_manager` | Internal/market | Dealer and partner operations |
| `technical_manager` | Internal/market | Technical product/document approval |
| `partner_admin` | Company | Own-company partner administration |
| `partner_user` | Company | Own-company permitted resources |

Custom arbitrary roles MVP’de yoktur.

---

## 37. Role Design Rules

- Role job function’dır
- Sensitive action atomic permission ile korunur
- Role adı UI’da izin yerine geçmez
- Role assignment active membership’e bağlıdır
- Market scope role’den ayrı olabilir
- User kendi role/scope’unu değiştiremez
- Partner role internal permission içeremez
- Last active `super_admin` korunur
- Last active `partner_admin` company safeguard V1’de korunur
- Role mapping code/seed-governed baseline’dır

---

## 38. Permission Naming Convention

Format:

~~~text
resource.action
resource.action.scope
~~~

Örnek:

~~~text
quotes.read
quotes.change_status
products.publish.uk
products.publish.ua
documents.issue_access
~~~

Permission key immutable identifier’dır. Display name/localization değişebilir.

---

## 39. Permission Sensitivity

`permissions.is_sensitive` şu action sınıflarında true olur:

- approve
- publish/unpublish
- grant/revoke
- role change
- user suspend/reactivate
- export
- delete/purge
- feature/platform setting
- MFA recovery
- audit access/export
- broad cross-market read

Sensitive permission usage enhanced audit ve gerektiğinde fresh MFA gerektirir.

---

## 40. Platform ve Account Permissions

| Permission | Açıklama |
|---|---|
| `platform.settings.read` | Safe platform settings view |
| `platform.settings.manage` | Critical platform settings |
| `platform.feature_flags.read` | Feature flag view |
| `platform.feature_flags.manage` | Feature flag mutation |
| `users.read` | User list/detail safe view |
| `users.invite_internal` | Internal invitation |
| `users.suspend` | Suspend/reactivate user |
| `users.manage_roles` | Role/scope grant/revoke |
| `users.manage_mfa_recovery` | Controlled MFA recovery |
| `audit.read` | Restricted audit read |
| `audit.export` | Restricted audit export |

---

## 41. Sales and Relationship Permissions

| Permission | Açıklama |
|---|---|
| `companies.read` | Company read |
| `companies.manage` | Company mutation |
| `contacts.read` | Contact read |
| `contacts.manage` | Contact mutation |
| `enquiries.read` | Enquiry read |
| `enquiries.assign` | Owner assignment |
| `enquiries.change_status` | Lifecycle transition |
| `enquiries.export` | Export |
| `quotes.read` | Quote read |
| `quotes.create` | Internal quote create |
| `quotes.assign` | Quote assignment |
| `quotes.change_status` | Lifecycle transition |
| `quotes.share_proposal` | Partner/customer-visible proposal |
| `quotes.archive` | Archive |
| `quotes.export` | Export |

---

## 42. Dealer and Partner Permissions

| Permission | Açıklama |
|---|---|
| `dealers.read` | Dealer application read |
| `dealers.review` | Review/request information |
| `dealers.approve` | Final approval |
| `dealers.reject` | Final rejection |
| `partners.read` | Partner profile/scope read |
| `partners.manage_scope` | Market/product scope |
| `partners.invite_user` | Internal partner invitation |
| `partners.suspend` | Suspend/reactivate partner |
| `partners.terminate` | Terminate relationship |

Final approval/suspension/termination sensitive ve audited action’dır.

---

## 43. Product and Content Permissions

| Permission | Açıklama |
|---|---|
| `products.read` | Catalogue read |
| `products.edit` | Draft technical/content edit |
| `products.technical_approve` | Technical approval |
| `products.publish.uk` | UK publication |
| `products.publish.ua` | UA publication |
| `products.archive` | Archive |
| `content.read` | Pages/navigation/content read |
| `content.edit` | Draft content edit |
| `content.review` | Editorial review |
| `content.publish.uk` | UK publish |
| `content.publish.ua` | UA publish |
| `application_maps.edit` | Map/hotspot edit |
| `application_maps.publish` | Map publish within market permission |

UK publish UA publish anlamına gelmez.

---

## 44. Document Permissions

| Permission | Açıklama |
|---|---|
| `documents.read_internal` | Internal metadata/file view |
| `documents.create` | Document record |
| `documents.create_version` | New immutable version |
| `documents.review` | Technical/content review |
| `documents.approve_version` | Approve exact file/checksum |
| `documents.publish_metadata` | Partner/public-safe metadata |
| `documents.issue_access` | Grant access |
| `documents.revoke_access` | Revoke grant |
| `documents.resolve_request` | Approve/reject request |
| `documents.download_internal` | Internal file delivery |
| `documents.withdraw` | Withdraw/supersede version |

Metadata publication file access izni değildir.

---

## 45. Operations Permissions

| Permission | Açıklama |
|---|---|
| `operations.read` | Job/health summary |
| `operations.retry_notification` | Retry approved outbox item |
| `operations.retry_job` | Retry controlled job |
| `operations.view_provider_events` | Redacted provider event |
| `operations.manage_redirects` | Redirect mutation |
| `operations.manage_domains` | Domain/market configuration |

Retry idempotency ve current state doğrulaması olmadan action çalışmaz.

---

## 46. Portal Permissions

| Permission | Baseline role |
|---|---|
| `portal.company.read` | Partner roles |
| `portal.profile.manage_own` | Partner roles |
| `portal.quotes.read_company` | Assigned partner roles |
| `portal.documents.read` | Partner roles + scope |
| `portal.documents.download` | Partner roles + current access |
| `portal.documents.request_access` | Partner roles |
| `portal.support.create` | Partner roles |
| `portal.projects.read_company` | V1 permission |
| `portal.team.read` | `partner_admin` V1 |
| `portal.team.manage` | `partner_admin` V1 |
| `portal.company.request_change` | `partner_admin` V1 |

Portal permission company, partner state ve resource scope olmadan yeterli değildir.

---

## 47. Role Capability Matrisi

| Capability | Super Admin | Admin | Sales Admin | Dealer Manager | Technical Manager | Partner Admin | Partner User |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Platform governance | Full | Limited | No | No | No | No | No |
| Users/roles | Full | If granted | No | Partner flow only | No | Own team V1 | No |
| Companies/contacts | Full | Manage | Manage | Partner-related | Read if needed | Own safe | Own safe |
| Enquiries | Full | Manage | Manage | Related | Technical related | No baseline | No |
| Quotes | Full | Manage | Manage | Related read | Technical read | Own safe | Own if granted |
| Dealer applications | Full | If granted | Triage/read | Manage | Technical review | No | No |
| Products/content | Full | If granted | Read | Read | Edit/approve | Scoped public | Scoped public |
| Documents | Full | If granted | Request context | Access context | Approve/publish | Scoped | Scoped |
| Audit | Full | Limited if granted | Own module | Own module | Own module | No | No |

Bu matrix presentation guide’dır. Enforcement atomic permission ile yapılır.

---

## 48. Super Admin Controls

`super_admin` geniş erişime sahip olsa bile:

- MFA required
- Critical action validation required
- Reason required where configured
- Audit required
- Service role yerine normal user identity korunur
- Self-lockout/last-admin safeguards uygulanır
- Routine work için Super Admin kullanımı azaltılır
- Emergency access normal operasyon shortcut’ı değildir

“Super Admin her şeyi bypass eder” modeli uygulanmaz.

---

## 49. Separation of Duties

Küçük ekip nedeniyle her action’da iki kişi zorunlu değildir.

Önerilen yüksek risk ayrımları:

- Technical document creator ile final approver farklı kişi where capacity allows
- Dealer reviewer ile final approver farklı kişi where high risk
- MFA recovery requester/approver farklı
- Critical role change actor/target farklı
- Secret rotation en az iki kişi tarafından doğrulanır
- Production database destructive operation peer reviewed

Tek kişiyle işlem gerekiyorsa reason + enhanced audit + post-review uygulanır.

---

## 50. Company Scope

Partner resource access’inde company server tarafından active membership’ten belirlenir.

Rules:

- Client `companyId` authority değildir
- Record aynı company’ye ait olmalı
- Membership active olmalı
- Partner profile active ve portal enabled olmalı
- Foreign record generic denied/not-found verir
- Search result/count unauthorized existence sızdırmaz
- Nested relation aynı scope’tan geçer

---

## 51. Market Scope

Public market:

- trusted Host allowlist’ten gelir.

Internal market:

- role/permission grant veya assignment scope’tan gelir.

Partner market:

- `partner_market_scopes` içinden gelir.

Locale market permission değildir. `uk-UA` UI seçmek UA business scope sağlamaz.

---

## 52. Product and Project Scope

Partner erişimi:

- company,
- market,
- product/category,
- optional project,
- document policy

birlikte değerlendirilebilir.

Internal technical/sales user için product/project assignment broad role yerine dar erişim sağlayabilir.

Client-supplied product/project reference her zaman relation ve scope doğrulamasından geçer.

---

## 53. Record Assignment Scope

Assignment yalnız bazı internal workflows için ek scope’tur.

- Assigned sales user quote/enquiry görebilir
- Manager permission broader queue read sağlayabilir
- Assignment permission değildir; action permission ayrıca gerekir
- Reassignment history audited olur
- Partner hiçbir internal assignment detail görmez

---

## 54. Workflow-State Authorization

Permission action’ı yapmaya genel izin verir; record state action’ın şu anda geçerli olup olmadığını belirler.

Örnek:

- `documents.approve_version` permission’ı draft dışı invalid version’ı onaylatmaz
- `dealers.approve` eksik required review’i bypass etmez
- `quotes.change_status` invalid transition çalıştırmaz
- `documents.issue_access` withdrawn version’a grant vermez

State transition tek service/RPC contract’ında tutulur.

---

## 55. JWT Claims Rule

JWT claims:

- identity/performance hint olabilir,
- UI personalization’a yardımcı olabilir,
- sole sensitive authorization source değildir.

Current user profile, membership, role grant, partner state ve sensitive scope database’den doğrulanır.

Long-lived custom role claim ile revoked permission’ın yaşamaya devam etmesi engellenir.

---

## 56. Authorization Decision Order

1. Request context/host
2. Input parse
3. Authentication
4. User profile status
5. Membership/role status
6. Atomic permission
7. Company/market/resource scope
8. Workflow/current record state
9. Safe DTO projection
10. Audit/response

Order error semantics record existence’ını sızdırmayacak şekilde uygulanır.

---

## 57. Navigation ve UI Authorization

- Navigation permission-aware render edilir
- Disabled button authorization değildir
- Hidden menu direct action’ı korumaz
- Page render sonrası permission revoke edilirse mutation denied olur
- UI yalnız server-provided capability flags kullanabilir
- Capability flags final enforcement değildir

Partner/internal forbidden navigation yanlış yüzeye link vermez.

---

## 58. Safe DTO

Protected response dedicated DTO/view model kullanır.

Prohibited:

- `select *` to client
- Database row spread into JSON
- CSS ile internal field gizlemek
- Internal enum/reason’ın raw gönderilmesi
- Nested relation’ı scope kontrolsüz eklemek

Safe DTO explicit allowlist alanlarından oluşur.

---

## 59. PostgreSQL RLS Rolü

RLS application authorization’ının database defense-in-depth backstop’udur.

RLS:

- exposed protected table’larda enabled,
- default deny,
- membership/company/market helpers ile,
- indexed predicate columns üzerinde,
- anonymous/authenticated/internal actor matrix’iyle

tasarlanır.

RLS business-safe DTO’nun yerini almaz.

---

## 60. RLS Actor Matrix

| Data family | Anonymous | Partner | Internal |
|---|---|---|---|
| Published catalogue | Market-safe read | Same public read | Permissioned manage |
| Draft content | Deny | Deny | Permissioned |
| User profile | Deny | Own | Permissioned user admin |
| Company/contact | Deny | Own safe scope | CRM permission |
| Quotes | Submit RPC only | Own company safe | Quote permission |
| Enquiries | Submit RPC only | No baseline | Enquiry permission |
| Dealer applications | Submit RPC only | Secure status if approved | Dealer permission |
| Documents metadata | Public approved subset | Granted/current | Document permission |
| File objects | Deny | Policy-mediated | Permissioned |
| Internal notes | Deny | Deny | Restricted |
| Audit | Deny | Deny | `audit.read` |

---

## 61. RLS Helper Functions

Helper examples:

- `is_active_user()`
- `has_permission(permission_key)`
- `has_company_membership(company_id)`
- `has_market_scope(market_id)`
- `can_access_document(document_id, version_id)`

Rules:

- Stable, narrow purpose
- Explicit schema qualification
- Safe `search_path`
- Least execute grants
- No user-controlled dynamic SQL
- Performance plan tested
- Security definer yalnız gerekli olduğunda
- Function owner/privileges reviewed

---

## 62. Service Role Key

Supabase server/service secret:

- Browser bundle’a girmez
- `NEXT_PUBLIC_*` değildir
- RLS bypass capability olarak kabul edilir
- Yalnız server-only adapter’da kullanılır
- Request user identity ve authorization application’da korunur
- Broad generic repository’ye verilmez
- Usage reason/audit gereken workflow’da kaydedilir
- Rotate edilebilir

Service role “RLS sorunu çözme” yöntemi değildir.

---

## 63. Database Grants

- Anonymous role yalnız gerekli public RPC/view/read grant’larını alır
- Authenticated role yalnız exposed RLS-protected object’lere minimum grant alır
- Private schema client roles’a açık değildir
- Function execute grants explicit yönetilir
- Table owner/runtime role ayrılır where supported
- Migration role runtime request role değildir
- Direct `storage.objects` SQL mutation yasaktır

---

## 64. Database Migration Security

Her migration review:

- New table RLS durumu
- Grants
- Policies
- Foreign keys/delete behavior
- Sensitive columns
- Indexes for RLS
- Function security
- Default privileges
- Data migration exposure
- Rollback/forward-fix

RLS’yi geçici kapatarak production fix yapmak yasaktır.

---

## 65. RLS Test Requirements

Her protected family için:

- Anonymous denied
- Unauthenticated function denied
- Correct active actor allowed
- Wrong company denied
- Wrong market denied
- Suspended user denied
- Revoked membership denied
- Internal role without permission denied
- Permission holder allowed
- Service path explicit and tested

Policy change negative tests olmadan merge edilmez.

---

## 66. Storage Classification

| Bucket | Public | Baseline |
|---|---:|---|
| `published-media` | Yes | Approved public assets only |
| `media-staging` | No | Internal staging |
| `technical-documents` | No | Approved controlled documents |
| `form-attachments` | No | Quarantine/review |
| `partner-documents` | No | Scoped partner delivery |

Public bucket private document içermez.

---

## 67. Private Object Path

Pattern:

~~~text
entity-class/opaque-uuid/version-or-opaque-filename
~~~

Private path içinde:

- email,
- company legal name,
- project name,
- quote title,
- raw document title,
- access token

bulunmaz.

---

## 68. Document Authorization

Document download için:

1. Valid session veya approved signed InfraVolt grant context
2. Active user/company/partner state
3. Document metadata current and available
4. Exact version allowed
5. Market/product/project policy
6. Explicit grant/role policy
7. Expiry/revocation check
8. File asset approved and clean
9. Access event
10. Short signed URL

Metadata visibility file access anlamına gelmez.

---

## 69. Signed URL Policy

- Fresh authorization before issuance
- Default 120 seconds
- `Cache-Control: no-store`
- `Referrer-Policy: no-referrer`
- No permanent storage URL
- No signed URL in email/log/analytics
- No client persistence
- Expired URL refreshed değil, re-authorized
- Unknown/denied object existence disclosed olmaz

Longer duration explicit document-tier risk review gerektirir.

---

## 70. Signed InfraVolt Grant Link

Anonymous approved document-request link kullanılırsa:

- Link Storage’a değil InfraVolt endpoint’ine gider
- HMAC-signed versioned context
- Grant/request id, expiry, nonce
- Baseline 24-hour outer link
- Current grant/request recheck
- Replay/expiry policy
- Dedicated rotatable `DOCUMENT_GRANT_LINK_SECRET`
- Son aşamada 120-second Storage URL

Raw token loglanmaz.

---

## 71. Upload Security

Upload baseline:

- Feature/purpose gate
- Actor and purpose authorization
- Extension and MIME allowlist
- Detected content validation
- File size/count quota
- Server-generated opaque path
- Sanitized display filename
- `upsert = false`
- Short-lived upload intent
- Quarantine/pending status
- Malware scan where required
- Checksum
- Explicit approval
- Orphan cleanup

Upload edilen içerik doğrudan public/approved olmaz.

---

## 72. SVG and Active Content

SVG, HTML, script-capable document ve macro-enabled office files yüksek risklidir.

Baseline:

- Public SVG only approved asset pipeline
- User-upload SVG default deny
- HTML upload default deny
- Macro-enabled document default deny or quarantine/manual review
- Browser inline rendering yerine download/controlled preview policy
- Content-Disposition and MIME correct
- `nosniff` header

---

## 73. Public Form Security

Public forms:

- Zod server validation
- Cloudflare Turnstile server verification
- Atomic/distributed rate limit
- Payload length/count limits
- Idempotency
- Trusted host/market context
- Known product/entity relation validation
- HTML treated as text
- Safe confirmation
- PII-minimised logs

Client validation UX’tir; security boundary değildir.

---

## 74. Turnstile Rules

- Token server-side verified
- Expected hostname/action checked where supported
- Token single-use/short-lived provider semantics respected
- Secret server-only
- Failure business record oluşturmadan döner
- Provider unavailable strategy explicit
- Test keys production’da kullanılmaz
- Turnstile tek anti-abuse control değildir

Authenticated portal support request baseline’da Turnstile gerektirmez; rate limit devam eder.

---

## 75. Rate Limiting

Rate limit dimensions:

- IP/network signal
- Route/action
- Account/user
- Company
- Email hash where appropriate
- Document id/grant
- Upload purpose

Rules:

- In-memory function counter production limiter değildir
- Atomic shared storage/database-backed limiter high-value public mutation’da kullanılır
- Proxy/IP headers yalnız trusted platform chain’den alınır
- Limit error safe ve localized
- Security bypass allowlist audited
- Limits accessibility/usability’i haksız engellememeli

---

## 76. Idempotency

Idempotency gereken flows:

- Quote submission
- Enquiry/dealer application
- Invitation acceptance
- Document access request
- Provider webhook
- Outbox notification
- Cron job claim
- High-risk status transition

Idempotency key scope, actor ve payload identity ile bağlanır. Key başka payload için reuse edilmez.

---

## 77. Server Action Security

Her Server Action:

1. External input parse eder
2. Authenticates
3. Authorizes exact permission/resource
4. Trusted request context kullanır
5. State/concurrency kontrol eder
6. Transaction/use case çalıştırır
7. Audit/outbox üretir
8. Safe response döner

Server Action yalnız UI’dan çağrılan local function kabul edilmez; direct POST attacker modeliyle test edilir.

---

## 78. Route Handler Security

Route Handler:

- Method allowlist
- Content-Type/body size policy
- Input schema
- Auth model
- Origin/signature/secret check according to route type
- Rate limit
- Cache policy
- Safe error
- No raw provider/database response

State-changing GET yasaktır.

---

## 79. CSRF Protection

Cookie-authenticated mutation için:

- SameSite policy
- Server Action allowed-origin validation
- Route Handler Origin/Host allowlist where appropriate
- No state-changing GET
- JSON/content-type expectations where useful
- Re-auth for sensitive changes
- XSS prevention

Webhook/cron CSRF token kullanmaz; signature/dedicated secret kullanır.

---

## 80. CORS Policy

- First-party same-origin baseline
- Wildcard credentialed CORS yok
- Public third-party API MVP’de yok
- Allowed origins exact scheme + host
- Preview origins production data’ya otomatik erişmez
- Preflight/method/header allowlist
- CORS authorization yerine geçmez

---

## 81. Host Header and Market Security

- Production host allowlist
- Unknown host rejected
- `x-forwarded-host` yalnız trusted platform contract’ına göre
- Client hidden market ignored
- Host → domain → market mapping server-side
- Absolute URL trusted config’ten
- Email/auth callback allowed host’tan
- No forced geo redirect

UK form kaydı UA hidden field ile UA’ya çevrilemez.

---

## 82. Redirect Security

Allowed:

- Validated relative application path
- Explicit configured external business URL

Denied:

- Arbitrary user URL
- Protocol-relative URL
- `javascript:` / `data:` scheme
- Encoded allowlist bypass
- Host suffix/subdomain confusion

Auth return path normalize edilir ve protected surface authorization’ı tekrar çalışır.

---

## 83. XSS Prevention

- React escaping korunur
- `dangerouslySetInnerHTML` default prohibited
- Rich text allowlist sanitizer
- User content HTML değildir
- URL schemes validated
- JSON script embedding safe serialization
- Error/log content UI’a raw basılmaz
- Markdown rendering trusted/sanitized pipeline
- CSP defense-in-depth

Admin içerik girebiliyor olmak HTML trust sağlamaz.

---

## 84. Content Security Policy

Production CSP minimum:

- `default-src 'self'`
- `object-src 'none'`
- `base-uri 'self'`
- `frame-ancestors 'none'`
- `form-action 'self'`
- explicit `script-src`, `style-src`, `img-src`, `font-src`, `connect-src`
- no production `unsafe-eval`
- minimum third-party sources

Nonce-based strict CSP protected surfaces için güçlü adaydır. Public static rendering etkisi nedeniyle exact nonce/SRI strategy ADR + performance test ile seçilir.

---

## 85. Security Headers

Production baseline:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`
- `frame-ancestors` via CSP
- Safe cache headers
- Secure cookie flags

Legacy `X-Frame-Options` defense-in-depth olarak değerlendirilebilir; CSP primary framing policy’dir.

---

## 86. SSRF Prevention

- Arbitrary user URL server’dan fetch edilmez
- Provider endpoints code/config allowlist
- Protocol only HTTPS where required
- DNS/private-network bypass risk reviewed
- Redirect chain bounded/validated
- Storage URLs server generates
- Remote image/domain allowlist
- Timeout/size limits
- Response content trusted değildir

“Verify website URL” özelliği SSRF yüzeyi oluşturmadan tasarlanır.

---

## 87. SQL and Query Security

- Parameterized queries/Supabase client
- User string concatenated SQL yok
- Dynamic sort/filter allowlist
- RPC input validation
- Security definer review
- Database error client’a raw dönmez
- Query timeout and pagination
- Bulk query bounded
- JSON path/filter input constrained

RLS SQL injection’ın yerine geçmez.

---

## 88. Cache Security

- Admin/Portal/auth/preview/signed access `no-store`
- Permission-dependent response shared cache’e girmez
- Cache key market/locale dahil eder
- Private DTO public tag ile cache edilmez
- Sign-out sensitive client query state’i temizler
- CDN authenticated response cache etmez
- Error response secret/private detail cache etmez
- Revalidation permission bypass değildir

---

## 89. Client State Security

Client’ta tutulabilir:

- Non-sensitive UI state
- Filter/sort
- Temporary form draft where approved

Client’ta tutulamaz:

- Role/permission authority
- Company authority
- Refresh/access token readable storage
- Signed URL
- Private document body
- Full quote cache in localStorage
- Secret/provider payload

---

## 90. Email Security

- Verified sender domains
- SPF, DKIM and DMARC configuration
- Market-aware approved sender
- Operational vs marketing separation
- Template escaping
- Minimum private detail
- Permanent private file URL yok
- Reset/invitation/grant token loglanmaz
- Provider API key server-only
- Non-production recipient allowlist

Inbound reply processing MVP’de yoktur.

---

## 91. Resend Webhook Security

`POST /api/webhooks/resend`:

- Raw body once
- Svix signature headers
- Signature verification before parse
- Timestamp/replay protection per provider
- Provider event id unique
- Duplicate verified event 2xx no-op
- Invalid event safe reject + security event
- Secret/signature/raw full payload never logged
- Payload schema/version validation

---

## 92. Cron and Worker Security

- Dedicated `CRON_SECRET`
- Exact method
- Authorization header/secret comparison
- Production-only configured route
- No browser session dependency
- Idempotent claim
- `FOR UPDATE SKIP LOCKED` or equivalent
- Bounded batch
- Lease/concurrency control
- Safe operational logs
- Secret rotation

Cron URL’nin gizli olması authentication değildir.

---

## 93. API and Provider Secrets

Secrets:

- Vercel encrypted environment variables
- Local `.env.local`, never committed
- `.env.example` names only
- Environment-specific values
- Least provider scopes
- Owner and rotation date
- Redacted logs
- Rotation runbook
- Incident-triggered immediate rotation

Client-exposed variables yalnız explicit public config olur.

---

## 94. Environment Isolation

| Environment | Data | Provider behavior |
|---|---|---|
| Local | Synthetic | Test/dev keys |
| Test/CI | Deterministic synthetic | Mock/sandbox |
| Preview | Synthetic/non-production | Recipient allowlist |
| Staging | Synthetic or approved masked | Staging providers |
| Production | Real | Production keys |

Production database export preview/local’a kopyalanmaz.

---

## 95. Production Access

- Named individual accounts
- MFA
- Least privilege
- No shared provider login
- Provider owners documented
- Database dashboard access minimum
- Access removal on role departure
- Quarterly access review baseline
- Emergency access audited
- Support vendor access time-bounded

---

## 96. CI/CD Security

- Protected main branch
- Pull request review
- Required type/lint/test/build
- Migration review
- Secret scanning
- Dependency vulnerability signal
- Lockfile committed
- Production deploy permission limited
- Preview secrets separate
- Build logs redact secrets
- Artifact provenance/platform controls used where available

No unreviewed migration direct production deployment.

---

## 97. Dependency Security

- Minimal dependency count
- Exact lockfile
- Maintained packages
- License/security review where needed
- Automated advisory signal
- Critical vulnerability triage SLA
- Framework security release monitoring
- No abandoned auth/crypto package
- No custom cryptography
- Upgrade tests before production

Supply-chain alert risk-based response alır; version bump tek başına güvenlik değildir.

---

## 98. Source Code Secret Prevention

- `.env*` ignore except safe example
- Pre-commit/CI secret scanning
- No secret in test fixture/screenshot
- No token in issue/PR/chat
- Generated client bundles inspected for public env leaks
- Leaked secret “git history’den silindi” ile çözülmüş sayılmaz; rotate edilir
- Incident event oluşturulur

---

## 99. Logging Standard

Allowed structured fields:

- Request ID
- Route/action
- Method/surface
- Market
- Actor type and internal user id
- Company id where operationally needed
- Outcome/error code
- Duration
- Target type/id
- Audit event id

Logs access-controlled ve retention policy’ye tabidir.

---

## 100. Never-Log List

- Password
- Auth cookie/access/refresh token
- MFA secret/code
- Turnstile token
- Invitation/reset/grant token
- Webhook secret/signature
- Full signed URL
- Provider API key
- Private object path in general logs
- Full form/support free text
- Full email/phone where unnecessary
- File content

Redaction testleri automated olmalıdır.

---

## 101. Audit Event Standard

Audit event:

- Actor id/type
- Action
- Target type/id
- Company/market scope where relevant
- Timestamp
- Request/correlation id
- Reason where required
- Safe before/after diff
- Source surface
- Outcome

Audit business transaction ile aynı transaction’da where possible oluşturulur.

---

## 102. Audited Workflows

| Domain | Events |
|---|---|
| Account | Invite, accept, suspend, role grant/revoke, MFA recovery |
| Partner | Approve/reject, scope change, suspend/terminate |
| Quote | Assign, status, archive, export, proposal share |
| Product | Technical approval, publish/unpublish, archive |
| Document | Approve, current version, grant/revoke, download authorization |
| Content | Publish/unpublish, redirect |
| Platform | Domain, feature flag, secret-related governance |
| File | Approve/reject/delete sensitive asset |

---

## 103. Audit Integrity

- Normal UI edit/delete yok
- Append-only application behavior
- Restricted permission
- Sensitive values redacted
- Database modification path controlled
- Export sensitive and audited
- Time synchronized
- Retention/legal hold policy
- Tampering signal monitored

Audit surveillance amacıyla kullanılmaz.

---

## 104. Security Events

Security event examples:

- Repeated auth failure
- MFA recovery
- Role elevation
- Cross-company denial spike
- Tampered grant link
- Invalid webhook signature
- Rate limit abuse
- Upload malware/scan failure
- Secret scanning finding
- RLS/permission error spike
- Suspicious document download volume
- Provider account change

Her security event incident değildir; severity/triage uygulanır.

---

## 105. Monitoring and Alerts

Alert candidates:

- Authentication failure anomaly
- Internal MFA bypass/recovery
- Super Admin role change
- Unauthorized document access spike
- Signed URL issuance failure spike
- Public form abuse
- Webhook invalid signature spike
- Outbox dead queue
- RLS denied/error anomaly
- Production deployment/migration failure
- Security header/CSP regression

Alert owner ve escalation path deployment öncesi tanımlanır.

---

## 106. Incident Severity

| Severity | Örnek | Response |
|---|---|---|
| SEV-1 | Confirmed cross-company leak, secret/database compromise | Immediate containment + leadership |
| SEV-2 | Privileged account compromise, broad document exposure | Urgent containment |
| SEV-3 | Limited abuse, blocked exploit, isolated malware upload | Same-day triage |
| SEV-4 | Low-risk anomaly/policy issue | Normal backlog |

Legal notification obligation Security Lead tarafından tek başına varsayılmaz; approved legal/privacy owner devreye girer.

---

## 107. Incident Response Akışı

~~~mermaid
flowchart TD
    D["Detect and record"] --> T["Triage and severity"]
    T --> C["Contain access or secret"]
    C --> E["Preserve evidence"]
    E --> R["Eradicate and recover"]
    R --> N["Notify approved stakeholders"]
    N --> P["Post-incident actions"]
~~~

Speed önemli olsa da evidence silen veya impact’i büyüten kontrolsüz production değişikliği yapılmaz.

---

## 108. Incident Containment Playbook

Possible actions:

- Suspend user/membership/company
- Revoke sessions
- Rotate secret/token
- Disable feature flag
- Withdraw document/grant
- Block route/provider integration
- Roll forward safe deployment
- Restrict bucket/policy
- Preserve logs/audit
- Notify provider security

Destructive action scope ve rollback etkisi kaydedilir.

---

## 109. Breach and Privacy Coordination

Security incident kişisel veri içeriyorsa:

- Affected data classes
- Users/companies/markets
- Time window
- Unauthorized actions
- Containment status
- Evidence quality

privacy/legal owner’a iletilir.

Bu belge UK veya Ukrayna hukuku için legal notification süresi belirlemez; production öncesi counsel-approved runbook gerekir.

---

## 110. Access Review

### Monthly

- Super Admin list
- Suspended/departed users
- Pending old invitations
- High-risk provider access

### Quarterly

- All internal roles/permissions
- Market scopes
- Partner admin accounts
- Broad document grants
- Service secrets/owners
- Audit readers/exporters

### Event-driven

- Employee role change/departure
- Partner suspension/termination
- Security incident
- Provider ownership change

---

## 111. Joiner–Mover–Leaver

### Joiner

Invite, minimum role, MFA, training, owner approval.

### Mover

Old role/scope removed before or with new grant; no permission accumulation.

### Leaver

Immediate account suspension, session revoke, provider access removal, ownership transfer, audit.

Shared credentials bu süreci bozduğu için yasaktır.

---

## 112. Break-Glass Access

Emergency access:

- Named, not shared
- Strong MFA
- Normal daily work için kullanılmaz
- Secure recovery material
- Every use alert + reason
- Time-bounded enhanced review
- Post-use credential/session review

Exact provider account strategy AUTH-006 ile onaylanır.

---

## 113. Backup Security

- Provider-managed encrypted backups capability verified
- Backup access restricted
- Restore test scheduled
- Backup contains production-sensitive data
- No developer laptop copy
- Retention documented
- Deletion/restore authority limited
- Recovery point/time objectives 13_DEPLOYMENT_AND_OPERATIONS.md’de

Backup varlığı restore edilebilirlik kanıtı değildir.

---

## 114. Data Retention and Deletion

Her data class için:

- Business/legal purpose
- Retention duration
- Archive/anonymize/delete action
- Legal hold
- Owner
- Audit effect

tanımlanır.

Security log, audit, quote, dealer evidence ve personal form data aynı retention süresini kullanmaz. Exact schedule legal approval bekler.

---

## 115. Privacy by Design

- Minimum form fields
- Operational vs marketing consent ayrımı
- Free text PII minimization guidance
- Purpose-limited analytics
- No private data in client telemetry
- Data subject request operational ownership
- Export/delete authorization
- Safe anonymization
- UK/UA notices legal review

Locale değişimi consent sağlamaz.

---

## 116. Analytics Security

Analytics payload içermez:

- Email/phone/name
- Quote/support free text
- Signed URL/token
- Raw private document title/path
- Internal note
- Sensitive company identifier

Conversion event business commit sonrasında çıkar. Consent gerektiren scripts CSP ve consent state ile controlled olur.

---

## 117. Admin Security UX

- Current user/role context görünür
- MFA requirement açık
- Sensitive action confirmation
- Destructive action scope summary
- Reason field where needed
- Permission denied generic but actionable
- Session expiry unsaved work guidance
- Audit link only authorized roles
- No security secret display

Confirmation modal authorization yerine geçmez.

---

## 118. Partner Security UX

- Current company sürekli anlaşılır
- Foreign record existence disclosed olmaz
- Suspended state safe support route verir
- Document grant/expiry açık
- Download action re-authorizes
- Internal notes/status reasons yok
- Team admin bounded
- Locale market scope’u değiştirmez
- Security notification minimum private detail

---

## 119. Public Security UX

- Form error field-specific fakat exploit detail vermez
- Turnstile accessible fallback/support
- Rate limit honest retry guidance
- Confirmation commit sonrası
- Account enumeration yok
- Upload type/size requirement önceden açıklanır
- Privacy/consent copy market-aware

---

## 120. Security Accessibility

- MFA/recovery keyboard and screen-reader accessible
- QR enrollment text alternative/instructions
- Time-limited code error clear
- No color-only security state
- CAPTCHA alternative/support path
- Password manager/paste supported
- Focus moves to error summary
- Session warning dismiss/extend controls accessible
- Security timeout disability impact reviewed

---

## 121. Secure Development Lifecycle

1. Threat model during requirement
2. Security acceptance criteria
3. Permission/data classification in design
4. Safe implementation patterns
5. Peer review
6. Automated tests/scans
7. Security negative tests
8. Staging validation
9. Release approval
10. Monitoring and post-release review

Security final haftada yapılan tek penetration test değildir.

---

## 122. Code Review Security Checklist

- Input schema
- Auth/authz location
- Company/market scope
- Safe DTO
- RLS/grants
- Sensitive logs
- Cache behavior
- Redirect/URL validation
- Upload/file behavior
- Error privacy
- Audit/outbox
- Idempotency/concurrency
- Tests including deny cases
- New dependency/secret/env

---

## 123. Security Test Matrix — Public

- Missing/forged Turnstile
- Token replay
- Rate-limit bypass
- Duplicate submission
- Host/market spoofing
- Unknown product ids
- Oversized arrays/text
- HTML/script payload
- SQL-like input
- Open redirect
- Upload MIME/extension mismatch
- Direct object path reference

---

## 124. Security Test Matrix — Authentication

- Unknown email enumeration
- Expired invitation
- Reused invitation
- Tampered return path
- Session fixation
- Cookie flags
- MFA required bypass
- MFA recovery authorization
- Suspended/deactivated user
- Stale session after revoke
- Callback host confusion
- Login brute-force/rate limit

---

## 125. Security Test Matrix — Admin

- No session
- Partner session on Admin route/action
- Internal role without permission
- Wrong market permission
- Direct Server Action POST
- Self-role elevation
- Last Super Admin removal
- Stale row version
- Invalid transition
- Unsafe export
- Audit access without permission
- Service role accidental use

---

## 126. Security Test Matrix — Portal

- Company A reads Company B quote
- Company A searches Company B record
- Wrong company nested relation
- Revoked membership
- Suspended partner
- Wrong market/product scope
- Unauthorized document id
- Expired/revoked grant
- Tampered grant link
- Notification deep-link bypass
- Partner admin grants higher role
- Last partner admin removal

Any cross-company failure release blocker’dır.

---

## 127. Security Test Matrix — Integration

- Invalid webhook signature
- Valid duplicate event
- Replay timestamp
- Cron missing/wrong secret
- Outbox duplicate send
- Provider timeout
- Upload path tampering
- Wrong MIME/size/checksum
- Signed URL log leak
- Preview recipient escape
- Secret missing/misconfigured

---

## 128. Automated Security Checks

CI baseline:

- Type/lint/test/build
- Dependency advisory signal
- Secret scanning
- RLS/permission integration tests
- Safe DTO tests
- Header/CSP smoke test
- Route inventory auth classification
- Generated DB types diff
- Migration policy checks where automated

Automated scan manual threat review’in yerine geçmez.

---

## 129. Manual Security Verification

Release öncesi:

- Role matrix exploratory testing
- Cross-company IDOR testing
- Admin direct action testing
- Document access and URL leakage inspection
- Browser storage/cookie inspection
- CSP/header verification
- Upload abuse cases
- Recovery/invitation flows
- Logs/redaction review
- Provider dashboard access review

External penetration test first high-risk production launch veya major scope growth’ta değerlendirilir.

---

## 130. Vulnerability Management

1. Finding recorded privately
2. Severity/impact assessed
3. Owner and due date
4. Containment if necessary
5. Fix and regression test
6. Deploy
7. Verify closure
8. Root-cause/process improvement

Public issue tracker secret veya exploit detail için kullanılmaz.

---

## 131. Vulnerability Severity Targets

Provisional remediation targets:

| Severity | Triage | Remediation target |
|---|---:|---:|
| Critical | Immediate | Contain immediately; fix/mitigate within 24h target |
| High | Same business day | 7 days target |
| Medium | 3 business days | 30 days target |
| Low | Normal review | Planned backlog |

Active exploitation veya sensitive data exposure severity’den bağımsız escalation hızını artırır.

---

## 132. Security Release Gates

Release olmaz if:

- Known cross-company leak
- Admin authz bypass
- Private bucket public
- Required RLS disabled/missing
- Internal MFA bypass
- Secret in client/repository
- Signed URL permanent/logged
- Critical/high unresolved vulnerability without approved mitigation
- Webhook/cron unauthenticated
- Production data in preview/test
- Backup/recovery ownership unknown

---

## 133. MVP Security Scope

- Invite-only accounts
- Internal MFA mandatory
- Supabase SSR cookie auth
- Active status/membership checks
- Seed-governed roles and atomic permissions
- Company and market scope
- RLS on protected tables
- Safe DTO
- Turnstile/rate limits/idempotency
- Private Storage and 120-second signed URLs
- Webhook signatures and cron secret
- Security headers/CSP baseline
- Audit/security logs
- Cross-company test suite
- Secret/env isolation
- Incident and access-removal runbook

---

## 134. V1 Security Scope

- Partner Admin MFA requirement
- User session management/logout all
- Expanded step-up auth
- Passkey/WebAuthn assessment
- More granular market/assignment grants
- Automated access review reporting
- Partner security notifications
- Advanced anomaly detection
- External penetration test based on launch risk
- Stronger CSP strategy if public performance trade-off solved

---

## 135. Deferred Security Features

- Enterprise SSO/SAML
- SCIM
- Customer-managed keys
- Dedicated SIEM
- Hardware-key-only admin login
- Device trust/MDM enforcement
- Public external OAuth/API scopes
- Fine-grained custom role builder
- User impersonation

Deferred olmak temel authz/logging/incident controls’ünü ertelemez.

---

## 136. Security Definition of Ready

Bir feature başlamadan:

- Actor defined
- Data classification
- Required permission
- Company/market/resource scope
- Input trust boundary
- Safe fields/internal fields
- Audit/notification
- Rate/idempotency
- Error privacy
- Negative tests
- Retention

tanımlanmış olmalıdır.

---

## 137. Security Definition of Done

- Authentication and authorization implemented
- Current membership/state checked
- RLS/grants applied
- Safe DTO
- No sensitive client persistence/cache
- Audit/log redaction
- Abuse controls
- Negative tests pass
- Headers/CSP behavior checked
- Operational owner/runbook
- Documentation updated

---

## 138. Open Decisions

| ID | Decision | Recommendation | Blocking stage |
|---|---|---|---|
| AUTH-001 | Partner daily sign-in method | Password baseline; magic link only after risk review | Portal auth |
| AUTH-002 | Protected canonical host | `app.infravolt.co.uk` | Production |
| AUTH-003 | Partner Admin MFA timing | Required in V1; offer earlier | V1 |
| AUTH-004 | Exact session timeout enforcement | Admin 30m/12h; Portal 2h/24h | Production |
| AUTH-005 | Strict CSP strategy | Protected nonce; public measured strategy | Hardening |
| AUTH-006 | Break-glass provider/account design | Named, MFA, audited | Production |
| AUTH-007 | Document outer grant-link expiry tiers | 24h baseline by classification | Document launch |
| AUTH-008 | Malware scanning provider/workflow | Required before public attachment gate | Upload launch |
| AUTH-009 | Security log/audit retention | Legal + security schedule | Production |
| AUTH-010 | External penetration test timing | Before high-risk broad launch | Launch |
| AUTH-011 | Passkey/WebAuthn | V1 assessment | V1 |
| AUTH-012 | Data breach legal runbook UK/UA | Counsel-approved | Production |

---

## 139. Founder Approval Checklist

- [ ] Invite-only account model approved
- [ ] Internal MFA mandatory approved
- [ ] Partner MFA roadmap approved
- [ ] RBAC + scoped ABAC model approved
- [ ] Role list approved
- [ ] Atomic permission families approved
- [ ] Company/market isolation approved
- [ ] RLS defense-in-depth approved
- [ ] Private document and 120-second URL approved
- [ ] Public form/upload controls approved
- [ ] Security incident ownership approved
- [ ] Access review cadence approved
- [ ] MVP security release gates approved

---

## 140. Implementation Backlog

1. Auth provider/project configuration
2. SSR browser/server clients
3. Login/callback/recovery
4. MFA enrollment/challenge
5. User profile/membership resolution
6. Roles/permissions seed
7. Authorization service
8. RLS helpers/policies
9. Admin route/action guards
10. Portal company/resource guards
11. Safe DTO layer
12. Turnstile/rate limit/idempotency
13. Private Storage/download
14. Webhook/cron verification
15. Headers/CSP
16. Audit/security events
17. Security tests and operational runbooks

---

## 141. Resmi Teknik Kaynaklar

- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [OWASP ASVS 5.0 Cheat Sheet Index](https://cheatsheetseries.owasp.org/IndexASVS.html)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP File Upload Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
- [NIST SP 800-63-4 Digital Identity Guidelines](https://pages.nist.gov/800-63-4/)
- [NIST SP 800-63B Authentication and Authenticator Management](https://pages.nist.gov/800-63-4/sp800-63b.html)
- [Supabase Server-Side Auth](https://supabase.com/docs/guides/auth/server-side)
- [Supabase SSR Advanced Guide](https://supabase.com/docs/guides/auth/server-side/advanced-guide)
- [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Next.js Authentication Guide](https://nextjs.org/docs/app/guides/authentication)
- [Next.js Content Security Policy Guide](https://nextjs.org/docs/app/guides/content-security-policy)

Bu kaynaklar implementation sırasında kullanılan exact provider/framework version’ıyla yeniden doğrulanır.

---

## 142. Son Karar

InfraVolt güvenliği tek bir middleware, login provider veya RLS policy’ye bırakılmayacaktır.

Doğru model:

- invite-only identities,
- internal MFA,
- current database-backed membership,
- atomic permission,
- company/market/resource scope,
- application authorization,
- RLS backstop,
- safe DTO,
- private Storage,
- short-lived document delivery,
- audit, monitoring ve incident response

katmanlarının birlikte çalışmasıdır.

Özellikle Partner Portal company isolation ve Admin privilege governance negatif güvenlik testleri geçmeden production’a çıkmayacaktır.

---

## 143. Document Control

### 143.1 Approval

| Role | Name | Status | Date |
|---|---|---|---|
| Founder / CEO | Erhan Baydi | Pending | — |
| Technical Owner | — | Pending | — |
| Security Reviewer | — | Pending | — |
| Admin Operations Owner | — | Pending | — |
| Partner Operations Owner | — | Pending | — |
| Privacy/Legal Reviewer | — | Pending | — |

### 143.2 Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1.0 | 15 July 2026 | InfraVolt Product Team | Initial authentication, RBAC/ABAC, RLS, application security and operations contract |

### 143.3 Change Rule

Auth method, MFA, session, role, permission, company/market scope, RLS, document delivery, secret, security header, incident veya release-gate kararındaki değişiklik bu belgenin version update’ini gerektirir.
