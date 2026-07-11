import { SiteHeader } from "../../components/SiteHeader";
import { TdeeCalculator } from "./TdeeCalculator";

export default function TdeePage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero shell">
        <p className="eyebrow"><span /> Калориен калкулатор</p>
        <h1>Изчисли ориентировъчните си поддържащи калории.</h1>
        <p>Калкулаторът използва формулата Mifflin–St Jeor и стандартни коефициенти за активност. Резултатът е отправна точка, не медицинска оценка.</p>
      </section>
      <section className="shell page-section"><TdeeCalculator /></section>
    </main>
  );
}
