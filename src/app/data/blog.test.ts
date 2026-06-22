import { describe, it, expect } from "vitest";
import { BlogPostSchema, getAllSlugs, getAllPosts, getPostBySlug, getAllTags } from "@/app/data/blog";

describe("BlogPostSchema.parse()", () => {
  it("passes valid minimal frontmatter (title + date only)", () => {
    const result = BlogPostSchema.parse({
      title: "My First Post",
      date: "2026-06-22",
    });
    expect(result.title).toBe("My First Post");
    expect(result.date).toBe("2026-06-22");
  });

  it("applies default values (draft=false, tags=[]) for minimal input", () => {
    const result = BlogPostSchema.parse({
      title: "My First Post",
      date: "2026-06-22",
    });
    expect(result.draft).toBe(false);
    expect(result.tags).toEqual([]);
  });

  it("passes valid complete frontmatter with all 9 fields", () => {
    const result = BlogPostSchema.parse({
      title: "Complete Post",
      date: "2026-06-22",
      tags: ["tech", "typescript"],
      excerpt: "A brief excerpt.",
      cover: "/images/cover.jpg",
      draft: false,
      updated: "2026-06-23",
      series: "TypeScript Deep Dive",
      canonical: "https://example.com/original-post",
    });
    expect(result.title).toBe("Complete Post");
    expect(result.date).toBe("2026-06-22");
    expect(result.tags).toEqual(["tech", "typescript"]);
    expect(result.excerpt).toBe("A brief excerpt.");
    expect(result.cover).toBe("/images/cover.jpg");
    expect(result.draft).toBe(false);
    expect(result.updated).toBe("2026-06-23");
    expect(result.series).toBe("TypeScript Deep Dive");
    expect(result.canonical).toBe("https://example.com/original-post");
  });

  it("throws ZodError when title is missing", () => {
    expect(() =>
      BlogPostSchema.parse({ date: "2026-06-22" })
    ).toThrow();
  });

  it("throws ZodError when title is empty string", () => {
    expect(() =>
      BlogPostSchema.parse({ title: "", date: "2026-06-22" })
    ).toThrow();
  });

  it("throws ZodError when date is missing", () => {
    expect(() =>
      BlogPostSchema.parse({ title: "No Date" })
    ).toThrow();
  });

  it('throws ZodError for invalid date format "2026/06/22"', () => {
    expect(() =>
      BlogPostSchema.parse({ title: "Bad Date", date: "2026/06/22" })
    ).toThrow();
  });

  it('throws ZodError for invalid date format "June 22, 2026"', () => {
    expect(() =>
      BlogPostSchema.parse({ title: "Bad Date", date: "June 22, 2026" })
    ).toThrow();
  });

  it("throws ZodError for invalid canonical URL", () => {
    expect(() =>
      BlogPostSchema.parse({
        title: "Bad Canonical",
        date: "2026-06-22",
        canonical: "not-a-url",
      })
    ).toThrow();
  });

  it("accepts draft: true", () => {
    const result = BlogPostSchema.parse({
      title: "Draft Post",
      date: "2026-06-22",
      draft: true,
    });
    expect(result.draft).toBe(true);
  });

  it("accepts valid updated ISO date", () => {
    const result = BlogPostSchema.parse({
      title: "Updated Post",
      date: "2026-06-22",
      updated: "2026-07-01",
    });
    expect(result.updated).toBe("2026-07-01");
  });

  it("preserves series string value", () => {
    const result = BlogPostSchema.parse({
      title: "Series Post",
      date: "2026-06-22",
      series: "TypeScript Deep Dive",
    });
    expect(result.series).toBe("TypeScript Deep Dive");
  });

  it("throws ZodError for invalid updated date format", () => {
    expect(() =>
      BlogPostSchema.parse({
        title: "Bad Updated",
        date: "2026-06-22",
        updated: "2026/07/01",
      })
    ).toThrow();
  });
});

describe("Loader function exports", () => {
  it("exports getAllSlugs", () => {
    expect(getAllSlugs).toBeDefined();
    expect(typeof getAllSlugs).toBe("function");
  });

  it("exports getPostBySlug", () => {
    expect(getPostBySlug).toBeDefined();
    expect(typeof getPostBySlug).toBe("function");
  });

  it("exports getAllPosts", () => {
    expect(getAllPosts).toBeDefined();
    expect(typeof getAllPosts).toBe("function");
  });

  it("exports getAllTags", () => {
    expect(getAllTags).toBeDefined();
    expect(typeof getAllTags).toBe("function");
  });
});
