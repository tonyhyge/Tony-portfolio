"use client"
/**
 * Blog list page composition orchestrator.
 *
 * Renders page heading, TagFilter, BlogHeroCard for latest post, and
 * BlogCard grid for remaining posts. Filters posts by ?tag= URL param.
 */

import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { BlogHeroCard } from "@/components/blog/blog-hero-card"
import { BlogCard } from "@/components/blog/blog-card"
import { TagFilter } from "@/components/blog/tag-filter"
import type { BlogPostMeta } from "@/app/data/blog"

interface BlogListProps {
  posts: BlogPostMeta[]
  tags: string[]
}

export function BlogList({ posts, tags }: BlogListProps) {
  const searchParams = useSearchParams()
  const activeTag = searchParams?.get("tag") ?? null
  const gridRef = useRef<HTMLDivElement>(null)

  // Scroll to post grid when filter changes
  useEffect(() => {
    if (activeTag && gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [activeTag])

  // Filter posts by active tag
  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts

  const heroPost = filteredPosts[0]
  const gridPosts = filteredPosts.slice(1)
  const isEmpty = filteredPosts.length === 0

  return (
    <section>
      {/* Page heading */}
      <h1 className="text-[28px] font-semibold tracking-tight">Blog</h1>

      {/* Tag filter row */}
      <div className="mt-6">
        <TagFilter tags={tags} />
      </div>

      {/* Hero card */}
      {!isEmpty && heroPost && (
        <div className="mt-8">
          <BlogHeroCard post={heroPost} />
        </div>
      )}

      {/* Grid section */}
      <div ref={gridRef} id="posts">
        {!isEmpty && gridPosts.length > 0 && (
          <div
            key={activeTag ?? "all"}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300"
          >
            {gridPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Empty filter state */}
        {isEmpty && posts.length > 0 && (
          <div className="mt-16 text-center">
            <h2 className="text-xl font-semibold">No posts found</h2>
            <p className="mt-2 text-muted-foreground">
              No posts match the selected tag. Try a different filter.
            </p>
          </div>
        )}

        {/* No posts at all */}
        {posts.length === 0 && (
          <div className="mt-16 text-center">
            <h2 className="text-xl font-semibold">No posts yet</h2>
            <p className="mt-2 text-muted-foreground">
              Blog posts will appear here once published. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
