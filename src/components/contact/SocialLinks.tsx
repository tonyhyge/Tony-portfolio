"use client"

import { Github, Linkedin, GraduationCap, Mail } from "lucide-react"

const links = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/tonyhyge",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/tonyhyge",
  },
  {
    icon: GraduationCap,
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=PLACEHOLDER",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:minhpham@example.com",
  },
]

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      {links.map(({ icon: Icon, label, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="text-muted-foreground transition-colors duration-200 hover:scale-110 hover:text-foreground"
        >
          <Icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  )
}
