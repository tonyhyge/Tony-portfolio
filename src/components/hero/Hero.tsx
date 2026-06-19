import { Container } from "@/components/container";
import { HexagonBadge } from "@/components/hero/HexagonBadge";
import { HeroCtas } from "@/components/hero/HeroCtas";
import { ScrollIndicator } from "@/components/hero/ScrollIndicator";

export function Hero() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex min-h-[90vh] flex-col items-center justify-center"
    >
      <Container>
        <div className="flex items-start justify-between gap-8 md:items-center md:gap-12 lg:gap-16">
          {/* Left: Text content */}
          <div className="flex flex-col items-start gap-6 max-w-2xl">
            {/* Name with gradient text — D-15 */}
            <h1
              className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] bg-clip-text text-transparent text-4xl font-semibold leading-[1.1] md:text-5xl"
            >
              Minh Pham
            </h1>

            {/* Tagline — D-04 */}
            <p className="text-base text-foreground">
              AI Engineer &amp; Researcher
            </p>

            {/* CTA buttons + Download CV link — D-09, D-10 */}
            <HeroCtas />

            {/* Scroll indicator — inline on mobile, below CTAs */}
            <div className="md:hidden">
              <ScrollIndicator />
            </div>
          </div>

          {/* Right: Hexagon badge — visible on both mobile and desktop */}
          <HexagonBadge className="shrink-0 mt-2 md:mt-0" />
        </div>
      </Container>

      {/* Scroll indicator — absolute bottom on desktop */}
      <div className="hidden md:absolute md:bottom-8 md:flex">
        <ScrollIndicator />
      </div>
    </section>
  );
}
