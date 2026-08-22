import type { Metadata } from "next";
import { headers } from "next/headers";

import { ApplicationMapViewer } from "@/components/public/application-map/application-map-viewer";
import { commercialBuildingApplicationMapContentForMarket } from "@/modules/application-map/commercial-building-content";
import { COMMERCIAL_BUILDING_APPLICATION_MAP } from "@/modules/application-map/commercial-building";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = commercialBuildingApplicationMapContentForMarket(
    marketContext.market,
  );

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/application-map/commercial-building",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function CommercialBuildingApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = commercialBuildingApplicationMapContentForMarket(
    marketContext.market,
  );
  const map = resolveApplicationMap(
    COMMERCIAL_BUILDING_APPLICATION_MAP,
    marketContext.market,
  );

  return (
    <ApplicationMapViewer
      content={content}
      industryId="commercial-building"
      map={map}
      overviewImageFit="contain"
      sourcePath="/application-map/commercial-building"
    />
  );
}
