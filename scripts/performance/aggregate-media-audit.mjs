// Aggregates raw output from media-performance-audit.mjs into a flat,
// per-asset table (one row per market/viewport/route/asset, metrics
// medianed across runs) and writes it as JSON for the report generator to
// consume. Audit-only: reads/writes under docs/performance, touches
// nothing else.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../docs/performance");

function argValue(flag, fallback) {
  const prefix = `--${flag}=`;
  const arg = process.argv.find((a) => a.startsWith(prefix));
  return arg ? path.join(OUT_DIR, arg.slice(prefix.length)) : fallback;
}

const RAW_IN = argValue("input", path.join(OUT_DIR, "media-performance-audit.raw.json"));
const AGG_OUT = argValue("output", path.join(OUT_DIR, "media-performance-audit.aggregated.json"));

const R2_HOST = "pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev";

function median(values) {
  const sorted = [...values].filter((v) => v !== null && v !== undefined && !Number.isNaN(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

function mostCommon(values) {
  const filtered = values.filter((v) => v !== null && v !== undefined);
  if (filtered.length === 0) return null;
  const counts = new Map();
  for (const v of filtered) {
    const key = JSON.stringify(v);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  let best = null;
  let bestCount = -1;
  for (const [key, count] of counts) {
    if (count > bestCount) {
      best = key;
      bestCount = count;
    }
  }
  return JSON.parse(best);
}

function isR2Url(url) {
  return url.includes(R2_HOST);
}

function buildRunRows(result) {
  const { route, market, viewport, run, tier, navError, preScroll, postScroll, responses } = result;
  if (navError) return [];

  const preUrls = new Set(preScroll.resources.map((r) => r.url));
  const resourceByUrl = new Map();
  for (const r of postScroll.resources) {
    // Keep the first (earliest) entry per URL — duplicate fetches of the
    // same resource (e.g. repeated in multiple <img> tags) should not
    // overwrite the original timing.
    if (!resourceByUrl.has(r.url)) resourceByUrl.set(r.url, r);
  }

  const perf = postScroll.perf || preScroll.perf || {};
  const rows = [];

  // media inventory is stable pre/post scroll (DOM elements exist either
  // way — only network fetch timing differs), so postScroll.media is the
  // canonical list.
  for (const m of postScroll.media) {
    const resource = resourceByUrl.get(m.url) || null;
    const response = responses[m.url] || null;
    const loadedBeforeScroll = preUrls.has(m.url);

    let videoCanPlayMs = null;
    if (m.type === "video" && perf.videoCanPlay) {
      videoCanPlayMs = perf.videoCanPlay[m.url] ?? perf.videoCanPlay["video"] ?? null;
    }

    rows.push({
      route,
      market,
      viewport,
      run,
      tier,
      assetType: m.type,
      url: m.url,
      isR2: isR2Url(m.url),
      aboveFold: m.aboveFold ?? null,
      loadedBeforeScroll,
      loadingAttr: m.loading ?? m.preload ?? null,
      poster: m.poster ?? null,
      renderedWidth: m.renderedWidth ?? null,
      renderedHeight: m.renderedHeight ?? null,
      naturalWidth: m.naturalWidth ?? null,
      naturalHeight: m.naturalHeight ?? null,
      httpStatus: response ? response.status : null,
      contentType: response ? response.contentType : null,
      contentLengthBytes: response ? response.contentLength : null,
      cacheControl: response ? response.cacheControl : null,
      etag: response ? response.etag : null,
      startTime: resource ? resource.startTime : null,
      responseEnd: resource ? resource.responseEnd : null,
      durationMs: resource ? resource.duration : null,
      videoCanPlayMs,
      pageLcpMs: perf.lcp ?? null,
      pageLcpUrl: perf.lcpUrl ?? null,
      pageLcpIsThisAsset: perf.lcpUrl === m.url,
      pageCls: perf.cls ?? null,
    });
  }

  return rows;
}

function aggregate(rows) {
  const groups = new Map();
  for (const row of rows) {
    const key = [row.market, row.viewport, row.route, row.assetType, row.url].join("::");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }

  const aggregated = [];
  for (const [, groupRows] of groups) {
    const first = groupRows[0];
    aggregated.push({
      route: first.route,
      market: first.market,
      viewport: first.viewport,
      tier: first.tier,
      assetType: first.assetType,
      url: first.url,
      isR2: first.isR2,
      runsObserved: groupRows.length,
      aboveFold: mostCommon(groupRows.map((r) => r.aboveFold)),
      loadedBeforeScrollRate: groupRows.filter((r) => r.loadedBeforeScroll).length / groupRows.length,
      loadingAttr: mostCommon(groupRows.map((r) => r.loadingAttr)),
      poster: mostCommon(groupRows.map((r) => r.poster)),
      renderedWidth: median(groupRows.map((r) => r.renderedWidth)),
      renderedHeight: median(groupRows.map((r) => r.renderedHeight)),
      naturalWidth: median(groupRows.map((r) => r.naturalWidth)),
      naturalHeight: median(groupRows.map((r) => r.naturalHeight)),
      httpStatus: mostCommon(groupRows.map((r) => r.httpStatus)),
      contentType: mostCommon(groupRows.map((r) => r.contentType)),
      contentLengthBytes: median(groupRows.map((r) => r.contentLengthBytes)),
      cacheControl: mostCommon(groupRows.map((r) => r.cacheControl)),
      etag: mostCommon(groupRows.map((r) => r.etag)),
      medianStartTimeMs: median(groupRows.map((r) => r.startTime)),
      medianResponseEndMs: median(groupRows.map((r) => r.responseEnd)),
      medianDurationMs: median(groupRows.map((r) => r.durationMs)),
      medianVideoCanPlayMs: median(groupRows.map((r) => r.videoCanPlayMs)),
      medianPageLcpMs: median(groupRows.map((r) => r.pageLcpMs)),
      pageLcpIsThisAssetRate: groupRows.filter((r) => r.pageLcpIsThisAsset).length / groupRows.length,
      medianPageCls: median(groupRows.map((r) => r.pageCls)),
    });
  }

  return aggregated;
}

function pageLevelAggregate(rows) {
  const groups = new Map();
  for (const row of rows) {
    const key = [row.market, row.viewport, row.route].join("::");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }
  const pages = [];
  for (const [, groupRows] of groups) {
    const first = groupRows[0];
    const runKeys = new Set(groupRows.map((r) => r.run));
    pages.push({
      route: first.route,
      market: first.market,
      viewport: first.viewport,
      tier: first.tier,
      runsObserved: runKeys.size,
      medianLcpMs: median(groupRows.map((r) => r.pageLcpMs)),
      lcpUrl: mostCommon(groupRows.map((r) => r.pageLcpUrl)),
      lcpAssetType: (() => {
        const lcpUrl = mostCommon(groupRows.map((r) => r.pageLcpUrl));
        const match = groupRows.find((r) => r.url === lcpUrl);
        return match ? match.assetType : null;
      })(),
      medianCls: median(groupRows.map((r) => r.pageCls)),
      mediaCount: new Set(groupRows.map((r) => r.url)).size,
    });
  }
  return pages;
}

function main() {
  if (!fs.existsSync(RAW_IN)) {
    console.error(`Raw results not found at ${RAW_IN}. Run media-performance-audit.mjs first.`);
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(RAW_IN, "utf8"));
  const failedJobs = raw.filter((r) => r.navError);
  const rows = raw.flatMap(buildRunRows);
  const assets = aggregate(rows);
  const pages = pageLevelAggregate(rows);

  fs.writeFileSync(
    AGG_OUT,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalRawJobs: raw.length,
        failedJobs: failedJobs.map((j) => ({ route: j.route, market: j.market, viewport: j.viewport, run: j.run, error: j.navError })),
        totalAssetRows: rows.length,
        uniqueAssets: assets.length,
        assets,
        pages,
      },
      null,
      2,
    ),
  );

  console.log(`Aggregated ${rows.length} raw asset observations into ${assets.length} unique (market/viewport/route/url) rows.`);
  console.log(`Page-level rows: ${pages.length}`);
  console.log(`Failed jobs: ${failedJobs.length}`);
  console.log(`Wrote: ${AGG_OUT}`);
}

main();
