import Header from "../components/layout/Header";
import BannerSection from "../components/sections/BannerSection";
import SkillsSections from "../components/sections/SkillsSections";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <div>
      <main >
        <Header />
        <BannerSection />
        <SkillsSections />
        <ExperienceSection />
        <ProjectsSection />
        <Footer />
      </main>
    </div>
  );
}
