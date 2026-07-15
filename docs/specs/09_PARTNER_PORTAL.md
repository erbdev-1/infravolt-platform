# InfraVolt — Partner Portal

> Document ID: INF-09  
> Version: 0.1.0  
> Status: Draft for Founder, Partner Operations and Technical Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Technical Owner: Product Director / CTO / Head Agent  
> Operations Owner: Dealer / Partner Operations  
> Experience Owner: Product Design / Frontend  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0, 06_DATABASE_SCHEMA.md v0.1.0, 07_BACKEND_API_AND_WORKFLOWS.md v0.1.0, 08_ADMIN_AND_SALES_OPERATIONS.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required portal locales: en-GB + uk-UA  
> Accessibility target: WCAG 2.2 AA  
> Last updated: 15 July 2026  
> Document language: Turkish; route, role, permission, status, action and component identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt Partner Portal ürününü tanımlar.

Belge:

- onaylı bayi ve partner kullanıcılarının onboarding deneyimini,
- portal information architecture ve navigation modelini,
- company ve team yönetimini,
- teklif ve proje görünürlüğünü,
- yetkili teknik doküman erişimini,
- destek ve bildirim akışlarını,
- UK/Ukrayna locale davranışını,
- role, company, market, product ve document scope kurallarını,
- privacy, security, accessibility ve responsive gereksinimlerini,
- MVP, V1 ve ertelenen kapsamı

kesinleştirir.

Bu belge yalnız ekran listesi değildir. Partnerın ne görebileceğini, ne yapabileceğini ve hangi bilginin hiçbir koşulda portal DTO’suna giremeyeceğini tanımlar.

---

## 2. Ana Karar

InfraVolt Partner Portal, public website’ten ayrı bir ticari site veya ayrı bir bayi uygulaması olmayacaktır.

Portal:

- aynı ürünün protected surface’i,
- tek `/portal` route namespace’i,
- company-scoped authorization,
- market/product/document policy,
- read-heavy başlangıç,
- güvenli ve anlaşılır customer-facing status’lar

ile çalışacaktır.

UK ve Ukrayna partnerları ayrı kod tabanları kullanmaz. Public market domain’i lead’in market context’ini belirler; authenticated portal içinde kullanıcı `en-GB` veya `uk-UA` tercih edebilir.

---

## 3. Portalın Ürün Vaadi

Partner portalı kullanıcıya şu net cevabı vermelidir:

> InfraVolt ile şirketim arasındaki güncel ticari ve teknik bilgiye güvenli biçimde nereden ulaşırım?

Portalın temel değeri:

- teklif durumunu tekrar e-posta sormadan görmek,
- yalnız yetkili olunan teknik dokümanlara erişmek,
- yeni veya güncellenmiş dokümanları fark etmek,
- şirket ekibini güvenli biçimde yönetmek,
- doğru bağlamla destek talebi oluşturmak,
- UK ve Ukrayna operasyonlarını aynı ürün kalitesiyle kullanmaktır.

---

## 4. Portal Hedefleri

- Partner onboarding süresini azaltmak
- Teklif ve teknik bilgi için e-posta bağımlılığını düşürmek
- Private document paylaşımını izlenebilir yapmak
- Her şirketi kesin tenant sınırıyla ayırmak
- Partnera gerekli bilgiyi göstermek, internal operasyon bilgisini göstermemek
- Küçük ve orta ölçekli partner ekiplerinde self-service sağlamak
- Partner Operations ekibinin tekrar eden sorularını azaltmak
- Mobile ve düşük bant genişliğinde kullanılabilir olmak
- UK ve Ukrayna için locale-aware deneyim sunmak
- Gelecekte proje/order modüllerine kontrollü büyüyebilmek

---

## 5. Ürün İlkeleri

### 5.1 Secure by default

Bir kayıt için açık izin yoksa erişim yoktur. UI’da link görünmemesi authorization değildir; server her istekte scope’u doğrular.

### 5.2 Company before user convenience

Kullanıcı deneyimi kolaylaştırılır fakat company isolation hiçbir shortcut için zayıflatılmaz.

### 5.3 Partner-safe language

Internal pipeline, lost reason, risk score, margin veya supplier notation portal diline taşınmaz.

### 5.4 Read first, mutate carefully

MVP’nin önceliği güvenli bilgi erişimidir. Master company verisi ve partner scope doğrudan partner tarafından değiştirilemez.

### 5.5 No false progress

Dashboard’da yalnız gerçek, açıklanabilir ve kaynak kaydı bulunan durumlar gösterilir.

### 5.6 One portal, scoped experiences

Dealer, reseller, installer veya strategic partner için ayrı uygulama yoktur. Navigation ve içerik permission/scope ile uyarlanır.

### 5.7 Mobile is a first-class surface

Teklif kontrolü, doküman bulma ve destek talebi mobile cihazda tamamlanabilir olmalıdır.

### 5.8 Human escalation remains available

Portal operasyon ekibinin yerini tamamen almaz. Belirsiz veya hassas durumlarda açık destek ve contact yolu sunar.

---

## 6. Portal Kapsamı

### 6.1 MVP dahil

- Secure sign-in ve invitation acceptance
- Portal onboarding status
- Partner dashboard
- Company summary
- Personal account/preferences
- Company quote list/detail
- Authorized document library
- Short-lived secure document download
- Document access request
- Authenticated support request
- en-GB ve uk-UA portal preference
- Suspended/disabled account handling

### 6.2 V1 dahil

- Partner team invitation/revocation
- Company profile change request
- Partner-safe quote messages
- Customer project list/detail
- In-app notifications
- Document expiry/updated-version notices
- Support request history

### 6.3 Ertelenen

- Order management
- Invoice/payment
- Public or partner checkout
- Stock/warehouse visibility
- Supplier portal
- Contract e-signature
- Mass document download
- Full CRM timeline
- Advanced BI dashboards
- Partner-to-partner collaboration
- Native mobile application

---

## 7. Portal Kullanıcıları

Portal yalnız active ve authorized partner organization kullanıcıları içindir.

| User type | Portal durumu | Baseline erişim |
|---|---|---|
| Approved partner admin | Active | Company-wide safe data + team administration |
| Approved partner user | Active | Company-wide safe data according to assigned permissions |
| Invited user | Pending acceptance | Invitation acceptance only |
| Applicant | Not yet partner | Public dealer application/status communication only |
| Suspended partner | Suspended | Restricted notice and support route |
| Revoked user | Revoked | No portal access |
| Internal employee | Internal | Admin surface; portal impersonation baseline’da yok |

Dealer application approval tek başına kullanıcı hesabını aktive etmez. Portal erişimi invitation acceptance, active membership ve active partner profile sonrasında başlar.

---

## 8. Portal Rolleri

### 8.1 `partner_admin`

- Kendi company’sinin portal alanını görür
- Company-safe quote ve project kayıtlarını görür
- Yetkili dokümanları görür ve indirir
- Kendi şirketi adına destek/access request açar
- V1’de company user invite/revoke yapar
- Company profile değişiklik talebi açar
- Başka company, market veya product scope veremez
- Kendisini internal role’a yükseltemez

