import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { BlogPostMeta } from "@/app/data/blog"

interface PrevNextNavProps {
  post: BlogPostMeta
  allPosts: BlogPostMeta[]
}

export function PrevNextNav({ post, allPosts }: PrevNextNavProps) {
  let prev: BlogPostMeta | null = null
  let next: BlogPostMeta | null = null

  if (post.series) {
    const seriesPosts = allPosts
      .filter((p) => p.series === post.series)
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
    const currentIndex = seriesPosts.findIndex((p) => p.slug === post.slug)
    prev = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null
    next =
      currentIndex < seriesPosts.length - 1
        ? seriesPosts[currentIndex + 1]
        : null

    if (seriesPosts.length <= 1) return null
  } else {
    const sorted = [...allPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const currentIndex = sorted.findIndex((p) => p.slug === post.slug)
    prev = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null
    next = currentIndex > 0 ? sorted[currentIndex - 1] : null
  }

  return (
    <nav
      className="grid grid-cols-2 gap-6 border-t pt-8"
      aria-label="Adjacent post navigation"
    >
      <div>
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group block"
          >
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <ChevronLeft className="size-4 transition-transform duration-200 ease-out group-hover:-translate-x-1" />
              Previous
            </span>
            <span className="mt-1 block text-base text-foreground transition-colors duration-200 ease-out group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
      <div className="text-right">
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group block"
          >
            <span className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
              Next
              <ChevronRight className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </span>
            <span className="mt-1 block text-base text-foreground transition-colors duration-200 ease-out group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  )
}
