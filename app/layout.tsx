import type { Metadata } from "next";
import "./globals.css";
import "./task-interactions.css";
import "./product-enhancements.css";
import "./visual-assets.css";

export const metadata: Metadata = {
  title: "Desk Life",
  description: "Здравословни навици за реалния работен ден.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
