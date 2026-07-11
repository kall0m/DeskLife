import Link from "next/link";
import { SiteHeader } from "../components/SiteHeader";

export default function LoginPage() {
  return (
    <main>
      <SiteHeader />
      <section className="shell page-hero">
        <p className="eyebrow"><span /> Профил</p>
        <h1>Входът ще бъде добавен на следващ етап.</h1>
        <p>Засега можеш да разгледаш примерния дневен план и да използваш инструментите без регистрация.</p>
        <div className="hero-actions">
          <Link className="button" href="/#dashboard">Виж примерния план</Link>
          <Link className="button button-secondary" href="/plan">Създай личен план</Link>
        </div>
      </section>
    </main>
  );
}
