import { Hero } from "@/components/hero/Hero";
import { Section } from "@/components/section";
import { AboutContent } from "@/components/about/about-content";
import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { ResearchGrid } from "@/components/research/ResearchGrid";

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

      <section
        id="skills"
        className="min-h-screen"
        aria-label="Skills"
      >
        {/* SKILLS — Phase 1.6 */}
      </section>

      <section
        id="contact"
        className="min-h-screen"
        aria-label="Contact"
      >
        {/* CONTACT — Phase 1.6 */}
      </section>
    </>
  );
}
