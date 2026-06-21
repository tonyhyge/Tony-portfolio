import { experiences } from "@/app/data/experience";
import { ExperienceEntry } from "./experience-entry";
import { DualTrackGroup } from "./dual-track-group";
import type { Experience } from "@/app/data/experience";

/**
 * Pure grouping function: scans the flat experiences array, groups entries by
 * groupId, and returns an array of (single entries | group arrays) in reverse
 * chronological order.
 *
 * O(n) single-pass Map-based grouping. Entries without groupId remain as singles.
 * Per D-17: simple O(n) Map-based grouping.
 */
function groupExperiences(
  data: Experience[]
): (Experience | Experience[])[] {
  const groups = new Map<string, Experience[]>();
  const singles: Experience[] = [];

  for (const exp of data) {
    if (exp.groupId) {
      const existing = groups.get(exp.groupId);
      if (existing) {
        existing.push(exp);
      } else {
        groups.set(exp.groupId, [exp]);
      }
    } else {
      singles.push(exp);
    }
  }

  const allItems: (Experience | Experience[])[] = [
    ...Array.from(groups.values()),
    ...singles,
  ];

  return allItems.sort((a, b) => {
    const dateA = Array.isArray(a) ? a[0].startDate : a.startDate;
    const dateB = Array.isArray(b) ? b[0].startDate : b.startDate;
    return dateB.localeCompare(dateA);
  });
}

export function ExperienceTimeline() {
  const grouped = groupExperiences(experiences);

  return (
    <div className="relative">
      {grouped.map((item, i) => {
        const isLast = i === grouped.length - 1;

        if (Array.isArray(item)) {
          return (
            <DualTrackGroup
              key={item[0].groupId || `group-${i}`}
              entries={item}
              isLast={isLast}
            />
          );
        }

        return (
          <ExperienceEntry
            key={`${item.company}-${item.role}`}
            experience={item}
            isLast={isLast}
          />
        );
      })}
    </div>
  );
}
