# InfraVolt — Content, SEO and Analytics

> Document ID: INF-11  
> Version: 0.1.0  
> Status: Draft for Founder, Content, SEO, Legal and Technical Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Content Owner: Content / Market Lead  
> SEO Owner: SEO Specialist / Product Lead  
> Analytics Owner: Product / Growth Lead  
> Technical Owner: Product Director / CTO / Head Agent  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0, 04_DESIGN_SYSTEM.md v0.1.0, 05_TECHNICAL_ARCHITECTURE.md v0.1.0, 06_DATABASE_SCHEMA.md v0.1.0, 07_BACKEND_API_AND_WORKFLOWS.md v0.1.0, 08_ADMIN_AND_SALES_OPERATIONS.md v0.1.0, 09_PARTNER_PORTAL.md v0.1.0, 10_AUTH_SECURITY_AND_PERMISSIONS.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required public locales: en-GB + uk-UA  
> Domain model: separate UK and Ukraine domains, one shared application  
> SEO baseline: Google Search Essentials + market-specific technical SEO  
> Analytics baseline recommendation: lightweight privacy-oriented provider behind a typed adapter; business database remains conversion source of truth  
> Last updated: 15 July 2026  
> Document language: Turkish; route, schema, metadata, event and reporting identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt’un content governance, localization, SEO ve analytics sözleşmesini tanımlar.

Belge:

- UK ve Ukrayna içerik stratejisini,
- teknik iddia ve kaynak doğrulamasını,
- content type, page template ve publishing workflow’larını,
- en-GB ve uk-UA localization kurallarını,
- domain, canonical, hreflang, sitemap ve indexing davranışını,
- structured data kararlarını,
- search intent ve internal linking modelini,
- analytics provider boundary ve typed event taxonomy’sini,
- consent, privacy ve data minimisation kurallarını,
- SEO/content/conversion KPI ve raporlama düzenini,
- MVP, Ukraine launch ve V1 kapsamını

kesinleştirir.

Bu belge yalnız blog veya meta title rehberi değildir. InfraVolt’un public bilgi kalitesini, arama görünürlüğünü ve ölçüm doğruluğunu birlikte yönetir.

---

## 2. Ana Karar

InfraVolt UK ve Ukrayna public siteleri:

- iki ayrı canonical domain,
- tek shared application,
- ortak logical content identity,
- bağımsız market publication,
- gerçek en-GB ve uk-UA content,
- reciprocal hreflang yalnız eşdeğer published sayfalarda,
- ayrı sitemap ve Search Console property,
- ortak event taxonomy fakat ayrı market reporting

ile çalışacaktır.

Ukrayna domain’i UK sitesinin çeviri proxy’si veya redirect’i olmayacaktır.

---

## 3. Content Ürün Vaadi

Her public sayfa kullanıcıya şu üç sorudan en az birini güvenilir biçimde cevaplamalıdır:

1. InfraVolt/Gersan hangi çözümü sunuyor?
2. Bu ürün veya çözüm benim uygulamama uygun olabilir mi?
3. Doğru teknik/ticari sonraki adım nedir?

SEO için yazılmış fakat teknik veya ticari değeri olmayan sayfa üretilmez.

---

## 4. Hedefler

- UK’de doğru B2B product/industry search intent’lerinde görünür olmak
- Ukrayna’da gerçek Ukrainian content ile güven oluşturmak
- Teknik iddiaları resmi evidence’e bağlamak
- Ürünleri category, industry ve Application Map üzerinden keşfedilebilir yapmak
- Duplicate/yanlış-market index sorunlarını önlemek
- Qualified quote, document, dealer ve project-support taleplerini artırmak
- Search ve content gaps’i ölçmek
- Analytics’e kişisel veya hassas veri göndermemek
- Content production’ı küçük ekiple yönetilebilir hale getirmek
- Yayın sonrası content freshness ve correction süreci kurmak

---

## 5. İlkeler

### 5.1 Evidence before claim

Doğrulanmamış teknik değer, certification, compliance veya availability yayınlanmaz.

### 5.2 Market is more than language

UK ve Ukraine aynı kelimelerin çevirisi değildir; audience, terminology, legal copy, commercial context ve search intent değişebilir.

### 5.3 One identity, independent publication

Logical product/industry aynı olabilir; her market publication ayrı karardır.

### 5.4 People-first content

Keyword tekrarı veya search engine için anlamsız metin yerine gerçek satın alma/teknik değerlendirme ihtiyacı çözülür.

### 5.5 No silent fallback

Eksik uk-UA content, kullanıcıya Ukrainian sayfa gibi gösterilen English content ile doldurulmaz.

### 5.6 Index only useful pages

Thin, duplicate, transactional, private veya parameter-generated sayfalar index’e açılmaz.

### 5.7 Measure outcomes, not noise

Pageview tek başına başarı değildir; qualified commercial outcome ile birlikte değerlendirilir.

### 5.8 Database is business truth

Analytics provider conversion record’ın tek kaynağı değildir.

### 5.9 Privacy by design

Event ve property minimum, categorical ve public-safe olur.

### 5.10 Correctness beats publishing speed

Technical/legal content approval almadan launch takvimini kurtarmak için yayınlanmaz.

---

## 6. Kapsam

### 6.1 Dahil

- Homepage
- Product index/category/detail
- Product comparator
- Industries and Application Maps
- Technical resources metadata
- Quote/project-support/dealer entry pages
- About/contact/legal pages
- Market switcher
- Public search V1
- Metadata, canonical, hreflang, sitemap, robots
- Structured data
- Social metadata
- Web analytics and first-party business reporting
- Content operations and QA

### 6.2 Protected surface boundary

Admin, Portal, auth, preview ve signed download public SEO kapsamı dışındadır.

Protected product telemetry:

- third-party web analytics MVP’de default off,
- server business/audit event’leri ayrı,
- 09 ve 10 belgelerindeki privacy/security kurallarına bağlıdır.

### 6.3 Kapsam dışı

- High-volume editorial newsroom
- Daily blog programı
- Programmatic SEO page generation
- Public user-generated content
- Affiliate content
- Paid advertising campaign operations
- Session recording/heatmaps MVP
- AI chatbot analytics

---

## 7. Domain ve Market Matrisi

| Canonical host | Market | Locale | Primary purpose |
|---|---|---|---|
| `infravolt.co.uk` | `uk` | `en-GB` | UK public website |
| Ukraine-facing `.ua` — TBD | `ua` | `uk-UA` | Ukraine public website |
| `app.infravolt.co.uk` — proposed | Record/profile based | en-GB/uk-UA | Admin + Portal; noindex |

`www` variants canonical host’a permanent redirect edilir.

---

## 8. Domain Strategy

- ccTLD’ler ayrı market sinyali ve ayrı canonical origin’dir
- Her domain kendi content availability’sine sahiptir
- Cross-domain duplicate canonical kullanılmaz
- Her domain kendi sitemap/robots/Search Console property’sini alır
- Market switcher kullanıcı kontrollüdür
- IP-based forced redirect yoktur
- Unknown host controlled reject/fallback alır
- Ukraine domain exact adı CNT-001 açık kararıdır

---

## 9. Audience Segments

### UK

- Electrical contractors
- Panel builders
- Infrastructure/tender teams
- Consultants/specifiers
- Renewable/EV contractors
- Industrial procurement
- Potential distributors/dealers

### Ukraine

