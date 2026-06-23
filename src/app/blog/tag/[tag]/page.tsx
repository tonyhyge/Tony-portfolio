import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts, getAllTags } from "@/app/data/blog"
import { Container } from "@/components/container"

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const tags = getAllTags()
  return tags.map((tag) => ({ tag }))
}

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const allTags = getAllTags()

  if (!allTags.includes(tag)) {
    notFound()
  }

  const posts = getAllPosts().filter((p) => p.tags.includes(tag))

  return (
    <Container className="py-12">
      <Link
        href="/blog"
        className="mb-4 inline-block text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-accent"
      >
        &larr; Back to all posts
      </Link>
      <h1 className="mb-8 text-[1.75rem] font-semibold leading-tight tracking-tight">
        Posts tagged &quot;{tag}&quot;
      </h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-lg border bg-card p-4 shadow-sm transition-all duration-200 ease-out hover:border-accent hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99]"
            >
              <h2 className="text-[1.25rem] font-semibold leading-tight tracking-tight">
                {post.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-base text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                <span>{post.date}</span>
                <span aria-label={`${post.readingTime} minute read`}>
                  {post.readingTime} min read
                </span>
              </div>
              {post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </Container>
  )
}
