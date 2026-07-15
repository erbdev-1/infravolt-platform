# InfraVolt — Product Requirements Document

> Document ID: INF-01  
> Version: 0.1.0  
> Status: Draft for Founder Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Delivery Owner: Product Director / CTO / Head Agent  
> Parent document: 00_MASTER_PROJECT_SPEC.md v0.2.0  
> Required markets: United Kingdom + Ukraine  
> Required locales: en-GB + uk-UA  
> Last updated: 15 July 2026  
> Document language: Turkish; ürün, route, event ve requirement identifiers use English.

---

## 1. Belgenin Amacı

Bu Product Requirements Document, InfraVolt platformunun kullanıcı ve iş gereksinimlerini uygulanabilir, test edilebilir ve önceliklendirilmiş maddelere dönüştürür.

Belge aşağıdaki sorulara cevap verir:

- Ürün hangi kullanıcı problemlerini çözer?
- Her kullanıcı sistemde hangi işi tamamlayabilmelidir?
- Public website, internal admin ve partner portalında hangi yetenekler bulunur?
- Bir gereksinimin karşılandığı nasıl kanıtlanır?
- Hangi yetenek hangi release kapsamında teslim edilir?
- Hangi iş kuralları bütün modüllerde geçerlidir?
- Hangi kararlar geliştirmeyi engeller, hangileri sonraya bırakılabilir?

Bu belge görsel tasarım dosyası, database schema, API sözleşmesi veya component kataloğu değildir. Bu ayrıntılar bağlı proje dokümanlarında tanımlanır.

---

## 2. Belge Hiyerarşisi ve Yetki

Bu doküman 00_MASTER_PROJECT_SPEC.md belgesine bağlıdır ve onun baseline kararlarını değiştiremez.

Çelişki durumunda:

1. Founder tarafından onaylanmış güncel karar
2. 00_MASTER_PROJECT_SPEC.md
3. Onaylanmış Architecture Decision Record
4. Bu Product Requirements Document
5. İlgili UX, design veya technical specification
6. Task acceptance criteria
7. Mevcut kod davranışı

Bir gereksinimin kapsamı, önceliği veya release’i değişirse version history ve change log güncellenmelidir.

---

## 3. Ürün Tanımı

InfraVolt, elektrik altyapısı ürünlerini Birleşik Krallık ve Ukrayna pazarlarında keşfetmek, teknik olarak değerlendirmek, proje veya teklif talebine dönüştürmek ve satış operasyonlarını takip etmek için geliştirilen B2B platformdur.

Ürün üç bağlantılı yüzeyden oluşur:

1. Public B2B Website
2. Internal Admin & Sales Operations
3. Approved Partner / Dealer Portal

Platform public e-commerce değildir. Ana ticari dönüşüm, ürünleri bir proje bağlamında yapılandırılmış quotation veya project-support talebine dönüştürmektir.

---

## 4. Çözülecek Ana Problemler

### 4.1 Alıcı problemleri

- Ürün gruplarının ve serilerinin farkı kolay anlaşılamıyor.
- Projeye uygun ürünleri kataloglar arasında bulmak zor.
- Birden fazla ürün için tek ve düzenli bir talep hazırlamak zaman alıyor.
- Teknik belgeye erişim ve güncel versiyonu doğrulamak zor olabiliyor.
- Teklif veya teknik destek talebinin doğru kişiye ulaşıp ulaşmadığı belirsiz kalabiliyor.
- Sektör çözümü ile ürün ilişkisi yalnızca ürün kataloğundan anlaşılamıyor.
- UK ve Ukrayna kullanıcılarının dil, pazar ve compliance bağlamı farklı.

### 4.2 InfraVolt operasyon problemleri

- Form, e-posta ve doküman talepleri farklı yerlerde kaybolabilir.
- Lead sahibinin, sonraki aksiyonun ve takip tarihinin görünürlüğü sınırlı olabilir.
- Teklif, proje, üretici talebi ve sipariş ilişkileri birlikte izlenemeyebilir.
- Hangi ürün ve belgelerin daha çok talep gördüğü ölçülemeyebilir.
- Dealer başvuruları ve erişim yetkileri kontrollü yönetilemeyebilir.
- Küçük ekip için ağır bir CRM veya ERP gereğinden fazla karmaşık olabilir.

### 4.3 Pazar problemi

UK ve Ukraine deneyimlerinin yalnızca dil çevirisi olarak ele alınması; yanlış iletişim, yanlış compliance mesajı, yanlış lead attribution ve zayıf SEO sonucu doğurabilir. Ürün market-aware çalışmalıdır.

---

## 5. Ürün Sonuçları

### 5.1 Kullanıcı sonuçları

- Kullanıcı uygun ürün grubuna daha hızlı ulaşır.
- Ürünleri teknik ve ticari karar öncesinde karşılaştırabilir.
- Birden fazla ürünü tek proje listesinde toplayabilir.
- Teklif, proje desteği veya teknik belge talebini eksiksiz gönderebilir.
- Kendi dili ve pazarı için doğru içerik, iletişim ve onay metinlerini görür.
- Onaylı kullanıcı, yetkili olduğu private kaynaklara güvenli erişir.

### 5.2 İş sonuçları

- Daha nitelikli ve yapılandırılmış B2B talepler oluşur.
- Her talep doğru market, source domain ve locale ile kaydedilir.
- Lead’ler owner, status ve next action ile takip edilir.
- Teknik doküman erişimi kontrollü ve ölçülebilir olur.
- Ürün, sektör ve belge talep sinyalleri raporlanabilir hale gelir.
- UK ve Ukraine tek operasyon sistemi üzerinden yönetilir.

### 5.3 Ürün kalite sonuçları

- Public deneyim hızlı, erişilebilir ve responsive olur.
- Kanıtlanmamış teknik veya ticari iddialar yayınlanmaz.
- Private içerik yanlış kullanıcıya gösterilmez.
- Email hatası nedeniyle başarılı form kaydı kaybolmaz.
- Yeni özellikler küçük, test edilebilir ve geri alınabilir teslimatlar halinde geliştirilir.

---

## 6. Başarı Tanımı

İlk release’in başarısı çok sayıda sayfa veya özellik üretmek değildir. Başarı aşağıdaki temel görevlerin güvenilir şekilde tamamlanmasıdır:

1. Ziyaretçi InfraVolt’un ne sunduğunu anlar.
2. İlgili ürün veya sektör çözümünü bulur.
3. Ürünleri karşılaştırır veya Project List’e ekler.
4. Yapılandırılmış bir talep gönderir.
5. Talep veritabanına kaydolur ve ekibe ulaşır.
6. Ekip owner, status, next action ve follow-up ile talebi yönetir.
7. Teknik kaynak erişimi yetki politikasına göre gerçekleşir.
8. UK ve Ukraine talepleri doğru market bağlamıyla ayrıştırılır.

---

## 7. Ürün İlkeleri

| İlke | Ürün davranışı |
|---|---|
| Buyer-first | Bilgi mimarisi üretici iç yapısına değil, alıcının görevine göre kurulur |
| Technical trust | Teknik bilgi source ve review durumu olmadan kesin gerçek gibi yayınlanmaz |
| Conversion with context | CTA yalnızca form açmaz; seçilen ürün, sektör ve proje bağlamını taşır |
| Controlled resources | Private teknik ve ticari belgeler login, form veya approval ile korunur |
| Market-aware | Dil, market, domain ve içerik görünürlüğü birlikte değerlendirilir |
| Small-team operability | Admin temel satış takibini kolaylaştırır; tam CRM/ERP olmaya çalışmaz |
| Progressive delivery | Önce çalışan dikey akışlar, sonra kapsam genişlemesi |
| Accessible by default | Ana görevler klavye, mobil ve yardımcı teknolojiyle tamamlanabilir |
| Evidence over assumption | Eksik veri uydurulmaz; missing-content listesine alınır |

---

## 8. Pazar, Domain ve Dil Gereksinimleri

### 8.1 Zorunlu market modeli

| Domain | Market | Locale | Varsayılan deneyim |
|---|---|---|---|
| infravolt.co.uk | UK | en-GB | British English ve UK market context |
| Ukraine-facing .ua domain | Ukraine | uk-UA | Ukrainian ve Ukraine market context |

Ukraine domain’in kesin adı açık karardır. Ancak ürün ve veri modeli iki domain’i baştan desteklemelidir.

### 8.2 Market kuralları

- UK ve Ukraine aynı application ve design system’i kullanır.
- Her domain kendi varsayılan market ve locale değerini güvenilir şekilde belirler.
- Kullanıcı görünür market/language switcher ile diğer sürüme geçebilir.
- Sistem zorunlu IP redirect uygulamaz.
- Market önerisi gösterilirse kullanıcı tercihi korunur.
- Her form submission market, locale ve source domain ile kaydedilir.
- Sayfa copy, metadata, CTA, contact, legal text, email ve resource visibility market-specific olabilir.
- UK içeriği Ukraine domain’de otomatik olarak yayınlanmış kabul edilmez.
- Ukraynaca teknik içerik human technical-language review olmadan publish edilmez.
- URL, canonical, sitemap ve hreflang kuralları iki domain’i doğru eşleştirir.

---

## 9. Kullanıcı Grupları ve Jobs-to-be-Done

### 9.1 External commercial users

