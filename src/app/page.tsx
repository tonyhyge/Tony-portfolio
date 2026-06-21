import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/section";
import { AboutContent } from "@/components/about/about-content";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { ResearchGrid } from "@/components/research/ResearchGrid";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />

      <Section id="about" title="About">
        <AboutContent />
      </Section>

      <Section id="experience" title="Experience">
        <ExperienceTimeline />
      </Section>

      <Section
        id="research"
        title="Research"
        subtitle="Published & ongoing work in AI and ML"
      >
        <ResearchGrid />
      </Section>

      <SkillsSection />

      <ContactSection />
    </>
  );
}
