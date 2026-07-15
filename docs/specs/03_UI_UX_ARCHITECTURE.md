# InfraVolt — UI/UX Architecture

> Document ID: INF-03  
> Version: 0.1.0  
> Status: Draft for Founder Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Delivery Owner: Product Director / CTO / Head Agent  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0  
> Required markets: United Kingdom + Ukraine  
> Required locales: en-GB + uk-UA  
> Design direction: Light, technical, credible, premium B2B  
> Accessibility target: WCAG 2.2 AA  
> Last updated: 15 July 2026  
> Document language: Turkish; screen, state, component-role and interaction identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt platformunun UI/UX mimarisini tanımlar. Onaylanmış bilgi mimarisi ve kullanıcı akışlarını responsive ekran düzenlerine, interaction pattern’lerine, form davranışlarına ve yüzeyler arası deneyim kurallarına dönüştürür.

Belge aşağıdaki sorulara cevap verir:

- Public website, admin ve partner portalı nasıl görünür ve davranır?
- Ekranlar hangi ortak layout sistemini kullanır?
- Desktop, tablet ve mobile’da içerik önceliği nasıl değişir?
- Homepage, product detail, comparator, Project List ve Application Map nasıl düzenlenir?
- Formlar, validation, loading, empty, error ve success durumları nasıl çalışır?
- Admin listeleri ve record workspace’leri nasıl kullanılır?
- Portal neden admin panelinin kopyası olmayacaktır?
- UK ve Ukrainian içerik uzunlukları tasarımda nasıl desteklenir?
- Mevcut asset paketi production UI’a nasıl bağlanır?
- Hangi kararlar 04_DESIGN_SYSTEM.md belgesine bırakılır?

Bu belge final renk kodları, typography token’ları, component API’leri veya Figma component library değildir. Bunlar 04_DESIGN_SYSTEM.md ve 08_FRONTEND_COMPONENT_SPEC.md içinde tanımlanacaktır.

---

## 2. Belge Hiyerarşisi

UI/UX kararları şu sıraya bağlıdır:

1. Founder tarafından onaylanmış product kararı
2. 00_MASTER_PROJECT_SPEC.md
3. 01_PRODUCT_REQUIREMENTS.md
4. 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md
5. Bu belge
6. 04_DESIGN_SYSTEM.md
7. Screen-specific design ve implementation task’i

Bir görsel çözüm kullanıcı akışını, permission politikasını veya market davranışını sessizce değiştiremez.

---

## 3. Kapsam

### 3.1 Bu belgede tanımlananlar

- Experience principles
- Visual direction
- Responsive layout modes
- Public, admin ve portal application shells
- Navigation interaction
- Page template anatomy
- Screen inventory
- CTA hierarchy
- Forms ve validation UX
- Comparator ve Project List interaction
- Application Map interaction architecture
- Data table ve record workspace pattern’leri
- State ve feedback sistemi
- Accessibility architecture
- Localization resilience
- Asset kullanım kuralları
- Prototype ve usability test planı
- Design handoff ve acceptance criteria

### 3.2 Bu belgede tanımlanmayanlar

- Final logo tasarımı
- Kesin colour hex değerleri
- Kesin font family seçimi
- Bütün spacing token değerleri
- Database veya API modeli
- Auth implementation
- Final production copy
- Product technical data
- Final Ukrainian translations
- Final Application Map clean imagery

---

## 4. UX Başarı Tanımı

UI/UX başarılı sayılırsa kullanıcı:

1. InfraVolt’un ne sunduğunu ilk ziyaretin başında anlayabilir.
2. Ürün kodu bilmese bile category veya industry üzerinden ilerleyebilir.
3. Product detail’de teknik bilgiyi pazarlama metninden ayırabilir.
4. Compare ve Project List kavramlarını e-commerce sanmadan kullanabilir.
5. Bir talebin hangi ürün/proje bağlamıyla gönderildiğini görebilir.
6. Form hatasında verisini gereksiz yere kaybetmez.
7. Private document erişim koşulunu anlayabilir.
8. Mobile ve keyboard ile ana görevleri tamamlayabilir.
9. UK veya Ukraine market’inde yanlış dil/iletişim bilgisine düşmez.
10. Admin’de bir kaydın owner, status ve next action’ını hızlıca görür.

---

## 5. Tasarım İlkeleri

| İlke | UI/UX kararı |
|---|---|
| Clear before clever | Görsel numara yerine anlaşılır hierarchy |
| Technical but human | Teknik veri okunur; arayüz mühendislik yazılımı kadar soğuk değildir |
| Trust through evidence | Claim yerine source, scope ve approved content |
| One primary action | Her ekran bölgesinde tek baskın primary CTA |
| Context always visible | Seçilmiş ürün, sektör, belge veya proje formda görünür |
| Progressive disclosure | Ayrıntı gerektiğinde açılır; ana karar bilgisi saklanmaz |
| Accessible by default | Alternatif deneyim sonradan eklenen eklenti değildir |
| Responsive by intent | Mobile, desktop’ın küçültülmüş görüntüsü değildir |
| Operational calm | Admin acil durum panosu gibi kırmızıya boğulmaz |
| Localisation resilient | Sabit metin genişliğine bağlı layout kurulmaz |
| Honest states | Sistem bekliyor, başarısız veya onay bekliyor durumunu açık söyler |

---

## 6. Görsel Yön

### 6.1 Seçilen tasarım karakteri

Tasarım yönünün çalışma adı:

**Technical Clarity**

Karakter:

- Professional
- Technical
- Credible
- Premium
- Clear
- Buyer-friendly
- Modern UK corporate B2B
- Ukraine market’ine uyarlanabilir

### 6.2 Ana görünüm

- White ve very light grey temel yüzeyler
- Navy navigation, başlık ve güven vurgusu
- InfraVolt red kontrollü CTA ve active state vurgusu
- Deep navy footer veya sınırlı trust section
- İnce grid, line ve technical-drawing hissi
- Büyük ama gerçek/approved product imagery
- Ferah content spacing
- Okunabilir technical tables

### 6.3 Kaçınılacak görünüm

- Crypto veya gaming estetiği
- Sayfanın çoğunu kaplayan black/dark mode
- Generic AI startup gradient’leri
- Excessive glassmorphism
- Sürekli glowing border
- Gereksiz 3D/WebGL
- Parallax-heavy landing page
- Her section’da animasyon
- Dashboard benzeri homepage
- Teknik kanıt yerine logo duvarı

### 6.4 Yüzeylere göre ton

| Surface | Görsel ton |
|---|---|
| Public website | Editorial, premium, spacious, technical |
| Application Map | Visual, focused, interactive, high-context |
| Admin | Dense enough, calm, action-oriented |
| Partner portal | Professional, reassuring, less dense than admin |
| Authentication | Minimal, secure, distraction-free |

---

## 7. Experience Modes

InfraVolt tek bir sayfa şablonu kullanmaz. Dört experience mode vardır:

### 7.1 Discovery mode

Kullanıldığı yer:

- Homepage
- Product index/category
- Industry index/detail
- References

Özellikleri:

- Visual hierarchy güçlü
- Cards ve editorial sections
- Exploration ve internal linking
- CTA az ve seçilmiş

### 7.2 Technical evaluation mode

Kullanıldığı yer:

- Product detail
- Comparator
- Technical Resources
- Certifications

Özellikleri:

- Structured data
- Table/list readability
- Source ve access context
- Sticky veya repeated decision actions

### 7.3 Task completion mode

Kullanıldığı yer:

- Project List
- Quote form
- Project support
- Document request
- Dealer application

Özellikleri:

- Distraction azaltılmış
- Step/progress açık
- Context summary görünür
- Validation ve recovery güçlü

### 7.4 Operations mode

Kullanıldığı yer:

- Admin
- Portal

Özellikleri:

- High information utility
- Filters, status ve next actions
- Consistent workspaces
- Permission-aware actions

---

## 8. Responsive Layout Modes

Kesin breakpoint token’ları 04_DESIGN_SYSTEM.md içinde onaylanacaktır. UI/UX mimarisi dört semantic layout mode kullanır:

| Mode | Provisional range | Ana davranış |
|---|---:|---|
| Compact | 320–767 px | Single column, touch-first, list-first |
| Medium | 768–1023 px | 8-column, selective split layout |
| Wide | 1024–1439 px | 12-column, desktop navigation |
| Expanded | 1440 px+ | Wide canvas, constrained reading widths |

### 8.1 Compact

