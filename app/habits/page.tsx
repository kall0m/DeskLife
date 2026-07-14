const habits = [
  { title: "Вода", text: "Започни с една чаша вода и добавяй малки напомняния през деня.", icon: "water" },
  { title: "Почивки от екрана", text: "Откъсни поглед от монитора и дай кратка почивка на очите си.", icon: "screen" },
  { title: "Раздвижване", text: "Стани за няколко минути между срещи или задачи.", icon: "move" },
  { title: "Свеж въздух", text: "Кратка разходка може да върне фокуса и да подобри настроението.", icon: "air" },
  { title: "Спокоен край на деня", text: "Създай кратък ритуал, който отделя работата от личното време.", icon: "rest" },
];

function HabitIllustration({ type }: { type: string }) {
  const content: Record<string, React.ReactNode> = {
    water: <><path d="M48 15C39 29 29 39 29 52a19 19 0 0 0 38 0c0-13-10-23-19-37Z"/><path d="M38 54c2 7 7 10 13 10"/></>,
    screen: <><rect x="18" y="20" width="60" height="42" rx="6"/><path d="M39 75h18M48 62v13M33 37c4-4 8-6 15-6s12 2 16 6M39 45c3-3 6-4 9-4s7 1 10 4"/></>,
    move: <><circle cx="48" cy="20" r="8"/><path d="m46 30-8 19 14 8 7 18M43 38l17 5 8-9M38 49 25 64M52 57l-12 18"/></>,
    air: <><path d="M15 35h39c9 0 9-13 0-13-5 0-8 3-9 6M16 48h56c10 0 10 14 0 14-5 0-8-3-9-6M20 61h27"/><path d="M70 22c7 5 10 12 10 20"/></>,
    rest: <><path d="M54 17a24 24 0 1 0 21 36A27 27 0 0 1 54 17Z"/><path d="m24 25 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5ZM74 18l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z"/></>,
  };

  return <svg className="habit-illustration" viewBox="0 0 96 96" role="img" aria-label="Илюстрация към навика" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">{content[type]}</svg>;
}

export default function HabitsPage() {
  return (
    <main>
      <section className="shell page-hero">
        <p className="eyebrow"><span /> Малки действия, повтаряни редовно</p>
        <h1>Навици за повече енергия в реалния работен ден.</h1>
        <p>Не е нужно да променяш всичко наведнъж. Избери едно малко действие и го направи достатъчно лесно, за да можеш да го повториш и утре.</p>
      </section>
      <section className="shell page-section habit-grid">
        {habits.map((habit, index) => (
          <article className="card content-card habit-card" key={habit.title}>
            <div className="habit-visual"><HabitIllustration type={habit.icon} /></div>
            <div><p className="content-meta">Навик {index + 1}</p><h2>{habit.title}</h2><p>{habit.text}</p></div>
          </article>
        ))}
      </section>
    </main>
  );
}
