"use client";

import { useState } from "react";

type PlanKey = "beginner" | "intermediate" | "advanced";

type Plan = {
  title: string;
  meta: string;
  intro: string;
  rank: number;
  symbol: string;
  days: [string, string[]][];
};

const plans: Record<PlanKey, Plan> = {
  beginner: {
    title: "Начинаещ: цяло тяло",
    meta: "3 дни седмично · 0–2 месеца опит",
    intro: "Тренирай цялото тяло през ден и използвай останалите дни за ходене и възстановяване.",
    rank: 1,
    symbol: "●",
    days: [["Понеделник / Сряда / Петък", ["Клек с щанга или дъмбели — 3×8–10", "Лежанка — 3×8–10", "Гребане с дъмбел или скрипец — 3×10", "Раменна преса — 3×10", "Бицепс + трицепс — 2×12", "Планк или коремни преси — 3 серии"]]],
  },
  intermediate: {
    title: "Средно напреднал: Push / Pull / Legs",
    meta: "6 дни седмично · приблизително 6 месеца–4 години опит",
    intro: "Класическо разпределение на мускулните групи с повторение на цикъла два пъти седмично.",
    rank: 2,
    symbol: "◆",
    days: [
      ["Понеделник и Четвъртък — Push", ["Лежанка — 4×6–8", "Полулег с дъмбели — 3×8–10", "Военна преса — 3×8", "Странични вдигания — 4×12", "Трицепсово разгъване — 3×10"]],
      ["Вторник и Петък — Pull", ["Мъртва тяга само в единия ден — 3×5", "Набирания или скрипец — 4×8–10", "Гребане с щанга — 3×8", "Face pull — 3×15", "Сгъване с EZ лост — 3×10–12"]],
      ["Сряда и Събота — Legs & Abs", ["Клек — 4×6–8", "Румънска тяга — 3×10", "Лег преса — 3×10–12", "Прасци — 4×15", "Повдигане на краката — 3 серии"]],
    ],
  },
  advanced: {
    title: "Напреднал: бодибилдинг сплит",
    meta: "5–6 дни седмично · 5+ години опит",
    intro: "По-висок обем, разпределен по отделни мускулни групи. Изисква добро възстановяване и контролирано натоварване.",
    rank: 3,
    symbol: "▲",
    days: [["Седмица", ["Понеделник — гърди", "Вторник — гръб", "Сряда — крака", "Четвъртък — рамене", "Петък — ръце", "Събота — слаби точки или кардио", "Неделя — почивка"]]],
  },
};

export default function WorkoutsPage() {
  const [selected, setSelected] = useState<PlanKey | "">("");
  const [visiblePlan, setVisiblePlan] = useState<PlanKey | null>(null);
  const plan = visiblePlan ? plans[visiblePlan] : null;

  return (
    <main className="movement-page">
      <section className="page-hero shell">
        <p className="eyebrow"><span /> Библиотека с тренировки</p>
        <h1>Избери структура според опита и времето си.</h1>
        <p>Избери ниво от менюто и покажи само плана, който е подходящ за текущия ти опит.</p>
      </section>
      <section className="shell page-section stack">
        <div className="card workout-selector">
          <label htmlFor="workout-level">Ниво на плана</label>
          <div className="workout-selector-controls">
            <select id="workout-level" value={selected} onChange={(event) => setSelected(event.target.value as PlanKey | "")}>
              <option value="">Избери ниво</option>
              <option value="beginner">Начинаещ</option>
              <option value="intermediate">Средно напреднал</option>
              <option value="advanced">Напреднал</option>
            </select>
            <button className="button" type="button" disabled={!selected} onClick={() => setVisiblePlan(selected || null)}>Покажи плана</button>
          </div>
        </div>

        {plan ? (
          <article className="card content-card workout-plan-card">
            <div className="rank-visual" aria-label={`Ранг ${plan.rank} от 3`}>
              <span className="rank-symbol" aria-hidden="true">{plan.symbol}</span>
              <div>{[1, 2, 3].map((rank) => <i className={rank <= plan.rank ? "is-filled" : ""} key={rank} />)}</div>
              <small>Ранг {plan.rank} / 3</small>
            </div>
            <div>
              <p className="content-meta">{plan.meta}</p>
              <h2>{plan.title}</h2>
              <p>{plan.intro}</p>
              <div className="workout-days">
                {plan.days.map(([day, exercises]) => (
                  <section key={day}><h3>{day}</h3><ul className="clean-list">{exercises.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></section>
                ))}
              </div>
            </div>
          </article>
        ) : (
          <div className="card empty-state workout-empty"><h2>Избери тренировъчно ниво</h2><p>Планът ще се появи тук след натискане на бутона.</p></div>
        )}
      </section>
    </main>
  );
}
