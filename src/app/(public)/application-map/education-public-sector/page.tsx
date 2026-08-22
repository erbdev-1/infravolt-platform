import type { Metadata } from "next";
import { headers } from "next/headers";

import { ApplicationMapViewer } from "@/components/public/application-map/application-map-viewer";
import { educationPublicSectorApplicationMapContentForMarket } from "@/modules/application-map/education-public-sector-content";
import { EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP } from "@/modules/application-map/education-public-sector";
import { resolveApplicationMap } from "@/modules/application-map/resolve";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = educationPublicSectorApplicationMapContentForMarket(
    marketContext.market,
  );

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL(
        "/application-map/education-public-sector",
        marketContext.publicSiteUrl,
      ),
    },
  };
}

export default async function EducationPublicSectorApplicationMapRoute() {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = educationPublicSectorApplicationMapContentForMarket(
    marketContext.market,
  );
  const map = resolveApplicationMap(
    EDUCATION_PUBLIC_SECTOR_APPLICATION_MAP,
    marketContext.market,
  );

  return (
    <ApplicationMapViewer
      content={content}
      industryId="education-public-sector"
      map={map}
      overviewImageFit="contain"
      sourcePath="/application-map/education-public-sector"
    />
  );
}
