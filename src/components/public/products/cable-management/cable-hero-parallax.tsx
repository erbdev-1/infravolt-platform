"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

// The only piece of the hero motion that genuinely needs JS: translating the
// product a few px toward the pointer. Entrance and the idle float are pure
// CSS (see cable-management-page.module.css, "SUPPORT HERO VISUAL"). Mirrors
// EarthingHeroParallax's logic exactly but kept as its own component/module
// — same reasoning as the rest of this product line: nothing here should be
// able to affect the earthing-lightning line, and vice versa. Does nothing
// on touch devices or when the user has requested reduced motion.
const MAX_X_PX = 5;
const MAX_Y_PX = 4;

export function CableHeroParallax({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className: string;
}>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || prefersReducedMotion) return;

    function handlePointerMove(event: PointerEvent) {
      const rect = node!.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

      node!.style.transform = `translate3d(${(relativeX * MAX_X_PX * 2).toFixed(2)}px, ${(relativeY * MAX_Y_PX * 2).toFixed(2)}px, 0)`;
    }

    function resetTransform() {
      node!.style.transform = "";
    }

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerleave", resetTransform);

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerleave", resetTransform);
    };
  }, []);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
