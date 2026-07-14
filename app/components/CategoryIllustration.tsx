import type { ReactNode } from "react";

export type IllustrationType =
  | "food"
  | "movement"
  | "habits"
  | "breakfast"
  | "lunch"
  | "snack"
  | "dinner"
  | "beginner"
  | "intermediate"
  | "advanced";

const illustrations: Record<IllustrationType, ReactNode> = {
  food: <><path d="M18 50h60"/><path d="M24 50c3 18 12 28 24 28s21-10 24-28"/><path d="M31 45c0-8 5-14 12-14 4 0 7 2 9 5 2-7 7-11 14-11 6 0 11 4 13 10"/><path d="M38 34c-5-7-10-10-16-10 1 8 6 14 14 17M57 31c2-8 8-13 16-14-1 8-6 14-14 17M46 29c0-8 3-14 9-18 3 7 2 14-3 20"/></>,
  movement: <><circle cx="48" cy="18" r="7"/><path d="M48 29v24"/><path d="m48 36-15 10"/><path d="m48 36 16 8"/><path d="m48 53-14 22"/><path d="m48 53 17 19"/><path d="M28 77h12M62 74h12"/></>,
  habits: <><path d="M48 78V42"/><path d="M48 48c-17 0-25-10-25-24 16 0 25 8 25 24ZM48 58c17 0 25-10 25-24-16 0-25 8-25 24Z"/><path d="M32 78h32"/></>,
  breakfast: <><path d="M20 54h56M27 54c2 15 11 23 21 23s19-8 21-23"/><path d="M32 37c5-8 12-12 20-12 7 0 13 3 17 9M38 42c4-5 9-7 15-7"/></>,
  lunch: <><circle cx="48" cy="49" r="28"/><circle cx="48" cy="49" r="17"/><path d="M16 22v54M11 22v16c0 6 10 6 10 0V22M80 22v54M75 22h10"/></>,
  snack: <><path d="M30 35h36l-4 42H34l-4-42Z"/><path d="M37 35c0-9 5-16 11-16s11 7 11 16M39 51h18M38 61h20"/></>,
  dinner: <><path d="M20 61h56M27 61a21 21 0 0 1 42 0"/><path d="M48 27v13M42 27h12M17 72h62"/></>,
  beginner: <><path d="M20 40v16M28 35v26M68 35v26M76 40v16M28 48h40"/><circle cx="48" cy="48" r="8"/></>,
  intermediate: <><path d="M14 43v10M22 37v22M30 32v32M66 32v32M74 37v22M82 43v10M30 48h36"/><path d="M42 48h12"/></>,
  advanced: <><path d="M12 41v14M20 34v28M29 28v40M67 28v40M76 34v28M84 41v14M29 48h38"/><path d="M43 34h10M43 62h10"/></>,
};

export function CategoryIllustration({ type, label }: { type: IllustrationType; label?: string }) {
  return (
    <svg className="category-illustration" viewBox="0 0 96 96" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
      {illustrations[type]}
    </svg>
  );
}
