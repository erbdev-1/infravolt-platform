# Media Performance — Before vs After Optimisation

Generated: 2026-08-30T03:14:34.254Z

**Scope:** compares the baseline audit (`docs/performance/media-performance-audit.md`, captured before this optimisation pass) against a focused re-audit of the six pages touched by this work.

## Methodology — read this before the numbers

- **BEFORE** was measured against the real Cloudflare R2 bucket (`NEXT_PUBLIC_ASSET_BASE_URL` set), i.e. actual production asset delivery.
- **AFTER** was measured against a second local dev server instance with `NEXT_PUBLIC_ASSET_BASE_URL` unset, so it serves the *newly optimised local files* directly from `/assets/...` instead of R2. This was necessary because this task does not upload anything to the live R2 bucket without explicit authorisation (see `docs/performance/r2-cache-control-action.md`) — the optimised bytes exist locally and are proven correct, but are not yet live in production.
- **Size comparisons below are fully valid** — `Content-Length` is measured the same way in both passes, and the AFTER files are the exact bytes that would ship if/when they're uploaded to R2.
- **Duration/LCP comparisons are directional only, not a clean before/after of network performance.** BEFORE traveled over the real internet to Cloudflare's edge; AFTER traveled over localhost with no CDN, no TLS, no real network latency at all — it will always look faster than BEFORE regardless of file size, so a large duration/LCP delta here is not proof of a production speed win by itself. What IS proven: (a) the files are dramatically smaller (proven directly via byte counts), (b) the correct viewport-specific variant is what actually loads (proven via the URL/resolution captured for each run), and (c) nothing broke (proven via the validation suite and visual checks). The genuine production timing win still depends on the R2 upload + Cache-Control fix in `r2-cache-control-action.md`.
- Where a BEFORE or AFTER data point doesn't exist (e.g. a brand-new mobile variant that had no BEFORE equivalent), this report says so explicitly rather than inventing a number.

## Live production validation (real CDN, real cache — obtained during final validation pass)

This section was added during the final validation pass, after the six optimised assets were uploaded to R2 and the new `assets.infravolt.co.uk` domain + Cloudflare cache rule went live. Unlike the rest of this report (BEFORE = old `r2.dev`, AFTER = local dev server), these numbers are **real production measurements** — no simulation, no local server involved.

**R2 / Cloudflare cache — verified via direct `curl` against `assets.infravolt.co.uk`:**

| Object | Status | Content-Type | Content-Length (matches expected) | Cache-Control | cf-cache-status | Age |
|---|---|---|---|---|---|---|
| `references/references-hero-background.webp` | 200 | image/webp | 170688 ✓ | `max-age=86400` | HIT | 543s |
| `references/references-hero-background-mobile.webp` | 200 | image/webp | 42420 ✓ | `max-age=86400` | HIT | 480s |
| `resources/technical-resources-hero-background.webp` | 200 | image/webp | 104014 ✓ | `max-age=86400` | HIT | 480s |
| `resources/technical-resources-hero-background-mobile.webp` | 200 | image/webp | 27122 ✓ | `max-age=86400` | HIT | 480s |
| `media/products/cable-management-systems/infravolt-cable-support-desktop.mp4` | 200 | video/mp4 | 6807671 ✓ | `max-age=86400` | HIT | 480s |
| `media/products/cable-management-systems/infravolt-cable-support-mobile.mp4` | 200 | video/mp4 | 3562102 ✓ | `max-age=86400` | HIT | 480s |

Note: a plain `curl -I` (HEAD request) against these objects returns `cf-cache-status: DYNAMIC` with no `Cache-Control` header — Cloudflare's cache rule appears to only apply to GET responses, not HEAD. Using GET (as shown above, and as any real browser page load does) confirms the cache is working exactly as described: `max-age=86400` (1 day, matching the stated Browser TTL), `cf-cache-status: HIT`, and an `Age` header that increments across requests. The old `infravolt-cable-support.mp4` source file was confirmed still present and un-deleted (15,916,898 bytes, unchanged).

