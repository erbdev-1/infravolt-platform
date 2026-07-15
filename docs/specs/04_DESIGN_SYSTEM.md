# InfraVolt — Design System

> Document ID: INF-04  
> Version: 0.1.0  
> Status: Draft for Founder Approval  
> Product Owner: Erhan Baydi — Founder / CEO  
> Design Owner: Product Design / UI Systems  
> Delivery Owner: Product Director / CTO / Head Agent  
> Parent documents: 00_MASTER_PROJECT_SPEC.md v0.2.0, 01_PRODUCT_REQUIREMENTS.md v0.1.0, 02_INFORMATION_ARCHITECTURE_AND_USER_FLOWS.md v0.1.0, 03_UI_UX_ARCHITECTURE.md v0.1.0  
> Design direction: Technical Clarity  
> Required markets: United Kingdom + Ukraine  
> Required locales: en-GB + uk-UA  
> Accessibility target: WCAG 2.2 AA  
> Last updated: 15 July 2026  
> Document language: Turkish; token, component, variant and state identifiers use English.

---

## 1. Belgenin Amacı

Bu belge InfraVolt’un public website, internal admin ve approved partner portalında kullanılacak ortak design system’i tanımlar.

Belge:

- Görsel dili kesin token’lara dönüştürür.
- Renk, typography, spacing, grid, radius, border, shadow ve motion değerlerini tanımlar.
- Public, admin ve portal component kurallarını birleştirir.
- Application Map’e özel UI primitives tanımlar.
- en-GB ve uk-UA içeriklerinin aynı component sisteminde çalışmasını sağlar.
- Accessibility ve contrast kullanımını component seviyesinde standartlaştırır.
- Figma ile frontend arasında ortak adlandırma ve handoff modeli kurar.

Bu belge tek tek sayfa tasarımı değildir. Screen layout ve flow kararları 03_UI_UX_ARCHITECTURE.md içindedir.

---

## 2. Design System Hedefleri

### 2.1 Birincil hedefler

- InfraVolt’u teknik, güvenilir ve premium B2B marka olarak göstermek
- Tasarım kararlarının ekranlar arasında tutarlı olmasını sağlamak
- Aynı component’leri public, admin ve portalda uygun density ile kullanmak
- Tasarım ve kod arasında token isimlerini eşlemek
- Accessibility’yi component’in varsayılan davranışı yapmak
- Ukrainian/Cyrillic içerik için yeniden tasarım ihtiyacını azaltmak
- Küçük ekibin hızlı fakat kontrollü teslimat yapmasını sağlamak

### 2.2 Başarı işaretleri

- Aynı amaç için birden fazla rastgele button/card/form varyantı oluşmaz.
- Yeni ekran mevcut primitives ve patterns ile oluşturulabilir.
- Component state’leri design ve code’da eşleşir.
- Renk kontrastı sonradan düzeltilecek sorun değildir.
- Admin daha yoğun olsa da başka ürün gibi görünmez.
- Application Map UI’ı görsel içine gömülü metne bağımlı olmaz.

---

## 3. Sistem Katmanları

~~~mermaid
flowchart TD
    A["Primitive Tokens"] --> B["Semantic Tokens"]
    B --> C["Component Tokens"]
    C --> D["Components"]
    D --> E["Patterns"]
    E --> F["Page Templates"]
    F --> G["Public, Admin and Portal Screens"]
~~~

### 3.1 Primitive tokens

Ham değerler:

- Colour scales
- Spacing values
- Font sizes
- Radius
- Shadow
- Duration

### 3.2 Semantic tokens

Amaca göre isimler:

- background-canvas
- text-primary
- border-default
- action-accent
- status-success

### 3.3 Component tokens

Component bağlamı:

- button-primary-background
- input-border-focus
- card-background
- nav-item-active

### 3.4 Kural

Screen implementation primitive hex veya spacing değerini doğrudan kullanmamalıdır. Semantic veya approved component token kullanılmalıdır.

---

## 4. Adlandırma Standardı

### 4.1 Token formatı

~~~text
category-role-state
~~~

Örnek:

~~~text
color-text-primary
color-surface-canvas
color-action-accent-hover
space-section-lg
radius-card
shadow-overlay
motion-duration-fast
~~~

### 4.2 Component formatı

~~~text
Component / Variant / Size / State
~~~

Figma örneği:

~~~text
Button / Primary / Medium / Default
Input / Text / Medium / Error
Card / Product / Default / Selected
Badge / Status / Small / Approved
~~~

Code component isimleri English PascalCase kullanır.

---

## 5. Brand Architecture

### 5.1 InfraVolt brand role

InfraVolt ana platform markasıdır.

Kullanım:

- Public header/footer
- Authentication
- Admin shell
- Portal shell
- Transactional document/email templates

### 5.2 Manufacturer brand role

Gersan veya başka manufacturer markası:

- Product content context’inde
- Approved relationship wording ile
- Kendi brand asset kullanım iznine uygun

gösterilir.

Manufacturer logosu InfraVolt logo yerine global shell brand’i olmaz.

### 5.3 Brand claim

Design system:

- Exclusive
- Official distributor
- Authorised partner

gibi relationship ifadelerini otomatik badge olarak üretmez. Copy yalnız approved content kaynağından gelir.

---

## 6. Logo Sistemi

Final logo source henüz design dependency’dir. Sistem aşağıdaki lockup’ları bekler:

| Lockup | Kullanım |
|---|---|
| Primary horizontal | Public desktop header, footer, documents |
| Compact horizontal | Mobile header, auth |
| Symbol/mark | Favicon, compact admin sidebar, app icon |
| Monochrome navy | Light surface |
| Monochrome white | Deep navy surface |

### 6.1 Clear space

Final logo geometry onaylanana kadar provisional clear space, logo mark yüksekliğinin en az yüzde 50’sidir.

### 6.2 Minimum size

Minimum width final logo legibility testinden sonra kesinleşir. Logo:

- Mobile header’da okunamayacak kadar küçültülmez.
- Favicon dışında yalnız symbol’e zorlanmaz.
- Distort edilmez.
- Shadow/glow almaz.
- Gradient içine gömülmez.

### 6.3 Logo background

Allowed:

- White
- Neutral 50
- Navy 900/950

Busy image üzerinde logo gerekiyorsa solid protective surface kullanılır.

### 6.4 Co-branding

InfraVolt ve manufacturer logosu:

- Eşit ilişki iddiası yaratmayacak layout’ta
- Approved clear space ile
- Separator veya context copy ile

gösterilir.

---

## 7. Colour Strategy

### 7.1 Roller

| Family | Rol |
|---|---|
| Navy | Trust, primary UI, headings, navigation |
| Red | InfraVolt accent, selected conversion CTA |
| Neutral | Backgrounds, text, borders, data surfaces |
| Blue | Informational state |
| Green | Success/approved/won |
| Amber | Warning/pending/attention |
| Danger red | Destructive/error |

### 7.2 Accent discipline

- Red her button için kullanılmaz.
- Default primary action navy’dir.
- Public conversion region’da tek accent CTA red olabilir.
- Admin’de red çoğunlukla destructive/error içindir.
- Bir section içinde navy primary ve red accent aynı önemde yarışmaz.

---

## 8. Navy Palette