### 8.2 `partner_user`

- Kendi company’sinin izinli portal verisini görür
- Yetkili dokümanları görür ve indirir
- Kendi account/preferences’ını günceller
- Destek talebi açar
- Team ve legal company master data yönetemez

### 8.3 Rol ilkesi

`partner_admin`, internal `admin` değildir. İsim benzerliği permission eşitliği oluşturmaz.

---

## 9. Capability Matrisi

| Capability | `partner_admin` | `partner_user` | MVP/V1 |
|---|---:|---:|---|
| Portal dashboard | Yes | Yes | MVP |
| Company summary | Yes | Yes | MVP |
| Own account/preferences | Manage | Manage | MVP |
| Company quotes | Read | Read if permitted | MVP |
| Quote safe detail | Read | Read if permitted | MVP |
| Authorized documents | Read/download | Read/download | MVP |
| Document access request | Create | Create | MVP |
| Authenticated support | Create | Create | MVP |
| Company profile change request | Create | No | V1 |
| Team list | Read | No | V1 |
| Invite company user | Manage | No | V1 |
| Revoke company user | Manage | No | V1 |
| Partner-safe quote message | Create | Create if permitted | V1 |
| Projects | Read | Read if permitted | V1 |
| Orders | No | No | Deferred |
| Partner scope management | No | No | Internal only |

---

## 10. Authorization Kararı

Bir active portal actor oluşturmak için tüm koşullar geçerli olmalıdır:

1. Valid authenticated session
2. Active user profile
3. Active company membership
4. Membership üzerinde portal role
5. Active partner profile
6. `portal_enabled = true`
7. Route/action için required permission
8. İlgili market/product/document scope
9. Target record’ın aynı company’ye ait olması veya açık grant bulunması

Client’tan gelen `companyId`, `marketId`, `partnerId` veya role id authorization kaynağı değildir.

---

## 11. Tenant ve Company Scope

### 11.1 Server-forced scope

Company context active membership’ten server tarafından üretilir.

### 11.2 Cross-company default deny

Bir URL’de başka company’ye ait geçerli UUID kullanılması erişim sağlamaz.

### 11.3 Non-disclosure response

Unauthorized foreign record için uygulama kaydın varlığını açıklamaz. Policy’ye göre generic `not_found` veya safe `forbidden` döner.

### 11.4 Multi-company user

MVP’de bir portal session için tek active partner company desteklenir. Aynı kişinin birden fazla company üyeliği gerçek ihtiyaç olursa V1’de explicit company switcher eklenir.

Switcher eklenirse:

- active company server session context’inde tutulur,
- her switch yeniden authorization kontrolü yapar,
- browser storage tenant authority olmaz,
- company adı app shell’de sürekli görünür.

---

## 12. Market ve Product Scope

Partner company’nin erişimi üç katmanda sınırlandırılır:

| Scope | Kaynak | Etkisi |
|---|---|---|
| Company | `company_memberships` | Hangi organization verisi |
| Market | `partner_market_scopes` | UK/UA veya izinli pazar |
| Product | `partner_product_scopes` | İzinli category/product family |

Market scope portal UI locale’i değildir. Kullanıcı Ukraynaca UI seçebilir fakat bu seçim UK-only business scope’u UA’ya genişletmez.

---

## 13. Protected Host ve URL Modeli

Önerilen canonical protected host:

~~~text
https://app.infravolt.co.uk/portal
~~~

Alternatif host kararı `TA-001/API-001` kapsamında founder approval gerektirir.

Kurallar:

- Portal route’ları `noindex, nofollow` olur
- Public UK/UA domain navigation portal içeriğini duplicate etmez
- Login sonrası yalnız doğrulanmış relative return path kabul edilir
- External redirect URL kabul edilmez
- Portal linkleri e-postalarda canonical protected host kullanır

---

## 14. Authentication ve Session

### 14.1 Sign-in

Baseline authentication Supabase Auth ile email-based secure sign-in’dir. Exact password/magic-link kararı Technical Architecture ile hizalı uygulanır.

### 14.2 Session rules

- Secure, HttpOnly cookie
- Short inactive session policy
- Sensitive action öncesi recent authentication gerektiğinde re-auth
- Sign-out sonrası protected cache temizliği
- Revocation/suspension mümkün olan ilk request’te etkili

### 14.3 MFA

MFA MVP release blocker değildir; `partner_admin` ve high-value document erişimi için V1 değerlendirmesidir.

### 14.4 Recovery

Account recovery company scope’u veya role’ü değiştirmez. Recovery tamamlandığında authorization tekrar database’ten kurulur.

---

## 15. Invitation Acceptance Akışı

~~~mermaid
flowchart TD
    A["Admin creates invitation"] --> B["User opens secure link"]
    B --> C["Identity verified"]
    C --> D["Invitation current and unused?"]
    D -->|No| E["Safe expired or invalid state"]
    D -->|Yes| F["Create or link user profile"]
    F --> G["Activate company membership"]
    G --> H["Assign bounded partner role"]
    H --> I["Portal onboarding"]
~~~

Invitation kuralları:

- Token tek kullanımlık ve expiring olmalıdır
- Invitation target company server-side kayıtlıdır
- Accept request company/role değiştiremez
- Already accepted invitation idempotent safe response verir
- Suspended/terminated partner için invitation aktive edilmez
- Invitation acceptance audit edilir

---

## 16. İlk Giriş ve Onboarding

İlk girişte kullanıcı doğrudan boş dashboard’a bırakılmaz.

Onboarding checklist:

1. Ad ve iletişim bilgisini doğrula
2. Company adını ve partner durumunu görüntüle
3. Portal terms/privacy acknowledgement
4. Preferred language seç
5. Notification preferences seç
6. Authorized product/market summary’yi gör
7. Document library ve support entry point’i tanı

`partner_admin` için V1 ek adım:

8. Company team’i gözden geçir

Onboarding tamamlanmamış olsa bile kullanıcı güvenli temel alanlara erişebilir; yalnız zorunlu legal acknowledgement eksikse gated step uygulanabilir.

---

## 17. Partner Status Modeli

| Partner profile status | Portal davranışı |
|---|---|
| `pending_onboarding` | Checklist + sınırlı approved content |
| `active` | Normal scoped portal |
| `suspended` | Restricted notice + support/contact |
| `terminated` | Access denied; generic support path |

Suspended kullanıcıya internal suspension note veya risk rationale gösterilmez. Partner-safe reason varsa ayrı external message alanından gösterilir.

---

## 18. Information Architecture

Portal beş ana görev çevresinde kurulur:

1. Overview
2. Commercial records
3. Technical documents
4. Company and team
5. Help and account

Navigation product scope’a göre dinamik olabilir fakat aynı rol için kararsız biçimde değişmemelidir.

---

## 19. Primary Navigation

Baseline desktop navigation:

- Dashboard
- Quotes
- Projects — V1, yalnız enabled ise
- Documents
- Company
- Support

Account ve language app shell user menu içindedir.

