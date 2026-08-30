import type { Metadata } from "next";
import { headers } from "next/headers";

import { ApplicationMapViewer } from "@/components/public/application-map/application-map-viewer";
import { transportInfrastructureApplicationMapContentForMarket } from "@/modules/application-map/transport-infrastructure-content";
import { TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP } from "@/modules/application-map/transport-infrastructure";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = transportInfrastructureApplicationMapContentForMarket(
    marketContext.market,
  );

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/application-map/transport-infrastructure",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function TransportInfrastructureApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = transportInfrastructureApplicationMapContentForMarket(
    marketContext.market,
  );
  const map = resolveApplicationMap(
    TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP,
    marketContext.market,
  );

  return (
    <ApplicationMapViewer
      content={content}
      industryId="transport-infrastructure"
      map={map}
      overviewImageFit="contain"
      sourcePath="/application-map/transport-infrastructure"
    />
  );
}
