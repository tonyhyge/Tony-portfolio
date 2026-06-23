import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import { getAllSlugs, getPostBySlug } from "@/app/data/blog"
import { formatPostDate } from "@/lib/blog"
import { Breadcrumb } from "@/components/blog/breadcrumb"
import { Toc } from "@/components/blog/toc"
import Link from "next/link"

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article lang="en" className="mx-auto max-w-screen-xl px-4 py-12">
      {/* Breadcrumb */}
      <Breadcrumb post={post} />

      {/* Back to all posts */}
      <Link
        href="/blog"
        className="mt-2 inline-block text-sm text-muted-foreground transition-colors duration-150 ease-out hover:text-accent"
      >
        &larr; Back to all posts
      </Link>

      {/* Cover image or gradient fallback */}
      {post.cover ? (
        <img
          src={post.cover}
          alt={post.title}
          width={1200}
          height={400}
          className="mt-6 w-full max-h-[400px] rounded-lg object-cover"
        />
      ) : (
        <div
          className="mt-6 flex h-[200px] w-full items-center justify-center rounded-lg sm:h-[300px] md:h-[400px]"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
          }}
        >
          <span className="px-4 text-center text-xl font-semibold text-white sm:text-2xl md:text-3xl">
            {post.title}
          </span>
        </div>
      )}

      {/* Header */}
      <header className="mb-8 mt-8">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-label={`${post.readingTime} minute read`}>{post.readingTime} min read</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Mobile TOC */}
      <Toc headings={post.headings} className="mb-6" />

      {/* Two-column layout: article + desktop TOC */}
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <div className="max-w-[720px] flex-1">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXRemote
              source={post.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: {
                          dark: "github-dark-dimmed",
                          light: "github-light",
                        },
                        keepBackground: false,
                        defaultLang: "plaintext",
                      },
                    ],
                  ],
                },
              }}
            />
          </div>
        </div>

        {/* Desktop TOC sidebar */}
        <Toc headings={post.headings} />
      </div>
    </article>
  )
}
