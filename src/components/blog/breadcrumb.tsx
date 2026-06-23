import Link from "next/link"
import type { BlogPostMeta } from "@/app/data/blog"

interface BreadcrumbProps {
  post: BlogPostMeta
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "…"
}

export function Breadcrumb({ post }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center text-sm text-muted-foreground">
        <li>
          <Link
            href="/blog"
            className="transition-colors duration-150 ease-out hover:text-accent"
          >
            Blog
          </Link>
        </li>
        <li aria-hidden="true" className="px-2 text-muted-foreground">
          /
        </li>
        <li>
          {post.tags.length > 0 ? (
            <Link
              href={`/blog/tag/${post.tags[0]}`}
              className="transition-colors duration-150 ease-out hover:text-accent"
            >
              {post.tags[0]}
            </Link>
          ) : (
            <span>Posts</span>
          )}
        </li>
        <li aria-hidden="true" className="px-2 text-muted-foreground">
          /
        </li>
        <li className="text-foreground" aria-current="page">
          {truncate(post.title, 40)}
        </li>
      </ol>
    </nav>
  )
}
