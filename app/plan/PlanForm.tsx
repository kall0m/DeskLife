"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

type SubmittedData = { age: string; gender: string; height: string; weight: string; bodyfat: string; activity: string; experience: string; goal: string };
type Result = { name: string; recommendation: string; workout: string[]; nutrition: string[]; dailyHabits?: string[]; submitted: SubmittedData };

const STORAGE_KEY = "desklife-plan";
const workoutByExperience: Record<string, string[]> = {
  beginner: ["Понеделник — тренировка за цяло тяло", "Сряда — тренировка за цяло тяло", "Петък — тренировка за цяло тяло", "Останалите дни — разходка и възстановяване"],
  intermediate: ["Понеделник — гърди и трицепс", "Вторник — гръб и бицепс", "Четвъртък — крака", "Петък — рамене", "Събота — леко кардио"],
  experienced: ["Понеделник — Push", "Вторник — Pull", "Сряда — Legs", "Петък — Upper body", "Събота — Lower body"],
  advanced: ["Понеделник — Push", "Вторник — Pull", "Сряда — Legs", "Четвъртък — Push", "Петък — Pull", "Събота — Legs"],
  expert: ["Понеделник — гърди", "Вторник — гръб", "Сряда — крака", "Четвъртък — рамене", "Петък — ръце", "Събота — слаби точки или леко кардио"],
};
const nutritionByGoal: Record<string, { title: string; tips: string[] }> = {
  cut: { title: "Постепенно намаляване на мазнините", tips: ["Цели се в приблизително 300–500 kcal под поддържащите калории.", "Приемай около 1.6–2.0 g протеин на килограм телесно тегло.", "Запази силовите тренировки, съня и хидратацията като приоритет."] },
  bulk: { title: "Постепенно покачване на мускулна маса", tips: ["Цели се в приблизително 250–300 kcal над поддържащите калории.", "Приемай около 1.6–2.0 g протеин на килограм телесно тегло.", "Следи темпа на покачване и коригирай порциите постепенно."] },
  maintain: { title: "Поддържане и общо здраве", tips: ["Храни се близо до поддържащите си калории.", "Комбинирай достатъчно протеин, зеленчуци, пълноценни въглехидрати и полезни мазнини.", "Използвай редовни разходки и кратки почивки от бюрото."] },
  stronger: { title: "Повече сила", tips: ["Храни се около поддържащите калории или в малък излишък.", "Използвай прогресивно натоварване при основните упражнения.", "Осигури достатъчно сън и време за възстановяване."] },
};

export function PlanForm() {
  const [result, setResult] = useState<Result | null>(null);
  const [saved, setSaved] = useState(false);
  const dailyHabits = useMemo(() => ["Изпий 500 мл вода след започване на работа", "Направи 5 минути раздвижване", "Излез на кратка разходка", "Планирай следващото си хранене", "Направи кратка почивка без екран"], []);

  useEffect(() => { try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) { const parsed = JSON.parse(raw) as Result; if (parsed?.recommendation && parsed.submitted) { setResult(parsed); setSaved(true); } } } catch { localStorage.removeItem(STORAGE_KEY); } }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const experience = String(form.get("experience"));
    const goal = String(form.get("goal"));
    const nutrition = nutritionByGoal[goal];
    const nextResult: Result = {
      name: String(form.get("name") || "").trim() || "Твоят план",
      recommendation: nutrition.title,
      workout: workoutByExperience[experience], nutrition: nutrition.tips, dailyHabits,
      submitted: {
        age: String(form.get("age")), gender: String(form.get("gender")), height: String(form.get("height")), weight: String(form.get("weight")), bodyfat: String(form.get("bodyfat") || "Не е въведено"), activity: String(form.get("activity")), experience: String(form.get("experience")), goal: String(form.get("goal")),
      },
    };
    setResult(nextResult); localStorage.setItem(STORAGE_KEY, JSON.stringify(nextResult)); setSaved(true);
  }

  function clearPlan() { localStorage.removeItem(STORAGE_KEY); setResult(null); setSaved(false); }

  return <div className="planner-grid">
    <form className="card form-card" onSubmit={handleSubmit}><div className="field-grid">
      <label>Име<input name="name" type="text" placeholder="Твоето име" /></label><label>Възраст<input name="age" type="number" min="10" max="100" required /></label>
      <label>Пол<select name="gender" required defaultValue=""><option value="" disabled>Избери</option><option>Мъж</option><option>Жена</option></select></label>
      <label>Ръст (см)<input name="height" type="number" min="100" max="250" required /></label><label>Тегло (кг)<input name="weight" type="number" min="30" max="300" required /></label>
      <label>Телесни мазнини — по избор<input name="bodyfat" type="number" min="1" max="60" /></label>
      <label>Ниво на активност<select name="activity" required defaultValue=""><option value="" disabled>Избери</option><option>Предимно седящ ден</option><option>Лека активност</option><option>Умерена активност</option><option>Висока активност</option><option>Атлетично ниво</option></select></label>
      <label>Опит с тренировки<select name="experience" required defaultValue=""><option value="" disabled>Избери</option><option value="beginner">0–2 месеца</option><option value="intermediate">6 месеца–1 година</option><option value="experienced">1–2 години</option><option value="advanced">2–4 години</option><option value="expert">5–10 години</option></select></label>
      <label className="field-full">Основна цел<select name="goal" required defaultValue="maintain"><option value="cut">Намаляване на мазнините</option><option value="bulk">Покачване на мускулна маса</option><option value="maintain">Поддържане и добро здраве</option><option value="stronger">Повече сила</option></select></label>
    </div><button className="button" type="submit">Създай примерен план</button></form>
    <aside className="card result-card" aria-live="polite">{!result ? <div className="empty-state"><span>✦</span><h2>Твоят план ще се появи тук</h2><p>Попълни формата, за да получиш начална тренировъчна и хранителна насока.</p></div> : <>
      <p className="eyebrow"><span /> План за {result.name}</p><h2>{result.recommendation}</h2>
      <div className="submitted-results"><h3>Въведени данни</h3><dl><div><dt>Възраст</dt><dd>{result.submitted.age}</dd></div><div><dt>Пол</dt><dd>{result.submitted.gender}</dd></div><div><dt>Ръст</dt><dd>{result.submitted.height} см</dd></div><div><dt>Тегло</dt><dd>{result.submitted.weight} кг</dd></div><div><dt>Телесни мазнини</dt><dd>{result.submitted.bodyfat}</dd></div><div><dt>Активност</dt><dd>{result.submitted.activity}</dd></div><div><dt>Опит</dt><dd>{result.submitted.experience}</dd></div><div><dt>Цел</dt><dd>{result.submitted.goal}</dd></div></dl></div>
      <h3>Седмично движение</h3><ul className="clean-list">{result.workout.map((item) => <li key={item}>{item}</li>)}</ul><h3>Хранителна насока</h3><ul className="clean-list">{result.nutrition.map((item) => <li key={item}>{item}</li>)}</ul><h3>Навици за работния ден</h3><ul className="clean-list">{(result.dailyHabits ?? dailyHabits).map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="result-actions"><Link className="button" href="/calculators/tdee">Изчисли калориите</Link><button className="text-button" type="button" onClick={clearPlan}>Изчисти плана</button></div>{saved && <p className="success-note">Планът е запазен на това устройство и ще остане видим след презареждане.</p>}
    </>}</aside>
  </div>;
}
