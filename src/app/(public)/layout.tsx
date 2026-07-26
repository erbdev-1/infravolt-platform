import { headers } from "next/headers";

import { PublicSiteShell } from "@/components/public/public-site-shell";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <PublicSiteShell market={marketContext.market}>
      {children}
    </PublicSiteShell>
  );
}
