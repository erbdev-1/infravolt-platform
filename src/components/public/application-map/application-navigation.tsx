import Image from "next/image";

import styles from "./data-centre-application-map.module.css";

export type NavigationItem = Readonly<{
  id: string;
  number: number;
  name: string;
  icon: string;
  active: boolean;
  // İlk ziyarette, kullanıcı henüz bir ürün/hotspot seçmediyse ilk uygun
  // ürünü işaret eden tıklanabilirlik ipucu — seçili durumdan (active)
  // ayrı, daha yumuşak bir görsel kullanır.
  pulse?: boolean;
}>;

type ApplicationNavigationProps = Readonly<{
  label: string;
  items: readonly NavigationItem[];
  onSelect: (id: string) => void;
  // Overview'da altı aile yalnız kapsam olarak gösterilir, henüz bir bölge
  // bağlamı olmadığı için tıklanabilir değildir (odaklanabilir ama işlevsiz
  // kontrol oluşturmamak için buton yerine düz liste render edilir).
  interactive?: boolean;
}>;

export function ApplicationNavigation({
  label,
  items,
  onSelect,
  interactive = true,
}: ApplicationNavigationProps) {
  return (
    <nav aria-label={label} className={styles.nav} data-app-map-controls>
      <ul className={styles.navList}>
        {items.map((item) =>
          interactive ? (
            <li key={item.id}>
              <button
                aria-pressed={item.active}
                className={[
                  styles.navItem,
                  item.active ? styles.navItemActive : "",
                  item.pulse && !item.active ? styles.navItemPulse : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                id={`app-map-nav-${item.id}`}
                onClick={() => onSelect(item.id)}
                type="button"
              >
                <span aria-hidden="true" className={styles.navNumber}>
                  {item.number}
                </span>
                <Image
                  alt=""
                  aria-hidden="true"
                  className={styles.navIcon}
                  height={22}
                  src={item.icon}
                  width={22}
                />
                <span className={styles.navName}>{item.name}</span>
              </button>
            </li>
          ) : (
            <li
              className={`${styles.navItem} ${styles.navItemStatic}`}
              key={item.id}
            >
              <span aria-hidden="true" className={styles.navNumber}>
                {item.number}
              </span>
              <Image
                alt=""
                aria-hidden="true"
                className={styles.navIcon}
                height={22}
                src={item.icon}
                width={22}
              />
              <span className={styles.navName}>{item.name}</span>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