- Primary content tek kolon
- Mobile header
- Full-width form controls
- Bottom veya inline task actions
- Map için list-first alternative
- Tables priority-field cards’a dönüşebilir
- Sidebars drawer veya accordion olur

### 8.2 Medium

- Two-column content seçici kullanılır
- Tablet landscape’de bazı desktop patterns açılabilir
- Mega-menu yerine compact panel tercih edilebilir
- Application Map side panel overlay olabilir

### 8.3 Wide

- Desktop header ve mega-menu
- 12-column grid
- Product media + information split
- Admin persistent sidebar
- Application Map left menu + canvas + right panel

### 8.4 Expanded

- İçerik sınırsız genişlemez
- Reading column korunur
- Map ve admin table alanı kontrollü genişleyebilir
- Hero media büyürken line length sabit kalır

---

## 9. Grid ve Container Mimarisi

### 9.1 Provisional grid

| Mode | Columns | Outer gutter yönü |
|---|---:|---|
| Compact | 4 | Compact |
| Medium | 8 | Comfortable |
| Wide | 12 | Generous |
| Expanded | 12 | Centred maximum container |

Kesin gutter ve gap değerleri design token olacaktır.

### 9.2 Container türleri

| Container | Kullanım |
|---|---|
| Reading | Legal, long copy, article-like explanation |
| Standard | Homepage, product/category, forms |
| Wide | Comparator, Application Map, admin tables |
| Full-bleed visual | Approved hero/map image; content yine grid’e hizalanır |

### 9.3 Line length

- Uzun prose tek satırda aşırı genişlemez.
- Technical tables reading container’a zorlanmaz; wide container kullanabilir.
- Headline ve body copy farklı max-width değerleri kullanabilir.
- Ukrainian text expansion hard-coded line break ile çözülmez.

---

## 10. Vertical Rhythm

Sayfalar üç section density kullanır:

| Density | Kullanım |
|---|---|
| Spacious | Homepage hero, brand/trust, major landing sections |
| Standard | Product/industry detail, resources |
| Compact | Admin tables, metadata, record workspaces |

Bir sayfa içinde rastgele spacing kullanılmaz. Section başlangıcı, iç content gap’i ve component gap’i ayrı semantic seviyelerdir.

---

## 11. Public Application Shell

Public shell:

~~~mermaid
flowchart TD
    A["Skip Link"] --> B["Utility Bar"]
    B --> C["Primary Header and Navigation"]
    C --> D["Breadcrumb when applicable"]
    D --> E["Page Main Content"]
    E --> F["Contextual Conversion Section"]
    F --> G["Global Footer"]
    C -.-> H["Project List Indicator"]
    C -.-> I["Market Switcher"]
~~~

### 11.1 Shell kuralları

- Main landmark her page’de bir tanedir.
- Skip link focus olduğunda görünür.
- Header height değişimi layout shift yaratmaz.
- Cookie/consent banner primary CTA’yı kapatmaz.
- Preview/draft badge yalnız authorised preview ortamında görünür.
- Public shell admin veya portal sidebar’ını taşımaz.

---

## 12. Utility Bar

### 12.1 İçerik

- Market/language switcher
- Market-specific contact shortcut
- Login
- Optional project support shortcut

### 12.2 Davranış

- Wide ve Expanded mode’da primary header üstünde yer alır.
- Scroll sırasında utility bar kaybolabilir; primary header sticky kalabilir.
- Compact mode’da utility content mobile menu içine taşınabilir.
- Contact text Ukraine market’te UK bilgisine fallback yapmaz.
- Market switcher flag-only control olmaz; text label içerir.

---

## 13. Primary Header

### 13.1 Wide düzen

- Sol: InfraVolt logo
- Orta: Primary navigation
- Sağ: Project List, Request a Quote

Login utility bar’da kalabilir.

### 13.2 Compact düzen

- Sol: Logo
- Sağ: Project List icon/count ve menu trigger
- Request a Quote mobile menu veya context CTA içinde

### 13.3 Sticky davranış

Önerilen baseline:

- Header scroll sonrası compact height ile sticky olur.
- Scroll direction’a göre sürekli saklanıp çıkmaz; navigation stability korunur.
- Sticky header focus target’ı örtmez.
- Anchor link offset header yüksekliğini dikkate alır.

### 13.4 Active state

- Current section text ve subtle indicator ile belirtilir.
- Colour tek başına active state değildir.
- Product detail’de Products parent active olabilir.

---

## 14. Mega-Menu Architecture

### 14.1 Açılma

- Pointer click ve keyboard activation ile açılır.
- Hover tek açılma yöntemi değildir.
- Hover kullanılacaksa intentional delay ve safe close corridor değerlendirilir.

### 14.2 İçerik düzeni

Products mega-menu:

- Category list
- Featured/priority system area
- Compare ve Project List task links

Industries mega-menu:

- Industry list
- Featured map preview
- Discuss a Project

Resources mega-menu:

- Resource type links
- Certifications
- Technical Pack CTA

### 14.3 Keyboard

- Trigger button semantics kullanır.
- Escape menu’yü kapatır.
- Focus logical order izler.
- Menu kapanınca focus trigger’a döner.
- Tab key standard page flow’undan kopmaz.

### 14.4 Content limits

- Mega-menu mini homepage değildir.
- Aynı anda çok sayıda promotional card gösterilmez.
- Unpublished veya boş category görünmez.

---

## 15. Mobile Navigation

### 15.1 Pattern

Full-height modal navigation veya edge drawer kullanılabilir. Final seçim prototype testinde yapılır.

### 15.2 Hiyerarşi

1. Primary sections
2. Expandable child links
3. Project List
4. Request a Quote
5. Market switcher
6. Contact
7. Login

### 15.3 Behaviour

- Opening moves focus to navigation heading/first action.
- Background inert olur.
- Escape ve close button çalışır.
- Back pattern nested menu’de açıkça görünür.
- Current section belirtilir.
- Scroll position menu kapanınca korunur.

---

## 16. Footer Architecture

### 16.1 Layout

- Wide: 4–5 link columns + company/contact block
- Medium: 2–3 columns
- Compact: accordion veya stacked groups

### 16.2 Visual role

Footer deep navy kullanılabilecek ana koyu yüzeydir.

- Contrast AA hedefini karşılar.
- Red accent büyük metin alanlarında aşırı kullanılmaz.
- Legal/company information en alt utility row’da olabilir.

### 16.3 Content integrity

- Market-specific address/contact
- Approved legal name
- Verified relationship wording
- No placeholder social icon
- No empty newsletter form in MVP

---

## 17. Page Header Pattern

### 17.1 Standard page header

- Breadcrumb
- Eyebrow or category label
- H1
- Short description
- Optional primary action
- Optional approved image

### 17.2 Compact page header

Admin, portal, form ve search için:

- H1
- Context/status
- Primary action
- Optional filters

### 17.3 Hero ile fark

Her page header hero değildir. Legal, search, admin ve form sayfaları gereksiz büyük görsel alan kullanmaz.

---

## 18. Screen Inventory

### 18.1 Public screens

| Screen ID | Screen | Route family | Release |
|---|---|---|---|
| PUB-UI-001 | Homepage | home | Public MVP |
| PUB-UI-002 | Product Index | products.index | Public MVP |
| PUB-UI-003 | Product Category | products.category | Public MVP |
| PUB-UI-004 | Product Detail | products.detail | Public MVP |
| PUB-UI-005 | Comparator | products.compare | Sales Ops MVP |
| PUB-UI-006 | Project List | project-list | Sales Ops MVP |
| PUB-UI-007 | Industry Index | industries.index | Public MVP |
| PUB-UI-008 | Industry Detail | industries.detail | Public MVP |
| PUB-UI-009 | Application Map | industries.map | Public MVP pilot |
| PUB-UI-010 | Resource Index | resources.index | Public MVP |
| PUB-UI-011 | Resource Detail | resources.detail | Public MVP |
| PUB-UI-012 | Certifications | certifications | Public MVP |
| PUB-UI-013 | References | references.index/detail | Public MVP/V1 |
| PUB-UI-014 | Project Support | project-support | Public MVP |
| PUB-UI-015 | Quote Request | request-quote | Public MVP |
| PUB-UI-016 | Technical Enquiry | technical-enquiry | Sales Ops MVP |
| PUB-UI-017 | Technical Pack Request | technical-pack-request | Sales Ops MVP |
| PUB-UI-018 | Partner Programme | partner | Public MVP |
| PUB-UI-019 | Dealer Application | dealer-application | Sales Ops MVP |
| PUB-UI-020 | Contact | contact | Public MVP |
| PUB-UI-021 | Search Results | search | V1 |
| PUB-UI-022 | Corporate/Legal | about/legal | Public MVP |

