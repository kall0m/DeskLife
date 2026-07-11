import type { Metadata } from "next";
import { SiteFooter } from "./components/SiteFooter";
import "./globals.css";
import "./task-interactions.css";
import "./product-enhancements.css";
import "./visual-assets.css";
import "./weekly-stats.css";
import "./footer.css";

export const metadata: Metadata = {
  title: "Desk Life",
  description: "Здравословни навици за реалния работен ден.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
