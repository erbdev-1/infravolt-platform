import Image from "next/image";

import { ProductHotspot } from "./product-hotspot";

import type {
  ApplicationProductSystem,
  ApplicationScene,
  ProductSystemId,
} from "./types";

type ApplicationSceneViewProps = {
  readonly scene: ApplicationScene;
  readonly products: readonly ApplicationProductSystem[];
  readonly activeProductId: ProductSystemId;
  readonly onProductSelect: (productId: ProductSystemId) => void;
};

export function ApplicationSceneView({
  scene,
  products,
  activeProductId,
  onProductSelect,
}: ApplicationSceneViewProps) {
  return (
    <div className="relative flex-1 overflow-hidden bg-slate-900">
      <div className="relative aspect-[16/10] min-h-[420px] w-full lg:h-full lg:aspect-auto">
        <Image
          src={scene.image}
          alt={`${scene.name} data centre application environment`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />

        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/15" />
        </div>

        <div className="absolute inset-0">
          {scene.hotspots.map((hotspot) => {
            const product = products.find(
              (item) => item.id === hotspot.productId,
            );

            if (!product) {
              return null;
            }

            return (
              <ProductHotspot
                key={hotspot.id}
                hotspot={hotspot}
                product={product}
                active={activeProductId === hotspot.productId}
                onSelect={onProductSelect}
              />
            );
          })}
        </div>

        <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-slate-950/70 px-4 py-2 text-xs text-slate-300 backdrop-blur">
          Conceptual application environment
        </div>
      </div>
    </div>
  );
}