`Orders` navigation’a MVP/V1’de konmaz. Empty placeholder ile gelecek özellik reklamı yapılmaz.

---

## 20. Route Register

| Route | Screen | Release | Access |
|---|---|---|---|
| `/portal` | Dashboard | MVP | Active portal actor |
| `/portal/company` | Company summary | MVP | Company member |
| `/portal/company/team` | Team management | V1 | `partner_admin` |
| `/portal/quotes` | Quote list | MVP | Quote read permission |
| `/portal/quotes/[quoteId]` | Quote detail | MVP | Same-company scoped record |
| `/portal/projects` | Project list | V1 | Project read permission |
| `/portal/projects/[projectId]` | Project detail | V1 | Same-company scoped record |
| `/portal/orders` | Reserved | Deferred | No route in release |
| `/portal/orders/[orderId]` | Reserved | Deferred | No route in release |
| `/portal/documents` | Authorized document library | MVP | Document read permission |
| `/portal/documents/[documentId]` | Document metadata/detail | V1 | Current access decision |
| `/portal/support` | Support center/request | MVP | Active portal actor |
| `/portal/support/[requestId]` | Support request detail | V1 | Same-company requester scope |
| `/portal/account` | Account/preferences | MVP | Authenticated user |

---

## 21. Portal App Shell

App shell şunları içerir:

- InfraVolt logo
- Current company name
- Primary navigation
- Current locale
- User menu
- Notification entry — V1
- Mobile navigation trigger

App shell şunları içermez:

- Internal admin link
- Internal role name
- Lead score
- Partner tier eğer external olarak paylaşılmıyorsa
- Supplier/internal system navigation

---

## 22. Responsive Navigation

### 22.1 Desktop

Persistent side navigation veya compact top/side hybrid kullanılabilir.

### 22.2 Tablet

Navigation collapse olabilir; active route ve company context görünür kalır.

### 22.3 Mobile

- Accessible menu/drawer
- Current page title
- Company identity
- Critical action’lara thumb-friendly erişim
- Modal içinde nested modal yok
- Wide table yerine card/list veya horizontal strategy

---

## 23. Portal Visual Density

Portal admin kadar dense olmayacaktır.

Baseline:

- comfortable spacing
- clear status labels
- açıklayıcı helper text
- az sayıda primary action
- kolay taranan listeler
- teknik dokümanda güçlü metadata

Admin’e özgü compact bulk-action tablolar portalda kullanılmaz.

---

## 24. Localization Modeli

Portal iki locale destekler:

- `en-GB`
- `uk-UA`

### 24.1 Locale source priority

1. Authenticated user preference
2. Accepted invitation locale hint
3. Safe browser preference
4. `en-GB` fallback

### 24.2 Locale and market separation

UI dili market scope’u değiştirmez.

### 24.3 Content fallback

Partner-facing critical text hedef locale’de yoksa:

- fallback language açık biçimde kullanılabilir,
- teknik/legal içerik yanlış makine çevirisiyle yayınlanmaz,
- document’ın mevcut language’i metadata’da gösterilir.

### 24.4 Formatting

- Date/time locale-aware
- UK/UA timezone ve user timezone semantics açık
- Currency record’ın commercial market/currency alanından gelir
- Decimal ve measurement birimleri tutarlı gösterilir

---

## 25. Dashboard Amacı

Dashboard partnera şu soruları cevaplar:

- Hesabım ve şirketim aktif mi?
- Açık tekliflerimde ne değişti?
- Hangi teknik dokümanlara erişebilirim?
- Yeni veya güncellenmiş doküman var mı?
- Bekleyen bir access/support talebim var mı?
- Bir sonraki mantıklı aksiyonum ne?

Dashboard vanity chart sayfası değildir.

---

## 26. Dashboard Bölümleri

MVP baseline sırası:

1. Welcome + company identity
2. Onboarding/approval alert — yalnız gerekiyorsa
3. Open quote summary
4. Recently available documents
5. Pending document requests
6. Support quick action

V1 ekleri:

- Active projects
- Recent partner-visible activity
- Notification center summary

---

## 27. Dashboard Card Kuralları

Her card:

- açık label,
- explainable count/status,
- son güncelleme zamanı gerekiyorsa,
- tek ana action,
- empty state

içerir.

Gösterilmeyecek dashboard verileri:

- Internal sales priority
- Margin veya discount guardrail
- Supplier cost/availability notes
- Internal owner performance
- Private operational status
- Fraud/risk score
- Internal lost reason

---

## 28. Company Summary

`/portal/company` güvenli company özeti gösterir:

- Display/legal company name
- Public/trading name varsa
- Country/market summary
- Partner status
- Authorized product/category summary
- Main company contact
- Partner relationship contact — paylaşılması onaylıysa
- Account creation/onboarding date
- Team summary — `partner_admin`, V1

Company internal notes, credit risk, margin class ve admin-only tags gösterilmez.

---

## 29. Company Data Ownership

| Alan | Partner action | Kontrol |
|---|---|---|
| Legal name | Change request | Internal review |
| Registration/VAT number | Change request | Internal review |
| Billing/legal address | Change request | Internal review |
| Trading name | Change request | Internal review |
| Main phone/website | Change request or safe edit | Field policy |
| Partner market scope | No direct edit | `dealer_manager` |
| Product scope | No direct edit | `dealer_manager`/technical |
| Partner status | No direct edit | Internal workflow |
| Own person name/phone | Direct own-profile edit | Validation + audit where needed |
| Own locale/preferences | Direct own-profile edit | User-owned |

---

## 30. Company Profile Change Request

V1’de legal/master data değişikliği doğrudan company row update etmez.

Akış:

1. `partner_admin` current value’i görür
2. Proposed value ve reason girer
3. Authenticated support/change request oluşur
4. Company ve requester otomatik bağlanır
5. Internal operations doğrular
6. Approved change admin workflow ile uygulanır
7. Partnera safe outcome bildirimi gider

Baseline implementation mevcut enquiry/support modelini `account_update` sınıfıyla genişletebilir. Ayrı change-request table ancak volume gerektirirse eklenir.

---

## 31. Team Management

`/portal/company/team` V1 özelliğidir ve yalnız `partner_admin` erişir.

Ekran:

- Active team members
- Pending invitations
- Revoked members — gerekli minimum history
- Role label
- Last active time — privacy policy izin verirse coarse format
- Invite action
- Revoke action

Team ekranı internal user profile, security log veya başka company membership’lerini göstermez.

---

## 32. Invite Company User

V1 action: `inviteCompanyUserAction`

Input:

- Email
- Display name optional
- Bounded portal role
- Locale hint optional
- Permission subset only if product model enables it

Kurallar:

- Actor `partner_admin` olmalıdır
- Target company active membership’ten server-side alınır
- Actor kendi sahip olmadığı role/scope’u veremez
- Existing active member için duplicate invitation oluşmaz
- Invitation expiry vardır
- Rate limit uygulanır
- Invitation ve acceptance audit edilir

---

## 33. Revoke Company User

V1 action: `revokeCompanyUserAction`

Kurallar:

