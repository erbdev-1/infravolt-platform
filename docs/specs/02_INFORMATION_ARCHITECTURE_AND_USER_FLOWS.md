# InfraVolt — Information Architecture and User Flows

> Document ID: INF-02  
> Version: 0.1.0  
> Status: Draft for Founder Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Delivery Owner: Product Director / CTO / Head Agent  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required locales: en-GB + uk-UA  
> Domain model: Separate domains, shared application and shared content model  
> Last updated: 15 July 2026  
> Document language: Turkish; route keys, screen IDs, event names and technical identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt platformunun bilgi mimarisini, navigation sistemini, route modelini, page hierarchy’sini ve kritik kullanıcı akışlarını tanımlar.

Belge aşağıdaki sorulara kesin cevap verir:

- Hangi kullanıcı hangi yüzeyde hangi bilgiye ulaşır?
- Public website, admin ve partner portalı nasıl ayrılır?
- Ana navigation ve footer hangi bağlantıları içerir?
- Ürün, sektör, Application Map ve teknik kaynaklar arasında nasıl geçiş yapılır?
- Kullanıcı Project List, quote, document request ve dealer application görevlerini nasıl tamamlar?
- UK ve Ukraine domainleri arasında karşılık gelen sayfa nasıl bulunur?
- Login, permission, empty, loading, error ve success durumlarında kullanıcı nereye gider?
- Page template’leri hangi ortak içerik bölgelerine sahiptir?
- Hangi route indexlenir, hangisi korunur veya crawl dışında tutulur?

Bu belge görsel stil, component görünümü, database schema veya API contract tanımlamaz. Bunlar sonraki dokümanlarda hazırlanacaktır.

---

## 2. Belge Hiyerarşisi

Bu belge:

- 00_MASTER_PROJECT_SPEC.md içindeki product scope ve dual-market kararlarına,
- 01_PRODUCT_REQUIREMENTS.md içindeki requirement ve acceptance criteria’ya

bağlıdır.

Çelişki durumunda üst belgeler geçerlidir. Route, navigation veya flow değişikliği ilgili requirement ID ve change-control kaydıyla ilişkilendirilmelidir.

---

## 3. Bilgi Mimarisi Hedefleri

### 3.1 Birincil hedefler

- İlk kez gelen B2B ziyaretçiye InfraVolt’un ne sunduğunu hızla anlatmak
- Kullanıcıyı ürün adı bilmek zorunda bırakmadan uygun çözüme ulaştırmak
- Product-first ve industry-first keşif yollarını birlikte desteklemek
- High-intent CTA’larda product, industry, market ve project context’ini korumak
- Teknik kaynak erişimini metadata, request ve approval adımlarıyla anlaşılır kılmak
- Public, internal ve partner bilgilerini kesin sınırlarla ayırmak
- UK ve Ukraine deneyimlerini aynı route registry üzerinden eşlemek
- Mobil, keyboard ve assistive-technology kullanıcılarının aynı işi tamamlamasını sağlamak

### 3.2 İkincil hedefler

- SEO için tutarlı content hierarchy ve internal linking oluşturmak
- Search, no-result ve missing-content sinyallerini ölçmek
- Admin’de aksiyon gerektiren kayıtları entity sayısından önce göstermek
- Portalı read-heavy ve güvenli başlayacak şekilde sade tutmak
- Yeni product, industry veya market eklemeyi navigation yeniden yazımı olmadan desteklemek

---

## 4. IA İlkeleri

| İlke | Karar |
|---|---|
| Task-first | Navigation şirket organizasyonuna değil kullanıcı görevlerine göre kurulur |
| Multiple entry paths | Ürüne category, industry, search, map veya related-content yoluyla ulaşılabilir |
| Context continuity | CTA, selected product, industry, document ve market context’ini taşır |
| Progressive disclosure | Teknik ayrıntı gerektiğinde açılır; ilk ekran bilgi duvarına dönüşmez |
| One canonical destination | Aynı içerik için kontrolsüz duplicate page üretilmez |
| Separate surfaces | Public, admin ve portal navigation birbirine karıştırılmaz |
| Market-aware | Route eşlemesi yalnız dil değil market availability’yi de kontrol eder |
| Safe by default | Unpublished, private veya yetkisiz içerik navigation’da sızdırılmaz |
| Accessible alternatives | Visual map ve complex comparison için eşdeğer alternatif bulunur |
| Recoverable flows | Error kullanıcıyı baştan başlamaya zorlamaz; güvenli veri korunur |

---

## 5. Ürün Yüzeyleri

### 5.1 Public B2B Website

Hedef kullanıcılar:

- Anonymous visitors
- Commercial buyers
- Contractors
- Consultants/specifiers
- Procurement teams
- Dealer applicants
- Returning leads

Ana görevler:

- InfraVolt’u anlamak
- Ürün keşfetmek
- Sektör çözümü incelemek
- Product compare etmek
- Project List oluşturmak
- Quote veya project support istemek
- Technical resource talep etmek
- Partner/dealer başvurusu yapmak

### 5.2 Internal Admin & Sales Operations

Hedef kullanıcılar:

- Sales Admin
- Dealer Manager
- Technical Manager
- Administrator
- Super Admin

Ana görevler:

- Yeni talepleri triage etmek
- Owner ve next action atamak
- Quote, project ve supplier request takip etmek
- Dealer başvurusunu değerlendirmek
- Product, document ve industry içeriğini yönetmek
- Permission ve critical publication işlemlerini kontrol etmek

### 5.3 Approved Partner / Dealer Portal

Hedef kullanıcılar:

- Approved Partner
- Dealer User
- Authorised project user

Ana görevler:

- Kendi company özetini görmek
- Kendi quote, project ve order durumlarını izlemek
- Yetkili technical documents’a erişmek
- Support request oluşturmak
- Profile ve notification preference yönetmek

---

## 6. Yüzeyler Arası Sınırlar

| Bilgi veya işlem | Public | Admin | Portal |
|---|---:|---:|---:|
| Published product content | Evet | Yönetilir | Evet |
| Public industry content | Evet | Yönetilir | Evet |
| Project List | Evet | Submission sonrası görülür | Gelecekte yeniden kullanım |
| Public quote request | Evet | Yönetilir | Kendi quote özeti |
| Internal owner/priority | Hayır | Evet | Hayır |
| Internal note | Hayır | Evet | Hayır |
| Dealer application | Form | Yönetilir | Hayır |
| Dealer approval | Hayır | Yetkili role | Sonuç/erişim etkisi |
| Private document metadata | Sınırlı | Evet | Yetkiye göre |
| Private file URL | Hayır | Kontrollü | Signed access |
| Customer-visible order status | Hayır | Yönetilir | Evet |
| User/role administration | Hayır | Super Admin | Hayır |

Public page veya portal response’u admin-only alanları hiçbir durumda taşımamalıdır.

---

## 7. Domain ve Locale URL Modeli

### 7.1 Baseline karar

- UK domain: infravolt.co.uk
- Ukraine domain: Founder tarafından seçilecek ayrı .ua domain
- UK default market/locale: UK / en-GB
- Ukraine default market/locale: Ukraine / uk-UA
- Public canonical URL’lerde locale prefix kullanılmaz.
- Aynı application iki domain için domain-aware content üretir.

Örnek:

~~~text
https://infravolt.co.uk/products
https://{ukraine-domain.ua}/{approved-uk-UA-products-slug}
~~~

URL içinde /en-GB veya /uk-UA kullanılması baseline değildir. Preview ve local test ortamı teknik ihtiyaç için özel market parametresi kullanabilir; bu parametre public canonical model değildir.

### 7.2 Stable route key

Her public page’in dilden bağımsız bir route key değeri olmalıdır.

Örnek:

| Route key | UK path | Ukraine path |
|---|---|---|
| products.index | /products | Ukrainian reviewed slug |
| industries.index | /industries | Ukrainian reviewed slug |
| resources.index | /technical-resources | Ukrainian reviewed slug |
| project-support | /project-support | Ukrainian reviewed slug |
| about | /about | Ukrainian reviewed slug |
| contact | /contact | Ukrainian reviewed slug |

Ukraine slug’ları Ukrainian language/SEO review sonrasında kesinleşir. İngilizce slug’ın geçici olarak Ukraine canonical kabul edilmesi otomatik karar değildir.

