"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollIndicator() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let frameId: number;

    const handleScroll = () => {
      frameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const fadeRange = 200;
        const newOpacity = Math.max(0, 1 - scrollY / fadeRange);
        setOpacity(newOpacity);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{ opacity }}
      aria-hidden="true"
    >
      <span className="text-sm text-muted-foreground">
        Scroll to explore
      </span>
      <ArrowDown
        className={cn(
          "size-5 text-muted-foreground",
          "animate-bounce-subtle",
          "motion-reduce:animate-none",
        )}
      />
    </div>
  );
}
