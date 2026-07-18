import Link from "next/link";

export default function NotFound() {
  return (
    <main lang="en-GB">
      <h1>Page not found</h1>
      <p>The requested page is unavailable.</p>
      {/* Göreli hedef, recovery akışını doğrulanmış mevcut market host'u üzerinde tutar. */}
      <Link href="/" style={{ textDecoration: "underline" }}>
        Return to the homepage
      </Link>
    </main>
  );
}