### 18.2 Authentication screens

| Screen ID | Screen |
|---|---|
| AUTH-UI-001 | Login |
| AUTH-UI-002 | Forgot Password |
| AUTH-UI-003 | Reset Password |
| AUTH-UI-004 | Accept Invitation |
| AUTH-UI-005 | Access Pending |
| AUTH-UI-006 | Unauthorised |
| AUTH-UI-007 | Session Expired |

### 18.3 Admin screens

| Screen ID | Screen | Release |
|---|---|---|
| ADM-UI-001 | Dashboard | Sales Ops MVP |
| ADM-UI-002 | Inbox List | Sales Ops MVP |
| ADM-UI-003 | Enquiry Detail | Sales Ops MVP |
| ADM-UI-004 | Quotes List | Sales Ops MVP |
| ADM-UI-005 | Quote Workspace | Sales Ops MVP |
| ADM-UI-006 | Dealer Applications List | Sales Ops MVP |
| ADM-UI-007 | Dealer Review Workspace | Sales Ops MVP |
| ADM-UI-008 | Companies List/Workspace | V1 |
| ADM-UI-009 | Contacts List/Detail | V1 |
| ADM-UI-010 | Opportunities List/Workspace | V1 |
| ADM-UI-011 | Supplier Requests | V1 |
| ADM-UI-012 | Orders | V1 |
| ADM-UI-013 | Documents | Sales Ops MVP/V1 |
| ADM-UI-014 | Product Editor | Foundation/V1 |
| ADM-UI-015 | Industry/Map Editor | Foundation/V1 |
| ADM-UI-016 | Tasks | V1 |
| ADM-UI-017 | Reports | V1 |
| ADM-UI-018 | Users/Roles/Settings | Sales Ops MVP/V1 |

### 18.4 Portal screens

| Screen ID | Screen |
|---|---|
| PRT-UI-001 | Portal Dashboard |
| PRT-UI-002 | My Company |
| PRT-UI-003 | My Quotes |
| PRT-UI-004 | Quote Detail |
| PRT-UI-005 | My Projects |
| PRT-UI-006 | Project Detail |
| PRT-UI-007 | My Orders |
| PRT-UI-008 | Order Detail |
| PRT-UI-009 | Technical Documents |
| PRT-UI-010 | Support Request |
| PRT-UI-011 | Account Settings |

---

## 19. Homepage Layout Architecture

### 19.1 Wide composition

~~~mermaid
flowchart TD
    A["Hero: Copy 7 columns + Media 5 columns"] --> B["Credibility Strip"]
    B --> C["Core Product Systems Grid"]
    C --> D["Industries and Application Visual"]
    D --> E["Technical Support Split Section"]
    E --> F["Resources and Certifications"]
    F --> G["Approved References and Coverage"]
    G --> H["How We Work"]
    H --> I["Partner Invitation"]
    I --> J["Final Conversion CTA"]
~~~

### 19.2 Hero

Wide:

- Copy column yaklaşık 7/12
- Visual column yaklaşık 5/12
- Primary CTA ve tek secondary CTA
- Credibility statement yalnız verified content ile

Compact:

- H1 ve proposition önce
- CTA’lar sonra
- Visual content sonrasında
- Hero height viewport’a zorla eşitlenmez

### 19.3 Core products

- Wide: 4-card row veya 3-card balanced grid
- Medium: 2 columns
- Compact: 1 column
- Bütün category’ler homepage’e zorla konmaz
- View all products secondary action

### 19.4 Industries

- Image-led cards
- Card title ve one-line context
- Map available indicator yalnız gerçek map varsa
- Hover image effect essential information taşımaz

### 19.5 Trust sections

- Approved certification icon/text
- Capability evidence
- Process steps
- No unsupported number counters
- No fake customer logos

---

## 20. Product Index Layout

### 20.1 Wide

- Standard page header
- Optional quick category jump
- Category grid
- Selection help split section
- Project List explainer

### 20.2 Category card

- Approved representative image/icon
- Category name
- Short use context
- Product/series count only reliable ise
- View category action

Card’ın tamamı link olabilir; nested compare/add actions category card’da kullanılmaz.

### 20.3 Compact

- Single column image+text cards
- Decorative visual daha küçük
- CTA text açık
- Horizontal carousel category navigation için baseline değildir

---

## 21. Product Category Layout

### 21.1 Wide structure

- Breadcrumb/header
- Optional category intro
- Filter sidebar veya horizontal filter bar
- Results header: count, sort, active filters
- Product grid
- Related resources/industries

### 21.2 Filter behaviour

Wide:

- Category filter sayısı yüksekse left sidebar
- Azsa horizontal filter bar

Compact:

- Filter button bottom sheet/drawer açar
- Active filter count görünür
- Apply ve Clear actions ayrı
- Drawer kapatıldığında result position yönetilir

### 21.3 Result grid

| Mode | Baseline |
|---|---|
| Compact | 1 column |
| Medium | 2 columns |
| Wide | 3 columns |
| Expanded | 3 veya 4 columns content density’ye göre |

---

## 22. Product Card Architecture

Bilgi hierarchy:

1. Product image
2. Series/category eyebrow
3. Product name
4. Short descriptor
5. En fazla 2–3 verified differentiator
6. View details
7. Compare
8. Add to Project List

### 22.1 Action hierarchy

- View details primary navigation action
- Add to Project List task action
- Compare secondary toggle/action

Üç eşit kırmızı button kullanılmaz.

### 22.2 Selected states

- In comparison
- In Project List
- Unavailable in current market
- Draft state yalnız admin preview’da

Selected state colour + icon + text ile ifade edilir.

---

## 23. Product Detail Layout

### 23.1 Wide above-the-fold

~~~mermaid
flowchart LR
    A["Media Gallery 6 columns"] --> B["Product Summary 6 columns"]
    B --> C["Verified Facts"]
    B --> D["Add to Project List"]
    B --> E["Request a Quote"]
    A --> F["Thumbnail or Media Controls"]
~~~

### 23.2 Product summary

- Category/series context
- H1
- Short value proposition
- Market availability message if required
- Key facts
- Primary Request a Quote
- Secondary Add to Project List
- Tertiary Compare

Project List product selection state button label’ında görünür.

### 23.3 Long content navigation

Baseline:

- In-page anchor navigation
- Overview
- Applications
- Specifications
- Standards and Resources
- Related Solutions

Critical technical content tab içine gizlenmez. Anchor bar sticky olabilir; focus/offset test edilir.

### 23.4 Technical specifications

- Grouped attribute sections
- Label/value/unit columns
- Mobile stacked rows
- Missing values hidden veya explicit Available on request
- Source/review information public copy ile uyumlu
- Zebra striping aşırı değil

### 23.5 Media gallery

- Approved primary image
- Optional detail images/diagram
- Zoom only if source resolution supports
- Thumbnail keyboard controls
- No auto-rotating carousel
- Alt text media purpose’a göre

### 23.6 Mobile action treatment

Öneri:

- Inline primary actions product summary’de
- Scroll sonrası compact bottom action bar değerlendirilebilir
- Bottom bar en fazla primary + Project List shortcut içerir
- Cookie banner ve browser UI ile çakışma test edilir

---

## 24. Comparator Layout

### 24.1 Wide

- Sticky product identity row
- Attribute groups
- First column attribute labels
- 2–4 product columns
- Remove/replace controls
- Add selected items to Project List

### 24.2 Compact

Baseline alternatif:

- User iki ürünü aktif pair olarak seçer
- Attribute groups stacked gösterilir
- Change product controls top’ta
- Differences readable blocks halinde

Sınırsız horizontal table mobile baseline değildir.

### 24.3 Sticky regions

- Product names scroll sırasında görünür kalabilir
- Sticky region viewport’un büyük kısmını kaplamaz
- Screen reader table semantics bozulmaz
- Keyboard focus sticky layer altında kalmaz

### 24.4 Empty state

0 item:

- Comparison purpose
- Browse products CTA

1 item:

- Selected product
- Compatible product suggestions
- Add another product guidance

---

## 25. Project List Layout

### 25.1 Wide task shell

~~~mermaid
flowchart LR
    A["Main Task Area 8 columns"] --> B["Context Summary 4 columns"]
    A --> C["Step Progress"]
    A --> D["Product Items or Form Fields"]
    B --> E["Selected Products"]
    B --> F["Privacy and Help"]
