"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSyncExternalStore } from "react";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const mounted = useMounted();

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  if (!mounted) {
    return <div className="size-8" aria-hidden="true" />;
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
      {document.documentElement.classList.contains("dark")
        ? <Sun className="size-4" />
        : <Moon className="size-4" />
      }
    </Button>
  );
}
