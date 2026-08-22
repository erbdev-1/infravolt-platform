"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import styles from "./application-map-viewer.module.css";

type ApplicationMapAspectFrameProps = Readonly<{
  active: boolean;
  aspectRatio: number | null;
  children: ReactNode;
}>;

type FrameSize = Readonly<{
  height: number;
  width: number;
}>;

export function ApplicationMapAspectFrame({
  active,
  aspectRatio,
  children,
}: ApplicationMapAspectFrameProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [frameSize, setFrameSize] = useState<FrameSize | null>(null);

  useEffect(() => {
    if (!active) {
      return;
    }

    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    function updateFrameSize() {
      // `viewport` is a `const` already null-checked above and cannot be
      // reassigned, but TS does not carry that narrowing into a nested
      // function closure — the assertion here is safe, not a suppression.
      const { height: stageHeight, width: stageWidth } =
        viewport!.getBoundingClientRect();

      if (stageHeight <= 0 || stageWidth <= 0) {
        return;
      }

      if (!aspectRatio || !Number.isFinite(aspectRatio) || aspectRatio <= 0) {
        setFrameSize({ height: stageHeight, width: stageWidth });
        return;
      }

      const stageAspectRatio = stageWidth / stageHeight;

      if (stageAspectRatio > aspectRatio) {
        setFrameSize({
          height: stageHeight,
          width: stageHeight * aspectRatio,
        });
        return;
      }

      setFrameSize({
        height: stageWidth / aspectRatio,
        width: stageWidth,
      });
    }

    updateFrameSize();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateFrameSize);

      return () => {
        window.removeEventListener("resize", updateFrameSize);
      };
    }

    const observer = new ResizeObserver(updateFrameSize);
    observer.observe(viewport);

    return () => {
      observer.disconnect();
    };
  }, [active, aspectRatio]);

  return (
    <div className={styles.mapStageViewport} ref={viewportRef}>
      <div
        className={styles.mapAspectFrame}
        style={
          active && frameSize
            ? { height: frameSize.height, width: frameSize.width }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}
