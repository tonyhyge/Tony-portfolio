"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SkillCategoryProps {
  name: string
  color: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export function SkillCategory({
  name,
  color,
  isOpen,
  onToggle,
  children,
}: SkillCategoryProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  const colorValue = getColorValue(color)

  return (
    <div className="border border-border rounded-lg">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-medium hover:bg-muted/50 transition-colors rounded-t-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex items-center gap-3">
          <span
            className="h-2.5 w-2.5 rounded-full shrink-0"
            style={{ backgroundColor: colorValue }}
          />
          {name}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-300",
            isOpen && "-rotate-180"
          )}
        />
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
      >
        <div className="px-4 pb-3 flex flex-wrap gap-2">{children}</div>
      </div>
    </div>
  )
}

function getColorValue(color: string): string {
  const colorMap: Record<string, string> = {
    cyan: "oklch(0.72 0.14 200)",
    violet: "oklch(0.68 0.16 290)",
    amber: "oklch(0.78 0.16 80)",
  }
  return colorMap[color] ?? "oklch(0.72 0.14 200)"
}
