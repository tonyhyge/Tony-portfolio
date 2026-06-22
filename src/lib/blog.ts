/**
 * Estimate reading time from content word count.
 * Uses 200 words-per-minute baseline.
 */
export function estimateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/g).filter(Boolean).length
  return Math.ceil(wordCount / 200)
}

/**
 * Format an ISO date string "2026-06-22" to "June 22, 2026".
 */
export function formatPostDate(dateStr: string): string {
  const parts = dateStr.split("-")
  if (parts.length !== 3) return dateStr
  const [year, month, day] = parts
  if (!year || !month || !day) return dateStr
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  if (isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