- Ukrainian contractors/installers
- Industrial/infrastructure procurement
- Tender/project teams
- Recovery/reconstruction supply partners
- Local distributors/dealers
- Technical decision makers

Segment content iddiası verified business capability ile sınırlı olmalıdır.

---

## 10. Search Intent Modeli

| Intent | Örnek ihtiyaç | Target page |
|---|---|---|
| Brand | InfraVolt / Gersan | Home/about/product |
| Category | Busbar, enclosure, cable management | Category |
| Product/model | Exact family/model/reference | Product |
| Application | Airport electrical systems | Industry/Application Map |
| Technical | Datasheet, certificate, dimensions | Product/resource |
| Commercial | Supplier, quote, distributor | Product/quote/dealer |
| Support | Project/technical assistance | Support/contact |

Bir keyword birden fazla intent taşıyorsa page type ve conversion goal açıkça seçilir.

---

## 11. Content Architecture Layers

1. Shared technical source data
2. Market availability
3. Locale content
4. SEO metadata
5. Publication state
6. Relationships/internal links
7. Media/assets
8. Measurement context

Translation record technical source’u duplicate etmez.

---

## 12. Content Types

- Product family
- Product category
- Product
- Industry
- Application Map
- General page
- Technical resource metadata
- Form/support landing
- Legal/policy page
- Navigation label
- Email template
- UI microcopy
- SEO redirect

Her type için owner, required fields, publication checks ve index policy tanımlanır.

---

## 13. Content Ownership

| Content | Draft owner | Approval |
|---|---|---|
| Corporate/market | Content/Founder | Founder |
| Product descriptive | Content | Product/technical |
| Technical values | Technical Manager | Technical approval |
| Industry/application | Content + sales | Technical/commercial review |
| Ukrainian localization | Ukrainian specialist | Market + technical |
| Legal/privacy/cookies | Approved legal owner | Founder/legal |
| SEO metadata | SEO/content | Content approval |
| Structured data mapping | Technical/SEO | Technical QA |
| Analytics taxonomy | Product/analytics | Privacy + technical |

---

## 14. Source of Truth

Priority:

1. Official manufacturer product/document source
2. Approved certificate/test report
3. Approved InfraVolt technical review
4. Approved commercial/market statement
5. Content draft

Search result, competitor site, reseller listing veya AI output teknik source of truth değildir.

---

## 15. Evidence Record

Her technical claim gerektiğinde şu metadata’ya bağlanır:

- Source document/reference
- Exact page/section where practical
- Version/date
- Product/model scope
- Reviewer
- Approval date
- Market applicability
- Expiry/review date if relevant

Public UI evidence record’ın tamamını göstermek zorunda değildir; admin traceability korunur.

---

## 16. Technical Claim Policy

Technical claim:

- exact source ile uyumlu,
- correct unit,
- correct product variant,
- correct market,
- conditional limitations visible,
- unsupported superlative içermeyen

biçimde yazılır.

“Best”, “guaranteed”, “fully compliant”, “always available” gibi ifadeler evidence/legal approval olmadan kullanılmaz.

---

## 17. Compliance ve Certification Copy

- Certificate varlığı exact product/version’a bağlanır
- “Compliant with” ve “certified by” ayrımı korunur
- Expired/withdrawn evidence yayınlanmaz
- UK ve Ukraine legal/regulatory applicability ayrı değerlendirilir
- Logo/mark usage rights kontrol edilir
- Public metadata erişim izni olmayan certificate file’ı açmaz

---

## 18. Pricing ve Availability Copy

Baseline’da public price yoktur.

Bu nedenle:

- `Offer` price/availability schema uydurulmaz
- “In stock” gibi real-time olmayan iddia yapılmaz
- Quote-based commercial model açık anlatılır
- Delivery estimate approved process olmadan garanti edilmez
- Currency market context’inden gelir

---

## 19. Terminology Governance

Terminology glossary:

- English preferred term
- Ukrainian approved term
- Manufacturer term
- Abbreviation
- Prohibited/ambiguous alternative
- Definition
- Product scope
- Reviewer

UI, metadata, document labels ve email templates aynı glossary’yi kullanır.

---

## 20. British English Standard

en-GB content:

- British spelling
- UK date/measurement conventions
- Professional B2B tone
- Technical term consistency
- UK-specific commercial/legal copy
- Plain language where possible

US-English auto-copy son kontrol olmadan publish edilmez.

---

## 21. Ukrainian Language Standard

uk-UA content:

- Native/professional Ukrainian review
- Technical terminology glossary
- Correct grammar and inflection
- Cyrillic readability
- Ukrainian legal/contact copy
- Manufacturer model identifiers unchanged
- Russian fallback yok

Product model/brand adı çevrilmez; descriptive context Ukrainian olur.

---

## 22. Translation vs Transcreation

### Direct localization suitable

- Navigation
- UI labels
- Common product attributes
- Standard form messages

### Market adaptation required

- Homepage proposition
- Industry/tender language
- Dealer proposition
- Legal/privacy text
- SEO title/description
- Commercial CTA
- Compliance explanation

---

## 23. Machine Translation Policy

Machine translation:

- draft assistance olabilir,
- final technical/legal approval değildir,
- source reference’i değiştiremez,
- hallucinated units/claims için checked edilir,
- Ukrainian native/qualified review olmadan published olmaz.

Bulk auto-publish yasaktır.

---

## 24. Missing Translation Policy

Public Ukraine domain’de missing required translation:

- page publish edilmez,
- sitemap’e girmez,
- hreflang alternate olmaz,
- market switcher target landing page’e gider,
- user’a English page Ukrainian gibi gösterilmez.

Low-risk optional block eksikse approved component-level fallback ancak explicit policy ile olabilir.

---

## 25. Localization Status

Suggested states:

- `missing`
- `draft`
- `machine_assisted`
- `review_required`
- `approved`
- `published`
- `outdated`
- `archived`

`machine_assisted` public state değildir.

---

## 26. Market Availability vs Translation

İki ayrı karar:

- Product/industry market’te available/relevant mi?
- Content target locale’de hazır mı?

Translated content, market availability sağlamaz. Market available product, translation hazır değilse public publish edilmez.

---

## 27. Logical Content Identity

- Shared entity stable UUID
- Route key language-independent
- Market publication ayrı row
- Locale content ayrı row
- Slug market/content-type scoped
- Relationships logical entity üzerinden
- Analytics public-safe key kullanır

---

## 28. Stable Route Keys

Örnek:

- `home`
- `products.index`
- `products.category`
- `products.detail`
- `products.compare`
- `industries.index`
- `industries.detail`
- `industries.map`
- `resources.index`
- `quote`
- `dealer.apply`
- `about`
- `contact`

Path değişebilir; route key değişmez.

---

## 29. Slug Policy

- Human-readable
- Lowercase
- Hyphen-separated
- Stable after publication
- No session/tracking data
- No unnecessary date
- Product model identifiers normalized carefully
- Market-specific uniqueness
- Ukrainian slug language/transliteration policy reviewed consistently

Slug change redirect gerektirir.

---

## 30. Ukraine Slug Decision

Exact Ukrainian route/slug style native language ve SEO owner review’ı gerektirir.

Options:

- Ukrainian Cyrillic
- Approved Latin transliteration
- Shared technical/model identifier

Tek site içinde rastgele karışım kullanılmaz. Exact route vocabulary CNT-002 ile onaylanır.

---

## 31. Market Switcher

Switcher:

