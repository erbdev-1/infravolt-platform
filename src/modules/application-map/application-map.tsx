"use client";

import { useMemo, useState } from "react";

import { ApplicationSceneView } from "./application-scene";
import { ProductList } from "./product-list";
import { ProductPanel } from "./product-panel";
import { ZoneSelector } from "./zone-selector";

import type {
  ApplicationProductSystem,
  ApplicationScene,
  ApplicationZone,
  ProductSystemId,
} from "./types";

type ApplicationMapProps = {
  readonly scenes: readonly ApplicationScene[];
  readonly products: readonly ApplicationProductSystem[];
};

export function ApplicationMap({ scenes, products }: ApplicationMapProps) {
  const [activeZone, setActiveZone] = useState<ApplicationZone>("overview");

  const [activeProductId, setActiveProductId] =
    useState<ProductSystemId>("busbar");

  const activeScene = useMemo(
    () => scenes.find((scene) => scene.zone === activeZone) ?? scenes[0],
    [activeZone, scenes],
  );

  const activeProduct = useMemo(
    () =>
      products.find((product) => product.id === activeProductId) ?? products[0],
    [activeProductId, products],
  );

  function selectProduct(productId: ProductSystemId) {
    setActiveProductId(productId);
  }

  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-[1800px] px-4 py-8 lg:px-8">
        <header className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">
            Application Map
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight lg:text-5xl">
            Data Centre
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 lg:text-base">
            Explore InfraVolt product systems within a conceptual data centre
            application environment.
          </p>
        </header>

        <div className="grid min-h-[680px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl lg:grid-cols-[280px_minmax(0,1fr)_380px]">
          <ProductList
            products={products}
            activeProductId={activeProductId}
            onProductSelect={selectProduct}
          />

          <div className="flex min-w-0 flex-col">
            <ApplicationSceneView
              scene={activeScene}
              products={products}
              activeProductId={activeProductId}
              onProductSelect={selectProduct}
            />

            <ZoneSelector
              scenes={scenes}
              activeZone={activeZone}
              onZoneChange={setActiveZone}
            />
          </div>

          <ProductPanel product={activeProduct} />
        </div>
      </div>
    </section>
  );
}
