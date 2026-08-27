"use client";

import { useEffect, useRef, useState } from "react";

type AccessibleVideoProps = Readonly<{
  className?: string;
  fallback: string;
  label: string;
  pauseLabel: string;
  playLabel: string;
  // Single-source callers (e.g. the About/Gersan clip) keep using `source`.
  // Callers with separately-encoded desktop/mobile renders (e.g. the
  // homepage hero) use `desktopSource`/`mobileSource` instead — the browser
  // picks exactly one via native <source media> matching, so only one file
  // ever downloads; no viewport JS needed.
  source?: string;
  desktopSource?: string;
  mobileSource?: string;
  // Desktop/mobile <source> tiers split at the same 64rem (1024px) point
  // this hero already uses for its own responsive sizing (see .hero__video
  // in globals.css, "max-width: 63.99rem" tablet tier).
  desktopMediaQuery?: string;
  poster?: string;
}>;

export function AccessibleVideo({
  className,
  fallback,
  label,
  pauseLabel,
  playLabel,
  source,
  desktopSource,
  mobileSource,
  desktopMediaQuery = "(min-width: 64rem)",
  poster,
}: AccessibleVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasFailed, setHasFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const motionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");

    const applyMotionPreference = () => {
      if (motionQuery?.matches) {
        // Reduced motion tercihinde otomatik hareket başlamaz; kullanıcı kontrolü yine kullanılabilir kalır.
        video.pause();
        return;
      }

      void video.play().catch(() => {
        setIsPlaying(false);
      });
    };

    applyMotionPreference();
    motionQuery?.addEventListener("change", applyMotionPreference);

    return () => {
      motionQuery?.removeEventListener("change", applyMotionPreference);
      video.pause();
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      void video.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    video.pause();
  };

  return (
    <div className={["accessible-video", className].filter(Boolean).join(" ")}>
      <video
        aria-label={label}
        loop
        muted
        onError={() => setHasFailed(true)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        playsInline
        poster={poster}
        preload="metadata"
        ref={videoRef}
      >
        {desktopSource ? (
          <source media={desktopMediaQuery} src={desktopSource} type="video/mp4" />
        ) : null}
        {mobileSource ? <source src={mobileSource} type="video/mp4" /> : null}
        {source ? <source src={source} type="video/mp4" /> : null}
      </video>
      {!hasFailed ? (
        <button
          aria-label={isPlaying ? pauseLabel : playLabel}
          className="video-control"
          onClick={togglePlayback}
          type="button"
        >
          <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
          <span>{isPlaying ? pauseLabel : playLabel}</span>
        </button>
      ) : (
        <p className="video-fallback" role="status">
          {fallback}
        </p>
      )}
    </div>
  );
}
