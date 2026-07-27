export type ApplicationZone =
  | "overview"
  | "gray-space"
  | "white-space"
  | "external";

export type ProductSystemId =
  | "busbar"
  | "cable-tray"
  | "cable-ladder"
  | "distribution-panel"
  | "earthing"
  | "lightning-protection"
  | "led-bus lighting";

export type ProductAction = {
  readonly label: string;
  readonly href: string;
  readonly type: "page" | "request" | "question";
};

export type ApplicationProductSystem = {
  readonly id: ProductSystemId;
  readonly number: number;
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly application: string;
  readonly image: string;
  readonly benefits: readonly string[];
  readonly standards: readonly string[];
  readonly actions: readonly ProductAction[];
};

export type ApplicationHotspot = {
  readonly id: string;
  readonly productId: ProductSystemId;
  readonly zone: ApplicationZone;
  readonly x: number;
  readonly y: number;
  readonly label: string;
};

export type ApplicationScene = {
  readonly zone: ApplicationZone;
  readonly name: string;
  readonly image: string;
  readonly hotspots: readonly ApplicationHotspot[];
};
