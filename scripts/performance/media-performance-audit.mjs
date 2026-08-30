// Audit-only tool. Does not modify any application code, assets, or data.
// Reuses @playwright/test (the project's existing e2e dependency) and the
// project's host-based UK/UA market routing convention, but runs as a
// standalone script against the live dev server (NEXT_PUBLIC_ASSET_BASE_URL
// pointed at R2) rather than through playwright.config.ts's webServer —
// that harness deliberately blanks NEXT_PUBLIC_ASSET_BASE_URL for e2e
// isolation (see tests/helpers/test-environment.ts), which would hide the
// exact R2 delivery behaviour this audit needs to measure.
import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "../../docs/performance");
const RAW_OUT = path.join(OUT_DIR, "media-performance-audit.raw.json");

const DEV_HOST_PORT = 3000;
const MARKET_HOSTS = {
  uk: `uk.infravolt.localhost:${DEV_HOST_PORT}`,
  ua: `ua.infravolt.localhost:${DEV_HOST_PORT}`,
};

// Real production domains, hit directly over HTTPS (no Host-header
// simulation) — used by --live to measure what's actually deployed right
// now, as opposed to --after which measures this branch's local server.
const LIVE_MARKET_HOSTS = {
  uk: "infravolt.co.uk",
  ua: "infravolt.com.ua",
};

const VIEWPORTS = {
  desktop: { width: 1920, height: 1080 },
  mobile: { width: 390, height: 844 },
};

// Full treatment: both markets, both viewports, 3 runs (median reported).
const PRIORITY_ROUTES = [
  "/",
  "/about",
  "/references",
  "/resources",
  "/contact",
  "/uk-support",
  "/application-map",
  "/application-map/commercial-building",
  "/products/cable-support-systems",
];

// Sample treatment: UK host only, both viewports, 1 run.
// Rationale (see report "Methodology / Limitations"): product imagery and
// backgrounds are delivered from the same R2 object keys regardless of
// market — only page copy differs by host. Running the full 2-market x
// 3-run matrix across the entire long tail of category/series pages would
// multiply run count for no additional asset-delivery signal, so the
// broad catalogue is sampled once on UK to keep total audit runtime
// tractable while still covering every major product family.
const HUB_ROUTES = [
  "/products/busbar",
  "/products/earthing-and-lightning-protection",
  "/products/led-systems",
  "/products/underfloor-systems",
  "/products/g-bus",
];

const DETAIL_ROUTES = [
  "/products/busbar/gl-lighting-busbar",
  "/products/cable-support-systems/cable-ladder-c-profile-rung",
  "/products/earthing-and-lightning-protection/lightning-protection",
  "/products/underfloor-systems/underfloor-junction-boxes",
  "/products/led-systems/industrial-high-bay-lighting/ger-led-high-ceiling",
];

const jobs = [];

for (const route of PRIORITY_ROUTES) {
  for (const market of ["uk", "ua"]) {
    for (const viewport of ["desktop", "mobile"]) {
      for (let run = 1; run <= 3; run++) {
        jobs.push({ route, market, viewport, run, tier: "priority" });
      }
    }
  }
}

for (const route of [...HUB_ROUTES, ...DETAIL_ROUTES]) {
  for (const viewport of ["desktop", "mobile"]) {
    jobs.push({ route, market: "uk", viewport, run: 1, tier: HUB_ROUTES.includes(route) ? "hub" : "detail" });
  }
}

const INIT_SCRIPT = () => {
  window.__perf = {
    lcp: 0,
    lcpUrl: null,
    lcpTag: null,
    cls: 0,
    videoCanPlay: {},
  };

  document.addEventListener(
    "canplay",
    (event) => {
      const el = event.target;
      if (el && el.tagName === "VIDEO") {
        const key = el.currentSrc || el.src || "video";
        if (!(key in window.__perf.videoCanPlay)) {
          window.__perf.videoCanPlay[key] = performance.now();
        }
      }
    },
    true,
  );

  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        window.__perf.lcp = last.startTime;
        window.__perf.lcpUrl = last.url || null;
        window.__perf.lcpTag = last.element
          ? last.element.tagName + (last.element.className ? "." + String(last.element.className).split(" ")[0] : "")
          : null;
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch {
    // LCP not supported in this browser context; leave defaults.
  }

  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__perf.cls += entry.value;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
  } catch {
    // CLS not supported in this browser context; leave defaults.
  }
};

