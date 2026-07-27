# Asset Review Required

Bu belge canonical asset paketindeki görsellerin production öncesinde kontrol edilmesi gereken noktaları kaydeder.

## 1. Genel Durum

Dosyalar başarıyla sınıflandırıldı, yeniden adlandırıldı ve optimize edildi. Ancak görsellerin büyük bölümü AI-generated veya UI-composite niteliğindedir. Dosya adının düzgün olması görselin teknik olarak onaylandığı anlamına gelmez.

Manifest içindeki raster asset’ler şu durumdadır:

```text
publishStatus: review-required
```

## 2. Embedded UI ve Hotspot Problemi

Birçok overview görselinde aşağıdaki öğeler doğrudan resmin içine gömülüdür:

- Left product menu
- Right product panel
- Hotspot numbers
- CTA buttons
- English titles and descriptions
- Carousel thumbnails
- Gersan / InfraVolt branding

Planlanan React Application Map de bu öğeleri dinamik component olarak oluşturacaktır. Görselin içine gömülü UI ile React UI birlikte kullanılırsa “UI içinde UI” görünümü oluşur.

### Önerilen production yaklaşımı

Her industry için mümkün olduğunda şu asset’ler hazırlanmalıdır:

```text
clean overview image without menus, panels or text
clean zone images without embedded labels
hotspot coordinates stored as data
labels and panels rendered as HTML/React
```

Bu yaklaşım responsive design, accessibility, analytics ve localization için gereklidir.

## 3. Ukrainian Localization

Görsellerin içindeki İngilizce metin browser tarafından Ukraynacaya çevrilemez. UK ve Ukraine siteleri aynı Application Map’i kullanacağı için iki seçenek vardır:

1. Tercih edilen: Metinsiz görseller + React üzerinde `en-GB` / `uk-UA` label ve panel content
2. Alternatif: Her görselin ayrı English ve Ukrainian versiyonunu üretmek

Tercih edilen yöntem birinci seçenektir. Bu, iki ayrı görsel kütüphanesinin zamanla birbirinden kopmasını engeller.

## 4. Technical Accuracy

Her görsel Technical Manager tarafından kontrol edilmelidir:

- Görseldeki ürün gerçekten belirtilen ürün grubu mu?
- Busbar, cable tray, ladder, panel, earthing ve lightning uygulamaları gerçekçi mi?
- Hotspot numarası ürün listesiyle eşleşiyor mu?
- “Surge / Lightning Protection” gibi birleşik ifadeler doğru bağlamda mı?
- Elektrik tesisatı ve safety görünümü yanlış veya riskli bir uygulama gösteriyor mu?
- Üreticiye ait olmayan ürün Gersan ürünü gibi gösteriliyor mu?

Kontrol edilmemiş görsel ürün datasheet veya compliance kanıtı olarak kullanılmamalıdır.

## 5. Embedded Copy ve Terminoloji

Bazı görsellerde:

- American English (`Data Center`) bulunuyor.
- British English proje standardıyla uyuşmayan ifadeler bulunabilir.
- Küçük metinlerde AI-generated yazım bozuklukları olabilir.
- CTA, belge ve sertifika adları gerçek sistem davranışını yansıtmayabilir.

Dosya yollarında British English standardı uygulandı; görsel içine gömülü metin değiştirilmedi.

## 6. Brand Review

Production öncesinde şu kontroller gereklidir:

- Gersan logo ve marka kullanım onayı
- InfraVolt logo’nun final versiyonuyla uyum
- “Official distributor” veya benzeri ima olup olmadığı
- Görseldeki ürünün üreticiyle doğru ilişkilendirilmesi

## 7. Eksik veya Tamamlanması Gereken Asset’ler

Mevcut SVG icon setinde açıkça bulunmayan veya ayrıca doğrulanması gerekenler:

- `icon-cable-ladder.svg`
- `icon-underfloor-trunking.svg`
- `icon-industrial-lighting.svg`
- `icon-surge-protection.svg`

Mevcut product thumbnail setinde ayrıca gerekebilecekler:

- Underfloor trunking
- Industrial lighting
- Dedicated G-BUS / LED-BUS variants
- Product-series-specific busbar images
- Final approved EV charging product image

Transport assets şu anda airport odaklıdır. Rail için ayrı Application Map istenirse rail overview ve zone görselleri hazırlanmalıdır.

## 8. Semantic Naming Review

Yeni semantic isimler görsel içeriğine göre atanmıştır. Aşağıdaki daha belirsiz sınıflandırmalar ilgili sektör uzmanı tarafından onaylanmalıdır:

- `airport-utility-building-zone`
- `airport-fuel-utility-zone`
- `healthcare-medical-equipment-room`
- `roadside-utilities-ev`
- `solar-bess-ev-service-area`

Değişiklik gerekirse manifest ve code references birlikte güncellenmelidir.

## 9. Duplicate Dosyalar

Üç birebir aynı PNG canonical pakette tekrar edilmemiştir:

- Renewable energy overview duplicate
- Airport terminal building zone duplicate
- EV charging product thumbnail duplicate

Eski ve yeni yollar `manifests/asset-renames.csv` içinde kayıtlıdır.

## 10. Onay Akışı

Önerilen durum akışı:

```text
review-required
→ technical-review
→ brand-review
→ localization-ready
→ approved-for-production
```

Sadece `approved-for-production` durumundaki asset’ler production content olarak yayınlanmalıdır.

