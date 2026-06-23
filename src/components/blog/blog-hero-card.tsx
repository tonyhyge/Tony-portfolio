import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatPostDate } from "@/lib/blog"
import type { BlogPostMeta } from "@/app/data/blog"

interface BlogHeroCardProps {
  post: BlogPostMeta
}

export function BlogHeroCard({ post }: BlogHeroCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl focus-visible:ring-2 focus-visible:ring-accent"
    >
      <article className="relative overflow-hidden rounded-xl shadow-md transition-all duration-200 ease-out group-hover:shadow-lg group-hover:scale-[1.01] group-hover:border-accent/50 group-active:scale-[0.99] border border-transparent md:max-h-[480px]">
        {post.cover ? (
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover md:max-h-[480px]"
          />
        ) : (
          <div
            className="w-full min-h-[280px] md:max-h-[480px] md:min-h-[400px]"
            style={{ background: "var(--gradient-hero)" }}
          />
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Content overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h2 className="text-2xl md:text-[28px] font-semibold leading-tight text-white">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 text-base text-white/80 line-clamp-3">
              {post.excerpt}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-white/60">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-label={`${post.readingTime} minute read`}>
              {post.readingTime} min read
            </span>
          </div>
          {post.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-white border-white/30"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
