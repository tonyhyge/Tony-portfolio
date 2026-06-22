import { z } from "zod"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import matter from "gray-matter"

// ── Zod Schema ──────────────────────────────────────────────────────────

export const BlogPostSchema = z.object({
  title: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).default([]),
  excerpt: z.string().optional(),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  series: z.string().optional(),
  canonical: z.string().url().optional(),
})

export type BlogPost = z.infer<typeof BlogPostSchema>

export type BlogPostMeta = BlogPost & { slug: string; readingTime: number; content: string }

// ── Directory ───────────────────────────────────────────────────────────

const POSTS_DIR = join(process.cwd(), "content", "blog")

// ── Loaders ─────────────────────────────────────────────────────────────

export function getAllSlugs(): string[] {
  return readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export function getPostBySlug(slug: string): BlogPostMeta {
  const source = readFileSync(join(POSTS_DIR, `${slug}.mdx`), "utf-8")
  const { data, content } = matter(source)
  const parsed = BlogPostSchema.parse(data)
  const wordCount = content.split(/\s+/g).filter(Boolean).length
  const readingTime = Math.ceil(wordCount / 200)
  return { ...parsed, slug, readingTime, content }
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllTags(): string[] {
  const tags = new Set(
    getAllPosts().flatMap((post) => post.tags)
  )
  return Array.from(tags).sort()
}
