import { Hero } from "@/components/hero/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <section
        id="about"
        className="min-h-screen"
        aria-label="About"
      >
        {/* ABOUT — Phase 1.4 */}
      </section>

      <section
        id="experience"
        className="min-h-screen"
        aria-label="Experience"
      >
        {/* EXPERIENCE — Phase 1.4 */}
      </section>

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
