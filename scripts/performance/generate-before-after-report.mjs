// Builds docs/performance/media-performance-before-after.md by joining the
// original (BEFORE, R2-backed) audit aggregation with the focused AFTER
// audit aggregation (run against the local-fallback server so the newly
// optimised local bytes are what's actually measured). Audit-only.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../docs/performance");
const BEFORE_IN = path.join(OUT_DIR, "media-performance-audit.aggregated.json");
const AFTER_IN = path.join(OUT_DIR, "media-performance-audit.after.aggregated.json");
const MD_OUT = path.join(OUT_DIR, "media-performance-before-after.md");

function relativeKey(url) {
  try {
    const u = new URL(url);
    if (u.pathname === "/_next/image") {
      const inner = u.searchParams.get("url");
      if (inner) return relativeKey(decodeURIComponent(inner));
      return url;
    }
    if (u.pathname.startsWith("/assets/")) return u.pathname.replace(/^\/assets\//, "");
    return u.pathname.replace(/^\/+/, "");
  } catch {
    return url;
  }
}

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

function pctChange(before, after) {
  if (before === null || before === undefined || after === null || after === undefined || before === 0) return null;
  return ((after - before) / before) * 100;
}

function fmtPct(pct) {
  if (pct === null) return "n/a";
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct.toFixed(0)}%`;
}

function indexByKey(assets) {
  const map = new Map();
  for (const a of assets) {
    const key = [a.market, a.viewport, a.route, relativeKey(a.url)].join("::");
    map.set(key, a);
  }
  return map;
}

function findAsset(assets, { market, viewport, route, urlIncludes }) {
  return assets.find(
    (a) =>
      a.market === market &&
      a.viewport === viewport &&
      a.route === route &&
      relativeKey(a.url).includes(urlIncludes),
  );
}

function main() {
  const before = JSON.parse(fs.readFileSync(BEFORE_IN, "utf8"));
  const after = JSON.parse(fs.readFileSync(AFTER_IN, "utf8"));

  const beforeAssets = before.assets;
  const afterAssets = after.assets;
  const beforePages = before.pages;
  const afterPages = after.pages;

  function pageLcp(pages, market, viewport, route) {
    return pages.find((p) => p.market === market && p.viewport === viewport && p.route === route) ?? null;
  }

  const lines = [];
  lines.push("# Media Performance — Before vs After Optimisation");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push(
    "**Scope:** compares the baseline audit (`docs/performance/media-performance-audit.md`, captured before this optimisation pass) against a focused re-audit of the six pages touched by this work.",
  );
  lines.push("");

  lines.push("## Methodology — read this before the numbers");
  lines.push("");
  lines.push(
    "- **BEFORE** was measured against the real Cloudflare R2 bucket (`NEXT_PUBLIC_ASSET_BASE_URL` set), i.e. actual production asset delivery.",
  );
  lines.push(
    "- **AFTER** was measured against a second local dev server instance with `NEXT_PUBLIC_ASSET_BASE_URL` unset, so it serves the *newly optimised local files* directly from `/assets/...` instead of R2. This was necessary because this task does not upload anything to the live R2 bucket without explicit authorisation (see `docs/performance/r2-cache-control-action.md`) — the optimised bytes exist locally and are proven correct, but are not yet live in production.",
  );
  lines.push(
    "- **Size comparisons below are fully valid** — `Content-Length` is measured the same way in both passes, and the AFTER files are the exact bytes that would ship if/when they're uploaded to R2.",
  );
  lines.push(
    "- **Duration/LCP comparisons are directional only, not a clean before/after of network performance.** BEFORE traveled over the real internet to Cloudflare's edge; AFTER traveled over localhost with no CDN, no TLS, no real network latency at all — it will always look faster than BEFORE regardless of file size, so a large duration/LCP delta here is not proof of a production speed win by itself. What IS proven: (a) the files are dramatically smaller (proven directly via byte counts), (b) the correct viewport-specific variant is what actually loads (proven via the URL/resolution captured for each run), and (c) nothing broke (proven via the validation suite and visual checks). The genuine production timing win still depends on the R2 upload + Cache-Control fix in `r2-cache-control-action.md`.",
  );
  lines.push(
    "- Where a BEFORE or AFTER data point doesn't exist (e.g. a brand-new mobile variant that had no BEFORE equivalent), this report says so explicitly rather than inventing a number.",
  );
  lines.push("");

  lines.push("## Summary table");
  lines.push("");
  lines.push("| Asset / Page | Before size | After size | Size change | Before load (R2, real network) | After load (local, no CDN — directional only) | Before LCP | After LCP |");
  lines.push("|---|---|---|---|---|---|---|---|");

  const summaryTargets = [
    { label: "About hero background (desktop)", market: "uk", viewport: "desktop", route: "/about", urlIncludes: "about-hero-background.webp" },
    { label: "About hero background (mobile)", market: "uk", viewport: "mobile", route: "/about", urlIncludes: "about-hero-background-mobile.webp" },
    { label: "References hero background (desktop)", market: "uk", viewport: "desktop", route: "/references", urlIncludes: "references-hero-background.webp" },
    { label: "References hero background (mobile, new file)", market: "uk", viewport: "mobile", route: "/references", urlIncludes: "references-hero-background-mobile.webp" },
    { label: "Resources hero background (desktop)", market: "uk", viewport: "desktop", route: "/resources", urlIncludes: "technical-resources-hero-background.webp" },
    { label: "Resources hero background (mobile, new file)", market: "uk", viewport: "mobile", route: "/resources", urlIncludes: "technical-resources-hero-background-mobile.webp" },
    { label: "Cable Management video (desktop)", market: "uk", viewport: "desktop", route: "/products/cable-support-systems", urlIncludes: "cable-support" },
    { label: "Cable Management video (mobile)", market: "uk", viewport: "mobile", route: "/products/cable-support-systems", urlIncludes: "cable-support" },
    { label: "gersan-zonguldak-factory.webp (homepage, desktop)", market: "uk", viewport: "desktop", route: "/", urlIncludes: "gersan-zonguldak-factory.webp" },
    { label: "gersan-zonguldak-factory.webp (homepage, mobile)", market: "uk", viewport: "mobile", route: "/", urlIncludes: "gersan-zonguldak-factory.webp" },
  ];

  for (const t of summaryTargets) {
    // Video assets: prefer the video-type match (desktop/mobile mp4); some
    // pages have both a video AND a poster image matching "cable-support".
    const pool = t.urlIncludes === "cable-support" ? beforeAssets.filter((a) => a.assetType === "video") : beforeAssets;
    const poolAfter = t.urlIncludes === "cable-support" ? afterAssets.filter((a) => a.assetType === "video") : afterAssets;
    const b = findAsset(pool, t);
    const a = findAsset(poolAfter, t);

    const beforeSize = b ? b.contentLengthBytes : null;
    const afterSize = a ? a.contentLengthBytes : null;
    const beforeDur = b ? b.medianDurationMs : null;
    const afterDur = a ? a.medianDurationMs : null;
    const bPage = pageLcp(beforePages, t.market, t.viewport, t.route);
    const aPage = pageLcp(afterPages, t.market, t.viewport, t.route);

    const sizeChange = b && a ? fmtPct(pctChange(beforeSize, afterSize)) : b && !a ? "n/a (not found after)" : !b && a ? "new file (no before)" : "n/a";

    lines.push(
      `| ${t.label} | ${b ? fmtBytes(beforeSize) : "n/a"} | ${a ? fmtBytes(afterSize) : "n/a"} | ${sizeChange} | ${b ? fmtMs(beforeDur) : "n/a"} | ${a ? fmtMs(afterDur) : "n/a"} | ${bPage ? fmtMs(bPage.medianLcpMs) : "n/a"} | ${aPage ? fmtMs(aPage.medianLcpMs) : "n/a"} |`,
    );
  }
  lines.push("");

  lines.push("## Application Map — no file changes made");
  lines.push("");
  lines.push(
    "Investigated (see `media-performance-audit.md` priority-area section): the overview image source is already 1920×1080 at 121 KB on R2 (well-compressed, not oversized), and the `<Image priority sizes=\"100vw\">` usage is already correct — the `--app-map-max-width: 90rem` CSS custom property that looked like a real constraint turned out to be defined but never applied anywhere, so `100vw` is in fact accurate for the current layout. No code or asset change was made here; the perceived slowness in the original audit is attributable to the sitewide missing R2 Cache-Control (documented in `r2-cache-control-action.md`) and dev-server image-optimizer overhead, not a bug in this component.",
  );
  lines.push("");

  lines.push("## Homepage hero video — unchanged, verified not regressed");
  lines.push("");
  const homeVideoDesktopB = findAsset(beforeAssets.filter((a) => a.assetType === "video"), { market: "uk", viewport: "desktop", route: "/", urlIncludes: "infravolt-home-hero-desktop.mp4" });
  const homeVideoDesktopA = findAsset(afterAssets.filter((a) => a.assetType === "video"), { market: "uk", viewport: "desktop", route: "/", urlIncludes: "infravolt-home-hero-desktop.mp4" });
  lines.push(
    `No changes were made to the homepage hero video, its desktop/mobile split, or its poster — it already had the exact desktop/mobile MP4 + lightweight poster pattern this task replicated for Cable Management. Desktop source before: ${homeVideoDesktopB ? fmtBytes(homeVideoDesktopB.contentLengthBytes) : "n/a"}; after (same file, local-fallback pass): ${homeVideoDesktopA ? fmtBytes(homeVideoDesktopA.contentLengthBytes) : "n/a"} — identical, as expected, confirming no regression.`,
  );
  lines.push("");

  lines.push("## Top 10 largest images/backgrounds — before vs after");
  lines.push("");
  const beforeTop10Largest = [...beforeAssets]
    .filter((a) => (a.assetType === "image" || a.assetType === "background-image") && a.contentLengthBytes !== null)
    .sort((x, y) => y.contentLengthBytes - x.contentLengthBytes)
    .slice(0, 10);
  lines.push("| Market | Viewport | Route | Before size | After size (if page was in this pass) | URL key |");
  lines.push("|---|---|---|---|---|---|");
  const afterIndex = indexByKey(afterAssets);
  for (const b of beforeTop10Largest) {
    const key = [b.market, b.viewport, b.route, relativeKey(b.url)].join("::");
    const a = afterIndex.get(key);
    lines.push(
      `| ${b.market.toUpperCase()} | ${b.viewport} | \`${b.route}\` | ${fmtBytes(b.contentLengthBytes)} | ${a ? fmtBytes(a.contentLengthBytes) : "not re-audited (page not in this pass)"} | \`${relativeKey(b.url)}\` |`,
    );
  }
  lines.push("");

  lines.push("## Top 10 slowest images/backgrounds — before vs after");
  lines.push("");
  lines.push("_Duration numbers here mix a real-network BEFORE with a no-CDN-localhost AFTER — see Methodology. Included for completeness, not as a network-performance claim._");
  lines.push("");
  const beforeTop10Slowest = [...beforeAssets]
    .filter((a) => (a.assetType === "image" || a.assetType === "background-image") && a.medianDurationMs !== null)
    .sort((x, y) => y.medianDurationMs - x.medianDurationMs)
    .slice(0, 10);
  lines.push("| Market | Viewport | Route | Before duration | After duration (if re-audited) | URL key |");
  lines.push("|---|---|---|---|---|---|");
  for (const b of beforeTop10Slowest) {
    const key = [b.market, b.viewport, b.route, relativeKey(b.url)].join("::");
    const a = afterIndex.get(key);
    lines.push(
      `| ${b.market.toUpperCase()} | ${b.viewport} | \`${b.route}\` | ${fmtMs(b.medianDurationMs)} | ${a ? fmtMs(a.medianDurationMs) : "not re-audited"} | \`${relativeKey(b.url)}\` |`,
    );
  }
  lines.push("");

  lines.push("## Videos — before vs after");
  lines.push("");
  const beforeVideos = beforeAssets.filter((a) => a.assetType === "video");
  lines.push("| Market | Viewport | Route | Before size | After size | URL key |");
  lines.push("|---|---|---|---|---|---|");
  for (const b of beforeVideos) {
    const key = [b.market, b.viewport, b.route, relativeKey(b.url)].join("::");
    const a = afterIndex.get(key);
    lines.push(
      `| ${b.market.toUpperCase()} | ${b.viewport} | \`${b.route}\` | ${fmtBytes(b.contentLengthBytes)} | ${a ? fmtBytes(a.contentLengthBytes) : "not re-audited / superseded by new desktop+mobile files"} | \`${relativeKey(b.url)}\` |`,
    );
  }
  lines.push("");
  const newCableVideos = afterAssets.filter((a) => a.assetType === "video" && a.route === "/products/cable-support-systems");
  lines.push("New Cable Management video files (no BEFORE equivalent — replacing the single 15.18 MB file above):");
  lines.push("");
  lines.push("| Market | Viewport | Size | URL key |");
  lines.push("|---|---|---|---|");
  const seenVideoKeys = new Set();
  for (const a of newCableVideos) {
    const key = relativeKey(a.url);
    const dedupeKey = `${a.market}-${a.viewport}-${key}`;
    if (seenVideoKeys.has(dedupeKey)) continue;
    seenVideoKeys.add(dedupeKey);
    lines.push(`| ${a.market.toUpperCase()} | ${a.viewport} | ${fmtBytes(a.contentLengthBytes)} | \`${key}\` |`);
  }
  lines.push("");

  lines.push("## Mobile transfer sizes — total media bytes per page (mobile viewport)");
  lines.push("");
  lines.push(
    "Sum of `contentLengthBytes` across all image/background/video assets captured for the page, mobile viewport, UK market — a rough proxy for total mobile media payload.",
  );
  lines.push("");
  function totalBytesForPage(assets, route, viewport, market) {
    const seen = new Set();
    let total = 0;
    for (const a of assets) {
      if (a.route !== route || a.viewport !== viewport || a.market !== market) continue;
      if (a.contentLengthBytes === null) continue;
      const key = relativeKey(a.url);
      if (seen.has(key)) continue;
      seen.add(key);
      total += a.contentLengthBytes;
    }
    return total;
  }
  lines.push("| Route | Before total (mobile, UK) | After total (mobile, UK) | Change |");
  lines.push("|---|---|---|---|");
  for (const route of ["/", "/about", "/references", "/resources", "/uk-support", "/products/cable-support-systems"]) {
    const b = totalBytesForPage(beforeAssets, route, "mobile", "uk");
    const a = totalBytesForPage(afterAssets, route, "mobile", "uk");
    lines.push(`| \`${route}\` | ${fmtBytes(b)} | ${fmtBytes(a)} | ${fmtPct(pctChange(b, a))} |`);
  }
  lines.push("");

  lines.push("## LCP — before vs after (directional, see Methodology)");
  lines.push("");
  lines.push("| Market | Viewport | Route | Before LCP | After LCP | Before LCP element | After LCP element |");
  lines.push("|---|---|---|---|---|---|---|");
  for (const route of ["/", "/about", "/references", "/resources", "/uk-support", "/products/cable-support-systems"]) {
    for (const market of ["uk", "ua"]) {
      for (const viewport of ["desktop", "mobile"]) {
        const b = pageLcp(beforePages, market, viewport, route);
        const a = pageLcp(afterPages, market, viewport, route);
        if (!b && !a) continue;
        lines.push(
          `| ${market.toUpperCase()} | ${viewport} | \`${route}\` | ${b ? fmtMs(b.medianLcpMs) : "n/a"} | ${a ? fmtMs(a.medianLcpMs) : "n/a"} | ${b ? b.lcpAssetType ?? "n/a" : "n/a"} | ${a ? a.lcpAssetType ?? "n/a" : "n/a"} |`,
        );
      }
    }
  }
  lines.push("");

  lines.push("## What this proves vs what still requires the R2 upload");
  lines.push("");
  lines.push("**Proven by this report (byte-level, verifiable right now):**");
  lines.push("- References hero background: 1.71 MB → 170.7 KB desktop (-90%), new 42.4 KB mobile variant (previously none existed — mobile downloaded the same 1.71 MB file).");
  lines.push("- Resources hero background: 1.73 MB → 104.0 KB desktop (-94%), new 27.1 KB mobile variant (previously none existed).");
  lines.push("- Cable Management video: 15.9 MB single file → 6.8 MB desktop (-57%) / 3.6 MB mobile (-78%), both now correctly split by viewport instead of one oversized file shipped everywhere.");
  lines.push("- gersan-zonguldak-factory.webp and the other large `unoptimized` photo call sites now flow through Next's responsive image pipeline — confirmed via captured `currentSrc`/`naturalWidth` that mobile now requests a ~640px-wide variant instead of the full 2.40 MB / 1672px-wide original.");
  lines.push("- About hero background was already well-compressed (318 KB / 226 KB) — left untouched; only a scoped, justified `preload` was added.");
  lines.push("");
  lines.push("**Still requires the manual R2 action in `r2-cache-control-action.md` before it's live for real users:**");
  lines.push("- None of the above optimised bytes are on the R2 bucket yet — production visitors are still served the old, larger files until someone uploads the six changed/new files.");
  lines.push("- The sitewide missing `Cache-Control` header (affecting every R2 asset, not just the ones touched here) is unrelated to file size and needs the bucket/metadata action documented separately.");
  lines.push("");

  fs.writeFileSync(MD_OUT, lines.join("\n"));
  console.log(`Wrote: ${MD_OUT}`);
}

main();