| Persona | Temel işi | Başarı işareti |
|---|---|---|
| Electrical Wholesaler | Uygun ürün gruplarını ve trade ilişki yolunu anlamak | İlgili ürünleri bulur ve trade/dealer talebi gönderir |
| M&E Contractor | Projeye uygun sistem ve teknik belgeyi belirlemek | Project List veya project-support talebi oluşturur |
| Main Contractor | Paket çözüm, kapasite ve koordinasyon güvenini değerlendirmek | Proje bağlamıyla nitelikli görüşme talep eder |
| Panel Builder | Busbar, enclosure ve bağlantılı ürün uygunluğunu değerlendirmek | Teknik soru veya structured quote gönderir |
| Consultant / Specifier | Specification ve compliance materyali bulmak | Doğru dokümanı talep eder ve teknik destek alır |
| Procurement Team | Birden fazla ürün için izlenebilir teklif almak | Eksiksiz multi-item quote oluşturur |
| Public / Tender Buyer | Doğrulanabilir bilgi ve resmi iletişim elde etmek | Doküman ve proje desteği talebi oluşturur |
| Ukraine Infrastructure Buyer | Ukraynaca ve market-specific çözüm bilgisine erişmek | Ukraine-attributed talep gönderir |
| Renewable / EV Contractor | Projeye uygun bağlı sistemleri keşfetmek | Ürünleri Application Map veya industries üzerinden bulur |

### 9.2 External partner users

| Persona | Temel işi | Başarı işareti |
|---|---|---|
| Dealer Applicant | Ticari ilişki için başvurmak | Eksiksiz başvuru gönderir ve acknowledgement alır |
| Approved Partner | Onaylı kaynak ve taleplerine erişmek | Kendi company kapsamındaki veriyi güvenle görür |
| Dealer User | Quote, project, order ve belgeleri takip etmek | Yetkili kayıtları self-service görüntüler |

### 9.3 Internal users

| Persona | Temel işi | Başarı işareti |
|---|---|---|
| Sales Admin | Talepleri sınıflandırmak ve takip etmek | Her aktif kaydın owner ve next action’ı vardır |
| Dealer Manager | Başvuruları incelemek ve ilişkiyi yönetmek | Başvuru kararı ve erişim açıkça kayıtlıdır |
| Technical Manager | Teknik içerik ve belgeleri doğrulamak | Sadece onaylı sürüm publish edilir |
| Administrator | Ürün, içerik ve operasyon verisini yönetmek | Veri güncel, izlenebilir ve market-aware olur |
| Super Admin | Kullanıcı, rol ve kritik ayarları yönetmek | Permission değişiklikleri audit edilir |

---

## 10. Ana Kullanıcı Yolculukları

### J-01 — Product discovery to quote

1. Kullanıcı homepage, search, industry veya category üzerinden ürüne ulaşır.
2. Teknik özet, kullanım alanı ve doğrulanmış özellikleri inceler.
3. Ürünü karşılaştırır veya Project List’e ekler.
4. Quantity, project note ve gerekli bilgileri ekler.
5. Quote request gönderir.
6. Confirmation görür ve uygun dilde email alır.
7. Admin’de quote request oluşur.

### J-02 — Industry to project support

1. Kullanıcı sektör sayfasını veya Application Map’i açar.
2. Zone ve hotspot üzerinden ilgili sistemleri keşfeder.
3. Ürün veya solution context’i kaybetmeden project-support formuna gider.
4. Proje detaylarını gönderir.
5. Admin talebi market, industry ve product context ile görür.

### J-03 — Technical document request

1. Kullanıcı document metadata’sını görür.
2. Access level’e göre form veya login adımı başlar.
3. Kullanıcı gerekli bilgileri ve talep nedenini gönderir.
4. Talep kaydedilir ve gerektiğinde approval bekler.
5. Yetki sonrası süreli erişim sağlanır.
6. Access ve download event’i kaydedilir.

### J-04 — Dealer application

1. Kullanıcı partner programı ve uygunluk şartlarını okur.
2. Company ve commercial profile bilgilerini girer.
3. İlgilendiği product groups ve coverage alanını seçer.
4. Gerekli dosyayı güvenli şekilde ekler.
5. Başvuruyu gönderir ve acknowledgement alır.
6. Dealer Manager başvuruyu inceler, bilgi ister veya karar verir.
7. Approval verilirse company, user ve permission süreci ayrı şekilde tamamlanır.

### J-05 — Internal lead follow-up

1. Form submission admin’e düşer.
2. Kayıt type, market ve priority ile sınıflandırılır.
3. Owner atanır.
4. Status, next action ve follow-up date girilir.
5. Aktivite ve müşteri iletişimi kaydedilir.
6. Talep quote, project, supplier request veya closed outcome’a bağlanır.

### J-06 — Partner secure access

1. Approved user login olur.
2. Sistem user-company ilişkisinden erişim kapsamını belirler.
3. Kullanıcı yalnızca kendi company kayıtlarını ve açıkça yetkili project belgelerini görür.
4. Internal note ve başka company verisi hiçbir response’ta açığa çıkmaz.
5. Kritik access olayları audit edilir.

---

## 11. Önceliklendirme Modeli

| Seviye | Anlam |
|---|---|
| P0 | Release’in güvenli ve kullanılabilir olması için zorunlu |
| P1 | İlgili release’in ana ticari değerini tamamlayan yüksek öncelik |
| P2 | Değerli iyileştirme; temel release’i engellemez |
| P3 | Later / Growth adayı |

Ek sınıflandırma:

- Must: Kapsamdan çıkarılması release amacını bozar.
- Should: Güçlü iş değeri vardır; ciddi engelde kontrollü ertelenebilir.
- Could: Kapasiteye bağlıdır.
- Won’t now: Bu release’te bilinçli olarak yapılmaz.

Her implementation task’i en az bir requirement ID’ye bağlanmalıdır.

---

## 12. Requirement Kimlik Sistemi

| Prefix | Alan |
|---|---|
| PUB | Public website ortak deneyimi |
| MKT | Market, locale ve domain |
| PRD | Product library |
| IND | Industries |
| MAP | Application Map |
| CMP | Product Comparator |
| PQL | Project List / Quote Basket |
| RES | Technical Resources |
| FRM | Public forms |
| DLR | Dealer application ve management |
| ADM | Internal admin |
| COM | Companies and contacts |
| QTE | Quote management |
| OPP | Project opportunities |
| SUP | Supplier requests |
| ORD | Orders |
| CNT | Product/content management |
| TSK | Tasks and reminders |
| PRT | Partner portal |
| NTF | Notifications |
| ANA | Analytics |
| SEC | Product-level privacy and access |
| NFR | Non-functional requirement |

ID’ler yeniden kullanılmaz. Silinen requirement Deprecated olarak tutulur.

---

## 13. Public Website Ortak Gereksinimleri

### PUB-001 — Değer önerisi ve ana eylemler

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Homepage, InfraVolt’un elektrik altyapısı ürün ve project-supply partneri olduğunu ilk ekran ve takip eden temel içerikte anlaşılır şekilde açıklamalıdır.

**Kabul kriterleri:**

- Hero’da tek ana değer önerisi bulunur.
- Explore Products, Build a Project List, Request a Quote veya Discuss a Project eylemlerinden uygun olanları görünürdür.
- Kanıtlanmamış distributor, exclusivity veya compliance iddiası gösterilmez.
- Mobilde ana CTA ilk içerik akışında erişilebilirdir.
- en-GB ve uk-UA copy ayrı publish durumuyla yönetilebilir.

### PUB-002 — Global navigation

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Kullanıcı Products, Industries, Resources, Project Support, About, Contact, Project List ve Login girişlerini tutarlı navigation üzerinden bulabilmelidir.

**Kabul kriterleri:**

- Desktop ve mobile navigation aynı ana bilgi mimarisini yansıtır.
- Current page veya section anlamlı şekilde belirtilir.
- Navigation klavye ile tamamen kullanılabilir.
- Mobile menu açıldığında focus ve scroll davranışı kontrollüdür.
- Market switcher erişilebilir ve yanlış domain’e sessizce yönlendirme yapmaz.

### PUB-003 — Site search

**Öncelik:** P2 / Should  
**Release:** V1

Kullanıcı product, category, series, industry ve public resource metadata’sında arama yapabilmelidir.

**Kabul kriterleri:**

- Sonuçlar content type ile etiketlenir.
- Market’te unpublished içerik sonuçlarda görünmez.
- Private document file URL’si sonuçlara girmez.
- Sonuç bulunamazsa önerilen category ve contact CTA sunulur.
- No-result term analytics event olarak kaydedilir; kişisel veri içermez.

### PUB-004 — Breadcrumb ve yön bulma

**Öncelik:** P1 / Should  
**Release:** Public Website MVP

Derin product, industry ve resource sayfaları anlamlı breadcrumb sağlamalıdır.

**Kabul kriterleri:**

- Breadcrumb görsel ve semantic olarak işaretlenir.
- Her parent link doğru market/domain altında açılır.
- Structured data değerlendirmesine uygun veri üretilebilir.

### PUB-005 — Contact ve trust bilgisi

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Kullanıcı market’e uygun contact, company ve legal bilgilerine ulaşabilmelidir.

**Kabul kriterleri:**