~~~

### 25.2 Steps

1. Products
2. Project Details
3. Company and Contact
4. Review
5. Confirmation

### 25.3 Product item editor

- Product identity
- Variant/rating
- Quantity
- Unit
- Item note
- Remove action
- Availability warning

Destructive remove action undo toast veya confirmation riskine göre ele alınır. Tek item remove ve çok veri kaybı varsa confirmation gerekir.

### 25.4 Context summary

Wide’da sağ sidebar:

- Item count
- Product names
- Current project name
- Edit shortcut

Compact’ta collapsible summary veya top summary olur.

### 25.5 Step navigation

- Back link/button
- Continue primary
- Save/restore yalnız approved persistence scope’unda
- Enter key yanlışlıkla incomplete form submit etmez
- Current step text ve semantic olarak belirtilir

---

## 26. Industry Index ve Detail Layout

### 26.1 Industry index

- Editorial header
- Industry cards grid
- Featured map section
- Cross-industry support CTA

### 26.2 Industry detail

Wide composition:

- Hero split
- Challenges/content column
- Applicable systems grid
- Full-width Application Map preview
- Related resources/references
- Project Support CTA

### 26.3 Industry system cards

Product card’ın kopyası olmak zorunda değildir:

- System/category name
- Why relevant
- Typical zone/application
- Explore system
- Add specific item only product identity netse

---

## 27. Application Map Experience

### 27.1 Tasarım amacı

Kullanıcının bir facility içinde ürün sistemlerini keşfetmesini sağlamak. Map bir görsel şov değil, product discovery interface’idir.

### 27.2 Wide layout

~~~mermaid
flowchart LR
    A["Product and Zone Menu"] --> B["Visual Canvas with HTML Hotspots"]
    B --> C["Selected Product Panel"]
    A --> D["Reset and Filter"]
    B --> E["Fullscreen"]
    C --> F["Product, Documents and Quote Actions"]
~~~

Provisional widths:

- Left menu: compact fixed range
- Canvas: flexible majority
- Right panel: readable fixed range

Exact dimensions 04_DESIGN_SYSTEM.md ve prototype testinde belirlenir.

### 27.3 Default state

- Map title
- One-sentence instruction
- Overview image
- All zones/products menu
- No random hotspot preselected unless editorial reason

### 27.4 Hotspots

- Visual marker küçük olabilir; interactive hit area touch target standardını karşılar.
- Number/icon ve accessible name bulunur.
- Hover preview optional; click/focus primary interaction’dır.
- Selected marker zoom/colour/icon ile açıkça ayrılır.
- Marker focus ring map background üzerinde görünür.
- Hotspot technical mapping data’dan gelir.

### 27.5 Product panel

- Product/system name
- Short application explanation
- Relevant zone
- Approved thumbnail/icon
- View Product
- Add to Project List when valid
- Request Technical Pack
- Discuss This Project

Panel içinde gereksiz uzun technical table gösterilmez.

### 27.6 Zone carousel

- Carousel zorunlu değildir; zone list daha anlaşılırsa list tercih edilir.
- Auto-play kullanılmaz.
- Previous/next labelled controls olur.
- Current position text ile açıklanır.

### 27.7 Fullscreen

- User action ile açılır.
- Escape ile kapanır.
- Focus doğru taşınır ve geri döner.
- Selected state korunur.
- Browser fullscreen API başarısızsa in-page expanded mode fallback olur.

### 27.8 Compact/mobile

Mobile baseline:

1. Industry/map intro
2. Zone selector
3. Focused image
4. Selected systems list
5. Product cards
6. Project CTA

Hotspot canvas optional enhancement’tır. Aynı görev liste üzerinden tamamlanabilir.

### 27.9 Ukrainian localization

- Menu/panel/CTA text React/HTML olur.
- Embedded English UI taşıyan image canvas olarak kullanılmaz.
- Ukrainian label wrapping panel yüksekliğini bozmaz.
- Product technical copy locale review state’ine bağlıdır.

---

## 28. Technical Resources Layout

### 28.1 Index

- Search/filter
- Resource type cards
- Featured/priority resources
- Access explanation
- Technical Pack CTA

### 28.2 Resource row/card

- Document type icon
- Title
- Related product/category
- Language
- Version/date
- File format/size
- Access badge
- View/request action

### 28.3 Resource detail

Wide:

- Main metadata 8 columns
- Access action panel 4 columns

Compact:

- Metadata first
- Access requirement explanation
- Full-width action

Lock icon tek başına access açıklaması değildir.

### 28.4 Access panel states

- Request required
- Login required
- Approval pending
- Approved access
- Expired/revoked
- Not externally available

Her state farklı CTA ve explanatory copy kullanır.

---

## 29. Certifications ve Compliance Layout

- Certification groups content hierarchy ile ayrılır.
- Certificate logo grid tek başına kullanılmaz.
- Scope, related product ve issue/version bilgisi görünürdür.
- General explanation ile product-specific evidence ayrı section’dır.
- Disclaimer küçük ve okunamaz footer text’ine gömülmez.
- Download/request action access policy’ye göre görünür.

---

## 30. References ve Corporate Pages

### 30.1 References

- Image-led but evidence-based
- Industry/project type filters
- Scope wording
- Related systems
- Approved result/capability

### 30.2 About

- InfraVolt proposition
- Operating model
- Technical/project support
- Market presence
- Approved manufacturer relationship wording
- Contact CTA

### 30.3 Market Coverage

- UK ve Ukraine içerikleri market-specific
- Map kullanılırsa gerçek coverage claim’i onaylı olmalı
- Contact ownership açık
- Delivery/capability iddiası evidence gerektirir

### 30.4 Legal

- Reading container
- Sticky table of contents yalnız uzun içerikte
- Last updated
- Accessible heading hierarchy
- Print-friendly

---

## 31. Form Page Shell

### 31.1 Wide

- Sol veya sağ contextual summary
- Ana form column
- Clear page title ve expectation
- Human response expectation

### 31.2 Compact

- Title
- Context summary
- Step progress
- Fields
- Privacy
- Primary action

### 31.3 Dedicated route

Modal quick form kullanılabilir; fakat:

- Complex flow dedicated route’a sahip olur.
- Deep link ve refresh çalışır.
- Keyboard/mobile completion modal’a bağımlı değildir.
- Modal içinde full dealer application yapılmaz.

---

## 32. Form Interaction Architecture

### 32.1 Label ve help

- Persistent visible label
- Placeholder label yerine kullanılmaz
- Required/optional net
- Help text field öncesi/sonrası tutarlı
- Technical example yanlış default value gibi görünmez

### 32.2 Field width

- Email/phone/address ve long input full veya meaningful width
- Short quantity/postcode gibi alanlar gereksiz full width olabilir; responsive grouping yapılır
- Fixed width Ukrainian label’a uygulanmaz

### 32.3 Validation

Validation sırası:

1. Client affordance
2. On blur uygun format check
3. Submit’te complete client check
4. Server validation
5. Error summary + field errors

Validation typing sırasında kullanıcıyı sürekli cezalandırmaz.

### 32.4 Error summary

- Form heading sonrası
- Error sayısı ve kısa guidance
- Invalid field anchor links
- Focus submit sonrası summary’ye
- Field error programmatically associated

### 32.5 Attachment

- Allowed type/size önceden gösterilir.
- Upload progress
- File name ve size
- Remove/replace
- Error formun geri kalanını silmez.
- Uploaded file private olduğu anlaşılır.

### 32.6 Consent

- Operational privacy acknowledgement
- Optional marketing consent ayrı
- Checkbox label link-only olmaz
- Legal link yeni context’te erişilebilir

---

## 33. Multi-Step Form Pattern

~~~mermaid
stateDiagram-v2
    [*] --> Context
    Context --> Details: Continue
    Details --> Contact: Continue
    Contact --> Review: Continue
    Review --> Success: Valid save
    Review --> Contact: Edit contact
    Review --> Details: Edit request
    Success --> [*]
~~~

### 33.1 Progress

- Step names
- Current step
- Completed state
- Future steps
- Screen reader current-step announcement

### 33.2 Back behaviour

- Browser back ve form back çelişmemeli
- Non-sensitive form state korunabilir
- Sensitive values URL’ye yazılmaz
- Attachment state açıkça yönetilir

### 33.3 Review screen

- Readable summary
- Edit section links
- Consent final state
- Submit label action’ı açık söyler
- No hidden commercial agreement