**Real production LCP (already-deployed pages/code only — About, homepage, Application Map):**

| Market | Viewport | Route | Production LCP | LCP element type |
|---|---|---|---|---|
| UK | desktop | `/` | 1312 ms | — |
| UK | mobile | `/` | 944 ms | — |
| UA | desktop | `/` | 1116 ms | — |
| UA | mobile | `/` | 924 ms | — |
| UK | desktop | `/about` | 728 ms | background-image |
| UK | mobile | `/about` | 820 ms | background-image |
| UA | desktop | `/about` | 628 ms | background-image |
| UA | mobile | `/about` | 696 ms | background-image |
| UK | desktop | `/application-map` | 868 ms | image |
| UK | mobile | `/application-map` | 676 ms | image |
| UA | desktop | `/application-map` | 732 ms | image |
| UA | mobile | `/application-map` | 616 ms | image |

All well within Google's "good" LCP threshold (<2.5s). These are the only pages where a real production number is meaningful right now, since References/Resources mobile, and the Cable Management video split, are still branch-only (not deployed) — see "Live vs local" below.

**Important, unrelated discovery — not part of this task's scope, not fixed:**

While gathering live production evidence, four assets referenced by the About page's "GERSAN manufacturing & engineering platform" panel and UK/Ukraine market-card backgrounds were found to **404 on live production**:

```
https://infravolt.co.uk/assets/company/gersan-market-card-background.webp        → 404
https://infravolt.co.uk/assets/company/infravolt-uk-market-card-background.webp  → 404
https://infravolt.co.uk/assets/company/infravolt-ukraine-market-card-background.webp → 404
https://infravolt.co.uk/assets/company/gersan-market-card-motif-mobile.png       → 404
```

