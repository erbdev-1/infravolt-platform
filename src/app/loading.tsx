// verify-safe-states.ts bu dosyayı düz TypeScript transpile + require ile
// çalıştırır (Next.js/webpack pipeline'ı olmadan), bu yüzden CSS Module veya
// next/image gibi bundler'a bağımlı import'lar burada kullanılamaz.
const LOADING_STYLES = `
.infravolt-loading-screen {
  align-items: center;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  inset: 0;
  justify-content: center;
  position: fixed;
}

.infravolt-loading-heading {
  clip: rect(0 0 0 0);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}

.infravolt-loading-logo {
  animation: infravolt-loading-pulse 1600ms ease-in-out infinite;
  height: auto;
  width: clamp(9rem, 22vw, 14rem);
}

.infravolt-loading-screen p[role="status"] {
  color: #041a35;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  opacity: 0.55;
  text-transform: uppercase;
}

@keyframes infravolt-loading-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.55;
    transform: scale(0.97);
  }
}

@media (prefers-reduced-motion: reduce) {
  .infravolt-loading-logo {
    animation: none;
  }
}
`;

// No import from @/modules/storage/asset-url here — same imports-free
// constraint as the rest of this file (see the note at the top): reads
// process.env directly (a plain Node global, no bundler substitution
// required) rather than pulling in the shared publicMediaUrl() resolver.
function resolveLoadingLogoUrl(): string {
  const base = process.env.NEXT_PUBLIC_ASSET_BASE_URL;
  const trimmedBase = base && base.trim() !== "" ? base.trim().replace(/\/+$/, "") : "";

  return trimmedBase
    ? `${trimmedBase}/brand/infravolt-wordmark-primary.webp`
    : "/assets/brand/infravolt-wordmark-primary.webp";
}

export default function Loading() {
  return (
    // Onaylı çeviri olmadan locale içeriği uydurmamak için fallback metnin gerçek dili belirtilir.
    <main aria-busy="true" className="infravolt-loading-screen" lang="en-GB">
      <style>{LOADING_STYLES}</style>

      <h1 className="infravolt-loading-heading">Loading</h1>

      <img
        alt="InfraVolt"
        className="infravolt-loading-logo"
        height={235}
        src={resolveLoadingLogoUrl()}
        width={1040}
      />

      <p role="status">Please wait while the page is prepared.</p>
    </main>
  );
}