---

## 34. Quote ve Project Support Form UX

### 34.1 Quote

Context priority:

1. Selected product(s)
2. Quantity/specification
3. Project
4. Company/contact
5. Timing

### 34.2 Project support

Product zorunlu değildir:

- Industry
- Project type
- Stage
- Location
- Target timing
- Support need

### 34.3 Technical enquiry

- Product context
- Question category
- Question
- Supporting file
- Contact
- No instant compliance promise

### 34.4 Confirmation

- Reference
- Summary
- Next step
- Human response expectation
- Return to product/project list

---

## 35. Dealer Application UX

### 35.1 Entry

Partner Programme page şu bilgileri başvurudan önce açıklar:

- Kimler için
- Değerlendirme süreci
- İstenen bilgi
- Approval’ın otomatik olmadığı
- Private access’in ayrı davet gerektirdiği

### 35.2 Form sections

1. Company
2. Contact
3. Location and coverage
4. Business activity
5. Customer profile
6. Product interests
7. Commercial intention/potential
8. Supporting file
9. Consent
10. Review

### 35.3 Success

- Application reference
- Review acknowledgement
- No approval implication
- Additional information contact expectation
- No automatic login link

---

## 36. Search Experience

### 36.1 Entry

Search icon/text in header optional V1. Icon-only ise accessible name zorunlu.

### 36.2 Search page

- Large search input
- Query and result count
- Content type filters
- Result groups
- No-result guidance

### 36.3 Search result

- Type label
- Title
- Short snippet
- Breadcrumb/context
- Access requirement for resource metadata

Private file content veya admin data snippet olmaz.

---

## 37. Authentication UX

### 37.1 Auth shell

- Minimal logo
- Market-aware language
- Single card/reading column
- Support contact
- No public mega-menu distraction

### 37.2 Login

- Email
- Password
- Show/hide password
- Forgot password
- Submit
- Invitation/access guidance

### 37.3 Error copy

- Account existence gereksiz şekilde doğrulanmaz.
- Generic credential error anlaşılır ama güvenli olur.
- Rate limit user’ı ne zaman tekrar deneyebileceği konusunda yönlendirir.

### 37.4 Access pending/unauthorised

- Login success ile permission success ayrılır.
- User current company/access state’i güvenli şekilde görür.
- Support path sunulur.

---

## 38. CTA Hierarchy

### 38.1 Levels

| Level | Kullanım |
|---|---|
| Primary | Ekranın ana görevi |
| Secondary | Güçlü alternatif |
| Tertiary | Low-emphasis action |
| Link | Navigation veya context |
| Destructive | Remove/revoke/archive |

### 38.2 Kurallar

- Aynı viewport region’da birden fazla primary CTA kullanılmaz.
- InfraVolt red primary CTA için kontrollü kullanılır.
- Navigation link button gibi görünmez.
- Destructive action red olsa bile primary commercial CTA ile karışmaz.
- Disabled button nedenini tek başına tooltip ile anlatmaz.
- Loading button label/layout zıplamaz.

---

## 39. Cards ve Click Targets

- Card bütünü link ise nested interactive controls dikkatle ayrılır.
- Decorative card hover transform küçük ve reduced-motion uyumlu olur.
- Card height sırf grid eşitliği için aşırı boşluk üretmez.
- Technical metadata card body içinde okunabilir.
- Action target minimum touch alanını karşılar.
- Image olmayan content boş grey box göstermek zorunda değildir.

---

## 40. Tabs, Accordions ve Disclosure

### 40.1 Tabs

Tabs yalnız:

- Aynı context içindeki peer views
- Admin record workspace
- Portal record sections

için kullanılır.

Critical SEO/product content yalnız tab içine gömülmez.

### 40.2 Accordions

Uygun:

- Mobile footer
- FAQ
- Secondary technical details
- Mobile filters

Uygun değil:

- Ana product value proposition
- Form required fields
- Error summary

### 40.3 Tooltips

- Essential content taşımaz.
- Keyboard/focus ile açılır.
- Short clarification için kullanılır.
- Mobile’da hover’a bağlı kalmaz.

---

## 41. Modal, Drawer ve Popover Kuralları

### 41.1 Modal

Uygun:

- Confirmation
- Small focused decision
- Media zoom

Uygun değil:

- Uzun dealer application
- Multi-step Project List quote
- Büyük technical document

### 41.2 Drawer

Uygun:

- Mobile filter
- Comparison selection tray
- Quick record preview
- Application Map product panel Medium mode

### 41.3 Popover

Uygun:

- Compact selection
- Context help
- Date/filter control

Popover içinde critical unsaved workflow yapılmaz.

---

## 42. Feedback ve Notification Pattern’leri

### 42.1 Inline

Form errors, access state ve stale-content warning inline olmalıdır.

### 42.2 Banner

Kullanım:

- Market/content notice
- System degradation
- Access pending
- Draft preview

### 42.3 Toast

Uygun:

- Product added to Project List
- Non-critical save confirmation
- Copied link

Toast:

- Tek error kanalı değildir.
- Auto-dismiss süresi okunabilir olur.
- Pause/close erişimi değerlendirilir.

### 42.4 Status badge

- Text label içerir.
- Colour semantic token’a bağlıdır.
- Internal ve customer-visible status aynı wording olmak zorunda değildir.

---

## 43. Loading Architecture

### 43.1 Page loading

- Layout skeleton
- Heading ve action yerleri stabil
- Infinite shimmer kullanılmaz
- Slow load’da meaningful progress text

### 43.2 Action loading

- Trigger disabled
- Progress state
- Duplicate submit engeli
- Completion sonrası focus/announcement

### 43.3 Map loading

- Lightweight preview/placeholder
- Canvas lazy-load
- Progress
- Alternative list content map image’den bağımsız erişilebilir

### 43.4 Admin list loading

- Table header stabil
- Skeleton row count sınırlı
- Previous data gösteriliyorsa stale/loading state açık

---

## 44. Empty State Architecture

### 44.1 Public empty

- No results reason
- Clear filters
- Browse parent category
- Ask for help

### 44.2 Admin empty

- İlk kullanım mı, filtre sonucu mu ayrılır.
- Yetkili create/import action
- No misleading celebration

### 44.3 Portal empty

- Company’de kayıt yok açıklaması
- Support/request CTA
- Başka company data’sı hakkında ipucu yok

---

## 45. Error ve Recovery Architecture

### 45.1 Recoverable error

- Ne oldu?
- User ne yapabilir?
- Veri korundu mu?
- Retry güvenli mi?
- Support reference var mı?

### 45.2 Not found

- Public: parent discovery
- Admin/portal: scope-safe message
- Private entity existence sızdırılmaz

### 45.3 Stale data

- Refresh/revalidate
- Changed fields summary when possible
- User choice
- Silent overwrite yok

### 45.4 Offline/unstable network

MVP offline app değildir. Ancak:

- Submit belirsizliği duplicate record üretmemeli
- User retry öncesi status almalı
- Product List local data policy’ye göre korunabilir

---

## 46. Success Architecture

Success state:

- Açık success heading
- Reference
- Submitted summary
- Next action
- Human response expectation
- Confirmation email durumu hakkında dürüst copy
- Relevant return/browse action

Confetti veya aşırı celebration B2B teknik bağlama uygun değildir.

---

## 47. Imagery Architecture

### 47.1 Image roles

| Role | Kullanım |
|---|---|
| Product evidence | Gerçek/approved product image |
| Application context | Industry/facility visual |
| Technical diagram | Açıklayıcı verified diagram |
| Editorial support | Corporate/project image |
| Decorative texture | Low-emphasis grid/line background |

### 47.2 Rules

- Görsel technical evidence değilse öyle sunulmaz.
- AI-generated imagery gerçek installed reference gibi etiketlenmez.
- Product image object-fit ile kesilerek önemli detail kaybedilmez.
- Focal point content data ile desteklenebilir.
- Text image içine gömülmez.
- Image aspect ratio layout shift’i önleyecek şekilde ayrılır.

### 47.3 Suggested aspect families

- Product card: near-square veya 4:3
- Industry card: 4:3 veya 3:2
- Hero: landscape
- Reference: editorial landscape
- Map: source-specific wide canvas

Kesin ratio tokens design system’de belirlenir.

---

## 48. Application Map Asset Entegrasyonu

Canonical package:

**infravolt-application-map-assets-v1.zip**

### 48.1 Path kuralları