### 7.3 Content equivalence

Market switcher page ID ve route key üzerinden karşılık arar:

1. Aynı content item’ın target market published karşılığı bulunur.
2. Bulunursa target domain canonical path açılır.
3. Karşılık yoksa en yakın published parent page açılır.
4. Kullanıcıya içeriğin birebir karşılığının mevcut olmadığı anlaşılır şekilde belirtilir.
5. Unpublished veya unauthorized target hiçbir şekilde açılmaz.

### 7.4 Query ve fragment kuralları

- Market switcher tracking query’lerini target domain’e taşımak zorunda değildir.
- Hassas form verisi URL query’sine yazılmaz.
- Product filters için allowlisted query parameters kullanılabilir.
- Application Map selected zone/product share edilecekse opaque veya validated identifiers kullanılır.
- Return-to parameter yalnız allowlisted internal path kabul eder.
- UTM ve campaign parameters analytics/consent kurallarına göre işlenir.

---

## 8. Route Status Sınıfları

| Status | Anlam |
|---|---|
| public-indexable | Search engine tarafından indexlenebilir |
| public-noindex | Public erişilebilir fakat indexlenmemeli |
| authenticated | Login gerektirir |
| authorised | Login ve permission/company scope gerektirir |
| internal-only | Yalnız internal roles |
| conditional | Market, publish veya access level’e göre değişir |

Her route bir status, market availability, release ve canonical rule taşır.

---

## 9. Public Global Navigation

### 9.1 Header katmanları

Header üç işlevsel katmandan oluşabilir:

1. Utility bar
2. Primary navigation
3. Contextual action area

Visual height ve breakpoint davranışı 03_UI_UX_ARCHITECTURE.md içinde kesinleşir.

### 9.2 Utility bar

Önerilen öğeler:

- Market/language switcher
- Market-specific phone veya contact shortcut
- Login
- Gerektiğinde project support shortcut

Utility bar ana navigation’ı kalabalıklaştırmamalıdır.

### 9.3 Primary navigation

Baseline üst seviye navigation:

1. Products
2. Industries
3. Technical Resources
4. Project Support
5. About
6. Partner With Us

Sağ action alanı:

- Project List count
- Request a Quote
- Mobile menu trigger

Contact, References, Certifications ve Market Coverage; secondary navigation, mega-menu, context links veya footer üzerinden erişilebilir.

### 9.4 Products navigation

Desktop’ta Products mega-menu aşağıdaki yapıyı destekleyebilir:

- Product categories
- Priority/featured systems
- Compare Products
- View All Products
- Build a Project List

Kurallar:

- Yalnız target market’te published category görünür.
- Sekiz category’nin tamamı content hazır değilse empty label gösterilmez.
- Menu item ürün datasından türetilir; component içine sabitlenmez.
- Featured etiketi yalnız editorial karar ile kullanılır.

### 9.5 Industries navigation

Industries menu:

- Published industry list
- Featured Application Map girişi
- View All Industries
- Discuss a Project

Transport and Rail başlığı altında yalnız Airport asset bulunuyorsa Rail çözümü varmış gibi ayrı map link’i gösterilmez.

### 9.6 Resources navigation

Technical Resources menu:

- Product Catalogues
- Datasheets
- Certificates and Declarations
- Installation Guides
- Request a Technical Pack
- Certifications overview

Private resource file link’i navigation’a konmaz; navigation resource metadata veya request akışına gider.

### 9.7 Mobile navigation

Mobile menu:

- Primary sections’i tek kolon hiyerarşide gösterir.
- Alt menüler accordion veya drill-in pattern kullanabilir.
- Project List count görünür kalır.
- Market switcher erişilebilir konumda kalır.
- Menu kapandığında focus trigger’a döner.
- Background scroll ve focus escape kontrol edilir.

---

## 10. Public Footer IA

### 10.1 Footer grupları

**Products**

- All Products
- Priority categories
- Compare Products
- Project List

**Industries**

- All Industries
- Published priority industries
- Application Map

**Resources**

- Technical Resources
- Certifications
- Request Technical Documents
- Project Support

**Company**

- About
- References
- Market Coverage
- Contact
- Partner With Us

**Account and legal**

- Login
- Privacy
- Cookies
- Terms
- Accessibility statement when approved

### 10.2 Footer kuralları

- Contact ve legal details market-specific olur.
- UK company information Ukraine siteye yanlış legal entity gibi kopyalanmaz.
- Footer sitemap değildir; kullanıcı için önemli linklerle sınırlanır.
- Unpublished section footer’da görünmez.
- Social links yalnız aktif ve approved hesaplara bağlanır.

---

## 11. Public Sitemap — Logical Tree

~~~text
Public Website
├── Home
├── Products
│   ├── Category
│   │   └── Product or Series
│   ├── Compare Products
│   └── Project List
├── Industries
│   ├── Industry
│   │   └── Application Map
│   └── Project Support
├── Technical Resources
│   ├── Resource Type
│   ├── Resource Metadata
│   ├── Certifications
│   └── Technical Pack Request
├── References
│   └── Reference Detail
├── Company
│   ├── About
│   ├── Market Coverage
│   └── Contact
├── Partner With Us
│   └── Dealer Application
├── Search
├── Request a Quote
├── Authentication
└── Legal
    ├── Privacy
    ├── Cookies
    └── Terms
~~~

---

## 12. Public Route Register

### 12.1 Core and discovery routes

| Route key | UK baseline path | Template | Status | Release |
|---|---|---|---|---|
| home | / | Homepage | public-indexable | Public MVP |
| products.index | /products | Product Index | public-indexable | Public MVP |
| products.category | /products/[categorySlug] | Product Category | public-indexable | Public MVP |
| products.detail | /products/[categorySlug]/[productSlug] | Product Detail | public-indexable | Public MVP |
| products.compare | /products/compare | Comparator | public-indexable or noindex decision | Sales Ops MVP |
| project-list | /project-list | Project List | public-noindex | Sales Ops MVP |
| industries.index | /industries | Industry Index | public-indexable | Public MVP |
| industries.detail | /industries/[industrySlug] | Industry Detail | public-indexable | Public MVP |
| industries.map | /industries/[industrySlug]/application-map | Application Map | conditional indexable | Public MVP pilot |
| search | /search | Search Results | public-noindex | V1 |

### 12.2 Resource and trust routes

| Route key | UK baseline path | Template | Status | Release |
|---|---|---|---|---|
| resources.index | /technical-resources | Resource Index | public-indexable | Public MVP |
| resources.type | /technical-resources/[resourceTypeSlug] | Resource Listing | public-indexable | V1 |
| resources.detail | /technical-resources/[resourceSlug] | Resource Metadata | conditional | Public MVP |
| certifications | /certifications | Certification Overview | public-indexable | Public MVP |
| references.index | /references | Reference Index | public-indexable | Public MVP |
| references.detail | /references/[referenceSlug] | Reference Detail | conditional | V1 |
| market-coverage | /uk-coverage | Market Coverage | public-indexable | Public MVP |

Ukraine market-coverage path ve içeriği UK Coverage sayfasının mekanik kopyası değildir. Route key aynı olabilir; page identity market’e göre farklı content kullanır.

### 12.3 Conversion routes

| Route key | UK baseline path | Template | Status | Release |
|---|---|---|---|---|
| request-quote | /request-a-quote | Quote Request | public-noindex | Public MVP |
| project-support | /project-support | Project Support | public-indexable | Public MVP |
| technical-enquiry | /technical-enquiry | Technical Question | public-noindex | Sales Ops MVP |
| technical-pack-request | /request-technical-pack | Technical Pack Request | public-noindex | Sales Ops MVP |
| partner | /partner-with-us | Partner Programme | public-indexable | Public MVP |
| dealer-application | /partner-with-us/apply | Dealer Application | public-noindex | Sales Ops MVP |
| contact | /contact | Contact | public-indexable | Public MVP |

High-intent form route’ları modal-only değildir. Product page içindeki CTA modal, drawer veya inline step açsa bile paylaşılabilir ve erişilebilir dedicated route fallback’i bulunmalıdır.

### 12.4 Company and legal routes

