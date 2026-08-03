import styles from "./data-centre-application-map.module.css";

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
