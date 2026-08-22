import Image from "next/image";

import { ApplicationHotspot } from "./application-hotspot";
import styles from "./application-map-viewer.module.css";

export type SceneHotspotDescriptor = Readonly<{
  id: string;
  number: number;
  label: string;
  x: number;
  y: number;
  pulse?: boolean;
}>;

type ApplicationSceneProps = Readonly<{
  image: string;
  imageAlt: string;
  hotspots: readonly SceneHotspotDescriptor[];
  activeHotspotId: string | null;
  onHotspotSelect: (id: string) => void;
  onImageAspectRatioChange?: (aspectRatio: number) => void;
  priority?: boolean;
}>;

// Merkezi sahne görseli ve üzerine HTML/CSS ile konumlanan hotspot'lar.
// Hem overview (bölge seçimi) hem de bölge sahneleri (ürün ailesi seçimi)
// için aynı bileşen kullanılır; anlam farkı çağıran taraftan gelir.
export function ApplicationSceneView({
  image,
  imageAlt,
  hotspots,
  activeHotspotId,
  onHotspotSelect,
  onImageAspectRatioChange,
  priority = false,
}: ApplicationSceneProps) {
  return (
    <div className={styles.scene}>
      <div className={styles.sceneFrame}>
        <Image
          alt={imageAlt}
          className={styles.sceneImage}
          fill
          onLoad={(event) => {
            const { naturalHeight, naturalWidth } = event.currentTarget;

            if (naturalHeight > 0 && naturalWidth > 0) {
              onImageAspectRatioChange?.(naturalWidth / naturalHeight);
            }
          }}
          priority={priority}
          sizes="(min-width: 1101px) 65vw, 92vw"
          src={image}
        />

        <div className={styles.sceneHotspots} data-app-map-controls>
          {hotspots.map((hotspot) => (
            <ApplicationHotspot
              active={activeHotspotId === hotspot.id}
              id={`app-map-hotspot-${hotspot.id}`}
              key={hotspot.id}
              label={hotspot.label}
              number={hotspot.number}
              onSelect={() => onHotspotSelect(hotspot.id)}
              pulse={hotspot.pulse}
              x={hotspot.x}
              y={hotspot.y}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
