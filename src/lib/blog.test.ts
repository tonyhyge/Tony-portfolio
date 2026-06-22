import { describe, it, expect } from "vitest";
import { estimateReadingTime, formatPostDate } from "@/lib/blog";

describe("estimateReadingTime()", () => {
  it("returns 0 for empty content", () => {
    expect(estimateReadingTime("")).toBe(0);
  });

  it("returns 0 for content with only whitespace", () => {
    expect(estimateReadingTime("   ")).toBe(0);
    expect(estimateReadingTime("\t\n\r")).toBe(0);
  });

  it("returns 1 for a single word", () => {
    expect(estimateReadingTime("hello")).toBe(1);
  });

  it("returns 1 for exactly 200 words", () => {
    const words = Array(200).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(1);
  });

  it("rounds up from 201 words to 2 minutes", () => {
    const words = Array(201).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(2);
  });

  it("returns 2 for exactly 400 words", () => {
    const words = Array(400).fill("word").join(" ");
    expect(estimateReadingTime(words)).toBe(2);
  });

  it("counts correctly with mixed whitespace (tabs, newlines)", () => {
    const content = "word1\nword2\tword3\r\nword4";
    expect(estimateReadingTime(content)).toBe(1);
  });
});

describe("formatPostDate()", () => {
  it('formats "2026-06-22" as "June 22, 2026"', () => {
    expect(formatPostDate("2026-06-22")).toBe("June 22, 2026");
  });

  it('formats "2024-01-05" as "January 5, 2024"', () => {
    expect(formatPostDate("2024-01-05")).toBe("January 5, 2024");
  });

  it("returns empty string as-is for empty input (graceful fallback)", () => {
    expect(formatPostDate("")).toBe("");
  });

  it("returns invalid input as-is (graceful fallback)", () => {
    expect(formatPostDate("not-a-date")).toBe("not-a-date");
  });

  it("handles single-digit month and day", () => {
    expect(formatPostDate("2025-03-07")).toBe("March 7, 2025");
  });
});
