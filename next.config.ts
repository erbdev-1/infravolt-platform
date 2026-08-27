import type { NextConfig } from "next";

// Derived (not hardcoded) from NEXT_PUBLIC_ASSET_BASE_URL so next/image keeps working
// whatever the configured Cloudflare R2 domain is (today's r2.dev URL, or a future
// custom domain) without another config edit — see src/modules/storage/asset-url.ts.
function assetBaseRemotePattern(): Array<{ protocol: "http" | "https"; hostname: string }> {
  const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
  if (!base) return [];

  try {
    const url = new URL(base);
    return [{ protocol: url.protocol.replace(":", "") as "http" | "https", hostname: url.hostname }];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  // Yalnız bağlayıcı yerel market hostları development HMR kaynağına erişebilir; production host güveni proxy'de kalır.
  allowedDevOrigins: ["uk.infravolt.localhost", "ua.infravolt.localhost"],
  // No serverActions.bodySizeLimit override needed: Contact attachments upload
  // directly from the browser to Supabase Storage via signed URLs (see
  // src/modules/enquiry/attachments.ts) — file bytes never pass through a
  // Server Action request body, so the framework default is fine.
  images: {
    remotePatterns: [
      ...assetBaseRemotePattern(),
      // Pre-authorised for Supabase-backed private storage (enquiry attachments,
      // commercial-partner documents) — inert today since no code currently
      // requests an https://*.supabase.co image URL for public assets, which now
      // use NEXT_PUBLIC_ASSET_BASE_URL (Cloudflare R2) instead.
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
};

export default nextConfig;
