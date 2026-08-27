import type { Metadata } from "next";
import { headers } from "next/headers";

import { UKSupportHub } from "@/components/public/uk-support-hub";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { publicSiteContentForMarket } from "@/modules/public-site/content";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = publicSiteContentForMarket(marketContext.market);

  return {
    title: "UK Support & Operations | InfraVolt",
    description: content.support.introduction,
    alternates: {
      canonical: new URL("/uk-support", marketContext.publicSiteUrl),
    },
  };
}

export default async function UKSupportPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = publicSiteContentForMarket(marketContext.market);

  return (
    <main id="main-content">
      <UKSupportHub content={content.support} market={marketContext.market} />
    </main>
  );
}
