import type { Metadata } from "next";
import { headers } from "next/headers";

import { ContactPage } from "@/components/public/contact/contact-page";
import { parseEnquiryContext, type ContactRouteSearchParams } from "@/modules/enquiry/routing";
import { contactPageContentForMarket } from "@/modules/public-site/contact-content";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

export async function generateMetadata(): Promise<Metadata> {
  const marketContext = resolveTrustedMarketContext(await headers());
  const content = contactPageContentForMarket(marketContext.market);

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: new URL("/contact", marketContext.publicSiteUrl),
    },
  };
}

export default async function ContactRoute({
  searchParams,
}: Readonly<{
  searchParams: Promise<ContactRouteSearchParams>;
}>) {
  const marketContext = resolveTrustedMarketContext(await headers());
  const parameters = await searchParams;
  const { type, context } = parseEnquiryContext(parameters);

  return <ContactPage initialContext={context} initialType={type} market={marketContext.market} />;
}