- Target aynı company’de olmalıdır
- `partner_admin` kendini yanlışlıkla son admin olarak revoke edemez
- Son active `partner_admin` korunur
- Revocation active session access’ini en kısa sürede keser
- Historical quote/document access events silinmez
- Revoked kullanıcı yeniden invitation olmadan dönemez

---

## 34. Account ve Personal Profile

`/portal/account` şunları yönetir:

- Name
- Job title
- Phone
- Preferred locale
- Email notification preferences
- Security/session entry points
- Terms/privacy reference
- Sign out

Email identity change ayrı secure verification flow gerektirir; normal profile update ile aynı mutation değildir.

---

## 35. Notification Preferences

MVP minimum preferences:

- Quote status updates
- Document access decisions
- New document version available
- Support updates
- Service/security notices — zorunlu olabilir

Kullanıcı marketing consent ile operational notification’ı aynı kontrol altında kapatamaz.

---

## 36. Quotes Modülü Amacı

Quotes modülü partnera commercial request’in güvenli özetini ve current customer-facing status’unu gösterir.

Quote:

- order değildir,
- invoice değildir,
- stock reservation değildir,
- fiyatın kesinliği ancak approved proposal ile belirtilir,
- internal pipeline’ın birebir aynası değildir.

---

## 37. Quote List

`/portal/quotes` list item/row alanları:

- Partner-facing quote reference
- Request title/summary
- Market
- Customer-facing status
- Created/requested date
- Last partner-visible update
- Product/category summary
- Primary action: View details

Filters:

- Status
- Market — yalnız multi-market scope varsa
- Date range
- Product/category
- Search by safe reference/title

Filter state URL search params’ta tutulabilir; authorization veya hidden scope URL’den alınmaz.

---

## 38. Quote Detail

`/portal/quotes/[quoteId]` safe detail:

- Quote reference
- Customer-facing status
- Request summary
- Submitted items and quantities if approved for display
- Market/currency
- Partner-visible dates
- Partner-visible files/proposal if explicitly granted
- Safe next step
- Support/message action
- Partner-visible activity — V1

Detail response hiçbir zaman repository entity’sinin doğrudan serialize edilmiş hali değildir. Dedicated portal DTO kullanılır.

---

## 39. Quote Status Translation

Internal state customer-facing label’e çevrilir.

| Internal state örneği | Portal label | Partner açıklaması |
|---|---|---|
| `new`, `triage` | Received | Talep InfraVolt’a ulaştı |
| `qualified` | In review | Gereksinimler değerlendiriliyor |
| `preparing` | Preparing response | Ticari/teknik yanıt hazırlanıyor |
| `waiting_customer` | Information required | Partner aksiyonu gerekiyor |
| `sent` | Proposal sent | Paylaşılabilir teklif/yanıt gönderildi |
| `revision_requested` | Revision in progress | Güncelleme hazırlanıyor |
| `won`, `accepted` | Confirmed | Talep/teklif onaylandı |
| `lost`, `archived` | Closed | Süreç kapandı |
| `cancelled` | Cancelled | Talep iptal edildi |

Exact internal enum Database/API belgeleriyle uygulanır. Portal mapping tek service içinde tutulur; client hard-code etmez.

---

## 40. Quote Visibility Contract

### 40.1 Gösterilebilir

- Partnerın gönderdiği request data
- Approved customer-facing status
- Approved proposal/reference
- Safe next action
- Partner-visible messages
- Explicitly shared files

### 40.2 Gösterilemez

- Internal notes
- Internal assignee/queue
- Lead score/priority
- Cost, margin, approval threshold
- Supplier names/quotes unless explicitly commercial contract requires
- Fraud/risk flags
- Internal lost reason
- Draft proposal revisions
- Employee-only activity
- Notification delivery internals

---

## 41. Quote Files ve Proposal

MVP’de portal bir proposal file gösterecekse:

- file private storage’da bulunur,
- explicit partner-safe classification gerekir,
- quote/company scope doğrulanır,
- download signed short-lived URL ile olur,
- version ve validity date görünür,
- obsolete proposal açık biçimde marked olur.

Internal draft attachment portal DTO’suna dahil edilmez.

---

## 42. Partner-Safe Quote Activity

V1 timeline yalnız external events içerir:

- Request received
- Information requested
- Partner information submitted
- Proposal shared
- Revision requested
- Updated proposal shared
- Quote confirmed/closed

Internal assignment, note, SLA breach ve background job activity gösterilmez.

---

## 43. Quote Message Akışı

V1 conditional action: `addPartnerQuoteMessageAction`

Kurallar:

- Quote same-company scope içinde olmalıdır
- Plain text baseline
- Attachment yalnız ayrı secure upload contract ile
- Rate limit ve abuse protection
- Message partner-visible olarak işaretlenir
- Internal reply explicit external visibility olmadan portalda görünmez
- Email notification message commit sonrasında outbox ile gider

MVP’de bu özellik support request’e yönlendirilebilir.

---

## 44. New Quote Request

Partner portalı MVP’de ayrı complex CPQ sunmaz.

Yeni quote ihtiyacı:

- public `Request a Quote` akışının authenticated varyantına yönlenebilir,
- company ve requester context server-side bağlanır,
- market active scope’tan doğrulanır,
- client hidden field company authority olmaz.

Dedicated portal quote builder ölçülen ihtiyaç sonrası tasarlanır.

---

## 45. Projects Modülü

Projects V1 özelliğidir.

Amaç:

- Confirmed commercial work için partner-safe high-level progress,
- shared milestone/documents,
- support context

sunmaktır.

Project ekranı internal project management aracı değildir.

---

## 46. Project List ve Detail

List:

- Project reference/name
- Safe phase/status
- Related quote reference
- Market
- Last partner-visible update

Detail:

- Scope summary
- Partner-visible milestones
- Approved documents
- Safe contact/support action
- Partner-visible updates

Internal task assignments, capacity plans, supplier delays ve private risks gösterilmez; gerekirse bunların partner-safe sonucu ayrı açıklama olarak paylaşılır.

---

## 47. Orders Kararı

`/portal/orders` ve `/portal/orders/[orderId]` IA rezervidir fakat release route’u değildir.

Order modülü ancak şu contract’lar netleşince açılır:

- Order source of truth
- ERP/inventory ownership
- Partner-facing order status
- Delivery tracking provider
- Invoice/payment boundary
- Cancellation/return policy
- Market/legal obligations

Quote kaydı order gibi sunulmaz.

---

## 48. Document Library Amacı

Document Library partnerın şirket, market, product ve explicit grant scope’una göre erişebildiği current technical/commercial dokümanları gösterir.

Portal storage browser değildir. Kullanıcı object path, bucket veya raw file metadata görmez.

---

## 49. Document List

`/portal/documents` item alanları:

- Document title
- Document type
- Product/category
- Market relevance
- Language
- Version/revision
- Published/effective date
- Updated/new indicator
- Access/expiry state
- Download/view action

Default order:

1. Newly available/current updates
2. Product/category relevance
3. Recency

---

## 50. Document Filters ve Search

Filters:

