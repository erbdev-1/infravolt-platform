import type { ApplicationScene, ApplicationZone } from "./types";

type ZoneSelectorProps = {
  readonly scenes: readonly ApplicationScene[];
  readonly activeZone: ApplicationZone;
  readonly onZoneChange: (zone: ApplicationZone) => void;
};

export function ZoneSelector({
  scenes,
  activeZone,
  onZoneChange,
}: ZoneSelectorProps) {
  return (
    <nav
      aria-label="Application map zones"
      className="flex gap-2 overflow-x-auto border-t border-white/10 bg-slate-950/80 p-4"
    >
      {scenes.map((scene) => {
        const active = scene.zone === activeZone;

        return (
          <button
            key={scene.zone}
            type="button"
            onClick={() => onZoneChange(scene.zone)}
            className={[
              "min-w-max rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition",
              active
                ? "border-red-500 bg-red-600 text-white"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white",
            ].join(" ")}
          >
            {scene.name}
          </button>
        );
      })}
    </nav>
  );
}
