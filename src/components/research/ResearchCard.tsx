"use client"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { PaperLinkChip } from "./PaperLinkChip"
import type { ResearchProject } from "@/app/data/research"

interface ResearchCardProps {
  project: ResearchProject
  className?: string
}

function formatStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    "in-progress": "In Progress",
    submitted: "Submitted",
    published: "Published",
    accepted: "Accepted",
  }
  return labels[status] ?? status
}

export function ResearchCard({ project, className }: ResearchCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card
      className={cn(
        project.featured &&
          "md:col-span-2 border-t-2 border-accent",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className={project.featured ? "text-xl" : "text-lg"}>
            {project.title}
          </CardTitle>
          <Badge variant="secondary" statusColor={project.status}>
            {formatStatusLabel(project.status)}
          </Badge>
        </div>
        <CardDescription>
          {[project.venue, project.startDate].filter(Boolean).join(" · ")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {project.thumbnail && (
          <img
            src={project.thumbnail}
            alt=""
            className="w-full rounded-lg object-cover"
            loading="lazy"
          />
        )}

        <div>
          <p
            className={cn(
              "text-sm leading-relaxed text-muted-foreground",
              !expanded && "line-clamp-3"
            )}
          >
            {project.abstract}
          </p>
          {project.abstract.length > 150 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-1 text-sm font-medium text-accent hover:underline cursor-pointer focus-visible:ring-2 focus-visible:ring-ring/50"
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {(project.links.arxiv || project.links.doi || project.links.pdf) && (
        <CardFooter className="gap-2">
          {project.links.arxiv && (
            <PaperLinkChip type="arxiv" href={project.links.arxiv} />
          )}
          {project.links.doi && (
            <PaperLinkChip type="doi" href={project.links.doi} />
          )}
          {project.links.pdf && (
            <PaperLinkChip type="pdf" href={project.links.pdf} />
          )}
        </CardFooter>
      )}
    </Card>
  )
}
