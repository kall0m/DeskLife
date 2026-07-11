import Link from "next/link";
import { SiteHeader } from "./components/SiteHeader";

const features = [
  { icon: "🥣", title: "Храна", text: "Примерна структура за хранене, свързана с твоя дневен ритъм.", href: "/food/meal-plan" },
  { icon: "🚶", title: "Движение", text: "Тренировъчни шаблони за различни нива и свободно време.", href: "/movement/workouts" },
  { icon: "🌱", title: "Личен план", text: "Комбинирай цел, опит и навици в начална препоръка.", href: "/plan" },
];

const tasks = [
  ["Закуска", "Започни деня с нещо питателно.", true],
  ["Изпий 500 мл вода", "Хидратацията е ключова.", true],
  ["Раздвижване (5 минути)", "Леки упражнения за енергия.", false],
  ["Обяд", "Хапни здравословно и балансирано.", false],
  ["3000 крачки", "Малка разходка, голям ефект.", false],
];

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Здравословни навици за реалния работен ден</p>
            <h1>Чувствай се добре на бюрото си, не само в залата.</h1>
            <p className="lead">Малки стъпки, които се вписват в работния ти ден — по-добро хранене, повече движение и повече енергия, без да променяш целия си график.</p>
            <div className="hero-actions">
              <Link className="button" href="/plan">Създай своя план</Link>
              <Link className="button button-secondary" href="/calculators/tdee">TDEE калкулатор</Link>
            </div>
            <div className="trust-row"><span>Без регистрация</span><span>Бързо и лесно</span><span>Създадено за работещи хора</span></div>
          </div>
          <div className="hero-visual" aria-label="Примерен изглед на Desk Life">
            <div className="window-shadow" />
            <div className="laptop"><div className="laptop-screen"><div className="mini-brand">Desk Life</div><h2>Добър ден. Готов ли си за малки победи?</h2><p>Днешният прогрес</p><div className="progress-ring"><span>✓</span></div><strong>4 / 7 завършени</strong></div><div className="laptop-base" /></div>
            <div className="plant">🌿</div><div className="mug">focus<br />fuel<br />thrive</div>
          </div>
        </div>
      </section>

      <section className="shell feature-grid" id="features">
        {features.map((feature) => <article className="card feature-card" key={feature.title}><div className="feature-icon">{feature.icon}</div><div><h2>{feature.title}</h2><p>{feature.text}</p><Link href={feature.href}>Отвори →</Link></div></article>)}
      </section>

      <section className="shell dashboard-grid" id="dashboard">
        <article className="card panel"><div className="panel-heading"><h2>Днешният план</h2><span>Примерен ден</span></div><div className="task-list">{tasks.map(([title, text, done]) => <div className="task" key={String(title)}><span className={done ? "check done" : "check"}>{done ? "✓" : ""}</span><div><strong>{title}</strong><small>{text}</small></div><span className="chevron">›</span></div>)}</div><div className="panel-footer"><span className="progress-bar"><i /></span><small>2 от 7 завършени</small></div></article>
        <article className="card panel stats-panel"><div className="panel-heading"><h2>Седмична статистика</h2></div><div className="stat"><span>🍴</span><div><strong>18</strong><small>Хранения регистрирани</small></div></div><div className="stat"><span>👟</span><div><strong>7 450</strong><small>Средно крачки на ден</small></div></div><div className="stat"><span>🔥</span><div><strong>9 дни</strong><small>Текуща поредица</small></div></div><div className="chart" aria-label="Графика на активността">{[42,70,62,55,82,60,75].map((height,index) => <i key={index} style={{height:`${height}%`}} />)}</div></article>
      </section>

      <section className="shell benefit-strip"><div><strong>Създадено за реалния работен ден</strong><span>Малките действия се натрупват.</span></div><div><strong>Лесно проследяване</strong><span>Отбелязвай и виж напредъка си.</span></div><div><strong>Фокус върху постоянството</strong><span>Без стремеж към перфектен ден.</span></div><div><strong>Инструменти на едно място</strong><span>План, калории, движение и храна.</span></div></section>
    </main>
  );
}
