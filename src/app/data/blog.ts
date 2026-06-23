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
  toc: z.array(z.string()).optional(),
})

export type BlogPost = z.infer<typeof BlogPostSchema>

export interface Heading {
  id: string
  text: string
  level: number
}

export type BlogPostMeta = BlogPost & {
  slug: string
  readingTime: number
  content: string
  headings: Heading[]
}

// ── Directory ───────────────────────────────────────────────────────────

const POSTS_DIR = join(process.cwd(), "content", "blog")

// ── Heading Extraction ───────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function stripInlineFormatting(text: string): string {
  // Remove inline code backticks: `code`
  // Remove markdown links: [text](url) → text
  return text.replace(/`[^`]*`/g, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3
    const rawText = match[2].trim()
    const text = stripInlineFormatting(rawText)
    const id = slugify(text)
    headings.push({ id, text, level })
  }

  return headings
}

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

  let headings = extractHeadings(content)
  if (parsed.toc && parsed.toc.length > 0) {
    const allowed = new Set(parsed.toc.map((t) => t.toLowerCase()))
    headings = headings.filter((h) => allowed.has(h.text.toLowerCase()))
  }

  return { ...parsed, slug, readingTime, content, headings }
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
