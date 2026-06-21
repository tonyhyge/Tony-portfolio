import { Badge } from "@/components/ui/badge";
import { ExperienceEntry } from "./experience-entry";
import type { Experience } from "@/app/data/experience";

interface DualTrackGroupProps {
  entries: Experience[];
  isLast: boolean;
}

export function DualTrackGroup({ entries, isLast }: DualTrackGroupProps) {
  const industry = entries.find((e) => e.track === "industry");
  const research = entries.find((e) => e.track === "research");
  const other = entries.find(
    (e) => e.track !== "industry" && e.track !== "research"
  );

  // Soft backstop: single-entry groups render as single column with warning
  if (entries.length === 1) {
    console.warn(
      `[DualTrackGroup] Single entry in group "${entries[0].groupId}" — expected 2 entries. Falling back to single-column rendering.`
    );
    return (
      <div className="flex flex-col md:flex-row md:justify-center">
        <ExperienceEntry experience={entries[0]} isLast={isLast} />
      </div>
    );
  }

  return (
    <div>
      {/* Dual-track grid: desktop 3-col, mobile flex-col */}
      <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0 md:items-start">
        {/* Industry track — left column on desktop, first on mobile */}
        <div className="md:col-[1] md:pr-6">
          {industry && (
            <>
              <Badge variant="outline" className="mb-2 md:hidden">
                Industry
              </Badge>
              <ExperienceEntry
                experience={industry}
                isLast={false}
                hideLine
              />
            </>
          )}
          {!industry && research && (
            <>
              <Badge variant="outline" className="mb-2 md:hidden">
                Industry
              </Badge>
              <ExperienceEntry
                experience={research}
                isLast={false}
                hideLine
              />
            </>
          )}
          {!industry && !research && other && (
            <ExperienceEntry experience={other} isLast={false} hideLine />
          )}
        </div>

        {/* Center vertical line — desktop only, spans full group height */}
        <div
          className="hidden md:block md:col-[2] w-px bg-accent self-stretch mx-2"
          aria-hidden="true"
        />

        {/* Research track — right column on desktop, second on mobile */}
        <div className="md:col-[3] md:pl-6">
          {research && (
            <>
              <Badge variant="outline" className="mb-2 md:hidden">
                Research
              </Badge>
              <ExperienceEntry
                experience={research}
                isLast={false}
                hideLine
              />
            </>
          )}
          {!research && industry && (
            <>
              <Badge variant="outline" className="mb-2 md:hidden">
                Research
              </Badge>
              <ExperienceEntry
                experience={industry}
                isLast={false}
                hideLine
              />
            </>
          )}
          {!research && !industry && other && (
            <ExperienceEntry experience={other} isLast={false} hideLine />
          )}
        </div>
      </div>

      {/* Bottom connector line to next timeline entry — hidden for last group */}
      {!isLast && (
        <div className="flex justify-center pt-0">
          <div
            className="w-px bg-border"
            style={{ height: "1.5rem" }}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
}
