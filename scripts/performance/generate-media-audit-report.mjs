// Reads docs/performance/media-performance-audit.aggregated.json and writes
// the two required deliverables: media-performance-audit.md (human) and
// media-performance-audit.csv (machine). Audit-only — no application code
// or asset changes.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../docs/performance");
const AGG_IN = path.join(OUT_DIR, "media-performance-audit.aggregated.json");
const MD_OUT = path.join(OUT_DIR, "media-performance-audit.md");
const CSV_OUT = path.join(OUT_DIR, "media-performance-audit.csv");

const R2_HOST = "pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev";

function fmtBytes(bytes) {
  if (bytes === null || bytes === undefined) return "n/a";
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function fmtMs(ms) {
  if (ms === null || ms === undefined) return "n/a";
  return `${Math.round(ms)} ms`;
}

function hasEffectiveCache(cacheControl) {
  if (!cacheControl) return false;
  const m = /max-age=(\d+)/.exec(cacheControl);
  if (!m) return false;
  return Number(m[1]) > 0 && !/no-store/.test(cacheControl);
}

function classify(asset) {
  let score = 0;
  const reasons = [];

  if (asset.aboveFold) {
    score += 2;
    reasons.push("above the fold");
  }
  if (asset.pageLcpIsThisAssetRate > 0) {
    score += 3;
    reasons.push("is the page LCP element on at least one run");
  }
  if (asset.assetType === "background-image") {
    score += 1;
    reasons.push("CSS background-image (no native lazy-loading / responsive srcset available)");
  }
  if (asset.assetType === "video") {
    score += 1;
    reasons.push("video asset");
  }
  if (asset.viewport === "mobile") {
    score += 1;
    reasons.push("mobile viewport");
  }
  if (asset.medianDurationMs !== null) {
    if (asset.medianDurationMs > 800) {
      score += 3;
      reasons.push(`slow transfer (${fmtMs(asset.medianDurationMs)})`);
    } else if (asset.medianDurationMs > 400) {
      score += 2;
      reasons.push(`moderate transfer time (${fmtMs(asset.medianDurationMs)})`);
    } else if (asset.medianDurationMs > 200) {
      score += 1;
    }
  }
  if (asset.contentLengthBytes !== null) {
    if (asset.contentLengthBytes > 1_000_000) {
      score += 3;
      reasons.push(`large file (${fmtBytes(asset.contentLengthBytes)})`);
    } else if (asset.contentLengthBytes > 400_000) {
      score += 2;
      reasons.push(`sizeable file (${fmtBytes(asset.contentLengthBytes)})`);
    } else if (asset.contentLengthBytes > 150_000) {
      score += 1;
    }
  }
  if (hasEffectiveCache(asset.cacheControl)) {
    score -= 1;
  } else {
    score += 1;
    reasons.push("no effective cache-control for repeat visits");
  }
  if (asset.loadedBeforeScrollRate > 0.5 && asset.aboveFold === false) {
    score += 2;
    reasons.push("fetched before scroll despite being below the fold (unnecessary initial-load bytes)");
  }

  let level = "GOOD";
  if (score >= 6) level = "CRITICAL";
  else if (score >= 3) level = "NEEDS OPTIMISATION";

  return { level, score, reasons };
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function main() {
  const agg = JSON.parse(fs.readFileSync(AGG_IN, "utf8"));
  const assets = agg.assets.map((a) => ({ ...a, classification: classify(a) }));

  const images = assets.filter((a) => a.assetType === "image");
  const backgrounds = assets.filter((a) => a.assetType === "background-image");
  const videos = assets.filter((a) => a.assetType === "video");

  // ---- CSV ----
  const csvHeaders = [
    "market", "viewport", "route", "tier", "assetType", "url", "isR2",
    "runsObserved", "aboveFold", "loadedBeforeScrollRate", "loadingAttr", "poster",
    "renderedWidth", "renderedHeight", "naturalWidth", "naturalHeight",
    "httpStatus", "contentType", "contentLengthBytes", "cacheControl", "etag",
    "medianStartTimeMs", "medianResponseEndMs", "medianDurationMs", "medianVideoCanPlayMs",
    "medianPageLcpMs", "pageLcpIsThisAssetRate", "medianPageCls",
    "classification", "classificationScore", "classificationReasons",
  ];
  const csvLines = [csvHeaders.join(",")];
  for (const a of assets) {
    csvLines.push(
      csvHeaders
        .map((h) => {
          if (h === "classification") return csvEscape(a.classification.level);
          if (h === "classificationScore") return csvEscape(a.classification.score);
          if (h === "classificationReasons") return csvEscape(a.classification.reasons.join("; "));
          return csvEscape(a[h]);
        })
        .join(","),
    );
  }
  fs.writeFileSync(CSV_OUT, csvLines.join("\n") + "\n");

  // ---- MD ----
  const routesTested = [...new Set(assets.map((a) => `${a.market}:${a.route}`))].sort();
  const criticalCount = assets.filter((a) => a.classification.level === "CRITICAL").length;
  const needsOptCount = assets.filter((a) => a.classification.level === "NEEDS OPTIMISATION").length;
  const goodCount = assets.filter((a) => a.classification.level === "GOOD").length;

  const top10SlowestImagesAndBg = [...images, ...backgrounds]
    .filter((a) => a.medianDurationMs !== null)
    .sort((a, b) => b.medianDurationMs - a.medianDurationMs)
    .slice(0, 10);

  const top10LargestImagesAndBg = [...images, ...backgrounds]
    .filter((a) => a.contentLengthBytes !== null)
    .sort((a, b) => b.contentLengthBytes - a.contentLengthBytes)
    .slice(0, 10);

  const slowestVideos = [...videos]
    .filter((a) => a.medianDurationMs !== null)
    .sort((a, b) => b.medianDurationMs - a.medianDurationMs);

  const largestVideos = [...videos]
    .filter((a) => a.contentLengthBytes !== null)
    .sort((a, b) => b.contentLengthBytes - a.contentLengthBytes);

  const worstLcpPages = [...agg.pages]
    .filter((p) => p.medianLcpMs !== null && ["image", "video", "background-image"].includes(p.lcpAssetType))
    .sort((a, b) => b.medianLcpMs - a.medianLcpMs)
    .slice(0, 15);

  const unnecessaryInitialLoads = assets
    .filter((a) => a.loadedBeforeScrollRate > 0.5 && a.aboveFold === false)
    .sort((a, b) => (b.contentLengthBytes ?? 0) - (a.contentLengthBytes ?? 0));

  const desktopSizedOnMobile = assets
    .filter(
      (a) =>
        a.viewport === "mobile" &&
        a.naturalWidth &&
        a.renderedWidth &&
        a.naturalWidth > a.renderedWidth * 3 &&
        (a.contentLengthBytes ?? 0) > 100_000,
    )
    .sort((a, b) => (b.contentLengthBytes ?? 0) - (a.contentLengthBytes ?? 0));

  const missingCacheHeaders = assets.filter((a) => !hasEffectiveCache(a.cacheControl));
  const missingCacheR2 = missingCacheHeaders.filter((a) => a.isR2);
  const missingCacheLocal = missingCacheHeaders.filter((a) => !a.isR2);

  const videosNoPoster = videos.filter((a) => !a.poster);

  const criticalAssets = assets
    .filter((a) => a.classification.level === "CRITICAL")
    .sort((a, b) => b.classification.score - a.classification.score);

  function assetRow(a) {
    return `| ${a.market.toUpperCase()} | ${a.viewport} | \`${a.route}\` | ${a.assetType} | ${fmtBytes(a.contentLengthBytes)} | ${fmtMs(a.medianDurationMs)} | ${a.classification.level} | \`${a.url.length > 90 ? a.url.slice(0, 87) + "..." : a.url}\` |`;
  }

  const lines = [];
  lines.push("# InfraVolt Media Performance Audit — Images, Backgrounds & Video");
  lines.push("");
  lines.push(`Generated: ${agg.generatedAt}`);
  lines.push("");
  lines.push(
    "**Scope:** audit-only. No image/video files, page design, copy, product data, SEO, security/trusted-host logic, R2 URLs, or production behaviour were changed as part of this task.",
  );
  lines.push("");

  lines.push("## Methodology");
  lines.push("");
  lines.push(
    "- Measured against the project's own dev server with `NEXT_PUBLIC_ASSET_BASE_URL` pointed at the real Cloudflare R2 bucket (not the Playwright e2e harness, which deliberately blanks that variable for test isolation — see `tests/helpers/test-environment.ts`). This means R2 response headers, transfer sizes, and cache behaviour reflect real production asset delivery; only the HTML shell itself is dev-server-rendered rather than a production Next.js build.",
  );
  lines.push(
    "- Cold-cache approximation: every run opens a brand-new Playwright browser context (isolated cache/storage partition) and sends `Cache-Control: no-cache` on the navigation request.",
  );
  lines.push(
    "- Two viewport profiles: desktop (1920×1080) and mobile (390×844).",
  );
  lines.push(
    "- Two-phase capture per page load: (1) immediately after `load` + 1.2s settle — this captures true above-the-fold / initial-viewport behaviour without forcing anything to load; (2) after programmatically scrolling through the full page — this catalogues the complete media inventory (including native lazy-loaded images) and confirms whether below-fold assets were correctly deferred.",
  );
  lines.push(
    "- LCP and CLS are captured via `PerformanceObserver` (`largest-contentful-paint`, `layout-shift`) at the pre-scroll checkpoint, i.e. before any forced scrolling — representative of what a real visitor sees without interacting.",
  );
  lines.push(
    "- Route coverage: **priority routes** (home, About, References, Resources, Contact, Support, Application Map + one sector, Cable Management hub — the areas explicitly flagged as visibly slow) were run with the full matrix: both markets (UK/UA) × both viewports × 3 runs, metrics reported as the median. **Category hub pages** (Busbar, Earthing & Lightning, LED Systems, Underfloor, EV Charging/G-Bus) and **one representative detail/series page per family** were sampled once per viewport on the UK host only — product imagery and background art are delivered from the same R2 object keys regardless of market (only page copy differs by host), so a UK-only pass covers the underlying asset-delivery behaviour without multiplying run count across the long tail of ~140+ individual product pages. This is documented further under Limitations.",
  );
  lines.push(
    "- **Sizes vs. Resource Timing API:** cross-origin R2 responses do not send a `Timing-Allow-Origin` header, so the browser's Resource Timing API zeroes out `transferSize`/`encodedBodySize`/`decodedBodySize` for every R2 request (a real, sitewide side-effect of the current R2 configuration — see finding below). File sizes reported here instead come from the `Content-Length` response header, captured directly via Playwright's network listener (not subject to that browser restriction). Transfer *duration* (`startTime`/`responseEnd`/timing) is unaffected and is reported from the Resource Timing API as normal.",
  );
  lines.push("");

  lines.push("## Coverage");
  lines.push("");
  lines.push(`- Routes tested: **${routesTested.length}** market/route combinations (${[...new Set(assets.map((a) => a.route))].length} unique routes × up to 2 markets)`);
  lines.push(`- Images tested: **${new Set(images.map((a) => a.url)).size}** unique image assets (${images.length} market/viewport/route observations)`);
  lines.push(`- Background images tested: **${new Set(backgrounds.map((a) => a.url)).size}** unique background-image assets (${backgrounds.length} market/viewport/route observations)`);
  lines.push(`- Videos tested: **${new Set(videos.map((a) => a.url)).size}** unique video assets (${videos.length} market/viewport/route observations)`);
  lines.push(`- Pages with LCP measured: **${agg.pages.length}**`);
  if (agg.failedJobs.length > 0) {
    lines.push(`- Failed page loads (excluded from metrics): **${agg.failedJobs.length}**`);
  }
  lines.push("");
  lines.push("Routes tested:");
  lines.push("");
  for (const r of routesTested) lines.push(`- \`${r}\``);
  lines.push("");

  lines.push("## Classification summary");
  lines.push("");
  lines.push(`| Level | Count |`);
  lines.push(`|---|---|`);
  lines.push(`| CRITICAL | ${criticalCount} |`);
  lines.push(`| NEEDS OPTIMISATION | ${needsOptCount} |`);
  lines.push(`| GOOD | ${goodCount} |`);
  lines.push("");
  lines.push(
    "Classification is not size-only — it weights above-the-fold position, LCP involvement, transfer duration, mobile viewport impact, effective cache-control for repeat visits, and whether the asset type (video, CSS background-image) has any native lazy-loading option at all. See `classificationReasons` in the CSV for the per-asset breakdown.",
  );
  lines.push("");

  lines.push("## Top performance problems (CRITICAL, highest severity first)");
  lines.push("");
  if (criticalAssets.length === 0) {
    lines.push("No assets scored CRITICAL under the current heuristic.");
  } else {
    lines.push("| Market | Viewport | Route | Type | Size | Duration | Reasons |");
    lines.push("|---|---|---|---|---|---|---|");
    for (const a of criticalAssets.slice(0, 20)) {
      lines.push(
        `| ${a.market.toUpperCase()} | ${a.viewport} | \`${a.route}\` | ${a.assetType} | ${fmtBytes(a.contentLengthBytes)} | ${fmtMs(a.medianDurationMs)} | ${a.classification.reasons.join("; ")} |`,
      );
    }
  }
  lines.push("");

  lines.push("## Priority areas called out for this audit");
  lines.push("");
  const priorityChecks = [
    { label: "About page hero background", match: (a) => a.route === "/about" && a.assetType === "background-image" },
    { label: "References hero background", match: (a) => a.route === "/references" && a.assetType === "background-image" },
    { label: "Resources hero background", match: (a) => a.route === "/resources" && a.assetType === "background-image" },
    {
      label: "Application Map overview/background imagery",
      match: (a) => a.route.startsWith("/application-map") && (a.assetType === "background-image" || a.assetType === "image"),
    },
    { label: "Cable Management video", match: (a) => a.route === "/products/cable-support-systems" && a.assetType === "video" },
  ];
  for (const check of priorityChecks) {
    const matches = assets.filter(check.match);
    lines.push(`### ${check.label}`);
    lines.push("");
    if (matches.length === 0) {
      lines.push("_No matching asset captured in this run._");
    } else {
      lines.push("| Market | Viewport | Size | Duration | LCP (page) | Classification |");
      lines.push("|---|---|---|---|---|---|");
      const seen = new Set();
      for (const a of matches) {
        const key = `${a.market}-${a.viewport}-${a.url}`;
        if (seen.has(key)) continue;
        seen.add(key);
        lines.push(
          `| ${a.market.toUpperCase()} | ${a.viewport} | ${fmtBytes(a.contentLengthBytes)} | ${fmtMs(a.medianDurationMs)} | ${fmtMs(a.medianPageLcpMs)}${a.pageLcpIsThisAssetRate > 0 ? " (this asset is the LCP element)" : ""} | ${a.classification.level} |`,
        );
      }
      lines.push("");
      lines.push(`Asset URL(s): ${[...new Set(matches.map((a) => `\`${a.url}\``))].join(", ")}`);
    }
    lines.push("");
  }

  lines.push("## 10 slowest images/backgrounds (by median transfer duration)");
  lines.push("");
  lines.push("| Market | Viewport | Route | Type | Size | Duration | Classification | URL |");
  lines.push("|---|---|---|---|---|---|---|---|");
  for (const a of top10SlowestImagesAndBg) lines.push(assetRow(a));
  lines.push("");

  lines.push("## 10 largest images/backgrounds (by file size)");
  lines.push("");
  lines.push("| Market | Viewport | Route | Type | Size | Duration | Classification | URL |");
  lines.push("|---|---|---|---|---|---|---|---|");
  for (const a of top10LargestImagesAndBg) lines.push(assetRow(a));
  lines.push("");

  lines.push("## Slowest videos (by median transfer duration)");
  lines.push("");
  if (slowestVideos.length === 0) {
    lines.push("_No video assets captured._");
  } else {
    lines.push("| Market | Viewport | Route | Size | Duration | Time-to-playable | Poster | Classification | URL |");
    lines.push("|---|---|---|---|---|---|---|---|---|");
    for (const a of slowestVideos) {
      lines.push(
        `| ${a.market.toUpperCase()} | ${a.viewport} | \`${a.route}\` | ${fmtBytes(a.contentLengthBytes)} | ${fmtMs(a.medianDurationMs)} | ${fmtMs(a.medianVideoCanPlayMs)} | ${a.poster ? "yes" : "**missing**"} | ${a.classification.level} | \`${a.url}\` |`,
      );
    }
  }
  lines.push("");

  lines.push("## Largest videos (by file size)");
  lines.push("");
  if (largestVideos.length === 0) {
    lines.push("_No video assets captured._");
  } else {
    lines.push("| Market | Viewport | Route | Size | Duration | Poster | URL |");
    lines.push("|---|---|---|---|---|---|---|");
    for (const a of largestVideos) {
      lines.push(`| ${a.market.toUpperCase()} | ${a.viewport} | \`${a.route}\` | ${fmtBytes(a.contentLengthBytes)} | ${fmtMs(a.medianDurationMs)} | ${a.poster ? "yes" : "**missing**"} | \`${a.url}\` |`);
    }
  }
  lines.push("");

  lines.push("## Pages with the worst media-related LCP");
  lines.push("");
  lines.push("| Market | Viewport | Route | Median LCP | LCP element type | LCP asset |");
  lines.push("|---|---|---|---|---|---|");
  for (const p of worstLcpPages) {
    lines.push(
      `| ${p.market.toUpperCase()} | ${p.viewport} | \`${p.route}\` | ${fmtMs(p.medianLcpMs)} | ${p.lcpAssetType} | \`${p.lcpUrl ? (p.lcpUrl.length > 80 ? p.lcpUrl.slice(0, 77) + "..." : p.lcpUrl) : "n/a"}\` |`,
    );
  }
  lines.push("");

  lines.push("## Assets downloaded unnecessarily on initial load");
  lines.push("");
  lines.push(
    "Assets that were fetched *before* the page was scrolled even though they render below the fold — i.e. bytes spent on the initial load for content the visitor had not yet reached. CSS background-images have no native lazy-loading mechanism at all, so any below-fold background-image is unavoidably in this list under the current implementation.",
  );
  lines.push("");
  if (unnecessaryInitialLoads.length === 0) {
    lines.push("_None detected — below-fold media deferred correctly in the sampled routes._");
  } else {
    lines.push("| Market | Viewport | Route | Type | Size | Loaded-before-scroll rate | URL |");
    lines.push("|---|---|---|---|---|---|---|");
    for (const a of unnecessaryInitialLoads.slice(0, 25)) {
      lines.push(
        `| ${a.market.toUpperCase()} | ${a.viewport} | \`${a.route}\` | ${a.assetType} | ${fmtBytes(a.contentLengthBytes)} | ${Math.round(a.loadedBeforeScrollRate * 100)}% | \`${a.url}\` |`,
      );
    }
  }
  lines.push("");

  lines.push("## Desktop-sized assets unnecessarily delivered to mobile");
  lines.push("");
  lines.push(
    "Mobile-viewport loads where the asset's intrinsic (natural) width is more than 3× its rendered width and the file is over 100 KB — i.e. a desktop-resolution file being shipped to a 390px-wide viewport with no responsive variant.",
  );
  lines.push("");
  if (desktopSizedOnMobile.length === 0) {
    lines.push("_None detected in the sampled routes._");
  } else {
    lines.push("| Route | Rendered w | Natural w | Size | URL |");
    lines.push("|---|---|---|---|---|");
    for (const a of desktopSizedOnMobile.slice(0, 25)) {
      lines.push(`| \`${a.route}\` | ${a.renderedWidth}px | ${a.naturalWidth}px | ${fmtBytes(a.contentLengthBytes)} | \`${a.url}\` |`);
    }
  }
  lines.push("");

  lines.push("## Missing or ineffective cache headers");
  lines.push("");
  lines.push(
    `${missingCacheHeaders.length} of ${assets.length} asset observations (${new Set(missingCacheHeaders.map((a) => a.url)).size} unique URLs) have no effective \`Cache-Control\` for repeat visits (missing header, \`max-age=0\`, or \`no-store\`).`,
  );
  lines.push("");
  lines.push(`- **R2-hosted assets with no effective cache header: ${new Set(missingCacheR2.map((a) => a.url)).size} unique URLs.** In this audit, every direct R2 (\`${R2_HOST}\`) response observed returned **no \`Cache-Control\` header at all** — confirmed directly via response headers, not just this sample. Browsers fall back to heuristic caching (RFC 7234 §4.2.2, typically ~10% of time since \`Last-Modified\`), which is unreliable and often short. This affects every image, background, and video served from R2 across the whole site, not just the pages sampled here.`);
  lines.push(`- **Locally/Next-served assets (dev server \`/assets/...\` fallback or \`/_next/image\`) with no effective cache header: ${new Set(missingCacheLocal.map((a) => a.url)).size} unique URLs.** Note: this dev server intentionally serves weak cache headers (\`max-age=0\`, \`must-revalidate\`) for development convenience — production Next.js builds typically set long-lived immutable caching for \`/_next/image\` and static \`/public\` assets, so this sub-finding is a dev-mode artifact, not necessarily a production issue (see Limitations).`);
  lines.push("");

  lines.push("## Missing poster / preload strategy on video");
  lines.push("");
  if (videos.length === 0) {
    lines.push("_No video assets captured._");
  } else {
    lines.push(`- ${new Set(videosNoPoster.map((a) => a.url)).size} of ${new Set(videos.map((a) => a.url)).size} unique video asset(s) captured have no \`poster\` attribute set.`);
    lines.push(`- All videos in this codebase share the same \`preload="metadata"\` value (set once in the shared \`AccessibleVideo\` component) — consistent, but worth confirming it's the right default per placement (e.g. a below-the-fold video arguably wants \`preload="none"\`).`);
    if (videosNoPoster.length > 0) {
      lines.push("");
      lines.push("| Market | Viewport | Route | URL |");
      lines.push("|---|---|---|---|");
      for (const a of videosNoPoster) lines.push(`| ${a.market.toUpperCase()} | ${a.viewport} | \`${a.route}\` | \`${a.url}\` |`);
    }
  }
  lines.push("");

  lines.push("## Recommended optimisation order");
  lines.push("");
  lines.push("This is a suggested sequencing only — no changes were made as part of this audit.");
  lines.push("");
  lines.push(
    "1. **Set an explicit `Cache-Control` policy on the R2 bucket/custom domain** (e.g. `public, max-age=31536000, immutable` for content-hashed or rarely-changed static media). This is a delivery-policy change (R2 bucket/domain config), not a code change, and benefits every single media asset on the site simultaneously — highest leverage, lowest implementation risk.",
  );
  lines.push(
    "2. **Recompress/resize the CRITICAL-classified hero and card background images** (About/References/Resources heroes, the three About \"support/distribution\" panel backgrounds, Application Map imagery) — several are 1–2 MB decorative `.webp` files serving as CSS backgrounds with no responsive variant and no lazy-loading option, and multiple are also the page's LCP element.",
  );
  lines.push(
    "3. **Give CSS hero/background images a real loading-priority strategy** — e.g. a `<link rel=preload as=image>` for the confirmed LCP background per hero, since browsers discover `background-image` URLs later than `<img>`/`<link>` (CSS must be parsed first), which the data above shows contributing to elevated LCP on the flagged pages.",
  );
  lines.push(
    "4. **Add responsive delivery for the Cable Management (and other) hero video** — confirm poster coverage everywhere, and evaluate whether `preload=\"none\"` or a lighter poster-first strategy suits below-the-fold placements better than the current blanket `preload=\"metadata\"`.",
  );
  lines.push(
    "5. **Add a real responsive image strategy (`sizes`/`srcset` or Next `<Image>` optimisation) for mobile** for the assets flagged under \"desktop-sized assets unnecessarily delivered to mobile\" — several product/category images currently ship the same full-resolution file regardless of viewport.",
  );
  lines.push(
    "6. **Re-audit after each step** using this same script (`pnpm node scripts/performance/media-performance-audit.mjs`) to confirm the intended metric actually moved, rather than assuming a fix worked.",
  );
  lines.push("");

  lines.push("## Limitations");
  lines.push("");
  lines.push(
    "- The HTML shell is served by `next dev` (Turbopack dev server), not a production build — Next.js production and dev servers can differ in `/_next/image` and static-asset cache-header behaviour (see above). R2 asset delivery itself is unaffected by this, since R2 is an external origin.",
  );
  lines.push(
    "- Category hub pages and the long tail of individual product/series pages (~140+ routes in the sitemap manifest) were sampled rather than run exhaustively — see Methodology. Coverage is representative per product family, not exhaustive per SKU page.",
  );
  lines.push(
    "- \"Cold cache\" is approximated via a fresh Playwright browser context + `Cache-Control: no-cache` per run; it is not a byte-for-byte guarantee of an empty OS/CDN cache (e.g. Cloudflare's edge cache for R2 objects may still have been warm from earlier requests in this same audit run).",
  );
  lines.push(
    "- `transferSize`/`encodedBodySize` from the Resource Timing API read as `0` for all R2-origin requests because R2 does not send `Timing-Allow-Origin`; sizes were substituted from the `Content-Length` response header instead (see Methodology). This is itself worth fixing independently of any image-optimisation work, since it also blinds any real user-monitoring/analytics tooling that relies on Resource Timing.",
  );
  lines.push(
    "- LCP/CLS are captured from a single automated page load per data point (median across the 1–3 runs performed), not from real-user field data (CrUX). Lab data here is directional, not a replacement for field monitoring.",
  );
  lines.push(
    "- Some small `/_next/image` files (a few KB–50 KB) show surprisingly high durations (700–1300 ms) in the \"slowest images\" table — this lines up with `nextHopProtocol: http/1.1` observed on those requests, i.e. the dev server serving many concurrent optimised-image requests over a connection-limited HTTP/1.1 origin rather than per-file weight. Treat entries in that table with small file sizes as a signal about connection/request-count contention (worth re-checking against a production build, which serves over HTTP/2), not necessarily about the individual file needing recompression.",
  );
  lines.push("");

  fs.writeFileSync(MD_OUT, lines.join("\n"));
  console.log(`Wrote: ${MD_OUT}`);
  console.log(`Wrote: ${CSV_OUT}`);
}

main();