1. Current route key/entity identity’yi alır
2. Target market published equivalent arar
3. Varsa target canonical’a gider
4. Yoksa target market safe landing page’e gider
5. False equivalent üretmez
6. Analytics event public-safe context ile gönderilebilir

Switcher hreflang’in yerine geçmez.

---

## 32. Content Lifecycle

Suggested states:

- `draft`
- `review_required`
- `technical_review` where required
- `approved`
- `scheduled` optional V1
- `published`
- `archived`

UK publish UA publish’i tetiklemez.

---

## 33. Publishing Permissions

- `content.edit`
- `content.review`
- `content.publish.uk`
- `content.publish.ua`
- `products.edit`
- `products.technical_approve`
- `products.publish.uk`
- `products.publish.ua`
- `application_maps.publish`

Content writer teknik approval veya tüm-market publish yetkisine otomatik sahip değildir.

---

## 34. Publishing Workflow

~~~mermaid
flowchart TD
    B["Content brief"] --> D["Draft and source links"]
    D --> L["Locale review"]
    L --> T["Technical/legal review if required"]
    T --> S["SEO and relationship checks"]
    S --> P["Selected-market publish"]
    P --> M["Monitor and maintain"]
~~~

---

## 35. Content Brief

Her önemli page için:

- Market/locale
- Audience/job
- Primary search intent
- User question
- Page type/route key
- Primary CTA
- Required claims/evidence
- Product/industry relationships
- Media
- Internal links
- Metadata
- Measurement events
- Approvers

tanımlanır.

---

## 36. Page Content Spec

Bir page spec en az:

- H1 intent
- Intro/value statement
- Core sections
- Technical facts/source
- CTA hierarchy
- Related content
- Breadcrumb
- Title/meta
- Canonical/hreflang
- Structured data eligibility
- Index rule
- Empty/missing state

içerir.

---

## 37. Homepage Content

Homepage:

- InfraVolt positioning
- Primary product families
- Priority industries
- Pilot Application Map entry
- Technical support/resource trust
- Quote CTA
- Dealer CTA secondary
- Market-specific proof/contact

H1 vague slogan değil, company/solution scope’u açıklar.

---

## 38. Product Index

Index:

- Category discovery
- Short catalogue orientation
- Search/filter entry
- Industry links
- Quote/project-list explanation
- No duplicate product-card prose

Indexable ve self-canonical’dır.

---

## 39. Category Page

Category page:

- Category definition/use
- Product families/items
- Selection guidance
- Important attribute overview
- Related industries/maps
- Technical resource pathway
- Quote CTA

Thin filter landing gibi davranmaz.

---

## 40. Product Detail

Required public-safe content:

- Product name/model/family
- Clear summary
- Key verified attributes
- Applications
- Variants/options where verified
- Related products
- Related industries/map
- Technical resource metadata/access CTA
- Quote/project-list action
- Limitations/notes

Unsupported specification table row gösterilmez.

---

## 41. Product Comparison

Comparator:

- user-selected products,
- comparable verified attributes,
- explicit missing values,
- no invented winner,
- quote CTA

sunmalıdır.

Index recommendation: `noindex, follow` baseline. Dynamic/user-specific compare combinations canonical product/category pagesini çoğaltmamalıdır.

---

## 42. Industry Index

- Priority sectors
- Short market-specific context
- Related product/solution paths
- Application Map availability
- Project support CTA

Her industry için içerik hazır değilse empty card yayınlanmaz.

---

## 43. Industry Detail

- Industry challenge/context
- InfraVolt-relevant systems
- Product/category relationships
- Application areas
- Pilot map if available
- Technical/project support
- Market-specific evidence/case reference only if approved

Generic SEO paragraph yığını olmaz.

---

## 44. Application Map Content

Map:

- Industry context
- Zone/system labels
- Hotspot title/description
- Linked product/category
- Accessible list alternative
- Related CTA
- Locale-aware HTML text

Base image içindeki embedded English label translation kaynağı değildir.

---

## 45. Application Map Indexing

Map route yalnız:

- unique explanatory content,
- accessible HTML list,
- stable industry relationship,
- crawlable linked products,
- meaningful title/metadata

varsa indexable olabilir.

Salt görsel/interaktif tool ise `noindex` veya industry canonical strategy kullanılır. Karar map-by-map verilir.

---

## 46. Technical Resources Index

Public resources page:

- Resource types
- Access policy explanation
- Public-safe metadata
- Product/category links
- Request access CTA
- Login/portal path where relevant

Private file URL veya unauthorized metadata göstermez.

---

## 47. Document Metadata Content

- Title
- Document type
- Product scope
- Language
- Version/revision
- Publish/effective date
- Access level label
- Safe description

Metadata indexability document class’ına göre belirlenir. Restricted metadata thin doorway sayfa oluşturmamalıdır.

---

## 48. About Page

- InfraVolt identity
- Relationship/representation facts only if approved
- Markets served
- Capabilities
- Technical/commercial support model
- Contact
- Verified address/legal identity

Unverifiable company history veya partnership claim yayınlanmaz.

---

## 49. Contact Page

- Market-specific contact channels
- Business hours if real
- Enquiry categories
- Expected next step
- Privacy notice
- Emergency/safety limitation
- Structured business identity only if verified

UA domain UK-only contact details’i yanlış local presence gibi sunmaz.

---

## 50. Dealer Page

- Partner proposition
- Eligibility expectations
- Process
- Information required
- Territory/product scope concept
- No automatic approval promise
- Privacy/legal text
- Apply CTA

---

## 51. Quote and Project-Support Pages

- What information helps
- No public-price implication
- Process/response expectation
- Product list/context continuity
- Market-specific contact/legal
- Privacy/consent

Conversion page SEO content formu gömmek için gereksiz uzun yapılmaz.

---

## 52. Legal and Policy Pages

- Privacy
- Cookies/storage technologies
- Terms
- Accessibility statement
- Document/use terms if required

Her market için approved legal copy gerekir. English legal page UA domain’de Ukrainian legal page gibi canonical edilmez.

---

## 53. Site Search Page

V1:

- Published market-scoped results
- Product/category/industry/resource labels
- No private data
- Useful no-result path
- Query privacy protection

Index policy: `noindex, follow`.

---

## 54. Form Microcopy

Form copy:

- neden bilgi gerektiğini,
- required/optional ayrımını,
- format expectation’ı,
- privacy/consent’i,
- success sonrası ne olacağını

açıklar.

Marketing consent preselected değildir ve operational communication’dan ayrıdır.

---

## 55. Error ve Empty-State Copy

- User-safe
- Actionable
- No technical stack/provider detail
- No false success
- Market language
- No blame
- No security enumeration

404 content discovery sağlar; soft-404 gibi 200 dönmez.

---

## 56. Email Content

- Market/locale-aware
- Transaction purpose clear
- Minimum personal/private data
- Correct source domain/portal link
- Permanent private file URL yok
- Operational vs marketing ayrımı
- Plain text + HTML

---

## 57. Image Alt Text

- Function/context describes
- Decorative image empty alt
- Product model/important visible detail when relevant
- Keyword stuffing yok
- Base Application Map için equivalent list/content
- Same image farklı context’te farklı alt alabilir

---

## 58. Media Rights and Provenance

Her media:

- owner/source
- usage rights
- market rights
- copyright attribution if required
- approval
- alt policy
- canonical asset identity

ile yönetilir.

Application Map canonical asset package: `infravolt-application-map-assets-v1.zip`.

