"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useClickOutside } from "@/hooks/useClickOutside"
import { cn } from "@/lib/utils"

interface SkillPopoverProps {
  projects: { slug: string; title: string }[]
  onClose: () => void
  triggerRef: React.RefObject<HTMLElement | null>
  isOpen: boolean
}

export function SkillPopover({
  projects,
  onClose,
  triggerRef,
  isOpen,
}: SkillPopoverProps) {
  const popoverRef = useClickOutside<HTMLDivElement>(onClose)
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [visible, setVisible] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) {
      setVisible(false)
      return
    }

    // Position the popover relative to the trigger element
    const trigger = triggerRef.current
    if (trigger) {
      const rect = trigger.getBoundingClientRect()
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      })
    }

    // Trigger fade-in after position is set
    requestAnimationFrame(() => setVisible(true))

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, triggerRef, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      ref={popoverRef}
      role="dialog"
      aria-label="Related projects"
      className={cn(
        "fixed z-50 min-w-[200px] max-w-[280px] rounded-lg border border-border bg-popover p-3 shadow-md",
        "transition-opacity duration-150",
        visible ? "opacity-100" : "opacity-0"
      )}
      style={{ top: position.top, left: position.left }}
    >
      <p className="text-xs text-muted-foreground mb-1.5">Related projects</p>
      {projects.length > 0 ? (
        <ul className="space-y-0.5">
          {projects.map((project) => (
            <li key={project.slug}>
              <button
                onClick={() => {
                  onClose()
                  document
                    .getElementById("research")
                    ?.scrollIntoView({ behavior: "smooth" })
                }}
                className="w-full text-left py-1.5 px-2 rounded-md hover:bg-muted cursor-pointer text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">
          Learn more through my projects
        </p>
      )}
    </div>
  )
}