| Token | Hex | Kullanım |
|---|---|---|
| navy-50 | #F3F8FB | Very light brand surface |
| navy-100 | #E2EEF5 | Selected/subtle surface |
| navy-200 | #BCD5E4 | Light border/decorative |
| navy-300 | #8BB6D0 | Decorative line |
| navy-400 | #5C97BC | Non-text visual |
| navy-500 | #3478A5 | Data visual/accent |
| navy-600 | #245D84 | Focus/info action |
| navy-700 | #1A4668 | Hover/strong accent |
| navy-800 | #12314D | Primary hover |
| navy-900 | #0B1F33 | Primary brand navy |
| navy-950 | #071521 | Deep footer/active |

Navy 900 baseline primary brand colour’dur.

---

## 9. InfraVolt Red Palette

| Token | Hex | Kullanım |
|---|---|---|
| red-50 | #FEF5F6 | Accent tint |
| red-100 | #FBE3E5 | Selected tint |
| red-200 | #F6BCC0 | Light border |
| red-300 | #F08A91 | Decorative |
| red-400 | #EB5962 | Decorative/data visual |
| red-500 | #E02B36 | Non-small-text accent |
| red-600 | #C81E2A | Main InfraVolt accent |
| red-700 | #AD1824 | Accent hover |
| red-800 | #911721 | Accent active |
| red-900 | #6E1018 | Deep accent |
| red-950 | #3F090E | Deepest accent |

Red 600 white text ile 5.71:1 contrast sağlar.

---

## 10. Neutral Palette

| Token | Hex | Kullanım |
|---|---|---|
| neutral-0 | #FFFFFF | Primary surface |
| neutral-50 | #F7F9FA | Canvas/subtle section |
| neutral-100 | #EDF1F4 | Disabled/subtle surface |
| neutral-200 | #D9E0E6 | Divider/light border |
| neutral-300 | #BCC6CF | Default control border |
| neutral-400 | #91A0AD | Decorative/icon disabled |
| neutral-500 | #6B7987 | Non-critical icon |
| neutral-600 | #526170 | Secondary accessible text |
| neutral-700 | #344250 | Strong secondary text |
| neutral-800 | #24313D | Body strong |
| neutral-900 | #17212B | Primary text alternative |
| neutral-950 | #0B1117 | Maximum text |

Neutral 600 white üzerinde 6.36:1 contrast sağlar ve secondary text baseline’ıdır.

---

## 11. Semantic Colours

### 11.1 Success

| Token | Value |
|---|---|
| success-foreground | #12633F |
| success-background | #EAF6EF |
| success-border | #8AC9A8 |
| success-solid | #12633F |

### 11.2 Warning

| Token | Value |
|---|---|
| warning-foreground | #7A3E00 |
| warning-background | #FFF6E6 |
| warning-border | #E8B25B |
| warning-solid | #9A5200 |

### 11.3 Information

| Token | Value |
|---|---|
| info-foreground | #185FA5 |
| info-background | #EFF7FF |
| info-border | #8FC2F0 |
| info-solid | #185FA5 |

### 11.4 Danger

| Token | Value |
|---|---|
| danger-foreground | #B42318 |
| danger-background | #FFF1F0 |
| danger-border | #FDA29B |
| danger-solid | #B42318 |

Danger ve brand red yakın görünür. Ayrım:

- Brand accent conversion context’inde
- Danger icon, wording ve confirmation ile destructive context’te

sağlanır.

---

## 12. Semantic Colour Tokens

| Token | Primitive |
|---|---|
| color-surface-canvas | neutral-50 |
| color-surface-primary | neutral-0 |
| color-surface-secondary | navy-50 |
| color-surface-inverse | navy-950 |
| color-surface-disabled | neutral-100 |
| color-text-primary | neutral-900 |
| color-text-secondary | neutral-600 |
| color-text-heading | navy-900 |
| color-text-inverse | neutral-0 |
| color-text-link | navy-700 |
| color-text-link-hover | red-700 |
| color-border-subtle | neutral-200 |
| color-border-default | neutral-300 |
| color-border-strong | neutral-500 |
| color-action-primary | navy-900 |
| color-action-primary-hover | navy-800 |
| color-action-primary-active | navy-950 |
| color-action-accent | red-600 |
| color-action-accent-hover | red-700 |
| color-action-accent-active | red-800 |
| color-focus-ring | navy-600 |

---

## 13. Approved Contrast Combinations

| Foreground | Background | Ratio | Kullanım |
|---|---|---:|---|
| #FFFFFF | #0B1F33 | 16.69:1 | Navy button/header |
| #FFFFFF | #C81E2A | 5.71:1 | Accent button |
| #FFFFFF | #AD1824 | 7.16:1 | Accent hover |
| #FFFFFF | #245D84 | 7.06:1 | Focused solid/info |
| #17212B | #FFFFFF | 16.29:1 | Primary body text |
| #526170 | #FFFFFF | 6.36:1 | Secondary text |
| #FFFFFF | #B42318 | 6.57:1 | Destructive button |
| #FFFFFF | #12633F | 7.29:1 | Success solid |
| #7A3E00 | #FFF6E6 | 7.78:1 | Warning alert |
| #185FA5 | #EFF7FF | 6.03:1 | Info alert |

### 13.1 Yasaklar

- Red 400 üzerine white small text
- Neutral 500 üzerine white text
- Navy 300 üzerine white text
- Colour-only status
- Placeholder için neutral 400

Placeholder ve helper text neutral 600 kullanır.

---

## 14. Surface Modes

### 14.1 Light mode

Ana ve varsayılan mode’dur.

- Canvas: neutral-50
- Cards: white
- Text: neutral-900/navy-900
- Borders: neutral-200/300

### 14.2 Inverse surface

Full dark theme değildir.

Kullanım:

- Footer
- Limited trust section
- Selected hero band
- Fullscreen map controls where required

Inverse:

- Background navy-950
- Primary text white
- Secondary text navy-200
- Link white/navy-100
- Accent red-500/600 only contrast confirmed state

### 14.3 Dark mode

User-selectable full dark mode MVP/V1 kapsamında değildir.

---

## 15. Typography Family

### 15.1 Primary typeface

**Inter Variable**

Kullanım:

- Public headings/body
- Admin
- Portal
- Forms
- Technical tables
- Ukrainian/Cyrillic content

### 15.2 Neden tek family

- Performance
- UI ve editorial consistency
- Latin/Cyrillic coverage
- Technical numerals readability
- Variable weights
- Small team maintainability

### 15.3 Weight set

| Token | Weight |
|---|---:|
| font-regular | 400 |
| font-medium | 500 |
| font-semibold | 600 |
| font-bold | 700 |

300 ve 800/900 production typography baseline’ında kullanılmaz.

### 15.4 Monospace

Reference number, code veya technical identifier için system monospace stack kullanılabilir. Uzun body copy monospace olmaz.

---

## 16. Typography Scale

### 16.1 Display and headings

| Token | Wide size/line | Compact size/line | Weight | Letter spacing |
|---|---|---|---:|---:|
| display-xl | 64/72 | 44/52 | 700 | -0.03em |
| display-lg | 56/64 | 40/48 | 700 | -0.025em |
| heading-1 | 48/56 | 36/44 | 700 | -0.02em |
| heading-2 | 36/44 | 30/38 | 700 | -0.015em |
| heading-3 | 28/36 | 24/32 | 600 | -0.01em |
| heading-4 | 22/30 | 20/28 | 600 | -0.005em |
| heading-5 | 18/26 | 18/26 | 600 | 0 |

### 16.2 Body and UI

| Token | Size/line | Weight baseline |
|---|---|---:|
| body-lg | 18/29 | 400 |
| body-md | 16/26 | 400 |
| body-sm | 14/22 | 400 |
| label-lg | 16/22 | 600 |
| label-md | 14/20 | 600 |
| label-sm | 12/18 | 600 |
| caption | 12/18 | 400 |
| overline | 12/16 | 600 |