- UK ve Ukraine contact verisi ayrı yönetilebilir.
- Eksik market contact bilgisi yanlış market verisiyle otomatik doldurulmaz.
- Company, relationship ve certification ifadeleri approval durumuna bağlıdır.
- Phone ve email linkleri cihazda kullanılabilir formatta sunulur.

### PUB-006 — References ve capability evidence

**Öncelik:** P1 / Should  
**Release:** Public Website MVP

Yalnızca yayın izni ve doğrulanabilir kaynağı bulunan reference veya capability evidence gösterilmelidir.

**Kabul kriterleri:**

- Reference kaydı source, permission ve market visibility bilgisine sahiptir.
- Approval olmayan reference public sayfada görünmez.
- Project detail yayımlanmıyorsa anonim capability formatı kullanılabilir.
- Görsellerin kullanım hakkı doğrulanmadan production’a alınmaz.

---

## 14. Market ve Localization Gereksinimleri

### MKT-001 — Domain-aware market resolution

**Öncelik:** P0 / Must  
**Release:** Foundation

Sistem request domain’inden güvenilir market ve default locale context’i üretmelidir.

**Kabul kriterleri:**

- infravolt.co.uk UK/en-GB context açar.
- Configured Ukraine domain Ukraine/uk-UA context açar.
- Bilinmeyen host kontrollü fallback veya error davranışı gösterir.
- Client tarafından gönderilen market değeri tek başına güvenilir kabul edilmez.
- Preview ve local environment her iki market’i test etmeyi destekler.

### MKT-002 — Market/language switcher

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Kullanıcı mevcut içeriğin diğer market eşleniğine geçebilmelidir.

**Kabul kriterleri:**

- Eşdeğer translated page varsa aynı içerik karşılığı açılır.
- Eşdeğer sayfa yoksa ilgili market’in güvenli fallback sayfası açılır.
- Fallback kullanıcıya yanlış çeviri varmış gibi gösterilmez.
- Tercih kullanıcıyı sonraki ziyarette zorunlu olarak kilitlemez.

### MKT-003 — Market-specific publishing

**Öncelik:** P0 / Must  
**Release:** Foundation

Content publish durumu locale ve market bazında kontrol edilebilmelidir.

**Kabul kriterleri:**

- en-GB publish, uk-UA publish anlamına gelmez.
- Market availability ve content translation status ayrı tutulabilir.
- Draft, review-required, approved ve published durumları desteklenir.
- Unpublished content public response veya sitemap’e girmez.

### MKT-004 — Market attribution

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

Her lead, quote, document request, dealer application ve project-support submission market, locale ve source domain ile kaydedilmelidir.

**Kabul kriterleri:**

- Attribution server-side request context ile doğrulanır.
- Admin filtreleri UK ve Ukraine ayrımı yapabilir.
- Export’larda market alanı kaybolmaz.
- Kullanıcı input’u attribution’ı yetkisiz değiştiremez.

### MKT-005 — International SEO pairing

**Öncelik:** P0 / Must  
**Release:** Ukraine Market Release

UK ve Ukraine public sayfaları doğru canonical, sitemap ve hreflang ilişkisine sahip olmalıdır.

**Kabul kriterleri:**

- Her sayfa kendi domain’ini canonical gösterir.
- Yalnızca published eşlenikler hreflang olarak sunulur.
- Sitemap domain ve market’e göre ayrılır.
- Admin, portal ve private document URL’leri public sitemap’e girmez.

---

## 15. Product Library Gereksinimleri

### PRD-001 — Product taxonomy

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Sistem en az aşağıdaki başlangıç product groups yapısını desteklemelidir:

1. Busbar Trunking Systems
2. Cable Support Systems
3. Distribution Panels and Enclosures
4. Earthing and Lightning Protection
5. Underfloor Trunking Systems
6. LED-BUS / G-BUS and Lighting Busbar Systems
7. Industrial Lighting
8. EV Charging Infrastructure

**Kabul kriterleri:**

- Category sırası ve visibility market bazında yönetilebilir.
- Product, category ve series ilişkileri veri odaklıdır.
- Taxonomy yalnızca Gersan’a kilitlenmez; manufacturer alanı desteklenir.
- Category adları locale bazında ayrı yönetilir.

### PRD-002 — Product listing and filtering

**Öncelik:** P1 / Should  
**Release:** Public Website MVP

Kullanıcı category içindeki published product veya series kayıtlarını anlamlı filtrelerle daraltabilmelidir.

**Kabul kriterleri:**

- Filtreler yalnızca doğrulanmış ve yapılandırılmış alanlardan üretilir.
- Zero-result durumu açıkça gösterilir.
- Filter state shareable URL yaklaşımına uygun tasarlanır.
- Kullanıcı filtreyi kolayca temizleyebilir.
- Filter seçenekleri market’te görünmeyen ürünleri sızdırmaz.

### PRD-003 — Product detail

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Product veya series detail sayfası karar vermek için gerekli doğrulanmış temel bilgiyi ve conversion eylemlerini sunmalıdır.

**Kabul kriterleri:**

- Name, category, manufacturer ve short value proposition bulunur.
- Typical applications, suitable industries ve key benefits desteklenir.
- Technical specification tablosu yalnızca doğrulanmış değerleri gösterir.
- Related products, industries ve controlled resources bağlanabilir.
- Add to Project List, Compare, Request Quote ve Ask Technical Question eylemleri bağlama göre sunulur.
- Eksik teknik değer uydurulmaz; alan gizlenir veya Available on request gösterilir.

### PRD-004 — Technical data provenance

**Öncelik:** P0 / Must  
**Release:** Foundation

Public teknik alanların source ve review durumu izlenebilmelidir.

**Kabul kriterleri:**

- Kritik technical value için source reference tutulabilir.
- Technical Manager approval olmadan verified-required alan publish edilemez.
- Değişen değer review gerektirir.
- Eski değer audit/history üzerinden izlenebilir veya source document version ile ilişkilendirilebilir.

### PRD-005 — Product media

**Öncelik:** P1 / Should  
**Release:** Public Website MVP

Product image ve diagram’ları performanslı, açıklayıcı ve hakları doğrulanmış şekilde sunulmalıdır.

**Kabul kriterleri:**

- Her görsel alt text veya decorative state alır.
- Responsive source ve uygun boyut kullanılır.
- AI-generated veya composited asset production öncesi review-required kabul edilir.
- Embedded yanlış teknik metin veya marka ifadesi olan görsel publish edilmez.

### PRD-006 — Related solution graph

**Öncelik:** P2 / Could  
**Release:** V1

Product; category, industry, Application Map hotspot, related product ve document ile ilişkilendirilebilmelidir.

**Kabul kriterleri:**

- İlişki admin’den düzenlenebilir.
- Unpublished target public sayfada görünmez.
- Circular veya duplicate relation kullanıcı deneyimini bozmaz.

---

## 16. Industries Gereksinimleri

### IND-001 — Industry taxonomy

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Başlangıçta şu industry grupları desteklenir:

1. Data Centres
2. Commercial Buildings
3. Industrial Facilities
4. Infrastructure and Utilities
5. Renewable Energy
6. Healthcare
7. Transport and Rail Infrastructure
8. Education and Public Sector

**Kabul kriterleri:**

- Industry name, slug, copy, media ve visibility locale/market bazında yönetilir.
- Industry ile product/category ilişkisi kurulabilir.
- İçeriği hazır olmayan industry draft tutulabilir.

### IND-002 — Industry solution page

**Öncelik:** P1 / Should  
**Release:** Public Website MVP

Industry sayfası yalnızca marketing copy değil; challenges, applicable systems, technical support ve project CTA içermelidir.

**Kabul kriterleri:**

- Published related products gösterilir.
- Uygun Application Map varsa görünür giriş sunulur.
- Market’e özgü claim ve reference ayrı yönetilir.
- Project-support formuna industry context taşınır.

---

## 17. Application Map Gereksinimleri

### MAP-001 — Pilot Application Map

**Öncelik:** P1 / Should  
**Release:** Public Website MVP

Tek bir pilot sektör, sekiz sektörün tamamına geçmeden önce uçtan uca hazırlanmalıdır. Mevcut asset paketi nedeniyle ilk değerlendirme adayı Airport / Transport Infrastructure’dır; kesin seçim Founder onayı gerektirir.

**Kabul kriterleri:**

- Overview image yüklenir.
- Zone veya hotspot seçimi ilgili product/solution bilgisini açar.
- Kullanıcı reset ve fullscreen eylemlerine erişebilir.
- Product detail, technical pack ve quote/project CTA’ları bağlamı korur.
- Mobilde aynı bilgi alternatif liste ile tamamlanabilir.
- Keyboard-only kullanıcı ana içerik ve CTA’lara erişebilir.

### MAP-002 — Data-driven map

**Öncelik:** P0 / Must  
**Release:** Foundation

Hotspot, zone ve product mapping component içine hardcode edilmiş görsel metin olmamalıdır.

**Kabul kriterleri:**

- Hotspot coordinates ve ilişkiler structured data’dan gelir.
- Aynı component farklı industry dataset’i ile çalışabilir.
- Missing product mapping açık content issue olarak işaretlenir.
- Market’te unpublished product hotspot panelinde görünmez.

### MAP-003 — Canonical asset package

**Öncelik:** P0 / Must  
**Release:** Foundation

Application Map ve ilgili industry asset’lerinde canonical kaynak infravolt-application-map-assets-v1.zip paketidir.

