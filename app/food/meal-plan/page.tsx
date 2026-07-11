import Link from "next/link";

const meals = [
  { title: "Закуска", share: "Около 25% от дневните калории", example: "Овесени ядки с мляко или вода, източник на протеин, плодове и малко ядково масло." },
  { title: "Обяд", share: "Около 30% от дневните калории", example: "Пилешко, телешко или растителен протеин със ориз или картофи и голяма сезонна салата." },
  { title: "Следобедна или предтренировъчна закуска", share: "Около 15% от дневните калории", example: "Оризовки с пуешко или извара, плюс ябълка или банан." },
  { title: "Вечеря", share: "Около 30% от дневните калории", example: "Риба, нетлъсто месо или растителен протеин със зеленчуци и малка порция сладък картоф или киноа." },
];

export default function MealPlanPage() {
  return (
    <main>
      <section className="page-hero shell">
        <p className="eyebrow"><span /> Примерна структура на хранене</p>
        <h1>Разпредели храната си така, че да работи с реалния ти ден.</h1>
        <p>Това е примерен шаблон, базиран на предоставения GetInShape материал. Не е персонализирана диета и трябва да бъде адаптиран към предпочитания, алергии и здравословни нужди.</p>
      </section>
      <section className="shell page-section">
        <div className="meal-grid">
          {meals.map((meal, index) => (
            <article className="card meal-card" key={meal.title}>
              <span className="meal-number">0{index + 1}</span>
              <p className="content-meta">{meal.share}</p>
              <h2>{meal.title}</h2>
              <p>{meal.example}</p>
            </article>
          ))}
        </div>
        <article className="card content-card tips-card">
          <h2>Корекции според целта</h2>
          <div className="tip-grid">
            <div><h3>Намаляване на мазнини</h3><p>Намали умерено калоричните гарнитури и увеличи зеленчуците, вместо да премахваш цели групи храни.</p></div>
            <div><h3>Покачване на маса</h3><p>Увеличи постепенно порциите въглехидрати и полезни мазнини, като следиш темпа на покачване.</p></div>
            <div><h3>Хидратация</h3><p>Използвай редовно пиене през деня и адаптирай количеството към климата, движението и индивидуалните си нужди.</p></div>
          </div>
          <Link className="button" href="/calculators/tdee">Изчисли ориентировъчните калории</Link>
        </article>
      </section>
    </main>
  );
}
