import type { Metadata } from "next";
import { headers } from "next/headers";

import { DataCentreApplicationMap } from "@/components/public/application-map/data-centre-application-map";
import { renewableEnergyApplicationMapContentForMarket } from "@/modules/application-map/renewable-energy-content";
import { RENEWABLE_ENERGY_APPLICATION_MAP } from "@/modules/application-map/renewable-energy";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = renewableEnergyApplicationMapContentForMarket(
    marketContext.market,
  );

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/application-map/renewable-energy",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function RenewableEnergyApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = renewableEnergyApplicationMapContentForMarket(
    marketContext.market,
  );
  const map = resolveApplicationMap(
    RENEWABLE_ENERGY_APPLICATION_MAP,
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
