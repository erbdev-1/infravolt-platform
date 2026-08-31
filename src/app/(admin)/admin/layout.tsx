import type { Metadata } from "next";

// Always noindex/nofollow, independent of SITE_INDEXING_ENABLED — the root
// layout's conditional robots value is for public marketing pages, and
// would otherwise leave this private area indexable whenever public
// indexing is turned on. This overrides it for every route under (admin).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
