"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { navLinks } from "@/app/data/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button variant="ghost" size="icon" aria-label="Toggle mobile menu" className="lg:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" showCloseButton={false}>
        <div className="flex flex-col gap-1 p-4 pt-12">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.isAnchor ? (
                <SheetClose
                  key={link.href}
                  render={
                    <a
                      href={link.href}
                      className="flex min-h-[44px] items-center rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                      {link.label}
                    </a>
                  }
                />
              ) : (
                <SheetClose
                  key={link.href}
                  render={
                    <Link
                      href={link.href}
                      className="flex min-h-[44px] items-center rounded-lg px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  }
                />
              )
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
