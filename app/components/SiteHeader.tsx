"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["/plan", "План"],
  ["/food/meal-plan", "Храна"],
  ["/movement/workouts", "Движение"],
  ["/habits", "Навици"],
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={`site-header shell${isMenuOpen ? " menu-open" : ""}`}>
      <Link className="brand" href="/" aria-label="Desk Life начало" onClick={closeMenu}>
        <Image className="brand-logo" src="/icon.svg" alt="" width={32} height={38} priority />
        <span>Desk Life</span>
      </Link>

      <nav className="desktop-nav" aria-label="Главна навигация">
        {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <Link className="button button-small" href="/login" onClick={closeMenu}>Вход</Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Затвори менюто" : "Отвори менюто"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav id="mobile-navigation" className="mobile-nav" aria-label="Мобилна навигация">
        {links.map(([href, label]) => <Link href={href} key={href} onClick={closeMenu}>{label}</Link>)}
      </nav>
    </header>
  );
}
