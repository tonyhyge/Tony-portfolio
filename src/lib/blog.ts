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
  const [yearStr, monthStr, dayStr] = parts
  if (!yearStr || !monthStr || !dayStr) return dateStr
  const year = parseInt(yearStr, 10)
  const month = parseInt(monthStr, 10)
  const day = parseInt(dayStr, 10)
  if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr
  if (month < 1 || month > 12) return dateStr
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return dateStr
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
