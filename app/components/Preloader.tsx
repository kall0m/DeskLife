"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(100);
      const reducedTimer = window.setTimeout(() => setIsVisible(false), 120);
      return () => window.clearTimeout(reducedTimer);
    }

    const startedAt = performance.now();
    const duration = 720;
    let frame = 0;

    function update(now: number) {
      const nextProgress = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = requestAnimationFrame(update);
      } else {
        window.setTimeout(() => setIsVisible(false), 180);
      }
    }

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`preloader${progress === 100 ? " is-complete" : ""}`} role="status" aria-live="polite">
      <div className="preloader-inner">
        <div className="preloader-brand">
          <Image className="preloader-logo" src="/icon.svg" alt="" width={34} height={40} priority />
          <span>Desk Life</span>
        </div>
        <div className="preloader-track" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <span className="preloader-percentage">{progress}%</span>
      </div>
    </div>
  );
}
