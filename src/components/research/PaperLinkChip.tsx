import { ExternalLink, FileText } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface PaperLinkChipProps {
  type: "arxiv" | "doi" | "pdf"
  href: string
}

const chipConfig: Record<string, { icon: LucideIcon; label: string }> = {
  arxiv: { icon: ExternalLink, label: "arXiv" },
  doi: { icon: ExternalLink, label: "DOI" },
  pdf: { icon: FileText, label: "PDF" },
}

export function PaperLinkChip({ type, href }: PaperLinkChipProps) {
  const { icon: Icon, label } = chipConfig[type]

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent/10 hover:text-accent focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <Icon className="size-3" />
      <span>{label}</span>
    </a>
  )
}
