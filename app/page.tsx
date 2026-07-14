import Link from "next/link";
import { heroImage } from "./assets/hero-image";
import { CategoryIllustration, type IllustrationType } from "./components/CategoryIllustration";
import { DailyPlan } from "./components/DailyPlan";
import { WeeklyStats } from "./components/WeeklyStats";

const features: { icon: IllustrationType; title: string; text: string; href: string }[] = [
  {
    icon: "food",
    title: "Храна",
    text: "Лесни идеи за хранене, които се вписват в натоварения работен ден.",
    href: "/food/meal-plan",
  },
  {
    icon: "movement",
    title: "Движение",
    text: "Кратки раздвижвания, разходки и тренировки според времето, с което разполагаш.",
    href: "/movement/workouts",
  },
  {
    icon: "habits",
    title: "Навици",
    text: "Малки ежедневни действия за повече енергия, фокус и устойчивост.",
    href: "/habits",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Здравословни навици за реалния работен ден</p>
            <h1>Чувствай се добре на бюрото си, не само в залата.</h1>
            <p className="lead">Малки стъпки, които се вписват в работния ти ден — по-добро хранене, повече движение и повече енергия, без да променяш целия си график.</p>
            <div className="hero-actions">
              <Link className="button" href="/plan">Започни безплатно</Link>
              <Link className="button button-secondary" href="#dashboard">Виж примерен план</Link>
            </div>
            <div className="trust-row"><span>Без кредитна карта</span><span>Бързо и лесно</span><span>Създадено за работещи хора</span></div>
          </div>
          <div className="hero-visual hero-photo-wrap">
            <img className="hero-photo" src={heroImage} alt="Работно бюро с лаптоп, показващ дневния прогрес в Desk Life" />
          </div>
        </div>
      </section>

      <section className="shell feature-grid" id="features">
        {features.map((feature) => (
          <article className="card feature-card" key={feature.title}>
            <div className="feature-icon"><CategoryIllustration type={feature.icon} label={`Илюстрация за ${feature.title}`} /></div>
            <div><h2>{feature.title}</h2><p>{feature.text}</p><Link href={feature.href}>Виж повече →</Link></div>
          </article>
        ))}
      </section>

      <section className="shell dashboard-grid" id="dashboard">
        <DailyPlan />
        <WeeklyStats />
      </section>

      <section className="shell tdee-promo card">
        <div className="tdee-promo-icon" aria-hidden="true">∑</div>
        <div>
          <p className="content-meta">Полезен инструмент</p>
          <h2>Изчисли приблизителните си дневни калории</h2>
          <p>TDEE калкулаторът дава ориентировъчна стойност за калориите, които поддържат текущото ти тегло според възраст, ръст, тегло и активност.</p>
        </div>
        <Link className="button button-secondary" href="/calculators/tdee">Отвори TDEE калкулатора</Link>
      </section>

      <section className="shell benefit-strip"><div><strong>Създадено за реалния работен ден</strong><span>Малките действия се натрупват.</span></div><div><strong>Лесно проследяване</strong><span>Отбелязвай и виж напредъка си.</span></div><div><strong>Фокус върху постоянството</strong><span>Без стремеж към перфектен ден.</span></div><div><strong>За хора като теб</strong><span>Офис служители, фрийлансъри и предприемачи.</span></div></section>
    </main>
  );
}