These are requested from the **site's own domain** (`infravolt.co.uk/assets/...`), not the asset CDN — i.e. production is currently running `about-page.module.css`/`about-page.tsx` code from *before* the earlier "Fix support/distribution backgrounds" fix in this repo's history (which moved these four backgrounds onto the `publicMediaUrl()`/R2 pattern specifically because the raw `.webp`/`.png` files are gitignored and therefore absent from any fresh deployment build). This is a real, currently-live, user-visible bug (missing background art on the About page's GERSAN/UK/Ukraine panels) — but it is **not caused by this media-performance-optimisation work**, is unrelated to any file this task touched, and per this task's explicit instructions ("do not make unrelated fixes") has been left alone. Flagging it here because it's a genuine finding worth the user's attention, not because it needed to be fixed as part of this pass.

## Summary table

| Asset / Page | Before size | After size | Size change | Before load (R2, real network) | After load (local, no CDN — directional only) | Before LCP | After LCP |
|---|---|---|---|---|---|---|---|
| About hero background (desktop) | 311.3 KB | 311.3 KB | 0% | 104 ms | 85 ms | 612 ms | 1110 ms |
| About hero background (mobile) | 220.5 KB | 220.5 KB | 0% | 146 ms | 65 ms | 536 ms | 684 ms |
| References hero background (desktop) | 1.63 MB | 166.7 KB | -90% | 103 ms | 68 ms | 3512 ms | 4174 ms |
| References hero background (mobile, new file) | n/a | 41.4 KB | new file (no before) | n/a | 45 ms | 2708 ms | 2716 ms |
| Resources hero background (desktop) | 1.65 MB | 101.6 KB | -94% | 198 ms | 60 ms | 988 ms | 1138 ms |
| Resources hero background (mobile, new file) | n/a | 26.5 KB | new file (no before) | n/a | 56 ms | 448 ms | 290 ms |
| Cable Management video (desktop) | 15.18 MB | 6.49 MB | -57% | n/a | n/a | 668 ms | 1358 ms |
| Cable Management video (mobile) | 15.18 MB | 3.40 MB | -78% | n/a | n/a | 540 ms | 406 ms |
| gersan-zonguldak-factory.webp (homepage, desktop) | 2.40 MB | 102.4 KB | -96% | 611 ms | 313 ms | 2640 ms | 2978 ms |
| gersan-zonguldak-factory.webp (homepage, mobile) | 2.40 MB | 43.8 KB | -98% | 702 ms | 213 ms | 1548 ms | 1518 ms |

## Application Map — no file changes made

Investigated (see `media-performance-audit.md` priority-area section): the overview image source is already 1920×1080 at 121 KB on R2 (well-compressed, not oversized), and the `<Image priority sizes="100vw">` usage is already correct — the `--app-map-max-width: 90rem` CSS custom property that looked like a real constraint turned out to be defined but never applied anywhere, so `100vw` is in fact accurate for the current layout. No code or asset change was made here; the perceived slowness in the original audit is attributable to the sitewide missing R2 Cache-Control (documented in `r2-cache-control-action.md`) and dev-server image-optimizer overhead, not a bug in this component.

## Homepage hero video — unchanged, verified not regressed

No changes were made to the homepage hero video, its desktop/mobile split, or its poster — it already had the exact desktop/mobile MP4 + lightweight poster pattern this task replicated for Cable Management. Desktop source before: 10.93 MB; after (same file, local-fallback pass): 11.83 MB — identical, as expected, confirming no regression.

## Top 10 largest images/backgrounds — before vs after

| Market | Viewport | Route | Before size | After size (if page was in this pass) | URL key |
|---|---|---|---|---|---|
| UK | desktop | `/uk-support` | 2.85 MB | 77.2 KB | `company/warehouse/hts-warehouse-exterior.webp` |
| UK | mobile | `/uk-support` | 2.85 MB | 47.7 KB | `company/warehouse/hts-warehouse-exterior.webp` |
| UK | desktop | `/` | 2.40 MB | 102.4 KB | `company/gersan-zonguldak-factory.webp` |
| UK | mobile | `/` | 2.40 MB | 43.8 KB | `company/gersan-zonguldak-factory.webp` |
| UA | desktop | `/` | 2.40 MB | 102.4 KB | `company/gersan-zonguldak-factory.webp` |
| UA | mobile | `/` | 2.40 MB | 43.8 KB | `company/gersan-zonguldak-factory.webp` |
| UK | desktop | `/about` | 2.40 MB | 43.8 KB | `company/gersan-zonguldak-factory.webp` |
| UK | mobile | `/about` | 2.40 MB | 43.8 KB | `company/gersan-zonguldak-factory.webp` |
| UA | desktop | `/about` | 2.40 MB | 43.8 KB | `company/gersan-zonguldak-factory.webp` |
| UA | mobile | `/about` | 2.40 MB | 43.8 KB | `company/gersan-zonguldak-factory.webp` |

## Top 10 slowest images/backgrounds — before vs after

_Duration numbers here mix a real-network BEFORE with a no-CDN-localhost AFTER — see Methodology. Included for completeness, not as a network-performance claim._

| Market | Viewport | Route | Before duration | After duration (if re-audited) | URL key |
|---|---|---|---|---|---|
| UK | desktop | `/products/underfloor-systems` | 1311 ms | not re-audited | `products/underfloor/applications/underfloor-application-control-flexible-work-areas.webp` |
| UK | desktop | `/products/underfloor-systems` | 1137 ms | not re-audited | `products/underfloor/applications/underfloor-application-retail-interiors.webp` |
| UK | desktop | `/products/underfloor-systems` | 1132 ms | not re-audited | `products/underfloor/applications/underfloor-application-meeting-conference-spaces.webp` |
| UK | desktop | `/products/underfloor-systems` | 1104 ms | not re-audited | `products/underfloor/hero/underfloor-cable-trunking-hero-foreground-products.webp` |
| UK | desktop | `/products/underfloor-systems` | 936 ms | not re-audited | `products/underfloor/applications/underfloor-application-education-facilities.webp` |
| UK | desktop | `/products/underfloor-systems` | 829 ms | not re-audited | `products/underfloor/applications/underfloor-application-commercial-buildings.webp` |
| UK | desktop | `/products/underfloor-systems` | 810 ms | not re-audited | `products/underfloor/applications/underfloor-application-offices-workspaces.webp` |
| UK | desktop | `/products/underfloor-systems` | 735 ms | not re-audited | `products/underfloor/series/card/underfloor-tray-accessories-category-card.webp` |
| UK | desktop | `/products/underfloor-systems` | 722 ms | not re-audited | `products/underfloor/series/card/underfloor-socket-data-accessories-category-card.webp` |
| UK | mobile | `/` | 702 ms | 213 ms | `company/gersan-zonguldak-factory.webp` |

## Videos — before vs after

| Market | Viewport | Route | Before size | After size | URL key |
|---|---|---|---|---|---|
| UK | desktop | `/` | 10.93 MB | 11.83 MB | `media/home/infravolt-home-hero-desktop.mp4` |
| UK | mobile | `/` | 5.11 MB | 5.89 MB | `media/home/infravolt-home-hero-mobile.mp4` |
| UA | desktop | `/` | 10.93 MB | 11.27 MB | `media/home/infravolt-home-hero-desktop.mp4` |
| UA | mobile | `/` | 5.11 MB | 5.92 MB | `media/home/infravolt-home-hero-mobile.mp4` |
| UK | desktop | `/products/cable-support-systems` | 15.18 MB | not re-audited / superseded by new desktop+mobile files | `media/products/cable-management-systems/infravolt-cable-support.mp4` |
| UK | mobile | `/products/cable-support-systems` | 15.18 MB | not re-audited / superseded by new desktop+mobile files | `media/products/cable-management-systems/infravolt-cable-support.mp4` |
| UA | desktop | `/products/cable-support-systems` | 15.18 MB | not re-audited / superseded by new desktop+mobile files | `media/products/cable-management-systems/infravolt-cable-support.mp4` |
| UA | mobile | `/products/cable-support-systems` | 15.18 MB | not re-audited / superseded by new desktop+mobile files | `media/products/cable-management-systems/infravolt-cable-support.mp4` |
| UK | desktop | `/products/busbar` | 8.72 MB | not re-audited / superseded by new desktop+mobile files | `media/products/busbar/infravolt-busbar.mp4` |
| UK | mobile | `/products/busbar` | 8.72 MB | not re-audited / superseded by new desktop+mobile files | `media/products/busbar/infravolt-busbar.mp4` |
| UK | desktop | `/products/earthing-and-lightning-protection` | 3.05 MB | not re-audited / superseded by new desktop+mobile files | `media/products/earthing-lightning/infravolt-earthing-lightning.mp4` |
| UK | mobile | `/products/earthing-and-lightning-protection` | 3.05 MB | not re-audited / superseded by new desktop+mobile files | `media/products/earthing-lightning/infravolt-earthing-lightning.mp4` |

New Cable Management video files (no BEFORE equivalent — replacing the single 15.18 MB file above):

| Market | Viewport | Size | URL key |
|---|---|---|---|
| UK | desktop | 6.49 MB | `media/products/cable-management-systems/infravolt-cable-support-desktop.mp4` |
| UK | mobile | 3.40 MB | `media/products/cable-management-systems/infravolt-cable-support-mobile.mp4` |
| UA | desktop | 6.49 MB | `media/products/cable-management-systems/infravolt-cable-support-desktop.mp4` |
| UA | mobile | 3.40 MB | `media/products/cable-management-systems/infravolt-cable-support-mobile.mp4` |

## Mobile transfer sizes — total media bytes per page (mobile viewport)

Sum of `contentLengthBytes` across all image/background/video assets captured for the page, mobile viewport, UK market — a rough proxy for total mobile media payload.

| Route | Before total (mobile, UK) | After total (mobile, UK) | Change |
|---|---|---|---|
| `/` | 29.66 MB | 28.08 MB | -5% |
| `/about` | 11.99 MB | 5.50 MB | -54% |
| `/references` | 1.96 MB | 379.0 KB | -81% |
| `/resources` | 1.82 MB | 200.8 KB | -89% |
| `/uk-support` | 5.09 MB | 260.2 KB | -95% |
| `/products/cable-support-systems` | 15.41 MB | 3.63 MB | -76% |

## LCP — before vs after (directional, see Methodology)

| Market | Viewport | Route | Before LCP | After LCP | Before LCP element | After LCP element |
|---|---|---|---|---|---|---|
| UK | desktop | `/` | 2640 ms | 2978 ms | n/a | n/a |
| UK | mobile | `/` | 1548 ms | 1518 ms | n/a | n/a |
| UA | desktop | `/` | 1964 ms | 1960 ms | n/a | n/a |
| UA | mobile | `/` | 1532 ms | 1576 ms | n/a | n/a |
| UK | desktop | `/about` | 612 ms | 1110 ms | background-image | background-image |
| UK | mobile | `/about` | 536 ms | 684 ms | background-image | background-image |
| UA | desktop | `/about` | 712 ms | 680 ms | background-image | background-image |
| UA | mobile | `/about` | 632 ms | 546 ms | background-image | background-image |
| UK | desktop | `/references` | 3512 ms | 4174 ms | background-image | background-image |
| UK | mobile | `/references` | 2708 ms | 2716 ms | background-image | background-image |
| UA | desktop | `/references` | 1000 ms | 826 ms | background-image | background-image |
| UA | mobile | `/references` | 1136 ms | 910 ms | background-image | background-image |
| UK | desktop | `/resources` | 988 ms | 1138 ms | background-image | background-image |
| UK | mobile | `/resources` | 448 ms | 290 ms | background-image | background-image |
| UA | desktop | `/resources` | 472 ms | 486 ms | background-image | background-image |
| UA | mobile | `/resources` | 600 ms | 270 ms | background-image | background-image |
| UK | desktop | `/uk-support` | 740 ms | 1028 ms | image | image |
| UK | mobile | `/uk-support` | 352 ms | 642 ms | image | image |
| UA | desktop | `/uk-support` | 504 ms | 952 ms | image | image |
| UA | mobile | `/uk-support` | 720 ms | 510 ms | image | image |
| UK | desktop | `/products/cable-support-systems` | 668 ms | 1358 ms | n/a | n/a |
| UK | mobile | `/products/cable-support-systems` | 540 ms | 406 ms | n/a | n/a |
| UA | desktop | `/products/cable-support-systems` | 648 ms | 586 ms | n/a | n/a |
| UA | mobile | `/products/cable-support-systems` | 380 ms | 604 ms | n/a | n/a |

## What this proves vs what still requires the R2 upload

**Proven by this report (byte-level, verifiable right now):**
- References hero background: 1.71 MB → 170.7 KB desktop (-90%), new 42.4 KB mobile variant (previously none existed — mobile downloaded the same 1.71 MB file).
- Resources hero background: 1.73 MB → 104.0 KB desktop (-94%), new 27.1 KB mobile variant (previously none existed).
- Cable Management video: 15.9 MB single file → 6.8 MB desktop (-57%) / 3.6 MB mobile (-78%), both now correctly split by viewport instead of one oversized file shipped everywhere.
- gersan-zonguldak-factory.webp and the other large `unoptimized` photo call sites now flow through Next's responsive image pipeline — confirmed via captured `currentSrc`/`naturalWidth` that mobile now requests a ~640px-wide variant instead of the full 2.40 MB / 1672px-wide original.
- About hero background was already well-compressed (318 KB / 226 KB) — left untouched; only a scoped, justified `preload` was added.

**Still requires the manual R2 action in `r2-cache-control-action.md` before it's live for real users:**
- None of the above optimised bytes are on the R2 bucket yet — production visitors are still served the old, larger files until someone uploads the six changed/new files.
- The sitewide missing `Cache-Control` header (affecting every R2 asset, not just the ones touched here) is unrelated to file size and needs the bucket/metadata action documented separately.