**Kabul kriterleri:**

- Kodda eski ChatGPT Image benzeri source filenames kullanılmaz.
- Asset path’leri asset-manifest.json içindeki canonical adlardan alınır.
- Industry görselleri public/assets/industries altında kullanılır.
- Product ve action icon’ları ilgili icons klasörlerinden kullanılır.
- reference/ui-mockups altındaki birleşik UI görüntüleri doğrudan production UI olarak kullanılmaz.
- publishStatus değeri review-required olan raster asset teknik ve brand review olmadan yayınlanmaz.

### MAP-004 — Localisable visual experience

**Öncelik:** P0 / Must  
**Release:** Ukraine Market Release

Application Map üzerindeki kullanıcıya dönük metin mümkün olduğunca React/HTML katmanında locale’a göre render edilmelidir.

**Kabul kriterleri:**

- Menü, label, panel ve CTA metni image içine gömülü tek dil metnine bağlı değildir.
- en-GB ve uk-UA label’ları aynı map data modelinden seçilebilir.
- Embedded English UI barındıran composited image Ukraine production experience’ında ana interactive canvas olarak kullanılmaz.
- Text-free base image eksikse asset gap release risk listesine eklenir.

### MAP-005 — Asset gaps

**Öncelik:** P1 / Should  
**Release:** Before affected map publish

Eksik icon, thumbnail veya semantic mapping uydurulmadan content backlog’a kaydedilmelidir.

**Kabul kriterleri:**

- Cable ladder, underfloor trunking, industrial lighting ve surge protection icon ihtiyaçları takip edilir.
- Rail asset eksikliği Transport and Rail kapsamına göre açıkça işaretlenir.
- Teknik uzman onayı gereken zone adları publish öncesi kapanır.
- Placeholder görsel teknik gerçek gibi gösterilmez.

---

## 18. Product Comparator Gereksinimleri

### CMP-001 — Add and remove comparison items

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Kullanıcı product veya listing üzerinden ürünleri karşılaştırmaya ekleyip çıkarabilmelidir.

**Kabul kriterleri:**

- Duplicate item eklenmez.
- Kullanıcı mevcut comparison count’u görür.
- Karşılaştırılamayan ürünler için açıklayıcı davranış sunulur.
- Liste belirlenen güvenli maksimum öğe sayısını aşmaz; kesin limit UX dokümanında kararlaştırılır.

### CMP-002 — Comparable attribute matrix

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Comparator yalnızca ortak ve doğrulanmış technical attributes üzerinden anlamlı karşılaştırma yapmalıdır.

**Kabul kriterleri:**

- Attribute label ve unit tutarlıdır.
- Missing value boş tahminle doldurulmaz.
- Farklı category ürünleri kıyaslanıyorsa kullanıcıya bağlam açıklanır.
- Mobilde yatay karşılaştırma için erişilebilir alternatif sunulur.

### CMP-003 — Comparison to conversion

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Kullanıcı comparison seçimini Project List veya quote request’e aktarabilmelidir.

**Kabul kriterleri:**

- Seçilen product IDs ve market context korunur.
- Kullanıcı formda ürünleri tekrar girmek zorunda kalmaz.
- Unpublished veya unavailable product submission öncesi açıkça işaretlenir.

---

## 19. Project List / Quote Basket Gereksinimleri

### PQL-001 — Project List

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

Kullanıcı birden fazla ürünü e-commerce cart yerine project-oriented listeye ekleyebilmelidir.

**Kabul kriterleri:**

- Her item product/series reference içerir.
- Kullanıcı quantity, unit, item note ve gerektiğinde variant bilgisi ekleyebilir.
- Duplicate product eklenirse birleştirme veya ayrı line davranışı açık olur.
- Liste sayfa geçişlerinde korunur.
- Fiyat, tax veya checkout toplamı gösterilmez.

### PQL-002 — Project metadata

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Kullanıcı listesine project name, location, stage ve general note ekleyebilmelidir.

**Kabul kriterleri:**

- Gereksiz kişisel veri istenmez.
- Market’e göre gerekli alanlar yapılandırılabilir.
- Project data quote request’e eksiksiz aktarılır.

### PQL-003 — Multi-item quote submission

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

Project List, company ve contact bilgileriyle tek quote request olarak gönderilebilmelidir.

**Kabul kriterleri:**

- En az bir valid item olmadan submission yapılmaz.
- Quote ve quote items transaction-safe ilişkiyle kaydedilir.
- Confirmation reference oluşturulur.
- Admin aynı request altında tüm item’ları görür.
- Email başarısız olsa bile database kaydı korunur.

### PQL-004 — Local persistence and privacy

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Login olmayan kullanıcı listesi cihazında geçici olarak korunabilir; hassas form bilgileri gereksiz yere local storage’da tutulmaz.

**Kabul kriterleri:**

- Product list data ile contact personal data ayrılır.
- Kullanıcı listeyi temizleyebilir.
- Expiry davranışı tanımlıdır.
- Market değişiminde unavailable item kontrol edilir.

---

## 20. Technical Resources Gereksinimleri

### RES-001 — Resource metadata catalogue

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Kullanıcı erişim almadan önce izin verilen document metadata’sını görebilmelidir.

**Kabul kriterleri:**

- Title, document type, related product/category, language, version/date, format, size ve access requirement desteklenir.
- Private storage URL response veya HTML source içine çıkmaz.
- Superseded veya expired document varsayılan sonuçlarda gösterilmez.
- Market ve locale visibility uygulanır.

### RES-002 — Access levels

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

En az şu access levels desteklenir:

- lead_capture
- approved_partner
- dealer
- project_specific
- admin_only

**Kabul kriterleri:**

- Public teknik belge varsayılan değildir.
- Access policy server-side uygulanır.
- User role tek başına project_specific erişim vermez; explicit relation gerekir.
- Yetkisiz talep generic ve güvenli hata döndürür.

### RES-003 — Controlled document request

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

Lead-capture veya approval gerektiren belge için structured request oluşturulmalıdır.

**Kabul kriterleri:**

- Document, product, market, company ve contact context kaydedilir.
- Duplicate submission riski kontrollüdür.
- Admin notification oluşur.
- Kullanıcıya erişim sözü verilmeden acknowledgement gönderilir.

### RES-004 — Time-limited document access

**Öncelik:** P0 / Must  
**Release:** V1

Yetkili kullanıcı private belgeyi süreli signed URL ile açabilmelidir.

**Kabul kriterleri:**

- URL kısa süreli ve document-specific olur.
- Permission her URL üretiminde yeniden doğrulanır.
- File path public bucket mantığıyla tahmin edilemez.
- Access ve download attempt loglanır.
- Revoked veya expired access yeni URL üretemez.

### RES-005 — Document versions

**Öncelik:** P1 / Should  
**Release:** V1

Technical Manager document version, replacement ve archive lifecycle’ını yönetebilmelidir.

**Kabul kriterleri:**

- Yeni version eski kaydı sessizce overwrite etmez.
- Active version açıkça belirlenir.
- Superseded version external kullanıcıya varsayılan gösterilmez.
- Review/expiry date takip edilebilir.

---

## 21. Public Forms Gereksinimleri

### FRM-001 — Ortak form standardı

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Contact, quote, technical pack, technical question, project support, dealer application ve document request formları ortak kalite standardına uymalıdır.

**Kabul kriterleri:**

- Client ve server validation bulunur.
- Label, help text ve error mesajları erişilebilirdir.
- Error halinde girilen non-sensitive data mümkün olduğunca korunur.
- Submission database’e başarıyla yazılmadan success gösterilmez.
- Spam protection uygulanır.
- Market, locale ve source context server-side kaydedilir.
- Privacy notice ve gerekli consent doğru market dilinde gösterilir.

### FRM-002 — Contact enquiry

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Kullanıcı genel iletişim talebi oluşturabilmelidir.

**Kabul kriterleri:**

- Name, company, business email, subject/category ve message desteklenir.
- Market’e göre contact destination belirlenebilir.
- Submission admin enquiry listesinde görünür.
- Confirmation email operasyon kaydından bağımsız retry edilebilir.

### FRM-003 — Basic quote request

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Product detail veya genel quote CTA’dan tek ürünlü ya da serbest açıklamalı quote request gönderilebilmelidir.

**Kabul kriterleri:**

- Source product varsa forma otomatik taşınır.
- Company ve project context alanları desteklenir.
- Request reference kullanıcıya gösterilir.
- Admin type olarak quote_request görür.

### FRM-004 — Project support

**Öncelik:** P1 / Should  
**Release:** Public Website MVP

Kullanıcı henüz kesin product seçmeden proje desteği isteyebilmelidir.

**Kabul kriterleri:**

- Project type, stage, location, target timing ve support need alanları desteklenir.
- Source industry veya Application Map context’i korunur.
- Attachment varsa allowlist, boyut limiti ve güvenli storage yaklaşımı uygulanır.
- Talep project opportunity’ye dönüştürülebilir.

### FRM-005 — Technical question

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Kullanıcı product bağlamında teknik soru gönderebilmelidir.

**Kabul kriterleri:**

- Product/series reference kaydedilir.
- Kullanıcı technical compliance cevabı otomatik üretilmiş gibi görmez.
- Technical Manager’a assignment yapılabilir.
- Yanıt ve activity history kaydedilebilir.