### 16.3 Technical numerals

Tables ve metrics:

- Tabular numerals etkinleştirilebilir.
- Unit body-sm veya label-sm.
- Decimal alignment data table pattern’inde.

### 16.4 Text transformation

- Navigation all-caps olmaz.
- Overline kısa content için uppercase olabilir.
- Ukrainian text otomatik uppercase yapılmaz; editorial review gerekir.

---

## 17. Fluid Typography

Display ve H1 token’ları Compact–Wide arasında fluid clamp kullanabilir.

Örnek yön:

~~~css
--font-size-heading-1: clamp(2.25rem, 1.8rem + 1.8vw, 3rem);
--font-size-display-lg: clamp(2.5rem, 1.9rem + 2.4vw, 3.5rem);
~~~

Line-height component token ile birlikte değişir. Browser zoom davranışını engelleyen fixed viewport typography kullanılmaz.

---

## 18. Typography Usage

### 18.1 Public

- Display: Homepage hero only
- H1: Page title
- H2: Major section
- H3: Card group/subsection
- Body-lg: Intro/proposition
- Body-md: Main copy

### 18.2 Admin

- H1: heading-3 veya heading-4 visual size
- H2: heading-4/5
- Body-sm/md
- Label-md

Semantic HTML heading level visual token’dan bağımsız seçilir.

### 18.3 Portal

Public ve admin arasında:

- Page title heading-3
- Section heading heading-4
- Body-md

---

## 19. Spacing Scale

Base grid: 4 px.

| Token | Value |
|---|---:|
| space-0 | 0 |
| space-0-5 | 2 px |
| space-1 | 4 px |
| space-2 | 8 px |
| space-3 | 12 px |
| space-4 | 16 px |
| space-5 | 20 px |
| space-6 | 24 px |
| space-8 | 32 px |
| space-10 | 40 px |
| space-12 | 48 px |
| space-16 | 64 px |
| space-20 | 80 px |
| space-24 | 96 px |
| space-32 | 128 px |

### 19.1 Kurallar

- 6 px, 14 px, 18 px gibi arbitrary spacing yeni token olarak eklenmez.
- Icon optical alignment exception component içinde belgelenir.
- Negative spacing layout çözümü değildir.

---

## 20. Semantic Spacing

| Token | Compact | Wide | Kullanım |
|---|---:|---:|---|
| space-page-gutter | 16 px | 32 px | Outer content |
| space-section-sm | 48 px | 64 px | Compact section |
| space-section-md | 64 px | 80 px | Standard section |
| space-section-lg | 80 px | 112 px | Spacious section |
| space-card-padding | 20 px | 24 px | Standard card |
| space-card-padding-compact | 16 px | 16 px | Admin/card compact |
| space-form-group | 24 px | 24 px | Field group |
| space-stack-sm | 8 px | 8 px | Tight stack |
| space-stack-md | 16 px | 16 px | Standard stack |
| space-stack-lg | 24 px | 24 px | Large stack |

112 px primitive scale içinde yoksa semantic composite değer olarak yalnız section spacing’te kullanılabilir.

---

## 21. Breakpoints

| Token | Value | Semantic mode |
|---|---:|---|
| breakpoint-sm | 640 px | Compact enhancement |
| breakpoint-md | 768 px | Medium |
| breakpoint-lg | 1024 px | Wide |
| breakpoint-xl | 1280 px | Wide |
| breakpoint-2xl | 1536 px | Expanded |

### 21.1 Kural

Component yalnız global breakpoint’e göre değil, content need’e göre responsive davranabilir. Container query kullanımı teknik mimaride değerlendirilebilir.

---

## 22. Grid

| Range | Columns | Gutter | Gap |
|---|---:|---:|---:|
| 320–767 | 4 | 16 px | 16 px |
| 768–1023 | 8 | 24 px | 20 px |
| 1024–1439 | 12 | 32 px | 24 px |
| 1440+ | 12 | 40 px | 24–32 px |

### 22.1 Containers

| Token | Max width |
|---|---:|
| container-reading | 760 px |
| container-form | 840 px |
| container-standard | 1200 px |
| container-wide | 1440 px |
| container-full | none |

Admin main content, sidebar çıktıktan sonra available width’i kullanır; 1440 px hard max gerekmez.

---

## 23. Border Tokens

| Token | Value |
|---|---|
| border-width-default | 1 px |
| border-width-strong | 2 px |
| border-subtle | neutral-200 |
| border-default | neutral-300 |
| border-strong | neutral-500 |
| border-focus | navy-600 |
| border-error | danger-foreground |

Hairline 0.5 px kullanılmaz.

---

## 24. Radius Tokens

| Token | Value | Kullanım |
|---|---:|---|
| radius-none | 0 | Tables/dividers |
| radius-xs | 4 px | Small tags |
| radius-sm | 6 px | Compact controls |
| radius-md | 8 px | Buttons/inputs |
| radius-lg | 12 px | Cards/panels |
| radius-xl | 16 px | Large media/promo |
| radius-pill | 9999 px | Badge/avatar only |

### 24.1 Karakter

InfraVolt aşırı rounded startup görünümü kullanmaz. Standard card radius 12 px’i geçmez; büyük editorial media 16 px olabilir.

---

## 25. Shadow Tokens

| Token | CSS direction | Kullanım |
|---|---|---|
| shadow-none | none | Default cards |
| shadow-xs | 0 1px 2px rgba(7,21,33,0.06) | Raised control |
| shadow-sm | 0 4px 12px rgba(7,21,33,0.08) | Hover/compact panel |
| shadow-md | 0 12px 28px rgba(7,21,33,0.12) | Drawer/popover |
| shadow-lg | 0 24px 56px rgba(7,21,33,0.18) | Modal |

Default card border kullanır; her card shadow almaz.

---

## 26. Focus Ring

### 26.1 Default

- 2 px navy-600 outer ring
- 2 px surface offset
- Border replacement değil, ek focus indicator

### 26.2 Dark/inverse

- 2 px white inner outline
- 2 px navy-400 outer ring

### 26.3 Rules

- Focus ring mouse click’te tamamen yasaklanmaz; focus-visible uygulanır.
- Sticky header focus target’ı kapatmaz.
- Error border focus ring’in yerine geçmez.

---

## 27. Opacity Tokens

| Token | Value | Kullanım |
|---|---:|---|
| opacity-muted | 0.72 | Decorative only |
| opacity-disabled | 0.56 | Disabled control plus semantic state |
| opacity-overlay | 0.64 | Modal scrim |
| opacity-skeleton | 0.55 | Skeleton |

Text contrast yalnız opacity ile düşürülmez; semantic colour kullanılır.

---

## 28. Iconography

### 28.1 General icon set

Baseline UI icon library:

**Lucide**

Kullanım:

- Navigation
- Controls
- Status support
- Admin actions
- Form affordances

### 28.2 Style

- Outline
- 1.75–2 px stroke
- Round linecap/join
- No mixed filled/3D icon set

### 28.3 Sizes

| Token | Value |
|---|---:|
| icon-xs | 14 px |
| icon-sm | 16 px |
| icon-md | 20 px |
| icon-lg | 24 px |
| icon-xl | 32 px |
| icon-product | 40–48 px |

### 28.4 Accessibility

- Icon-only button accessible name taşır.
- Decorative icon aria-hidden olur.
- Status icon text label ile birlikte kullanılır.
- Tooltip icon label’ın yerine geçmez.

