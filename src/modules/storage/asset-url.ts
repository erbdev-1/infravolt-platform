/**
 * Centralised resolver for public asset URLs — the PUBLIC_MEDIA_STORAGE /
 * PUBLIC_DOCUMENTS_STORAGE classes in docs/asset-manifest.csv (product
 * imagery, hero/background images, application photography, videos,
 * catalogues, datasheets, certificates, public PDFs). Presentation
 * components and data files should call `publicMediaUrl()` /
 * `publicDocumentUrl()` with an asset-relative path (no leading slash, no
 * `/assets` prefix — e.g. `products/busbar/gr/card/gr-main-product.webp`)
 * instead of ever writing a storage URL directly.
 *
 * Public assets are served from Cloudflare R2 through a public/custom
 * domain bound to a single bucket. R2 custom-domain URLs have no bucket
 * name in the path (unlike Supabase's `/storage/v1/object/public/{bucket}/...`
 * convention), so the object key is exactly the asset-relative path — the
 * same relative path as today's local `/assets/...` layout, preserved
 * unchanged so migration can copy files without renaming anything.
 * `publicMediaUrl` and `publicDocumentUrl` stay as two named entry points
 * for call-site readability and to keep the manifest's media/documents
 * distinction visible in the code, but both resolve through the same base
 * URL — R2 needs no per-call bucket disambiguation.
 *
 * Until `NEXT_PUBLIC_ASSET_BASE_URL` is configured, both resolvers fall
 * back to today's local `/assets/...` path — identical output to the
 * current hardcoded strings throughout the data layer, so adopting this
 * resolver ahead of the real migration is a no-op. Existing literal
 * `/assets/...` strings are intentionally NOT retrofitted to call this
 * module in this task — see the storage-architecture report's migration
 * plan for why a request-level rewrite is the intended mechanism for
 * moving those without a source-wide edit.
 *
 * Supabase remains the backend for auth/database and for PRIVATE storage
 * (enquiry attachments, commercial-partner documents — see
 * src/modules/storage/buckets.ts) and is intentionally untouched here;
 * this module only ever resolves PUBLIC asset URLs.
 */
function assetBaseUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
  return url && url.trim() !== "" ? url.replace(/\/+$/, "") : undefined;
}

function publicAssetUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+/, "");
  const base = assetBaseUrl();

  return base ? `${base}/${normalizedPath}` : `/assets/${normalizedPath}`;
}

export function publicMediaUrl(path: string): string {
  return publicAssetUrl(path);
}

export function publicDocumentUrl(path: string): string {
  return publicAssetUrl(path);
}
