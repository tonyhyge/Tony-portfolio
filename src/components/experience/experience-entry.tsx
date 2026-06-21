import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Experience } from "@/app/data/experience";

interface ExperienceEntryProps {
  experience: Experience;
  isLast: boolean;
  hideLine?: boolean;
}

export function ExperienceEntry({ experience: exp, isLast, hideLine = false }: ExperienceEntryProps) {
  // When hideLine is true, render content-panel-only (no dot, no connector, no pl-8 wrapper)
  if (hideLine) {
    return (
      <div className="space-y-3">
        {/* Header */}
        <div>
          <h3 className="font-heading text-lg font-semibold">{exp.role}</h3>
          <p className="text-sm text-muted-foreground">
            {exp.company}{exp.location ? ` · ${exp.location}` : ""}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
          </p>
        </div>
        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {exp.description}
        </p>
        {/* Highlights */}
        {exp.highlights.length > 0 && (
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {exp.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
        {/* Tech tags */}
        {exp.techTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.techTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Vertical connector line -- hidden for last entry */}
      {!isLast && (
        <div
          className="absolute left-[11px] top-3 bottom-0 w-px bg-border"
          aria-hidden="true"
        />
      )}
      {/* Accent dot node with ring masking the line behind */}
      <div className="absolute left-0 top-[5px]">
        <div className="size-2.5 rounded-full bg-accent ring-4 ring-background" />
      </div>
      {/* Content panel */}
      <div className="space-y-3">
        {/* Header: role, company, location, dates */}
        <div>
          <h3 className="font-heading text-lg font-semibold">{exp.role}</h3>
          <p className="text-sm text-muted-foreground">
            {exp.company}{exp.location ? ` · ${exp.location}` : ""}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
          </p>
        </div>
        {/* Description */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {exp.description}
        </p>
        {/* Highlights list */}
        {exp.highlights.length > 0 && (
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {exp.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}
        {/* Tech tags row -- D-09: below description text */}
        {exp.techTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {exp.techTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
