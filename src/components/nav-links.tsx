import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

interface NavLinksProps {
  links: NavLink[];
  className?: string;
}

export function NavLinks({ links, className }: NavLinksProps) {
  return (
    <nav className={cn("flex items-center gap-1", className)} aria-label="Main navigation">
      {links.map((link) =>
        link.isAnchor ? (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-all hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {link.label}
          </Link>
        )
      )}
    </nav>
  );
}