- Product/category
- Document type
- Language
- Market
- Updated/new
- Access state

Search:

- yalnız authorized metadata üzerinde çalışır,
- unauthorized document existence’ını autocomplete ile sızdırmaz,
- full text search future consideration’dır,
- raw object filename/path aramaz,
- query analytics privacy-safe tutulur.

---

## 51. Document Types

Örnek partner document taxonomy:

- Datasheet
- Technical specification
- Installation guide
- User manual
- Declaration/certificate
- Drawing/CAD reference
- Product presentation
- Commercial support material
- Policy/terms
- Training material

Taxonomy 04 Design System component label ve 08 Admin publishing workflow ile aynı source of truth’tan gelir.

---

## 52. Document Access Decision

Erişim kararı request anında hesaplanır.

~~~mermaid
flowchart TD
    A["Authenticated user"] --> B["Active company membership"]
    B --> C["Active partner profile"]
    C --> D["Market and product scope"]
    D --> E["Document policy or explicit grant"]
    E --> F["Current published version"]
    F --> G["Short-lived signed access"]
~~~

Bir önceki sayfa render’ında izin verilmiş olması download anında yeterli değildir.

---

## 53. Document Grant Modeli

Access kaynakları:

- Role/policy-based general access
- Company-level explicit grant
- User-level explicit grant — exceptional
- Request approval sonucu grant

Grant alanları en az:

- Subject/company/user
- Document or document class
- Granted by
- Granted at
- Expiry optional
- Revoked at optional
- Reason/reference

Broad wildcard grant kullanımı minimum tutulur.

---

## 54. Secure Download Workflow

Endpoint:

~~~text
POST /api/documents/[documentId]/download
~~~

Akış:

1. Session doğrulanır
2. Active portal actor kurulur
3. Document id parse edilir
4. Current publication/version doğrulanır
5. Company/market/product/grant policy hesaplanır
6. Access event kaydı veya audit intent oluşturulur
7. Supabase Storage için yaklaşık 120 saniyelik signed URL üretilir
8. Safe response client’a döner

Permanent storage URL:

- portal HTML’ine,
- e-postaya,
- analytics payload’a,
- log message’a

yazılmaz.

---

## 55. Download UX

Kullanıcı download action sonrası:

- loading state,
- success veya safe error,
- dosya adı/type,
- version,
- expiry/access note gerekiyorsa

görür.

Signed URL’nin süresi geçmişse kullanıcı aynı document action’ını tekrar çalıştırabilir; eski URL refresh edilmez.

Mass download/ZIP MVP’de yoktur. Bu karar audit, revocation ve accidental data export riskini azaltır.

---

## 56. Document Access Request

Action: `requestPartnerDocumentAccessAction`

Input:

- Target document veya safe document reference
- Business reason
- Project/quote reference optional
- Required-by date optional

Server derives:

- User
- Company
- Existing partner scope
- Market

Akış sonucu:

- request created,
- duplicate active request engellenir,
- dealer/document manager queue’suna düşer,
- user safe confirmation alır,
- approval/rejection sonrası notification üretilir.

---

## 57. Access Request Status

Partner-facing states:

| Internal workflow | Portal label |
|---|---|
| `new`, `pending_review` | Pending review |
| `information_requested` | Information required |
| `approved` | Access granted |
| `rejected` | Not approved |
| `expired` | Access expired |
| `cancelled` | Cancelled |

Internal reviewer note gösterilmez. Rejection için yalnız approved external reason template veya safe custom reason kullanılır.

---

## 58. Document Versioning

- Portal default olarak current approved version gösterir
- Replaced version “current” olarak görünmez
- Historical version yalnız explicit regulatory/business need varsa gösterilir
- New version existing grant’i policy’ye göre inherit eder veya review gerektirir
- Version change partnera notification üretebilir
- Download event exact version’a bağlanır

---

## 59. Newly Available Documents

Dashboard ve document list `new` işaretini user-relative üretebilir.

Baseline seçenek:

- Son 14/30 günde grant veya publish edilen,
- kullanıcı tarafından henüz açılmamış current version

`New` işareti business truth değildir; explainable user convenience state’idir. Kritik compliance acknowledgement gerekiyorsa ayrı explicit workflow gerekir.

---

## 60. Support Center

`/portal/support` şunları sunar:

- New support request
- Technical support
- Quote/commercial question
- Document/access question
- Account/company update
- General partner support
- Existing request history — V1
- Emergency contact guidance — yalnız gerçek operasyon varsa

Portal support genel public contact formundan farklı olarak company ve user context’ini otomatik bağlar.

---

## 61. Authenticated Support Request

Form fields:

- Category
- Subject
- Description
- Related quote/project/document optional
- Contact preference optional
- Attachment — V1 secure upload

Server-derived:

- Requester user
- Company
- Market scope/context
- Locale
- Related record authorization

Active authenticated user baseline’da Turnstile çözmez; rate limit, payload limits ve risk controls yine uygulanır.

---

## 62. Technical Support

Technical support formu gerektiğinde şu structured fields’i kullanabilir:

- Product/category
- Model/reference
- Installation/use context
- Issue type
- Safety impact indicator
- Description
- Related technical document

Safety-critical ifade algılanırsa user’a emergency/safety guidance ve internal escalation uygulanır. Portal definitive engineering advice üretmez.

---

## 63. Support Request History

V1’de partner yalnız own-company safe support records görür.

List/detail:

- Request reference
- Category
- Safe status
- Created/updated date
- Partner-visible messages
- Related safe entity link

Internal notes, assignment, SLA breach reason ve employee-only attachments gösterilmez.

---

## 64. Support Status Translation

| Internal example | Portal label |
|---|---|
| `new`, `triage` | Received |
| `in_progress` | In progress |
| `waiting_customer` | Your response needed |
| `waiting_internal` | In progress |
| `resolved` | Resolved |
| `closed` | Closed |

Internal queue transition’ları customer timeline’a gereksiz event olarak yansımaz.

---

## 65. Portal Search

MVP’de global search zorunlu değildir. V1 eklenirse:

- Quote ve authorized document metadata’yı arar
- Result type açık gösterilir
- Company scope her query’de uygulanır
- Unauthorized entity existence’ı result count ile sızdırılmaz
- Search term log’ları private record detail taşımayacak şekilde redacted edilir
- Search index source authorization’ı bypass etmez

---

## 66. In-App Notifications

V1 notification types:

- Quote status changed
- Information required
- Proposal shared
- Document access approved/rejected
- New document version
- Support response
- Invitation/team change
- Security/service notice

Notification bir authorization grant değildir. Click sırasında target record access’i yeniden kontrol edilir.

---

## 67. Email Notifications

Email:

- Minimum private detail içerir
- Permanent document link içermez
- Portal canonical route’una gider
- Locale preference’e göre render edilir
- Operational ve marketing category’leri ayırır
- Business commit sonrasında outbox/worker ile gönderilir

Email delivery failure business record’ı geri almaz; operational retry queue’ya düşer.

---

## 68. Empty States

İyi empty state:

