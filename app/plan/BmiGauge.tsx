"use client";

import { useEffect, useMemo, useState } from "react";

type BmiGaugeProps = {
  bmi: number;
};

type BmiStatus = {
  label: string;
  color: string;
};

type GaugeSegment = {
  from: number;
  to: number;
  color: string;
};

type GaugeLabel = {
  label: string;
  from: number;
  to: number;
};

const MIN_BMI = 12;
const MAX_BMI = 45;
const CENTER_X = 160;
const CENTER_Y = 178;
const OUTER_RADIUS = 128;
const INNER_RADIUS = 78;

const segments: GaugeSegment[] = [
  { from: 12, to: 16, color: "#8a0101" },
  { from: 16, to: 17, color: "#d38888" },
  { from: 17, to: 18.5, color: "#ffe400" },
  { from: 18.5, to: 25, color: "#008137" },
  { from: 25, to: 30, color: "#ffe400" },
  { from: 30, to: 35, color: "#f59e0b" },
  { from: 35, to: 40, color: "#bc2020" },
  { from: 40, to: 45, color: "#8a0101" },
];

const categoryLabels: GaugeLabel[] = [
  { label: "поднормено", from: 12, to: 18.5 },
  { label: "нормално", from: 18.5, to: 25 },
  { label: "наднормено", from: 25, to: 30 },
  { label: "затлъстяване", from: 30, to: 45 },
];

const thresholds = [16, 17, 18.5, 25, 30, 35, 40];

function getStatus(bmi: number): BmiStatus {
  if (bmi < 16) return { label: "Силно поднормено тегло", color: "#8a0101" };
  if (bmi < 18.5) return { label: "Поднормено тегло", color: "#bc2020" };
  if (bmi < 25) return { label: "Нормално тегло", color: "#008137" };
  if (bmi < 30) return { label: "Наднормено тегло", color: "#b38b00" };
  if (bmi < 35) return { label: "Затлъстяване I степен", color: "#d97706" };
  if (bmi < 40) return { label: "Затлъстяване II степен", color: "#bc2020" };
  return { label: "Затлъстяване III степен", color: "#8a0101" };
}

function valueToArcAngle(value: number) {
  return 180 + ((value - MIN_BMI) / (MAX_BMI - MIN_BMI)) * 180;
}

function bmiToNeedleAngle(bmi: number) {
  const clamped = Math.min(MAX_BMI, Math.max(MIN_BMI, bmi));
  return -90 + ((clamped - MIN_BMI) / (MAX_BMI - MIN_BMI)) * 180;
}

function polarPoint(radius: number, angle: number) {
  const radians = (angle * Math.PI) / 180;
  return {
    x: CENTER_X + radius * Math.cos(radians),
    y: CENTER_Y + radius * Math.sin(radians),
  };
}

function segmentPath(from: number, to: number) {
  const startAngle = valueToArcAngle(from);
  const endAngle = valueToArcAngle(to);
  const outerStart = polarPoint(OUTER_RADIUS, startAngle);
  const outerEnd = polarPoint(OUTER_RADIUS, endAngle);
  const innerEnd = polarPoint(INNER_RADIUS, endAngle);
  const innerStart = polarPoint(INNER_RADIUS, startAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_RADIUS} ${INNER_RADIUS} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function middlePoint(from: number, to: number, radius: number) {
  return polarPoint(radius, valueToArcAngle((from + to) / 2));
}

function readableRotation(angle: number) {
  const tangent = angle + 90;
  return tangent > 90 && tangent < 270 ? tangent + 180 : tangent;
}

export function BmiGauge({ bmi }: BmiGaugeProps) {
  const targetAngle = useMemo(() => bmiToNeedleAngle(bmi), [bmi]);
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
        <svg viewBox="0 0 320 205" role="img" aria-label="Цветна BMI скала със стрелка">
          {segments.map((segment) => (
            <path key={`${segment.from}-${segment.to}`} d={segmentPath(segment.from, segment.to)} fill={segment.color} />
          ))}

          <g className="bmi-gauge-category-labels">
            {categoryLabels.map((category) => {
              const middleAngle = valueToArcAngle((category.from + category.to) / 2);
              const point = middlePoint(category.from, category.to, OUTER_RADIUS + 17);
              const rotation = readableRotation(middleAngle);
              return (
                <text
                  key={category.label}
                  x={point.x}
                  y={point.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${rotation} ${point.x} ${point.y})`}
                >
                  {category.label}
                </text>
              );
            })}
          </g>

          <g className="bmi-gauge-thresholds">
            {thresholds.map((threshold) => {
              const thresholdAngle = valueToArcAngle(threshold);
              const point = polarPoint(OUTER_RADIUS - 13, thresholdAngle);
              const rotation = readableRotation(thresholdAngle);
              return (
                <text
                  key={threshold}
                  x={point.x}
                  y={point.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${rotation} ${point.x} ${point.y})`}
                >
                  {threshold}
                </text>
              );
            })}
          </g>

          <g
            className="bmi-gauge-needle"
            style={{ transform: `rotate(${angle}deg)`, transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
          >
            <line x1={CENTER_X} y1={CENTER_Y} x2={CENTER_X} y2="88" />
            <polygon points="160,72 151,92 169,92" />
          </g>
          <circle cx={CENTER_X} cy={CENTER_Y} r="10" className="bmi-gauge-center" />
        </svg>
      </div>

      <p className="bmi-gauge-note">BMI е ориентировъчен показател и не отчита директно мускулна маса, телесен състав или индивидуално здравословно състояние.</p>
    </section>
  );
}
