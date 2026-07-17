import type { Metadata } from "next";
import { headers } from "next/headers";

import { siteConfig } from "@/lib/site";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const marketContext = resolveTrustedMarketContext(await headers());

  return (
    <html lang={marketContext.locale}>
      <body>{children}</body>
    </html>
  );
}
