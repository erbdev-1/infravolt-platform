import styles from "./application-map-viewer.module.css";

type ApplicationHotspotProps = Readonly<{
  id: string;
  number: number;
  label: string;
  x: number;
  y: number;
  active: boolean;
  // İlk ziyarette tıklanabilirliği işaret eden ipucu — seçili durumdan
  // (active) ayrı, daha yumuşak bir görsel kullanır.
  pulse?: boolean;
  // Yalnız mobil/tablette (<=860px, bkz. CSS) etkili olan ayrı bir "aktif"
  // sinyali: o genişliklerde tek bir hotspot'un adı + yumuşak nabız halkası
  // gösterilir (bkz. application-map-viewer.tsx effectiveActiveOverviewHotspotId).
  // `active`'ten kasıtlı olarak ayrı tutulur — masaüstündeki dolgu/seçili
  // görünümü (.hotspotActive) bu değişiklikten etkilenmemeli.
  activeOnMobile?: boolean;
  onSelect: () => void;
}>;

// Sayısal hotspot düğmesi — hem overview'daki bölge seçimi hem de bir
// bölge içindeki ürün ailesi seçimi için kullanılan genel amaçlı buton.
export function ApplicationHotspot({
  id,
  number,
  label,
  x,
  y,
  active,
  pulse = false,
  activeOnMobile = false,
  onSelect,
}: ApplicationHotspotProps) {
  return (
    <button
      aria-label={label}
      aria-pressed={active}
      className={[
        styles.hotspot,
        active ? styles.hotspotActive : "",
        pulse && !active ? styles.hotspotPulse : "",
        activeOnMobile ? styles.hotspotActiveMobile : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id={id}
      onClick={onSelect}
      style={{ left: `${x}%`, top: `${y}%` }}
      type="button"
    >
      <span aria-hidden="true">{number}</span>
    </button>
  );
}
