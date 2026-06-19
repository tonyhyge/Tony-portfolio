import { Code2, Briefcase, Mail, GraduationCap } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/tonyhyge", label: "GitHub", icon: Code2 },
  { href: "https://linkedin.com/in/pham-quang-minh", label: "LinkedIn", icon: Briefcase },
  { href: "https://scholar.google.com/", label: "Google Scholar", icon: GraduationCap },
  { href: "mailto:phamquangminh@example.com", label: "Email", icon: Mail },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="mt-auto border-t border-border/50">
      <div className="flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs text-muted-foreground">
          &copy; {year} Ph&#x1EA1;m Quang Minh
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
