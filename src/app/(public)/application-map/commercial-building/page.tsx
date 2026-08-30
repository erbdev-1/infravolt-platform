import type { Metadata } from "next";
import { headers } from "next/headers";

import { ApplicationMapViewer } from "@/components/public/application-map/application-map-viewer";
import { commercialBuildingApplicationMapContentForMarket } from "@/modules/application-map/commercial-building-content";
import { COMMERCIAL_BUILDING_APPLICATION_MAP } from "@/modules/application-map/commercial-building";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = commercialBuildingApplicationMapContentForMarket(
    marketContext.market,
  );

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/application-map/commercial-building",
    title: content.metadata.title,
    description: content.metadata.description,
  });
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