### FRM-006 — Consent separation

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Operational communication ve optional marketing consent birbirinden ayrılmalıdır.

**Kabul kriterleri:**

- Marketing consent default selected değildir.
- Formu işlemek için gerekli privacy acknowledgement ile marketing opt-in aynı checkbox değildir.
- Consent timestamp, text version ve market bağlamı kayıt altına alınabilir.

### FRM-007 — Attachment policy

**Öncelik:** P0 / Must when attachment enabled  
**Release:** Sales Operations MVP

Attachment kabul eden formlar dosya riskini sınırlamalıdır.

**Kabul kriterleri:**

- Allowed file types ve maximum size server-side kontrol edilir.
- Filename tek başına MIME güveni oluşturmaz.
- Dosya private storage’a gider.
- Public executable veya active-content dosyaları reddedilir.
- Malware-risk kontrol stratejisi security dokümanında tanımlanmadan geniş dosya kabulü açılmaz.

---

## 22. Dealer / Trade Account Gereksinimleri

### DLR-001 — Dealer application form

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Başvuru company identity, contact, location/coverage, business activity, interested product groups, customer profile, commercial intention, estimated potential ve privacy consent bilgilerini desteklemelidir.

**Kabul kriterleri:**

- Required alanlar market’e göre yapılandırılabilir.
- Supporting file güvenli attachment policy’ye uyar.
- Applicant acknowledgement alır.
- Başvuru admin’de new status ile oluşur.

### DLR-002 — Application lifecycle

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Dealer Manager başvuruyu şu lifecycle ile yönetebilmelidir:

- new
- under_review
- additional_information_required
- priority_candidate
- approved_partner
- approved_dealer
- rejected
- archived

**Kabul kriterleri:**

- Status değişimi actor ve timestamp ile kaydedilir.
- Rejection veya approval otomatik permission değişikliği yapmaz.
- Internal reason external response’tan ayrılır.
- Duplicate company uyarısı verilebilir.

### DLR-003 — Manual approval

**Öncelik:** P0 / Must  
**Release:** V1

Partner veya dealer erişimi yalnızca yetkili internal user’ın açık onayıyla verilmelidir.

**Kabul kriterleri:**

- Form submission login hesabı veya dealer role oluşturmaz.
- Company doğrulaması ve user invitation ayrı adımdır.
- Approval actor, scope ve date audit edilir.
- Access revoke edilebilir.

---

## 23. Internal Admin Ortak Gereksinimleri

### ADM-001 — Secure admin authentication

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

Admin route’ları authentication ve authorisation olmadan erişilemez.

**Kabul kriterleri:**

- Unauthenticated request login akışına gider.
- Authenticated fakat yetkisiz user güvenli şekilde reddedilir.
- Server-side data queries permission uygular.
- Admin route public sitemap ve search index dışında tutulur.

### ADM-002 — Dashboard

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Dashboard aksiyon gerektiren işleri öne çıkarmalıdır.

**Kabul kriterleri:**

- New enquiries, quote requests, dealer applications ve overdue follow-ups gösterilebilir.
- Market filter UK/Ukraine ayrımı yapar.
- Count’tan kayda geçiş filtre bağlamını korur.
- Kullanıcının göremediği kayıtlar count’a dahil edilmez.

### ADM-003 — Unified activity history

**Öncelik:** P1 / Should  
**Release:** V1

Enquiry, quote, project, company ve order üzerinde ilgili aktiviteler kronolojik görülebilmelidir.

**Kabul kriterleri:**

- Status change, note, assignment ve önemli communication kaydedilebilir.
- Internal ve customer-visible content ayrıdır.
- Actor ve timestamp görünürdür.
- Audit event kullanıcı tarafından sessizce değiştirilemez.

### ADM-004 — Ownership and next action

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

Aktif commercial kayıt owner, status, next action ve follow-up date desteklemelidir.

**Kabul kriterleri:**

- Aktif quote/enquiry kaydı owner’sız bırakılırsa görünür uyarı üretilebilir.
- Overdue follow-up dashboard’da gösterilir.
- Closed kayıtta next action zorunluluğu kalkabilir.
- Assignment değişimi history’ye yazılır.

### ADM-005 — Admin filtering and pagination

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Listeler status, owner, market, type ve date gibi ana alanlarla filtrelenebilmelidir.

**Kabul kriterleri:**

- Filter state URL ile korunabilir.
- Büyük listeler bounded pagination kullanır.
- Empty ve loading state anlamlıdır.
- Export permission list permission’dan ayrı değerlendirilebilir.

---

## 24. Companies and Contacts Gereksinimleri

### COM-001 — Company record

**Öncelik:** P1 / Should  
**Release:** V1

Company profili legal/trading name, type, markets, locations, relationship status ve interested product groups desteklemelidir.

**Kabul kriterleri:**

- Company quote, project, order, dealer application ve contacts ile ilişkilendirilebilir.
- Duplicate adayları görünür uyarı üretebilir; otomatik destructive merge yapılmaz.
- Market relationship birden fazla olabilir.

### COM-002 — Contact record

**Öncelik:** P1 / Should  
**Release:** V1

Contact bir company’ye bağlı veya gerektiğinde unassigned lead olarak tutulabilmelidir.

**Kabul kriterleri:**

- Name, business contact fields, role ve communication preferences desteklenir.
- Email normalization duplicate kontrolüne yardımcı olur.
- Marketing consent operational contact permission’dan ayrıdır.
- Deletion/retention davranışı privacy policy’ye uyar.

### COM-003 — Relationship overview

**Öncelik:** P1 / Should  
**Release:** V1

Company sayfası ilişkili enquiries, quotes, opportunities, orders, documents ve activities için toplu görünüm sağlamalıdır.

**Kabul kriterleri:**

- Her bölüm permission’a göre görünür.
- Internal notes external portal response’larına girmez.
- Market ve date context korunur.

---

## 25. Quote Management Gereksinimleri

### QTE-001 — Structured quote

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

Quote request company/contact, project context ve bir veya daha fazla quote item içermelidir.

**Kabul kriterleri:**

- Item product reference, description, quantity, unit ve note destekler.
- Product silinse bile historical item snapshot korunabilir.
- Quote reference benzersizdir.
- Currency context market’e göre tutulabilir; public fiyat gösterilmez.

### QTE-002 — Quote lifecycle

**Öncelik:** P1 / Should  
**Release:** Sales Operations MVP

Quote new, qualifying, technical_review, supplier_input_required, preparing, sent, revision, won, lost ve archived benzeri kontrollü durumlarla yönetilmelidir. Kesin enum database dokümanında onaylanır.

**Kabul kriterleri:**

- Geçişler history’ye yazılır.
- Sent durumu sent date ve validity date destekler.
- Won/lost outcome reason desteklenir.
- Internal status ile external-facing status ayrılabilir.

### QTE-003 — Quote revision

**Öncelik:** P1 / Should  
**Release:** V1

Quote değişiklikleri revision olarak izlenebilmelidir.

**Kabul kriterleri:**

- Revision number ve created date bulunur.
- Önceki revision sessizce yok edilmez.
- Customer’a hangi revision’ın gönderildiği kaydedilebilir.
- PDF generation ayrı release kararıdır.

### QTE-004 — Communication record

**Öncelik:** P2 / Could  
**Release:** V1

Önemli customer communication quote activity’sine manual veya approved integration yoluyla kaydedilebilmelidir.

**Kabul kriterleri:**

- Sensitive email body gereksiz yere çoğaltılmaz.
- Communication direction, date, subject ve actor kaydedilebilir.
- Gönderildi iddiası gerçek provider sonucu olmadan yazılmaz.

---

## 26. Project Opportunity Gereksinimleri

### OPP-001 — Opportunity record

**Öncelik:** P1 / Should  
**Release:** V1

Project opportunity; name, location, customer, contractor, products, estimated value, stage, decision date ve next action desteklemelidir.

**Kabul kriterleri:**

- Quote ve supplier request ile ilişkilendirilebilir.
- Estimated value kesin order değeri gibi raporlanmaz.
- Market ve owner zorunlu bağlamdır.
- Won/lost outcome reason kaydedilir.

### OPP-002 — Technical approval state

**Öncelik:** P2 / Could  
**Release:** V1

Opportunity üzerindeki teknik değerlendirme commercial stage’den ayrı izlenebilmelidir.

**Kabul kriterleri:**

- Pending, clarification_required, suitable, conditional veya not_suitable gibi controlled state değerlendirilebilir.
- Technical statement actor ve date olmadan approved kabul edilmez.
- External visibility ayrı kontroldür.

---

## 27. Supplier Request Gereksinimleri

### SUP-001 — Supplier request

**Öncelik:** P1 / Should  
**Release:** V1

Internal user quote, project veya order bağlamında manufacturer/supplier talebi oluşturabilmelidir.

**Kabul kriterleri:**

- Requested products, quantities, questions, sent date ve target response date desteklenir.
- Supplier response attachment ve note ile kaydedilebilir.
- Missing information status’u görünürdür.
- Related commercial record’a geri bağlantı vardır.

### SUP-002 — Response tracking

**Öncelik:** P1 / Should  
**Release:** V1

Geciken supplier response’lar takip edilebilmelidir.

**Kabul kriterleri:**

- Waiting request target date sonrası overdue olur.
- Reminder internal user’a gider; supplier’a otomatik commercial commitment göndermez.
- Response time raporlanabilir.

