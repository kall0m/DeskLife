import type { Metadata } from "next";
import { Preloader } from "./components/Preloader";
import { ScrollHeadingAnimations } from "./components/ScrollHeadingAnimations";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";
import "./task-interactions.css";
import "./product-enhancements.css";
import "./visual-assets.css";
import "./weekly-stats.css";
import "./footer.css";
import "./experience-enhancements.css";

export const metadata: Metadata = {
  title: "Desk Life",
  description: "Здравословни навици за реалния работен ден.",
};

const themeScript = `
try {
  const saved = localStorage.getItem('desklife-theme');
  const theme = saved === 'light' || saved === 'dark'
    ? saved
    : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = theme;
} catch {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <Preloader />
        <SiteHeader />
        {children}
        <SiteFooter />
        <ScrollHeadingAnimations />
      </body>
    </html>
  );
}
