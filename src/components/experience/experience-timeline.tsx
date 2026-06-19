import { experiences } from "@/app/data/experience";
import { ExperienceEntry } from "./experience-entry";

export function ExperienceTimeline() {
  return (
    <div className="relative">
      {experiences.map((exp, i) => (
        <ExperienceEntry
          key={`${exp.company}-${exp.role}`}
          experience={exp}
          isLast={i === experiences.length - 1}
        />
      ))}
    </div>
  );
}
