"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Goal = "maintain" | "cut" | "bulk";
type Calculation = { bmr: number; tdee: number; target: number; goal: Goal };

const activityFactors: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  athlete: 1.9,
};

const goalAdjustments: Record<Goal, number> = { maintain: 0, cut: -400, bulk: 275 };
const goalLabels: Record<Goal, string> = {
  maintain: "ориентировъчни калории за поддържане",
  cut: "ориентировъчна цел за постепенно намаляване",
  bulk: "ориентировъчна цел за постепенно покачване",
};

export function TdeeCalculator() {
  const [result, setResult] = useState<Calculation | null>(null);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const age = Number(data.get("age"));
    const height = Number(data.get("height"));
    const weight = Number(data.get("weight"));
    const gender = String(data.get("gender"));
    const activity = String(data.get("activity"));
    const goal = String(data.get("goal")) as Goal;
    const bmr = 10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);
    const tdee = Math.round(bmr * activityFactors[activity]);
    setResult({ bmr: Math.round(bmr), tdee, target: tdee + goalAdjustments[goal], goal });
  }

  return (
    <div className="calculator-grid">
      <form className="card form-card" onSubmit={calculate}>
        <label>Възраст<input name="age" type="number" min="10" max="100" required /></label>
        <label>Пол<select name="gender" required defaultValue=""><option value="" disabled>Избери</option><option value="male">Мъж</option><option value="female">Жена</option></select></label>
        <label>Ръст (см)<input name="height" type="number" min="100" max="250" required /></label>
        <label>Тегло (кг)<input name="weight" type="number" min="30" max="300" required /></label>
        <label>Ниво на активност<select name="activity" required defaultValue=""><option value="" disabled>Избери</option><option value="sedentary">Предимно седящ ден</option><option value="light">Лека активност — 1–2 тренировки седмично</option><option value="moderate">Умерена активност — 3–5 тренировки</option><option value="high">Висока активност — 6–7 тренировки</option><option value="athlete">Атлетично ниво</option></select></label>
        <label>Цел<select name="goal" required defaultValue="maintain"><option value="maintain">Поддържане</option><option value="cut">Постепенно намаляване</option><option value="bulk">Постепенно покачване</option></select></label>
        <button className="button" type="submit">Изчисли</button>
      </form>
      <aside className="card result-card calculator-result" aria-live="polite">
        <p className="eyebrow"><span /> Резултат</p>
        {result ? <>
          <div className="metric"><strong>{result.bmr}</strong><span>kcal базов метаболизъм (BMR)</span></div>
          <div className="metric"><strong>{result.tdee}</strong><span>kcal приблизителен дневен енергиен разход</span></div>
          <div className="metric primary"><strong>{result.target}</strong><span>kcal {goalLabels[result.goal]}</span></div>
          <p className="muted">Стойностите са ориентировъчни. Проследявай енергията, теглото и ежедневното си движение и коригирай постепенно.</p>
          <Link className="button button-secondary" href="/food/meal-plan">Виж примерен хранителен план</Link>
        </> : <div className="empty-state"><h2>Въведи данните си</h2><p>Ще изчислим BMR, TDEE и ориентировъчна стойност според избраната цел.</p></div>}
      </aside>
    </div>
  );
}
