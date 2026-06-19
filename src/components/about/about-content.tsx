import { BioNarrative } from "./bio-narrative";
import { StatsBlock } from "./stats-block";

export function AboutContent() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:gap-12 lg:gap-16">
      <BioNarrative />
      <StatsBlock />
    </div>
  );
}