| Route key | UK baseline path | Template | Status | Release |
|---|---|---|---|---|
| about | /about | Corporate Page | public-indexable | Public MVP |
| privacy | /privacy | Legal Page | public-indexable | Public MVP |
| cookies | /cookies | Legal Page | public-indexable | Public MVP |
| terms | /terms | Legal Page | public-indexable | Public MVP |
| accessibility | /accessibility | Legal/Policy Page | public-indexable | V1 or launch requirement |

### 12.5 Authentication routes

| Route key | UK baseline path | Status |
|---|---|---|
| auth.login | /login | public-noindex |
| auth.forgot | /forgot-password | public-noindex |
| auth.reset | /reset-password | public-noindex |
| auth.invitation | /accept-invitation | public-noindex |
| auth.unauthorised | /unauthorised | public-noindex |

Authentication route copy market’e göre yerelleşir. Login olmak permission sahibi olmak anlamına gelmez.

---

## 13. Route Naming Kuralları

- Public path lower-case ve kebab-case olur.
- Slug content title’dan üretilebilir fakat editorial olarak değiştirilebilir.
- Route key değişmez; locale slug değişebilir.
- Product detail path category context içerir.
- Database ID public canonical path’te kullanılmaz.
- Admin ve portal internal identifiers opaque olabilir.
- Route rename permanent redirect planı gerektirir.
- Trailing slash politikası tek biçimli olmalıdır.
- Query parameter order canonical içeriği çoğaltmamalıdır.
- Draft, preview ve admin preview URL’leri indexlenmez.

---

## 14. Homepage Information Architecture

### 14.1 Önerilen içerik sırası

1. Hero
2. Verified credibility strip
3. Core product systems
4. Industries we serve
5. Technical sales and project support
6. Featured Application Map veya industry visual
7. Technical resources preview
8. Certifications/compliance preview
9. References veya approved capability evidence
10. Market coverage
11. How InfraVolt works
12. Partner/trade invitation
13. Final conversion CTA

### 14.2 Hero kararları

Hero şunları cevaplar:

- InfraVolt ne sunar?
- Hangi kullanıcı/proje için değerlidir?
- Kullanıcı şimdi ne yapmalıdır?

Ana CTA:

- Explore Products

İkincil CTA seçeneklerinden en fazla biri:

- Build a Project List
- Discuss a Project
- Request a Quote

Hero tek başına beş eşit CTA göstermemelidir.

### 14.3 Homepage internal links

Homepage:

- Product category’lere
- Priority industry’lere
- Technical Resources’a
- Project Support’a
- Partner programme’a

anlamlı link verir. Her homepage card gerçek destination’a bağlanır; click olmayan decorative card button gibi görünmez.

---

## 15. Product Index Template

### 15.1 Sayfanın amacı

Ürün adını veya serisini bilmeyen kullanıcının product system seçmesini sağlamak.

### 15.2 İçerik bölgeleri

1. Breadcrumb
2. Page heading ve short guidance
3. Product category grid
4. Optional product finder/filter
5. Featured or priority systems
6. Product selection help
7. Project List explanation
8. Final quote/project CTA

### 15.3 Empty ve partial states

- Bir market’te category publish değilse grid’de görünmez.
- Category sayısı azsa sahte featured item üretilmez.
- Teknik seçim konusunda belirsizlik varsa Discuss a Project CTA sunulur.
- Search/filter no-result durumunda clear filters ve support link’i gösterilir.

---

## 16. Product Category Template

### 16.1 İçerik bölgeleri

1. Breadcrumb
2. Category heading ve approved summary
3. Use cases and typical applications
4. Filter/sort controls
5. Product/series result grid
6. Category-level technical resources
7. Related industries
8. Selection support CTA

### 16.2 Product card bilgi sırası

- Product/series name
- Short descriptor
- Verified differentiating fields
- Suitable use/industry
- Compare action
- Add to Project List
- View details

Fiyat gösterilmez.

### 16.3 Filter IA

Filter alanları category-specific olmalıdır. Her category’ye anlamsız global technical filters uygulanmaz.

Filter state:

- URL query ile paylaşılabilir olabilir.
- Clear all eylemi sunar.
- Result count gösterir.
- Unavailable option disable veya hide kararı UX testine göre verilir.

---

## 17. Product Detail Template

### 17.1 Above-the-fold bilgi

- Breadcrumb
- Manufacturer/product/category context
- Product/series name
- Short value proposition
- Approved primary image
- Key verified facts
- Add to Project List
- Request a Quote

### 17.2 Detay bilgi bölgeleri

1. Overview
2. Typical applications
3. Key benefits
4. Technical specifications
5. Variants and ratings
6. Standards and compliance references
7. Related technical resources
8. Suitable industries
9. Related products
10. Technical question CTA
11. Final quote/project CTA

### 17.3 Sticky veya repeated actions

Uzun sayfada:

- Add to Project List
- Request a Quote
- Ask Technical Question

uygun breakpoint’te tekrar erişilebilir olabilir. Actions content okumayı kapatmamalı veya mobile viewport’u aşırı daraltmamalıdır.

### 17.4 Missing data davranışı

- Eksik specification satırı gösterilmez.
- Approved wording varsa Available on request kullanılabilir.
- Belge yoksa sahte download action gösterilmez.
- Unverified range veya certification public summary’ye girmez.

---

## 18. Product Comparator IA

### 18.1 Entry points

- Product card Compare action
- Product detail Compare action
- Products mega-menu
- Existing comparison tray

### 18.2 Comparator bölgeleri

1. Heading ve selected count
2. Product identity row
3. Category-specific attribute groups
4. Differences-only toggle, P2
5. Add selected items to Project List
6. Remove/replace product
7. Request selection help

### 18.3 Comparison kuralları

- Duplicate product eklenmez.
- Maximum item limiti açıkça gösterilir.
- Incompatible category seçimi açıklanır.
- Missing value em dash veya Not available olarak gösterilir; tahmin edilmez.
- Mobile’da stacked product comparison veya seçilebilir pair pattern kullanılabilir.
- Semantics yalnız yatay scroll table’a bağlı kalmaz.

---

## 19. Project List IA

### 19.1 Entry points

- Product card
- Product detail
- Comparator
- Application Map product panel
- Related solution section

### 19.2 Project List page bölgeleri

1. Heading ve list summary
2. Project metadata
3. Line items
4. Per-item quantity/unit/variant/note
5. Add more products
6. General technical note
7. Attachment area when enabled
8. Company/contact step
9. Privacy/consent
10. Review and submit

### 19.3 Step model

Recommended desktop/mobile-compatible flow:

1. Products
2. Project details
3. Company and contact
4. Review
5. Confirmation

Tek sayfalı uzun form ancak usability testinde daha iyi sonuç verirse seçilebilir. Step geçişleri form verisini kaybetmemelidir.

### 19.4 Persistent indicator

Header Project List action:

- Item count gösterir.
- Public fiyat toplamı göstermez.
- Empty olduğunda Add products guidance sunar.
- Market switch sonrası item availability kontrolüne gider.

---

## 20. Industry Index Template

### 20.1 Sayfanın amacı

Kullanıcının ürün kodu bilmeden facility/project type üzerinden çözüm keşfetmesini sağlamak.

### 20.2 İçerik bölgeleri

1. Heading ve short explanation
2. Industry grid
3. Featured Application Map
4. Cross-industry technical support
5. Project consultation CTA

Industry card:

- Approved image
- Industry name
- One-line challenge/solution context
- View solutions
- Map availability indicator when real map exists

---

## 21. Industry Detail Template

### 21.1 İçerik bölgeleri

1. Breadcrumb
2. Industry hero
3. Key infrastructure challenges
4. Applicable product systems
5. Application Map preview
6. Technical/compliance support
7. Related resources
8. Approved references
9. Project support CTA

### 21.2 Context transfer

Industry page’den:

- Product link product detail’e industry source context ile gidebilir.
- Project Support industry ID ile prefilled olur.
- Application Map aynı industry identity’yi kullanır.
- Analytics personal data olmadan source industry kaydeder.

---

## 22. Application Map IA

### 22.1 Desktop regions

1. Map title ve guidance
2. Product/system menu
3. Main visual canvas
4. Hotspots
5. Selected zone/product panel
6. Zone carousel
7. Reset
8. Fullscreen
9. Alternative accessible list
10. Conversion actions

### 22.2 Mobile regions