- asset-manifest.json source of truth
- public/assets/industries industry imagery
- public/assets/icons/products product icons
- public/assets/icons/actions action/document icons
- public/assets/reference/ui-mockups production asset değildir
- Legacy ChatGPT Image filenames kullanılmaz

### 48.2 Review lifecycle

~~~text
review-required
→ technical-review
→ brand-review
→ localization-ready
→ approved-for-production
~~~

### 48.3 UI-composite yasağı

Görselin içine gömülü:

- Left menu
- Right panel
- Hotspot number
- CTA
- English title/copy
- Logo

varsa aynı öğeler React UI olarak tekrar render edilmez. Clean base image yoksa asset blocker oluşturulur.

### 48.4 Missing assets

UI placeholder olarak yanlış product icon çizmez. Takip edilecek eksikler:

- Cable ladder icon
- Underfloor trunking icon
- Industrial lighting icon
- Surge protection icon
- Rail map imagery
- Series-specific thumbnails
- Final approved EV image

---

## 49. Localization-Resilient UI

### 49.1 Text expansion

- Ukrainian label/copy için minimum yaklaşık yüzde 30–40 expansion toleransı
- Fixed-height text card kullanılmaz
- Button min-width yerine content-driven width
- Navigation label truncate edilmez; alternative layout açılır
- Heading manual line break locale-specific content değilse kullanılmaz

### 49.2 Font support

Seçilecek font:

- Latin
- Cyrillic/Ukrainian characters
- Apostrophe ve diacritics
- Technical symbols
- Numerals

için aynı kaliteyi sağlamalıdır.

### 49.3 Dates, numbers ve units

- Locale formatting
- Technical unit value’den ayrılır
- Decimal separator context’e göre
- Public fiyat yok
- Phone/address market-specific

### 49.4 Market switch

- Text label + market
- Flag tek identifier değil
- Equivalent olmayan page notice
- Project List availability review

---

## 50. Accessibility Architecture

### 50.1 Standard

Hedef WCAG 2.2 AA’dır.

### 50.2 Landmarks

- Header
- Navigation
- Main
- Complementary where meaningful
- Footer
- Search

### 50.3 Keyboard

- Logical focus order
- Visible focus
- Skip link
- No keyboard trap
- Escape closes overlay
- Focus return
- Sticky UI focus’u örtmez

### 50.4 Touch target

Interactive targets minimum accessible target yaklaşımına uyar. Hotspot visual dot küçük olsa bile hit area yeterli olur.

### 50.5 Colour and contrast

- Text contrast AA
- Large text standardı dikkatle uygulanır
- Red/green status colour-only değildir
- Disabled state aşırı düşük contrast ile görünmez olmaz

### 50.6 Zoom and reflow

- 200% zoom’da task tamamlanır
- 400% reflow senaryoları test edilir
- Horizontal scroll yalnız gerçek wide data/map context’inde kontrollü

### 50.7 Screen reader

- Icon accessible name
- Decorative image hidden
- Form relation
- Live region yalnız gerekli state
- Table caption/header association
- Current step/page/state

### 50.8 Reduced motion

- Transform/scroll animation azaltılır
- Auto animation baseline değildir
- Content bir anda kaybolmaz

---

## 51. Motion Architecture

### 51.1 Kullanım amaçları

- State change
- Spatial relationship
- Focus/selection
- Drawer/modal transition
- Add-to-list feedback

### 51.2 Kaçınılacak motion

- Parallax
- Scroll-jacking
- Continuous floating
- Auto carousel
- Decorative number count-up
- Heavy route transition

### 51.3 Timing yönü

Micro-interaction kısa ve restrained olur. Kesin duration/easing token’ları 04_DESIGN_SYSTEM.md içinde tanımlanır.

---

## 52. Public Content Density

### 52.1 Marketing copy

- Short paragraphs
- Clear headings
- Bullets only when scan value
- Claims close to evidence

### 52.2 Technical content

- Structured groups
- Label/value
- Units
- Source/scope explanation
- Download/access context

### 52.3 CTA copy

Specific:

- Request a Quote
- Add to Project List
- Request Technical Documents
- Discuss a Project

Generic Learn More yalnız destination netse kullanılır.

---

## 53. Admin Application Shell

~~~mermaid
flowchart LR
    A["Persistent Sidebar"] --> B["Top Bar"]
    B --> C["Page Header and Actions"]
    C --> D["Filters or Record Controls"]
    D --> E["Main Workspace"]
    E --> F["Activity or Context Panel"]
    B -.-> G["Market, Search, User Menu"]
~~~

### 53.1 Wide

- Persistent sidebar
- Top bar
- Main content
- Optional context/right panel

### 53.2 Medium

- Collapsible sidebar
- Full-width workspace
- Context panel drawer

### 53.3 Compact

- Top navigation/menu drawer
- Priority fields
- Card/list alternative
- Complex editor desktop recommendation gösterebilir; view/task tamamen bloklanmaz

### 53.4 Admin visual tone

- Public site ile same brand system
- Daha compact spacing
- Neutral surfaces
- Red yalnız critical/action
- Status variety semantic colours ile

---

## 54. Admin Sidebar

Navigation groups:

- Work
- Relationships
- Commercial
- Content
- Insights
- Governance

### 54.1 Rules

- Permission-aware
- Current route active
- Group collapse state optional
- Icons destekleyici, label zorunlu
- Module count yalnız action value varsa
- Empty future modules görünmez

### 54.2 Collapse

Icon-only collapsed sidebar tooltip ve accessible label gerektirir. MVP’de collapse zorunlu değildir.

---

## 55. Admin Top Bar

- Global/allowed search, V1
- Market filter/context
- Notifications/reminders, V1
- User menu
- Environment badge non-production

Market filter global uygulandığında visible scope açık olmalıdır; kayıt edit formunun market değerini sessizce değiştirmez.

---

## 56. Admin Dashboard Layout

### 56.1 Priority

1. Overdue follow-ups
2. Unassigned enquiries
3. Quotes requiring action
4. Dealer applications
5. Supplier delays
6. Open opportunities
7. Document requests
8. Activity metrics

### 56.2 Layout

- Action cards first
- Work queues
- Limited charts
- Market/owner filters
- Recent activity

### 56.3 Dashboard card

- Label
- Count
- Urgency/status
- Short explanation
- View filtered list

Chart her count için kullanılmaz.

---

## 57. Admin List Pattern

### 57.1 Header

- Title
- Count
- Primary create action if permitted
- Export secondary if permitted

### 57.2 Filters

- Search
- Status
- Owner
- Market
- Date
- Overdue/type

Active filters chips veya summary ile görünür.

### 57.3 Table

- Checkbox only bulk action varsa
- Primary identity column sticky olabilir
- Status
- Owner
- Market
- Next action
- Updated/due date
- Row action menu

### 57.4 Row click

Whole row clickable olabilir fakat:

- Text selection bozulmaz
- Nested buttons ayrı
- Keyboard row action erişilebilir
- New-tab standard link davranışı korunur

### 57.5 Compact

- Record cards
- Primary identity
- Status/market
- Owner/next action
- Open detail

---

## 58. Admin Record Workspace

### 58.1 Header

- Record title/reference
- Status
- Market
- Owner
- Next action/due
- Primary contextual action
- More menu

### 58.2 Body

- Summary
- Entity-specific content
- Related records
- Activity
- Notes
- Attachments

### 58.3 Tabs

Tabs yalnız içerik gerçekten peer view ise. Mobile’da horizontal scroll yerine select/accordion değerlendirilebilir.

### 58.4 Right context rail

Wide’da:

- Owner
- Status
- Priority
- Next action
- Key relations

Quick edit desteklenebilir. Critical state change explicit confirmation gerektirir.

---

## 59. Admin Quote Workspace

### 59.1 Sections

- Quote summary
- Company/contact/project
- Quote items
- Technical clarification
- Supplier requests
- Revisions
- Communication
- Activity

### 59.2 Primary actions by state

| State direction | Primary action example |
|---|---|
| New | Qualify |
| Technical review | Assign/Complete review |
| Supplier input | Create/View supplier request |
| Preparing | Mark ready for review |
| Sent | Record outcome or revision |
| Won | Create opportunity/order |
| Lost | Close with reason |

Final labels workflow spec’te doğrulanır.

### 59.3 Item table

- Product snapshot
- Quantity/unit
- Variant/spec
- Note
- Technical status

Historical product text current catalogue değiştiğinde sessizce değişmez.

---

## 60. Admin Dealer Review Workspace

