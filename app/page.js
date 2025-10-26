import Header from "../components/layout/Header";
import BannerSection from "../components/sections/BannerSection";
import SkillsSections from "../components/sections/SkillsSections";
import ProjectsSection from "../components/sections/ProjectsSection";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <div>
      <main >
        <Header />
        <BannerSection />
        <SkillsSections />
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  );
}