---

## 29. Domain-Specific Icons

Canonical custom icon source:

~~~text
public/assets/icons/actions
public/assets/icons/products
~~~

Approved action icon candidates:

- CAD
- Download
- PDF
- Question
- Quote
- Technical Pack

Approved/reviewed product icon candidates:

- Busbar
- Cable Tray
- Distribution Panel
- Earthing
- EV Charging
- Lighting Busbar
- Lightning
- Outdoor Enclosure
- Support System

### 29.1 Missing icon policy

Missing product icon Lucide generic icon ile teknik olarak yanlış temsil edilmez. Temporary neutral placeholder yalnız draft/admin preview’da kullanılabilir.

---

## 30. Illustration ve Technical Graphic Style

- Clean linework
- Navy/neutral base
- Red selected accent
- Minimal gradients
- No fake isometric 3D unless approved
- Labels HTML/React when interactive
- Diagram legend readable
- Engineering accuracy review

Technical graphic decorative illustration gibi serbestçe değiştirilmez.

---

## 31. Image Treatment

### 31.1 Product

- White/neutral background
- Object contain
- No aggressive crop
- Optional subtle frame

### 31.2 Industry

- Object cover
- Focal point
- Dark overlay only when text on image is unavoidable
- Prefer text outside image

### 31.3 Reference

- Real approved project image
- Editorial crop
- Caption/source where needed

### 31.4 AI-generated asset

- review-required
- Real product/reference gibi yanlış sunulmaz
- Technical, brand ve rights review

---

## 32. Aspect Ratio Tokens

| Token | Ratio | Kullanım |
|---|---|---|
| ratio-square | 1:1 | Product thumbnail/icon |
| ratio-product | 4:3 | Product cards |
| ratio-industry | 3:2 | Industry/reference cards |
| ratio-hero | 16:9 | Hero/context visual |
| ratio-map | source-defined wide | Application Map |
| ratio-avatar | 1:1 | User avatar |

Layout ratio reserve eder; image load sonrası shift oluşmaz.

---

## 33. Motion Tokens

### 33.1 Duration

| Token | Value |
|---|---:|
| motion-instant | 0 ms |
| motion-fast | 100 ms |
| motion-short | 150 ms |
| motion-base | 200 ms |
| motion-slow | 300 ms |

### 33.2 Easing

| Token | Value |
|---|---|
| ease-standard | cubic-bezier(0.2, 0, 0, 1) |
| ease-enter | cubic-bezier(0, 0, 0.2, 1) |
| ease-exit | cubic-bezier(0.4, 0, 1, 1) |

### 33.3 Component mapping

- Button/state: 100–150 ms
- Dropdown/popover: 150–200 ms
- Drawer/modal: 200–300 ms
- Map selection: 150–200 ms

### 33.4 Reduced motion

- Transform distance kaldırılır.
- Duration instant veya 50 ms fade.
- Auto movement yok.
- State change content ile anlaşılır.

---

## 34. Z-Index Scale

| Token | Value | Layer |
|---|---:|---|
| z-base | 0 | Content |
| z-raised | 10 | Card/control |
| z-sticky | 100 | Header/table header |
| z-dropdown | 200 | Menu/popover |
| z-overlay | 300 | Scrim/drawer |
| z-modal | 400 | Modal |
| z-toast | 500 | Toast |
| z-skip | 600 | Skip link/critical accessibility |

Arbitrary 9999 kullanılmaz; radius-pill değeriyle karıştırılmaz.

---

## 35. Density Modes

| Mode | Kullanım | Control baseline |
|---|---|---|
| Comfortable | Public/portal | 44–48 px |
| Standard | Forms/public data | 44 px |
| Compact | Admin dense views | 36–40 px where safe |

Touch environment’ta compact control hit area 44 px’e tamamlanır.

Density user setting MVP’de yoktur.

---

## 36. Button Component

### 36.1 Variants

| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | navy-900 | white | navy-900 |
| Accent | red-600 | white | red-600 |
| Secondary | white | navy-900 | navy-300 |
| Ghost | transparent | navy-900 | transparent |
| Destructive | danger-solid | white | danger-solid |
| Inverse | white | navy-950 | white |
| Link | transparent | navy-700 | none |

### 36.2 States

| State | Davranış |
|---|---|
| Hover | Darker bg veya subtle surface |
| Active | Stronger tone, no scale jump |
| Focus-visible | Approved focus ring |
| Disabled | Disabled surface/text + native disabled |
| Loading | Spinner/progress + stable label width |
| Success temporary | Optional icon; permanent state değil |

### 36.3 Sizes

| Size | Height | Horizontal padding | Label |
|---|---:|---:|---|
| Small | 36 px | 12 px | label-md |
| Medium | 44 px | 16 px | label-md |
| Large | 48 px | 20 px | label-lg |

Small yalnız compact admin veya inline context içindir.

### 36.4 Icon rules

- Icon-label gap 8 px
- Leading/trailing icon 16–20 px
- Icon-only button 44 px hit area baseline
- Loading icon label’ı tamamen değiştirmez; action context korunur

### 36.5 Accent button rule

Viewport region başına en fazla bir Accent button.

Public examples:

- Request a Quote
- Submit Project Request

Admin primary save Navy kalır; destructive Danger kullanır.

---

## 37. Link Component

Variants:

- Inline link
- Navigation link
- Standalone action link
- Inverse link

Rules:

- Underline inline content’te default veya hover/focus’ta güçlü görünür.
- Link button action yerine kullanılmaz.
- External link indicator bağlama göre.
- Visited state legal/resource browsing için değerlendirilebilir; navigation brand colour bozulmaz.

---

## 38. Form Label

- label-md
- neutral-900
- Required indicator text/symbol
- Optional text neutral-600
- Help text body-sm
- Error text body-sm danger

Required anlamı yalnız red asterisk ile verilmez; form intro standardı açıklar.

---

## 39. Text Input

### 39.1 Anatomy

1. Label
2. Optional help
3. Input container
4. Prefix/suffix
5. Error or success message

### 39.2 Tokens

| Property | Default |
|---|---|
| Height | 44 px |
| Large height | 48 px |
| Compact height | 40 px |
| Radius | 8 px |
| Border | neutral-300 |
| Background | white |
| Text | neutral-900 |
| Placeholder | neutral-600 |
| Focus | navy-600 ring |
| Error | danger border + message |
| Disabled | neutral-100 + neutral-600 |

### 39.3 Rules

- Placeholder label değildir.
- Error icon optional, text mandatory.
- Prefix currency public price için kullanılmaz.
- Browser autofill görünümü token’larla uyarlanır.

---

## 40. Textarea

- Minimum height 120 px
- Resize vertical
- Character guidance only real limit varsa
- Counter limit yakınında görünür
- Technical question examples help text olarak
- Rich text public form baseline değildir

---

## 41. Select ve Combobox

### 41.1 Select

Küçük, static option set.

### 41.2 Combobox

Searchable long list:

- Products
- Companies
- Documents
- Countries/regions

### 41.3 Rules

- Native select mobile’da değerlendirilebilir.
- Search input, listbox semantics ve active option uygulanır.
- No-result state.
- Loading state.
- Multi-select chip overflow controlled.

---

## 42. Checkbox, Radio ve Switch

### 42.1 Checkbox

- Visual control 20 px
- Hit area minimum 44 px
- Label click target
- Indeterminate state
- Error group message

### 42.2 Radio

- Mutually exclusive short set
- Vertical list mobile baseline
- Clear legend

### 42.3 Switch

Anlık preference:

