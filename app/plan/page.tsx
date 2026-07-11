import { SiteHeader } from "../components/SiteHeader";
import { PlanForm } from "./PlanForm";

export default function PlanPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-hero shell">
        <p className="eyebrow"><span /> Персонален стартов план</p>
        <h1>Събери храненето, движението и навиците си на едно място.</h1>
        <p>Този инструмент използва логиката от предоставения GetInShape прототип и я адаптира към DeskLife. Резултатът е ориентировъчен и не замества медицински или професионален съвет.</p>
      </section>
      <section className="shell page-section">
        <PlanForm />
      </section>
    </main>
  );
}