function collectMediaInventory() {
  const vh = window.innerHeight;
  const results = [];

  document.querySelectorAll("img").forEach((img) => {
    const rect = img.getBoundingClientRect();
    const url = img.currentSrc || img.src;
    if (!url) return;
    results.push({
      type: "image",
      url,
      loading: img.getAttribute("loading") || "eager",
      renderedWidth: Math.round(rect.width),
      renderedHeight: Math.round(rect.height),
      naturalWidth: img.naturalWidth || null,
      naturalHeight: img.naturalHeight || null,
      top: Math.round(rect.top + window.scrollY),
      aboveFold: rect.top < vh && rect.bottom > 0,
      alt: img.getAttribute("alt") || null,
    });
  });

  document.querySelectorAll("video").forEach((video) => {
    const rect = video.getBoundingClientRect();
    const sources = Array.from(video.querySelectorAll("source")).map((s) => s.src);
    const url = video.currentSrc || sources[0] || null;
    if (!url) return;
    results.push({
      type: "video",
      url,
      sources,
      poster: video.getAttribute("poster") || null,
      preload: video.getAttribute("preload") || "auto",
      readyState: video.readyState,
      renderedWidth: Math.round(rect.width),
      renderedHeight: Math.round(rect.height),
      top: Math.round(rect.top + window.scrollY),
      aboveFold: rect.top < vh && rect.bottom > 0,
    });
  });

  const seen = new Set();
  document.querySelectorAll("body, body *").forEach((el) => {
    const cs = getComputedStyle(el);
    const bg = cs.backgroundImage;
    if (!bg || bg === "none" || !bg.includes("url(")) return;
    const match = bg.match(/url\((['"]?)(.*?)\1\)/);
    if (!match || !match[2]) return;
    const url = match[2];
    const rect = el.getBoundingClientRect();
    const key = `${url}|${Math.round(rect.top)}|${Math.round(rect.left)}`;
    if (seen.has(key)) return;
    seen.add(key);
    results.push({
      type: "background-image",
      url,
      renderedWidth: Math.round(rect.width),
      renderedHeight: Math.round(rect.height),
      top: Math.round(rect.top + window.scrollY),
      aboveFold: rect.top < vh && rect.bottom > 0,
    });
  });

  return results;
}

function collectResourceTimings() {
  return performance.getEntriesByType("resource")
    .filter((r) => {
      if (["img", "video", "css"].includes(r.initiatorType)) return true;
      return /\.(webp|jpe?g|png|avif|gif|svg|mp4|webm)(\?|$)/i.test(r.name);
    })
    .map((r) => ({
      url: r.name,
      initiatorType: r.initiatorType,
      startTime: r.startTime,
      responseEnd: r.responseEnd,
      duration: r.duration,
      transferSize: r.transferSize ?? null,
      encodedBodySize: r.encodedBodySize ?? null,
      decodedBodySize: r.decodedBodySize ?? null,
      nextHopProtocol: r.nextHopProtocol || null,
    }));
}

const LIVE_MODE = process.argv.includes("--live");

async function runJob(browser, job) {
  const { route, market, viewport, run, tier } = job;
  const host = LIVE_MODE ? LIVE_MARKET_HOSTS[market] : MARKET_HOSTS[market];
  const url = LIVE_MODE ? `https://${host}${route}` : `http://${host}${route}`;

  const context = await browser.newContext({
    viewport: VIEWPORTS[viewport],
    serviceWorkers: "block",
    extraHTTPHeaders: { "Cache-Control": "no-cache" },
  });

  const responses = new Map();
  const page = await context.newPage();

  page.on("response", (response) => {
    try {
      const respUrl = response.url();
      const headers = response.headers();
      responses.set(respUrl, {
        status: response.status(),
        contentType: headers["content-type"] || null,
        contentLength: headers["content-length"] ? Number(headers["content-length"]) : null,
        cacheControl: headers["cache-control"] || null,
        etag: headers["etag"] || null,
        server: headers["server"] || null,
        via: headers["cf-cache-status"] || headers["x-vercel-cache"] || null,
      });
    } catch {
      // Response may already be disposed; ignore.
    }
  });

  await page.addInitScript(INIT_SCRIPT);

  let navError = null;
  try {
    await page.goto(url, { waitUntil: "load", timeout: 20_000 });
  } catch (err) {
    navError = String(err && err.message ? err.message : err);
  }

  if (!navError) {
    await page.waitForTimeout(1200);
  }

  let preScroll = { media: [], resources: [], perf: null };
  let postScroll = { media: [], resources: [], perf: null };

  if (!navError) {
    preScroll.media = await page.evaluate(collectMediaInventory).catch(() => []);
    preScroll.resources = await page.evaluate(collectResourceTimings).catch(() => []);
    preScroll.perf = await page.evaluate(() => window.__perf).catch(() => null);

    // Trigger lazy-loaded / below-fold media so the full inventory can be
    // catalogued, without treating this as part of the natural initial load.
    try {
      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const steps = 4;
      for (let i = 1; i <= steps; i++) {
        await page.evaluate((y) => window.scrollTo(0, y), Math.round((scrollHeight * i) / steps));
        await page.waitForTimeout(350);
      }
      await page.waitForTimeout(800);
    } catch {
      // best-effort scroll; ignore failures on very short pages
    }

    postScroll.media = await page.evaluate(collectMediaInventory).catch(() => []);
    postScroll.resources = await page.evaluate(collectResourceTimings).catch(() => []);
    postScroll.perf = await page.evaluate(() => window.__perf).catch(() => null);
  }

  const responseEntries = Object.fromEntries(responses);

  await context.close();

  return {
    route,
    market,
    viewport,
    run,
    tier,
    url,
    navError,
    preScroll,
    postScroll,
    responses: responseEntries,
  };
}

const SMOKE_MODE = process.argv.includes("--smoke");
const AFTER_MODE = process.argv.includes("--after");

// Focused re-audit of exactly the pages touched by the optimisation pass,
// run against the local-fallback server (NEXT_PUBLIC_ASSET_BASE_URL unset)
// so the newly optimised local bytes are what actually gets measured —
// see docs/performance/media-performance-before-after.md for why.
const AFTER_ROUTES = ["/", "/about", "/references", "/resources", "/uk-support", "/products/cable-support-systems"];
const AFTER_JOBS = [];
for (const route of AFTER_ROUTES) {
  for (const market of ["uk", "ua"]) {
    for (const viewport of ["desktop", "mobile"]) {
      for (let run = 1; run <= 2; run++) {
        AFTER_JOBS.push({ route, market, viewport, run, tier: "after" });
      }
    }
  }
}

// Live production check: only pages/code that are actually deployed right
// now (homepage, About, Application Map). References/Resources mobile
// variants and the Cable Management video split are branch-only — checking
// them against production would just re-confirm the OLD code, which
// belongs in --after (local server, real asset domain), not here.
const LIVE_ROUTES = ["/", "/about", "/application-map"];
const LIVE_JOBS = [];
for (const route of LIVE_ROUTES) {
  for (const market of ["uk", "ua"]) {
    for (const viewport of ["desktop", "mobile"]) {
      LIVE_JOBS.push({ route, market, viewport, run: 1, tier: "live" });
    }
  }
}

const activeJobs = SMOKE_MODE
  ? [
      { route: "/about", market: "uk", viewport: "desktop", run: 1, tier: "priority" },
      { route: "/products/cable-support-systems", market: "uk", viewport: "mobile", run: 1, tier: "priority" },
    ]
  : LIVE_MODE
    ? LIVE_JOBS
    : AFTER_MODE
      ? AFTER_JOBS
      : jobs;

async function main() {
  console.log(`Planned jobs: ${activeJobs.length}${SMOKE_MODE ? " (smoke mode)" : ""}${AFTER_MODE ? " (after mode)" : ""}${LIVE_MODE ? " (live mode)" : ""}`);
  const browser = await chromium.launch();
  const results = [];
  let completed = 0;

  for (const job of activeJobs) {
    const start = Date.now();
    const result = await runJob(browser, job);
    completed++;
    const ms = Date.now() - start;
    const label = `${job.market}/${job.viewport} ${job.route} (run ${job.run}/${job.tier})`;
    if (result.navError) {
      console.log(`[${completed}/${activeJobs.length}] FAILED ${label} — ${result.navError}`);
    } else {
      console.log(`[${completed}/${activeJobs.length}] ok ${label} — ${ms}ms`);
    }
    results.push(result);
  }

  await browser.close();

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outFile = SMOKE_MODE
    ? path.join(OUT_DIR, "media-performance-audit.smoke.json")
    : LIVE_MODE
      ? path.join(OUT_DIR, "media-performance-audit.live.raw.json")
      : AFTER_MODE
        ? path.join(OUT_DIR, "media-performance-audit.after.raw.json")
        : RAW_OUT;
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`\nWrote raw results: ${outFile}`);
}

await main();
