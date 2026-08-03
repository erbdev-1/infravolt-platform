import type { Metadata } from "next";
import { headers } from "next/headers";

import { DataCentreApplicationMap } from "@/components/public/application-map/data-centre-application-map";
import { applicationMapContentForMarket } from "@/modules/application-map/content";
import { DATA_CENTRE_APPLICATION_MAP } from "@/modules/application-map/data-centre";
import { resolveDataCentreApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = applicationMapContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/application-map", marketContext.publicSiteUrl),
    },
  };
}

export default async function ApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = applicationMapContentForMarket(marketContext.market);
  const map = resolveDataCentreApplicationMap(
    DATA_CENTRE_APPLICATION_MAP,
    marketContext.market,
  );

  return <DataCentreApplicationMap content={content} map={map} />;
}
