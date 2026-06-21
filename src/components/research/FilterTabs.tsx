import { cn } from "@/lib/utils"

interface FilterTabsProps {
  availableStatuses: string[]
  activeStatus: string
  onFilterChange: (status: string) => void
}

function formatStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    "in-progress": "In Progress",
    submitted: "Submitted",
    published: "Published",
    accepted: "Accepted",
  }
  return labels[status] ?? status
}

export function FilterTabs({
  availableStatuses,
  activeStatus,
  onFilterChange,
}: FilterTabsProps) {
  const tabs: string[] = ["all", ...availableStatuses]

  return (
    <div
      role="tablist"
      aria-label="Filter projects by status"
      className="flex flex-wrap gap-1 sm:gap-2"
    >
      {tabs.map((status) => (
        <button
          key={status}
          role="tab"
          aria-selected={activeStatus === status}
          onClick={() => onFilterChange(status)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
            activeStatus === status
              ? "bg-accent/10 text-accent"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {status === "all" ? "All" : formatStatusLabel(status)}
        </button>
      ))}
    </div>
  )
}
