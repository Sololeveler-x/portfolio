import ScrollHero from "@/components/ScrollHero";
import StatusWindow from "@/components/StatusWindow";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import AmbientParticles from "@/components/AmbientParticles";
import HUDNav from "@/components/HUDNav";
import SectionDivider from "@/components/SectionDivider";

const Index = () => {
  return (
    <main className="relative" style={{ background: "#080810", paddingTop: 36 }}>
      <AmbientParticles />
      <HUDNav />

      {/* HERO */}
      <section data-section="hero">
        <ScrollHero />
      </section>

      {/* ABOUT */}
      <SectionDivider num="01" label="ABOUT" />
      <section data-section="status" style={{ background: "#080810" }}>
        <StatusWindow />
      </section>

      {/* SKILLS */}
      <SectionDivider num="02" label="SKILLS" />
      <section data-section="skills" style={{ background: "#080810" }}>
        <Skills />
      </section>

      {/* PROJECTS */}
      <SectionDivider num="03" label="PROJECTS" />
      <section data-section="projects" style={{ background: "#080810" }}>
        <Projects />
      </section>

      {/* TIMELINE */}
      <SectionDivider num="04" label="TIMELINE" />
      <section data-section="achievements" style={{ background: "#080810" }}>
        <Achievements />
      </section>

      {/* CONTACT */}
      <SectionDivider num="05" label="CONTACT" />
      <section data-section="contact" style={{ background: "#080810" }}>
        <Contact />
      </section>
    </main>
  );
};

export default Index;