Mobile deneyim yalnız küçültülmüş desktop canvas değildir:

1. Map intro
2. Zone selector
3. Scrollable image or focused zone
4. Selected product cards
5. All systems in this facility list
6. Product and quote CTA

### 22.3 Interaction state

| State | URL paylaşımı | UI davranışı |
|---|---|---|
| Default overview | Canonical | Guidance ve all zones |
| Zone selected | Optional query/fragment | Zone highlight ve products |
| Product selected | Optional validated identifier | Info panel ve CTA |
| Fullscreen | URL’ye yazılmaz | Same state expanded |
| Invalid selection | Canonical fallback | Selection reset + non-blocking message |

### 22.4 Asset architecture boundary

- Canonical path’ler asset-manifest.json üzerinden alınır.
- Old ChatGPT Image filenames code veya content kaydında kullanılmaz.
- public/assets/industries production candidate source’tur.
- reference/ui-mockups yalnız tasarım referansıdır.
- Embedded English menu/panel içeren composited görüntü Ukraine interactive UI olarak kullanılmaz.
- Text, label, CTA ve hotspot number mümkün olduğunca React/HTML katmanındadır.

---

## 23. Technical Resources IA

### 23.1 Resource discovery

Kullanıcı resource’ları şu yollardan bulabilir:

- Resource index
- Resource type listing
- Product detail related resources
- Category resource section
- Industry page
- Search
- Portal authorised documents

### 23.2 Resource metadata page

Bilgi sırası:

1. Breadcrumb
2. Document title
3. Document type
4. Related product/category
5. Language
6. Version/issue date
7. File type and size
8. Access requirement
9. Request/login/download action
10. Related resources

Private file path hiçbir page region’ında bulunmaz.

### 23.3 Access decision presentation

| Access level | Anonymous action | Authenticated action |
|---|---|---|
| lead_capture | Request form | Request veya existing approval |
| approved_partner | Login | Access if role/company allowed |
| dealer | Login | Access if dealer permission |
| project_specific | Login/request | Access only explicit project scope |
| admin_only | No external action | No portal access |

Admin-only belge public metadata listesinde varsayılan olarak görünmez.

---

## 24. Certifications IA

Certifications page:

- Marketing claim listesi değildir.
- Certificate metadata, scope ve related products açık ayrılır.
- Expired/superseded belge aktif compliance gibi gösterilmez.
- Certificate file access policy document metadata’dan bağımsız uygulanır.
- General certification explanation, product-specific suitability kararı yerine geçmez.

İçerik bölgeleri:

1. Compliance approach
2. Verified certificate/declaration groups
3. Scope explanation
4. Related products
5. Technical document request CTA
6. Technical question disclaimer

---

## 25. References IA

### 25.1 Reference index

- Market-approved references
- Industry filters
- Capability evidence
- Project support CTA

### 25.2 Reference detail

Yalnız permission varsa:

- Project context
- InfraVolt/Gersan scope wording
- Applied systems
- Approved images
- Outcome/capability evidence
- Related products/industries

Müşteri adı, location veya image izni yoksa anonim capability page tercih edilir.

---

## 26. Conversion Page IA

### 26.1 Request a Quote

Entry context:

- General
- Product
- Comparator
- Project List
- Application Map

Form context summary kullanıcıya gösterilir; hidden context’in ne olduğu belirsiz bırakılmaz.

### 26.2 Project Support

Product seçimi zorunlu değildir. Industry, project stage ve support need üzerinden çalışır.

### 26.3 Technical Enquiry

Product/series context mümkünse görünürdür. Kullanıcıya otomatik compliance approval beklentisi verilmez.

### 26.4 Technical Pack Request

İstenen product/category/document listesi görünür özet halinde sunulur.

### 26.5 Dealer Application

Partner programme page’den gelir; başvuru öncesi minimum suitability ve process explanation gösterilir.

---

## 27. Form Architecture

### 27.1 Ortak form yapısı

1. Purpose and expectation
2. Context summary
3. Required business fields
4. Optional project detail
5. Attachment when enabled
6. Privacy and consent
7. Review or submit
8. Success reference

### 27.2 Field grouping

- About you
- About your company
- About the project/request
- Products/documents
- Supporting information
- Consent

### 27.3 Validation davranışı

- Client validation hızlı feedback sağlar.
- Server validation authority’dir.
- İlk error’a focus veya error summary ile erişim sağlanır.
- Error text yalnız renkle anlatılmaz.
- Invalid field value non-sensitive ise korunur.
- File validation error diğer form alanlarını silmez.

### 27.4 Success davranışı

- Success yalnız database kaydı sonrası gösterilir.
- Reference görünürdür.
- Confirmation email beklentisi gerçek duruma uygun anlatılır.
- Kullanıcı next step ve expected human response bilgisini görür.
- Success page/form state noindex olur.

### 27.5 Duplicate submit

- Submit sırasında button state değişir.
- İkinci click duplicate record üretmemelidir.
- Network belirsizliğinde kullanıcıya tekrar denemeden önce current status anlatılır.

---

## 28. Search IA

### 28.1 Searchable content

- Product
- Product category
- Series
- Industry
- Public page
- Public resource metadata
- Approved reference

### 28.2 Search exclusions

- Private file content
- Admin records
- Portal records
- Draft/unpublished content
- Personal form data
- Internal notes

### 28.3 Result grouping

Sonuçlar content type’a göre etiketlenir:

- Products
- Industries
- Resources
- Pages
- References

### 28.4 No-result state

No result:

- Query’yi açıkça gösterir.
- Spelling help varsa yanıltmadan sunar.
- Popular category veya industry önerir.
- Contact/technical enquiry CTA sunar.
- No-result term’i kişisel veri temizleme kuralıyla analytics’e gönderir.

---

## 29. Breadcrumb Modeli

Örnekler:

~~~text
Home > Products > Busbar Trunking Systems > GS Series
Home > Industries > Transport Infrastructure > Application Map
Home > Technical Resources > Datasheets > Resource Title
Home > References > Reference Title
~~~

Kurallar:

- Home ilk item’dır.
- Current page link olmak zorunda değildir.
- Mobile’da okunabilir kısaltma yapılabilir.
- Breadcrumb page heading’in yerine geçmez.
- Market switch sonrası bütün parent links target domain’de kalır.

---

## 30. Context Preservation Modeli

### 30.1 Context object

High-intent transition şu güvenli context türlerini taşıyabilir:

- sourceRouteKey
- market
- locale
- productId or productIds
- categoryId
- industryId
- applicationMapId
- zoneId
- documentId
- projectListId or local list state

Personal message, email ve phone URL context’inde taşınmaz.

### 30.2 Context görünürlüğü

Kullanıcı formdan önce seçilmiş bağlamı görür:

- Selected product
- Selected industry
- Requested document
- Project List item summary

Kullanıcı yanlış context’i kaldırabilir veya değiştirebilir.

---

## 31. Public User Flow UF-01 — Product Discovery to Basic Quote

**Primary actors:** Contractor, wholesaler, buyer  
**Requirements:** PUB-001, PRD-001, PRD-003, FRM-003, NTF-001

~~~mermaid
flowchart TD
    A["Entry: Home, Search or Campaign"] --> B["Products or Industry"]
    B --> C["Category or Solution"]
    C --> D["Product Detail"]
    D --> E{"Next action"}
    E -->|Quote| F["Quote Form with Product Context"]
    E -->|Compare| G["Comparator"]
    E -->|Project List| H["Project List"]
    F --> I["Validate and Save"]
    I --> J["Reference and Confirmation"]
~~~

### Happy path

1. User product detail’e gelir.
2. Product summary ve verified facts’i inceler.
3. Request a Quote seçer.
4. Product context formda görünür.
5. Company, contact ve project bilgilerini girer.
6. Validation geçer.
7. Submission kaydedilir.
8. Reference gösterilir.
9. Admin notification ve user acknowledgement planlanır.

### Alternatifler

- Product uygun değilse related products veya selection help’e gider.
- Product unpublished olmuşsa safe category fallback sunulur.
- Email gönderilemezse success kaydı korunur; kullanıcıya form başarısız denmez.

---

## 32. Public User Flow UF-02 — Compare Products

**Requirements:** CMP-001, CMP-002, CMP-003

