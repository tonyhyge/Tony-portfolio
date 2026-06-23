"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useActiveSection } from "@/hooks/useActiveSection"
import type { Heading } from "@/app/data/blog"

interface TocProps {
  headings: Heading[]
  className?: string
}

export function Toc({ headings, className = "" }: TocProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ids = headings.map((h) => h.id)
  const activeId = useActiveSection(ids)

  if (headings.length === 0) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Mobile/Tablet: collapsible toggle */}
      <div className={`lg:hidden ${className}`}>
        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-accent"
          aria-expanded={isExpanded}
          aria-controls="mobile-toc-content"
        >
          <span className="font-semibold">On this page</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ease-out ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          id="mobile-toc-content"
          className={`overflow-hidden transition-all duration-300 ease-out ${
            isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="mt-2 space-y-1 border-l-2 border-border pl-3">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className={`block text-sm transition-colors duration-150 hover:text-accent ${
                    activeId === heading.id
                      ? "font-medium text-accent"
                      : "text-muted-foreground"
                  } ${heading.level === 3 ? "pl-3 text-xs" : ""}`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Desktop: sticky sidebar */}
      <aside className={`hidden lg:block w-[220px] flex-shrink-0 ${className}`}>
        <div className="sticky top-24">
          <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
            On this page
          </h2>
          <nav aria-label="Table of contents">
            <ul className="space-y-1">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleClick(e, heading.id)}
                    className={`block text-sm font-normal leading-snug transition-colors duration-150 hover:text-accent ${
                      activeId === heading.id
                        ? "border-l-2 border-accent pl-3 font-medium text-accent"
                        : "pl-4 text-muted-foreground"
                    } ${heading.level === 3 ? "pl-6 text-xs" : ""}`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}
