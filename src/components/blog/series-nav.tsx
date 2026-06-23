import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { BlogPostMeta } from "@/app/data/blog"
import { cn } from "@/lib/utils"

interface SeriesNavProps {
  post: BlogPostMeta
  allPosts: BlogPostMeta[]
  position: "top" | "bottom"
}

export function SeriesNav({ post, allPosts, position }: SeriesNavProps) {
  if (!post.series) return null

  const seriesPosts = allPosts
    .filter((p) => p.series === post.series)
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

  const currentIndex = seriesPosts.findIndex((p) => p.slug === post.slug)
  const n = currentIndex + 1
  const m = seriesPosts.length
  const prev = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null
  const next =
    currentIndex < seriesPosts.length - 1
      ? seriesPosts[currentIndex + 1]
      : null

  return (
    <div
      className={cn(
        "flex items-center justify-between rounded-md border-l-3 border-accent bg-muted/50 p-3",
        position === "top" && "mb-6",
        position === "bottom" && "mt-6"
      )}
    >
      <div className="text-sm text-muted-foreground">
        <span>
          Part {n} of {m}
        </span>
        {" — "}
        <span className="font-medium text-foreground">{post.series}</span>
      </div>
      <nav className="flex items-center gap-2" aria-label="Series navigation">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="transition-colors duration-150 ease-out hover:text-accent hover:scale-110"
            aria-label={`Previous in series: ${prev.title}`}
          >
            <ChevronLeft className="size-5" />
          </Link>
        ) : (
          <span className="size-5" />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="transition-colors duration-150 ease-out hover:text-accent hover:scale-110"
            aria-label={`Next in series: ${next.title}`}
          >
            <ChevronRight className="size-5" />
          </Link>
        ) : (
          <span className="size-5" />
        )}
      </nav>
    </div>
  )
}