- neden boş olduğunu söyler,
- kullanıcı aksiyonu varsa sunar,
- olmayan özellik varmış gibi davranmaz.

Örnekler:

- “No quotes yet” + Request a quote
- “No documents available for your current scope” + Request access/contact
- “No active projects” — Projects enabled ise
- “No support requests” + Create request

---

## 69. Loading States

- Skeleton gerçek layout’u taklit eder
- Long action’da button progress gösterir
- Download button duplicate click’i engeller
- Route transition focus management’i bozulmaz
- Kullanıcı status update’in tamamlandığını açık feedback ile anlar
- Private response client cache’inde gereksiz uzun tutulmaz

---

## 70. Error States

Portal error contract:

| Error | User experience |
|---|---|
| Session expired | Sign-in + safe return path |
| No membership | Access unavailable + support |
| Suspended partner | Restricted notice + support |
| Not authorized | Generic unavailable message |
| Record not found | Generic not found |
| Grant expired | Access expired + request action |
| Rate limited | Retry guidance |
| Provider failure | Safe retry + support reference |

Raw stack, database error, storage path ve internal identifier gösterilmez.

---

## 71. Suspended ve Terminated Experience

Suspended account normal dashboard’ı görmez.

Restricted screen:

- Account/company erişiminin geçici olarak sınırlı olduğunu söyler
- Partner-safe açıklama varsa gösterir
- Support/contact route’u sunar
- Internal evidence veya note göstermez

Terminated account sign-in sonrası generic access unavailable state görür. Private historical data render edilmez.

---

## 72. Partner Data Visibility Matrisi

| Data | Portal visibility | Kural |
|---|---|---|
| Own profile | Yes | User-owned |
| Own company safe profile | Yes | Same company |
| Team member basics | Admin only V1 | Same company |
| Other companies | No | Never |
| Own company quotes | Yes | Permission + company scope |
| Internal quote notes | No | Never |
| Proposal file | Conditional | Explicitly shared/current |
| Customer project | V1 conditional | Company + permission |
| Authorized documents | Yes | Current access policy |
| Unauthorized document metadata | No | Non-disclosure |
| Supplier notes/cost | No | Never |
| Internal activity/audit | No | Never |
| Partner-visible activity | V1 | Explicit external event |
| Public product content | Yes | Public surface/source |

---

## 73. Safe DTO Kuralları

Portal response’ları dedicated DTO/view model kullanır.

Kurallar:

- `select *` yok
- Internal entity object client’a serialize edilmez
- Allowed field list explicit olur
- Nested relation’lar aynı visibility policy’den geçer
- Enum internal label’e client’ta çevrilmez; server safe presentation state verir
- Public identifiers kullanılabilir; raw storage/internal workflow ids gösterilmez
- Optional field absence authorization bilgisini sızdırmamalıdır

---

## 74. Portal Query Contract’ları

Baseline authenticated endpoints:

~~~text
GET /api/portal/company
GET /api/portal/quotes
GET /api/portal/documents
POST /api/documents/[documentId]/download
~~~

V1 conditional endpoints:

~~~text
GET /api/portal/projects
GET /api/portal/support
~~~

Server-rendered sayfalar kendi Route Handler’ına HTTP çağrısı yapmaz; DAL/use case’i doğrudan kullanır.

---

## 75. Portal Mutation Contract’ları

| Action | Release | Authorization |
|---|---|---|
| `updateOwnProfileAction` | MVP | Authenticated user |
| `updateOwnPreferencesAction` | MVP | Authenticated user |
| `requestPartnerDocumentAccessAction` | MVP | Active portal actor |
| `createPartnerSupportRequestAction` | MVP | Active portal actor |
| `addPartnerQuoteMessageAction` | V1 conditional | Same-company quote + permission |
| `inviteCompanyUserAction` | V1 | `partner_admin` |
| `revokeCompanyUserAction` | V1 | `partner_admin` |
| `requestCompanyProfileChangeAction` | V1 | `partner_admin` |

Her action direct endpoint gibi ele alınır: parse, auth, authorize, execute, audit/outbox, safe response.

---

## 76. Cache ve Rendering

- Portal pages private ve `no-store`
- Authenticated Route Handler response shared cache’e girmez
- Signed access response cache edilmez
- Public catalogue cache key portal authorization için kullanılmaz
- Browser back navigation private document URL’yi kalıcı hale getirmez
- Sign-out sonrası sensitive client state temizlenir

Server Components portal data için DAL’ı doğrudan kullanır.

---

## 77. Client State

Allowed client state:

- UI open/closed state
- Non-sensitive filter/sort selection
- Draft form state gerektiği kadar
- Optimistic state yalnız conflict-safe action’larda

Forbidden persistence:

- Quote private detail in localStorage
- Document grant list in localStorage
- Signed URLs
- Company authorization context as authority
- Access tokens in readable browser storage

Offline private portal caching MVP’de yoktur.

---

## 78. Security Controls

- Server-side authentication and authorization
- Company scope forced from membership
- Market/product/document policy checks
- CSRF-safe mutation pattern/origin controls
- Rate limiting
- Payload size limits
- Zod validation
- Private storage
- Short-lived signed URLs
- Audit for critical actions
- Secrets server-only
- Security headers
- Open redirect prevention
- Enumeration-resistant errors
- Session revocation handling

---

## 79. Cross-Company Leakage Testleri

Release-blocking test cases:

1. Company A user Company B quote UUID’sini açamaz
2. Company A user Company B document grant’ını kullanamaz
3. Company A admin Company B user’ını invite/revoke edemez
4. Search Company B kayıtlarını result/count ile sızdırmaz
5. Notification deep link access kontrolünü bypass etmez
6. Signed URL generation current grant olmadan çalışmaz
7. Revoked membership cached response üzerinden data alamaz
8. Project/support nested relation company scope’u aşmaz
9. Client-supplied `companyId` etkisizdir
10. Error response foreign record’ın varlığını açıklamaz

Bu testlerden biri başarısızsa portal release edilmez.

---

## 80. Privacy ve Data Minimisation

- Portal yalnız görev için gerekli kişisel/company verisini gösterir
- Team member verisi minimum tutulur
- Last active time exact surveillance biçiminde gösterilmez
- Analytics event’lerinde quote description, document title veya message body bulunmaz
- Support attachment retention policy’ye tabidir
- Access/download events legitimate security/compliance purpose ile tutulur
- User-facing privacy notice UK ve Ukraine gereksinimlerine göre legal review alır

---

## 81. Audit ve Partner-Visible Activity Ayrımı

Audit log internal güvenlik/operasyon kaydıdır. Partner timeline customer-facing communication kaydıdır.

| Event | Internal audit | Partner activity |
|---|---:|---:|
| Invitation created | Yes | Optional |
| User accepted invitation | Yes | Team admin V1 |
| Role changed | Yes | Safe team event V1 |
| Document downloaded | Yes/access event | User history deferred |
| Quote internal note | Yes/activity | No |
| Proposal shared | Yes | Yes |
| Partner message | Yes | Yes |
| Company scope changed | Yes | Safe notice if relevant |

