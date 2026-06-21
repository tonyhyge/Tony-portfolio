"use client";

import { cn } from "@/lib/utils";
import { StickyHeader } from "./sticky-header";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useActiveSection } from "@/hooks/useActiveSection";
import { navLinks } from "@/app/data/navigation";

export function SiteHeader() {
  const { direction, scrolled } = useScrollDirection();

  const sectionIds = navLinks.filter((l) => l.isAnchor).map((l) => l.href.replace("#", ""));
  const activeSection = useActiveSection(sectionIds);

  const isVisible = direction === "up" || !scrolled;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-transform duration-200 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full max-md:translate-y-0",
      )}
    >
      <StickyHeader
        className={cn(
          "transition-all duration-200",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <NavLinks
            links={navLinks}
            activeHref={activeSection ? `#${activeSection}` : undefined}
            className="hidden lg:flex"
          />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </StickyHeader>
    </div>
  );
}
