import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { formatPostDate } from "@/lib/blog"
import type { BlogPostMeta } from "@/app/data/blog"

interface BlogCardProps {
  post: BlogPostMeta
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/card block rounded-xl focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Card
        size="default"
        className="transition-all duration-200 ease-out shadow-sm group-hover/card:shadow-md group-hover/card:-translate-y-0.5 group-hover/card:border-accent/50 group-active:scale-[0.99]"
      >
        {/* Cover thumbnail area */}
        <div className="aspect-[16/9] overflow-hidden rounded-t-xl">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{ background: "var(--gradient-hero)" }}
            />
          )}
        </div>

        <CardHeader>
          <CardTitle className="text-[20px]/[1.3] font-semibold">
            {post.title}
          </CardTitle>
          {post.excerpt && (
            <CardDescription className="text-base line-clamp-2">
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>

        <CardFooter className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
