"use client"
/**
 * Tag filter pills for blog list.
 *
 * This component uses useSearchParams from next/navigation, so its parent
 * MUST be wrapped in a Suspense boundary. See src/app/blog/page.tsx.
 */

import { useSearchParams, useRouter } from "next/navigation"
import { useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  className?: string
}

export function TagFilter({ tags, className }: TagFilterProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTag = searchParams?.get("tag") ?? null

  const handleTagClick = useCallback(
    (tag: string | null) => {
      if (tag) {
        router.replace(`?tag=${encodeURIComponent(tag)}`, { scroll: false })
      } else {
        router.replace(window.location.pathname, { scroll: false })
      }
    },
    [router],
  )

  return (
    <div
      role="tablist"
      aria-label="Filter posts by tag"
      className={cn(
        "flex flex-wrap gap-2 overflow-x-auto",
        "[&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {/* "All" pill — clears filter */}
      <Badge
        role="tab"
        aria-selected={activeTag === null}
        variant={activeTag === null ? "default" : "outline"}
        className={cn(
          "cursor-pointer transition-colors duration-150 ease-out",
          activeTag === null && "bg-accent/10 text-accent hover:bg-accent/15",
          activeTag !== null && "hover:bg-muted hover:text-muted-foreground",
        )}
        onClick={() => handleTagClick(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            handleTagClick(null)
          }
        }}
        tabIndex={0}
      >
        All
      </Badge>

      {/* Tag pills */}
      {tags.map((tag) => {
        const isActive = activeTag === tag
        return (
          <Badge
            key={tag}
            role="tab"
            aria-selected={isActive}
            variant={isActive ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-colors duration-150 ease-out",
              isActive && "bg-accent/10 text-accent hover:bg-accent/15",
              !isActive && "hover:bg-muted hover:text-muted-foreground",
            )}
            onClick={() => handleTagClick(tag)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                handleTagClick(tag)
              }
            }}
            tabIndex={0}
          >
            {tag}
          </Badge>
        )
      })}
    </div>
  )
}
