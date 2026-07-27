"use client";

import { useEffect, useRef, useState } from "react";

type AccessibleVideoProps = Readonly<{
  className?: string;
  fallback: string;
  label: string;
  pauseLabel: string;
  playLabel: string;
  poster: string;
  source: string;
}>;

export function AccessibleVideo({
  className,
  fallback,
  label,
  pauseLabel,
  playLabel,
  poster,
  source,
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
        <source src={source} type="video/mp4" />
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