- Notification preference
- View option

Form submission gerektiren legal/critical choice switch olmaz.

---

## 43. Date, Quantity ve Unit Controls

### 43.1 Date

- Locale-aware display
- ISO storage implementation detail
- Manual entry accessible
- Calendar popover keyboard

### 43.2 Quantity

- Number input or text depending product rules
- Negative blocked
- Decimal support unit’e göre
- Stepper button varsa 44 px target

### 43.3 Unit

- Explicit select/label
- Quantity ile aynı row Wide/Medium
- Compact’ta readable group

---

## 44. File Upload

States:

- Empty
- Drag active
- Uploading
- Uploaded
- Error
- Rejected
- Removing

Anatomy:

- Label
- Allowed file types/size
- Drop zone
- Browse button
- File list
- Progress
- Error

Rules:

- Drag-and-drop tek yöntem değildir.
- Private upload açıklanır.
- Filename wrap olur.
- Remove action accessible.
- Active content file warning backend policy’ye bağlıdır.

---

## 45. Form Group ve Fieldset

- Related fields fieldset/legend kullanır.
- Visual group heading semantic legend yerine geçmez.
- Group spacing 24–32 px.
- Address/company/project sections card’a alınabilir.
- Her field ayrı card olmaz.

---

## 46. Error Summary

Tokens:

- Danger background
- Danger border
- Danger foreground
- Alert icon
- Heading
- Anchor list

Behaviour:

- Submit sonrası focus alır.
- Error count.
- Field links.
- Live region kontrollü.
- Server/global error field error’dan ayrılır.

---

## 47. Step Indicator

Variants:

- Horizontal Wide
- Compact text progress
- Vertical complex flow, future

States:

- Current
- Completed
- Upcoming
- Error

Rules:

- Number + label
- Current semantic
- Click navigation yalnız safe completed steps
- Progress bar colour-only değil

---

## 48. Card Foundations

### 48.1 Base card

| Property | Value |
|---|---|
| Background | white |
| Border | neutral-200 |
| Radius | 12 px |
| Shadow | none |
| Padding | 20–24 px |

### 48.2 States

- Hover: border navy-300 or shadow-xs
- Focus-within: focus ring where whole card link
- Selected: navy-100 background + navy-600 border
- Disabled/unavailable: neutral-50 + explanation

### 48.3 Rules

- Nested controls semantic olarak ayrılır.
- Whole-card click visible link structure taşır.
- Fixed height text clipping yok.

---

## 49. Product Card

Anatomy:

1. Product media
2. Category/series eyebrow
3. Product name
4. Short descriptor
5. Verified facts
6. View details
7. Compare
8. Add to Project List

Variants:

- Standard grid
- Compact list
- Related product
- Comparator selector

State badges:

- In Project List
- In Comparison
- Market unavailable

Fiyat alanı yoktur.

---

## 50. Industry Card

- 3:2 image
- Industry name
- Short context
- Map available badge only if real
- Explore solutions action

Text image üzerine baseline olarak bindirilmez.

---

## 51. Resource Card/Row

- Document type icon
- Title
- Related item
- Language
- Version/date
- Format/size
- Access badge
- View/request action

Variants:

- Card grid
- Table/list row
- Portal document row

Private URL component prop olarak alınmaz; action callback/endpoint kullanır.

---

## 52. Reference Card

- Approved image
- Industry/project type
- Title
- Scope summary
- Related systems
- View reference

Permission yoksa customer logo placeholder gösterilmez.

---

## 53. Badge System

### 53.1 Types

- Neutral
- Brand
- Information
- Success
- Warning
- Danger
- Access
- Market

### 53.2 Sizes

- Small: 20–22 px
- Medium: 24–28 px

### 53.3 Rules

- label-sm/caption
- Pill radius allowed
- Icon optional
- Colour + text
- Sentence badge içine konmaz

---

## 54. Status Mapping

### 54.1 Generic

| Meaning | Style |
|---|---|
| New | Information |
| In progress | Brand |
| Waiting/Pending | Warning |
| Approved/Completed/Won | Success |
| Rejected/Lost/Error | Danger |
| Archived/Inactive | Neutral |

### 54.2 Separation

Database enum doğrudan badge label olmaz. Localised user-facing mapping kullanılır.

Internal:

- supplier_input_required

Customer-facing:

- Under technical review

gibi farklı olabilir.

---

## 55. Alert

Variants:

- Info
- Success
- Warning
- Error
- Neutral

Anatomy:

- Icon
- Title optional
- Message
- Action optional
- Dismiss optional

Alert background semantic tint, border ve readable foreground kullanır.

---

## 56. Toast

Position:

- Desktop top-right veya bottom-right
- Mobile bottom safe area üstü

Variants:

- Success
- Info
- Warning
- Error

Rules:

- Critical error yalnız toast olmaz.
- Max 3 visible.
- Auto-dismiss 5–8 seconds content length’e göre.
- Pause on hover/focus.
- Close accessible.
- Add to Project List action undo/view link taşıyabilir.

---

## 57. Tooltip

- Max width approximately 280 px
- Body-sm
- Neutral 900/inverse
- 150–300 ms intentional delay
- Hover + focus
- Essential instructions yok
- Interactive content tooltip içinde yok; popover kullanılır

---

## 58. Popover

- White surface
- Neutral border
- Radius 8–12
- Shadow-md
- Arrow optional
- Focus management
- Outside click and Escape

Use:

- Date picker
- Quick select
- Short context

---

## 59. Modal

Sizes:

| Token | Max width |
|---|---:|
| modal-sm | 480 px |
| modal-md | 640 px |
| modal-lg | 800 px |

Rules:

- Max viewport height + internal scroll
- Heading
- Close
- Focus trap
- Escape except critical irreversible confirmation with explicit handling
- Focus return
- Scrim opacity token
- Long application form modal değil

---

## 60. Drawer

Variants:

- Right desktop
- Bottom mobile
- Full-height mobile navigation

Widths:

- Compact detail: 360–420 px
- Standard: 480–560 px
- Mobile: viewport width

Uses:

- Filters
- Map product panel Medium
- Quick admin preview
- Mobile navigation

---

## 61. Tabs

Anatomy:

- Tab list
- Tab
- Active indicator
- Panel

Rules:

- Keyboard arrow navigation
- Active text + indicator
- Overflow scroll or select fallback
- URL state if deep-link value
- Critical public SEO content baseline tabs’a saklanmaz

---

## 62. Accordion

- Header button
- Chevron
- Panel
- Expanded state
- Focus ring

Uses:

- Mobile footer
- FAQ
- Technical secondary details
- Mobile filter groups

Content height animation reduced-motion uyumlu.

---

## 63. Breadcrumb

- body-sm
- Home optional icon + text accessible
- Separator chevron
- Current page neutral-600
- Links navy-700
- Mobile overflow/truncation carefully
- Structured hierarchy

Breadcrumb H1 yerine geçmez.

---

## 64. Pagination

Variants:

- Full page numbers
- Previous/next compact

Rules:

- Current page semantic
- Disabled first/last
- Minimum target
- Result range text
- Infinite scroll admin/public baseline değildir

---

## 65. Table Foundations

### 65.1 Public technical table

- Header navy-50/neutral-50
- Border neutral-200
- Row minimum 48 px
- Label strong
- Value/unit clear

### 65.2 Admin table

- Header 40–44 px
- Row 48–56 px
- Compact optional 44 px
- Hover neutral-50
- Selected navy-50
- Sticky header shadow-xs

### 65.3 Alignment

