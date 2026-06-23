"use client"

import { useState, useEffect, useCallback } from "react"
import { ExternalLink, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }, [url])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedinUrl = `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  const openWindow = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openWindow(xUrl)}
        className="text-muted-foreground transition-all duration-150 ease-out hover:scale-110 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
        aria-label="Share on X"
      >
        <ExternalLink className="size-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => openWindow(linkedinUrl)}
        className="text-muted-foreground transition-all duration-150 ease-out hover:scale-110 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
        aria-label="Share on LinkedIn"
      >
        <ExternalLink className="size-5" />
      </Button>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="text-muted-foreground transition-all duration-150 ease-out hover:scale-110 hover:text-accent focus-visible:ring-2 focus-visible:ring-accent active:scale-95"
          aria-label="Copy link"
        >
          <LinkIcon className="size-5" />
        </Button>
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background">
            Copied!
          </span>
        )}
      </div>
    </div>
  )
}