Portal internal audit viewer sunmaz.

---

## 82. Accessibility

Target: WCAG 2.2 AA.

Minimum requirements:

- Full keyboard navigation
- Visible focus
- Skip link
- Semantic landmarks/headings
- Form label, description ve error association
- Status yalnız renkle anlatılmaz
- 4.5:1 text contrast baseline
- 44x44 px touch target target
- Dialog/drawer focus trap ve return
- Live region yalnız gerekli async feedback için
- Download/action state screen reader tarafından anlaşılır
- Tables responsive alternative ile erişilebilir
- Locale doğru `lang` attribute kullanır

---

## 83. Responsive Requirements

Mobile’da tamamlanabilmesi gereken core tasks:

- Sign in/onboarding
- Quote list/detail görüntüleme
- Document arama/filtreleme/download
- Access request
- Support request
- Account locale preference

Mobile’da horizontal overflow ana navigation veya primary content’i kırmaz. Data table gerekli olduğunda priority columns + detail drill-down kullanılır.

---

## 84. Performance Targets

Portal için hedefler:

- App shell hızlı server render
- Route-level code splitting
- Dashboard queries bounded ve indexed
- Quote/document lists paginated
- Search debounced ve server bounded
- Download permission check predictable latency
- Image ağırlıklı public landing assets portal shell’e taşınmaz
- Low-bandwidth Ukrayna kullanımı için gereksiz animation/video yok

Exact SLO/load target Technical Architecture release planında ölçülür.

---

## 85. Portal Content Tone

Partner-facing dil:

- açık,
- profesyonel,
- sakin,
- teknik fakat anlaşılır,
- aksiyon odaklıdır.

Kaçınılacak dil:

- internal jargon,
- belirsiz “processing” ifadeleri,
- gereksiz satış sloganı,
- suçlayıcı error mesajı,
- çevrilmemiş status identifier,
- garanti edilmemiş teslim/fiyat sözü.

---

## 86. Design System Kullanımı

Portal 04_DESIGN_SYSTEM.md token ve component’larını kullanır.

Öncelikli component seti:

- `AppShell`
- `SideNav` / `MobileNav`
- `PageHeader`
- `StatusBadge`
- `SummaryCard`
- `DataList` / responsive table
- `FilterBar`
- `SearchInput`
- `EmptyState`
- `Alert`
- `FormField`
- `FileRow`
- `ActivityTimeline`
- `Dialog` / `Drawer`
- `Toast` / inline feedback

Portal için ayrı renk sistemi yaratılmaz. Status renkleri shared semantic token’lardan gelir.

---

## 87. Application Map İlişkisi

Public Application Map görselleri ve icon asset package portalda yalnız bağlam sağlıyorsa kullanılır.

Kurallar:

- Asset isimleri project naming convention’a göre normalize edilir
- Portal document/product link’leri canonical product/category id kullanır
- Görsel asset authorization kaynağı değildir
- Public görsel ile private technical document karıştırılmaz
- Heavy map görseli dashboard performansını bozmaz

Ana asset package:

~~~text
infravolt-application-map-assets-v1.zip
~~~

---

## 88. Admin ↔ Portal Operational Boundary

| Partner action | Internal destination | Internal owner |
|---|---|---|
| Document access request | Document access queue | Document/dealer manager |
| Support request | Unified inbox/support queue | Assigned operations/technical |
| Quote message | Quote workspace/activity | Sales owner |
| Company change request | Company/support queue | Admin/dealer manager |
| User invitation | Invitation/user governance audit | Partner admin + platform controls |
| New quote request | Quote/enquiry queue | Sales admin |

Portal herhangi bir internal approval’ı sessizce bypass etmez.

---

## 89. Partner Onboarding SOP

Internal operations sırası:

1. Dealer application approved
2. Company record verified
3. Partner profile created/activated
4. Market scope assigned
5. Product scope assigned
6. Initial document policy/grants reviewed
7. First `partner_admin` invitation created
8. Invitation accepted
9. Membership/role activated
10. Welcome/onboarding communication sent
11. First login monitored only at aggregate operational level
12. Onboarding issue varsa support follow-up

Approval, invitation ve access activation tek transaction/state değildir.

---

## 90. Document Access SOP

1. Request enters review queue
2. Reviewer confirms partner/company status
3. Market/product relevance verified
4. Legal/NDA/classification requirement checked
5. Approve, request information or reject
6. Grant with expiry if needed
7. Partner-safe notification
8. Download events monitored for abuse
9. Grant revoked/expired when relationship or scope changes

Reviewer internal reason ile external reason’ı ayrı tutar.

---

## 91. Quote Update SOP

Portal status değişikliğinden önce sales owner:

1. Internal transition’ın valid olduğunu doğrular
2. Partner-facing mapping’i kontrol eder
3. External message gerekiyorsa yazar
4. Proposal file varsa approved/current version’ı seçer
5. Transition commit eder
6. Outbox notification oluşur
7. Portal safe DTO yeni state’i gösterir

Internal state’in her değişimi portal notification üretmez.

---

## 92. Team Administration SOP

`partner_admin` invite/revoke akışında:

- aynı company boundary,
- bounded role,
- duplicate email/membership check,
- last-admin protection,
- invitation expiry,
- audit,
- security notification

zorunludur.

High-risk veya suspicious bulk invite internal review/limit tetikleyebilir.

---

## 93. Support SLA Presentation

Portal yalnız operasyonun gerçekten sağlayabildiği response target’ı gösterir.

Kurallar:

- “We have received your request” commit sonrası söylenir
- Exact response time garanti değilse “target” olarak belirtilir
- Business hours market-aware gösterilir
- Safety-critical case ayrı guidance alır
- SLA timer/internal breach portalda raw gösterilmez

---

## 94. Analytics ve Product Telemetry

Privacy-safe events:

- `portal_signed_in`
- `portal_onboarding_completed`
- `portal_quote_viewed`
- `portal_document_list_viewed`
- `portal_document_download_requested`
- `portal_document_access_requested`
- `portal_support_submitted`
- `portal_locale_changed`
- `portal_invitation_sent` — V1

Event payload içermez:

- free-text message,
- document raw title/path,
- quote description,
- signed URL,
- email/phone,
- sensitive company identifiers.

---

## 95. Product KPI’ları

Portal başarısı şu metriklerle izlenebilir:

- Invitation acceptance rate
- Onboarding completion rate
- Monthly active partner companies
- Quote status self-service view rate
- Document access success rate
- Access request approval turnaround
- Support request deflection değil, correct-routing rate
- Failed/unauthorized download rate
- Cross-company leakage incidents — target zero
- Locale usage and missing-translation rate
- Mobile core-task completion

Vanity pageview tek başına başarı metriği değildir.

---

## 96. Test Stratejisi

### 96.1 Unit

- Status mapping
- Capability evaluation
- Locale/formatting
- Safe DTO mapping
- Document grant policy

### 96.2 Integration

- Active actor resolution
- Company-scoped quote query
- Document download authorization
- Invitation acceptance
- Revocation
- Support relationship linking
- Outbox notification

