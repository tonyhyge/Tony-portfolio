"use client"

import { Suspense, useState, useEffect, useCallback, useMemo, useRef } from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

import { FilterTabs } from "./FilterTabs"
import { ResearchCard } from "./ResearchCard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { researchProjects, getAvailableStatuses } from "@/app/data/research"
import type { ResearchProject } from "@/app/data/research"

// ── Helper ──────────────────────────────────────────────────────────────

function formatStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    "in-progress": "In Progress",
    submitted: "Submitted",
    published: "Published",
    accepted: "Accepted",
  }
  return labels[status] ?? status
}

// ── Inner component (uses useSearchParams — must be inside Suspense) ─────

interface ResearchGridInnerProps {
  projects: ResearchProject[]
}

function ResearchGridInner({ projects }: ResearchGridInnerProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const activeStatus = useMemo(
    () => searchParams.get("status") || "all",
    [searchParams],
  )

  const filteredProjects = useMemo(() => {
    if (activeStatus === "all") return projects
    return projects.filter((p) => p.status === activeStatus)
  }, [projects, activeStatus])

  const availableStatuses = useMemo(() => getAvailableStatuses(), [])

  const [transitioning, setTransitioning] = useState(false)

  const handleFilterChange = useCallback(
    (status: string) => {
      setTransitioning(true)
      const params = new URLSearchParams(searchParams.toString())
      if (status === "all") params.delete("status")
      else params.set("status", status)

      // Allow exit transition to play before navigating
      setTimeout(() => {
        router.push(pathname + "?" + params.toString())
      }, 150)
    },
    [router, pathname, searchParams],
  )

  const handleShowAll = useCallback(() => {
    router.push(pathname)
  }, [router, pathname])

  // Track status changes so the effect can detect when navigation completed
  const prevStatusRef = useRef(activeStatus)

  useEffect(() => {
    if (prevStatusRef.current !== activeStatus) {
      prevStatusRef.current = activeStatus
      setTransitioning(false)
    }
  }, [activeStatus])

  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false

  const isTransitioning = transitioning && !prefersReducedMotion

  return (
    <div className="space-y-8">
      <FilterTabs
        availableStatuses={availableStatuses}
        activeStatus={activeStatus}
        onFilterChange={handleFilterChange}
      />

      <div
        className={cn(
          "grid grid-cols-1 gap-6 md:grid-cols-2",
          isTransitioning
            ? "opacity-0 transition-all duration-150 ease-out"
            : "opacity-100 transition-all duration-200 ease-out",
        )}
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ResearchCard key={project.title} project={project} />
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg font-medium text-foreground">
              No {formatStatusLabel(activeStatus)} projects yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back soon for updates to this section.
            </p>
            {activeStatus !== "all" && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={handleShowAll}
              >
                Show all
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Outer component (Suspense wrapper) ───────────────────────────────────

export function ResearchGrid() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          <div className="h-48 md:col-span-2 rounded-xl bg-muted/30 animate-pulse" />
        </div>
      }
    >
      <ResearchGridInner projects={researchProjects} />
    </Suspense>
  )
}
