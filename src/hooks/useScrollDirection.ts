"use client";

import { useState, useEffect, useCallback } from "react";

export interface ScrollDirection {
  direction: "up" | "down";
  scrolled: boolean;
}

export function useScrollDirection(threshold = 10): ScrollDirection {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const current = window.scrollY;
    setScrollY(current);
    setScrolled(current > 50);

    const delta = current - scrollY;
    if (Math.abs(delta) > threshold) {
      setDirection(delta > 0 ? "down" : "up");
    }
  }, [scrollY, threshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { direction, scrolled };
}