~~~mermaid
flowchart TD
    A["Product Card or Detail"] --> B["Add to Compare"]
    B --> C{"Compatible?"}
    C -->|Yes| D["Comparison Set"]
    C -->|No| E["Explain Category Constraint"]
    D --> F["Review Verified Attributes"]
    F --> G{"Action"}
    G -->|Add Items| H["Project List"]
    G -->|Get Help| I["Technical Enquiry"]
    G -->|Change Set| B
~~~

### Rules

- First item comparison schema’yı belirleyebilir.
- Incompatible item kullanıcıya neden ile açıklanır.
- Maximum limit’e ulaşıldığında hangi item’ın kaldırılacağı kontrolü kullanıcıdadır.
- Comparison set Project List’e toplu aktarılabilir.

---

## 33. Public User Flow UF-03 — Project List to Structured Quote

**Requirements:** PQL-001–004, FRM-001, NTF-001–002

~~~mermaid
flowchart TD
    A["Add Products"] --> B["Project List"]
    B --> C["Edit Items and Quantities"]
    C --> D["Project Details"]
    D --> E["Company and Contact"]
    E --> F["Review"]
    F --> G{"Server Validation"}
    G -->|Error| H["Return to Relevant Step"]
    G -->|Valid| I["Create Quote and Items"]
    I --> J["Confirmation Reference"]
~~~

### Happy path

1. User bir veya daha fazla product ekler.
2. Quantity, unit, variant ve notes girer.
3. Project metadata ekler.
4. Company/contact bilgilerini girer.
5. Privacy acknowledgement yapar.
6. Review ekranında ürünleri doğrular.
7. Server quote ve items kaydını oluşturur.
8. Reference görünür.

### Recovery

- Invalid item ilgili line üzerinde gösterilir.
- Market switch nedeniyle unavailable item varsa submission durdurulur ve çözüm seçenekleri sunulur.
- Attachment error diğer veriyi silmez.
- Session/local storage kaybında personal data restore edilmez; product list için güvenli fallback değerlendirilir.

---

## 34. Public User Flow UF-04 — Industry Map to Project Support

**Requirements:** IND-002, MAP-001–005, FRM-004

~~~mermaid
flowchart TD
    A["Industry Page"] --> B["Application Map"]
    B --> C["Select Zone"]
    C --> D["Select Product or System"]
    D --> E{"Action"}
    E -->|Learn| F["Product Detail"]
    E -->|Documents| G["Technical Resource Flow"]
    E -->|Project Help| H["Project Support with Context"]
    H --> I["Save Request"]
    I --> J["Confirmation"]
~~~

### Accessibility alternative

User map hotspot kullanamıyorsa:

1. Zone list açar.
2. Zone altındaki systems listesine gider.
3. Product card veya project-support CTA seçer.
4. Aynı context object formda taşınır.

Visual route ile alternative list aynı content data’sını kullanmalıdır.

---

## 35. Public User Flow UF-05 — Controlled Document Request

**Requirements:** RES-001–004, SEC-002–003

~~~mermaid
flowchart TD
    A["Resource Metadata"] --> B{"Access Level"}
    B -->|Lead Capture| C["Request Form"]
    B -->|Partner or Dealer| D["Login"]
    B -->|Project Specific| E["Login and Scope Check"]
    B -->|Admin Only| F["No External Access"]
    C --> G["Request Saved"]
    D --> H{"Authorised?"}
    E --> H
    H -->|Yes| I["Generate Time-Limited Access"]
    H -->|No| J["Safe Denial or Request Path"]
    I --> K["Log Access"]
~~~

### Lead-capture result

- Request kaydedilmesi file erişiminin otomatik verildiği anlamına gelmez.
- Auto-grant uygulanırsa document policy ve access level bunu açıkça desteklemelidir.
- Approval bekleniyorsa user acknowledgement bunu belirtir.

### Safe denial

- Document’ın varlığı gereksiz ayrıntıyla doğrulanmaz.
- Başka company veya project adı gösterilmez.
- User support/request yoluna yönlendirilebilir.

---

## 36. Public User Flow UF-06 — Dealer Application

**Requirements:** DLR-001–003, FRM-007

~~~mermaid
flowchart TD
    A["Partner Programme"] --> B["Eligibility and Process"]
    B --> C["Dealer Application"]
    C --> D["Company and Coverage"]
    D --> E["Products and Commercial Profile"]
    E --> F["Attachment and Consent"]
    F --> G["Validate and Save"]
    G --> H["Acknowledgement"]
    H --> I["Admin Review"]
    I --> J{"Decision"}
    J -->|More info| K["Controlled Follow-up"]
    J -->|Approve| L["Separate Invitation and Access"]
    J -->|Reject| M["Recorded Outcome"]
~~~

Başvuru tamamlandığında otomatik login, dealer role veya private document access oluşmaz.

---

## 37. Public User Flow UF-07 — Market Switch

**Requirements:** MKT-001–005

~~~mermaid
flowchart TD
    A["Current Page and Market"] --> B["Select Target Market"]
    B --> C{"Published Equivalent?"}
    C -->|Yes| D["Target Domain Equivalent"]
    C -->|No| E["Nearest Published Parent"]
    D --> F["Target Locale Content"]
    E --> G["Explain Missing Equivalent"]
    F --> H["Correct Canonical and Hreflang"]
    G --> H
~~~

### Project List özel durumu

Market switch:

1. Mevcut product IDs’i target market availability ile kontrol eder.
2. Available item’ları koruyabilir.
3. Unavailable item’ları açıkça işaretler.
4. Sessizce başka product ile değiştirmez.
5. Submission öncesi kullanıcı çözüm seçer.

---

## 38. Public User Flow UF-08 — Search and Recovery

**Requirements:** PUB-003, ANA-003

1. User global search açar.
2. Query girer.
3. Sistem yalnız published target-market content’i arar.
4. Sonuçlar type’a göre gruplanır.
5. User result’a gider veya query’yi değiştirir.
6. No result ise suggested categories ve technical help CTA görünür.
7. Query personal-data risk kontrolünden sonra analytics’e girebilir.

Search sonucu private document file path veya internal data göstermez.

---

## 39. Authentication Information Architecture

### 39.1 Login entry points

- Public header Login
- Protected portal link
- Document access action
- Invitation email
- Admin direct route

### 39.2 Post-login routing

| User state | Destination |
|---|---|
| Internal role | /admin veya validated return-to |
| Approved partner/dealer | /portal veya validated return-to |
| Authenticated but no active access | Account/access pending state |
| Suspended/revoked | Safe access denied state |

### 39.3 Session states

- Active
- Expired
- Revoked
- Invitation pending
- Password reset required
- Access pending

Session expired olduğunda:

- Unsaved sensitive data local storage’a yazılmaz.
- Safe return-to korunabilir.
- User login sonrası permission check’ten tekrar geçer.

### 39.4 Open redirect prevention

Return-to:

- Sadece same-origin allowlisted path kabul eder.
- External URL kabul etmez.
- Admin user’ı portal route’una veya tersine permission dışı yönlendirmez.

---

## 40. Admin Navigation Architecture

### 40.1 Navigation grupları

**Work**

- Dashboard
- Inbox
- Tasks

**Relationships**

- Companies
- Contacts
- Dealer Applications
- Partners/Dealers

**Commercial**

- Quotes
- Opportunities
- Supplier Requests
- Orders

**Content**

- Products
- Categories
- Industries
- Application Maps
- Documents
- Assets
- Pages
- References

**Insights**

- Reports
- Exports
- Access/Download Logs

**Governance**

- Users
- Roles and Permissions
- Market Settings
- Email Templates
- Audit Log
- System Settings

Navigation permission-aware olur. Kullanıcının erişemediği module yalnız gizlenmekle kalmaz; route da server-side reddedilir.

### 40.2 Sales Operations MVP navigation

İlk admin release:

- Dashboard
- Inbox
- Quotes
- Dealer Applications
- Documents/Requests
- Basic Content access when needed
- Users limited to initial admin management

V1 navigation boş placeholder module göstermeden progressive açılır.

---

## 41. Admin Route Register

### 41.1 Work routes

| Route | Purpose | Release |
|---|---|---|
| /admin | Action dashboard | Sales Ops MVP |
| /admin/inbox | Unified enquiries | Sales Ops MVP |
| /admin/inbox/[enquiryId] | Enquiry detail | Sales Ops MVP |
| /admin/tasks | Tasks and follow-ups | V1 |

