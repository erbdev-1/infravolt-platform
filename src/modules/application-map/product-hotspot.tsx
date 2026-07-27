import type {
  ApplicationHotspot,
  ApplicationProductSystem,
  ProductSystemId,
} from "./types";

type ProductHotspotProps = {
  readonly hotspot: ApplicationHotspot;
  readonly product: ApplicationProductSystem;
  readonly active: boolean;
  readonly onSelect: (productId: ProductSystemId) => void;
};

export function ProductHotspot({
  hotspot,
  product,
  active,
  onSelect,
}: ProductHotspotProps) {
  return (
    <button
      type="button"
      aria-label={`View ${product.name}`}
      aria-pressed={active}
      onClick={() => onSelect(product.id)}
      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
      }}
    >
      <span
        className={[
          "relative flex size-9 items-center justify-center rounded-full border-2 text-sm font-semibold shadow-xl transition",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500/40",
          active
            ? "scale-110 border-white bg-red-600 text-white"
            : "border-white bg-slate-950/85 text-white hover:scale-110 hover:bg-red-600",
        ].join(" ")}
      >
        {product.number}

        <span
          className={[
            "absolute inset-0 -z-10 rounded-full bg-red-500",
            active ? "animate-ping opacity-40" : "opacity-0",
          ].join(" ")}
        />
      </span>

      <span
        className={[
          "absolute left-1/2 top-11 hidden min-w-max -translate-x-1/2 rounded-md border border-white/10 bg-slate-950/90 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur md:block",
          active
            ? "opacity-100"
            : "opacity-0 transition group-hover:opacity-100",
        ].join(" ")}
      >
        {hotspot.label}
      </span>
    </button>
  );
}
