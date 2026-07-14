"use client";

import { useEffect, useMemo, useState } from "react";

type BmiGaugeProps = {
  bmi: number;
};

type BmiStatus = {
  label: string;
  color: string;
};

function getStatus(bmi: number): BmiStatus {
  if (bmi < 16) return { label: "Силно поднормено тегло", color: "#8a0101" };
  if (bmi < 18.5) return { label: "Поднормено тегло", color: "#bc2020" };
  if (bmi < 25) return { label: "Нормално тегло", color: "#008137" };
  if (bmi < 30) return { label: "Наднормено тегло", color: "#ffe400" };
  if (bmi < 35) return { label: "Затлъстяване I степен", color: "#f59e0b" };
  if (bmi < 40) return { label: "Затлъстяване II степен", color: "#bc2020" };
  return { label: "Затлъстяване III степен", color: "#8a0101" };
}

function bmiToAngle(bmi: number) {
  const clamped = Math.min(45, Math.max(12, bmi));
  return -90 + ((clamped - 12) / 33) * 180;
}

export function BmiGauge({ bmi }: BmiGaugeProps) {
  const targetAngle = useMemo(() => bmiToAngle(bmi), [bmi]);
  const status = useMemo(() => getStatus(bmi), [bmi]);
  const [angle, setAngle] = useState(-90);

  useEffect(() => {
    setAngle(-90);
    const frame = requestAnimationFrame(() => setAngle(targetAngle));
    return () => cancelAnimationFrame(frame);
  }, [targetAngle]);

  return (
    <section className="bmi-gauge-card" aria-label={`BMI ${bmi.toFixed(1)} – ${status.label}`}>
      <div className="bmi-gauge-heading">
        <div>
          <p className="content-meta">BMI резултат</p>
          <h3>{bmi.toFixed(1)}</h3>
        </div>
        <span className="bmi-status" style={{ color: status.color }}>{status.label}</span>
      </div>

      <div className="bmi-gauge-visual">
        <svg viewBox="0 0 320 190" role="img" aria-label="Цветна BMI скала със стрелка">
          <path d="M30 160 A130 130 0 0 1 63 73 L160 160 Z" fill="#8a0101" />
          <path d="M63 73 A130 130 0 0 1 102 40 L160 160 Z" fill="#bc2020" />
          <path d="M102 40 A130 130 0 0 1 183 32 L160 160 Z" fill="#008137" />
          <path d="M183 32 A130 130 0 0 1 231 61 L160 160 Z" fill="#ffe400" />
          <path d="M231 61 A130 130 0 0 1 269 105 L160 160 Z" fill="#f59e0b" />
          <path d="M269 105 A130 130 0 0 1 290 160 L160 160 Z" fill="#bc2020" />
          <path d="M78 160 A82 82 0 0 1 242 160 Z" fill="var(--color-surface)" />

          <g className="bmi-gauge-labels">
            <text x="35" y="151">поднормено</text>
            <text x="112" y="55">нормално</text>
            <text x="191" y="51">наднормено</text>
            <text x="248" y="117">затлъстяване</text>
          </g>

          <g
            className="bmi-gauge-needle"
            style={{ transform: `rotate(${angle}deg)`, transformOrigin: "160px 160px" }}
          >
            <line x1="160" y1="160" x2="160" y2="76" />
            <polygon points="160,63 153,80 167,80" />
          </g>
          <circle cx="160" cy="160" r="8" className="bmi-gauge-center" />
        </svg>
      </div>

      <p className="bmi-gauge-note">BMI е ориентировъчен показател и не отчита директно мускулна маса, телесен състав или индивидуално здравословно състояние.</p>
    </section>
  );
}