---

## 59. Video and Motion Content

- Captions/transcript where speech/information exists
- Poster and metadata
- No autoplay with sound
- Reduced motion respect
- Heavy embed consent/performance policy
- Third-party video cookies/scripts gated if required

---

## 60. Content QA

- Intent answered
- Claims sourced
- Tone correct
- CTA functional
- Links valid
- No duplicate blocks
- No placeholder
- Required media/alt
- Correct market/contact
- Spelling/grammar

---

## 61. Technical Content QA

- Values/units exact
- Variant/model scope
- Document version
- Compliance wording
- Product relationship
- Market availability
- Reviewer
- No contradictory table/copy

---

## 62. Localization QA

- Native/professional review
- Glossary consistency
- UI truncation
- Plural/grammar
- Route/slug
- Metadata
- Form and errors
- Email
- Legal/contact
- Hreflang equivalent

---

## 63. SEO QA Before Publish

- Unique title/description
- One clear H1
- Canonical
- Index directive
- Published reciprocal hreflang
- Sitemap eligibility
- Internal links
- Breadcrumb
- Structured data validity
- Image/OG
- Status code

---

## 64. Content Freshness

Review cadence risk-based:

| Content | Review trigger |
|---|---|
| Technical values | Source/version change |
| Certificate/compliance | Expiry/withdrawal |
| Contact/legal | Business/legal change |
| Product availability | Catalogue decision |
| Industry copy | Annual or strategy change |
| SEO metadata | Performance/intent change |
| Legal/cookie | Legal/provider change |

“Last updated” yalnız gerçek meaningful review/change olduğunda kullanılır.

---

## 65. Correction Workflow

1. Issue recorded
2. Risk/market scope assessed
3. Wrong content contained/unpublished if needed
4. Source corrected
5. Technical/legal review
6. Republish selected markets
7. Cache/sitemap/links refreshed
8. Audit and monitoring

Wrong technical content silent edit edilmez.

---

## 66. Archive and Unpublish

- Archive history korunur
- Public route 301, 404 veya 410 policy alır
- Replacement varsa 301
- Temporary correction gerekiyorsa 503/short unpublish strategy case-specific
- Sitemap’ten çıkar
- Hreflang pair güncellenir
- Internal links düzeltilir

---

## 67. Redirect Governance

Redirect:

- Exact source path
- Canonical target
- Market-aware
- No chain/loop
- Reason
- Created by/date
- Review/expiry where temporary
- Audit for critical changes

UK path UA domain’e yanlış market redirect yapmaz.

---

## 68. SEO Scope

SEO üç katmandır:

1. Content usefulness and intent
2. Crawl/index/canonical correctness
3. Measurement and continuous improvement

Backlink satın alma veya manipulative tactic bu belgenin baseline’ı değildir.

---

## 69. Indexing Policy Matrix

| Page family | Index |
|---|---|
| Homepage | Yes |
| Product index/category/detail | Yes if published/complete |
| Industry index/detail | Yes if useful |
| Application Map | Conditional |
| Product compare | No baseline |
| Site search | No |
| Quote/contact/dealer landing | Yes if useful standalone |
| Form success | No |
| Preview/draft | No |
| Admin/Portal/auth | No |
| Signed/private document | No |
| Filter/sort params | No/canonical base |
| 404/error | No |

---

## 70. Canonical Rules

- Every indexable page self-canonical
- Canonical absolute HTTPS URL
- Correct market domain
- Canonical HTML source’da server-rendered
- Sitemap only canonical URLs
- Internal links canonical path
- Parameter variants base canonical where content equivalent
- UA page UK canonical göstermez
- Hreflang page kendi dilindeki canonical’a referans verir

---

## 71. Cross-Market Canonical Rule

en-GB ve uk-UA pages:

- birbirinin duplicate canonical’ı değildir,
- her biri self-canonical,
- equivalent ise hreflang alternate,
- içerik gerçekten yoksa alternate yoktur.

Bu ccTLD market strategy’nin temelidir.

---

## 72. Hreflang Rules

- `en-GB` UK equivalent
- `uk-UA` Ukraine equivalent
- Reciprocal links
- Self reference
- Absolute canonical URLs
- Only published/indexable equivalents
- Correct status code
- Same logical entity/route identity
- Sitemap veya HTML implementation consistent

Broken one-way pair release QA’da yakalanır.

---

## 73. x-default Decision

Baseline’da neutral global selector/landing page yoktur.

Bu nedenle `x-default` zorunlu değildir ve UK homepage’e otomatik atanmaz.

Gelecekte gerçek global/market-selector page açılırsa `x-default` o URL’ye verilebilir.

---

## 74. HTML Language

- UK root/page: `lang="en-GB"`
- Ukraine root/page: `lang="uk-UA"`
- Inline foreign-language phrase gerektiğinde nested `lang`
- Direction LTR
- Metadata/content language consistent

`lang` hreflang’in yerine geçmez.

---

## 75. Title Tag

Guideline:

- Unique
- Intent-first
- Accurate product/category/industry
- Brand used consistently
- No keyword list
- No false location claim
- Market language
- Useful even if search engine rewrites

Exact pixel/character limit absolute kural değildir; SERP preview QA kullanılır.

---

## 76. Meta Description

- Unique where practical
- Page value + qualification
- Honest CTA
- No unsupported claim
- No duplicate boilerplate
- Correct market/language

Meta description ranking guarantee değil, result snippet input’udur.

---

## 77. Heading Structure

- One primary H1 intent
- Logical H2/H3 hierarchy
- Visual style heading level’i belirlemez
- Product attribute labels semantic olabilir
- Hidden SEO heading yok
- Application Map accessible list heading structure kullanır

---

## 78. Internal Linking

Core relationships:

- Category → product
- Product → category
- Product ↔ industry
- Industry → Application Map
- Map hotspot → product
- Product → related product/resource
- Resource → product
- All relevant pages → quote/project support

Link text anlamlı ve localized olur.

---

## 79. Breadcrumbs

Breadcrumb:

- User-visible
- Hierarchical route/entity model
- Localized labels
- Canonical links
- Mobile usable
- `BreadcrumbList` structured data ile aynı truth

Homepage breadcrumb item UI’da şart değildir; structured model tutarlı olmalıdır.

---

## 80. URL Parameters

Parameter examples:

- filter
- sort
- page
- campaign/UTM
- compare selection

Rules:

- canonical intent açık
- tracking params canonical’a dahil değil
- parameter URL sitemap’e girmez
- uncontrolled combinations internal link üretmez
- sensitive data query string’e girmez
- Search Console crawl issue’ları izlenir

---

## 81. Filters and Facets

MVP filter combinations indexable landing page oluşturmaz.

Future indexable facet ancak:

- validated search demand,
- unique useful copy,
- stable canonical route,
- bounded combination,
- owner

ile explicit page olarak modellenir.

---

## 82. Pagination

List pagination:

- Crawlable links
- Stable page parameter/path
- Each page self-canonical if distinct listing
- No `view-all` canonical unless actual complete performant page
- Items server-rendered
- Empty out-of-range page correct status/noindex

Infinite scroll tek discovery mechanism olmaz.

---

## 83. Public Search SEO

- `noindex, follow`
- Query in title/H1 safely escaped
- No query in sitemap
- No raw PII query in analytics provider
- No-result content thin index page üretmez
- Internal search results external search landing strategy değildir

---

## 84. Comparator SEO