### 96.3 E2E

- First invitation to onboarding
- Quote list/detail
- Authorized download
- Unauthorized download denial
- Access request
- Suspended user
- Locale switch
- Mobile navigation/forms

### 96.4 Security

- IDOR/cross-tenant
- Open redirect
- CSRF/origin
- Enumeration
- Rate-limit bypass
- Signed URL leakage
- Cache leakage
- Role elevation

### 96.5 Accessibility

- Automated axe baseline
- Keyboard-only core journeys
- Screen reader smoke tests
- Zoom/reflow
- Contrast/status semantics

---

## 97. MVP Release Scope

MVP portal release için zorunlu:

- Active partner auth/session
- Invitation acceptance
- Partner dashboard
- Company summary
- Own account/preferences
- Quote list/detail safe DTO
- Document list/filter
- Secure single-file download
- Document access request
- Authenticated support request
- en-GB + uk-UA UI foundations and approved copy
- Suspended/revoked handling
- Cross-company security test suite
- Accessibility core journey pass
- Audit/operational handoff

---

## 98. V1 Scope

- Company team management
- Company profile change requests
- Partner-safe quote messages/activity
- Customer projects
- Support history/messages
- In-app notifications
- Updated-document indicators
- More granular notification preferences
- Multi-company switching only if validated need
- MFA for high-risk roles/actions

V1 scope measurement ve security review sonrası sıralanır.

---

## 99. Explicitly Deferred Scope

- Orders
- Invoices and payments
- Live inventory
- Shipment tracking
- Partner price list engine
- Discount negotiation workflow
- Contract signing
- Returns/RMA
- Partner commission statement
- Bulk export/download
- Native chat
- Native mobile app
- Offline mode
- Internal user impersonation

Bu öğeler navigation placeholder olarak gösterilmez.

---

## 100. Release Sırası

### Phase 1 — Security foundation

- Auth/session
- Active actor
- Company scope
- Portal app shell
- Locale/preferences

### Phase 2 — Core visibility

- Dashboard
- Company summary
- Quote list/detail

### Phase 3 — Technical documents

- Authorized library
- Access decision
- Signed download
- Access request

### Phase 4 — Support and hardening

- Authenticated support
- Notifications baseline
- Cross-tenant/security tests
- Accessibility/performance QA

### Phase 5 — V1 operations

- Team
- Projects
- Messages/activity
- In-app notifications

---

## 101. Definition of Ready

Bir portal feature development’a başlamadan önce:

- User/role açık
- Company/market/product scope açık
- Safe field list açık
- Internal-only field list açık
- Empty/error/suspended state açık
- en-GB ve uk-UA copy durumu açık
- Mobile behavior açık
- API/action contract açık
- Audit/notification etkisi açık
- Acceptance criteria test edilebilir

olmalıdır.

---

## 102. Definition of Done

Feature done sayılması için:

- UI approved design system ile uygulanmış
- Server-side authorization tamamlanmış
- Safe DTO kullanılmış
- Cross-company negative tests geçmiş
- Loading/empty/error states tamamlanmış
- en-GB/uk-UA behavior doğrulanmış
- Keyboard/mobile QA geçmiş
- Analytics privacy review geçmiş
- Audit/outbox gerekiyorsa uygulanmış
- Documentation güncellenmiş

olmalıdır.

---

## 103. Açık Kararlar

| ID | Karar | Owner | Blocking stage |
|---|---|---|---|
| PP-001 | Canonical protected host kesinleştirme | Founder + Technical | Deployment |
| PP-002 | Auth method: password, magic link veya hybrid | Technical | Auth implementation |
| PP-003 | MFA release timing | Founder + Security | V1 |
| PP-004 | Partner user’ın company-wide quote visibility default’u | Founder + Sales | Quote implementation |
| PP-005 | Quote proposal file visibility ve validity rules | Sales + Legal | Quote detail |
| PP-006 | Initial document access policy/tier matrix | Technical + Dealer Manager | Document release |
| PP-007 | Company profile safe-direct-edit fields | Operations + Legal | V1 |
| PP-008 | Projects V1 exact source of truth | Operations + Technical | Projects |
| PP-009 | Support response targets UK/UA | Operations | Support copy |
| PP-010 | Multi-company user need | Product | Post-MVP |
| PP-011 | uk-UA translation approval owner | Founder + Content | UA launch |
| PP-012 | Portal privacy/terms acknowledgement requirement | Legal | Onboarding |

---

## 104. Founder Approval Checklist

- [ ] Portal ayrı site değil, shared protected product surface olarak onaylandı
- [ ] `/portal` route model onaylandı
- [ ] UK/UA locale yaklaşımı onaylandı
- [ ] `partner_admin` ve `partner_user` sınırları onaylandı
- [ ] Company-wide quote visibility yaklaşımı onaylandı
- [ ] Portal-safe quote status mapping onaylandı
- [ ] Document access/grant yaklaşımı onaylandı
- [ ] 120-second signed download baseline onaylandı
- [ ] Team management V1 olarak onaylandı
- [ ] Projects V1, Orders deferred kararı onaylandı
- [ ] Internal-only data listesi onaylandı
- [ ] MVP release scope onaylandı

---

## 105. Bağımlılık ve Handoff

Bu belge aşağıdaki uygulama çalışmalarına doğrudan input verir:

- Portal Figma screens and prototype
- Portal route/component backlog
- Authorization policy tests
- Partner-safe DTO implementation
- Document grant/admin queue
- en-GB and uk-UA content matrix
- E2E/security/accessibility test plan
- Partner onboarding operations playbook

Her alt görev bu belgedeki release scope, visibility ve authorization kurallarına referans vermelidir.

---

## 106. Sonuç

InfraVolt Partner Portalın doğru ilk sürümü çok özellikli bir bayi ERP’si değildir.

Doğru ilk sürüm:

- partnerın kim olduğunu kesin doğrulayan,
- şirket sınırını asla aşmayan,
- teklif durumunu güvenli dille gösteren,
- yalnız yetkili teknik dokümanları paylaşan,
- destek ihtiyacını doğru kayıtla ilişkilendiren,
- UK ve Ukrayna kullanıcılarına aynı ürün kalitesini sunan

güvenli bir self-service partner alanıdır.

Bu foundation sağlam kurulursa Projects, Orders, commercial documents ve daha gelişmiş partner operations modülleri kontrollü biçimde eklenebilir.

---

## 107. Document Control

### 107.1 Approval

| Role | Name | Status | Date |
|---|---|---|---|
| Founder / CEO | Erhan Baydi | Pending | — |
| Technical Owner | — | Pending | — |
| Partner Operations Owner | — | Pending | — |
| Product Design Owner | — | Pending | — |
| Security/Privacy Reviewer | — | Pending | — |

### 107.2 Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1.0 | 15 July 2026 | InfraVolt Product Team | Initial Partner Portal architecture, scope, workflows and controls |

### 107.3 Change Rule

Role capability, company isolation, document access, quote visibility, protected route, locale or deferred-scope kararındaki değişiklik bu belgenin version update’ini gerektirir.
