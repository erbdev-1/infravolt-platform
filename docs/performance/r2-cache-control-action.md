# R2 Cache-Control — Required Manual Action

This action was **not** performed by this task. It requires either Cloudflare
dashboard access or R2 credentials being used against the **live production
bucket**, which this task does not do unprompted — mutating a bucket real
users are being served from is exactly the kind of hard-to-reverse,
shared-system action that needs an explicit human go-ahead, not an automated
pass. This document exists so that go-ahead can be given with full context.

Note: `.env.local` in this repository *does* contain working R2 credentials
(`R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_S3_ENDPOINT`,
`R2_BUCKET_NAME`) — so this is not blocked by "credentials unavailable in
this environment" in the literal sense. It is withheld because the repo
contains no existing, intentional upload/deploy mechanism for R2 (verified:
no `@aws-sdk/client-s3` dependency, no upload script anywhere under `scripts/`
or `src/`), and improvising one to write directly into production during a
performance-audit task is a decision for a human to make explicitly, not an
automated agent.

## Current observed state

Verified directly via `curl -I` against the live bucket during this audit
(2026-08-30), for every R2 object checked (hero backgrounds, market-card
panels, product photography, hero videos — a representative sample across
asset classes, not one file):

```
$ curl -sI https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/about-hero-background.webp
HTTP/1.1 200 OK
Date: Sun, 30 Aug 2026 00:50:55 GMT
Content-Type: image/webp
Content-Length: 318746
Connection: keep-alive
Accept-Ranges: bytes
ETag: "4c59ea253eb48cd2bed838eea4a41fe8"
Last-Modified: Sun, 23 Aug 2026 05:37:45 GMT
Server: cloudflare
CF-RAY: a32fcdd5bfa5ced6-LHR
```

**There is no `Cache-Control` header at all.** No `Expires` header either.
Only `ETag` + `Last-Modified` are present, which support conditional
revalidation (`If-None-Match` / `If-Modified-Since` → `304`) but do nothing
to avoid the *revalidation round-trip itself* on repeat visits. Without an
explicit `Cache-Control`, browsers fall back to heuristic caching per RFC
9111 §4.2.2 (commonly ~10% of time since `Last-Modified`), which is
unreliable, usually short, and not something to rely on for a CDN-fronted
asset host.

This affects **every** asset served through `NEXT_PUBLIC_ASSET_BASE_URL`
(`https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev`) — images, CSS
backgrounds, and videos alike — site-wide, not just the pages this audit
sampled.

## Recommended Cache-Control

| Asset class | Path pattern (relative to bucket root) | Recommended header | Rationale |
|---|---|---|---|
| Immutable/versioned media (product photos, hero backgrounds, videos, icons, brand assets) | `company/*`, `products/*`, `media/*`, `references/*`, `resources/*`, `application-map/*`, `brand/*`, `icons/*` | `public, max-age=31536000, immutable` | These objects are only ever replaced by uploading a *new* file (this task's own optimization work does exactly that — new bytes at the same key, e.g. `references-hero-background.webp`). Since there is no content-hash in the key name, `immutable` is safe only if the operational convention is "changed content gets a changed filename" going forward — see Verification note below. |
| Anything genuinely mutable at a fixed key (none currently identified in this codebase's asset usage) | — | `public, max-age=3600, must-revalidate` | Not currently needed — flagged here only so a future asset class that *does* get overwritten in place doesn't inherit the `immutable` policy above by copy-paste. |

If the team is not confident every future upload to an existing key will
also bump the filename, use a safer middle ground instead of `immutable`:

```
Cache-Control: public, max-age=604800, stale-while-revalidate=86400
```

(7-day fresh, 1-day stale-while-revalidate grace period) — still a large
improvement over "no header at all," without the hard guarantee
`immutable` makes to the browser.

## Does this need a re-upload, or just a metadata update?

**Both, depending on the object:**

1. **Metadata-only update (no byte change)** — for every object whose
   *content* isn't changing, Cache-Control can be set via an R2
   `CopyObject`/`PutObjectTagging`-style metadata update (S3-compatible
   API: a same-key `PutObject` copy with `MetadataDirective: REPLACE`, or
   the Cloudflare dashboard's per-object "Edit metadata" action). This
   covers the large majority of the bucket.

2. **Re-upload required (bytes changed)** — this task recompressed/added
   these specific files locally (see `docs/performance/media-performance-before-after.md`
   for full before/after numbers); their R2 copies are now the **old**
   heavier versions until someone uploads the new local bytes:
   - `references/references-hero-background.webp` (recompressed, ~90% smaller)
   - `references/references-hero-background-mobile.webp` (**new** file — doesn't exist on R2 yet)
   - `resources/technical-resources-hero-background.webp` (recompressed, ~94% smaller)
   - `resources/technical-resources-hero-background-mobile.webp` (**new** file — doesn't exist on R2 yet)
   - `media/products/cable-management-systems/infravolt-cable-support-desktop.mp4` (**new** file)
   - `media/products/cable-management-systems/infravolt-cable-support-mobile.mp4` (**new** file)

   These uploads should set `Cache-Control` at upload time (most S3-compatible
   upload tools accept a `--cache-control` / `CacheControl:` parameter on
   `PutObject`), combining both actions into one step for these six files.

## How to apply (once authorised)

Using the AWS CLI configured against the R2 S3-compatible endpoint (values
from `.env.local`: `R2_S3_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`,
`R2_BUCKET_NAME`):

```bash
# Example: re-upload one of the six changed files with the recommended header
aws s3 cp public/assets/references/references-hero-background.webp \
  s3://$R2_BUCKET_NAME/references/references-hero-background.webp \
  --endpoint-url "$R2_S3_ENDPOINT" \
  --cache-control "public, max-age=31536000, immutable" \
  --content-type "image/webp"

# Example: bulk metadata-only update for everything else (no byte change),
# using --metadata-directive REPLACE so it doesn't require re-reading/
# re-uploading the object body
aws s3 cp s3://$R2_BUCKET_NAME/ s3://$R2_BUCKET_NAME/ \
  --recursive \
  --endpoint-url "$R2_S3_ENDPOINT" \
  --metadata-directive REPLACE \
  --cache-control "public, max-age=31536000, immutable"
```

The Cloudflare dashboard (R2 → bucket → object → "Edit") also supports
setting Cache-Control per-object or via a bucket-level Transform Rule /
Cache Rule if a blanket policy across the whole bucket is preferred over
per-object metadata.

## How to verify afterwards

```bash
curl -sI https://pub-f1a143f96bfc47df8ff1ccd1aaea6671.r2.dev/company/about-hero-background.webp | grep -i cache-control
# expect: Cache-Control: public, max-age=31536000, immutable
```

Or in a browser: DevTools → Network tab → select the asset request →
Response Headers → confirm `Cache-Control` is present. On a second page
load (same session), the request should show `(disk cache)` /
`(memory cache)` in the Size column instead of re-hitting the network.

This audit's own script can also be re-run and will report the change
automatically — `cacheControl` is one of the captured fields in
`docs/performance/media-performance-audit.csv`, and the "Missing or
ineffective cache headers" section of
`docs/performance/media-performance-audit.md` will drop to zero R2-hosted
entries once this is applied.