---

## 28. Order Gereksinimleri

### ORD-001 — Basic order status

**Öncelik:** P2 / Should  
**Release:** V1

Won quote, temel order record ve milestone takibine dönüştürülebilmelidir.

**Kabul kriterleri:**

- Customer, source quote, order items ve manufacturer reference desteklenir.
- Proforma, invoice ve packing-list reference metadata olarak tutulabilir.
- Dispatch ve delivery milestone’ları izlenebilir.
- Bu modül accounting veya warehouse ledger değildir.

### ORD-002 — Internal and customer-visible status

**Öncelik:** P1 / Should  
**Release:** V1

Internal operational status ile portalda gösterilecek customer-friendly status ayrılmalıdır.

**Kabul kriterleri:**

- Internal note portal response’una girmez.
- Customer-visible status yalnızca authorised company user’a görünür.
- Status değişimi notification üretmeden önce market template ve visibility kontrolü yapar.

---

## 29. Product, Industry ve Content Admin Gereksinimleri

### CNT-001 — Content workflow

**Öncelik:** P0 / Must  
**Release:** Foundation

Product, industry, page ve Application Map içerikleri draft, review-required, approved, published ve archived benzeri lifecycle desteklemelidir.

**Kabul kriterleri:**

- Publish actor ve time izlenir.
- Market/locale publish bağımsızdır.
- Teknik alan değişikliği review state’i tetikleyebilir.
- Archived content yeni public request’te gösterilmez.

### CNT-002 — Content completeness

**Öncelik:** P1 / Should  
**Release:** V1

Admin, product ve industry kayıtlarının eksik zorunlu alanlarını görebilmelidir.

**Kabul kriterleri:**

- Completeness bir doğruluk skoru gibi sunulmaz.
- Missing source, translation, image, document ve approval ayrı işaretlenebilir.
- Publish blocker ile optional enhancement ayrılır.

### CNT-003 — Asset review

**Öncelik:** P0 / Must  
**Release:** Before public asset publish

AI-generated, composited veya manufacturer-related asset’ler teknik doğruluk, brand, rights ve localization açısından review edilmelidir.

**Kabul kriterleri:**

- Asset status review-required ise public publish engellenebilir.
- Reviewer ve decision kaydedilir.
- Embedded text ve duplicate UI kontrol edilir.
- Rejected asset yerine placeholder production’da gerçek ürün sunumu gibi kullanılmaz.

---

## 30. Tasks, Reminders ve Operational Controls

### TSK-001 — Next-action task

**Öncelik:** P1 / Should  
**Release:** V1

Internal user company, quote, project, supplier request veya dealer application’a task bağlayabilmelidir.

**Kabul kriterleri:**

- Owner, due date, status ve description desteklenir.
- Overdue task dashboard’da görünür.
- Completed task activity history’ye yazılır.
- Başka user’ın task’ını değiştirme permission ile kontrol edilir.

### TSK-002 — Reminder automation

**Öncelik:** P2 / Could  
**Release:** V1

Follow-up, quote validity, supplier response ve document review date için internal reminder üretilebilir.

**Kabul kriterleri:**

- Aynı reminder kontrolsüz tekrar gönderilmez.
- Reminder başarısızlığı source record’u değiştirmez.
- Notification sonucu loglanabilir.

---

## 31. Partner Portal Gereksinimleri

### PRT-001 — Company-scoped portal

**Öncelik:** P0 / Must  
**Release:** V1 basic portal

Portal kullanıcısı yalnızca bağlı olduğu company ve açıkça yetkilendirildiği project verisini görebilmelidir.

**Kabul kriterleri:**

- Company scope bütün server queries’de uygulanır.
- URL ID değiştirerek başka company kaydı açılamaz.
- Admin note hiçbir portal payload’ında bulunmaz.
- Permission testleri automated integration/E2E kapsamına girer.

### PRT-002 — Portal dashboard

**Öncelik:** P2 / Should  
**Release:** V1

Approved user kendi açık quote, project, order ve document aksiyonlarını görebilmelidir.

**Kabul kriterleri:**

- Yalnızca customer-visible status gösterilir.
- Empty state support CTA sunar.
- Market ve locale template’leri uygulanır.

### PRT-003 — My Quotes, Projects and Orders

**Öncelik:** P2 / Should  
**Release:** V1

Kullanıcı authorised company records’ının read-heavy özetini görebilmelidir.

**Kabul kriterleri:**

- Edit yeteneği varsayılan olarak kapalıdır.
- Download edilen customer document access policy’ye uyar.
- Kayıtlar başka company data’sını relation üzerinden sızdırmaz.

### PRT-004 — Partner technical documents

**Öncelik:** P1 / Should  
**Release:** V1

Approved partner/dealer kendisine açık document metadata ve signed access eylemlerini görebilmelidir.

**Kabul kriterleri:**

- Role, company ve project constraints birlikte uygulanır.
- Dealer price list public veya approved_partner-only role’a yanlışlıkla açılmaz.
- Access revoke hemen yeni link üretimini engeller.

### PRT-005 — Account settings

**Öncelik:** P2 / Could  
**Release:** V1

User temel profile ve notification preference bilgilerini yönetebilir; company legal veya dealer status alanlarını doğrudan değiştiremez.

---

## 32. Notification Gereksinimleri

### NTF-001 — Transactional acknowledgement

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Başarılı form submission sonrasında kullanıcı uygun market/locale template’iyle acknowledgement almalıdır.

**Kabul kriterleri:**

- Email yalnızca database kaydı oluşmuşsa planlanır.
- Email provider hatası submission’ı silmez.
- Reference ve doğru contact expectation içerir.
- Acknowledgement approval veya commercial acceptance anlamına gelmez.

### NTF-002 — Internal submission notification

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Yeni commercial submission ilgili internal destination’a bildirilmelidir.

**Kabul kriterleri:**

- Notification type ve market’e göre route edilir.
- Sensitive attachment public link olarak gönderilmez.
- Failure loglanır ve admin’de görülebilir veya retry edilebilir.

### NTF-003 — Template localisation

**Öncelik:** P0 / Must  
**Release:** Ukraine Market Release

Transactional templates en-GB ve uk-UA için ayrı approved content kullanmalıdır.

**Kabul kriterleri:**

- English template Ukraine submission’a fallback olursa açık kontrollü kural vardır.
- Legal footer ve contact bilgisi market’e uygundur.
- Ukraynaca teknik ifade review edilmeden gönderime açılmaz.

### NTF-004 — Human-controlled commercial decisions

**Öncelik:** P0 / Must  
**Release:** All

Fiyat, credit terms, dealer approval, technical compliance veya supply commitment insan onayı olmadan otomatik iletilmez.

---

## 33. Analytics ve Reporting Gereksinimleri

### ANA-001 — Core public events

**Öncelik:** P1 / Should  
**Release:** Public Website MVP

En az şu event’ler market ve locale context ile ölçülebilir olmalıdır:

- product_viewed
- comparison_started
- product_added_to_project_list
- quote_request_submitted
- technical_document_requested
- document_accessed
- project_support_submitted
- dealer_application_submitted
- application_map_product_selected

**Kabul kriterleri:**

- Event name ve required properties analytics specification’da tanımlanır.
- Form message, email, phone veya attachment name analytics’e gönderilmez.
- Consent gerektiren araçlar consent öncesi aktif olmaz.
- Duplicate page/event davranışı test edilir.

### ANA-002 — Commercial reporting

**Öncelik:** P2 / Should  
**Release:** V1

Admin qualified request, conversion, first response, overdue follow-up ve supplier response göstergelerini raporlayabilmelidir.

**Kabul kriterleri:**

- Metric definition açıkça belgelenir.
- UK ve Ukraine filter desteklenir.
- Small sample yanlış başarı iddiası üretmez.
- Export permission’a bağlıdır.

### ANA-003 — Content demand signals

**Öncelik:** P2 / Could  
**Release:** V1

Most requested product category, document, missing-document request, Application Map interaction ve no-result search term raporlanabilir.

---

## 34. Product-Level Security ve Privacy Gereksinimleri

### SEC-001 — Least privilege

**Öncelik:** P0 / Must  
**Release:** All authenticated surfaces

Her user yalnızca görevi için gerekli minimum data ve action’a erişir.

### SEC-002 — Server-side authorisation

**Öncelik:** P0 / Must  
**Release:** All authenticated surfaces

UI’da buton gizlemek permission kontrolü sayılmaz. Private record ve document access server-side doğrulanmalıdır.

### SEC-003 — No private URL exposure

**Öncelik:** P0 / Must  
**Release:** Sales Operations MVP

Private storage path veya kalıcı URL client bundle, public HTML, analytics ya da notification içine yazılamaz.

### SEC-004 — Audit critical changes

**Öncelik:** P0 / Must  
**Release:** V1

Role, permission, partner approval, document access level ve critical publish değişiklikleri actor ve timestamp ile audit edilir.

### SEC-005 — Data minimisation

**Öncelik:** P0 / Must  
**Release:** Public Website MVP

Formlar belirtilen iş amacı için gerekli olmayan kişisel veriyi istemez. Retention ve deletion policy launch öncesi tanımlanır.

### SEC-006 — Safe logs

**Öncelik:** P0 / Must  
**Release:** Foundation