- Application summary
- Company duplicate warning
- Coverage and product interests
- Commercial profile
- Attachments
- Review checklist
- Internal notes
- Communication
- Status history

Primary actions:

- Request more information
- Mark priority candidate
- Approve as partner
- Approve as dealer
- Reject
- Archive

Approval sonrası ayrı Invite User action görünür. Approval ve invitation tek adım değildir.

---

## 61. Admin Content Editor UX

### 61.1 Shared pattern

- Record identity
- Market/locale tabs or switch
- Draft/review/publish status
- Content fields
- Relations
- Preview
- Validation
- History

### 61.2 Locale editing

- en-GB ve uk-UA side-by-side yalnız ekran genişliği ve task uygunsa
- Default stacked/locale tabs
- Translation missing state
- Source changed warning
- UK publish Ukraine publish’i tetiklemez

### 61.3 Technical fields

- Source reference
- Review status
- Reviewer
- Last reviewed
- Publish blocker

### 61.4 Asset selector

- Canonical thumbnail
- Asset label/path
- Dimensions
- Publish review status
- Technical/brand/localization status

Legacy filename search result olarak gösterilmemelidir.

---

## 62. Portal Application Shell

Portal admin’in kırpılmış kopyası değildir.

### 62.1 Wide

- Compact brand header
- Side navigation veya horizontal account navigation
- Company context
- Main content
- Support access

### 62.2 Compact

- Header + menu
- Company context
- Task cards/list
- Customer-visible status

### 62.3 Tone

- Public site kadar premium
- Admin kadar dense değil
- Reassuring access/status language
- Internal operational jargon yok

---

## 63. Portal Dashboard

1. Welcome + company
2. Items requiring attention
3. Open quote summaries
4. Active projects
5. Order summaries
6. New authorised documents
7. Support CTA

Her card customer-visible data kullanır.

---

## 64. Portal Record Views

### 64.1 Quote

- Reference
- Submitted/sent date
- Customer-visible status
- Item summary
- Validity if applicable
- Approved documents
- Support action

### 64.2 Project

- Project name
- Customer-visible stage
- Approved systems
- Milestones
- Documents
- Support

### 64.3 Order

- Reference
- Customer-visible status
- Item summary
- Dispatch/delivery information
- Documents

Internal note, margin, competitor, supplier-private status yoktur.

---

## 65. Portal Documents UX

- Filter by type/product/project
- Access badge
- Version/date
- File size/type
- Access action
- Expired/revoked state

Download action her click’te server permission check yapar. UI önceden alınmış permanent URL saklamaz.

---

## 66. Table Architecture

### 66.1 Public technical table

- Readability
- Grouped sections
- Mobile stack
- Unit clarity

### 66.2 Admin data table

- Sortable only meaningful columns
- Filter separate
- Pagination
- Row actions
- Sticky header for long list

### 66.3 Portal table

- Simpler customer language
- Fewer columns
- Mobile cards

### 66.4 Accessibility

- Caption
- Column headers
- Sort state
- No div-table unless semantics reproduced correctly
- Responsive transformation preserves relationships

---

## 67. Unsaved Changes ve Destructive Actions

### 67.1 Unsaved changes

- Navigation warning only real dirty state
- Auto-save kullanılacaksa state açık
- Draft save success visible
- Browser close warning controlled

### 67.2 Destructive

Risk levels:

- Low: remove temporary filter
- Medium: remove Project List item with undo
- High: revoke access, archive published content, delete attachment

High risk:

- Clear confirmation
- Consequence
- Target identity
- Permission
- Audit

---

## 68. UX Writing Architecture

### 68.1 Voice

- Clear
- Professional
- Direct
- Helpful
- Technically careful

### 68.2 Avoid

- Empty marketing superlatives
- Unsupported best/leading/exclusive
- Blame language
- Vague error
- Approval promise
- Machine-translated technical copy

### 68.3 Button labels

Verb + object:

- View Product
- Add to Project List
- Request Technical Pack
- Submit Dealer Application
- Save Next Action

### 68.4 Error copy

Format:

- Problem
- Correction
- Data status

### 68.5 Status copy

Internal status ile customer wording ayrıdır. Database enum doğrudan user-facing label olmaz.

---

## 69. Analytics Interaction Rules

- Page view render ile
- Product viewed meaningful detail load ile
- Map selection actual selection ile
- Form submission yalnız save success ile
- Add to Project List successful state update ile
- Document access signed access creation ile

Click event success metric yerine kullanılmaz.

Sensitive input, search personal data ve attachment names analytics’e gönderilmez.

---

## 70. Performance-Aware UX

- Hero için oversized image yok
- Correct responsive sizes
- Map lazy-load
- Below-fold carousel/library deferred
- Skeleton layout stable
- Fonts limited weights
- Icon SVG
- No heavy animation library without justification
- Admin table virtualisation yalnız gerçek dataset ihtiyacı varsa
- Optimistic UI yalnız rollback anlaşılırsa

Perceived performance:

- Immediate pressed/loading feedback
- Stable content
- Progressive image
- Cached public navigation where safe

---

## 71. Prototype Strategy

### 71.1 Prototype levels

**Level 1 — Structural wireframe**

- Layout
- Content priority
- Navigation
- Main flow

**Level 2 — Interactive prototype**

- States
- Responsive variants
- Form steps
- Map selection
- Admin task

**Level 3 — Visual design prototype**

- Approved design system
- Realistic content
- Approved assets
- en-GB and uk-UA samples

### 71.2 P0 prototype flows

1. Homepage → Product → Quote
2. Category → Compare → Project List → Submit
3. Industry → Application Map → Project Support
4. Resource → Access decision → Request/Login
5. Partner Programme → Dealer Application
6. Admin Inbox → Owner/Next Action → Quote
7. Portal Login → Document Access
8. UK page → Ukraine equivalent/fallback

---

## 72. Usability Test Plan

### 72.1 Participant profiles

- Electrical contractor
- Wholesaler
- Consultant/specifier
- Procurement user
- Ukrainian infrastructure buyer or technical reviewer
- Internal sales/admin user
- Dealer/partner user

### 72.2 Core tasks

- Find suitable busbar system
- Compare two series
- Build multi-item request
- Find/request technical datasheet
- Explore airport map
- Submit project support
- Apply as dealer
- Triage new quote
- Access authorised portal document

### 72.3 Measures

- Task completion
- First-click correctness
- Time on task
- Critical error
- Backtracking
- Form abandonment reason
- Comprehension
- Confidence

### 72.4 Accessibility testing

- Keyboard-only
- Screen reader smoke test
- Zoom/reflow
- Reduced motion
- Contrast
- Mobile touch

---

## 73. Responsive QA Viewports

Representative design review widths:

- 320 px minimum compact stress
- 390 px common mobile
- 768 px tablet portrait
- 1024 px tablet landscape/small desktop
- 1280 px desktop
- 1440 px wide desktop
- 1920 px expanded stress

Bunlar browser support listesi değildir; responsive design verification points’tir.

---

## 74. Design Review Gates

### Gate UX-0 — Structure

- Route and screen scope
- Content priority
- Main actions
- Responsive intent

### Gate UX-1 — Flow

- Happy path
- Error/recovery
- Permission
- Market switch

### Gate UX-2 — Visual direction

- Light technical B2B character
- Typography hierarchy
- Colour usage
- Imagery

### Gate UX-3 — Component readiness

- Reusable pattern
- States
- Accessibility
- Ukrainian expansion

### Gate UX-4 — Implementation QA

- Design comparison
- Responsive
- Keyboard
- Content integrity
- Performance

---

## 75. Release UI/UX Scope

### 75.1 Foundation

- Public shell
- Admin/portal namespace shells
- Grid/container
- Responsive modes
- Navigation foundation
- Core states
- Market switch
- Content preview state

### 75.2 Public Website MVP

- Homepage
- Products/category/detail
- Industries/detail
- Pilot Application Map
- Resources/certifications
- References/corporate
- Contact/basic quote/project support
- Footer/legal

### 75.3 Sales Operations MVP

- Comparator
- Project List
- Technical forms
- Dealer application
- Auth
- Admin dashboard/inbox/quote/application
- Controlled document request

### 75.4 Ukraine Market Release

- uk-UA navigation and content
- Localised form states
- Ukrainian expansion QA
- Market-specific footer/contact/legal
- Localisable map UI
- Equivalent-page fallback notice

### 75.5 V1

- Search
- Full admin workspaces
- Portal
- Additional maps
- Content editors
- Reports/tasks

