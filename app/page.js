import Header from "../components/layout/Header";
import BannerSection from "../components/sections/BannerSection";
import SkillsSections from "../components/sections/SkillsSections";


export default function Home() {
  return (
    <div>
      <main >
        <Header />
        <BannerSection />
        <SkillsSections />
      </main>
    </div>
  );
}
