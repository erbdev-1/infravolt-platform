export default function Loading() {
  return (
    // Onaylı çeviri olmadan locale içeriği uydurmamak için fallback metnin gerçek dili belirtilir.
    <main lang="en-GB" aria-busy="true">
      <h1>Loading</h1>
      <p role="status">Please wait while the page is prepared.</p>
    </main>
  );
}
