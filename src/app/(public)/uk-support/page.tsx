import type { Metadata } from "next";
import { headers } from "next/headers";

import { UKSupportHub } from "@/components/public/uk-support-hub";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { publicSiteContentForMarket } from "@/modules/public-site/content";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

import type { PublicSiteContent } from "@/modules/public-site/content";

export function supportMetadataText(
  content: PublicSiteContent["support"],
): Readonly<{ title: string; description: string }> {
  return {
    title: `${content.eyebrow} | InfraVolt`,
    description: content.introduction,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = publicSiteContentForMarket(marketContext.market);
  const metadata = supportMetadataText(content.support);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/uk-support",
    title: metadata.title,
    description: metadata.description,
  });
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