Baseline:

- `noindex, follow`
- Base canonical comparator route veya no canonical according to final implementation
- Selected IDs validated
- No combinatorial sitemap
- Share URL public-safe and bounded

If curated comparison pages needed, they become separate editorial content type.

---

## 85. robots.txt

Each public domain:

- Allows public canonical routes
- References own sitemap
- Does not advertise secret paths as security mechanism
- Blocks unnecessary crawl where appropriate
- Preview/protected host separate policy

`robots.txt` private data protection değildir; auth/noindex/no-store ayrıca gerekir.

---

## 86. Robots Meta and X-Robots

Use cases:

- `noindex, follow` for search/compare
- `noindex, nofollow` for protected/preview where appropriate
- `X-Robots-Tag` for non-HTML files if public delivery policy requires
- No conflicting header/meta

Private documents public crawler’a erişilebilir olmamalıdır; noindex tek kontrol değildir.

---

## 87. Sitemap Architecture

Per canonical domain:

~~~text
/sitemap.xml
~~~

May be sitemap index containing:

- pages
- products
- industries/maps
- resources if eligible

Only published, indexable, canonical, 200 URLs included.

---

## 88. Sitemap Hreflang

Hreflang HTML head veya sitemap extension ile uygulanabilir.

Karar:

- One canonical implementation helper
- Same pair source of truth
- No conflicting sets
- Reciprocal equivalent only
- Automated tests

MVP için Next.js metadata/head output primary; sitemap hreflang optional duplicate validation after testing.

---

## 89. Sitemap lastmod

`lastmod`:

- meaningful public content update zamanı,
- build/deploy zamanı değil,
- every request current time değil,
- content publication record’dan

üretilir.

---

## 90. Open Graph and Social Metadata

- Localized title/description
- Canonical URL
- Approved share image
- Correct image dimensions/type
- Alt where supported
- Market/site name
- `og:locale` and alternate where useful
- No private/draft asset

Twitter/X card metadata same content truth kullanır.

---

## 91. Image SEO

- Descriptive asset metadata
- Correct alt
- Width/height
- Responsive variants
- Modern formats
- Lazy load below fold
- Important hero not delayed incorrectly
- Image sitemap only if justified
- Public filename not sensitive

---

## 92. Image Filename Policy

- Canonical manifest name
- ASCII/hyphen safe preferred
- Product/category context
- No camera-default/legacy duplicate
- No version secrets
- Derived variants systematic

Application Map upload package legacy filenames production canonical adı olmaz.

---

## 93. Structured Data Principles

- JSON-LD preferred
- Server-rendered
- Visible page content ile aynı
- Accurate/current
- Correct canonical URLs
- No hidden/fabricated review/price/availability
- Market/locale-specific
- Rich Results Test + schema validation
- Eligibility result display guarantee değildir

---

## 94. Structured Data Matrix

| Page | Baseline type |
|---|---|
| Homepage/about | `Organization` where verified |
| Product detail | `Product` basic verified fields |
| Hierarchical pages | `BreadcrumbList` |
| General page | `WebPage` optional |
| Contact | Organization/contact fields if verified |
| Industry/Application Map | No special rich-result type baseline |
| Search/compare/private | None/noindex |

---

## 95. Organization Markup

Verified fields only:

- Name
- URL
- Logo
- Legal/alternate name if approved
- Contact point if public
- Address if public/verified
- SameAs official profiles

UK ve Ukraine false local office/address üretmez. One organization identity market pagesinde correct URL/context ile render edilir.

---

## 96. Product Markup

Potential fields:

- Name
- Description
- Image
- SKU/MPN if verified
- Brand
- Model/category where supported

Public price olmadığı için:

- fake `Offer` yok,
- fake availability yok,
- quote CTA price değildir,
- review/aggregateRating ancak gerçek verified public system varsa.

Google Product rich-result eligibility için gerekli `Offer`, `Review` veya `AggregateRating` verisi yoksa basic `Product` markup zengin sonuç garantisi vermez. Böyle bir durumda markup yalnız doğru entity semantics sağlıyorsa ve validation warning’leri bilinçli kabul ediliyorsa kullanılır; aksi halde Product JSON-LD yayınlanmaz.

---

## 97. BreadcrumbList Markup

- Visible breadcrumb ile aynı
- Position sequential
- Canonical item URLs
- Localized names
- No non-public parent
- Product/industry hierarchy consistent

---

## 98. FAQ Markup Decision

FAQ content kullanıcıya faydalıysa visible section olarak kullanılabilir.

`FAQPage` rich-result markup baseline’da kullanılmaz; search feature eligibility sınırlıdır ve InfraVolt page type’ı için değer varsayılmaz.

---

## 99. Structured Data Validation

1. Unit/schema generation test
2. JSON parse
3. Required field validation
4. Rich Results Test sample
5. URL Inspection after deploy
6. Search Console enhancement monitoring
7. Data/content parity regression

---

## 100. JavaScript SEO

- Critical content server-rendered
- Product links real anchors
- Map product relationships accessible HTML
- Lazy content viewport interaction’a tamamen bağlı değil
- Metadata server output
- Canonical JS sonrası değişmez
- Filter state crawl strategy explicit

---

## 101. Core Web Vitals and Content

Content team:

- giant uncompressed hero istemez
- above-fold excessive media kullanmaz
- layout dimensions sağlar
- font/style variety sınırlı tutar
- third-party embeds gerekçelendirir
- map/video lazy strategy uygular

Performance yalnız frontend sorumluluğu değildir.

---

## 102. Status Code Policy

| Scenario | Status |
|---|---:|
| Published page | 200 |
| Permanent changed URL | 301/308 |
| Temporary redirect | 302/307 |
| Missing page | 404 |
| Intentionally removed no replacement | 410 optional |
| Temporary outage | 503 |
| Unauthorized protected | 401/403 or non-disclosing 404 |

Soft-404 200 page yasaktır.

---

## 103. 404 Page

- Real 404 status
- Correct market language
- Search/category/home links
- No automatic unrelated redirect
- Event optional
- No query/path PII to analytics

---

## 104. Domain Launch / Site Move

Ukraine domain first launch:

- not a redirect-only mirror,
- canonical host/DNS/HTTPS,
- reviewed content set,
- robots/sitemap,
- Search Console verification,
- hreflang pairs,
- internal links,
- analytics property/site,
- legal/consent,
- monitoring.

Exact domain purchase before URL hard-code.

---

## 105. Search Console

Each public domain:

- Domain property where DNS access available
- Sitemap submitted
- Users least privilege
- Indexing/CWV/security monitoring
- Manual action/security issue alerts
- URL inspection launch samples
- Ownership transfer/runbook

Protected host public SEO reporting target değildir.

---

## 106. Search Demand Research

Sources:

- Search Console queries
- Approved keyword tools
- Sales/support language
- Dealer/partner feedback
- Site search gaps
- Manufacturer terminology
- Tender/project terminology

Search volume technical relevance yerine geçmez.

---

## 107. Keyword Mapping

For each target:

- Market/locale
- Search intent
- Primary topic
- Supporting terms
- Page type
- Existing target URL
- Business relevance
- Evidence/content readiness
- CTA
- Status

One keyword list’i otomatik page factory’ye dönüştürülmez.

---

## 108. Topic Clusters

Example:

- Product category hub
- Product details
- Industry applications
- Technical resources
- Selection/support content

Cluster internal linking ve user journey içindir; thin satellite page üretmek için değildir.

