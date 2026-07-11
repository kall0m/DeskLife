"use client";

import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="site-footer">
      <div className="shell site-footer-grid">
        <p className="site-footer-copy">©{currentYear} DeskLife. Всички права запазени.</p>

        <Link className="site-footer-brand" href="/" aria-label="DeskLife начало">
          <Image src="/icon.svg" alt="" width={30} height={36} />
          <span>DeskLife</span>
        </Link>

        <div className="site-footer-actions">
          <nav aria-label="Навигация във футъра">
            <Link href="/food/meal-plan">Храна</Link>
            <Link href="/movement/workouts">Движение</Link>
            <Link href="/habits">Навици</Link>
            <Link href="/login">Вход</Link>
          </nav>
          <button className="back-to-top" type="button" onClick={scrollToTop} aria-label="Обратно в началото">
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