Password, secret, access token, signed URL, full form message ve gereksiz personal data application log’larına yazılmaz.

---

## 35. Non-Functional Requirements

### NFR-001 — Responsive task completion

**Öncelik:** P0 / Must

Product discovery, Project List, form submission, document request ve portal read tasks mobile, tablet ve desktop’ta tamamlanabilir olmalıdır.

### NFR-002 — Accessibility

**Öncelik:** P0 / Must

Hedef WCAG 2.2 AA uyumudur; kesin test kapsamı 11_TEST_QA_AND_ACCESSIBILITY.md içinde tanımlanır.

Minimum:

- Semantic HTML
- Keyboard operation
- Visible focus
- Labelled controls
- Programmatic error association
- Sufficient contrast
- Reduced motion support
- Map için non-visual alternative
- Screen zoom ve reflow desteği

### NFR-003 — Performance

**Öncelik:** P0 / Must

- Public route’larda gereksiz client JavaScript azaltılır.
- Responsive, compressed images kullanılır.
- Application Map asset’leri ihtiyaç anında lazy-load edilir.
- Layout shift azaltılır.
- Performance budget ve Core Web Vitals hedefleri QA dokümanında sayısallaştırılır.

### NFR-004 — Reliability

**Öncelik:** P0 / Must

- Form kayıtları email provider sonucundan bağımsızdır.
- Duplicate request ve retry davranışı değerlendirilir.
- User’a belirsiz success gösterilmez.
- Database migrations version-controlled olur.
- Kritik action failure izlenebilir olur.

### NFR-005 — Maintainability

**Öncelik:** P0 / Must

- Strict TypeScript
- Shared domain types
- Reusable design-system components
- Clear module boundaries
- Business rule duplication’ından kaçınma
- Documented environment variables
- Automated lint, type, unit ve selected E2E checks

### NFR-006 — Browser support

**Öncelik:** P1 / Should

Launch tarihinde güncel ana browser sürümleri ve makul geriye uyumluluk matrisi QA dokümanında kesinleştirilir. Destek dışı browser ana form akışını sessizce bozmamalıdır.

### NFR-007 — Observability

**Öncelik:** P0 / Must

Production errors, failed submissions, email failures ve permission anomalies kişisel veri sızdırmadan izlenebilir olmalıdır.

### NFR-008 — SEO crawlability

**Öncelik:** P0 / Must

Published product ve industry content server-rendered/indexable output sunmalı; admin, portal ve private files crawl dışı kalmalıdır.

### NFR-009 — Backup and recovery

**Öncelik:** P1 / Should

Production database ve critical document metadata için backup, restore ve recovery responsibility deployment dokümanında tanımlanmalıdır.

---

## 36. Release Gereksinim Matrisi

### 36.1 Foundation Release

Zorunlu sonuçlar:

- Repository ve environment foundation
- Domain-aware market/locale context
- Translation/content structure
- Design foundations
- Route skeleton
- Content workflow
- Technical data provenance direction
- Canonical asset path standardı
- CI quality checks

Ana requirement IDs:

MKT-001, MKT-003, PRD-004, MAP-002, MAP-003, CNT-001, SEC-006, NFR-005.

### 36.2 Public Website MVP

Zorunlu sonuçlar:

- Homepage ve corporate trust
- Products categories ve priority detail pages
- Industries listing/detail
- Bir pilot Application Map
- Technical Resources metadata
- About, contact ve project support
- Contact ve basic quote form
- Responsive ve accessible public UI
- UK production configuration
- Ukraine domain readiness ve visible market switcher
- Core SEO ve analytics

Ana requirement IDs:

PUB-001, PUB-002, PUB-004, PUB-005, PUB-006, MKT-002, PRD-001, PRD-003, IND-001, IND-002, MAP-001, RES-001, FRM-001, FRM-002, FRM-003, FRM-004, FRM-006, NTF-001, NTF-002, ANA-001, SEC-005, NFR-001, NFR-002, NFR-003, NFR-004, NFR-008.

### 36.3 Sales Operations MVP

Zorunlu sonuçlar:

- Comparator
- Project List ve multi-item quote
- Technical pack/document request
- Dealer application
- Persistence ve transactional emails
- Basic admin authentication
- Enquiry, quote ve dealer application views
- Owner, status, notes, next action
- Controlled document policy

Ana requirement IDs:

CMP-001–003, PQL-001–004, RES-002–003, FRM-005, FRM-007, DLR-001–002, ADM-001–002, ADM-004–005, QTE-001–002, SEC-003.

### 36.4 Ukraine Market Release

Zorunlu sonuçlar:

- Separate configured Ukraine .ua domain
- Ukrainian navigation ve core content
- Priority products ve industries
- Ukrainian forms ve email templates
- Market-specific contact, legal ve consent
- Resource visibility rules
- Canonical, sitemap ve hreflang
- Technical language review
- End-to-end admin attribution
- Localisable Application Map experience

Ana requirement IDs:

MKT-001–005, MAP-004, NTF-003 ve ilgili public requirement’ların uk-UA acceptance coverage’ı.

### 36.5 V1

Zorunlu hedef alanları:

- Full priority product library
- Additional approved Application Maps
- Companies and contacts
- Opportunities
- Supplier requests
- Document version/access
- Tasks/reminders
- Basic order tracking
- Approved partner access
- Basic dealer portal
- Reporting/export

Ana requirement IDs:

PRD-006, RES-004–005, DLR-003, ADM-003, COM-001–003, QTE-003–004, OPP-001–002, SUP-001–002, ORD-001–002, CNT-002, TSK-001–002, PRT-001–005, ANA-002–003, SEC-004.

---

## 37. MVP Dışında Tutulan Özellikler

Aşağıdaki yetenekler bu PRD’nin ilk delivery scope’unda yoktur:

- Public price list
- Public e-commerce checkout
- Card payment
- Full accounting
- Full stock/warehouse management
- Freight/customs management
- Production planning
- Native mobile application
- Autonomous sales agent veya public AI chatbot
- Full BIM/Revit library
- Heavy WebGL veya professional 3D catalogue
- Complex self-service order editing
- Automatic dealer approval
- Automatic commercial or technical commitment
- Uncontrolled public CAD, certificate, test report veya dealer price-list download

Bu maddeler yeni iş gerekçesi ve change control olmadan task olarak açılamaz.

---

## 38. İçerik Gereksinimleri

### 38.1 Production content standardı

Public içerik:

- Market ve locale’a uygun olmalıdır.
- Teknik source’a dayanmalıdır.
- Brand ve manufacturer relationship wording approval almalıdır.
- Görsel kullanım hakkına sahip olmalıdır.
- Placeholder veya AI-generated metni gerçek teknik bilgi gibi göstermemelidir.
- British English veya reviewed Ukrainian terminolojisi kullanmalıdır.

### 38.2 Product content readiness

Bir product detail production-ready sayılmadan önce en az:

- Approved name/category/series
- Short proposition
- Verified key technical data veya açık Available on request yaklaşımı
- Approved primary image
- At least one meaningful application/industry relation
- Relevant CTA
- Market/locale metadata
- Technical review state

bulunmalıdır.

### 38.3 Application Map readiness

Bir map production-ready sayılmadan önce:

- Approved base image
- Confirmed zones
- Confirmed hotspot-product mapping
- Localised labels
- Mobile alternative list
- Keyboard path
- Optimised assets
- Technical/brand review
- No embedded conflicting UI

bulunmalıdır.

---

## 39. Veri ve İş Kuralları

### BR-001

Public product price gösterilmez.

### BR-002

Project List bir shopping cart değildir; tax, shipping ve checkout toplamı üretmez.

### BR-003

Technical claim source veya approval olmadan verified olarak publish edilmez.

### BR-004

Market ve locale aynı kavram değildir; veri modeli ikisini gerektiğinde ayrı tutar.

### BR-005

Email gönderim hatası başarılı database submission’ını geri almaz.

### BR-006

Dealer application tek başına account, role veya document access oluşturmaz.

### BR-007

Project-specific document access role’den değil explicit project authorisation’dan doğar.

### BR-008

Archived veya superseded document yeni external access için varsayılan değildir.

### BR-009

Internal note external user’a gösterilmez.

### BR-010

UK içeriği Ukraine market’te otomatik published kabul edilmez.

### BR-011

Technical/commercial approval insan tarafından yapılır.

### BR-012

Source domain attribution client form field’ına güvenerek belirlenmez.

### BR-013

Application Map asset adı manifest dışı legacy filename’den çağrılmaz.

### BR-014

Kullanıcıya ait olmayan company/project kaydı URL bilgisi bilinse bile erişilemez.

---

## 40. Acceptance Test Katmanları

Her requirement riskine göre aşağıdaki kanıtların biri veya birkaçıyla doğrulanır:

| Katman | Kanıt |
|---|---|
| Product review | Requirement ve kullanıcı sonucu karşılanıyor |
| Content review | Copy, technical data, source ve approval doğru |
| UX review | Akış, empty/error/loading state ve responsive davranış doğru |
| Accessibility test | Keyboard, screen reader basics, focus, contrast ve errors |
| Unit test | Business rule ve pure logic |
| Integration test | Database, auth, storage, email boundary |
| E2E test | Ana kullanıcı yolculuğu |
| Security test | Permission, object access, private URL, abuse cases |
| SEO check | Canonical, metadata, sitemap, hreflang, crawl rules |
| Performance check | Budget ve real route davranışı |