---

## 109. Cannibalisation Control

- Route/key ownership
- Keyword map
- Duplicate title/H1 checks
- Similar page review
- Merge/redirect when needed
- Category vs product intent separation
- UK/UA not treated as cannibal duplicates

---

## 110. Competitor and Comparison Claims

- Objective source
- Current date
- Like-for-like scope
- Legal review if naming competitor
- No misleading superiority
- No copied competitor content

MVP’de competitor comparison landing pages yoktur.

---

## 111. AI-Assisted Content Policy

AI:

- outline/draft/terminology aid olabilir,
- source olarak kabul edilmez,
- product facts uyduramaz,
- translation approval veremez,
- publication decision yapamaz,
- final human owner/reviewer gerektirir.

AI-generated content disclosure/legal policy future requirement’e göre güncellenir.

---

## 112. Generative Search Readiness

Özel “AI SEO” schema’sı uydurulmaz.

Useful foundations:

- Clear entity/product identity
- Evidence-backed technical statements
- Semantic headings
- Crawlable internal links
- Accurate structured data
- Source/version transparency
- Helpful concise answers

Normal search/content quality primary kalır.

---

## 113. Analytics Ana Kararı

İki ölçüm katmanı vardır:

### Web behaviour analytics

Public page/interaction trends.

### First-party business analytics

Committed quote, support, dealer, document ve partner records.

Web event kaybolsa bile business conversion kaybolmaz.

---

## 114. Analytics Provider Recommendation

Recommended MVP candidate: Plausible Analytics Cloud, subject to:

- budget/plan confirmation,
- DPA/data-location review,
- UK and Ukraine legal review,
- custom-event/property plan fit,
- CSP/performance test.

Reasons:

- lightweight public web analytics,
- custom events,
- categorical custom properties,
- simpler baseline than GA4 + session-recording stack.

Provider decision remains ANA-001 until Founder/legal approval.

---

## 115. Provider Architecture

Application uses typed internal adapter:

~~~ts
type PublicAnalyticsEvent = {
  name: AnalyticsEventName
  props: PublicAnalyticsProperties
}
~~~

UI component provider SDK directly çağırmaz. Adapter:

- consent/legal mode,
- provider availability,
- property allowlist,
- environment,
- duplicate protection

uygular.

Provider’ın automatic form, file-download veya outbound-link tracking’i default olarak açılmaz. Özellikle link event’inde full `href` otomatik property olarak gönderilebileceği için query string, private route veya document link’leri manual allowlisted adapter dışında izlenmez.

---

## 116. Domain Reporting Model

Recommendation:

- One analytics site/property per canonical public domain
- Shared event taxonomy
- Separate UK/UA dashboards
- Combined management report from aggregated metrics
- No cross-domain individual visitor stitching baseline

Market switch user journey continuity iş açısından gerekli olursa privacy/legal review sonrası değerlendirilir.

---

## 117. Protected Surface Analytics

Admin:

- third-party web analytics off,
- operational/audit metrics only.

Portal:

- third-party analytics off MVP,
- privacy-safe first-party product events only if approved.

Auth/private document routes:

- no public analytics pageview,
- security/business event only.

---

## 118. Event Naming

Format:

~~~text
noun_action_completed
entity_action
~~~

Rules:

- snake_case
- stable
- provider-independent
- success semantics explicit
- no locale in event name
- no button colour/position name
- version only when contract breaking

### Earlier-document event aliases

Bu belge event taxonomy için canonical isim kaynağıdır. Önceki discovery belgelerindeki geçici isimler implementation’da ikinci event olarak gönderilmez.

| Earlier/discovery name | Canonical name |
|---|---|
| `quote_request_submitted` | `quote_submission_completed` |
| `dealer_application_submitted` | `dealer_application_completed` |
| `project_support_submitted` | `project_support_submission_completed` |
| `technical_document_requested` | `document_access_requested` |
| `document_accessed` | `document_download_authorized` |
| `product_added_to_project_list` | `project_list_item_added` |

---

## 119. Common Event Context

Allowed required properties where relevant:

- `market`: `uk` | `ua`
- `locale`: `en-GB` | `uk-UA`
- `route_key`
- `page_type`
- `content_public_key`
- `product_family_key`
- `industry_key`
- `source_context`
- `device_class` provider-derived, coarse

No user/company personal identifier.

---

## 120. Forbidden Analytics Properties

- Name
- Email
- Phone
- Address
- Exact company legal name
- User/account id
- Quote/support message
- Search term containing PII
- Attachment filename
- Private document title/path
- Signed URL/token
- Auth state token
- Precise location/IP as custom property
- Free-text form value

Automatic event capture bu allowlist’i bypass edemez.

---

## 121. Pageview Policy

- Public canonical pages only
- SPA route transition once
- Duplicate initial + route event prevented
- 404 classified separately
- Query params sanitised
- UTM preserved only in approved campaign fields
- Preview/staging excluded
- Internal traffic excluded where practical

---

## 122. Product Events

| Event | Trigger |
|---|---|
| `product_viewed` | Product detail meaningful pageview |
| `category_viewed` | Category page view |
| `related_product_selected` | User follows related product |
| `technical_resource_selected` | User opens resource intent |

Product key public-safe categorical id olur.

---

## 123. Industry and Map Events

| Event | Trigger |
|---|---|
| `industry_viewed` | Industry detail view |
| `application_map_opened` | Map usable state ready |
| `application_map_zone_selected` | Zone selected |
| `application_map_product_selected` | Valid linked product selected |
| `application_map_list_viewed` | Accessible list opened if useful |

Pan/zoom gibi noisy events MVP’de izlenmez.

---

## 124. Comparison and Project-List Events

| Event | Trigger |
|---|---|
| `comparison_started` | First valid product added |
| `comparison_item_added` | Additional valid product |
| `comparison_completed` | Meaningful compare view rendered |
| `project_list_item_added` | Item committed to local list |
| `project_list_quote_started` | User enters quote flow |

Local project list content/notes analytics’e gönderilmez.

---

## 125. Form Funnel Events

Allowed:

- `quote_form_started`
- `quote_submission_completed`
- `project_support_form_started`
- `project_support_submission_completed`
- `dealer_application_started`
- `dealer_application_completed`
- `contact_submission_completed`

“Completed” yalnız database transaction commit sonrası.

---

## 126. Business Conversion Source

Authoritative counts:

- Quote rows created
- Enquiry/project-support rows created
- Dealer applications created
- Document access requests created
- Authorized document access events
- Partner onboarding states

Analytics conversion count diagnostic/attribution içindir; finance/operations truth değildir.

---

## 127. Document Events

| Event | Source |
|---|---|
| `document_access_requested` | Business transaction |
| `document_download_authorized` | Current access allowed and issuance attempted |
| `document_access_denied` | Security/operational only; not public analytics |

Document raw title/path analytics provider’a gitmez.

---

## 128. Search Events

- `site_search_submitted`
- `search_result_selected`
- `search_no_results`

Provider’a raw search term gönderilmez baseline.

No-result term improvement için first-party sanitised aggregate store kullanılabilir:

- PII heuristic
- length limit
- low-volume privacy threshold
- normalized term
- retention
- restricted access

---

## 129. Market Switch Events

- `market_switch_selected`
- source market
- target market
- equivalent_found boolean
- source route key

Cross-domain visitor id linking baseline’da yoktur.

---

## 130. 404 and Broken Journey Events

