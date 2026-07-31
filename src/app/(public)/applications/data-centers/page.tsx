import type { Metadata } from "next";

import { ApplicationMap } from "@/modules/application-map/application-map";
import {
  applicationScenes,
  productSystems,
} from "@/modules/application-map/data-centre";

export const metadata: Metadata = {
  title: "Data Centre Application Map | InfraVolt",
  description:
    "Explore electrical distribution, cable management, earthing and lighting systems within a conceptual data centre environment.",
};

export default function DataCentreApplicationMapPage() {
  return (
    <main>
      <ApplicationMap scenes={applicationScenes} products={productSystems} />
    </main>
  );
}
