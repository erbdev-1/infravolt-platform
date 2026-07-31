import Image from "next/image";
import Link from "next/link";

import { BUSBAR_COMPONENT_GROUPS } from "@/data/products/busbar/components";

import styles from "./busbar-components-grid.module.css";

export function BusbarComponentsGrid() {
  return (
    <div className={styles.grid}>
      {BUSBAR_COMPONENT_GROUPS.map((component) => (
        <article className={styles.card} key={component.slug}>
          <div className={styles.visual}>
            <div className={styles.visual}>
              <Image
                alt={component.imageAlt}
                fill
                sizes="(min-width: 900px) 160px, 120px"
                src={component.image}
              />
            </div>
          </div>

          <div className={styles.content}>
            <p className={styles.label}>Busbar component</p>

            <h3>{component.name}</h3>

            <p className={styles.description}>{component.description}</p>

            <Link href={component.href}>
              Request component details
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