### 41.2 Relationship routes

| Route | Purpose | Release |
|---|---|---|
| /admin/companies | Company list | V1 |
| /admin/companies/[companyId] | Company workspace | V1 |
| /admin/contacts | Contact list | V1 |
| /admin/contacts/[contactId] | Contact detail | V1 |
| /admin/dealer-applications | Application queue | Sales Ops MVP |
| /admin/dealer-applications/[applicationId] | Application review | Sales Ops MVP |
| /admin/partners | Approved partner/dealer list | V1 |

### 41.3 Commercial routes

| Route | Purpose | Release |
|---|---|---|
| /admin/quotes | Quote list | Sales Ops MVP |
| /admin/quotes/[quoteId] | Quote workspace | Sales Ops MVP |
| /admin/opportunities | Opportunity list | V1 |
| /admin/opportunities/[opportunityId] | Opportunity workspace | V1 |
| /admin/supplier-requests | Supplier request list | V1 |
| /admin/supplier-requests/[requestId] | Supplier request workspace | V1 |
| /admin/orders | Order list | V1 |
| /admin/orders/[orderId] | Order workspace | V1 |

### 41.4 Content routes

| Route | Purpose | Release |
|---|---|---|
| /admin/catalogue/products | Products | Foundation/V1 |
| /admin/catalogue/products/[productId] | Product editor | Foundation/V1 |
| /admin/catalogue/categories | Categories | Foundation/V1 |
| /admin/content/industries | Industries | V1 |
| /admin/content/application-maps | Map list | Foundation/V1 |
| /admin/content/application-maps/[mapId] | Map editor | Foundation/V1 |
| /admin/documents | Document list | Sales Ops MVP/V1 |
| /admin/documents/[documentId] | Document detail/version/access | V1 |
| /admin/assets | Asset review | V1 |
| /admin/content/pages | Page content | V1 |
| /admin/content/references | References | V1 |

### 41.5 Governance routes

| Route | Purpose | Release |
|---|---|---|
| /admin/users | Internal users | Sales Ops MVP limited |
| /admin/roles | Roles/permissions | V1 |
| /admin/settings/markets | Market/domain settings | Foundation/V1 |
| /admin/settings/email-templates | Localised templates | Ukraine release/V1 |
| /admin/audit | Critical audit events | V1 |
| /admin/reports | Business reports | V1 |

---

## 42. Admin Dashboard IA

Dashboard bilgi sırası:

1. Market and owner filters
2. Overdue follow-ups
3. New unassigned enquiries
4. Quotes requiring action
5. Dealer applications requiring review
6. Supplier requests waiting
7. Open opportunities
8. Recent document requests
9. Basic activity indicators

Dashboard vanity chart ağırlıklı olmamalıdır. Primary action, kayıt üzerinde çalışmaya gitmektir.

### 42.1 Card interaction

- Count permission-filtered olur.
- Card click filtered list açar.
- Filter context URL’de korunur.
- Zero state pozitif başarı gibi değil, açıklayıcı state olarak gösterilir.

---

## 43. Admin List IA

Ortak list structure:

1. Page title
2. Primary create action when permitted
3. Search
4. Filters
5. Saved views, P2
6. Result count
7. Table/list
8. Pagination
9. Bulk actions only when safe

### 43.1 Default filters

Relevant modules:

- Status
- Owner
- Market
- Date range
- Priority/type
- Overdue

### 43.2 Table rules

- Row click detail açabilir; iç action’lar keyboard erişilebilir olur.
- Critical status yalnız renkle ifade edilmez.
- Pagination bounded olur.
- Empty state create/import gibi izinli next step sunar.
- Bulk destructive action MVP’de kullanılmaz.

---

## 44. Admin Record Workspace IA

Record detail ortak modeli:

1. Identity header
2. Status
3. Owner
4. Next action and due date
5. Primary actions
6. Summary
7. Related entities
8. Activity timeline
9. Notes
10. Attachments/documents
11. Audit-sensitive history

### 44.1 Suggested tabs

| Record | Tabs |
|---|---|
| Company | Overview, Contacts, Quotes, Projects, Orders, Documents, Activity |
| Quote | Overview, Items, Technical, Supplier Requests, Revisions, Activity |
| Opportunity | Overview, Products, Stakeholders, Technical, Activity |
| Dealer Application | Application, Review, Files, Communication, History |
| Document | Metadata, Versions, Access, Relations, Logs |
| Product | Overview, Technical Data, Media, Documents, Industries, Markets, History |

Tab kullanılmayan küçük kayıtlarda tek sayfa section yapısı tercih edilir.

---

## 45. Admin User Flow AF-01 — New Enquiry Triage

**Requirements:** ADM-002, ADM-004, ADM-005

~~~mermaid
flowchart TD
    A["New Submission"] --> B["Inbox"]
    B --> C["Open Enquiry"]
    C --> D["Check Market and Context"]
    D --> E["Assign Owner and Priority"]
    E --> F["Set Status and Next Action"]
    F --> G{"Commercial path"}
    G -->|Quote| H["Create or Link Quote"]
    G -->|Project| I["Create Opportunity"]
    G -->|Technical| J["Assign Technical Review"]
    G -->|Not qualified| K["Close with Reason"]
~~~

### Required visible data

- Submission type
- Market/locale/source domain
- Company/contact
- Product/industry/document context
- Submitted date
- Spam/risk signal
- Owner/status
- Next action/follow-up

---

## 46. Admin User Flow AF-02 — Quote Management

**Requirements:** QTE-001–004, SUP-001

~~~mermaid
flowchart TD
    A["Quote Request"] --> B["Qualify"]
    B --> C{"Technical or Supplier Input?"}
    C -->|Yes| D["Create Supplier Request"]
    C -->|No| E["Prepare Quote"]
    D --> E
    E --> F["Review"]
    F --> G["Record Sent"]
    G --> H{"Outcome"}
    H -->|Revision| E
    H -->|Won| I["Opportunity or Order"]
    H -->|Lost| J["Close with Reason"]
~~~

Status transition exact rules 07_BACKEND_API_AND_WORKFLOWS.md içinde kesinleşir.

---

## 47. Admin User Flow AF-03 — Dealer Review and Invitation

**Requirements:** DLR-002–003, PRT-001

1. Dealer Manager new application queue’yu açar.
2. Company duplicate ve data completeness kontrol edilir.
3. Status under_review olur.
4. Gerekirse additional_information_required seçilir.
5. Commercial decision kaydedilir.
6. Approved partner/dealer status verilirse company record doğrulanır.
7. Authorised user ayrı invitation action başlatır.
8. Role, company scope ve market açıkça seçilir.
9. Invitation kabul edilince portal access oluşur.
10. Critical actions audit edilir.

Approval ve invitation aynı butonda kontrolsüz birleşmemelidir.

---

## 48. Admin User Flow AF-04 — Document Publish and Access

**Requirements:** RES-002–005, CNT-001, SEC-004

~~~mermaid
flowchart TD
    A["Upload Private File"] --> B["Add Metadata and Relations"]
    B --> C["Set Market and Access Level"]
    C --> D["Technical Review"]
    D --> E{"Approved?"}
    E -->|No| F["Draft or Changes Required"]
    E -->|Yes| G["Publish Metadata"]
    G --> H["Eligible Request or Portal Access"]
    H --> I["Authorisation Check"]
    I --> J["Signed Access and Log"]
~~~

File upload tamamlanması publish anlamına gelmez.

---

## 49. Partner Portal Navigation

Baseline navigation:

- Dashboard
- My Quotes
- My Projects
- My Orders
- Technical Documents
- Support Requests
- My Company
- Account Settings

Role’a göre module görünürlüğü değişebilir. Dealer ve approved partner için ayrı codebase/navigation oluşturulmaz; permission-aware ortak portal kullanılır.

### 49.1 Portal naming baseline

Canonical protected prefix önerisi:

~~~text
/portal
~~~

Master belgedeki /partner ve /dealer hedefleri discovery örneğidir. Tek /portal prefix’i duplication ve yanlış role branching’i azaltır. Kesin teknik route 05_TECHNICAL_ARCHITECTURE.md içinde onaylanır.

---

