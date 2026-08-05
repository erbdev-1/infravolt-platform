import type { Metadata } from "next";
import { headers } from "next/headers";

import { DataCentreApplicationMap } from "@/components/public/application-map/data-centre-application-map";
import { healthcareApplicationMapContentForMarket } from "@/modules/application-map/healthcare-content";
import { HEALTHCARE_APPLICATION_MAP } from "@/modules/application-map/healthcare";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = healthcareApplicationMapContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/application-map/healthcare",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function HealthcareApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = healthcareApplicationMapContentForMarket(marketContext.market);
  const map = resolveApplicationMap(
    HEALTHCARE_APPLICATION_MAP,
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
