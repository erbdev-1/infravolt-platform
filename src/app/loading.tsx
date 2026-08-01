import Image from "next/image";

import styles from "./loading.module.css";

export default function Loading() {
  return (
    // Onaylı çeviri olmadan locale içeriği uydurmamak için fallback metnin gerçek dili belirtilir.
    <main aria-busy="true" className={styles.screen} lang="en-GB">
      <Image
        alt="InfraVolt"
        className={styles.logo}
        height={235}
        priority
        src="/assets/brand/infravolt-wordmark-primary.webp"
        unoptimized
        width={1040}
      />

      <p className={styles.status} role="status">
        Please wait while the page is prepared.
      </p>
    </main>
  );
}