## 50. Partner Portal Route Register

| Route | Purpose | Access |
|---|---|---|
| /portal | Partner dashboard | Approved user |
| /portal/company | My Company | Company-scoped |
| /portal/quotes | My Quotes | Company-scoped |
| /portal/quotes/[quoteId] | Quote detail | Company-scoped |
| /portal/projects | My Projects | Company/project-scoped |
| /portal/projects/[projectId] | Project detail | Explicit scope |
| /portal/orders | My Orders | Company-scoped |
| /portal/orders/[orderId] | Order detail | Company-scoped |
| /portal/documents | Technical Documents | Role/company/project policy |
| /portal/support | Support Requests | Approved user |
| /portal/account | Account Settings | Current user |

Portal routes authorised ve noindex’dir.

---

## 51. Portal Dashboard IA

Bilgi sırası:

1. Company and user context
2. Actions requiring attention
3. Open quote summaries
4. Active projects
5. Order status summaries
6. Newly available authorised documents
7. Support CTA

Portal dashboard internal sales priority, margin, supplier note veya private operational status göstermez.

---

## 52. Partner User Flow PF-01 — Secure Document Access

**Requirements:** PRT-001, PRT-004, RES-004

1. User portalda login olur.
2. System active user, company ve role scope doğrular.
3. Documents list yalnız eligible metadata gösterir.
4. User document seçer.
5. Server access policy’yi yeniden değerlendirir.
6. Project-specific ise explicit project relation doğrulanır.
7. Time-limited URL üretilir.
8. Access event kaydedilir.
9. Revoked/expired durumda güvenli error ve support path gösterilir.

---

## 53. Partner User Flow PF-02 — View Commercial Status

1. User My Quotes, My Projects veya My Orders açar.
2. Company scope list query’de uygulanır.
3. User customer-visible status ve approved summary’yi görür.
4. Detail’de authorised documents ve support action görünebilir.
5. Internal note, margin, competitor veya supplier-private data response’a dahil edilmez.

---

## 54. Cross-Surface Entity Linking

| Source | Target | Link davranışı |
|---|---|---|
| Public product | Quote form | Product context taşır |
| Public product | Resource | Metadata page’e gider |
| Industry | Product | Source industry korunabilir |
| Application Map | Product | Selected zone context taşır |
| Project List | Admin quote | Submission sonrası structured relation |
| Enquiry | Company/contact | Admin qualification sırasında link/create |
| Quote | Opportunity | Controlled conversion |
| Quote/project | Supplier request | Internal relation |
| Quote | Order | Won outcome sonrası controlled conversion |
| Dealer application | Company | Review sırasında match/create |
| Company | Portal user | Approved invitation sonrası |
| Document | Portal | Access policy üzerinden |

Entity conversion duplicate record üretmemek için explicit confirmation gerektirir.

---

## 55. Loading, Empty, Error ve Success States

### 55.1 Ortak state matrisi

| State | Public | Admin | Portal |
|---|---|---|---|
| Loading | Skeleton veya progress, false content yok | Table/record skeleton | Scoped skeleton |
| Empty | Discovery veya CTA | Actionable setup/filter guidance | Support or no activity |
| Validation error | Field + summary | Inline business rule | Safe editable fields |
| Not found | Nearest public parent | Internal not found | Scope-safe not found |
| Unauthorised | Login/request path | Access denied | Access denied/support |
| Server error | Retry/contact, data preserved | Retry + incident reference | Retry + support |
| Success | Reference and next step | Updated state/history | Customer-visible confirmation |

### 55.2 Not found güvenliği

Protected route’ta 404 ve 403 ayrımı başka company record varlığını açığa çıkaracak biçimde kullanılmamalıdır.

### 55.3 Stale content

Product, document veya project state user sayfadayken değişirse:

- Submission öncesi revalidation yapılır.
- User’a neyin değiştiği açıklanır.
- Sessizce farklı item veya version seçilmez.

---

## 56. Responsive Flow Kuralları

- Ana görev mobile’da desktop’a göre daha az yetenekli olmaz.
- Multi-step form progress açıkça gösterilir.
- Sticky action viewport’un kritik içeriğini kapatmaz.
- Wide technical table için alternative stacked view bulunur.
- Application Map mobile’da zone/system list ile tamamlanır.
- Admin table mobile’da yalnız yatay scroll’a bırakılmaz; priority fields card/detail pattern ile erişilebilir olur.
- Portal mobile’da primary actions thumb-reachable olabilir; kesin pattern UI/UX dokümanında belirlenir.

---

## 57. Accessibility Flow Kuralları

- Skip link public, admin ve portal layout’larında bulunur.
- Heading hierarchy page structure’ı doğru yansıtır.
- Breadcrumb semantic navigation olarak işaretlenir.
- Mega-menu ve accordion keyboard pattern’i documented olur.
- Modal kullanılırsa focus trap, escape ve focus return doğru çalışır.
- Form error summary invalid field’lara link verir.
- Step form screen reader’a current step bilgisini verir.
- Status yalnız colour ile anlatılmaz.
- Map hotspot’larının accessible name ve keyboard target’ı olur.
- Alternative map list aynı bilgi ve CTA’ları sunar.
- Session timeout user’a form kaybı öncesi uygun uyarı verir.

---

## 58. SEO Information Architecture

### 58.1 Indexable page families

- Homepage
- Product index/category/detail
- Industry index/detail
- Content-rich Application Map
- Technical Resource index ve uygun metadata pages
- Certifications
- Approved references
- About
- Market Coverage
- Project Support
- Partner programme
- Contact
- Legal pages

### 58.2 Noindex families

- Search results
- Project List
- Form-only request pages where duplicate intent oluşur
- Confirmation states
- Login/reset/invitation
- Admin
- Portal
- Preview/draft
- Private file endpoints

Exact comparator index kararı content quality ve duplicate riskine göre 10_CONTENT_SEO_AND_ANALYTICS.md içinde kapatılır.

### 58.3 Internal linking

- Product detail related industry ve resources’a bağlanır.
- Industry ilgili product systems’e bağlanır.
- Resource related product’a geri bağlanır.
- Reference ilgili industry/product’a bağlanabilir.
- Conversion page link graph’in kör ucu olmaz; success sonrası safe next step sunar.

### 58.4 Pagination ve filters

- Filter combinations kontrolsüz indexable URL üretmez.
- Canonical policy filter intent’e göre belirlenir.
- Pagination crawl strategy SEO dokümanında kesinleşir.

---

## 59. Analytics Touchpoint Map

| Screen/action | Event |
|---|---|
| Product detail view | product_viewed |
| First compare item | comparison_started |
| Add to Project List | product_added_to_project_list |
| Quote save success | quote_request_submitted |
| Document request save success | technical_document_requested |
| Signed resource access | document_accessed |
| Project support save success | project_support_submitted |
| Dealer application save success | dealer_application_submitted |
| Map product selected | application_map_product_selected |
| Search no result | search_no_results |

Event route transition başlamasında değil, tanımlanmış başarılı state’te gönderilir. Personal data event property olmaz.

---

## 60. Content Model Implications

IA aşağıdaki dilden bağımsız identity’leri gerektirir:

- Route key
- Page/content ID
- Product ID
- Category ID
- Industry ID
- Application Map ID
- Zone ID
- Resource/document ID
- Reference ID

Localized/market fields:

- Slug
- Navigation label
- Page title
- Summary/body
- SEO metadata
- CTA label
- Publish state
- Market availability

Route identity’yi slug string’e bağlamak market switch ve redirect yönetimini zorlaştırır; identity ayrı tutulmalıdır.

---

## 61. Redirect ve Legacy URL İlkeleri

- Approved slug değişikliği permanent redirect üretir.
- Redirect target aynı market/domain’de olmalıdır.
- Cross-domain redirect market switch ile karıştırılmaz.
- Redirect chain birden fazla hop oluşturmamalıdır.
- Deleted product en yakın category’ye otomatik gönderilmeden önce replacement ilişkisi değerlendirilir.
- Gerçek replacement varsa ilgili product’a redirect yapılabilir.
- Private route redirect’i permission check’i atlayamaz.

---

## 62. Navigation Governance

Navigation’a yeni top-level item eklemek için:

- Açık user need
- Published destination
- Market/locale label
- Mobile behaviour
- Permission/index rule
- Owner
- Analytics need
- Founder veya Product Owner approval

