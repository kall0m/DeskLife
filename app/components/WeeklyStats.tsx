"use client";

import { useEffect, useState } from "react";

type Day = {
  short: string;
  label: string;
  height: number;
};

type Stats = {
  meals: number;
  steps: number;
  streak: number;
};

type SavedWeeklyStats = {
  activeDay: number;
  stats: Stats;
};

const STORAGE_KEY = "desklife-weekly-stats";

const days: Day[] = [
  { short: "Пон", label: "Понеделник", height: 42 },
  { short: "Вто", label: "Вторник", height: 70 },
  { short: "Сря", label: "Сряда", height: 62 },
  { short: "Чет", label: "Четвъртък", height: 55 },
  { short: "Пет", label: "Петък", height: 82 },
  { short: "Съб", label: "Събота", height: 60 },
  { short: "Нед", label: "Неделя", height: 75 },
];

const initialStats: Stats = { meals: 4, steps: 7450, streak: 9 };

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("bg-BG").format(value);
}

function isValidSavedStats(value: unknown): value is SavedWeeklyStats {
  if (!value || typeof value !== "object") return false;

  const saved = value as SavedWeeklyStats;
  return (
    Number.isInteger(saved.activeDay) &&
    saved.activeDay >= 0 &&
    saved.activeDay < days.length &&
    !!saved.stats &&
    Number.isFinite(saved.stats.meals) &&
    Number.isFinite(saved.stats.steps) &&
    Number.isFinite(saved.stats.streak)
  );
}

export function WeeklyStats() {
  const [activeDay, setActiveDay] = useState(4);
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed: unknown = JSON.parse(saved);
      if (!isValidSavedStats(parsed)) return;

      setActiveDay(parsed.activeDay);
      setStats(parsed.stats);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function selectDay(index: number) {
    const nextStats = {
      meals: randomBetween(2, 6),
      steps: randomBetween(2800, 12500),
      streak: randomBetween(1, 14),
    };

    setActiveDay(index);
    setStats(nextStats);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ activeDay: index, stats: nextStats } satisfies SavedWeeklyStats),
    );
  }

  return (
    <article className="card panel stats-panel">
      <div className="panel-heading">
        <h2>Седмична статистика</h2>
        <span>{days[activeDay].label}</span>
      </div>

      <div className="stat">
        <span aria-hidden="true">🍴</span>
        <div><strong>{stats.meals}</strong><small>Брой хранения</small></div>
      </div>
      <div className="stat">
        <span aria-hidden="true">👟</span>
        <div><strong>{formatNumber(stats.steps)}</strong><small>Средно крачки на ден</small></div>
      </div>
      <div className="stat">
        <span aria-hidden="true">🔥</span>
        <div><strong>{stats.streak} дни</strong><small>Текуща поредица</small></div>
      </div>

      <div className="weekly-chart" aria-label="Активност през седмицата">
        {days.map((day, index) => (
          <button
            className={`chart-day${activeDay === index ? " is-active" : ""}`}
            key={day.short}
            type="button"
            onClick={() => selectDay(index)}
            aria-pressed={activeDay === index}
            aria-label={`Покажи примерни данни за ${day.label}`}
          >
            <span className="chart-bar-track" aria-hidden="true">
              <span className="chart-bar" style={{ height: `${day.height}%` }} />
            </span>
            <span className="chart-day-label">{day.short}</span>
          </button>
        ))}
      </div>
    </article>
  );
}
