import type { Metadata } from "next";
import { headers } from "next/headers";

import { ApplicationMapViewer } from "@/components/public/application-map/application-map-viewer";
import { industrialFacilityApplicationMapContentForMarket } from "@/modules/application-map/industrial-facility-content";
import { INDUSTRIAL_FACILITY_APPLICATION_MAP } from "@/modules/application-map/industrial-facility";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = industrialFacilityApplicationMapContentForMarket(
    marketContext.market,
  );

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/application-map/industrial-facility",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function IndustrialFacilityApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = industrialFacilityApplicationMapContentForMarket(
    marketContext.market,
  );
  const map = resolveApplicationMap(
    INDUSTRIAL_FACILITY_APPLICATION_MAP,
    marketContext.market,
  );

  return (
    <ApplicationMapViewer
      content={content}
      industryId="industrial-facility"
      map={map}
      overviewImageFit="contain"
      sourcePath="/application-map/industrial-facility"
    />
  );
}
