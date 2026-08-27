import type { Metadata } from "next";
import { headers } from "next/headers";

import { ApplicationMapViewer } from "@/components/public/application-map/application-map-viewer";
import { infrastructureUtilitiesApplicationMapContentForMarket } from "@/modules/application-map/infrastructure-utilities-content";
import { INFRASTRUCTURE_UTILITIES_APPLICATION_MAP } from "@/modules/application-map/infrastructure-utilities";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = infrastructureUtilitiesApplicationMapContentForMarket(
    marketContext.market,
  );

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/application-map/infrastructure-utilities",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function InfrastructureUtilitiesApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = infrastructureUtilitiesApplicationMapContentForMarket(
    marketContext.market,
  );
  const map = resolveApplicationMap(
    INFRASTRUCTURE_UTILITIES_APPLICATION_MAP,
    marketContext.market,
  );

  return (
    <ApplicationMapViewer
      content={content}
      industryId="infrastructure-utilities"
      map={map}
      overviewImageFit="contain"
      sourcePath="/application-map/infrastructure-utilities"
    />
  );
}