---

## 76. Design System Handoff

04_DESIGN_SYSTEM.md şu kararları kesinleştirecektir:

- Colour palette and semantic colours
- Typography family, scale and line-height
- Spacing scale
- Grid/gutter tokens
- Border, radius and shadow
- Breakpoints
- Iconography
- Button variants
- Form controls
- Cards
- Tables
- Badges
- Alerts/toasts
- Modal/drawer
- Navigation
- Skeletons
- Motion duration/easing
- Z-index layers
- Dark surface exceptions

Bu belge layout ve interaction intent’ini; design system reusable visual rules’i sahiplenir.

---

## 77. Frontend Handoff Requirements

Her screen handoff paketi:

- Screen ID
- Route
- Requirement IDs
- Wide/Medium/Compact design
- Content hierarchy
- Component roles
- Interaction states
- Error/empty/loading/success
- Accessibility notes
- Market/locale variants
- Asset references
- Analytics events
- Acceptance criteria

içermelidir.

---

## 78. Açık UI/UX Kararları

| ID | Karar | Öneri | Gerekli aşama |
|---|---|---|---|
| UX-001 | Pilot Application Map | Airport/Transport asset readiness ile değerlendir | Before map wireframe |
| UX-002 | Final logo lockup | Horizontal + compact variants | Before visual design |
| UX-003 | Public font family | Cyrillic support ve technical readability test | Before design system |
| UX-004 | Mobile navigation | Full-height drawer baseline, prototype test | Before header component |
| UX-005 | Project List step count | Four input/review steps baseline | Before form prototype |
| UX-006 | Comparator mobile | Pair comparison baseline | Before component build |
| UX-007 | Product sticky mobile CTA | Prototype + overlap test | Before detail sign-off |
| UX-008 | Map zone carousel vs list | List-first unless carousel adds value | Before map sign-off |
| UX-009 | Admin sidebar collapse | Not required MVP | Before admin polish |
| UX-010 | Portal side vs top navigation | Content count after portal pilot | Before V1 portal |
| UX-011 | Clean map base images | Required for production localised UI | Before map publish |
| UX-012 | Hero media | Approved real product/context image | Before homepage production |
| UX-013 | Comparator maximum count | Usability and data-width test | Before comparator spec |
| UX-014 | Accessibility statement | Include at launch if content approved | Before legal gate |

---

## 79. Tasarım Bağımlılıkları

- Final InfraVolt logo
- Brand usage approval
- Approved Gersan relationship wording
- Real/approved product imagery
- Technical data samples
- Priority product list
- Pilot map selection
- Clean map images
- uk-UA navigation/copy sample
- UK and Ukraine contact/legal data
- Certificate metadata samples
- Dealer process content
- Admin role sample data
- Portal pilot company scenario

Placeholder ile wireframe yapılabilir; placeholder production design approval değildir.

---

## 80. UI/UX Riskleri ve Kontroller

| Risk | Kontrol |
|---|---|
| Homepage aşırı uzun/kalabalık | Section priority ve tek primary CTA |
| Teknik bilgi okunamıyor | Grouped specs, reading width, responsive table |
| Her şey kırmızı CTA | Action hierarchy ve restrained accent |
| Mobile map kullanılamıyor | List-first equivalent |
| Embedded image UI tekrarı | Clean image + React overlays |
| Ukrainian text layout bozuyor | Expansion testing ve flexible components |
| Admin ERP kadar karmaşık | Action-first MVP navigation |
| Portal internal data gösteriyor | Separate customer-visible views |
| Form abandonment | Context, step progress, recovery |
| Toast içinde kaybolan error | Inline/banner primary feedback |
| Sticky UI content kapatıyor | Focus/zoom/mobile overlap QA |
| Fake trust görünümü | Approved evidence only |
| Performance düşüyor | Asset budgets, lazy-load, restrained motion |

---

## 81. Requirement Traceability

| UI/UX area | Parent requirement IDs |
|---|---|
| Public shell, navigation and footer | PUB-001, PUB-002, PUB-004, PUB-005, MKT-001–005 |
| Homepage | PUB-001, PUB-005, PUB-006, NFR-001–003 |
| Product index/category/cards | PRD-001, PRD-002, PRD-005, PRD-006 |
| Product detail | PRD-003–006, RES-001, CMP-001, PQL-001 |
| Comparator | CMP-001–003 |
| Project List | PQL-001–004, FRM-001, FRM-006–007 |
| Industry pages | IND-001–002 |
| Application Map | MAP-001–005, NFR-001–003 |
| Technical Resources | RES-001–005, SEC-002–003 |
| Forms | FRM-001–007, NTF-001–003, SEC-005 |
| Dealer application | DLR-001–003 |
| Authentication | ADM-001, PRT-001, SEC-001–002 |
| Admin dashboard/lists/records | ADM-002–005, COM-001–003, QTE-001–004 |
| Opportunities/supplier/orders | OPP-001–002, SUP-001–002, ORD-001–002 |
| Content editor | CNT-001–003, PRD-004, RES-005 |
| Tasks and reminders | TSK-001–002 |
| Partner portal | PRT-001–005, RES-004, ORD-002 |
| States, accessibility and performance | NFR-001–008, SEC-006 |
| Analytics touchpoints | ANA-001–003 |

Screen-level design task’i bu tabloyu başlangıç noktası olarak kullanır ve yalnız ilgili requirement ID’lerini kendi handoff kaydına taşır.

---

## 82. UI/UX Acceptance Criteria

Belge onaylanmadan önce Founder ve delivery team şunları değerlendirmelidir:

- Technical Clarity yönü InfraVolt markasına uygun mu?
- Public site yeterince kurumsal ve premium mi?
- White/light + navy + controlled red yönü kabul mü?
- Homepage content hierarchy doğru mu?
- Product detail teknik karar için yeterli mi?
- Comparator ve Project List e-commerce gibi görünmeden anlaşılır mı?
- Application Map desktop ve mobile yaklaşımı doğru mu?
- Forms context ve step yaklaşımı doğru mu?
- Admin action-first yapı küçük ekip için uygun mu?
- Portal admin’den yeterince ayrışıyor mu?
- Ukrainian localization kuralları yeterli mi?
- Accessibility ve reduced motion baseline kabul mü?
- Open design decisions doğru mu?

---

## 83. Definition of Ready — UI Screen

Bir screen visual design’a girmeden:

- Screen ID ve route belli
- Primary user/task belli
- Parent requirements bağlı
- Content hierarchy onaylı
- Data/content sample var
- Primary/secondary action belli
- Responsive intent belli
- State listesi hazır
- Permission/market behaviour belli
- Asset review durumu belli
- Open UX blocker kapanmış

olmalıdır.

---

## 84. Definition of Done — UI/UX Design

- Wide, Medium ve Compact variants hazır
- Realistic en-GB content ile test edilmiş
- Representative uk-UA expansion ile test edilmiş
- Loading/empty/error/success tasarlanmış
- Keyboard/focus notes hazır
- Contrast intent design system’e uygun
- Touch targets uygun
- Long text ve missing image state var
- Asset source/status belirtilmiş
- Component reuse açık
- Prototype main flow’u tamamlıyor
- Product/Founder review yapılmış
- Developer handoff bilgisi eksiksiz

---

## 85. Onay Kaydı

~~~text
Founder / Product Owner approval: Pending
Approved by:
Approval date:
Approved version:
Notes:
~~~

---

## 86. Sürüm Geçmişi

| Sürüm | Durum | Değişiklik |
|---|---|---|
| 0.1.0 | Current Draft | Public, admin ve portal UI/UX architecture; responsive templates; form, map, state ve accessibility patterns oluşturuldu |

---

## 87. Son Karar

InfraVolt arayüzü Technical Clarity yönünde geliştirilecektir: açık, kurumsal, teknik, güven veren ve buyer-friendly. Public site discovery ve technical evaluation’ı; admin action-oriented operations’ı; portal ise güvenli customer self-service deneyimini destekleyecektir.

Application Map mevcut UI-composite görsellerin ekrana tekrar yerleştirilmesiyle yapılmayacaktır. Clean base images, structured hotspot data ve React/HTML overlays hedeflenecek; böylece responsive design, accessibility ve en-GB/uk-UA localization mümkün olacaktır.

Bir sonraki belge 04_DESIGN_SYSTEM.md olacaktır. O dosya bu UI/UX mimarisini kesin colour, typography, spacing, grid, icon, component, state ve motion token’larına dönüştürecektir.
