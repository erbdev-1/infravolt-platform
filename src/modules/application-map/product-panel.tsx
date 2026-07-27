import Image from "next/image";
import Link from "next/link";

import type { ApplicationProductSystem } from "./types";

type ProductPanelProps = {
  readonly product: ApplicationProductSystem;
};

export function ProductPanel({ product }: ProductPanelProps) {
  return (
    <aside className="hidden overflow-y-auto border-l border-white/10 bg-slate-950 p-6 lg:block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-white">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="380px"
          className="object-contain p-6"
        />
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-500">
          System {product.number}
        </p>

        <h2 className="mt-2 text-2xl font-semibold">{product.name}</h2>

        <p className="mt-4 text-sm leading-6 text-slate-300">
          {product.description}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-white">Application</h3>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {product.application}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-white">Key advantages</h3>

        <ul className="mt-3 space-y-2">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex gap-3 text-sm text-slate-300">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red-500" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-white">Related standards</h3>

        <div className="mt-3 flex flex-wrap gap-2">
          {product.standards.map((standard) => (
            <span
              key={standard}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
            >
              {standard}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        {product.actions.map((action, index) => (
          <Link
            key={action.label}
            href={action.href}
            className={[
              "flex min-h-11 items-center justify-center rounded-xl px-4 text-center text-sm font-semibold transition",
              index === 0
                ? "bg-red-600 text-white hover:bg-red-500"
                : "border border-white/15 bg-white/5 text-white hover:bg-white/10",
            ].join(" ")}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
