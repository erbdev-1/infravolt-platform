"use client";

type RouteErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

// Hata nesnesini render akışına almamak stack, digest ve hassas veri sızıntısını önler.
export default function RouteError({ reset }: RouteErrorProps) {
  return (
    <main lang="en-GB">
      <h1>Something went wrong</h1>
      <p>This page could not be displayed.</p>
      {/* Yeniden deneme yalnız Next.js tarafından sağlanan güvenli reset sınırıyla kısıtlanır. */}
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
