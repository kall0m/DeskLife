import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link className="brand" href="/" aria-label="Desk Life начало">
        <span className="brand-mark">●</span>
        <span>Desk Life</span>
      </Link>
      <nav aria-label="Главна навигация">
        <Link href="/food/meal-plan">Храна</Link>
        <Link href="/movement/workouts">Движение</Link>
        <Link href="/plan">План</Link>
        <Link href="/calculators/tdee">TDEE</Link>
      </nav>
      <Link className="button button-small" href="/plan">Започни</Link>
    </header>
  );
}
