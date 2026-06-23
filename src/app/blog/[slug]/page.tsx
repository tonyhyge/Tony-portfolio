import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import { getAllPosts, getAllSlugs, getPostBySlug } from "@/app/data/blog"
import { formatPostDate } from "@/lib/blog"
import { SeriesNav } from "@/components/blog/series-nav"
import { ShareButtons } from "@/components/blog/share-buttons"
import { PrevNextNav } from "@/components/blog/prev-next-nav"

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

  const allPosts = getAllPosts()

  return (
    <article lang="en" className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
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

      <SeriesNav post={post} allPosts={allPosts} position="top" />

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              rehypePlugins: [
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

      <SeriesNav post={post} allPosts={allPosts} position="bottom" />

      <div className="mt-6 border-t pt-6">
        <ShareButtons title={post.title} url={post.canonical ?? `/blog/${post.slug}`} />
      </div>

      <PrevNextNav post={post} allPosts={allPosts} />
    </article>
  )
}