- Text left
- Numbers right when comparable
- Status left
- Actions right
- Date consistent

### 65.4 Accessibility

- Caption
- Column header scope
- Sort state
- Row action labels
- Mobile card relationship preserved

---

## 66. Data Table Controls

- Search
- Filter
- Sort
- Column visibility, V1 only if needed
- Pagination
- Export permission-aware
- Bulk action only real workflow

Filter chips:

- Label + value
- Remove
- Clear all

---

## 67. Skeleton

Primitive:

- Neutral-100 base
- Neutral-200 subtle shimmer
- Radius matching content
- Reduced motion static

Rules:

- Exact false text line repetition yok
- Stable layout
- Maximum reasonable duration before status message
- Map skeleton alternative list’i engellemez

---

## 68. Spinner ve Progress

Spinner sizes:

- 16 px button
- 20–24 px inline
- 32 px page section

Progress:

- Determinate upload
- Indeterminate action
- Text status

Full-page spinner tek başına baseline değildir.

---

## 69. Empty State

Anatomy:

- Optional simple icon
- Heading
- Explanation
- Primary next step
- Secondary support

Variants:

- Discovery
- No filters
- First record
- No permission-visible data

No cartoon illustration requirement.

---

## 70. Navigation Components

### 70.1 Utility bar

- Height: 32 px Wide
- Navy-950 or navy-50 context
- label-sm

### 70.2 Primary header

- Height: 72 px Wide
- Sticky compact: 64 px
- Mobile: 64 px
- White surface
- Border bottom neutral-200

### 70.3 Nav item

- Height minimum 44 px interaction
- label-md
- Navy text
- Active indicator 2 px red or navy based context

### 70.4 Mega-menu

- Standard/wide container
- White surface
- Border/shadow-md
- 2–4 content columns
- Maximum readable group

---

## 71. Mobile Navigation Component

- Full viewport drawer
- Header 64 px
- Primary links label-lg
- Child links body-md
- Accordion/drill pattern
- Footer utility items
- Project List count
- Market switch text
- Focus trap
- Safe-area padding

---

## 72. Footer Component

- Navy-950
- White primary text
- Navy-200 secondary
- Red accent limited
- Column gap
- Legal bottom row border navy-800
- Mobile accordion headings white

Footer link minimum touch height Compact mode’da sağlanır.

---

## 73. Market Switcher

Variants:

- Utility inline
- Mobile full row
- Account/menu

Anatomy:

- Current market text
- Current locale text
- Chevron
- Options with market + language

Rules:

- Flag-only değil
- UK / English
- Ukraine / Українська final copy review
- Equivalent missing notice ayrı alert

---

## 74. Search Component

Variants:

- Header trigger
- Full search input
- Admin global search

States:

- Idle
- Typing
- Loading
- Results
- No result
- Error

Search clear button accessible.

---

## 75. Project List Indicator

- Header action
- Project List icon
- Text Wide
- Count badge
- No price total
- Empty count hidden or zero policy consistent
- Add animation restrained

Count 99+ visual cap olabilir; actual accessible name doğru count veya safe label verir.

---

## 76. Comparison Tray

Wide:

- Bottom fixed or inline panel
- Selected thumbnails/names
- Count
- Compare action
- Clear

Compact:

- Small sticky bar
- Count
- View comparison

Tray cookie banner/mobile CTA ile overlap etmez.

---

## 77. Project List Item

- Product thumbnail
- Name/series
- Variant
- Quantity/unit
- Note
- Availability
- Remove

Wide edit inline; Compact fields stacked.

Historical submitted item component current product card’dan ayrıdır.

---

## 78. Specification Table

Variants:

- Standard grouped
- Compact summary
- Comparator matrix

Tokens:

- Group heading navy-50
- Label neutral-700
- Value neutral-900
- Unit neutral-600
- Border neutral-200

Missing value:

- Available on request
- Not provided

Uydurulmuş dash anlamı belirsiz bırakılmaz; legend/context kullanılır.

---

## 79. Document Access Panel

States:

- Lead capture
- Login required
- Approval pending
- Approved partner
- Dealer
- Project-specific
- Expired/revoked
- Admin-only

Anatomy:

- Access badge
- Explanation
- User/company context when authenticated
- Primary action
- Support path

Permanent file URL component state’inde tutulmaz.

---

## 80. Application Map Foundations

### 80.1 Component family

- ApplicationMapShell
- ApplicationMapCanvas
- ApplicationMapMenu
- ApplicationMapHotspot
- ApplicationMapPanel
- ApplicationMapZoneList
- ApplicationMapControls
- ApplicationMapFallbackList

### 80.2 Surface

- Outer background neutral-100/navy-950 based display
- Canvas framed by neutral-200
- Panel white
- Controls white/navy-900

---

## 81. Application Map Hotspot

| Property | Default |
|---|---|
| Visual size | 28 px |
| Selected visual | 32 px |
| Hit target | Minimum 44 px |
| Default fill | navy-900 |
| Selected fill | red-600 |
| Text | white |
| Border | white 2 px |
| Shadow | shadow-sm |

States:

- Default
- Hover
- Focus
- Selected
- Disabled/unavailable

### 81.1 Rules

- Number/short symbol
- Accessible name includes product/zone
- Position data-driven
- Focus marker canvas üzerinde görünür
- Hover-only preview yok

---

## 82. Application Map Menu

- Row minimum 44 px
- Product icon 24–32 px
- Label body-sm/md
- Selected navy-50 + navy border or red indicator
- Category grouping
- Search/filter only list complexity justifies
- Mobile accordion/list

---

## 83. Application Map Panel

Wide:

- Provisional 340–380 px width
- White surface
- Padding 24 px
- Scroll only content exceeds viewport

Anatomy:

- Close/clear
- Product icon/image
- Product/system name
- Zone/application
- Short copy
- View Product
- Request Technical Pack
- Add to Project List
- Discuss Project

Bir panelde bir Accent CTA’dan fazla olmaz.

---

## 84. Application Map Controls

- Reset
- Zoom only if needed
- Fullscreen
- Alternative list
- Help

Icon-only control:

- 44 px
- Tooltip
- Accessible name
- High contrast over image

Control group canvas edge safe area’ya uyar.

---

## 85. Application Map Asset Status

Visible admin/design badge:

- Review Required
- Technical Review
- Brand Review
- Localization Ready
- Approved for Production

Public UI asset status badge göstermez; yalnız approved asset render eder.

Canonical path asset-manifest.json üzerinden gelir.

---

## 86. Admin Shell Tokens

| Token | Value |
|---|---|
| admin-sidebar-width | 256 px |
| admin-sidebar-collapsed | 72 px, V1 optional |
| admin-topbar-height | 64 px |
| admin-content-padding-compact | 16 px |
| admin-content-padding-wide | 24–32 px |
| admin-canvas | neutral-50 |
| admin-panel | white |

Sidebar:

- Navy-950 or white mode
- Baseline recommendation navy-950
- Active item navy-800 + white
- Count badge semantic

---

## 87. Admin Sidebar Item

- Height 44 px
- Icon 20 px
- Label body-sm/label-md
- Group heading label-sm
- Active text + background + indicator
- Focus inverse ring
- Permission-hidden route not rendered

Collapsed mode icon tooltip/accessibility gerektirir.

---

## 88. Admin Page Header

Anatomy:

- Breadcrumb optional
- H1
- Reference/status
- Market
- Owner
- Primary action
- More menu

Compact:

- Actions overflow menu’ye taşınır
- Primary action görünür kalır

---

## 89. Dashboard Metric Card

