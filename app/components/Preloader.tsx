"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = window.setTimeout(() => setIsVisible(false), 500);
      return () => window.clearTimeout(timer);
    }

    const startedAt = performance.now();
    const progressDuration = 1000;
    let frame = 0;
    let leaveTimer = 0;
    let removeTimer = 0;

    function update(now: number) {
      const nextProgress = Math.min(100, Math.round(((now - startedAt) / progressDuration) * 100));
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = requestAnimationFrame(update);
      } else {
        leaveTimer = window.setTimeout(() => {
          setIsLeaving(true);
          removeTimer = window.setTimeout(() => setIsVisible(false), 700);
        }, 500);
      }
    }

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`preloader${isLeaving ? " is-leaving" : ""}`} role="status" aria-live="polite">
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
