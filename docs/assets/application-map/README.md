# InfraVolt Application Map Assets

> Package version: `1.0.0`  
> Source archive: `airport 1.rar`  
> Prepared: `15 July 2026`  
> Status: `Organised — technical and content review required before production`

## Amaç

Bu paket, InfraVolt Application Map, industry pages, product menus ve UI reference çalışmaları için gönderilen görsellerin proje standartlarına göre düzenlenmiş kopyasıdır.

Orijinal RAR değiştirilmemiştir. Canonical pakette:

- Dosya ve klasör adları `lowercase-kebab-case` standardına çevrildi.
- British English klasör adları kullanıldı (`data-centres`, `healthcare`).
- PNG görseller metadata temizlenerek WebP’ye dönüştürüldü.
- SVG ikonlar vector formatında korundu.
- Product icons ve action/document icons ayrı klasörlere ayrıldı.
- UI reference mockup’ları production Application Map asset’lerinden ayrıldı.
- Üç birebir aynı dosya tek canonical asset altında birleştirildi.
- Her eski ad ile yeni yol `manifests` klasöründe kaydedildi.

## Paket Özeti

```text
Source files:             106
Canonical output assets: 103
Raster WebP assets:        88
SVG assets:                15
Skipped exact duplicates:   3
```

## Projeye Eklenecek Klasör

`public/assets` klasörü doğrudan InfraVolt Next.js projesindeki `public/assets` altına birleştirilecek şekilde hazırlanmıştır.

```text
public/assets/
├── icons/
│   ├── actions/
│   └── products/
├── industries/
│   ├── commercial-buildings/
│   ├── data-centres/
│   ├── education-public-sector/
│   ├── healthcare/
│   ├── industrial-facilities/
│   ├── infrastructure-utilities/
│   ├── renewable-energy/
│   └── transport-infrastructure/
│       └── airport/
├── products/
│   └── thumbnails/
└── reference/
    └── ui-mockups/
```

## Industry Asset Yapısı

Her industry mümkün olduğunda şu düzene uyar:

```text
industry-slug/
├── overview/
│   └── industry-application-map-overview.webp
└── zones/
    └── industry-zone-name.webp
```

Airport ayrıca daha ayrıntılı görseller içerdiği için:

```text
transport-infrastructure/airport/
├── overview/
├── zones/
└── details/
```

## Reference Mockup Kuralı

`public/assets/reference/ui-mockups` altındaki dosyalar doğrudan production component içinde kullanılacak asset olarak kabul edilmez. Bunlar sayfa yerleşimi, menü, panel ve interaction tasarımı için referanstır.

## Manifest Dosyaları

### `manifests/asset-manifest.json`

Her asset için şunları içerir:

- Canonical ID
- Human-readable label
- Category and usage
- Original source path
- New target path
- Dimensions
- Source and output size
- SHA-256 hashes
- Publish-review status

### `manifests/asset-renames.csv`

Eski dosya adı → yeni proje yolu eşlemesini tablo formatında içerir.

## Görsel Optimizasyon

Raster dönüşüm ayarları:

```text
Output: WebP
Quality: 88
Metadata: stripped
Dimensions: original dimensions preserved
```

Uygulamada Next.js `Image` component ve doğru `sizes` değerleri kullanılmalıdır. Büyük Application Map görselleri ihtiyaç anında lazy-load edilmelidir.

## Production Kullanımından Önce

Bu paketteki AI-generated veya composited görseller teknik ve marka kontrolünden geçmelidir. Özellikle:

- Ürün temsilinin gerçek Gersan ürünüyle uyumu
- Embedded English text ve teknik ifadeler
- Ürün numaraları ile hotspot eşleşmeleri
- Standart/certificate ifadeleri
- Gersan ve InfraVolt logo kullanım izni
- UK ve Ukrainian localization gereksinimleri

Detaylar `ASSET_REVIEW_REQUIRED.md` dosyasında listelenmiştir.

