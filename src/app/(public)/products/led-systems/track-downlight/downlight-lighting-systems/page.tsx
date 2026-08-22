import type { Metadata } from "next";
import { headers } from "next/headers";

import { LedCategoryDetailPageTrackDownlight } from "@/components/public/products/led-lighting/led-category-detail-page-track-downlight";
import {
  DOWNLIGHT_SYSTEMS_HERO_BACKGROUND,
  DOWNLIGHT_SYSTEMS_HERO_BACKGROUND_ALT,
  DOWNLIGHT_SYSTEMS_HERO_FOREGROUND,
  DOWNLIGHT_SYSTEMS_HERO_FOREGROUND_ALT,
  downlightLightingSystemsContentForMarket,
} from "@/data/products/led-lighting/track-downlight";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

const ROUTE = "/products/led-systems/track-downlight/downlight-lighting-systems";
const PARENT_ROUTE = "/products/led-systems/track-downlight";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = downlightLightingSystemsContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: { canonical: new URL(ROUTE, marketContext.publicSiteUrl) },
  };
}

export default async function DownlightLightingSystemsPage() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const pageContent = downlightLightingSystemsContentForMarket(marketContext.market);

  return (
    <LedCategoryDetailPageTrackDownlight
      backHref={PARENT_ROUTE}
      heroBackgroundImage={DOWNLIGHT_SYSTEMS_HERO_BACKGROUND}
      heroBackgroundImageAlt={DOWNLIGHT_SYSTEMS_HERO_BACKGROUND_ALT}
      heroForegroundImage={DOWNLIGHT_SYSTEMS_HERO_FOREGROUND}
      heroForegroundImageAlt={DOWNLIGHT_SYSTEMS_HERO_FOREGROUND_ALT}
      market={marketContext.market}
      pageContent={pageContent}
      parentBreadcrumb={{
        href: PARENT_ROUTE,
        label: marketContext.market === "ua" ? "Track & Downlight" : "Track & Downlight",
      }}
      supportCtaImage={DOWNLIGHT_SYSTEMS_HERO_BACKGROUND}
      supportCtaImageAlt={DOWNLIGHT_SYSTEMS_HERO_BACKGROUND_ALT}
      supportRequestHref="/uk-support?request=technical-pack&product=downlight-lighting-systems"
    />
  );
}
