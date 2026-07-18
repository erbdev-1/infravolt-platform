import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Yalnız bağlayıcı yerel market hostları development HMR kaynağına erişebilir; production host güveni proxy'de kalır.
  allowedDevOrigins: ["uk.infravolt.localhost", "ua.infravolt.localhost"],
};

export default nextConfig;
