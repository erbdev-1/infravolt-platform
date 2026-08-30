import { SiteFooter } from "@/components/public/site-footer";
import { SiteHeader } from "@/components/public/site-header";

import { AnalyticsProvider } from "@/modules/analytics/analytics-provider";
import { publicSiteContentForMarket } from "@/modules/public-site/content";

import type { MarketCode } from "@/modules/markets/types";
import type { ReactNode } from "react";

type PublicSiteShellProps = Readonly<{
  children: ReactNode;
  market: MarketCode;
}>;

export function PublicSiteShell({ children, market }: PublicSiteShellProps) {
  const content = publicSiteContentForMarket(market);

  return (
    <AnalyticsProvider market={market}>
      <div id="top">
        <SiteHeader content={content.shell} market={market} />
        {children}
        <SiteFooter content={content.shell} market={market} />
      </div>
    </AnalyticsProvider>
  );
}
