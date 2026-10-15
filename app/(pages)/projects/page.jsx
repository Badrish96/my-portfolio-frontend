import Header from "../../../components/layout/Header";
import ProjectsSection from "../../../components/sections/ProjectsSection";
import Footer from "../../../components/sections/Footer";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Header />
      <main>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
