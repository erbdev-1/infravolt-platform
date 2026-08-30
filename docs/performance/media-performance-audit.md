# InfraVolt Media Performance Audit — Images, Backgrounds & Video

Generated: 2026-08-30T01:04:42.269Z

**Scope:** audit-only. No image/video files, page design, copy, product data, SEO, security/trusted-host logic, R2 URLs, or production behaviour were changed as part of this task.

## Methodology

- Measured against the project's own dev server with `NEXT_PUBLIC_ASSET_BASE_URL` pointed at the real Cloudflare R2 bucket (not the Playwright e2e harness, which deliberately blanks that variable for test isolation — see `tests/helpers/test-environment.ts`). This means R2 response headers, transfer sizes, and cache behaviour reflect real production asset delivery; only the HTML shell itself is dev-server-rendered rather than a production Next.js build.
- Cold-cache approximation: every run opens a brand-new Playwright browser context (isolated cache/storage partition) and sends `Cache-Control: no-cache` on the navigation request.
- Two viewport profiles: desktop (1920×1080) and mobile (390×844).
- Two-phase capture per page load: (1) immediately after `load` + 1.2s settle — this captures true above-the-fold / initial-viewport behaviour without forcing anything to load; (2) after programmatically scrolling through the full page — this catalogues the complete media inventory (including native lazy-loaded images) and confirms whether below-fold assets were correctly deferred.
- LCP and CLS are captured via `PerformanceObserver` (`largest-contentful-paint`, `layout-shift`) at the pre-scroll checkpoint, i.e. before any forced scrolling — representative of what a real visitor sees without interacting.
- Route coverage: **priority routes** (home, About, References, Resources, Contact, Support, Application Map + one sector, Cable Management hub — the areas explicitly flagged as visibly slow) were run with the full matrix: both markets (UK/UA) × both viewports × 3 runs, metrics reported as the median. **Category hub pages** (Busbar, Earthing & Lightning, LED Systems, Underfloor, EV Charging/G-Bus) and **one representative detail/series page per family** were sampled once per viewport on the UK host only — product imagery and background art are delivered from the same R2 object keys regardless of market (only page copy differs by host), so a UK-only pass covers the underlying asset-delivery behaviour without multiplying run count across the long tail of ~140+ individual product pages. This is documented further under Limitations.
- **Sizes vs. Resource Timing API:** cross-origin R2 responses do not send a `Timing-Allow-Origin` header, so the browser's Resource Timing API zeroes out `transferSize`/`encodedBodySize`/`decodedBodySize` for every R2 request (a real, sitewide side-effect of the current R2 configuration — see finding below). File sizes reported here instead come from the `Content-Length` response header, captured directly via Playwright's network listener (not subject to that browser restriction). Transfer *duration* (`startTime`/`responseEnd`/timing) is unaffected and is reported from the Resource Timing API as normal.

## Coverage

- Routes tested: **28** market/route combinations (19 unique routes × up to 2 markets)
- Images tested: **518** unique image assets (942 market/viewport/route observations)
- Background images tested: **7** unique background-image assets (24 market/viewport/route observations)
- Videos tested: **5** unique video assets (12 market/viewport/route observations)
- Pages with LCP measured: **56**

Routes tested:

- `ua:/`
- `ua:/about`
- `ua:/application-map`
- `ua:/application-map/commercial-building`
- `ua:/contact`
- `ua:/products/cable-support-systems`
- `ua:/references`
- `ua:/resources`
- `ua:/uk-support`
- `uk:/`
- `uk:/about`
- `uk:/application-map`
- `uk:/application-map/commercial-building`
- `uk:/contact`
- `uk:/products/busbar`
- `uk:/products/busbar/gl-lighting-busbar`
- `uk:/products/cable-support-systems`
- `uk:/products/cable-support-systems/cable-ladder-c-profile-rung`
- `uk:/products/earthing-and-lightning-protection`
- `uk:/products/earthing-and-lightning-protection/lightning-protection`
- `uk:/products/g-bus`
- `uk:/products/led-systems`
- `uk:/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling`
- `uk:/products/underfloor-systems`
- `uk:/products/underfloor-systems/underfloor-junction-boxes`
- `uk:/references`
- `uk:/resources`
- `uk:/uk-support`

## Classification summary

| Level | Count |
|---|---|
| CRITICAL | 118 |
| NEEDS OPTIMISATION | 655 |
| GOOD | 205 |

Classification is not size-only — it weights above-the-fold position, LCP involvement, transfer duration, mobile viewport impact, effective cache-control for repeat visits, and whether the asset type (video, CSS background-image) has any native lazy-loading option at all. See `classificationReasons` in the CSV for the per-asset breakdown.

## Top performance problems (CRITICAL, highest severity first)

