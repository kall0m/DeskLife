"use client";

import { FormEvent, useState } from "react";

type Calculation = { bmr: number; tdee: number };

const activityFactors: Record<string, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725,
  athlete: 1.9,
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

    const bmr = 10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);
    setResult({ bmr: Math.round(bmr), tdee: Math.round(bmr * activityFactors[activity]) });
  }

  return (
    <div className="calculator-grid">
      <form className="card form-card" onSubmit={calculate}>
        <label>Възраст<input name="age" type="number" min="10" max="100" required /></label>
        <label>Пол<select name="gender" required defaultValue=""><option value="" disabled>Избери</option><option value="male">Мъж</option><option value="female">Жена</option></select></label>
        <label>Ръст (см)<input name="height" type="number" min="100" max="250" required /></label>
        <label>Тегло (кг)<input name="weight" type="number" min="30" max="300" required /></label>
        <label>Ниво на активност<select name="activity" required defaultValue=""><option value="" disabled>Избери</option><option value="sedentary">Предимно седящ ден</option><option value="light">Лека активност — 1–2 тренировки седмично</option><option value="moderate">Умерена активност — 3–5 тренировки</option><option value="high">Висока активност — 6–7 тренировки</option><option value="athlete">Атлетично ниво</option></select></label>
        <button className="button" type="submit">Изчисли</button>
      </form>
      <aside className="card result-card calculator-result" aria-live="polite">
        <p className="eyebrow"><span /> Резултат</p>
        {result ? <><div className="metric"><strong>{result.bmr}</strong><span>kcal базов метаболизъм (BMR)</span></div><div className="metric primary"><strong>{result.tdee}</strong><span>kcal приблизителни поддържащи калории</span></div><p className="muted">Стойността е ориентировъчна. Реалните нужди зависят от движение, телесен състав, здравословно състояние и проследяване във времето.</p></> : <div className="empty-state"><h2>Въведи данните си</h2><p>Ще изчислим ориентировъчния базов метаболизъм и дневен енергиен разход.</p></div>}
      </aside>
    </div>
  );
}
