import type { Metadata } from "next";
import { headers } from "next/headers";

import { DataCentreApplicationMap } from "@/components/public/application-map/data-centre-application-map";
import { transportInfrastructureApplicationMapContentForMarket } from "@/modules/application-map/transport-infrastructure-content";
import { TRANSPORT_INFRASTRUCTURE_APPLICATION_MAP } from "@/modules/application-map/transport-infrastructure";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = transportInfrastructureApplicationMapContentForMarket(
    marketContext.market,
  );

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/application-map/transport-infrastructure",
        marketContext.publicSiteUrl,
      ),
    },
  };
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
    <DataCentreApplicationMap
      content={content}
      map={map}
      overviewImageFit="contain"
    />
  );
}
