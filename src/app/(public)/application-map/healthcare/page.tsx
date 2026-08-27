import type { Metadata } from "next";
import { headers } from "next/headers";

import { ApplicationMapViewer } from "@/components/public/application-map/application-map-viewer";
import { healthcareApplicationMapContentForMarket } from "@/modules/application-map/healthcare-content";
import { HEALTHCARE_APPLICATION_MAP } from "@/modules/application-map/healthcare";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = healthcareApplicationMapContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/application-map/healthcare",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function HealthcareApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = healthcareApplicationMapContentForMarket(marketContext.market);
  const map = resolveApplicationMap(
    HEALTHCARE_APPLICATION_MAP,
    marketContext.market,
  );

  return (
    <ApplicationMapViewer
      content={content}
      industryId="healthcare"
      map={map}
      overviewImageFit="contain"
      sourcePath="/application-map/healthcare"
    />
  );
}
