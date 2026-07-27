import type { ApplicationProductSystem, ProductSystemId } from "./types";

type ProductListProps = {
  readonly products: readonly ApplicationProductSystem[];
  readonly activeProductId: ProductSystemId;
  readonly onProductSelect: (productId: ProductSystemId) => void;
};

export function ProductList({
  products,
  activeProductId,
  onProductSelect,
}: ProductListProps) {
  return (
    <aside className="hidden border-r border-white/10 bg-slate-950/80 p-5 lg:block">
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        Product systems
      </p>

      <div className="space-y-2">
        {products.map((product) => {
          const active = activeProductId === product.id;

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onProductSelect(product.id)}
              className={[
                "flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition",
                active
                  ? "border-red-500/50 bg-red-500/10 text-white"
                  : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <span
                className={[
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  active
                    ? "bg-red-600 text-white"
                    : "bg-white/10 text-slate-300",
                ].join(" ")}
              >
                {product.number}
              </span>

              <span className="text-sm font-medium leading-5">
                {product.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
