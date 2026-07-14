"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  ["/plan", "План"],
  ["/food/meal-plan", "Храна"],
  ["/movement/workouts", "Движение"],
  ["/habits", "Навици"],
] as const;

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const previousScrollY = useRef(0);

  useEffect(() => {
    previousScrollY.current = window.scrollY;

    function handleScroll() {
      const currentScrollY = Math.max(0, window.scrollY);
      const difference = currentScrollY - previousScrollY.current;

      if (isMenuOpen || currentScrollY < 24) {
        setIsHidden(false);
      } else if (difference > 6) {
        setIsHidden(true);
      } else if (difference < -6) {
        setIsHidden(false);
      }

      previousScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen((open) => {
      const nextOpen = !open;
      if (nextOpen) setIsHidden(false);
      return nextOpen;
    });
  }

  const classNames = [
    "site-header",
    "shell",
    isMenuOpen ? "menu-open" : "",
    isHidden ? "is-hidden" : "",
  ].filter(Boolean).join(" ");

  return (
    <header className={classNames}>
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
          onClick={toggleMenu}
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