| Market | Viewport | Route | Type | Size | Duration | Reasons |
|---|---|---|---|---|---|---|
| UK | mobile | `/references` | background-image | 1.63 MB | 160 ms | is the page LCP element on at least one run; CSS background-image (no native lazy-loading / responsive srcset available); mobile viewport; large file (1.63 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UA | mobile | `/references` | background-image | 1.63 MB | 177 ms | is the page LCP element on at least one run; CSS background-image (no native lazy-loading / responsive srcset available); mobile viewport; large file (1.63 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/resources` | background-image | 1.65 MB | 149 ms | is the page LCP element on at least one run; CSS background-image (no native lazy-loading / responsive srcset available); mobile viewport; large file (1.65 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UA | mobile | `/resources` | background-image | 1.65 MB | 131 ms | is the page LCP element on at least one run; CSS background-image (no native lazy-loading / responsive srcset available); mobile viewport; large file (1.65 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | desktop | `/references` | background-image | 1.63 MB | 103 ms | is the page LCP element on at least one run; CSS background-image (no native lazy-loading / responsive srcset available); large file (1.63 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UA | desktop | `/references` | background-image | 1.63 MB | 130 ms | is the page LCP element on at least one run; CSS background-image (no native lazy-loading / responsive srcset available); large file (1.63 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | desktop | `/resources` | background-image | 1.65 MB | 198 ms | is the page LCP element on at least one run; CSS background-image (no native lazy-loading / responsive srcset available); large file (1.65 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UA | desktop | `/resources` | background-image | 1.65 MB | 153 ms | is the page LCP element on at least one run; CSS background-image (no native lazy-loading / responsive srcset available); large file (1.65 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/uk-support` | image | 2.07 MB | 143 ms | is the page LCP element on at least one run; mobile viewport; large file (2.07 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UA | mobile | `/uk-support` | image | 1.91 MB | 154 ms | is the page LCP element on at least one run; mobile viewport; large file (1.91 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/` | image | 1.64 MB | 448 ms | mobile viewport; moderate transfer time (448 ms); large file (1.64 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/` | image | 2.40 MB | 702 ms | mobile viewport; moderate transfer time (702 ms); large file (2.40 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/` | image | 1.95 MB | 500 ms | mobile viewport; moderate transfer time (500 ms); large file (1.95 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/` | image | 1.75 MB | 425 ms | mobile viewport; moderate transfer time (425 ms); large file (1.75 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/` | image | 1.83 MB | 491 ms | mobile viewport; moderate transfer time (491 ms); large file (1.83 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/` | image | 1.54 MB | 498 ms | mobile viewport; moderate transfer time (498 ms); large file (1.54 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UK | mobile | `/` | video | 5.11 MB | 258 ms | video asset; mobile viewport; large file (5.11 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UA | mobile | `/` | image | 2.40 MB | 694 ms | mobile viewport; moderate transfer time (694 ms); large file (2.40 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UA | mobile | `/` | image | 1.95 MB | 428 ms | mobile viewport; moderate transfer time (428 ms); large file (1.95 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |
| UA | mobile | `/` | image | 1.75 MB | 427 ms | mobile viewport; moderate transfer time (427 ms); large file (1.75 MB); no effective cache-control for repeat visits; fetched before scroll despite being below the fold (unnecessary initial-load bytes) |

## Priority areas called out for this audit

### About page hero background

| Market | Viewport | Size | Duration | LCP (page) | Classification |
|---|---|---|---|---|---|
| UK | desktop | 311.3 KB | 104 ms | 612 ms (this asset is the LCP element) | CRITICAL |
| UK | desktop | 1.50 MB | 227 ms | 612 ms | CRITICAL |
| UK | desktop | 1.73 MB | 240 ms | 612 ms | CRITICAL |
| UK | desktop | 1.77 MB | 180 ms | 612 ms | CRITICAL |
| UK | mobile | 220.5 KB | 146 ms | 536 ms (this asset is the LCP element) | CRITICAL |
| UK | mobile | 1.50 MB | 135 ms | 536 ms | CRITICAL |
| UK | mobile | 1.73 MB | 214 ms | 536 ms | CRITICAL |
| UK | mobile | 1.77 MB | 219 ms | 536 ms | CRITICAL |
| UA | desktop | 311.3 KB | 71 ms | 712 ms (this asset is the LCP element) | CRITICAL |
| UA | desktop | 1.50 MB | 222 ms | 712 ms | CRITICAL |
| UA | desktop | 1.73 MB | 176 ms | 712 ms | CRITICAL |
| UA | desktop | 1.77 MB | 196 ms | 712 ms | CRITICAL |
| UA | mobile | 220.5 KB | 65 ms | 632 ms (this asset is the LCP element) | CRITICAL |
| UA | mobile | 1.50 MB | 165 ms | 632 ms | CRITICAL |
| UA | mobile | 1.73 MB | 188 ms | 632 ms | CRITICAL |
| UA | mobile | 1.77 MB | 238 ms | 632 ms | CRITICAL |

Asset URL(s): `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/about-hero-background.webp`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-market-card-background.webp`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/infravolt-uk-market-card-background.webp`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/infravolt-ukraine-market-card-background.webp`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/about-hero-background-mobile.webp`

### References hero background

| Market | Viewport | Size | Duration | LCP (page) | Classification |
|---|---|---|---|---|---|
| UK | desktop | 1.63 MB | 103 ms | 3512 ms (this asset is the LCP element) | CRITICAL |
| UK | mobile | 1.63 MB | 160 ms | 2708 ms (this asset is the LCP element) | CRITICAL |
| UA | desktop | 1.63 MB | 130 ms | 1000 ms (this asset is the LCP element) | CRITICAL |
| UA | mobile | 1.63 MB | 177 ms | 1136 ms (this asset is the LCP element) | CRITICAL |

Asset URL(s): `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/references/references-hero-background.webp`

### Resources hero background

| Market | Viewport | Size | Duration | LCP (page) | Classification |
|---|---|---|---|---|---|
| UK | desktop | 1.65 MB | 198 ms | 988 ms (this asset is the LCP element) | CRITICAL |
| UK | mobile | 1.65 MB | 149 ms | 448 ms (this asset is the LCP element) | CRITICAL |
| UA | desktop | 1.65 MB | 153 ms | 472 ms (this asset is the LCP element) | CRITICAL |
| UA | mobile | 1.65 MB | 131 ms | 600 ms (this asset is the LCP element) | CRITICAL |

Asset URL(s): `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/resources/technical-resources-hero-background.webp`

### Application Map overview/background imagery

| Market | Viewport | Size | Duration | LCP (page) | Classification |
|---|---|---|---|---|---|
| UK | desktop | 123.1 KB | 98 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 1009 B | 79 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 1011 B | 75 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 979 B | 80 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 992 B | 115 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 1.0 KB | 103 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 1.1 KB | 96 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 107.3 KB | n/a | 460 ms (this asset is the LCP element) | CRITICAL |
| UK | desktop | 6.3 KB | 17 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 5.7 KB | 18 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 6.2 KB | 17 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 6.5 KB | 19 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 7.0 KB | 31 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 5.8 KB | 30 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 5.8 KB | 31 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 5.4 KB | 32 ms | 460 ms | NEEDS OPTIMISATION |
| UK | desktop | 51.2 KB | 147 ms | 460 ms | NEEDS OPTIMISATION |
| UK | mobile | 123.1 KB | 107 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | 1009 B | 60 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | 1011 B | 104 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | 979 B | 101 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | 992 B | 79 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | 1.0 KB | 98 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | 1.1 KB | 85 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | 20.2 KB | n/a | 504 ms (this asset is the LCP element) | NEEDS OPTIMISATION |
| UK | mobile | 6.3 KB | 10 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | 5.7 KB | 10 ms | 504 ms | NEEDS OPTIMISATION |
| UK | mobile | n/a | n/a | 504 ms | GOOD |
| UK | mobile | n/a | n/a | 504 ms | GOOD |
| UK | mobile | n/a | n/a | 504 ms | GOOD |
| UK | mobile | n/a | n/a | 504 ms | GOOD |
| UK | mobile | n/a | n/a | 504 ms | GOOD |
| UK | mobile | n/a | n/a | 504 ms | GOOD |
| UK | mobile | 51.2 KB | 138 ms | 504 ms | NEEDS OPTIMISATION |
| UA | desktop | 123.1 KB | 132 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 1009 B | 79 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 1011 B | 83 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 979 B | 107 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 992 B | 107 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 1.0 KB | 81 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 1.1 KB | 87 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 107.3 KB | n/a | 528 ms (this asset is the LCP element) | CRITICAL |
| UA | desktop | 6.3 KB | 19 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 5.7 KB | 19 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 6.2 KB | 19 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 6.5 KB | 20 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 7.0 KB | 27 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 5.8 KB | 30 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 5.8 KB | 31 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 5.4 KB | 31 ms | 528 ms | NEEDS OPTIMISATION |
| UA | desktop | 51.2 KB | 129 ms | 528 ms | NEEDS OPTIMISATION |
| UA | mobile | 123.1 KB | 134 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | 1009 B | 51 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | 1011 B | 90 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | 979 B | 102 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | 992 B | 117 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | 1.0 KB | 108 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | 1.1 KB | 121 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | 20.2 KB | n/a | 508 ms (this asset is the LCP element) | NEEDS OPTIMISATION |
| UA | mobile | 6.3 KB | 10 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | 5.7 KB | 11 ms | 508 ms | NEEDS OPTIMISATION |
| UA | mobile | n/a | n/a | 508 ms | GOOD |
| UA | mobile | n/a | n/a | 508 ms | GOOD |
| UA | mobile | n/a | n/a | 508 ms | GOOD |
| UA | mobile | n/a | n/a | 508 ms | GOOD |
| UA | mobile | n/a | n/a | 508 ms | GOOD |
| UA | mobile | n/a | n/a | 508 ms | GOOD |
| UA | mobile | 51.2 KB | 106 ms | 508 ms | NEEDS OPTIMISATION |
| UK | desktop | 111.8 KB | n/a | 332 ms (this asset is the LCP element) | CRITICAL |
| UK | desktop | 4.7 KB | 93 ms | 1624 ms | NEEDS OPTIMISATION |
| UK | desktop | 5.1 KB | 17 ms | 332 ms | NEEDS OPTIMISATION |
| UK | desktop | 6.0 KB | 21 ms | 332 ms | NEEDS OPTIMISATION |
| UK | desktop | 6.8 KB | 18 ms | 332 ms | NEEDS OPTIMISATION |
| UK | desktop | 4.3 KB | 21 ms | 332 ms | NEEDS OPTIMISATION |
| UK | desktop | 6.2 KB | 25 ms | 332 ms | NEEDS OPTIMISATION |
| UK | desktop | 5.6 KB | 29 ms | 332 ms | NEEDS OPTIMISATION |
| UK | desktop | 6.3 KB | 31 ms | 332 ms | NEEDS OPTIMISATION |
| UK | mobile | 21.7 KB | n/a | 400 ms (this asset is the LCP element) | NEEDS OPTIMISATION |
| UK | mobile | 4.7 KB | 19 ms | 400 ms | NEEDS OPTIMISATION |
| UK | mobile | 5.1 KB | 12 ms | 400 ms | NEEDS OPTIMISATION |
| UK | mobile | 6.0 KB | 13 ms | 400 ms | NEEDS OPTIMISATION |
| UK | mobile | n/a | n/a | 400 ms | GOOD |
| UK | mobile | n/a | n/a | 400 ms | GOOD |
| UK | mobile | n/a | n/a | 400 ms | GOOD |
| UK | mobile | n/a | n/a | 400 ms | GOOD |
| UK | mobile | n/a | n/a | 400 ms | GOOD |
| UA | desktop | 111.8 KB | n/a | 548 ms (this asset is the LCP element) | CRITICAL |
| UA | desktop | 5.1 KB | 14 ms | 548 ms | NEEDS OPTIMISATION |
| UA | desktop | 6.0 KB | 15 ms | 548 ms | NEEDS OPTIMISATION |
| UA | desktop | 6.8 KB | 19 ms | 548 ms | NEEDS OPTIMISATION |
| UA | desktop | 4.3 KB | 19 ms | 548 ms | NEEDS OPTIMISATION |
| UA | desktop | 6.2 KB | 25 ms | 548 ms | NEEDS OPTIMISATION |
| UA | desktop | 5.6 KB | 25 ms | 548 ms | NEEDS OPTIMISATION |
| UA | desktop | 6.3 KB | 26 ms | 548 ms | NEEDS OPTIMISATION |
| UA | mobile | 21.7 KB | n/a | 244 ms (this asset is the LCP element) | NEEDS OPTIMISATION |
| UA | mobile | 5.1 KB | 12 ms | 244 ms | NEEDS OPTIMISATION |
| UA | mobile | 6.0 KB | 12 ms | 244 ms | NEEDS OPTIMISATION |
| UA | mobile | n/a | n/a | 244 ms | GOOD |
| UA | mobile | n/a | n/a | 244 ms | GOOD |
| UA | mobile | n/a | n/a | 244 ms | GOOD |
| UA | mobile | n/a | n/a | 244 ms | GOOD |
| UA | mobile | n/a | n/a | 244 ms | GOOD |

Asset URL(s): `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/brand/infravolt-wordmark-primary.webp`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/icons/products/icon-cable-tray.svg`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/icons/products/icon-busbar.svg`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/icons/products/icon-support-system.svg`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/icons/products/icon-earthing.svg`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/icons/products/icon-lighting-busbar.svg`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/icons/products/icon-ev-charging.svg`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Foverview%2Fdata-centre-overview.webp&w=1920&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-main-electrical-ups-room.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-data-hall-overhead-power-distribution.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-electrical-riser-floor-distribution.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-generator-resilient-power-hall.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-cooling-plant-pump-room.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-noc-control-room.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-utility-intake-transformer-interface.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-external-infrastructure-ev-charging.webp&w=256&q=75`, `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/brand/infravolt-wordmark-transparent.webp`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Foverview%2Fdata-centre-overview.webp&w=640&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-electrical-riser-floor-distribution.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-generator-resilient-power-hall.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-cooling-plant-pump-room.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-noc-control-room.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-utility-intake-transformer-interface.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-external-infrastructure-ev-charging.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Foverview%2Fdata-centre-overview.webp&w=1920&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-main-electrical-ups-room.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-data-hall-overhead-power-distribution.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-electrical-riser-floor-distribution.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-generator-resilient-power-hall.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-cooling-plant-pump-room.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-noc-control-room.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-utility-intake-transformer-interface.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-external-infrastructure-ev-charging.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Foverview%2Fdata-centre-overview.webp&w=640&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-electrical-riser-floor-distribution.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-generator-resilient-power-hall.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-cooling-plant-pump-room.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-noc-control-room.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-utility-intake-transformer-interface.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fdata-centre%2Fzones%2Fdata-centre-external-infrastructure-ev-charging.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Foverview%2Fcommercial-building-application-map-overview.webp&w=1920&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Foverview%2Fcommercial-building-application-map-overview.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-main-electrical-room.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-office-floor-lighting.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-underfloor-distribution.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-vertical-riser-service-shaft.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-rooftop-plant.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-external-utilities-yard.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-parking-ev-charging.webp&w=256&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Foverview%2Fcommercial-building-application-map-overview.webp&w=640&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-underfloor-distribution.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-vertical-riser-service-shaft.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-rooftop-plant.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-external-utilities-yard.webp&w=3840&q=75`, `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-parking-ev-charging.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Foverview%2Fcommercial-building-application-map-overview.webp&w=1920&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-main-electrical-room.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-office-floor-lighting.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-underfloor-distribution.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-vertical-riser-service-shaft.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-rooftop-plant.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-external-utilities-yard.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-parking-ev-charging.webp&w=256&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Foverview%2Fcommercial-building-application-map-overview.webp&w=640&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-underfloor-distribution.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-vertical-riser-service-shaft.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-rooftop-plant.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-external-utilities-yard.webp&w=3840&q=75`, `http://ua.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev%2Fapplication-map%2Fcommercial-building%2Fzones%2Fcommercial-building-parking-ev-charging.webp&w=3840&q=75`

### Cable Management video

| Market | Viewport | Size | Duration | LCP (page) | Classification |
|---|---|---|---|---|---|
| UK | desktop | 15.18 MB | n/a | 668 ms | NEEDS OPTIMISATION |
| UK | mobile | 15.18 MB | n/a | 540 ms | CRITICAL |
| UA | desktop | 15.18 MB | n/a | 648 ms | NEEDS OPTIMISATION |
| UA | mobile | 15.18 MB | n/a | 380 ms | CRITICAL |

Asset URL(s): `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/cable-management-systems/infravolt-cable-support.mp4`

## 10 slowest images/backgrounds (by median transfer duration)

| Market | Viewport | Route | Type | Size | Duration | Classification | URL |
|---|---|---|---|---|---|---|---|
| UK | desktop | `/products/underfloor-systems` | image | 51.1 KB | 1311 ms | CRITICAL | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | desktop | `/products/underfloor-systems` | image | 30.1 KB | 1137 ms | CRITICAL | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | desktop | `/products/underfloor-systems` | image | 49.0 KB | 1132 ms | CRITICAL | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | desktop | `/products/underfloor-systems` | image | 43.8 KB | 1104 ms | CRITICAL | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | desktop | `/products/underfloor-systems` | image | 36.2 KB | 936 ms | CRITICAL | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | desktop | `/products/underfloor-systems` | image | 34.0 KB | 829 ms | CRITICAL | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | desktop | `/products/underfloor-systems` | image | 34.1 KB | 810 ms | CRITICAL | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | desktop | `/products/underfloor-systems` | image | 20.5 KB | 735 ms | NEEDS OPTIMISATION | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | desktop | `/products/underfloor-systems` | image | 12.5 KB | 722 ms | NEEDS OPTIMISATION | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f96bfc47df8f...` |
| UK | mobile | `/` | image | 2.40 MB | 702 ms | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |

## 10 largest images/backgrounds (by file size)

| Market | Viewport | Route | Type | Size | Duration | Classification | URL |
|---|---|---|---|---|---|---|---|
| UK | desktop | `/uk-support` | image | 2.85 MB | 241 ms | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/warehouse/hts-warehouse-ext...` |
| UK | mobile | `/uk-support` | image | 2.85 MB | 204 ms | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/warehouse/hts-warehouse-ext...` |
| UK | desktop | `/` | image | 2.40 MB | 611 ms | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UK | mobile | `/` | image | 2.40 MB | 702 ms | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UA | desktop | `/` | image | 2.40 MB | 682 ms | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UA | mobile | `/` | image | 2.40 MB | 694 ms | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UK | desktop | `/about` | image | 2.40 MB | 147 ms | NEEDS OPTIMISATION | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UK | mobile | `/about` | image | 2.40 MB | 201 ms | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UA | desktop | `/about` | image | 2.40 MB | 163 ms | NEEDS OPTIMISATION | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UA | mobile | `/about` | image | 2.40 MB | 165 ms | NEEDS OPTIMISATION | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |

## Slowest videos (by median transfer duration)

| Market | Viewport | Route | Size | Duration | Time-to-playable | Poster | Classification | URL |
|---|---|---|---|---|---|---|---|---|
| UK | mobile | `/` | 5.11 MB | 258 ms | 450 ms | yes | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-mobile.mp4` |
| UK | desktop | `/` | 10.93 MB | 255 ms | 468 ms | yes | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-desktop.mp4` |
| UA | desktop | `/` | 10.93 MB | 247 ms | 451 ms | yes | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-desktop.mp4` |
| UA | mobile | `/` | 5.11 MB | 235 ms | 440 ms | yes | CRITICAL | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-mobile.mp4` |

## Largest videos (by file size)

| Market | Viewport | Route | Size | Duration | Poster | URL |
|---|---|---|---|---|---|---|
| UK | desktop | `/products/cable-support-systems` | 15.18 MB | n/a | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/cable-management-systems/infravolt-cable-support.mp4` |
| UK | mobile | `/products/cable-support-systems` | 15.18 MB | n/a | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/cable-management-systems/infravolt-cable-support.mp4` |
| UA | desktop | `/products/cable-support-systems` | 15.18 MB | n/a | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/cable-management-systems/infravolt-cable-support.mp4` |
| UA | mobile | `/products/cable-support-systems` | 15.18 MB | n/a | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/cable-management-systems/infravolt-cable-support.mp4` |
| UK | desktop | `/` | 10.93 MB | 255 ms | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-desktop.mp4` |
| UA | desktop | `/` | 10.93 MB | 247 ms | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-desktop.mp4` |
| UK | desktop | `/products/busbar` | 8.72 MB | n/a | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/busbar/infravolt-busbar.mp4` |
| UK | mobile | `/products/busbar` | 8.72 MB | n/a | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/busbar/infravolt-busbar.mp4` |
| UK | mobile | `/` | 5.11 MB | 258 ms | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-mobile.mp4` |
| UA | mobile | `/` | 5.11 MB | 235 ms | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-mobile.mp4` |
| UK | desktop | `/products/earthing-and-lightning-protection` | 3.05 MB | n/a | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/earthing-lightning/infravolt-earthing-lightning.mp4` |
| UK | mobile | `/products/earthing-and-lightning-protection` | 3.05 MB | n/a | yes | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/products/earthing-lightning/infravolt-earthing-lightning.mp4` |

## Pages with the worst media-related LCP

| Market | Viewport | Route | Median LCP | LCP element type | LCP asset |
|---|---|---|---|---|---|
| UK | desktop | `/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling` | 4720 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UK | desktop | `/products/cable-support-systems/cable-ladder-c-profile-rung` | 4136 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UK | desktop | `/products/busbar/gl-lighting-busbar` | 3952 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UK | desktop | `/references` | 3512 ms | background-image | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/references/references-her...` |
| UK | mobile | `/references` | 2708 ms | background-image | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/references/references-her...` |
| UK | desktop | `/products/led-systems` | 2544 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UK | desktop | `/products/underfloor-systems` | 2508 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UK | desktop | `/products/underfloor-systems/underfloor-junction-boxes` | 2308 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UK | mobile | `/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling` | 1824 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UK | desktop | `/products/g-bus` | 1656 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UA | mobile | `/references` | 1136 ms | background-image | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/references/references-her...` |
| UA | desktop | `/references` | 1000 ms | background-image | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/references/references-her...` |
| UK | desktop | `/resources` | 988 ms | background-image | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/resources/technical-resou...` |
| UK | mobile | `/products/cable-support-systems/cable-ladder-c-profile-rung` | 848 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |
| UK | mobile | `/products/led-systems` | 788 ms | image | `http://uk.infravolt.localhost:3000/_next/image?url=https%3A%2F%2Fpub-f1a143f9...` |

## Assets downloaded unnecessarily on initial load

Assets that were fetched *before* the page was scrolled even though they render below the fold — i.e. bytes spent on the initial load for content the visitor had not yet reached. CSS background-images have no native lazy-loading mechanism at all, so any below-fold background-image is unavoidably in this list under the current implementation.

| Market | Viewport | Route | Type | Size | Loaded-before-scroll rate | URL |
|---|---|---|---|---|---|---|
| UK | desktop | `/` | video | 10.93 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-desktop.mp4` |
| UA | desktop | `/` | video | 10.93 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-desktop.mp4` |
| UK | mobile | `/` | video | 5.11 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-mobile.mp4` |
| UA | mobile | `/` | video | 5.11 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/home/infravolt-home-hero-mobile.mp4` |
| UK | mobile | `/uk-support` | image | 2.85 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/warehouse/hts-warehouse-exterior.webp` |
| UK | desktop | `/` | image | 2.40 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UK | mobile | `/` | image | 2.40 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UA | desktop | `/` | image | 2.40 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UA | mobile | `/` | image | 2.40 MB | 67% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| UA | mobile | `/uk-support` | image | 2.21 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/ua-support-project-supply-and-logistics-coordination.webp` |
| UK | desktop | `/about` | image | 2.13 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-tuzla-istanbul-head-office-factory.webp` |
| UK | mobile | `/about` | image | 2.13 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-tuzla-istanbul-head-office-factory.webp` |
| UA | desktop | `/about` | image | 2.13 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-tuzla-istanbul-head-office-factory.webp` |
| UA | mobile | `/about` | image | 2.13 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-tuzla-istanbul-head-office-factory.webp` |
| UK | mobile | `/uk-support` | image | 2.07 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/showroom/uk-showroom-technical-demo.webp` |
| UK | desktop | `/` | image | 2.02 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/cable-tray-and-ladder.webp` |
| UK | mobile | `/` | image | 2.02 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/cable-tray-and-ladder.webp` |
| UA | desktop | `/` | image | 2.02 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/cable-tray-and-ladder.webp` |
| UA | mobile | `/` | image | 2.02 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/cable-tray-and-ladder.webp` |
| UK | desktop | `/` | image | 1.95 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-busbar-systems.webp` |
| UK | mobile | `/` | image | 1.95 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-busbar-systems.webp` |
| UA | desktop | `/` | image | 1.95 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-busbar-systems.webp` |
| UA | mobile | `/` | image | 1.95 MB | 67% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-busbar-systems.webp` |
| UA | mobile | `/uk-support` | image | 1.91 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/ua-support-technical-support-and-solution-selection.webp` |
| UK | desktop | `/` | image | 1.83 MB | 100% | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-ledbus-systems.webp` |

## Desktop-sized assets unnecessarily delivered to mobile

Mobile-viewport loads where the asset's intrinsic (natural) width is more than 3× its rendered width and the file is over 100 KB — i.e. a desktop-resolution file being shipped to a 390px-wide viewport with no responsive variant.

| Route | Rendered w | Natural w | Size | URL |
|---|---|---|---|---|
| `/uk-support` | 348px | 1672px | 2.85 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/warehouse/hts-warehouse-exterior.webp` |
| `/` | 350px | 1672px | 2.40 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| `/` | 350px | 1672px | 2.40 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| `/about` | 348px | 1672px | 2.40 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| `/about` | 348px | 1672px | 2.40 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-zonguldak-factory.webp` |
| `/uk-support` | 348px | 1672px | 2.21 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/ua-support-project-supply-and-logistics-coordination.webp` |
| `/about` | 349px | 1672px | 2.13 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-tuzla-istanbul-head-office-factory.webp` |
| `/about` | 349px | 1672px | 2.13 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-tuzla-istanbul-head-office-factory.webp` |
| `/uk-support` | 348px | 1448px | 2.07 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/showroom/uk-showroom-technical-demo.webp` |
| `/` | 167px | 1448px | 2.02 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/cable-tray-and-ladder.webp` |
| `/` | 167px | 1448px | 2.02 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/cable-tray-and-ladder.webp` |
| `/about` | 348px | 1672px | 2.01 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-sultanate-of-oman-factory.webp` |
| `/about` | 348px | 1672px | 2.01 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/gersan-sultanate-of-oman-factory.webp` |
| `/` | 167px | 1448px | 1.95 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-busbar-systems.webp` |
| `/` | 167px | 1448px | 1.95 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-busbar-systems.webp` |
| `/uk-support` | 348px | 1672px | 1.91 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/ua-support-technical-support-and-solution-selection.webp` |
| `/` | 167px | 1448px | 1.83 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-ledbus-systems.webp` |
| `/` | 167px | 1448px | 1.83 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-ledbus-systems.webp` |
| `/` | 167px | 1448px | 1.81 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/earthing-lighting.webp` |
| `/` | 167px | 1448px | 1.81 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/earthing-lighting.webp` |
| `/` | 167px | 1448px | 1.75 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-underfloor-systems.webp` |
| `/` | 167px | 1448px | 1.75 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/products/thumbnails/product-underfloor-systems.webp` |
| `/` | 101px | 1024px | 1.70 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/hero-badges/earthing-lightning-protection.webp` |
| `/` | 101px | 1024px | 1.70 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/hero-badges/earthing-lightning-protection.webp` |
| `/` | 101px | 1024px | 1.64 MB | `https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/media/hero-badges/led-systems.webp` |

## Missing or ineffective cache headers

978 of 978 asset observations (530 unique URLs) have no effective `Cache-Control` for repeat visits (missing header, `max-age=0`, or `no-store`).

- **R2-hosted assets with no effective cache header: 527 unique URLs.** In this audit, every direct R2 (`pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev`) response observed returned **no `Cache-Control` header at all** — confirmed directly via response headers, not just this sample. Browsers fall back to heuristic caching (RFC 7234 §4.2.2, typically ~10% of time since `Last-Modified`), which is unreliable and often short. This affects every image, background, and video served from R2 across the whole site, not just the pages sampled here.
- **Locally/Next-served assets (dev server `/assets/...` fallback or `/_next/image`) with no effective cache header: 3 unique URLs.** Note: this dev server intentionally serves weak cache headers (`max-age=0`, `must-revalidate`) for development convenience — production Next.js builds typically set long-lived immutable caching for `/_next/image` and static `/public` assets, so this sub-finding is a dev-mode artifact, not necessarily a production issue (see Limitations).

## Missing poster / preload strategy on video

- 0 of 5 unique video asset(s) captured have no `poster` attribute set.
- All videos in this codebase share the same `preload="metadata"` value (set once in the shared `AccessibleVideo` component) — consistent, but worth confirming it's the right default per placement (e.g. a below-the-fold video arguably wants `preload="none"`).

## Recommended optimisation order

This is a suggested sequencing only — no changes were made as part of this audit.

1. **Set an explicit `Cache-Control` policy on the R2 bucket/custom domain** (e.g. `public, max-age=31536000, immutable` for content-hashed or rarely-changed static media). This is a delivery-policy change (R2 bucket/domain config), not a code change, and benefits every single media asset on the site simultaneously — highest leverage, lowest implementation risk.
2. **Recompress/resize the CRITICAL-classified hero and card background images** (About/References/Resources heroes, the three About "support/distribution" panel backgrounds, Application Map imagery) — several are 1–2 MB decorative `.webp` files serving as CSS backgrounds with no responsive variant and no lazy-loading option, and multiple are also the page's LCP element.
3. **Give CSS hero/background images a real loading-priority strategy** — e.g. a `<link rel=preload as=image>` for the confirmed LCP background per hero, since browsers discover `background-image` URLs later than `<img>`/`<link>` (CSS must be parsed first), which the data above shows contributing to elevated LCP on the flagged pages.
4. **Add responsive delivery for the Cable Management (and other) hero video** — confirm poster coverage everywhere, and evaluate whether `preload="none"` or a lighter poster-first strategy suits below-the-fold placements better than the current blanket `preload="metadata"`.
5. **Add a real responsive image strategy (`sizes`/`srcset` or Next `<Image>` optimisation) for mobile** for the assets flagged under "desktop-sized assets unnecessarily delivered to mobile" — several product/category images currently ship the same full-resolution file regardless of viewport.
6. **Re-audit after each step** using this same script (`pnpm node scripts/performance/media-performance-audit.mjs`) to confirm the intended metric actually moved, rather than assuming a fix worked.

## Limitations

- The HTML shell is served by `next dev` (Turbopack dev server), not a production build — Next.js production and dev servers can differ in `/_next/image` and static-asset cache-header behaviour (see above). R2 asset delivery itself is unaffected by this, since R2 is an external origin.
- Category hub pages and the long tail of individual product/series pages (~140+ routes in the sitemap manifest) were sampled rather than run exhaustively — see Methodology. Coverage is representative per product family, not exhaustive per SKU page.
- "Cold cache" is approximated via a fresh Playwright browser context + `Cache-Control: no-cache` per run; it is not a byte-for-byte guarantee of an empty OS/CDN cache (e.g. Cloudflare's edge cache for R2 objects may still have been warm from earlier requests in this same audit run).
- `transferSize`/`encodedBodySize` from the Resource Timing API read as `0` for all R2-origin requests because R2 does not send `Timing-Allow-Origin`; sizes were substituted from the `Content-Length` response header instead (see Methodology). This is itself worth fixing independently of any image-optimisation work, since it also blinds any real user-monitoring/analytics tooling that relies on Resource Timing.
- LCP/CLS are captured from a single automated page load per data point (median across the 1–3 runs performed), not from real-user field data (CrUX). Lab data here is directional, not a replacement for field monitoring.
- Some small `/_next/image` files (a few KB–50 KB) show surprisingly high durations (700–1300 ms) in the "slowest images" table — this lines up with `nextHopProtocol: http/1.1` observed on those requests, i.e. the dev server serving many concurrent optimised-image requests over a connection-limited HTTP/1.1 origin rather than per-file weight. Treat entries in that table with small file sizes as a signal about connection/request-count contention (worth re-checking against a production build, which serves over HTTP/2), not necessarily about the individual file needing recompression.