- `public_404_viewed` with normalized route class, not full sensitive path
- `broken_internal_link_detected` through automated crawler preferred
- `form_error_summary_shown` only categorical error class if useful

Raw exception/error analytics’e gitmez.

---

## 131. Campaign Attribution

Allowed campaign fields:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content` where controlled
- `utm_term` only if privacy-safe

Rules:

- length/character validation
- no PII
- stored with business submission only where approved
- canonical excludes params
- internal links UTM ile kirletilmez

---

## 132. Referrer Policy

- Provider standard referrer report
- Sensitive private paths not leaked
- `Referrer-Policy` security header
- Cross-domain market switch privacy reviewed
- Private document/download `no-referrer`

---

## 133. Analytics Consent Decision

“Cookie-free” marketing claim tek başına legal basis/consent kararı değildir.

Production öncesi:

- technology audit,
- cookies/localStorage/link decoration/fingerprint review,
- provider/DPA,
- UK current storage-access rules,
- Ukraine data/privacy rules,
- purpose and retention,
- opt-out/consent mechanism

legal owner tarafından onaylanır.

---

## 134. UK Storage/Analytics Mode

ICO’nun 2026 guidance’ı storage/access technologies için statistical-purpose exception ve simple objection gibi güncel kurallar içerir.

InfraVolt:

- exception’a otomatik güvenmez,
- exact Plausible/configuration behavior’ı audit eder,
- clear information sağlar,
- required ise prior consent uygular,
- exception kullanılabiliyorsa simple objection ve legal conditions uygular,
- decision record tutar.

Bu belge legal advice değildir.

---

## 135. Ukraine Privacy Mode

UK consent sonucu Ukraine domain’e otomatik kopyalanmaz.

Ukraine launch:

- local legal review,
- provider/data transfer review,
- Ukrainian privacy/cookie copy,
- consent/opt-out behavior,
- retention and user rights contact

gerektirir.

---

## 136. Consent Categories

Potential categories:

- Strictly necessary
- Security
- Preferences
- Analytics/statistical
- Marketing
- Third-party media

Actual UI categories legal technology audit sonrası kesinleşir.

---

## 137. Consent UX

- Accept and reject/equivalent controls clear
- No preselected optional consent
- No deceptive colour hierarchy
- Granular where needed
- Accessible keyboard/screen reader
- Market language
- Change/withdraw path
- Provider list/purpose
- Versioned consent record where required

---

## 138. Consent State

- Minimum necessary preference storage
- Version
- Categories
- Timestamp where required
- Market/domain
- No auth identity required
- Expiry/re-prompt policy
- Withdrawal effective

Consent state analytics user profile oluşturmak için kullanılmaz.

---

## 139. Analytics Script Loading

- No production script before approved legal condition
- CSP allowlist
- Async/defer/provider recommended
- Failure does not break site/form
- Environment gated
- Preview off by default
- No duplicate tag manager + direct script
- Performance budget measured

---

## 140. Session Recording Decision

Clarity, Hotjar veya equivalent session recording MVP’de kullanılmaz.

Future adoption requires:

- explicit problem,
- redaction validation,
- form/private route exclusion,
- consent/legal approval,
- retention,
- access control,
- limited experiment window.

---

## 141. Internal Traffic Exclusion

Options:

- provider exclude rules,
- controlled internal header/cookie,
- office IP only if appropriate,
- staging/preview separation.

Exclusion mechanism personal tracking veya production bypass yaratmamalıdır.

---

## 142. Bot and Spam Traffic

- Provider bot filtering
- Server business conversion truth
- Turnstile/rate-limit outcomes
- Sudden referral anomaly
- No manual deletion without audit/context

Traffic spike conversion başarısı sayılmaz.

---

## 143. Analytics QA

- Event exact trigger
- No duplicate
- Correct market/locale/route
- Allowed properties only
- No PII/free text
- Consent/opt-out behavior
- Provider unavailable resilience
- Staging exclusion
- SPA navigation
- Form completion after commit
- Cross-domain switch behavior

---

## 144. SEO KPI’ları

- Non-brand qualified impressions/clicks
- Priority query/page position distribution
- Indexed canonical pages
- Excluded/error reasons
- Hreflang/canonical errors
- Organic qualified conversion rate
- Product/category/industry organic entry
- Core Web Vitals pass rate
- Rich result/structured data validity

Average position tek başına başarı değildir.

---

## 145. Content KPI’ları

- Published complete priority pages
- Translation approval coverage
- Content freshness overdue
- Technical source coverage
- Broken link rate
- No-result search gaps
- Document request gaps
- Content-assisted quote/support
- Wrong-content incidents

---

## 146. Commercial KPI’ları

- Qualified quote requests by market/source
- Project-support requests
- Dealer applications
- Document access requests
- Product/category interest
- Industry/Application Map assisted conversions
- Organic vs direct/referral outcome
- Lead-to-qualified progression from database

---

## 147. Funnel Model

Example:

~~~mermaid
flowchart TD
    A["Qualified landing"] --> B["Product or industry discovery"]
    B --> C["Compare, map or resource intent"]
    C --> D["Quote, support or dealer form"]
    D --> E["Committed business record"]
    E --> F["Qualified operational outcome"]
~~~

Analytics first four steps’i; database son iki step’i güvenilir biçimde ölçer.

---

## 148. Dashboard Set

### SEO dashboard

Search Console + technical health.

### Content dashboard

Coverage, publication, translation, freshness.

### Behaviour dashboard

Plausible/provider page and event trends.

### Business dashboard

Database lead/quote/dealer/document outcomes.

Tek dashboard tüm truth’ları karıştırmaz.

---

## 149. Reporting Cadence

### Weekly launch/early phase

- Crawl/index errors
- Forms/conversions
- Traffic anomalies
- Content incidents

### Monthly

- Market SEO performance
- Content gap/freshness
- Funnel events vs database conversions
- Priority page actions

### Quarterly

- Topic/market strategy
- Provider/privacy review
- KPI usefulness
- Backlog reprioritization

---

## 150. Alerting

Alerts:

- Organic traffic sudden drop
- Sitemap/robots fetch failure
- Large index exclusion spike
- 5xx/404 internal-link spike
- Hreflang/canonical regression
- Form business conversions stop
- Analytics event volume disappears/doubles
- Wrong-market publication
- Structured data critical errors

---

## 151. Experimentation

A/B test MVP baseline değildir.

Future test:

- Clear hypothesis
- Primary metric
- Guardrail metric
- Consent/privacy
- SEO canonical/index risk
- Sample/duration
- No deceptive UX
- Decision record

SEO-critical page content split testing requires careful crawl behavior.

---

## 152. Analytics Data Access

- Named users
- Least privilege
- Founder/Product/SEO according to need
- No public dashboard containing sensitive business data
- Provider account MFA
- Access removal
- Quarterly review
- Export controlled

---

## 153. Retention

Provider and first-party datasets have separate retention.

Define:

- Purpose
- Granularity
- Duration
- Aggregate vs raw
- Deletion/export
- Legal basis
- Owner

Long retention “belki lazım olur” gerekçesiyle seçilmez.

---

## 154. Content/SEO Security

- Preview authenticated/noindex/no-store
- Draft not sitemap
- Publish permission
- Redirect open-redirect validation
- JSON-LD safe serialization
- User text escaped
- Analytics property allowlist
- No secret/private URL
- Provider scripts CSP-controlled
- Admin audit

---

## 155. Content Accessibility

- Semantic headings
- Descriptive links
- Alt policy
- Tables with headers
- Plain language
- Captions/transcripts
- Map list alternative
- Form instructions/errors
- Language attributes
- No colour-only meaning

SEO shortcut accessibility’i bozamaz.

---

## 156. MVP Content Scope

- en-GB core site
- Homepage
- Priority product categories/products
- Priority industries
- Pilot Application Map
- Quote/project support/dealer/contact
- About
- Technical resource metadata/access path
- Legal pages
- Core metadata/canonical/sitemap/robots
- Organization/Product/Breadcrumb structured data where valid
- Analytics adapter and approved provider
- Core event taxonomy

---

## 157. Ukraine Launch Scope

- Purchased/configured Ukraine domain
- uk-UA navigation/routes
- Ukrainian core page content
- Priority Ukrainian products/categories
- Priority industries/project support
- Localized Application Map UI
- Ukrainian forms/email/legal/contact
- Self canonical
- Reciprocal hreflang only complete pairs
- UA sitemap/Search Console
- UA analytics/privacy configuration
- Native/technical approval

---

## 158. V1 Scope

- Public site search
- Content gap reports
- Expanded products/industries
- Additional maps
- Curated selection guides
- Advanced first-party aggregation
- Search term privacy-safe aggregate
- Automated hreflang/sitemap QA
- Content freshness workflows
- Provider API/report automation if needed

---

## 159. Deferred Scope

- Daily blog/newsroom
- Programmatic SEO
- User reviews/ratings
- Public price/Offer schema
- Session recording
- Personalised content
- Cross-domain visitor stitching
- Advanced attribution modelling
- Marketing automation/CDP
- Large-scale A/B platform
- AI-generated bulk publishing

---

## 160. Release Sequence

### Phase 1 — Content foundation

- Taxonomy
- Technical source links
- Route/content identity
- en-GB/uk-UA glossary

### Phase 2 — UK core

- Priority pages
- Metadata/internal links
- Forms/legal

### Phase 3 — Technical SEO

- Canonical/hreflang engine
- Sitemap/robots
- Structured data
- Search Console

### Phase 4 — Analytics

- Adapter
- Consent/legal mode
- Event QA
- Business reconciliation

### Phase 5 — Ukraine

- Domain
- Approved localization
- UA SEO/analytics
- Independent launch gate

---

## 161. Definition of Ready

Page/content work başlamadan:

- Market/locale
- Audience/intent
- Route key/page type
- Source/evidence
- Required sections
- CTA
- Relationships
- Index/canonical intent
- Metadata/structured data
- Analytics events
- Approvers

tanımlanmış olmalıdır.

---

## 162. Definition of Done

- Content approved
- Technical claims verified
- Localization approved
- Correct market publication
- Metadata/canonical/hreflang
- Sitemap/index policy
- Links/breadcrumbs
- Structured data valid
- Accessibility QA
- Performance/media QA
- Events privacy-tested
- Search Console/production smoke test where applicable

---

## 163. Open Decisions

| ID | Decision | Recommendation | Blocking stage |
|---|---|---|---|
| CNT-001 | Exact Ukraine domain | Founder/DNS/legal approval | UA launch |
| CNT-002 | Ukrainian slug style | Native SEO review, consistent policy | UA routes |
| CNT-003 | Pilot Application Map industry | Airport/transport candidate | Map content |
| CNT-004 | First priority product set | Sales + technical evidence | UK content |
| CNT-005 | Ukrainian terminology approver | Named qualified reviewer | UA content |
| CNT-006 | Legal copy owner | Named UK/UA legal reviewer | Public launch |
| SEO-001 | Map indexing per pilot | Index only content-rich accessible route | Map launch |
| SEO-002 | Resource metadata indexing | Document-class policy | Resource launch |
| SEO-003 | Product structured data field set | Basic Product, no fake Offer | Product launch |
| SEO-004 | x-default | None until neutral global page | Domain launch |
| ANA-001 | Analytics provider | Plausible candidate | Analytics implementation |
| ANA-002 | UK consent/exception mode | Current legal technology audit | UK production |
| ANA-003 | Ukraine analytics legal mode | Local legal review | UA launch |
| ANA-004 | Plausible plan/custom properties | Confirm cost/features | Analytics build |
| ANA-005 | First-party sanitised search-term store | V1 only | Search V1 |

---

## 164. Founder Approval Checklist

- [ ] Separate UK/UA canonical domain strategy approved
- [ ] No silent translation fallback approved
- [ ] Technical evidence/claim policy approved
- [ ] Content ownership and publishing roles approved
- [ ] Core page templates approved
- [ ] Canonical/hreflang/x-default decisions approved
- [ ] Indexing matrix approved
- [ ] Structured data scope approved
- [ ] Plausible candidate approved for evaluation
- [ ] Database as conversion truth approved
- [ ] Consent/legal review gates approved
- [ ] MVP and Ukraine content scope approved

---

## 165. Implementation Backlog

1. Domain/route/content config
2. Content entities/localizations/publications
3. Glossary/evidence fields
4. Admin content workflow
5. Page metadata helper
6. Canonical/hreflang helper
7. robots/sitemap
8. JSON-LD builders
9. Redirect registry
10. UK core content load
11. Ukrainian localization workflow
12. Analytics typed adapter
13. Consent/legal mode
14. Event implementation/tests
15. Search Console properties
16. Dashboards/report cadence

---

## 166. Resmi Kaynaklar

### Google Search

- [Localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Robots meta and X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
- [Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)
- [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

### Analytics and privacy

- [Plausible custom events](https://plausible.io/docs/custom-event-goals)
- [Plausible custom properties](https://plausible.io/docs/custom-props/introduction)
- [Plausible data policy](https://plausible.io/data-policy)
- [ICO guidance on storage and access technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/)
- [ICO consent management guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/)

Provider, legal ve search guidance implementation/launch tarihinde yeniden doğrulanır.

---

## 167. Son Karar

InfraVolt content sistemi çok sayıda düşük değerli sayfa üretmeyecektir.

Doğru model:

- verified technical sources,
- gerçek market localization,
- independent UK/UA publication,
- stable logical identity,
- useful product/industry/application content,
- correct canonical/hreflang/indexing,
- truthful structured data,
- privacy-safe behaviour analytics,
- database-backed business outcomes

üzerine kurulacaktır.

SEO ve analytics, launch sonunda eklenen plugin’ler değil; page requirement ve publishing workflow’un parçasıdır.

---

## 168. Document Control

### 168.1 Approval

| Role | Name | Status | Date |
|---|---|---|---|
| Founder / CEO | Erhan Baydi | Pending | — |
| Content Owner | — | Pending | — |
| Ukrainian Language/Market Reviewer | — | Pending | — |
| Technical Reviewer | — | Pending | — |
| SEO/Analytics Owner | — | Pending | — |
| Legal/Privacy Reviewer | — | Pending | — |

### 168.2 Revision History

| Version | Date | Author | Summary |
|---|---|---|---|
| 0.1.0 | 15 July 2026 | InfraVolt Product Team | Initial UK/UA content governance, technical SEO, structured data, analytics and consent contract |

### 168.3 Change Rule

Domain, locale, fallback, publication, claim evidence, index, canonical, hreflang, sitemap, structured data, analytics provider, event property, consent veya KPI kararındaki değişiklik bu belgenin version update’ini gerektirir.
