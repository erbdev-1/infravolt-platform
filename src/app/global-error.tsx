"use client";

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

// Root layout çalışmayabileceği için tam document kabuğu ve güvenli dil fallback'i burada tutulur.
export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en-GB">
      <body>
        <main>
          <h1>Something went wrong</h1>
          <p>The application could not be displayed.</p>
          {/* Hata nesnesi yerine yalnız framework reset callback'ini kullanmak iç ayrıntı sızıntısını sınırlar. */}
          <button type="button" onClick={reset}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