- Label
- Count/value
- Comparison only reliable baseline varsa
- Status/urgency
- View queue

No decorative chart if count sufficient.

Variants:

- Neutral
- Attention
- Critical
- Positive

Critical card entire background red olmaz; border/icon/text semantic kullanır.

---

## 90. Filter Bar

Wide:

- Search
- Primary filters
- More filters
- Active chips
- Clear

Compact:

- Search
- Filter drawer trigger
- Count

Filter apply behaviour list size/query cost’e göre instant veya explicit olur; aynı module içinde tutarlı kalır.

---

## 91. Record Header

- Entity type
- Title/reference
- Status
- Market
- Owner
- Next action/due
- Primary transition
- More

Status transition dropdown tek click ile irreversible işlem yapmaz.

---

## 92. Activity Timeline

Item anatomy:

- Event icon
- Actor
- Action
- Date/time
- Detail
- Related file/link

Rules:

- Most recent first baseline
- Audit event edit olmaz
- Internal/customer-visible distinction
- Long notes collapse with accessible expand

---

## 93. Note Composer

- Internal note badge
- Textarea
- Attachment optional
- Save
- Visibility explicit

Customer-visible message ayrı component ve permission kullanır. Default internal’dır; silent visibility switch yoktur.

---

## 94. Portal Shell Tokens

| Token | Value |
|---|---|
| portal-nav-width | 240 px |
| portal-topbar-height | 64 px |
| portal-canvas | neutral-50 |
| portal-panel | white |
| portal-header | white |

Portal comfortable/standard density kullanır.

---

## 95. Portal Summary Card

- Reference
- Customer-visible status
- Short summary
- Date/milestone
- View detail

Internal fields component API’sine dahil edilmez.

---

## 96. Avatar ve User Menu

Avatar:

- Initials baseline
- Optional approved image
- 32/40 px
- Neutral/navy surface

User menu:

- Name
- Company/role safe label
- Account
- Sign out

Role escalation action user menu’de olmaz.

---

## 97. Data Visualisation Palette

V1 reports için provisional categorical palette:

1. Navy 700
2. Blue #2F74C0
3. Teal #0F766E
4. Amber #B76A00
5. Purple #6D5BD0
6. Red 600

Rules:

- Legend
- Direct label where possible
- Pattern/shape alternative
- Colour-only meaning yok
- Market UK/Ukraine consistent mapping
- Small sample chart ile yanıltıcı trend yok

---

## 98. Print Styles

Print-friendly:

- Legal pages
- Product specifications
- Resource metadata
- Admin internal quote summary if approved

Print rules:

- Navigation/footer simplified
- URL/date optional
- Background ink reduced
- Tables repeat header
- Private watermark/access context where needed

Public quotation PDF ayrı workflow’dur.

---

## 99. CSS Variable Baseline

~~~css
:root {
  --color-navy-900: #0B1F33;
  --color-navy-950: #071521;
  --color-red-600: #C81E2A;
  --color-red-700: #AD1824;
  --color-neutral-0: #FFFFFF;
  --color-neutral-50: #F7F9FA;
  --color-neutral-200: #D9E0E6;
  --color-neutral-300: #BCC6CF;
  --color-neutral-600: #526170;
  --color-neutral-900: #17212B;

  --color-surface-canvas: var(--color-neutral-50);
  --color-surface-primary: var(--color-neutral-0);
  --color-text-primary: var(--color-neutral-900);
  --color-text-heading: var(--color-navy-900);
  --color-text-secondary: var(--color-neutral-600);
  --color-border-default: var(--color-neutral-300);
  --color-action-primary: var(--color-navy-900);
  --color-action-accent: var(--color-red-600);

  --radius-control: 8px;
  --radius-card: 12px;
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;

  --motion-fast: 100ms;
  --motion-base: 200ms;
}
~~~

Bu blok minimum örnektir; production token export’u bütün semantic set’i içerecektir.

---

## 100. Tailwind ve shadcn Mapping İlkesi

- CSS variables semantic source of truth olur.
- Tailwind utilities semantic variables’a bağlanır.
- shadcn/Radix component’leri InfraVolt variants ile standardize edilir.
- Screen içinde arbitrary hex class kullanılmaz.
- One-off pixel yalnız documented exception.
- Radix accessibility behaviour korunur; visual override semantics’i bozmaz.

Kesin code mapping 08_FRONTEND_COMPONENT_SPEC.md içinde verilir.

---

## 101. Figma Library Architecture

### 101.1 Pages

~~~text
00 Cover and Changelog
01 Foundations
02 Components
03 Patterns
04 Public Templates
05 Admin Templates
06 Portal Templates
07 Prototypes
08 Localisation QA
09 Archive
~~~

### 101.2 Variables collections

- Primitives / Colour
- Primitives / Dimension
- Semantic / Light
- Semantic / Inverse
- Component / Public
- Component / Admin
- Component / Portal

### 101.3 Figma rules

- Auto Layout
- Variables instead of detached values
- Component properties
- Variant count controlled
- No instance detachment without reason
- en-GB and uk-UA sample frames
- 320/390/768/1024/1440 validation frames

---

## 102. Component Library Structure

~~~text
Foundations
├── Colour
├── Typography
├── Spacing and Grid
├── Iconography
└── Motion

Primitives
├── Button
├── Link
├── Input
├── Select
├── Checkbox
├── Radio
├── Badge
└── Icon Button

Composites
├── Product Card
├── Resource Row
├── Filter Bar
├── Data Table
├── Record Header
├── Application Map Panel
└── Project List Item

Patterns
├── Header
├── Footer
├── Form Step
├── Empty State
├── Error Summary
├── Admin Workspace
└── Portal Summary
~~~

---

## 103. Figma–Code Parity

Her production component:

- Same canonical name
- Same variants
- Same sizes
- Same states
- Same token references
- Same accessibility notes

taşımalıdır.

Component parity table design handoff’ta tutulur:

| Component | Figma | Code | Owner | Status |
|---|---|---|---|---|
| Button | Required | Required | Design System | Planned |
| Input | Required | Required | Design System | Planned |
| Product Card | Required | Required | Public UI | Planned |
| Application Map Hotspot | Required | Required | Map workstream | Planned |
| Data Table | Required | Required | Admin UI | Planned |

---

## 104. Component State Standardı

Interactive component mümkün olduğunda:

- Default
- Hover
- Focus-visible
- Active
- Disabled
- Loading
- Error
- Selected

state’lerinden ilgili olanları tanımlar.

Figma yalnız default state çizip diğer state’leri developer’a bırakmaz.

---

## 105. Responsive Component Standardı

Her composite component:

- Compact
- Medium
- Wide

davranışını belgeler.

Responsive fark yalnız ölçü değil:

- Order
- Visibility
- Interaction
- Density
- Overlay

değişimi olabilir.

---

## 106. Localization QA Standardı

Her component şu test content’leriyle değerlendirilir:

- Short en-GB
- Long en-GB
- Representative uk-UA
- Long company name
- Long product series
- Missing optional field
- Multi-line button avoidance

Rules:

- Button iki satıra çıkabilir mi component bazında karar
- Navigation truncate yerine layout change
- Badge maximum length; uzun status başka pattern
- Table column content wrap
- No embedded copy in image

---

## 107. Accessibility QA Standardı

Her component için:

- Keyboard
- Focus order
- Accessible name
- Role/state
- Contrast
- Touch target
- Zoom/reflow
- Reduced motion
- Screen reader announcement

notu bulunur.

WCAG test ayrıntısı 11_TEST_QA_AND_ACCESSIBILITY.md içindedir.

