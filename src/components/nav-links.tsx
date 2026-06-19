import { cn } from "@/lib/utils";
import Link from "next/link";

export interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

interface NavLinksProps {
  links: NavLink[];
  activeHref?: string;
  className?: string;
}

export function NavLinks({ links, activeHref, className }: NavLinksProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Main navigation">
      {links.map((link) =>
        link.isAnchor ? (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
              link.href === activeHref
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {link.label}
            {link.href === activeHref && (
              <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            )}
          </a>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
              link.href === activeHref
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {link.label}
            {link.href === activeHref && (
              <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            )}
          </Link>
        )
      )}
    </nav>
  );
}
