import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";

import { siteConfig } from "@/lib/site";
import { resolveTrustedMarketContext } from "@/modules/markets/server";

import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

// Site tamamen tek (açık) temalı — dark mode hiç desteklenmiyor. Bu meta
// etiketi olmadan bazı tarayıcılar/OS'lar (ör. Android Chrome "Force
// Dark"), sistem koyu temadayken sayfayı otomatik ters çevirmeye çalışır
// ve koyu metin renklerini soluk/pembemsi tonlara dönüştürür — kod
// tarafında bir hata olmasa bile. Bu, kaynak rengi ne olursa olsun aynı
// "başlıklar koyu görünmüyor" belirtisini üretir.
export const viewport: Viewport = {
  colorScheme: "light",
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