---

## 108. Content Rules for Components

### 108.1 Button

- Verb + object
- Maksimum kısa phrase
- No punctuation baseline

### 108.2 Card

- Single clear title
- One short descriptor
- Metadata limited

### 108.3 Alert

- What happened
- What it means
- What to do

### 108.4 Empty state

- Why empty
- Next step

### 108.5 Badge

- 1–3 words preferred
- Full sentence değil

---

## 109. Component Governance

Yeni component oluşturmadan önce:

1. Existing primitive
2. Existing variant
3. Existing composite
4. Pattern composition

kontrol edilir.

Yeni variant için:

- Repeated need
- Clear semantic difference
- Accessibility states
- Design and code owner
- Documentation

gereklidir.

---

## 110. Deprecation

Deprecated component:

- Deprecated badge in Figma/docs
- Replacement
- Migration plan
- Removal release
- Code usage audit

Silinen component adı yeni farklı amaç için yeniden kullanılmaz.

---

## 111. Versioning

### Patch

- Documentation
- Non-breaking visual fix
- Contrast correction without API change

### Minor

- New component/variant/token
- Backward-compatible pattern

### Major

- Token renaming
- Component API break
- Global brand/typography/grid change

Design system version app release’ten bağımsız izlenebilir.

---

## 112. Design Token Change Control

Founder/Product + Design System Owner approval gerektirenler:

- Navy/red brand baseline
- Typography family
- Global spacing scale
- Breakpoints
- Radius character
- Public primary/accent hierarchy
- Logo system

Design System Owner approval:

- New semantic token
- Component variant
- Motion token
- Chart palette

Screen owner global token’ı tek ekran için değiştiremez.

---

## 113. Release Component Scope

### 113.1 Foundation

- Colour
- Typography
- Spacing/grid
- Button/link
- Form primitives
- Card
- Badge/alert
- Header/footer
- Loading/error/empty

### 113.2 Public Website MVP

- Product/industry cards
- Product detail patterns
- Resource row
- Specification table
- Application Map foundations
- Contact/basic quote form
- Breadcrumb

### 113.3 Sales Operations MVP

- Comparator
- Project List item/tray
- Multi-step form
- File upload
- Auth
- Admin shell/table/record header
- Dealer review

### 113.4 Ukraine Market Release

- Ukrainian typography QA
- Navigation expansion
- Localised statuses/forms
- Market switcher
- Map labels/panels

### 113.5 V1

- Portal shell
- Activity timeline
- Reports/chart palette
- Advanced content editor
- Additional map patterns

---

## 114. Design System Acceptance Criteria

Bu belge onaylanmadan önce:

- Technical Clarity yönü korunuyor mu?
- Navy 900 ve Red 600 baseline kabul mü?
- Default primary Navy, conversion accent Red kararı doğru mu?
- Inter Variable font kabul mü?
- Four-pixel spacing scale uygun mu?
- Breakpoint, grid ve container değerleri kabul mü?
- Radius restrained corporate character veriyor mu?
- Public/admin/portal density ayrımı doğru mu?
- Component inventory MVP için yeterli mi?
- Application Map component family doğru mu?
- WCAG AA contrast baseline yeterli mi?
- uk-UA/Cyrillic yaklaşımı doğru mu?
- Figma–code parity modeli kabul mü?

---

## 115. Açık Design System Kararları

| ID | Karar | Baseline öneri | Gerekli aşama |
|---|---|---|---|
| DS-001 | Final logo files | Horizontal + compact + mark + monochrome | Before visual production |
| DS-002 | Official brand colour confirmation | Navy 900 / Red 600 baseline | Before Founder approval |
| DS-003 | Font final validation | Inter Variable, en-GB/uk-UA proof | Before Figma library lock |
| DS-004 | Product icon technical approval | Canonical SVG review | Before public category build |
| DS-005 | Missing product icons | Commission/create approved matching set | Before affected content publish |
| DS-006 | Admin sidebar surface | Navy-950 baseline | Before admin prototype |
| DS-007 | Chart palette | Provisional until reports designed | Before V1 reports |
| DS-008 | Full dark mode | Out of scope | Revisit only with demand |
| DS-009 | Map control styling on image | Test against clean pilot image | Before map sign-off |
| DS-010 | Ukrainian navigation samples | Real copy stress test | Before Ukraine UI approval |

---

## 116. Design System Risks

| Risk | Kontrol |
|---|---|
| Red aşırı kullanımı | Navy default, red conversion accent |
| Generic template görünümü | Technical typography, grid, custom domain components |
| Brand colour sonradan değişiyor | Token layer + change control |
| Too many variants | Governance and repeated-need rule |
| Admin ayrı ürün gibi | Shared primitives/semantic tokens |
| Portal internal UI gibi | Comfortable density/customer patterns |
| Cyrillic font/layout sorunu | Inter + uk-UA stress frames |
| Icons teknik olarak yanlış | Technical approval and missing-icon backlog |
| UI image içine gömülüyor | Clean assets + HTML components |
| Contrast regression | Approved pairs + automated checks |
| Figma/code drift | Canonical naming and parity table |

---

## 117. Definition of Ready — Component

Bir component tasarıma/koda girmeden:

- User need
- Usage context
- Existing component check
- Anatomy
- Variants
- Sizes
- States
- Responsive behaviour
- Accessibility behaviour
- Content constraints
- Token mapping
- Owner

hazır olmalıdır.

---

## 118. Definition of Done — Component

- Figma master component
- Auto Layout
- Token variables
- All relevant states
- Compact/Medium/Wide behaviour
- en-GB/uk-UA stress test
- Keyboard/focus notes
- Contrast verified
- Code component
- Unit/interaction tests risk-based
- Story/example
- Documentation
- Design/code parity confirmed

---

## 119. Design System Handoff Checklist

- Foundation tokens exported
- CSS variables mapped
- Tailwind semantic mapping ready
- Figma variables named
- Component owners assigned
- MVP component scope locked
- Asset paths canonical
- Font loading plan ready
- Contrast report stored
- Open decisions tracked
- Changelog updated

---

## 120. Onay Kaydı

~~~text
Founder / Product Owner approval: Pending
Design System Owner approval: Pending
Approved by:
Approval date:
Approved version:
Notes:
~~~

---

## 121. Sürüm Geçmişi

| Sürüm | Durum | Değişiklik |
|---|---|---|
| 0.1.0 | Current Draft | Technical Clarity token sistemi, component library, Application Map, admin/portal ve Figma-code standards oluşturuldu |

---

## 122. Son Karar

InfraVolt Design System; Navy 900, controlled InfraVolt Red 600, Inter Variable typography, 4 px spacing grid, restrained radius, light surfaces ve WCAG 2.2 AA contrast baseline üzerine kurulacaktır.

Default UI primary action navy; seçilmiş public conversion action accent red olacaktır. Böylece InfraVolt red güçlü kalacak fakat her ekranda bağıran bir renk olmayacaktır. Admin ve portal aynı primitives’i kullanacak; density, language ve customer/internal information farkları semantic component katmanında yönetilecektir.

Application Map görselleri UI component yerine geçmeyecektir. Hotspot, menu, product panel, controls ve labels bu design system içindeki reusable, accessible ve localisable components olarak üretilecektir.

Bir sonraki belge 05_TECHNICAL_ARCHITECTURE.md olacaktır. O dosya bu design system ve ürün gereksinimlerinin Next.js, Supabase, domain routing, auth, storage, email ve deployment katmanlarında nasıl uygulanacağını tanımlayacaktır.