P0 requirement yalnızca görsel olarak çalışıyor görünmesiyle Done kabul edilmez.

---

## 41. Kritik E2E Senaryoları

Launch öncesi en az şu senaryolar test edilmelidir:

1. UK visitor product keşfeder ve basic quote gönderir.
2. User Project List’e birden fazla item ekler ve structured quote gönderir.
3. Ukraine domain uk-UA content ve doğru market contact gösterir.
4. Ukraine form submission admin’de Ukraine olarak görünür.
5. Email provider hatasında submission admin’de kalır.
6. User controlled document request oluşturur.
7. Authorised partner signed document access alır.
8. Unauthorised user başka company document’ına erişemez.
9. Dealer applicant başvuru sonrası otomatik dealer role alamaz.
10. Application Map keyboard ve mobile alternative ile kullanılabilir.
11. Unpublished product search, sitemap veya related content’te görünmez.
12. Market switcher translated eşlenik yokken güvenli fallback uygular.

---

## 42. Success Metrics ve Ölçüm Tanımları

İlk 30–90 günlük gerçek trafik sonrasında baseline oluşturulur.

| Metric | Amaç | İlk tanım yönü |
|---|---|---|
| Qualified quote requests | Ticari niyeti ölçmek | Valid company/contact ve gerçek product/project context içeren request |
| Project List completion rate | Çok ürünlü talep başarısı | Liste başlatan kullanıcıların valid submission oranı |
| Technical resource request rate | Teknik talebi ölçmek | Eligible visits içinde valid request |
| Dealer application quality | Partner pipeline kalitesi | Review’a alınabilir eksiksiz başvuru oranı |
| First response time | Operasyon hızı | Submission ile ilk human response arasındaki süre |
| Overdue follow-ups | Operasyon disiplini | Due date geçmiş open action sayısı |
| Quote-to-opportunity | Talep kalitesi | Qualified quote’ların opportunity’ye dönüşümü |
| Opportunity-to-win | Ticari sonuç | Closed opportunity içinde won oranı |
| Supplier response time | Dış bağımlılık hızı | Sent request ile recorded response arası |
| Failed submissions | Teknik kalite | Valid kullanıcı denemesinde kaydedilemeyen submission |
| Permission incidents | Güvenlik | Yetkisiz veri erişimi veya yanlış document exposure |
| Market attribution completeness | Dual-market kalite | Market/locale/domain bilgisi eksiksiz commercial kayıt oranı |

Hedef sayılar gerçek baseline ve sales capacity görülmeden uydurulmaz.

---

## 43. Bağımlılıklar

### 43.1 Founder / business inputs

- Legal/company name format
- Gersan relationship wording
- Priority product groups
- Pilot Application Map selection
- UK ve Ukraine contact ownership
- Final Ukraine domain
- Dealer programme criteria
- Reference publication permissions

### 43.2 Technical content inputs

- Official product taxonomy
- Verified specifications
- Catalogues, datasheets ve certificates
- Document access classification
- Product and project images with rights
- Ukrainian technical terminology review
- Application Map hotspot-product confirmation

### 43.3 Operational inputs

- First admin users and roles
- Mailbox/provider choice
- Lead ownership and response SLA
- Privacy, cookie ve terms review
- Document approval owner
- Dealer approval process owner

---

## 44. Açık Product Kararları

| ID | Karar | Gerekli olduğu aşama | Owner |
|---|---|---|---|
| PD-001 | İlk priority product/category listesi | Before product content build | Founder + Technical Manager |
| PD-002 | Pilot Application Map sektörü | Before map UX/detail build | Founder |
| PD-003 | Ukraine-facing kesin domain | Before Ukraine DNS/release | Founder |
| PD-004 | Approved relationship wording | Before public corporate copy | Founder + legal/business reviewer |
| PD-005 | Public olabilecek sınırlı marketing documents | Before resource publish | Founder + Technical Manager |
| PD-006 | Initial admin users and roles | Before Sales Operations MVP | Founder |
| PD-007 | First-response service target | Before operational launch | Founder + Sales Owner |
| PD-008 | Quote PDF’nin MVP veya V1 konumu | Before quote workflow finalisation | Founder |
| PD-009 | Portal pilot company | Before V1 portal testing | Founder + Dealer Manager |
| PD-010 | Final form attachment allowlist | Before attachment enablement | Security + Operations |
| PD-011 | Ukrainian technical review owner | Before uk-UA publish | Founder |
| PD-012 | Map base image remediation plan | Before Ukraine map release | Design + Technical Manager |

Bu açık kararlar PRD yazımını engellemez; ilgili release gate öncesi kapatılmalıdır.

---

## 45. Risk ve Product Kontrolleri

| Risk | Product kontrolü |
|---|---|
| MVP’nin çok genişlemesi | P0/P1 scope ve release gate |
| Teknik bilginin yanlış olması | Source, review ve publish lifecycle |
| Private document exposure | Server-side access, signed URL ve audit |
| Dealer erişiminin yanlış verilmesi | Manual approval ve company scope |
| UK içeriğinin Ukraine’a yanlış kopyalanması | Market-specific publish |
| Görsel içinde tek dil ve embedded UI | Text-free base image + React overlay hedefi |
| AI-generated asset teknik hatası | review-required asset lifecycle |
| Form/email hatasında lead kaybı | Database-first persistence ve retryable notification |
| Admin’in ERP’ye dönüşmesi | Explicit out-of-scope listesi |
| Yanlış başarı değerlendirmesi | Qualified commercial metrics |
| Permission’ın yalnız UI ile uygulanması | Server-side authorisation acceptance |

---

## 46. Requirement Traceability Standardı

Her backlog item şu alanlara sahip olmalıdır:

- Requirement ID
- User outcome
- Release
- Priority
- Acceptance criteria
- Design reference
- Technical reference
- Content dependency
- Test evidence
- Owner
- Status

Bir feature birden fazla requirement karşılıyorsa bütün ID’ler task’a bağlanır. Requirement karşılamayan deneysel iş ayrı discovery task’i olarak etiketlenir.

---

## 47. Definition of Ready — Product Requirement

Bir feature development’a girmeden önce:

- Requirement ID ve user outcome açık
- Scope ve out-of-scope yazılı
- Priority ve release belli
- Acceptance criteria test edilebilir
- İlgili market/locale davranışı belli
- Content ve asset dependency listelenmiş
- Permission ve privacy etkisi değerlendirilmiş
- Loading, empty, error ve success state ihtiyacı belirtilmiş
- Tasarım veya flow referansı hazır
- Blocker product kararları kapanmış

olmalıdır.

---

## 48. Definition of Done — Product Requirement

Bir requirement tamamlandı sayılmadan önce:

- Acceptance criteria karşılanmış
- Responsive ve accessibility kontrol edilmiş
- en-GB ve gerekiyorsa uk-UA davranışı test edilmiş
- Permission ve data exposure kontrol edilmiş
- Analytics event gerekiyorsa uygulanmış ve doğrulanmış
- Error/loading/empty/success state çalışıyor
- Automated test kapsamı riske uygun
- Content ve technical approval alınmış
- Documentation güncellenmiş
- Preview ortamında Product Owner’a gösterilebilir
- Bilinen eksik veya risk açıkça kaydedilmiş

olmalıdır.

---

## 49. Product Gate 0 Kabul Kriterleri

Bu PRD onaylanmadan önce Founder şu sorulara cevap vermelidir:

- Kullanıcı grupları doğru mu?
- Public website ana yolculukları doğru mu?
- Comparator ve Project List davranışı doğru mu?
- Controlled document modeli kabul ediliyor mu?
- Dealer application ve manual approval doğru mu?
- Admin MVP küçük ekip için yeterli mi?
- UK ve Ukraine market davranışı doğru mu?
- Application Map asset ve localization yaklaşımı kabul ediliyor mu?
- Release sırası gerçekçi mi?
- MVP dışında bırakılan özellikler doğru mu?
- Açık karar listesi eksiksiz mi?

Onay sonrası bu belge Approved Baseline statüsüne alınır ve 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md hazırlanır.

---

## 50. Onay Kaydı

~~~text
Founder / Product Owner approval: Pending
Approved by:
Approval date:
Approved version:
Notes:
~~~

---

## 51. Sürüm Geçmişi

| Sürüm | Durum | Değişiklik |
|---|---|---|
| 0.1.0 | Current Draft | Master Spec kararlarından ilk ayrıntılı product requirements baseline oluşturuldu |

---

## 52. Son Karar

InfraVolt’un ürün gereksinimleri, brochure site üretmek yerine ürün keşfinden structured quotation’a, controlled document access’ten küçük ekip satış takibine kadar uçtan uca B2B görevleri çözmek üzere tanımlanmıştır.

Public Website MVP önce güven, keşif ve nitelikli talep oluşturacaktır. Sales Operations MVP bu taleplerin kaybolmadan işlenmesini sağlayacaktır. Ukraine Market Release aynı ürünün gerçek uk-UA ve market-specific deneyimini ayrı domain üzerinden sunacaktır. V1 ise company, project, supplier, order ve approved partner operasyonlarını kontrollü şekilde genişletecektir.

Bu PRD onaylanmadan ayrıntılı user flow, page architecture veya geniş feature implementation başlamamalıdır.
