"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { BmiGauge } from "../../plan/BmiGauge";

type Goal = "maintain" | "cut" | "bulk";
type Inputs = { age: number; height: number; weight: number; gender: string; activity: string; goal: Goal };
type Calculation = { bmr: number; tdee: number; target: number; goal: Goal; bmi: number; inputs: Inputs };

const STORAGE_KEY = "desklife-tdee-result";
const activityFactors: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, high: 1.725, athlete: 1.9 };
const activityLabels: Record<string, string> = { sedentary: "Предимно седящ ден", light: "Лека активност", moderate: "Умерена активност", high: "Висока активност", athlete: "Атлетично ниво" };
const goalAdjustments: Record<Goal, number> = { maintain: 0, cut: -400, bulk: 275 };
const goalLabels: Record<Goal, string> = { maintain: "ориентировъчни калории за поддържане", cut: "ориентировъчна цел за постепенно намаляване", bulk: "ориентировъчна цел за постепенно покачване" };
const goalNames: Record<Goal, string> = { maintain: "Поддържане", cut: "Постепенно намаляване", bulk: "Постепенно покачване" };

function isCalculation(value: unknown): value is Calculation {
  if (!value || typeof value !== "object") return false;
  const result = value as Calculation;
  return Number.isFinite(result.bmr) && Number.isFinite(result.tdee) && Number.isFinite(result.target) && Number.isFinite(result.bmi) && !!result.inputs && (result.goal === "maintain" || result.goal === "cut" || result.goal === "bulk");
}

export function TdeeCalculator() {
  const [result, setResult] = useState<Calculation | null>(null);

  useEffect(() => { try { const saved = localStorage.getItem(STORAGE_KEY); if (!saved) return; const parsed: unknown = JSON.parse(saved); if (isCalculation(parsed)) setResult(parsed); } catch { localStorage.removeItem(STORAGE_KEY); } }, []);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const age = Number(data.get("age")); const height = Number(data.get("height")); const weight = Number(data.get("weight"));
    const gender = String(data.get("gender")); const activity = String(data.get("activity")); const goal = String(data.get("goal")) as Goal;
    const bmr = 10 * weight + 6.25 * height - 5 * age + (gender === "male" ? 5 : -161);
    const tdee = Math.round(bmr * activityFactors[activity]); const heightM = height / 100; const bmi = weight / (heightM * heightM);
    const nextResult: Calculation = { bmr: Math.round(bmr), tdee, target: tdee + goalAdjustments[goal], goal, bmi: Number(bmi.toFixed(1)), inputs: { age, height, weight, gender, activity, goal } };
    setResult(nextResult); localStorage.setItem(STORAGE_KEY, JSON.stringify(nextResult));
  }

  function clearResult() { localStorage.removeItem(STORAGE_KEY); setResult(null); }

  return <div className="calculator-grid">
    <form className="card form-card" onSubmit={calculate}>
      <label>Възраст<input name="age" type="number" min="10" max="100" required /></label>
      <label>Пол<select name="gender" required defaultValue=""><option value="" disabled>Избери</option><option value="male">Мъж</option><option value="female">Жена</option></select></label>
      <label>Ръст (см)<input name="height" type="number" min="100" max="250" required /></label><label>Тегло (кг)<input name="weight" type="number" min="30" max="300" required /></label>
      <label>Ниво на активност<select name="activity" required defaultValue=""><option value="" disabled>Избери</option><option value="sedentary">Предимно седящ ден</option><option value="light">Лека активност — 1–2 тренировки седмично</option><option value="moderate">Умерена активност — 3–5 тренировки</option><option value="high">Висока активност — 6–7 тренировки</option><option value="athlete">Атлетично ниво</option></select></label>
      <label>Цел<select name="goal" required defaultValue="maintain"><option value="maintain">Поддържане</option><option value="cut">Постепенно намаляване</option><option value="bulk">Постепенно покачване</option></select></label>
      <button className="button" type="submit">Изчисли</button>
    </form>
    <aside className="card result-card calculator-result" aria-live="polite"><p className="eyebrow"><span /> Резултат</p>{result ? <>
      <BmiGauge bmi={result.bmi} />
      <div className="submitted-results"><h3>Въведени данни</h3><dl><div><dt>Възраст</dt><dd>{result.inputs.age}</dd></div><div><dt>Пол</dt><dd>{result.inputs.gender === "male" ? "Мъж" : "Жена"}</dd></div><div><dt>Ръст</dt><dd>{result.inputs.height} см</dd></div><div><dt>Тегло</dt><dd>{result.inputs.weight} кг</dd></div><div><dt>Активност</dt><dd>{activityLabels[result.inputs.activity]}</dd></div><div><dt>Цел</dt><dd>{goalNames[result.inputs.goal]}</dd></div></dl></div>
      <div className="metric"><strong>{result.bmr}</strong><span>kcal базов метаболизъм (BMR)</span></div><div className="metric"><strong>{result.tdee}</strong><span>kcal приблизителен дневен енергиен разход</span></div><div className="metric primary"><strong>{result.target}</strong><span>kcal {goalLabels[result.goal]}</span></div>
      <p className="muted">Стойностите са ориентировъчни. Резултатът се запазва в този браузър и остава видим след презареждане.</p><div className="calculator-result-actions"><Link className="button button-secondary" href="/food/meal-plan">Виж примерен хранителен план</Link><button className="text-button" type="button" onClick={clearResult}>Изчисти резултати</button></div>
    </> : <div className="empty-state"><h2>Въведи данните си</h2><p>Ще изчислим BMI, BMR, TDEE и ориентировъчна стойност според избраната цел.</p></div>}</aside>
  </div>;
}
