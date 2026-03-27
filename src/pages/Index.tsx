import ScrollHero from "@/components/ScrollHero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="relative bg-[#080808]">
      <ScrollHero />
      <Skills />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  );
};

export default Index;