gereklidir.

Top-level navigation kampanya veya geçici içerik deposu olarak kullanılmaz.

---

## 63. Release IA Scope

### 63.1 Foundation

- Shared layouts
- Route registry
- Market/domain resolution
- Content identity and locale mapping
- Navigation skeleton
- Draft/publish route guards
- Admin and portal protected namespaces

### 63.2 Public Website MVP

- Core public navigation
- Homepage
- Products index/category/priority detail
- Industries index/detail
- One pilot Application Map
- Resource metadata index/detail
- Certifications
- References/capability
- About, coverage, contact
- Project support
- Basic quote
- Legal
- UK production routes
- Ukraine switch/readiness

### 63.3 Sales Operations MVP

- Comparator
- Project List
- Technical enquiry/pack request
- Dealer application
- Login
- Admin dashboard/inbox/quotes/applications
- Controlled document request

### 63.4 Ukraine Market Release

- Reviewed uk-UA route labels/slugs
- Target-domain equivalence mapping
- Ukrainian navigation/footer
- Market-specific forms and legal routes
- Hreflang/canonical/sitemap pairing
- Market coverage replacement
- Localised Application Map UI

### 63.5 V1

- Search
- Full admin relationship/commercial/content IA
- Partner portal
- Additional maps
- Resource types and document versions
- Reports/tasks

---

## 64. IA Validation Scenarios

### 64.1 Tree testing

Participants ürün adı bilmeden:

- Busbar solution bulabilmeli
- Airport facility solution bulabilmeli
- Technical datasheet request yolunu bulabilmeli
- Dealer application bulabilmeli
- Project support bulabilmeli

### 64.2 First-click testing

Homepage’den:

- Explore Products
- Build a Project List
- Request Technical Documents
- Discuss a Project

görevlerinin ilk click doğruluğu ölçülür.

### 64.3 Dual-market validation

- UK product page’den Ukraine equivalent’a geçiş
- Equivalent olmayan page fallback
- UK Project List item’larının Ukraine availability durumu
- Ukraine form confirmation ve admin attribution
- Ukraine canonical/hreflang

### 64.4 Permission validation

- Anonymous private document attempt
- Approved partner document
- Dealer-only document
- Wrong-company quote ID
- Project-specific document without relation
- Revoked user

---

## 65. IA Acceptance Criteria

Bu belge onaylanmadan önce:

- Public, admin ve portal sınırları açık olmalıdır.
- Primary navigation altı ana item’i geçmemelidir; değişiklik gerekçeli olmalıdır.
- Her public page family için route key ve template tanımlanmalıdır.
- UK ve Ukraine domain equivalence davranışı tanımlanmalıdır.
- Locale prefix kullanılmaması kararı onaylanmalıdır.
- Product, industry, map, resources ve conversion linkleri çift yönlü düşünülmelidir.
- Project List ve quote flow context kaybetmemelidir.
- Controlled document flow access level’e göre ayrılmalıdır.
- Dealer approval ile invitation ayrı olmalıdır.
- Admin navigation MVP/V1 ayrımına uymalıdır.
- Portal company scope kullanıcı akışında görünür olmalıdır.
- Loading, empty, error, unauthorised ve success states tanımlanmalıdır.
- Mobile ve accessible alternatives bulunmalıdır.
- Index/noindex sınıfları belirlenmelidir.

---

## 66. Açık IA Kararları

| ID | Karar | Öneri | Gerekli aşama |
|---|---|---|---|
| IA-001 | Pilot Application Map industry | Asset nedeniyle Airport/Transport değerlendir; Founder onayı | Before map wireframe |
| IA-002 | Ukraine kesin public slugs | Ukrainian SEO/language review sonrası localised slugs | Before Ukraine route build |
| IA-003 | Comparator index/noindex | Başlangıç noindex, değerli landing content varsa yeniden değerlendir | Before SEO launch |
| IA-004 | Search release | V1 baseline | Before public MVP scope lock |
| IA-005 | Quote form step sayısı | 3–4 step usability test | Before high-fidelity UX |
| IA-006 | Project List maximum items | Product/UX test ile belirle | Before component spec |
| IA-007 | Portal canonical prefix | /portal önerilir | Before technical architecture approval |
| IA-008 | Accessibility statement release | Launch’a dahil etmeyi değerlendir | Before legal/content gate |
| IA-009 | Market switch user notice copy | Non-equivalent fallback için localised copy | Before Ukraine UX |
| IA-010 | Market-specific coverage page naming | Route key shared, content/title market-specific | Before Ukraine IA approval |

---

## 67. Bağlı Dokümanlara Aktarılacak Kararlar

### 03_UI_UX_ARCHITECTURE.md

- Layout regions
- Responsive navigation pattern
- Page template wireframes
- Form step behaviour
- Comparator mobile pattern
- Application Map interaction pattern
- Loading/error/success visual hierarchy

### 04_DESIGN_SYSTEM.md

- Navigation components
- Breadcrumb
- Cards
- Tables
- Forms
- Status components
- Modal/drawer rules
- Focus and motion tokens

### 05_TECHNICAL_ARCHITECTURE.md

- Domain resolution
- Route registry implementation
- Middleware/host handling
- Auth namespaces
- Return-to validation
- Caching and draft protection

### 06_DATABASE_AND_DATA_MODEL.md

- Stable content identities
- Localised slugs
- Market publish states
- Entity relations
- Flow status fields

### 07_BACKEND_API_AND_WORKFLOWS.md

- Submission lifecycle
- State transitions
- Signed access
- Quote conversion
- Dealer approval/invitation

### 10_CONTENT_SEO_AND_ANALYTICS.md

- Ukrainian slug dictionary
- Navigation labels
- Canonical/hreflang
- Index/noindex
- Event properties
- Search taxonomy

---

## 68. Definition of Ready — Page or Flow

Bir page/flow tasarıma girmeden:

- Route key ve surface belli
- User goal açık
- Entry points listelenmiş
- Exit/next actions belli
- Market/locale davranışı tanımlı
- Auth/permission sınıfı belli
- Required content/data listesi hazır
- Empty/loading/error/success state yazılı
- Mobile ve accessibility ihtiyacı belirtilmiş
- Parent PRD requirement ID’leri bağlı
- Open IA blocker kapanmış

olmalıdır.

---

## 69. Definition of Done — IA Implementation

- Route doğru domain/market altında çalışıyor
- Navigation doğru permission/publish durumunu uyguluyor
- Canonical destination tek
- Breadcrumb doğru
- Context high-intent CTA’ya taşınıyor
- Refresh/back/forward davranışı ana görevi bozmuyor
- Mobile akış tamamlanabiliyor
- Keyboard akış tamamlanabiliyor
- Empty/loading/error/success state uygulanmış
- Unpublished/private content sızmıyor
- Analytics success state’e bağlı
- SEO index rule doğrulanmış
- E2E senaryo riske uygun test edilmiş

---

## 70. Onay Kaydı

~~~text
Founder / Product Owner approval: Pending
Approved by:
Approval date:
Approved version:
Notes:
~~~

---

## 71. Sürüm Geçmişi

| Sürüm | Durum | Değişiklik |
|---|---|---|
| 0.1.0 | Current Draft | Public, admin ve portal IA; dual-domain route modeli; kritik user flows oluşturuldu |

---

## 72. Son Karar

InfraVolt bilgi mimarisi üç ayrı ama bağlantılı yüzey üzerine kurulacaktır: public B2B website, internal admin ve approved partner portal. Public deneyim product-first ve industry-first keşfi birlikte destekleyecek; bütün yüksek niyetli CTA’lar seçilmiş bağlamı quote, project support veya document request akışına taşıyacaktır.

UK ve Ukraine ayrı domainlerde, public locale prefix olmadan çalışacaktır. Stable route key ve content identity, market-specific slug ve publish state ile eşleştirilecektir. Ukraine site İngilizce sayfaya yönlenen bir kopya olmayacak; gerçek uk-UA navigation, content, legal, form ve SEO yapısı sunacaktır.

Bir sonraki belge 03_UI_UX_ARCHITECTURE.md olacaktır. O belge bu IA içindeki route ve flow’ları responsive page layout, wireframe ve interaction architecture’a dönüştürecektir.
