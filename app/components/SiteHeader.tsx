import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header shell">
      <Link className="brand" href="/" aria-label="Desk Life начало">
        <Image className="brand-logo" src="/icon.svg" alt="" width={32} height={38} priority />
        <span>Desk Life</span>
      </Link>
      <nav aria-label="Главна навигация">
        <Link href="/food/meal-plan">Храна</Link>
        <Link href="/movement/workouts">Движение</Link>
        <Link href="/habits">Навици</Link>
      </nav>
      <Link className="button button-small" href="/login">Вход</Link>
    </header>
  );
}
