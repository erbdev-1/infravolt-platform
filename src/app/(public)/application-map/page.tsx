import type { Metadata } from "next";
import { headers } from "next/headers";

import { ApplicationMapViewer } from "@/components/public/application-map/application-map-viewer";
import { applicationMapContentForMarket } from "@/modules/application-map/content";
import { DATA_CENTRE_APPLICATION_MAP } from "@/modules/application-map/data-centre";
import { resolveDataCentreApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";
import { marketPageMetadata } from "@/modules/seo/market-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = applicationMapContentForMarket(marketContext.market);

  return marketPageMetadata({
    market: marketContext.market,
    pathname: "/application-map",
    title: content.metadata.title,
    description: content.metadata.description,
  });
}

export default async function ApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = applicationMapContentForMarket(marketContext.market);
  const map = resolveDataCentreApplicationMap(
    DATA_CENTRE_APPLICATION_MAP,
    marketContext.market,
  );

  return (
    <ApplicationMapViewer
      content={content}
      industryId="data-centre"
      map={map}
      overviewImageFit="contain"
      sourcePath="/application-map"
    />
  );
}
